"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSelector } from "@/components/language-selector"

interface AdminLoginFormProps {
  onAdminLogin: (adminData: any) => void
  onBackToStudent: () => void
}

export function AdminLoginForm({ onAdminLogin, onBackToStudent }: AdminLoginFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple admin credentials check
    if (formData.email === "admin@gyanika.com" && formData.password === "admin123") {
      const adminData = {
        id: "admin",
        name: "Administrator",
        email: formData.email,
        role: "admin",
        avatar: "/placeholder-user.jpg",
      }
      onAdminLogin(adminData)
    } else {
      setError("Invalid admin credentials")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Admin Panel</CardTitle>
          <p className="text-gray-600 text-sm">Administrator Access Only</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Admin Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12"
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="h-12"
            />
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-medium"
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Admin Login"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onBackToStudent}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Back to Student Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
