import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Flag } from 'lucide-react'
import { JourneySectionMarker, journeyCardClass, journeyContentClass, journeyHeadingClass, journeySectionClass } from './journey/JourneyPrimitives'

const shortTermGoals = [
  {
    id: 'react-migration',
    goal: 'Complete React 19 migration for all projects',
    progress: 75,
    deadline: 'End of month',
  },
  {
    id: 'portfolio-ai',
    goal: 'Launch AI-powered portfolio features',
    progress: 40,
    deadline: 'Next 2 weeks',
  },
  {
    id: 'articles',
    goal: 'Write 3 technical articles',
    progress: 60,
    deadline: 'This quarter',
  },
  {
    id: 'open-source',
    goal: 'Contribute to 5 open source projects',
    progress: 20,
    deadline: 'Ongoing',
  },
]

const progressHint = (progress: number) => {
  if (progress >= 80) return '🎯 Almost there!'
  if (progress >= 50) return '📈 Good progress'
  if (progress >= 25) return '🚀 Getting started'
  return '💪 Just beginning'
}

export const ShortTermGoalsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className={`relative overflow-hidden border-t border-violet-500/10 bg-transparent ${journeySectionClass}`}>
      <JourneySectionMarker accent="blue" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.05),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className={`relative z-10 mx-auto max-w-7xl ${journeyContentClass}`}>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 sm:h-10 sm:w-10">
              <Flag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className={`${journeyHeadingClass}`}>
              Short-term{' '}
              <span className="bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
                Goals
              </span>
            </h2>
          </div>
          <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg">
            What I&apos;m focused on right now — measurable steps toward bigger ambitions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          {shortTermGoals.map((item, index) => (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`${journeyCardClass} p-4 sm:p-5`}
            >
              <div className="mb-3 flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                <span className="break-words font-medium leading-snug text-neutral-900 dark:text-white">
                  {item.goal}
                </span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide text-neutral-500">
                  {item.deadline}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-neutral-200/80 dark:bg-neutral-800">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500"
                  initial={prefersReducedMotion ? { width: `${item.progress}%` } : { width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>

              <div className="mt-2 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
                <span className="font-medium text-violet-600 dark:text-violet-400">
                  {item.progress}% complete
                </span>
                <span className="text-neutral-500">{progressHint(item.progress)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
