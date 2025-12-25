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
        <title>Himanshu Salunke | Data Scientist & AI Engineer</title>
        <meta name="description" content="Building intelligent solutions with React, Python, and Machine Learning. Explore my projects, research, and technical writing." />
        <meta property="og:title" content="Himanshu Salunke | Data Scientist & AI Engineer" />
        <meta property="og:description" content="Building intelligent solutions with React, Python, and Machine Learning. Explore my projects, research, and technical writing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://himanshu-salunke.vercel.app" />
        <meta property="og:image" content="https://himanshu-salunke.vercel.app/api/og?title=Himanshu%20Salunke&subtitle=Data%20Scientist%20%26%20AI%20Engineer&type=website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Himanshu Salunke | Data Scientist & AI Engineer" />
        <meta name="twitter:description" content="Building intelligent solutions with React, Python, and Machine Learning. Explore my projects, research, and technical writing." />
        <meta name="twitter:image" content="https://himanshu-salunke.vercel.app/api/og?title=Himanshu%20Salunke&subtitle=Data%20Scientist%20%26%20AI%20Engineer&type=website" />

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
