import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AdminProvider, useAdmin } from './admin/AdminContext.tsx'
import AdminLogin from './admin/AdminLogin.tsx'
import AdminPanel from './admin/AdminPanel.tsx'

// ─── Protected route for admin ──────────────────────────────────────────────
function ProtectedAdmin() {
  const { isAdmin } = useAdmin()
  return isAdmin ? <AdminPanel /> : <Navigate to="/admin/login" replace />
}

// ─── Console easter egg ──────────────────────────────────────────────────────
console.log('%c Mohammed Sameer | Engineering + AI Portfolio ', 
  'background: linear-gradient(135deg, #3B82F6, #06B6D4); color: #fff; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 4px;')
console.log('%c Built with React + Vite + TailwindCSS ', 'color: #8B5CF6; font-size: 12px;')
console.log('%c Contact: msam81401@gmail.com ', 'color: #06B6D4; font-size: 12px;')

const root = document.getElementById('root')!

createRoot(root).render(
  <StrictMode>
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  </StrictMode>
)
