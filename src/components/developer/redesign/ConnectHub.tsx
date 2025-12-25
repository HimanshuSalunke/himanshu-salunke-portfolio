import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { SiGithub, SiLinkedin } from 'react-icons/si'
import { useSocialStats, type SocialStats } from '../../../hooks/useSocialStats'

interface SocialPlatform {
    name: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    url: string
    username: string
    color: string
    description: string
    stats?: {
        label: string
        value: string | number
    }[]
}

const getSocialPlatforms = (socialStats: SocialStats): SocialPlatform[] => [
    {
        name: 'GitHub',
        icon: SiGithub,
        url: 'https://github.com/HimanshuSalunke',
        username: 'HimanshuSalunke',
        color: 'from-gray-800 to-gray-900',
        description: 'Where the magic happens ✨',
        stats: [
            { label: 'Repositories', value: socialStats.github.isLoading ? '...' : socialStats.github.repositories || 0 },
            { label: 'Stars', value: socialStats.github.isLoading ? '...' : socialStats.github.stars || 0 },
            { label: 'Followers', value: socialStats.github.isLoading ? '...' : socialStats.github.followers || 0 }
        ]
    },
    {
        name: 'LinkedIn',
        icon: SiLinkedin,
        url: 'https://www.linkedin.com/in/himanshuksalunke/',
        username: 'himanshuksalunke',
        color: 'from-blue-600 to-blue-700',
        description: 'Professional networking & ML articles 📝',
        stats: [
            { label: 'Followers', value: '25k+' },
            { label: 'Articles', value: socialStats.linkedin.isLoading ? '...' : `${socialStats.linkedin.articles || 0}+` },
        ]
    }
]

export const ConnectHub: React.FC = () => {
    const socialStats = useSocialStats()
    const socialPlatforms = useMemo(() => getSocialPlatforms(socialStats), [socialStats])

    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">Connect Nodes</h2>
                    <p className="text-neutral-600 dark:text-gray-400">Join my network across the digital frontier.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {socialPlatforms.map((platform, index) => (
                        <motion.a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative block p-8 rounded-3xl bg-white dark:bg-white/5 backdrop-blur-md border border-neutral-200 dark:border-white/10 hover:border-blue-500/30 shadow-xl overflow-hidden transition-all duration-300"
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className="relative z-10 flex items-start justify-between mb-8">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white shadow-lg`}>
                                    <platform.icon size={24} />
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{platform.name}</h3>
                                    <p className="font-mono text-sm text-neutral-500 dark:text-gray-500">@{platform.username}</p>
                                </div>
                            </div>

                            <p className="text-neutral-600 dark:text-gray-400 mb-8 leading-relaxed font-light">
                                {platform.description}
                            </p>

                            <div className="grid grid-cols-3 gap-4 py-4 border-t border-neutral-100 dark:border-white/5">
                                {platform.stats?.map((stat) => (
                                    <div key={stat.label}>
                                        <div className="text-lg font-bold text-neutral-900 dark:text-white">{stat.value}</div>
                                        <div className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-gray-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}
