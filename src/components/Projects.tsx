import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Github, ExternalLink, Wind, Layers, Globe, Bot, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import type { PortfolioData, Project } from '../data/portfolio-data'
import { SectionHeader } from './About'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'CFD Simulation': Wind,
  'CAD Design': Layers,
  'Web Development': Globe,
  'AI & Automation': Bot,
}

const CARD_COLORS = [
  {
    primary: 'hsl(217 91% 60%)',
    gradient: 'linear-gradient(135deg, hsl(217 91% 60% / 0.15), hsl(192 91% 43% / 0.10))',
    border: 'hsl(217 91% 60% / 0.25)',
    glow: 'hsl(217 91% 60% / 0.12)',
  },
  {
    primary: 'hsl(258 90% 66%)',
    gradient: 'linear-gradient(135deg, hsl(258 90% 66% / 0.15), hsl(217 91% 60% / 0.10))',
    border: 'hsl(258 90% 66% / 0.25)',
    glow: 'hsl(258 90% 66% / 0.12)',
  },
  {
    primary: 'hsl(192 91% 43%)',
    gradient: 'linear-gradient(135deg, hsl(192 91% 43% / 0.15), hsl(142 71% 45% / 0.10))',
    border: 'hsl(192 91% 43% / 0.25)',
    glow: 'hsl(192 91% 43% / 0.12)',
  },
  {
    primary: 'hsl(258 90% 66%)',
    gradient: 'linear-gradient(135deg, hsl(258 90% 66% / 0.15), hsl(192 91% 43% / 0.10))',
    border: 'hsl(258 90% 66% / 0.25)',
    glow: 'hsl(258 90% 66% / 0.12)',
  },
]

function StatusBadge({ status }: { status: Project['status'] }) {
  const config = {
    completed: { label: 'Completed', icon: CheckCircle, color: 'hsl(142 71% 45%)' },
    'in-progress': { label: 'In Progress', icon: Clock, color: 'hsl(38 92% 50%)' },
    planned: { label: 'Planned', icon: Clock, color: 'hsl(var(--muted-foreground))' },
  }[status]

  return (
    <div className="flex items-center gap-1.5 text-xs font-mono" style={{ color: config.color }}>
      <config.icon className="w-3 h-3" />
      {config.label}
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const color = CARD_COLORS[index % CARD_COLORS.length]
  const Icon = CATEGORY_ICONS[project.category] ?? Globe

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-card group"
      style={{
        borderColor: hovered ? color.border : 'hsl(0 0% 100% / 0.08)',
        boxShadow: hovered ? `0 20px 60px hsl(0 0% 0% / 0.5), 0 0 40px ${color.glow}` : undefined,
      }}
    >
      {/* Top gradient band */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, ${color.primary}, hsl(192 91% 43%))` }}
      />

      {/* Card background */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{ background: color.gradient, opacity: hovered ? 1 : 0 }}
      />

      <div className="relative p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${color.primary}18`, border: `1px solid ${color.primary}30` }}
            >
              <Icon className="w-5 h-5" style={{ color: color.primary }} />
            </div>
            <div>
              <span
                className="text-xs font-mono block mb-0.5"
                style={{ color: color.primary }}
              >
                {project.category}
              </span>
              <StatusBadge status={project.status} />
            </div>
          </div>
          <div className="flex gap-2">
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'hsl(0 0% 100% / 0.06)', color: 'hsl(var(--muted-foreground))' }}
                onClick={e => e.stopPropagation()}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'hsl(0 0% 100% / 0.06)', color: 'hsl(var(--muted-foreground))' }}
                onClick={e => e.stopPropagation()}
                aria-label="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-lg mb-3 leading-snug transition-colors"
          style={{ color: hovered ? color.primary : 'hsl(var(--foreground))' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 5).map(tag => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full font-mono"
              style={{
                background: `${color.primary}12`,
                color: color.primary,
                border: `1px solid ${color.primary}25`,
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span
              className="text-xs px-2.5 py-0.5 rounded-full font-mono"
              style={{ background: 'hsl(0 0% 100% / 0.05)', color: 'hsl(var(--muted-foreground))' }}
            >
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group-hover:gap-2.5"
          style={{ color: color.primary }}
        >
          View Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      id="projects"
      className="py-24 sm:py-32 relative"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, hsl(217 91% 60% / 0.06) 0%, transparent 70%)',
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
            tag="// projects.showcase"
            title={<>Featured <span className="text-gradient-blue">Projects</span></>}
            subtitle="Engineering simulations, CAD models, web applications, and AI experiments"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {data.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
