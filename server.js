import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';
import multer from 'multer';
import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';
import { buildLiveKnowledge, buildNeuraSystemPrompt } from './src/lib/neura/buildLiveKnowledge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Prisma Client
let db;
try {
  db = new PrismaClient();
} catch (e) {
  console.warn('⚠️ Failed to initialize Prisma Client. DB features will be disabled.');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:5173',
    'https://himanshu.dev'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('🔧 Server Environment Check:');
console.log('   - DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Missing');
console.log('   - BLOB_TOKEN:', process.env.BLOB_READ_WRITE_TOKEN ? '✅ Set' : '❌ Missing');
console.log('   - SLACK_WEBHOOK:', process.env.SLACK_WEBHOOK_URL ? '✅ Set' : '❌ Missing');
console.log('   - REQUESTY_API_KEY:', process.env.REQUESTY_API_KEY ? '✅ Set' : '❌ Missing');

// Configure multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB per file
    files: 5 // Max 5 files
  }
});

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

// API endpoint for service inquiry form submission
app.post('/api/service-inquiry', upload.array('files', 5), async (req, res) => {
  try {
    console.log('📝 Service Inquiry received:', req.body);
    const files = req.files || [];
    const plainData = req.body;

    // 1. Upload files to Vercel Blob
    const fileUrls = [];
    if (files.length > 0) {
      console.log(`Uploading ${files.length} files to Vercel Blob...`);
      for (const file of files) {
        try {
          const blob = await put(file.originalname, file.buffer, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN
          });
          fileUrls.push(blob.url);
        } catch (uploadError) {
          console.error('File upload failed:', uploadError);
          // Continue without failing the whole request, but log it
        }
      }
    }

    // 2. Save to Neon DB (PostgreSQL)
    let inquiryId = 'N/A';
    if (db) {
      try {
        const newInquiry = await db.serviceInquiry.create({
          data: {
            name: plainData.name,
            email: plainData.email,
            phone: plainData.phone || '',
            clientType: plainData.clientType || '',
            studyYear: plainData.studyYear || '',
            projectTitle: plainData.projectTitle || 'Untitled Project',
            domain: plainData.domain || '',
            projectDetails: plainData.projectDetails || '',
            dataset: plainData.dataset || '',
            budgetMin: parseInt(plainData.budgetMin) || 0,
            budgetMax: parseInt(plainData.budgetMax) || 0,
            deadline: plainData.deadline ? new Date(plainData.deadline) : null,
            fileUrl: fileUrls.join('\n')
          }
        });
        inquiryId = newInquiry.id;
        console.log('✅ Saved to DB:', inquiryId);
      } catch (dbError) {
        console.error('❌ Failed to save to DB:', dbError);
      }
    }

    // 3. Send Notification to Slack
    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
    if (SLACK_WEBHOOK_URL) {
      const budgetText = `₹${plainData.budgetMin || 0} - ₹${plainData.budgetMax || 0}`;

      const slackMessage = {
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🚀 New Service Inquiry',
              emoji: true,
            },
          },
          { type: 'divider' },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Client:*\n${plainData.name}` },
              { type: 'mrkdwn', text: `*Email:*\n${plainData.email}` },
              { type: 'mrkdwn', text: `*Phone:*\n${plainData.phone || 'N/A'}` },
              { type: 'mrkdwn', text: `*Type:*\n${plainData.clientType || 'N/A'}` },
            ],
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Project Title:*\n${plainData.projectTitle}` },
              { type: 'mrkdwn', text: `*Domain:*\n${plainData.domain}` },
              { type: 'mrkdwn', text: `*Budget:*\n${budgetText}` },
              { type: 'mrkdwn', text: `*Deadline:*\n${plainData.deadline || 'Flexible'}` },
            ],
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Project Details:*\n${plainData.projectDetails}`
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Files attached:*\n${fileUrls.length > 0 ? fileUrls.join('\n') : 'None'}`
            }
          },
          {
            type: 'context',
            elements: [
              {
                type: 'plain_text',
                text: `ID: ${inquiryId} | Received on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`,
                emoji: true,
              },
            ],
          },
        ],
      };

      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage),
      });
      console.log('✅ Slack notification sent');
    }

    res.json({
      success: true,
      message: 'Inquiry submitted successfully!',
      inquiryId: inquiryId
    });

  } catch (error) {
    console.error('❌ Failed to process service inquiry:', error);
    res.status(500).json({
      error: 'Failed to process service inquiry. Please try again or contact me directly.'
    });
  }
});

// Projects API endpoints
const projectsDir = path.join(__dirname, 'src/data/projects');

// Helper function to get all projects
function getAllProjects() {
  try {
    const files = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'));

    const projects = files
      .map(file => {
        const filePath = path.join(projectsDir, file);
        const fileContent = readFileSync(filePath, 'utf8');

        // Filter out commented/hidden projects
        if (fileContent.trim().startsWith('<!--')) {
          return null;
        }

        const { data: frontmatter, content } = matter(fileContent);

        return {
          ...frontmatter,
          slug: frontmatter.id, // Add slug field for frontend compatibility
          content,
          readingTime: Math.ceil(content.split(' ').length / 200)
        };
      })
      .filter(project => project !== null);

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

// Neura AI chat (Requesty)
const NEURA_MAX_MESSAGE_LENGTH = 500;
const NEURA_MAX_HISTORY = 12;
const NEURA_MODEL = process.env.REQUESTY_MODEL || 'openai/gpt-5-nano';

function normalizeNeuraHistory(input) {
  if (!Array.isArray(input)) return [];

  return input
    .filter((item) => {
      if (!item || typeof item !== 'object') return false;
      return (
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim().length > 0
      );
    })
    .slice(-NEURA_MAX_HISTORY)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, NEURA_MAX_MESSAGE_LENGTH),
    }));
}

function writeNeuraSse(res, payload) {
  const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
  res.write(`data: ${data}\n\n`);
}

app.post('/api/neura/chat', async (req, res) => {
  try {
    const apiKey = process.env.REQUESTY_API_KEY;
    if (!apiKey) {
      console.error('Neura chat: REQUESTY_API_KEY is not configured');
      return res.status(500).json({ error: 'Neura AI is not configured yet.' });
    }

    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    const history = normalizeNeuraHistory(req.body?.history);
    const wantStream = req.body?.stream !== false;
    const pagePath =
      typeof req.body?.pagePath === 'string' && req.body.pagePath.startsWith('/')
        ? String(req.body.pagePath).slice(0, 200)
        : '/';
    const pageHint =
      typeof req.body?.pageHint === 'string' ? String(req.body.pageHint).slice(0, 300) : '';

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (message.length > NEURA_MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message is too long. Keep it under ${NEURA_MAX_MESSAGE_LENGTH} characters.`,
      });
    }

    const knowledge = buildLiveKnowledge(__dirname);

    const messages = [
      { role: 'system', content: buildNeuraSystemPrompt(knowledge, { pagePath, pageHint }) },
      ...history,
      { role: 'user', content: message },
    ];

    const response = await fetch('https://router.requesty.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.VITE_SITE_URL || 'https://himanshu-salunke.vercel.app',
        'X-Title': 'Neura Portfolio Assistant',
      },
      body: JSON.stringify({
        model: NEURA_MODEL,
        messages,
        temperature: 0.25,
        max_tokens: 2200,
        stream: wantStream,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Requesty error:', response.status, errorText);
      return res.status(502).json({ error: 'Neura could not reach the AI service right now.' });
    }

    if (!wantStream) {
      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        return res.status(502).json({ error: 'Neura returned an empty answer.' });
      }
      return res.status(200).json({
        reply,
        model: NEURA_MODEL,
      });
    }

    if (!response.body) {
      return res.status(502).json({ error: 'Neura returned an empty stream.' });
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullReply = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;

        try {
          const chunk = JSON.parse(payload);
          const content = chunk?.choices?.[0]?.delta?.content;
          if (content) {
            fullReply += content;
            writeNeuraSse(res, { content });
          }
        } catch {
          // ignore malformed upstream chunks
        }
      }
    }

    if (!fullReply.trim()) {
      writeNeuraSse(res, { error: 'Neura returned an empty answer.' });
    } else {
      writeNeuraSse(res, { done: true, model: NEURA_MODEL });
    }
    writeNeuraSse(res, '[DONE]');
    return res.end();
  } catch (error) {
    console.error('Neura chat API error:', error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Unexpected Neura error',
      });
    }
    writeNeuraSse(res, {
      error: error instanceof Error ? error.message : 'Unexpected Neura error',
    });
    return res.end();
  }
});

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Prevent process exit (Keep-alive hack)
setInterval(() => { }, 1000 * 60 * 60);