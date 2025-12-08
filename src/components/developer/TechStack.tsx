import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  SiReact, SiTypescript, SiJavascript, SiPython, SiFastapi, SiNodedotjs, SiFlask,
  SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiPandas, SiNumpy, SiJupyter,
  SiPostgresql, SiMongodb, SiRedis, SiDocker, SiKubernetes, SiAmazon, SiGooglecloud, SiGit, SiGithub,
  SiNextdotjs, SiSass, SiVercel, SiApacheairflow, SiPlotly, SiTableau, SiPowers,
  SiHtml5, SiCss3, SiC, SiCplusplus, SiSlack, SiJira, SiLinux, SiKeras
} from 'react-icons/si'
import { 
  FaBrain, FaRobot, FaChartLine, FaCogs, FaServer, FaChartBar, FaJava, FaDatabase, FaNetworkWired
} from 'react-icons/fa'
import { useGitHubStats } from '../../hooks/useGitHubStats'

interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'ai-ml' | 'tools' | 'databases'
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
}

const skillsData: Skill[] = [
  // AI/ML & Data Science
  { name: 'Python', level: 95, category: 'ai-ml', icon: SiPython, color: 'text-yellow-500' },
  { name: 'TensorFlow', level: 85, category: 'ai-ml', icon: SiTensorflow, color: 'text-orange-500' },
  { name: 'PyTorch', level: 80, category: 'ai-ml', icon: SiPytorch, color: 'text-red-500' },
  { name: 'Scikit-learn', level: 90, category: 'ai-ml', icon: SiScikitlearn, color: 'text-orange-500' },
  { name: 'Pandas', level: 95, category: 'ai-ml', icon: SiPandas, color: 'text-blue-600' },
  { name: 'NumPy', level: 90, category: 'ai-ml', icon: SiNumpy, color: 'text-blue-500' },
  { name: 'OpenCV', level: 85, category: 'ai-ml', icon: SiOpencv, color: 'text-green-600' },
  { name: 'Matplotlib', level: 85, category: 'ai-ml', icon: FaChartLine, color: 'text-blue-500' },
  { name: 'Seaborn', level: 80, category: 'ai-ml', icon: FaChartBar, color: 'text-purple-500' },
  { name: 'Jupyter Notebooks', level: 90, category: 'ai-ml', icon: SiJupyter, color: 'text-orange-500' },
  { name: 'Keras', level: 80, category: 'ai-ml', icon: SiKeras, color: 'text-red-500' },
  { name: 'YOLO', level: 75, category: 'ai-ml', icon: FaRobot, color: 'text-purple-600' },
  { name: 'IBM Watson Studio', level: 75, category: 'ai-ml', icon: FaServer, color: 'text-blue-600' },
  { name: 'LangChain', level: 75, category: 'ai-ml', icon: FaRobot, color: 'text-purple-600' },
  { name: 'OpenAI API', level: 80, category: 'ai-ml', icon: FaBrain, color: 'text-purple-500' },
  
  // Programming Languages
  { name: 'JavaScript', level: 90, category: 'backend', icon: SiJavascript, color: 'text-yellow-500' },
  { name: 'TypeScript', level: 85, category: 'backend', icon: SiTypescript, color: 'text-blue-600' },
  { name: 'Java', level: 75, category: 'backend', icon: FaJava, color: 'text-red-500' },
  { name: 'C', level: 80, category: 'backend', icon: SiC, color: 'text-blue-600' },
  { name: 'C++', level: 75, category: 'backend', icon: SiCplusplus, color: 'text-blue-500' },
  { name: 'SQL', level: 85, category: 'backend', icon: FaDatabase, color: 'text-blue-500' },
  
  // Web Development
  { name: 'HTML', level: 90, category: 'frontend', icon: SiHtml5, color: 'text-orange-500' },
  { name: 'CSS', level: 90, category: 'frontend', icon: SiCss3, color: 'text-blue-500' },
  { name: 'React', level: 90, category: 'frontend', icon: SiReact, color: 'text-blue-500' },
  { name: 'Next.js', level: 85, category: 'frontend', icon: SiNextdotjs, color: 'text-black dark:text-white' },
  { name: 'Node.js', level: 80, category: 'backend', icon: SiNodedotjs, color: 'text-green-600' },
  { name: 'FastAPI', level: 80, category: 'backend', icon: SiFastapi, color: 'text-green-600' },
  { name: 'Flask', level: 75, category: 'backend', icon: SiFlask, color: 'text-red-500' },
  { name: 'SASS/SCSS', level: 85, category: 'frontend', icon: SiSass, color: 'text-pink-500' },
  
  // Cloud & Infrastructure
  { name: 'AWS Services', level: 80, category: 'tools', icon: SiAmazon, color: 'text-orange-500' },
  { name: 'AWS Lambda', level: 75, category: 'tools', icon: SiAmazon, color: 'text-orange-500' },
  { name: 'AWS S3', level: 80, category: 'tools', icon: SiAmazon, color: 'text-orange-500' },
  { name: 'AWS QuickSight', level: 70, category: 'tools', icon: SiAmazon, color: 'text-orange-500' },
  { name: 'Google Cloud AI', level: 75, category: 'tools', icon: SiGooglecloud, color: 'text-blue-600' },
  { name: 'Docker', level: 80, category: 'tools', icon: SiDocker, color: 'text-blue-500' },
  { name: 'Kubernetes', level: 70, category: 'tools', icon: SiKubernetes, color: 'text-blue-600' },
  { name: 'Vercel', level: 85, category: 'tools', icon: SiVercel, color: 'text-black dark:text-white' },
  { name: 'Linux', level: 80, category: 'tools', icon: SiLinux, color: 'text-yellow-500' },
  
  // Data Visualization
  { name: 'Plotly', level: 85, category: 'tools', icon: SiPlotly, color: 'text-blue-500' },
  { name: 'Tableau', level: 75, category: 'tools', icon: SiTableau, color: 'text-blue-600' },
  { name: 'PowerBI', level: 70, category: 'tools', icon: SiPowers, color: 'text-yellow-500' },
  
  // Databases
  { name: 'PostgreSQL', level: 85, category: 'databases', icon: SiPostgresql, color: 'text-blue-600' },
  { name: 'MongoDB', level: 80, category: 'databases', icon: SiMongodb, color: 'text-green-600' },
  { name: 'Redis', level: 75, category: 'databases', icon: SiRedis, color: 'text-red-500' },
  
  // Tools & Others
  { name: 'Git', level: 90, category: 'tools', icon: SiGit, color: 'text-orange-500' },
  { name: 'GitHub', level: 85, category: 'tools', icon: SiGithub, color: 'text-gray-800 dark:text-gray-200' },
  { name: 'Apache Airflow', level: 75, category: 'tools', icon: SiApacheairflow, color: 'text-blue-500' },
  { name: 'AWS Glue', level: 70, category: 'tools', icon: FaCogs, color: 'text-orange-500' },
  { name: 'Amazon Athena', level: 75, category: 'tools', icon: FaServer, color: 'text-orange-500' },
  { name: 'Jira', level: 75, category: 'tools', icon: SiJira, color: 'text-blue-500' },
  { name: 'Slack', level: 80, category: 'tools', icon: SiSlack, color: 'text-purple-500' },
  { name: 'Networking', level: 75, category: 'tools', icon: FaNetworkWired, color: 'text-green-600' }
]

const categoryColors = {
  frontend: 'from-blue-500 to-blue-600',
  backend: 'from-green-500 to-green-600',
  'ai-ml': 'from-purple-500 to-purple-600',
  tools: 'from-orange-500 to-orange-600',
  databases: 'from-red-500 to-red-600'
}

const categoryLabels = {
  frontend: 'Web Development',
  backend: 'Programming Languages & Backend',
  'ai-ml': 'AI/ML & Data Science',
  tools: 'Cloud, Infrastructure & Tools',
  databases: 'Databases'
}

export const TechStack: React.FC = () => {
  const categories = Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>
  const githubStats = useGitHubStats('HimanshuSalunke')
  
  // Language mapping for GitHub languages to our skill icons
  const languageIconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
    'TypeScript': SiTypescript,
    'JavaScript': SiJavascript,
    'Python': SiPython,
    'Java': FaJava,
    'C': SiC,
    'C++': SiCplusplus,
    'React': SiReact,
    'HTML': SiHtml5,
    'CSS': SiCss3,
    'Shell': SiGit,
    'Dockerfile': SiDocker,
    'SQL': FaDatabase,
    'Jupyter Notebook': SiJupyter,
    'Markdown': SiGithub
  }

  const languageColorMap: { [key: string]: string } = {
    'TypeScript': 'text-blue-600',
    'JavaScript': 'text-yellow-500',
    'Python': 'text-yellow-500',
    'Java': 'text-red-500',
    'C': 'text-blue-600',
    'C++': 'text-blue-500',
    'React': 'text-blue-500',
    'HTML': 'text-orange-500',
    'CSS': 'text-blue-500',
    'Shell': 'text-green-500',
    'Dockerfile': 'text-blue-500',
    'SQL': 'text-blue-500',
    'Jupyter Notebook': 'text-orange-500',
    'Markdown': 'text-gray-500'
  }
  
  return (
    <motion.section
      className="mt-8 sm:mt-12 lg:mt-16 mb-8 sm:mb-12 lg:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
          🛠️ Tech Stack & Skills
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-0">
          My collection of technologies and tools for building amazing projects. 
          From AI/ML to web development, here's what I work with daily.
        </p>
      </div>

      {/* Live GitHub Language Usage */}
      {githubStats.languages && Object.keys(githubStats.languages).length > 0 && (
        <motion.div
          className="mb-8 sm:mb-12 bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-3 sm:mb-4 md:mb-6">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 dark:text-white mb-2">
              📊 Live GitHub Language Usage
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400">
              Real-time data from my GitHub repositories
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 justify-center">
            {Object.entries(githubStats.languages)
              .filter(([language, bytes]) => language && language !== 'null' && bytes > 0) // Filter out null/empty languages
              .sort(([,a], [,b]) => b - a)
              .slice(0, 8)
              .map(([language, bytes]) => {
                const IconComponent = languageIconMap[language] || SiGithub
                const color = languageColorMap[language] || 'text-gray-500'
                const totalBytes = Object.values(githubStats.languages).reduce((a, b) => a + b, 0)
                const percentage = totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0
                
                return (
                  <motion.div
                    key={language}
                    className="group relative inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-600 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <IconComponent size={12} className={color} />
                    <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-white">
                      {language}
                    </span>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500" />
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                        {percentage}%
                      </span>
                    </div>
                    
                    {/* Hover tooltip */}
                    <motion.div
                      className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-2 sm:px-3 py-1 sm:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="w-16 sm:w-20 bg-neutral-700 dark:bg-neutral-300 rounded-full h-1 sm:h-1.5 mb-1">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                        />
                      </div>
                      <div className="text-center">
                        {bytes.toLocaleString()} bytes
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
          </div>
          
          {githubStats.isLoading && (
            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              Loading GitHub language data...
            </div>
          )}
        </motion.div>
      )}
      
      <div className="space-y-8 sm:space-y-10 lg:space-y-12">
        {categories.map((category, categoryIndex) => {
          const categorySkills = skillsData.filter(skill => skill.category === category)
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <div className={`w-1 h-4 sm:h-6 md:h-8 bg-gradient-to-b ${categoryColors[category]} rounded-full`} />
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                  {categoryLabels[category]}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-neutral-300 to-transparent dark:from-neutral-600" />
                <span className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {categorySkills.length} technologies
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="group relative inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.02 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {/* Icon */}
                    <skill.icon size={12} className={skill.color} />
                    
                    {/* Skill name */}
                    <span className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-white">
                      {skill.name}
                    </span>
                    
                    {/* Hover tooltip with progress bar */}
                    <motion.div
                      className="absolute -bottom-10 sm:-bottom-12 left-1/2 transform -translate-x-1/2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-2 sm:px-3 py-1 sm:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="w-16 sm:w-20 bg-neutral-700 dark:bg-neutral-300 rounded-full h-1 sm:h-1.5 mb-1">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${categoryColors[category]} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                        />
                      </div>
                      <div className="text-center">
                        {skill.level >= 90 ? 'Expert' : skill.level >= 70 ? 'Advanced' : skill.level >= 50 ? 'Intermediate' : 'Beginner'}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
