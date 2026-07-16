import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BookOpen, Briefcase, Code, Layers, User } from 'lucide-react'
import {
  MobileNeuralSpine,
  NavigationLayerGraph,
  NeuralMeshBackground,
  neuralBodyClass,
  neuralCardClass,
  neuralHeadingClass,
  SectionEdgeAccents,
  SectionGridOverlay,
} from './neural/NeuralPrimitives'

type RouteAccent = 'green' | 'purple' | 'pink' | 'orange'

const accentStyles: Record<
  RouteAccent,
  { border: string; iconColor: string; hoverGlow: string; arrow: string; iconBg: string }
> = {
  green: {
    border: 'border-emerald-500/25 shadow-md shadow-emerald-500/5 hover:border-emerald-500/45',
    iconColor: 'text-green-600 dark:text-green-400',
    iconBg: 'bg-green-500/10',
    hoverGlow: 'from-emerald-500/15',
    arrow: 'text-green-500',
  },
  purple: {
    border: 'border-purple-500/25 shadow-md shadow-purple-500/5 hover:border-purple-500/45',
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-500/10',
    hoverGlow: 'from-purple-500/15',
    arrow: 'text-purple-500',
  },
  pink: {
    border: 'border-pink-500/25 shadow-md shadow-pink-500/5 hover:border-pink-500/45',
    iconColor: 'text-pink-600 dark:text-pink-400',
    iconBg: 'bg-pink-500/10',
    hoverGlow: 'from-pink-500/15',
    arrow: 'text-pink-500',
  },
  orange: {
    border: 'border-orange-500/25 shadow-md shadow-orange-500/5 hover:border-orange-500/45',
    iconColor: 'text-orange-600 dark:text-orange-400',
    iconBg: 'bg-orange-500/10',
    hoverGlow: 'from-orange-500/15',
    arrow: 'text-orange-500',
  },
}

interface GridItemProps {
  to: string
  title: string
  subtitle: string
  icon: React.ReactNode
  accent: RouteAccent
  className?: string
  delay?: number
}

const GridItem: React.FC<GridItemProps> = ({
  to,
  title,
  subtitle,
  icon,
  accent,
  className = '',
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const styles = accentStyles[accent]

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      viewport={{ once: true, margin: '-20px' }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      className={`h-full ${className}`}
    >
      <Link
        to={to}
        className={`group relative flex h-full min-h-[148px] flex-col justify-between overflow-hidden p-4 transition-colors duration-300 sm:p-6 md:min-h-0 ${neuralCardClass} ${styles.border}`}
      >
        <div
          className={`pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${styles.hoverGlow} to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
        />

        <div
          className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${styles.iconBg} ${styles.iconColor}`}
        >
          {icon}
        </div>

        <div className="relative">
          <h3 className="mb-1 break-words text-lg font-bold text-neutral-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-white sm:text-xl">
            {title}
          </h3>
          <p className="text-sm font-medium leading-relaxed text-neutral-700 dark:text-neutral-400">
            {subtitle}
          </p>
        </div>

        <ArrowRight
          className={`absolute right-5 top-5 h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 lg:opacity-0 ${styles.arrow}`}
        />
      </Link>
    </motion.div>
  )
}

const ProjectsHub: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-20px' }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
      className="h-full md:col-span-2 md:row-span-2"
    >
      <Link
        to="/work"
        className="group relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl border border-blue-500/35 bg-gradient-to-br from-neutral-900 via-[#0a0a1a] to-neutral-950 shadow-2xl shadow-blue-500/15 dark:border-blue-500/45 dark:from-[#030014] dark:via-[#050520] dark:to-[#030014] sm:min-h-[240px] md:min-h-0"
      >
        <NeuralMeshBackground
          idPrefix="hub-mesh"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-40 dark:opacity-50"
        />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.12]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/25 via-purple-600/15 to-transparent transition-colors duration-500 group-hover:from-blue-600/35" />

        <div className="relative z-10 flex flex-col justify-end p-5 sm:p-8 md:p-10">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30 transition-transform duration-500 group-hover:scale-110 sm:mb-6 sm:h-16 sm:w-16">
            <Layers className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>
          <h3 className="mb-2 break-words text-2xl font-bold text-white sm:mb-3 sm:text-3xl md:text-4xl">Explore Projects</h3>
          <p className="max-w-md text-sm leading-relaxed text-blue-100 sm:text-base md:text-lg">
            Discover my portfolio of 8+ innovative AI/ML projects, data science solutions, and
            full-stack apps.
          </p>
          <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 opacity-100 transition-all duration-500 lg:opacity-0 lg:group-hover:opacity-100 sm:right-8 sm:top-8">
            <ArrowRight className="h-6 w-6 text-white" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export const ExplorationGrid: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      aria-label="Explore"
      className="relative overflow-x-hidden bg-neutral-50 dark:bg-[#030014]"
    >
      <NeuralMeshBackground idPrefix="explore-mesh" />
      <SectionEdgeAccents showIcons />
      <SectionGridOverlay />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:py-24 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative z-10 mb-10 text-center sm:mb-14 md:mb-16"
        >
          <h2 className={`mb-4 ${neuralHeadingClass}`}>
            Explore My World
          </h2>
          <p className={`mx-auto max-w-2xl ${neuralBodyClass}`}>
            Dive into my diverse ecosystem of projects, content, and professional services.
          </p>
        </motion.div>

        <div className="relative">
          <MobileNeuralSpine idPrefix="explore" />
          <NavigationLayerGraph idPrefix="explore-nav" animate={!prefersReducedMotion} />

          <div className="relative z-10 grid auto-rows-auto grid-cols-1 gap-3 pl-1 sm:gap-4 sm:pl-0 md:auto-rows-[172px] md:grid-cols-3 md:gap-5 lg:gap-6">
            <ProjectsHub />

            <GridItem
              to="/about"
              title="My Story"
              subtitle="Journey, Education & Goals"
              icon={<User className="h-6 w-6" />}
              accent="green"
              className="md:row-span-1"
              delay={0.1}
            />

            <GridItem
              to="/services"
              title="Freelance Services"
              subtitle="Hire me for your next big project"
              icon={<Briefcase className="h-6 w-6" />}
              accent="purple"
              className="md:row-span-1"
              delay={0.16}
            />

            <GridItem
              to="/articles"
              title="Articles"
              subtitle="Tech insights & tutorials"
              icon={<BookOpen className="h-6 w-6" />}
              accent="pink"
              className="md:row-span-1"
              delay={0.22}
            />

            <GridItem
              to="/developer"
              title="Developer Stats"
              subtitle="Tech stack & GitHub Activity"
              icon={<Code className="h-6 w-6" />}
              accent="orange"
              className="md:row-span-1"
              delay={0.28}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
