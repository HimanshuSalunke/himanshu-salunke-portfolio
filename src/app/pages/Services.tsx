import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ServicesHero } from '../../components/services/ServicesHero'
import { TechMarquee } from '../../components/services/TechMarquee'
import { ServiceShowcase } from '../../components/services/ServiceShowcase'
import { WhatICanBuild } from '../../components/services/WhatICanBuild'
import { PricingSection } from '../../components/services/PricingSection'
import { HowItWorks } from '../../components/services/HowItWorks'
import { ServiceInquiryForm } from '../../components/services/ServiceInquiryForm'
import { PaymentInfo } from '../../components/services/PaymentInfo'

const Services: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Services - Professional AI/ML & Data Science</title>
        <meta name="description" content="Professional AI/ML and Data Science services. Complete code, documentation, and deployment support. Industry-standard pricing starting from ₹15k." />
        <meta property="og:title" content="Services - Professional AI/ML & Data Science" />
        <meta property="og:description" content="Professional AI/ML and Data Science services. Complete code, documentation, and deployment support." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <ServicesHero />

        {/* Tech Stack Marquee */}
        <TechMarquee />

        {/* Visual Showcase (3D Icons) */}
        <ServiceShowcase />

        {/* What I Can Build */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhatICanBuild />
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingSection />
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HowItWorks />
          </div>
        </section>

        {/* Payment Info */}
        <section className="py-20 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm border-y border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <PaymentInfo />
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                Tell Me About Your Project
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Fill out the form below and I'll get back to you within 24 hours with a quote and timeline.
              </p>
            </motion.div>
            <ServiceInquiryForm />
          </div>
        </section>
      </div>
    </>
  )
}

export default Services

