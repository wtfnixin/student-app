"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"
import { AdminLoginForm } from "@/components/admin-login-form"
import { AdminDashboard } from "@/components/admin-dashboard"
import { LanguageProvider } from "@/hooks/use-language"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [admin, setAdmin] = useState<any>(null)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem("gyanika_user")
    const savedAdmin = localStorage.getItem("gyanika_admin")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    localStorage.setItem("gyanika_user", JSON.stringify(userData))
  }

  const handleAdminLogin = (adminData: any) => {
    setAdmin(adminData)
    localStorage.setItem("gyanika_admin", JSON.stringify(adminData))
  }

  const handleLogout = () => {
    setUser(null)
    setAdmin(null)
    localStorage.removeItem("gyanika_user")
    localStorage.removeItem("gyanika_admin")
  }

  const handleSwitchToAdmin = () => {
    setIsAdminMode(true)
  }

  const handleBackToStudent = () => {
    setIsAdminMode(false)
  }

  if (loading) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse text-lg font-medium text-gray-600">Loading Gyanika...</div>
        </div>
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : admin ? (
        <AdminDashboard admin={admin} onLogout={handleLogout} />
      ) : isAdminMode ? (
        <AdminLoginForm onAdminLogin={handleAdminLogin} onBackToStudent={handleBackToStudent} />
      ) : (
        <LoginForm onLogin={handleLogin} onSwitchToAdmin={handleSwitchToAdmin} />
      )}
    </LanguageProvider>
  )
}
