import { useEffect, useCallback, useRef, useState } from 'react'

// Throttle function for scroll events
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Debounce function for scroll events
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

// Optimized scroll hook
export const useScrollOptimization = () => {
  const scrollY = useRef(0)
  const ticking = useRef(false)

  const updateScrollPosition = useCallback(() => {
    scrollY.current = window.scrollY
    ticking.current = false
  }, [])

  const requestTick = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(updateScrollPosition)
      ticking.current = true
    }
  }, [updateScrollPosition])

  useEffect(() => {
    const handleScroll = throttle(requestTick, 16) // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [requestTick])

  return scrollY.current
}

// Intersection Observer hook for scroll-triggered animations
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [callback, options])

  return observerRef.current
}

// Performance monitoring for scroll
export const useScrollPerformance = () => {
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())
  const fps = useRef(60)

  useEffect(() => {
    const measureFPS = () => {
      frameCount.current++
      const currentTime = performance.now()
      
      if (currentTime - lastTime.current >= 1000) {
        fps.current = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current))
        frameCount.current = 0
        lastTime.current = currentTime
        
        // Log performance warnings
        if (fps.current < 30) {
          console.warn(`Low scroll FPS detected: ${fps.current}fps`)
        }
      }
      
      requestAnimationFrame(measureFPS)
    }

    measureFPS()
  }, [])

  return fps.current
}

// Optimized scroll-based animations
export const useScrollAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  animationConfig: {
    trigger?: number
    duration?: number
    easing?: string
  } = {}
) => {
  const { trigger = 0.5 } = animationConfig
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const progress = entry.intersectionRatio
        setScrollProgress(progress)
        setIsVisible(progress > trigger)
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        rootMargin: '0px'
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef, trigger])

  return { isVisible, scrollProgress }
}

// Reduce motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Scroll performance utilities
export const scrollUtils = {
  // Check if element is in viewport
  isInViewport: (element: HTMLElement, threshold: number = 0) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= -threshold &&
      rect.left >= -threshold &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
    )
  },

  // Get scroll progress (0-1)
  getScrollProgress: () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    return Math.min(scrollTop / scrollHeight, 1)
  },

  // Smooth scroll to element
  smoothScrollTo: (element: HTMLElement, offset: number = 0) => {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  },

  // Pause animations during scroll
  pauseAnimations: () => {
    document.body.style.setProperty('--animation-play-state', 'paused')
  },

  // Resume animations after scroll
  resumeAnimations: () => {
    document.body.style.setProperty('--animation-play-state', 'running')
  }
}
