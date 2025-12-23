import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ImageResponse } from '@vercel/og'
import React from 'react'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { title, description, type, date, tags, format } = req.query

  if (!title) {
    return res.status(400).json({ error: 'Title is required' })
  }

  // Use React-based OG image if format is 'react' or not specified
  if (format !== 'html') {
    try {
      const imageResponse = new ImageResponse(
        React.createElement('div', {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#ffffff',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            position: 'relative',
          }
        }, [
          // Background Pattern
          React.createElement('div', {
            key: 'bg-pattern',
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              opacity: 0.8,
            }
          }),

          // Main Content Container
          React.createElement('div', {
            key: 'main-container',
            style: {
              display: 'flex',
              width: '100%',
              height: '100%',
              padding: '80px',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 1,
            }
          }, [
            // Left Content
            React.createElement('div', {
              key: 'left-content',
              style: {
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '700px',
                gap: '24px',
              }
            }, [
              // Type Badge
              React.createElement('div', {
                key: 'type-badge',
                style: {
                  display: 'inline-block',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  width: 'fit-content',
                }
              }, type === 'project' ? 'Project' : 'Article'),

              // Title
              React.createElement('h1', {
                key: 'title',
                style: {
                  fontSize: '64px',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: '#1e293b',
                  margin: 0,
                  background: 'linear-gradient(135deg, #1e293b 0%, #8b5cf6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              }, title),

              // Description
              description && React.createElement('p', {
                key: 'description',
                style: {
                  fontSize: '24px',
                  lineHeight: 1.4,
                  color: '#64748b',
                  margin: 0,
                  fontWeight: 400,
                }
              }, description),

              // Author Info
              React.createElement('div', {
                key: 'author-info',
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginTop: '24px',
                }
              }, [
                React.createElement('div', {
                  key: 'author-avatar',
                  style: {
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'white',
                  }
                }, 'HS'),

                React.createElement('div', {
                  key: 'author-details',
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }
                }, [
                  React.createElement('div', {
                    key: 'author-name',
                    style: {
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#1e293b',
                    }
                  }, 'Himanshu Salunke'),

                  React.createElement('div', {
                    key: 'author-title',
                    style: {
                      fontSize: '14px',
                      color: '#64748b',
                    }
                  }, 'Aspiring Data Scientist')
                ])
              ])
            ])
          ])
        ]),
        {
          width: 1200,
          height: 630,
        }
      )

      return imageResponse
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e)
      console.log(`${errorMessage}`)
      // Fall back to HTML version
    }
  }

  // Generate OG image HTML
  const ogImageHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            width: 1200px;
            height: 630px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            overflow: hidden;
          }
          
          .container {
            width: 100%;
            height: 100%;
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
          }
          
          .background-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.1;
            background-image: 
              radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, white 2px, transparent 2px);
            background-size: 60px 60px;
          }
          
          .content {
            position: relative;
            z-index: 1;
            max-width: 900px;
          }
          
          .type-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 24px;
            backdrop-filter: blur(10px);
          }
          
          .title {
            font-size: 64px;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 24px;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          
          .description {
            font-size: 24px;
            line-height: 1.4;
            opacity: 0.9;
            margin-bottom: 32px;
            font-weight: 400;
          }
          
          .meta {
            display: flex;
            align-items: center;
            gap: 24px;
            font-size: 18px;
            opacity: 0.8;
          }
          
          .date {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 24px;
          }
          
          .tag {
            background: rgba(255, 255, 255, 0.15);
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            backdrop-filter: blur(10px);
          }
          
          .logo {
            position: absolute;
            bottom: 60px;
            right: 60px;
            font-size: 24px;
            font-weight: 700;
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="background-pattern"></div>
          <div class="content">
            <div class="type-badge">${type === 'project' ? 'Project' : 'Article'}</div>
            <h1 class="title">${title}</h1>
            ${description ? `<p class="description">${description}</p>` : ''}
            <div class="meta">
              ${date ? `<div class="date">📅 ${new Date(date as string).toLocaleDateString()}</div>` : ''}
            </div>
            ${tags ? `
              <div class="tags">
                ${(tags as string).split(',').slice(0, 5).map(tag =>
    `<span class="tag">${tag.trim()}</span>`
  ).join('')}
              </div>
            ` : ''}
          </div>
          <div class="logo">Himanshu's Portfolio</div>
        </div>
      </body>
    </html>
  `

  // Set headers for image response
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')

  return res.status(200).send(ogImageHtml)
}
