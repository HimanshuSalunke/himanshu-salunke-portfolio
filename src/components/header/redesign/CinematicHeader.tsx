import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
        submenu: [
            { name: 'My Tech Stack', href: '/developer' },
        ]
    },
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'Articles', href: '/articles' },
    { name: 'Contact', href: '/contact' },
]

export const CinematicHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    // Improved click-outside handling
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    // Cinematic Header Classes
    // Uses backdrop-blur-xl for that premium "frosted glass" look
    const headerClasses = `fixed left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
        ? 'bg-white/70 dark:bg-black/70 backdrop-blur-xl border-neutral-200/50 dark:border-neutral-800/50 py-3'
        : 'bg-transparent border-transparent py-5'
        }`

    return (
        <motion.header
            ref={menuRef}
            className={headerClasses}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <nav className="relative z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* LOGO - Cleaner, Gradient, No Subtitle */}
                    <Link
                        to="/"
                        className="group relative flex items-center gap-2"
                        aria-label="Home"
                    >
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">H</span>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 group-hover:to-blue-600 dark:group-hover:to-blue-400 transition-all duration-300">
                            Himanshu
                        </span>
                    </Link>

                    {/* DESKTOP NAV - Minimalist with Spotlight Hover */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href
                            const hasSubmenu = item.submenu && item.submenu.length > 0

                            return (
                                <div
                                    key={item.name}
                                    className="relative group px-1"
                                    onMouseEnter={() => hasSubmenu && setOpenDropdown(item.name)}
                                    onMouseLeave={() => hasSubmenu && setOpenDropdown(null)}
                                >
                                    <Link
                                        to={item.href}
                                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'text-white bg-neutral-900 dark:bg-white dark:text-black shadow-lg shadow-neutral-500/20'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50'
                                            }`}
                                    >
                                        {item.name}
                                        {hasSubmenu && (
                                            <span className="ml-1 text-[10px] opacity-70">▾</span>
                                        )}
                                    </Link>

                                    {/* Dropdown - Glass Panel */}
                                    <AnimatePresence>
                                        {hasSubmenu && openDropdown === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-2 w-48 p-1 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl overflow-hidden"
                                            >
                                                {item.submenu!.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        to={sub.href}
                                                        className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800 rounded-xl transition-colors"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3">
                        {/* Global Search - slightly smaller/cleaner if possible, leveraging existing component */}
                        <div className="hidden sm:block">
                            <GlobalSearch />
                        </div>

                        {/* Resume - 'Ghost' Style */}
                        <motion.a
                            href="/Himanshu_Salunke_Resume.pdf"
                            download="Himanshu_Salunke_Resume.pdf"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Resume</span>
                        </motion.a>

                        {/* Theme Toggle - Minimalist */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                            whileHover={{ rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {theme === 'light' ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400"
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Full Screen Glass */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden fixed inset-0 top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-3xl overflow-y-auto"
                    >
                        <div className="pt-28 px-6 space-y-4">
                            {navigation.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        to={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block p-4 text-2xl font-semibold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800"
                                    >
                                        {item.name}
                                    </Link>
                                    {/* Flatten submenu for mobile for simplicity */}
                                    {item.submenu?.map(sub => (
                                        <Link
                                            key={sub.name}
                                            to={sub.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block pl-8 py-3 text-lg text-neutral-500 dark:text-neutral-400"
                                        >
                                            ↳ {sub.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            ))}

                            <motion.a
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                href="/Himanshu_Salunke_Resume.pdf"
                                download
                                className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-full bg-blue-600 text-white font-medium"
                            >
                                Download Resume
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
