import React, { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Tag } from '../../components/ui/Tag'
import { Button } from '../../components/ui/Button'
import { ImageWithShimmer } from '../../components/ui/ImageWithShimmer'
import { TableOfContents, MobileTableOfContents } from '../../components/ui/TableOfContents'
import { ReadingProgress } from '../../components/ui/ReadingProgress'
import { ProjectGallery } from '../../components/ui/ProjectGallery'

import { MDXContentRenderer } from '../../components/mdx/MDXContentRenderer'
import { TechBadge } from '../../components/ui/TechBadge'
import { ErrorBoundary } from '../../components/ErrorBoundary'
import { type Project } from '../../utils/clientMdx'
import { fetchProject, fetchRelatedProjects } from '../../utils/projectAPI'
import { SITE_CONFIG, getCurrentUrl } from '../../config/site'
import ProjectHero from '../../components/project/redesign/ProjectHero'
import ProjectSidebar from '../../components/project/redesign/ProjectSidebar'


import RelatedProjects from '../../components/project/redesign/RelatedProjects'

const Project: React.FC = () => {

  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  // const { currentUrl } = useSafeWindow() // Removed unused hook
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])
  const [relatedLoading, setRelatedLoading] = useState(false)

  // Memoized project loading function
  useEffect(() => {
    if (!slug) return

    let isActive = true
    setLoading(true)
    setError(null)

    fetchProject(slug)
      .then((data) => {
        if (!isActive) return

        if (data) {
          setProject(data)
        } else {
          setError('Project not found')
        }
      })
      .catch((err) => {
        if (!isActive) return
        console.error('Failed to load project:', err)
        setError('Failed to load project')
      })
      .finally(() => {
        if (isActive) setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [slug])

  // Load related projects when project loads
  useEffect(() => {
    if (project && project.slug) {
      setRelatedLoading(true)
      fetchRelatedProjects(project.slug, 3)
        .then(setRelatedProjects)
        .catch(err => console.warn('Failed to load related projects:', err))
        .finally(() => setRelatedLoading(false))
    }
  }, [project])

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0)
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
    return () => clearTimeout(timeout)
  }, [slug])

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


        {/* Immersive Hero */}
        <ProjectHero project={project} />

        {/* Main Split Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Content (Narrative) */}
            <div className="lg:col-span-8 space-y-12 order-2 lg:order-1">
              <MDXContentRenderer content={project.content} />
            </div>

            {/* Right Sidebar (Sticky) */}
            <div className="lg:col-span-4 relative order-1 lg:order-2">
              <div className="sticky top-24">
                <ProjectSidebar project={project} />

                {/* Table of Contents used to be here, maybe move it into Sidebar later? 
                            For now, keep sidebar focused on Actions/Stack 
                        */}
              </div>
            </div>

          </div>
        </div>

        {/* Metrics Section (if available) - Optional: Move into sidebar or keep here? 
             User approved "Big Impact Metrics", let's keep them as a full width bar break if they exist?
             Actually, strict case study puts them in the header or sidebar. 
             I put them in Sidebar already. So I will remove this duplicate section.
        */}




        {/* Related Projects */}
        <RelatedProjects projects={relatedProjects} />



      </div>
    </ErrorBoundary>
  )
}

export default Project