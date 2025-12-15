import React from 'react'
import { motion } from 'framer-motion'

export const PaymentInfo: React.FC = () => {
  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Payment Structure
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
          I work on a 50/50 payment structure to keep things fair for both of us
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              1
            </div>
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
              50% Upfront Payment
            </h3>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Required to start your project. This covers initial planning, setup, and development costs. Once you pay this, I begin working on your project.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
              50% Completion Payment
            </h3>
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Due when your project is complete and delivered. This covers final testing, documentation, and project handover. You get everything before making this payment.
          </p>
        </div>
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-700/50 p-4 rounded-lg mb-4">
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          <strong className="text-neutral-900 dark:text-white">Note:</strong> Payment can be done via UPI. I'll share the payment details after we finalize the project scope.
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
              Additional Hosting & Cloud Services
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              If your project requires hosting or cloud services (AWS, GCP, Azure, or any other platform), those charges are separate and will be paid directly by you to the service provider. I'll help you set up and configure these services, but the ongoing costs are your responsibility.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

