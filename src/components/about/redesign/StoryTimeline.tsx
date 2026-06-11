import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  BookOpen,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Merged Data from Timeline.tsx and PersonalStory.tsx
interface TimelineItem {
  id: string
  title: string
  subtitle: string // Company/School/Context
  period: string
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
    description:
      'My journey started with curiosity. I was always fascinated by how things work and loved taking apart gadgets to understand their inner workings.',
    type: 'story',
    icon: <nav className="text-xl">🌱</nav>,
    tags: ['Curiosity', 'Gadgets'],
  },
  {
    id: 'ssc',
    title: 'Secondary School (SSC)',
    subtitle: 'K. S. K. New City High School, Dhule',
    period: 'March 2016 – March 2017',
    description:
      'Completed secondary school education with strong foundation in science and mathematics despite health challenges.',
    type: 'education',
    icon: <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
    stats: [{ label: 'Percentage', value: '50.00%' }],
    tags: ['Mathematics', 'Science'],
  },
  {
    id: 'medical-recovery',
    title: 'The Resilience Journey',
    subtitle: 'Medical Recovery & Rehabilitation',
    period: 'Dec 2015 – 2021',
    description:
      'Faced a significant medical challenge with a severe leg fracture requiring multiple surgeries and years of recovery. This journey taught me resilience, patience, and determination.',
    detailedDescription:
      "In December 2015, I sustained a severe fracture in my left leg that broke completely from the main upper joint. This required immediate surgery with screws fitted to support the bone. I was in 9th standard at the time and had to rest for 2 years to heal. This significantly impacted my 10th standard performance as I couldn't attend school regularly. Even after the initial 2-year recovery period, I couldn't walk properly for several more years, and it took a total of 6 years for me to fully recover.",
    type: 'recovery',
    icon: <Activity className="h-5 w-5 text-red-600 dark:text-red-500" />,
    stats: [{ label: 'Recovery', value: '6 Years' }],
    tags: ['Resilience', 'Determination', 'Growth'],
  },
  {
    id: 'diploma-degree',
    title: 'Diploma in CSE',
    subtitle: 'R. C. Patel Polytechnic, Shirpur',
    period: 'Aug 2017 – May 2021',
    description:
      'Comprehensive foundation in computer science fundamentals. Strong emphasis on practical applications and hands-on learning.',
    type: 'education',
    icon: <nav className="text-xl">📜</nav>,
    stats: [
      { label: 'CGPA', value: '9.4' },
      { label: 'Duration', value: '4 Years' },
    ],
    tags: ['Software Engineering', 'Web Dev'],
  },
  {
    id: 'btech-degree',
    title: 'B.Tech in Data Science',
    subtitle:
      'R. C. Patel Institute of Technology, Shirpur - An Autonomous Institute',
    period: 'Dec 2021 – June 2024',
    description:
      'Specialized in Data Science with comprehensive focus on Machine Learning, Statistics, and Data Analysis.',
    type: 'education',
    icon: <nav className="text-xl">🎓</nav>,
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
    description:
      'Designing and building scalable REST APIs using Node.js, Express, TypeScript, and PostgreSQL for smart logistics and delivery management platforms.',
    type: 'work',
    icon: (
      <BriefcaseBusiness className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
    ),
    stats: [
      { label: 'Role', value: 'Backend' },
      { label: 'Status', value: 'Present' },
    ],
    tags: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 'the-future',
    title: 'The Future & Vision',
    subtitle: 'Aspiring Data Scientist',
    period: 'Present',
    description:
      'Preparing for GATE 2026 while building innovative AI projects. My goal is to become a leading data scientist who creates solutions that make a positive impact on society.',
    type: 'story',
    icon: <nav className="text-xl">🌟</nav>,
    tags: ['GATE 2026', 'Innovation', 'Impact'],
  },
]

export const StoryTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  // Shared Card Component
  const TimelineCard = ({
    item,
    isRecovery,
    isWork,
  }: {
    item: TimelineItem
    isRecovery: boolean
    isWork: boolean
  }) => (
    <div className="relative flex h-full flex-col">
      {/* Number/Icon Indicator */}
      <div className="mb-3 flex shrink-0 items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-sm ${
            isRecovery
              ? 'border-red-200 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400'
              : isWork
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400'
                : 'border-neutral-200 bg-white text-blue-600 dark:border-blue-500 dark:bg-neutral-900 dark:text-blue-400'
          } `}
        >
          <span className="text-base">{item.icon}</span>
        </div>
        <div className="h-px flex-grow bg-neutral-200 dark:bg-white/10" />
        <span className="font-mono text-[10px] font-medium uppercase tracking-wide text-neutral-500">
          {item.period}
        </span>
      </div>

      {/* Card Content */}
      <div
        className={`flex flex-grow flex-col rounded-xl border p-4 shadow-sm backdrop-blur-sm transition-all duration-300 ${
          isRecovery
            ? 'border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-neutral-900/50'
            : isWork
              ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-300 dark:border-emerald-500/30 dark:bg-neutral-900/50 dark:hover:border-emerald-500/40'
              : 'border-neutral-200 bg-white hover:border-blue-300 dark:border-white/10 dark:bg-neutral-900/50 dark:hover:border-blue-500/30'
        } `}
      >
        <div className="mb-2">
          <h3 className="mb-1 text-lg font-bold leading-tight text-neutral-900 dark:text-white">
            {item.title}
          </h3>
          <h4
            className={`text-xs font-medium ${
              isRecovery
                ? 'text-red-700 dark:text-red-400'
                : isWork
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-blue-700 dark:text-blue-300'
            }`}
          >
            {item.subtitle}
          </h4>
        </div>

        <p className="mb-4 text-xs leading-snug text-neutral-600 dark:text-neutral-400">
          {item.description}
        </p>

        {/* Stats Grid */}
        {(item.stats || item.tags) && (
          <div className="mt-auto flex flex-wrap gap-1.5">
            {item.stats?.map(stat => (
              <span
                key={stat.label}
                className="rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-700 dark:border-white/5 dark:bg-white/5 dark:text-white"
              >
                <span className="mr-1 font-normal text-neutral-500">
                  {stat.label}:
                </span>
                {stat.value}
              </span>
            ))}
            {item.tags?.map(tag => (
              <span
                key={tag}
                className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] text-neutral-600 dark:border-white/5 dark:bg-black/40 dark:text-neutral-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Detailed Description Toggle */}
        {item.detailedDescription && (
          <div className="mt-5 border-t border-red-200 pt-3 dark:border-red-500/20">
            <button
              onClick={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
              className="w-full text-left"
            >
              <div className="mb-2 flex items-center justify-between text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                {expandedId === item.id ? 'Close Story' : `Read My Story`}
                <ChevronRight
                  className={`h-4 w-4 transform transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`}
                />
              </div>
              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm leading-relaxed text-neutral-700 dark:border-transparent dark:bg-black/20 dark:text-neutral-300">
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

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-16 transition-colors duration-300 dark:bg-neutral-950 md:py-20">
      {/* Background decoration */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-white/10" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent dark:via-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-8 flex flex-col justify-between md:mb-12 md:flex-row md:items-end">
          <div>
            <h2 className="mb-3 text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
              The{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-500">
                Journey
              </span>
            </h2>
            <p className="max-w-xl text-base text-neutral-600 dark:text-neutral-400 md:text-lg">
              A path defined by curiosity, resilience, and academic excellence.
              <span className="ml-2 hidden text-sm opacity-60 md:inline-block">
                (Scroll to explore)
              </span>
            </p>
          </div>

          {/* Navigation Buttons for Desktop */}
          <div className="mt-6 hidden gap-3 md:mt-0 md:flex">
            <button
              onClick={() => scroll('left')}
              className="rounded-full border border-neutral-200 bg-white p-2.5 text-neutral-600 shadow-sm transition-colors hover:bg-neutral-100 dark:border-white/5 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="rounded-full border border-neutral-200 bg-white p-2.5 text-neutral-600 shadow-sm transition-colors hover:bg-neutral-100 dark:border-white/5 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile View: Vertical Stack */}
        <div className="relative ml-2 space-y-8 border-l border-neutral-200 pl-4 dark:border-white/10 md:hidden">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Dot on line */}
              <div className="absolute -left-[21px] top-6 h-3 w-3 rounded-full bg-neutral-900 ring-4 ring-neutral-50 dark:bg-white dark:ring-neutral-950" />
              <TimelineCard
                item={item}
                isRecovery={item.type === 'recovery'}
                isWork={item.type === 'work'}
              />
            </motion.div>
          ))}
        </div>

        {/* Desktop View: Horizontal Scroll */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide hidden snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden pb-4 md:flex"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Spacer for start */}
          <div className="w-1 shrink-0" />

          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              className="w-[320px] shrink-0 snap-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Connection Line Top */}
              <div className="absolute -left-3 top-5 h-px w-8 bg-neutral-200 dark:bg-white/10" />
              <TimelineCard
                item={item}
                isRecovery={item.type === 'recovery'}
                isWork={item.type === 'work'}
              />
            </motion.div>
          ))}

          {/* Spacer for end */}
          <div className="w-1 shrink-0" />
        </div>
      </div>
    </section>
  )
}
