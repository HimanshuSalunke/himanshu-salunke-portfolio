import { existsSync, readdirSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import liveContent from '../../data/site/live-content.json' with { type: 'json' }
import currentFocus from '../../data/currentFocus.json' with { type: 'json' }
import articlesData from '../../data/articles.json' with { type: 'json' }

const MODULE_DIR = dirname(fileURLToPath(import.meta.url))

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
        const { data, content } = matter(fileContent)
        return {
          id: data.id,
          title: data.title,
          summary: data.summary,
          category: data.category,
          date: data.date,
          techStack: data.techStack || [],
          featured: Boolean(data.featured),
          status: data.status || null,
          metrics: data.metrics || [],
          githubUrl: data.githubUrl || null,
          liveUrl: data.liveUrl || null,
          page: `/work/${data.id}`,
          excerpt: content.replace(/\s+/g, ' ').trim().slice(0, 700),
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

function normalizeArticles(rawArticles) {
  if (!Array.isArray(rawArticles)) return []
  return rawArticles.map((article) => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    date: article.date,
    tags: article.tags || [],
    featured: Boolean(article.featured),
    readTime: article.readTime || null,
    link: article.link,
    page: '/articles',
  }))
}

/**
 * Builds Neura's knowledge snapshot from live portfolio sources.
 * JSON files are imported (always available on Vercel).
 * Project MDX files are read from disk (included via vercel.json includeFiles).
 */
export function buildLiveKnowledge(rootDir = process.cwd()) {
  const dataRoot = resolveDataRoot(rootDir)
  const projects = loadProjects(dataRoot)
  const articles = normalizeArticles(articlesData)
  const skills = Array.isArray(liveContent.skills) ? liveContent.skills : []
  const credentials = Array.isArray(liveContent.credentials) ? liveContent.credentials : []
  const achievements = Array.isArray(liveContent.achievements) ? liveContent.achievements : []

  return {
    source: 'live-portfolio-files',
    generatedAt: new Date().toISOString(),
    assistant: {
      name: 'Neura',
      role: "Professional portfolio assistant for Himanshu Salunke's website",
      tone: 'Clear, structured, professional, and complete. Match answer depth and formatting to the question.',
    },
    profile: liveContent.profile,
    experience: liveContent.experience,
    education: liveContent.education,
    storyTimeline: liveContent.storyTimeline,
    achievements,
    mission: liveContent.mission,
    values: liveContent.values,
    interests: liveContent.interests,
    shortTermGoals: liveContent.shortTermGoals,
    learningNow: liveContent.learningNow,
    techStackGroups: liveContent.techStackGroups,
    closingQuote: liveContent.closingQuote,
    credentials,
    skills,
    skillCategories: liveContent.skillCategories,
    portfolioSiteStack: liveContent.portfolioSiteStack,
    metrics: liveContent.metrics,
    projectCategories: liveContent.projectCategories,
    forms: liveContent.forms,
    services: liveContent.services,
    siteNavigation: liveContent.siteNavigation,
    faqHints: liveContent.faqHints,
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
}

export function buildNeuraSystemPrompt(knowledge) {
  return [
    "You are Neura, the portfolio assistant for Himanshu Kishor Salunke's website.",
    'SCOPE LIMIT (strict - highest priority):',
    '- You may ONLY answer questions about Himanshu Salunke, his portfolio website, and content in the LIVE PORTFOLIO KNOWLEDGE below.',
    '- In scope: profile, experience, education, story, achievements, skills, projects, articles, services/pricing, certifications, contact, resume, current focus, and how this portfolio site works.',
    '- Out of scope: general knowledge, news, politics, math homework, coding help unrelated to his portfolio, other people, medical/legal advice, jokes/riddles, trivia, and any topic not tied to Himanshu or this website.',
    '- If the user asks anything outside scope, politely refuse in 1-3 short sentences. Do not answer the off-topic question at all.',
    '- Off-topic refusal template: explain you only help with Himanshu and this portfolio, then invite a portfolio-related question (experience, projects, skills, services, contact, articles).',
    '- Greetings and "who are you / what can you do" are allowed.',
    '',
    'Answer ONLY from the LIVE PORTFOLIO KNOWLEDGE JSON below. Never invent facts.',
    'Use exact values from knowledge for counts, contact details, prices, dates, titles, and URLs.',
    '',
    'COVERAGE RULES:',
    '- Treat the knowledge JSON as the full website. Prefer complete, accurate answers over vague summaries.',
    '- When asked for "all", "list", "every", or "complete", include every matching item from knowledge. Do not truncate early or invent a wrong total.',
    '- When asked how many, use counts.* only (projects, articles, credentials, achievements, skills).',
    '- Phone: share profile.phone when asked for a number/phone/call.',
    '- Email: prefer profile.email. Mention profile.secondaryEmail only if asked for another/alternate email.',
    '- Resume/CV: give profile.resumeUrl (/Himanshu_Salunke_Resume.pdf) and note it is also on the header and /about.',
    '- Story/background: use storyTimeline (including medical recovery details when relevant).',
    '- Skills: use skills + skillCategories + techStackGroups. Group by category when listing many skills.',
    '- This website stack: use portfolioSiteStack when asked what the portfolio is built with.',
    '- End with a short page pointer when useful (from siteNavigation).',
    '',
    'FORMATTING RULES (mandatory):',
    '- Match format to the question. Do not dump one long paragraph for list/detail questions.',
    '- Use clean Markdown only: short headings (###), bullet lists (-), numbered lists (1.), and **bold** for key labels.',
    '- Use hyphen "-" only. Never use em dash or en dash.',
    '- Keep a blank line between sections.',
    '- For simple contact/yes-no questions: 2-4 short sentences is enough.',
    '- For list questions (articles, projects, skills, certs, pricing): use this pattern:',
    '  ### Title with total count',
    '  - Item one',
    '  - Item two',
    '  Then one short closing line with the best page link.',
    '- For project deep-dives: ### Project name, then bullets for summary, category, stack, metrics, links, and page.',
    '- For services/pricing: separate sections for capabilities, pricing tiers, process, and booking.',
    '- For experience/education/story: chronological bullets with period, title, and key detail.',
    '- For contact questions: clearly label Email, Phone, LinkedIn, Resume, and Response time on separate bullets.',
    '- Never wrap the whole answer in one run-on sentence with many " - " separators.',
    '',
    'PAGE ROUTING (strict):',
    '- Job / employer / GrubPac / experience / education / certs / story / achievements / mission → /about',
    '- Portfolio projects → /work (or /work/{id})',
    '- Freelance services / pricing / booking → /services (or /contact)',
    '- Tech stack / skills / site architecture → /developer',
    '- Articles → /articles',
    '- Hiring / email / phone / collaborate → /contact',
    '- Never suggest /work for employment questions.',
    '',
    'If asked to greet or introduce yourself, invent a fresh professional greeting each time.',
    'If something is truly missing from knowledge, say you do not have that detail and suggest the best matching page.',
    '',
    'LIVE PORTFOLIO KNOWLEDGE:',
    JSON.stringify(knowledge),
  ].join('\n')
}
