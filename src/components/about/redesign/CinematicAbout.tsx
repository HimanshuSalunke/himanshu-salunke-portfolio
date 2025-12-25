import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { StoryTimeline } from './StoryTimeline'
import { CredentialGrid } from './CredentialGrid'
import { AchievementPodium } from './AchievementPodium'
import { MissionCompass } from './MissionCompass'
import { InterestsSection } from './InterestsSection'

import { ImageWithShimmer } from '../../ui/ImageWithShimmer'

export const CinematicAbout: React.FC = () => {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans transition-colors duration-300">

            {/* --- Hero: The Protagonist --- */}
            <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden pt-12">




                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full mb-8 shadow-2xl dark:shadow-none"
                >
                    <ImageWithShimmer
                        src="/images/avatar.jpg"
                        alt="Himanshu"
                        className="w-full h-full rounded-full object-cover"
                    />
                </motion.div>

                <motion.div
                    className="relative z-10 text-center max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-5xl sm:text-7xl font-bold text-neutral-900 dark:text-white tracking-tight mb-4">
                        Himanshu <span className="text-neutral-500 dark:text-neutral-600">Salunke</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 font-medium mb-8">
                        Aspiring Data Scientist & ML Engineer
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                        Passionate about building intelligent solutions with Python, Machine Learning, and AI.
                        Currently preparing for GATE 2026.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/Himanshu_Salunke_Resume.pdf"
                            download="Himanshu_Salunke_Resume.pdf"
                            className="px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-lg dark:shadow-none"
                        >
                            Download Resume
                        </a>
                        <Link
                            to="/work"
                            className="px-8 py-4 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-md dark:shadow-none"
                        >
                            View Projects
                        </Link>
                    </div>
                </motion.div>
            </section>

            <StoryTimeline />
            <CredentialGrid />
            <AchievementPodium />
            <MissionCompass />
            <InterestsSection />

            {/* --- Footer Quote --- */}
            <section className="py-24 px-4 text-center border-t border-neutral-200 dark:border-white/5">
                <blockquote className="max-w-4xl mx-auto">
                    <p className="text-3xl sm:text-4xl font-serif italic text-neutral-800 dark:text-neutral-300 mb-8">
                        "Every setback is a setup for a comeback."
                    </p>
                    <footer className="text-neutral-500 font-medium tracking-widest uppercase text-sm">
                        Himanshu K. Salunke
                    </footer>
                </blockquote>
            </section>

        </div>
    )
}
