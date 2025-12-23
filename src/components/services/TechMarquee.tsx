import React from 'react'

const technologies = [
    'Python', 'PyTorch', 'OpenAI', 'TensorFlow', 'React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker', 'AWS', 'Hugging Face'
]

export const TechMarquee: React.FC = () => {
    return (
        <div className="relative py-4 bg-neutral-950 border-y border-neutral-800 overflow-hidden font-mono">
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />

            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        {technologies.map((tech) => (
                            <div
                                key={`${i}-${tech}`}
                                className="mx-6 flex items-center gap-2 text-neutral-500 text-sm tracking-wider uppercase"
                            >
                                <span className="text-blue-500 font-bold">&gt;</span>
                                <span className="text-neutral-300 group-hover:text-white transition-colors">
                                    {tech.toUpperCase()}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
        </div>
    )
}
