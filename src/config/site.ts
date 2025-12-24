// Site configuration for meta data and SEO
export const SITE_CONFIG = {
  name: "Himanshu's Portfolio",
  author: "Himanshu",
  twitterHandle: "@Wiser_0221",
  description: "Portfolio showcasing modern data science projects and AI/ML solutions",
  url: process.env.NODE_ENV === 'production'
    ? 'https://himanshu-salunke.vercel.app' // Update with actual domain
    : 'http://localhost:3000',
  themeColor: "#3b82f6",
  language: "en"
} as const

// Helper function to get current URL safely
export const getCurrentUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return SITE_CONFIG.url
}
