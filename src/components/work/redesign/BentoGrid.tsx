import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import StatsBlock from './StatsBlock'
import { type Project } from '../../../utils/clientMdx'

interface BentoGridProps {
    projects: Project[]
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)] group"
            layout
        >
            <AnimatePresence>
                {projects.map((project, index) => {
                    // Determine span based on index or featured status
                    // User requested uniform sizing for all cards
                    // const isFeatured = index === 0 || (project.featured && index < 3)
                    // const isSuperFeatured = index === 0

                    let spanClass = "col-span-1"
                    // if (isSuperFeatured) spanClass = "md:col-span-2 md:row-span-2"
                    // else if (isFeatured) spanClass = "md:col-span-2"

                    return (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className={`${spanClass} transition-opacity duration-300 group-hover:opacity-40 hover:!opacity-100`}
                        >
                            <ProjectCard project={project} index={index} className="h-full" />
                        </motion.div>
                    )
                })}

                {/* Inject Stats Blocks as filler content */}
                {projects.length > 0 && (
                    <>
                        <motion.div
                            layout
                            className="col-span-1 row-span-1"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        >
                            <StatsBlock
                                label="Total Projects"
                                value={projects.length}
                                icon="🚀"
                                className="h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20"
                            />
                        </motion.div>

                        <motion.div
                            layout
                            className="col-span-1 row-span-1"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        >
                            <StatsBlock
                                label="Top Tech"
                                value="Python"
                                icon="🐍"
                                className="h-full bg-gradient-to-br from-yellow-500/10 to-green-500/10 border-yellow-500/20"
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default BentoGrid
