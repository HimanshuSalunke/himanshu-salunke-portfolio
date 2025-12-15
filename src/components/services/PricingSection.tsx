import React from 'react'
import { motion } from 'framer-motion'

interface PricingTier {
  name: string
  description: string
  price: string
  features: string[]
  bestFor: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Student Starter',
    description: 'Perfect for students and beginners - simple ML models and basic AI applications',
    price: '₹1.5k - ₹3k',
    features: [
      'Basic ML models (classification, regression)',
      'Simple data preprocessing',
      'Basic documentation and code comments',
      'Email support',
      'Standard delivery (1 week)',
      'Express delivery (3-4 days) available',
      'Complete GitHub repository'
    ],
    bestFor: 'Students and beginners starting with ML'
  },
  {
    name: 'Student Advanced',
    description: 'Intermediate projects with more complex AI/ML requirements',
    price: '₹3k - ₹5k',
    features: [
      'Advanced ML models (NLP, CV, recommendations)',
      'Data preprocessing and feature engineering',
      'Comprehensive documentation and setup guide',
      'Live deployment and testing',
      'Priority support',
      'Standard delivery (1 week)',
      'Express delivery (3-4 days) available',
      'Complete GitHub repository'
    ],
    bestFor: 'Students working on intermediate projects'
  },
  {
    name: 'Student Premium',
    description: 'Complex AI systems and advanced projects for serious students',
    price: '₹5k - ₹6k',
    features: [
      'LLM integration and RAG systems',
      'Custom AI agents and workflows',
      'Advanced deployment and monitoring',
      '30 days post-delivery support',
      'Standard delivery (1 week)',
      'Express delivery (3-4 days) available',
      'Complete GitHub repository'
    ],
    bestFor: 'Students working on advanced projects and research'
  }
]

export const PricingSection: React.FC = () => {
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
          Transparent Pricing
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          I keep pricing simple and student-friendly. Here's what I charge:
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            className={`relative bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border transition-all duration-500 overflow-hidden ${
              index === 1
                ? 'border-blue-500 dark:border-blue-500 border-2 scale-105'
                : 'border-neutral-200 dark:border-neutral-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, scale: index === 1 ? 1.06 : 1.02 }}
          >
            {index === 1 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                {tier.name}
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4">
                {tier.description}
              </p>
              <div className="mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {tier.price}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                What's Included:
              </h4>
              <ul className="space-y-2">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-neutral-600 dark:text-neutral-400">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">Best for</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {tier.bestFor}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 sm:p-8 rounded-xl border border-blue-200 dark:border-blue-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-300 mb-3">
            Special Student Pricing
          </h3>
          <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300 mb-4">
            I understand that students have budget constraints. That's why I've designed my pricing to be accessible while maintaining high quality standards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg">
              <p className="font-semibold text-neutral-900 dark:text-white mb-1">Complete Code</p>
              <p className="text-neutral-600 dark:text-neutral-400">Production-ready with comments</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg">
              <p className="font-semibold text-neutral-900 dark:text-white mb-1">Full Documentation</p>
              <p className="text-neutral-600 dark:text-neutral-400">Setup guides and explanations</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg">
              <p className="font-semibold text-neutral-900 dark:text-white mb-1">Student Support</p>
              <p className="text-neutral-600 dark:text-neutral-400">30 days of help included</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

