import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { platform, username } = req.query

    if (!platform || !username || typeof platform !== 'string' || typeof username !== 'string') {
      return res.status(400).json({ error: 'Platform and username are required' })
    }

    let result: any = {}

    switch (platform.toLowerCase()) {
      case 'github':
        result = await fetchGitHubStats(username)
        break
      // case 'leetcode':
      //   result = await fetchLeetCodeStats(username)
      //   break
      case 'codechef':
        result = await fetchCodeChefStats(username)
        break
      case 'twitter':
        result = await fetchTwitterStats(username)
        break
      default:
        return res.status(400).json({ error: 'Unsupported platform' })
    }

    res.status(200).json(result)
  } catch (error) {
    console.error(`Social stats API error:`, error)
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      isLoading: false
    })
  }
}

async function fetchGitHubStats(username: string) {
  const [userResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'himanshu-portfolio-website',
        'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : undefined
      }
    }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'himanshu-portfolio-website',
        'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : undefined
      }
    })
  ])

  if (!userResponse.ok || !reposResponse.ok) {
    throw new Error(`GitHub API error: ${userResponse.status}`)
  }

  const userData = await userResponse.json()
  const reposData = await reposResponse.json()

  const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
  const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0)
  const totalWatchers = reposData.reduce((acc: number, repo: any) => acc + repo.watchers_count, 0)

  return {
    stars: totalStars,
    forks: totalForks,
    watchers: totalWatchers,
    repositories: userData.public_repos,
    followers: userData.followers,
    following: userData.following,
    isLoading: false,
    error: null
  }
}

// async function fetchLeetCodeStats(username: string) {
//   const query = `
//     query getUserProfile($username: String!) {
//       matchedUser(username: $username) {
//         submitStats {
//           acSubmissionNum {
//             difficulty
//             count
//             submissions
//           }
//         }
//         profile {
//           ranking
//         }
//       }
//       userContestRanking(username: $username) {
//         rating
//       }
//     }
//   `

//   const response = await fetch('https://leetcode.com/graphql/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
//       'Referer': 'https://leetcode.com/',
//       'Origin': 'https://leetcode.com'
//     },
//     body: JSON.stringify({
//       query,
//       variables: { username }
//     })
//   })

//   if (!response.ok) {
//     // Try alternative API as fallback
//     try {
//       const altResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
//       
//       if (altResponse.ok) {
//         const altData = await altResponse.json()
//         
//         return {
//           totalSolved: altData.totalSolved || 0,
//           easySolved: altData.easySolved || 0,
//           mediumSolved: altData.mediumSolved || 0,
//           hardSolved: altData.hardSolved || 0,
//           ranking: altData.ranking || 0,
//           contestRating: altData.contestRating || 0,
//           isLoading: false,
//           error: null
//         }
//       }
//     } catch (altError) {
//       console.error('Alternative LeetCode API also failed:', altError)
//     }
//     
//     throw new Error(`LeetCode API error: ${response.status}`)
//   }

//   const data = await response.json()
//   
//   if (data.errors) {
//     throw new Error(`GraphQL errors: ${data.errors.map((e: any) => e.message).join(', ')}`)
//   }
//   
//   const user = data.data?.matchedUser
//   const contestRanking = data.data?.userContestRanking

//   if (!user) {
//     throw new Error('User not found in LeetCode API')
//   }

//   const submissions = user.submitStats?.acSubmissionNum || []
//   const totalSolved = submissions.find((s: any) => s.difficulty === 'All')?.count || 0
//   const easySolved = submissions.find((s: any) => s.difficulty === 'Easy')?.count || 0
//   const mediumSolved = submissions.find((s: any) => s.difficulty === 'Medium')?.count || 0
//   const hardSolved = submissions.find((s: any) => s.difficulty === 'Hard')?.count || 0

//   return {
//     totalSolved,
//     easySolved,
//     mediumSolved,
//     hardSolved,
//     ranking: user.profile?.ranking || 0,
//     contestRating: contestRanking?.rating || 0,
//     isLoading: false,
//     error: null
//   }
// }

async function fetchCodeChefStats(username: string) {
  try {
    const response = await fetch(`https://competitive-coding-api.herokuapp.com/api/codechef/${username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`CodeChef API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === 'Failed' || data.status === 'ERROR') {
      throw new Error(data.details || 'User not found or API error')
    }

    return {
      rating: data.rating || 0,
      stars: data.stars || 0,
      problemsSolved: data.fully_solved || 0,
      globalRank: data.global_rank || 0,
      countryRank: data.country_rank || 0,
      isLoading: false,
      error: null
    }
  } catch (error) {
    // Try alternative approach
    try {
      const altResponse = await fetch(`https://codechef-api.vercel.app/${username}`)
      
      if (altResponse.ok) {
        const altData = await altResponse.json()
        
        return {
          rating: altData.rating || 0,
          stars: altData.stars || 0,
          problemsSolved: altData.problemsSolved || 0,
          globalRank: altData.globalRank || 0,
          countryRank: altData.countryRank || 0,
          isLoading: false,
          error: null
        }
      }
    } catch (altError) {
      console.error('Alternative CodeChef API also failed:', altError)
    }
    
    throw error
  }
}

async function fetchTwitterStats(username: string) {
  const cleanUsername = username.replace('@', '')
  
  const bearerToken = process.env.TWITTER_BEARER_TOKEN
  
  if (!bearerToken) {
    throw new Error('Twitter API token not configured')
  }
  
  const response = await fetch(`https://api.twitter.com/2/users/by/username/${cleanUsername}?user.fields=public_metrics,verified`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Accept': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Twitter API error: ${response.status}`)
  }

  const data = await response.json()

  if (!data.data) {
    throw new Error('Twitter user not found')
  }

  const metrics = data.data.public_metrics || {}

  return {
    followers: metrics.followers_count || 0,
    following: metrics.following_count || 0,
    tweets: metrics.tweet_count || 0,
    verified: data.data.verified || false,
    isLoading: false,
    error: null
  }
}
