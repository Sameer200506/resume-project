import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { TrendingUp, AlertTriangle, Target, Shield } from 'lucide-react'
import type { PortfolioData, SWOTItem } from '../data/portfolio-data'
import { SectionHeader } from './About'

const SWOT_CONFIG = [
  {
    key: 'strengths' as const,
    label: 'Strengths',
    icon: TrendingUp,
    color: 'hsl(142 71% 45%)',
    bg: 'hsl(142 71% 45% / 0.08)',
    border: 'hsl(142 71% 45% / 0.25)',
    tag: 'S',
    description: 'Internal positive factors',
  },
  {
    key: 'weaknesses' as const,
    label: 'Weaknesses',
    icon: AlertTriangle,
    color: 'hsl(38 92% 50%)',
    bg: 'hsl(38 92% 50% / 0.08)',
    border: 'hsl(38 92% 50% / 0.25)',
    tag: 'W',
    description: 'Internal areas for growth',
  },
  {
    key: 'opportunities' as const,
    label: 'Opportunities',
    icon: Target,
    color: 'hsl(217 91% 60%)',
    bg: 'hsl(217 91% 60% / 0.08)',
    border: 'hsl(217 91% 60% / 0.25)',
    tag: 'O',
    description: 'External positive possibilities',
  },
  {
    key: 'threats' as const,
    label: 'Threats',
    icon: Shield,
    color: 'hsl(0 72% 51%)',
    bg: 'hsl(0 72% 51% / 0.08)',
    border: 'hsl(0 72% 51% / 0.25)',
    tag: 'T',
    description: 'External challenges',
  },
]

function SWOTQuadrant({
  config,
  items,
  index,
}: {
  config: (typeof SWOT_CONFIG)[0]
  items: SWOTItem[]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [expanded, setExpanded] = useState(true)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden"
      style={{ borderColor: config.border, background: config.bg }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        {/* Tag circle */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-lg"
          style={{ background: `${config.color}20`, color: config.color, border: `2px solid ${config.border}` }}
        >
          {config.tag}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <config.icon className="w-4 h-4" style={{ color: config.color }} />
            <h3 className="font-display font-bold text-base" style={{ color: config.color }}>
              {config.label}
            </h3>
          </div>
          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {config.description}
          </p>
        </div>

        <div
          className="text-xs font-mono px-2 py-1 rounded-full"
          style={{ background: `${config.color}15`, color: config.color }}
        >
          {items.length} items
        </div>
      </button>

      {/* Items */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-5 pb-5 space-y-2.5" style={{ borderTop: `1px solid ${config.border}`, paddingTop: '1rem' }}>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2.5"
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                style={{ background: `${config.color}15`, color: config.color }}
              >
                {i + 1}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SWOT({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      id="swot"
      className="py-24 sm:py-32 relative"
      style={{ background: 'hsl(var(--background-deep))' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            tag="// self.analysis"
            title={<>SWOT <span className="text-gradient-blue">Analysis</span></>}
            subtitle="An honest self-assessment of strengths, growth areas, opportunities, and challenges"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {SWOT_CONFIG.map((config, i) => (
            <SWOTQuadrant
              key={config.key}
              config={config}
              items={data.swot[config.key]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
