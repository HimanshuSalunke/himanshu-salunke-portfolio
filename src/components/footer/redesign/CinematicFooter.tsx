import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Twitter, ArrowUp } from 'lucide-react'

// Explicitly using standard lucide icons where possible, or SVGs if preferred. 
// For this design, Lucide icons are cleaner.
const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/HimanshuSalunke',
        icon: <Github className="w-5 h-5" />,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/himanshuksalunke',
        icon: <Linkedin className="w-5 h-5" />,
    },

    {
        name: 'Email',
        href: 'mailto:salunkehimanshu2001@gmail.com',
        icon: <Mail className="w-5 h-5" />,
    }
]

const footerLinks = [
    {
        title: 'Explore',
        links: [
            { name: 'Home', href: '/' },
            { name: 'Work', href: '/work' },
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '/contact' },
        ]
    },
    {
        title: 'Services',
        links: [
            { name: 'Development', href: '/services' },
            { name: 'AI Solutions', href: '/services' },
            { name: 'Consulting', href: '/services' },
        ]
    },
    {
        title: 'Resources',
        links: [
            { name: 'Articles', href: '/articles' },
            { name: 'My Tech Stack', href: '/developer' },
            { name: 'Resume', href: '/Himanshu_Salunke_Resume.pdf' },
        ]
    }
]

export const CinematicFooter: React.FC = () => {
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="relative bg-neutral-950 text-white overflow-hidden pt-24 pb-12">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 1. Main CTA Section */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                    >
                        Let's Build Something <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Amazing Together.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10"
                    >
                        Whether you have a specific project in mind or just want to explore the possibilities of AI, I'm here to help.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link to="/services">
                            <button className="px-8 py-4 bg-white text-black text-lg font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all duration-300">
                                Start a Project
                            </button>
                        </Link>
                    </motion.div>
                </div>

                <div className="h-px bg-neutral-800 w-full mb-16" />

                {/* 2. Navigation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 mb-4 inline-block">
                            Himanshu
                        </Link>
                        <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                            Aspiring Data Scientist & Full Stack Developer. Crafting intelligent solutions for the modern web.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800 transition-all duration-300"
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold text-white mb-6">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        {link.href.startsWith('/') ? (
                                            <Link to={link.href} className="text-neutral-500 hover:text-blue-400 transition-colors text-sm">
                                                {link.name}
                                            </Link>
                                        ) : (
                                            <a href={link.href} className="text-neutral-500 hover:text-blue-400 transition-colors text-sm">
                                                {link.name}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="h-px bg-neutral-800 w-full mb-8" />

                {/* 3. Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-neutral-500 text-sm">
                        © {currentYear} Himanshu Salunke. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm"
                    >
                        Back to Top <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
