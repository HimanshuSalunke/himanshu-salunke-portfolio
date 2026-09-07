import React, { useEffect, useRef, useState } from 'react'
import {
  CREDLY_EMBED_IFRAME,
  CREDLY_EMBED_THUMBNAIL,
  loadCredlyEmbedScript,
  refreshCredlyEmbeds,
} from '../../lib/credlyEmbed'

export interface CredlyBadgeEmbedProps {
  badgeId: string
  host?: string
  /** Credly iframe request size (official embed dimensions). */
  width?: number
  height?: number
  /** Visible thumbnail size on the page. */
  thumbnailWidth?: number
  thumbnailHeight?: number
  className?: string
  title?: string
}

/**
 * Official Credly badge embed. Loads embed.js on the client only so SSR/hydration stay safe.
 * Renders a compact clipped thumbnail so portrait badges do not dominate card layouts.
 */
export const CredlyBadgeEmbed: React.FC<CredlyBadgeEmbedProps> = ({
  badgeId,
  host = 'https://www.credly.com',
  width = CREDLY_EMBED_IFRAME.width,
  height = CREDLY_EMBED_IFRAME.height,
  thumbnailWidth = CREDLY_EMBED_THUMBNAIL.width,
  thumbnailHeight = CREDLY_EMBED_THUMBNAIL.height,
  className = '',
  title = 'Credly digital badge',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const scale = thumbnailWidth / width

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

  const frameClass =
    'relative overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-700/50 dark:bg-neutral-900'

  if (!mounted) {
    return (
      <div
        className={`${frameClass} ${className}`}
        style={{ width: thumbnailWidth, height: thumbnailHeight }}
        aria-hidden
      />
    )
  }

  return (
    <div
      className={`${frameClass} ${className}`}
      style={{ width: thumbnailWidth, height: thumbnailHeight }}
      aria-label={title}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 origin-top-left [&_iframe]:block [&_iframe]:max-w-none"
        style={{
          width,
          height,
          transform: `scale(${scale})`,
        }}
      >
        <div
          ref={containerRef}
          data-iframe-width={String(width)}
          data-iframe-height={String(height)}
          data-share-badge-id={badgeId}
          data-share-badge-host={host}
        />
      </div>
    </div>
  )
}
