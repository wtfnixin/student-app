"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "hi" | "pa"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    appName: "Gyanika",

    // Navigation
    home: "Home",
    lessons: "Lessons",
    quizzes: "Quizzes",
    announcements: "Announcements",
    news: "News",

    // Dashboard
    learning: "Learning",
    classStudent: "Class Student",
    attendance: "Attendance",
    score: "Score",
    viewProgress: "View Progress",

    // Subjects
    math: "Math",
    punjabi: "Punjabi", // Changed from science to punjabi
    english: "English",
    hindi: "Hindi",

    // Quiz section
    availableQuizzes: "Available Quizzes",
    mathQuiz: "Math Quiz",
    scienceQuiz: "Science Quiz",
    englishQuiz: "English Quiz",
    hindiQuiz: "Hindi Quiz",
    progress: "Progress",
    startQuiz: "Start Quiz",

    // Lessons section
    interactiveLessons: "Interactive lessons coming soon!",

    // Announcements
    newMathLessons: "New Math Lessons Available!",
    newMathLessonsDesc: "Exciting new algebra and geometry lessons have been added to your curriculum.",
    quizCompetition: "Quiz Competition Next Week",
    quizCompetitionDesc: "Join the inter-class quiz competition and win exciting prizes!",
    hoursAgo: "hours ago",
    dayAgo: "day ago",

    // Language selector
    selectLanguage: "Select Language",

    // Login form
    yourLearningCompanion: "Your Learning Companion",
    fullName: "Full Name",
    emailAddress: "Email Address",
    password: "Password",
    phoneNumber: "Phone Number (Optional)",
    signIn: "Sign In",
    createAccount: "Create Account",
    pleaseWait: "Please wait...",
    dontHaveAccount: "Don't have an account? Sign up",
    alreadyHaveAccount: "Already have an account? Sign in",

    // Resources
    resources: "Resources",
    uploadedBy: "Uploaded by",
    teacherA: "Teacher A",
    teacherB: "Teacher B",
    teacherC: "Teacher C",
  },
  hi: {
    // Header
    appName: "ज्ञानिका",

    // Navigation
    home: "होम",
    lessons: "पाठ",
    quizzes: "प्रश्नोत्तरी",
    announcements: "घोषणाएं",
    news: "समाचार",

    // Dashboard
    learning: "सीखना",
    classStudent: "कक्षा छात्र",
    attendance: "उपस्थिति",
    score: "अंक",
    viewProgress: "प्रगति देखें",

    // Subjects
    math: "गणित",
    punjabi: "पंजाबी", // Changed from science to punjabi
    english: "अंग्रेजी",
    hindi: "हिंदी",

    // Quiz section
    availableQuizzes: "उपलब्ध प्रश्नोत्तरी",
    mathQuiz: "गणित प्रश्नोत्तरी",
    scienceQuiz: "विज्ञान प्रश्नोत्तरी",
    englishQuiz: "अंग्रेजी प्रश्नोत्तरी",
    hindiQuiz: "हिंदी प्रश्नोत्तरी",
    progress: "प्रगति",
    startQuiz: "प्रश्नोत्तरी शुरू करें",

    // Lessons section
    interactiveLessons: "इंटरैक्टिव पाठ जल्द आ रहे हैं!",

    // Announcements
    newMathLessons: "नए गणित पाठ उपलब्ध!",
    newMathLessonsDesc: "आपके पाठ्यक्रम में रोमांचक नए बीजगणित और ज्यामिति पाठ जोड़े गए हैं।",
    quizCompetition: "अगले सप्ताह प्रश्नोत्तरी प्रतियोगिता",
    quizCompetitionDesc: "अंतर-कक्षा प्रश्नोत्तरी प्रतियोगिता में शामिल हों और रोमांचक पुरस्कार जीतें!",
    hoursAgo: "घंटे पहले",
    dayAgo: "दिन पहले",

    // Language selector
    selectLanguage: "भाषा चुनें",

    // Login form
    yourLearningCompanion: "आपका शिक्षा साथी",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    password: "पासवर्ड",
    phoneNumber: "फोन नंबर (वैकल्पिक)",
    signIn: "साइन इन करें",
    createAccount: "खाता बनाएं",
    pleaseWait: "कृपया प्रतीक्षा करें...",
    dontHaveAccount: "खाता नहीं है? साइन अप करें",
    alreadyHaveAccount: "पहले से खाता है? साइन इन करें",

    // Resources
    resources: "संसाधन",
    uploadedBy: "अपलोड किया गया",
    teacherA: "शिक्षक A",
    teacherB: "शिक्षक B",
    teacherC: "शिक्षक C",
  },
  pa: {
    // Header
    appName: "ਗਿਆਨਿਕਾ",

    // Navigation
    home: "ਘਰ",
    lessons: "ਪਾਠ",
    quizzes: "ਕਵਿਜ਼",
    announcements: "ਘੋਸ਼ਣਾਵਾਂ",
    news: "ਖ਼ਬਰਾਂ",

    // Dashboard
    learning: "ਸਿੱਖਣਾ",
    classStudent: "ਕਲਾਸ ਵਿਦਿਆਰਥੀ",
    attendance: "ਹਾਜ਼ਰੀ",
    score: "ਸਕੋਰ",
    viewProgress: "ਤਰੱਕੀ ਵੇਖੋ",

    // Subjects
    math: "ਗਣਿਤ",
    punjabi: "ਪੰਜਾਬੀ", // Changed from science to punjabi
    english: "ਅੰਗਰੇਜ਼ੀ",
    hindi: "ਹਿੰਦੀ",

    // Quiz section
    availableQuizzes: "ਉਪਲਬਧ ਕਵਿਜ਼",
    mathQuiz: "ਗਣਿਤ ਕਵਿਜ਼",
    scienceQuiz: "ਵਿਗਿਆਨ ਕਵਿਜ਼",
    englishQuiz: "ਅੰਗਰੇਜ਼ੀ ਕਵਿਜ਼",
    hindiQuiz: "ਹਿੰਦੀ ਕਵਿਜ਼",
    progress: "ਤਰੱਕੀ",
    startQuiz: "ਕਵਿਜ਼ ਸ਼ੁਰੂ ਕਰੋ",

    // Lessons section
    interactiveLessons: "ਇੰਟਰਐਕਟਿਵ ਪਾਠ ਜਲਦੀ ਆ ਰਹੇ ਹਨ!",

    // Announcements
    newMathLessons: "ਨਵੇਂ ਗਣਿਤ ਪਾਠ ਉਪਲਬਧ!",
    newMathLessonsDesc: "ਤੁਹਾਡੇ ਪਾਠਕ੍ਰਮ ਵਿੱਚ ਰੋਮਾਂਚਕ ਨਵੇਂ ਬੀਜਗਣਿਤ ਅਤੇ ਜਿਓਮੈਟਰੀ ਪਾਠ ਸ਼ਾਮਲ ਕੀਤੇ ਗਏ ਹਨ।",
    quizCompetition: "ਅਗਲੇ ਹਫ਼ਤੇ ਕਵਿਜ਼ ਮੁਕਾਬਲਾ",
    quizCompetitionDesc: "ਅੰਤਰ-ਕਲਾਸ ਕਵਿਜ਼ ਮੁਕਾਬਲੇ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ ਅਤੇ ਦਿਲਚਸਪ ਇਨਾਮ ਜਿੱਤੋ!",
    hoursAgo: "ਘੰਟੇ ਪਹਿਲਾਂ",
    dayAgo: "ਦਿਨ ਪਹਿਲਾਂ",

    // Language selector
    selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",

    // Login form
    yourLearningCompanion: "ਤੁਹਾਡਾ ਸਿੱਖਿਆ ਸਾਥੀ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    emailAddress: "ਈਮੇਲ ਪਤਾ",
    password: "ਪਾਸਵਰਡ",
    phoneNumber: "ਫੋਨ ਨੰਬਰ (ਵਿਕਲਪਿਕ)",
    signIn: "ਸਾਈਨ ਇਨ ਕਰੋ",
    createAccount: "ਖਾਤਾ ਬਣਾਓ",
    pleaseWait: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ...",
    dontHaveAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ? ਸਾਈਨ ਅੱਪ ਕਰੋ",
    alreadyHaveAccount: "ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ? ਸਾਈਨ ਇਨ ਕਰੋ",

    // Resources
    resources: "ਸਰੋਤ",
    uploadedBy: "ਅਪਲੋਡ ਕੀਤਾ ਗਿਆ",
    teacherA: "ਅਧਿਆਪਕ A",
    teacherB: "ਅਧਿਆਪਕ B",
    teacherC: "ਅਧਿਆਪਕ C",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
