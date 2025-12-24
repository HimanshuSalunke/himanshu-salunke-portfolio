import React from 'react'
import { motion } from 'framer-motion'
import { Tag } from '../../ui/Tag'
import { ImageWithShimmer } from '../../ui/ImageWithShimmer'
import { type Project } from '../../../utils/clientMdx'

interface ProjectCardProps {
    project: Project
    className?: string
    index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '', index }) => {
    const isLarge = className.includes('md:col-span-2')

    return (
        <a href={`/work/${project.id}`} className={`block h-full group ${className}`}>
            <motion.div
                className="glass-panel h-full rounded-2xl overflow-hidden relative transition-all duration-300 neon-border"
                whileHover={{ y: -2, scale: 1.005 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                {/* Background Image/Gradient */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-neutral-100 to-white dark:from-neutral-900 dark:to-neutral-800" />

                <div className="relative z-10 h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative overflow-hidden w-full aspect-video group-hover:shadow-inner transition-all duration-500 ease-out">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <ImageWithShimmer
                            src={project.coverImage || '/images/placeholder.jpg'}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay Content (Visible on Hover) */}
                        <div className="absolute bottom-0 left-0 p-4 z-20 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.slice(0, 3).map(tech => (
                                    <span key={tech} className="text-[10px] font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Text Content (Pushed down on hover) */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm group-hover:bg-transparent transition-colors duration-300">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={`font-bold text-neutral-900 dark:text-white leading-tight ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
                                    {project.title}
                                </h3>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-2xl">↗</span>
                                </div>
                            </div>
                            <p className={`text-neutral-600 dark:text-neutral-400 line-clamp-2 ${isLarge ? 'text-base' : 'text-sm'}`}>
                                {project.summary}
                            </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <Tag variant="default" size="sm" className="bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20">
                                {project.category}
                            </Tag>
                            {project.featured && (
                                <span className="text-xs font-bold text-yellow-500 flex items-center gap-1">
                                    ⭐ Featured
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </a>
    )
}

export default ProjectCard
