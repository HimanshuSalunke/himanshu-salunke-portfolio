import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ImageWithShimmer } from '../../ui/ImageWithShimmer'
import { Tag } from '../../ui/Tag'
import { type Project } from '../../../utils/clientMdx'

interface RelatedProjectsProps {
    projects: Project[]
}

const RelatedProjects: React.FC<RelatedProjectsProps> = ({ projects }) => {
    if (projects.length === 0) return null

    return (
        <section className="py-20 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                        More Case Studies
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
                        Explore other projects and technical deep dives.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <a href={`/work/${project.slug}`} className="group block h-full">
                                <div className="relative aspect-video overflow-hidden rounded-2xl mb-4 bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-800 group-hover:shadow-md transition-all duration-300">
                                    <ImageWithShimmer
                                        src={project.coverImage || '/images/placeholder.jpg'}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 text-xs font-medium bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-lg text-neutral-900 dark:text-white border border-white/20 dark:border-white/10 shadow-sm">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                        {project.summary}
                                    </p>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default RelatedProjects
