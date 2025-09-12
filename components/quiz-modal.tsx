"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuizModalProps {
  subject: string
  onClose: () => void
}

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
}

export function QuizModal({ subject, onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      question: `What is the basic unit of ${subject.toLowerCase()}?`,
      options: ["Element", "Atom", "Molecule", "Compound"],
      correct: subject === "Science" ? 1 : 0,
    },
    {
      id: 2,
      question: `Which of these is most important in ${subject.toLowerCase()}?`,
      options: ["Practice", "Theory", "Memory", "Speed"],
      correct: 0,
    },
    {
      id: 3,
      question: `How do you improve in ${subject.toLowerCase()}?`,
      options: ["Skip lessons", "Regular practice", "Memorize only", "Avoid mistakes"],
      correct: 1,
    },
    {
      id: 4,
      question: `What makes ${subject.toLowerCase()} interesting?`,
      options: ["Difficulty", "Problem solving", "Complexity", "Rules"],
      correct: 1,
    },
    {
      id: 5,
      question: `Best way to learn ${subject.toLowerCase()}?`,
      options: ["Read only", "Practice daily", "Cram before test", "Copy others"],
      correct: 1,
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    if (answered) return

    setSelectedAnswer(answerIndex)
    setAnswered(true)

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      setShowResult(true)
      // Save quiz result to localStorage
      const quizHistory = JSON.parse(localStorage.getItem("gyanika_quiz_history") || "[]")
      quizHistory.push({
        subject,
        score,
        total: questions.length,
        date: new Date().toISOString(),
        percentage: Math.round((score / questions.length) * 100),
      })
      localStorage.setItem("gyanika_quiz_history", JSON.stringify(quizHistory))
    }
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Complete! 🎉</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div>
              <div className="text-6xl font-bold text-blue-600 mb-2">{percentage}%</div>
              <p className="text-gray-600">
                You scored {score} out of {questions.length}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Performance</h3>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={onClose} className="w-full">
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestion(0)
                  setScore(0)
                  setShowResult(false)
                  setSelectedAnswer(null)
                  setAnswered(false)
                }}
                className="w-full"
              >
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{subject} Quiz</CardTitle>
            <p className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ×
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div>
            <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>

            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? answered && index === questions[currentQuestion].correct
                        ? "bg-green-100 border-green-500 text-green-700"
                        : answered && index !== questions[currentQuestion].correct
                          ? "bg-red-100 border-red-500 text-red-700"
                          : "bg-blue-100 border-blue-500 text-blue-700"
                      : answered && index === questions[currentQuestion].correct
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                  disabled={answered}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          {answered && (
            <Button onClick={nextQuestion} className="w-full">
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}

          {/* Score Display */}
          <div className="text-center text-sm text-gray-600">
            Current Score: {score}/{currentQuestion + (answered ? 1 : 0)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
