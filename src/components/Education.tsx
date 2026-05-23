import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'
import type { PortfolioData, Education as EducationType } from '../data/portfolio-data'
import { SectionHeader } from './About'

function EducationCard({ edu, index }: { edu: EducationType; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const colors = [
    { primary: 'hsl(217 91% 60%)', bg: 'hsl(217 91% 60% / 0.08)', border: 'hsl(217 91% 60% / 0.2)' },
    { primary: 'hsl(192 91% 43%)', bg: 'hsl(192 91% 43% / 0.08)', border: 'hsl(192 91% 43% / 0.2)' },
    { primary: 'hsl(258 90% 66%)', bg: 'hsl(258 90% 66% / 0.08)', border: 'hsl(258 90% 66% / 0.2)' },
  ]
  const color = colors[index % colors.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5"
    >
      {/* Timeline dot & line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center z-10"
          style={{ background: color.bg, border: `2px solid ${color.border}` }}
        >
          <GraduationCap className="w-5 h-5" style={{ color: color.primary }} />
        </div>
        {index < 2 && (
          <div className="w-px flex-1 mt-3" style={{ background: `linear-gradient(to bottom, ${color.border}, transparent)` }} />
        )}
      </div>

      {/* Card */}
      <div
        className="glass-card p-6 flex-1 mb-6"
        style={{ borderColor: color.border }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display font-semibold text-base mb-1" style={{ color: 'hsl(var(--foreground))' }}>
              {edu.degree}
            </h3>
            <p className="font-medium text-sm" style={{ color: color.primary }}>
              {edu.institution}
            </p>
          </div>
          {/* Score badge */}
          <div
            className="flex flex-col items-center px-4 py-2 rounded-xl flex-shrink-0"
            style={{ background: color.bg, border: `1px solid ${color.border}` }}
          >
            <span className="font-display font-bold text-lg" style={{ color: color.primary }}>
              {edu.score}
            </span>
            <span className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {edu.scoreLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Calendar className="w-3.5 h-3.5" />
            {edu.year}
          </div>
          {edu.description && (
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <MapPin className="w-3.5 h-3.5" />
              {edu.description}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Education({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      id="education"
      className="py-24 sm:py-32 relative"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 20% 50%, hsl(217 91% 60% / 0.05) 0%, transparent 70%)',
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
            tag="// education.log"
            title={<>Academic <span className="text-gradient-blue">Journey</span></>}
            subtitle="Building strong theoretical foundations in mechanical engineering and sciences"
          />
        </motion.div>

        <div className="space-y-0">
          {data.education.map((edu, i) => (
            <EducationCard key={edu.id} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
