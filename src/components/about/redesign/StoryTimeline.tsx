import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Activity,
  BookOpen,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  GripHorizontal,
} from 'lucide-react'
import { JourneyFlowTrack, journeyContentClass, journeyHeadingClass, journeyMarkerClass, journeySectionClass } from './journey/JourneyPrimitives'

interface TimelineItem {
  id: string
  title: string
  subtitle: string
  period: string
  shortLabel: string
  description: string
  detailedDescription?: string
  type: 'education' | 'story' | 'recovery' | 'work'
  icon: React.ReactNode
  stats?: { label: string; value: string }[]
  tags?: string[]
}

const timelineData: TimelineItem[] = [
  {
    id: 'beginning',
    title: 'The Beginning',
    subtitle: 'Early Curiosity',
    period: 'Childhood',
    shortLabel: 'Start',
    description:
      'My journey into technology started with curiosity and a desire to solve problems. Growing up, I was always fascinated by how things work and loved taking apart gadgets to understand their inner workings.',
    type: 'story',
    icon: <span className="text-xl">🌱</span>,
    tags: ['Curiosity', 'Gadgets'],
  },
  {
    id: 'ssc',
    title: 'Secondary School Certificate (SSC)',
    subtitle: 'K. S. K. New City High School, Dhule',
    period: 'March 2016 – March 2017',
    shortLabel: 'SSC',
    description:
      'Completed secondary school education with strong foundation in science and mathematics. Developed analytical thinking and problem-solving skills.',
    type: 'education',
    icon: <BookOpen className="h-5 w-5" />,
    stats: [{ label: 'Percentage', value: '50.00%' }],
    tags: ['Mathematics', 'Science'],
  },
  {
    id: 'medical-recovery',
    title: 'Medical Recovery & Academic Resilience Journey',
    subtitle: 'Personal Development & Recovery',
    period: 'Dec 2015 – 2021',
    shortLabel: 'Recovery',
    description:
      'During my academic journey, I faced a significant medical challenge that required extensive recovery and rehabilitation. This period involved multiple surgical procedures and an extended recovery timeline that impacted my educational progression. Despite these challenges, I maintained my commitment to academic excellence and personal development.',
    detailedDescription:
      "In December 2015, I sustained a severe fracture in my left leg that broke completely from the main upper joint. This required immediate surgery with screws fitted to support the bone. I was in 9th standard at the time and had to rest for 2 years to heal. This significantly impacted my 10th standard performance (50% marks) as I couldn't attend school regularly. Even after the initial 2-year recovery period, I couldn't walk properly for several more years, and it took a total of 6 years for me to fully recover and regain normal mobility.",
    type: 'recovery',
    icon: <Activity className="h-5 w-5" />,
    stats: [{ label: 'Recovery', value: '6 Years' }],
    tags: ['Resilience', 'Determination', 'Growth'],
  },
  {
    id: 'diploma-degree',
    title: 'Diploma in Computer Science and Engineering',
    subtitle: 'R. C. Patel Polytechnic, Shirpur',
    period: 'Aug 2017 – May 2021',
    shortLabel: 'Diploma',
    description:
      'Comprehensive foundation in computer science fundamentals, programming languages, and software development methodologies. Strong emphasis on practical applications and hands-on learning.',
    type: 'education',
    icon: <span className="text-xl">📜</span>,
    stats: [
      { label: 'CGPA', value: '9.4' },
      { label: 'Duration', value: '3 Years' },
    ],
    tags: ['Software Engineering', 'Web Dev'],
  },
  {
    id: 'btech-degree',
    title: 'Bachelor of Technology in Data Science',
    subtitle:
      'R. C. Patel Institute of Technology, Shirpur - An Autonomous Institute',
    period: 'Dec 2021 – June 2024',
    shortLabel: 'B.Tech',
    description:
      'Specialized in Data Science with comprehensive focus on Machine Learning, Statistics, and Data Analysis. Developed expertise in modern AI technologies and data-driven solutions.',
    type: 'education',
    icon: <span className="text-xl">🎓</span>,
    stats: [
      { label: 'CGPA', value: '7.39' },
      { label: 'Duration', value: '3 Years' },
    ],
    tags: ['Computer Vision', 'NLP', 'Research'],
  },
  {
    id: 'grubpac-backend-developer',
    title: 'Junior Software Developer',
    subtitle: 'GrubPac Technologies, Delhi, India',
    period: 'March 2026 - Present',
    shortLabel: 'Work',
    description:
      'Designing and building scalable REST APIs and backend services using Node.js, Express, TypeScript, and PostgreSQL on AWS Cloud for smart logistics and delivery management platforms.',
    type: 'work',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
    stats: [
      { label: 'Role', value: 'Backend' },
      { label: 'Status', value: 'Present' },
    ],
    tags: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'AWS Cloud', 'REST APIs'],
  },
  {
    id: 'the-future',
    title: 'The Future & Vision',
    subtitle: 'Aspiring Data Scientist',
    period: 'Present',
    shortLabel: 'Future',
    description:
      "Today, I'm preparing for GATE 2027 while building innovative projects and contributing to the tech community. My goal is to become a leading data scientist who creates solutions that make a positive impact on society.",
    type: 'story',
    icon: <span className="text-xl">🌟</span>,
    tags: ['GATE 2027', 'Innovation', 'Impact'],
  },
]

const typeStyles = {
  story: {
    border: 'border-amber-500/25',
    activeBorder: 'border-amber-500/60 ring-2 ring-amber-500/20',
    bg: 'bg-white dark:bg-neutral-950/90',
    icon: 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    subtitle: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
    pill: 'border-amber-500/30 text-amber-700 dark:text-amber-300',
    pillActive: 'bg-amber-500/15 border-amber-500/50',
  },
  education: {
    border: 'border-violet-500/25',
    activeBorder: 'border-violet-500/60 ring-2 ring-violet-500/20',
    bg: 'bg-white dark:bg-neutral-950/90',
    icon: 'border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400',
    subtitle: 'text-violet-700 dark:text-violet-400',
    dot: 'bg-violet-500',
    pill: 'border-violet-500/30 text-violet-700 dark:text-violet-300',
    pillActive: 'bg-violet-500/15 border-violet-500/50',
  },
  recovery: {
    border: 'border-rose-500/25',
    activeBorder: 'border-rose-500/60 ring-2 ring-rose-500/20',
    bg: 'bg-white dark:bg-neutral-950/90',
    icon: 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400',
    subtitle: 'text-rose-700 dark:text-rose-400',
    dot: 'bg-rose-500',
    pill: 'border-rose-500/30 text-rose-700 dark:text-rose-300',
    pillActive: 'bg-rose-500/15 border-rose-500/50',
  },
  work: {
    border: 'border-emerald-500/25',
    activeBorder: 'border-emerald-500/60 ring-2 ring-emerald-500/20',
    bg: 'bg-white dark:bg-neutral-950/90',
    icon: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    subtitle: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    pill: 'border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
    pillActive: 'bg-emerald-500/15 border-emerald-500/50',
  },
}

interface TimelineCardProps {
  item: TimelineItem
  isActive: boolean
  expandedId: string | null
  onToggleExpand: (id: string) => void
  cardRef: (el: HTMLDivElement | null) => void
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  item,
  isActive,
  expandedId,
  onToggleExpand,
  cardRef,
}) => {
  const styles = typeStyles[item.type]
  const isExpanded = expandedId === item.id

  return (
    <div ref={cardRef} className="relative flex h-full flex-col scroll-mt-28">
      {/* Desktop connector from flow track down to card */}
      <div className="mb-0 hidden flex-col items-center md:flex">
        <div
          className={`h-3 w-3 rounded-full border-2 border-white shadow-sm transition-transform dark:border-neutral-950 ${styles.dot} ${isActive ? 'scale-125' : 'scale-100 opacity-70'}`}
        />
        <div
          className={`h-8 w-px transition-colors ${isActive ? 'bg-violet-500/60' : 'bg-violet-500/25'}`}
        />
      </div>

      <div
        className={`flex flex-grow flex-col rounded-2xl border p-4 shadow-md backdrop-blur-sm transition-all duration-300 sm:p-5 ${styles.bg} ${isActive ? styles.activeBorder : styles.border} ${isActive ? 'shadow-lg' : 'hover:shadow-lg'}`}
      >
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 sm:h-10 sm:w-10 ${styles.icon}`}
          >
            {item.icon}
          </div>
          <span className="max-w-full shrink-0 rounded-full border border-neutral-200/80 bg-white/80 px-2 py-0.5 text-left font-mono text-[10px] font-medium uppercase leading-snug tracking-wide text-neutral-500 dark:border-neutral-700/60 dark:bg-neutral-950/70 dark:text-neutral-400 sm:px-2.5">
            {item.period}
          </span>
        </div>

        <h3 className="mb-1 break-words text-base font-bold leading-snug text-neutral-900 dark:text-white sm:text-lg">
          {item.title}
        </h3>
        <h4 className={`mb-3 break-words text-xs font-semibold leading-relaxed ${styles.subtitle}`}>
          {item.subtitle}
        </h4>

        <p className="mb-4 flex-grow text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {item.description}
        </p>

        {(item.stats || item.tags) && (
          <div className="flex flex-wrap gap-1.5">
            {item.stats?.map((stat) => (
              <span
                key={stat.label}
                className="rounded-md border border-neutral-200/80 bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-neutral-700 dark:border-neutral-700/50 dark:bg-neutral-900/50 dark:text-neutral-300"
              >
                <span className="mr-1 text-neutral-500">{stat.label}:</span>
                {stat.value}
              </span>
            ))}
            {item.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-200/80 bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-600 dark:border-neutral-700/50 dark:bg-neutral-900/50 dark:text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {item.detailedDescription && (
          <div className="mt-4 border-t border-rose-500/15 pt-3 dark:border-rose-500/20">
            <button type="button" onClick={() => onToggleExpand(item.id)} className="w-full text-left">
              <div className="mb-2 flex items-center justify-between text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300">
                {isExpanded ? 'Close Story' : 'Read My Story'}
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 rounded-xl border border-rose-500/15 bg-rose-500/5 p-3 text-sm leading-relaxed text-neutral-700 dark:bg-rose-500/5 dark:text-neutral-300">
                      {item.detailedDescription}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

interface StoryTimelineProps {
  onActiveChange?: (activeIndex: number, total: number) => void
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ onActiveChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState(timelineData[0].id)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const prefersReducedMotion = useReducedMotion()

  const activeIndex = timelineData.findIndex((item) => item.id === activeId)

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8)
  }, [])

  useEffect(() => {
    onActiveChange?.(activeIndex, timelineData.length)
    updateScrollState()
  }, [activeIndex, onActiveChange, updateScrollState])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    updateScrollState()

    const onScroll = () => {
      setHasInteracted(true)
      updateScrollState()
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      container.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const jumpTo = useCallback((id: string) => {
    setHasInteracted(true)
    setActiveId(id)
    const el = cardRefs.current[id]
    if (!el) return

    if (scrollContainerRef.current && window.innerWidth >= 768) {
      const container = scrollContainerRef.current
      const left = el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2
      container.scrollTo({ left, behavior: 'smooth' })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const nextIndex =
      direction === 'right'
        ? Math.min(activeIndex + 1, timelineData.length - 1)
        : Math.max(activeIndex - 1, 0)
    jumpTo(timelineData[nextIndex].id)
  }

  useEffect(() => {
    const elements = timelineData
      .map((item) => cardRefs.current[item.id])
      .filter(Boolean) as HTMLDivElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target) {
          const id = visible[0].target.getAttribute('data-timeline-id')
          if (id) setActiveId(id)
        }
      },
      { root: scrollContainerRef.current, threshold: [0.35, 0.55, 0.75], rootMargin: '-10% 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mobileObserver = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth >= 768) return
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target) {
          const id = visible[0].target.getAttribute('data-timeline-id')
          if (id) setActiveId(id)
        }
      },
      { threshold: 0.45, rootMargin: '-20% 0px' }
    )

    timelineData.forEach((item) => {
      const el = cardRefs.current[item.id]
      if (el) mobileObserver.observe(el)
    })

    return () => mobileObserver.disconnect()
  }, [])

  const setCardRef = (id: string) => (el: HTMLDivElement | null) => {
    cardRefs.current[id] = el
    if (el) el.setAttribute('data-timeline-id', id)
  }

  return (
    <section className={`relative overflow-visible bg-transparent pt-2 ${journeySectionClass}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className={`relative z-10 mx-auto max-w-7xl ${journeyContentClass}`}>
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-6">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`mb-3 ${journeyHeadingClass}`}>
              My{' '}
              <span className="bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
                Story
              </span>
            </h2>
            <p className="max-w-xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg">
              Every journey has its challenges, but it&apos;s how we overcome them that defines who we
              become. Here&apos;s my story of resilience, growth, and passion for technology.
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-violet-600/80 dark:text-violet-400/80 sm:text-sm md:hidden">
              <GripHorizontal className="h-4 w-4 shrink-0" />
              Scroll down through milestones
            </p>
            <p className="mt-2 hidden items-center gap-1.5 text-sm text-violet-600/80 dark:text-violet-400/80 md:flex">
              <GripHorizontal className="h-4 w-4 shrink-0" />
              Drag or use arrows to slide through milestones
            </p>
          </motion.div>

          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <span className="rounded-full border border-violet-500/25 bg-white/80 px-3 py-1 font-mono text-xs text-violet-700 dark:bg-neutral-950/70 dark:text-violet-300">
              {activeIndex + 1} / {timelineData.length}
            </span>
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={activeIndex === 0}
                aria-label="Previous milestone"
                className="rounded-full border border-neutral-300/80 bg-white p-2.5 text-neutral-900 shadow-md transition-colors hover:border-violet-500/45 disabled:opacity-40 dark:border-violet-500/25 dark:bg-neutral-950/85 dark:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={activeIndex === timelineData.length - 1}
                aria-label="Next milestone"
                className="rounded-full border border-neutral-300/80 bg-white p-2.5 text-neutral-900 shadow-md transition-colors hover:border-violet-500/45 disabled:opacity-40 dark:border-violet-500/25 dark:bg-neutral-950/85 dark:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Milestone quick-jump bar */}
        <div className="scrollbar-hide -mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-2 sm:mx-0 sm:mb-8 sm:flex-wrap sm:overflow-visible sm:px-0">
          {timelineData.map((item) => {
            const styles = typeStyles[item.type]
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => jumpTo(item.id)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${styles.pill} ${isActive ? styles.pillActive + ' scale-105 shadow-sm' : 'opacity-75 hover:opacity-100'}`}
              >
                {item.shortLabel}
              </button>
            )
          })}
        </div>

        {/* Mobile: vertical stack aligned to continuum spine */}
        <div className="space-y-8 md:hidden sm:space-y-10">
          {timelineData.map((item, index) => {
            const styles = typeStyles[item.type]
            const isActive = activeId === item.id
            return (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative"
              >
                <div
                  className={`absolute top-10 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white shadow-md transition-transform sm:h-3.5 sm:w-3.5 dark:border-[#030014] ${journeyMarkerClass} ${styles.dot} ${isActive ? 'scale-125' : 'opacity-60'}`}
                />
                <TimelineCard
                  item={item}
                  isActive={isActive}
                  expandedId={expandedId}
                  onToggleExpand={(id) => setExpandedId((p) => (p === id ? null : id))}
                  cardRef={setCardRef(item.id)}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Desktop: horizontal track + cards */}
        <div className="relative hidden md:block">
          <JourneyFlowTrack animate={!prefersReducedMotion} />

          {/* Edge fades — signal more content off-screen */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-neutral-50 via-neutral-50/80 to-transparent transition-opacity duration-300 dark:from-[#030014] dark:via-[#030014]/80 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-neutral-50 via-neutral-50/80 to-transparent transition-opacity duration-300 dark:from-[#030014] dark:via-[#030014]/80 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Overlay nav — sits on the carousel edges */}
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={activeIndex === 0}
            aria-label="Previous milestone"
            className={`absolute left-1 top-[calc(50%+1.5rem)] z-30 -translate-y-1/2 rounded-full border border-neutral-300/80 bg-white p-3 text-neutral-900 shadow-lg shadow-neutral-900/10 backdrop-blur-sm transition-all hover:scale-105 hover:border-violet-500/45 disabled:pointer-events-none disabled:opacity-0 dark:border-violet-500/30 dark:bg-neutral-950/90 dark:text-white dark:shadow-violet-500/10 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={activeIndex === timelineData.length - 1}
            aria-label="Next milestone"
            className={`absolute right-1 top-[calc(50%+1.5rem)] z-30 -translate-y-1/2 rounded-full border border-neutral-300/80 bg-white p-3 text-neutral-900 shadow-lg shadow-neutral-900/10 backdrop-blur-sm transition-all hover:scale-105 hover:border-violet-500/45 disabled:pointer-events-none dark:border-violet-500/30 dark:bg-neutral-950/90 dark:text-white dark:shadow-violet-500/10 ${canScrollRight ? 'opacity-100' : 'opacity-40'}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* First-visit scroll nudge */}
          <AnimatePresence>
            {!hasInteracted && canScrollRight && !prefersReducedMotion && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="pointer-events-none absolute bottom-2 right-6 z-30 flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-white/90 px-3 py-1.5 text-xs font-medium text-violet-700 shadow-sm dark:bg-neutral-950/90 dark:text-violet-300"
              >
                Slide
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-14 active:cursor-grabbing [scroll-padding-inline:1.5rem]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onPointerDown={() => setHasInteracted(true)}
          >
            {timelineData.map((item) => (
              <div
                key={item.id}
                className="w-[min(300px,calc(100%-3.5rem))] shrink-0 snap-center first:ml-0"
              >
                <TimelineCard
                  item={item}
                  isActive={activeId === item.id}
                  expandedId={expandedId}
                  onToggleExpand={(id) => setExpandedId((p) => (p === id ? null : id))}
                  cardRef={setCardRef(item.id)}
                />
              </div>
            ))}
            {/* Trailing spacer so last card can center with peek visible */}
            <div className="w-6 shrink-0" aria-hidden="true" />
          </div>

          {/* Progress bar */}
          <div className="mt-1 flex items-center gap-3 px-1">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-violet-500/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500"
                animate={{
                  width: `${((activeIndex + 1) / timelineData.length) * 100}%`,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {activeIndex + 1} of {timelineData.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
