import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Tag } from '../../components/ui/Tag'
import { Button } from '../../components/ui/Button'
import { ImageWithShimmer } from '../../components/ui/ImageWithShimmer'
import { TableOfContents, MobileTableOfContents } from '../../components/ui/TableOfContents'
import { ReadingProgress } from '../../components/ui/ReadingProgress'
import { ProjectGallery } from '../../components/ui/ProjectGallery'
import { SocialShare } from '../../components/ui/SocialShare'
import { MDXContentRenderer } from '../../components/mdx/MDXContentRenderer'
import { TechBadge } from '../../components/ui/TechBadge'
import { ErrorBoundary } from '../../components/ErrorBoundary'
import { formatDate } from '../../utils/formatDate'
import { type Project } from '../../utils/clientMdx'
import { fetchProject, fetchRelatedProjects } from '../../utils/projectAPI'
import { SITE_CONFIG, getCurrentUrl } from '../../config/site'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useSafeWindow } from '../../hooks/useSafeWindow'


const Project: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { handleError, handleAsyncError } = useErrorHandler()
  const { currentUrl } = useSafeWindow()

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const [relatedLoading, setRelatedLoading] = useState(false)

  // Memoized project loading function
  const loadProject = useCallback(async () => {
    if (!slug) {
      setError('No project slug provided')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const projectData = await handleAsyncError(
        () => fetchProject(slug),
        'loadProject',
        { fallbackMessage: 'Failed to load project. Please try again.' }
      )

      if (projectData) {
        setProject(projectData)
      } else {
        setError('Project not found')
      }
    } catch (err) {
      const errorMessage = handleError(err, 'loadProject', {
        fallbackMessage: 'Failed to load project. Please try again.'
      })
      setError(errorMessage || 'Failed to load project')
    } finally {
      setLoading(false)
    }
  }, [slug, handleError, handleAsyncError])

  // Memoized related projects loading
  const loadRelatedProjectsOnly = useCallback(async (projectSlug: string) => {
    try {
      setRelatedLoading(true)

      const relatedResult = await handleAsyncError(
        () => fetchRelatedProjects(projectSlug, 3),
        'loadRelatedProjects',
        { fallbackMessage: 'Failed to load related projects' }
      )

      if (relatedResult) {
        setRelatedProjects(relatedResult)
      }
    } catch (err) {
      // Related projects are not critical, so we don't show errors
      console.warn('Failed to load related projects:', err)
    } finally {
      setRelatedLoading(false)
    }
  }, [handleAsyncError])

  useEffect(() => {
    loadProject()
  }, [loadProject])

  // Load related projects when project loads
  useEffect(() => {
    if (project && project.slug) {
      loadRelatedProjectsOnly(project.slug)
    }
  }, [project, loadRelatedProjectsOnly])

  // Ensure page starts at top when project loads
  useEffect(() => {
    // Immediate scroll reset
    window.scrollTo(0, 0)
    if (document.documentElement) {
      document.documentElement.scrollTop = 0
    }
    if (document.body) {
      document.body.scrollTop = 0
    }

    // Additional scroll reset after content loads
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0)
      if (document.documentElement) {
        document.documentElement.scrollTop = 0
      }
      if (document.body) {
        document.body.scrollTop = 0
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [slug])

  useEffect(() => {
    if (project) {
      loadRelatedProjectsOnly(project.slug)

      // Ensure scroll to top after project content is loaded
      setTimeout(() => {
        window.scrollTo(0, 0)
        if (document.documentElement) {
          document.documentElement.scrollTop = 0
        }
        if (document.body) {
          document.body.scrollTop = 0
        }
      }, 50)
    }
  }, [project, loadRelatedProjectsOnly])

  // Memoized meta data
  const metaData = useMemo(() => {
    if (!project) return null

    return {
      title: `${project.title} - ${SITE_CONFIG.name}`,
      description: project.summary,
      keywords: project.techStack.join(', '),
      url: currentUrl || `${SITE_CONFIG.url}/projects/${project.slug}`,
      image: project.coverImage,
      date: project.date,
      author: SITE_CONFIG.author,
      twitterHandle: SITE_CONFIG.twitterHandle
    }
  }, [project, currentUrl])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"
            role="status"
            aria-label="Loading project"
          ></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading project...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4" role="img" aria-label="Search icon">🔍</div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {error || "The project you're looking for doesn't exist."}
          </p>
          <Button onClick={() => navigate('/work')} aria-label="Go back to work page">
            Back to Work
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Helmet>
        <title>{metaData?.title || `${project.title} - ${SITE_CONFIG.name}`}</title>
        <meta name="description" content={metaData?.description || project.summary} />
        <meta name="keywords" content={metaData?.keywords || project.techStack.join(', ')} />
        <meta name="author" content={metaData?.author || SITE_CONFIG.author} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={metaData?.title || `${project.title} - ${SITE_CONFIG.name}`} />
        <meta property="og:description" content={metaData?.description || project.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${SITE_CONFIG.url}/api/og/${project.slug}?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.summary)}&type=project&date=${project.date}&tags=${encodeURIComponent(project.techStack.join(','))}`} />
        <meta property="og:url" content={metaData?.url || getCurrentUrl()} />
        <meta property="og:site_name" content={SITE_CONFIG.name} />
        <meta property="article:published_time" content={metaData?.date || project.date} />
        <meta property="article:author" content={metaData?.author || SITE_CONFIG.author} />
        {project.techStack.map((tech, index) => (
          <meta key={index} property="article:tag" content={tech} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData?.title || `${project.title} - ${SITE_CONFIG.name}`} />
        <meta name="twitter:description" content={metaData?.description || project.summary} />
        <meta name="twitter:image" content={`${SITE_CONFIG.url}/api/og/${project.slug}?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.summary)}&type=project&date=${project.date}&tags=${encodeURIComponent(project.techStack.join(','))}`} />
        <meta name="twitter:creator" content={metaData?.twitterHandle || SITE_CONFIG.twitterHandle} />

        {/* Additional SEO */}
        <meta name="theme-color" content={SITE_CONFIG.themeColor} />
        <link rel="canonical" href={metaData?.url || getCurrentUrl()} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.summary,
            "author": {
              "@type": "Person",
              "name": SITE_CONFIG.author
            },
            "dateCreated": project.date,
            "image": project.coverImage,
            "url": metaData?.url || getCurrentUrl(),
            "keywords": project.techStack.join(', '),
            "genre": project.category,
            "inLanguage": SITE_CONFIG.language
          })}
        </script>
      </Helmet>

      {/* Reading Progress */}
      <ReadingProgress />

      <div className="min-h-screen">
        {/* Sticky Header */}
        <motion.div
          className="sticky top-16 z-30 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200/20 dark:border-neutral-800/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white truncate">
                  {project.title}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  {formatDate(project.date)}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <Tag variant="primary" size="sm">
                      Featured
                    </Tag>
                  )}
                </div>
                <SocialShare
                  url={currentUrl || getCurrentUrl()}
                  title={project.title}
                  description={project.summary}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Back Button */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/work">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
                  aria-label="Back to all projects"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Projects
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Project Category Badge */}
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {project.category}
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6 sm:mb-8 leading-tight">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed">
                {project.summary}
              </p>

              {/* Project Meta Info */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6 sm:mb-8">
                <div className="flex items-center gap-1 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(project.date)}
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {project.readingTime} min read
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className={`w-2 h-2 rounded-full ${project.status === 'completed' ? 'bg-green-500' :
                    project.status === 'in-progress' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></span>
                  {project.status}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white focus:ring-primary-500 dark:text-white dark:border-primary-300 dark:hover:bg-primary-500 dark:hover:text-white font-semibold drop-shadow-lg shadow-lg px-3 sm:px-4 py-2 text-sm sm:text-base gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md dark:bg-primary-500 dark:hover:bg-primary-400 dark:text-white font-semibold px-3 sm:px-4 py-2 text-sm sm:text-base gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>

            {/* Cover Image - Only show if no gallery images */}
            {(!project.images || project.images.length === 0) && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ImageWithShimmer
                  src={project.coverImage}
                  alt={project.title}
                  className="h-auto object-contain rounded-2xl shadow-2xl bg-neutral-100 dark:bg-neutral-800"
                />
              </motion.div>
            )}

            {/* Project Images Gallery */}
            {project.images && project.images.length > 0 && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ProjectGallery
                  images={project.images}
                  title={project.title}
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="bg-white dark:bg-neutral-900 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                Technology Stack
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Built with modern technologies
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {project.techStack.map((tech, index) => (
                <TechBadge key={tech} tech={tech} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Metrics Section */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="bg-neutral-50 dark:bg-neutral-900 py-4">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {project.metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center shadow-sm border border-neutral-200 dark:border-neutral-700"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-500 mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Table of Contents */}
        <TableOfContents content={project.content} />
        <MobileTableOfContents content={project.content} />

        {/* About Section - MDX Content */}
        <section className="pt-2 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Render MDX content with custom components */}
              <MDXContentRenderer content={project.content} />
            </motion.div>
          </div>
        </section>


        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
                  Related Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedProjects.map((relatedProject, index) => (
                    <motion.div
                      key={relatedProject.slug}
                      className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <Link to={`/projects/${relatedProject.slug}`}>
                        <div className="relative h-auto overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                          <ImageWithShimmer
                            src={relatedProject.coverImage}
                            alt={relatedProject.title}
                            className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <Tag variant="default" size="sm">
                              {relatedProject.category}
                            </Tag>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                            {relatedProject.title}
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
                            {relatedProject.summary}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}


      </div>
    </ErrorBoundary>
  )
}

export default Project