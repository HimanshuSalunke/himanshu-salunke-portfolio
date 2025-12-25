import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'




export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Original projects API functionality
  try {
    const { featured, slug } = req.query

    const projectsDir = join(process.cwd(), 'src/data/projects')
    const files = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'))

    const projects = files
      .map(file => {
        const filePath = join(projectsDir, file)
        const fileContent = readFileSync(filePath, 'utf8')

        // Filter out commented/hidden projects
        // Projects are hidden by wrapping frontmatter in HTML comments
        const trimmedContent = fileContent.trim()
        if (trimmedContent.startsWith('<!--')) {
          console.log(`[API] Filtering out commented project: ${file}`)
          return null
        }

        // Try to parse frontmatter - if it fails or is empty, skip
        let frontmatter, content
        try {
          const parsed = matter(fileContent)
          frontmatter = parsed.data
          content = parsed.content
        } catch (error) {
          console.log(`[API] Error parsing frontmatter for ${file}:`, error)
          return null
        }

        // Additional safety check: if frontmatter is missing required fields, skip
        if (!frontmatter || !frontmatter.id || !frontmatter.title) {
          console.log(`[API] Filtering out project with missing frontmatter: ${file}`)
          return null
        }

        // Double-check: if the file content suggests it's commented, skip
        if (fileContent.includes('COMMENTED OUT PROJECT') || fileContent.includes('COMMENTED OUT -')) {
          console.log(`[API] Filtering out project marked as commented: ${file}`)
          return null
        }

        return {
          ...frontmatter,
          slug: frontmatter.id,
          content,
          readingTime: Math.ceil(content.split(' ').length / 200)
        }
      })
      .filter((project): project is NonNullable<typeof project> => project !== null)

    console.log(`[API] Total projects after filtering: ${projects.length}`)

    // Handle specific project by slug
    if (slug && typeof slug === 'string') {
      const project = projects.find(p => p.slug === slug)
      if (!project) {
        return res.status(404).json({ error: 'Project not found' })
      }
      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).json(project)
    }

    // Handle featured projects filter
    if (featured === 'true') {
      const featuredProjects = projects
        .filter((project: any) => project.featured === true)
        .sort((a: any, b: any) => {
          const dateA = new Date(a.date || '2024-01-01')
          const dateB = new Date(b.date || '2024-01-01')
          return dateB.getTime() - dateA.getTime()
        })

      res.setHeader('Cache-Control', 'public, max-age=3600')
      return res.status(200).json(featuredProjects)
    }

    // Return all projects sorted by date
    const sortedProjects = projects.sort((a: any, b: any) => {
      const dateA = new Date(a.date || '2024-01-01')
      const dateB = new Date(b.date || '2024-01-01')
      return dateB.getTime() - dateA.getTime()
    })

    // Disable cache temporarily to ensure fresh data
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    res.status(200).json(sortedProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
}
