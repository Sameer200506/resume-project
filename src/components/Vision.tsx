import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Rocket, CheckCircle2 } from 'lucide-react'
import type { PortfolioData } from '../data/portfolio-data'
import { SectionHeader } from './About'

const GOAL_COLORS = [
  'hsl(217 91% 60%)',
  'hsl(192 91% 43%)',
  'hsl(258 90% 66%)',
  'hsl(142 71% 45%)',
  'hsl(38 92% 50%)',
]

function GoalCard({ goal, index }: { goal: PortfolioData['vision']['fiveYearGoals'][0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const color = GOAL_COLORS[index % GOAL_COLORS.length]

  return (
    <motion.div
      key={goal.id}
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-4 glass-card p-5"
      style={{ borderColor: `${color}20` }}
    >
      {/* Year marker */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-mono font-bold text-sm"
        style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}
      >
        Y{index + 1}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color }} />
          <h3 className="font-display font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
            {goal.title}
          </h3>
        </div>
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {goal.description}
        </p>
      </div>

      {/* Progress bar */}
      <div
        className="w-1 rounded-full self-stretch flex-shrink-0"
        style={{ background: `${color}25` }}
      >
        <div
          className="w-full rounded-full"
          style={{
            height: `${Math.max(30, 90 - index * 15)}%`,
            background: color,
            opacity: 0.6,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Vision({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      id="vision"
      className="py-24 sm:py-32 relative"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, hsl(258 90% 66% / 0.06) 0%, transparent 70%)',
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
            tag="// vision.future"
            title={<>Professional <span className="text-gradient-blue">Vision</span></>}
            subtitle="Where engineering meets AI to create the future"
          />
        </motion.div>

        {/* Long-term goal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 mb-10 relative overflow-hidden"
          style={{ borderColor: 'hsl(217 91% 60% / 0.2)' }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ background: 'linear-gradient(90deg, hsl(217 91% 60%), hsl(192 91% 43%), hsl(258 90% 66%))' }}
          />
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'hsl(217 91% 60% / 0.12)', border: '1px solid hsl(217 91% 60% / 0.25)' }}
            >
              <Rocket className="w-5 h-5" style={{ color: 'hsl(217 91% 60%)' }} />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'hsl(217 91% 60%)' }}>
                Long-Term Vision
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {data.vision.longTermGoal}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 5-year goals */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest mb-6"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Five-Year Milestones
          </motion.p>

          <div className="space-y-4">
            {data.vision.fiveYearGoals.map((goal, i) => (
              <GoalCard key={goal.id} goal={goal} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
