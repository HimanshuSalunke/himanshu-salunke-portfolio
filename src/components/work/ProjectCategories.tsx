import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Category {
  name: string
  description: string
  icon: string
  color: string
  projectCount: number
  technologies: string[]
  featured: boolean
}

interface ProjectCategoriesProps {
  projects: any[]
}

const ProjectCategories: React.FC<ProjectCategoriesProps> = ({ projects }) => {
  // Memoize category counts to avoid recalculating on every render
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    projects.forEach(project => {
      if (project?.category) {
        counts[project.category] = (counts[project.category] || 0) + 1
      }
    })
    return counts
  }, [projects])

  const categories: Category[] = [
    {
      name: 'Machine Learning',
      description: 'AI-powered prediction models, ensemble methods, and intelligent analytics',
      icon: '🤖',
      color: 'from-red-500 to-red-600',
      projectCount: categoryCounts['Machine Learning'] || 0,
      technologies: ['LSTM', 'XGBoost', 'Prophet', 'Ensemble Methods', 'Time Series'],
      featured: true
    },
    {
      name: 'Computer Vision',
      description: 'Image processing, object detection, and visual recognition systems',
      icon: '👁️',
      color: 'from-blue-500 to-blue-600',
      projectCount: categoryCounts['Computer Vision'] || 0,
      technologies: ['OpenCV', 'MediaPipe', 'YOLOv7', 'Real-time Processing'],
      featured: true
    },
    {
      name: 'Deep Learning',
      description: 'Neural networks, transformer models, and advanced AI solutions',
      icon: '🧠',
      color: 'from-purple-500 to-purple-600',
      projectCount: categoryCounts['Deep Learning'] || 0,
      technologies: ['BERT', 'PyTorch', 'Transformers', 'NLP', 'Fine-tuning'],
      featured: true
    },
    {
      name: 'Data Analysis',
      description: 'Statistical analysis, data visualization, and exploratory insights',
      icon: '📊',
      color: 'from-green-500 to-green-600',
      projectCount: categoryCounts['Data Analysis'] || 0,
      technologies: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly'],
      featured: true
    },
    {
      name: 'Data Engineering',
      description: 'Data pipelines, ETL processes, and scalable data infrastructure',
      icon: '⚙️',
      color: 'from-orange-500 to-orange-600',
      projectCount: categoryCounts['Data Engineering'] || 0,
      technologies: ['Apache Airflow', 'AWS S3', 'PostgreSQL', 'Docker', 'ETL'],
      featured: true
    }
  ]

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
          🎯 Project Categories
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 px-2 sm:px-0">
          Explore my expertise across different domains and technologies
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className={`group relative rounded-lg p-3 sm:p-4 hover:shadow-xl transition-all duration-300 cursor-pointer ${
              category.featured 
                ? 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800' 
                : 'bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -2, scale: 1.01 }}
          >

            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg`} />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-2 sm:mb-3">
                <div className="text-2xl sm:text-3xl mb-1">{category.icon}</div>
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white leading-tight">
                  {category.name}
                </h3>
              </div>

              {/* Project Count - Prominent Display */}
              <div className="text-center mb-2 sm:mb-3">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {category.projectCount}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {category.projectCount === 1 ? 'project' : 'projects'}
                </div>
              </div>

              {/* Description - Shortened */}
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2 sm:mb-3 leading-tight text-center">
                {category.description.split(',')[0]}
              </p>

               {/* Technologies - Show only top 3 */}
               <div className="flex flex-wrap gap-1 justify-center">
                 {category.technologies.slice(0, 3).map((tech, techIndex) => (
                   <motion.span
                     key={tech}
                     className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs rounded-full"
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 0.2 + index * 0.1 + techIndex * 0.05 }}
                   >
                     {tech}
                   </motion.span>
                 ))}
                 {category.technologies.length > 3 && (
                   <span className="px-1.5 py-0.5 bg-neutral-300 dark:bg-neutral-500 text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                     +{category.technologies.length - 3}
                   </span>
                 )}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="text-xl sm:text-2xl">💡</div>
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
            Diverse Expertise
          </h3>
        </div>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          My projects span across computer vision, deep learning, data analysis, and data engineering domains. 
          This diverse expertise allows me to tackle complex problems from multiple angles and build comprehensive 
          solutions that combine the best of AI/ML technologies.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCategories
