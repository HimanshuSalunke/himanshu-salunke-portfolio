import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaTimes, FaSortAmountDown, FaChevronDown } from 'react-icons/fa'

interface SortOption {
  value: string
  label: string
  icon: string
}

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  categories: string[]
  selectedCategory: string
  onCategoryChange: (value: string) => void
  statuses?: string[]
  selectedStatus?: string
  onStatusChange?: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  sortOptions?: SortOption[]
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  // statuses, // Not using status filter in this clean version unless expanded
  // selectedStatus,
  // onStatusChange,
  sortBy,
  onSortChange,
  sortOptions: customSortOptions
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Default sort options
  const defaultSortOptions = [
    { value: 'date', label: 'Latest', icon: '🕒' },
    { value: 'title', label: 'Title', icon: '🔤' },
    { value: 'readTime', label: 'Read Time', icon: '⏱️' }
  ]

  const sortOptions = customSortOptions || defaultSortOptions

  return (
    <div className="w-full">
      {/* Main Search Bar - Glassmorphism */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FaSearch className="text-neutral-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search knowledge base..."
          className="w-full pl-10 pr-32 py-2.5 bg-white dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-neutral-900 dark:text-white placeholder-neutral-500 shadow-sm transition-all text-sm"
        />
        {/* Right Actions */}
        <div className="absolute inset-y-0 right-1.5 flex items-center gap-1">
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-full text-neutral-500 transition-colors"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
          <div className="w-px h-5 bg-neutral-200 dark:bg-white/10 mx-1" />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${isExpanded
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                : 'hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-600 dark:text-neutral-400'
              }`}
          >
            <FaFilter className="w-3 h-3" />
            <span className="text-xs font-medium">Filters</span>
            <FaChevronDown className={`w-2.5 h-2.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Expandable Filters Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Select */}
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-neutral-50 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors text-neutral-900 dark:text-white"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none w-3 h-3" />
                </div>
              </div>

              {/* Sort Select */}
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FaSortAmountDown /> Sort Order
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 bg-neutral-50 dark:bg-black/20 border border-neutral-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors text-neutral-900 dark:text-white"
                  >
                    {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none w-3 h-3" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchAndFilter