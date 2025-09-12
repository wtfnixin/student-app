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
  const [selectedClass, setSelectedClass] = useState("5")
  const [showMathsLessons, setShowMathsLessons] = useState(false)
  const [showEnglishLessons, setShowEnglishLessons] = useState(false)
  const [showScienceLessons, setShowScienceLessons] = useState(false)

  const allSubjects = [
    {
      name: t("math"),
      key: "math",
      score: "174.08",
      progress: 65,
      icon: "📊",
      bgColor: "bg-emerald-500",
      classes: ["5"]
    },
    {
      name: "Science",
      key: "science",
      score: "173.004",
      progress: 45,
      icon: "🔬",
      bgColor: "bg-orange-500",
      classes: ["6"]
    },
    {
      name: t("english"),
      key: "english",
      score: "29,101.83",
      progress: 80,
      icon: "📚",
      bgColor: "bg-blue-600",
      classes: ["5"]
    },
    {
      name: t("hindi"),
      key: "hindi",
      score: "20-10",
      progress: 55,
      icon: "🕉️",
      bgColor: "bg-green-600",
      classes: ["6"]
    },
  ]

  const subjects = allSubjects.filter(subject => subject.classes.includes(selectedClass))

  const mathsLessons = [
    "Knowing our numbers",
    "Playing with numbers",
    "Whole numbers",
    "Basic geometrical",
    "Understanding Mathematics",
    "Integers",
    "Fractions"
  ]

  const englishLessons = [
    "A Journey by Train",
    "A House, A Home",
    "The Little Girl",
    "The Treasure Within",
    "Glimpses of India"
  ]

  const scienceLessons = [
    "Food: Where Does It Come From?",
    "Components of Food",
    "Fibre to Fabric",
    "Sorting Materials and Groups",
    "Separation of Substances"
  ]

  const handleQuizStart = (subject: string) => {
    if (selectedClass === "5" && subject === "math") {
      setShowMathsLessons(true)
      setShowEnglishLessons(false)
      setShowScienceLessons(false)
    } else if (selectedClass === "5" && subject === "english") {
      setShowEnglishLessons(true)
      setShowMathsLessons(false)
      setShowScienceLessons(false)
    } else if (selectedClass === "6" && subject === "science") {
      setShowScienceLessons(true)
      setShowMathsLessons(false)
      setShowEnglishLessons(false)
    } else {
      setSelectedSubject(subject)
      setShowQuiz(true)
      setShowMathsLessons(false)
      setShowEnglishLessons(false)
      setShowScienceLessons(false)
    }
  }

  const handleLessonStart = (subject: string) => {
    if (subject === "math") {
      setShowMathsLessons(true)
      setShowEnglishLessons(false)
      setShowScienceLessons(false)
    } else if (subject === "english") {
      setShowEnglishLessons(true)
      setShowMathsLessons(false)
      setShowScienceLessons(false)
    } else if (subject === "science") {
      setShowScienceLessons(true)
      setShowMathsLessons(false)
      setShowEnglishLessons(false)
    } else {
      setSelectedSubject(subject)
      setShowLesson(true)
      setShowMathsLessons(false)
      setShowEnglishLessons(false)
      setShowScienceLessons(false)
    }
  }

  const renderContent = () => {
    // Show maths lessons if active (regardless of tab)
    if (showMathsLessons) {
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowMathsLessons(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <span className="text-xl">←</span>
              <span className="font-medium">Back</span>
            </button>
            <h2 className="text-3xl font-bold text-purple-600">Mathematics Lessons</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {mathsLessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">📚</span>
                    <div>
                      <h3 className="text-white font-bold text-xl">{lesson}</h3>
                      <p className="text-white/80 text-sm">Chapter {index + 1}</p>
                    </div>
                  </div>
                  <span className="text-white text-2xl">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Show english lessons if active (regardless of tab)
    if (showEnglishLessons) {
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowEnglishLessons(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <span className="text-xl">←</span>
              <span className="font-medium">Back</span>
            </button>
            <h2 className="text-3xl font-bold text-blue-600">English Lessons</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {englishLessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">📚</span>
                    <div>
                      <h3 className="text-white font-bold text-xl">{lesson}</h3>
                      <p className="text-white/80 text-sm">Chapter {index + 1}</p>
                    </div>
                  </div>
                  <span className="text-white text-2xl">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Show science lessons if active (regardless of tab)
    if (showScienceLessons) {
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setShowScienceLessons(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <span className="text-xl">←</span>
              <span className="font-medium">Back</span>
            </button>
            <h2 className="text-3xl font-bold text-orange-600">Science Lessons</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {scienceLessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🔬</span>
                    <div>
                      <h3 className="text-white font-bold text-xl">{lesson}</h3>
                      <p className="text-white/80 text-sm">Chapter {index + 1}</p>
                    </div>
                  </div>
                  <span className="text-white text-2xl">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    switch (activeTab) {
      case "home":
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-purple-600">{t("learning")}</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Class:</span>
                <select
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value)
                    setShowMathsLessons(false) // Reset maths lessons when changing class
                    setShowEnglishLessons(false) // Reset english lessons when changing class
                    setShowScienceLessons(false) // Reset science lessons when changing class
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject.key}
                  className={`${subject.bgColor} rounded-xl cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-xl p-5`}
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
                  className={`${subject.bgColor} rounded-xl cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-xl p-4`}
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
        if (showMathsLessons) {
          return (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setShowMathsLessons(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <span className="text-xl">←</span>
                  <span className="font-medium">Back</span>
                </button>
                <h2 className="text-3xl font-bold text-purple-600">Mathematics Lessons</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {mathsLessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-xl p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">📚</span>
                        <div>
                          <h3 className="text-white font-bold text-xl">{lesson}</h3>
                          <p className="text-white/80 text-sm">Chapter {index + 1}</p>
                        </div>
                      </div>
                      <span className="text-white text-2xl">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        return (
          <div>
            <h2 className="text-3xl font-bold text-purple-600 mb-6">{t("quizzes")}</h2>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div
                  key={subject.key}
                  className={`${subject.bgColor} rounded-xl cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-xl p-4`}
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
            className="w-12 h-12 rounded-full overflow-hidden border-3 border-white/30 shadow-lg transition-transform"
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
              onClick={() => {
                setActiveTab(item.id)
                setShowMathsLessons(false) // Reset maths lessons when switching tabs
                setShowEnglishLessons(false) // Reset english lessons when switching tabs
                setShowScienceLessons(false) // Reset science lessons when switching tabs
              }}
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
