/** Neura portfolio-agent UX helpers (follow-ups, starters, offline FAQ, tracking). */

export const THREAD_STORAGE_KEY = 'neura-thread-v1'
export const FEEDBACK_STORAGE_PREFIX = 'neura-feedback:'

export type NeuraQuickAction = {
  id: string
  label: string
  href?: string
  prompt?: string
  copyText?: string
}

export const STARTER_CHIPS: { label: string; prompt: string }[] = [
  { label: 'Current role', prompt: 'What is Himanshu working on right now, and where?' },
  { label: 'Best projects', prompt: 'What are his strongest portfolio projects I should look at?' },
  { label: 'Skills fit', prompt: 'Summarize his skills for a backend or AI/ML hiring manager.' },
  { label: 'Hire / freelance', prompt: 'I want to hire Himanshu. How do pricing, booking, and contact work?' },
  { label: 'Resume', prompt: 'Where can I download his resume?' },
  { label: 'Contact', prompt: 'How can I contact Himanshu - email, phone, LinkedIn?' },
]

export const QUICK_ACTIONS: NeuraQuickAction[] = [
  { id: 'resume', label: 'Resume', href: '/Himanshu_Salunke_Resume.pdf' },
  { id: 'contact', label: 'Contact', href: '/contact' },
  { id: 'work', label: 'Work', href: '/work' },
  { id: 'services', label: 'Services', href: '/services' },
  {
    id: 'copy-email',
    label: 'Copy email',
    copyText: 'contact.himanshusalunke@gmail.com',
  },
  {
    id: 'copy-phone',
    label: 'Copy phone',
    copyText: '+91-9860553332',
  },
]

const FOLLOW_UP_MAP: { match: RegExp; chips: string[] }[] = [
  {
    match: /hire|freelance|pricing|book|budget|services/i,
    chips: [
      'What are the pricing tiers?',
      'How does payment and booking work?',
      'What can he build for AI or data projects?',
    ],
  },
  {
    match: /resume|cv/i,
    chips: ['Summarize his experience for recruiters', 'What are his top skills?', 'How do I contact him?'],
  },
  {
    match: /contact|email|phone|linkedin|call/i,
    chips: ['Where is the contact form?', 'Is he available for freelance?', 'Share his resume link'],
  },
  {
    match: /project|work|portfolio|case study/i,
    chips: [
      'Which project is best for computer vision?',
      'Which project shows backend or cloud skills?',
      'How many projects are on the site?',
    ],
  },
  {
    match: /skill|stack|tech|developer/i,
    chips: [
      'What is his backend stack at work?',
      'Does he know Microsoft Fabric?',
      'What is this portfolio site built with?',
    ],
  },
  {
    match: /job|employ|grubpac|experience|working/i,
    chips: ['What is his education background?', 'Any certifications?', 'Tell me about his achievements'],
  },
  {
    match: /article|blog|writ/i,
    chips: ['How many articles has he written?', 'What topics does he write about?', 'Where are the articles?'],
  },
]

const DEFAULT_FOLLOW_UPS = [
  'What is his current job?',
  'Show me standout projects',
  'How do I hire or contact him?',
]

export function getFollowUpChips(lastUserText: string, lastAssistantText: string): string[] {
  const hay = `${lastUserText}\n${lastAssistantText}`
  for (const row of FOLLOW_UP_MAP) {
    if (row.match.test(hay)) return row.chips.slice(0, 3)
  }
  return DEFAULT_FOLLOW_UPS
}

export function extractPortfolioLinks(text: string): { href: string; label: string }[] {
  const found = new Map<string, string>()
  const add = (href: string, label: string) => {
    if (!found.has(href)) found.set(href, label)
  }

  for (const m of text.matchAll(/\/work\/[a-z0-9-]+/gi)) {
    add(m[0], `Project: ${m[0].replace('/work/', '').replace(/-/g, ' ')}`)
  }
  if (/\/Himanshu_Salunke_Resume\.pdf/i.test(text)) add('/Himanshu_Salunke_Resume.pdf', 'Download resume')
  if (/\b\/contact\b/i.test(text)) add('/contact', 'Open contact')
  if (/\b\/work\b/i.test(text)) add('/work', 'Browse work')
  if (/\b\/services\b/i.test(text)) add('/services', 'View services')
  if (/\b\/about\b/i.test(text)) add('/about', 'About Himanshu')
  if (/\b\/articles\b/i.test(text)) add('/articles', 'Articles')
  if (/\b\/developer\b/i.test(text)) add('/developer', 'Tech stack')

  return [...found.entries()].slice(0, 4).map(([href, label]) => ({ href, label }))
}

export function pageContextHint(pathname: string): string {
  const map: Record<string, string> = {
    '/': 'User is on Home.',
    '/about': 'User is on About - prefer career, education, story, certs.',
    '/work': 'User is on Work - prefer projects and case studies.',
    '/services': 'User is on Services - prefer capabilities, pricing, booking.',
    '/developer': 'User is on Developer - prefer skills and site stack.',
    '/articles': 'User is on Articles - prefer writing topics and counts.',
    '/contact': 'User is on Contact - prefer email, phone, forms, response time.',
  }
  if (map[pathname]) return map[pathname]
  if (pathname.startsWith('/work/') || pathname.startsWith('/projects/')) {
    return `User is viewing project page ${pathname} - relate answers to that project when relevant.`
  }
  return `User is on ${pathname}.`
}

export const OFFLINE_FAQ =
  'I could not reach the AI service right now. Quick facts while I recover:\n\n' +
  '- Email: contact.himanshusalunke@gmail.com\n' +
  '- Phone: +91-9860553332\n' +
  '- Resume: /Himanshu_Salunke_Resume.pdf\n' +
  '- Contact form: /contact\n' +
  '- Services: /services\n\n' +
  'Please try again in a moment.'

export function trackNeuraEvent(name: string, props?: Record<string, unknown>) {
  try {
    const va = (
      window as Window & { va?: { track?: (n: string, p?: Record<string, unknown>) => void } }
    ).va
    va?.track?.(name, props)
  } catch {
    // ignore
  }
}

export type PersistedChatMessage = {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export function loadPersistedThread(): PersistedChatMessage[] {
  try {
    const raw = localStorage.getItem(THREAD_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (m): m is PersistedChatMessage =>
          !!m &&
          typeof m === 'object' &&
          typeof (m as PersistedChatMessage).id === 'string' &&
          ((m as PersistedChatMessage).role === 'user' ||
            (m as PersistedChatMessage).role === 'assistant') &&
          typeof (m as PersistedChatMessage).text === 'string' &&
          (m as PersistedChatMessage).text.trim().length > 0,
      )
      .slice(-40)
  } catch {
    return []
  }
}

export function savePersistedThread(messages: PersistedChatMessage[]) {
  try {
    const slim = messages
      .filter((m) => m.text.trim().length > 0)
      .slice(-40)
      .map((m) => ({ id: m.id, role: m.role, text: m.text }))
    localStorage.setItem(THREAD_STORAGE_KEY, JSON.stringify(slim))
  } catch {
    // ignore quota
  }
}

export function clearPersistedThread() {
  try {
    localStorage.removeItem(THREAD_STORAGE_KEY)
  } catch {
    // ignore
  }
}
