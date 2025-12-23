// Client-side project API utilities
import { type Project } from './clientMdx'

// API base URL - use relative path for production, localhost for development
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api'

// Generic fetch function with error handling
async function apiFetch<T>(endpoint: string): Promise<T> {
  try {
    // Add cache-busting query parameter to ensure fresh data
    const cacheBuster = `?t=${Date.now()}`
    const url = `${API_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}t=${Date.now()}`

    const response = await fetch(url, {
      cache: 'no-store', // Disable browser cache
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error)
    throw error
  }
}

// Fetch all projects
export async function fetchAllProjects(): Promise<Project[]> {
  return apiFetch<Project[]>('/projects')
}

// Fetch project by slug
export async function fetchProject(slug: string): Promise<Project | null> {
  try {
    return await apiFetch<Project>(`/projects/${slug}`)
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
}

// Fetch featured projects
export async function fetchFeaturedProjects(): Promise<Project[]> {
  return apiFetch<Project[]>('/projects/featured')
}



// Fetch related projects
export async function fetchRelatedProjects(slug: string, limit: number = 3): Promise<Project[]> {
  return apiFetch<Project[]>(`/projects/${slug}/related?limit=${limit}`)
}

// Generate project metadata for SEO
export function generateProjectMetadata(project: any) {
  return {
    title: `${project.title} - Portfolio`,
    description: project.summary,
    keywords: project.techStack.join(', '),
    openGraph: {
      title: `${project.title} - Portfolio`,
      description: project.summary,
      image: `${process.env.NODE_ENV === 'production' ? 'https://himanshu-salunke.vercel.app' : 'http://localhost:3000'}/api/og/${project.slug}?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.summary)}&type=project&date=${project.date}&tags=${encodeURIComponent(project.techStack.join(','))}`,
      type: 'article',
      publishedTime: project.date,
      authors: ['Himanshu'],
      tags: project.techStack
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - Portfolio`,
      description: project.summary,
      image: `${process.env.NODE_ENV === 'production' ? 'https://himanshu-salunke.vercel.app' : 'http://localhost:3000'}/api/og/${project.slug}?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.summary)}&type=project&date=${project.date}&tags=${encodeURIComponent(project.techStack.join(','))}`
    }
  }
}
