import React from 'react'
import { motion } from 'framer-motion'

interface ProjectMilestone {
  date: string
  title: string
  description: string
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  icon: string
  color: string
}

interface ProjectTimelineProps {
  projects: any[]
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ projects }) => {
  // Create milestones from projects
  const milestones: ProjectMilestone[] = projects
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
    .map((project, index) => ({
      date: project.date,
      title: project.title,
      description: project.summary,
      category: project.category,
      status: project.status === 'Completed' ? 'completed' : project.status === 'In Progress' ? 'in-progress' : 'planned',
      icon: getCategoryIcon(project.category),
      color: getCategoryColor(project.category)
    }))

  function getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Machine Learning': '🤖',
      'Deep Learning': '🧠',
      'Computer Vision': '👁️',
      'Data Analysis': '📊',
      'Data Engineering': '⚙️',
      // Legacy mappings for backwards compatibility
      'AI/ML': '🤖',
      'Data Science': '📊',
      'Web Development': '🌐',
      'Mobile': '📱',
      'DevOps': '☁️'
    }
    return icons[category] || '💻'
  }

  function getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Machine Learning': 'from-red-500 to-red-600',
      'Deep Learning': 'from-purple-500 to-purple-600',
      'Computer Vision': 'from-blue-500 to-blue-600',
      'Data Analysis': 'from-green-500 to-green-600',
      'Data Engineering': 'from-orange-500 to-orange-600',
      // Legacy mappings for backwards compatibility
      'AI/ML': 'from-purple-500 to-purple-600',
      'Data Science': 'from-blue-500 to-blue-600',
      'Web Development': 'from-indigo-500 to-indigo-600',
      'Mobile': 'from-pink-500 to-pink-600',
      'DevOps': 'from-red-500 to-red-600'
    }
    return colors[category] || 'from-neutral-500 to-neutral-600'
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-yellow-500'
      case 'planned':
        return 'bg-blue-500'
      default:
        return 'bg-neutral-500'
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          🚀 Development Timeline
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          My journey through recent projects and milestones
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500"></div>

        {/* Milestones */}
        <div className="space-y-4 sm:space-y-6">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="relative flex items-start gap-3 sm:gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-500 border-2 sm:border-4 border-white dark:border-neutral-900 shadow-lg"></div>
                <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-500 animate-ping opacity-20"></div>
              </div>

              {/* Content */}
              <motion.div
                className="flex-1 bg-white dark:bg-neutral-800 rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm hover:shadow-lg border border-neutral-200 dark:border-neutral-700 transition-all duration-300"
                whileHover={{ y: -2, scale: 1.01 }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="text-xl sm:text-2xl flex-shrink-0">{milestone.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1 sm:mb-2">
                        {milestone.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${milestone.color} text-white`}>
                          {milestone.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          milestone.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : milestone.status === 'in-progress'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {milestone.status === 'completed' ? 'Completed' : 
                           milestone.status === 'in-progress' ? 'In Progress' : 'Planned'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-mono flex-shrink-0">
                    {formatDate(milestone.date)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
          
          {/* Timeline Ending Dot */}
          <div className="relative flex items-start gap-3 sm:gap-6">
            <div className="relative z-10 flex-shrink-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-500 border-2 sm:border-4 border-white dark:border-neutral-900 shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <motion.div
        className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-xl border border-primary-200/50 dark:border-primary-700/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="text-xl sm:text-2xl">📈</div>
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
            Continuous Growth
          </h3>
        </div>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Each project represents a step forward in my development journey, building upon previous 
          experiences and pushing the boundaries of what I can create. The timeline shows my evolution 
          as a developer and the diverse challenges I've tackled.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default ProjectTimeline
