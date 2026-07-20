import { existsSync, readdirSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import liveContent from '../../data/site/live-content.json' with { type: 'json' }
import currentFocus from '../../data/currentFocus.json' with { type: 'json' }
import articlesData from '../../data/articles.json' with { type: 'json' }

const MODULE_DIR = dirname(fileURLToPath(import.meta.url))
const KNOWLEDGE_CACHE_MS = 5 * 60 * 1000

let cachedKnowledge = null
let cachedKnowledgeAt = 0
let cachedRoot = ''

function resolveDataRoot(preferred) {
  const candidates = [
    preferred,
    process.cwd(),
    join(process.cwd(), '..'),
    join(MODULE_DIR, '../../..'),
    join(MODULE_DIR, '../../../..'),
  ].filter(Boolean)

  for (const root of candidates) {
    if (existsSync(join(root, 'src/data/projects'))) return root
    if (existsSync(join(root, 'data/projects'))) return root
  }

  return process.cwd()
}

function projectsDirFor(rootDir) {
  const nested = join(rootDir, 'src/data/projects')
  if (existsSync(nested)) return nested
  const flat = join(rootDir, 'data/projects')
  if (existsSync(flat)) return flat
  return nested
}

function loadProjects(rootDir) {
  const projectsDir = projectsDirFor(rootDir)
  try {
    if (!existsSync(projectsDir)) {
      console.error('Neura live knowledge: projects directory missing at', projectsDir)
      return []
    }

    return readdirSync(projectsDir)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const fileContent = readFileSync(join(projectsDir, file), 'utf8')
        if (fileContent.trim().startsWith('<!--')) return null
        const { data } = matter(fileContent)
        return {
          id: data.id,
          title: data.title,
          summary: typeof data.summary === 'string' ? data.summary.slice(0, 220) : data.summary,
          category: data.category,
          date: data.date,
          techStack: Array.isArray(data.techStack) ? data.techStack.slice(0, 10) : [],
          featured: Boolean(data.featured),
          status: data.status || null,
          githubUrl: data.githubUrl || null,
          liveUrl: data.liveUrl || null,
          page: `/work/${data.id}`,
        }
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.order && b.order) return a.order - b.order
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
  } catch (error) {
    console.error('Neura live knowledge: failed to load projects', error)
    return []
  }
}

/** Compact article rows - titles/tags only (excerpts were ~5KB and slowed every request). */
function normalizeArticles(rawArticles) {
  if (!Array.isArray(rawArticles)) return []
  return rawArticles.map((article) => ({
    id: article.id,
    title: article.title,
    category: article.category,
    date: article.date,
    tags: Array.isArray(article.tags) ? article.tags.slice(0, 6) : [],
    featured: Boolean(article.featured),
    page: '/articles',
  }))
}

function compactCredentials(list) {
  if (!Array.isArray(list)) return []
  return list.map((item) => ({
    title: item.title || item.name,
    issuer: item.issuer || item.organization || null,
    year: item.year || item.date || null,
  }))
}

function compactSkills(list) {
  if (!Array.isArray(list)) return []
  return list.map((item) => {
    if (typeof item === 'string') return item
    return item.name || item.title || item.skill || item
  })
}

/**
 * Builds Neura's knowledge snapshot from live portfolio sources.
 * Kept compact so every chat request stays fast (TTFT).
 * JSON files are imported (always available on Vercel).
 * Project MDX files are read from disk (included via vercel.json includeFiles).
 */
export function buildLiveKnowledge(rootDir = process.cwd()) {
  const dataRoot = resolveDataRoot(rootDir)
  const now = Date.now()
  if (
    cachedKnowledge &&
    cachedRoot === dataRoot &&
    now - cachedKnowledgeAt < KNOWLEDGE_CACHE_MS
  ) {
    return cachedKnowledge
  }

  const projects = loadProjects(dataRoot)
  const articles = normalizeArticles(articlesData)
  const skills = compactSkills(liveContent.skills)
  const credentials = compactCredentials(liveContent.credentials)
  const achievements = Array.isArray(liveContent.achievements)
    ? liveContent.achievements.map((item) =>
        typeof item === 'string'
          ? item
          : item.title || item.name || JSON.stringify(item).slice(0, 120),
      )
    : []

  const profile = liveContent.profile || {}
  const knowledge = {
    source: 'live-portfolio-files',
    generatedAt: new Date().toISOString(),
    assistant: {
      name: 'Neura',
      role: "Portfolio assistant for Himanshu Salunke",
      tone: 'Clear, concise, accurate. Prefer short answers unless the user asks for a full list.',
    },
    profile: {
      fullName: profile.fullName,
      headline: profile.headline,
      location: profile.location,
      email: profile.email,
      secondaryEmail: profile.secondaryEmail,
      phone: profile.phone,
      linkedin: profile.linkedin,
      github: profile.github,
      availability: profile.availability,
      resumeUrl: profile.resumeUrl,
      portfolio: profile.portfolio,
    },
    experience: liveContent.experience,
    education: liveContent.education,
    storyTimeline: liveContent.storyTimeline,
    achievements,
    credentials,
    skills,
    skillCategories: liveContent.skillCategories,
    techStackGroups: liveContent.techStackGroups,
    portfolioSiteStack: liveContent.portfolioSiteStack,
    services: liveContent.services,
    siteNavigation: liveContent.siteNavigation,
    currentFocus,
    counts: {
      projects: projects.length,
      articles: articles.length,
      credentials: credentials.length,
      achievements: achievements.length,
      skills: skills.length,
    },
    projects,
    articles,
  }

  cachedKnowledge = knowledge
  cachedKnowledgeAt = now
  cachedRoot = dataRoot
  return knowledge
}

export function buildNeuraSystemPrompt(knowledge, options = {}) {
  const pagePath = typeof options.pagePath === 'string' ? options.pagePath : '/'
  const pageHint =
    typeof options.pageHint === 'string' && options.pageHint
      ? options.pageHint
      : `User is on ${pagePath}.`

  return [
    "You are Neura, the portfolio assistant for Himanshu Kishor Salunke's website.",
    'SCOPE LIMIT (strict - highest priority):',
    '- You may ONLY answer questions about Himanshu Salunke, his portfolio website, and content in the LIVE PORTFOLIO KNOWLEDGE below.',
    '- In scope: profile, experience, education, story, achievements, skills, projects, articles, services/pricing, certifications, contact, resume, current focus, and how this portfolio site works.',
    '- Out of scope: general knowledge, news, politics, math homework, coding help unrelated to his portfolio, other people, medical/legal advice, jokes/riddles, trivia, and any topic not tied to Himanshu or this website.',
    '- If the user asks anything outside scope, politely refuse in 1-3 short sentences. Do not answer the off-topic question at all.',
    '- Greetings and "who are you / what can you do" are allowed.',
    '',
    'Answer ONLY from the LIVE PORTFOLIO KNOWLEDGE JSON below. Never invent facts.',
    'Use exact values from knowledge for counts, contact details, prices, dates, titles, and URLs.',
    'Use prior chat turns when the user says "that", "his role", "those projects", or similar.',
    '',
    'SPEED / LENGTH (important):',
    '- Default to a tight answer: 2-6 short bullets or 2-4 sentences.',
    '- Do not pad with filler. Finish the answer fully - never cut a sentence mid-word.',
    '- For list questions, one compact line per item (title - one key point). Include every matching item.',
    '- For "how many" questions, answer with the number first, then at most one short line.',
    '',
    'PAGE CONTEXT:',
    `- Current pagePath: ${pagePath}`,
    `- ${pageHint}`,
    '- Acknowledge page context only when it helps.',
    '',
    'HIRE / FIT FLOW (when user wants to hire, collaborate, or assess fit):',
    '- Lead with profile.availability, then fit areas, then services/contact next steps.',
    '- Always include email, phone, /contact, and resume URL.',
    '',
    'COVERAGE RULES:',
    '- When asked how many, use counts.* only.',
    '- Phone: profile.phone. Email: profile.email (secondaryEmail only if asked).',
    '- Resume: profile.resumeUrl (/Himanshu_Salunke_Resume.pdf).',
    '- Story: storyTimeline. Skills: skills + skillCategories + techStackGroups.',
    '- End with a short Source line using a real path from siteNavigation (example: Source: /work).',
    '',
    'FORMATTING RULES:',
    '- Use Markdown: ### headings, - bullets, **bold** labels.',
    '- Use hyphen "-" only. Never use em dash or en dash.',
    '- Blank line between sections.',
    '- Never wrap the whole answer in one run-on sentence.',
    '',
    'PAGE ROUTING:',
    '- Job / employer / GrubPac / experience / education / certs / story → /about',
    '- Portfolio projects → /work (or /work/{id})',
    '- Freelance / pricing → /services',
    '- Skills / site stack → /developer',
    '- Articles → /articles',
    '- Contact / hire → /contact',
    '',
    'If asked to greet, invent a fresh short professional greeting.',
    'If a detail is missing, say so and suggest the best matching page.',
    '',
    'LIVE PORTFOLIO KNOWLEDGE:',
    JSON.stringify(knowledge),
  ].join('\n')
}
