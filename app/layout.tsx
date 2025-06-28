import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

const basePath = process.env.NODE_ENV === "production" ? "/portnox-tco-analyzer" : ""

export const metadata: Metadata = {
  title: "Portnox TCO Analyzer - Network Access Control Cost Analysis",
  description:
    "Comprehensive Total Cost of Ownership analysis tool for Network Access Control solutions. Compare Portnox with competitive vendors and make informed decisions.",
  keywords: "NAC, Network Access Control, TCO, Total Cost of Ownership, Portnox, Cisco ISE, Security, ROI",
  authors: [{ name: "Portnox", url: "https://www.portnox.com" }],
  creator: "Portnox",
  publisher: "Portnox",
  robots: "index, follow",
  openGraph: {
    title: "Portnox TCO Analyzer",
    description: "Compare Network Access Control solutions with comprehensive TCO analysis",
    url: "https://iammrherb.github.io/portnox-tco-analyzer/",
    siteName: "Portnox TCO Analyzer",
    images: [
      {
        url: `${basePath}/portnox-logo.png`,
        width: 1200,
        height: 630,
        alt: "Portnox TCO Analyzer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portnox TCO Analyzer",
    description: "Compare Network Access Control solutions with comprehensive TCO analysis",
    images: [`${basePath}/portnox-logo.png`],
    creator: "@Portnox",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#00D4AA",
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      { url: `${basePath}/portnox-logo.png`, type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: `${basePath}/portnox-logo.png`, sizes: "180x180" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://iammrherb.github.io/portnox-tco-analyzer/" />
        <meta name="google-site-verification" content="your-google-verification-code" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
