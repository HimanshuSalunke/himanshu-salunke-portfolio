import { VercelRequest, VercelResponse } from '@vercel/node'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

interface Project {
  id: string
  slug: string
  title: string
  summary: string
  category: string
  coverImage: string
  date: string
  techStack: string[]
  featured: boolean
  status: string
  content: string
  readingTime: number
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const slug = req.query.slug as string
    
    if (!slug) {
      return res.status(400).json({ error: 'Project slug is required' })
    }
    
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
      } as Project
    })
      .filter((project): project is Project => project !== null)
    
    // Find project by slug
    const project = projects.find(p => p.slug === slug)
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
}
