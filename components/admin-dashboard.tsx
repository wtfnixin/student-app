"use client"

import { useState } from "react"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminDashboardProps {
  admin: any
  onLogout: () => void
}

export function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalStudents: 1247,
    activeStudents: 892,
    totalQuizzes: 456,
    averageScore: 78.5,
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Admin Overview</h2>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stats.totalStudents}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Active Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{stats.activeStudents}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{stats.totalQuizzes}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">{stats.averageScore}%</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-600">👤</span>
                    <div>
                      <p className="font-medium">New student registered</p>
                      <p className="text-sm text-gray-600">john.doe@example.com - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600">📊</span>
                    <div>
                      <p className="font-medium">Quiz completed</p>
                      <p className="text-sm text-gray-600">Math quiz by Sarah - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-600">📚</span>
                    <div>
                      <p className="font-medium">New lesson added</p>
                      <p className="text-sm text-gray-600">Punjabi Culture - 1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "students":
        return (
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-6">Student Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Registered Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src="/student-avatar.png" alt="Avatar" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-600">john.doe@example.com</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">85% avg</p>
                      <p className="text-xs text-gray-500">12 quizzes</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src="/student-avatar.png" alt="Avatar" className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium">Sarah Wilson</p>
                        <p className="text-sm text-gray-600">sarah.wilson@example.com</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">92% avg</p>
                      <p className="text-xs text-gray-500">15 quizzes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "content":
        return (
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-6">Content Management</h2>
            <Card>
              <CardHeader>
                <CardTitle>Subjects & Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📊</span>
                      <div>
                        <p className="font-medium">Mathematics</p>
                        <p className="text-sm text-gray-600">12 lessons, 8 quizzes</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎭</span>
                      <div>
                        <p className="font-medium">Punjabi</p>
                        <p className="text-sm text-gray-600">8 lessons, 5 quizzes</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📚</span>
                      <div>
                        <p className="font-medium">English</p>
                        <p className="text-sm text-gray-600">15 lessons, 10 quizzes</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "settings":
        return (
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-6">Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Maintenance Mode</span>
                    <Button variant="outline" size="sm">Toggle</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Backup Database</span>
                    <Button variant="outline" size="sm">Run Backup</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Clear Cache</span>
                    <Button variant="outline" size="sm">Clear</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-red-600 shadow-lg px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="p-4 pb-20">
        <div className="space-y-6">{renderContent()}</div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-red-100 px-4 py-3 shadow-lg">
        <div className="flex justify-around">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "students", label: "Students", icon: "👥" },
            { id: "content", label: "Content", icon: "📚" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
                activeTab === item.id ? "bg-red-100 text-red-700" : "text-gray-700 hover:text-red-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
