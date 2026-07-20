import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, Download, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../../../context/ThemeContext'
import { GlobalSearch } from '../../ui/GlobalSearch'

interface NavigationItem {
  name: string
  href: string
  submenu?: { name: string; href: string }[]
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    submenu: [{ name: 'My Tech Stack', href: '/developer' }],
  },
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'Articles', href: '/articles' },
  { name: 'Contact', href: '/contact' },
]

/** Prefetch lazy page chunks on hover/focus without changing navigation. */
const routePreloaders: Record<string, () => Promise<unknown>> = {
  '/': () => import('../../../app/pages/Home'),
  '/about': () => import('../../../app/pages/About'),
  '/work': () => import('../../../app/pages/Work'),
  '/services': () => import('../../../app/pages/Services'),
  '/articles': () => import('../../../app/pages/Articles'),
  '/contact': () => import('../../../app/pages/Contact'),
  '/developer': () => import('../../../app/pages/Developer'),
}

const preloadRouteChunk = (href: string) => {
  const load = routePreloaders[href]
  if (!load) return
  void load().catch(() => {
    // Prefetch is best-effort; navigation still works if it fails.
  })
}

const isNavActive = (pathname: string, item: NavigationItem) => {
  if (pathname === item.href) return true
  if (item.submenu?.some((sub) => pathname === sub.href)) return true
  if (item.href !== '/' && pathname.startsWith(`${item.href}/`)) return true
  return false
}

const actionButtonClass =
  'flex h-9 w-9 shrink-0 touch-manipulation items-center justify-center rounded-full border border-neutral-300/90 bg-white text-neutral-900 shadow-md shadow-neutral-900/10 backdrop-blur-md transition-all hover:border-purple-500/55 hover:text-purple-800 dark:border-purple-500/45 dark:bg-[#0a0a18]/95 dark:text-neutral-100 dark:shadow-purple-500/15 dark:hover:border-purple-400/60 dark:hover:bg-[#12102a] dark:hover:text-purple-200 sm:h-9 sm:w-9'

const resumeButtonClass =
  'hidden h-9 touch-manipulation items-center justify-center gap-1.5 rounded-full border border-neutral-300/90 bg-white px-3 text-sm font-semibold text-neutral-900 shadow-md shadow-neutral-900/10 backdrop-blur-md transition-all hover:border-purple-500/55 hover:bg-purple-50 hover:text-purple-800 dark:border-purple-500/45 dark:bg-[#0a0a18]/95 dark:text-neutral-100 dark:shadow-purple-500/15 dark:hover:border-purple-400/60 dark:hover:text-purple-200 sm:flex xl:px-3.5'

export const CinematicHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const isHomeTop = location.pathname === '/' && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const clickedHeader = menuRef.current?.contains(target)
      const clickedDrawer = drawerRef.current?.contains(target)
      if (!clickedHeader && !clickedDrawer) {
        setIsMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setOpenDropdown(null)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  // Surface styles only - height stays fixed via --header-height (no py changes on scroll)
  const headerSurface = isScrolled
    ? 'border-neutral-200/90 bg-white/98 shadow-md shadow-neutral-900/5 backdrop-blur-xl dark:border-purple-500/25 dark:bg-[#030014]/96 dark:shadow-purple-500/10'
    : isHomeTop
      ? 'border-neutral-200/50 bg-white/96 shadow-sm shadow-neutral-900/5 backdrop-blur-md dark:border-transparent dark:bg-[#030014]/88 dark:shadow-none dark:backdrop-blur-md lg:bg-white/90 lg:dark:bg-[#030014]/80'
      : 'border-neutral-200/70 bg-white/97 shadow-sm shadow-neutral-900/5 backdrop-blur-md dark:border-purple-500/15 dark:bg-[#030014]/92 dark:shadow-none'

  const navIdleClass = isHomeTop
    ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-900/5 dark:text-neutral-200 dark:hover:bg-white/10 dark:hover:text-white'
    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-900/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white'

  return (
    <>
      <motion.header
        ref={menuRef}
        className={`fixed left-0 right-0 top-0 z-50 h-[var(--header-offset)] border-b transition-[background-color,border-color,box-shadow] duration-300 ${headerSurface}`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        initial={prefersReducedMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {isScrolled && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
            aria-hidden="true"
          />
        )}

        <nav
          className="relative mx-auto flex h-full max-w-7xl items-center px-3 sm:px-5 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex h-full w-full items-center justify-between gap-2 sm:gap-3">
            {/* Logo */}
            <Link
              to="/"
              className="group relative flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5"
              aria-label="Home"
            >
              <div className="relative h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9">
                {!prefersReducedMotion ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 animate-[spin_5s_linear_infinite] rounded-lg opacity-90"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0deg, #3b82f6 70deg, #9333ea 150deg, #22d3ee 230deg, transparent 310deg)',
                    }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400"
                  />
                )}
                <div className="absolute inset-0.5 z-10 flex items-center justify-center rounded-[0.5rem] bg-white shadow-sm shadow-purple-500/10 dark:bg-[#030014]">
                  <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-sm font-black text-transparent">
                    H
                  </span>
                </div>
              </div>
              <div className="hidden min-w-0 sm:block">
                <span className="block truncate text-sm font-bold leading-tight tracking-tight text-neutral-950 transition-colors group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300">
                  Himanshu
                </span>
                <span className="block font-mono text-[0.5625rem] uppercase leading-tight tracking-[0.18em] text-neutral-600 dark:text-neutral-400">
                  Portfolio
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden flex-1 items-center justify-center gap-0.5 px-2 lg:flex xl:gap-1">
              {navigation.map((item) => {
                const active = isNavActive(location.pathname, item)
                const hasSubmenu = Boolean(item.submenu?.length)

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => {
                      preloadRouteChunk(item.href)
                      if (hasSubmenu) setOpenDropdown(item.name)
                    }}
                    onMouseLeave={() => hasSubmenu && setOpenDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      onFocus={() => preloadRouteChunk(item.href)}
                      className={`relative flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[0.8125rem] font-medium transition-all duration-300 xl:px-3.5 xl:text-sm ${
                        active
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-500/25'
                          : navIdleClass
                      }`}
                    >
                      {item.name}
                      {hasSubmenu && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 shrink-0 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}
                        />
                      )}
                    </Link>

                    <AnimatePresence>
                      {hasSubmenu && openDropdown === item.name && (
                        <motion.div
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-1.5 shadow-xl shadow-neutral-900/10 dark:border-purple-500/25 dark:bg-[#030014]/95"
                        >
                          {item.submenu!.map((sub) => {
                            const subActive = location.pathname === sub.href
                            return (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                onMouseEnter={() => preloadRouteChunk(sub.href)}
                                onFocus={() => preloadRouteChunk(sub.href)}
                                className={`block rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                                  subActive
                                    ? 'bg-purple-500/10 font-medium text-purple-700 dark:bg-purple-500/15 dark:text-purple-200'
                                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:!bg-purple-500/20 dark:hover:!text-white'
                                }`}
                              >
                                {sub.name}
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-1.5 lg:gap-2">
              <GlobalSearch variant="cinematic" />

              <motion.a
                href="/Himanshu_Salunke_Resume.pdf"
                download="Himanshu_Salunke_Resume.pdf"
                title="Download Resume"
                className={resumeButtonClass}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                <Download className="h-4 w-4 shrink-0" />
                <span className="hidden xl:inline">Resume</span>
              </motion.a>

              <motion.button
                onClick={toggleTheme}
                className={actionButtonClass}
                whileHover={prefersReducedMotion ? undefined : { rotate: 15, scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </motion.button>

              <motion.button
                onClick={() => setIsMenuOpen((open) => !open)}
                className={`${actionButtonClass} lg:hidden`}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation-drawer"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile / tablet drawer - above header so it never sits underneath */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <button
              type="button"
              className="absolute inset-0 touch-manipulation bg-neutral-950/40 backdrop-blur-[2px] dark:bg-[#030014]/70"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            />

            <motion.div
              ref={drawerRef}
              id="mobile-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={prefersReducedMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 right-0 top-0 flex w-full max-w-xs flex-col border-l border-neutral-200 bg-white shadow-2xl shadow-neutral-900/15 dark:border-purple-500/30 dark:bg-[#030014] dark:shadow-purple-500/10 sm:max-w-sm"
              style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
              <div
                className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-purple-500/25"
                style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0px))' }}
              >
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:py-5">
                <div className="mb-5">
                  <GlobalSearch variant="cinematic" expand />
                </div>

                <div className="space-y-1">
                  {navigation.map((item, idx) => {
                    const active = isNavActive(location.pathname, item)
                    return (
                      <motion.div
                        key={item.name}
                        initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          onMouseEnter={() => preloadRouteChunk(item.href)}
                          onFocus={() => preloadRouteChunk(item.href)}
                          className={`flex min-h-[44px] touch-manipulation items-center rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                            active
                              ? 'bg-gradient-to-r from-blue-600/12 to-purple-600/18 text-purple-950 dark:from-blue-500/15 dark:to-purple-500/20 dark:text-purple-100'
                              : 'text-neutral-950 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-white/8'
                          }`}
                        >
                          {item.name}
                        </Link>
                        {item.submenu?.map((sub) => {
                          const subActive = location.pathname === sub.href
                          return (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => setIsMenuOpen(false)}
                              onMouseEnter={() => preloadRouteChunk(sub.href)}
                              onFocus={() => preloadRouteChunk(sub.href)}
                              className={`flex min-h-[40px] touch-manipulation items-center rounded-xl py-2 pl-7 pr-4 text-sm transition-colors ${
                                subActive
                                  ? 'font-semibold text-purple-800 dark:text-purple-200'
                                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-200 dark:hover:!bg-purple-500/20 dark:hover:!text-white'
                              }`}
                            >
                              {sub.name}
                            </Link>
                          )
                        })}
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3 border-t border-neutral-200 p-4 dark:border-purple-500/25 sm:p-5">
                <a
                  href="/Himanshu_Salunke_Resume.pdf"
                  download="Himanshu_Salunke_Resume.pdf"
                  className="flex min-h-[44px] w-full touch-manipulation items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
