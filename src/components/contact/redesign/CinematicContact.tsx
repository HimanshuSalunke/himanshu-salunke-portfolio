import React from 'react'
import { motion } from 'framer-motion'
import { GlassContactForm } from './GlassContactForm'
import { Mail, MapPin, Linkedin, Github, Clock, BookOpen, Globe, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

// Reusing the social link data but with new UI
const contactDetails = [
    {
        icon: <Mail className="w-6 h-6 text-blue-400" />,
        label: 'Email',
        value: 'contact.himanshusalunke@gmail.com',
        href: 'mailto:contact.himanshusalunke@gmail.com',
        color: 'blue'
    },
    {
        icon: <Linkedin className="w-6 h-6 text-blue-500" />,
        label: 'LinkedIn',
        value: 'Connect on LinkedIn',
        href: 'https://www.linkedin.com/in/himanshuksalunke',
        color: 'sky'
    },
    {
        icon: <Clock className="w-6 h-6 text-green-400" />,
        label: 'Response Time',
        value: 'Within 24 hours',
        href: null,
        color: 'green'
    },
    {
        icon: <Globe className="w-6 h-6 text-purple-400" />,
        label: 'Location & Timezone',
        value: 'Remote / India (IST)',
        href: null,
        color: 'purple'
    }
]

export const CinematicContact: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 bg-neutral-950 overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Context & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            Open to Opportunities
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
                            Let's Build the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                Future.
                            </span>
                        </h1>

                        <p className="text-lg text-neutral-400 mb-10 max-w-lg leading-relaxed">
                            Have a project in mind? Looking for a data science partner?
                            Or just want to chat about AI? I'm just a message away.
                        </p>

                        <div className="space-y-4 mb-10">
                            {contactDetails.map((item, idx) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                >
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith('mailto') ? undefined : "_blank"}
                                            rel={item.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                                            className="group flex items-center gap-5 p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-500 font-medium mb-0.5">{item.label}</p>
                                                <p className="text-base text-white font-medium group-hover:text-blue-400 transition-colors">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-5 p-3 rounded-2xl bg-white/5 border border-white/5">
                                            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-500 font-medium mb-0.5">{item.label}</p>
                                                <p className="text-base text-white font-medium">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Quick Actions</h3>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/articles" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all">
                                    <BookOpen className="w-4 h-4" />
                                    <span>Read My Articles</span>
                                </Link>
                                <a
                                    href="https://github.com/HimanshuSalunke"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-all"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>View GitHub</span>
                                </a>
                            </div>
                        </div>

                    </motion.div>

                    {/* Right Column: Glass Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Glow effect behind form */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-20 blur-xl" />
                        <GlassContactForm />
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
