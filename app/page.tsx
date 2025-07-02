"use client"

import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { TCOAnalyzer } from "@/components/tco-analyzer"
import Image from "next/image"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function PortnoxHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="relative h-8 w-8">
              <Image src="/portnox-logo.png" alt="Portnox" fill className="object-contain" priority />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Portnox
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Zero Trust Network Access</p>
            </div>
          </div>
          <div className="hidden md:block h-6 w-px bg-border" />
          <div className="hidden md:block">
            <h2 className="text-lg font-semibold">TCO Calculator</h2>
            <p className="text-xs text-muted-foreground -mt-1">Strategic Cost Analysis Tool</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Solutions
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Resources
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Support
          </a>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="h-9 w-9">
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-3">
            <a href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Solutions
            </a>
            <a href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Resources
            </a>
            <a href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Support
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function PortnoxBanner() {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b">
      <div className="container py-8 px-4">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Zero Trust Network Access Leader</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              Total Cost of Ownership
            </span>
            <br />
            <span className="text-foreground">Calculator</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Make informed decisions with comprehensive TCO analysis. Compare Portnox Clear against leading NAC solutions
            and discover your path to Zero Trust security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Real-time calculations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <span>Industry benchmarks</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              <span>Executive reporting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PortnoxFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative h-6 w-6">
                <Image src="/portnox-logo.png" alt="Portnox" fill className="object-contain" />
              </div>
              <span className="font-bold text-primary">Portnox</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Leading Zero Trust Network Access platform providing comprehensive security and simplified network
              management.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Portnox Clear
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Portnox Core
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cloud RADIUS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Device Compliance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Webinars
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  White Papers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Sales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Technical Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Training
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 Portnox. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
      <div className="min-h-screen bg-background">
        <PortnoxHeader />
        <PortnoxBanner />

        <main className="container py-8 px-4">
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
            <CardContent className="p-0">
              <TCOAnalyzer />
            </CardContent>
          </Card>
        </main>

        <PortnoxFooter />
      </div>
    </ThemeProvider>
  )
}
