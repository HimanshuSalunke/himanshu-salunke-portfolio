import React from 'react'
import { motion } from 'framer-motion'
import { 
  SiReact, SiTypescript, SiVite, SiTailwindcss, SiVercel, 
  SiNodedotjs, SiExpress, SiMdx, SiFramer, SiGit, SiGithub,
  SiJavascript, SiHtml5, SiCss3, SiPostcss, SiEslint, SiPrettier,
  SiVitest, SiSharp, SiSlack
} from 'react-icons/si'
import { 
  FaServer, FaDatabase, FaCloud, FaCode, FaPalette, 
  FaRocket, FaShieldAlt, FaMobile, FaDesktop, FaGlobe,
  FaGitAlt, FaPlay, FaStore
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

const WebsiteInfo: React.FC = () => {
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
    functions: 'Consolidated API (reduced from 12+ to stay within Hobby plan)',
    cdn: 'Global CDN with edge caching',
    ssl: 'Automatic HTTPS with Let\'s Encrypt',
    domains: ['himanshu-salunke.vercel.app'],
    performance: {
      lighthouse: '95+ Performance Score',
      coreWebVitals: 'All metrics in green',
      loadTime: '< 2s First Contentful Paint'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Framework': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Language': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Build Tool': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'CSS Framework': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
      'Animation': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Runtime': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
      'Integration': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Security': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Content': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Platform': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      'Analytics': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Performance': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Linting': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
      'Formatting': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
      'Git Hooks': 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
      'Testing': 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
      'E2E Testing': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
    }
    return colors[category] || 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200'
  }

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          🚀 My Website's Architecture
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 px-2 sm:px-0">
          Built with modern technologies and deployed on Vercel for optimal performance
        </p>
      </div>

      {/* Architecture Layers */}
      <div className="space-y-6 sm:space-y-8">
        {architectureLayers.map((layer, layerIndex) => (
          <motion.div
            key={layer.name}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: layerIndex * 0.1 }}
          >
            {/* Layer Header */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center shadow-lg`}>
                <layer.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                  {layer.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {layer.description}
                </p>
              </div>
            </div>

            {/* Technologies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {layer.technologies.map((tech, techIndex) => (
                <motion.div
                  key={tech.name}
                  className="group bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-700 dark:to-neutral-800 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: layerIndex * 0.1 + techIndex * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white dark:bg-neutral-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <tech.icon className="w-3 h-3 sm:w-4 sm:h-4 text-neutral-700 dark:text-neutral-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white truncate">
                          {tech.name}
                        </h4>
                        {tech.version && (
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                            v{tech.version}
                          </span>
                        )}
                      </div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tech.category)}`}>
                        {tech.category}
                      </span>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                        {tech.description}
                      </p>
                      <p className="text-xs text-primary-600 dark:text-primary-400 mt-1 font-medium">
                        {tech.purpose}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deployment Information */}
      <motion.div
        className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl border border-primary-200 dark:border-primary-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
            <FaRocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
            Deployment & Performance
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Platform</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{deploymentInfo.platform}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{deploymentInfo.region}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Optimization</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{deploymentInfo.functions}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{deploymentInfo.cdn}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Security</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{deploymentInfo.ssl}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">Automatic security headers</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Performance</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{deploymentInfo.performance.lighthouse}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{deploymentInfo.performance.coreWebVitals}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Load Time</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{deploymentInfo.performance.loadTime}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">Optimized bundle size</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">Domain</h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">{deploymentInfo.domains[0]}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">Custom domain ready</p>
          </div>
        </div>
      </motion.div>

      {/* Key Features */}
      <motion.div
        className="mt-6 sm:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-4 text-center">
          ✨ Key Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            'Responsive Design (Mobile-First)',
            'Dark/Light Theme Toggle',
            'SEO Optimized with Meta Tags',
            'Accessibility Compliant (WCAG 2.1)',
            'Progressive Web App Ready',
            'Real-time Social Stats Integration',
            'MDX-based Content Management',
            'Image Optimization & Lazy Loading',
            'Code Quality with ESLint & Prettier',
            'Automated Testing Pipeline',
            'Git Hooks for Quality Assurance',
            'Performance Monitoring'
          ].map((feature, index) => (
            <motion.div
              key={feature}
              className="flex items-center gap-2 p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.0 + index * 0.05 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default WebsiteInfo
