import React from 'react'
import { motion } from 'framer-motion'

interface ServiceCard {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
  technologies: string[]
  priceRange: string
}

const services: ServiceCard[] = [
  {
    title: 'Web Development',
    description: 'I build full-stack web apps using modern frameworks. From e-commerce sites to social media apps, I deliver working code with complete documentation.',
    icon: (
      <svg className="w-8 h-8 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    features: [
      'Frontend with React/Vue/Angular',
      'Backend APIs with Node.js/Python',
      'Database design and setup',
      'E-commerce and business apps',
      'Real-time features',
      'Complete GitHub repository'
    ],
    technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL'],
    priceRange: '₹2k - ₹5k'
  },
  {
    title: 'Mobile Development',
    description: 'I create cross-platform and native mobile apps for iOS and Android. Whether it\'s a task manager or a social app, I build it with clean code.',
    icon: (
      <svg className="w-8 h-8 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      'Cross-platform with React Native/Flutter',
      'Native iOS and Android apps',
      'Push notifications',
      'Offline functionality',
      'Payment integration',
      'Complete GitHub repository'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    priceRange: '₹2.5k - ₹5.5k'
  },
  {
    title: 'AI & Machine Learning',
    description: 'I build AI/ML projects including chatbots, computer vision, and predictive models. I specialize in LLM applications and help students understand the code.',
    icon: (
      <svg className="w-8 h-8 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: [
      'LLM & Generative AI apps',
      'Computer vision projects',
      'Natural language processing',
      'Predictive analytics',
      'Recommendation systems',
      'Complete GitHub repository'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face'],
    priceRange: '₹3k - ₹6k'
  },
  {
    title: 'Data Analytics & BI',
    description: 'I create data processing pipelines, analytics dashboards, and business intelligence solutions. I help you make sense of your data.',
    icon: (
      <svg className="w-8 h-8 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: [
      'Data visualization dashboards',
      'ETL pipelines',
      'Business intelligence reports',
      'Real-time analytics',
      'Predictive analytics',
      'Complete GitHub repository'
    ],
    technologies: ['Python', 'Tableau', 'Power BI', 'SQL', 'Pandas'],
    priceRange: '₹2k - ₹5k'
  }
]

export const WhatICanBuild: React.FC = () => {
  return (
    <>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          What I Can Build For You
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          From web apps to AI/ML models, I help students bring their ideas to life. Here's what I can build:
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="group relative bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-4 sm:mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                  What's Included:
                </h4>
                <ul className="space-y-1.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-neutral-600 dark:text-neutral-400">
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                  Technologies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm font-medium rounded-full border border-neutral-200 dark:border-neutral-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">Starting from</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.priceRange}</span>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-transparent dark:from-blue-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </>
  )
}

