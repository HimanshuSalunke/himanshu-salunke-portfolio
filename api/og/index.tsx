import { ImageResponse } from '@vercel/og'
import React from 'react'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    // Dynamic params with defaults
    const title = searchParams.get('title') || 'Himanshu Salunke'
    const role = searchParams.get('role') || 'Data Scientist & AI Engineer'

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
            backgroundColor: '#030712', // gray-950
            backgroundImage: `
              radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.15) 2%, transparent 0%), 
              radial-gradient(circle at 75px 75px, rgba(139, 92, 246, 0.15) 2%, transparent 0%)
            `,
            backgroundSize: '100px 100px',
            fontFamily: 'sans-serif',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ambient Glows */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '40%',
              height: '40%',
              backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-10%',
              width: '40%',
              height: '40%',
              backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              backgroundColor: 'rgba(17, 24, 39, 0.5)', // gray-900/50
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              zIndex: 10,
            }}
          >
            {/* Avaatar/Icon Placeholder (optional) */}
            <div
              style={{
                width: '80px',
                height: '80px',
                marginBottom: '24px',
                borderRadius: '20px',
                backgroundImage: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
              }}
            >
              HS
            </div>

            {/* Main Title */}
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 800,
                textAlign: 'center',
                margin: '0 0 16px 0',
                background: 'linear-gradient(to bottom right, #ffffff, #94a3b8)',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>

            {/* Role / Subtitle */}
            <p
              style={{
                fontSize: '32px',
                margin: 0,
                textAlign: 'center',
                color: '#94a3b8', // slate-400
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              {role}
            </p>
          </div>

          {/* Footer Decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#475569', // slate-600
              fontSize: '20px',
              fontWeight: 500,
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
            <span>Available for new projects</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error(e)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
