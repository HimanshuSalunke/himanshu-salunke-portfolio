import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Code, User, BookOpen, Briefcase, Layers } from 'lucide-react'

interface GridItemProps {
    to: string
    title: string
    subtitle: string
    icon: React.ReactNode
    className?: string
    color: string
}

const colorStyles = {
    green: {
        bg: 'bg-green-500',
        text: 'text-green-600 dark:text-green-400',
        arrow: 'text-green-500',
        iconBg: 'bg-green-500/10'
    },
    purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600 dark:text-purple-400',
        arrow: 'text-purple-500',
        iconBg: 'bg-purple-500/10'
    },
    pink: {
        bg: 'bg-pink-500',
        text: 'text-pink-600 dark:text-pink-400',
        arrow: 'text-pink-500',
        iconBg: 'bg-pink-500/10'
    },
    orange: {
        bg: 'bg-orange-500',
        text: 'text-orange-600 dark:text-orange-400',
        arrow: 'text-orange-500',
        iconBg: 'bg-orange-500/10'
    }
}

const GridItem: React.FC<GridItemProps> = ({ to, title, subtitle, icon, className, color }) => {
    const styles = colorStyles[color as keyof typeof colorStyles] || colorStyles.green

    return (
        <Link to={to} className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500 ${className}`}>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${styles.bg}`} />
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                <ArrowRight className={`w-6 h-6 ${styles.arrow}`} />
            </div>

            <div className="relative h-full p-6 flex flex-col justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${styles.iconBg} ${styles.text} mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    {icon}
                </div>

                <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:translate-x-1 transition-transform duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                        {subtitle}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export const ExplorationGrid: React.FC = () => {
    return (
        <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                        Explore My World
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Dive into my diverse ecosystem of projects, content, and professional services.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[240px]">
                    {/* Work - Primary (Large) */}
                    <Link to="/work" className="group relative md:col-span-2 md:row-span-2 min-h-[280px] rounded-3xl overflow-hidden bg-neutral-900 dark:bg-black border border-neutral-800 shadow-2xl">
                        <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors duration-500" />
                        <div className="absolute inset-0 grid-pattern opacity-20" />

                        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                                <Layers className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3">Explore Projects</h3>
                            <p className="text-blue-100 text-lg max-w-md">
                                Discover my portfolio of 8+ innovative AI/ML projects, data science solutions, and full-stack apps.
                            </p>

                            <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <ArrowRight className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Link>

                    {/* About */}
                    <GridItem
                        to="/about"
                        title="My Story"
                        subtitle="Journey, Education & Goals"
                        icon={<User className="w-6 h-6" />}
                        color="green"
                        className="md:row-span-1"
                    />

                    {/* Services */}
                    <GridItem
                        to="/services"
                        title="Freelance Services"
                        subtitle="Hire me for your next big project"
                        icon={<Briefcase className="w-6 h-6" />}
                        color="purple"
                        className="md:row-span-1"
                    />

                    {/* Articles */}
                    <GridItem
                        to="/articles"
                        title="Articles"
                        subtitle="Tech insights & tutorials"
                        icon={<BookOpen className="w-6 h-6" />}
                        color="pink"
                        className="md:row-span-1"
                    />

                    {/* Developer */}
                    <GridItem
                        to="/developer"
                        title="Developer Stats"
                        subtitle="Tech stack & GitHub Activity"
                        icon={<Code className="w-6 h-6" />}
                        color="orange"
                        className="md:row-span-1"
                    />
                </div>
            </div>
        </section>
    )
}
