import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Tag } from 'lucide-react'
import type { PortfolioData, Experience as ExpType } from '../data/portfolio-data'
import { SectionHeader } from './About'

function ExperienceCard({ exp, index }: { exp: ExpType; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [expanded, setExpanded] = useState(index === 0)

  const colors = [
    { primary: 'hsl(217 91% 60%)', bg: 'hsl(217 91% 60% / 0.08)', border: 'hsl(217 91% 60% / 0.2)' },
    { primary: 'hsl(258 90% 66%)', bg: 'hsl(258 90% 66% / 0.08)', border: 'hsl(258 90% 66% / 0.2)' },
  ]
  const color = colors[index % colors.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden"
      style={{ borderColor: color.border }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full p-6 text-left flex items-start gap-4"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: color.bg, border: `1px solid ${color.border}` }}
        >
          <Briefcase className="w-5 h-5" style={{ color: color.primary }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display font-semibold text-base mb-0.5" style={{ color: 'hsl(var(--foreground))' }}>
                {exp.role}
              </h3>
              <p className="font-medium text-sm" style={{ color: color.primary }}>
                {exp.company}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="badge text-xs"
                style={{ background: color.bg, color: color.primary, border: `1px solid ${color.border}` }}
              >
                {exp.type}
              </span>
              <div style={{ color: 'hsl(var(--muted-foreground))' }}>
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <Calendar className="w-3.5 h-3.5" />
              {exp.duration}
            </span>
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <MapPin className="w-3.5 h-3.5" />
              {exp.location}
            </span>
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div
          className="px-6 pb-6"
          style={{ borderTop: `1px solid ${color.border}`, paddingTop: '1.25rem' }}
        >
          {/* Responsibilities */}
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: color.primary }}>
            Key Responsibilities
          </p>
          <ul className="space-y-2 mb-5">
            {exp.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color.primary }} />
                {r}
              </li>
            ))}
          </ul>

          {/* Skills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'hsl(var(--muted-foreground))' }} />
            {exp.skills.map(skill => (
              <span
                key={skill}
                className="badge text-xs"
                style={{ background: color.bg, color: color.primary, border: `1px solid ${color.border}` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      id="experience"
      className="py-24 sm:py-32 relative"
      style={{ background: 'hsl(var(--background-deep))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 30%, hsl(258 90% 66% / 0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            tag="// work.experience"
            title={<>Professional <span className="text-gradient-blue">Experience</span></>}
            subtitle="Hands-on internship experience in engineering design and creative industries"
          />
        </motion.div>

        <div className="space-y-5">
          {data.experience.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
