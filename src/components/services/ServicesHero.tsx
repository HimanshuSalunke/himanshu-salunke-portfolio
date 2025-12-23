import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export const ServicesHero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-[#0A0A0A]">
      {/* Background: Living Neural Field */}
      <NeuralBackground />

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for New Projects
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
              AI & Data Science <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-600">
                Solutions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10">
              I build custom AI systems and data pipelines that solve real business problems. From predictive analytics to intelligent agents, I turn chaos into clarity.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                className="bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 border-none px-8 py-4 rounded-full font-medium"
                onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Initiate Protocol
              </Button>
              <button
                onClick={() => document.getElementById('what-i-build')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-white hover:text-neutral-900 dark:hover:text-white transition-all"
              >
                View Capabilities
              </button>
            </div>
          </motion.div>

          {/* Visual: Data Sphere / Hologram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-96 h-96">
              {/* Orbital Rings */}
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-16 rounded-full border border-neutral-900/10 dark:border-white/10 animate-[pulse_3s_ease-in-out_infinite]" />

              {/* Central Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-xl animate-pulse" />
                <div className="relative z-10 font-mono text-6xl font-bold text-neutral-900 dark:text-white mix-blend-overlay dark:mix-blend-normal">
                  AI
                </div>
              </div>

              {/* Floating Data Points */}
              <FloatingDataPoint x={-40} y={-20} delay={0} />
              <FloatingDataPoint x={40} y={-40} delay={1} />
              <FloatingDataPoint x={50} y={30} delay={2} />
              <FloatingDataPoint x={-30} y={50} delay={3} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const NeuralBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* Gradient Mesh */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#f5f5f5_0%,#ffffff_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#000000_100%)] opacity-80" />

      {/* Grid Lines */}
      <div className="absolute w-full h-full bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  )
}

const FloatingDataPoint: React.FC<{ x: number, y: number, delay: number }> = ({ x, y, delay }) => {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-12 h-12 bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded-lg flex items-center justify-center shadow-lg"
      animate={{
        x: x * 2,
        y: y * 2,
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 4,
        delay: delay,
        ease: "easeInOut"
      }}
      style={{ marginLeft: -24, marginTop: -24 }} // Center pivot
    >
      <div className="w-2 h-2 bg-blue-500 rounded-full" />
    </motion.div>
  )
}
