import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
            I Build High-Performance <br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-400">AI & Data Solutions</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
            No buzzwords, just code that works. I help businesses and researchers turn complex data problems into reliable, production-ready software.
          </p>

          {/* Key Points - Clean & Simple */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Production-Ready Code
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Full Documentation
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              End-to-End Support
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              onClick={() => {
                const formElement = document.getElementById('inquiry-form')
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              Start Your Project
            </Button>
            <button
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
              onClick={() => {
                const pricingElement = document.getElementById('pricing-section')
                if (pricingElement) {
                  pricingElement.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              View Pricing
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

