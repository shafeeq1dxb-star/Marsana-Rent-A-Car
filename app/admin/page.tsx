"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Mail, Phone, Calendar, Car, MapPin, DollarSign, Download, RefreshCw, Lock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      fetchSubmissions()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin"
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "marsana2024"

    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin_authenticated", "true")
      setLoginError("")
      fetchSubmissions()
    } else {
      setLoginError("Invalid username or password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_authenticated")
    setUsername("")
    setPassword("")
  }

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

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-gray-900 flex items-center justify-center p-4 ${language === "ar" ? "rtl" : "ltr"}`}>
        <div className="w-full max-w-md">
          {/* Language Switcher - Top Right */}
          <div className="absolute top-4 right-4 z-20">
            <LanguageSwitcher />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <Lock className="h-8 w-8 text-[#D4AF37]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              {language === "ar" ? "تسجيل الدخول" : "Admin Login"}
            </h2>
            <p className="text-gray-400 text-center mb-6 text-sm">
              {language === "ar" ? "الرجاء إدخال بيانات الاعتماد للوصول إلى لوحة التحكم" : "Please enter credentials to access admin dashboard"}
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  {language === "ar" ? "اسم المستخدم" : "Username"}
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white"
                  placeholder={language === "ar" ? "اسم المستخدم" : "Username"}
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  {language === "ar" ? "كلمة المرور" : "Password"}
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white"
                  placeholder={language === "ar" ? "كلمة المرور" : "Password"}
                  required
                />
              </div>
              {loginError && (
                <p className="text-red-400 text-sm text-center">{loginError}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#F4D03F] text-black font-semibold"
              >
                {language === "ar" ? "تسجيل الدخول" : "Login"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    )
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
        <div className="flex gap-4 mb-6 flex-wrap">
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
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Lock className="h-4 w-4" />
            {language === "ar" ? "تسجيل الخروج" : "Logout"}
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

