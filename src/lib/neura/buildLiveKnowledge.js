import { existsSync, readdirSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import liveContent from '../../data/site/live-content.json' with { type: 'json' }
import currentFocus from '../../data/currentFocus.json' with { type: 'json' }

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

function articlesPathFor(rootDir) {
  const nested = join(rootDir, 'src/data/articles.ts')
  if (existsSync(nested)) return nested
  const flat = join(rootDir, 'data/articles.ts')
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
          excerpt: content.replace(/\s+/g, ' ').trim().slice(0, 280),
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

function loadArticles(rootDir) {
  try {
    const articlesPath = articlesPathFor(rootDir)
    if (!existsSync(articlesPath)) {
      console.error('Neura live knowledge: articles file missing at', articlesPath)
      return []
    }

    const raw = readFileSync(articlesPath, 'utf8')
    const marker = 'export const articles = '
    const start = raw.indexOf(marker)
    if (start < 0) return []

    const bracket = raw.indexOf('[', start)
    let depth = 0
    let end = bracket
    for (let i = bracket; i < raw.length; i += 1) {
      const ch = raw[i]
      if (ch === '[') depth += 1
      if (ch === ']') {
        depth -= 1
        if (depth === 0) {
          end = i + 1
          break
        }
      }
    }

    const literal = raw.slice(bracket, end)
    const articles = Function(`"use strict"; return (${literal});`)()
    if (!Array.isArray(articles)) return []

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      date: article.date,
      tags: article.tags || [],
      featured: Boolean(article.featured),
      link: article.link,
      page: '/articles',
    }))
  } catch (error) {
    console.error('Neura live knowledge: failed to load articles', error)
    return []
  }
}

/**
 * Builds Neura's knowledge snapshot from live portfolio sources.
 * JSON profile/services are imported (always available on Vercel).
 * Projects/articles are read from disk (included via vercel.json includeFiles).
 */
export function buildLiveKnowledge(rootDir = process.cwd()) {
  const dataRoot = resolveDataRoot(rootDir)
  const projects = loadProjects(dataRoot)
  const articles = loadArticles(dataRoot)

  return {
    source: 'live-portfolio-files',
    generatedAt: new Date().toISOString(),
    assistant: {
      name: 'Neura',
      role: "Professional portfolio assistant for Himanshu Salunke's website",
      tone: 'Clear, concise, professional, and helpful. Prefer 2-5 short sentences.',
    },
    profile: liveContent.profile,
    experience: liveContent.experience,
    education: liveContent.education,
    credentials: liveContent.credentials,
    services: liveContent.services,
    siteNavigation: liveContent.siteNavigation,
    faqHints: liveContent.faqHints,
    currentFocus,
    projects,
    articles,
  }
}

export function buildNeuraSystemPrompt(knowledge) {
  return [
    "You are Neura, a professional portfolio assistant for Himanshu Kishor Salunke's website.",
    'Answer ONLY using the LIVE portfolio knowledge JSON provided below. It is assembled from the website data files on each request.',
    'If the answer is not in the knowledge, say you do not know and suggest the best matching page from siteNavigation.',
    'Be clear, concise, and professional. Prefer 2-5 short sentences.',
    'Do not invent employers, dates, certificates, metrics, prices, or projects.',
    'Page routing rules (strict):',
    '- Current job, employer, GrubPac, "is he working", experience, education, certs, story → /about',
    '- Portfolio projects and case studies → /work (and project page paths when useful)',
    '- Freelance services, pricing, capabilities, how to book → /services (booking also /contact)',
    '- Tech stack → /developer',
    '- Articles → /articles',
    '- Hiring / email / collaboration → /contact',
    'Never suggest /work for employment or company questions.',
    'When asked about services or freelancing, use the services object (capabilities, pricing, process, booking).',
    'If asked to greet or introduce yourself, invent a fresh professional greeting each time - never reuse a fixed script.',
    '',
    'LIVE PORTFOLIO KNOWLEDGE:',
    JSON.stringify(knowledge),
  ].join('\n')
}
