import React from 'react'
import { motion } from 'framer-motion'

const PersonalStory: React.FC = () => {
  const storySections = [
    {
      title: "The Beginning",
      icon: "🌱",
      content: "My journey into technology started with curiosity and a desire to solve problems. Growing up, I was always fascinated by how things work and loved taking apart gadgets to understand their inner workings.",
      highlight: "Curiosity-driven learning"
    },
    {
      title: "The Challenge",
      icon: "💪",
      content: "In December 2015, I faced a significant medical challenge - a severe fracture that required extensive recovery. This 6-year journey taught me resilience, patience, and the importance of never giving up on your dreams.",
      highlight: "Resilience and determination"
    },
    {
      title: "The Comeback",
      icon: "🚀",
      content: "Despite the challenges, I maintained my commitment to education and technology. I completed my diploma with a 9.4 CGPA and pursued my B.Tech in Data Science, proving that setbacks can become setups for comebacks.",
      highlight: "Academic excellence"
    },
    {
      title: "The Passion",
      icon: "🤖",
      content: "My love for AI and Machine Learning grew as I discovered how these technologies can solve real-world problems. From computer vision projects to data engineering pipelines, every project fuels my passion for innovation.",
      highlight: "AI/ML innovation"
    },
    {
      title: "The Future",
      icon: "🌟",
      content: "Today, I'm preparing for GATE 2027 while building innovative projects and contributing to the tech community. My goal is to become a leading data scientist who creates solutions that make a positive impact on society.",
      highlight: "Making a difference"
    }
  ]

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            My Story
          </span>
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Every journey has its challenges, but it's how we overcome them that defines who we become. 
          Here's my story of resilience, growth, and passion for technology.
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-2 sm:left-3 md:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-primary-500" />
        
        <div className="space-y-4 sm:space-y-6">
          {storySections.map((section, index) => (
            <motion.div
              key={index}
              className="relative flex items-start gap-3 sm:gap-4 md:gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-primary-500 border-2 sm:border-3 md:border-4 border-white dark:border-neutral-900 shadow-lg"></div>
                <div className="absolute inset-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-primary-500 animate-ping opacity-20"></div>
              </div>
            
              {/* Content */}
              <motion.div
                className="flex-1 bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="text-xl sm:text-2xl">{section.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3 sm:mb-4">
                  {section.content}
                </p>
                
                <div className="inline-block px-2 sm:px-3 py-1 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm font-semibold rounded-full border border-neutral-200 dark:border-neutral-600">
                  {section.highlight}
                </div>
              </motion.div>
            </motion.div>
          ))}
          
          {/* Timeline Ending Dot */}
          <div className="relative flex items-start gap-3 sm:gap-4 md:gap-6">
            <div className="relative z-10 flex-shrink-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 sm:border-3 md:border-4 border-white dark:border-neutral-900 bg-primary-500" />
            </div>
          </div>
        </div>
      </div>

    </motion.section>
  )
}

export default PersonalStory