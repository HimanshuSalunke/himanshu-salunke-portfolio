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
    const { limit = '3' } = req.query
    
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
    
    // Find current project
    const currentProject = projects.find(p => p.slug === slug)
    
    if (!currentProject) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    // Get related projects (excluding current project)
    const relatedProjects = projects
      .filter(p => p.slug !== slug)
      .sort((a, b) => {
        // Simple similarity based on shared tech stack
        const aSharedTech = a.techStack?.filter((tech: string) => 
          currentProject.techStack?.includes(tech)
        ).length || 0
        const bSharedTech = b.techStack?.filter((tech: string) => 
          currentProject.techStack?.includes(tech)
        ).length || 0
        
        if (aSharedTech !== bSharedTech) {
          return bSharedTech - aSharedTech
        }
        
        // If same tech similarity, sort by date
        const dateA = new Date(a.date || '2024-01-01')
        const dateB = new Date(b.date || '2024-01-01')
        return dateB.getTime() - dateA.getTime()
      })
      .slice(0, parseInt(limit as string))
    
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.status(200).json(relatedProjects)
  } catch (error) {
    console.error('Error fetching related projects:', error)
    res.status(500).json({ error: 'Failed to fetch related projects' })
  }
}
