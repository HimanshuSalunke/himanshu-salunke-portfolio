import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Target } from 'lucide-react'
import { JourneySectionMarker, journeyCardClass, journeyChipClass, journeyContentClass, journeyHeadingClass, journeySectionClass } from './journey/JourneyPrimitives'

const mission = {
  title: 'My Mission',
  content:
    "To leverage the power of artificial intelligence and data science to solve real-world problems, create innovative solutions, and make technology more accessible and beneficial for everyone. I'm committed to continuous learning, ethical development practices, and building a future where technology serves humanity's greatest needs.",
  goals: [
    'Develop AI solutions that address real-world challenges',
    'Contribute to open-source projects and the tech community',
    'Mentor others and share knowledge through writing and teaching',
    'Build ethical and responsible AI systems',
    "Create technology that improves people's lives",
  ],
}

const values = [
  {
    id: 'excellence',
    title: 'Excellence',
    icon: '🏆',
    description:
      'I strive for excellence in everything I do, from writing clean code to delivering exceptional user experiences.',
    accent: 'border-amber-500/25 bg-amber-500/5',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    icon: '💡',
    description:
      'I believe in pushing boundaries and finding creative solutions to complex problems using cutting-edge technology.',
    accent: 'border-violet-500/25 bg-violet-500/5',
  },
  {
    id: 'learning',
    title: 'Learning',
    icon: '📚',
    description:
      "Continuous learning is at the heart of my journey. I'm always exploring new technologies and expanding my knowledge.",
    accent: 'border-blue-500/25 bg-blue-500/5',
  },
  {
    id: 'impact',
    title: 'Impact',
    icon: '🌍',
    description:
      "I want to create technology that makes a positive difference in people's lives and contributes to society's betterment.",
    accent: 'border-emerald-500/25 bg-emerald-500/5',
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    icon: '🤝',
    description:
      'I believe in the power of teamwork and enjoy working with others to build something greater than the sum of its parts.',
    accent: 'border-indigo-500/25 bg-indigo-500/5',
  },
  {
    id: 'resilience',
    title: 'Resilience',
    icon: '💪',
    description:
      'My personal journey has taught me that resilience and determination can overcome any obstacle in life.',
    accent: 'border-rose-500/25 bg-rose-500/5',
  },
]

export const MissionCompass: React.FC = () => {
  const [activeValueId, setActiveValueId] = useState(values[0].id)
  const prefersReducedMotion = useReducedMotion()

  const activeValue = values.find((v) => v.id === activeValueId) ?? values[0]

  return (
    <section className={`relative overflow-hidden border-t border-violet-500/10 bg-transparent ${journeySectionClass}`}>
      <JourneySectionMarker accent="violet" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className={`relative z-10 mx-auto max-w-7xl ${journeyContentClass}`}>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-10 md:mb-12"
        >
          <h2 className={`mb-3 ${journeyHeadingClass}`}>
            Mission &{' '}
            <span className="bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
              Values
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg">
            The principles that guide my work and the mission that drives my passion for technology.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-10 ${journeyCardClass} border-violet-500/25 p-4 sm:mb-12 sm:p-6 md:p-8`}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10">
              <Target className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">{mission.title}</h3>
          </div>

          <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg">
            {mission.content}
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mission.goals.map((goal, index) => (
              <motion.div
                key={goal}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2.5 rounded-xl border border-neutral-200/80 bg-neutral-50/80 p-3 dark:border-neutral-700/50 dark:bg-neutral-900/40"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {goal}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-neutral-900 dark:text-white sm:mb-5 sm:text-xl">Core Values</h3>

          <div className="mb-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2 lg:grid-cols-6">
            {values.map((value) => {
              const isActive = activeValueId === value.id
              return (
                <button
                  key={value.id}
                  type="button"
                  onClick={() => setActiveValueId(value.id)}
                  className={`rounded-xl border p-2 text-center transition-all duration-200 sm:p-3 ${isActive ? value.accent + ' border-opacity-60' : journeyChipClass}`}
                >
                  <span className="mb-0.5 block text-xl sm:mb-1 sm:text-2xl">{value.icon}</span>
                  <span className="text-[10px] font-semibold leading-tight text-neutral-800 dark:text-neutral-200 sm:text-xs">
                    {value.title}
                  </span>
                </button>
              )
            })}
          </div>

          <motion.div
            key={activeValue.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`rounded-2xl border p-4 text-neutral-700 dark:text-neutral-300 sm:p-5 ${activeValue.accent}`}
          >
            <p className="text-center text-sm leading-relaxed sm:text-base">
              {activeValue.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
