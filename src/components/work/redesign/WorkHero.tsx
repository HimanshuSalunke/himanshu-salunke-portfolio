import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const WorkHero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    // Mouse tracking logs
    const [gradientCenter, setGradientCenter] = useState({ x: 50, y: 50 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setGradientCenter({ x, y })
    }

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 50])

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[40vh] sm:min-h-[50vh] flex flex-col justify-center items-center overflow-hidden pt-20 pb-10 group"
        >
            {/* Background Ambience & Spotlight */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Static decorative blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />

                {/* Mouse Follower Spotlight - Using inline styles for performance */}
                <div
                    className="absolute w-[800px] h-[800px] bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-full blur-[100px] mix-blend-screen transition-all duration-300 ease-out opacity-50 group-hover:opacity-100"
                    style={{
                        left: `${gradientCenter.x}%`,
                        top: `${gradientCenter.y}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            </div>

            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 text-center px-4"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500">
                        SELECTED
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 animate-gradient-x">
                            WORK
                        </span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                >
                    A collection of high-impact projects exploring the intersection of <span className="text-neutral-900 dark:text-white font-semibold">AI Agents</span>, <span className="text-neutral-900 dark:text-white font-semibold">Data Engineering</span>, and <span className="text-neutral-900 dark:text-white font-semibold">Product Design</span>.
                </motion.p>
            </motion.div>

            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
        </section>
    )
}

export default WorkHero
