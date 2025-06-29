import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/components/providers/query-provider"
import { DashboardProvider } from "@/context/DashboardContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Portnox TCO Analyzer - Enterprise Decision Platform",
    template: "%s | Portnox TCO Analyzer",
  },
  description:
    "AI-powered Total Cost of Ownership analysis platform for Network Access Control solutions. Compare Portnox CLEAR with traditional NAC vendors and make data-driven security investment decisions.",
  keywords: [
    "TCO Analysis",
    "Network Access Control",
    "NAC",
    "Portnox",
    "Zero Trust",
    "Security ROI",
    "Enterprise Security",
    "Cost Comparison",
    "Cybersecurity Investment",
  ],
  authors: [{ name: "Portnox" }],
  creator: "Portnox",
  publisher: "Portnox",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tco.portnox.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tco.portnox.com",
    title: "Portnox TCO Analyzer - Enterprise Decision Platform",
    description: "AI-powered Total Cost of Ownership analysis platform for Network Access Control solutions.",
    siteName: "Portnox TCO Analyzer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portnox TCO Analyzer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portnox TCO Analyzer - Enterprise Decision Platform",
    description: "AI-powered Total Cost of Ownership analysis platform for Network Access Control solutions.",
    images: ["/og-image.png"],
    creator: "@Portnox",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#00D4AA",
      },
    ],
  },
  manifest: "/manifest.json",
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
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
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
