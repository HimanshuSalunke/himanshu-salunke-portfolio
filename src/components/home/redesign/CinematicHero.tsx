import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../ui/Button'
import { ImageWithShimmer } from '../../ui/ImageWithShimmer'

// Typewriter effect component (Preserved from original)
const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 100 }) => {
    const [currentSkill, setCurrentSkill] = React.useState(0)
    const [currentChar, setCurrentChar] = React.useState(0)
    const [isDeleting, setIsDeleting] = React.useState(false)

    const skills = text.split(', ')

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentChar < skills[currentSkill].length) {
                    setCurrentChar(prev => prev + 1)
                } else {
                    setTimeout(() => setIsDeleting(true), 1500)
                }
            } else {
                if (currentChar > 0) {
                    setCurrentChar(prev => prev - 1)
                } else {
                    setIsDeleting(false)
                    setCurrentSkill(prev => (prev + 1) % skills.length)
                }
            }
        }, isDeleting ? speed / 2 : speed)

        return () => clearTimeout(timeout)
    }, [currentChar, currentSkill, isDeleting, skills, speed])

    return (
        <span className="inline-block min-w-[150px] sm:min-w-[200px] text-left text-blue-600 dark:text-blue-400 font-bold">
            <span>{skills[currentSkill].substring(0, currentChar)}</span>
            <span className="animate-pulse ml-1 text-neutral-400">|</span>
        </span>
    )
}

export const CinematicHero: React.FC = () => {
    return (
        <section className="relative min-h-screen -mt-16 flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 pt-24 sm:pt-12">
            {/* Cinematic Background */}
            <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.07]" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-transparent to-transparent dark:from-neutral-950" />



            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    {/* Avatar with Glow */}
                    <motion.div
                        className="relative mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 dark:opacity-40 rounded-full scale-110" />
                        <motion.div
                            className="relative rounded-full shadow-2xl"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ImageWithShimmer
                                src="/images/avatar.jpg"
                                alt="Himanshu Salunke - Aspiring Data Scientist"
                                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-full"
                                priority
                            />
                        </motion.div>
                    </motion.div>

                    {/* Greeting Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm"
                    >
                        <span className="text-base sm:text-lg font-medium text-neutral-600 dark:text-neutral-400">👋 Hey, I'm</span>
                    </motion.div>

                    {/* Name - Big & Bold */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                        Himanshu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Salunke</span>
                    </h1>

                    {/* Role with Typewriter */}
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-neutral-600 dark:text-neutral-300 mb-3 max-w-3xl mx-auto">
                        <span className="block sm:inline mb-2 sm:mb-0">Specializing in </span>
                        <TypewriterText text="Python, Machine Learning, Deep Learning, Gen AI" speed={100} />
                    </div>

                    {/* Description */}
                    <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-4xl mx-auto leading-relaxed">
                        I'm all about building things that actually work. Whether it's a machine learning model or a simple script, I love the process of turning ideas into reality.
                    </p>

                    {/* CTA Buttons - Premium Glass Style */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link to="/work" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 rounded-full transition-all hover:scale-105"
                            >
                                Explore My Work
                            </Button>
                        </Link>

                        <Link to="/about" className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto h-14 px-8 text-lg border-2 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white rounded-full transition-all hover:scale-105"
                            >
                                My Story
                            </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="hidden sm:block absolute bottom-1 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <div className="w-6 h-10 border-2 border-neutral-300 dark:border-neutral-700 rounded-full flex justify-center p-1">
                    <motion.div
                        className="w-1.5 h-3 bg-blue-500 rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
