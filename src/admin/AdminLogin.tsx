import { useState } from 'react'
import { motion } from 'motion/react'
import { Lock, Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react'
import { useAdmin } from './AdminContext'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const { login } = useAdmin()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 500))
    const ok = login(password)
    if (ok) {
      navigate('/admin')
    } else {
      setError('Invalid password. Please try again.')
      setPassword('')
    }
    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'hsl(0 0% 4%)' }}
    >
      {/* Background grid */}
      <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        <div
          className="glass-card p-8"
          style={{ borderColor: 'hsl(217 91% 60% / 0.2)' }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 font-mono font-bold text-xl text-white"
              style={{ background: 'linear-gradient(135deg, hsl(217 91% 60%), hsl(192 91% 43%))' }}
            >
              MS
            </div>
            <h1 className="font-display font-bold text-xl mb-1" style={{ color: 'hsl(var(--foreground))' }}>
              Admin Panel
            </h1>
            <p className="text-xs text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Mohammed Sameer Portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-mono mb-2 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Admin Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="input-dark pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs px-3 py-2.5 rounded-lg"
                style={{ background: 'hsl(0 72% 51% / 0.1)', color: 'hsl(0 72% 60%)', border: '1px solid hsl(0 72% 51% / 0.2)' }}
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><LogIn className="w-4 h-4" /> Sign In</>
              )}
            </button>
          </form>

        </div>

      </motion.div>
    </div>
  )
}
