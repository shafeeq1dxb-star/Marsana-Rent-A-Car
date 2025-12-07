"use client"

import { motion } from "framer-motion"
import { Car, ArrowRight, BadgePercent, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { cars, getCarImage } from "@/lib/data"
import { useRouter } from "next/navigation"

const translations = {
  en: {
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
    back: "Back to Home",
  },
  ar: {
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
    back: "العودة للرئيسية",
  },
}

export default function FleetPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const t = translations[language]

  const handleCarSelect = (carId: number) => {
    // Store selected car ID in sessionStorage and navigate to booking
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedCarId', carId.toString())
      router.push('/booking')
    }
  }

  return (
    <div className={`min-h-screen bg-background ${language === "ar" ? "rtl" : "ltr"} flex flex-col`}>
      <Navigation />
      
      <div className="flex-1 min-h-screen py-16 px-4 metallic-matte-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 pt-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
            <p className="text-muted-foreground text-lg">{t.subtitle}</p>
            <p className="text-sm text-[oklch(0.35_0.02_250)] font-semibold mt-2">{t.disclaimer}</p>
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
                      {car.discount}% {t.discount}
                    </div>
                  </div>
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Car className="h-3.5 w-3.5 text-[oklch(0.35_0.02_250)]" />
                      {car.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {car.year} {t.model}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-1.5">
                    <div className="space-y-1.5 mb-2 relative">
                      <div className="flex justify-between items-center py-0.5 border-b border-border/50">
                        <span className="text-muted-foreground text-xs">{t.daily}</span>
                        <span className="text-base font-bold text-foreground">
                          {car.daily} {language === "ar" ? "ريال" : "SAR"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-0.5 border-b border-border/50">
                        <span className="text-muted-foreground text-xs">{t.weekly}</span>
                        <span className="text-base font-bold text-foreground">
                          {car.weekly} {language === "ar" ? "ريال" : "SAR"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-0.5 border-b border-border/50">
                        <span className="text-muted-foreground text-xs">{t.monthly}</span>
                        <span className="text-base font-bold text-foreground">
                          {car.monthly} {language === "ar" ? "ريال" : "SAR"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-muted/50 backdrop-blur-sm p-1.5 rounded-lg mb-2">
                      <p className="text-xs text-center flex items-center justify-center gap-1">
                        <CheckCircle className="h-3 w-3 text-[oklch(0.35_0.02_250)]" />
                        <span className="font-semibold text-xs">{t.includesVAT}</span>
                      </p>
                    </div>
                    <Button
                      className="w-full bg-[oklch(0.35_0.02_250)] hover:bg-[oklch(0.42_0.02_250)] text-[oklch(0.95_0.01_250)] text-sm py-2"
                      onClick={() => handleCarSelect(car.id)}
                    >
                      {t.book}
                      <ArrowRight className={`${language === "ar" ? "mr-2 rotate-180" : "ml-2"} h-3 w-3`} />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/welcome">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 rounded-full"
              >
                <ArrowLeft className={`${language === "ar" ? "ml-2 rotate-180" : "mr-2"} h-5 w-5`} />
                {t.back}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

