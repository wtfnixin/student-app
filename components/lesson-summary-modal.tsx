"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LessonSummaryModalProps {
  lesson: string
  summary: string
  onClose: () => void
}

const getKeyPoints = (lesson: string, summary: string) => {
  // Check if it's an English lesson
  if (lesson === "A Journey by Train") {
    return [
      "Excitement of train travel",
      "Observations at the railway station",
      "Changing scenery during the journey",
      "Interactions with fellow passengers",
      "Mixed emotions at journey's end"
    ]
  }

  // Default to science key points
  return [
    "Food sources from plants and animals",
    "Different plant parts used as food",
    "Animal food habits classification",
    "Importance of food for survival"
  ]
}

export function LessonSummaryModal({ lesson, summary, onClose }: LessonSummaryModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl bg-white/95 backdrop-blur-sm border-0 shadow-2xl h-[90vh] flex flex-col">
        <CardContent className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 p-6 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔬</span>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {lesson}
                </h2>
                <p className="text-sm text-gray-600">Science Chapter 1</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📖</span>
                Chapter Summary
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-base">
                  {summary}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Key Learning Points
              </h4>
              <ul className="space-y-2 text-gray-700">
                {getKeyPoints(lesson, summary).map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 p-6 flex-shrink-0">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              Close
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Start Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
