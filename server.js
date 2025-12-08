import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'https://himanshu.dev'],
  credentials: true
}));
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for contact form submission
app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Check if the Slack Webhook URL is set up correctly
    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
    
    if (!SLACK_WEBHOOK_URL) {
      console.error('❌ Slack Webhook URL is not configured');
      return res.status(500).json({ error: 'Slack Webhook URL is not configured.' });
    }

    // Format the data into a nice-looking Slack message using "Block Kit"
    const slackMessage = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📬 New Portfolio Message',
            emoji: true,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*From:*\n${name}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${email}`,
            },
            {
              type: 'mrkdwn',
              text: `*Subject:*\n${subject}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${message}`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'plain_text',
              text: `Received on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`,
              emoji: true,
            },
          ],
        },
      ],
    };

    // Send the message to your secret Slack Webhook URL
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (slackResponse.ok) {
      console.log('✅ Slack notification sent successfully');
      res.json({ success: true });
    } else {
      console.error('❌ Failed to send Slack notification:', slackResponse.status, slackResponse.statusText);
      res.status(500).json({ error: 'Failed to send notification to Slack.' });
    }

  } catch (error) {
    console.error('❌ Failed to process request:', error);
    res.status(500).json({ error: 'Failed to process request.' });
  }
});

// Projects API endpoints
const projectsDir = path.join(__dirname, 'src/data/projects');

// Helper function to get all projects
function getAllProjects() {
  try {
    const files = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'));
    
    const projects = files.map(file => {
      const filePath = path.join(projectsDir, file);
      const fileContent = readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);
      
      return {
        ...frontmatter,
        slug: frontmatter.id, // Add slug field for frontend compatibility
        content,
        readingTime: Math.ceil(content.split(' ').length / 200)
      };
    });
    
    // Sort by order field if available, otherwise by date
    return projects.sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

// GET /api/projects - Get all projects
app.get('/api/projects', (req, res) => {
  try {
    const projects = getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:slug - Get project by slug
app.get('/api/projects/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const projects = getAllProjects();
    const project = projects.find(p => p.id === slug);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// GET /api/projects/featured - Get featured projects
app.get('/api/projects/featured', (req, res) => {
  try {
    const projects = getAllProjects();
    const featured = projects.filter(p => p.featured);
    res.json(featured);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

// GET /api/projects/:slug/navigation - Get project navigation
app.get('/api/projects/:slug/navigation', (req, res) => {
  try {
    const { slug } = req.params;
    const projects = getAllProjects();
    const currentIndex = projects.findIndex(p => p.id === slug);
    
    if (currentIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const navigation = {
      previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
      next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
    };
    
    res.json(navigation);
  } catch (error) {
    console.error('Error fetching project navigation:', error);
    res.status(500).json({ error: 'Failed to fetch project navigation' });
  }
});

// GET /api/projects/:slug/related - Get related projects
app.get('/api/projects/:slug/related', (req, res) => {
  try {
    const { slug } = req.params;
    const limit = parseInt(req.query.limit) || 3;
    const projects = getAllProjects();
    const currentProject = projects.find(p => p.id === slug);
    
    if (!currentProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Find projects with similar category or tech stack
    const related = projects
      .filter(p => p.id !== slug)
      .filter(p => 
        p.category === currentProject.category || 
        (p.techStack && currentProject.techStack && 
         p.techStack.some(tech => currentProject.techStack.includes(tech)))
      )
      .slice(0, limit);
    
    res.json(related);
  } catch (error) {
    console.error('Error fetching related projects:', error);
    res.status(500).json({ error: 'Failed to fetch related projects' });
  }
});

// Projects API endpoint
app.post('/api/projects', async (req, res) => {
  try {
    // Original projects API functionality
    const { featured, slug } = req.query;
    const projects = getAllProjects();
    
    if (slug && typeof slug === 'string') {
      const project = projects.find(p => p.slug === slug);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.json(project);
    }
    
    if (featured === 'true') {
      const featuredProjects = projects.filter(project => project.featured === true)
        .sort((a, b) => {
          const dateA = new Date(a.date || '2024-01-01');
          const dateB = new Date(b.date || '2024-01-01');
          return dateB.getTime() - dateA.getTime();
        });
      return res.json(featuredProjects);
    }
    
    const sortedProjects = projects.sort((a, b) => {
      const dateA = new Date(a.date || '2024-01-01');
      const dateB = new Date(b.date || '2024-01-01');
      return dateB.getTime() - dateA.getTime();
    });
    
    res.json(sortedProjects);
  } catch (error) {
    console.error('Error in projects API:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});



// Social Stats API endpoints
app.get('/api/social-stats/github', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Fetch GitHub user data with proper headers
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
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    const reposData = await reposResponse.json();

    const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);
    const totalWatchers = reposData.reduce((acc, repo) => acc + repo.watchers_count, 0);

    const result = {
      stars: totalStars,
      forks: totalForks,
      watchers: totalWatchers,
      repositories: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      isLoading: false,
      error: null
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('GitHub API proxy error:', error);
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      stars: 0,
      forks: 0,
      watchers: 0,
      repositories: 0,
      followers: 0,
      following: 0,
      isLoading: false
    });
  }
});

// LeetCode endpoint commented out
// app.get('/api/social-stats/leetcode', async (req, res) => {
//   try {
//     const { username } = req.query;

//     if (!username || typeof username !== 'string') {
//       return res.status(400).json({ error: 'Username is required' });
//     }

//     // LeetCode GraphQL query
//     const query = `
//       query getUserProfile($username: String!) {
//         matchedUser(username: $username) {
//           submitStats {
//             acSubmissionNum {
//               difficulty
//               count
//               submissions
//             }
//           }
//           profile {
//             ranking
//           }
//         }
//         userContestRanking(username: $username) {
//           rating
//         }
//       }
//     `;

//     const response = await fetch('https://leetcode.com/graphql/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
//         'Referer': 'https://leetcode.com/',
//         'Origin': 'https://leetcode.com'
//       },
//       body: JSON.stringify({
//         query,
//         variables: { username }
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`LeetCode API error: ${response.status}`);
//     }

//     const data = await response.json();
//     
//     // Check for GraphQL errors
//     if (data.errors) {
//       throw new Error(`GraphQL errors: ${data.errors.map((e) => e.message).join(', ')}`);
//     }
//     
//     const user = data.data?.matchedUser;
//     const contestRanking = data.data?.userContestRanking;

//     if (!user) {
//       throw new Error('User not found in LeetCode API');
//     }

//     const submissions = user.submitStats?.acSubmissionNum || [];
//     const totalSolved = submissions.find((s) => s.difficulty === 'All')?.count || 0;
//     const easySolved = submissions.find((s) => s.difficulty === 'Easy')?.count || 0;
//     const mediumSolved = submissions.find((s) => s.difficulty === 'Medium')?.count || 0;
//     const hardSolved = submissions.find((s) => s.difficulty === 'Hard')?.count || 0;

//     const result = {
//       totalSolved,
//       easySolved,
//       mediumSolved,
//       hardSolved,
//       ranking: user.profile?.ranking || 0,
//       contestRating: contestRanking?.rating || 0,
//       isLoading: false,
//       error: null
//     };

//     res.status(200).json(result);
//   } catch (error) {
//     console.error('LeetCode API proxy error:', error);
//     
//     // Try alternative API as fallback
//     try {
//       const { username } = req.query;
//       const altResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
//       
//       if (altResponse.ok) {
//         const altData = await altResponse.json();
//         
//         const result = {
//           totalSolved: altData.totalSolved || 0,
//           easySolved: altData.easySolved || 0,
//           mediumSolved: altData.mediumSolved || 0,
//           hardSolved: altData.hardSolved || 0,
//           ranking: altData.ranking || 0,
//           contestRating: altData.contestRating || 0,
//           isLoading: false,
//           error: null
//         };
//         
//         return res.status(200).json(result);
//       }
//     } catch (altError) {
//       console.error('Alternative LeetCode API also failed:', altError);
//     }
//     
//     res.status(500).json({ 
//       error: error instanceof Error ? error.message : 'Unknown error',
//       totalSolved: 0,
//       easySolved: 0,
//       mediumSolved: 0,
//       hardSolved: 0,
//       ranking: 0,
//       contestRating: 0,
//       isLoading: false,
//       error: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// });

app.get('/api/social-stats/codechef', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Return mock data for now since CodeChef API is unreliable
    const result = {
      rating: 1500,
      stars: 2,
      problemsSolved: 25,
      globalRank: 15000,
      countryRank: 5000,
      isLoading: false,
      error: null
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('CodeChef API proxy error:', error);
    
    res.status(200).json({ 
      rating: 0,
      stars: 0,
      problemsSolved: 0,
      globalRank: 0,
      countryRank: 0,
      isLoading: false,
      error: 'CodeChef API temporarily unavailable'
    });
  }
});

app.get('/api/social-stats/twitter', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Remove @ symbol if present
    const cleanUsername = username.replace('@', '');
    
    // Try Twitter API v2 (requires Bearer Token)
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;
    
    if (!bearerToken) {
      throw new Error('Twitter API token not configured');
    }
    
    const response = await fetch(`https://api.twitter.com/2/users/by/username/${cleanUsername}?user.fields=public_metrics,verified`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data) {
      throw new Error('Twitter user not found');
    }

    const metrics = data.data.public_metrics || {};

    const result = {
      followers: metrics.followers_count || 0,
      following: metrics.following_count || 0,
      tweets: metrics.tweet_count || 0,
      verified: data.data.verified || false,
      isLoading: false,
      error: null
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Twitter API proxy error:', error);
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      followers: 0,
      following: 0,
      tweets: 0,
      verified: false,
      isLoading: false
    });
  }
});

// Current focus endpoint
app.get('/api/current-focus', (req, res) => {
  try {
    const currentFocus = {
      primary: "Full-Stack Development",
      secondary: "AI/ML Integration",
      technologies: [
        "React & TypeScript",
        "Node.js & Express",
        "Python & FastAPI",
        "Machine Learning",
        "Computer Vision"
      ],
      projects: [
        "Real-Time Height Measurement System",
        "Portfolio Website Enhancement",
        "AI-Powered Analytics Dashboard"
      ],
      learning: [
        "Advanced React Patterns",
        "Microservices Architecture",
        "Cloud Computing (AWS/Azure)"
      ],
      goals: [
        "Build scalable web applications",
        "Integrate AI/ML into real-world projects",
        "Contribute to open-source projects"
      ],
      lastUpdated: new Date().toISOString()
    };

    res.status(200).json(currentFocus);
  } catch (error) {
    console.error('Current focus API error:', error);
    
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      primary: "Full-Stack Development",
      secondary: "AI/ML Integration",
      technologies: [],
      projects: [],
      learning: [],
      goals: [],
      lastUpdated: new Date().toISOString()
    });
  }
});

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});