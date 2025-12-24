import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ImageWithShimmer } from '../ui/ImageWithShimmer'
import { useUnifiedStats } from '../../hooks/useUnifiedStats'

export const Profile: React.FC = () => {
  const unifiedStats = useUnifiedStats()

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image - Centered */}
        <motion.div
          className="relative mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ImageWithShimmer
              src="/images/avatar.jpg"
              alt="Himanshu - Aspiring Data Scientist & ML Engineer"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-full shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Profile Content - Centered */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white px-4 sm:px-0">
            Hi, I'm{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                background: 'linear-gradient(90deg, hsla(212, 93%, 49%, 1) 0%, hsla(210, 100%, 30%, 1) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                MozBackgroundClip: 'text',
                filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#0974F1", endColorstr="#003A7A", GradientType=1)'
              }}
            >
              Himanshu Kishor Salunke
            </span>
          </h1>

          {/* Title */}
          <h2 className="text-lg sm:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 font-medium px-4 sm:px-0">
            Aspiring Data Scientist & ML Engineer
          </h2>

          {/* Description */}
          <div className="max-w-3xl mx-auto space-y-4 px-4 sm:px-0">
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              I'm passionate about building intelligent solutions with Python, Machine Learning, and AI.
              Currently preparing for GATE - 2026 while building innovative AI projects and learning new technologies.
            </p>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
              I have a strong foundation in computer science and data science, with hands-on experience
              in machine learning, statistical analysis, and data visualization. My journey has been
              marked by resilience and determination, overcoming significant challenges to achieve my
              academic and professional goals.
            </p>
          </div>

          {/* Tech Stack Badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {['Python', 'Machine Learning', 'React', 'AI', 'Data Science', 'JavaScript'].map((tech) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm font-medium rounded-full border border-neutral-200 dark:border-neutral-600"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Personal Highlights */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 max-w-2xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-3 sm:p-4 rounded-lg border border-primary-200 dark:border-primary-800"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="text-xl sm:text-2xl">🎓</div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">B.Tech Data Science</div>
                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">7.39 CGPA</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-800"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="text-xl sm:text-2xl">🎓</div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">Diploma in CSE</div>
                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">9.4 CGPA</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/work">
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200">
                  View My Projects
                </button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/Himanshu_Salunke_Resume.pdf"
                download="Himanshu_Salunke_Resume.pdf"
                className="inline-block w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200">
                  Download Resume
                </button>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
