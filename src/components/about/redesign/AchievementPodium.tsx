import React from 'react'
import { motion } from 'framer-motion'

const achievementsData = [
    {
        id: 'sih-2023-lead',
        title: 'Internal Hackathon Lead',
        event: 'Smart India Hackathon 2023',
        year: '2023',
        description: 'Overseeing 85 teams and fostering innovation as a leader.',
        achievement: 'Leadership Role',
        level: 'Institutional',
        icon: '👑',
        gradient: 'from-purple-100 to-pink-100 border-purple-200 dark:from-purple-500/20 dark:to-pink-500/20 dark:border-purple-500/30'
    },
    {
        id: 'sunhacks-2022-finalist',
        title: 'Grand Finalist',
        event: 'SUNHACKS 2022',
        year: '2022',
        description: 'International Level Hackathon - Secured Grand Finalist among 15 elite teams.',
        achievement: 'Top 15',
        level: 'International',
        icon: '🏆',
        gradient: 'from-amber-100 to-orange-100 border-amber-200 dark:from-amber-500/20 dark:to-orange-500/20 dark:border-amber-500/30'
    },
    {
        id: 'sih-2022-finalist',
        title: 'Grand Finalist',
        event: 'Smart India Hackathon 2022',
        year: '2022',
        description: 'National Level - Competing against 50 teams across India.',
        achievement: 'National Finalist',
        level: 'National',
        icon: '🥇',
        gradient: 'from-blue-100 to-cyan-100 border-blue-200 dark:from-blue-500/20 dark:to-cyan-500/20 dark:border-blue-500/30'
    }
]

export const AchievementPodium: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">The Trophy Room</h2>
                        <p className="text-neutral-600 dark:text-neutral-400">Hackathons and Competitive Programming.</p>
                    </div>
                    <div className="hidden md:block text-right">
                        <p className="text-3xl font-bold text-neutral-900 dark:text-white">3</p>
                        <p className="text-sm text-neutral-500">Major Wins</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {achievementsData.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`relative group p-6 rounded-3xl bg-white dark:bg-neutral-900 border backdrop-blur-sm ${item.gradient} hover:scale-[1.02] transition-transform duration-300 shadow-sm`}
                        >
                            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>

                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/50 dark:bg-white/10 text-xs font-medium text-neutral-900 dark:text-white mb-2">
                                    {item.level}
                                </span>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{item.achievement}</h3>
                                <p className="text-neutral-700 dark:text-neutral-300 font-medium">{item.event}</p>
                            </div>

                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                                {item.description}
                            </p>

                            <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex justify-between items-center bg-transparent">
                                <span className="text-xs text-neutral-500">{item.year}</span>
                                {item.id === 'sih-2023-lead' && <span className="text-xs text-purple-600 dark:text-purple-300">85 Teams Led</span>}
                                {item.id === 'sunhacks-2022-finalist' && <span className="text-xs text-amber-600 dark:text-amber-300">60+ Participants</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
