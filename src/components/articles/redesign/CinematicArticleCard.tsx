import React from 'react'
import { motion } from 'framer-motion'
import { Tag } from '../../ui/Tag'
import { ImageWithShimmer } from '../../ui/ImageWithShimmer'
import { formatRelativeTime } from '../../../utils/formatDate'
import { FaExternalLinkAlt, FaClock, FaCalendarAlt } from 'react-icons/fa'

interface Article {
    id: string
    title: string
    excerpt: string
    coverImage: string
    date: string
    tags: string[]
    author: string
    readTime: number
    category: string
    featured: boolean
    link: string
}

interface CinematicArticleCardProps {
    article: Article
    index: number
}

const CinematicArticleCard: React.FC<CinematicArticleCardProps> = ({ article, index }) => {
    return (
        <motion.a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-full flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
        >
            {/* --- Image Section (Fixed Height + Preserved Ratio) --- */}
            <div className="relative w-full h-48 bg-neutral-100 dark:bg-black/40 overflow-hidden flex items-center justify-center p-4">
                {/* 
            CRITICAL: 'object-contain' preserves the original image aspect ratio and size.
            'h-full w-full' ensures it fits within the fixed height container.
         */}
                <ImageWithShimmer
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Grid Pattern for empty space */}
                <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" />

                {/* Featured Badge */}
                {article.featured && (
                    <div className="absolute top-3 left-3 z-10">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400/90 dark:bg-yellow-500/90 text-neutral-900 text-xs font-bold rounded-full shadow-lg backdrop-blur-md">
                            <span className="text-[10px]">★</span> FEATURED
                        </div>
                    </div>
                )}
            </div>

            {/* --- Content Section --- */}
            <div className="flex flex-col flex-grow p-5">

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {article.tags.slice(0, 3).map((tag, i) => (
                        <span
                            key={tag}
                            className={`
                        text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md
                        ${i === 0
                                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                    : 'bg-neutral-100 text-neutral-500 dark:bg-white/5 dark:text-neutral-400'
                                }
                    `}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                </p>

                {/* Footer / Meta */}
                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-500">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <FaCalendarAlt className="w-3 h-3" />
                            {formatRelativeTime(article.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FaClock className="w-3 h-3" />
                            {article.readTime} min
                        </span>
                    </div>

                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                        Read <FaExternalLinkAlt className="w-3 h-3" />
                    </div>
                </div>

            </div>
        </motion.a>
    )
}

export default CinematicArticleCard
