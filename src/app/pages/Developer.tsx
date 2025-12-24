import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { CinematicDeveloper } from '../../components/developer/redesign/CinematicDeveloper'

const Developer: React.FC = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>My Tech Stack - Himanshu Salunke</title>
        <meta name="description" content="Explore my tech stack: AI/ML tools, Web Architecture, and Developer Stats." />
      </Helmet>

      <CinematicDeveloper />
    </>
  )
}

export default Developer
