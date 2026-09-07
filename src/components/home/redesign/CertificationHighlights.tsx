import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import { SiAmazon } from 'react-icons/si'
import {
  MobileNeuralSpine,
  NeuralLayerCard,
  NeuralMeshBackground,
  neuralChipClass,
  neuralHeadingClass,
  SectionEdgeAccents,
  SectionGridOverlay,
} from './neural/NeuralPrimitives'

const MicrosoftIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width={24} height={24} viewBox="0 0 23 23" className={className} aria-hidden>
    <path fill="#F25022" d="M1 1h10v10H1z" />
    <path fill="#7FBA00" d="M12 1h10v10H12z" />
    <path fill="#00A4EF" d="M1 12h10v10H1z" />
    <path fill="#FFB900" d="M12 12h10v10H12z" />
  </svg>
)

interface HighlightCert {
  id: string
  title: string
  issuer: string
  date: string
  url: string
  icon: React.ReactNode
  borderAccent: string
  badgeClass: string
}

const issuerBadgeClass = (variant: 'aws' | 'microsoft') =>
  variant === 'aws'
    ? 'border border-orange-500/35 bg-orange-500/15 text-orange-900 dark:border-orange-400/40 dark:bg-orange-500/20 dark:text-orange-100'
    : 'border border-sky-500/35 bg-sky-500/15 text-sky-900 dark:border-sky-400/40 dark:bg-sky-500/20 dark:text-sky-100'

const highlights2026: HighlightCert[] = [
  {
    id: 'aws-ai-practitioner',
    title: 'AWS Certified AI Practitioner',
    issuer: 'AWS',
    date: 'September 2026',
    url: 'https://drive.google.com/file/d/1UIknQmpWVpelMZ_IQU84MDIbGpln1WRO/view?usp=sharing',
    icon: <SiAmazon className="h-6 w-6 text-orange-500" />,
    borderAccent: 'border-orange-500/25 shadow-md shadow-orange-500/5',
    badgeClass: issuerBadgeClass('aws'),
  },
  {
    id: 'microsoft-dp700',
    title: 'Microsoft Certified: Fabric Data Engineer Associate (DP-700)',
    issuer: 'Microsoft',
    date: 'July 2026',
    url: 'https://drive.google.com/file/d/1whcpSSwO1_RPhKAWxo-eiWWw66uFIO4-/view?usp=sharing',
    icon: <MicrosoftIcon />,
    borderAccent: 'border-sky-500/25 shadow-md shadow-sky-500/5',
    badgeClass: issuerBadgeClass('microsoft'),
  },
]

interface CertCardProps {
  cert: HighlightCert
  index: number
}

const CertCard: React.FC<CertCardProps> = ({ cert, index }) => (
  <NeuralLayerCard
    layer=""
    icon={cert.icon}
    accent={cert.borderAccent}
    delay={0.12 + index * 0.08}
    showLayer={false}
    className="min-h-[168px]"
  >
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col"
    >
      <div className="mb-4 flex min-h-12 items-start justify-between gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-700/50 dark:bg-neutral-900">
          {cert.icon}
        </div>
        <span
          className={`shrink-0 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${cert.badgeClass}`}
        >
          {cert.issuer}
        </span>
      </div>
      <h3 className="mb-2 break-words text-base font-bold text-neutral-900 transition-colors group-hover:text-cyan-700 dark:text-white dark:group-hover:text-cyan-300 sm:text-lg">
        {cert.title}
      </h3>
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {cert.date}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 transition-colors group-hover:text-cyan-700 dark:text-cyan-400 dark:group-hover:text-cyan-300">
        Verify Credential
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  </NeuralLayerCard>
)

export const CertificationHighlights: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      aria-label="2026 certifications"
      className="relative overflow-x-hidden border-y border-cyan-500/10 bg-neutral-50 dark:bg-[#030014]"
    >
      <NeuralMeshBackground idPrefix="certs-mesh" />
      <SectionEdgeAccents showIcons={false} />
      <SectionGridOverlay />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative z-10 mb-10 text-center sm:mb-12"
        >
          <span
            className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs ${neuralChipClass} text-cyan-800 dark:text-cyan-300`}
          >
            <Award className="h-3.5 w-3.5 text-cyan-500" />
            2026 Certifications
          </span>
          <h2 className={neuralHeadingClass}>
            New{' '}
            <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Credentials
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
            Verified cloud and data engineering certifications earned this year.
          </p>
        </motion.div>

        <div className="relative">
          <MobileNeuralSpine idPrefix="certs" />

          <div className="relative z-10 grid grid-cols-1 gap-3 pl-1 sm:grid-cols-2 sm:gap-4 sm:pl-0 lg:gap-6">
            {highlights2026.map((cert, index) => (
              <CertCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
