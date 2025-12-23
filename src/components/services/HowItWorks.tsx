import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    step: 1,
    title: 'Share Your Requirements',
    description: 'Tell me about your project idea, timeline, and any specific requirements. I\'ll listen and ask questions to understand what you need.',
    icon: '📝'
  },
  {
    step: 2,
    title: 'I\'ll Give You a Quote',
    description: 'I analyze your requirements and provide a detailed quote with timeline. No hidden costs - everything is transparent.',
    icon: '💰'
  },
  {
    step: 3,
    title: 'I Build Your Project',
    description: 'I build your project with regular updates and progress tracking. You\'ll see the work as it happens.',
    icon: '⚡'
  },
  {
    step: 4,
    title: 'Delivery & Testing',
    description: 'You get working code, documentation, and live testing. Everything is ready to use and deploy.',
    icon: '🎯'
  },
  {
    step: 5,
    title: 'Support & Questions',
    description: 'I provide post-delivery support and answer all your questions. I want to make sure you understand everything.',
    icon: '🤝'
  }
]

export const HowItWorks: React.FC = () => {
  return (
    <div className="relative">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="px-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-200 max-w-2xl mx-auto">
          Simple process from idea to working project. Express delivery available for urgent projects.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Connecting Line */}
        <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/0 via-primary-500/30 to-primary-500/0 md:left-1/2 md:-ml-px" />

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className={`relative flex items-start md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Icon Bubble (Central Marker) */}
              <div className="absolute left-0 md:left-1/2 md:-ml-9 flex-shrink-0 w-18 h-18 bg-white dark:bg-neutral-800 border-4 border-primary-50 dark:border-primary-500/20 rounded-full flex items-center justify-center text-3xl z-10 shadow-lg dark:shadow-primary-900/30">
                <span role="img" aria-label="Icon" className="filter drop-shadow-md">{step.icon}</span>
              </div>

              {/* Content Card */}
              <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}>
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 text-xs font-bold border border-primary-200 dark:border-primary-700">
                      {step.step}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-200 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Spacer for the other side on desktop */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
