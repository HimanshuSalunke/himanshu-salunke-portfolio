import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '../context/ThemeContext'
import { CinematicHeader } from '../components/header/redesign/CinematicHeader'
import { CinematicFooter } from '../components/footer/redesign/CinematicFooter'
import { ProgressTracker, EasterEgg } from '../components/gamification/ProgressTracker'
import { ScrollToTop } from '../components/ui/ScrollToTop'
import { FontPreloader, FontDisplayOptimizer, CriticalResourcePreloader } from '../components/performance/FontPreloader'
import { RouteErrorBoundary, RouteLoadingFallback } from '../components/performance/RouteErrorBoundary'
import { SkipLinks } from '../components/accessibility/SkipLinks'
import { ToastProvider, ToastStyles } from '../components/ui/Toast'
import { AnalyticsBanner } from '../components/analytics/AnalyticsBanner'
import { VercelAnalytics } from '../components/analytics/VercelAnalytics'
import { useAnalytics } from '../hooks/useAnalytics'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home.tsx'))
const About = lazy(() => import('./pages/About.tsx'))
const Work = lazy(() => import('./pages/Work.tsx'))
const Project = lazy(() => import('./pages/Project.tsx'))
const Articles = lazy(() => import('./pages/Articles.tsx'))
const Contact = lazy(() => import('./pages/Contact.tsx'))
const Developer = lazy(() => import('./pages/Developer.tsx'))
const Services = lazy(() => import('./pages/Services.tsx'))
const NotFound = lazy(() => import('./pages/NotFound.tsx'))

// Loading component
const LoadingSpinner: React.FC = () => <RouteLoadingFallback />

// Separated Routes component to use useLocation hook inside Router context
const AppRoutes: React.FC = () => {
  const location = useLocation()
  const { isAnalyticsEnabled, enableAnalytics, disableAnalytics, trackPageView } = useAnalytics()
  const isSupported = false
  const isUpdated = false
  const updateServiceWorker = () => { }

  // Scroll reset and Analytics tracking
  React.useEffect(() => {
    // Reset scroll
    window.scrollTo(0, 0)
    const timeoutId = setTimeout(() => window.scrollTo(0, 0), 50)
    return () => clearTimeout(timeoutId)
  }, [location.pathname])

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
        <FontPreloader />
        <FontDisplayOptimizer />
        <CriticalResourcePreloader />
        <SkipLinks />
        <ProgressTracker />

        <CinematicHeader />

        <main id="main-content" className="pt-16">
          <RouteErrorBoundary>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.02 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="min-h-screen"
              >
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/work/:slug" element={<Project />} />
                    <Route path="/projects/:slug" element={<Project />} />
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/developer" element={<Developer />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </RouteErrorBoundary>
        </main>

        <CinematicFooter />
        <EasterEgg />
        <ToastProvider />
        <ToastStyles />
        <VercelAnalytics isEnabled={isAnalyticsEnabled} />
        <AnalyticsBanner onAccept={enableAnalytics} onDecline={disableAnalytics} />

        {isSupported && isUpdated && (
          <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg p-4 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-white">
                  Update Available
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  A new version of the website is available.
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={updateServiceWorker}
                    className="text-xs bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const AppContent: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </Router>
  )
}

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  )
}
