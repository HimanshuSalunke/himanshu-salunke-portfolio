import { useState, useEffect } from 'react'

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
  lastCommit: string
  languages: { [key: string]: number }
  isLoading: boolean
  error: string | null
}

interface GitHubRepo {
  name: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  updated_at: string
  language: string
  languages_url: string
}

// API base URL - use backend server for development, relative path for production
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000' : ''

export const useGitHubStats = (username: string, repoName?: string) => {
  const [stats, setStats] = useState<GitHubStats>({
    stars: 0,
    forks: 0,
    watchers: 0,
    lastCommit: '',
    languages: {},
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats(prev => ({ ...prev, isLoading: true, error: null }))

        if (repoName) {
          // Fetch specific repository stats
          const [repoResponse, languagesResponse] = await Promise.all([
            fetch(`https://api.github.com/repos/${username}/${repoName}`),
            fetch(`https://api.github.com/repos/${username}/${repoName}/languages`)
          ])

          if (!repoResponse.ok || !languagesResponse.ok) {
            throw new Error('Failed to fetch repository data')
          }

          const repoData: GitHubRepo = await repoResponse.json()
          const languagesData = await languagesResponse.json()

          setStats({
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            watchers: repoData.watchers_count,
            lastCommit: repoData.updated_at,
            languages: languagesData,
            isLoading: false,
            error: null
          })
        } else {
          // Fetch user's total stats using our proxy
          const response = await fetch(`${API_BASE_URL}/api/social-stats/github?username=${encodeURIComponent(username)}`)
          
          if (!response.ok) {
            throw new Error('Failed to fetch user repositories')
          }

          const userData = await response.json()
          
          setStats({
            stars: userData.stars || 0,
            forks: userData.forks || 0,
            watchers: userData.watchers || 0,
            lastCommit: new Date().toISOString(), // Mock last commit time
            languages: {}, // Languages would need separate API call
            isLoading: false,
            error: userData.error || null
          })
        }
      } catch (error) {
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }))
      }
    }

    if (username) {
      fetchStats()
    }
  }, [username, repoName])

  return stats
}
