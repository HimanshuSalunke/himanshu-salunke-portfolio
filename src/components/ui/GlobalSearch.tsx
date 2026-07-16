import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, FileText, FolderOpen, LayoutGrid, Rocket, Search, Sparkles, X } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  type: 'project' | 'article' | 'page'
  url: string
  description?: string
  category?: string
}

interface GlobalSearchProps {
  variant?: 'default' | 'cinematic'
  expand?: boolean
}

const SEARCH_DATA: SearchResult[] = [
  {
    id: '1',
    title: 'AI/ML Dashboard',
    type: 'project',
    url: '/work/ai-ml-dashboard',
    description: 'Machine learning dashboard with real-time analytics',
    category: 'AI/ML'
  },
  {
    id: '2',
    title: 'React Performance Optimizer',
    type: 'project',
    url: '/work/react-performance-optimizer',
    description: 'Tool for optimizing React application performance',
    category: 'Web Development'
  },
  {
    id: '3',
    title: 'Modern React Dashboard',
    type: 'project',
    url: '/work/react-dashboard',
    description: 'A comprehensive dashboard built with React, TypeScript, and modern UI components',
    category: 'Web Development'
  },
  {
    id: '4',
    title: 'Mobile App',
    type: 'project',
    url: '/work/mobile-app',
    description: 'Cross-platform mobile application with React Native',
    category: 'Mobile Development'
  },
  {
    id: '5',
    title: 'Machine Learning Fundamentals',
    type: 'article',
    url: 'https://www.linkedin.com/pulse/what-machine-learning-himanshu-salunke-dwgef/',
    description: 'A comprehensive introduction to machine learning concepts',
    category: 'Machine Learning'
  },
  {
    id: '6',
    title: 'Linear Regression Guide',
    type: 'article',
    url: 'https://www.linkedin.com/pulse/what-regression-machine-learning-himanshu-salunke-m0zff/',
    description: 'Master linear regression from basics to advanced concepts',
    category: 'Machine Learning'
  },
  {
    id: '7',
    title: 'Gradient Descent',
    type: 'article',
    url: 'https://www.linkedin.com/pulse/what-gradient-descent-machine-learning-himanshu-salunke-ray0f/',
    description: 'Comprehensive guide to gradient descent optimization algorithm',
    category: 'Machine Learning'
  },
  {
    id: '8',
    title: 'About Me',
    type: 'page',
    url: '/about',
    description: 'Learn more about my background and experience',
    category: 'Profile'
  },
  {
    id: '9',
    title: 'Contact',
    type: 'page',
    url: '/contact',
    description: 'Get in touch with me',
    category: 'Contact'
  },
  {
    id: '10',
    title: 'Work',
    type: 'page',
    url: '/work',
    description: 'View my portfolio of projects and case studies',
    category: 'Portfolio'
  },
  {
    id: '11',
    title: 'Articles',
    type: 'page',
    url: '/articles',
    description: 'Read my latest articles and blog posts',
    category: 'Blog'
  },
  {
    id: '12',
    title: 'Now',
    type: 'page',
    url: '/now',
    description: 'What I\'m currently working on and learning',
    category: 'Current'
  }
]

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ variant = 'default', expand = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isCinematic = variant === 'cinematic'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true)
      const filtered = SEARCH_DATA.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setResults(filtered)
      setIsLoading(false)
    } else {
      setResults([])
    }
  }, [searchTerm])

  // Handle keyboard events and backdrop clicks
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeSearch()
      }
    }

    const handleBackdropClick = (event: MouseEvent) => {
      // Check if click is outside the modal content
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeSearch()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleBackdropClick)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleBackdropClick)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
    }
    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [])

  const handleResultClick = (result: SearchResult) => {
    if (result.url.startsWith('http')) {
      window.open(result.url, '_blank', 'noopener,noreferrer')
    } else {
      navigate(result.url)
    }
    closeSearch()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Rocket className="h-3.5 w-3.5" />
      case 'article':
        return <FileText className="h-3.5 w-3.5" />
      case 'page':
        return <FileText className="h-3.5 w-3.5" />
      default:
        return <Search className="h-3.5 w-3.5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'from-blue-500 to-purple-500'
      case 'article':
        return 'from-purple-500 to-cyan-500'
      case 'page':
        return 'from-blue-600 to-indigo-600'
      default:
        return 'from-neutral-500 to-neutral-600'
    }
  }

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case 'project':
        return 'border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-300'
      case 'article':
        return 'border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-300'
      case 'page':
        return 'border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300'
      default:
        return 'border-neutral-500/25 bg-neutral-500/10 text-neutral-600 dark:text-neutral-400'
    }
  }

  const closeSearch = () => {
    setIsOpen(false)
    setSearchTerm('')
    setResults([])
  }

  const quickLinks = SEARCH_DATA.filter((item) => item.type === 'page').slice(0, 4)
  const groupedResults = {
    project: results.filter((item) => item.type === 'project'),
    article: results.filter((item) => item.type === 'article'),
    page: results.filter((item) => item.type === 'page'),
  }

  const renderCinematicResult = (result: SearchResult, index: number) => (
    <motion.button
      key={result.id}
      type="button"
      className="group flex w-full cursor-pointer touch-manipulation items-center gap-3 rounded-xl border border-transparent p-3 text-left transition-all hover:border-purple-500/20 hover:bg-purple-500/[0.06] dark:hover:bg-purple-500/10"
      onClick={() => handleResultClick(result)}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={prefersReducedMotion ? undefined : { x: 2 }}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${getTypeColor(result.type)} text-white shadow-md shadow-purple-500/10`}
      >
        {getTypeIcon(result.type)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-neutral-900 dark:text-white">{result.title}</h3>
          <span
            className={`shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-wider ${getTypeBadgeClass(result.type)}`}
          >
            {result.type}
          </span>
        </div>
        <p className="truncate text-xs text-neutral-600 dark:text-neutral-400">{result.description}</p>
        {result.category && (
          <p className="mt-1 font-mono text-[0.5625rem] text-purple-600 dark:text-purple-400">{result.category}</p>
        )}
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-purple-500" />
    </motion.button>
  )

  const renderCinematicBody = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center px-6 py-10">
          <motion.div
            className="h-8 w-8 rounded-full border-2 border-purple-500/20 border-t-purple-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">Searching...</p>
        </div>
      )
    }

    if (results.length > 0) {
      return (
        <div className="space-y-4 p-2 sm:p-3">
          <p className="px-2 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-neutral-500">
            {results.length} result{results.length === 1 ? '' : 's'} found
          </p>
          {(['project', 'article', 'page'] as const).map((type) => {
            const items = groupedResults[type]
            if (items.length === 0) return null
            return (
              <div key={type}>
                <p className="mb-1.5 px-2 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-neutral-500">
                  {type === 'project' ? 'Projects' : type === 'article' ? 'Articles' : 'Pages'}
                </p>
                <div className="space-y-1">{items.map((result, index) => renderCinematicResult(result, index))}</div>
              </div>
            )
          })}
        </div>
      )
    }

    if (searchTerm.length > 0) {
      return (
        <div className="flex flex-col items-center px-6 py-10 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/5">
            <Search className="h-5 w-5 text-purple-500" />
          </div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">No matches found</h3>
          <p className="mt-1 max-w-xs text-xs text-neutral-600 dark:text-neutral-400">
            Try a project name, article topic, or page like Work or Contact.
          </p>
        </div>
      )
    }

    return (
      <div className="space-y-4 p-3 sm:p-4">
        <div className="flex items-start gap-3 rounded-xl border border-purple-500/15 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 p-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">Search the portfolio</p>
            <p className="mt-0.5 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              Jump to projects, articles, or any page. Start typing or pick a shortcut below.
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 px-1 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-neutral-500">Quick links</p>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleResultClick(link)}
                className="flex items-center gap-2 rounded-xl border border-purple-500/15 bg-white/60 px-3 py-2.5 text-left text-sm font-medium text-neutral-700 transition-all hover:border-purple-500/35 hover:bg-purple-500/5 dark:bg-neutral-950/40 dark:text-neutral-200 dark:hover:bg-purple-500/10"
              >
                <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-purple-500" />
                <span className="truncate">{link.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 px-1 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-neutral-500">Browse by type</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Projects', icon: Rocket, query: 'project' },
              { label: 'Articles', icon: FileText, query: 'machine' },
              { label: 'Pages', icon: FolderOpen, query: 'about' },
            ].map(({ label, icon: Icon, query }) => (
              <button
                key={label}
                type="button"
                onClick={() => setSearchTerm(query)}
                className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-all hover:border-purple-500/40 hover:bg-purple-500/10 dark:text-neutral-300"
              >
                <Icon className="h-3.5 w-3.5 text-purple-500" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const triggerClass = isCinematic
    ? `flex h-9 min-w-[36px] touch-manipulation items-center justify-center gap-1.5 rounded-full border border-neutral-300/90 bg-white px-2.5 text-sm font-medium text-neutral-900 shadow-md shadow-neutral-900/10 backdrop-blur-md transition-all hover:border-purple-500/55 hover:text-purple-800 dark:border-purple-500/45 dark:bg-[#0a0a18]/95 dark:text-neutral-100 dark:shadow-purple-500/15 dark:hover:border-purple-400/60 dark:hover:text-purple-200 sm:min-w-0 lg:px-3.5 ${expand ? 'h-11 w-full min-w-0 justify-between px-3.5 text-neutral-900 dark:text-neutral-100' : ''}`
    : 'group relative rounded-2xl bg-gradient-to-r from-neutral-100 to-neutral-200 p-3 shadow-lg transition-all duration-300 hover:from-primary-100 hover:to-secondary-100 hover:shadow-xl dark:from-neutral-700 dark:to-neutral-600 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20'

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(true)}
        className={triggerClass}
        whileHover={prefersReducedMotion ? undefined : { scale: isCinematic ? 1.02 : 1.05, y: isCinematic ? 0 : -2 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        aria-label="Open search"
      >
        <Search
          className={
            isCinematic
              ? 'h-4 w-4 shrink-0 text-purple-600 dark:text-purple-300'
              : 'h-5 w-5 text-neutral-600 transition-colors group-hover:text-primary-600 dark:text-neutral-300 dark:group-hover:text-primary-400'
          }
        />
        {isCinematic && (
          <>
            <span className={`font-medium ${expand ? 'inline' : 'hidden lg:inline'}`}>Search</span>
            <kbd className={`rounded-md border border-purple-500/25 bg-purple-500/10 px-1.5 py-0.5 font-mono text-[0.5625rem] text-neutral-600 dark:border-purple-500/35 dark:bg-purple-500/15 dark:text-neutral-300 ${expand ? 'hidden sm:inline' : 'hidden xl:inline'}`}>
              ⌘K
            </kbd>
          </>
        )}
        {!isCinematic && (
          <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
        )}
      </motion.button>

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  className={
                    isCinematic
                      ? 'fixed inset-0 z-[9998] bg-[#030014]/80 backdrop-blur-xl'
                      : 'fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm'
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeSearch}
                />

                <motion.div
                  ref={modalRef}
                  className={
                    isCinematic
                      ? 'fixed inset-x-3 top-[calc(var(--header-offset)+0.75rem)] z-[9999] mx-auto max-w-xl sm:inset-x-4 sm:left-1/2 sm:w-[calc(100%-2rem)] sm:-translate-x-1/2'
                      : 'fixed left-2 right-2 top-[calc(var(--header-offset)+0.5rem)] z-[9999] mx-auto max-w-lg sm:left-1/2 sm:right-auto sm:-translate-x-1/2'
                  }
                  initial={{ opacity: 0, scale: 0.96, y: isCinematic ? 12 : -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: isCinematic ? 12 : -10 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
              <div
                className={
                  isCinematic
                    ? 'relative overflow-hidden rounded-2xl border border-purple-500/30 bg-white/95 shadow-2xl shadow-purple-500/20 backdrop-blur-xl dark:bg-[#030014]/95'
                    : 'overflow-hidden rounded-3xl border border-neutral-200/20 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-neutral-700/30 dark:bg-neutral-800/90'
                }
              >
                {isCinematic && (
                  <>
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:1.625rem_1.625rem] opacity-40" />
                  </>
                )}

                <div
                  className={`relative border-b p-3 sm:p-4 ${isCinematic ? 'border-purple-500/15 dark:border-purple-500/20' : 'border-neutral-200/30 dark:border-neutral-700/30'}`}
                >
                  {isCinematic ? (
                    <div className="mb-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
                        <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                          // Quick Search
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={closeSearch}
                        className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-purple-500/10 hover:text-neutral-900 dark:hover:text-white"
                        aria-label="Close search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : null}

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
                      <Search className={`h-4 w-4 ${isCinematic ? 'text-purple-500' : 'text-neutral-400'}`} />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search projects, articles, pages..."
                      className={
                        isCinematic
                          ? 'w-full touch-manipulation rounded-xl border border-purple-500/25 bg-white/90 py-2.5 pl-9 pr-9 text-sm text-neutral-900 shadow-inner shadow-purple-500/5 placeholder-neutral-500 transition-all focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:bg-neutral-950/80 dark:text-white dark:placeholder-neutral-500 sm:pl-10 sm:pr-10'
                          : 'w-full touch-manipulation rounded-xl border-2 border-neutral-200/50 bg-gradient-to-r from-neutral-50 to-neutral-100 py-3 pl-10 pr-10 text-base text-neutral-900 shadow-lg transition-all duration-300 placeholder-neutral-500 focus:border-primary-500 focus:shadow-xl focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-600/50 dark:from-neutral-700 dark:to-neutral-800 dark:text-white dark:placeholder-neutral-400 dark:focus:border-primary-400 sm:pl-12 sm:pr-12'
                      }
                      autoFocus
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4"
                        aria-label="Clear search"
                      >
                        <span className="rounded-lg p-1.5 text-neutral-500 hover:bg-purple-500/10 hover:text-neutral-900 dark:hover:text-white">
                          <X className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                <div className={isCinematic ? 'relative max-h-[min(50vh,26rem)] overflow-y-auto' : 'max-h-44 overflow-y-auto sm:max-h-56'}>
                  {isCinematic ? (
                    renderCinematicBody()
                  ) : isLoading ? (
                    <div className="p-6 text-center">
                      <motion.div
                        className="mx-auto h-6 w-6 rounded-full border-2 border-primary-500/20 border-t-primary-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">Searching...</p>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="p-1">
                      {results.map((result, index) => (
                        <motion.div
                          key={result.id}
                          className="cursor-pointer touch-manipulation rounded-xl p-3 transition-colors hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50"
                          onClick={() => handleResultClick(result)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r ${getTypeColor(result.type)} text-white shadow-md`}
                            >
                              {getTypeIcon(result.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                                {result.title}
                              </h3>
                              <p className="truncate text-xs text-neutral-600 dark:text-neutral-400">
                                {result.description}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : searchTerm.length > 0 ? (
                    <div className="p-6 text-center">
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">No results found</h3>
                      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Try searching for something else</p>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Start typing to search</h3>
                      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                        Search for projects, articles, or pages
                      </p>
                    </div>
                  )}
                </div>

                <div
                  className={`relative border-t p-3 ${isCinematic ? 'border-purple-500/15 bg-purple-500/[0.04] dark:border-purple-500/20 dark:bg-purple-500/[0.07]' : 'border-neutral-200/30 bg-neutral-50/50 dark:border-neutral-700/30 dark:bg-neutral-800/50'}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <kbd className="rounded-md border border-purple-500/20 bg-white/80 px-1.5 py-0.5 font-mono text-[0.5625rem] dark:bg-neutral-900/80">
                        ⌘K
                      </kbd>
                      <span>open</span>
                      <span className="text-neutral-400">·</span>
                      <kbd className="rounded-md border border-purple-500/20 bg-white/80 px-1.5 py-0.5 font-mono text-[0.5625rem] dark:bg-neutral-900/80">
                        ESC
                      </kbd>
                      <span>close</span>
                    </span>
                    {isCinematic && (
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-purple-600 dark:text-purple-400">
                        Portfolio index
                      </span>
                    )}
                  </div>
                </div>
              </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}

export default GlobalSearch
