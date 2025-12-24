import React from 'react'
import { motion } from 'framer-motion'
import { ImageWithShimmer } from '../../../components/ui/ImageWithShimmer'
import { Tag } from '../../../components/ui/Tag'
import { formatDate } from '../../../utils/formatDate'
import { type Project } from '../../../utils/clientMdx'

interface ProjectHeroProps {
    project: Project
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
    return (
        <div className="relative w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 pt-24 pb-12 sm:pb-20">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/20 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.1]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <Tag variant="primary" size="md" className="bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300 border-primary-200 dark:border-primary-500/30">
                                {project.category}
                            </Tag>
                            <span className="text-neutral-600 dark:text-neutral-400 font-medium px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm border border-neutral-200 dark:border-neutral-700">
                                🗓️ {formatDate(project.date)}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-900 dark:text-white tracking-tight mb-6 leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
                            {project.summary}
                        </p>
                    </motion.div>

                    {/* Right: Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-700 group">
                            {/* Glass overlay on hover? Maybe not for hero. Keep it clean. */}
                            <ImageWithShimmer
                                src={project.coverImage || '/images/placeholder.jpg'}
                                alt={project.title}
                                className="w-full h-auto object-contain bg-neutral-100 dark:bg-neutral-800"
                            />
                        </div>
                        {/* Decorative blob behind image */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500 to-secondary-500 opacity-20 blur-2xl -z-10 rounded-[30px]" />
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default ProjectHero
