import React from 'react'
import { motion } from 'framer-motion'
import { StatsCounter } from '../../ui/StatsCounter'
import { useUnifiedStats } from '../../../hooks/useUnifiedStats'

export const ImpactMetrics: React.FC = () => {
    const unifiedStats = useUnifiedStats()

    const stats = [
        {
            value: unifiedStats.projectsCompleted,
            suffix: '+',
            label: 'Projects',
            sublabel: 'Completed work'
        },
        {
            value: 26,
            suffix: '+',
            label: 'Freelance',
            sublabel: 'Client projects'
        },
        {
            value: 90,
            suffix: '%',
            label: 'Satisfaction',
            sublabel: 'Client rating'
        },
        {
            value: unifiedStats.isLoading ? 0 : unifiedStats.totalArticles,
            suffix: '',
            label: 'Articles',
            sublabel: 'Technical guides'
        }
    ]

    return (
        <div className="w-full py-12 border-y border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="flex justify-center items-end gap-1 mb-2">
                                <StatsCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
                                />
                            </div>
                            <div className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                                {stat.label}
                            </div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                {stat.sublabel}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
