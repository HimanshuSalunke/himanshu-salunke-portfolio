import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Hero } from '../../components/home/Hero'
import { CurrentFocus } from '../../components/home/CurrentFocus'
import { NavigationCards } from '../../components/home/NavigationCards'
import { StatsSection } from '../../components/home/StatsSection'

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Himanshu's Portfolio - Aspiring Data Scientist</title>
        <meta name="description" content="Portfolio of Himanshu, an Aspiring Data Scientist specializing in React, TypeScript, Python, and cutting-edge AI technologies. Explore my projects, articles, and get in touch." />
        <meta property="og:title" content="Himanshu's Portfolio - Aspiring Data Scientist" />
        <meta property="og:description" content="Portfolio of Himanshu, an Aspiring Data Scientist specializing in React, TypeScript, Python, and cutting-edge AI technologies." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Himanshu's Portfolio - Aspiring Data Scientist" />
        <meta name="twitter:description" content="Portfolio of Himanshu, an Aspiring Data Scientist specializing in React, TypeScript, Python, and cutting-edge AI technologies." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Himanshu",
            "jobTitle": "Aspiring Data Scientist",
            "description": "Aspiring Data Scientist specializing in React, TypeScript, Python, and cutting-edge AI technologies",
            "url": "https://himanshu-portfolio.com",
            "sameAs": [
              "https://github.com/himanshu",
              "https://linkedin.com/in/himanshu",
              "https://twitter.com/himanshu"
            ],
            "knowsAbout": [
              "React",
              "TypeScript",
              "Python",
              "Machine Learning",
              "Artificial Intelligence",
              "Web Development",
              "Full-Stack Development"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <Hero />
        
        {/* Current Focus Section */}
        <section className="py-16 bg-white dark:bg-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-neutral-900 dark:text-white mb-8 sm:mb-12">
                What I'm Working On
              </h2>
            </motion.div>
            <CurrentFocus />
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-neutral-100 dark:bg-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StatsSection />
          </div>
        </section>
        
        {/* Navigation Cards Section */}
        <section className="py-16 bg-white dark:bg-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
                Explore My World
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Choose your path and discover what interests you most about my work and journey.
              </p>
            </motion.div>
            
            {/* Navigation Cards */}
            <NavigationCards />
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
