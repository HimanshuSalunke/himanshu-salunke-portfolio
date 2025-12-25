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
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(to bottom right, #0a0a0a, #111111)',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Simple Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
            backgroundSize: '50px 50px',
          }} />

          {/* User Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 24px',
              borderRadius: '50px',
              backgroundColor: 'rgba(37, 99, 235, 0.1)', // blue-600/10
              border: '1px solid rgba(37, 99, 235, 0.3)',
              marginBottom: '40px',
              zIndex: 10,
            }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
            <span style={{ color: '#60a5fa', fontSize: '20px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>
              Open to Opportunities
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 900,
              lineHeight: 1.1,
              margin: '0 0 20px 0',
              textAlign: 'center',
              letterSpacing: '-2px',
              color: 'white',
              zIndex: 10,
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '36px',
              fontWeight: 600,
              margin: 0,
              textAlign: 'center',
              color: '#94a3b8', // neutral-400
              letterSpacing: '1px',
              zIndex: 10,
            }}
          >
            {subtitle}
          </p>

          {/* Decorative Bar */}
          <div style={{ width: '120px', height: '6px', backgroundColor: '#3b82f6', marginTop: '50px', borderRadius: '3px', zIndex: 10 }} />

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
