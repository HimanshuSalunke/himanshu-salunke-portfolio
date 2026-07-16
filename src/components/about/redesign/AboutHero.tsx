import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, FolderKanban } from 'lucide-react'
import { ImageWithShimmer } from '../../ui/ImageWithShimmer'
import { journeyCardClass, journeyChipClass, journeyContentClass } from './journey/JourneyPrimitives'

const highlights = [
  { label: 'Data Science', accent: 'text-amber-600 dark:text-amber-400' },
  { label: 'Machine Learning', accent: 'text-violet-600 dark:text-violet-400' },
  { label: 'Microsoft Fabric', accent: 'text-sky-600 dark:text-sky-400' },
  { label: 'Backend', accent: 'text-blue-600 dark:text-blue-400' },
  { label: 'AWS Cloud', accent: 'text-orange-600 dark:text-orange-400' },
]

export const AboutHero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative -mt-[var(--header-offset)] flex min-h-[100svh] items-center overflow-visible bg-transparent lg:h-[100svh] lg:max-h-[100svh] lg:min-h-0 lg:overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div
        className={`relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 py-[calc(var(--header-offset)+1.1rem)] sm:gap-9 sm:py-[calc(var(--header-offset)+1.35rem)] lg:h-full lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-[calc(var(--header-offset)+0.85rem)] xl:gap-14 ${journeyContentClass}`}
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
          className="flex shrink-0 flex-col items-center lg:items-start"
        >
          <div className="relative">
            <div
              className={`absolute -inset-3 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-violet-500/10 to-blue-500/10 ${prefersReducedMotion ? '' : 'animate-pulse'}`}
              style={{ animationDuration: '4s' }}
            />
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/80 bg-white p-1.5 shadow-2xl shadow-violet-500/15 dark:border-violet-500/30 dark:bg-neutral-950 dark:shadow-violet-500/10">
              <ImageWithShimmer
                src="/images/avatar.jpg"
                alt="Himanshu Salunke"
                className="h-36 w-36 rounded-xl object-cover sm:h-44 sm:w-44 lg:h-[13.5rem] lg:w-[13.5rem]"
                priority
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-xl text-center lg:max-w-2xl lg:text-left"
        >
          <span className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 font-mono text-xs text-amber-800 dark:text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            About Me
          </span>

          <h1 className="mb-3 break-words text-[1.65rem] font-black leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-4xl md:text-5xl lg:text-[3rem] xl:text-5xl">
            Himanshu{' '}
            <span className="bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
              Kishor Salunke
            </span>
          </h1>

          <p className="mb-4.5 text-lg font-semibold text-violet-700 dark:text-violet-300 sm:mb-5 sm:text-xl md:text-2xl lg:text-xl xl:text-2xl">
            Aspiring Data Scientist & ML Engineer
          </p>

          <p className="mb-3.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:mb-4 sm:text-base lg:text-base">
            I&apos;m passionate about building intelligent solutions with Python, Machine Learning, and AI.
            Currently preparing for GATE 2027 while building innovative AI projects and learning new
            technologies.
          </p>

          <p className="mb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:mb-5.5 sm:text-base lg:text-base">
            I have a strong foundation in computer science and data science, with hands-on experience in
            machine learning, statistical analysis, data visualization, and backend development on AWS
            Cloud. My journey has been marked by resilience and determination, overcoming significant
            challenges to achieve my academic and professional goals.
          </p>

          <div className="mb-5.5 flex flex-wrap justify-center gap-2 lg:justify-start sm:mb-6">
            {highlights.map((item) => (
              <span
                key={item.label}
                className={`rounded-full border px-3 py-1 text-xs font-medium shadow-sm ${journeyChipClass} ${item.accent}`}
              >
                {item.label}
              </span>
            ))}
          </div>

          <div className="mb-5.5 grid w-full max-w-md grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 lg:max-w-none">
            <div className={`${journeyCardClass} border-violet-500/25 p-3 sm:p-3.5`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  🎓
                </span>
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">
                    B.Tech Data Science
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">7.39 CGPA</p>
                </div>
              </div>
            </div>
            <div className={`${journeyCardClass} border-amber-500/25 p-3 sm:p-3.5`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  🎓
                </span>
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">Diploma in CSE</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">9.4 CGPA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="/Himanshu_Salunke_Resume.pdf"
              download="Himanshu_Salunke_Resume.pdf"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 hover:scale-[1.02] sm:w-auto sm:px-7 sm:text-base"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <Link
              to="/work"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-violet-500/40 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:border-violet-500/60 hover:bg-violet-50 dark:border-violet-500/35 dark:bg-neutral-950/75 dark:text-white dark:hover:bg-violet-500/10 sm:w-auto sm:px-7 sm:text-base"
            >
              <FolderKanban className="h-4 w-4 text-violet-500" />
              View Projects
            </Link>
          </div>
        </motion.div>
      </div>

      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          aria-hidden="true"
        >
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-violet-500/30 p-1">
            <motion.div
              className="h-2 w-1 rounded-full bg-gradient-to-b from-amber-500 to-violet-500"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
