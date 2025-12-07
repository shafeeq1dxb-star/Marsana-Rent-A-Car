"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ShinyButton } from "@/components/ui/shiny-button"
import { CometCard } from "@/components/ui/comet-card"
import { useLanguage } from "@/lib/language-context"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Headset, Truck, ShieldCheck } from "lucide-react"

const translations = {
  en: {
    hero: {
      title1: "Welcome to Marsana Rent A Car",
      subtitle: "extra ordinary experience with unbeatable rates",
      cta: "View Our Fleet",
    },
    whyChoose: {
      title: "Why Choose Marsana?",
      subtitle: "Experience the difference with our exceptional service",
      benefits: [
        { title: "24/7 VIP Support", description: "Always here for you" },
        { title: "Doorstep Delivery", description: "We come to you" },
        { title: "No Hidden Fees", description: "" },
        { title: "VAT Included", description: "Our prices are VAT included" },
      ],
    },
  },
  ar: {
    hero: {
      title1: "مرحباً بك في مرسانا لتأجير السيارات",
      subtitle: "تجربة استثنائية بأسعار لا تقبل المنافسة",
      cta: "عرض الأسطول",
    },
    whyChoose: {
      title: "لماذا تختار مرسانا؟",
      subtitle: "اختبر الفرق مع خدمتنا المتميّزة",
      benefits: [
        { title: "دعم VIP على مدار الساعة", description: "نحن هنا دائماً من أجلك" },
        { title: "توصيل للمنزل", description: "نأتي إليك" },
        { title: "بدون رسوم خفية", description: "" },
        { title: "شامل ضريبة القيمة المضافة", description: "أسعارنا تشمل ضريبة القيمة المضافة" },
      ],
    },
  },
}

export default function WelcomePage() {
  const { language } = useLanguage()
  const t = translations[language]
  const icons = [Headset, Truck, ShieldCheck]

  return (
    <div className={`min-h-screen bg-background ${language === "ar" ? "rtl" : "ltr"} flex flex-col`}>
      <Navigation />
      
      <div className="flex-1">
        {/* Hero Section */}
        <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 via-transparent to-[#D4AF37]/20"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className={`${language === "ar" ? "lg:text-right lg:order-2" : "lg:text-left lg:order-1"}`}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-white mb-6 leading-tight"
                >
                  {t.hero.title1}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-base sm:text-lg md:text-xl text-gray-300 mb-8"
                >
                  {t.hero.subtitle}
                </motion.p>
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link href="/fleet">
                    <ShinyButton className="text-white text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                      <span className="flex items-center gap-2">
                        {t.hero.cta}
                        <ArrowRight className={`h-5 w-5 ${language === "ar" ? "rotate-180" : ""}`} />
                      </span>
                    </ShinyButton>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Side - Logo Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`${language === "ar" ? "lg:order-1 lg:pl-4" : "lg:order-2 lg:pl-8"}`}
              >
                <CometCard
                  rotateDepth={17.5}
                  translateDepth={20}
                  className="h-full max-w-md mx-auto lg:mx-0"
                >
                  <div className="backdrop-blur-xl bg-black/40 border-2 border-[#D4AF37]/40 rounded-xl p-6 md:p-8 shadow-xl hover:border-[#D4AF37]/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] relative overflow-hidden flex items-center justify-center min-h-[280px] md:min-h-[320px]">
                    <div className="absolute inset-0 rounded-xl border-2 border-[#D4AF37]/20 pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-center">
                      <img 
                        src="/logo.jpg"
                        alt="Marsana Logo" 
                        className="max-w-full h-auto max-h-[200px] md:max-h-[240px] object-contain opacity-90"
                        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
                      />
                    </div>
                  </div>
                </CometCard>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Why Choose Marsana Cards Section */}
        <div className="relative bg-black py-4 md:py-6 px-4 md:px-6 -mt-4 md:-mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl font-bold text-white text-center mb-4 md:mb-6"
            >
              {t.whyChoose.title}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto items-stretch">
              {t.whyChoose.benefits.slice(0, 3).map((benefit, index) => {
                const IconComponent = icons[index] || ShieldCheck
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="h-full flex min-h-[180px]"
                  >
                    <CometCard
                      rotateDepth={17.5}
                      translateDepth={20}
                      className="h-full w-full flex-1"
                    >
                      <div className="backdrop-blur-xl bg-black/40 border-2 border-[#D4AF37]/40 rounded-lg p-3 md:p-4 shadow-lg hover:border-[#D4AF37]/80 transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] h-full relative overflow-hidden flex flex-col min-h-[180px]">
                        <div className="absolute inset-0 rounded-lg border-2 border-[#D4AF37]/20 pointer-events-none" />
                        <div className="flex justify-center mb-2 flex-shrink-0">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-black/50 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center shadow-md">
                            <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-[#D4AF37]" />
                          </div>
                        </div>
                        <h3 className="text-sm md:text-base font-bold text-white mb-1 text-center leading-tight flex-shrink-0 min-h-[2.5rem] flex items-center justify-center">
                          {benefit.title.split(" ").slice(0, Math.ceil(benefit.title.split(" ").length / 2)).join(" ")}
                          {benefit.title.split(" ").length > 2 && (
                            <>
                              <br />
                              {benefit.title.split(" ").slice(Math.ceil(benefit.title.split(" ").length / 2)).join(" ")}
                            </>
                          )}
                        </h3>
                        <div className="mt-auto pt-1 min-h-[1.25rem] flex items-center justify-center">
                          {benefit.description ? (
                            <p className="text-gray-300 text-center text-xs">
                              {benefit.description}
                            </p>
                          ) : (
                            <p className="text-xs opacity-0">Placeholder</p>
                          )}
                        </div>
                      </div>
                    </CometCard>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

