import React from 'react'
import { Helmet } from 'react-helmet-async'
import { CinematicContact } from '../../components/contact/redesign/CinematicContact'

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact - Himanshu Salunke</title>
        <meta name="description" content="Let's build something amazing together. Get in touch for project inquiries or collaboration." />
      </Helmet>

      <CinematicContact />
    </>
  )
}

export default Contact

