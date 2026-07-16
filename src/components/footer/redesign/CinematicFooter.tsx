import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUp,
  BookOpen,
  Briefcase,
  Compass,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react'
import {
  NeuralMeshBackground,
  SectionEdgeAccents,
  SectionGridOverlay,
} from '../../home/redesign/neural/NeuralPrimitives'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/HimanshuSalunke',
    icon: <Github className="h-5 w-5" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/himanshuksalunke',
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    name: 'Email',
    href: 'mailto:salunkehimanshu2001@gmail.com',
    icon: <Mail className="h-5 w-5" />,
  },
]

type FooterCardAccent = 'blue' | 'purple' | 'cyan'

const cardAccents: Record<
  FooterCardAccent,
  { border: string; iconBg: string; iconColor: string; glow: string; linkHover: string }
> = {
  blue: {
    border: 'border-blue-500/25 shadow-md shadow-blue-500/5 hover:border-blue-500/45',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    glow: 'from-blue-500/15',
    linkHover: 'hover:text-blue-600 dark:hover:text-blue-400',
  },
  purple: {
    border: 'border-purple-500/25 shadow-md shadow-purple-500/5 hover:border-purple-500/45',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-600 dark:text-purple-400',
    glow: 'from-purple-500/15',
    linkHover: 'hover:text-purple-600 dark:hover:text-purple-400',
  },
  cyan: {
    border: 'border-cyan-500/25 shadow-md shadow-cyan-500/5 hover:border-cyan-500/45',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    glow: 'from-cyan-500/15',
    linkHover: 'hover:text-cyan-600 dark:hover:text-cyan-400',
  },
}

const footerLinks: {
  title: string
  accent: FooterCardAccent
  icon: React.ReactNode
  links: { name: string; href: string }[]
}[] = [
  {
    title: 'Explore',
    accent: 'blue',
    icon: <Compass className="h-5 w-5" />,
    links: [
      { name: 'Home', href: '/' },
      { name: 'Work', href: '/work' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    accent: 'purple',
    icon: <Briefcase className="h-5 w-5" />,
    links: [
      { name: 'Development', href: '/services' },
      { name: 'AI Solutions', href: '/services' },
      { name: 'Consulting', href: '/services' },
    ],
  },
  {
    title: 'Resources',
    accent: 'cyan',
    icon: <BookOpen className="h-5 w-5" />,
    links: [
      { name: 'Articles', href: '/articles' },
      { name: 'My Tech Stack', href: '/developer' },
      { name: 'Resume', href: '/Himanshu_Salunke_Resume.pdf' },
    ],
  },
]

interface FooterLinkCardProps {
  section: (typeof footerLinks)[number]
  index: number
}

const FooterLinkCard: React.FC<FooterLinkCardProps> = ({ section, index }) => {
  const prefersReducedMotion = useReducedMotion()
  const styles = cardAccents[section.accent]

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      className={`group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border bg-white/90 p-5 backdrop-blur-sm transition-colors duration-300 dark:bg-neutral-950/80 sm:min-h-[220px] sm:p-6 ${styles.border}`}
    >
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${styles.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative mb-5 flex items-center justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${styles.iconBg} ${styles.iconColor}`}
        >
          {section.icon}
        </div>
        <h3 className="flex-1 text-lg font-bold text-neutral-900 dark:text-white">
          {section.title}
        </h3>
      </div>

      <ul className="relative flex flex-1 flex-col justify-center space-y-2.5">
        {section.links.map((link) => (
          <li key={link.name}>
            {link.href.startsWith('/') ? (
              <Link
                to={link.href}
                className={`group/link flex items-center justify-between gap-2 text-sm font-medium text-neutral-600 transition-colors dark:text-neutral-400 ${styles.linkHover}`}
              >
                <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                  {link.name}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:opacity-60" />
              </Link>
            ) : (
              <a
                href={link.href}
                className={`group/link flex items-center justify-between gap-2 text-sm font-medium text-neutral-600 transition-colors dark:text-neutral-400 ${styles.linkHover}`}
              >
                <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                  {link.name}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:opacity-60" />
              </a>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export const CinematicFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const prefersReducedMotion = useReducedMotion()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden bg-neutral-50 text-neutral-900 transition-colors duration-300 dark:bg-[#030014] dark:text-white">
      <NeuralMeshBackground idPrefix="footer-mesh" />
      <SectionEdgeAccents showIcons={false} />
      <SectionGridOverlay />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-500/[0.04] to-transparent dark:from-blue-500/[0.06]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <div className="mb-16 text-center sm:mb-20">
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white md:text-6xl"
          >
            Let&apos;s Build Something <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Amazing Together.
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mb-10 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
          >
            Whether you have a specific project in mind or just want to explore the possibilities
            of AI, I&apos;m here to help.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/services">
              <button
                type="button"
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105"
              >
                Start a Project
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent sm:mb-16" />

        <div className="mb-12 grid grid-cols-1 gap-8 sm:mb-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <Link
              to="/"
              className="mb-4 inline-block bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-neutral-400"
            >
              Himanshu
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Aspiring Data Scientist & Full Stack Developer. Crafting intelligent solutions for the
              modern web.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-white/90 text-neutral-500 shadow-sm shadow-purple-500/5 transition-all duration-300 hover:scale-105 hover:border-purple-500/40 hover:text-blue-600 dark:bg-neutral-950/80 dark:text-neutral-400 dark:hover:text-white"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:col-span-9">
            {footerLinks.map((section, index) => (
              <FooterLinkCard key={section.title} section={section} index={index} />
            ))}
          </div>
        </div>

        <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-left text-sm text-neutral-500 dark:text-neutral-400">
            © {currentYear}{' '}
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Himanshu Salunke
            </span>
            . All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex shrink-0 items-center gap-2 rounded-full border-2 border-purple-500/30 bg-white/90 px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm shadow-purple-500/10 transition-all duration-300 hover:border-purple-500/50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:shadow-md hover:shadow-purple-500/20 dark:bg-neutral-950/80 dark:text-neutral-200 dark:hover:text-white"
          >
            Back to Top
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-500/10 transition-colors group-hover:bg-white/20">
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
