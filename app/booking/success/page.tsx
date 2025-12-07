"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import Navigation from "@/components/navigation"

const translations = {
  en: {
    title: "Thank You!",
    message: "We have received your request. We will call you shortly to confirm your reservation.",
    details: "Your Reservation Details:",
    name: "Name:",
    phone: "Phone:",
    vehicle: "Vehicle:",
    pickup: "Pickup Date:",
    dropoff: "Drop-off Date:",
    collection: "Collection:",
    total: "Total Amount:",
    backHome: "Back to Home",
  },
  ar: {
    title: "شكراً لك!",
    message: "لقد تلقينا طلبك. سنتصل بك قريباً لتأكيد حجزك.",
    details: "تفاصيل حجزك:",
    name: "الاسم:",
    phone: "الهاتف:",
    vehicle: "السيارة:",
    pickup: "تاريخ الاستلام:",
    dropoff: "تاريخ التسليم:",
    collection: "الاستلام:",
    total: "المبلغ الإجمالي:",
    backHome: "العودة للرئيسية",
  },
}

function SuccessContent() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const t = translations[language]

  const name = searchParams.get('name') || ''
  const phone = searchParams.get('phone') || ''
  const car = searchParams.get('car') || ''
  const pickup = searchParams.get('pickup') || ''
  const dropoff = searchParams.get('dropoff') || ''
  const collection = searchParams.get('collection') || ''
  const total = searchParams.get('total') || '0'

  return (
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
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-[oklch(0.95_0.01_250)] mb-4">{t.title}</h2>
      <p className="text-xl text-[oklch(0.88_0.01_250)] mb-8">{t.message}</p>
      <div className="bg-[oklch(0.95_0.01_250)]/20 backdrop-blur-md p-6 rounded-lg mb-8 border border-[oklch(0.95_0.01_250)]/30">
        <h3 className="font-semibold text-lg mb-3 text-[oklch(0.95_0.01_250)]">{t.details}</h3>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-[oklch(0.88_0.01_250)]">{t.name}</span>
            <span className="font-semibold text-[oklch(0.95_0.01_250)]">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[oklch(0.88_0.01_250)]">{t.phone}</span>
            <span className="font-semibold text-[oklch(0.95_0.01_250)]">{phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[oklch(0.88_0.01_250)]">{t.vehicle}</span>
            <span className="font-semibold text-[oklch(0.95_0.01_250)]">{car}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[oklch(0.88_0.01_250)]">{t.pickup}</span>
            <span className="font-semibold text-[oklch(0.95_0.01_250)]">{pickup}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[oklch(0.88_0.01_250)]">{t.dropoff}</span>
            <span className="font-semibold text-[oklch(0.95_0.01_250)]">{dropoff}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[oklch(0.88_0.01_250)]">{t.collection}</span>
            <span className="font-semibold text-[oklch(0.95_0.01_250)]">{collection}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[oklch(0.95_0.01_250)]/20">
            <span className="text-[oklch(0.88_0.01_250)]">{t.total}</span>
            <span className="font-bold text-xl text-[oklch(0.95_0.01_250)]">
              {total} {language === "ar" ? "ريال" : "SAR"}
            </span>
          </div>
        </div>
      </div>
      <Link href="/welcome">
        <Button
          size="lg"
          className="bg-[oklch(0.35_0.02_250)] hover:bg-[oklch(0.42_0.02_250)] text-[oklch(0.95_0.01_250)] px-8 py-6 rounded-full"
        >
          {t.backHome}
        </Button>
      </Link>
    </div>
  )
}

export default function BookingSuccessPage() {
  const { language } = useLanguage()

  return (
    <div className={`min-h-screen bg-background ${language === "ar" ? "rtl" : "ltr"} flex flex-col`}>
      <Navigation />
      
      <div className="flex-1 relative">
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[oklch(0.18_0.05_250)] via-[oklch(0.15_0_0)] to-[oklch(0.12_0_0)]">
          <Suspense fallback={
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[oklch(0.95_0.01_250)] mx-auto mb-4"></div>
              <p className="text-[oklch(0.95_0.01_250)]">Loading...</p>
            </div>
          }>
            <SuccessContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

