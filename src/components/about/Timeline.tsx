import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface TimelineItem {
  id: string
  title: string
  company: string
  period: string
  description: string
  detailedDescription?: string
  type: 'work' | 'education'
  current?: boolean
  cgpa?: string
  achievements?: string[]
  subjects?: string[]
  location?: string
  duration?: string
}

const timelineData: TimelineItem[] = [
  // Work Experience (Most Recent First)
  // Note: Hackathon achievements have been moved to the Achievements section

  // Education (Most Recent First)
  {
    id: 'btech-degree',
    title: 'Bachelor of Technology in Data Science',
    company: 'R. C. Patel Institute of Technology, Shirpur - An Autonomous Institute',
    period: 'Dec 2021 – June 2024',
    description: 'Specialized in Data Science with comprehensive focus on Machine Learning, Statistics, and Data Analysis. Developed expertise in modern AI technologies and data-driven solutions.',
    type: 'education',
    current: false,
    cgpa: '7.39',
    location: 'Shirpur, Maharashtra',
    duration: '3 Years',
    achievements: [
      'Completed major projects in Computer Vision and NLP',
      'Active participant in technical workshops and seminars',
      'Contributed to multiple data science research initiatives'
    ],
    subjects: [
      'Machine Learning', 'Statistics', 'Data Analysis',
      'Python Programming', 'Database Management', 'Big Data Analytics'
    ]
  },
  {
    id: 'diploma-degree',
    title: 'Diploma in Computer Science and Engineering',
    company: 'R. C. Patel Polytechnic, Shirpur',
    period: 'Aug 2017 – May 2021',
    description: 'Comprehensive foundation in computer science fundamentals, programming languages, and software development methodologies. Strong emphasis on practical applications and hands-on learning.',
    type: 'education',
    cgpa: '9.4',
    location: 'Shirpur, Maharashtra',
    duration: '3 Years',
    achievements: [
      'Outstanding academic performance with 9.4 CGPA',
      'Completed multiple software development projects',
      'Active in technical competitions and coding events'
    ],
    subjects: [
      'Programming Fundamentals', 'Data Structures', 'Database Systems',
      'Software Engineering', 'Computer Networks', 'Web Development'
    ]
  },
  {
    id: 'ssc-degree',
    title: 'Secondary School Certificate (SSC)',
    company: 'K. S. K. New City High School, Dhule',
    period: 'March 2016 – March 2017',
    description: 'Completed secondary school education with strong foundation in science and mathematics. Developed analytical thinking and problem-solving skills.',
    type: 'education',
    cgpa: '50.00%',
    location: 'Dhule, Maharashtra',
    duration: '1 Year',
    achievements: [
      'Completed secondary education with focus on science stream',
      'Developed strong mathematical and analytical skills'
    ],
    subjects: [
      'Mathematics', 'Science', 'English', 'Social Studies'
    ]
  },
  {
    id: 'career-gap-recovery',
    title: 'Medical Recovery & Academic Resilience Journey',
    company: 'Personal Development & Recovery',
    period: 'Dec 2015 – 2021',
    description: 'During my academic journey, I faced a significant medical challenge that required extensive recovery and rehabilitation. This period involved multiple surgical procedures and an extended recovery timeline that impacted my educational progression. Despite these challenges, I maintained my commitment to academic excellence and personal development, demonstrating resilience and determination throughout the recovery process.',
    detailedDescription: 'In December 2015, I sustained a severe fracture in my left leg that broke completely from the main upper joint. This required immediate surgery with screws fitted to support the bone. I was in 9th standard at the time and had to rest for 2 years to heal. This significantly impacted my 10th standard performance (50% marks) as I couldn\'t attend school regularly. Even after the initial 2-year recovery period, I couldn\'t walk properly for several more years, and it took a total of 6 years for me to fully recover and regain normal mobility.',
    type: 'education',
    duration: '6 Years',
    subjects: [
      'Personal Growth', 'Resilience', 'Adaptability', 'Determination'
    ]
  }
]

const DetailDropdown: React.FC<{ detailedDescription: string; itemId: string }> = ({
  detailedDescription,
  itemId
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-200 flex items-center gap-1"
      >
        {isOpen ? 'Hide Details' : 'Read in Detail'}
        <motion.svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="mt-2 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600">
          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {detailedDescription}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export const Timeline: React.FC = () => {
  const workExperience = timelineData.filter(item => item.type === 'work')
  const education = timelineData.filter(item => item.type === 'education')

  const TimelineSection = ({
    title,
    items,
    color,
    icon
  }: {
    title: string
    items: TimelineItem[]
    color: string
    icon: string
  }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        {title}
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className={`absolute left-2 sm:left-3 md:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b ${color}`} />

        <div className="space-y-4 sm:space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative flex items-start gap-2 sm:gap-3 md:gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-2 sm:border-3 md:border-4 border-white dark:border-neutral-900 ${item.current
                  ? 'bg-blue-500'
                  : item.type === 'work'
                    ? 'bg-blue-500'
                    : 'bg-emerald-500'
                  }`} />
                {item.current && (
                  <motion.div
                    className="absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-blue-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <motion.div
                  className="bg-white dark:bg-neutral-800 rounded-lg p-3 sm:p-4 shadow-md border border-neutral-200 dark:border-neutral-700"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-primary-600 dark:text-primary-500 font-medium">
                        {item.company}
                      </p>
                      {item.location && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          📍 {item.location}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 sm:text-right">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-200 whitespace-nowrap">
                        {item.period}
                      </span>
                      {item.current && (
                        <span className="block mt-1 text-xs text-primary-600 dark:text-primary-500 font-medium">
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {item.description}
                    </p>
                    {item.detailedDescription && (
                      <DetailDropdown
                        detailedDescription={item.detailedDescription}
                        itemId={item.id}
                      />
                    )}
                  </div>

                  {/* Education-specific information */}
                  {item.type === 'education' && (
                    <div className="space-y-3">
                      {/* CGPA and Duration */}
                      <div className="flex flex-wrap gap-3">
                        {item.cgpa && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">CGPA:</span>
                            <span className="px-2 py-1 text-xs font-bold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                              {item.cgpa}
                            </span>
                          </div>
                        )}
                        {item.duration && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Duration:</span>
                            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                              {item.duration}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Achievements */}
                      {item.achievements && item.achievements.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-0.5">
                            {item.achievements.slice(0, 2).map((achievement, idx) => (
                              <li key={idx} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-1">
                                <span className="text-green-500 mt-0.5">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="mt-3">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${item.type === 'work'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                      {item.type === 'work' ? '💼 Work Experience' : '🎓 Education'}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Timeline Ending Dot */}
          <div className="relative flex items-start gap-3 sm:gap-6">
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-4 border-white dark:border-neutral-900 ${color.includes('primary') ? 'bg-primary-500' :
                color.includes('emerald') ? 'bg-emerald-500' :
                  color.includes('blue') ? 'bg-blue-500' : 'bg-secondary-500'
                }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-4" /> {/* Spacer for visual balance */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">
        Experience & Education
      </h2>

      <div className="space-y-12">
        <TimelineSection
          title="Work Experience"
          items={workExperience}
          color="from-blue-500 to-blue-600"
          icon="💼"
        />

        <TimelineSection
          title="Education"
          items={education}
          color="from-emerald-500 to-emerald-600"
          icon="🎓"
        />
      </div>
    </motion.section>
  )
}
