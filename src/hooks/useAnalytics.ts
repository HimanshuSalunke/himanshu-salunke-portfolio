import { useState, useEffect } from 'react'

type VaTracker = {
  track?: (eventName: string, properties?: Record<string, unknown>) => void
}

function getVaTracker(): VaTracker | undefined {
  if (typeof window === 'undefined') return undefined
  // Vercel Analytics types `window.va` as a queue; runtime also exposes `.track`.
  return window.va as unknown as VaTracker | undefined
}

export const useAnalytics = () => {
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false)
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user has given consent
    const consent = localStorage.getItem('analytics-consent')
    if (consent === 'accepted') {
      setIsAnalyticsEnabled(true)
      setHasConsent(true)
    } else if (consent === 'declined') {
      setIsAnalyticsEnabled(false)
      setHasConsent(false)
    } else {
      setHasConsent(null) // No decision made yet
    }
  }, [])

  const enableAnalytics = () => {
    setIsAnalyticsEnabled(true)
    localStorage.setItem('analytics-consent', 'accepted')
  }

  const disableAnalytics = () => {
    setIsAnalyticsEnabled(false)
    localStorage.setItem('analytics-consent', 'declined')
  }

  const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    if (isAnalyticsEnabled) {
      getVaTracker()?.track?.(eventName, properties)
    }
  }

  const trackPageView = (url: string) => {
    if (isAnalyticsEnabled) {
      getVaTracker()?.track?.('page_view', { url })
    }
  }

  return {
    isAnalyticsEnabled,
    hasConsent,
    enableAnalytics,
    disableAnalytics,
    trackEvent,
    trackPageView,
  }
}
