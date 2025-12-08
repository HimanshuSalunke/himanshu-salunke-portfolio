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

// interface LeetCodeStats {
//   totalSolved: number
//   easySolved: number
//   mediumSolved: number
//   hardSolved: number
//   ranking: number
//   contestRating: number
//   isLoading: boolean
//   error: string | null
// }

interface CodeChefStats {
  rating: number
  stars: number
  problemsSolved: number
  globalRank: number
  countryRank: number
  isLoading: boolean
  error: string | null
}

interface LinkedInStats {
  connections: number
  articles: number
  followers: number
  isLoading: boolean
  error: string | null
}

interface TwitterStats {
  followers: number
  following: number
  tweets: number
  verified: boolean
  isLoading: boolean
  error: string | null
}

interface SocialStats {
  github: GitHubStats
  // leetcode: LeetCodeStats
  codechef: CodeChefStats
  linkedin: LinkedInStats
  twitter: TwitterStats
}

// API base URL - use backend server for development, relative path for production
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000' : ''

// GitHub API - Using server-side proxy to avoid CORS and rate limiting issues
const fetchGitHubStats = async (username: string): Promise<GitHubStats> => {
  try {
    console.log('🔍 Fetching GitHub stats for:', username)
    
    // Use our consolidated social-stats API
    const response = await fetch(`${API_BASE_URL}/api/social-stats?platform=github&username=${encodeURIComponent(username)}`)

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

// LeetCode API - Commented out
// const fetchLeetCodeStats = async (username: string): Promise<LeetCodeStats> => {
//   try {
//     console.log('🔍 Fetching LeetCode stats for:', username)
//     
//     // Use our consolidated social-stats API
//     const response = await fetch(`${API_BASE_URL}/api/social-stats?platform=leetcode&username=${encodeURIComponent(username)}`)

//     if (!response.ok) {
//       throw new Error(`Failed to fetch LeetCode data: ${response.status}`)
//     }

//     const data = await response.json()
//     console.log('LeetCode API response data:', data)

//     return {
//       totalSolved: data.totalSolved || 0,
//       easySolved: data.easySolved || 0,
//       mediumSolved: data.mediumSolved || 0,
//       hardSolved: data.hardSolved || 0,
//       ranking: data.ranking || 0,
//       contestRating: data.contestRating || 0,
//       isLoading: false,
//       error: data.error || null
//     }
//   } catch (error) {
//     console.error('LeetCode fetch error:', error)
//     
//     return {
//       totalSolved: 0,
//       easySolved: 0,
//       mediumSolved: 0,
//       hardSolved: 0,
//       ranking: 0,
//       contestRating: 0,
//       isLoading: false,
//       error: error instanceof Error ? error.message : 'Unknown error'
//     }
//   }
// }

// CodeChef API - Using server-side proxy to avoid CORS issues
const fetchCodeChefStats = async (username: string): Promise<CodeChefStats> => {
  try {
    console.log('🔍 Fetching CodeChef stats for:', username)
    
    // Use our consolidated social-stats API
    const response = await fetch(`${API_BASE_URL}/api/social-stats?platform=codechef&username=${encodeURIComponent(username)}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch CodeChef data: ${response.status}`)
    }

    const data = await response.json()
    console.log('CodeChef API response data:', data)

    return {
      rating: data.rating || 0,
      stars: data.stars || 0,
      problemsSolved: data.problemsSolved || 0,
      globalRank: data.globalRank || 0,
      countryRank: data.countryRank || 0,
      isLoading: false,
      error: data.error || null
    }
  } catch (error) {
    console.error('CodeChef fetch error:', error)
    
    return {
      rating: 0,
      stars: 0,
      problemsSolved: 0,
      globalRank: 0,
      countryRank: 0,
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
      followers: 22000, // Your actual 22k+ followers
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

// Twitter/X API - Using server-side proxy to avoid CORS issues
const fetchTwitterStats = async (username: string): Promise<TwitterStats> => {
  try {
    console.log('🔍 Fetching Twitter stats for:', username)
    
    // Use our consolidated social-stats API
    const response = await fetch(`${API_BASE_URL}/api/social-stats?platform=twitter&username=${encodeURIComponent(username)}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch Twitter data: ${response.status}`)
    }

    const data = await response.json()
    console.log('Twitter API response data:', data)

    return {
      followers: data.followers || 0,
      following: data.following || 0,
      tweets: data.tweets || 0,
      verified: data.verified || false,
      isLoading: false,
      error: data.error || null
    }
  } catch (error) {
    console.error('Twitter fetch error:', error)
    
    return {
      followers: 0,
      following: 0,
      tweets: 0,
      verified: false,
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
    // leetcode: {
    //   totalSolved: 0,
    //   easySolved: 0,
    //   mediumSolved: 0,
    //   hardSolved: 0,
    //   ranking: 0,
    //   contestRating: 0,
    //   isLoading: true,
    //   error: null
    // },
    codechef: {
      rating: 0,
      stars: 0,
      problemsSolved: 0,
      globalRank: 0,
      countryRank: 0,
      isLoading: true,
      error: null
    },
    linkedin: {
      connections: 0,
      articles: 0,
      followers: 0,
      isLoading: true,
      error: null
    },
    twitter: {
      followers: 0,
      following: 0,
      tweets: 0,
      verified: false,
      isLoading: true,
      error: null
    }
  })

  useEffect(() => {
    const fetchAllStats = async () => {
      // Fetch GitHub stats (works with public API)
      const githubStats = await fetchGitHubStats('HimanshuSalunke')
      
      // Fetch LeetCode stats (commented out)
      // const leetcodeStats = await fetchLeetCodeStats('himanshusalunke')
      
      // Fetch CodeChef stats (now using server-side proxy)
      const codechefStats = await fetchCodeChefStats('himanshuksalunke')
      
      // Fetch LinkedIn stats (limited API access)
      const linkedinStats = await fetchLinkedInStats('himanshuksalunke')
      
      // Fetch Twitter stats (now using server-side proxy)
      const twitterStats = await fetchTwitterStats('Wiser_0221')

      setStats({
        github: githubStats,
        // leetcode: leetcodeStats,
        codechef: codechefStats,
        linkedin: linkedinStats,
        twitter: twitterStats
      })
    }

    fetchAllStats()
  }, [])

  return stats
}

// Individual hooks for specific platforms
export const useGitHubStats = (username: string) => {
  const [stats, setStats] = useState<GitHubStats>({
    stars: 0,
    forks: 0,
    watchers: 0,
    repositories: 0,
    followers: 0,
    following: 0,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchStats = async () => {
      const result = await fetchGitHubStats(username)
      setStats(result)
    }

    fetchStats()
  }, [username])

  return stats
}

// export const useLeetCodeStats = (username: string) => {
//   const [stats, setStats] = useState<LeetCodeStats>({
//     totalSolved: 0,
//     easySolved: 0,
//     mediumSolved: 0,
//     hardSolved: 0,
//     ranking: 0,
//     contestRating: 0,
//     isLoading: true,
//     error: null
//   })

//   useEffect(() => {
//     const fetchStats = async () => {
//       const result = await fetchLeetCodeStats(username)
//       setStats(result)
//     }

//     fetchStats()
//   }, [username])

//   return stats
// }
