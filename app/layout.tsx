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
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
