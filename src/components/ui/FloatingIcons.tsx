import React from 'react'
import { motion } from 'framer-motion'
import {
    SiTensorflow, SiPytorch, SiHuggingface, SiNvidia, SiOpencv
} from 'react-icons/si'
import {
    FaBrain, FaNetworkWired, FaRobot
} from 'react-icons/fa'

export const FloatingIcons: React.FC = () => {
    // Icons to float in the background - AI & Neural Network Themed
    const bgIcons = [
        { Icon: FaBrain, color: 'text-purple-500', size: 60, x: '10%', y: '20%', duration: 8 },
        { Icon: SiTensorflow, color: 'text-orange-500', size: 55, x: '85%', y: '15%', duration: 10 },
        { Icon: FaNetworkWired, color: 'text-blue-500', size: 50, x: '70%', y: '60%', duration: 12 },
        { Icon: SiPytorch, color: 'text-red-500', size: 50, x: '15%', y: '70%', duration: 9 },
        { Icon: SiHuggingface, color: 'text-yellow-500', size: 60, x: '80%', y: '80%', duration: 11 },
        { Icon: SiNvidia, color: 'text-green-500', size: 45, x: '5%', y: '45%', duration: 7 },
        { Icon: FaRobot, color: 'text-indigo-400', size: 50, x: '90%', y: '50%', duration: 13 },
        { Icon: SiOpencv, color: 'text-green-400', size: 40, x: '45%', y: '10%', duration: 14 },
    ]

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Cinematic Gradients - Stronger for better visibility */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />

            {/* Floating Icons */}
            {bgIcons.map((item, idx) => (
                <motion.div
                    key={idx}
                    // Increased opacity: opacity-40 in light mode for visibility
                    className={`absolute ${item.color} opacity-40 dark:opacity-30 will-change-transform`}
                    initial={{ x: item.x, y: item.y }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.5
                    }}
                    style={{ left: item.x, top: item.y }}
                >
                    <item.Icon size={item.size} />
                </motion.div>
            ))}
        </div>
    )
}
