import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Rocket, Book, LineChart, Cpu, PenTool } from 'lucide-react'
import currentFocusData from '../../../data/currentFocus.json'

interface FocusItem {
    id: string
    title: string
    description: string
    icon: string
    status: string
}

// Map string icons to Lucide components
const iconMap: Record<string, React.ReactNode> = {
    brain: <Brain className="w-6 h-6" />,
    code: <Code className="w-6 h-6" />,
    github: <Code className="w-6 h-6" />,
    chart: <LineChart className="w-6 h-6" />,
    rocket: <Rocket className="w-6 h-6" />,
    book: <Book className="w-6 h-6" />,
    eye: <Cpu className="w-6 h-6" />, // Changed to CPU for visibility
    cloud: <Database className="w-6 h-6" />,
    pen: <PenTool className="w-6 h-6" />,
}

export const CinematicFocus: React.FC = () => {
    const focusItems = currentFocusData as FocusItem[]

    return (
        <section className="py-20 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Active Learning
                    </div>
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">What I'm Working On</h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {focusItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="group p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 shadow-sm text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    {iconMap[item.icon] || <Rocket className="w-6 h-6" />}
                                </div>
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${item.status === 'active'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                    {item.status}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
