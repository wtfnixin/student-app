"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuizModalProps {
  subject: string
  lesson?: string
  onClose: () => void
}

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  image?: JSX.Element // optional image for question (for Geometry quiz)
}

interface DragDropQuestion {
  id: number
  sentence: string[]
  blanks: number[]
  options: string[]
  correct: string[]
}

export function QuizModal({ subject, lesson, onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)
  // Removed timer for Geometry quiz

  // Drag and drop state
  const [filledBlanks, setFilledBlanks] = useState<{ [key: number]: string }>({})
  const [draggedWord, setDraggedWord] = useState<string | null>(null)
  const [availableOptions, setAvailableOptions] = useState<string[]>([])
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)



  const getQuestions = (): Question[] => {
    if (lesson === "Knowing our numbers") {
      return [
        {
          id: 1,
          question: "🏁 Number Race Challenge: What is the place value of 7 in the number 5,743?",
          options: ["7", "700", "70", "7,000"],
          correct: 2,
        },
        {
          id: 2,
          question: "🔍 Detective Mission: 'I am a 4-digit number. My tens digit is twice the ones digit. My thousands digit is 1 less than my hundreds digit.' What could the number be?",
          options: ["1,432", "2,541", "3,652", "4,763"],
          correct: 1,
        },
        {
          id: 3,
          question: "⏱ Time Attack: Place these numbers in ascending order: 3,452 ; 3,425 ; 3,524 ; 3,245",
          options: ["3,245 → 3,425 → 3,452 → 3,524", "3,425 → 3,245 → 3,524 → 3,452", "3,524 → 3,452 → 3,425 → 3,245", "3,452 → 3,524 → 3,245 → 3,425"],
          correct: 0,
        },
        {
          id: 4,
          question: "🎯 True or False: The number 5,001 is greater than 5,010.",
          options: ["True", "False"],
          correct: 1,
        },
        {
          id: 5,
          question: "🧩 Complete the number pattern: 1,000 → 2,000 → ___ → 4,000 → 5,000",
          options: ["2,500", "3,000", "3,500", "4,500"],
          correct: 1,
        },
      ]
    }

    if (subject === "Geometry") {
      return [
        {
          id: 1,
          question: "Angle: 30°",
          image: (
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="75" x2="130" y2="75" stroke="#000" strokeWidth="3"/>
              <line x1="75" y1="75" x2="120" y2="40" stroke="#22c55e" strokeWidth="3"/>
              <path d="M75 75 L110 55" stroke="#22c55e" strokeWidth="3"/>
              <text x="95" y="70" fill="#22c55e" fontSize="16" fontWeight="bold">30°</text>
            </svg>
          ),
          options: ["Acute (< 90°)", "Right (= 90°)", "Obtuse (90° - 180°)", "Straight (= 180°)", "Reflex (> 180°)"],
          correct: 0,
        },
        {
          id: 2,
          question: "Angle: 90°",
          image: (
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="75" x2="130" y2="75" stroke="#000" strokeWidth="3"/>
              <line x1="75" y1="75" x2="75" y2="20" stroke="#3b82f6" strokeWidth="3"/>
              <path d="M75 75 L95 55" stroke="#3b82f6" strokeWidth="3"/>
              <text x="80" y="60" fill="#3b82f6" fontSize="16" fontWeight="bold">90°</text>
            </svg>
          ),
          options: ["Acute (< 90°)", "Right (= 90°)", "Obtuse (90° - 180°)", "Straight (= 180°)", "Reflex (> 180°)"],
          correct: 1,
        },
        {
          id: 3,
          question: "Angle: 140°",
          image: (
            <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="75" x2="130" y2="75" stroke="#000" strokeWidth="3"/>
              <line x1="75" y1="75" x2="40" y2="20" stroke="#f97316" strokeWidth="3"/>
              <path d="M75 75 L50 55" stroke="#f97316" strokeWidth="3"/>
              <text x="45" y="70" fill="#f97316" fontSize="16" fontWeight="bold">140°</text>
            </svg>
          ),
          options: ["Acute (< 90°)", "Right (= 90°)", "Obtuse (90° - 180°)", "Straight (= 180°)", "Reflex (> 180°)"],
          correct: 2,
        },
      ]
    }

    if (subject === "english") {
      return [
        {
          id: 1,
          question: "📖 What is the main theme of 'A Journey by Train'?",
          options: ["Adventure and excitement", "Family relationships", "School life", "Nature exploration"],
          correct: 0,
        },
        {
          id: 2,
          question: "🚂 What does the author observe at the railway station?",
          options: ["Only passengers", "Crowd, hawkers, porters, and noise", "Only trains", "Food stalls only"],
          correct: 1,
        },
        {
          id: 3,
          question: "🌄 What fascinates the author during the train journey?",
          options: ["Other passengers only", "Changing scenery outside", "Train food", "Train conductor"],
          correct: 1,
        },
        {
          id: 4,
          question: "😊 What emotions does the author feel at the end of the journey?",
          options: ["Only happiness", "Only disappointment", "Mixed emotions of happiness and disappointment", "Indifference"],
          correct: 2,
        },
        {
          id: 5,
          question: "🎭 Which of these activities do fellow passengers do during the journey?",
          options: ["Only talking", "Talking, eating, and dozing", "Only reading", "Only sleeping"],
          correct: 1,
        },
      ]
    }

    // Default generic questions for other subjects/lessons
    return [
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
  }

  const questions: Question[] = getQuestions()

  const getDragDropQuestions = (): DragDropQuestion[] => {
    if (lesson === "Parts of Speech") {
      return [
        {
          id: 1,
          sentence: ["The", "___", "(noun)", "is", "running", "in", "the", "park", "."],
          blanks: [1],
          options: ["boy", "quickly", "beautiful", "runs"],
          correct: ["boy"]
        },
        {
          id: 2,
          sentence: ["___", "(pronoun)", "is", "eating", "an", "apple", "."],
          blanks: [0],
          options: ["She", "Quickly", "Beautiful", "Runs"],
          correct: ["She"]
        },
        {
          id: 3,
          sentence: ["The", "dog", "___", "(verb)", "loudly", "in", "the", "yard", "."],
          blanks: [2],
          options: ["barks", "loud", "quick", "beauty"],
          correct: ["barks"]
        },
        {
          id: 4,
          sentence: ["She", "wore", "a", "___", "(adjective)", "dress", "to", "the", "party", "."],
          blanks: [3],
          options: ["beautiful", "quickly", "runs", "beauty"],
          correct: ["beautiful"]
        },
        {
          id: 5,
          sentence: ["The", "rabbit", "___", "(adverb)", "across", "the", "field", "."],
          blanks: [2],
          options: ["hops", "quickly", "quick", "hopping"],
          correct: ["quickly"]
        }
      ]
    }
    return []
  }

  const dragDropQuestions: DragDropQuestion[] = getDragDropQuestions()

  // Initialize drag-drop options when component mounts or question changes
  useEffect(() => {
    if (lesson === "Parts of Speech" && dragDropQuestions[currentQuestion]) {
      setAvailableOptions(dragDropQuestions[currentQuestion].options)
      setFilledBlanks({})
      setDraggedWord(null)
      setAnswered(false)
    }
  }, [currentQuestion, subject, lesson, dragDropQuestions])

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
      // Reset drag-drop state
      setFilledBlanks({})
      setDraggedWord(null)
      setAvailableOptions(dragDropQuestions[currentQuestion + 1]?.options || [])
      setDragOverIndex(null)
    } else {
      setShowResult(true)
      // Save quiz result to localStorage
      const totalQuestions = lesson === "Parts of Speech" ? dragDropQuestions.length : questions.length
      const quizHistory = JSON.parse(localStorage.getItem("gyanika_quiz_history") || "[]")
      quizHistory.push({
        subject,
        score,
        total: totalQuestions,
        date: new Date().toISOString(),
        percentage: Math.round((score / totalQuestions) * 100),
      })
      localStorage.setItem("gyanika_quiz_history", JSON.stringify(quizHistory))
    }
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word)
    setDraggedWord(word)
  }

  const handleDrop = (e: React.DragEvent, blankIndex: number) => {
    e.preventDefault()
    const word = e.dataTransfer.getData('text/plain')
    if (!word) return

    const newFilledBlanks = { ...filledBlanks }
    newFilledBlanks[blankIndex] = word
    setFilledBlanks(newFilledBlanks)

    // Remove from available options
    setAvailableOptions(prev => prev.filter(option => option !== word))
    setDraggedWord(null)
    setDragOverIndex(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragEnter = (index: number) => {
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const checkDragDropAnswer = () => {
    if (answered) return

    const currentQ = dragDropQuestions[currentQuestion]
    const isCorrect = currentQ.blanks.every((blankIndex, i) =>
      filledBlanks[blankIndex] === currentQ.correct[i]
    )

    if (isCorrect) {
      setScore(score + 1)
    }
    setAnswered(true)
  }

  const resetDragDrop = () => {
    setFilledBlanks({})
    setAvailableOptions(dragDropQuestions[currentQuestion]?.options || [])
    setAnswered(false)
    setDragOverIndex(null)
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
              style={{
                width: `${((currentQuestion + 1) / (lesson === "Parts of Speech" ? dragDropQuestions.length : questions.length)) * 100}%`
              }}
            />
          </div>

          {/* Question */}
          {lesson === "Parts of Speech" ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Complete the sentence by dragging words to the blanks:</h3>

              {/* Sentence with blanks */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex flex-wrap items-center gap-2 text-lg">
                  {dragDropQuestions[currentQuestion]?.sentence.map((word, index) => (
                    <span key={index} className="flex items-center">
                      {word === "___" ? (
                        <div
                          className={`inline-block min-w-20 h-8 border-2 border-dashed rounded px-2 py-1 text-center align-middle whitespace-nowrap ${
                            filledBlanks[index]
                              ? answered && filledBlanks[index] === dragDropQuestions[currentQuestion].correct[dragDropQuestions[currentQuestion].blanks.indexOf(index)]
                                ? "border-green-500 bg-green-100"
                                : answered
                                  ? "border-red-500 bg-red-100"
                                  : "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          } ${dragOverIndex === index ? "bg-yellow-100 border-yellow-500" : ""}`}
                          onDrop={(e) => handleDrop(e, index)}
                          onDragOver={handleDragOver}
                          onDragEnter={() => handleDragEnter(index)}
                          onDragLeave={handleDragLeave}
                          onDragEnd={handleDragLeave}
                        >
                          {filledBlanks[index] || ""}
                        </div>
                      ) : (
                        <span>{word}</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Draggable options */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Drag these words:</h4>
                <div className="flex flex-wrap gap-2">
                  {availableOptions.map((option, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, option)}
                      onDragEnd={() => setDraggedWord(null)}
                      className="bg-blue-100 border border-blue-300 rounded px-3 py-2 cursor-move hover:bg-blue-200 transition-colors select-none"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Answer Button */}
              {!answered && (
                <Button onClick={() => {
                  checkDragDropAnswer()
                  nextQuestion()
                }} className="w-full">
                  Submit Answer
                </Button>
              )}

              {/* Reset Button */}
              {answered && (
                <Button variant="outline" onClick={resetDragDrop} className="w-full mr-2">
                  Try Again
                </Button>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>

              {/* Display image for Geometry */}
              {subject === "Geometry" && questions[currentQuestion].image && (
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200 shadow-lg">
                    <div className="transform scale-125">
                      {questions[currentQuestion].image}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => {
                  let dotColor = ""
                  if (subject === "Geometry") {
                    if (option.includes("Acute")) dotColor = "bg-green-500"
                    else if (option.includes("Right")) dotColor = "bg-blue-500"
                    else if (option.includes("Obtuse")) dotColor = "bg-orange-500"
                    else if (option.includes("Straight")) dotColor = "bg-purple-500"
                    else if (option.includes("Reflex")) dotColor = "bg-red-500"
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full p-3 text-left rounded-lg border transition-all flex items-center gap-3 ${
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
                      {subject === "Geometry" && <div className={`w-3 h-3 rounded-full ${dotColor}`}></div>}
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <Button onClick={nextQuestion} className="w-full">
              {currentQuestion < (lesson === "Parts of Speech" ? dragDropQuestions.length - 1 : questions.length - 1) ? "Next Question" : "Finish Quiz"}
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
