import React from 'react'
import { motion } from 'framer-motion'
import { type Project } from '../../../utils/clientMdx'

interface ProjectSidebarProps {
    project: Project
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ project }) => {
    return (
        <aside className="space-y-8">
            {/* Quick Links Card */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                    Project Links
                </h3>
                <div className="flex flex-col gap-3">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/20"
                        >
                            <span>🚀</span> Live Demo
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-xl font-medium transition-colors border border-neutral-200 dark:border-neutral-700"
                        >
                            <span>💻</span> View Code
                        </a>
                    )}
                </div>
            </div>

            {/* Tech Stack Card */}
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                    Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                        <span key={tech} className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium border border-neutral-200 dark:border-neutral-700">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Metrics Card (if available) */}
            {project.metrics && project.metrics.length > 0 && (
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                        Impact
                    </h3>
                    <div className="space-y-4">
                        {project.metrics.map((metric, idx) => (
                            <div key={idx}>
                                <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                                    {metric.value}
                                </div>
                                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {metric.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    )
}

export default ProjectSidebar
