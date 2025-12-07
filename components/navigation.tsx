"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Car, Calendar } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

export default function Navigation() {
  const pathname = usePathname()
  const { language } = useLanguage()

  const navItems = [
    {
      href: "/welcome",
      label: language === "ar" ? "الرئيسية" : "Home",
      icon: Home,
    },
    {
      href: "/fleet",
      label: language === "ar" ? "الأسطول" : "Fleet",
      icon: Car,
    },
    {
      href: "/booking",
      label: language === "ar" ? "الحجز" : "Booking",
      icon: Calendar,
    },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-black/95 backdrop-blur-sm border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/welcome" className="flex items-center gap-2">
            <img 
              src="/logo.jpg" 
              alt="Marsana Logo" 
              className="h-10 w-auto md:h-12"
            />
            <span className="hidden sm:inline-block text-white font-semibold text-lg">
              {language === "ar" ? "مرسانا" : "Marsana"}
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                </Link>
              )
            })}
            
            {/* Language Switcher */}
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

