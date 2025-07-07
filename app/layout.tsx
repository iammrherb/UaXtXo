import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/components/providers/query-provider"
import { DashboardProvider } from "@/context/DashboardContext"
import { ConfigurationBar } from "@/components/layout/ConfigurationBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portnox TCO Analyzer",
  description: "Comprehensive NAC vendor comparison with security metrics and compliance mapping",
    generator: 'v0.dev'
}

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    ],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="msapplication-TileColor" content="#00D4AA" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ConfigurationBar />
            <DashboardProvider>
              {children}
              <Toaster />
            </DashboardProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
