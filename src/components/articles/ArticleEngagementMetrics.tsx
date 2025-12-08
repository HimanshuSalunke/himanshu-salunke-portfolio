import React from 'react'
import { motion } from 'framer-motion'
import { articles } from '../../data/articles'

const ArticleEngagementMetrics: React.FC = () => {
  // Calculate dynamic metrics
  const avgReadTime = Math.round(articles.reduce((sum, article) => sum + article.readTime, 0) / articles.length * 10) / 10
  const featuredCount = articles.filter(article => article.featured).length

  const metrics = [
    {
      title: 'Articles Published',
      value: articles.length,
      description: 'Published articles across all categories',
      icon: '📝',
      color: 'from-blue-500 to-blue-600',
      trend: 'up',
      trendValue: `+${articles.length} published on LinkedIn`
    },
    {
      title: 'Words Written',
      value: articles.reduce((sum, article) => sum + (article.readTime * 200), 0).toLocaleString(),
      description: 'Total words across all articles',
      icon: '✍️',
      color: 'from-green-500 to-green-600',
      trend: 'up',
      trendValue: 'Comprehensive content'
    },
    {
      title: 'Avg. Read Time',
      value: `${avgReadTime} min`,
      description: 'Average reading time per article',
      icon: '⏱️',
      color: 'from-purple-500 to-purple-600',
      trend: 'stable',
      trendValue: 'Optimal length'
    },
    {
      title: 'Publishing',
      value: 'Weekly',
      description: 'Content publication frequency',
      icon: '📅',
      color: 'from-orange-500 to-orange-600',
      trend: 'stable',
      trendValue: 'Consistent schedule'
    }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈'
      case 'down':
        return '📉'
      case 'stable':
        return '➡️'
      default:
        return ''
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400'
      case 'down':
        return 'text-red-600 dark:text-red-400'
      case 'stable':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-neutral-600 dark:text-neutral-400'
    }
  }

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          📊 Article Engagement Metrics
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          Track the performance and impact of my content
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            className="group relative bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -2, scale: 1.02 }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="text-2xl sm:text-3xl">{metric.icon}</div>
                {metric.trend && metric.trendValue && (
                  <div className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    <span>{getTrendIcon(metric.trend)}</span>
                    <span>{metric.trendValue}</span>
                  </div>
                )}
              </div>

              {/* Value */}
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                {metric.value}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                {metric.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {metric.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Personal Quote */}
      <motion.div
        className="mt-6 sm:mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-neutral-200 dark:border-neutral-600">
          <blockquote className="text-sm sm:text-base md:text-lg italic text-neutral-700 dark:text-neutral-300 mb-3 sm:mb-4">
            "Writing is not just about sharing knowledge. It's about learning, growing, and connecting with 
            a community of passionate developers."
          </blockquote>
          <footer className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            — Himanshu Kishor Salunke
          </footer>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ArticleEngagementMetrics
