import React from 'react'
import { motion } from 'framer-motion'
import { TechArsenal } from './TechArsenal'
import { SystemArchitecture } from './SystemArchitecture'
import { ConnectHub } from './ConnectHub'

export const CinematicDeveloper: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans transition-colors duration-300">

            {/* --- Hero Section: The Dashboard --- */}
            <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        SYSTEM_ONLINE // V 2.0.4
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
                        The Engineering <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
                            Stack
                        </span>
                    </h1>

                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        My collection of technologies, tools, and systems. <br className="hidden md:block" />
                        From AI algorithms to distributed cloud infrastructure.
                    </p>
                </motion.div>
            </section>

            {/* --- Main Modules --- */}
            <TechArsenal />

            <div className="h-px bg-neutral-200 dark:bg-neutral-800 max-w-7xl mx-auto" />

            <SystemArchitecture />

            <div className="h-px bg-neutral-200 dark:bg-neutral-800 max-w-7xl mx-auto" />

            <ConnectHub />

            {/* --- Footer Quote --- */}
            <section className="py-24 text-center px-4">
                <blockquote className="max-w-3xl mx-auto">
                    <p className="text-2xl md:text-3xl font-serif italic text-neutral-700 dark:text-neutral-300 mb-6">
                        "Code is like humor. When you have to explain it, it's bad."
                    </p>
                    <footer className="text-sm font-bold text-neutral-500 uppercase tracking-widest">
                        — Cory House
                    </footer>
                </blockquote>
            </section>

        </div>
    )
}
