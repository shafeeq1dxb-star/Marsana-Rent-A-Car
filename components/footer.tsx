"use client"

import React from "react"
import { Car, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const footerTranslations = {
  en: {
    title: "Marsana",
    tagline: "Drive the Extraordinary",
    quickLinks: "Quick Links",
    services: "Services",
    contact: "Contact Us",
    followUs: "Follow Us",
    home: "Home",
    fleet: "Our Fleet",
    about: "About Us",
    contactUs: "Contact",
    carRental: "Car Rental",
    luxuryCars: "Luxury Cars",
    delivery: "Doorstep Delivery",
    support: "24/7 Support",
    phone: "+966 537489695",
    email: "shafeeque@marsanarac.com",
    address: "Sulaimaniyya, Jeddah, Saudi Arabia",
    rights: "All rights reserved.",
    year: new Date().getFullYear(),
  },
  ar: {
    title: "مرسانا",
    tagline: "قُد الاستثنائي",
    quickLinks: "روابط سريعة",
    services: "الخدمات",
    contact: "اتصل بنا",
    followUs: "تابعنا",
    home: "الرئيسية",
    fleet: "أسطولنا",
    about: "من نحن",
    contactUs: "اتصل",
    carRental: "تأجير السيارات",
    luxuryCars: "سيارات فاخرة",
    delivery: "توصيل للمنزل",
    support: "دعم على مدار الساعة",
    phone: "+966 537489695",
    email: "shafeeque@marsanarac.com",
    address: "السليمانية، جدة، المملكة العربية السعودية",
    rights: "جميع الحقوق محفوظة.",
    year: new Date().getFullYear(),
  },
}

export default function Footer() {
  const { language } = useLanguage()
  const t = footerTranslations[language]

  return (
    <footer className={`bg-gray-900 text-gray-300 border-t border-gray-800 ${language === "ar" ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-8 w-8 text-[#D4AF37]" />
              <h3 className="text-2xl font-bold text-white">{t.title}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">{t.tagline}</p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61583060079164"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/marsanarentacar.sa?igsh=d2tzdGh6aWt6MnMx&utm_-source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.home}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.fleet}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.about}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.contactUs}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t.services}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.carRental}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.luxuryCars}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.delivery}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.support}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">{t.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <a href={`tel:${t.phone}`} className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <a href={`mailto:${t.email}`} className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                  {t.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">{t.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {t.year} {t.title}. {t.rights}
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#D4AF37] transition-colors">
              {language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
            </a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors">
              {language === "ar" ? "شروط الاستخدام" : "Terms of Service"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


