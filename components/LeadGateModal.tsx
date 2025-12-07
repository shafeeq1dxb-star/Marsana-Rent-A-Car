"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { ShinyButton } from "@/components/ui/shiny-button"
import { useLanguage } from "@/lib/language-context"

interface LeadGateModalProps {
  isOpen: boolean
  onClose: () => void
}

const translations = {
  en: {
    headline: "Exclusive Corporate Fleet",
    subtext: "To maintain our competitive pricing, please verify your interest.",
    button: "Unlock Exclusive Rates via WhatsApp",
  },
  ar: {
    headline: "أسطول الشركات الحصري",
    subtext: "للحفاظ على أسعارنا التنافسية، يرجى التحقق من اهتمامك.",
    button: "فتح الأسعار الحصرية عبر واتساب",
  },
}

export default function LeadGateModal({ isOpen, onClose }: LeadGateModalProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const handleUnlock = () => {
    // Set verification flag in localStorage
    localStorage.setItem("is_verified", "true")
    
    // Open WhatsApp URL in new tab
    const whatsappUrl = "https://wa.me/966537489695?text=Hi%20Marsana,%20I%20am%20interested%20in%20your%20fleet.%20Please%20unlock%20the%20rates."
    window.open(whatsappUrl, "_blank")
    
    // Close modal
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Non-dismissible - Dark Theme */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9998]"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Modal - Animated from center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ 
              duration: 0.5, 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative w-full max-w-sm sm:max-w-md md:max-w-lg ${language === "ar" ? "rtl" : "ltr"}`}>
              {/* Glassmorphism Container - Dark Theme */}
              <div className="backdrop-blur-xl bg-black/60 border-2 border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
                {/* Golden border glow effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37]/20 pointer-events-none" />
                
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 rounded-2xl"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Headline - Gold Text */}
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 text-center bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent leading-tight"
                  >
                    {t.headline}
                  </motion.h2>
                  
                  {/* Subtext */}
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-gray-300 text-center mb-6 sm:mb-7 md:mb-8 text-sm sm:text-base md:text-lg leading-relaxed"
                  >
                    {t.subtext}
                  </motion.p>
                  
                  {/* WhatsApp Button - Shiny Button Style - Responsive */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <ShinyButton
                      onClick={handleUnlock}
                      className="w-full text-white text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                    >
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0" />
                      <span className="whitespace-nowrap">{t.button}</span>
                    </ShinyButton>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


