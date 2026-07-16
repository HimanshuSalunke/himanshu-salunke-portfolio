import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { JourneySectionMarker, journeyCardClass, journeyContentClass } from './journey/JourneyPrimitives'

export const ClosingQuote: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className={`relative overflow-hidden border-t border-violet-500/10 pb-16 pt-14 sm:pb-24 sm:pt-20 md:pb-28 md:pt-24`}>
      <JourneySectionMarker accent="violet" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.06),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.1),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className={`relative z-10 mx-auto max-w-4xl ${journeyContentClass}`}>
        <motion.blockquote
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`${journeyCardClass} border-violet-500/25 p-5 text-center sm:p-8 md:p-10`}
        >
          <span className="mb-3 block text-2xl sm:mb-4 sm:text-3xl md:text-4xl" aria-hidden>
            💪
          </span>
          <p className="mb-5 font-serif text-lg italic leading-relaxed text-neutral-800 dark:text-neutral-300 sm:mb-6 sm:text-xl md:text-2xl lg:text-3xl">
            &ldquo;Every setback is a setup for a comeback. The challenges I&apos;ve faced have only made
            me stronger, more determined, and more passionate about using technology to create positive
            change.&rdquo;
          </p>
          <footer className="text-xs font-medium uppercase tracking-widest text-neutral-500 sm:text-sm">
            — Himanshu Kishor Salunke
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
