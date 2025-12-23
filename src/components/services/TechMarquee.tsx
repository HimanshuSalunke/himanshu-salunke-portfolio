import React from 'react'

const technologies = [
    'Python', 'PyTorch', 'OpenAI', 'TensorFlow', 'React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker', 'AWS', 'Hugging Face'
]

export const TechMarquee: React.FC = () => {
    return (
        <div className="relative py-10 bg-neutral-950 border-y border-neutral-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950 z-10 pointer-events-none" />

            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center mx-4">
                        {technologies.map((tech) => (
                            <div
                                key={`${i}-${tech}`}
                                className="mx-8 flex items-center gap-2 text-neutral-200 font-medium text-xl hover:text-white transition-colors"
                            >
                                <div className="w-2 h-2 rounded-full bg-neutral-700" />
                                {tech}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Tailwind config must actully support animate-marquee or we add style tag */}
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
        </div>
    )
}
