import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ContactForm } from '../../components/contact/ContactForm'

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact - Portfolio</title>
        <meta name="description" content="Get in touch with me for project inquiries or collaboration opportunities." />
        <meta property="og:title" content="Contact - Portfolio" />
        <meta property="og:description" content="Get in touch with me for project inquiries or collaboration opportunities." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  background: 'linear-gradient(90deg, hsla(212, 93%, 49%, 1) 0%, hsla(210, 100%, 30%, 1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  MozBackgroundClip: 'text',
                  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#0974F1", endColorstr="#003A7A", GradientType=1)'
                }}
              >
                Let's Collaborate
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-0">
              Get in touch with me for general inquiries, collaboration opportunities, or just to say hello. 
              I'm always excited to connect with fellow developers and tech enthusiasts!
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Contact
