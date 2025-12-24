import React from 'react'
import { Helmet } from 'react-helmet-async'
import { CinematicAbout } from '../../components/about/redesign/CinematicAbout'

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About - Himanshu Salunke</title>
        <meta name="description" content="Aspiring Data Scientist & ML Engineer. Discover my journey, skills, and projects." />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Himanshu",
            "jobTitle": "Aspiring Data Scientist",
            "description": "Aspiring Data Scientist passionate about creating intelligent solutions",
            "url": "https://portfolio.example.com/about",
            "knowsAbout": ["React", "TypeScript", "Python", "Machine Learning", "AI", "Web Development"]
          })}
        </script>
      </Helmet>

      <CinematicAbout />
    </>
  )
}

export default About
