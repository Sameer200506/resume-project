import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import type { PortfolioData } from '../data/portfolio-data'
import { SectionHeader } from './About'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact({ data }: { data: PortfolioData }) {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const { personal, contact } = data

  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    try {
      // If EmailJS is configured, use it; otherwise fallback to mailto
      if (contact.emailjsServiceId !== 'YOUR_SERVICE_ID' && (window as any).emailjs) {
        await (window as any).emailjs.send(
          contact.emailjsServiceId,
          contact.emailjsTemplateId,
          { from_name: form.name, from_email: form.email, message: form.message, to_email: contact.email },
          contact.emailjsPublicKey
        )
      } else {
        // Mailto fallback — always works
        window.location.href = `mailto:${contact.email}?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
      }
      setFormState('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setFormState('error')
    }
    setTimeout(() => setFormState('idle'), 4000)
  }

  const CONTACT_ITEMS = [
    {
      icon: Mail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: 'hsl(217 91% 60%)',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`,
      color: 'hsl(192 91% 43%)',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      href: '#',
      color: 'hsl(258 90% 66%)',
    },
  ]

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative"
      style={{ background: 'hsl(var(--background-deep))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(217 91% 60% / 0.07) 0%, transparent 60%)',
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
            tag="// contact.init"
            title={<>Let's <span className="text-gradient-blue">Connect</span></>}
            subtitle={contact.availability}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — contact info */}
          <div className="space-y-5">
            {CONTACT_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-5 flex items-center gap-4 group block"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${item.color}14`, border: `1px solid ${item.color}25` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-xs font-mono mb-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {item.label}
                  </p>
                  <p className="font-medium text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass-card p-5"
            >
              <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Social Links
              </p>
              <div className="flex gap-3">
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'hsl(0 0% 100% / 0.06)',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))',
                  }}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'hsl(217 91% 60% / 0.12)',
                    color: 'hsl(217 91% 60%)',
                    border: '1px solid hsl(217 91% 60% / 0.2)',
                  }}
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card p-7"
            style={{ borderColor: 'hsl(217 91% 60% / 0.15)' }}
          >
            <h3 className="font-display font-semibold text-base mb-5" style={{ color: 'hsl(var(--foreground))' }}>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="input-dark"
                />
              </div>
              <div>
                <label className="text-xs font-mono mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="input-dark"
                />
              </div>
              <div>
                <label className="text-xs font-mono mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project, opportunity, or just say hello..."
                  className="input-dark resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formState === 'loading'}
                className="btn btn-primary w-full"
              >
                {formState === 'loading' ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : formState === 'success' ? (
                  <><CheckCircle className="w-4 h-4" /> Message Sent!</>
                ) : formState === 'error' ? (
                  <><AlertCircle className="w-4 h-4" /> Error — Try Again</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
