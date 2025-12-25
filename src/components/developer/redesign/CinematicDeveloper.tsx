import React from 'react'
import { motion } from 'framer-motion'
import { TechArsenal } from './TechArsenal'
import { SystemArchitecture } from './SystemArchitecture'
import { ConnectHub } from './ConnectHub'
import { FloatingIcons } from '../../ui/FloatingIcons'

export const CinematicDeveloper: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-[#030014] font-sans text-neutral-900 dark:text-white selection:bg-purple-500/30 transition-colors duration-300">

            {/* --- Hero Section: The Dashboard --- */}
            <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
                {/* Background Grid & Glows */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Replaced manual glows with FloatingIcons which includes glows + icons */}
                <FloatingIcons />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl mx-auto"
                >

                    <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 text-neutral-900 dark:text-white">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 animate-gradient">Tech</span> <br />
                        Stack
                    </h1>

                    <p className="text-xl text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Architecting intelligence. <br className="hidden md:block" />
                        From <span className="text-neutral-900 dark:text-white font-medium">Neural Networks</span> to <span className="text-neutral-900 dark:text-white font-medium">Distributed Systems</span>.
                    </p>
                </motion.div>
            </section>

            {/* --- Main Modules --- */}
            <TechArsenal />

            <div className="h-px bg-neutral-200 dark:bg-gradient-to-r dark:from-transparent dark:via-white/10 dark:to-transparent max-w-7xl mx-auto border-none" />

            <SystemArchitecture />

            <div className="h-px bg-neutral-200 dark:bg-gradient-to-r dark:from-transparent dark:via-white/10 dark:to-transparent max-w-7xl mx-auto border-none" />

            <ConnectHub />

            {/* --- Footer Quote --- */}
            <section className="py-24 text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
                <blockquote className="max-w-3xl mx-auto relative z-10">
                    <p className="text-3xl md:text-4xl font-serif italic text-neutral-700 dark:text-gray-300/80 mb-6 font-light">
                        "The best way to predict the future is to invent it."
                    </p>
                    <footer className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">
                        — Alan Kay
                    </footer>
                </blockquote>
            </section>

        </div>
    )
}
