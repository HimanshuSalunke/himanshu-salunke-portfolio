import React from 'react'
import { motion } from 'framer-motion'
import { Target, Heart, Zap, Book, Globe, Users } from 'lucide-react'

const values = [
    { title: "Excellence", icon: Target, color: "text-amber-500 dark:text-amber-400" },
    { title: "Innovation", icon: Zap, color: "text-purple-500 dark:text-purple-400" },
    { title: "Learning", icon: Book, color: "text-blue-500 dark:text-blue-400" },
    { title: "Impact", icon: Globe, color: "text-green-500 dark:text-green-400" },
    { title: "Collaboration", icon: Users, color: "text-indigo-500 dark:text-indigo-400" },
    { title: "Resilience", icon: Heart, color: "text-red-500 dark:text-red-400" }
]

const goals = [
    { goal: "Complete React 19 migration", progress: 75, deadline: "End of month" },
    { goal: "Launch AI-powered portfolio features", progress: 40, deadline: "Next 2 weeks" },
    { goal: "Write 3 technical articles", progress: 60, deadline: "This quarter" },
    { goal: "Contribute to 5 open source projects", progress: 20, deadline: "Ongoing" }
]

export const MissionCompass: React.FC = () => {
    return (
        <section className="py-20 bg-neutral-100 dark:bg-neutral-900/30 border-y border-neutral-200 dark:border-white/5 pixel-grid transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left: Mission & Values */}
                <div>
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">The Compass</h2>
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/5 rounded-3xl p-8 mb-8 shadow-sm">
                        <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed italic mb-8">
                            "To leverage the power of artificial intelligence and data science to solve real-world problems, create innovative solutions, and make technology more accessible and beneficial for everyone."
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {values.map((val) => (
                                <div key={val.title} className="flex items-center gap-2">
                                    <val.icon className={`w-4 h-4 ${val.color}`} />
                                    <span className="text-sm font-medium text-neutral-700 dark:text-white">{val.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Short Term Goals */}
                <div>
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">Next Objectives</h2>
                    <div className="space-y-6">
                        {goals.map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-neutral-200 dark:border-white/5 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-neutral-900 dark:text-white font-medium">{item.goal}</span>
                                    <span className="text-xs text-neutral-500">{item.deadline}</span>
                                </div>
                                <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2 mb-2">
                                    <motion.div
                                        className="bg-blue-500 h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.progress}%` }}
                                        transition={{ duration: 1, delay: idx * 0.1 }}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <span className="text-xs text-blue-600 dark:text-blue-400">{item.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
