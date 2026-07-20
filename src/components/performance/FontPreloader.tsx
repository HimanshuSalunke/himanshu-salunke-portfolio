import React, { useEffect } from 'react'

/** Fonts are self-hosted via @fontsource in main.tsx - no runtime preload needed. */
export const FontPreloader: React.FC = () => null

export const FontDisplayOptimizer: React.FC = () => null

export const CriticalResourcePreloader: React.FC = () => {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = '/api/current-focus'
    link.as = 'fetch'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  }, [])

  return null
}
