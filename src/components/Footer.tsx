import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import type { PortfolioData } from '../data/portfolio-data'

export default function Footer({ data }: { data: PortfolioData }) {
  const { personal } = data
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative py-10 border-t"
      style={{ background: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs font-mono"
              style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(192 91% 43%))' }}
            >
              MS
            </div>
            <span className="text-sm font-display font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {personal.name}
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs flex items-center gap-1.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
            © {year} Built with
            <Heart className="w-3 h-3" style={{ color: 'hsl(0 72% 51%)' }} />
            by {personal.name}
          </p>

          {/* Socials + scroll top */}
          <div className="flex items-center gap-3">
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ color: 'hsl(var(--muted-foreground))', background: 'hsl(0 0% 100% / 0.05)' }}>
              <Github className="w-4 h-4" />
            </a>
            <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ color: 'hsl(var(--muted-foreground))', background: 'hsl(0 0% 100% / 0.05)' }}>
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={`mailto:${personal.email}`} aria-label="Email"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ color: 'hsl(var(--muted-foreground))', background: 'hsl(0 0% 100% / 0.05)' }}>
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ color: 'hsl(var(--primary))', background: 'hsl(217 91% 60% / 0.1)', border: '1px solid hsl(217 91% 60% / 0.2)' }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
