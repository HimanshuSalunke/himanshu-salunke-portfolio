import React, { useState, useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Tag } from '../../components/ui/Tag'
import { Button } from '../../components/ui/Button'
import { SearchAndFilter } from '../../components/ui/SearchAndFilter'
import { ImageWithShimmer } from '../../components/ui/ImageWithShimmer'
import { formatDate } from '../../utils/formatDate'
import { fetchAllProjects } from '../../utils/projectAPI'
import { type Project } from '../../utils/clientMdx'
import WorkHero from '../../components/work/redesign/WorkHero'
import WorkToolbar from '../../components/work/redesign/WorkToolbar'
import BentoGrid from '../../components/work/redesign/BentoGrid'

const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Load projects from MDX files
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchAllProjects()
        console.log('🔍 Work page - Loaded projects:', projectsData)
        console.log('🔍 Work page - Projects count:', projectsData.length)
        console.log('🔍 Work page - First project:', projectsData[0])
        setProjects(projectsData)
      } catch (error) {
        console.error('❌ Work page - Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'featured' | 'readTime'>('date')

  const categories = ['All', 'Machine Learning', 'Computer Vision', 'Deep Learning', 'Data Analysis', 'Data Engineering']
  const statuses = ['All', 'Completed', 'In Progress', 'Planning']

  const sortOptions = [
    { value: 'date', label: 'Latest', icon: '🕒' },
    { value: 'title', label: 'Title', icon: '🔤' },
    { value: 'featured', label: 'Featured', icon: '⭐' },
    { value: 'readTime', label: 'Read Time', icon: '⏱️' }
  ]

  const filteredProjects = useMemo(() => {
    console.log('🔍 Work page state:', {
      loading,
      projectsCount: projects.length,
      searchTerm,
      selectedCategory,
      selectedStatus,
      sortBy
    })

    const filtered = projects.filter(project => {
      // Safety checks for undefined properties
      if (!project || !project.title || !project.summary || !project.techStack) {
        console.warn('❌ Project missing required properties:', project)
        return false
      }

      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some(tech => tech && tech.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return (a.title || '').localeCompare(b.title || '')
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        case 'readTime':
          // For projects, sort by tech stack length (complexity indicator)
          return (a.techStack?.length || 0) - (b.techStack?.length || 0)
        case 'date':
        default:
          return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      }
    })

    console.log('✅ Work page - Filtered projects:', filtered.length)
    return filtered
  }, [searchTerm, selectedCategory, selectedStatus, sortBy, projects, loading])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading projects...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Work - Portfolio</title>
        <meta name="description" content="Explore my portfolio of web development projects, AI/ML applications, and case studies." />
      </Helmet>

      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">

        {/* Cinematic Hero */}
        <WorkHero />

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Sticky Toolbar */}
          <WorkToolbar
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {/* Dynamic Bento Grid */}
          <div className="min-h-screen pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {filteredProjects.length > 0 ? (
                  <BentoGrid projects={filteredProjects} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-6xl mb-4 opacity-50">🔭</div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">No projects found</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">Try adjusting your search or filters.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </>
  )
}

export default Work
