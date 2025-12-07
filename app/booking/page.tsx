"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowLeft, Home, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import Navigation from "@/components/navigation"
import BookingForm from "@/components/booking-form"
import { cars, getCarImage, CarData } from "@/lib/data"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

export default function BookingPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null)
  const [carAnimationKey, setCarAnimationKey] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get selected car from sessionStorage
    if (typeof window !== 'undefined') {
      const carId = sessionStorage.getItem('selectedCarId')
      if (carId) {
        const car = cars.find(c => c.id === parseInt(carId))
        if (car) {
          setSelectedCar(car)
        } else {
          // If car not found, redirect to fleet
          router.push('/fleet')
        }
      } else {
        // If no car selected, redirect to fleet
        router.push('/fleet')
      }
    }
  }, [router])

  if (!selectedCar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-background ${language === "ar" ? "rtl" : "ltr"} flex flex-col`}>
      <Navigation />
      
      <div 
        className="h-[calc(100dvh-64px)] bg-gray-50 flex flex-col overflow-hidden"
        style={{
          height: 'calc(100dvh - 64px)',
          overflow: 'hidden',
        }}
      >
        {/* Top Navigation Bar */}
        <div className="bg-black border-b border-gray-800 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0 gap-3">
          <Link
            href="/fleet"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition-colors flex-shrink-0"
          >
            <ArrowLeft className={`h-4 w-4 ${language === "ar" ? "rotate-180" : ""}`} />
            <span className="text-sm font-medium hidden sm:inline">
              {language === "ar" ? "العودة للأسطول" : "Back to Fleet"}
            </span>
          </Link>
          
          <div className="flex-1 flex justify-center">
            <LanguageSwitcher />
          </div>
          
          <Link
            href="/welcome"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition-colors flex-shrink-0"
          >
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline">
              {language === "ar" ? "الرئيسية" : "Home"}
            </span>
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          {/* Mobile: Car Image Section */}
          <div className="lg:hidden flex-shrink-0 h-[35vh] min-h-[280px] max-h-[320px] bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden" style={{ perspective: "1200px", perspectiveOrigin: "center center" }}>
            <div className="relative w-full h-full max-w-md flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              <motion.div
                key={`car-container-mobile-${selectedCar.id}-${carAnimationKey}`}
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], opacity: { duration: 1 } }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center", width: "100%", height: "100%" }}
                className="relative flex items-center justify-center"
              >
                <motion.img
                  key={`car-image-mobile-${selectedCar.id}-${carAnimationKey}`}
                  src={getCarImage(selectedCar.name)}
                  alt={selectedCar.name}
                  className="w-full h-full object-contain"
                  style={{
                    filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2))",
                    transform: "translateZ(0)",
                  }}
                  initial={{ scale: 0.2, filter: "blur(10px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], filter: { duration: 1.2 } }}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Left Sidebar - Car List (Desktop) */}
          <div className="hidden lg:flex w-64 xl:w-80 bg-white border-r border-gray-200 flex-col flex-shrink-0 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <Link
                href="/fleet"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center mb-4"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <h3 className="text-lg font-semibold text-gray-900">
                {language === "ar" ? "سيارات أخرى" : "Other Cars"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {language === "ar" ? "قارن مع خيارات مشابهة" : "Compare with similar options"}
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-3">
                {cars
                  .filter((car) => car.id !== selectedCar.id)
                  .map((car) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedCar(car)
                        setCarAnimationKey((prev) => prev + 1)
                        if (typeof window !== 'undefined') {
                          sessionStorage.setItem('selectedCarId', car.id.toString())
                        }
                      }}
                    >
                      <div className="w-full h-32 mb-2 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={getCarImage(car.name)}
                          alt={car.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">{car.name}</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === "ar" ? "يومي" : "Daily"}:</span>
                          <span className="font-semibold text-gray-900">{car.daily} {language === "ar" ? "ريال" : "SAR"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === "ar" ? "أسبوعي" : "Weekly"}:</span>
                          <span className="font-semibold text-gray-900">{car.weekly} {language === "ar" ? "ريال" : "SAR"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">{language === "ar" ? "شهري" : "Monthly"}:</span>
                          <span className="font-semibold text-gray-900">{car.monthly} {language === "ar" ? "ريال" : "SAR"}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>

          {/* Central Car Display (Desktop) */}
          <div className="hidden lg:flex flex-1 bg-gray-50 items-center justify-center p-2 sm:p-4 lg:p-6 relative min-h-0 flex-shrink-0 overflow-hidden" style={{ perspective: "1200px", perspectiveOrigin: "center center" }}>
            <div className="relative w-full h-full max-w-4xl flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
              <motion.div
                key={`car-container-${selectedCar.id}-${carAnimationKey}`}
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], opacity: { duration: 1 } }}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center center", width: "100%", height: "100%" }}
                className="relative flex items-center justify-center"
              >
                <motion.img
                  key={`car-image-${selectedCar.id}-${carAnimationKey}`}
                  src={getCarImage(selectedCar.name)}
                  alt={selectedCar.name}
                  className="w-full h-full object-contain"
                  style={{
                    filter: "drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4)) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3)) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2))",
                    transform: "translateZ(0)",
                  }}
                  initial={{ scale: 0.2, filter: "blur(10px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], filter: { duration: 1.2 } }}
                />
              </motion.div>
            </div>
          </div>

          {/* Booking Form */}
          <BookingForm selectedCar={selectedCar} />
        </div>
      </div>
    </div>
  )
}

