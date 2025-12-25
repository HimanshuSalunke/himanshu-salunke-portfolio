import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const projectsDir = join(process.cwd(), 'src/data/projects')
    const files = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'))

    const projects = files
      .map(file => {
        const filePath = join(projectsDir, file)
        const fileContent = readFileSync(filePath, 'utf8')

        // Filter out commented/hidden projects
        if (fileContent.trim().startsWith('<!--')) {
          return null
        }

        const { data: frontmatter, content } = matter(fileContent)

        return {
          ...frontmatter,
          slug: frontmatter.id,
          content,
          readingTime: Math.ceil(content.split(' ').length / 200)
        }
      })
      .filter((project): project is NonNullable<typeof project> => project !== null)

    // Filter featured projects and sort by date
    const featuredProjects = projects
      .filter((project: any) => project.featured === true)
      .sort((a: any, b: any) => {
        const dateA = new Date(a.date || '2024-01-01')
        const dateB = new Date(b.date || '2024-01-01')
        return dateB.getTime() - dateA.getTime()
      })

    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).json(featuredProjects)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    res.status(500).json({ error: 'Failed to fetch featured projects' })
  }
}
