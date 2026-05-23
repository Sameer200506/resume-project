import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import {
  User, Cpu, BookOpen, Briefcase, FolderGit2, Award, FlaskConical,
  BarChart2, Target, Mail, LogOut, Save, RotateCcw, X, Plus, Trash2,
  ExternalLink, AlertCircle, CheckCircle2, Eye, Download,
  Upload, FileText, Link
} from 'lucide-react'
import { useAdmin } from './AdminContext'
import type {
  PortfolioData, SkillCategory, Skill, Education, Experience,
  Project, Certification, ResearchInterest, SWOTItem
} from '../data/portfolio-data'

// ─── Shared input components ────────────────────────────────────────────────

function Field({
  label, value, onChange, type = 'text', placeholder = '', mono = false
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; mono?: boolean
}) {
  return (
    <div>
      <label className="text-xs font-mono mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input-dark ${mono ? 'font-mono text-xs' : ''}`}
      />
    </div>
  )
}

function TextareaField({
  label, value, onChange, rows = 3, placeholder = '', mono = false
}: {
  label: string; value: string; onChange: (v: string) => void;
  rows?: number; placeholder?: string; mono?: boolean
}) {
  return (
    <div>
      <label className="text-xs font-mono mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`input-dark resize-y ${mono ? 'font-mono text-xs' : ''}`}
      />
    </div>
  )
}
// ─── Section editors ────────────────────────────────────────────────────────

function PersonalEditor({ data, onChange }: { data: PortfolioData['personal']; onChange: (d: PortfolioData['personal']) => void }) {
  const u = (key: keyof typeof data, v: string) => onChange({ ...data, [key]: v })
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState('')

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setUploadMsg('Please upload a PDF file.')
      setTimeout(() => setUploadMsg(''), 3000)
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadMsg('File too large. Max 10 MB.')
      setTimeout(() => setUploadMsg(''), 3000)
      return
    }
    setUploading(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string
      // Store as data URL in localStorage (acts as an embedded resume)
      localStorage.setItem('ms_resume_pdf', base64)
      onChange({ ...data, resumeUrl: '__embedded__' })
      setUploadMsg('✅ Resume uploaded! Saved locally in browser.')
      setUploading(false)
      setTimeout(() => setUploadMsg(''), 5000)
    }
    reader.onerror = () => {
      setUploadMsg('Upload failed. Please try again.')
      setUploading(false)
      setTimeout(() => setUploadMsg(''), 3000)
    }
    reader.readAsDataURL(file)
    // Reset input so same file can be re-uploaded
    e.target.value = ''
  }

  const clearEmbeddedResume = () => {
    localStorage.removeItem('ms_resume_pdf')
    onChange({ ...data, resumeUrl: '#' })
    setUploadMsg('Resume cleared.')
    setTimeout(() => setUploadMsg(''), 3000)
  }

  const hasEmbedded = data.resumeUrl === '__embedded__' && !!localStorage.getItem('ms_resume_pdf')

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" value={data.name} onChange={v => u('name', v)} />
        <Field label="Title / Position" value={data.title} onChange={v => u('title', v)} />
        <Field label="Email" value={data.email} onChange={v => u('email', v)} type="email" />
        <Field label="Phone" value={data.phone} onChange={v => u('phone', v)} />
        <Field label="Location" value={data.location} onChange={v => u('location', v)} />
        <div className="sm:col-span-1">
          <Field label="Tagline" value={data.tagline} onChange={v => u('tagline', v)} />
        </div>
        <Field label="GitHub URL" value={data.githubUrl} onChange={v => u('githubUrl', v)} mono />
        <Field label="LinkedIn URL" value={data.linkedinUrl} onChange={v => u('linkedinUrl', v)} mono />
      </div>

      {/* Resume Section */}
      <div className="rounded-xl p-5 space-y-4"
        style={{ background: 'hsl(217 91% 60% / 0.05)', border: '1px solid hsl(217 91% 60% / 0.15)' }}>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" style={{ color: 'hsl(217 91% 60%)' }} />
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'hsl(217 91% 60%)' }}>
            Resume / CV
          </p>
        </div>

        {/* Option 1: Upload PDF */}
        <div>
          <p className="text-xs font-mono mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Option A — Upload PDF directly (stored in browser)
          </p>
          <div className="flex items-center gap-3">
            <label className="btn btn-secondary text-xs cursor-pointer flex-1 justify-center">
              {uploading
                ? <><span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" /> Uploading...</>
                : <><Upload className="w-3.5 h-3.5" /> {hasEmbedded ? 'Replace Resume PDF' : 'Upload Resume PDF'}</>
              }
              <input
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            {hasEmbedded && (
              <>
                <a
                  href={localStorage.getItem('ms_resume_pdf') ?? '#'}
                  download="Mohammed_Sameer_Resume.pdf"
                  className="btn btn-outline text-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Preview
                </a>
                <button onClick={clearEmbeddedResume} className="btn btn-outline text-xs"
                  style={{ color: 'hsl(0 72% 51%)' }}>
                  <X className="w-3.5 h-3.5" /> Clear
                </button>
              </>
            )}
          </div>
          {hasEmbedded && (
            <p className="text-xs mt-2 flex items-center gap-1.5"
              style={{ color: 'hsl(142 71% 45%)' }}>
              <CheckCircle2 className="w-3 h-3" /> Resume PDF is embedded
            </p>
          )}
        </div>

        {/* Option 2: External URL */}
        <div>
          <p className="text-xs font-mono mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Option B — Link to external URL (Google Drive, Dropbox, etc.)
          </p>
          <div className="flex items-center gap-2">
            <Link className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <input
              type="url"
              value={data.resumeUrl === '__embedded__' ? '' : data.resumeUrl}
              onChange={e => u('resumeUrl', e.target.value)}
              placeholder="https://drive.google.com/file/d/xxx/view"
              className="input-dark font-mono text-xs flex-1"
            />
          </div>
          <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Leave blank if you uploaded a PDF above.
          </p>
        </div>

        {/* Status message */}
        {uploadMsg && (
          <p className="text-xs font-mono" style={{
            color: uploadMsg.startsWith('✅') ? 'hsl(142 71% 45%)' : 'hsl(38 92% 50%)'
          }}>
            {uploadMsg}
          </p>
        )}
      </div>
    </div>
  )
}

function HeroEditor({ data, onChange }: { data: PortfolioData['hero']; onChange: (d: PortfolioData['hero']) => void }) {
  return (
    <div className="space-y-4">
      <TextareaField label="Hero Description" value={data.description} rows={2}
        onChange={v => onChange({ ...data, description: v })} />
      <div>
        <label className="text-xs font-mono mb-2 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Rotating Roles (one per line)
        </label>
        <textarea
          value={data.roles.join('\n')}
          onChange={e => onChange({ ...data, roles: e.target.value.split('\n').filter(Boolean) })}
          rows={data.roles.length + 1}
          className="input-dark font-mono text-xs resize-y"
          placeholder="Mechanical Engineer&#10;CFD Enthusiast"
        />
      </div>
    </div>
  )
}

function AboutEditor({ data, onChange }: { data: PortfolioData['about']; onChange: (d: PortfolioData['about']) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-mono mb-2 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Bio Paragraphs (one per line — blank line = new paragraph)
        </label>
        <textarea
          value={data.bio.join('\n\n')}
          onChange={e => onChange({ ...data, bio: e.target.value.split('\n\n').filter(Boolean) })}
          rows={6}
          className="input-dark resize-y"
        />
      </div>
      <div>
        <label className="text-xs font-mono mb-2 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Core Highlights (one per line)
        </label>
        <textarea
          value={data.highlights.join('\n')}
          onChange={e => onChange({ ...data, highlights: e.target.value.split('\n').filter(Boolean) })}
          rows={5}
          className="input-dark font-mono text-xs resize-y"
        />
      </div>
      <div>
        <label className="text-xs font-mono mb-2 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Interests (one per line)
        </label>
        <textarea
          value={data.interests.join('\n')}
          onChange={e => onChange({ ...data, interests: e.target.value.split('\n').filter(Boolean) })}
          rows={4}
          className="input-dark font-mono text-xs resize-y"
        />
      </div>
      <div>
        <label className="text-xs font-mono mb-3 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Stats
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <input
                value={stat.value}
                onChange={e => {
                  const s = [...data.stats]; s[i] = { ...s[i], value: e.target.value }
                  onChange({ ...data, stats: s })
                }}
                className="input-dark font-mono text-sm font-bold text-center"
                placeholder="Value"
              />
              <input
                value={stat.label}
                onChange={e => {
                  const s = [...data.stats]; s[i] = { ...s[i], label: e.target.value }
                  onChange({ ...data, stats: s })
                }}
                className="input-dark text-xs text-center"
                placeholder="Label"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillsEditor({ data, onChange }: { data: SkillCategory[]; onChange: (d: SkillCategory[]) => void }) {
  const addSkill = (catIdx: number) => {
    const next = [...data]
    next[catIdx] = { ...next[catIdx], skills: [...next[catIdx].skills, { name: 'New Skill', level: 70 }] }
    onChange(next)
  }
  const removeSkill = (catIdx: number, skillIdx: number) => {
    const next = [...data]
    next[catIdx] = { ...next[catIdx], skills: next[catIdx].skills.filter((_, i) => i !== skillIdx) }
    onChange(next)
  }
  const updateSkill = (catIdx: number, skillIdx: number, skill: Skill) => {
    const next = [...data]
    const skills = [...next[catIdx].skills]
    skills[skillIdx] = skill
    next[catIdx] = { ...next[catIdx], skills }
    onChange(next)
  }

  return (
    <div className="space-y-4">
      {data.map((cat, catIdx) => (
        <div key={cat.id} className="rounded-xl p-4 space-y-3"
          style={{ background: 'hsl(0 0% 100% / 0.03)', border: '1px solid hsl(var(--border))' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{cat.icon}</span>
              <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>{cat.title}</span>
            </div>
            <button onClick={() => addSkill(catIdx)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{ background: 'hsl(217 91% 60% / 0.1)', color: 'hsl(217 91% 60%)' }}>
              <Plus className="w-3 h-3" /> Add Skill
            </button>
          </div>
          <div className="space-y-2">
            {cat.skills.map((skill, si) => (
              <div key={si} className="flex items-center gap-2">
                <input value={skill.name}
                  onChange={e => updateSkill(catIdx, si, { ...skill, name: e.target.value })}
                  className="input-dark text-sm flex-1"
                  placeholder="Skill name"
                />
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono w-8 text-right" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {skill.level ?? 70}%
                  </span>
                  <input type="range" min={10} max={100} step={5}
                    value={skill.level ?? 70}
                    onChange={e => updateSkill(catIdx, si, { ...skill, level: Number(e.target.value) })}
                    className="w-20 accent-blue-500"
                  />
                </div>
                <button onClick={() => removeSkill(catIdx, si)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10"
                  style={{ color: 'hsl(0 72% 51%)' }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function EducationEditor({ data, onChange }: { data: Education[]; onChange: (d: Education[]) => void }) {
  const addItem = () => onChange([...data, { id: `edu-${Date.now()}`, degree: '', institution: '', year: '', score: '', scoreLabel: 'CGPA' }])
  const removeItem = (id: string) => onChange(data.filter(e => e.id !== id))
  const updateItem = (id: string, updates: Partial<Education>) =>
    onChange(data.map(e => e.id === id ? { ...e, ...updates } : e))

  return (
    <div className="space-y-4">
      {data.map((edu) => (
        <div key={edu.id} className="rounded-xl p-4 space-y-3"
          style={{ background: 'hsl(0 0% 100% / 0.03)', border: '1px solid hsl(var(--border))' }}>
          <div className="flex justify-between">
            <span className="text-xs font-mono" style={{ color: 'hsl(var(--primary))' }}>Entry</span>
            <button onClick={() => removeItem(edu.id)} className="text-xs"
              style={{ color: 'hsl(0 72% 51%)' }}>
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Degree" value={edu.degree} onChange={v => updateItem(edu.id, { degree: v })} />
            <Field label="Institution" value={edu.institution} onChange={v => updateItem(edu.id, { institution: v })} />
            <Field label="Year" value={edu.year} onChange={v => updateItem(edu.id, { year: v })} />
            <Field label="Description" value={edu.description ?? ''} onChange={v => updateItem(edu.id, { description: v })} />
            <Field label="Score" value={edu.score} onChange={v => updateItem(edu.id, { score: v })} />
            <Field label="Score Label" value={edu.scoreLabel} onChange={v => updateItem(edu.id, { scoreLabel: v })} />
          </div>
        </div>
      ))}
      <button onClick={addItem} className="btn btn-secondary w-full text-sm">
        <Plus className="w-4 h-4" /> Add Education Entry
      </button>
    </div>
  )
}

function ExperienceEditor({ data, onChange }: { data: Experience[]; onChange: (d: Experience[]) => void }) {
  const addItem = () => onChange([...data, {
    id: `exp-${Date.now()}`, role: '', company: '', location: '', duration: '',
    type: 'Internship', responsibilities: [''], skills: [''],
  }])
  const removeItem = (id: string) => onChange(data.filter(e => e.id !== id))
  const updateItem = (id: string, updates: Partial<Experience>) =>
    onChange(data.map(e => e.id === id ? { ...e, ...updates } : e))

  return (
    <div className="space-y-4">
      {data.map((exp) => (
        <div key={exp.id} className="rounded-xl p-4 space-y-3"
          style={{ background: 'hsl(0 0% 100% / 0.03)', border: '1px solid hsl(var(--border))' }}>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
              {exp.role || 'New Experience'}
            </span>
            <button onClick={() => removeItem(exp.id)}>
              <Trash2 className="w-3.5 h-3.5" style={{ color: 'hsl(0 72% 51%)' }} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Role" value={exp.role} onChange={v => updateItem(exp.id, { role: v })} />
            <Field label="Company" value={exp.company} onChange={v => updateItem(exp.id, { company: v })} />
            <Field label="Location" value={exp.location} onChange={v => updateItem(exp.id, { location: v })} />
            <Field label="Duration" value={exp.duration} onChange={v => updateItem(exp.id, { duration: v })} />
            <Field label="Type (Internship / Full-time)" value={exp.type} onChange={v => updateItem(exp.id, { type: v })} />
          </div>
          <TextareaField label="Responsibilities (one per line)" rows={4} mono
            value={exp.responsibilities.join('\n')}
            onChange={v => updateItem(exp.id, { responsibilities: v.split('\n').filter(Boolean) })}
          />
          <TextareaField label="Skills (comma separated)" rows={1} mono
            value={exp.skills.join(', ')}
            onChange={v => updateItem(exp.id, { skills: v.split(',').map(s => s.trim()).filter(Boolean) })}
          />
        </div>
      ))}
      <button onClick={addItem} className="btn btn-secondary w-full text-sm">
        <Plus className="w-4 h-4" /> Add Experience
      </button>
    </div>
  )
}

function ProjectsEditor({ data, onChange }: { data: Project[]; onChange: (d: Project[]) => void }) {
  const addItem = () => onChange([...data, {
    id: `proj-${Date.now()}`, title: '', description: '', category: 'Other',
    tags: [], githubUrl: '', featured: true, status: 'completed' as const,
  }])
  const removeItem = (id: string) => onChange(data.filter(p => p.id !== id))
  const updateItem = (id: string, updates: Partial<Project>) =>
    onChange(data.map(p => p.id === id ? { ...p, ...updates } : p))

  return (
    <div className="space-y-4">
      {data.map((proj) => (
        <div key={proj.id} className="rounded-xl p-4 space-y-3"
          style={{ background: 'hsl(0 0% 100% / 0.03)', border: '1px solid hsl(var(--border))' }}>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
              {proj.title || 'New Project'}
            </span>
            <button onClick={() => removeItem(proj.id)}>
              <Trash2 className="w-3.5 h-3.5" style={{ color: 'hsl(0 72% 51%)' }} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Title" value={proj.title} onChange={v => updateItem(proj.id, { title: v })} />
            <Field label="Category" value={proj.category} onChange={v => updateItem(proj.id, { category: v })} />
            <Field label="GitHub URL" value={proj.githubUrl} onChange={v => updateItem(proj.id, { githubUrl: v })} mono />
            <Field label="Demo URL" value={proj.demoUrl ?? ''} onChange={v => updateItem(proj.id, { demoUrl: v })} mono />
          </div>
          <TextareaField label="Short Description" value={proj.description} rows={2}
            onChange={v => updateItem(proj.id, { description: v })} />
          <TextareaField label="Long Description (optional)" value={proj.longDescription ?? ''} rows={3}
            onChange={v => updateItem(proj.id, { longDescription: v })} />
          <TextareaField label="Tags (comma separated)" value={proj.tags.join(', ')} rows={1} mono
            onChange={v => updateItem(proj.id, { tags: v.split(',').map(s => s.trim()).filter(Boolean) })} />
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <input type="checkbox" checked={proj.featured}
                onChange={e => updateItem(proj.id, { featured: e.target.checked })} />
              Featured
            </label>
            <select
              value={proj.status}
              onChange={e => updateItem(proj.id, { status: e.target.value as Project['status'] })}
              className="input-dark text-xs py-1"
              style={{ width: 'auto' }}
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
          </div>
        </div>
      ))}
      <button onClick={addItem} className="btn btn-secondary w-full text-sm">
        <Plus className="w-4 h-4" /> Add Project
      </button>
    </div>
  )
}

function CertificationsEditor({ data, onChange }: { data: Certification[]; onChange: (d: Certification[]) => void }) {
  const addItem = () => onChange([...data, { id: `cert-${Date.now()}`, name: '', issuer: '', year: '' }])
  const removeItem = (id: string) => onChange(data.filter(c => c.id !== id))
  const updateItem = (id: string, updates: Partial<Certification>) =>
    onChange(data.map(c => c.id === id ? { ...c, ...updates } : c))

  return (
    <div className="space-y-4">
      {data.map((cert) => (
        <div key={cert.id} className="rounded-xl p-4 space-y-3"
          style={{ background: 'hsl(0 0% 100% / 0.03)', border: '1px solid hsl(var(--border))' }}>
          <div className="flex justify-end">
            <button onClick={() => removeItem(cert.id)}>
              <Trash2 className="w-3.5 h-3.5" style={{ color: 'hsl(0 72% 51%)' }} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Certification Name" value={cert.name} onChange={v => updateItem(cert.id, { name: v })} />
            <Field label="Issuer" value={cert.issuer} onChange={v => updateItem(cert.id, { issuer: v })} />
            <Field label="Year" value={cert.year} onChange={v => updateItem(cert.id, { year: v })} />
            <Field label="Certificate URL" value={cert.url ?? ''} onChange={v => updateItem(cert.id, { url: v })} mono />
          </div>
        </div>
      ))}
      <button onClick={addItem} className="btn btn-secondary w-full text-sm">
        <Plus className="w-4 h-4" /> Add Certification
      </button>
    </div>
  )
}

function ResearchEditor({ data, onChange }: { data: ResearchInterest[]; onChange: (d: ResearchInterest[]) => void }) {
  const addItem = () => onChange([...data, { id: `ri-${Date.now()}`, title: '', category: '', icon: '🔬', description: '' }])
  const removeItem = (id: string) => onChange(data.filter(r => r.id !== id))
  const updateItem = (id: string, updates: Partial<ResearchInterest>) =>
    onChange(data.map(r => r.id === id ? { ...r, ...updates } : r))

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.id} className="rounded-xl p-4 space-y-3"
          style={{ background: 'hsl(0 0% 100% / 0.03)', border: '1px solid hsl(var(--border))' }}>
          <div className="flex justify-end">
            <button onClick={() => removeItem(item.id)}>
              <Trash2 className="w-3.5 h-3.5" style={{ color: 'hsl(0 72% 51%)' }} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Title" value={item.title} onChange={v => updateItem(item.id, { title: v })} />
            <Field label="Category" value={item.category} onChange={v => updateItem(item.id, { category: v })} />
            <Field label="Icon (emoji)" value={item.icon} onChange={v => updateItem(item.id, { icon: v })} />
          </div>
          <TextareaField label="Description" value={item.description} rows={2}
            onChange={v => updateItem(item.id, { description: v })} />
        </div>
      ))}
      <button onClick={addItem} className="btn btn-secondary w-full text-sm">
        <Plus className="w-4 h-4" /> Add Research Interest
      </button>
    </div>
  )
}

function SWOTEditor({ data, onChange }: { data: PortfolioData['swot']; onChange: (d: PortfolioData['swot']) => void }) {
  const updateList = (key: keyof typeof data, items: SWOTItem[]) => onChange({ ...data, [key]: items })
  const addItem = (key: keyof typeof data) =>
    updateList(key, [...data[key], { id: `swot-${Date.now()}`, text: '' }])
  const removeItem = (key: keyof typeof data, id: string) =>
    updateList(key, data[key].filter(i => i.id !== id))
  const updateItem = (key: keyof typeof data, id: string, text: string) =>
    updateList(key, data[key].map(i => i.id === id ? { ...i, text } : i))

  const KEYS = [
    { key: 'strengths' as const, label: 'Strengths', color: 'hsl(142 71% 45%)' },
    { key: 'weaknesses' as const, label: 'Weaknesses', color: 'hsl(38 92% 50%)' },
    { key: 'opportunities' as const, label: 'Opportunities', color: 'hsl(217 91% 60%)' },
    { key: 'threats' as const, label: 'Threats', color: 'hsl(0 72% 51%)' },
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {KEYS.map(({ key, label, color }) => (
        <div key={key} className="rounded-xl p-4 space-y-3"
          style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
          <p className="text-sm font-semibold" style={{ color }}>{label}</p>
          {data[key].map(item => (
            <div key={item.id} className="flex gap-2">
              <input value={item.text}
                onChange={e => updateItem(key, item.id, e.target.value)}
                className="input-dark text-sm flex-1"
                placeholder={`Add ${label.toLowerCase()} item...`}
              />
              <button onClick={() => removeItem(key, item.id)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-500/10"
                style={{ color: 'hsl(0 72% 51%)' }}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button onClick={() => addItem(key)}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: `${color}12`, color }}>
            <Plus className="w-3 h-3" /> Add Item
          </button>
        </div>
      ))}
    </div>
  )
}

function VisionEditor({ data, onChange }: { data: PortfolioData['vision']; onChange: (d: PortfolioData['vision']) => void }) {
  return (
    <div className="space-y-4">
      <TextareaField label="Long-Term Goal" rows={3}
        value={data.longTermGoal} onChange={v => onChange({ ...data, longTermGoal: v })} />
      <div>
        <label className="text-xs font-mono mb-3 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Five-Year Goals
        </label>
        <div className="space-y-3">
          {data.fiveYearGoals.map((goal, i) => (
            <div key={goal.id} className="rounded-xl p-3 space-y-2"
              style={{ background: 'hsl(0 0% 100% / 0.03)', border: '1px solid hsl(var(--border))' }}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono" style={{ color: 'hsl(217 91% 60%)' }}>Y{i + 1}</span>
                <input value={goal.title}
                  onChange={e => onChange({ ...data, fiveYearGoals: data.fiveYearGoals.map(g => g.id === goal.id ? { ...g, title: e.target.value } : g) })}
                  className="input-dark text-sm flex-1" placeholder="Goal title" />
              </div>
              <input value={goal.description}
                onChange={e => onChange({ ...data, fiveYearGoals: data.fiveYearGoals.map(g => g.id === goal.id ? { ...g, description: e.target.value } : g) })}
                className="input-dark text-sm w-full" placeholder="Description" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactEditor({ data, onChange }: { data: PortfolioData['contact']; onChange: (d: PortfolioData['contact']) => void }) {
  const u = (key: keyof typeof data, v: string) => onChange({ ...data, [key]: v })
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label="Email" value={data.email} onChange={v => u('email', v)} type="email" />
      <Field label="Phone" value={data.phone} onChange={v => u('phone', v)} />
      <div className="sm:col-span-2">
        <Field label="Location" value={data.location} onChange={v => u('location', v)} />
      </div>
      <div className="sm:col-span-2">
        <Field label="Availability Message" value={data.availability} onChange={v => u('availability', v)} />
      </div>
      <div className="sm:col-span-2 rounded-xl p-4 space-y-3"
        style={{ background: 'hsl(217 91% 60% / 0.05)', border: '1px solid hsl(217 91% 60% / 0.15)' }}>
        <p className="text-xs font-mono" style={{ color: 'hsl(217 91% 60%)' }}>
          EmailJS Configuration — <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a>
        </p>
        <Field label="Service ID" value={data.emailjsServiceId} onChange={v => u('emailjsServiceId', v)} mono />
        <Field label="Template ID" value={data.emailjsTemplateId} onChange={v => u('emailjsTemplateId', v)} mono />
        <Field label="Public Key" value={data.emailjsPublicKey} onChange={v => u('emailjsPublicKey', v)} mono />
      </div>
    </div>
  )
}

// ─── Sidebar nav items ──────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'hero', label: 'Hero Section', icon: Target },
  { id: 'about', label: 'About', icon: BookOpen },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'education', label: 'Education', icon: BookOpen },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'research', label: 'Research', icon: FlaskConical },
  { id: 'swot', label: 'SWOT Analysis', icon: BarChart2 },
  { id: 'vision', label: 'Vision', icon: Target },
  { id: 'contact', label: 'Contact', icon: Mail },
]

// ─── Main Admin Panel ────────────────────────────────────────────────────────

export default function AdminPanel() {
  const { data, isAdmin, hasChanges, dbStatus, dbErrorMsg, logout, updateData, saveChanges, discardChanges, resetToDefault } = useAdmin()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('personal')
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isAdmin) navigate('/admin/login')
  }, [isAdmin, navigate])

  const handleSave = () => {
    saveChanges()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'portfolio-data.json'; a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const imported = JSON.parse(ev.target?.result as string)
        updateData(() => imported)
      } catch { alert('Invalid JSON file') }
    }
    reader.readAsText(file)
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen flex" style={{ background: 'hsl(0 0% 5%)' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar w-60 flex-shrink-0 flex flex-col fixed top-0 left-0 h-full z-40 overflow-y-auto">
        {/* Logo */}
        <div className="p-4 flex items-center gap-2.5" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm text-white"
            style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(192 91% 43%))' }}>
            MS
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Admin Panel</p>
            <div className="flex items-center gap-1.5 mt-0.5" title={dbStatus === 'error' ? dbErrorMsg : undefined}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                dbStatus === 'connected' ? 'bg-green-500' :
                dbStatus === 'fallback' ? 'bg-amber-500' : 'bg-red-500 animate-pulse'
              }`} />
              <span className="text-[10px] font-mono tracking-tight" style={{ 
                color: dbStatus === 'connected' ? 'hsl(142 71% 45%)' :
                       dbStatus === 'fallback' ? 'hsl(38 92% 50%)' : 'hsl(0 72% 50%)'
              }}>
                {dbStatus === 'connected' ? 'DB Connected' :
                 dbStatus === 'fallback' ? 'Local Storage' : 'DB Sync Error'}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`admin-nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 space-y-2" style={{ borderTop: '1px solid hsl(var(--border))' }}>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="admin-nav-item text-xs">
            <Eye className="w-4 h-4" /> View Site
          </a>
          <button onClick={() => { logout(); navigate('/') }} className="admin-nav-item text-xs" style={{ color: 'hsl(0 72% 55%)' }}>
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3"
          style={{ background: 'hsl(0 0% 6% / 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid hsl(var(--border))' }}>
          <div>
            <h1 className="font-display font-bold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
              {NAV_ITEMS.find(n => n.id === activeSection)?.label}
            </h1>
            {hasChanges && (
              <p className="text-xs" style={{ color: 'hsl(38 92% 50%)' }}>● Unsaved changes</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Import */}
            <label className="btn btn-outline text-xs cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Import
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            {/* Export */}
            <button onClick={handleExport} className="btn btn-outline text-xs">
              <ExternalLink className="w-3.5 h-3.5" /> Export
            </button>
            {/* Discard */}
            {hasChanges && (
              <button onClick={discardChanges} className="btn btn-outline text-xs"
                style={{ color: 'hsl(var(--muted-foreground))' }}>
                <X className="w-3.5 h-3.5" /> Discard
              </button>
            )}
            {/* Reset */}
            <button onClick={() => setShowResetConfirm(true)} className="btn btn-outline text-xs"
              style={{ color: 'hsl(0 72% 55%)' }}>
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            {/* Save */}
            <button onClick={handleSave}
              className="btn text-xs"
              style={{
                background: saved ? 'hsl(142 71% 45%)' : 'linear-gradient(135deg, hsl(217 91% 60%), hsl(192 91% 43%))',
                color: '#fff',
              }}>
              {saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </header>

        {/* Section content */}
        <div className="flex-1 p-6 max-w-4xl">
          {activeSection === 'personal' && (
            <PersonalEditor data={data.personal}
              onChange={d => updateData(p => ({ ...p, personal: d }))} />
          )}
          {activeSection === 'hero' && (
            <HeroEditor data={data.hero}
              onChange={d => updateData(p => ({ ...p, hero: d }))} />
          )}
          {activeSection === 'about' && (
            <AboutEditor data={data.about}
              onChange={d => updateData(p => ({ ...p, about: d }))} />
          )}
          {activeSection === 'skills' && (
            <SkillsEditor data={data.skills}
              onChange={d => updateData(p => ({ ...p, skills: d }))} />
          )}
          {activeSection === 'education' && (
            <EducationEditor data={data.education}
              onChange={d => updateData(p => ({ ...p, education: d }))} />
          )}
          {activeSection === 'experience' && (
            <ExperienceEditor data={data.experience}
              onChange={d => updateData(p => ({ ...p, experience: d }))} />
          )}
          {activeSection === 'projects' && (
            <ProjectsEditor data={data.projects}
              onChange={d => updateData(p => ({ ...p, projects: d }))} />
          )}
          {activeSection === 'certifications' && (
            <CertificationsEditor data={data.certifications}
              onChange={d => updateData(p => ({ ...p, certifications: d }))} />
          )}
          {activeSection === 'research' && (
            <ResearchEditor data={data.researchInterests}
              onChange={d => updateData(p => ({ ...p, researchInterests: d }))} />
          )}
          {activeSection === 'swot' && (
            <SWOTEditor data={data.swot}
              onChange={d => updateData(p => ({ ...p, swot: d }))} />
          )}
          {activeSection === 'vision' && (
            <VisionEditor data={data.vision}
              onChange={d => updateData(p => ({ ...p, vision: d }))} />
          )}
          {activeSection === 'contact' && (
            <ContactEditor data={data.contact}
              onChange={d => updateData(p => ({ ...p, contact: d }))} />
          )}
        </div>
      </main>

      {/* Reset confirm modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'hsl(0 0% 0% / 0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card p-6 max-w-sm w-full"
              style={{ borderColor: 'hsl(0 72% 51% / 0.3)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(0 72% 51%)' }} />
                <div>
                  <h3 className="font-display font-semibold text-base mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                    Reset to Default?
                  </h3>
                  <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    This will reset ALL content to the original default data. This cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowResetConfirm(false)}
                  className="btn btn-outline flex-1 text-sm">Cancel</button>
                <button onClick={() => { resetToDefault(); setShowResetConfirm(false) }}
                  className="btn flex-1 text-sm"
                  style={{ background: 'hsl(0 72% 51%)', color: '#fff' }}>
                  Yes, Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
