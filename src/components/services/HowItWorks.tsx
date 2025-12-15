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
    <>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Simple process from idea to working project. Express delivery available for urgent projects.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto relative">
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            className="text-center relative z-10 mb-8 md:mb-0 flex-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border-4 border-white dark:border-neutral-800 shadow-lg relative z-20">
              {step.icon}
            </div>
            
            {/* Connecting line between circles */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 z-10" />
            )}
            
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              {step.step}. {step.title}
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 px-2">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

