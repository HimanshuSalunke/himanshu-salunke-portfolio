import React from 'react'
import { motion } from 'framer-motion'
import {
    SiReact, SiTypescript, SiVite, SiTailwindcss, SiVercel,
    SiNodedotjs, SiExpress, SiMdx, SiFramer, SiPostcss, SiEslint, SiPrettier,
    SiVitest, SiSharp, SiSlack, SiPostgresql, SiRedis
} from 'react-icons/si'
import {
    FaServer, FaDatabase, FaCode, FaPalette,
    FaRocket, FaShieldAlt, FaMobile, FaDesktop, FaGlobe,
    FaGitAlt, FaPlay, FaBolt, FaCloud
} from 'react-icons/fa'

interface TechItem {
    name: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    category: string
    description: string
    version?: string
    purpose: string
}

interface ArchitectureLayer {
    name: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    technologies: TechItem[]
    description: string
    color: string
}

const architectureLayers: ArchitectureLayer[] = [
    {
        name: 'Frontend Framework',
        icon: FaDesktop,
        color: 'from-blue-500 to-blue-600',
        description: 'Modern React-based user interface with TypeScript for type safety',
        technologies: [
            {
                name: 'React 18',
                icon: SiReact,
                category: 'Framework',
                description: 'Component-based UI library with hooks and concurrent features',
                version: '18.3.1',
                purpose: 'Core UI framework'
            },
            {
                name: 'TypeScript',
                icon: SiTypescript,
                category: 'Language',
                description: 'Statically typed JavaScript for better development experience',
                version: '5.8.3',
                purpose: 'Type safety and IntelliSense'
            },
            {
                name: 'Vite',
                icon: SiVite,
                category: 'Build Tool',
                description: 'Fast build tool and development server',
                version: '7.1.2',
                purpose: 'Development and bundling'
            }
        ]
    },
    {
        name: 'Styling & Design',
        icon: FaPalette,
        color: 'from-purple-500 to-purple-600',
        description: 'Responsive design system with custom theming and animations',
        technologies: [
            {
                name: 'Tailwind CSS',
                icon: SiTailwindcss,
                category: 'CSS Framework',
                description: 'Utility-first CSS framework for rapid UI development',
                version: '3.4.17',
                purpose: 'Styling and responsive design'
            },
            {
                name: 'Framer Motion',
                icon: SiFramer,
                category: 'Animation',
                description: 'Production-ready motion library for React',
                version: '11.15.0',
                purpose: 'Smooth animations and transitions'
            },
            {
                name: 'PostCSS',
                icon: SiPostcss,
                category: 'CSS Processor',
                description: 'Tool for transforming CSS with JavaScript plugins',
                version: '8.5.6',
                purpose: 'CSS processing and optimization'
            }
        ]
    },
    {
        name: 'Backend & Data',
        icon: FaServer,
        color: 'from-green-500 to-green-600',
        description: 'Serverless architecture with Neon Postgres and Vercel Blob storage',
        technologies: [
            {
                name: 'Serverless Functions',
                icon: SiVercel,
                category: 'Compute',
                description: 'Event-driven serverless functions on Vercel Edge Network',
                purpose: 'API and backend logic'
            },
            {
                name: 'Neon Postgres',
                icon: SiPostgresql,
                category: 'Database',
                description: 'Serverless PostgreSQL with branching and scalability',
                purpose: 'Primary data storage'
            },
            {
                name: 'Vercel Blob',
                icon: FaCloud,
                category: 'Storage',
                description: 'Edge-cached object storage for assets and media',
                purpose: 'File & image storage'
            },
            {
                name: 'Express.js',
                icon: SiExpress,
                category: 'Framework',
                description: 'Minimalist web framework integrated with serverless',
                version: '5.1.0',
                purpose: 'Route handling'
            }
        ]
    },
    {
        name: 'Content Management',
        icon: FaCode,
        color: 'from-orange-500 to-orange-600',
        description: 'MDX-based content system for dynamic project and article management',
        technologies: [
            {
                name: 'MDX',
                icon: SiMdx,
                category: 'Content',
                description: 'Markdown with JSX components for rich content',
                version: '3.1.1',
                purpose: 'Project and article content'
            },
            {
                name: 'Gray Matter',
                icon: FaDatabase,
                category: 'Parser',
                description: 'Parse frontmatter from markdown files',
                version: '4.0.3',
                purpose: 'Frontmatter extraction'
            },
            {
                name: 'Sharp',
                icon: SiSharp,
                category: 'Image Processing',
                description: 'High performance image processing library',
                version: '0.34.3',
                purpose: 'Image optimization'
            }
        ]
    },
    {
        name: 'Deployment & Hosting',
        icon: FaRocket,
        color: 'from-red-500 to-red-600',
        description: 'Optimized Vercel deployment with consolidated serverless functions',
        technologies: [
            {
                name: 'Vercel',
                icon: SiVercel,
                category: 'Platform',
                description: 'Frontend cloud platform for static sites and serverless functions',
                purpose: 'Production hosting and deployment'
            },
            {
                name: 'Vercel Analytics',
                icon: FaGlobe,
                category: 'Analytics',
                description: 'Real-time web analytics and performance monitoring',
                version: '1.5.0',
                purpose: 'Website analytics and insights'
            },
            {
                name: 'Vercel Speed Insights',
                icon: FaMobile,
                category: 'Performance',
                description: 'Core Web Vitals monitoring and optimization',
                version: '1.2.0',
                purpose: 'Performance monitoring'
            }
        ]
    },
    {
        name: 'Development Tools',
        icon: FaCode,
        color: 'from-indigo-500 to-indigo-600',
        description: 'Comprehensive development toolchain for code quality and testing',
        technologies: [
            {
                name: 'ESLint',
                icon: SiEslint,
                category: 'Linting',
                description: 'Static code analysis for JavaScript and TypeScript',
                version: '9.35.0',
                purpose: 'Code quality and consistency'
            },
            {
                name: 'Prettier',
                icon: SiPrettier,
                category: 'Formatting',
                description: 'Code formatter for consistent styling',
                version: '3.6.2',
                purpose: 'Code formatting'
            },
            {
                name: 'Husky',
                icon: FaGitAlt,
                category: 'Git Hooks',
                description: 'Git hooks for automated quality checks',
                version: '9.1.7',
                purpose: 'Pre-commit validation'
            },
            {
                name: 'Vitest',
                icon: SiVitest,
                category: 'Testing',
                description: 'Fast unit testing framework',
                version: '3.2.4',
                purpose: 'Unit testing'
            },
            {
                name: 'Playwright',
                icon: FaPlay,
                category: 'E2E Testing',
                description: 'End-to-end testing for web applications',
                version: '1.55.0',
                purpose: 'Automated testing'
            }
        ]
    }
]

const deploymentInfo = {
    platform: 'Vercel',
    region: 'Global Edge Network',
    functions: 'Consolidated API',
    cdn: 'Global CDN with edge caching',
    ssl: 'Automatic HTTPS with Let\'s Encrypt',
    domains: ['himanshu-salunke.vercel.app'],
    performance: {
        lighthouse: '95+ Performance Score',
        coreWebVitals: 'All metrics in green',
        loadTime: '< 2s First Contentful Paint'
    }
}

export const SystemArchitecture: React.FC = () => {
    return (
        <section className="py-12 sm:py-20 px-4 relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                    System Architecture
                </h2>
                <p className="text-neutral-600 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light">
                    A blueprint of the technologies powering this portfolio. Built for performance, scalability, and developer experience.
                </p>
            </div>

            {/* Architecture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16 relative z-10">
                {architectureLayers.map((layer, idx) => (
                    <motion.div
                        key={layer.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-md border border-neutral-200 dark:border-white/10 shadow-xl hover:border-blue-500/30 hover:bg-neutral-50 dark:hover:bg-white/10 transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <layer.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{layer.name}</h3>
                                <p className="text-xs font-mono text-neutral-500 dark:text-gray-500 uppercase tracking-wider">Core Component</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {layer.technologies.map(tech => (
                                <div key={tech.name} className="group/item p-3 rounded-lg bg-neutral-100 dark:bg-black/20 border border-neutral-200 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/20 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-3">
                                            <tech.icon className="w-4 h-4 text-neutral-500 dark:text-gray-400 group-hover/item:text-neutral-900 dark:group-hover/item:text-white transition-colors" />
                                            <span className="text-sm font-semibold text-neutral-700 dark:text-gray-200 group-hover/item:text-neutral-900 dark:group-hover/item:text-white">{tech.name}</span>
                                        </div>
                                        {tech.version && <span className="text-[10px] font-mono text-neutral-400 dark:text-gray-600">{tech.version}</span>}
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-gray-500 leading-relaxed pl-7">{tech.purpose}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Deployment Monitor - "Mission Control" Style */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-[#050505]/80 backdrop-blur-md shadow-2xl relative z-10"
            >
                {/* HUD Header */}
                <div className="bg-neutral-200/50 dark:bg-white/5 p-4 flex items-center justify-between border-b border-neutral-200 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <span className="ml-4 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest border-l border-neutral-300 dark:border-white/10 pl-4">System Monitor</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-green-600 dark:text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse relative">
                            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                        </span>
                        SYSTEM ONLINE
                    </div>
                </div>

                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h4 className="text-xs font-mono text-neutral-500 dark:text-gray-500 uppercase mb-6 flex items-center gap-2">
                            <FaGlobe className="w-3 h-3" /> Instance Status
                        </h4>
                        <div className="space-y-6 font-mono text-sm">
                            <div>
                                <div className="text-neutral-500 text-xs mb-1">Platform</div>
                                <div className="text-neutral-900 dark:text-white font-bold tracking-wide">{deploymentInfo.platform}</div>
                            </div>
                            <div>
                                <div className="text-neutral-500 text-xs mb-1">Region</div>
                                <div className="text-neutral-600 dark:text-gray-300">{deploymentInfo.region}</div>
                            </div>
                            <div>
                                <div className="text-neutral-500 text-xs mb-1">Domain</div>
                                <div className="text-blue-600 dark:text-blue-400 break-all">{deploymentInfo.domains[0]}</div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-xs font-mono text-neutral-500 dark:text-gray-500 uppercase mb-6 flex items-center gap-2">
                            <FaRocket className="w-3 h-3" /> Performance Metrics
                        </h4>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-5 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-green-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10">
                                    <div className="text-4xl font-black text-neutral-900 dark:text-white mb-2">98</div>
                                    <div className="text-xs text-green-600 dark:text-green-400 font-mono">Lighthouse Score</div>
                                    <div className="w-full bg-neutral-200 dark:bg-white/10 h-1 mt-4 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[98%] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 rounded-xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10">
                                    <div className="text-4xl font-black text-neutral-900 dark:text-white mb-2">0.1s</div>
                                    <div className="text-xs text-blue-600 dark:text-blue-400 font-mono">First Contentful Paint</div>
                                    <div className="w-full bg-neutral-200 dark:bg-white/10 h-1 mt-4 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[95%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <span className="px-3 py-1.5 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-mono rounded border border-green-200 dark:border-green-500/20 flex items-center gap-2">
                                <FaShieldAlt className="w-3 h-3" /> HTTPS SECURE
                            </span>
                            <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-mono rounded border border-blue-200 dark:border-blue-500/20 flex items-center gap-2">
                                <FaBolt className="w-3 h-3" /> EDGE CACHING
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
