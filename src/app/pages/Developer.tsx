import React, { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  FaGithub, FaLinkedin
} from 'react-icons/fa'
import { 
  SiCodechef, SiLeetcode, SiGithub, SiLinkedin, SiX
} from 'react-icons/si'
import { useSocialStats } from '../../hooks/useSocialStats'
import { useUnifiedStats } from '../../hooks/useUnifiedStats'
import { TechStack } from '../../components/developer/TechStack'
import LiveDashboard from '../../components/developer/LiveDashboard'
import CodeQualityMetrics from '../../components/developer/CodeQualityMetrics'
import WebsiteInfo from '../../components/developer/WebsiteInfo'

interface SocialPlatform {
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  url: string
  username: string
  color: string
  description: string
  stats?: {
    label: string
    value: string | number
  }[]
}

// This will be populated with real-time data
const getSocialPlatforms = (socialStats: any): SocialPlatform[] => [
  {
    name: 'GitHub',
    icon: SiGithub,
    url: 'https://github.com/HimanshuSalunke',
    username: 'HimanshuSalunke',
    color: 'from-gray-800 to-gray-900',
    description: 'Where the magic happens ✨',
    stats: [
      { label: 'Repositories', value: socialStats.github.isLoading ? 'Loading...' : socialStats.github.repositories || 0 },
      { label: 'Stars', value: socialStats.github.isLoading ? 'Loading...' : socialStats.github.stars || 0 },
      { label: 'Followers', value: socialStats.github.isLoading ? 'Loading...' : socialStats.github.followers || 0 }
    ]
  },
  {
    name: 'LinkedIn',
    icon: SiLinkedin,
    url: 'https://www.linkedin.com/in/himanshuksalunke/',
    username: 'himanshuksalunke',
    color: 'from-blue-600 to-blue-700',
    description: 'Professional networking & ML articles 📝',
    stats: [
      { label: 'Followers', value: '23k+' },
      { label: 'Articles', value: socialStats.linkedin.isLoading ? 'Loading...' : `${socialStats.linkedin.articles || 0}+` },
      // { label: 'Newsletter', value: 'Active' } // Commented out for now
    ]
  },
  // {
  //   name: 'LeetCode',
  //   icon: SiLeetcode,
  //   url: 'https://leetcode.com/u/himanshusalunke/',
  //   username: 'himanshusalunke',
  //   color: 'from-yellow-500 to-orange-500',
  //   description: 'Solving problems, one algorithm at a time 🧠',
  //   stats: [
  //     { label: 'Problems Solved', value: socialStats.leetcode.isLoading ? 'Loading...' : socialStats.leetcode.totalSolved || 0 },
  //     { label: 'Contest Rating', value: socialStats.leetcode.isLoading ? 'Loading...' : socialStats.leetcode.contestRating || 'N/A' },
  //     { label: 'Ranking', value: socialStats.leetcode.isLoading ? 'Loading...' : socialStats.leetcode.ranking || 'N/A' }
  //   ]
  // },
  // {
  //   name: 'CodeChef',
  //   icon: SiCodechef,
  //   url: 'https://www.codechef.com/users/himanshuksalunke',
  //   username: 'himanshuksalunke',
  //   color: 'from-red-500 to-red-600',
  //   description: 'Competitive programming adventures 🏆',
  //   stats: [
  //     { label: 'Problems Solved', value: socialStats.codechef.isLoading ? 'Loading...' : socialStats.codechef.problemsSolved || 'N/A' },
  //     { label: 'Rating', value: socialStats.codechef.isLoading ? 'Loading...' : socialStats.codechef.rating || 'N/A' },
  //     { label: 'Stars', value: socialStats.codechef.isLoading ? 'Loading...' : socialStats.codechef.stars || 'N/A' }
  //   ]
  // },
  // {
  //   name: 'X (Twitter)',
  //   icon: SiX,
  //   url: 'https://x.com/Wiser_0221',
  //   username: 'Wiser_0221',
  //   color: 'from-black to-gray-800',
  //   description: 'Thoughts, updates & tech discussions 🐦',
  //   stats: [
  //     { label: 'Followers', value: socialStats.twitter.isLoading ? 'Loading...' : `${socialStats.twitter.followers > 1000 ? `${Math.floor(socialStats.twitter.followers / 1000)}k+` : `${socialStats.twitter.followers}+`}` },
  //     { label: 'Following', value: socialStats.twitter.isLoading ? 'Loading...' : `${socialStats.twitter.following}+` },
  //     { label: 'Tweets', value: socialStats.twitter.isLoading ? 'Loading...' : `${socialStats.twitter.tweets}+` }
  //   ]
  // }
]

const Developer: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const socialStats = useSocialStats()
  const unifiedStats = useUnifiedStats()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get social platforms with real-time data (memoized for performance)
  const socialPlatforms = useMemo(() => getSocialPlatforms(socialStats), [socialStats])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>Developer Profile - Himanshu Salunke</title>
        <meta name="description" content="Explore my developer journey across GitHub, LinkedIn and other platforms. See my coding activity, contributions, and achievements." />
        <meta property="og:title" content="Developer Profile - Himanshu Salunke" />
        <meta property="og:description" content="Explore my developer journey across multiple platforms" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Developer Profile - Himanshu Salunke" />
        <meta name="twitter:description" content="Explore my developer journey across multiple platforms" />
      </Helmet>

      <motion.div
        className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  background: 'linear-gradient(90deg, hsla(212, 93%, 49%, 1) 0%, hsla(210, 100%, 30%, 1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  MozBackgroundClip: 'text',
                  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#0974F1", endColorstr="#003A7A", GradientType=1)'
                }}
              >
                Developer Dashboard
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-0">
              Deep dive into my technical expertise, coding activity, and development journey. 
              See the metrics that matter for building exceptional software.
            </p>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              <span>Live data • Last updated:</span>
              <span className="font-mono">{new Date().toLocaleString()}</span>
            </div>
          </motion.div>

          {/* Live Development Dashboard */}
          <motion.div
            className="mt-8 sm:mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <LiveDashboard />
          </motion.div>

          {/* Code Quality Metrics */}
          <motion.div
            className="mt-8 sm:mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CodeQualityMetrics />
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div
            className="mt-8 sm:mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <TechStack />
          </motion.div>

          {/* Website Architecture Section */}
          <motion.div
            className="mt-8 sm:mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <WebsiteInfo />
          </motion.div>

          {/* Social Platforms */}
          <motion.div
            className="mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                🌐 Connect With Me
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 px-4 sm:px-0">
                Follow my journey across different platforms and communities
              </p>
            </div>
            
            <div className="grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {socialPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Platform Icon */}
                    <div className="relative z-10 flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg`}>
                        <platform.icon size={16} className="text-white sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 dark:text-white truncate">
                          {platform.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-mono truncate">
                          @{platform.username}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mb-3 sm:mb-4">
                      {platform.description}
                    </p>

                    {/* Stats */}
                    <div className="space-y-1 sm:space-y-2">
                      {platform.stats?.map((stat, statIndex) => (
                        <div key={statIndex} className="flex justify-between items-center text-xs sm:text-sm">
                          <span className="text-neutral-500 dark:text-neutral-400 truncate">
                            {stat.label}
                          </span>
                          <span className="font-semibold text-neutral-900 dark:text-white ml-2">
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Visit Link */}
                    <div className="mt-3 sm:mt-4 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold text-primary-600 dark:text-primary-500 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                      <span>Visit Profile</span>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun Developer Quote */}
          <motion.div
            className="mt-8 sm:mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <blockquote className="text-sm sm:text-base md:text-lg italic text-neutral-600 dark:text-neutral-300 max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
              "Code is like humor. When you have to explain it, it's bad." 
              <footer className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                — Cory House (and every developer ever)
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}

export default Developer
