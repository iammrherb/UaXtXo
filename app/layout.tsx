import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardProvider } from "@/context/DashboardContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portnox TCO Calculator - Zero Trust Network Access Control Analysis",
  description:
    "Comprehensive TCO analysis and comparison tool for Network Access Control (NAC) vendors with focus on Portnox CLEAR's cloud-native advantages",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <DashboardProvider>{children}</DashboardProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
