"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSelector } from "@/components/language-selector"

interface LoginFormProps {
  onLogin: (userData: any) => void
  onSwitchToAdmin?: () => void
}

export function LoginForm({ onLogin, onSwitchToAdmin }: LoginFormProps) {
  const { t } = useLanguage()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData = {
      id: Date.now(),
      name: formData.name || "Student",
      email: formData.email,
      phone: formData.phone || "",
      avatar: "/student-avatar.png",
      attendance: Math.floor(Math.random() * 20) + 80, // 80-100%
      totalQuizzes: Math.floor(Math.random() * 50) + 10,
      completedQuizzes: Math.floor(Math.random() * 30) + 5,
      averageScore: Math.floor(Math.random() * 30) + 70, // 70-100%
    }

    onLogin(userData)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">{t("appName")}</CardTitle>
          <p className="text-gray-600 text-sm">{t("yourLearningCompanion")}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                type="text"
                placeholder={t("fullName")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required={!isLogin}
                className="h-12"
              />
            )}
            <Input
              type="email"
              placeholder={t("emailAddress")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12"
            />
            <Input
              type="password"
              placeholder={t("password")}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="h-12"
            />
            {!isLogin && (
              <Input
                type="tel"
                placeholder={t("phoneNumber")}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12"
              />
            )}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium"
              disabled={loading}
            >
              {loading ? t("pleaseWait") : isLogin ? t("signIn") : t("createAccount")}
            </Button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}
            </button>
            {onSwitchToAdmin && (
              <div>
                <button
                  type="button"
                  onClick={onSwitchToAdmin}
                  className="text-gray-500 hover:text-gray-700 text-xs"
                >
                  Admin Access
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
