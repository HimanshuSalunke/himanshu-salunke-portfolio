import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../../ui/Button'
import { ImageWithShimmer } from '../../ui/ImageWithShimmer'

// Typewriter effect component (Preserved from original)
const TypewriterText: React.FC<{
  text: string
  speed?: number
  className?: string
}> = ({ text, speed = 100, className }) => {
  const [currentSkill, setCurrentSkill] = React.useState(0)
  const [currentChar, setCurrentChar] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const skills = text.split(', ')

  React.useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentChar < skills[currentSkill].length) {
            setCurrentChar(prev => prev + 1)
          } else {
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          if (currentChar > 0) {
            setCurrentChar(prev => prev - 1)
          } else {
            setIsDeleting(false)
            setCurrentSkill(prev => (prev + 1) % skills.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed
    )

    return () => clearTimeout(timeout)
  }, [currentChar, currentSkill, isDeleting, skills, speed])

  return (
    <span
      className={
        className ??
        'inline-block min-w-[150px] text-left font-bold text-blue-600 dark:text-blue-400 sm:min-w-[200px]'
      }
    >
      <span>{skills[currentSkill].substring(0, currentChar)}</span>
      <span className="ml-1 animate-pulse text-neutral-400">|</span>
    </span>
  )
}

export const CinematicHero: React.FC = () => {
  return (
    <section className="relative -mt-16 flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50 pt-24 dark:bg-neutral-950 sm:pt-12">
      {/* Cinematic Background */}
      <div className="grid-pattern absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-transparent to-transparent dark:from-neutral-950" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Avatar with Glow */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute inset-0 scale-110 rounded-full bg-blue-500 opacity-20 blur-2xl dark:opacity-40" />
            <motion.div
              className="relative rounded-full shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithShimmer
                src="/images/avatar.jpg"
                alt="Himanshu Salunke - Aspiring Data Scientist"
                className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32 md:h-40 md:w-40"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Greeting Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/50 px-4 py-2 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/50"
          >
            <span className="text-base font-medium text-neutral-600 dark:text-neutral-400 sm:text-lg">
              👋 Hey, I'm
            </span>
          </motion.div>

          {/* Name - Big & Bold */}
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Himanshu{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Salunke
            </span>
          </h1>

          <motion.div
            className="mb-5 flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <TypewriterText
              text="Junior Software Developer"
              speed={70}
              className="inline-block min-w-[260px] text-center text-xl font-bold text-blue-600 dark:text-blue-400 sm:text-2xl md:text-3xl"
            />
            <span className="inline-flex items-center gap-2 text-base font-medium text-neutral-600 dark:text-neutral-300 sm:text-lg md:text-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
              <TypewriterText
                text="Working at GrubPac Technologies"
                speed={70}
                className="inline-block min-w-[270px] text-left text-neutral-600 dark:text-neutral-300"
              />
            </span>
          </motion.div>

          {/* Role with Typewriter */}
          <div className="mx-auto mb-3 max-w-3xl text-lg font-medium text-neutral-600 dark:text-neutral-300 sm:text-xl md:text-2xl lg:text-3xl">
            <span className="mb-2 block sm:mb-0 sm:inline">
              Specialized in{' '}
            </span>
            <TypewriterText
              text="Python, Machine Learning, Deep Learning, Gen AI"
              speed={100}
            />
          </div>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-4xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg md:text-xl">
            I'm all about building things that actually work. Whether it's a
            machine learning model or a simple script, I love the process of
            turning ideas into reality.
          </p>

          {/* CTA Buttons - Premium Glass Style */}
          <motion.div
            className="mb-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/work" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 w-full rounded-full bg-blue-600 px-8 text-lg text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-700 sm:w-auto"
              >
                Explore My Work
              </Button>
            </Link>

            <Link to="/about" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="h-14 w-full rounded-full border-2 border-neutral-200 px-8 text-lg text-neutral-900 transition-all hover:scale-105 hover:bg-neutral-100 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-900 sm:w-auto"
              >
                My Story
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-1 left-1/2 hidden -translate-x-1/2 transform sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-neutral-300 p-1 dark:border-neutral-700">
          <motion.div
            className="h-3 w-1.5 rounded-full bg-blue-500"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
