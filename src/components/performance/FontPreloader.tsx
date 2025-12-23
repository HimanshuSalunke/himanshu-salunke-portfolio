import React, { useEffect } from 'react'

interface FontPreloaderProps {
  fonts?: Array<{
    family: string
    weight?: string | number
    style?: string
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  }>
}

export const FontPreloader: React.FC<FontPreloaderProps> = ({
  fonts = [
    { family: 'Inter', weight: '400', display: 'swap' },
    { family: 'Inter', weight: '500', display: 'swap' },
    { family: 'Inter', weight: '600', display: 'swap' },
    { family: 'Inter', weight: '700', display: 'swap' },
    { family: 'JetBrains Mono', weight: '400', display: 'swap' },
    { family: 'JetBrains Mono', weight: '500', display: 'swap' },
  ]
}) => {
  useEffect(() => {
    // Use Google Fonts instead of local fonts
    const preloadGoogleFonts = () => {
      const fontLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap'
      ]

      fontLinks.forEach(href => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })

      console.log('Google Fonts loaded successfully')
    }

    preloadGoogleFonts()
  }, [fonts])

  return null
}

export const FontDisplayOptimizer: React.FC = () => {
  useEffect(() => {
    // Optimize font display for better performance
    const optimizeFontDisplay = () => {
      // Set font-display: swap for all fonts
      const style = document.createElement('style')
      style.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
        }
        @font-face {
          font-family: 'JetBrains Mono';
          font-display: swap;
        }
      `
      document.head.appendChild(style)
    }

    optimizeFontDisplay()
  }, [])

  return null
}

export const CriticalResourcePreloader: React.FC = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        { href: '/api/current-focus', as: 'fetch', crossOrigin: 'anonymous' },
      ]

      criticalResources.forEach(resource => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = resource.href
        link.as = resource.as
        if (resource.crossOrigin) {
          link.crossOrigin = resource.crossOrigin
        }
        document.head.appendChild(link)
      })
    }

    preloadCriticalResources()
  }, [])

  return null
}
