import React from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

interface WorkToolbarProps {
    categories: string[]
    activeCategory: string
    onCategoryChange: (category: string) => void
    searchQuery: string
    onSearchChange: (query: string) => void
}

const WorkToolbar: React.FC<WorkToolbarProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange
}) => {
    return (
        <div className="sticky top-16 z-[60] mb-8 sm:mb-12 px-4 w-full">
            <motion.div
                className="glass-panel max-w-5xl mx-auto rounded-2xl p-2 flex flex-col sm:flex-row items-center gap-2 shadow-lg border border-white/20 dark:border-white/10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {/* Categories (Scrollable on mobile) */}
                <div className="flex-1 w-full overflow-x-auto no-scrollbar flex items-center gap-1 p-1">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={`
                px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 relative
                ${activeCategory === category
                                    ? 'text-white'
                                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                }
              `}
                        >
                            <span className="relative z-10">{category}</span>
                            {activeCategory === category && (
                                <motion.div
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-xl"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {activeCategory === category && (
                                <span className="absolute inset-0 z-10 flex items-center justify-center text-white dark:text-black font-semibold">
                                    {category}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="w-full sm:w-auto flex items-center gap-2 pl-2 border-l border-neutral-200 dark:border-neutral-700">
                    <div className="relative group w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-primary-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-transparent border-none outline-none pl-9 pr-4 py-2 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:ring-0"
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default WorkToolbar
