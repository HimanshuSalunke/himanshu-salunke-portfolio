import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Award, BookOpen, Cpu, ExternalLink } from 'lucide-react'
import { JourneySectionMarker, journeyCardClass, journeyChipClass, journeyContentClass, journeyHeadingClass, journeySectionClass } from './journey/JourneyPrimitives'

const DataCampIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect width="512" height="512" rx="15%" fill="#05192d" />
    <path
      fill="#03EF62"
      d="m273.2 378.4v-95.3l150.4-85.8-36.6-20.9-113.8 64.9v-95.7c0-6.4-3.5-12.5-9.1-15.7L127.2 51.3a26.1 26.1 90 00-26.5.8A26.1 26.1 90 0088.4 74.4v268.9c0 9.1 4.6 17.5 12.3 22.3a26 26 90 0026.5.8l109.7-62.6V389c0 6.5 3.6 12.6 9.2 15.8l140.7 80.1 36.6-21-150.2-85.5zm-36.3-222.2V262l-112.2 64V91.8l112.2 64.4z"
    />
  </svg>
)

const GoogleIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const MicrosoftIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 23 23" className={className} aria-hidden>
    <path fill="#F25022" d="M1 1h10v10H1z" />
    <path fill="#7FBA00" d="M12 1h10v10H12z" />
    <path fill="#00A4EF" d="M1 12h10v10H1z" />
    <path fill="#FFB900" d="M12 12h10v10H12z" />
  </svg>
)

type Issuer = 'DataCamp' | 'Google' | 'Microsoft'

interface Credential {
  id: string
  title: string
  issuer: Issuer
  date: string
  description: string
  url: string
  icon: React.FC<{ size?: number; className?: string }>
}

const credentialsData: Credential[] = [
  {
    id: 'microsoft-fabric-de',
    title: 'Microsoft Certified: Fabric Data Engineer Associate (DP-700)',
    issuer: 'Microsoft',
    date: 'July 2026',
    description:
      'DP-700 professional certification in Microsoft Fabric data engineering - lakehouses, pipelines, Spark, and analytics workloads.',
    url: 'https://drive.google.com/file/d/1whcpSSwO1_RPhKAWxo-eiWWw66uFIO4-/view?usp=sharing',
    icon: MicrosoftIcon,
  },
  {
    id: 'datacamp-analyst',
    title: 'DataCamp Certified: Associate Data Analyst',
    issuer: 'DataCamp',
    date: 'May 2024',
    description:
      'Professional certification demonstrating expertise in data analysis, statistical modeling, and data visualization.',
    url: 'https://drive.google.com/file/d/1sRj_7Guc-tVBmw_bNZnBh6EcVmZUj1es/view',
    icon: DataCampIcon,
  },
  {
    id: 'datacamp-engineer',
    title: 'DataCamp Certified: Associate Data Engineer',
    issuer: 'DataCamp',
    date: 'May 2024',
    description:
      'Certification in data engineering, ETL processes, and data pipeline development.',
    url: 'https://drive.google.com/file/d/1JseSVzsLL9maBkDioIufZIjpuhb07bSX/view',
    icon: DataCampIcon,
  },
  {
    id: 'google-bi',
    title: 'Google Business Intelligence Certification',
    issuer: 'Google',
    date: 'April 2024',
    description:
      'Certification in business intelligence, data visualization, and analytics on Google Cloud Platform.',
    url: 'https://drive.google.com/file/d/1CSfaO1kV1XpbChKfmWojA44Ge3xgVRvM/view',
    icon: GoogleIcon,
  },
  {
    id: 'google-analytics',
    title: 'Google Data Analytics Certification',
    issuer: 'Google',
    date: 'February 2024',
    description:
      'Professional certification in data analytics, statistical analysis, and data-driven decision making.',
    url: 'https://drive.google.com/file/d/1lrOPW3huOrYh1s5oakKSYOCJZHOKMq93/view',
    icon: GoogleIcon,
  },
  {
    id: 'datacamp-scientist',
    title: 'Data Scientist Professional Certificate',
    issuer: 'DataCamp',
    date: 'October 2023',
    description:
      'Comprehensive certification covering machine learning, statistical analysis, and data science methodologies.',
    url: 'https://drive.google.com/file/d/1CQIOT7vUbOoVcX7dwVmBBZNH9FOPiKrm/view',
    icon: DataCampIcon,
  },
]

const learningItems = [
  {
    title: '🎓 Advanced React Patterns',
    description:
      'Exploring compound components, render props, and custom hooks for better component architecture.',
  },
  {
    title: '🧠 LLM Fine-tuning & RAG',
    description:
      'Going deeper into retrieval-augmented generation, vector databases, and fine-tuning large language models for domain-specific use cases.',
  },
  {
    title: '🌐 Multimodal AI',
    description:
      'Studying vision-language models and multimodal architectures that combine computer vision with NLP beyond single-modality pipelines.',
  },
  {
    title: '⚡ Model Optimization & Inference',
    description:
      'Advancing into model quantization, ONNX/TensorRT export, and low-latency inference for production and edge deployment.',
  },
]

const techStackGroups = [
  {
    label: 'Deep Learning & NLP',
    items: [
      'PyTorch',
      'TensorFlow',
      'BERT',
      'Transformers',
      'LangChain',
      'FAISS',
      'LSTM',
      'XGBoost',
      'Prophet',
    ],
  },
  {
    label: 'Computer Vision',
    items: ['YOLO26', 'OpenCV', 'MediaPipe', 'EasyOCR', 'ONNX Runtime', 'CUDA'],
  },
  {
    label: 'Data Engineering',
    items: [
      'Microsoft Fabric',
      'OneLake',
      'Lakehouse',
      'Apache Spark',
      'Delta Lake',
      'Apache Airflow',
      'AWS Glue',
      'Amazon Athena',
      'ETL Pipelines',
      'PostgreSQL',
      'Docker',
    ],
  },
  {
    label: 'Backend & AWS Cloud',
    items: ['FastAPI', 'Node.js', 'TypeScript', 'AWS S3', 'Amazon QuickSight', 'WebSockets'],
  },
]

const issuerStyles: Record<
  Issuer,
  { border: string; hover: string; badge: string; glow: string }
> = {
  DataCamp: {
    border: 'border-emerald-500/25',
    hover: 'hover:border-emerald-500/45 hover:shadow-emerald-500/10',
    badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25',
    glow: 'from-emerald-500/10',
  },
  Google: {
    border: 'border-blue-500/25',
    hover: 'hover:border-blue-500/45 hover:shadow-blue-500/10',
    badge: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25',
    glow: 'from-blue-500/10',
  },
  Microsoft: {
    border: 'border-sky-500/25',
    hover: 'hover:border-sky-500/45 hover:shadow-sky-500/10',
    badge: 'bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500/25',
    glow: 'from-sky-500/10',
  },
}

type FilterKey = 'all' | Issuer

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'Microsoft', label: 'Microsoft' },
  { key: 'DataCamp', label: 'DataCamp' },
  { key: 'Google', label: 'Google' },
]

export const CredentialGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const prefersReducedMotion = useReducedMotion()

  const visibleCredentials =
    activeFilter === 'all'
      ? credentialsData
      : credentialsData.filter((c) => c.issuer === activeFilter)

  return (
    <section className={`relative overflow-hidden border-t border-violet-500/10 bg-transparent ${journeySectionClass}`}>
      <JourneySectionMarker accent="violet" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.1),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className={`relative z-10 mx-auto max-w-7xl ${journeyContentClass}`}>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <h2 className={`mb-3 ${journeyHeadingClass}`}>
            Credentials &{' '}
            <span className="bg-gradient-to-r from-amber-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base md:text-lg">
            Verified credentials earned along the way — plus what I&apos;m learning next.
          </p>
        </motion.div>

        {/* Certifications */}
        <div className="mb-10 sm:mb-12">
          <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 sm:h-10 sm:w-10">
                <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">Certifications</h3>
            </div>

            <div className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    activeFilter === filter.key
                      ? 'border-violet-500/50 bg-violet-500/15 text-violet-800 shadow-sm dark:text-violet-200'
                      : `${journeyChipClass} hover:border-violet-500/35`
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {visibleCredentials.map((cred, index) => {
              const styles = issuerStyles[cred.issuer]
              return (
                <motion.a
                  key={cred.id}
                  layout
                  href={cred.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                  className={`group relative flex flex-col overflow-hidden ${journeyCardClass} p-4 shadow-md transition-all duration-300 sm:p-5 ${styles.border} ${styles.hover}`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${styles.glow} to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
                  />

                  <div className="relative mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-200/80 bg-neutral-50 dark:border-neutral-700/50 dark:bg-neutral-900/50">
                      <cred.icon size={28} />
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles.badge}`}
                    >
                      {cred.issuer}
                    </span>
                  </div>

                  <h4 className="relative mb-2 break-words text-sm font-bold leading-snug text-neutral-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300 sm:text-base">
                    {cred.title}
                  </h4>

                  <p className="relative mb-3 font-mono text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    {cred.date}
                  </p>

                  <p className="relative mb-4 flex-grow text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {cred.description}
                  </p>

                  <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition-colors group-hover:text-violet-700 dark:text-violet-400 dark:group-hover:text-violet-300">
                    Verify Credential
                    <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </motion.a>
              )
            })}
          </motion.div>
        </div>

        {/* Learning + Tech */}
        <div className="space-y-8">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10">
                <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">
                Currently Learning
              </h3>
            </div>

            <div className={`relative ${journeyCardClass} border-violet-500/25 p-4 shadow-md sm:p-5 md:p-6`}>
              <div className="absolute bottom-6 left-[1.15rem] top-6 w-px bg-gradient-to-b from-amber-500/50 via-violet-500/50 to-blue-500/30" />

              <div className="space-y-5">
                {learningItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="relative pl-6 sm:pl-8"
                  >
                    <div className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-violet-500 shadow-sm dark:border-neutral-950" />
                    <h4 className="mb-1 text-sm font-semibold text-neutral-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">
                <Cpu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">
                Advanced Tech Stack
              </h3>
            </div>

            <div className={`grid grid-cols-1 gap-4 ${journeyCardClass} border-blue-500/25 p-4 sm:gap-5 sm:p-5 md:grid-cols-2 md:p-6`}>
              {techStackGroups.map((group, groupIndex) => (
                <motion.div
                  key={group.label}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: groupIndex * 0.06 }}
                >
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: groupIndex * 0.04 + index * 0.02 }}
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                        className="cursor-default rounded-full border border-neutral-200/80 bg-neutral-50 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-violet-500/35 hover:bg-violet-500/10 hover:text-violet-800 dark:border-neutral-700/50 dark:bg-neutral-900/50 dark:text-neutral-300 dark:hover:text-violet-300 sm:text-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
