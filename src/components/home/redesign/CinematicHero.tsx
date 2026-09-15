import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Cpu, Network } from 'lucide-react'
import { Button } from '../../ui/Button'
import { ImageWithShimmer } from '../../ui/ImageWithShimmer'
import {
  NeuralLayerCard,
  NeuralMeshBackground,
  neuralCardClass,
  neuralChipClass,
  SectionEdgeAccents,
  SectionGridOverlay,
} from './neural/NeuralPrimitives'

const SKILLS_TEXT = 'Microsoft Fabric, Apache Spark, Backend Development, Node.js, TypeScript, AWS Cloud, PostgreSQL, REST APIs'

const TypewriterText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 100 }) => {
  const [currentSkill, setCurrentSkill] = React.useState(0)
  const [currentChar, setCurrentChar] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const skills = text.split(', ')

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentChar < skills[currentSkill].length) {
          setCurrentChar((prev) => prev + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (currentChar > 0) {
          setCurrentChar((prev) => prev - 1)
        } else {
          setIsDeleting(false)
          setCurrentSkill((prev) => (prev + 1) % skills.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [currentChar, currentSkill, isDeleting, skills, speed])

  return (
    <span className="inline-block min-w-0 max-w-full break-words text-left font-bold text-cyan-600 dark:text-cyan-400">
      <span>{skills[currentSkill].substring(0, currentChar)}</span>
      <span className="ml-1 animate-pulse text-purple-500 dark:text-purple-400">|</span>
    </span>
  )
}

const WORLDQUANT_BORDER_GRADIENT =
  'conic-gradient(from 0deg, transparent 0deg, #06b6d4 52deg, #9333ea 128deg, #3b82f6 204deg, #a855f7 278deg, transparent 336deg)'

const WorldQuantBrainChip: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Link
      to="/about#worldquant-brain-consultant"
      className="group relative block transition-transform duration-300 hover:scale-[1.01] motion-reduce:hover:scale-100"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/25 to-blue-500/15 opacity-50 blur-lg transition-opacity duration-300 group-hover:opacity-80 dark:from-cyan-400/25 dark:via-purple-500/30 dark:to-blue-500/20"
      />

      <div className="relative overflow-hidden rounded-2xl p-[1.5px] shadow-lg shadow-cyan-500/15 transition-shadow duration-300 group-hover:shadow-cyan-500/25 group-hover:shadow-purple-500/10 dark:shadow-cyan-500/20 dark:group-hover:shadow-cyan-400/30">
        {prefersReducedMotion ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/45 via-purple-500/50 to-blue-500/40"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-[-150%] animate-[spin_12s_linear_infinite] opacity-80"
            style={{ background: WORLDQUANT_BORDER_GRADIENT }}
          />
        )}

        <div className="relative z-10 overflow-hidden rounded-[calc(1rem-1.5px)] border border-cyan-500/15 bg-gradient-to-br from-white/95 via-cyan-50/75 to-purple-50/65 p-3 backdrop-blur-md dark:border-purple-500/20 dark:from-[#050818]/95 dark:via-[#0a0a22]/92 dark:to-[#08061a]/95 sm:p-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/[0.08] via-transparent to-purple-500/[0.1]"
          />

          <div className="relative flex items-center justify-center gap-2 sm:gap-2.5">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl p-[1.5px] shadow-[0_0_14px_rgba(6,182,212,0.3)] dark:shadow-[0_0_16px_rgba(34,211,238,0.35)] sm:h-12 sm:w-12">
              {prefersReducedMotion ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/50 via-purple-500/50 to-blue-500/45"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute inset-[-120%] animate-[spin_14s_linear_infinite] opacity-70"
                  style={{ background: WORLDQUANT_BORDER_GRADIENT }}
                />
              )}
              <span className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-[calc(0.75rem-1.5px)] border border-cyan-400/35 bg-white/95 p-1.5 shadow-inner dark:border-cyan-300/40 dark:bg-white/95">
                <ImageWithShimmer
                  src="/images/logos/worldquant-brain.png"
                  alt="WorldQuant BRAIN logo"
                  className="h-full w-full object-contain"
                  priority
                />
              </span>
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-gradient-to-r from-cyan-500/[0.08] via-purple-500/[0.1] to-blue-500/[0.08] px-3 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.18em] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:border-purple-400/35 dark:from-cyan-500/10 dark:via-purple-500/12 dark:to-blue-500/10 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.75)]" />
              <span className="bg-gradient-to-r from-cyan-700 via-purple-700 to-blue-700 bg-clip-text text-transparent dark:from-cyan-300 dark:via-purple-200 dark:to-blue-300">
                WorldQuant BRAIN Consultant
              </span>
            </span>
          </div>

          <p className="relative mt-2 text-center text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-sm">
            Systematic quantitative alpha research on the WorldQuant BRAIN platform.
          </p>
        </div>
      </div>
    </Link>
  )
}

const AvatarNeuralCore: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const ringRadius = 'translateY(-92px)'

  return (
    <div className="relative mx-auto mb-5 mt-2 flex h-48 w-48 items-center justify-center sm:mb-6 sm:mt-0 sm:h-52 sm:w-52 md:h-56 md:w-56">
      <div
        className={`absolute inset-0 rounded-full border border-blue-500/30 ${prefersReducedMotion ? '' : 'animate-[spin_24s_linear_infinite]'}`}
      />
      <div
        className={`absolute inset-4 rounded-full border border-purple-500/35 ${prefersReducedMotion ? '' : 'animate-[spin_32s_linear_infinite_reverse]'}`}
      />

      {[0, 90, 180, 270].map((deg) => (
        <span
          key={deg}
          className="absolute h-2 w-2 rounded-full bg-purple-500/90 shadow-[0_0_6px_rgba(147,51,234,0.6)]"
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${deg}deg) ${ringRadius} translate(-50%, -50%)`,
          }}
        />
      ))}

      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-500/25 via-purple-500/20 to-cyan-500/15 blur-lg" />
      <motion.div
        className="relative z-10 rounded-full p-1 ring-2 ring-purple-500/40 ring-offset-2 ring-offset-neutral-50 dark:ring-offset-[#030014]"
        whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
        transition={{ duration: 0.3 }}
      >
        <ImageWithShimmer
          src="/images/avatar.jpg"
          alt="Himanshu Salunke - Aspiring Data Scientist"
          className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36 md:h-40 md:w-40"
          priority
        />
      </motion.div>
    </div>
  )
}

export const CinematicHero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative -mt-[var(--header-offset)] min-h-[100svh] overflow-x-clip bg-neutral-50 dark:bg-[#030014]">
      <NeuralMeshBackground idPrefix="hero-neural" />
      <SectionEdgeAccents />
      <SectionGridOverlay />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-blue-500/[0.06] to-transparent dark:from-blue-500/[0.08]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col items-center justify-center px-4 pb-8 pt-[calc(var(--header-offset)+1.25rem)] text-center sm:px-6 sm:pb-10 sm:pt-[calc(var(--header-offset)+0.75rem)] lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex w-full flex-col items-center"
        >
          <AvatarNeuralCore />

          <motion.span
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs ${neuralChipClass} text-purple-800 dark:text-purple-300`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            👋 Hey, I&apos;m
          </motion.span>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mb-5 break-words text-[1.75rem] font-black leading-tight tracking-tight text-neutral-900 dark:text-white sm:mb-6 sm:text-4xl md:text-5xl"
          >
            Himanshu{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Salunke
            </span>
          </motion.h1>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mb-4 w-full max-w-xl sm:mb-5"
          >
            <WorldQuantBrainChip />
          </motion.div>

          {/* Mobile: single compact panel */}
          <div className="mb-4 w-full space-y-3 md:hidden">
            <NeuralLayerCard
              animateOnMount
              layer="Layer 01 / Role"
              icon={<Cpu className="h-3 w-3 text-blue-500" />}
              accent="border-blue-500/25 shadow-md shadow-blue-500/5"
              delay={0.2}
              compact
            >
              {prefersReducedMotion ? (
                <span className="font-bold text-blue-600 dark:text-blue-400">Junior Backend Developer</span>
              ) : (
                <motion.span
                  className="font-bold text-blue-600 dark:text-blue-400"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Junior Backend Developer
                </motion.span>
              )}
            </NeuralLayerCard>
            <NeuralLayerCard
              animateOnMount
              layer="Layer 02 / Context"
              icon={<Network className="h-3 w-3 text-purple-500" />}
              accent="border-purple-500/25 shadow-md shadow-purple-500/5"
              delay={0.24}
              compact
            >
              <span>
                Working at{' '}
                {prefersReducedMotion ? (
                  <span className="font-bold text-purple-600 dark:text-purple-400">GrubPac Technologies</span>
                ) : (
                  <motion.span
                    className="font-bold text-purple-600 dark:text-purple-400"
                    animate={{ filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    GrubPac Technologies
                  </motion.span>
                )}
              </span>
            </NeuralLayerCard>
            <NeuralLayerCard
              animateOnMount
              layer="Layer 03 / Stack"
              icon={<Brain className="h-3 w-3 text-cyan-500" />}
              accent="border-cyan-500/25 shadow-md shadow-cyan-500/5"
              delay={0.28}
              compact
            >
              <span className="block text-left">
                Specialized in <TypewriterText text={SKILLS_TEXT} speed={100} />
              </span>
            </NeuralLayerCard>
          </div>

          {/* Desktop: 3-column grid */}
          <div className="mb-5 hidden w-full grid-cols-3 gap-3 md:grid md:gap-4">
            <NeuralLayerCard
              animateOnMount
              layer="Layer 01 / Role"
              icon={<Cpu className="h-3.5 w-3.5 text-blue-500" />}
              accent="border-blue-500/25 shadow-md shadow-blue-500/5"
              delay={0.2}
            >
              {prefersReducedMotion ? (
                <span className="font-bold text-blue-600 dark:text-blue-400">Junior Backend Developer</span>
              ) : (
                <motion.span
                  className="font-bold text-blue-600 dark:text-blue-400"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Junior Backend Developer
                </motion.span>
              )}
            </NeuralLayerCard>
            <NeuralLayerCard
              animateOnMount
              layer="Layer 02 / Context"
              icon={<Network className="h-3.5 w-3.5 text-purple-500" />}
              accent="border-purple-500/25 shadow-md shadow-purple-500/5"
              delay={0.24}
            >
              <span>
                Working at{' '}
                {prefersReducedMotion ? (
                  <span className="font-bold text-purple-600 dark:text-purple-400">GrubPac Technologies</span>
                ) : (
                  <motion.span
                    className="font-bold text-purple-600 dark:text-purple-400"
                    animate={{ filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    GrubPac Technologies
                  </motion.span>
                )}
              </span>
            </NeuralLayerCard>
            <NeuralLayerCard
              animateOnMount
              layer="Layer 03 / Stack"
              icon={<Brain className="h-3.5 w-3.5 text-cyan-500" />}
              accent="border-cyan-500/25 shadow-md shadow-cyan-500/5"
              delay={0.28}
            >
              <span className="block text-left">
                Specialized in <TypewriterText text={SKILLS_TEXT} speed={100} />
              </span>
            </NeuralLayerCard>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className={`mb-5 w-full ${neuralCardClass} p-4 sm:mb-6 sm:p-5`}
          >
            <p className="mb-2 font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-neutral-600 dark:text-neutral-400">
              // Inference Output
            </p>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
              I work on two kinds of hard problems - systems that need to stay up when real users hit them, and
              models that only behave after you have tried everything twice. I like both for the same reason: the
              satisfaction when it finally works.
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Link to="/work" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-11 w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 text-base text-white shadow-lg shadow-purple-500/20 sm:h-12 sm:w-auto sm:px-8"
              >
                Explore My Work
              </Button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="h-11 w-full rounded-full border-2 border-purple-500/40 bg-white px-7 text-base font-semibold text-neutral-900 shadow-sm transition-colors hover:border-purple-500/60 hover:bg-purple-50 dark:border-purple-500/35 dark:bg-neutral-950/75 dark:text-white dark:hover:bg-violet-500/10 sm:h-12 sm:w-auto sm:px-8"
              >
                My Story
              </Button>
            </Link>
          </motion.div>

          {!prefersReducedMotion && (
            <motion.div
              className="mt-8 hidden sm:mt-10 sm:flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              aria-hidden="true"
            >
              <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-purple-500/30 p-1">
                <motion.div
                  className="h-2 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-500"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
