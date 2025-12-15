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

      <div className="relative max-w-6xl mx-auto">
        {/* Single horizontal timeline line for desktop - aligned with icon centers */}
        <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-600 z-0" />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Icon circle with step number */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-3xl border-4 border-white dark:border-neutral-800 shadow-lg relative z-20">
                  {step.icon}
                </div>
                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white dark:border-neutral-800 shadow-md z-30">
                  {step.step}
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Vertical connecting line for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute left-1/2 top-20 -bottom-8 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-blue-600 transform -translate-x-1/2 z-0" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

