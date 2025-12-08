import React from 'react'
import { motion } from 'framer-motion'

const PersonalInterests: React.FC = () => {
  const interests = [
    {
      category: "Technology",
      icon: "💻",
      items: [
        { name: "Open Source Projects", description: "Contributing to and maintaining open source repositories" },
        { name: "Tech Blogs & Podcasts", description: "Staying updated with latest trends and innovations" },
        { name: "Coding Challenges", description: "Solving problems on various coding platforms" }
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      category: "Learning",
      icon: "📚",
      items: [
        { name: "Online Courses", description: "Taking courses on Coursera, DataCamp, and Scaler" },
        { name: "Research Papers", description: "Reading latest AI/ML research and academic papers on \"Towards Data Science\"" },
        { name: "Documentation", description: "Writing and maintaining technical documentation" }
      ],
      color: "from-green-500 to-green-600"
    },
    {
      category: "Creative",
      icon: "🎨",
      items: [
        { name: "UI/UX Design", description: "Creating beautiful and intuitive user interfaces" },
        { name: "Data Visualization", description: "Turning complex data into compelling visual stories" },
        { name: "Writing", description: "Sharing knowledge through technical articles and blogs" }
      ],
      color: "from-purple-500 to-purple-600"
    }
  ]

  const funFacts = [
    "I once coded for 12 hours straight during a hackathon",
    "I'm learning to play the guitar in my free time",
    "I have a collection of vintage computer magazines",
    "I can speak 3 languages fluently"
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
            Beyond Code
          </span>
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          There's more to me than just programming. Here's what I'm passionate about outside of technology.
        </p>
      </div>

      {/* Interests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {interests.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            className="group relative bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">{category.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {category.category}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + categoryIndex * 0.1 + itemIndex * 0.05 }}
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>


    </motion.section>
  )
}

export default PersonalInterests
