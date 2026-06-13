import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CinematicScrollProgress } from './CinematicScrollProgress'

interface ReadingProgressProps {
  className?: string
}

/** @deprecated Use global ProgressTracker in App instead - kept for backward compatibility */
export const ReadingProgress: React.FC<ReadingProgressProps> = ({ className = '' }) => {
  return <CinematicScrollProgress className={className} revealAfter={0} />
}

export const CircularReadingProgress: React.FC<ReadingProgressProps> = ({ className = '' }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  const radius = 20
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <motion.div
      className={`fixed bottom-6 left-6 z-40 ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: progress > 5 ? 1 : 0, scale: progress > 5 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-12 w-12">
        <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-neutral-200 dark:text-neutral-700"
          />
          <motion.circle
            cx="22"
            cy="22"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="text-purple-500"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
