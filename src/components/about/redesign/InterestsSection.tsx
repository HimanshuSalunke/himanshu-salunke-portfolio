import React from 'react'
import { motion } from 'framer-motion'
import { Code, Book, Palette, Cpu } from 'lucide-react'

const interests = [
    {
        category: "Technology",
        icon: <Cpu className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
        items: ["Open Source Projects", "Tech Blogs & Podcasts", "Coding Challenges"]
    },
    {
        category: "Learning",
        icon: <Book className="w-5 h-5 text-green-500 dark:text-green-400" />,
        items: ["Online Courses", "Research Papers", "Documentation"]
    },
    {
        category: "Creative",
        icon: <Palette className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
        items: ["UI/UX Design", "Data Visualization", "Writing Articles"]
    }
]

export const InterestsSection: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">Beyond the Screen</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        There's more to me than just programming. Here's what keeps me inspired.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Interests Cards */}
                    <div className="space-y-6">
                        {interests.map((cat, idx) => (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/5 shadow-sm"
                            >
                                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0">
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{cat.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.items.map(item => (
                                            <span key={item} className="text-sm text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-white/5 px-2 py-1 rounded-md">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
