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
        ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
      }
    }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'himanshu-portfolio-website',
        ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {})
      }
    })
  ])

  if (!userResponse.ok || !reposResponse.ok) {
    throw new Error(`GitHub API error: User ${userResponse.status}, Repos ${reposResponse.status}`)
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
