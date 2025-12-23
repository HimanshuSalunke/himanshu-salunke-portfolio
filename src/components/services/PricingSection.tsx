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
    name: 'Starter',
    description: 'Perfect for students, researchers, and quick prototypes',
    price: '₹5k - ₹15k',
    features: [
      'Basic ML models (classification, regression)',
      'Data preprocessing & visualization',
      'Model training with Python/Scikit-learn',
      'Detailed code comments & explanations',
      'Email & WhatsApp support',
      'Delivery (1-2 weeks)',
      'Complete GitHub repository'
    ],
    bestFor: 'College projects & initial prototypes'
  },
  {
    name: 'Professional',
    description: 'Advanced features for production-ready applications',
    price: '₹15k - ₹40k',
    features: [
      'Advanced AI (NLP, CV, Deep Learning)',
      'Feature engineering & optimization',
      'Web application integration',
      'Live deployment (Vercel/Cloud)',
      'Documentation & Setup guide',
      'Priority project support',
      'Delivery (2-3 weeks)',
      'Complete GitHub repository'
    ],
    bestFor: 'Startups & production apps'
  },
  {
    name: 'Enterprise',
    description: 'Full-scale AI systems and complex architectures',
    price: '₹40k - ₹80k+',
    features: [
      'LLM integration & RAG pipelines',
      'Custom AI agents & automation',
      'Scalable backend architecture',
      'Advanced monitoring & analytics',
      '60 days post-delivery support',
      'Performance optimization',
      'Delivery (4-6 weeks)',
      'Complete GitHub repository'
    ],
    bestFor: 'Businesses & complex research'
  }
]

export const PricingSection: React.FC = () => {
  return (
    <>
      <motion.div
        id="pricing-section"
        className="text-center mb-12 scroll-mt-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Transparent Pricing
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          High-quality AI/ML solutions at competitive rates. Choose the plan that fits your needs.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8 pb-4">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            className={`relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:shadow-xl ${index === 1
                ? 'border-blue-500 shadow-md ring-1 ring-blue-500 z-10'
                : 'border-neutral-200 dark:border-neutral-700'
              }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >

            {index === 1 && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm uppercase">
                Most Popular
              </div>
            )}

            <div className="text-center mb-8 relative">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                {tier.name}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                {tier.description}
              </p>
              <div className="inline-block">
                <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {tier.price}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-neutral-600 dark:text-neutral-400">
                    <svg className={`w-4 h-4 mr-3 flex-shrink-0 ${index === 1 ? 'text-blue-500' : 'text-neutral-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-700">
              <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 mb-1 uppercase tracking-wide">Best For</p>
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {tier.bestFor}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 bg-neutral-50 dark:bg-neutral-800/50 p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-3">
            What's Included in Every Project
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-6">
            All projects come with complete code, documentation, and support regardless of pricing tier.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-100 dark:border-neutral-700">
              <p className="font-semibold text-neutral-900 dark:text-white mb-1">Complete Code</p>
              <p className="text-neutral-500 dark:text-neutral-400">Production-ready with comments</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-100 dark:border-neutral-700">
              <p className="font-semibold text-neutral-900 dark:text-white mb-1">Full Documentation</p>
              <p className="text-neutral-500 dark:text-neutral-400">Setup guides and explanations</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-neutral-100 dark:border-neutral-700">
              <p className="font-semibold text-neutral-900 dark:text-white mb-1">Post-Delivery Support</p>
              <p className="text-neutral-500 dark:text-neutral-400">30 days of support included</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

