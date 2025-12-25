import { ImageResponse } from '@vercel/og'
import React from 'react'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    // Dynamic params with defaults for the "Website OG"
    const title = searchParams.get('title') || 'Himanshu Salunke'
    const subtitle = searchParams.get('subtitle') || 'Data Scientist & Developer'

    // Font loading (standard fetch in edge) - Using system fonts for speed/reliability in this snippet
    // or we can load a font if needed, but for now let's use standard sans-serif with styling

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a', // neutral-950
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            fontFamily: '"Inter", sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glowing Orbs */}
          < div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '600px', height: '600px', backgroundColor: 'rgba(37, 99, 235, 0.15)', borderRadius: '50%', filter: 'blur(100px)' }
          } />
          < div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '500px', height: '500px', backgroundColor: 'rgba(79, 70, 229, 0.15)', borderRadius: '50%', filter: 'blur(100px)' }} />

          {/* User Status Badge */}
          <div
            style={
              {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '50px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                marginBottom: '32px',
              }
            }
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#60a5fa' }} />
            < span style={{ color: '#60a5fa', fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Open to Opportunities
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={
              {
                fontSize: '84px',
                fontWeight: 900,
                lineHeight: 1.1,
                margin: '0 0 24px 0',
                textAlign: 'center',
                letterSpacing: '-2px',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }
            }
          >
            {title}
          </h1>

          {/* Subtitle with Gradient */}
          <p
            style={
              {
                fontSize: '32px',
                fontWeight: 600,
                margin: 0,
                textAlign: 'center',
                background: 'linear-gradient(90deg, #60a5fa, #818cf8)',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '0.5px',
              }
            }
          >
            {subtitle}
          </p>

          {/* Decorative Divider */}
          <div style={{ width: '100px', height: '4px', background: 'linear-gradient(90deg, #3b82f6, #6366f1)', marginTop: '40px', borderRadius: '2px' }} />

        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
