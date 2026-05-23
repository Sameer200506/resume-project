import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import type { PortfolioData, ResearchInterest } from '../data/portfolio-data'
import { SectionHeader } from './About'

const CATEGORY_COLORS: Record<string, string> = {
  'Simulation': 'hsl(217 91% 60%)',
  'Engineering': 'hsl(192 91% 43%)',
  'AI & Engineering': 'hsl(258 90% 66%)',
  'Sustainability': 'hsl(142 71% 45%)',
  'Industry 4.0': 'hsl(38 92% 50%)',
}

function ResearchCard({ interest, index }: { interest: ResearchInterest; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)
  const color = CATEGORY_COLORS[interest.category] ?? 'hsl(217 91% 60%)'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card p-5 cursor-default transition-all duration-300"
      style={{
        borderColor: hovered ? `${color}40` : 'transparent',
        boxShadow: hovered ? `0 0 30px ${color}18` : undefined,
        transform: hovered ? 'translateY(-4px)' : undefined,
      }}
    >
      {/* Icon */}
      <div
        className="text-2xl mb-3 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          background: `${color}14`,
          border: `1px solid ${color}25`,
          fontSize: '1.25rem',
        }}
      >
        {interest.icon}
      </div>

      {/* Category pill */}
      <span
        className="text-xs font-mono px-2 py-0.5 rounded-full mb-2 inline-block"
        style={{ background: `${color}14`, color, border: `1px solid ${color}25` }}
      >
        {interest.category}
      </span>

      <h3 className="font-display font-semibold text-sm mb-2 leading-snug" style={{ color: 'hsl(var(--foreground))' }}>
        {interest.title}
      </h3>

      <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {interest.description}
      </p>

      {/* Bottom accent line */}
      <div
        className="h-0.5 mt-4 rounded-full transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />
    </motion.div>
  )
}

export default function ResearchInterests({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      id="research"
      className="py-24 sm:py-32 relative"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 30% 50%, hsl(192 91% 43% / 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            tag="// research.interests"
            title={<>Research <span className="text-gradient-blue">Frontiers</span></>}
            subtitle="Areas of deep curiosity driving my engineering and AI exploration"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.researchInterests.map((interest, i) => (
            <ResearchCard key={interest.id} interest={interest} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
