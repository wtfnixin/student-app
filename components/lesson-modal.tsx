"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"

interface LessonModalProps {
  subject: string
  onClose: () => void
}

export function LessonModal({ subject, onClose }: LessonModalProps) {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const lessonData = {
    math: {
      categories: [
        {
          name: "Algebra",
          icon: "🔢",
          modules: [
            { title: "Introduction to Variables", duration: "15 min", completed: true },
            { title: "Linear Equations", duration: "20 min", completed: false },
            { title: "Quadratic Functions", duration: "25 min", completed: false },
            { title: "Polynomials", duration: "18 min", completed: false },
          ],
        },
        {
          name: "Geometry",
          icon: "📐",
          modules: [
            { title: "Basic Shapes", duration: "12 min", completed: true },
            { title: "Area and Perimeter", duration: "22 min", completed: false },
            { title: "Triangles and Angles", duration: "20 min", completed: false },
            { title: "Circle Properties", duration: "25 min", completed: false },
          ],
        },
        {
          name: "Statistics",
          icon: "📊",
          modules: [
            { title: "Data Collection", duration: "16 min", completed: false },
            { title: "Mean, Median, Mode", duration: "18 min", completed: false },
            { title: "Graphs and Charts", duration: "24 min", completed: false },
          ],
        },
      ],
    },
    punjabi: {
      categories: [
        {
          name: "ਵਿਆਕਰਣ (Grammar)",
          icon: "📝",
          modules: [
            { title: "ਅੱਖਰ ਮਾਲਾ (Alphabet)", duration: "15 min", completed: true },
            { title: "ਸ਼ਬਦ ਰਚਨਾ (Word Formation)", duration: "20 min", completed: false },
            { title: "ਵਾਕ ਰਚਨਾ (Sentence Structure)", duration: "25 min", completed: false },
            { title: "ਕਾਲ (Tenses)", duration: "22 min", completed: false },
          ],
        },
        {
          name: "ਸਾਹਿਤ (Literature)",
          icon: "📚",
          modules: [
            { title: "ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ", duration: "18 min", completed: true },
            { title: "ਪੰਜਾਬੀ ਕਵਿਤਾ", duration: "20 min", completed: false },
            { title: "ਲੋਕ ਕਹਾਣੀਆਂ", duration: "25 min", completed: false },
            { title: "ਆਧੁਨਿਕ ਲੇਖਕ", duration: "24 min", completed: false },
          ],
        },
        {
          name: "ਸੱਭਿਆਚਾਰ (Culture)",
          icon: "🎭",
          modules: [
            { title: "ਪੰਜਾਬੀ ਤਿਉਹਾਰ", duration: "16 min", completed: false },
            { title: "ਲੋਕ ਨਾਚ", duration: "20 min", completed: false },
            { title: "ਪਰੰਪਰਾਵਾਂ", duration: "18 min", completed: false },
          ],
        },
      ],
    },
    english: {
      categories: [
        {
          name: "Grammar",
          icon: "📝",
          modules: [
            { title: "Parts of Speech", duration: "15 min", completed: true },
            { title: "Sentence Structure", duration: "20 min", completed: false },
            { title: "Verb Tenses", duration: "25 min", completed: false },
            { title: "Punctuation Rules", duration: "18 min", completed: false },
          ],
        },
        {
          name: "Literature",
          icon: "📖",
          modules: [
            { title: "Poetry Analysis", duration: "22 min", completed: true },
            { title: "Short Stories", duration: "25 min", completed: false },
            { title: "Drama and Plays", duration: "30 min", completed: false },
            { title: "Novel Studies", duration: "35 min", completed: false },
          ],
        },
        {
          name: "Writing Skills",
          icon: "✍️",
          modules: [
            { title: "Essay Writing", duration: "20 min", completed: false },
            { title: "Creative Writing", duration: "25 min", completed: false },
            { title: "Letter Writing", duration: "15 min", completed: false },
          ],
        },
      ],
    },
    hindi: {
      categories: [
        {
          name: "व्याकरण (Grammar)",
          icon: "📝",
          modules: [
            { title: "वर्णमाला (Alphabet)", duration: "15 min", completed: true },
            { title: "संज्ञा और सर्वनाम", duration: "20 min", completed: false },
            { title: "क्रिया और काल", duration: "25 min", completed: false },
            { title: "वाक्य रचना", duration: "22 min", completed: false },
          ],
        },
        {
          name: "साहित्य (Literature)",
          icon: "📚",
          modules: [
            { title: "कबीर के दोहे", duration: "18 min", completed: true },
            { title: "तुलसीदास की रामायण", duration: "25 min", completed: false },
            { title: "आधुनिक कविता", duration: "20 min", completed: false },
            { title: "कहानी और उपन्यास", duration: "30 min", completed: false },
          ],
        },
        {
          name: "लेखन कौशल (Writing)",
          icon: "✍️",
          modules: [
            { title: "निबंध लेखन", duration: "20 min", completed: false },
            { title: "पत्र लेखन", duration: "15 min", completed: false },
            { title: "कविता लेखन", duration: "25 min", completed: false },
          ],
        },
      ],
    },
  }

  const currentSubjectData = lessonData[subject as keyof typeof lessonData]

  if (!currentSubjectData) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Subject Not Found</h2>
            <Button onClick={onClose}>Close</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-h-[80vh] overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {subject.charAt(0).toUpperCase() + subject.slice(1)} {t("lessons")}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="overflow-y-auto max-h-[60vh]">
            {!selectedCategory ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Choose a Category:</h3>
                {currentSubjectData.categories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 hover:border-purple-300 cursor-pointer transition-all hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.modules.length} modules</p>
                      </div>
                      <span className="ml-auto text-purple-600">→</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    ← Back
                  </button>
                  <h3 className="text-lg font-semibold text-gray-700">{selectedCategory}</h3>
                </div>
                {currentSubjectData.categories
                  .find((cat) => cat.name === selectedCategory)
                  ?.modules.map((module, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        module.completed
                          ? "bg-green-50 border-green-200 hover:bg-green-100"
                          : "bg-purple-50 border-purple-200 hover:bg-purple-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">{module.title}</h4>
                          <p className="text-sm text-gray-600">{module.duration}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {module.completed ? (
                            <span className="text-green-600 text-xl">✅</span>
                          ) : (
                            <span className="text-purple-600 text-xl">▶️</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              Close
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
