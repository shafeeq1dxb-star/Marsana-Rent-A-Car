"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null
    const initialLanguage = savedLanguage || "en"
    setLanguageState(initialLanguage)
    setMounted(true)
    applyLanguageSettings(initialLanguage)
  }, [])

  // Apply language settings (RTL/LTR, fonts, etc.)
  const applyLanguageSettings = (lang: Language) => {
    if (typeof window === "undefined") return
    
    const html = document.documentElement
    const body = document.body

    if (lang === "ar") {
      html.dir = "rtl"
      html.lang = "ar"
      body.classList.add("font-arabic")
      body.classList.remove("font-english")
    } else {
      html.dir = "ltr"
      html.lang = "en"
      body.classList.add("font-english")
      body.classList.remove("font-arabic")
    }
  }

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    applyLanguageSettings(lang)
  }

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en"
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language: mounted ? language : "en", setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}


