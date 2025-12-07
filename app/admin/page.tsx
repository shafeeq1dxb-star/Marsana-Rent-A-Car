"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Mail, Phone, Calendar, Car, MapPin, DollarSign, Download, RefreshCw } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

interface Submission {
  id: string
  fullName: string
  phone: string
  countryCode: string
  email: string
  carName: string
  carYear: number
  pickupDate: string
  dropOffDate: string
  collectionMethod: string
  selectedBranch?: string
  total: number
  submittedAt: string
}

const translations = {
  en: {
    title: "Admin Dashboard",
    subtitle: "View all booking submissions",
    name: "Name",
    phone: "Phone",
    email: "Email",
    vehicle: "Vehicle",
    pickup: "Pickup Date",
    dropoff: "Drop-off Date",
    collection: "Collection Method",
    branch: "Branch",
    delivery: "Delivery",
    total: "Total Amount",
    submitted: "Submitted",
    refresh: "Refresh",
    export: "Export CSV",
    noSubmissions: "No submissions yet",
  },
  ar: {
    title: "لوحة التحكم",
    subtitle: "عرض جميع طلبات الحجز",
    name: "الاسم",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    vehicle: "السيارة",
    pickup: "تاريخ الاستلام",
    dropoff: "تاريخ التسليم",
    collection: "طريقة الاستلام",
    branch: "الفرع",
    delivery: "التوصيل",
    total: "المبلغ الإجمالي",
    submitted: "تم الإرسال",
    refresh: "تحديث",
    export: "تصدير CSV",
    noSubmissions: "لا توجد طلبات حتى الآن",
  },
}

export default function AdminPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/submissions")
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = [t.name, t.phone, t.email, t.vehicle, t.pickup, t.dropoff, t.collection, t.total, t.submitted]
    const rows = submissions.map((sub) => [
      sub.fullName,
      `${sub.countryCode} ${sub.phone}`,
      sub.email || "-",
      `${sub.carName} (${sub.carYear})`,
      sub.pickupDate,
      sub.dropOffDate,
      sub.collectionMethod === "branch" ? `${t.branch}: ${sub.selectedBranch}` : t.delivery,
      `${sub.total} SAR`,
      new Date(sub.submittedAt).toLocaleString(),
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `marsana-submissions-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={`min-h-screen bg-gray-900 ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-400">{t.subtitle}</p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={fetchSubmissions}
            disabled={loading}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#F4D03F] text-black rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {t.refresh}
          </button>
          <button
            onClick={exportToCSV}
            disabled={submissions.length === 0}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {t.export}
          </button>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-gray-700">
            <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">{t.noSubmissions}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{t.name}</p>
                      <p className="text-white font-semibold">{submission.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{t.phone}</p>
                      <p className="text-white font-semibold">{submission.countryCode} {submission.phone}</p>
                    </div>
                  </div>

                  {submission.email && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-[#D4AF37]" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{t.email}</p>
                        <p className="text-white font-semibold">{submission.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <Car className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{t.vehicle}</p>
                      <p className="text-white font-semibold">{submission.carName} ({submission.carYear})</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{t.pickup}</p>
                      <p className="text-white font-semibold">{submission.pickupDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{t.dropoff}</p>
                      <p className="text-white font-semibold">{submission.dropOffDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{t.collection}</p>
                      <p className="text-white font-semibold">
                        {submission.collectionMethod === "branch"
                          ? `${t.branch}: ${submission.selectedBranch}`
                          : t.delivery}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{t.total}</p>
                      <p className="text-white font-semibold text-lg">{submission.total} SAR</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{t.submitted}</p>
                      <p className="text-white font-semibold text-sm">
                        {new Date(submission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

