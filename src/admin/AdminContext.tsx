import { createContext, useContext, useState, useCallback } from 'react'
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

const AdminContext = createContext<AdminContextType | null>(null)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(loadPortfolioData)
  const [savedData, setSavedData] = useState<PortfolioData>(data)
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true')
  const [hasChanges, setHasChanges] = useState(false)

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true')
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setIsAdmin(false)
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
  }, [])

  const updateData = useCallback((updater: (prev: PortfolioData) => PortfolioData) => {
    setData(prev => {
      const next = updater(prev)
      setHasChanges(true)
      return next
    })
  }, [])

  const saveChanges = useCallback(() => {
    savePortfolioData(data)
    setSavedData(data)
    setHasChanges(false)
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
