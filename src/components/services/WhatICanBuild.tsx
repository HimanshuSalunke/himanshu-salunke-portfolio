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
    title: 'AI & Machine Learning',
    description: 'Specialized LLM applications, custom chatbots, and computer vision solutions built with production-ready code.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: [
      'LLM & RAG application development',
      'Computer vision & Image processing',
      'Natural language processing (NLP)',
      'Predictive analytics & Forecasting',
      'Recommendation systems',
      'Complete GitHub repository'
    ],
    technologies: ['Python', 'PyTorch', 'OpenAI', 'LangChain', 'Hugging Face'],
    priceRange: '₹15k - ₹80k+'
  },
  {
    title: 'Data Science & Analytics',
    description: 'Transform raw data into actionable insights through robust pipelines and interactive visualization dashboards.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: [
      'Interactive Analytics Dashboards',
      'ETL & Automated Data Pipelines',
      'Statistical Modeling & Analysis',
      'Business Intelligence (BI) Reports',
      'Real-time Data Processing',
      'Complete GitHub repository'
    ],
    technologies: ['Python', 'SQL', 'Pandas', 'Tableau', 'Power BI'],
    priceRange: '₹5k - ₹40k'
  }
]

export const WhatICanBuild: React.FC = () => {
  return (
    <>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
          What I Can Build For You
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Specialized in AI/ML and Data Science solutions. I deliver production-ready models and analytics systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 hover:border-primary-500/30 dark:hover:border-primary-500/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            {/* Header: Icon */}
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              {service.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
              {service.description}
            </p>

            {/* Features Bento Grid */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4 ml-1">What's Included</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-700/50 hover:border-blue-500/30 transition-colors group/feature">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center mr-3 group-hover/feature:bg-blue-500 group-hover/feature:text-white transition-colors">
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover/feature:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies - Simple Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-100 dark:border-blue-500/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer: Price */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-700/50 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Starting from</p>
                <p className="text-xl font-bold text-neutral-900 dark:text-white">{service.priceRange}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

