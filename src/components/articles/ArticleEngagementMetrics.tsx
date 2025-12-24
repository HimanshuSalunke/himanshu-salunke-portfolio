import React from 'react'
import { motion } from 'framer-motion'
import { articles } from '../../data/articles'
import { FaFileAlt, FaPenNib, FaClock, FaCalendarCheck } from 'react-icons/fa'

const ArticleEngagementMetrics: React.FC = () => {
  // Calculate dynamic metrics
  const avgReadTime = Math.round(articles.reduce((sum, article) => sum + article.readTime, 0) / articles.length * 10) / 10

  const metrics = [
    {
      title: 'Total Publications',
      value: articles.length,
      icon: FaFileAlt,
      color: 'text-blue-500',
    },
    {
      title: 'Words Written',
      value: (articles.reduce((sum, article) => sum + (article.readTime * 200), 0) / 1000).toFixed(1) + 'k+',
      icon: FaPenNib,
      color: 'text-purple-500',
    },
    {
      title: 'Avg. Read Time',
      value: `${avgReadTime} min`,
      icon: FaClock,
      color: 'text-orange-500',
    },
    {
      title: 'Frequency',
      value: 'Weekly',
      icon: FaCalendarCheck,
      color: 'text-green-500',
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
        >
          <div className={`p-3 rounded-lg bg-neutral-50 dark:bg-white/5 ${metric.color} group-hover:scale-110 transition-transform`}>
            <metric.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-neutral-900 dark:text-white leading-none mb-1">
              {metric.value}
            </div>
            <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
              {metric.title}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default ArticleEngagementMetrics
