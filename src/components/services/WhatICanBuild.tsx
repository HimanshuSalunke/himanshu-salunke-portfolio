import React from 'react'
import { motion } from 'framer-motion'

const capabilities = [
  {
    type: 'AI_CORE',
    title: 'Artificial Intelligence',
    subtitle: 'Neural Networks & LLMs',
    description: 'Deploying state-of-the-art Large Language Models and custom neural architectures to solve complex reasoning tasks.',
    specs: [
      'RAG (Retrieval Augmented Generation)',
      'Fine-tuning (Llama, Mistral)',
      'Agentic Workflows (LangGraph)',
      'Computer Vision Pipelines'
    ],
    color: 'blue'
  },
  {
    type: 'DATA_ENGINE',
    title: 'Data Science',
    subtitle: 'Analytics & Pipelines',
    description: 'Transforming chaotic raw data into structured, actionable intelligence through automated ETL and visualization.',
    specs: [
      'Automated ETL Pipelines',
      'Predictive Modeling',
      'Real-time Dashboards',
      'Statistical Analysis'
    ],
    color: 'purple'
  }
]

export const WhatICanBuild: React.FC = () => {
  return (
    <section id="what-i-build" className="py-32 bg-white dark:bg-black relative overflow-hidden transition-colors">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            What I Can Build
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.type}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-neutral-50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
            >
              {/* Module Header */}
              <div className={`p-8 border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-r ${cap.color === 'blue' ? 'from-blue-50 dark:from-blue-900/20' : 'from-purple-50 dark:from-purple-900/20'} to-transparent`}>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs font-mono tracking-widest ${cap.color === 'blue' ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`}>
                            /// MODULE_{cap.type}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-white/60" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">{cap.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{cap.subtitle}</p>
              </div>

              {/* Module Body */}
              <div className="p-8">
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 h-20">
                  {cap.description}
                </p>

                <div className="space-y-3">
                  {cap.specs.map((spec, j) => (
                    <div key={j} className="flex items-center gap-3 group/spec">
                      <div className={`w-1 h-1 rounded-full ${cap.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'} group-hover/spec:scale-150 transition-transform`} />
                      <span className="text-neutral-600 dark:text-neutral-400 font-mono text-sm group-hover/spec:text-neutral-900 dark:group-hover/spec:text-white transition-colors">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
