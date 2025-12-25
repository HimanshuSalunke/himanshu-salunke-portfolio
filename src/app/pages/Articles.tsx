import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Button } from '../../components/ui/Button'
import { SearchAndFilter } from '../../components/ui/SearchAndFilter'
import CinematicArticleCard from '../../components/articles/redesign/CinematicArticleCard'
import { articles } from '../../data/articles'
import ArticleEngagementMetrics from '../../components/articles/ArticleEngagementMetrics'
import ArticleCategories from '../../components/articles/ArticleCategories'

const statuses = ['All', 'Featured', 'Regular']

const sortOptions = [
  { value: 'date', label: 'Latest', icon: '🕒' },
  { value: 'title', label: 'Title', icon: '🔤' },
  { value: 'readTime', label: 'Read Time', icon: '⏱️' }
]

const Articles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime'>('date')

  // Force scroll to top on mount to fix reload issue
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Dynamically calculate categories from articles
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(articles.map(article => article.category).filter(Boolean))]
    return ['All', ...uniqueCategories.sort()]
  }, [])

  const filteredArticles = useMemo(() => {
    const filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' ||
        (selectedStatus === 'Featured' && article.featured) ||
        (selectedStatus === 'Regular' && !article.featured)

      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort articles using dynamic data from localStorage
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'readTime':
          return a.readTime - b.readTime
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, selectedStatus, sortBy])

  return (
    <>
      <Helmet>
        <title>Articles - Portfolio</title>
        <meta name="description" content="Comprehensive articles on Machine Learning, Deep Learning, and Reinforcement Learning. Explore AI/ML concepts, algorithms, and practical applications." />
        <meta property="og:title" content="Knowledge Hub - AI/ML Articles" />
        <meta property="og:description" content="Comprehensive articles on Machine Learning, Deep Learning, and Reinforcement Learning. Explore AI/ML concepts, algorithms, and practical applications." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen py-24 px-4 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >


            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 leading-tight">
              Articles
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 pr-2 pb-1">
                Magazine
              </span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Explorations in Machine Learning, Deep Learning, and Neural Networks.
            </p>
          </motion.div>

          {/* Article Engagement Metrics - Preserved */}
          <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <ArticleEngagementMetrics />
          </motion.div>

          {/* Controls Section (Categories + Search) */}
          <motion.div
            className="mb-12 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ArticleCategories />

            <div className="bg-white dark:bg-neutral-900/50 p-2 rounded-2xl border border-neutral-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
              <SearchAndFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                statuses={statuses}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                sortBy={sortBy}
                onSortChange={(value) => setSortBy(value as 'date' | 'title' | 'readTime')}
                sortOptions={sortOptions}
              />
            </div>
          </motion.div>

          {/* Results Counter */}
          <motion.div
            className="mb-8 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                // FOUND {filteredArticles.length} ENTRY(IES)
            </p>

            {(searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setSelectedStatus('All')
                  setSortBy('date')
                }}
                className="text-sm text-red-500 hover:text-red-600 font-bold transition-colors"
              >
                RESET FILTERS
              </button>
            )}
          </motion.div>

          {/* Articles Grid - Using Cinematic Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {filteredArticles.map((article, index) => (
              <CinematicArticleCard key={article.id} article={article} index={index} />
            ))}
          </motion.div>

          {/* No Results State */}
          {filteredArticles.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-3xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                No signals found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Try adjusting your search frequency or filters.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setSelectedStatus('All')
                  setSortBy('date')
                }}
                variant="primary"
                size="sm"
              >
                Reset Signal
              </Button>
            </motion.div>
          )}

        </div>
      </div>
    </>
  )
}

export default Articles
