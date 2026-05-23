import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Download, Github, Mail, ChevronDown, Cpu, Wind, Bot, Layers } from 'lucide-react'
import type { PortfolioData } from '../data/portfolio-data'

// ─── Grid Snakes (CFD-inspired particle trails) ────────────────────────────
const GRID = 28
const SNAKE_COUNT = 4
const SNAKE_LENGTH = 10
const TICK_MS = 150
const DIRS: [number, number][] = [[1,0],[-1,0],[0,1],[0,-1]]

function GridSnakes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    const resize = () => { canvas.width = parent.clientWidth; canvas.height = parent.clientHeight }
    resize()
    window.addEventListener('resize', resize)
    const cols = () => Math.floor(canvas.width / GRID)
    const rows = () => Math.floor(canvas.height / GRID)
    type Snake = { trail: [number, number][]; dir: [number, number]; color: string }
    const colors = ['59,130,246','6,182,212','139,92,246','6,182,212']
    const snakes: Snake[] = Array.from({ length: SNAKE_COUNT }, (_, idx) => ({
      trail: [[Math.floor(Math.random() * cols()), Math.floor(Math.random() * rows())]],
      dir: DIRS[Math.floor(Math.random() * 4)],
      color: colors[idx % colors.length]
    }))
    let interval: ReturnType<typeof setInterval> | null = null
    const tick = () => {
      const c = cols(); const r = rows()
      for (const snake of snakes) {
        if (Math.random() < 0.25) snake.dir = DIRS[Math.floor(Math.random() * 4)]
        const [hx, hy] = snake.trail[snake.trail.length - 1]
        let nx = hx + snake.dir[0]; let ny = hy + snake.dir[1]
        if (nx < 0) nx = c - 1; if (nx >= c) nx = 0
        if (ny < 0) ny = r - 1; if (ny >= r) ny = 0
        snake.trail.push([nx, ny])
        if (snake.trail.length > SNAKE_LENGTH) snake.trail.shift()
      }
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const snake of snakes) {
        for (let i = 0; i < snake.trail.length; i++) {
          const [gx, gy] = snake.trail[i]
          const alpha = ((i + 1) / snake.trail.length) * 0.45
          ctx.beginPath()
          ctx.arc(gx * GRID + GRID / 2, gy * GRID + GRID / 2, 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${snake.color},${alpha})`
          ctx.fill()
        }
      }
    }
    const start = () => { if (!interval) interval = setInterval(tick, TICK_MS) }
    const stop  = () => { if (interval) { clearInterval(interval); interval = null } }
    const io = new IntersectionObserver(entries => {
      entries[0].isIntersecting ? start() : stop()
    }, { threshold: 0 })
    io.observe(canvas)
    document.addEventListener('visibilitychange', () =>
      document.visibilityState === 'visible' ? start() : stop())
    return () => { stop(); io.disconnect(); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}

// ─── Typewriter Hook ────────────────────────────────────────────────────────
function useTypewriter(roles: string[], { typeSpeed = 75, deleteSpeed = 50, pauseAfterType = 2200, pauseAfterDelete = 350 } = {}) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState(roles[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const currentRole = roles[roleIndex]
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterType)
    } else if (isDeleting && displayText === '') {
      timeout = setTimeout(() => { setRoleIndex(i => (i + 1) % roles.length); setIsDeleting(false) }, pauseAfterDelete)
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        const words = displayText.trimEnd().split(' ')
        words.pop()
        setDisplayText(words.length > 0 ? words.join(' ') + ' ' : '')
      }, deleteSpeed)
    } else {
      timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), typeSpeed)
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete])
  return { displayText, roleIndex }
}

// ─── Floating Particles ─────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 1.5 + Math.random() * 3,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
  color: ['59,130,246','6,182,212','139,92,246'][i % 3],
}))

// ─── Role Icons ─────────────────────────────────────────────────────────────
const ROLE_ICONS: Record<string, React.ElementType> = {
  'Mechanical Engineer': Cpu,
  'CFD Enthusiast': Wind,
  'AI Builder': Bot,
  'CAD Designer': Layers,
  'Full Stack Developer': Layers,
  'Automation Developer': Bot,
  'Engineering Innovator': Cpu,
  'Simulation Engineer': Wind,
}

export default function Hero({ data }: { data: PortfolioData }) {
  const { displayText, roleIndex } = useTypewriter(data.hero.roles)
  const RoleIcon = ROLE_ICONS[data.hero.roles[roleIndex]] ?? Cpu
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const scrollToSection = (href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      const el = document.getElementById(href.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCtaClick = (btn: typeof data.hero.ctaButtons[0], e: React.MouseEvent) => {
    if (btn.label === 'Download Resume') {
      e.preventDefault()
      const url = data.personal.resumeUrl
      if (url === '__embedded__') {
        const base64 = localStorage.getItem('ms_resume_pdf')
        if (base64) {
          const link = document.createElement('a')
          link.href = base64
          link.download = `${data.personal.name.replace(/\s+/g, '_')}_Resume.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          alert('No resume PDF uploaded yet. Please upload it in the Admin Panel under Personal Info.')
        }
      } else if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        alert('No resume link or PDF configured. Please configure it in the Admin Panel under Personal Info.')
      }
    } else {
      scrollToSection(btn.href)
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'hsl(var(--background-deep))' }}
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* CFD particle trails */}
      <GridSnakes />

      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div
          className="absolute rounded-full"
          style={{
            width: '600px', height: '600px',
            left: '15%', top: '-10%',
            background: 'radial-gradient(circle, hsl(217 91% 60% / 0.12) 0%, transparent 70%)',
            animation: 'orb-float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '500px', height: '500px',
            right: '10%', bottom: '0%',
            background: 'radial-gradient(circle, hsl(258 90% 66% / 0.10) 0%, transparent 70%)',
            animation: 'orb-float 10s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '350px', height: '350px',
            left: '60%', top: '40%',
            background: 'radial-gradient(circle, hsl(192 91% 43% / 0.08) 0%, transparent 70%)',
            animation: 'orb-float 7s ease-in-out infinite 2s',
          }}
        />
      </div>

      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          {PARTICLES.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left, top: p.top,
                width: `${p.size}px`, height: `${p.size}px`,
                background: `rgba(${p.color}, 0.6)`,
                animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
                boxShadow: `0 0 ${p.size * 3}px rgba(${p.color}, 0.4)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Hero content */}
      <div className="relative flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20 pb-10" style={{ zIndex: 3 }}>
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-tag mb-8"
        >
          <span className="animate-pulse-dot w-2 h-2 rounded-full" style={{ background: 'hsl(var(--primary))' }} />
          Mechanical Engineering · AI · Innovation
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-bold leading-none tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          <span style={{ color: 'hsl(var(--foreground))' }}>Mohammed </span>
          <span className="text-gradient-blue">Sameer</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center gap-3 mb-6"
          style={{ minHeight: '2.5rem' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'hsl(var(--primary) / 0.15)', border: '1px solid hsl(var(--primary) / 0.3)' }}
          >
            <RoleIcon className="w-4 h-4" style={{ color: 'hsl(var(--primary))' }} />
          </div>
          <p
            className="font-mono font-medium"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'hsl(var(--cyan))' }}
          >
            {displayText}
            <span className="ml-0.5 opacity-80" style={{ animation: 'blink 1s step-end infinite', color: 'hsl(var(--cyan))' }}>▊</span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="max-w-2xl mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'hsl(var(--muted-foreground))' }}
        >
          {data.hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {data.hero.ctaButtons.map((btn, i) => (
            <button
              key={i}
              onClick={(e) => handleCtaClick(btn, e)}
              className={`btn btn-${btn.variant}`}
            >
              {btn.label === 'Download Resume' && <Download className="w-4 h-4" />}
              {btn.label === 'GitHub' && <Github className="w-4 h-4" />}
              {btn.label === 'Contact Me' && <Mail className="w-4 h-4" />}
              {btn.label}
            </button>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl"
        >
          {data.about.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card flex flex-col items-center p-4"
            >
              <span className="font-display font-bold text-gradient-blue" style={{ fontSize: '1.5rem' }}>
                {stat.value}
              </span>
              <span className="text-xs mt-1 font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-12 flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: 'hsl(var(--muted-foreground))' }}
          aria-label="Scroll down"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-float" />
        </motion.button>
      </div>
    </section>
  )
}
