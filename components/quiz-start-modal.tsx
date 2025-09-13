"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface QuizStartModalProps {
  lesson: string
  onStartQuiz: () => void
  onClose: () => void
}

export function QuizStartModal({ lesson, onStartQuiz, onClose }: QuizStartModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Start your fun learning
                </h2>
                <p className="text-sm text-gray-600">{lesson}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 mb-6">
            <div className="text-center">
              <span className="text-4xl mb-4 block">🧠</span>
              <h3 className="text-xl font-bold text-yellow-800 mb-2">Quiz Time!</h3>
              <p className="text-yellow-700 text-sm">
                Test your knowledge and earn points. Ready to challenge yourself?
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50 bg-transparent"
            >
              Maybe Later
            </Button>
            <Button
              onClick={onStartQuiz}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold"
            >
              Start your Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
