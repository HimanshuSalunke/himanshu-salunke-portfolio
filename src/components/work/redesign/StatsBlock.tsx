import React from 'react'
import { motion } from 'framer-motion'

interface StatsBlockProps {
    label: string
    value: string | number
    icon?: string
    className?: string
    delay?: number
}

const StatsBlock: React.FC<StatsBlockProps> = ({ label, value, icon, className = '', delay = 0 }) => {
    return (
        <motion.div
            className={`glass-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.02 }}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl select-none">
                {icon}
            </div>

            <div className="relative z-10">
                <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 mb-2">
                    {value}
                </div>
                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    {label}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/5 pointer-events-none" />
        </motion.div>
    )
}

export default StatsBlock
