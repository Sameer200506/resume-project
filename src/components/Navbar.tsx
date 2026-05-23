import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Download, Github, Linkedin, ChevronRight } from 'lucide-react'
import type { PortfolioData } from '../data/portfolio-data'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

function useActiveSection() {
  const [activeId, setActiveId] = useState('')
  useEffect(() => {
    const handler = () => {
      const ids = NAV_LINKS.map(l => l.id)
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return activeId
}

export default function Navbar({ data }: { data: PortfolioData }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useActiveSection()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleResumeDownload = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
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
  }, [data.personal.resumeUrl, data.personal.name])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-blue-cyan flex items-center justify-center text-white font-bold text-sm font-mono">
                MS
              </div>
              <span className="font-display font-semibold text-sm hidden sm:block" style={{ color: 'hsl(var(--foreground))' }}>
                {data.personal.name}
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeId === link.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                  style={{
                    color: activeId === link.id ? 'hsl(var(--primary))' : undefined,
                    background: activeId === link.id ? 'hsl(var(--primary) / 0.1)' : undefined,
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + Social */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={data.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/5"
                style={{ color: 'hsl(var(--muted-foreground))' }}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={data.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/5"
                style={{ color: 'hsl(var(--muted-foreground))' }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={handleResumeDownload}
                className="btn btn-primary text-xs px-3 py-1.5 gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
              style={{ color: 'hsl(var(--foreground))' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 nav-glass border-t"
            style={{ borderColor: 'hsl(var(--border))' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    color: activeId === link.id ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                    background: activeId === link.id ? 'hsl(var(--primary) / 0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              ))}
              <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                <a href={data.personal.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline flex-1 text-xs py-2">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href="#" onClick={handleResumeDownload}
                  className="btn btn-primary flex-1 text-xs py-2">
                  <Download className="w-4 h-4" /> Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
