"use client"

import { useState } from "react"
import { ProfileModal } from "@/components/profile-modal"
import { QuizModal } from "@/components/quiz-modal"
import { LessonModal } from "@/components/lesson-modal"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/hooks/use-language"

interface DashboardProps {
  user: any
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("home")
  const [showProfile, setShowProfile] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showLesson, setShowLesson] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("")

  const subjects = [
    {
      name: t("math"),
      key: "math",
      score: "174.08",
      progress: 65,
      icon: "📊",
      bgColor: "bg-emerald-500",
    },
    {
      name: t("punjabi"), // Changed from science to punjabi
      key: "punjabi", // Changed key from science to punjabi
      score: "173.004",
      progress: 45,
      icon: "🎭", // Changed icon from science to punjabi cultural icon
      bgColor: "bg-orange-500",
    },
    {
      name: t("english"),
      key: "english",
      score: "29,101.83",
      progress: 80,
      icon: "📚",
      bgColor: "bg-blue-600",
    },
    {
      name: t("hindi"),
      key: "hindi",
      score: "20-10",
      progress: 55,
      icon: "🕉️",
      bgColor: "bg-green-600",
    },
  ]

  const handleQuizStart = (subject: string) => {
    setSelectedSubject(subject)
    setShowQuiz(true)
  }

  const handleLessonStart = (subject: string) => {
    setSelectedSubject(subject)
    setShowLesson(true)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div>
            <h2 className="text-3xl font-bold text-purple-600 mb-6">{t("learning")}</h2>
            <div className="grid grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject.key}
                  className={`${subject.bgColor} rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl p-5`}
                  onClick={() => handleLessonStart(subject.key)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{subject.icon}</span>
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">{subject.name}</h3>
                  <p className="text-white font-medium text-sm mb-4">{subject.score}</p>
                  <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-yellow-400 h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "lessons":
        return (
          <div>
            <h2 className="text-3xl font-bold text-purple-600 mb-6">{t("lessons")}</h2>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div
                  key={subject.key}
                  className={`${subject.bgColor} rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl p-4`}
                  onClick={() => handleLessonStart(subject.key)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl">{subject.name}</h3>
                      <p className="text-white/80 text-sm">Click to view lessons</p>
                    </div>
                    <span className="text-white text-xl">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "quizzes":
        return (
          <div>
            <h2 className="text-3xl font-bold text-purple-600 mb-6">{t("quizzes")}</h2>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div
                  key={subject.key}
                  className={`${subject.bgColor} rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl p-4`}
                  onClick={() => handleQuizStart(subject.key)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl">{subject.name} Quiz</h3>
                      <p className="text-white/80 text-sm">Test your knowledge</p>
                    </div>
                    <span className="text-white text-xl">🎯</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "announcements":
        return (
          <div>
            <h2 className="text-3xl font-bold text-purple-600 mb-6">{t("news")}</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📢</span>
                  <h3 className="font-bold text-lg">New Punjabi Lessons Added!</h3>
                </div>
                <p className="text-white/90 text-sm">Explore our new Punjabi culture and literature modules.</p>
                <p className="text-white/70 text-xs mt-2">2 hours ago</p>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏆</span>
                  <h3 className="font-bold text-lg">Weekly Quiz Challenge</h3>
                </div>
                <p className="text-white/90 text-sm">Complete 5 quizzes this week to earn bonus points!</p>
                <p className="text-white/70 text-xs mt-2">1 day ago</p>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📚</span>
                  <h3 className="font-bold text-lg">Study Tips</h3>
                </div>
                <p className="text-white/90 text-sm">Check out our new study guide for better learning outcomes.</p>
                <p className="text-white/70 text-xs mt-2">3 days ago</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header - Using solid background for proper contrast */}
      <div className="bg-purple-600 shadow-lg px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <h1 className="text-2xl font-bold text-white">{t("appName")}</h1>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button
            onClick={() => setShowProfile(true)}
            className="w-12 h-12 rounded-full overflow-hidden border-3 border-white/30 shadow-lg hover:scale-105 transition-transform"
          >
            <img src={user.avatar || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="p-4 pb-20">
        <div className="space-y-6">{renderContent()}</div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 px-4 py-3 shadow-lg">
        <div className="flex justify-around">
          {[
            { id: "home", label: t("home"), icon: "🏠" },
            { id: "lessons", label: t("lessons"), icon: "📚" },
            { id: "quizzes", label: t("quizzes"), icon: "🎯" },
            { id: "announcements", label: t("news"), icon: "📢" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all ${
                activeTab === item.id ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:text-purple-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Modals */}
      {showProfile && <ProfileModal user={user} onClose={() => setShowProfile(false)} onLogout={onLogout} />}

      {showQuiz && <QuizModal subject={selectedSubject} onClose={() => setShowQuiz(false)} />}

      {showLesson && <LessonModal subject={selectedSubject} onClose={() => setShowLesson(false)} />}
    </div>
  )
}
