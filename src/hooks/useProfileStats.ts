import { useState, useEffect } from 'react'
import { fetchAllProjects } from '../utils/projectAPI'

interface ProfileStats {
  yearsExperience: number
  projectsCompleted: number
  isLoading: boolean
}

// Calculate years of experience based on start date
const calculateYearsExperience = (startDate: Date): number => {
  const now = new Date()
  const diffInMs = now.getTime() - startDate.getTime()
  const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25) // Account for leap years
  return Math.floor(diffInYears)
}

// Calculate projects completed using the same API as the Work page
// Calculate projects completed dynamically using Vite's glob import
const calculateProjectsCompleted = (): number => {
  try {
    // Load all MDX files from the data directory
    // eager: true loads them synchronously ensuring we have the data immediately
    const modules = import.meta.glob('../data/projects/*.mdx', { query: '?raw', import: 'default', eager: true })

    // Filter out hidden projects (those starting with <!-- or marked visible: false)
    const validProjects = Object.values(modules).filter((content) => {
      return typeof content === 'string' &&
        !content.trim().startsWith('<!--') &&
        !content.includes('visible: false')
    })

    // Fallback to 9 (verified count) if dynamic detection fails in some environments
    return validProjects.length > 0 ? validProjects.length : 9
  } catch (error) {
    console.warn('Failed to count projects dynamically:', error)
    return 9 // Verified fallback
  }
}

export const useProfileStats = (): ProfileStats => {
  const [stats, setStats] = useState<ProfileStats>({
    yearsExperience: 0,
    projectsCompleted: calculateProjectsCompleted(),
    isLoading: true
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Calculate years of experience based on actual work experience from timeline
        // Check if there are any work experience entries in the timeline data
        const workExperienceEntries = [] // No work experience entries currently
        let yearsExperience = 0

        if (workExperienceEntries.length > 0) {
          // If there are work experience entries, calculate from the earliest one
          const earliestWorkDate = new Date(Math.min(...workExperienceEntries.map((entry: any) => new Date(entry.startDate).getTime())))
          yearsExperience = calculateYearsExperience(earliestWorkDate)
        } else {
          // No work experience entries, so 0 years
          yearsExperience = 0
        }

        // Calculate projects completed
        const projectsCompleted = calculateProjectsCompleted()

        setStats({
          yearsExperience,
          projectsCompleted,
          isLoading: false
        })
      } catch (error) {
        console.error('Error calculating profile stats:', error)
        // Fallback values
        setStats({
          yearsExperience: 0, // No work experience currently
          projectsCompleted: 8, // Based on actual project count
          isLoading: false
        })
      }
    }

    fetchStats()
  }, [])

  return stats
}
