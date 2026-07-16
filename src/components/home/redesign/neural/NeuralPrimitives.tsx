import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Brain } from 'lucide-react'
import { SiPytorch, SiTensorflow, SiHuggingface } from 'react-icons/si'
import { FaBrain, FaNetworkWired } from 'react-icons/fa'

/** Shared section vertical rhythm */
export const neuralSectionClass = 'py-14 sm:py-20 md:py-24'

/** Shared section heading scale */
export const neuralHeadingClass =
  'text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl md:text-4xl'

/** Body / subtitle copy */
export const neuralBodyClass =
  'text-sm text-neutral-700 dark:text-neutral-400 sm:text-base md:text-lg'

/** Card surfaces — readable in light + dark */
export const neuralCardClass =
  'rounded-2xl border border-neutral-300/70 bg-white shadow-sm backdrop-blur-sm dark:border-neutral-700/55 dark:bg-neutral-950/90'

/** Badge / pill surfaces */
export const neuralChipClass =
  'border border-neutral-300/80 bg-white text-neutral-800 shadow-sm dark:border-neutral-700/55 dark:bg-neutral-950/75 dark:text-neutral-200'

// eslint-disable-next-line react-refresh/only-export-components -- shared neural layout constants
export const NEURAL_NODES = [
  { cx: 2, cy: 12 }, { cx: 4, cy: 35 }, { cx: 3, cy: 58 }, { cx: 5, cy: 82 },
  { cx: 98, cy: 18 }, { cx: 96, cy: 42 }, { cx: 97, cy: 65 }, { cx: 95, cy: 88 },
  { cx: 8, cy: 15 }, { cx: 22, cy: 8 }, { cx: 38, cy: 18 }, { cx: 55, cy: 10 },
  { cx: 72, cy: 22 }, { cx: 88, cy: 12 },
  { cx: 15, cy: 45 }, { cx: 32, cy: 38 }, { cx: 50, cy: 50 }, { cx: 68, cy: 42 },
  { cx: 85, cy: 48 }, { cx: 25, cy: 72 }, { cx: 48, cy: 78 }, { cx: 70, cy: 70 },
  { cx: 90, cy: 82 }, { cx: 10, cy: 88 },
] as const

// eslint-disable-next-line react-refresh/only-export-components -- shared neural layout constants
export const NEURAL_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7],
  [0, 8], [1, 14], [2, 19], [3, 23],
  [4, 13], [5, 17], [6, 21], [7, 22],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13],
  [8, 14], [9, 15], [10, 15], [10, 16], [11, 16], [11, 17], [12, 17], [12, 18], [13, 18],
  [14, 15], [15, 16], [16, 17], [17, 18],
  [14, 19], [15, 19], [16, 20], [17, 21], [18, 21],
  [19, 20], [20, 21], [19, 23], [20, 22], [21, 22], [22, 23],
]

interface NeuralMeshBackgroundProps {
  idPrefix?: string
  className?: string
}

export const NeuralMeshBackground: React.FC<NeuralMeshBackgroundProps> = ({
  idPrefix = 'neural',
  className = 'pointer-events-none absolute inset-0 h-full w-full opacity-[0.28] dark:opacity-[0.38]',
}) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${idPrefix}-line`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#9333ea" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.45" />
      </linearGradient>
    </defs>
    {NEURAL_EDGES.map(([a, b]) => (
      <line
        key={`${idPrefix}-edge-${a}-${b}`}
        x1={NEURAL_NODES[a].cx}
        y1={NEURAL_NODES[a].cy}
        x2={NEURAL_NODES[b].cx}
        y2={NEURAL_NODES[b].cy}
        stroke={`url(#${idPrefix}-line)`}
        strokeWidth="0.12"
      />
    ))}
    {NEURAL_NODES.map((node, i) => (
      <circle
        key={`${idPrefix}-node-${i}`}
        cx={node.cx}
        cy={node.cy}
        r="0.45"
        fill="#9333ea"
        opacity="0.65"
      />
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

interface SectionEdgeAccentsProps {
  showIcons?: boolean
}

export const SectionEdgeAccents: React.FC<SectionEdgeAccentsProps> = ({ showIcons = true }) => (
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
    {showIcons &&
      EDGE_ICONS.map(({ Icon, color, left, top, size }, i) => (
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

export const SectionGridOverlay: React.FC = () => (
  <>
    <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.05] dark:opacity-[0.1]" />
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.035)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.05)_1px,transparent_1px)]" />
  </>
)

/** Feed-forward output layer topology — hidden nodes → output neurons */
const OUTPUT_LAYER_EDGES: [number, number][] = [
  [0, 4], [1, 4], [2, 4], [3, 4],
  [4, 5], [4, 6], [4, 7], [4, 8],
  [5, 6], [6, 7], [7, 8],
]

const OUTPUT_LAYER_NODES = [
  { cx: 12, cy: 18, r: 1.1 },
  { cx: 37, cy: 14, r: 1.1 },
  { cx: 63, cy: 14, r: 1.1 },
  { cx: 88, cy: 18, r: 1.1 },
  { cx: 50, cy: 38, r: 1.6 },
  { cx: 12, cy: 72, r: 1.4 },
  { cx: 37, cy: 78, r: 1.4 },
  { cx: 63, cy: 78, r: 1.4 },
  { cx: 88, cy: 72, r: 1.4 },
] as const

interface OutputLayerGraphProps {
  idPrefix?: string
  animate?: boolean
}

export const OutputLayerGraph: React.FC<OutputLayerGraphProps> = ({
  idPrefix = 'output-layer',
  animate = true,
}) => (
  <svg
    className="pointer-events-none absolute inset-x-0 bottom-0 top-16 hidden h-[calc(100%-4rem)] w-full opacity-70 dark:opacity-85 lg:block"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`${idPrefix}-edge`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#9333ea" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    {OUTPUT_LAYER_EDGES.map(([a, b], i) => (
      <line
        key={`${idPrefix}-ol-${a}-${b}`}
        x1={OUTPUT_LAYER_NODES[a].cx}
        y1={OUTPUT_LAYER_NODES[a].cy}
        x2={OUTPUT_LAYER_NODES[b].cx}
        y2={OUTPUT_LAYER_NODES[b].cy}
        stroke={`url(#${idPrefix}-edge)`}
        strokeWidth="0.18"
        strokeDasharray={animate ? '1.2 0.8' : undefined}
        className={animate ? 'animate-neural-dash' : undefined}
        style={animate ? { animationDelay: `${i * 0.15}s` } : undefined}
      />
    ))}

    {OUTPUT_LAYER_NODES.map((node, i) => (
      <circle
        key={`${idPrefix}-ol-node-${i}`}
        cx={node.cx}
        cy={node.cy}
        r={node.r}
        fill={i < 4 ? '#6366f1' : i === 4 ? '#9333ea' : '#22d3ee'}
        opacity={i === 4 ? 0.9 : 0.75}
      />
    ))}
  </svg>
)

/** Hidden layer topology — input nodes feed active learning neurons */
const HIDDEN_LAYER_EDGES: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 3], [3, 4], [4, 5],
  [2, 4], [3, 5],
]

const HIDDEN_LAYER_NODES = [
  { cx: 22, cy: 16, r: 1.2 },
  { cx: 78, cy: 16, r: 1.2 },
  { cx: 12, cy: 72, r: 1.4 },
  { cx: 37, cy: 78, r: 1.4 },
  { cx: 63, cy: 78, r: 1.4 },
  { cx: 88, cy: 72, r: 1.4 },
] as const

interface HiddenLayerGraphProps {
  idPrefix?: string
  animate?: boolean
}

export const HiddenLayerGraph: React.FC<HiddenLayerGraphProps> = ({
  idPrefix = 'hidden-layer',
  animate = true,
}) => (
  <svg
    className="pointer-events-none absolute inset-x-0 bottom-0 top-16 hidden h-[calc(100%-4rem)] w-full opacity-70 dark:opacity-85 lg:block"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`${idPrefix}-edge`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#9333ea" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    {HIDDEN_LAYER_EDGES.map(([a, b], i) => (
      <line
        key={`${idPrefix}-hl-${a}-${b}`}
        x1={HIDDEN_LAYER_NODES[a].cx}
        y1={HIDDEN_LAYER_NODES[a].cy}
        x2={HIDDEN_LAYER_NODES[b].cx}
        y2={HIDDEN_LAYER_NODES[b].cy}
        stroke={`url(#${idPrefix}-edge)`}
        strokeWidth="0.16"
        strokeDasharray={animate ? '1.2 0.8' : undefined}
        className={animate ? 'animate-neural-dash' : undefined}
        style={animate ? { animationDelay: `${i * 0.12}s` } : undefined}
      />
    ))}

    {HIDDEN_LAYER_NODES.map((node, i) => (
      <circle
        key={`${idPrefix}-hl-node-${i}`}
        cx={node.cx}
        cy={node.cy}
        r={node.r}
        fill={i < 2 ? '#6366f1' : '#9333ea'}
        opacity={i < 2 ? 0.7 : 0.85}
      />
    ))}
  </svg>
)

/** Bento navigation topology — central route hub fan-out to path nodes */
const NAV_LAYER_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 2], [3, 4],
]

const NAV_LAYER_NODES = [
  { cx: 34, cy: 42, r: 2.2 },
  { cx: 84, cy: 22, r: 1.3 },
  { cx: 84, cy: 48, r: 1.3 },
  { cx: 17, cy: 82, r: 1.3 },
  { cx: 50, cy: 82, r: 1.3 },
] as const

interface NavigationLayerGraphProps {
  idPrefix?: string
  animate?: boolean
}

export const NavigationLayerGraph: React.FC<NavigationLayerGraphProps> = ({
  idPrefix = 'nav-layer',
  animate = true,
}) => (
  <svg
    className="pointer-events-none absolute inset-x-0 bottom-0 top-12 hidden h-[calc(100%-3rem)] w-full opacity-65 dark:opacity-80 md:block"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`${idPrefix}-edge`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.55" />
        <stop offset="50%" stopColor="#9333ea" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
      </linearGradient>
    </defs>

    {NAV_LAYER_EDGES.map(([a, b], i) => (
      <line
        key={`${idPrefix}-nav-${a}-${b}`}
        x1={NAV_LAYER_NODES[a].cx}
        y1={NAV_LAYER_NODES[a].cy}
        x2={NAV_LAYER_NODES[b].cx}
        y2={NAV_LAYER_NODES[b].cy}
        stroke={`url(#${idPrefix}-edge)`}
        strokeWidth="0.16"
        strokeDasharray={animate ? '1.2 0.8' : undefined}
        className={animate ? 'animate-neural-dash' : undefined}
        style={animate ? { animationDelay: `${i * 0.14}s` } : undefined}
      />
    ))}

    {NAV_LAYER_NODES.map((node, i) => (
      <circle
        key={`${idPrefix}-nav-node-${i}`}
        cx={node.cx}
        cy={node.cy}
        r={node.r}
        fill={i === 0 ? '#9333ea' : '#22d3ee'}
        opacity={i === 0 ? 0.95 : 0.8}
      />
    ))}
  </svg>
)

interface MobileNeuralSpineProps {
  idPrefix?: string
}

export const MobileNeuralSpine: React.FC<MobileNeuralSpineProps> = ({ idPrefix = 'spine' }) => (
  <svg
    className="pointer-events-none absolute left-3 top-20 h-[calc(100%-5rem)] w-6 opacity-50 sm:left-4 sm:top-24 sm:h-[calc(100%-6rem)] sm:w-8 sm:opacity-60 lg:hidden"
    viewBox="0 0 20 100"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`${idPrefix}-spine`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7" />
        <stop offset="50%" stopColor="#9333ea" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <line x1="10" y1="4" x2="10" y2="96" stroke={`url(#${idPrefix}-spine)`} strokeWidth="0.6" />
    {[8, 28, 48, 68, 88].map((y, i) => (
      <circle
        key={y}
        cx="10"
        cy={y}
        r={i === 2 ? 1.8 : 1.2}
        fill={i === 2 ? '#9333ea' : '#22d3ee'}
        opacity="0.85"
      />
    ))}
  </svg>
)

export interface NeuralLayerCardProps {
  layer: string
  icon: React.ReactNode
  accent: string
  children: React.ReactNode
  delay?: number
  compact?: boolean
  className?: string
  animateOnMount?: boolean
  showLayer?: boolean
}

export const NeuralLayerCard: React.FC<NeuralLayerCardProps> = ({
  layer,
  icon,
  accent,
  children,
  delay = 0,
  compact,
  className = '',
  animateOnMount = false,
  showLayer = true,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const motionProps = animateOnMount
    ? {
        initial: prefersReducedMotion ? false : { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, delay },
      }
    : {
        initial: prefersReducedMotion ? false : { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-20px' },
        transition: { duration: 0.45, delay },
      }

  return (
    <motion.div
      {...motionProps}
      className={`relative z-10 flex flex-col ${neuralCardClass} ${accent} ${
        compact ? 'min-h-0 p-3.5' : 'min-h-[90px] p-4 sm:min-h-[100px] sm:p-4'
      } ${className}`}
    >
      {showLayer && (
        <div
          className={`flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-400 ${compact ? 'mb-2' : 'mb-3'}`}
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-neutral-200/80 bg-neutral-50 dark:border-neutral-700/50 dark:bg-neutral-900">
            {icon}
          </span>
          {layer}
        </div>
      )}
      <div className="flex flex-1 flex-col justify-center break-words text-sm leading-snug text-neutral-800 dark:text-neutral-200">
        {children}
      </div>
    </motion.div>
  )
}
