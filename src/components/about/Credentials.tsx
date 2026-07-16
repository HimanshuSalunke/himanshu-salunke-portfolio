import React from 'react'
import { motion } from 'framer-motion'

// Custom Official Brand Icons with Complete Styling
const DataCampIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 512 512" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="DataCamp" 
    role="img"
  >
    <rect width="512" height="512" rx="15%" fill="#05192d"/>
    <path fill="#03EF62" d="m273.2 378.4v-95.3l150.4-85.8-36.6-20.9-113.8 64.9v-95.7c0-6.4-3.5-12.5-9.1-15.7L127.2 51.3a26.1 26.1 90 00-26.5.8A26.1 26.1 90 0088.4 74.4v268.9c0 9.1 4.6 17.5 12.3 22.3a26 26 90 0026.5.8l109.7-62.6V389c0 6.5 3.6 12.6 9.2 15.8l140.7 80.1 36.6-21-150.2-85.5zm-36.3-222.2V262l-112.2 64V91.8l112.2 64.4z"/>
  </svg>
)

const GoogleIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

interface Credential {
  id: string
  title: string
  issuer: string
  date: string
  type: 'certification' | 'award' | 'publication'
  description: string
  url?: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
}

const credentialsData: Credential[] = [
  // Certifications
  {
    id: 'datacamp-analyst',
    title: 'DataCamp Certified: Associate Data Analyst',
    issuer: 'DataCamp',
    date: 'May 2024',
    type: 'certification',
    description: 'Professional certification demonstrating expertise in data analysis, statistical modeling, and data visualization.',
    url: 'https://drive.google.com/file/d/1sRj_7Guc-tVBmw_bNZnBh6EcVmZUj1es/view',
    icon: DataCampIcon,
    color: 'text-[#05192D] dark:text-[#05192D]'
  },
  {
    id: 'datacamp-engineer',
    title: 'DataCamp Certified: Associate Data Engineer',
    issuer: 'DataCamp',
    date: 'May 2024',
    type: 'certification',
    description: 'Certification in data engineering, ETL processes, and data pipeline development.',
    url: 'https://drive.google.com/file/d/1JseSVzsLL9maBkDioIufZIjpuhb07bSX/view',
    icon: DataCampIcon,
    color: 'text-[#05192D] dark:text-[#05192D]'
  },
  {
    id: 'google-bi',
    title: 'Google Business Intelligence Certification',
    issuer: 'Google',
    date: 'April 2024',
    type: 'certification',
    description: 'Certification in business intelligence, data visualization, and analytics on Google Cloud Platform.',
    url: 'https://drive.google.com/file/d/1CSfaO1kV1XpbChKfmWojA44Ge3xgVRvM/view',
    icon: GoogleIcon,
    color: 'text-[#4285F4] dark:text-[#4285F4]'
  },
  {
    id: 'google-analytics',
    title: 'Google Data Analytics Certification',
    issuer: 'Google',
    date: 'February 2024',
    type: 'certification',
    description: 'Professional certification in data analytics, statistical analysis, and data-driven decision making.',
    url: 'https://drive.google.com/file/d/1lrOPW3huOrYh1s5oakKSYOCJZHOKMq93/view',
    icon: GoogleIcon,
    color: 'text-[#4285F4] dark:text-[#4285F4]'
  },
  {
    id: 'datacamp-scientist',
    title: 'Data Scientist Professional Certificate',
    issuer: 'DataCamp',
    date: 'October 2023',
    type: 'certification',
    description: 'Comprehensive certification covering machine learning, statistical analysis, and data science methodologies.',
    url: 'https://drive.google.com/file/d/1CQIOT7vUbOoVcX7dwVmBBZNH9FOPiKrm/view',
    icon: DataCampIcon,
    color: 'text-[#05192D] dark:text-[#05192D]'
  }
  
  // Note: Hackathon achievements have been moved to the Achievements section
]

const typeColors = {
  certification: 'from-blue-500 to-blue-600',
  award: 'from-yellow-500 to-yellow-600',
  publication: 'from-green-500 to-green-600'
}

const typeLabels = {
  certification: 'Certification',
  award: 'Award',
  publication: 'Publication'
}

export const Credentials: React.FC = () => {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">
        Credentials & Certifications
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {credentialsData.map((credential, index) => (
          <motion.div
            key={credential.id}
            className="group relative bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-2xl hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-500 overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Icon Container */}
            <div className="relative z-10 flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 group-hover:from-primary-100 group-hover:to-primary-200 dark:group-hover:from-primary-800 dark:group-hover:to-primary-900 transition-all duration-500 flex items-center justify-center shadow-md group-hover:shadow-lg">
                  <credential.icon size={24} className={`${credential.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
              </div>
              
              {/* Type Badge */}
              <div className="flex-1 flex justify-end">
                <span className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r ${typeColors[credential.type]} text-white shadow-sm`}>
                  {typeLabels[credential.type]}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 space-y-3">
              {/* Title */}
              <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-tight group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors duration-300">
                {credential.title}
              </h3>
              
              {/* Issuer */}
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                <p className="text-sm font-semibold text-primary-600 dark:text-primary-500">
                  {credential.issuer}
                </p>
              </div>
              
              {/* Date */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                  {credential.date}
                </p>
              </div>
              
              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {credential.description}
              </p>
              
              {/* Certificate Link */}
              {credential.url && (
                <motion.a
                  href={credential.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 transition-colors duration-300 group/link"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Verify Credential</span>
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </motion.a>
              )}
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary-100/30 to-transparent dark:from-primary-800/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
