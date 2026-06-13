import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { throttle } from '../../hooks/useScrollOptimization'

const MILESTONES = [25, 50, 75] as const

interface CinematicScrollProgressProps {
  className?: string
  /** Pixels scrolled before the bar fades in */
  revealAfter?: number
}

export const CinematicScrollProgress: React.FC<CinematicScrollProgressProps> = ({
  className = '',
  revealAfter = 20,
}) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      setProgress(Math.min(scrollPercent, 100))
      setIsVisible(scrollTop > revealAfter)
    }, 16)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [revealAfter])

  const pct = Math.min(Math.max(progress, 0), 100)

  return (
    <motion.div
      className={`pointer-events-none fixed inset-x-0 top-0 z-[60] ${className}`}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div className="relative h-[3px] w-full">
        {/* Base rail */}
        <div className="absolute inset-0 bg-neutral-200/70 dark:bg-[#0a0018]/95" />
        <div
          className="absolute inset-0 opacity-40 dark:opacity-50"
          aria-hidden="true"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(147,51,234,0.18) 0, rgba(147,51,234,0.18) 1px, transparent 1px, transparent 48px)',
          }}
        />

        {/* Soft glow under fill */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500/30 via-purple-500/40 to-cyan-400/30 blur-[4px]"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />

        {/* Gradient fill */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        >
          <div className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />
          {!prefersReducedMotion && (
            <div className="animate-shimmer absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          )}
        </div>

        {/* Milestone synapses */}
        {MILESTONES.map((milestone) => {
          const lit = pct >= milestone
          return (
            <div
              key={milestone}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${milestone}%` }}
              aria-hidden="true"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  lit
                    ? 'h-1.5 w-1.5 bg-cyan-300 shadow-[0_0_8px_2px_rgba(34,211,238,0.65)]'
                    : 'h-1 w-1 bg-neutral-400/50 dark:bg-purple-500/35'
                }`}
              />
            </div>
          )
        })}

        {/* Leading inference node */}
        {pct > 1 && (
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${pct}%` }}
            aria-hidden="true"
          >
            <motion.div
              className="relative -translate-x-1/2"
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="absolute -inset-1.5 rounded-full bg-cyan-400/35 blur-[3px]" />
              <span className="relative block h-2 w-2 rounded-full bg-white shadow-[0_0_12px_2px_rgba(147,51,234,0.85),0_0_5px_1px_rgba(34,211,238,0.9)] ring-1 ring-purple-400/70" />
            </motion.div>
          </div>
        )}

        {/* Completion flare at 100% */}
        {pct >= 99.5 && (
          <motion.div
            className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}
      </div>
    </motion.div>
  )
}
