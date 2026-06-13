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

const isNavActive = (pathname: string, item: NavigationItem) => {
  if (pathname === item.href) return true
  if (item.submenu?.some((sub) => pathname === sub.href)) return true
  if (item.href !== '/' && pathname.startsWith(`${item.href}/`)) return true
  return false
}

export const CinematicHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
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
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const headerSurface = isScrolled
    ? 'border-purple-500/15 bg-white/75 py-3 shadow-lg shadow-purple-500/5 backdrop-blur-xl dark:border-purple-500/20 dark:bg-[#030014]/85'
    : isHomeTop
      ? 'border-transparent bg-transparent py-5'
      : 'border-transparent bg-white/40 py-5 backdrop-blur-md dark:bg-[#030014]/40'

  const logoTextClass = isHomeTop
    ? 'text-neutral-900 dark:text-white'
    : 'text-neutral-900 dark:text-white'

  const navIdleClass = isHomeTop
    ? 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-900/5 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white'
    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-900/5 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white'

  return (
    <>
      <motion.header
        ref={menuRef}
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ${headerSurface}`}
        initial={prefersReducedMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {isScrolled && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
            aria-hidden="true"
          />
        )}

        <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="group relative flex shrink-0 items-center gap-2.5" aria-label="Home">
              <div className="relative h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105">
                {!prefersReducedMotion ? (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 animate-[spin_5s_linear_infinite] rounded-xl opacity-90"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0deg, #3b82f6 70deg, #9333ea 150deg, #22d3ee 230deg, transparent 310deg)',
                    }}
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400"
                  />
                )}
                <div className="absolute inset-[2px] z-10 flex items-center justify-center rounded-[10px] bg-white shadow-sm shadow-purple-500/10 dark:bg-[#030014]">
                  <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-lg font-black text-transparent">
                    H
                  </span>
                </div>
              </div>
              <div className="hidden min-w-0 sm:block">
                <span
                  className={`block text-lg font-bold tracking-tight transition-colors ${logoTextClass} group-hover:text-purple-600 dark:group-hover:text-purple-300`}
                >
                  Himanshu
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-500">
                  Portfolio
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-0.5 md:flex">
              {navigation.map((item) => {
                const active = isNavActive(location.pathname, item)
                const hasSubmenu = Boolean(item.submenu?.length)

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => hasSubmenu && setOpenDropdown(item.name)}
                    onMouseLeave={() => hasSubmenu && setOpenDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className={`relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 lg:px-4 ${
                        active
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-500/25'
                          : navIdleClass
                      }`}
                    >
                      {item.name}
                      {hasSubmenu && (
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`}
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
                          className="absolute left-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-purple-500/20 bg-white/90 p-1.5 shadow-xl shadow-purple-500/10 backdrop-blur-xl dark:border-purple-500/25 dark:bg-[#030014]/95"
                        >
                          {item.submenu!.map((sub) => {
                            const subActive = location.pathname === sub.href
                            return (
                              <Link
                                key={sub.name}
                                to={sub.href}
                                className={`block rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                                  subActive
                                    ? 'bg-purple-500/10 font-medium text-purple-700 dark:text-purple-300'
                                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white'
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
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="hidden sm:block">
                <GlobalSearch variant="cinematic" />
              </div>

              <motion.a
                href="/Himanshu_Salunke_Resume.pdf"
                download="Himanshu_Salunke_Resume.pdf"
                className="hidden h-9 items-center gap-2 rounded-full border border-purple-500/25 bg-white/60 px-3.5 text-sm font-medium text-neutral-700 backdrop-blur-sm transition-all hover:border-purple-500/45 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 hover:text-purple-700 dark:bg-neutral-950/50 dark:text-neutral-200 dark:hover:text-purple-300 lg:flex"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                <Download className="h-4 w-4" />
                <span>Resume</span>
              </motion.a>

              <motion.button
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/25 bg-white/60 text-neutral-500 backdrop-blur-sm transition-all hover:border-purple-500/45 hover:text-purple-700 dark:bg-neutral-950/50 dark:text-neutral-400 dark:hover:text-purple-300"
                whileHover={prefersReducedMotion ? undefined : { rotate: 15, scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </motion.button>

              <motion.button
                onClick={() => setIsMenuOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/25 bg-white/60 text-neutral-600 backdrop-blur-sm transition-all hover:border-purple-500/45 dark:bg-neutral-950/50 dark:text-neutral-300 md:hidden"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <button
              type="button"
              className="absolute inset-0 bg-[#030014]/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            />

            <motion.div
              initial={prefersReducedMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 right-0 top-0 flex w-[min(100%,320px)] flex-col border-l border-purple-500/20 bg-white/95 shadow-2xl shadow-purple-500/10 backdrop-blur-xl dark:bg-[#030014]/98"
            >
              <div className="flex items-center justify-between border-b border-neutral-200/80 px-5 py-4 dark:border-purple-500/15">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Navigation</span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5">
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
                          className={`block rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors ${
                            active
                              ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-purple-700 dark:text-purple-300'
                              : 'text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-white/5'
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
                              className={`block rounded-xl py-2.5 pl-8 pr-4 text-base transition-colors ${
                                subActive
                                  ? 'font-medium text-purple-600 dark:text-purple-400'
                                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
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

              <div className="space-y-3 border-t border-neutral-200/80 p-5 dark:border-purple-500/15">
                <a
                  href="/Himanshu_Salunke_Resume.pdf"
                  download="Himanshu_Salunke_Resume.pdf"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
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
