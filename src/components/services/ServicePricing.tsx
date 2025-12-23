import React from 'react'
import { motion } from 'framer-motion'

const pricingTiers = [
    {
        level: '01',
        name: 'Prototype / Research',
        range: '₹5k - ₹15k',
        desc: 'Proof of concept, college projects, and initial data exploration.',
        features: ['Basic ML Models', 'Data Visualization', 'Clean Codebase', '1 Week Delivery'],
        borderColor: 'border-blue-500/20',
        hoverBorder: 'group-hover:border-blue-500',
        textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
        level: '02',
        name: 'Production / MVP',
        range: '₹15k - ₹40k',
        desc: 'Full-stack applications with integrated AI and robust backends.',
        features: ['Deep Learning / NLP', 'React + FastAPI', 'Deployment Setup', '2-3 Weeks Delivery'],
        borderColor: 'border-purple-500/20',
        hoverBorder: 'group-hover:border-purple-500',
        textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
        level: '03',
        name: 'Enterprise / Scale',
        range: '₹40k - ₹80k+',
        desc: 'Complex architectures, RAG systems, and custom agents.',
        features: ['LLM Integration', 'Scalable Pipelines', 'Advanced Agents', '4+ Weeks Delivery'],
        borderColor: 'border-emerald-500/20',
        hoverBorder: 'group-hover:border-emerald-500',
        textColor: 'text-emerald-600 dark:text-emerald-400'
    }
]

export const ServicePricing: React.FC = () => {
    return (
        <section className="py-24 bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900 font-mono transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-20">
                    <span className="text-neutral-500 dark:text-neutral-600 text-xs tracking-widest uppercase">/// CALIBRATION</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mt-4">Project Investment</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pricingTiers.map((tier, i) => (
                        <motion.div
                            key={tier.level}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative bg-neutral-50 dark:bg-neutral-900/40 p-8 rounded-xl border ${tier.borderColor} ${tier.hoverBorder} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-5xl font-bold text-neutral-200 dark:text-neutral-800 absolute -top-4 -right-2 z-0 opacity-50 select-none group-hover:text-neutral-300 dark:group-hover:text-neutral-700 transition-colors">
                                    {tier.level}
                                </span>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{tier.name}</h3>
                                    <p className={`text-xs font-bold ${tier.textColor} tracking-widest`}>EST. RANGE</p>
                                </div>
                            </div>

                            <div className="relative z-10 mb-8 pb-8 border-b border-neutral-200 dark:border-neutral-800">
                                <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                                    {tier.range}
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                    {tier.desc}
                                </p>
                            </div>

                            <div className="relative z-10 space-y-3">
                                {tier.features.map((feat, j) => (
                                    <div key={j} className="flex items-center gap-3">
                                        <div className={`w-1.5 h-1.5 rounded-full ${tier.textColor.replace('text-', 'bg-')}`} />
                                        <span className="text-xs text-neutral-600 dark:text-neutral-400">{feat}</span>
                                    </div>
                                ))}
                            </div>

                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
