import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Cpu, Code2, Globe, Bot, Palette, FlaskConical } from 'lucide-react'
import type { PortfolioData, SkillCategory } from '../data/portfolio-data'
import { SectionHeader } from './About'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'cad-engineering': Cpu,
  'programming': Code2,
  'web-development': Globe,
  'ai-automation': Bot,
  'design': Palette,
  'engineering-concepts': FlaskConical,
}

const CATEGORY_COLORS: Record<string, { from: string; via: string }> = {
  'cad-engineering':    { from: 'hsl(217 91% 60%)', via: 'hsl(192 91% 43%)' },
  'programming':        { from: 'hsl(258 90% 66%)', via: 'hsl(217 91% 60%)' },
  'web-development':    { from: 'hsl(192 91% 43%)', via: 'hsl(142 71% 45%)' },
  'ai-automation':      { from: 'hsl(258 90% 66%)', via: 'hsl(192 91% 43%)' },
  'design':             { from: 'hsl(340 80% 60%)', via: 'hsl(258 90% 66%)' },
  'engineering-concepts': { from: 'hsl(38 92% 50%)', via: 'hsl(217 91% 60%)' },
}

function SkillBar({ name, level = 75, delay = 0, colors }: { name: string; level?: number; delay?: number; colors: { from: string; via: string } }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: 'hsl(var(--foreground))' }}>{name}</span>
        <span className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: `linear-gradient(90deg, ${colors.from}, ${colors.via})`,
            transformOrigin: 'left',
          }}
        />
      </div>
    </div>
  )
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)
  const Icon = CATEGORY_ICONS[category.id] ?? Cpu
  const colors = CATEGORY_COLORS[category.id] ?? { from: 'hsl(217 91% 60%)', via: 'hsl(192 91% 43%)' }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card p-6 transition-all duration-300"
      style={{
        borderColor: hovered ? `${colors.from}40` : undefined,
        boxShadow: hovered ? `0 0 30px ${colors.from}15, 0 8px 32px hsl(0 0% 0% / 0.4)` : undefined,
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${colors.from}20, ${colors.via}20)`,
            border: `1px solid ${colors.from}30`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: colors.from }} />
        </div>
        <h3 className="font-display font-semibold text-base" style={{ color: 'hsl(var(--foreground))' }}>
          {category.title}
        </h3>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        {category.skills.map((skill, si) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={si * 0.06}
            colors={colors}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      id="skills"
      className="py-24 sm:py-32 relative"
      style={{ background: 'hsl(var(--background-deep))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, hsl(258 90% 66% / 0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            tag="// skills.stack"
            title={<>Technical <span className="text-gradient-blue">Arsenal</span></>}
            subtitle="A diverse skill set spanning engineering simulation, programming, AI, and modern web development"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.skills.map((category, i) => (
            <SkillCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
