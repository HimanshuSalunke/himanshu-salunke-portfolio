import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Book, Brain, Cpu, Database, PenTool, Rocket } from 'lucide-react'
import currentFocusData from '../../../data/currentFocus.json'
import {
  HiddenLayerGraph,
  MobileNeuralSpine,
  NeuralLayerCard,
  NeuralMeshBackground,
  neuralChipClass,
  neuralHeadingClass,
  SectionEdgeAccents,
  SectionGridOverlay,
} from './neural/NeuralPrimitives'

interface FocusItem {
  id: string
  title: string
  description: string
  icon: string
  status: string
}

type FocusAccent = 'blue' | 'purple' | 'cyan' | 'pink'

const accentStyles: Record<
  FocusAccent,
  { border: string; iconColor: string; statusActive: string; statusOther: string }
> = {
  blue: {
    border: 'border-blue-500/25 shadow-md shadow-blue-500/5',
    iconColor: 'text-blue-600 dark:text-blue-400',
    statusActive: 'bg-green-100 text-green-800 ring-1 ring-green-500/20 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500/25',
    statusOther: 'bg-amber-100 text-amber-900 ring-1 ring-amber-500/20 dark:bg-yellow-900/30 dark:text-yellow-300 dark:ring-amber-500/25',
  },
  purple: {
    border: 'border-purple-500/25 shadow-md shadow-purple-500/5',
    iconColor: 'text-purple-600 dark:text-purple-400',
    statusActive: 'bg-green-100 text-green-800 ring-1 ring-green-500/20 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500/25',
    statusOther: 'bg-amber-100 text-amber-900 ring-1 ring-amber-500/20 dark:bg-yellow-900/30 dark:text-yellow-300 dark:ring-amber-500/25',
  },
  cyan: {
    border: 'border-cyan-500/25 shadow-md shadow-cyan-500/5',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    statusActive: 'bg-green-100 text-green-800 ring-1 ring-green-500/20 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500/25',
    statusOther: 'bg-amber-100 text-amber-900 ring-1 ring-amber-500/20 dark:bg-yellow-900/30 dark:text-yellow-300 dark:ring-amber-500/25',
  },
  pink: {
    border: 'border-pink-500/25 shadow-md shadow-pink-500/5',
    iconColor: 'text-pink-600 dark:text-pink-400',
    statusActive: 'bg-green-100 text-green-800 ring-1 ring-green-500/20 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500/25',
    statusOther: 'bg-amber-100 text-amber-900 ring-1 ring-amber-500/20 dark:bg-yellow-900/30 dark:text-yellow-300 dark:ring-amber-500/25',
  },
}

const ACCENT_CYCLE: FocusAccent[] = ['blue', 'purple', 'cyan', 'pink']

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  book: Book,
  eye: Cpu,
  cloud: Database,
  pen: PenTool,
  rocket: Rocket,
}

interface FocusCardProps {
  item: FocusItem
  index: number
  accent: FocusAccent
}

const FocusCard: React.FC<FocusCardProps> = ({ item, index, accent }) => {
  const styles = accentStyles[accent]
  const Icon = iconComponents[item.icon] ?? Rocket
  const isActive = item.status === 'active'

  return (
    <NeuralLayerCard
      layer=""
      icon={<Icon className={`h-5 w-5 ${styles.iconColor}`} />}
      accent={styles.border}
      delay={0.12 + index * 0.08}
      showLayer={false}
      className="min-h-[148px]"
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-700/50 dark:bg-neutral-900 ${styles.iconColor}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <span
          className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
            isActive ? styles.statusActive : styles.statusOther
          }`}
        >
          {item.status}
        </span>
      </div>
      <h3 className="mb-2 break-words text-base font-bold text-neutral-900 dark:text-white sm:text-lg">{item.title}</h3>
      <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-400">
        {item.description}
      </p>
    </NeuralLayerCard>
  )
}

export const CinematicFocus: React.FC = () => {
  const focusItems = currentFocusData as FocusItem[]
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      aria-label="Current focus"
      className="relative overflow-x-hidden bg-neutral-50 dark:bg-[#030014]"
    >
      <NeuralMeshBackground idPrefix="focus-mesh" />
      <SectionEdgeAccents showIcons={false} />
      <SectionGridOverlay />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative z-10 mb-10 text-center sm:mb-12"
        >
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${neuralChipClass} text-blue-700 dark:text-blue-300`}>
            <span className="relative flex h-2 w-2">
              {!prefersReducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Active Learning
          </div>
          <h2 className={neuralHeadingClass}>
            What I&apos;m Working On
          </h2>
        </motion.div>

        <div className="relative">
          <MobileNeuralSpine idPrefix="focus" />
          <HiddenLayerGraph idPrefix="focus-hidden" animate={!prefersReducedMotion} />

          <div className="relative z-10 grid grid-cols-1 gap-3 pl-1 sm:grid-cols-2 sm:gap-4 sm:pl-0 lg:grid-cols-4 lg:gap-6">
            {focusItems.map((item, index) => (
              <FocusCard
                key={item.id}
                item={item}
                index={index}
                accent={ACCENT_CYCLE[index % ACCENT_CYCLE.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
