import React from 'react'

/** Left padding for content sitting beside the journey spine */
export const journeyContentClass =
  'pl-9 pr-3 sm:pl-14 sm:pr-5 md:pl-16 md:pr-6 lg:pl-20 lg:pr-8'

/** Spine lane position — marker dots align to this */
export const journeyMarkerClass =
  'left-[1.125rem] sm:left-6 md:left-10 lg:left-14'

/** Shared section vertical rhythm */
export const journeySectionClass = 'py-14 sm:py-20 md:py-24'

/** Shared section heading scale */
export const journeyHeadingClass =
  'text-2xl font-black sm:text-3xl md:text-4xl text-neutral-900 dark:text-white'

/** Body / subtitle copy */
export const journeyBodyClass =
  'text-sm text-neutral-700 dark:text-neutral-400 sm:text-base md:text-lg'

/** Card surfaces — readable in light + dark */
export const journeyCardClass =
  'rounded-2xl border border-neutral-300/70 bg-white/97 shadow-sm backdrop-blur-sm dark:border-neutral-700/55 dark:bg-neutral-950/90'

/** Inactive pill / chip */
export const journeyChipClass =
  'border border-neutral-300/80 bg-white text-neutral-800 shadow-sm hover:border-neutral-400 dark:border-neutral-700/55 dark:bg-neutral-950/75 dark:text-neutral-200 dark:hover:border-neutral-600'

const markerColors = {
  amber: 'bg-amber-500',
  violet: 'bg-violet-500',
  blue: 'bg-blue-500',
  emerald: 'bg-emerald-500',
  rose: 'bg-rose-500',
} as const

type MarkerAccent = keyof typeof markerColors

/** Dot on the flowing path at each section boundary */
export const JourneySectionMarker: React.FC<{ accent?: MarkerAccent }> = ({
  accent = 'violet',
}) => (
  <div
    className={`pointer-events-none absolute top-8 z-10 w-8 sm:top-10 sm:w-10 ${journeyMarkerClass}`}
    aria-hidden
  >
    <div
      className={`mx-auto h-3 w-3 rounded-full border-2 border-white shadow-md sm:h-3.5 sm:w-3.5 dark:border-[#030014] ${markerColors[accent]}`}
    />
  </div>
)

interface JourneyContinuumSpineProps {
  animate?: boolean
  className?: string
  /** 0–1 progress along the journey — brightens the path up to this point */
  progress?: number
}

const SPINE_PATH =
  'M 20 0 C 6 100, 34 200, 20 300 C 6 400, 34 500, 20 600 C 6 700, 34 800, 20 900 C 6 1000, 34 1100, 20 1200'

/** Full-height flowing path — spans hero + timeline as one continuous journey */
export const JourneyContinuumSpine: React.FC<JourneyContinuumSpineProps> = ({
  animate = true,
  className = '',
  progress = 1,
}) => {
  const clamped = Math.min(1, Math.max(0, progress))

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 left-2 z-0 w-8 sm:left-6 sm:w-10 md:left-10 lg:left-14 ${className}`}
      aria-hidden="true"
    >
      <svg className="h-full w-full" viewBox="0 0 40 1200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="journey-continuum" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#8b5cf6" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.85" />
          </linearGradient>
          <filter id="journey-glow" x="-50%" y="-2%" width="200%" height="104%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={SPINE_PATH}
          fill="none"
          stroke="url(#journey-continuum)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.25"
        />
        <path
          d={SPINE_PATH}
          fill="none"
          stroke="url(#journey-continuum)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 12"
          filter="url(#journey-glow)"
          className={animate ? 'animate-neural-dash' : undefined}
          style={{ strokeDashoffset: 0, opacity: 0.95 }}
        />
        {clamped > 0 && (
          <path
            d={SPINE_PATH}
            fill="none"
            stroke="url(#journey-continuum)"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${clamped} ${1 - clamped}`}
            filter="url(#journey-glow)"
            style={{ transition: 'stroke-dasharray 0.5s ease' }}
          />
        )}
      </svg>
    </div>
  )
}

export const JourneyPageBackdrop: React.FC = () => (
  <>
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.08),transparent_50%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.08),transparent_50%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(139,92,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.04)_1px,transparent_1px)]" />
  </>
)

/** Horizontal flowing track for desktop timeline carousel */
export const JourneyFlowTrack: React.FC<{ animate?: boolean }> = ({ animate = true }) => (
  <div className="pointer-events-none absolute left-0 right-0 top-[3.25rem] hidden h-px md:block" aria-hidden="true">
    <svg className="h-4 w-full" preserveAspectRatio="none" viewBox="0 0 1000 4">
      <defs>
        <linearGradient id="journey-flow-track" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <line
        x1="0"
        y1="2"
        x2="1000"
        y2="2"
        stroke="url(#journey-flow-track)"
        strokeWidth="2"
        strokeDasharray="12 10"
        className={animate ? 'animate-neural-dash' : undefined}
      />
    </svg>
  </div>
)
