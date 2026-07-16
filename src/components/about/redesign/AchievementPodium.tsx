import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Trophy, Users } from 'lucide-react'
import { JourneySectionMarker, journeyCardClass, journeyContentClass, journeyHeadingClass, journeySectionClass } from './journey/JourneyPrimitives'

type Level = 'international' | 'national' | 'institutional'
type Category = 'hackathon' | 'leadership'

interface Achievement {
  id: string
  title: string
  event: string
  year: string
  description: string
  achievement: string
  teamSize?: number
  participants?: number
  level: Level
  category: Category
  icon: string
  podiumOrder: number
}

const achievementsData: Achievement[] = [
  {
    id: 'sih-2023-lead',
    title: 'Internal Hackathon Lead',
    event: 'Smart India Hackathon 2023',
    year: '2023',
    description:
      'Led and coordinated an Internal Hackathon for Smart India Hackathon 2023, overseeing 85 teams and fostering innovation and collaboration.',
    achievement: 'Leadership Role',
    teamSize: 85,
    level: 'institutional',
    category: 'leadership',
    icon: '👑',
    podiumOrder: 2,
  },
  {
    id: 'sunhacks-2022-finalist',
    title: 'Grand Finalist',
    event: 'SUNHACKS 2022 - International Level',
    year: '2022',
    description:
      'Spearheaded a cross-functional effort at SUNHACKS 2022, an International Level Hackathon, securing Grand Finalist recognition among 15 elite teams.',
    achievement: 'Grand Finalist',
    participants: 60,
    level: 'international',
    category: 'hackathon',
    icon: '🏆',
    podiumOrder: 0,
  },
  {
    id: 'sih-2022-finalist',
    title: 'Grand Finalist',
    event: 'Smart India Hackathon 2022',
    year: '2022',
    description:
      'Achieved Grand Finalist status at the National level in the Smart India Hackathon 2022, competing against 50 teams.',
    achievement: 'Grand Finalist',
    participants: 300,
    level: 'national',
    category: 'hackathon',
    icon: '🥇',
    podiumOrder: 1,
  },
]

const levelStyles: Record<
  Level,
  {
    badge: string
    border: string
    activeBorder: string
    accent: string
    label: string
  }
> = {
  international: {
    badge: 'bg-amber-500/15 text-amber-800 border-amber-500/30 dark:text-amber-200',
    border: 'border-amber-500/25',
    activeBorder: 'border-amber-500/55 bg-amber-500/5',
    accent: 'text-amber-600 dark:text-amber-400',
    label: 'International',
  },
  national: {
    badge: 'bg-blue-500/15 text-blue-800 border-blue-500/30 dark:text-blue-200',
    border: 'border-blue-500/25',
    activeBorder: 'border-blue-500/55 bg-blue-500/5',
    accent: 'text-blue-600 dark:text-blue-400',
    label: 'National',
  },
  institutional: {
    badge: 'bg-violet-500/15 text-violet-800 border-violet-500/30 dark:text-violet-200',
    border: 'border-violet-500/25',
    activeBorder: 'border-violet-500/55 bg-violet-500/5',
    accent: 'text-violet-600 dark:text-violet-400',
    label: 'Institutional',
  },
}

const categoryEmoji: Record<Category, string> = {
  hackathon: '💻',
  leadership: '👑',
}

interface AchievementCardProps {
  item: Achievement
  isActive: boolean
  onSelect: () => void
  compact?: boolean
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  item,
  isActive,
  onSelect,
  compact = false,
}) => {
  const styles = levelStyles[item.level]

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full ${journeyCardClass} p-4 text-left transition-all duration-300 sm:p-5 ${isActive ? styles.activeBorder : styles.border} ${compact ? '' : 'hover:-translate-y-0.5'}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="text-3xl">{item.icon}</span>
        <span className="font-mono text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          {item.year}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles.badge}`}>
          {styles.label}
        </span>
        <span className="rounded-full border border-neutral-200/80 bg-neutral-50 px-2.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:border-neutral-700/50 dark:bg-neutral-900/50 dark:text-neutral-400">
          {categoryEmoji[item.category]} {item.category}
        </span>
      </div>

      <h3 className="mb-1 break-words text-base font-bold text-neutral-900 dark:text-white sm:text-lg">{item.title}</h3>
      <p className={`mb-2 break-words text-sm font-semibold leading-snug ${styles.accent}`}>{item.event}</p>

      {!compact && (
        <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {item.description}
        </p>
      )}

      <div className="flex flex-col gap-2 border-t border-neutral-200/80 pt-3 dark:border-neutral-700/50 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
        <div className="flex flex-wrap gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          {item.teamSize && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {item.teamSize} teams
            </span>
          )}
          {item.participants && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {item.participants} participants
            </span>
          )}
        </div>
        <span className={`text-sm font-bold ${styles.accent}`}>{item.achievement}</span>
      </div>
    </button>
  )
}

export const AchievementPodium: React.FC = () => {
  const [activeId, setActiveId] = useState(achievementsData[1].id)
  const prefersReducedMotion = useReducedMotion()

  const activeItem = achievementsData.find((a) => a.id === activeId) ?? achievementsData[0]
  const podiumItems = [...achievementsData].sort((a, b) => a.podiumOrder - b.podiumOrder)

  const hackathonCount = achievementsData.filter((a) => a.category === 'hackathon').length
  const nationalIntlCount = achievementsData.filter(
    (a) => a.level === 'national' || a.level === 'international'
  ).length
  const finalistCount = achievementsData.filter((a) =>
    a.achievement.includes('Finalist')
  ).length

  return (
    <section className={`relative overflow-hidden border-t border-violet-500/10 bg-transparent ${journeySectionClass}`}>
      <JourneySectionMarker accent="amber" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.09),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className={`relative z-10 mx-auto max-w-7xl ${journeyContentClass}`}>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-col gap-4 sm:mb-10 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-6"
        >
          <div className="min-w-0">
            <h2 className={`mb-3 ${journeyHeadingClass}`}>
              Achievements &{' '}
              <span className="bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
                Competitions
              </span>
            </h2>
            <p className="max-w-xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg">
              Hackathon achievements, leadership roles, and competition milestones.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10">
              <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-neutral-900 dark:text-white">
                {achievementsData.length}
              </p>
              <p className="text-xs text-neutral-500">Major milestones</p>
            </div>
          </div>
        </motion.div>

        {/* Desktop: selectable cards */}
        <div className="mb-8 hidden md:block">
          <div className="grid grid-cols-3 gap-4 lg:gap-6">
            {podiumItems.map((item, index) => {
              const isActive = activeId === item.id
              return (
                <motion.div
                  key={item.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AchievementCard
                    item={item}
                    isActive={isActive}
                    onSelect={() => setActiveId(item.id)}
                    compact
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Active achievement detail — desktop */}
        <div className="mb-10 hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`${journeyCardClass} p-6 ${levelStyles[activeItem.level].border}`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-4xl">{activeItem.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                        {activeItem.title}
                      </h3>
                      <p className={`font-semibold ${levelStyles[activeItem.level].accent}`}>
                        {activeItem.event}
                      </p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {activeItem.description}
                  </p>
                </div>
                <div className="shrink-0 rounded-xl border border-neutral-200/80 bg-neutral-50 px-5 py-4 text-center dark:border-neutral-700/50 dark:bg-neutral-900/50">
                  <p className={`text-2xl font-black ${levelStyles[activeItem.level].accent}`}>
                    {activeItem.achievement}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-neutral-500">
                    {activeItem.year}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: full cards */}
        <div className="space-y-5 md:hidden">
          {achievementsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <AchievementCard
                item={item}
                isActive={activeId === item.id}
                onSelect={() => setActiveId(item.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-8 ${journeyCardClass} border-violet-500/25 p-4 sm:mt-10 sm:p-6 md:mt-12`}
        >
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
            <div>
              <p className="mb-1 text-3xl font-black text-violet-600 dark:text-violet-400">
                {hackathonCount}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Hackathon Achievements
              </p>
            </div>
            <div>
              <p className="mb-1 text-3xl font-black text-amber-600 dark:text-amber-400">
                {nationalIntlCount}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                National/International Level
              </p>
            </div>
            <div>
              <p className="mb-1 text-3xl font-black text-blue-600 dark:text-blue-400">
                {finalistCount}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Finalist Positions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
