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

const AWSIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      fill="#FF9900"
      d="M6.763 10.036c0 .296.032.535.088.713.064.176.144.368.256.576.04.063.056.127.056.191 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.667 0-1.199-.191-1.583-.574-.384-.384-.576-.894-.576-1.535 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.602.104.918.176v-.583c0-.607-.127-1.03-.375-1.279-.255-.248-.686-.367-1.302-.367-.28 0-.568.031-.863.103-.296.072-.583.16-.863.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.447.08-.767v-.368a6.648 6.648 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.287.855.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.064.048.112.16.152.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.128 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.549.549 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.151-.312l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.151.32a.549.549 0 0 1-.32.08h-.687zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758 1.002 1.002 0 0 0-.127-.512 1.292 1.292 0 0 0-.375-.384 4.46 4.46 0 0 0-.582-.327l-.838-.295c-.415-.144-.718-.303-.918-.479a1.207 1.207 0 0 1-.375-.927c0-.271.072-.503.215-.703.144-.2.335-.367.574-.503.24-.135.503-.24.806-.311a3.7 3.7 0 0 1 1.006-.136c.175 0 .359.008.534.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.191.256a.834.834 0 0 1-.303-.096 3.652 3.652 0 0 0-1.582-.335c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.702 0 .224.08.416.24.567.159.152.447.304.862.463l.687.24c.518.183.895.383 1.133.599.239.215.359.511.359.894 0 .279-.072.527-.216.734-.144.208-.343.383-.598.527-.256.144-.559.248-.918.32-.359.072-.734.112-1.133.112z"
    />
  </svg>
)

type Issuer = 'AWS' | 'DataCamp' | 'Google' | 'Microsoft'

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
    id: 'aws-ai-practitioner',
    title: 'AWS Certified AI Practitioner',
    issuer: 'AWS',
    date: 'September 2026',
    description:
      'Foundational AWS certification validating AI and ML concepts, generative AI, and responsible AI practices on AWS.',
    url: 'https://drive.google.com/file/d/1UIknQmpWVpelMZ_IQU84MDIbGpln1WRO/view?usp=sharing',
    icon: AWSIcon,
  },
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
  AWS: {
    border: 'border-orange-500/25',
    hover: 'hover:border-orange-500/45 hover:shadow-orange-500/10',
    badge: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/25',
    glow: 'from-orange-500/10',
  },
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
  { key: 'AWS', label: 'AWS' },
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
