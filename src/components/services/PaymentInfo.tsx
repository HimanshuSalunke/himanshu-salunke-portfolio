import React from 'react'
import { motion } from 'framer-motion'

export const PaymentInfo: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 font-mono transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-neutral-50 dark:bg-neutral-950 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl p-8 md:p-12 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black px-4 text-xs text-neutral-500 tracking-widest uppercase">
            Transaction Protocol
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Block A */}
            <div className="border border-blue-200 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/5 p-6 rounded-lg pointer-events-none">
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-500">50%</span>
                <span className="text-xs text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">INIT_PHASE</span>
              </div>
              <h4 className="text-neutral-900 dark:text-white font-bold mb-2">Initialization Resource</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Required to allocate computational resources and begin the architecture phase.
              </p>
            </div>

            {/* Block B */}
            <div className="border border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/5 p-6 rounded-lg pointer-events-none">
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl font-bold text-green-600 dark:text-green-500">50%</span>
                <span className="text-xs text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">FINAL_PHASE</span>
              </div>
              <h4 className="text-neutral-900 dark:text-white font-bold mb-2">Completion Resource</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Transferred upon successful system deployment and handover of all assets.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-900">
            <h5 className="text-sm font-bold text-neutral-900 dark:text-white mb-4">Important Notes</h5>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Hosting & API Costs:</strong> You are responsible for all cloud (AWS/GCP) and API (OpenAI/Midjourney) billing. I will help you set up the accounts.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Code Ownership:</strong> You receive 100% intellectual property rights and full source code upon final payment.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Payment Methods:</strong> I accept UPI and Bank Transfer. 50% advance is required to book a slot.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span><strong>Support:</strong> All projects include 14 days of post-delivery support for bug fixes and minor tweaks.</span>
              </li>
            </ul>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
