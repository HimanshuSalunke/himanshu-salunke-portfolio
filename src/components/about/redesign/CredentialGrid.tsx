import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Award, Cpu, BookOpen } from 'lucide-react'

// --- SVGs from previous Credentials.tsx ---
const DataCampIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" rx="15%" fill="#05192d" />
        <path fill="#03EF62" d="m273.2 378.4v-95.3l150.4-85.8-36.6-20.9-113.8 64.9v-95.7c0-6.4-3.5-12.5-9.1-15.7L127.2 51.3a26.1 26.1 90 00-26.5.8A26.1 26.1 90 0088.4 74.4v268.9c0 9.1 4.6 17.5 12.3 22.3a26 26 90 0026.5.8l109.7-62.6V389c0 6.5 3.6 12.6 9.2 15.8l140.7 80.1 36.6-21-150.2-85.5zm-36.3-222.2V262l-112.2 64V91.8l112.2 64.4z" />
    </svg>
)

const GoogleIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
)

const credentialsData = [
    {
        id: 'datacamp-analyst',
        title: 'DataCamp Certified: Associate Data Analyst',
        issuer: 'DataCamp',
        date: 'May 2024',
        url: 'https://drive.google.com/file/d/1sRj_7Guc-tVBmw_bNZnBh6EcVmZUj1es/view',
        icon: DataCampIcon
    },
    {
        id: 'datacamp-engineer',
        title: 'DataCamp Certified: Associate Data Engineer',
        issuer: 'DataCamp',
        date: 'May 2024',
        url: 'https://drive.google.com/file/d/1JseSVzsLL9maBkDioIufZIjpuhb07bSX/view',
        icon: DataCampIcon
    },
    {
        id: 'google-bi',
        title: 'Google Business Intelligence Certification',
        issuer: 'Google',
        date: 'April 2024',
        url: 'https://drive.google.com/file/d/1CSfaO1kV1XpbChKfmWojA44Ge3xgVRvM/view',
        icon: GoogleIcon
    },
    {
        id: 'google-analytics',
        title: 'Google Data Analytics Certification',
        issuer: 'Google',
        date: 'Feb 2024',
        url: 'https://drive.google.com/file/d/1lrOPW3huOrYh1s5oakKSYOCJZHOKMq93/view',
        icon: GoogleIcon
    },
    {
        id: 'datacamp-scientist',
        title: 'Data Scientist Professional Certificate',
        issuer: 'DataCamp',
        date: 'Oct 2023',
        url: 'https://drive.google.com/file/d/1CQIOT7vUbOoVcX7dwVmBBZNH9FOPiKrm/view',
        icon: DataCampIcon
    }
]

const learningItems = [
    { title: "Advanced React Patterns", desc: "Compound components & hooks" },
    { title: "Machine Learning Ops", desc: "Model deployment & monitoring" },
    { title: "Cloud Architecture", desc: "AWS services & serverless" },
    { title: "Design Systems", desc: "Tokens & component libraries" }
]

const techStack = ['Python', 'Machine Learning', 'React', 'AI', 'Data Science', 'SQL', 'TensorFlow']

export const CredentialGrid: React.FC = () => {
    return (
        <section className="py-20 relative px-4 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">The Arsenal</h2>
                    <p className="text-neutral-600 dark:text-neutral-400">Certifications, Skills, and Continuous Learning.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Block: Certifications */}
                    <div className="lg:col-span-2 bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <Award className="text-yellow-500 dark:text-yellow-400 w-6 h-6" />
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Certifications</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {credentialsData.map((cred) => (
                                <a
                                    key={cred.id}
                                    href={cred.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 hover:border-blue-300 dark:hover:border-white/20 transition-all"
                                >
                                    <div className="w-10 h-10 shrink-0">
                                        <cred.icon size={40} className="drop-shadow-sm" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h4 className="text-neutral-900 dark:text-white font-medium text-sm leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cred.title}</h4>
                                        <p className="text-neutral-500 text-xs mt-1">{cred.issuer} • {cred.date}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-neutral-400 dark:text-neutral-600 ml-auto group-hover:text-neutral-900 dark:group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Side Block: Currently Learning */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-neutral-200 dark:border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Learning</h3>
                        </div>
                        <div className="space-y-4">
                            {learningItems.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 mt-2 animate-pulse" />
                                    <div>
                                        <h4 className="text-neutral-900 dark:text-white font-medium text-sm">{item.title}</h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-xs">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Strip: Tech Stack */}
                    <div className="lg:col-span-3 bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 rounded-3xl p-6 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <Cpu className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Core Technologies</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 text-neutral-700 dark:text-neutral-300 text-sm hover:bg-blue-100 dark:hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
