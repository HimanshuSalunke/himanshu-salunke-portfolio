import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    id: '01',
    title: 'Requirement Injection',
    desc: 'Analysis of project constraints, data sources, and desired outputs.',
    status: 'INITIALIZING'
  },
  {
    id: '02',
    title: 'Architecture Design',
    desc: 'Drafting the blueprint: Model selection, pipeline design, and tech stack.',
    status: 'PLANNING'
  },
  {
    id: '03',
    title: 'Development Cycle',
    desc: 'Iterative coding of the core logic, model training, and integration.',
    status: 'PROCESSING'
  },
  {
    id: '04',
    title: 'System Deployment',
    desc: 'Production rollout, load testing, and final handshake.',
    status: 'COMPLETE'
  }
]

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 font-mono transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-20">
          <span className="text-blue-600 dark:text-blue-500 text-xs tracking-widest uppercase">/// PROCESS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mt-4">How It Works</h2>
        </div>

        <div className="relative">
          {/* Desktop Center Line */}
          <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[1px] bg-neutral-200 dark:bg-neutral-800" />

          {/* Grid Configuration: 1 col (Mobile) -> 2 cols (Tablet) -> 4 cols (Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group flex md:block items-start gap-6"
              >
                {/* Mobile Timeline Line (Left Side) */}
                <div className="md:hidden absolute left-[19px] top-10 bottom-[-48px] w-[1px] bg-neutral-200 dark:bg-neutral-800 z-0" />

                {/* Node Marker */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-black border-2 border-neutral-300 dark:border-neutral-700 group-hover:border-blue-500 group-hover:scale-110 transition-all flex items-center justify-center md:mx-auto md:mb-8">
                  <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-blue-500 transition-colors" />
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 p-6 rounded-lg group-hover:bg-neutral-100 dark:group-hover:bg-neutral-900 group-hover:border-neutral-400 dark:group-hover:border-neutral-600 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold text-neutral-800 dark:text-neutral-800 group-hover:text-neutral-900 dark:group-hover:text-neutral-700 transition-colors">{step.id}</span>
                    <span className="text-[10px] text-green-700 dark:text-green-500 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">{step.status}</span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
