import React from 'react'
import { motion } from 'framer-motion'
import { articles } from '../../data/articles'
import { FaRobot, FaBrain, FaGamepad } from 'react-icons/fa'

const ArticleCategories: React.FC = () => {
  // Dynamically calculate counts (logic preserved)
  const counts = {
    ml: articles.filter(a => a.category === 'Machine Learning').length,
    dl: articles.filter(a => a.category === 'Deep Learning').length,
    rl: articles.filter(a => a.category === 'Reinforcement Learning').length
  }

  const categories = [
    {
      name: 'Machine Learning',
      icon: FaRobot,
      count: counts.ml,
      color: 'from-purple-500 to-indigo-600',
      description: 'Supervised, Unsupervised & Fundamental Algorithms'
    },
    {
      name: 'Deep Learning',
      icon: FaBrain,
      count: counts.dl,
      color: 'from-blue-500 to-cyan-600',
      description: 'Neural Networks, CNNs, RNNs & Transformers'
    },
    {
      name: 'Reinforcement Learning',
      icon: FaGamepad,
      count: counts.rl,
      color: 'from-green-500 to-emerald-600',
      description: 'Agents, Environments, Policies & Rewards'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categories.map((cat, idx) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + (idx * 0.1) }}
          className="group relative p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-default"
        >
          {/* Hover Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

          <div className="relative z-10 flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <cat.icon className="w-6 h-6" />
            </div>
            <div className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/10 text-xs font-bold font-mono text-neutral-600 dark:text-neutral-300">
              {cat.count} ARTICLES
            </div>
          </div>

          <h3 className="relative z-10 text-lg font-bold text-neutral-900 dark:text-white mb-2">
            {cat.name}
          </h3>
          <p className="relative z-10 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {cat.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export default ArticleCategories
