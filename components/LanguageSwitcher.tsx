"use client"

import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, toggleLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isEnglish = language === "en"

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={cn(
          "relative flex items-center w-32 h-10 rounded-full p-1",
          "bg-white/10 backdrop-blur-md border border-white/20",
          className
        )}
      />
    )
  }

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "relative flex items-center w-32 h-10 rounded-full p-1 transition-all duration-300 overflow-hidden",
        "bg-white/10 backdrop-blur-md border border-white/20",
        "hover:bg-white/15 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50",
        "shadow-lg hover:shadow-xl",
        className
      )}
      aria-label={`Switch to ${isEnglish ? "Arabic" : "English"}`}
    >
      {/* Gold gradient background for active state - covers half the button */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 rounded-full"
        style={{
          width: "50%",
          background: "linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)",
        }}
        initial={false}
        animate={{
          x: isEnglish ? 0 : "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex items-center justify-between w-full h-full px-2">
        {/* English option */}
        <div
          className={cn(
            "flex items-center gap-1.5 flex-1 justify-center transition-all duration-300",
            isEnglish ? "text-[#1a1a1a] font-semibold" : "text-white/70 font-medium"
          )}
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="text-xs font-bold">EN</span>
        </div>

        {/* Arabic option */}
        <div
          className={cn(
            "flex items-center gap-1.5 flex-1 justify-center transition-all duration-300",
            !isEnglish ? "text-[#1a1a1a] font-semibold" : "text-white/70 font-medium"
          )}
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="text-xs font-bold">عربي</span>
        </div>
      </div>
    </button>
  )
}

