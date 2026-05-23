import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { MapPin, Mail, Phone, Zap, Heart } from 'lucide-react'
import type { PortfolioData } from '../data/portfolio-data'

function SectionHeader({ tag, title, subtitle }: { tag: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
      <span className="section-tag mb-4">{tag}</span>
      <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'hsl(var(--foreground))' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl" style={{ color: 'hsl(var(--muted-foreground))' }}>{subtitle}</p>
      )}
    </div>
  )
}

function AnimatedCard({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  const { about, personal } = data

  return (
    <section id="about" className="py-24 sm:py-32 relative" style={{ background: 'hsl(var(--background))' }}>
      {/* Subtle bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, hsl(217 91% 60% / 0.05) 0%, transparent 70%)',
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
            tag="// about.me"
            title={<>Who I <span className="text-gradient-blue">Am</span></>}
            subtitle="Multidisciplinary engineer bridging the gap between physical simulation and digital intelligence"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Bio */}
          <div className="space-y-6">
            {about.bio.map((paragraph, i) => (
              <AnimatedCard key={i} delay={i * 0.1}>
                <p className="leading-relaxed" style={{ fontSize: '1.0rem', color: 'hsl(var(--muted-foreground))' }}>
                  {paragraph}
                </p>
              </AnimatedCard>
            ))}

            {/* Contact info */}
            <AnimatedCard delay={0.3}>
              <div className="glass-card p-5 space-y-3">
                <p className="text-xs font-mono mb-4 uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                  Contact Info
                </p>
                <div className="flex items-center gap-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--primary))' }} />
                  <span className="text-sm">{personal.location}</span>
                </div>
                <div className="flex items-center gap-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--cyan))' }} />
                  <a href={`mailto:${personal.email}`} className="text-sm hover:underline" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {personal.email}
                  </a>
                </div>
                <div className="flex items-center gap-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                  <span className="text-sm">{personal.phone}</span>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Right — Highlights + Interests */}
          <div className="space-y-6">
            {/* Highlights */}
            <AnimatedCard delay={0.15}>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Zap className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
                  <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'hsl(var(--primary))' }}>
                    Core Strengths
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {about.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i, duration: 0.4 }}
                      className="flex items-center gap-2 py-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'hsl(var(--primary))' }} />
                      <span className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedCard>

            {/* Interests */}
            <AnimatedCard delay={0.25}>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Heart className="w-4 h-4" style={{ color: 'hsl(var(--accent))' }} />
                  <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'hsl(var(--accent))' }}>
                    Passions & Interests
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {about.interests.map((interest, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.04 * i, duration: 0.3 }}
                      className="badge badge-purple"
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedCard>

            {/* Stats */}
            <AnimatedCard delay={0.35}>
              <div className="grid grid-cols-2 gap-3">
                {data.about.stats.map((stat, i) => (
                  <div key={i} className="glass-card p-5 text-center">
                    <div className="font-display font-bold mb-1 text-gradient-blue" style={{ fontSize: '1.8rem' }}>
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  )
}

// Export SectionHeader for reuse
export { SectionHeader, AnimatedCard }
