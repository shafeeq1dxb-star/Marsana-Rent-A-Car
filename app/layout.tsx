import type React from "react"

import type { Metadata } from "next"
import { Poppins, Cormorant_Garamond, Tajawal, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

// Using elegant fonts - Cormorant Garamond for headings, Poppins for body
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

// Arabic fonts - Tajawal for body, Cairo for headings
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-arabic-sans",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Marsana - Drive the Extraordinary",
  description:
    "Premium car rental fleet with unbeatable rates and instant reservation. Experience luxury car rental reimagined.",
  generator: "v0.app",
  keywords: ["car rental", "luxury cars", "premium fleet", "Marsana"],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Marsana - Drive the Extraordinary",
    description: "Premium car rental fleet with unbeatable rates and instant reservation. Experience luxury car rental reimagined.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Marsana Rent A Car",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marsana - Drive the Extraordinary",
    description: "Premium car rental fleet with unbeatable rates and instant reservation.",
    images: ["/logo.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${cormorant.variable} ${tajawal.variable} ${cairo.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
