import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
    SiReact, SiTypescript, SiJavascript, SiPython, SiFastapi, SiNodedotjs, SiFlask,
    SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiPandas, SiNumpy, SiJupyter,
    SiPostgresql, SiMongodb, SiRedis, SiDocker, SiKubernetes, SiAmazon, SiGooglecloud, SiGit, SiGithub,
    SiNextdotjs, SiSass, SiVercel, SiApacheairflow, SiPlotly, SiTableau, SiPowers,
    SiHtml5, SiCss3, SiC, SiCplusplus, SiSlack, SiJira, SiLinux, SiKeras,
    SiStreamlit, SiHuggingface, SiNvidia, SiMui, SiThreedotjs, SiOnnx
} from 'react-icons/si'
import {
    FaBrain, FaRobot, FaChartLine, FaCogs, FaServer, FaChartBar, FaJava, FaDatabase, FaNetworkWired,
    FaBolt, FaGoogle, FaRocket, FaCode
} from 'react-icons/fa'
import { useGitHubStats } from '../../../hooks/useGitHubStats'

interface Skill {
    name: string
    level: number
    category: 'frontend' | 'backend' | 'ai-ml' | 'tools' | 'databases'
    icon: React.ComponentType<{ size?: number; className?: string }>
    color: string
}

const skillsData: Skill[] = [
    // AI/ML & Data Science
    { name: 'Python', level: 95, category: 'ai-ml', icon: SiPython, color: 'text-yellow-500' },
    { name: 'TensorFlow', level: 85, category: 'ai-ml', icon: SiTensorflow, color: 'text-orange-500' },
    { name: 'PyTorch', level: 80, category: 'ai-ml', icon: SiPytorch, color: 'text-red-500' },
    { name: 'XGBoost', level: 85, category: 'ai-ml', icon: FaRocket, color: 'text-green-500' },
    { name: 'Hugging Face', level: 85, category: 'ai-ml', icon: SiHuggingface, color: 'text-yellow-400' },
    { name: 'Scikit-learn', level: 90, category: 'ai-ml', icon: SiScikitlearn, color: 'text-orange-500' },
    { name: 'Pandas', level: 95, category: 'ai-ml', icon: SiPandas, color: 'text-blue-600' },
    { name: 'NumPy', level: 90, category: 'ai-ml', icon: SiNumpy, color: 'text-blue-500' },
    { name: 'OpenCV', level: 85, category: 'ai-ml', icon: SiOpencv, color: 'text-green-600' },
    { name: 'MediaPipe', level: 80, category: 'ai-ml', icon: FaGoogle, color: 'text-blue-500' },
    { name: 'Matplotlib', level: 85, category: 'ai-ml', icon: FaChartLine, color: 'text-blue-500' },
    { name: 'Seaborn', level: 80, category: 'ai-ml', icon: FaChartBar, color: 'text-purple-500' },
    { name: 'Jupyter', level: 90, category: 'ai-ml', icon: SiJupyter, color: 'text-orange-500' },
    { name: 'Keras', level: 80, category: 'ai-ml', icon: SiKeras, color: 'text-red-500' },
    { name: 'YOLO', level: 75, category: 'ai-ml', icon: FaRobot, color: 'text-purple-600' },
    { name: 'LangChain', level: 75, category: 'ai-ml', icon: FaRobot, color: 'text-purple-600' },
    { name: 'OpenAI API', level: 80, category: 'ai-ml', icon: FaBrain, color: 'text-purple-500' },

    // Programming Languages
    { name: 'Java', level: 75, category: 'backend', icon: FaJava, color: 'text-red-500' },
    { name: 'C', level: 80, category: 'backend', icon: SiC, color: 'text-blue-600' },
    { name: 'C++', level: 75, category: 'backend', icon: SiCplusplus, color: 'text-blue-500' },
    { name: 'SQL', level: 85, category: 'backend', icon: FaDatabase, color: 'text-blue-500' },

    // Web Development
    { name: 'HTML', level: 90, category: 'frontend', icon: SiHtml5, color: 'text-orange-500' },
    { name: 'CSS', level: 90, category: 'frontend', icon: SiCss3, color: 'text-blue-500' },
    { name: 'React', level: 90, category: 'frontend', icon: SiReact, color: 'text-blue-500' },
    { name: 'Next.js', level: 85, category: 'frontend', icon: SiNextdotjs, color: 'text-black dark:text-white' },
    { name: 'Three.js', level: 75, category: 'frontend', icon: SiThreedotjs, color: 'text-black dark:text-white' },
    { name: 'Material UI', level: 80, category: 'frontend', icon: SiMui, color: 'text-blue-500' },
    { name: 'Streamlit', level: 90, category: 'frontend', icon: SiStreamlit, color: 'text-red-500' },
    { name: 'Node.js', level: 80, category: 'backend', icon: SiNodedotjs, color: 'text-green-600' },
    { name: 'FastAPI', level: 80, category: 'backend', icon: SiFastapi, color: 'text-green-600' },
    { name: 'Flask', level: 75, category: 'backend', icon: SiFlask, color: 'text-red-500' },
    { name: 'SASS/SCSS', level: 85, category: 'frontend', icon: SiSass, color: 'text-pink-500' },

    // Cloud & Infrastructure
    { name: 'AWS Services', level: 80, category: 'tools', icon: SiAmazon, color: 'text-orange-500' },
    { name: 'AWS Lambda', level: 75, category: 'tools', icon: SiAmazon, color: 'text-orange-500' },
    { name: 'Google Cloud AI', level: 75, category: 'tools', icon: SiGooglecloud, color: 'text-blue-600' },
    { name: 'CUDA', level: 75, category: 'tools', icon: SiNvidia, color: 'text-green-500' },
    { name: 'ONNX', level: 70, category: 'tools', icon: SiOnnx, color: 'text-blue-600' },
    { name: 'Docker', level: 80, category: 'tools', icon: SiDocker, color: 'text-blue-500' },
    { name: 'Kubernetes', level: 70, category: 'tools', icon: SiKubernetes, color: 'text-blue-600' },
    { name: 'Vercel', level: 85, category: 'tools', icon: SiVercel, color: 'text-black dark:text-white' },
    { name: 'Linux', level: 80, category: 'tools', icon: SiLinux, color: 'text-yellow-500' },

    // Data Visualization
    { name: 'Plotly', level: 85, category: 'tools', icon: SiPlotly, color: 'text-blue-500' },
    { name: 'Tableau', level: 75, category: 'tools', icon: SiTableau, color: 'text-blue-600' },
    { name: 'PowerBI', level: 70, category: 'tools', icon: SiPowers, color: 'text-yellow-500' },

    // Databases
    { name: 'PostgreSQL', level: 85, category: 'databases', icon: SiPostgresql, color: 'text-blue-600' },
    { name: 'Neon (Serverless PG)', level: 85, category: 'databases', icon: SiPostgresql, color: 'text-green-400' },
    { name: 'MongoDB', level: 80, category: 'databases', icon: SiMongodb, color: 'text-green-600' },
    { name: 'Redis', level: 75, category: 'databases', icon: SiRedis, color: 'text-red-500' },
    { name: 'Vercel Blob', level: 80, category: 'databases', icon: SiVercel, color: 'text-black dark:text-white' },
    { name: 'FAISS', level: 85, category: 'databases', icon: FaBolt, color: 'text-yellow-400' },

    // Tools & Others
    { name: 'Git', level: 90, category: 'tools', icon: SiGit, color: 'text-orange-500' },
    { name: 'GitHub', level: 85, category: 'tools', icon: SiGithub, color: 'text-gray-800 dark:text-gray-200' },
    { name: 'Apache Airflow', level: 75, category: 'tools', icon: SiApacheairflow, color: 'text-blue-500' },
    { name: 'AWS Glue', level: 70, category: 'tools', icon: FaCogs, color: 'text-orange-500' },
    { name: 'Jira', level: 75, category: 'tools', icon: SiJira, color: 'text-blue-500' },
    { name: 'Slack', level: 80, category: 'tools', icon: SiSlack, color: 'text-purple-500' },
    { name: 'Networking', level: 75, category: 'tools', icon: FaNetworkWired, color: 'text-green-600' }
]

const categoryColors = {
    frontend: 'from-blue-500 to-blue-600',
    backend: 'from-green-500 to-green-600',
    'ai-ml': 'from-purple-500 to-purple-600',
    tools: 'from-orange-500 to-orange-600',
    databases: 'from-red-500 to-red-600'
}

const categoryLabels = {
    'ai-ml': 'AI / Neural Nets',
    backend: 'Backend & Systems',
    frontend: 'User Interface',
    tools: 'DevOps & Toolchain',
    databases: 'Data Storage'
}

// Background Floating Icons Component
import { FloatingIcons } from '../../ui/FloatingIcons'

export const TechArsenal: React.FC = () => {
    const githubStats = useGitHubStats('HimanshuSalunke')
    const categories = Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>

    // Language mapping (preserved from old TechStack.tsx)
    const languageIconMap: { [key: string]: React.ComponentType<{ size?: number; className?: string }> } = {
        'Python': SiPython,
        'Java': FaJava, 'C': SiC, 'C++': SiCplusplus, 'React': SiReact,
        'HTML': SiHtml5, 'CSS': SiCss3, 'Shell': SiGit, 'Dockerfile': SiDocker,
        'SQL': FaDatabase, 'Jupyter Notebook': SiJupyter, 'Markdown': SiGithub
    }

    const languageColorMap: { [key: string]: string } = {
        'Python': 'text-yellow-500',
        'Java': 'text-red-500', 'C': 'text-blue-600', 'C++': 'text-blue-500', 'React': 'text-blue-500',
        'HTML': 'text-orange-500', 'CSS': 'text-blue-500', 'Shell': 'text-green-500',
        'Dockerfile': 'text-blue-500', 'SQL': 'text-blue-500', 'Jupyter Notebook': 'text-orange-500',
        'Markdown': 'text-gray-500'
    }

    return (
        <section className="relative min-h-screen py-20 px-4 bg-neutral-50 dark:bg-[#030014] overflow-hidden transition-colors duration-300">
            {/* Dynamic Background */}
            <FloatingIcons />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* 2. Tech Modules (Skill Categories) */}
                <div className="space-y-16">
                    {categories.map((category, idx) => {
                        const skills = skillsData.filter(s => s.category === category)
                        return (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="flex items-end gap-4 mb-8 border-b border-neutral-200 dark:border-white/10 pb-4">
                                    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-500">
                                        {categoryLabels[category]}
                                    </h3>
                                    <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500 mb-1.5">/// MODULE_0{idx + 1}</span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {skills.map((skill) => (
                                        <motion.div
                                            key={skill.name}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            className="group relative p-4 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-sm border border-neutral-200 dark:border-white/10 shadow-sm hover:shadow-lg dark:shadow-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />

                                            <div className="relative z-10">
                                                <div className="flex justify-center mb-4">
                                                    <skill.icon className={`w-8 h-8 ${skill.color} filter drop-shadow-sm dark:drop-shadow-lg transition-transform group-hover:scale-110 duration-300`} />
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-sm font-bold text-neutral-700 dark:text-gray-200 mb-2 truncate">{skill.name}</div>
                                                    {/* Proficiency Indicator */}
                                                    <div className="flex justify-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((level) => (
                                                            <div
                                                                key={level}
                                                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${(skill.level / 20) >= level
                                                                    ? 'bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]'
                                                                    : 'bg-neutral-200 dark:bg-neutral-800'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}
