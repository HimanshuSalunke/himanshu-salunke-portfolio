import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put } from '@vercel/blob'
import formidable from 'formidable'
import { db } from '../../src/lib/db.js'
import { serviceInquirySchema } from '../../src/lib/validations/serviceInquirySchema.js'

// Disable body parsing - formidable will handle it
export const config = {
  api: {
    bodyParser: false,
  },
}

async function parseFormData(req: VercelRequest): Promise<{ fields: any; files: formidable.File[] }> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: 50 * 1024 * 1024, // 50MB
      maxFiles: 5,
      keepExtensions: true,
    })

    form.parse(req as any, (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }

      // Convert fields from arrays to single values
      const parsedFields: any = {}
      for (const [key, value] of Object.entries(fields)) {
        parsedFields[key] = Array.isArray(value) ? value[0] : value
      }

      // Convert files to array
      const fileArray: formidable.File[] = []
      if (files.files) {
        const fileList = Array.isArray(files.files) ? files.files : [files.files]
        fileArray.push(...fileList)
      }

      resolve({ fields: parsedFields, files: fileArray })
    })
  })
}

async function sendToSlack(data: any): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('SLACK_WEBHOOK_URL not configured')
    return false
  }

  const slackMessage = {
    text: `New Service Inquiry: ${data.projectTitle}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🚀 New Service Inquiry'
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Client:*\n${data.name} (${data.clientType})`
          },
          {
            type: 'mrkdwn',
            text: `*Email/Phone:*\n${data.email}\n${data.phone || 'N/A'}`
          },
          {
            type: 'mrkdwn',
            text: `*Project:*\n${data.projectTitle}`
          },
          {
            type: 'mrkdwn',
            text: `*Budget:*\n₹${data.budgetMin} - ₹${data.budgetMax}`
          }
        ]
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Deadline:*\n${data.deadline ? new Date(data.deadline).toLocaleDateString() : 'Flexible'}`
          },
          {
            type: 'mrkdwn',
            text: `*Domain:*\n${data.domain || 'Not specified'}`
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Details:*\n${data.projectDetails.substring(0, 500)}${data.projectDetails.length > 500 ? '...' : ''}`
        }
      }
    ]
  }

  // Add file attachment notice if files exist
  if (data.fileUrls && data.fileUrls.length > 0) {
    const fileLinks = data.fileUrls.map((url: string, i: number) => `<${url}|File ${i + 1}>`).join(', ')
      ; (slackMessage.blocks as any[]).push({
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `📎 Attachments: ${fileLinks}`
          }
        ]
      })
  }

  // Add timestamp
  ; (slackMessage.blocks as any[]).push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `Submitted at: ${new Date().toLocaleString()}`
      }
    ]
  })

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage),
    })

    if (!response.ok) {
      console.error('Slack webhook failed:', response.status)
      return false
    }

    console.log('✅ Slack notification sent')
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
    // Check if database is available
    if (!db) {
      console.error('❌ Database connection not available')
      return res.status(503).json({
        error: 'Database connection not available. Please check DATABASE_URL environment variable.'
      })
    }

    // Parse FormData using formidable
    const { fields: formData, files } = await parseFormData(req)

    // Extract form fields (keep raw string values for validation)
    const inquiryData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone ?? undefined,
      clientType: formData.clientType ?? undefined,
      studyYear: formData.studyYear ?? undefined,
      projectTitle: formData.projectTitle,
      domain: formData.domain ?? undefined,
      projectDetails: formData.projectDetails,
      dataset: formData.dataset ?? undefined,
      budgetMin: formData.budgetMin ?? undefined,
      budgetMax: formData.budgetMax ?? undefined,
      deadline: formData.deadline ?? undefined,
    }

    // Validate form data
    const validatedData = serviceInquirySchema.parse(inquiryData)

    // Create the inquiry in database first
    const inquiry = await db.serviceInquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        clientType: validatedData.clientType,
        studyYear: validatedData.studyYear,
        projectTitle: validatedData.projectTitle,
        domain: validatedData.domain || null,
        projectDetails: validatedData.projectDetails,
        dataset: validatedData.dataset || null,
        budgetMin: validatedData.budgetMin ? Number(validatedData.budgetMin) : null,
        budgetMax: validatedData.budgetMax ? Number(validatedData.budgetMax) : null,
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
        fileUrl: null, // Will update after file upload
      },
    })

    // Handle file uploads if present
    let fileUrls: string[] = []

    if (files && files.length > 0) {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.warn('⚠️ BLOB_READ_WRITE_TOKEN not set, skipping file upload')
      } else {
        try {
          const sanitizedName = validatedData.name.replace(/[^a-zA-Z0-9]/g, '_')

          for (const file of files) {
            // Read file from filesystem (formidable saves to disk by default)
            const fs = await import('fs')
            const fileBuffer = fs.readFileSync(file.filepath)
            const fileName = file.originalFilename || file.newFilename || `file_${Date.now()}`
            const filePath = `service-inquiries/${sanitizedName}/${fileName}`

            const { url } = await put(filePath, fileBuffer, {
              access: 'public',
              contentType: file.mimetype || 'application/octet-stream',
            })

            fileUrls.push(url)

            // Clean up temporary file
            fs.unlinkSync(file.filepath)
          }

          // Update the inquiry with file URLs
          if (fileUrls.length > 0) {
            await db.serviceInquiry.update({
              where: { id: inquiry.id },
              data: {
                fileUrl: fileUrls.join('\n'),
              },
            })
          }

          console.log(`✅ Uploaded ${fileUrls.length} file(s) to Vercel Blob`)
        } catch (fileError) {
          console.error('❌ Error uploading files:', fileError)
          // Continue even if file upload fails - inquiry is already saved
        }
      }
    }

    // Send notification to Slack
    await sendToSlack({ ...validatedData, fileUrls })

    console.log(`✅ Service inquiry saved: ${inquiry.id}`)
    console.log(`   Name: ${validatedData.name}`)
    console.log(`   Email: ${validatedData.email}`)
    console.log(`   Project: ${validatedData.projectTitle}`)

    return res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully! I\'ll get back to you within 24 hours.',
      inquiryId: inquiry.id
    })

  } catch (error: any) {
    console.error('❌ Failed to process service inquiry:', error)

    // Handle validation errors
    if (error.name === 'ZodError' || error.issues) {
      const zodError = error.issues ? error : { issues: error.errors }
      return res.status(400).json({
        error: 'Validation failed',
        details: zodError.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`)
      })
    }

    return res.status(500).json({
      error: 'Failed to process service inquiry. Please try again or contact me directly.'
    })
  }
}

