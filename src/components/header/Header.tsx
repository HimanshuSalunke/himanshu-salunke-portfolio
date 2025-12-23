import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { GlobalSearch } from '../ui/GlobalSearch'

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
    submenu: [
      { name: 'My Tech Stack', href: '/developer' },
    ]
  },
  { name: 'Work', href: '/work' },
  { name: 'Services', href: '/services' },
  { name: 'Articles', href: '/articles' },
  { name: 'Contact', href: '/contact' },
]

const getPageDescription = (pageName: string): string => {
  const descriptions: Record<string, string> = {
    'Home': 'Impact & Navigation Hub',
    'About': 'Personal Story & Mission',
    'Work': 'Project Portfolio & Case Studies',
    'Services': 'Freelance AI/ML & Software Development',
    'Articles': 'Knowledge Hub & Thought Leadership',
    'Contact': 'Collaboration & Connection'
  }
  return descriptions[pageName] || pageName
}

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false)
  }, [location])

  // Handle click outside and mouse leave to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const handleMouseLeave = () => {
      setIsMenuOpen(false)
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      if (menuRef.current) {
        menuRef.current.addEventListener('mouseleave', handleMouseLeave)
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (menuRef.current) {
        menuRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.header
      ref={menuRef}
      className={`fixed left-0 right-0 z-40 transition-all duration-300 top-0 ${isScrolled
          ? 'bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-sm border-b border-neutral-200/20 dark:border-neutral-800/20'
          : 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm md:bg-transparent md:dark:bg-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav id="navigation" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-1.5 sm:space-x-2 text-xl font-bold text-neutral-900 dark:text-white"
            aria-label="Home"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-7 w-7 sm:h-8 sm:w-8 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </motion.div>
            <div className="block">
              <span className="text-base sm:text-lg md:text-xl font-bold drop-shadow-sm text-blue-600 dark:text-blue-300">
                Himanshu
              </span>
              <div className="text-xs sm:text-xs text-neutral-500 dark:text-neutral-300 -mt-0.5 sm:-mt-1 drop-shadow-sm hidden sm:block">
                Aspiring Data Scientist
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => {
              const hasSubmenu = item.submenu && item.submenu.length > 0
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => hasSubmenu && setOpenDropdown(item.name)}
                  onMouseLeave={() => hasSubmenu && setOpenDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-all duration-200 relative hover:scale-105 flex items-center gap-1 ${location.pathname === item.href || (hasSubmenu && location.pathname.startsWith(item.href))
                        ? 'text-primary-500'
                        : 'text-neutral-600 hover:text-primary-500 dark:text-neutral-200 dark:hover:text-primary-400'
                      }`}
                    title={`${item.name} - ${getPageDescription(item.name)}`}
                  >
                    {item.name}
                    {hasSubmenu && (
                      <svg className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    {location.pathname === item.href && !hasSubmenu && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasSubmenu && openDropdown === item.name && (
                    <motion.div
                      className="absolute top-full left-0 w-48 z-50 -mt-1"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="pt-2 pb-1">
                        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* Resume Download */}
            <motion.a
              href="/Himanshu_Salunke_Resume.pdf"
              download="Himanshu_Salunke_Resume.pdf"
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Download Resume"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Resume
            </motion.a>

            {/* Global Search */}
            <GlobalSearch />


            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="rounded-lg p-2.5 sm:p-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-white md:hidden bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-white/98 dark:bg-neutral-950/98 backdrop-blur-md border-t border-neutral-200/30 dark:border-neutral-800/30 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="space-y-0.5 sm:space-y-1 pb-2 sm:pb-3 pt-1 sm:pt-2">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <div>
                      <Link
                        to={item.href}
                        className={`block rounded-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] touch-manipulation ${location.pathname === item.href || (item.submenu && location.pathname.startsWith(item.href))
                            ? 'bg-primary-100 text-primary-500 dark:bg-primary-900 dark:text-primary-400 shadow-sm'
                            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-white'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          <span className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-300 hidden xs:block">
                            {getPageDescription(item.name)}
                          </span>
                        </div>
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block rounded-lg px-3 py-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Mobile Resume Download */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navigation.length * 0.05, duration: 0.2 }}
                >
                  <motion.a
                    href="/Himanshu_Salunke_Resume.pdf"
                    download="Himanshu_Salunke_Resume.pdf"
                    className="flex items-center gap-2 px-3 py-2.5 sm:py-3 mt-2 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md touch-manipulation"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="hidden xs:inline">Download Resume</span>
                    <span className="xs:hidden">Resume</span>
                  </motion.a>
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
