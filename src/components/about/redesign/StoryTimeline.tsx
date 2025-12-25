import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'

// Merged Data from Timeline.tsx and PersonalStory.tsx
interface TimelineItem {
    id: string
    title: string
    subtitle: string // Company/School/Context
    period: string
    description: string
    detailedDescription?: string
    type: 'education' | 'story' | 'recovery'
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
        description: 'My journey started with curiosity. I was always fascinated by how things work and loved taking apart gadgets to understand their inner workings.',
        type: 'story',
        icon: <nav className="text-xl">🌱</nav>,
        tags: ['Curiosity', 'Gadgets']
    },
    {
        id: 'ssc',
        title: 'Secondary School (SSC)',
        subtitle: 'K. S. K. New City High School, Dhule',
        period: 'March 2016 – March 2017',
        description: 'Completed secondary school education with strong foundation in science and mathematics despite health challenges.',
        type: 'education',
        icon: <BookOpen className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
        stats: [
            { label: 'Percentage', value: '50.00%' }
        ],
        tags: ['Mathematics', 'Science']
    },
    {
        id: 'medical-recovery',
        title: 'The Resilience Journey',
        subtitle: 'Medical Recovery & Rehabilitation',
        period: 'Dec 2015 – 2021',
        description: 'Faced a significant medical challenge with a severe leg fracture requiring multiple surgeries and years of recovery. This journey taught me resilience, patience, and determination.',
        detailedDescription: 'In December 2015, I sustained a severe fracture in my left leg that broke completely from the main upper joint. This required immediate surgery with screws fitted to support the bone. I was in 9th standard at the time and had to rest for 2 years to heal. This significantly impacted my 10th standard performance as I couldn\'t attend school regularly. Even after the initial 2-year recovery period, I couldn\'t walk properly for several more years, and it took a total of 6 years for me to fully recover.',
        type: 'recovery',
        icon: <Activity className="w-5 h-5 text-red-600 dark:text-red-500" />,
        stats: [
            { label: 'Recovery', value: '6 Years' }
        ],
        tags: ['Resilience', 'Determination', 'Growth']
    },
    {
        id: 'diploma-degree',
        title: 'Diploma in CSE',
        subtitle: 'R. C. Patel Polytechnic, Shirpur',
        period: 'Aug 2017 – May 2021',
        description: 'Comprehensive foundation in computer science fundamentals. Strong emphasis on practical applications and hands-on learning.',
        type: 'education',
        icon: <nav className="text-xl">📜</nav>,
        stats: [
            { label: 'CGPA', value: '9.4' },
            { label: 'Duration', value: '4 Years' }
        ],
        tags: ['Software Engineering', 'Web Dev']
    },
    {
        id: 'btech-degree',
        title: 'B.Tech in Data Science',
        subtitle: 'R. C. Patel Institute of Technology, Shirpur - An Autonomous Institute',
        period: 'Dec 2021 – June 2024',
        description: 'Specialized in Data Science with comprehensive focus on Machine Learning, Statistics, and Data Analysis.',
        type: 'education',
        icon: <nav className="text-xl">🎓</nav>,
        stats: [
            { label: 'CGPA', value: '7.39' },
            { label: 'Duration', value: '3 Years' }
        ],
        tags: ['Computer Vision', 'NLP', 'Research']
    },
    {
        id: 'the-future',
        title: 'The Future & Vision',
        subtitle: 'Aspiring Data Scientist',
        period: 'Present',
        description: "Preparing for GATE 2026 while building innovative AI projects. My goal is to become a leading data scientist who creates solutions that make a positive impact on society.",
        type: 'story',
        icon: <nav className="text-xl">🌟</nav>,
        tags: ['GATE 2026', 'Innovation', 'Impact']
    }
]

export const StoryTimeline: React.FC = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400
            scrollContainerRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    // Shared Card Component
    const TimelineCard = ({ item, isRecovery }: { item: TimelineItem, isRecovery: boolean }) => (
        <div className="relative h-full flex flex-col">
            {/* Number/Icon Indicator */}
            <div className="flex items-center gap-3 mb-3 shrink-0">
                <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-sm
                    ${isRecovery
                        ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400'
                        : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-blue-500 text-blue-600 dark:text-blue-400'
                    }
                `}>
                    <span className="text-base">{item.icon}</span>
                </div>
                <div className="h-px flex-grow bg-neutral-200 dark:bg-white/10" />
                <span className="text-[10px] font-mono text-neutral-500 font-medium uppercase tracking-wide">{item.period}</span>
            </div>

            {/* Card Content */}
            <div className={`
                flex-grow flex flex-col p-4 rounded-xl border transition-all duration-300 backdrop-blur-sm shadow-sm
                ${isRecovery
                    ? 'bg-red-50 dark:bg-neutral-900/50 border-red-200 dark:border-red-500/30'
                    : 'bg-white dark:bg-neutral-900/50 border-neutral-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/30'
                }
            `}>
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight mb-1">{item.title}</h3>
                    <h4 className={`font-medium text-xs ${isRecovery ? 'text-red-700 dark:text-red-400' : 'text-blue-700 dark:text-blue-300'}`}>
                        {item.subtitle}
                    </h4>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 leading-snug mb-4 text-xs">
                    {item.description}
                </p>

                {/* Stats Grid */}
                {(item.stats || item.tags) && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {item.stats?.map(stat => (
                            <span key={stat.label} className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/5 text-[10px] text-neutral-700 dark:text-white border border-neutral-200 dark:border-white/5 font-medium">
                                <span className="text-neutral-500 mr-1 font-normal">{stat.label}:</span>
                                {stat.value}
                            </span>
                        ))}
                        {item.tags?.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded bg-neutral-50 dark:bg-black/40 text-[10px] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-white/5">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Detailed Description Toggle */}
                {item.detailedDescription && (
                    <div className="mt-5 pt-3 border-t border-red-200 dark:border-red-500/20">
                        <button
                            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                            className="w-full text-left"
                        >
                            <div className="flex items-center justify-between text-red-600 dark:text-red-400 text-sm font-medium hover:text-red-700 dark:hover:text-red-300 mb-2">
                                {expandedId === item.id ? 'Close Story' : `Read My Story`}
                                <ChevronRight className={`w-4 h-4 transform transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`} />
                            </div>
                            <AnimatePresence>
                                {expandedId === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-red-50 dark:bg-black/20 p-3 rounded-xl border border-red-100 dark:border-transparent mt-2">
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
        <section className="py-16 md:py-20 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden transition-colors duration-300">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Journey</span>
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl text-base md:text-lg">
                            A path defined by curiosity, resilience, and academic excellence.
                            <span className="hidden md:inline-block text-sm opacity-60 ml-2">(Scroll to explore)</span>
                        </p>
                    </div>

                    {/* Navigation Buttons for Desktop */}
                    <div className="hidden md:flex gap-3 mt-6 md:mt-0">
                        <button onClick={() => scroll('left')} className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-neutral-600 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors shadow-sm">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => scroll('right')} className="p-2.5 rounded-full bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-neutral-600 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors shadow-sm">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile View: Vertical Stack */}
                <div className="md:hidden space-y-8 relative pl-4 border-l border-neutral-200 dark:border-white/10 ml-2">
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
                            <div className="absolute -left-[21px] top-6 w-3 h-3 rounded-full bg-neutral-900 dark:bg-white ring-4 ring-neutral-50 dark:ring-neutral-950" />
                            <TimelineCard item={item} isRecovery={item.type === 'recovery'} />
                        </motion.div>
                    ))}
                </div>

                {/* Desktop View: Horizontal Scroll */}
                <div
                    ref={scrollContainerRef}
                    className="hidden md:flex overflow-x-auto overflow-y-hidden gap-5 pb-4 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Spacer for start */}
                    <div className="w-1 shrink-0" />

                    {timelineData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="snap-center shrink-0 w-[320px]"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Connection Line Top */}
                            <div className="absolute top-5 -left-3 w-8 h-px bg-neutral-200 dark:bg-white/10" />
                            <TimelineCard item={item} isRecovery={item.type === 'recovery'} />
                        </motion.div>
                    ))}

                    {/* Spacer for end */}
                    <div className="w-1 shrink-0" />
                </div>
            </div>
        </section>
    )
}
