"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LanguageToggleProps {
  language: "en" | "ar"
  onToggle: () => void
  className?: string
}

export function LanguageToggle({ language, onToggle, className }: LanguageToggleProps) {
  const isEnglish = language === "en"

  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative flex items-center w-28 h-10 rounded-full p-0.5 transition-all duration-300 overflow-hidden",
        "bg-[oklch(0.95_0.01_250)]/20 backdrop-blur-md border border-[oklch(0.95_0.01_250)]/30",
        "hover:bg-[oklch(0.95_0.01_250)]/30 focus:outline-none focus:ring-2 focus:ring-[oklch(0.95_0.01_250)]/50",
        className
      )}
      aria-label="Toggle language"
    >
      {/* Background track */}
      <div className="absolute inset-0 rounded-full bg-[oklch(0.35_0.02_250)]/10" />
      
      {/* Sliding button */}
      <motion.div
        className="relative z-10 rounded-full bg-[oklch(0.95_0.01_250)]/60 backdrop-blur-sm shadow-lg flex items-center justify-center flex-shrink-0"
        style={{ width: '64px', height: '36px' }}
        animate={{
          x: isEnglish ? 2 : 46, // Move from left (2px padding) to right: 112px (w-28) - 64px (button) - 2px (padding) = 46px
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Flag container */}
        <div className="flex items-center justify-center w-full h-full">
          {isEnglish ? (
            // UK Flag (Union Jack)
            <div className="relative w-7 h-5 rounded overflow-hidden shadow-sm" style={{ background: '#012169' }}>
              {/* Blue background */}
              <div className="absolute inset-0" style={{ background: '#012169' }}></div>
              {/* White diagonal stripes */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom right, transparent 40%, white 40%, white 45%, transparent 45%, transparent 55%, white 55%, white 60%, transparent 60%)'
              }}></div>
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom left, transparent 40%, white 40%, white 45%, transparent 45%, transparent 55%, white 55%, white 60%, transparent 60%)'
              }}></div>
              {/* Red diagonal stripes */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom right, transparent 42%, #C8102E 42%, #C8102E 43%, transparent 43%, transparent 57%, #C8102E 57%, #C8102E 58%, transparent 58%)'
              }}></div>
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom left, transparent 42%, #C8102E 42%, #C8102E 43%, transparent 43%, transparent 57%, #C8102E 57%, #C8102E 58%, transparent 58%)'
              }}></div>
              {/* White cross */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-white"></div>
              {/* Red cross */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full" style={{ background: '#C8102E', width: '2px' }}></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5" style={{ background: '#C8102E', height: '2px' }}></div>
            </div>
          ) : (
            // Saudi Arabia Flag - More visible design
            <div className="relative w-7 h-5 rounded overflow-hidden shadow-sm" style={{ background: '#006C35' }}>
              {/* Green background */}
              <div className="absolute inset-0" style={{ background: '#006C35' }}></div>
              {/* White vertical stripe on left (Shahada area) - wider for visibility */}
              <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-white"></div>
              {/* White sword shape - more prominent */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-1 bg-white rotate-12 rounded-sm"></div>
              {/* Additional white decorative elements for better visibility */}
              <div className="absolute left-1 top-1/4 w-1 h-1.5 bg-white rounded-sm"></div>
              <div className="absolute left-1 bottom-1/4 w-1 h-1.5 bg-white rounded-sm"></div>
              {/* Small white dot for additional detail */}
              <div className="absolute left-2 top-1/3 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute left-2 bottom-1/3 w-0.5 h-0.5 bg-white rounded-full"></div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Text labels - positioned on sides, always visible */}
      <div className="absolute inset-0 flex items-center justify-between z-0 pointer-events-none">
        {/* EN label - visible on right when English is selected */}
        <span
          className={cn(
            "text-xs font-bold transition-all duration-300 absolute",
            isEnglish
              ? "text-[oklch(0.35_0.02_250)] opacity-100"
              : "text-[oklch(0.95_0.01_250)]/50 opacity-50"
          )}
          style={{ 
            right: isEnglish ? '4px' : '70px',
            transition: 'right 0.3s ease, opacity 0.3s ease, color 0.3s ease'
          }}
        >
          EN
        </span>
        {/* AR label - visible on left when Arabic is selected */}
        <span
          className={cn(
            "text-xs font-bold transition-all duration-300 absolute",
            !isEnglish
              ? "text-[oklch(0.35_0.02_250)] opacity-100"
              : "text-[oklch(0.95_0.01_250)]/50 opacity-50"
          )}
          style={{ 
            left: !isEnglish ? '4px' : '70px',
            transition: 'left 0.3s ease, opacity 0.3s ease, color 0.3s ease'
          }}
        >
          AR
        </span>
      </div>
    </button>
  )
}

