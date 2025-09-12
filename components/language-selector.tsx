"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { Button } from "@/components/ui/button"

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en" as const, name: "English", flag: "🇺🇸" },
    { code: "hi" as const, name: "हिंदी", flag: "🇮🇳" },
    { code: "pa" as const, name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 border-white/30 text-purple-700 hover:bg-white hover:text-purple-800 shadow-lg"
      >
        <span className="mr-2">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">{currentLanguage?.name}</span>
        <span className="ml-2 text-xs">▼</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[140px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-left hover:bg-purple-50 flex items-center gap-3 transition-colors ${
                language === lang.code ? "bg-purple-100 text-purple-700" : "text-gray-700"
              }`}
            >
              <span>{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
