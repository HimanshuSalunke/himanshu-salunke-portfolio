import React from 'react'
import { motion } from 'framer-motion'
import {
    SiReact, SiTypescript, SiVite, SiTailwindcss, SiVercel,
    SiNodedotjs, SiExpress, SiMdx, SiFramer, SiPostcss, SiEslint, SiPrettier,
    SiVitest, SiSharp, SiSlack
} from 'react-icons/si'
import {
    FaServer, FaDatabase, FaCode, FaPalette,
    FaRocket, FaShieldAlt, FaMobile, FaDesktop, FaGlobe,
    FaGitAlt, FaPlay
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
        name: 'Backend & API',
        icon: FaServer,
        color: 'from-green-500 to-green-600',
        description: 'Express.js server with consolidated API endpoints for optimal performance',
        technologies: [
            {
                name: 'Node.js',
                icon: SiNodedotjs,
                category: 'Runtime',
                description: 'JavaScript runtime for server-side development',
                version: '22.x',
                purpose: 'Backend runtime environment'
            },
            {
                name: 'Express.js',
                icon: SiExpress,
                category: 'Framework',
                description: 'Fast, unopinionated web framework for Node.js',
                version: '5.1.0',
                purpose: 'API server and routing'
            },
            {
                name: 'CORS',
                icon: FaShieldAlt,
                category: 'Security',
                description: 'Cross-Origin Resource Sharing middleware',
                version: '2.8.5',
                purpose: 'Cross-origin request handling'
            },
            {
                name: 'Slack',
                icon: SiSlack,
                category: 'Integration',
                description: 'Webhook integration for contact form notifications',
                purpose: 'Real-time notification delivery'
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
        <section className="py-12 sm:py-20 px-4">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                    System Architecture
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                    A blueprint of the technologies powering this portfolio. Built for performance, scalability, and developer experience.
                </p>
            </div>

            {/* Architecture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
                {architectureLayers.map((layer, idx) => (
                    <motion.div
                        key={layer.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center text-white shadow-lg`}>
                                <layer.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{layer.name}</h3>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">Core Component</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {layer.technologies.map(tech => (
                                <div key={tech.name} className="group p-3 rounded-lg bg-neutral-50 dark:bg-white/5 border border-neutral-100 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/20 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <tech.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                                            <span className="text-sm font-semibold text-neutral-900 dark:text-white">{tech.name}</span>
                                        </div>
                                        {tech.version && <span className="text-[10px] font-mono text-neutral-400">{tech.version}</span>}
                                    </div>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed pl-6">{tech.purpose}</p>
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
                className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900"
            >
                <div className="bg-neutral-200 dark:bg-white/5 p-4 flex items-center justify-between border-b border-neutral-300 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <span className="ml-3 text-xs font-mono text-neutral-500 uppercase tracking-widest">System Monitor</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-green-600 dark:text-green-400">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        SYSTEM ONLINE
                    </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-xs font-mono text-neutral-400 uppercase mb-4">Instance Status</h4>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-neutral-500 mb-1">Platform</div>
                                <div className="font-mono text-neutral-900 dark:text-white font-bold text-lg">{deploymentInfo.platform}</div>
                            </div>
                            <div>
                                <div className="text-sm text-neutral-500 mb-1">Region</div>
                                <div className="font-mono text-neutral-700 dark:text-neutral-300 text-sm">{deploymentInfo.region}</div>
                            </div>
                            <div>
                                <div className="text-sm text-neutral-500 mb-1">Domain</div>
                                <div className="font-mono text-blue-600 dark:text-blue-400 text-sm">{deploymentInfo.domains[0]}</div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-xs font-mono text-neutral-400 uppercase mb-4">Performance Metrics</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/5">
                                <div className="text-3xl font-bold text-green-500 mb-1">98</div>
                                <div className="text-xs text-neutral-500">Lighthouse Performance</div>
                                <div className="w-full bg-neutral-100 dark:bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[98%]" />
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-black/20 border border-neutral-200 dark:border-white/5">
                                <div className="text-3xl font-bold text-blue-500 mb-1">0.1s</div>
                                <div className="text-xs text-neutral-500">First Contentful Paint</div>
                                <div className="w-full bg-neutral-100 dark:bg-white/10 h-1 mt-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[95%]" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs rounded border border-green-200 dark:border-green-500/20">HTTPS Secure</span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs rounded border border-blue-200 dark:border-blue-500/20">Edge Caching</span>
                            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs rounded border border-purple-200 dark:border-purple-500/20">Hobby Plan Optimized</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
