import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ChatWidget from "@/components/ChatWidget"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "नबिन निर्मल स्टोर - रामपुर, पाल्पा | Quality Products for Everyone",
  description:
    "रामपुर-६, तालपोखरा, पाल्पामा स्थित नबिन निर्मल स्टोरमा स्वागत छ। दैनिक आवश्यकताका सामानदेखि सौन्दर्य उत्पादनहरूसम्म - सबै एकै ठाउँमा। गुणस्तरीय उत्पादन, उचित मूल्य र भरपर्दो सेवा।",
  keywords: "नबिन निर्मल स्टोर, रामपुर, पाल्पा, नेपाल, ecommerce, online store, grocery, cosmetics, daily essentials",
  authors: [{ name: "नबिन निर्मल स्टोर" }],
  openGraph: {
    title: "नबिन निर्मल स्टोर - रामपुर, पाल्पा",
    description: "गुणस्तरीय उत्पादन, उचित मूल्य र भरपर्दो सेवा",
    type: "website",
    locale: "ne_NP",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ne">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <Toaster />
      </body>
    </html>
  )
}
