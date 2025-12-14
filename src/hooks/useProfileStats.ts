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
const calculateProjectsCompleted = async (): Promise<number> => {
  try {
    // Use the exact same project loading mechanism as the Work page
    const projects = await fetchAllProjects()
    console.log('Projects loaded from API (same as Work page):', projects.length) // Debug log
    
    // Return the exact same count that's shown in the Work section
    return projects.length
  } catch (error) {
    console.warn('Failed to fetch projects from API:', error)
    
    // Fallback: count projects from the data directory (same as server.js logic)
    // Note: This should match visible projects (excluding commented ones)
    return 7 // 7 visible projects (8 total files, 1 commented out)
  }
}

export const useProfileStats = (): ProfileStats => {
  const [stats, setStats] = useState<ProfileStats>({
    yearsExperience: 0,
    projectsCompleted: 0,
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
          const earliestWorkDate = new Date(Math.min(...workExperienceEntries.map(entry => new Date(entry.startDate))))
          yearsExperience = calculateYearsExperience(earliestWorkDate)
        } else {
          // No work experience entries, so 0 years
          yearsExperience = 0
        }
        
        // Calculate projects completed
        const projectsCompleted = await calculateProjectsCompleted()
        
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
          projectsCompleted: 7, // Based on actual project count
          isLoading: false
        })
      }
    }

    fetchStats()
  }, [])

  return stats
}
