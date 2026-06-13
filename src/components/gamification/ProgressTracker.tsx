import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CinematicScrollProgress } from '../ui/CinematicScrollProgress'

interface ProgressTrackerProps {
  className?: string
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ className = '' }) => {
  return <CinematicScrollProgress className={className} revealAfter={20} />
}

export const EasterEgg: React.FC = () => {
  const [isActivated, setIsActivated] = useState(false)

  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA',
    ]

    let konamiCode: string[] = []

    const handleKeyDown = (event: KeyboardEvent) => {
      konamiCode = [...konamiCode, event.code]

      if (konamiCode.length > 10) {
        konamiCode.shift()
      }

      if (
        konamiCode.length === 10 &&
        konamiCode.every((key, index) => key === konamiSequence[index])
      ) {
        setIsActivated(true)
        setTimeout(() => setIsActivated(false), 5000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isActivated) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="mx-4 max-w-md rounded-lg bg-white p-8 text-center shadow-xl dark:bg-neutral-800"
        initial={{ scale: 0.5, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.5, rotate: 180 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="mb-4 text-6xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          🎉
        </motion.div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
          Konami Code Activated!
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          You found the secret! Here&apos;s a special message: &quot;Great job exploring the portfolio!
          You&apos;ve got the skills of a true developer. 🚀&quot;
        </p>
        <motion.button
          className="mt-4 rounded bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600"
          onClick={() => setIsActivated(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Awesome!
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
