const CREDLY_EMBED_SRC = 'https://cdn.credly.com/assets/utilities/embed.js'

let loadPromise: Promise<void> | null = null

function appendCredlyScript(onLoad: () => void, onError: () => void): void {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.src = CREDLY_EMBED_SRC
  script.onload = onLoad
  script.onerror = onError
  document.body.appendChild(script)
}

/** Load Credly embed.js once; safe to call from client-only effects. */
export function loadCredlyEmbedScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CREDLY_EMBED_SRC}"]`,
    )

    if (existing?.dataset.credlyLoaded === 'true') {
      resolve()
      return
    }

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener(
        'error',
        () => reject(new Error('Failed to load Credly embed script')),
        { once: true },
      )
      return
    }

    appendCredlyScript(
      () => {
        document
          .querySelectorAll<HTMLScriptElement>(`script[src="${CREDLY_EMBED_SRC}"]`)
          .forEach((node) => {
            node.dataset.credlyLoaded = 'true'
          })
        resolve()
      },
      () => reject(new Error('Failed to load Credly embed script')),
    )
  })

  return loadPromise
}

/**
 * Re-run Credly scanning for dynamically mounted badge placeholders (SPA routes).
 * Appends a fresh script tag when the utility has already initialized.
 */
export function refreshCredlyEmbeds(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()

  const pending = Array.from(document.querySelectorAll('[data-share-badge-id]')).some(
    (node) => !node.querySelector('iframe'),
  )
  if (!pending) return Promise.resolve()

  const alreadyLoaded = document.querySelector<HTMLScriptElement>(
    `script[src="${CREDLY_EMBED_SRC}"][data-credly-loaded="true"]`,
  )

  if (!alreadyLoaded) {
    return loadCredlyEmbedScript()
  }

  return new Promise((resolve, reject) => {
    appendCredlyScript(
      () => resolve(),
      () => reject(new Error('Failed to refresh Credly embed')),
    )
  })
}

export const AWS_AI_PRACTITIONER_CREDLY = {
  badgeId: '45a89792-ff6c-4172-abc6-00d4e746b66d',
  host: 'https://www.credly.com',
} as const

/** Official Credly iframe request size (portrait badge). */
export const CREDLY_EMBED_IFRAME = { width: 150, height: 270 } as const

/** Compact on-page thumbnail - wide badge emblem, clipped height. */
export const CREDLY_EMBED_THUMBNAIL = { width: 112, height: 56 } as const
