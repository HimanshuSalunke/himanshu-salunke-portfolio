import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950 pointer-events-none -z-10" />
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-900/50 dark:to-transparent pointer-events-none -z-10" />
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">AI & Data Solutions</span>
          </h1>

          {/* Description */}
          <p className="px-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            No buzzwords, just code that works. I help businesses and researchers turn complex data problems into reliable, production-ready software.
          </p>

          {/* Key Points - Clean & Simple */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-100">
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
              className="px-8"
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
              className="text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white transition-colors underline-offset-4 hover:underline"
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
      </div >
    </section >
  )
}

