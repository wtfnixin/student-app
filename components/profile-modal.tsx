"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileModalProps {
  user: any
  onClose: () => void
  onLogout: () => void
}

export function ProfileModal({ user, onClose, onLogout }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  })

  const handleSave = () => {
    // Update user data in localStorage
    const updatedUser = { ...user, ...formData }
    localStorage.setItem("gyanika_user", JSON.stringify(updatedUser))
    setIsEditing(false)
    // In a real app, you'd update the parent component's state here
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Profile</CardTitle>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ×
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
          </div>

          {/* Profile Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              {isEditing ? (
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-900">{user.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-900">{user.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1 text-gray-900">{user.phone || "Not provided"}</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">Performance Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{user.attendance}%</p>
                <p className="text-sm text-gray-600">Attendance</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{user.averageScore}%</p>
                <p className="text-sm text-gray-600">Avg Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{user.completedQuizzes}</p>
                <p className="text-sm text-gray-600">Quizzes Done</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{user.totalQuizzes}</p>
                <p className="text-sm text-gray-600">Total Quizzes</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {isEditing ? (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                Edit Profile
              </Button>
            )}

            <Button variant="destructive" onClick={onLogout} className="w-full">
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
