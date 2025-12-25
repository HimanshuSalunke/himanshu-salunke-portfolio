import { useState, useEffect } from 'react'

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
  repositories: number
  followers: number
  following: number
  isLoading: boolean
  error: string | null
}

interface LinkedInStats {
  connections: number
  articles: number
  followers: string | number
  isLoading: boolean
  error: string | null
}

export interface SocialStats {
  github: GitHubStats
  linkedin: LinkedInStats
}

// API base URL - use backend server for development, relative path for production
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000' : ''

// GitHub API - Using server-side proxy to avoid CORS and rate limiting issues
const fetchGitHubStats = async (username: string): Promise<GitHubStats> => {
  try {
    console.log('🔍 Fetching GitHub stats for:', username)

    // Use our consolidated social-stats API
    const response = await fetch(`${API_BASE_URL}/api/social-stats/github?username=${encodeURIComponent(username)}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub data: ${response.status}`)
    }

    const data = await response.json()
    console.log('GitHub API response data:', data)

    return {
      stars: data.stars || 0,
      forks: data.forks || 0,
      watchers: data.watchers || 0,
      repositories: data.repositories || 0,
      followers: data.followers || 0,
      following: data.following || 0,
      isLoading: false,
      error: data.error || null
    }
  } catch (error) {
    console.error('GitHub fetch error:', error)

    return {
      stars: 0,
      forks: 0,
      watchers: 0,
      repositories: 0,
      followers: 0,
      following: 0,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// LinkedIn - Limited API access, using your actual data
const fetchLinkedInStats = async (username: string): Promise<LinkedInStats> => {
  try {
    // LinkedIn API requires special permissions and is very restrictive
    // Using your actual LinkedIn data
    return {
      connections: 500, // Estimated connections
      articles: 40, // Based on your content
      followers: '25k+', // Your actual 25k+ followers
      isLoading: false,
      error: null
    }
  } catch (error) {
    return {
      connections: 0,
      articles: 0,
      followers: 0,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export const useSocialStats = () => {
  const [stats, setStats] = useState<SocialStats>({
    github: {
      stars: 0,
      forks: 0,
      watchers: 0,
      repositories: 0,
      followers: 0,
      following: 0,
      isLoading: true,
      error: null
    },
    linkedin: {
      connections: 0,
      articles: 0,
      followers: 0,
      isLoading: true,
      error: null
    }
  })

  useEffect(() => {
    const fetchAllStats = async () => {
      // Fetch GitHub stats (works with public API)
      const githubStats = await fetchGitHubStats('HimanshuSalunke')

      // Fetch LinkedIn stats (limited API access)
      const linkedinStats = await fetchLinkedInStats('himanshuksalunke')

      setStats({
        github: githubStats,
        linkedin: linkedinStats
      })
    }

    fetchAllStats()
  }, [])

  return stats
}



