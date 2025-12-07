"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Car,
  Calendar,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  BadgePercent,
  MapPin,
  Truck,
  ArrowLeft,
  Settings,
  Share2,
  Battery,
  X,
  FileText,
  AlertCircle,
  CreditCard,
  Calculator,
  Mic,
  Paperclip,
  Send,
  Zap,
  User,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ShieldCheck,
  Tag,
  Headset,
  Key,
  Receipt,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShinyButton } from "@/components/ui/shiny-button"
import { HyperText } from "@/components/ui/hyper-text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import { CometCard } from "@/components/ui/comet-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Hero3 } from "@/components/ui/hero-3"
import { useLanguage } from "@/lib/language-context"
import Footer from "@/components/footer"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

type View = "landing" | "showcase" | "reservation" | "success" | "car-detail"
type CollectionMethod = "branch" | "delivery"
type Language = "en" | "ar"

interface CarData {
  id: number
  name: string
  year: number
  daily: number
  weekly: number
  monthly: number
  discount: number
}

// Function to get car image path - All using PNG format for transparency
const getCarImage = (carName: string): string => {
  const imageMap: Record<string, string> = {
    "KIA K3": "/KIAK3.png",
    "Suzuki Dzire": "/SuzukiDzire.png",
    "Toyota Corolla": "/ToyotaCorolla.png",
    "Hyundai Accent": "/HyundaiAccent.png",
    "Nissan Sunny": "/NissanSunny.png",
    "KIA Pegas": "/KIAPegas.png",
    "Toyota Yaris": "/ToyotaYaris.png",
    "Hyundai Grand i10": "/HyundaiGrandi10.png",
    "Hyundai Elantra": "/HyundaiElantra.png",
    "Suzuki Baleno": "/SuzukiBaleno.png",
  }
  return imageMap[carName] || `/.jpg?key=xqaqt&height=300&width=500&query=${carName}+luxury+car`
}

const cars: CarData[] = [
  { id: 1, name: "KIA K3", year: 2025, daily: 140, weekly: 910, monthly: 2850, discount: 10 },
  { id: 2, name: "Suzuki Dzire", year: 2024, daily: 95, weekly: 560, monthly: 2110, discount: 10 },
  { id: 3, name: "Toyota Corolla", year: 2025, daily: 172, weekly: 1050, monthly: 3800, discount: 10 },
  { id: 4, name: "Hyundai Accent", year: 2024, daily: 110, weekly: 630, monthly: 2550, discount: 10 },
  { id: 5, name: "Nissan Sunny", year: 2024, daily: 95, weekly: 560, monthly: 2100, discount: 10 },
  { id: 6, name: "KIA Pegas", year: 2025, daily: 95, weekly: 560, monthly: 2100, discount: 10 },
  { id: 7, name: "Toyota Yaris", year: 2024, daily: 110, weekly: 630, monthly: 2550, discount: 10 },
  { id: 8, name: "Hyundai Grand i10", year: 2024, daily: 95, weekly: 560, monthly: 2100, discount: 10 },
  { id: 9, name: "Hyundai Elantra", year: 2023, daily: 150, weekly: 945, monthly: 3600, discount: 10 },
  { id: 10, name: "Suzuki Baleno", year: 2024, daily: 100, weekly: 630, monthly: 2250, discount: 10 },
]

const translations = {
  en: {
    hero: {
      title1: "Welcome to Marsana Rent A Car",
      title2: "",
      brandName: "",
      subtitle: "extra ordinary experience with unbeatable rates",
      cta: "Reserve Your Vehicle",
    },
    whyChoose: {
      title: "Why Choose Marsana?",
      subtitle: "Experience the difference with our exceptional service",
      cta: "Get Started",
      back: "Back",
      benefits: [
        { title: "24/7 VIP Support", description: "Always here for you" },
        { title: "Doorstep Delivery", description: "We come to you" },
        { title: "No Hidden Fees", description: "" },
        { title: "VAT Included", description: "Our prices are VAT included" },
      ],
    },
    showcase: {
      title: "Choose Your Journey",
      subtitle: "Premium fleet with discounted pricing (VAT included)",
      disclaimer: "All prices shown are after 10% discount",
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      discount: "OFF",
      model: "Model",
      book: "Book This Car",
      includesVAT: "Discounted prices include VAT",
      back: "Back to Fleet",
    },
    form: {
      title: "Finalize Reservation",
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      emailOptional: "(Optional)",
      pickupDate: "Pickup Date",
      dropOffDate: "Drop-off Date",
      dateLimitError: "Pickup date must be within 3 days from today. Please select a date from today up to 3 days ahead.",
      collectionMethod: "Collection Method",
      pickupBranch: "Pickup from Branch",
      pickupDesc: "Collect from our location",
      delivery: "Delivery Service",
      deliveryDesc: "We deliver to you",
      deliveryFee: "+50 SAR",
      selectBranch: "Select Branch",
      totalAmount: "Total Amount:",
      includesVAT: "Includes VAT and 10% discount",
      confirm: "Confirm Request",
      back: "Back to Fleet",
    },
    success: {
      title: "Thank You!",
      message: "We have received your request. We will call you shortly to confirm your reservation.",
      details: "Your Reservation Details:",
      name: "Name:",
      phone: "Phone:",
      vehicle: "Vehicle:",
      pickup: "Pickup Date:",
      dropoff: "Drop-off Date:",
      collection: "Collection:",
      pickupFrom: "Pickup from",
      deliveryService: "Delivery Service",
      total: "Total Amount:",
      backHome: "Back to Home",
    },
  },
  ar: {
    hero: {
      title1: "مرحباً بك في مرسانا لتأجير السيارات",
      title2: "",
      brandName: "",
      subtitle: "تجربة استثنائية بأسعار لا تقبل المنافسة",
      cta: "احجز سيارتك",
    },
    whyChoose: {
      title: "لماذا تختار مرسانا؟",
      subtitle: "اختبر الفرق مع خدمتنا المتميّزة",
      cta: "ابدأ الآن",
      back: "رجوع",
        benefits: [
          { title: "دعم VIP على مدار الساعة", description: "نحن هنا دائماً من أجلك" },
          { title: "توصيل للمنزل", description: "نأتي إليك" },
          { title: "بدون رسوم خفية", description: "" },
          { title: "شامل ضريبة القيمة المضافة", description: "أسعارنا تشمل ضريبة القيمة المضافة" },
        ],
    },
    showcase: {
      title: "اختر رحلتك",
      subtitle: "أسطول متميز بأسعار مخفضة (شاملة ضريبة القيمة المضافة)",
      disclaimer: "جميع الأسعار المعروضة بعد خصم 10%",
      daily: "يومي",
      weekly: "أسبوعي",
      monthly: "شهري",
      discount: "خصم",
      model: "موديل",
      book: "احجز هذه السيارة",
      includesVAT: "الأسعار المخفضة شاملة ضريبة القيمة المضافة",
      back: "العودة للأسطول",
    },
    form: {
      title: "إتمام الحجز",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      emailOptional: "(اختياري)",
      pickupDate: "تاريخ الاستلام",
      dropOffDate: "تاريخ التسليم",
      dateLimitError: "يجب أن يكون تاريخ الاستلام خلال 3 أيام من اليوم. يرجى اختيار تاريخ من اليوم حتى 3 أيام قادمة.",
      collectionMethod: "طريقة الاستلام",
      pickupBranch: "استلام من الفرع",
      pickupDesc: "استلم من موقعنا",
      delivery: "خدمة التوصيل",
      deliveryDesc: "نوصل لك",
      deliveryFee: "+50 ريال",
      selectBranch: "اختر الفرع",
      totalAmount: "المبلغ الإجمالي:",
      includesVAT: "شامل ضريبة القيمة المضافة وخصم 10%",
      confirm: "تأكيد الطلب",
      back: "العودة للأسطول",
    },
    success: {
      title: "شكراً لك!",
      message: "لقد تلقينا طلبك. سنتصل بك قريباً لتأكيد حجزك.",
      details: "تفاصيل حجزك:",
      name: "الاسم:",
      phone: "الهاتف:",
      vehicle: "السيارة:",
      pickup: "تاريخ الاستلام:",
      dropoff: "تاريخ التسليم:",
      collection: "الاستلام:",
      pickupFrom: "استلام من",
      deliveryService: "خدمة التوصيل",
      total: "المبلغ الإجمالي:",
      backHome: "العودة للرئيسية",
    },
  },
}

const benefits = [
  {
    icon: Clock,
    image: "24+hours+customer+service+support",
  },
  {
    icon: Truck,
    image: "delivery+truck+doorstep+service",
  },
  {
    icon: Shield,
    image: "shield+protection+trust+security",
  },
  {
    icon: CheckCircle,
    image: "checkmark+verified+confirmed",
  },
]

export default function LandingPage() {
  const { language, setLanguage } = useLanguage()
  const [currentView, setCurrentView] = useState<View>("landing")
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null)
  const [mounted, setMounted] = useState(false)
  const [dateError, setDateError] = useState<string>("")
  const [carAnimationKey, setCarAnimationKey] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    countryCode: "+966",
    pickupDate: "",
    dropOffDate: "",
    email: "",
    collectionMethod: "branch" as CollectionMethod,
    selectedBranch: "Sulaimaniyya Jeddah",
  })

  // Calculate maximum pickup date (3 days from today - user can only book starting within 3 days)
  const getMaxPickupDate = () => {
    const today = new Date()
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 3)
    return maxDate.toISOString().split("T")[0]
  }

  // Minimum pickup date is today
  const getMinPickupDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  // Dropoff date has no maximum limit, but must be after pickup date
  const getMinDropoffDate = () => {
    if (formData.pickupDate) {
      const pickup = new Date(formData.pickupDate)
      const nextDay = new Date(pickup)
      nextDay.setDate(pickup.getDate() + 1)
      return nextDay.toISOString().split("T")[0]
    }
    return getMinPickupDate()
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Ensure scroll to top when ANY view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentView])

  // Handle mobile form field focus - scroll only the form container, not the whole page
  useEffect(() => {
    if (currentView !== "car-detail") return
    
    // Wait for DOM to be ready
    const timeoutId = setTimeout(() => {
      const formContainer = document.getElementById("booking-form-container")
      const formInputs = document.querySelectorAll("#booking-form input, #booking-form select, #booking-form textarea")
      
      if (!formContainer) return
      
      const handleFocus = (e: Event) => {
        const target = e.target as HTMLElement
        if (!formContainer || !target) return
        
        // Prevent window scroll
        window.scrollTo({ top: 0, behavior: 'instant' })
        
        // Delay to allow keyboard to appear on mobile
        setTimeout(() => {
          if (!formContainer || !target) return
          
          const containerRect = formContainer.getBoundingClientRect()
          const inputRect = target.getBoundingClientRect()
          
          // Get current scroll position
          const currentScrollTop = formContainer.scrollTop
          
          // Calculate input position relative to container's scrollable content
          const inputOffsetTop = (target as HTMLElement).offsetTop
          const containerPadding = 16 // padding from container
          const desiredPadding = 30 // desired padding from top when scrolled
          
          // Calculate where we want to scroll to
          let targetScrollTop = inputOffsetTop - desiredPadding
          
          // Ensure we don't scroll beyond bounds
          const maxScroll = formContainer.scrollHeight - formContainer.clientHeight
          targetScrollTop = Math.max(0, Math.min(targetScrollTop, maxScroll))
          
          // Only scroll if input is not already visible
          const inputVisibleTop = inputOffsetTop - currentScrollTop
          const inputVisibleBottom = inputVisibleTop + inputRect.height
          const visibleAreaTop = containerPadding
          const visibleAreaBottom = formContainer.clientHeight - containerPadding
          
          if (inputVisibleTop < visibleAreaTop || inputVisibleBottom > visibleAreaBottom) {
            formContainer.scrollTo({
              top: targetScrollTop,
              behavior: 'smooth'
            })
          }
        }, 400) // Delay for mobile keyboard animation
      }

      formInputs.forEach(input => {
        input.addEventListener('focus', handleFocus)
        // Also handle click/tap for mobile
        input.addEventListener('click', handleFocus)
      })

      return () => {
        formInputs.forEach(input => {
          input.removeEventListener('focus', handleFocus)
          input.removeEventListener('click', handleFocus)
        })
      }
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [currentView, selectedCar])


  const t = translations[language]

  const handleCarSelect = (car: CarData) => {
    setSelectedCar(car)
    setCarAnimationKey((prev) => prev + 1) // Trigger animation restart
    setCurrentView("car-detail")
    // Scroll to top immediately when navigating to car detail page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 0)
  }

  const handleShowcaseView = () => {
    setCurrentView("showcase")
    // Scroll to top immediately
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 0)
  }

  const calculateTotal = () => {
    if (!selectedCar || !formData.pickupDate || !formData.dropOffDate) return 0
    const pickup = new Date(formData.pickupDate)
    const dropOff = new Date(formData.dropOffDate)
    const diffTime = Math.abs(dropOff.getTime() - pickup.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let basePrice = 0
    if (diffDays < 7) {
      // Less than 7 days: daily rate
      basePrice = diffDays * selectedCar.daily
    } else if (diffDays >= 7 && diffDays < 30) {
      // 7-29 days: weekly rate divided by 7, multiplied by days
      const dailyRateFromWeekly = selectedCar.weekly / 7
      basePrice = dailyRateFromWeekly * diffDays
    } else {
      // 30+ days: monthly rate divided by 30, multiplied by days
      const dailyRateFromMonthly = selectedCar.monthly / 30
      basePrice = dailyRateFromMonthly * diffDays
    }

    // Add delivery fee if delivery service is selected
    const deliveryFee = formData.collectionMethod === "delivery" ? 50 : 0
    return Math.round(basePrice + deliveryFee)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCar) return

    const total = calculateTotal()
    
    const submissionData = {
      fullName: formData.fullName,
      phone: formData.phone,
      countryCode: formData.countryCode,
      email: formData.email,
      carName: selectedCar.name,
      carYear: selectedCar.year,
      pickupDate: formData.pickupDate,
      dropOffDate: formData.dropOffDate,
      collectionMethod: formData.collectionMethod,
      selectedBranch: formData.selectedBranch,
      total: total,
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setCurrentView("success")
      } else {
        // Still show success even if API fails (graceful degradation)
        setCurrentView("success")
      }
    } catch (error) {
      // Still show success even if API fails (graceful degradation)
      console.error("Error submitting form:", error)
      setCurrentView("success")
    }
  }

  return (
    <div className={`min-h-screen bg-background ${mounted && language === "ar" ? "rtl" : "ltr"} flex flex-col`}>
      <div className="flex-1">
        <AnimatePresence mode="wait">
        {currentView === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen bg-black"
          >
            {/* Hero Section */}
            <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
              {/* Language Switcher - Top Right */}
              <div className="absolute top-4 right-4 z-20">
                <LanguageSwitcher />
              </div>
              
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

              {/* Content Container - Two Column Layout */}
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
                    
                    {/* Get Started Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      {/* English Get Started Button */}
                      <ShinyButton
                        onClick={() => {
                          setLanguage("en")
                          // Force immediate language application
                          setTimeout(() => {
                            handleShowcaseView()
                          }, 100)
                        }}
                        className="text-white text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">
                          Get Started
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </ShinyButton>
                      
                      {/* Arabic Get Started Button */}
                      <ShinyButton
                        onClick={() => {
                          setLanguage("ar")
                          // Force immediate language application
                          setTimeout(() => {
                            handleShowcaseView()
                          }, 100)
                        }}
                        className="text-white text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">
                          ابدأ الآن
                          <ArrowRight className="h-5 w-5 rotate-180" />
                        </span>
                      </ShinyButton>
                    </motion.div>
                  </motion.div>

                  {/* Right Side - Logo Card - Reduced Size */}
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
                        {/* Golden border glow effect */}
                        <div className="absolute inset-0 rounded-xl border-2 border-[#D4AF37]/20 pointer-events-none" />
                        
                        {/* Logo - Reduced Size */}
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

            {/* Why Choose Marsana Cards Section - Further Reduced Size */}
            <div className="relative bg-black py-4 md:py-6 px-4 md:px-6 -mt-4 md:-mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-5xl mx-auto"
              >
                {/* Section Title - Further Reduced Size */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl lg:text-2xl font-bold text-white text-center mb-4 md:mb-6"
                >
                  {t.whyChoose.title}
                </motion.h2>

                {/* 3 Cards Grid - Further Reduced Size - Equal Heights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto items-stretch">
                  {t.whyChoose.benefits.slice(0, 3).map((benefit, index) => {
                    const icons = [Headset, Truck, ShieldCheck]
                    const IconComponent = icons[index] || Shield
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
                            {/* Golden border glow effect */}
                            <div className="absolute inset-0 rounded-lg border-2 border-[#D4AF37]/20 pointer-events-none" />
                            {/* Icon - Further Reduced Size */}
                            <div className="flex justify-center mb-2 flex-shrink-0">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-black/50 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center shadow-md">
                                <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-[#D4AF37]" />
                              </div>
                            </div>
                            
                            {/* Title - Further Reduced Size */}
                            <h3 className="text-sm md:text-base font-bold text-white mb-1 text-center leading-tight flex-shrink-0 min-h-[2.5rem] flex items-center justify-center">
                              {benefit.title.split(" ").slice(0, Math.ceil(benefit.title.split(" ").length / 2)).join(" ")}
                              {benefit.title.split(" ").length > 2 && (
                                <>
                                  <br />
                                  {benefit.title.split(" ").slice(Math.ceil(benefit.title.split(" ").length / 2)).join(" ")}
                                </>
                              )}
                            </h3>
                            
                            {/* Description - Further Reduced Size - Always show space even if empty */}
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
          </motion.div>
        )}

        {currentView === "showcase" && (
          <motion.div
            key="showcase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen py-16 px-4 metallic-matte-white relative"
          >
            {/* Language Switcher - Top Right */}
            <div className="absolute top-6 right-6 z-20">
              <LanguageSwitcher />
            </div>
            <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
              <img src="/logo.jpg" alt="Marsana Logo" className="h-16 w-auto drop-shadow-xl md:h-[150px]" />
            </div>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 pt-8">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{t.showcase.title}</h2>
                <p className="text-muted-foreground text-lg">{t.showcase.subtitle}</p>
                <p className="text-sm text-[oklch(0.35_0.02_250)] font-semibold mt-2">{t.showcase.disclaimer}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {cars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[oklch(0.35_0.02_250)]/20 bg-[oklch(0.95_0.01_250)]/80 backdrop-blur-md shadow-xl">
                      <div className="relative">
                        <img
                          src={getCarImage(car.name)}
                          alt={`${car.name} ${car.year}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-[oklch(0.35_0.02_250)] text-[oklch(0.95_0.01_250)] px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                          <BadgePercent className="h-3 w-3" />
                          {car.discount}% {t.showcase.discount}
                        </div>
                      </div>
                      <CardHeader className="p-3 pb-1.5">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                          <Car className="h-3.5 w-3.5 text-[oklch(0.35_0.02_250)]" />
                          {car.name}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {car.year} {t.showcase.model}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 pt-1.5">
                        <div className="space-y-1.5 mb-2 relative">
                          <div className="flex justify-between items-center py-0.5 border-b border-border/50">
                            <span className="text-muted-foreground text-xs">{t.showcase.daily}</span>
                            <span className="text-base font-bold text-foreground">
                              {car.daily} {language === "ar" ? "ريال" : "SAR"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-0.5 border-b border-border/50">
                            <span className="text-muted-foreground text-xs">{t.showcase.weekly}</span>
                            <span className="text-base font-bold text-foreground">
                              {car.weekly} {language === "ar" ? "ريال" : "SAR"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-0.5 border-b border-border/50">
                            <span className="text-muted-foreground text-xs">{t.showcase.monthly}</span>
                            <span className="text-base font-bold text-foreground">
                              {car.monthly} {language === "ar" ? "ريال" : "SAR"}
                            </span>
                          </div>
                        </div>
                        <div className="bg-muted/50 backdrop-blur-sm p-1.5 rounded-lg mb-2">
                          <p className="text-xs text-center flex items-center justify-center gap-1">
                            <CheckCircle className="h-3 w-3 text-[oklch(0.35_0.02_250)]" />
                            <span className="font-semibold text-xs">{t.showcase.includesVAT}</span>
                          </p>
                        </div>
                        <Button
                          className="w-full bg-[oklch(0.35_0.02_250)] hover:bg-[oklch(0.42_0.02_250)] text-[oklch(0.95_0.01_250)] text-sm py-2"
                          onClick={() => handleCarSelect(car)}
                        >
                          {t.showcase.book}
                          <ArrowRight className={`${language === "ar" ? "mr-2 rotate-180" : "ml-2"} h-3 w-3`} />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setCurrentView("landing")}
                  className="px-8 py-6 rounded-full"
                >
                  <ArrowLeft className={`${language === "ar" ? "ml-2 rotate-180" : "mr-2"} h-5 w-5`} />
                  {t.showcase.back}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {currentView === "reservation" && selectedCar && (
          <motion.div
            key="reservation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-gray-900 flex flex-col lg:flex-row"
          >
            <div className="absolute top-8 right-8 z-20 flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-[oklch(0.95_0.01_250)]/50 via-[oklch(0.95_0.01_250)]/20 to-transparent blur-3xl scale-[2] -z-10"></div>
                <div className="absolute inset-0 bg-[oklch(0.95_0.01_250)]/30 blur-2xl scale-150 -z-10"></div>
                <img
                  src="/logo.jpg"
                  alt="Marsana Logo"
                  className="h-16 w-auto drop-shadow-xl md:h-[150px] relative z-10"
                />
              </div>
            </div>
            <div className="max-w-2xl w-full">
              <Card className="bg-[oklch(0.95_0.01_250)]/20 backdrop-blur-md shadow-2xl border border-[oklch(0.95_0.01_250)]/30">
                <CardHeader className="bg-[oklch(0.35_0.02_250)]/30 backdrop-blur-sm border-b border-[oklch(0.95_0.01_250)]/20">
                  <CardTitle className="font-serif text-3xl font-bold flex items-center gap-3 text-[oklch(0.95_0.01_250)]">
                    <Car className="h-8 w-8" />
                    {t.form.title}
                  </CardTitle>
                  <CardDescription className="text-[oklch(0.88_0.01_250)] text-lg">
                    {selectedCar.name} ({selectedCar.year})
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="fullName" className="text-base font-semibold mb-2 block">
                        {t.form.fullName} *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="h-12 text-base border-2 focus:border-[oklch(0.35_0.02_250)] focus:ring-[oklch(0.35_0.02_250)]"
                        placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                        {t.form.phone} *
                      </Label>
                      <div className="flex gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                          className="h-12 px-3 border-2 rounded-md border-input bg-background focus:border-[oklch(0.35_0.02_250)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.35_0.02_250)]"
                        >
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+973">🇧🇭 +973</option>
                          <option value="+974">🇶🇦 +974</option>
                          <option value="+965">🇰🇼 +965</option>
                        </select>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="flex-1 h-12 text-base border-2 focus:border-[oklch(0.35_0.02_250)] focus:ring-[oklch(0.35_0.02_250)]"
                          placeholder="5xxxxxxxx"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-base font-semibold mb-3 block">{t.form.collectionMethod} *</Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, collectionMethod: "branch" })}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            formData.collectionMethod === "branch"
                              ? "border-[oklch(0.35_0.02_250)] bg-[oklch(0.35_0.02_250)]/10"
                              : "border-border hover:border-[oklch(0.35_0.02_250)]/50"
                          }`}
                        >
                          <MapPin className="h-6 w-6 mx-auto mb-2 text-[oklch(0.35_0.02_250)]" />
                          <div className="font-semibold">{t.form.pickupBranch}</div>
                          <div className="text-sm text-muted-foreground mt-1">{t.form.pickupDesc}</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, collectionMethod: "delivery" })}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 relative ${
                            formData.collectionMethod === "delivery"
                              ? "border-[oklch(0.35_0.02_250)] bg-[oklch(0.35_0.02_250)]/10"
                              : "border-border hover:border-[oklch(0.35_0.02_250)]/50"
                          }`}
                        >
                          <Truck className="h-6 w-6 mx-auto mb-2 text-[oklch(0.35_0.02_250)]" />
                          <div className="font-semibold">{t.form.delivery}</div>
                          <div className="text-sm text-muted-foreground mt-1">{t.form.deliveryDesc}</div>
                          <div className="absolute top-2 right-2 bg-[oklch(0.35_0.02_250)] text-[oklch(0.95_0.01_250)] text-xs px-2 py-1 rounded-full font-bold">
                            {t.form.deliveryFee}
                          </div>
                        </button>
                      </div>
                    </div>
                    {formData.collectionMethod === "branch" && (
                      <div>
                        <Label htmlFor="branch" className="text-base font-semibold mb-2 block">
                          {t.form.selectBranch} *
                        </Label>
                        <select
                          id="branch"
                          value={formData.selectedBranch}
                          onChange={(e) => setFormData({ ...formData, selectedBranch: e.target.value })}
                          className="w-full h-12 px-4 border-2 rounded-md border-input bg-background focus:border-[oklch(0.35_0.02_250)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.35_0.02_250)] text-base"
                          required
                        >
                          <option value="Sulaimaniyya Jeddah">
                            {language === "ar" ? "السليمانية، جدة" : "Sulaimaniyya, Jeddah"}
                          </option>
                          <option value="Garnatha Jeddah">
                            {language === "ar" ? "غرناطة، جدة" : "Garnatha, Jeddah"}
                          </option>
                        </select>
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="pickupDate"
                          className="text-base font-semibold mb-2 block flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4 text-[oklch(0.35_0.02_250)]" />
                          {t.form.pickupDate} *
                        </Label>
                        <Input
                          id="pickupDate"
                          type="date"
                          required
                          value={formData.pickupDate}
                          onChange={(e) => {
                            const selectedDate = e.target.value
                            const maxDate = getMaxPickupDate()
                            const minDate = getMinPickupDate()
                            
                            if (selectedDate > maxDate) {
                              setDateError(t.form.dateLimitError)
                              setFormData({ ...formData, pickupDate: "", dropOffDate: "" })
                            } else if (selectedDate < minDate) {
                              setDateError(language === "ar" ? "يرجى اختيار تاريخ من اليوم فصاعدًا" : "Please select a date from today onwards")
                              setFormData({ ...formData, pickupDate: "", dropOffDate: "" })
                            } else {
                              setDateError("")
                              setFormData({ ...formData, pickupDate: selectedDate, dropOffDate: "" })
                            }
                          }}
                          className="h-12 text-base border-2 border-gray-300 bg-white text-gray-900 focus:border-[oklch(0.35_0.02_250)] focus:ring-[oklch(0.35_0.02_250)] rounded-lg"
                          min={getMinPickupDate()}
                          max={getMaxPickupDate()}
                        />
                        {dateError && (
                          <p className="text-sm text-red-500 mt-2 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {dateError}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="dropOffDate"
                          className="text-base font-semibold mb-2 block flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4 text-[oklch(0.35_0.02_250)]" />
                          {t.form.dropOffDate} *
                        </Label>
                        <Input
                          id="dropOffDate"
                          type="date"
                          required
                          value={formData.dropOffDate}
                          onChange={(e) => {
                            const selectedDate = e.target.value
                            const minDate = getMinDropoffDate()
                            
                            if (selectedDate < minDate) {
                              setDateError(language === "ar" ? "يجب أن يكون تاريخ التسليم بعد تاريخ الاستلام" : "Drop-off date must be after pickup date")
                              setFormData({ ...formData, dropOffDate: "" })
                            } else {
                              setDateError("")
                              setFormData({ ...formData, dropOffDate: selectedDate })
                            }
                          }}
                          className="h-12 text-base border-2 border-gray-300 bg-white text-gray-900 focus:border-[oklch(0.35_0.02_250)] focus:ring-[oklch(0.35_0.02_250)] rounded-lg"
                          min={getMinDropoffDate()}
                          disabled={!formData.pickupDate}
                        />
                      </div>
                    </div>
                    {formData.pickupDate && formData.dropOffDate && (
                      <div className="bg-[oklch(0.35_0.02_250)]/10 border-2 border-[oklch(0.35_0.02_250)] rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-foreground">{t.form.totalAmount}</span>
                          <span className="text-2xl font-bold text-[oklch(0.35_0.02_250)]">
                            {calculateTotal()} {language === "ar" ? "ريال" : "SAR"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{t.form.includesVAT}</p>
                        {formData.collectionMethod === "delivery" && (
                          <p className="text-sm text-[oklch(0.35_0.02_250)] font-semibold mt-1">
                            {language === "ar" ? "(يشمل 50 ريال رسوم التوصيل)" : "(Includes 50 SAR delivery fee)"}
                          </p>
                        )}
                      </div>
                    )}
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                        {t.form.email} <span className="text-muted-foreground font-normal">{t.form.emailOptional}</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 text-base border-2 focus:border-[oklch(0.35_0.02_250)] focus:ring-[oklch(0.35_0.02_250)]"
                        placeholder={language === "ar" ? "بريدك@مثال.com" : "your.email@example.com"}
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setSelectedCar(null)
                          handleShowcaseView()
                        }}
                        className="flex-1 py-6 rounded-full"
                      >
                        <ArrowLeft className={`${language === "ar" ? "ml-2 rotate-180" : "mr-2"} h-5 w-5`} />
                        {t.form.back}
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1 bg-[oklch(0.35_0.02_250)] hover:bg-[oklch(0.42_0.02_250)] text-[oklch(0.95_0.01_250)] text-lg py-6 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <CheckCircle className={`${language === "ar" ? "ml-2" : "mr-2"} h-5 w-5`} />
                        {t.form.confirm}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {currentView === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Language Switcher - Top Right */}
            <div className="absolute top-6 right-6 z-20">
              <LanguageSwitcher />
            </div>
            
            <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[oklch(0.18_0.05_250)] via-[oklch(0.15_0_0)] to-[oklch(0.12_0_0)]">
              <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-[oklch(0.95_0.01_250)]/50 via-[oklch(0.95_0.01_250)]/20 to-transparent blur-3xl scale-[2] -z-10"></div>
                <div className="absolute inset-0 bg-[oklch(0.95_0.01_250)]/30 blur-2xl scale-150 -z-10"></div>
                <img
                  src="/logo.jpg"
                  alt="Marsana Logo"
                  className="h-16 w-auto drop-shadow-xl md:h-[150px] relative z-10"
                />
              </div>
              </div>
              <div className="text-center max-w-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="bg-[oklch(0.35_0.02_250)] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <CheckCircle className="h-12 w-12 text-[oklch(0.95_0.01_250)]" />
                </div>
              </motion.div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[oklch(0.95_0.01_250)] mb-4">{t.success.title}</h2>
              <p className="text-xl text-[oklch(0.88_0.01_250)] mb-8">{t.success.message}</p>
              <div className="bg-[oklch(0.95_0.01_250)]/20 backdrop-blur-md p-6 rounded-lg mb-8 border border-[oklch(0.95_0.01_250)]/30">
                <h3 className="font-semibold text-lg mb-3 text-[oklch(0.95_0.01_250)]">{t.success.details}</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-[oklch(0.88_0.01_250)]">{t.success.name}</span>
                    <span className="font-semibold text-[oklch(0.95_0.01_250)]">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[oklch(0.88_0.01_250)]">{t.success.phone}</span>
                    <span className="font-semibold text-[oklch(0.95_0.01_250)]">
                      {formData.countryCode} {formData.phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[oklch(0.88_0.01_250)]">{t.success.vehicle}</span>
                    <span className="font-semibold text-[oklch(0.95_0.01_250)]">
                      {selectedCar?.name} ({selectedCar?.year})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[oklch(0.88_0.01_250)]">{t.success.pickup}</span>
                    <span className="font-semibold text-[oklch(0.95_0.01_250)]">{formData.pickupDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[oklch(0.88_0.01_250)]">{t.success.dropoff}</span>
                    <span className="font-semibold text-[oklch(0.95_0.01_250)]">{formData.dropOffDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[oklch(0.88_0.01_250)]">{t.success.collection}</span>
                    <span className="font-semibold text-[oklch(0.95_0.01_250)]">
                      {formData.collectionMethod === "branch"
                        ? `${t.success.pickupFrom} ${formData.selectedBranch}`
                        : t.success.deliveryService}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[oklch(0.95_0.01_250)]/20">
                    <span className="text-[oklch(0.88_0.01_250)]">{t.success.total}</span>
                    <span className="font-bold text-xl text-[oklch(0.95_0.01_250)]">
                      {calculateTotal()} {language === "ar" ? "ريال" : "SAR"}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => {
                  setCurrentView("landing")
                  setSelectedCar(null)
                  setFormData({
                    fullName: "",
                    phone: "",
                    countryCode: "+966",
                    pickupDate: "",
                    dropOffDate: "",
                    email: "",
                    collectionMethod: "branch",
                    selectedBranch: "Sulaimaniyya Jeddah",
                  })
                }}
                className="bg-[oklch(0.35_0.02_250)] hover:bg-[oklch(0.42_0.02_250)] text-[oklch(0.95_0.01_250)] px-8 py-6 rounded-full"
              >
                {t.success.backHome}
              </Button>
              </div>
            </div>
          </motion.div>
          )}

          {currentView === "car-detail" && selectedCar && (
            <motion.div
              key="car-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-screen bg-gray-50 flex flex-col overflow-hidden fixed inset-0 w-full z-50"
              onAnimationStart={() => {
                // Ensure scroll to top when component mounts
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            >
              {/* Top Navigation Bar - Black Header */}
              <div className="bg-black border-b border-gray-800 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0 gap-3">
                {/* Back to Fleet Button - Left */}
                <button
                  onClick={handleShowcaseView}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition-colors flex-shrink-0"
                >
                  <ArrowLeft className={`h-4 w-4 ${language === "ar" ? "rotate-180" : ""}`} />
                  <span className="text-sm font-medium hidden sm:inline">{t.showcase.back}</span>
                </button>
                
                {/* Language Switcher - Center */}
                <div className="flex-1 flex justify-center">
                  <LanguageSwitcher />
                </div>
                
                {/* Home Button - Right */}
                <button
                  onClick={() => setCurrentView("landing")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition-colors flex-shrink-0"
                >
                  <Home className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:inline">{language === "ar" ? "الرئيسية" : "Home"}</span>
                </button>
              </div>

              {/* Main Content Area - Mobile Responsive - Fits Screen */}
              <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
                {/* Mobile: Car Image Section - Top Half */}
                <div className="lg:hidden flex-shrink-0 h-[45vh] min-h-[350px] bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden" style={{ perspective: "1200px", perspectiveOrigin: "center center" }}>
                  <div className="relative w-full h-full max-w-md flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                    <motion.div
                      key={`car-container-mobile-${selectedCar.id}-${carAnimationKey}`}
                      initial={{ 
                        scale: 0.2,
                        opacity: 0,
                      }}
                      animate={{ 
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 1 },
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center center",
                        width: "100%",
                        height: "100%",
                      }}
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
                        initial={{ 
                          scale: 0.2,
                          filter: "blur(10px)",
                        }}
                        animate={{ 
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                          filter: { duration: 1.2 },
                        }}
                      />
                      {/* Subtle glow effect for depth */}
                      <motion.div
                        key={`car-glow-mobile-${selectedCar.id}-${carAnimationKey}`}
                        className="absolute inset-0 -z-10"
                        style={{
                          background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 70%)",
                          filter: "blur(40px)",
                        }}
                        initial={{ 
                          scale: 0.3, 
                          opacity: 0,
                        }}
                        animate={{ 
                          scale: 2, 
                          opacity: 0.4,
                        }}
                        transition={{
                          duration: 2,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
                
                {/* Left Sidebar - Scrolling Car List */}
                <div className="hidden lg:flex w-64 xl:w-80 bg-white border-r border-gray-200 flex-col flex-shrink-0 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex-shrink-0">
                    <button
                      onClick={handleShowcaseView}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center mb-4"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <h3 className="text-lg font-semibold text-gray-900">Other Cars</h3>
                    <p className="text-sm text-gray-500 mt-1">Compare with similar options</p>
                  </div>
                  
                  {/* Scrolling Car List */}
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
                              setCarAnimationKey((prev) => prev + 1) // Trigger animation restart
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                          >
                            {/* Car Image */}
                            <div className="w-full h-32 mb-2 rounded-md overflow-hidden bg-gray-100">
                              <img
                                src={getCarImage(car.name)}
                                alt={car.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            
                            {/* Car Name */}
                            <h4 className="font-semibold text-gray-900 text-sm mb-2">{car.name}</h4>
                            
                            {/* Prices */}
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-600">{t.showcase.daily}:</span>
                                <span className="font-semibold text-gray-900">{car.daily} {language === "ar" ? "ريال" : "SAR"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">{t.showcase.weekly}:</span>
                                <span className="font-semibold text-gray-900">{car.weekly} {language === "ar" ? "ريال" : "SAR"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">{t.showcase.monthly}:</span>
                                <span className="font-semibold text-gray-900">{car.monthly} {language === "ar" ? "ريال" : "SAR"}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Central Car Display - Coming from Inside Screen Animation - Desktop Only */}
                <div className="hidden lg:flex flex-1 bg-gray-50 items-center justify-center p-2 sm:p-4 lg:p-6 relative min-h-0 flex-shrink-0 overflow-hidden" style={{ perspective: "1200px", perspectiveOrigin: "center center" }}>
                  <div className="relative w-full h-full max-w-4xl flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                    <motion.div
                      key={`car-container-${selectedCar.id}-${carAnimationKey}`}
                      initial={{ 
                        scale: 0.2,
                        opacity: 0,
                      }}
                      animate={{ 
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 1 },
                      }}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center center",
                        width: "100%",
                        height: "100%",
                      }}
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
                        initial={{ 
                          scale: 0.2,
                          filter: "blur(10px)",
                        }}
                        animate={{ 
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          duration: 1.5,
                          ease: [0.16, 1, 0.3, 1],
                          filter: { duration: 1.2 },
                        }}
                      />
                      {/* Subtle glow effect for depth */}
                      <motion.div
                        key={`car-glow-${selectedCar.id}-${carAnimationKey}`}
                        className="absolute inset-0 -z-10"
                        style={{
                          background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 70%)",
                          filter: "blur(40px)",
                        }}
                        initial={{ 
                          scale: 0.3, 
                          opacity: 0,
                        }}
                        animate={{ 
                          scale: 2, 
                          opacity: 0.4,
                        }}
                        transition={{
                          duration: 2,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Right Sidebar - Reservation Form - Mobile Responsive */}
                <div className="w-full lg:w-80 xl:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-3 sm:p-4 flex flex-col flex-shrink-0 overflow-y-auto min-h-0 max-h-[55vh] lg:max-h-screen" id="booking-form-container" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{t.form.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{selectedCar.name} ({selectedCar.year})</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 flex-1 min-h-0" id="booking-form">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-semibold mb-2 block text-gray-700">
                        {t.form.fullName} *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="h-11 text-sm border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white"
                        placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold mb-2 block text-gray-700">
                        {t.form.phone} *
                      </Label>
                      <div className="flex gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                          className="h-11 px-3 border border-gray-300 rounded-lg bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm"
                        >
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+973">🇧🇭 +973</option>
                          <option value="+974">🇶🇦 +974</option>
                          <option value="+965">🇰🇼 +965</option>
                        </select>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="flex-1 h-11 text-sm border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white"
                          placeholder="5xxxxxxxx"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block text-gray-700">{t.form.collectionMethod} *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, collectionMethod: "branch" })}
                          className={`p-2 sm:p-2.5 rounded-lg border-2 transition-all duration-200 text-center ${
                            formData.collectionMethod === "branch"
                              ? "border-gray-900 bg-gray-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1.5 text-gray-600" />
                          <div className="font-semibold text-xs sm:text-sm text-gray-900">{t.form.pickupBranch}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{t.form.pickupDesc}</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, collectionMethod: "delivery" })}
                          className={`p-2 sm:p-2.5 rounded-lg border-2 transition-all duration-200 text-center relative ${
                            formData.collectionMethod === "delivery"
                              ? "border-gray-900 bg-gray-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <Truck className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1.5 text-gray-600" />
                          <div className="font-semibold text-xs sm:text-sm text-gray-900">{t.form.delivery}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{t.form.deliveryDesc}</div>
                          <div className="absolute top-1.5 right-1.5 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                            {t.form.deliveryFee}
                          </div>
                        </button>
                      </div>
                    </div>

                    {formData.collectionMethod === "branch" && (
                      <div>
                        <Label htmlFor="branch" className="text-sm font-semibold mb-2 block text-gray-700">
                          {t.form.selectBranch} *
                        </Label>
                        <select
                          id="branch"
                          value={formData.selectedBranch}
                          onChange={(e) => setFormData({ ...formData, selectedBranch: e.target.value })}
                          className="w-full h-11 px-4 border border-gray-300 rounded-lg bg-white focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm"
                          required
                        >
                          <option value="Sulaimaniyya Jeddah">
                            {language === "ar" ? "السليمانية، جدة" : "Sulaimaniyya, Jeddah"}
                          </option>
                          <option value="Garnatha Jeddah">
                            {language === "ar" ? "غرناطة، جدة" : "Garnatha, Jeddah"}
                          </option>
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="pickupDate" className="text-sm font-semibold mb-2 block text-gray-700 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          {t.form.pickupDate} *
                        </Label>
                        <Input
                          id="pickupDate"
                          type="date"
                          required
                          value={formData.pickupDate}
                          onChange={(e) => {
                            const selectedDate = e.target.value
                            const maxDate = getMaxPickupDate()
                            const minDate = getMinPickupDate()
                            
                            if (selectedDate > maxDate) {
                              setDateError(t.form.dateLimitError)
                              setFormData({ ...formData, pickupDate: "", dropOffDate: "" })
                            } else if (selectedDate < minDate) {
                              setDateError(language === "ar" ? "يرجى اختيار تاريخ من اليوم فصاعدًا" : "Please select a date from today onwards")
                              setFormData({ ...formData, pickupDate: "", dropOffDate: "" })
                            } else {
                              setDateError("")
                              setFormData({ ...formData, pickupDate: selectedDate, dropOffDate: "" })
                            }
                          }}
                          className="h-11 text-sm border-2 border-gray-300 bg-white text-gray-900 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                          min={getMinPickupDate()}
                          max={getMaxPickupDate()}
                        />
                        {dateError && (
                          <p className="text-xs text-red-500 mt-2 flex items-center gap-1.5">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {dateError}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="dropOffDate" className="text-sm font-semibold mb-2 block text-gray-700 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          {t.form.dropOffDate} *
                        </Label>
                        <Input
                          id="dropOffDate"
                          type="date"
                          required
                          value={formData.dropOffDate}
                          onChange={(e) => {
                            const selectedDate = e.target.value
                            const minDate = getMinDropoffDate()
                            
                            if (selectedDate < minDate) {
                              setDateError(language === "ar" ? "يجب أن يكون تاريخ التسليم بعد تاريخ الاستلام" : "Drop-off date must be after pickup date")
                              setFormData({ ...formData, dropOffDate: "" })
                            } else {
                              setDateError("")
                              setFormData({ ...formData, dropOffDate: selectedDate })
                            }
                          }}
                          className="h-11 text-sm border-2 border-gray-300 bg-white text-gray-900 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                          min={getMinDropoffDate()}
                          disabled={!formData.pickupDate}
                        />
                      </div>
                    </div>

                    {formData.pickupDate && formData.dropOffDate && (
                      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-900">{t.form.totalAmount}</span>
                          <span className="text-lg font-bold text-gray-900">
                            {calculateTotal()} {language === "ar" ? "ريال" : "SAR"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{t.form.includesVAT}</p>
                        {formData.collectionMethod === "delivery" && (
                          <p className="text-xs text-green-600 font-semibold mt-1">
                            {language === "ar" ? "(يشمل 50 ريال رسوم التوصيل)" : "(Includes 50 SAR delivery fee)"}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold mb-2 block text-gray-700">
                        {t.form.email} <span className="text-gray-500 font-normal">{t.form.emailOptional}</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-11 text-sm border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white"
                        placeholder={language === "ar" ? "بريدك@مثال.com" : "your.email@example.com"}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleShowcaseView}
                        className="flex-1 py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <ArrowLeft className={`${language === "ar" ? "ml-2 rotate-180" : "mr-2"} h-4 w-4`} />
                        {t.form.back}
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <CheckCircle className={`${language === "ar" ? "ml-2" : "mr-2"} h-4 w-4`} />
                        {t.form.confirm}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {currentView !== "car-detail" && <Footer />}
    </div>
    )
  }


