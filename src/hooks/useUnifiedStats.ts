import { useState, useEffect } from 'react'
import { useProfileStats } from './useProfileStats'
import { useSocialStats } from './useSocialStats'
import { useArticleStatistics } from './useArticleStatistics'
import { articles } from '../data/articles'

interface UnifiedStats {
  // Profile Stats
  projectsCompleted: number
  yearsExperience: number
  technologiesMastered: number
  
  // Social Stats
  githubStars: number
  githubRepositories: number
  githubFollowers: number
  linkedinFollowers: number
  
  // Article Stats
  totalArticles: number
  
  // Loading States
  isLoading: boolean
  error: string | null
}

export const useUnifiedStats = (): UnifiedStats => {
  const [stats, setStats] = useState<UnifiedStats>({
    projectsCompleted: 0,
    yearsExperience: 0,
    technologiesMastered: 40, // Static count from your tech stack
    githubStars: 0,
    githubRepositories: 0,
    githubFollowers: 0,
    linkedinFollowers: 0,
    totalArticles: 0,
    isLoading: true,
    error: null
  })

  const profileStats = useProfileStats()
  const socialStats = useSocialStats()

  useEffect(() => {
    setStats({
      // Profile Stats
      projectsCompleted: profileStats.projectsCompleted,
      yearsExperience: profileStats.yearsExperience,
      technologiesMastered: 40, // From your tech stack count
      
      // Social Stats
      githubStars: socialStats.github.stars || 0,
      githubRepositories: socialStats.github.repositories || 0,
      githubFollowers: socialStats.github.followers || 0,
      linkedinFollowers: socialStats.linkedin.followers || 0,
      
      // Article Stats
      totalArticles: articles.length,
      
      // Loading States
      isLoading: profileStats.isLoading || socialStats.github.isLoading,
      error: socialStats.github.error
    })
  }, [profileStats, socialStats])

  return stats
}
