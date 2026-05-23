import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Award, ExternalLink, Calendar, Building2 } from 'lucide-react'
import type { PortfolioData, Certification } from '../data/portfolio-data'
import { SectionHeader } from './About'

const CERT_COLORS = [
  { primary: 'hsl(217 91% 60%)', bg: 'hsl(217 91% 60% / 0.08)', border: 'hsl(217 91% 60% / 0.2)' },
  { primary: 'hsl(258 90% 66%)', bg: 'hsl(258 90% 66% / 0.08)', border: 'hsl(258 90% 66% / 0.2)' },
  { primary: 'hsl(192 91% 43%)', bg: 'hsl(192 91% 43% / 0.08)', border: 'hsl(192 91% 43% / 0.2)' },
  { primary: 'hsl(38 92% 50%)',  bg: 'hsl(38 92% 50% / 0.08)',  border: 'hsl(38 92% 50% / 0.2)'  },
]

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const color = CERT_COLORS[index % CERT_COLORS.length]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card p-5 flex items-start gap-4 group transition-all duration-300"
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = color.border }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '' }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: color.bg, border: `1px solid ${color.border}` }}
      >
        <Award className="w-6 h-6" style={{ color: color.primary }} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display font-semibold text-sm mb-1 leading-snug" style={{ color: 'hsl(var(--foreground))' }}>
          {cert.name}
        </h3>
        <div className="flex flex-wrap gap-3 items-center mt-2">
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Building2 className="w-3.5 h-3.5" />
            {cert.issuer}
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <Calendar className="w-3.5 h-3.5" />
            {cert.year}
          </span>
          {cert.url && cert.url !== '#' && (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium transition-colors"
              style={{ color: color.primary }}
            >
              <ExternalLink className="w-3 h-3" />
              Verify
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Certifications({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      id="certifications"
      className="py-24 sm:py-32 relative"
      style={{ background: 'hsl(var(--background-deep))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, hsl(38 92% 50% / 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            tag="// certifications"
            title={<>Credentials & <span className="text-gradient-blue">Achievements</span></>}
            subtitle="Continuous learning and professional development through recognized programs"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {data.certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
