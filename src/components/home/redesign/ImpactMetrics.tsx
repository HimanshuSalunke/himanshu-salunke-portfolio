import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, FileText, FolderKanban, Star } from 'lucide-react'
import { StatsCounter } from '../../ui/StatsCounter'
import { useUnifiedStats } from '../../../hooks/useUnifiedStats'
import {
  NeuralLayerCard,
  NeuralMeshBackground,
  neuralChipClass,
  OutputLayerGraph,
  SectionEdgeAccents,
  SectionGridOverlay,
  MobileNeuralSpine,
} from './neural/NeuralPrimitives'

type StatAccent = 'blue' | 'purple' | 'cyan' | 'pink'

interface StatConfig {
  value: number
  suffix: string
  label: string
  sublabel: string
  icon: React.ReactNode
  accent: StatAccent
  borderAccent: string
  counterGradient: string
}

const accentMap: Record<
  StatAccent,
  { borderAccent: string; counterGradient: string }
> = {
  blue: {
    borderAccent: 'border-blue-500/25 shadow-md shadow-blue-500/5',
    counterGradient:
      '[&>span]:from-blue-600 [&>span]:to-indigo-600 dark:[&>span]:from-blue-400 dark:[&>span]:to-indigo-400',
  },
  purple: {
    borderAccent: 'border-purple-500/25 shadow-md shadow-purple-500/5',
    counterGradient:
      '[&>span]:from-purple-600 [&>span]:to-violet-600 dark:[&>span]:from-purple-400 dark:[&>span]:to-violet-400',
  },
  cyan: {
    borderAccent: 'border-cyan-500/25 shadow-md shadow-cyan-500/5',
    counterGradient:
      '[&>span]:from-cyan-600 [&>span]:to-teal-600 dark:[&>span]:from-cyan-400 dark:[&>span]:to-teal-400',
  },
  pink: {
    borderAccent: 'border-pink-500/25 shadow-md shadow-pink-500/5',
    counterGradient:
      '[&>span]:from-pink-600 [&>span]:to-rose-600 dark:[&>span]:from-pink-400 dark:[&>span]:to-rose-400',
  },
}

interface StatCardProps {
  stat: StatConfig
  index: number
}

const StatCard: React.FC<StatCardProps> = ({ stat, index }) => (
  <NeuralLayerCard
    layer=""
    icon={stat.icon}
    accent={stat.borderAccent}
    delay={0.12 + index * 0.08}
    showLayer={false}
    className="min-h-[120px]"
  >
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200/80 bg-neutral-50 dark:border-neutral-700/50 dark:bg-neutral-900">
      {stat.icon}
    </div>
    <StatsCounter
      value={stat.value}
      suffix={stat.suffix}
      duration={2.2}
      className={`mb-1 [&>span]:bg-gradient-to-br [&>span]:bg-clip-text [&>span]:text-3xl [&>span]:font-black [&>span]:leading-none [&>span]:text-transparent sm:[&>span]:text-4xl ${stat.counterGradient}`}
    />
    <span className="block font-semibold text-neutral-900 dark:text-white">{stat.label}</span>
    <span className="mt-0.5 block text-xs text-neutral-600 dark:text-neutral-400">
      {stat.sublabel}
    </span>
  </NeuralLayerCard>
)

export const ImpactMetrics: React.FC = () => {
  const unifiedStats = useUnifiedStats()
  const prefersReducedMotion = useReducedMotion()

  const stats: StatConfig[] = [
    {
      value: unifiedStats.projectsCompleted,
      suffix: '+',
      label: 'Projects',
      sublabel: 'Completed work',
      icon: <FolderKanban className="h-5 w-5 text-blue-500" />,
      accent: 'blue',
      ...accentMap.blue,
    },
    {
      value: 26,
      suffix: '+',
      label: 'Freelance',
      sublabel: 'Client projects',
      icon: <Briefcase className="h-5 w-5 text-purple-500" />,
      accent: 'purple',
      ...accentMap.purple,
    },
    {
      value: 90,
      suffix: '%',
      label: 'Satisfaction',
      sublabel: 'Client rating',
      icon: <Star className="h-5 w-5 text-cyan-500" />,
      accent: 'cyan',
      ...accentMap.cyan,
    },
    {
      value: unifiedStats.isLoading ? 0 : unifiedStats.totalArticles,
      suffix: '',
      label: 'Articles',
      sublabel: 'Technical guides',
      icon: <FileText className="h-5 w-5 text-pink-500" />,
      accent: 'pink',
      ...accentMap.pink,
    },
  ]

  return (
    <section
      aria-label="Impact metrics"
      className="relative overflow-x-hidden border-y border-purple-500/10 bg-neutral-50 dark:bg-[#030014]"
    >
      <NeuralMeshBackground idPrefix="metrics-mesh" />
      <SectionEdgeAccents showIcons />
      <SectionGridOverlay />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative z-10 mb-10 text-center sm:mb-12"
        >
          <span className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs ${neuralChipClass} text-purple-800 dark:text-purple-300`}>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            Impact / Metrics
          </span>
          <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
            Numbers That{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Matter
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          <MobileNeuralSpine idPrefix="metrics" />
          <OutputLayerGraph idPrefix="metrics-output" animate={!prefersReducedMotion} />

          <div className="relative z-10 grid grid-cols-1 gap-3 pl-1 sm:grid-cols-2 sm:gap-4 sm:pl-0 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
