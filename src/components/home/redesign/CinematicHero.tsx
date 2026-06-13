import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Cpu, Network } from 'lucide-react'
import { SiPytorch, SiTensorflow, SiHuggingface } from 'react-icons/si'
import { FaBrain, FaNetworkWired } from 'react-icons/fa'
import { Button } from '../../ui/Button'
import { ImageWithShimmer } from '../../ui/ImageWithShimmer'

const SKILLS_TEXT = 'Python, Machine Learning, Deep Learning, Gen AI, RAG, LLM'

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
    <span className="inline-block min-w-[100px] text-left font-bold text-cyan-500 dark:text-cyan-400">
      <span>{skills[currentSkill].substring(0, currentChar)}</span>
      <span className="ml-1 animate-pulse text-purple-400">|</span>
    </span>
  )
}

const NEURAL_NODES = [
  { cx: 2, cy: 12 }, { cx: 4, cy: 35 }, { cx: 3, cy: 58 }, { cx: 5, cy: 82 },
  { cx: 98, cy: 18 }, { cx: 96, cy: 42 }, { cx: 97, cy: 65 }, { cx: 95, cy: 88 },
  { cx: 8, cy: 15 }, { cx: 22, cy: 8 }, { cx: 38, cy: 18 }, { cx: 55, cy: 10 },
  { cx: 72, cy: 22 }, { cx: 88, cy: 12 },
  { cx: 15, cy: 45 }, { cx: 32, cy: 38 }, { cx: 50, cy: 50 }, { cx: 68, cy: 42 },
  { cx: 85, cy: 48 }, { cx: 25, cy: 72 }, { cx: 48, cy: 78 }, { cx: 70, cy: 70 },
  { cx: 90, cy: 82 }, { cx: 10, cy: 88 },
] as const

const NEURAL_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7],
  [0, 8], [1, 14], [2, 19], [3, 23],
  [4, 13], [5, 17], [6, 21], [7, 22],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13],
  [8, 14], [9, 15], [10, 15], [10, 16], [11, 16], [11, 17], [12, 17], [12, 18], [13, 18],
  [14, 15], [15, 16], [16, 17], [17, 18],
  [14, 19], [15, 19], [16, 20], [17, 21], [18, 21],
  [19, 20], [20, 21], [19, 23], [20, 22], [21, 22], [22, 23],
]

const NeuralMeshBackground: React.FC = () => (
  <svg
    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.28] dark:opacity-[0.38]"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="neural-line" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#9333ea" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.45" />
      </linearGradient>
    </defs>
    {NEURAL_EDGES.map(([a, b]) => (
      <line
        key={`edge-${a}-${b}`}
        x1={NEURAL_NODES[a].cx}
        y1={NEURAL_NODES[a].cy}
        x2={NEURAL_NODES[b].cx}
        y2={NEURAL_NODES[b].cy}
        stroke="url(#neural-line)"
        strokeWidth="0.12"
      />
    ))}
    {NEURAL_NODES.map((node, i) => (
      <circle key={`node-${i}`} cx={node.cx} cy={node.cy} r="0.45" fill="#9333ea" opacity="0.65" />
    ))}
  </svg>
)

const EDGE_ICONS = [
  { Icon: SiTensorflow, color: 'text-orange-500', left: '4%', top: '18%', size: 32 },
  { Icon: FaBrain, color: 'text-purple-500', left: '7%', top: '62%', size: 29 },
  { Icon: FaNetworkWired, color: 'text-blue-500', left: '2%', top: '42%', size: 25 },
  { Icon: SiPytorch, color: 'text-red-500', left: '92%', top: '22%', size: 32 },
  { Icon: SiHuggingface, color: 'text-yellow-500', left: '88%', top: '55%', size: 29 },
  { Icon: Brain, color: 'text-cyan-500', left: '94%', top: '78%', size: 25 },
] as const

const HeroEdgeAccents: React.FC = () => (
  <>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-[min(28vw,320px)] bg-gradient-to-r from-blue-500/[0.07] via-purple-500/[0.04] to-transparent dark:from-blue-500/10 dark:via-purple-500/[0.06]" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[min(28vw,320px)] bg-gradient-to-l from-cyan-500/[0.06] via-purple-500/[0.04] to-transparent dark:from-cyan-500/10 dark:via-purple-500/[0.06]" />
    <div
      className="pointer-events-none absolute inset-y-0 left-0 w-[min(22vw,260px)] opacity-[0.18] dark:opacity-[0.28]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(147,51,234,0.35) 0, rgba(147,51,234,0.35) 1px, transparent 1px, transparent 28px)',
      }}
    />
    <div
      className="pointer-events-none absolute inset-y-0 right-0 w-[min(22vw,260px)] opacity-[0.18] dark:opacity-[0.28]"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(59,130,246,0.35) 0, rgba(59,130,246,0.35) 1px, transparent 1px, transparent 28px)',
      }}
    />
    {EDGE_ICONS.map(({ Icon, color, left, top, size }, i) => (
      <div
        key={i}
        className={`pointer-events-none absolute hidden opacity-25 dark:opacity-30 sm:block ${color}`}
        style={{ left, top }}
        aria-hidden="true"
      >
        <Icon size={size} />
      </div>
    ))}
  </>
)

interface LayerCardProps {
  layer: string
  icon: React.ReactNode
  accent: string
  children: React.ReactNode
  delay?: number
  compact?: boolean
}

const LayerCard: React.FC<LayerCardProps> = ({ layer, icon, accent, children, delay = 0, compact }) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={`flex flex-col rounded-2xl border bg-white/90 dark:bg-neutral-950/80 ${accent} ${
        compact ? 'min-h-0 p-3.5' : 'min-h-[90px] p-4 sm:min-h-[100px] sm:p-4'
      }`}
    >
      <div className={`flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400 ${compact ? 'mb-2' : 'mb-3'}`}>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900">
          {icon}
        </span>
        {layer}
      </div>
      <div className="flex flex-1 items-center text-sm leading-snug text-neutral-700 dark:text-neutral-200">
        {children}
      </div>
    </motion.div>
  )
}

const AvatarNeuralCore: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const ringRadius = 'translateY(-92px)'

  return (
    <div className="relative mx-auto mb-5 flex h-48 w-48 items-center justify-center sm:mb-6 sm:h-52 sm:w-52 md:h-56 md:w-56">
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
    <section className="relative -mt-16 min-h-[100svh] overflow-hidden bg-neutral-50 dark:bg-[#030014]">
      <NeuralMeshBackground />
      <HeroEdgeAccents />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.05] dark:opacity-[0.1]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.035)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-blue-500/[0.06] to-transparent dark:from-blue-500/[0.08]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col items-center justify-center px-4 pb-8 pt-16 text-center sm:px-6 sm:pb-10 sm:pt-[4.5rem] lg:px-8">
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
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1.5 font-mono text-xs text-purple-700 dark:text-purple-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            👋 Hey, I&apos;m
          </motion.span>

          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mb-5 text-3xl font-black tracking-tight text-neutral-900 dark:text-white sm:mb-6 sm:text-4xl md:text-5xl"
          >
            Himanshu{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Salunke
            </span>
          </motion.h1>

          {/* Mobile: single compact panel */}
          <div className="mb-4 w-full space-y-3 md:hidden">
            <LayerCard
              layer="Layer 01 / Role"
              icon={<Cpu className="h-3 w-3 text-blue-500" />}
              accent="border-blue-500/25 shadow-md shadow-blue-500/5"
              delay={0.2}
              compact
            >
              {prefersReducedMotion ? (
                <span className="font-bold text-blue-600 dark:text-blue-400">Junior Software Developer</span>
              ) : (
                <motion.span
                  className="font-bold text-blue-600 dark:text-blue-400"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Junior Software Developer
                </motion.span>
              )}
            </LayerCard>
            <LayerCard
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
            </LayerCard>
            <LayerCard
              layer="Layer 03 / Stack"
              icon={<Brain className="h-3 w-3 text-cyan-500" />}
              accent="border-cyan-500/25 shadow-md shadow-cyan-500/5"
              delay={0.28}
              compact
            >
              <span className="block text-left">
                Specialized in <TypewriterText text={SKILLS_TEXT} speed={100} />
              </span>
            </LayerCard>
          </div>

          {/* Desktop: 3-column grid */}
          <div className="mb-5 hidden w-full grid-cols-3 gap-3 md:grid md:gap-4">
            <LayerCard
              layer="Layer 01 / Role"
              icon={<Cpu className="h-3.5 w-3.5 text-blue-500" />}
              accent="border-blue-500/25 shadow-md shadow-blue-500/5"
              delay={0.2}
            >
              {prefersReducedMotion ? (
                <span className="font-bold text-blue-600 dark:text-blue-400">Junior Software Developer</span>
              ) : (
                <motion.span
                  className="font-bold text-blue-600 dark:text-blue-400"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Junior Software Developer
                </motion.span>
              )}
            </LayerCard>
            <LayerCard
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
            </LayerCard>
            <LayerCard
              layer="Layer 03 / Stack"
              icon={<Brain className="h-3.5 w-3.5 text-cyan-500" />}
              accent="border-cyan-500/25 shadow-md shadow-cyan-500/5"
              delay={0.28}
            >
              <span className="block text-left">
                Specialized in <TypewriterText text={SKILLS_TEXT} speed={100} />
              </span>
            </LayerCard>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="mb-5 w-full rounded-2xl border border-neutral-200/80 bg-white/90 p-4 dark:border-neutral-700/60 dark:bg-neutral-950/75 sm:mb-6 sm:p-5"
          >
            <p className="mb-2 font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
              // Inference Output
            </p>
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
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
                className="h-11 w-full rounded-full border-2 border-purple-500/30 bg-white/80 px-7 text-base dark:bg-neutral-950/60 sm:h-12 sm:w-auto sm:px-8"
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
