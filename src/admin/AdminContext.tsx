import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { loadPortfolioData, savePortfolioData, defaultPortfolioData, type PortfolioData } from '../data/portfolio-data'

interface AdminContextType {
  data: PortfolioData
  isAdmin: boolean
  hasChanges: boolean
  login: (password: string) => boolean
  logout: () => void
  updateData: (updater: (prev: PortfolioData) => PortfolioData) => void
  saveChanges: () => void
  discardChanges: () => void
  resetToDefault: () => void
}

const ADMIN_PASSWORD = 'admin123'
const ADMIN_SESSION_KEY = 'ms_admin_session'
const ADMIN_PASSWORD_KEY = 'ms_admin_password'

const AdminContext = createContext<AdminContextType | null>(null)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(loadPortfolioData)
  const [savedData, setSavedData] = useState<PortfolioData>(data)
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true')
  const [hasChanges, setHasChanges] = useState(false)

  // Fetch portfolio data from Supabase via Vercel Edge API on load
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/portfolio/get')
        if (res.ok) {
          const body = await res.json()
          if (body.data) {
            const merged = { ...defaultPortfolioData, ...body.data }
            setData(merged)
            setSavedData(merged)
            savePortfolioData(merged)
          }
        }
      } catch (err) {
        console.error('Failed to fetch live portfolio data from Supabase:', err)
      }
    }
    init()
  }, [])

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true')
      sessionStorage.setItem(ADMIN_PASSWORD_KEY, password)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    sessionStorage.removeItem(ADMIN_PASSWORD_KEY)
  }, [])

  const updateData = useCallback((updater: (prev: PortfolioData) => PortfolioData) => {
    setData(prev => {
      const next = updater(prev)
      setHasChanges(true)
      return next
    })
  }, [])

  const saveChanges = useCallback(() => {
    // 1. Save locally to browser
    savePortfolioData(data)
    setSavedData(data)
    setHasChanges(false)

    // 2. Sync to Supabase in the background
    const password = sessionStorage.getItem(ADMIN_PASSWORD_KEY) || ''
    fetch('/api/portfolio/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, password })
    }).then(async res => {
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        console.error('Failed to sync changes to Supabase:', body.error || res.statusText)
      } else {
        console.log('Successfully synced portfolio changes to Supabase!')
      }
    }).catch(err => {
      console.error('Network error syncing changes to Supabase:', err)
    })
  }, [data])

  const discardChanges = useCallback(() => {
    setData(savedData)
    setHasChanges(false)
  }, [savedData])

  const resetToDefault = useCallback(() => {
    setData(defaultPortfolioData)
    savePortfolioData(defaultPortfolioData)
    setSavedData(defaultPortfolioData)
    setHasChanges(false)

    // Sync reset to Supabase
    const password = sessionStorage.getItem(ADMIN_PASSWORD_KEY) || ''
    fetch('/api/portfolio/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: defaultPortfolioData, password })
    }).catch(err => console.error('Failed to sync reset to Supabase:', err))
  }, [])

  return (
    <AdminContext.Provider value={{
      data, isAdmin, hasChanges,
      login, logout, updateData, saveChanges, discardChanges, resetToDefault
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
