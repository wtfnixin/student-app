"use client"

import { useState } from "react"
import { ProfileModal } from "@/components/profile-modal"
import { QuizModal } from "@/components/quiz-modal"
import { LessonModal } from "@/components/lesson-modal"
import { LessonSummaryModal } from "@/components/lesson-summary-modal"
import { QuizStartModal } from "@/components/quiz-start-modal"
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
  const [selectedLesson, setSelectedLesson] = useState("")
  const [showLessonSummary, setShowLessonSummary] = useState(false)
  const [showQuizStart, setShowQuizStart] = useState(false)
  const [quizMode, setQuizMode] = useState(false)

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
      classes: ["5", "6"]
    },
    {
      name: "Social",
      key: "social",
      score: "150.50",
      progress: 70,
      icon: "🌍",
      bgColor: "bg-purple-500",
      classes: ["5"]
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
    "Glimpses of India",
    "Parts of Speech"
  ]

  const englishSummary = "The lesson describes the author's first experience of travelling by train. The excitement begins even before the journey starts – buying the ticket, packing, and reaching the station. At the station, the author observes the crowd, the noise of hawkers, the busy porters, and the overall lively atmosphere. When the train arrives, passengers rush to board. The author manages to get a seat near the window and enjoys looking outside as the train begins to move. The changing scenery – green fields, villages, rivers, trees, and mountains – fascinates him. He also notices fellow passengers, some talking, some eating, and some dozing off. The journey gives him joy, adventure, and new experiences. Finally, when the train reaches the destination, he feels a mix of happiness and disappointment – happy to reach but sad that the beautiful journey has ended."

  const mathsSummary = "This chapter introduces students to the world of numbers and basic mathematical concepts. **Key Points:** • Natural numbers (1, 2, 3...) and whole numbers (0, 1, 2, 3...) • Number line and place value (units, tens, hundreds) • Comparing numbers using symbols: <, >, = • Basic operations with examples: 25 + 13 = 38, 45 - 17 = 28, 6 × 4 = 24, 20 ÷ 5 = 4 • Important formulas: Area of rectangle = length × breadth, Perimeter of square = 4 × side, Volume of cube = side³. The chapter builds a strong foundation for advanced mathematics through practical examples and exercises."

  const scienceLessons = [
    "Food: Where Does It Come From?",
    "Components of Food",
    "Fibre to Fabric",
    "Sorting Materials and Groups",
    "Separation of Substances"
  ]

  const scienceSummary = "Food is something we all need to live, but the types of food we eat vary from place to place. A typical meal is made of different dishes, and each dish is prepared using many ingredients. These ingredients are obtained mainly from plants and animals. From plants, we use different parts as food. Roots like carrot and radish, stems like potato and sugarcane, leaves like spinach and cabbage, flowers such as cauliflower and banana flower, fruits like apple and mango, and seeds such as rice, wheat, and pulses are all eaten by us. In the same way, animals give us milk, eggs, meat, fish, and even honey collected by bees from flowers. Not just humans, even animals depend on food for survival. Based on their eating habits, animals are classified as: Herbivores, which eat only plants (like cows, goats, and deer). Carnivores, which eat other animals (like lions and tigers). Omnivores, which eat both plants and animals (like humans and bears). In simple words, this chapter tells us that our food comes from both plants and animals, different parts of plants are used as food, and animals have different food habits."

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
      setShowQuizStart(true)
      setShowQuiz(false)
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
                onClick={() => {
                  if (index === 0) {
                    setSelectedLesson(lesson)
                    setShowLessonSummary(true)
                  }
                }}
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
                onClick={() => {
                  if (index === 0) {
                    setSelectedLesson(lesson)
                    setShowLessonSummary(true)
                  }
                }}
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
                onClick={() => {
                  if (index === 0) {
                    setSelectedLesson(lesson)
                    setShowLessonSummary(true)
                  }
                }}
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
              <h2 className="text-3xl font-bold text-purple-600">{t("home")}</h2>
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
                  <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-yellow-400 h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">{t("resources")}</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <div>
                        <h4 className="font-bold">Math Worksheet.pdf</h4>
                        <p className="text-sm text-gray-600">{t("uploadedBy")} {t("teacherA")}</p>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                      <span>⬇️</span>
                      <span className="text-sm font-medium">Download</span>
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📚</span>
                      <div>
                        <h4 className="font-bold">Science Notes.docx</h4>
                        <p className="text-sm text-gray-600">{t("uploadedBy")} {t("teacherB")}</p>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                      <span>⬇️</span>
                      <span className="text-sm font-medium">Download</span>
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📚</span>
                      <div>
                        <h4 className="font-bold">English Notes.docx</h4>
                        <p className="text-sm text-gray-600">{t("uploadedBy")} {t("teacherC")}</p>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                      <span>⬇️</span>
                      <span className="text-sm font-medium">Download</span>
                    </button>
                  </div>
                </div>
              </div>
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

      case "homework":
        const homeworkData = [
          {
            subject: "Mathematics",
            date: "2024-06-01",
            description: "Complete exercises 5 to 10 on page 42."
          },
          {
            subject: "Science",
            date: "2024-06-02",
            description: "Prepare a presentation on the water cycle."
          }
        ]

        return (
          <div>
            <h2 className="text-3xl font-bold text-purple-600 mb-6">Homework</h2>
            <div className="grid grid-cols-1 gap-4">
              {homeworkData.map((hw, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-200"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-lg">{hw.subject}</span>
                    <span className="text-gray-500 text-sm">{hw.date}</span>
                  </div>
                  <p className="text-gray-700">{hw.description}</p>
                </div>
              ))}
            </div>
          </div>
        )

      case "quiz":
        return (
          <div>
            <h2 className="text-3xl font-bold text-purple-600 mb-6">Quiz</h2>
            <div className="space-y-4">
              {subjects.map((subject) => {
                if (subject.key === "english") {
                  // Group all English lessons within the English card
                  return (
                    <div
                      key={subject.key}
                      className={`${subject.bgColor} rounded-xl transition-shadow duration-300 shadow-lg hover:shadow-xl p-6`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl">{subject.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-xl">{subject.name}</h3>
                          <p className="text-white/80 text-sm">Select a lesson to start quiz</p>
                        </div>
                        <span className="text-white text-xl">📚</span>
                      </div>

                      {/* English lessons grid within the card */}
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="grid grid-cols-1 gap-3">
                          {englishLessons
                            .filter(lesson => lesson === "Parts of Speech")
                            .map((lesson, index) => (
                            <div
                              key={index}
                              className="bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg cursor-pointer transition-all duration-200 p-3"
                              onClick={() => {
                                setSelectedSubject(subject.key)
                                setSelectedLesson(lesson)
                                setShowQuizStart(true)
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">📖</span>
                                  <div>
                                    <h4 className="text-white font-semibold text-base">{lesson}</h4>
                                    <p className="text-white/70 text-sm">Click to start quiz</p>
                                  </div>
                                </div>
                                <span className="text-white text-lg">🧠</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                } else if (subject.key === "math") {
                  // Group Math lessons including Geometry within the Math card
                  return (
                    <div
                      key={subject.key}
                      className={`${subject.bgColor} rounded-xl transition-shadow duration-300 shadow-lg hover:shadow-xl p-6`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl">{subject.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-xl">{subject.name}</h3>
                          <p className="text-white/80 text-sm">Select a lesson to start quiz</p>
                        </div>
                        <span className="text-white text-xl">📐</span>
                      </div>

                      {/* Math lessons grid within the card */}
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="grid grid-cols-1 gap-3">
                          {mathsLessons
                            .filter(lesson => lesson === "Knowing our numbers")
                            .map((lesson, index) => (
                            <div
                              key={index}
                              className="bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg cursor-pointer transition-all duration-200 p-3"
                              onClick={() => {
                                setSelectedSubject(subject.key)
                                setSelectedLesson(lesson)
                                setShowQuizStart(true)
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">🔢</span>
                                  <div>
                                    <h4 className="text-white font-semibold text-base">{lesson}</h4>
                                    <p className="text-white/70 text-sm">Click to start quiz</p>
                                  </div>
                                </div>
                                <span className="text-white text-lg">🧠</span>
                              </div>
                            </div>
                          ))}
                          {/* Add Geometry as a nested lesson */}
                          <div
                            className="bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg cursor-pointer transition-all duration-200 p-3"
                            onClick={() => {
                              setSelectedSubject("Geometry")
                              setSelectedLesson("Geometry")
                              setShowQuizStart(true)
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-xl">📐</span>
                                <div>
                                  <h4 className="text-white font-semibold text-base">Geometry</h4>
                                  <p className="text-white/70 text-sm">Click to start quiz</p>
                                </div>
                              </div>
                              <span className="text-white text-lg">🧠</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={subject.key}
                      className={`${subject.bgColor} rounded-xl cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-xl p-4`}
                      onClick={() => {
                        setSelectedSubject(subject.key)
                        setSelectedLesson(subject.name)
                        setShowQuizStart(true)
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{subject.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-xl">{subject.name}</h3>
                          <p className="text-white/80 text-sm">Click to start quiz</p>
                        </div>
                        <span className="text-white text-xl">🧠</span>
                      </div>
                    </div>
                  )
                }
              })}
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
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover shadow-lg"
          />
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
            { id: "homework", label: "Homework", icon: "📝" },
            { id: "quiz", label: "Quiz", icon: "🧠" },
            { id: "announcements", label: t("news"), icon: "📢" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setShowMathsLessons(false) // Reset maths lessons when switching tabs
                setShowEnglishLessons(false) // Reset english lessons when switching tabs
                setShowScienceLessons(false) // Reset science lessons when switching tabs
                setShowQuizStart(false) // Reset quiz start when switching tabs
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

      {showQuiz && <QuizModal subject={selectedSubject} lesson={selectedLesson} onClose={() => setShowQuiz(false)} />}

      {showLesson && <LessonModal subject={selectedSubject} onClose={() => setShowLesson(false)} />}

      {/*
      Removed LessonSummaryModal from quiz section as per user request
      */}
      {showLessonSummary && (
        <LessonSummaryModal
          lesson={selectedLesson}
          summary={
            mathsLessons.includes(selectedLesson)
              ? mathsSummary
              : englishLessons.includes(selectedLesson)
              ? englishSummary
              : scienceSummary
          }
          onClose={() => setShowLessonSummary(false)}
        />
      )}

      {showQuizStart && (
        <QuizStartModal
          lesson={selectedLesson}
          onStartQuiz={() => {
            setShowQuizStart(false)
            setShowQuiz(true)
          }}
          onClose={() => setShowQuizStart(false)}
        />
      )}
    </div>
  )
}
