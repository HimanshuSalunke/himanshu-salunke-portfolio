import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ServicesHero } from '../../components/services/ServicesHero'
import { WhatICanBuild } from '../../components/services/WhatICanBuild'
import { HowItWorks } from '../../components/services/HowItWorks'
import { ServicePricing } from '../../components/services/ServicePricing'
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

        {/* What I Can Build */}
        <WhatICanBuild />

        {/* How It Works */}
        <HowItWorks />

        {/* Pricing Tiers */}
        <ServicePricing />

        {/* Payment Info */}
        <PaymentInfo />

        {/* Inquiry Form */}
        <section className="bg-neutral-50 dark:bg-neutral-950 transition-colors">
          <ServiceInquiryForm />
        </section>
      </div>
    </>
  )
}

export default Services

