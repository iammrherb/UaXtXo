"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { TCOAnalyzer } from "@/components/tco-analyzer"
import Image from "next/image"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9 px-0"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image src="/portnox-logo.png" alt="Portnox" width={120} height={32} className="h-8 w-auto dark:invert" />
          <div className="hidden sm:block h-6 w-px bg-border" />
          <span className="hidden sm:inline-block text-sm font-medium text-muted-foreground">ZTCA TCO Calculator</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#overview" className="text-sm font-medium hover:text-primary transition-colors">
            Overview
          </a>
          <a href="#analysis" className="text-sm font-medium hover:text-primary transition-colors">
            Analysis
          </a>
          <a href="#comparison" className="text-sm font-medium hover:text-primary transition-colors">
            Comparison
          </a>
          <a href="#reports" className="text-sm font-medium hover:text-primary transition-colors">
            Reports
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <Button size="sm" className="hidden sm:inline-flex">
            Schedule Demo
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-2">
            <a
              href="#overview"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
            >
              Overview
            </a>
            <a
              href="#analysis"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
            >
              Analysis
            </a>
            <a
              href="#comparison"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
            >
              Comparison
            </a>
            <a
              href="#reports"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors"
            >
              Reports
            </a>
            <div className="px-4 pt-2">
              <Button size="sm" className="w-full">
                Schedule Demo
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-black/10" />
      <div className="container relative px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              Zero Trust Cloud Access
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            TCO Calculator
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Make informed decisions with comprehensive Total Cost of Ownership analysis. Compare Portnox ZTCA against
            leading competitors with real-world data and projections.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <span>Real-time calculations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <span>Multi-vendor comparison</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-purple-500 rounded-full" />
              <span>Executive reporting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image src="/portnox-logo.png" alt="Portnox" width={120} height={32} className="h-8 w-auto dark:invert" />
            <p className="text-sm text-muted-foreground">
              Leading Zero Trust Cloud Access solutions for modern enterprises.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  ZTCA Platform
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Network Access Control
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cloud Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Whitepapers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Portnox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroBanner />
        <main className="container px-4 py-8">
          <TCOAnalyzer />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
