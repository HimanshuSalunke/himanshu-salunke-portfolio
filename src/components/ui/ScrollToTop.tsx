import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const scrollToHash = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }

      const timeoutIds = [
        setTimeout(scrollToHash, 100),
        setTimeout(scrollToHash, 300),
        setTimeout(scrollToHash, 600),
      ]

      return () => {
        timeoutIds.forEach(clearTimeout)
      }
    }

    const scrollToTop = () => {
      window.scrollTo(0, 0)
      if (document.documentElement) {
        document.documentElement.scrollTop = 0
      }
      if (document.body) {
        document.body.scrollTop = 0
      }
    }

    scrollToTop()

    const timeoutIds = [
      setTimeout(scrollToTop, 10),
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 100),
    ]

    return () => {
      timeoutIds.forEach(clearTimeout)
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
