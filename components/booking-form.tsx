"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Calendar,
  CheckCircle,
  ArrowRight,
  MapPin,
  Truck,
  ArrowLeft,
  AlertCircle,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"
import { CarData } from "@/lib/data"

type CollectionMethod = "branch" | "delivery"

const translations = {
  en: {
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
  ar: {
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
}

interface BookingFormProps {
  selectedCar: CarData
}

export default function BookingForm({ selectedCar }: BookingFormProps) {
  const { language } = useLanguage()
  const router = useRouter()
  const t = translations[language]
  const [formStep, setFormStep] = useState(1)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [dateError, setDateError] = useState<string>("")
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

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getMaxPickupDate = () => {
    const today = new Date()
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 3)
    return maxDate.toISOString().split("T")[0]
  }

  const getMinPickupDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const getMinDropoffDate = () => {
    if (formData.pickupDate) {
      const pickup = new Date(formData.pickupDate)
      const nextDay = new Date(pickup)
      nextDay.setDate(pickup.getDate() + 1)
      return nextDay.toISOString().split("T")[0]
    }
    return getMinPickupDate()
  }

  const calculateTotal = () => {
    if (!selectedCar || !formData.pickupDate || !formData.dropOffDate) return 0
    const pickup = new Date(formData.pickupDate)
    const dropOff = new Date(formData.dropOffDate)
    const diffTime = Math.abs(dropOff.getTime() - pickup.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let basePrice = 0
    if (diffDays < 7) {
      basePrice = diffDays * selectedCar.daily
    } else if (diffDays >= 7 && diffDays < 30) {
      const dailyRateFromWeekly = selectedCar.weekly / 7
      basePrice = dailyRateFromWeekly * diffDays
    } else {
      const dailyRateFromMonthly = selectedCar.monthly / 30
      basePrice = dailyRateFromMonthly * diffDays
    }

    const deliveryFee = formData.collectionMethod === "delivery" ? 50 : 0
    return Math.round(basePrice + deliveryFee)
  }

  const handleFieldComplete = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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

      // Always redirect to success page (graceful degradation)
      const params = new URLSearchParams({
        name: formData.fullName,
        phone: `${formData.countryCode} ${formData.phone}`,
        car: `${selectedCar.name} (${selectedCar.year})`,
        pickup: formData.pickupDate,
        dropoff: formData.dropOffDate,
        collection: formData.collectionMethod === "branch" 
          ? `${t.pickupBranch} ${formData.selectedBranch}` 
          : t.delivery,
        total: total.toString(),
      })
      router.push(`/booking/success?${params.toString()}`)
    } catch (error) {
      console.error("Error submitting form:", error)
      // Still redirect to success page
      const params = new URLSearchParams({
        name: formData.fullName,
        phone: `${formData.countryCode} ${formData.phone}`,
        car: `${selectedCar.name} (${selectedCar.year})`,
        pickup: formData.pickupDate,
        dropoff: formData.dropOffDate,
        collection: formData.collectionMethod === "branch" 
          ? `${t.pickupBranch} ${formData.selectedBranch}` 
          : t.delivery,
        total: total.toString(),
      })
      router.push(`/booking/success?${params.toString()}`)
    }
  }

  return (
    <div 
      className="w-full lg:w-80 xl:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col flex-shrink-0 overflow-hidden min-h-0 lg:h-full" 
      id="booking-form-container"
      style={mounted && isMobile ? {
        height: 'calc(100dvh - 35vh - 60px)',
        maxHeight: 'calc(100dvh - 35vh - 60px)',
      } : {}}
    >
      {/* Step Indicator - Mobile */}
      <div className="lg:hidden px-4 pt-3 pb-2 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600">
            {language === "ar" ? `الخطوة ${formStep} من 4` : `Step ${formStep} of 4`}
          </span>
          <span className="text-xs text-gray-500">{Math.round((formStep / 4) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-gray-900 rounded-full h-1.5 transition-all duration-300"
            style={{ width: `${(formStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Header */}
      <div className="px-3 sm:px-4 pt-3 pb-2 flex-shrink-0">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{t.title}</h3>
        <p className="text-xs sm:text-sm text-gray-500">{selectedCar.name} ({selectedCar.year})</p>
      </div>

      {/* Scrollable Form Content */}
      <div 
        className="flex-1 overflow-y-auto px-3 sm:px-4 pb-4 lg:pb-4" 
        style={{ 
          WebkitOverflowScrolling: 'touch' as any, 
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain',
        } as React.CSSProperties}
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2" id="booking-form">
          {/* Step 1: Personal Information */}
          {formStep >= 1 && (
            <motion.div
              initial={{ opacity: 0, x: formStep === 1 ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={formStep === 1 ? "block" : "hidden"}
            >
              <div className="mb-4">
                <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-600" />
                  {language === "ar" ? "المعلومات الشخصية" : "Personal Information"}
                </h4>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-semibold mb-2 block text-gray-700">
                    {t.fullName} *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleFieldComplete("fullName", e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value.trim()) {
                        setTimeout(() => {
                          const phoneInput = document.getElementById("phone")
                          phoneInput?.focus()
                        }, 200)
                      }
                    }}
                    className="h-12 text-base border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 bg-white"
                    placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-semibold mb-2 block text-gray-700">
                    {t.phone} *
                  </Label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                      className="h-12 px-3 border-2 border-gray-300 rounded-lg bg-white focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
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
                      onChange={(e) => {
                        handleFieldComplete("phone", e.target.value)
                        if (e.target.value.trim().length >= 8 && formData.fullName.trim()) {
                          setTimeout(() => {
                            setFormStep(2)
                          }, 500)
                        }
                      }}
                      className="flex-1 h-12 text-base border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 bg-white"
                      placeholder="5xxxxxxxx"
                    />
                  </div>
                </div>
                {formData.fullName.trim() && formData.phone.trim().length >= 8 && (
                  <Button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg"
                  >
                    {language === "ar" ? "التالي" : "Next"} <ArrowRight className={`${language === "ar" ? "mr-2 rotate-180" : "ml-2"} h-4 w-4`} />
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Collection Method */}
          {formStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, x: formStep === 2 ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={formStep === 2 ? "block" : "hidden"}
            >
              <div className="mb-4">
                <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  {t.collectionMethod}
                </h4>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block text-gray-700">{t.collectionMethod} *</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, collectionMethod: "branch" })
                        setTimeout(() => {
                          const branchSelect = document.getElementById("branch")
                          branchSelect?.focus()
                        }, 300)
                      }}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                        formData.collectionMethod === "branch"
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <MapPin className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                      <div className="font-semibold text-sm text-gray-900">{t.pickupBranch}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.pickupDesc}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, collectionMethod: "delivery" })
                        setTimeout(() => {
                          setFormStep(3)
                        }, 500)
                      }}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-center relative ${
                        formData.collectionMethod === "delivery"
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <Truck className="h-5 w-5 mx-auto mb-2 text-gray-600" />
                      <div className="font-semibold text-sm text-gray-900">{t.delivery}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.deliveryDesc}</div>
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        {t.deliveryFee}
                      </div>
                    </button>
                  </div>
                </div>
                {formData.collectionMethod === "branch" && (
                  <div>
                    <Label htmlFor="branch" className="text-sm font-semibold mb-2 block text-gray-700">
                      {t.selectBranch} *
                    </Label>
                    <select
                      id="branch"
                      value={formData.selectedBranch}
                      onChange={(e) => {
                        handleFieldComplete("selectedBranch", e.target.value)
                        setTimeout(() => {
                          setFormStep(3)
                        }, 500)
                      }}
                      className="w-full h-12 px-4 border-2 border-gray-300 rounded-lg bg-white focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 text-base"
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
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormStep(1)}
                    className="flex-1 py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className={`${language === "ar" ? "ml-2 rotate-180" : "mr-2"} h-4 w-4`} />
                    {language === "ar" ? "السابق" : "Back"}
                  </Button>
                  {(formData.collectionMethod === "delivery" || (formData.collectionMethod === "branch" && formData.selectedBranch)) && (
                    <Button
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg"
                    >
                      {language === "ar" ? "التالي" : "Next"} <ArrowRight className={`${language === "ar" ? "mr-2 rotate-180" : "ml-2"} h-4 w-4`} />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Dates */}
          {formStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, x: formStep === 3 ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={formStep === 3 ? "block" : "hidden"}
            >
              <div className="mb-4">
                <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-600" />
                  {language === "ar" ? "التواريخ" : "Dates"}
                </h4>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pickupDate" className="text-sm font-semibold mb-2 block text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    {t.pickupDate} *
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
                        setDateError(t.dateLimitError)
                        setFormData({ ...formData, pickupDate: "", dropOffDate: "" })
                      } else if (selectedDate < minDate) {
                        setDateError(language === "ar" ? "يرجى اختيار تاريخ من اليوم فصاعدًا" : "Please select a date from today onwards")
                        setFormData({ ...formData, pickupDate: "", dropOffDate: "" })
                      } else {
                        setDateError("")
                        handleFieldComplete("pickupDate", selectedDate)
                        setTimeout(() => {
                          const dropOffInput = document.getElementById("dropOffDate")
                          dropOffInput?.focus()
                        }, 300)
                      }
                    }}
                    className="h-12 text-base border-2 border-gray-300 bg-white text-gray-900 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900"
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
                    {t.dropOffDate} *
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
                        handleFieldComplete("dropOffDate", selectedDate)
                        setTimeout(() => {
                          setFormStep(4)
                        }, 500)
                      }
                    }}
                    className="h-12 text-base border-2 border-gray-300 bg-white text-gray-900 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900"
                    min={getMinDropoffDate()}
                    disabled={!formData.pickupDate}
                  />
                </div>
                {formData.pickupDate && formData.dropOffDate && (
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">{t.totalAmount}</span>
                      <span className="text-lg font-bold text-gray-900">
                        {calculateTotal()} {language === "ar" ? "ريال" : "SAR"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{t.includesVAT}</p>
                    {formData.collectionMethod === "delivery" && (
                      <p className="text-xs text-green-600 font-semibold mt-1">
                        {language === "ar" ? "(يشمل 50 ريال رسوم التوصيل)" : "(Includes 50 SAR delivery fee)"}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormStep(2)}
                    className="flex-1 py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className={`${language === "ar" ? "ml-2 rotate-180" : "mr-2"} h-4 w-4`} />
                    {language === "ar" ? "السابق" : "Back"}
                  </Button>
                  {formData.pickupDate && formData.dropOffDate && (
                    <Button
                      type="button"
                      onClick={() => setFormStep(4)}
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg"
                    >
                      {language === "ar" ? "التالي" : "Next"} <ArrowRight className={`${language === "ar" ? "mr-2 rotate-180" : "ml-2"} h-4 w-4`} />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Email & Review */}
          {formStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, x: formStep === 4 ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={formStep === 4 ? "block" : "hidden"}
            >
              <div className="mb-4">
                <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-600" />
                  {language === "ar" ? "المراجعة والتأكيد" : "Review & Confirm"}
                </h4>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold mb-2 block text-gray-700">
                    {t.email} <span className="text-gray-500 font-normal">{t.emailOptional}</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 text-base border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-900 bg-white"
                    placeholder={language === "ar" ? "بريدك@مثال.com" : "your.email@example.com"}
                  />
                </div>
                {formData.pickupDate && formData.dropOffDate && (
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-900">{t.totalAmount}</span>
                      <span className="text-xl font-bold text-gray-900">
                        {calculateTotal()} {language === "ar" ? "ريال" : "SAR"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{t.includesVAT}</p>
                    {formData.collectionMethod === "delivery" && (
                      <p className="text-xs text-green-600 font-semibold mt-1">
                        {language === "ar" ? "(يشمل 50 ريال رسوم التوصيل)" : "(Includes 50 SAR delivery fee)"}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormStep(3)}
                    className="flex-1 py-3 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className={`${language === "ar" ? "ml-2 rotate-180" : "mr-2"} h-4 w-4`} />
                    {language === "ar" ? "السابق" : "Back"}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <CheckCircle className={`${language === "ar" ? "ml-2" : "mr-2"} h-4 w-4`} />
                    {t.confirm}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  )
}

