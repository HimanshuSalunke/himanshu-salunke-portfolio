import React, { useEffect, useRef, useState } from 'react'
import { loadCredlyEmbedScript, refreshCredlyEmbeds } from '../../lib/credlyEmbed'

export interface CredlyBadgeEmbedProps {
  badgeId: string
  host?: string
  width?: number
  height?: number
  className?: string
  title?: string
}

/**
 * Official Credly badge embed. Loads embed.js on the client only so SSR/hydration stay safe.
 */
export const CredlyBadgeEmbed: React.FC<CredlyBadgeEmbedProps> = ({
  badgeId,
  host = 'https://www.credly.com',
  width = 150,
  height = 270,
  className = '',
  title = 'Credly digital badge',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    let cancelled = false

    const embedBadge = async () => {
      try {
        await loadCredlyEmbedScript()
        if (cancelled || !containerRef.current) return

        const hasIframe = containerRef.current.querySelector('iframe')
        if (!hasIframe) {
          await refreshCredlyEmbeds()
        }
      } catch {
        // Badge area keeps a neutral placeholder if Credly is blocked or offline.
      }
    }

    void embedBadge()

    return () => {
      cancelled = true
    }
  }, [mounted, badgeId, host, width, height])

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200/80 bg-white dark:border-neutral-700/50 dark:bg-neutral-900 ${className}`}
        style={{ width, minHeight: Math.min(height, 120) }}
        aria-hidden
      />
    )
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ width, maxWidth: '100%' }}
      aria-label={title}
    >
      <div
        ref={containerRef}
        data-iframe-width={String(width)}
        data-iframe-height={String(height)}
        data-share-badge-id={badgeId}
        data-share-badge-host={host}
      />
    </div>
  )
}
