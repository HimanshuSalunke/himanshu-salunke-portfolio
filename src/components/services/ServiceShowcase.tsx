import React from 'react'
import { motion } from 'framer-motion'

export const ServiceShowcase: React.FC = () => {
    return (
        <section className="py-24 bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Showcase 1: AI & Machine Learning */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-32">
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                            <img
                                src="/images/services/showcase-ai.png"
                                alt="AI Neural Chip"
                                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                            Intelligent Systems that <span className="text-blue-600 dark:text-blue-400">Think & Adapt</span>
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                            I don't just write scripts; I engineer cognitive systems. From LLMs that understand context to computer vision that sees the unseen, my AI solutions are built on a foundation of robust, scalable architecture.
                        </p>
                        <ul className="space-y-4">
                            {['Custom LLM Agents (RAG)', 'Predictive Forecasting Models', 'Automated Decision Engines'].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">✓</span>
                                    <span className="text-neutral-700 dark:text-neutral-200 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Showcase 2: Data Analytics */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                            <img
                                src="/images/services/showcase-data.png"
                                alt="Holographic Data Dashboard"
                                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                            Data Visibility at the <span className="text-purple-600 dark:text-purple-400">Speed of Light</span>
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                            Raw data is noise. I turn it into a signal. Using modern pipelines and interactive visualization, I create dashboards that give you real-time command over your business metrics.
                        </p>
                        <ul className="space-y-4">
                            {['Real-time Stream Processing', 'Interactive React Dashboards', 'Self-Healing Data Pipelines'].map((item) => (
                                <li key={item} className="flex items-center gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs font-bold">✓</span>
                                    <span className="text-neutral-700 dark:text-neutral-200 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}
