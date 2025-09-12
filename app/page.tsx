"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"
import { LanguageProvider } from "@/hooks/use-language"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem("gyanika_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    localStorage.setItem("gyanika_user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("gyanika_user")
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
      {!user ? <LoginForm onLogin={handleLogin} /> : <Dashboard user={user} onLogout={handleLogout} />}
    </LanguageProvider>
  )
}
