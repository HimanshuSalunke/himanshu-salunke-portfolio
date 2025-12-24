import React from 'react'
import { Helmet } from 'react-helmet-async'
import { CinematicHero } from '../../components/home/redesign/CinematicHero'
import { ImpactMetrics } from '../../components/home/redesign/ImpactMetrics'
import { CinematicFocus } from '../../components/home/redesign/CinematicFocus'
import { ExplorationGrid } from '../../components/home/redesign/ExplorationGrid'

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

      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        {/* 1. Cinematic Hero Section */}
        <CinematicHero />

        {/* 2. Impact Metrics (Integrated Stats) */}
        <ImpactMetrics />

        {/* 3. Current Focus (Active Learning) */}
        <CinematicFocus />

        {/* 4. Exploration Grid (Bento Navigation) */}
        <ExplorationGrid />
      </div>
    </>
  )
}

export default Home
