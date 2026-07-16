import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { JourneySectionMarker, journeyCardClass, journeyChipClass, journeyContentClass, journeyHeadingClass, journeySectionClass } from './journey/JourneyPrimitives'

const interests = [
  {
    id: 'technology',
    category: 'Technology',
    icon: '💻',
    color: 'border-blue-500/25 bg-blue-500/5',
    activeColor:
      'border-blue-500/50 bg-blue-500/15 text-blue-800 dark:text-blue-100',
    items: [
      {
        name: 'Open Source Projects',
        description: 'Contributing to and maintaining open source repositories',
      },
      {
        name: 'Tech Blogs & Podcasts',
        description: 'Staying updated with latest trends and innovations',
      },
      {
        name: 'Coding Challenges',
        description: 'Solving problems on various coding platforms',
      },
    ],
  },
  {
    id: 'learning',
    category: 'Learning',
    icon: '📚',
    color: 'border-emerald-500/25 bg-emerald-500/5',
    activeColor:
      'border-emerald-500/50 bg-emerald-500/15 text-emerald-800 dark:text-emerald-100',
    items: [
      {
        name: 'Online Courses',
        description: 'Taking courses on Coursera, DataCamp, and Scaler',
      },
      {
        name: 'Research Papers',
        description:
          'Reading latest AI/ML research and academic papers on "Towards Data Science"',
      },
      {
        name: 'Documentation',
        description: 'Writing and maintaining technical documentation',
      },
    ],
  },
  {
    id: 'creative',
    category: 'Creative',
    icon: '🎨',
    color: 'border-violet-500/25 bg-violet-500/5',
    activeColor:
      'border-violet-500/50 bg-violet-500/15 text-violet-800 dark:text-violet-100',
    items: [
      {
        name: 'UI/UX Design',
        description: 'Creating beautiful and intuitive user interfaces',
      },
      {
        name: 'Data Visualization',
        description: 'Turning complex data into compelling visual stories',
      },
      {
        name: 'Writing',
        description: 'Sharing knowledge through technical articles and blogs',
      },
    ],
  },
]

export const InterestsSection: React.FC = () => {
  const [activeId, setActiveId] = useState(interests[0].id)
  const prefersReducedMotion = useReducedMotion()

  const activeCategory = interests.find((c) => c.id === activeId) ?? interests[0]

  return (
    <section className={`relative overflow-hidden border-t border-violet-500/10 bg-transparent ${journeySectionClass}`}>
      <JourneySectionMarker accent="emerald" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.05),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className={`relative z-10 mx-auto max-w-7xl ${journeyContentClass}`}>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className={`mb-3 ${journeyHeadingClass}`}>
            Beyond{' '}
            <span className="bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
              Code
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg">
            There&apos;s more to me than just programming. Here&apos;s what I&apos;m passionate about
            outside of technology.
          </p>
        </motion.div>

        <div className="scrollbar-hide -mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:mb-6 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
          {interests.map((category) => {
            const isActive = activeId === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveId(category.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? category.activeColor
                    : `${journeyChipClass} hover:border-neutral-400`
                }`}
              >
                <span>{category.icon}</span>
                {category.category}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`${journeyCardClass} border p-4 sm:p-6 md:p-8 ${activeCategory.color}`}
          >
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <span className="text-2xl sm:text-3xl">{activeCategory.icon}</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">
                {activeCategory.category}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {activeCategory.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-xl border border-neutral-300/70 bg-white p-3.5 shadow-sm dark:border-neutral-700/50 dark:bg-neutral-900/50 sm:p-4"
                >
                  <h4 className="mb-1.5 break-words text-sm font-semibold text-neutral-900 dark:text-white sm:mb-2">
                    {item.name}
                  </h4>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
