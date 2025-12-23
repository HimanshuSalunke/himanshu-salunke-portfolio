import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-0">
        {/* Neural Network Background (AI Generated) */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-60"
          style={{ backgroundImage: "url('/images/services/hero-neural.png')" }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Overlay Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/70 to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            AI & Data Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              That Drive Growth
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-200 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Transforming complex data into actionable intelligence. Custom AI models, analytics dashboards, and automation.
          </p>

          {/* Key Points - Clean & Simple */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm sm:text-base font-medium text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
              Production-Ready Code
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></span>
              Full Documentation
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></span>
              End-to-End Support
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1 transition-all"
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
              onClick={() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-neutral-800 text-white font-bold rounded-full border border-neutral-700 hover:bg-neutral-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Pricing
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

