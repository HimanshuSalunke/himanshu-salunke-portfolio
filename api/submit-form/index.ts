import type { VercelRequest, VercelResponse } from '@vercel/node'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

interface RateLimitEntry {
  count: number
  resetTime: number
}

// Simple in-memory rate limiting (for production, use Redis)
const rateLimitMap = new Map<string, RateLimitEntry>()

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5 // 5 requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }
  
  if (now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }
  
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }
  
  entry.count++
  return false
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function countWords(text: string): number {
  if (!text || text.trim().length === 0) return 0
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

function validateFormData(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Honeypot check
  if (data.honeypot && data.honeypot.trim() !== '') {
    errors.push('Spam detected')
    return { isValid: false, errors }
  }
  
  // Required fields
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Please provide a valid email address')
  }
  
  if (!data.subject || data.subject.trim().length === 0) {
    errors.push('Subject is required')
  } else {
    const subjectWordCount = countWords(data.subject)
    if (subjectWordCount < 10) {
      errors.push(`Subject must contain at least 10 words (currently: ${subjectWordCount} words)`)
    }
  }
  
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required')
  } else {
    const wordCount = countWords(data.message)
    if (wordCount < 20) {
      errors.push(`Message must contain at least 20 words (currently: ${wordCount} words)`)
    }
  }
  
  // Length limits
  if (data.name && data.name.length > 100) {
    errors.push('Name is too long (max 100 characters)')
  }
  
  if (data.subject && data.subject.length > 200) {
    errors.push('Subject is too long (max 200 characters)')
  }
  
  if (data.message && data.message.length > 2000) {
    errors.push('Message is too long (max 2000 characters)')
  }
  
  return { isValid: errors.length === 0, errors }
}

async function sendEmailNotification(data: ContactFormData): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY
  
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured')
    return false
  }
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact Form <noreply@himanshu-salunke.vercel.app>',
        to: ['your-email@example.com'], // Replace with your email
        subject: `New Contact Form Submission: ${data.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
            </div>
            
            <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h3 style="color: #1e40af; margin-top: 0;">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>Submitted:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `,
      }),
    })
    
    if (!response.ok) {
      console.error('Resend API failed:', response.status, response.statusText)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error sending email via Resend:', error)
    return false
  }
}

async function sendToSlack(data: ContactFormData): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  
  if (!webhookUrl) {
    console.warn('SLACK_WEBHOOK_URL not configured')
    return false
  }
  
  const slackMessage = {
    text: `New contact form submission from ${data.name}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'New Contact Form Submission'
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Name:*\n${data.name}`
          },
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.email}`
          },
          {
            type: 'mrkdwn',
            text: `*Subject:*\n${data.subject}`
          },
          {
            type: 'mrkdwn',
            text: `*Message:*\n${data.message.substring(0, 500)}${data.message.length > 500 ? '...' : ''}`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `Submitted at: ${new Date().toISOString()}`
          }
        ]
      }
    ]
  }
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    })
    
    if (!response.ok) {
      console.error('Slack webhook failed:', response.status, response.statusText)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error sending to Slack:', error)
    return false
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for'] as string || 
                    req.headers['x-real-ip'] as string || 
                    req.connection.remoteAddress || 
                    'unknown'
    
    // Check rate limit
    if (isRateLimited(clientIP)) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
      })
    }
    
    // Parse and validate request body
    const formData: ContactFormData = req.body
    
    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({ error: 'Invalid request body' })
    }
    
    // Validate form data
    const validation = validateFormData(formData)
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: validation.errors
      })
    }
    
    // Send notifications (both Slack and Email)
    const [slackSuccess, emailSuccess] = await Promise.allSettled([
      sendToSlack(formData),
      sendEmailNotification(formData)
    ])
    
    const slackDelivered = slackSuccess.status === 'fulfilled' && slackSuccess.value
    const emailDelivered = emailSuccess.status === 'fulfilled' && emailSuccess.value
    
    // Log results
    if (!slackDelivered) {
      console.warn('Failed to send to Slack, but form submission was valid')
    }
    if (!emailDelivered) {
      console.warn('Failed to send email notification, but form submission was valid')
    }
    
    // Log successful submission (without sensitive data)
    console.log(`Contact form submitted by ${formData.name} (${formData.email})`)
    
    // Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      notifications: {
        slack: slackDelivered,
        email: emailDelivered
      }
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    })
  }
}
