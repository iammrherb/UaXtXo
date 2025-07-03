"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ConfigurationBar } from "@/components/layout/ConfigurationBar"
import { DashboardProvider } from "@/context/DashboardContext"
import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { BarChart3, Shield, Users, TrendingUp, FileText, Brain, Settings, Home, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Overview",
    href: "/overview",
    icon: Home,
    description: "Dashboard overview and key metrics",
  },
  {
    name: "TCO Analysis",
    href: "/tco-analysis",
    icon: BarChart3,
    description: "Total cost of ownership analysis",
  },
  {
    name: "Vendor Comparison",
    href: "/vendor-comparison",
    icon: Users,
    description: "Compare vendors side by side",
  },
  {
    name: "Compliance Risk",
    href: "/compliance-risk",
    icon: Shield,
    description: "Compliance risk assessment",
  },
  {
    name: "Portnox Platform",
    href: "/portnox",
    icon: TrendingUp,
    description: "Portnox-specific analysis",
  },
  {
    name: "AI Insights",
    href: "/ai-insights",
    icon: Brain,
    description: "AI-powered insights and recommendations",
    badge: "New",
  },
  {
    name: "Report Builder",
    href: "/report-builder",
    icon: FileText,
    description: "Custom report builder",
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <DashboardProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-white">Portnox TCO Analyzer</h1>
                        <p className="text-xs text-slate-400">Vendor Risk Assessment Platform</p>
                      </div>
                    </Link>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-slate-300">
                      Enterprise Edition
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {/* Configuration Bar */}
            <ConfigurationBar />

            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <aside className="w-64 flex-shrink-0">
                  <div className="sticky top-32">
                    <nav className="space-y-2">
                      {navigation.map((item) => {
                        const isActive =
                          pathname === item.href || (item.href !== "/overview" && pathname.startsWith(item.href))

                        return (
                          <motion.div key={item.name} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                            <Link
                              href={item.href}
                              className={cn(
                                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                isActive
                                  ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30"
                                  : "text-slate-400 hover:text-white hover:bg-slate-800/50",
                              )}
                            >
                              <item.icon
                                className={cn(
                                  "w-4 h-4 transition-colors",
                                  isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300",
                                )}
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span>{item.name}</span>
                                  {item.badge && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                                    >
                                      {item.badge}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 group-hover:text-slate-400 mt-0.5">
                                  {item.description}
                                </p>
                              </div>
                              {isActive && <ChevronRight className="w-3 h-3 text-blue-400" />}
                            </Link>
                          </motion.div>
                        )
                      })}
                    </nav>

                    <Separator className="my-6 bg-slate-700" />

                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800/50"
                          onClick={() => window.open("/ai-insights", "_blank")}
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          Generate AI Report
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800/50"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Export Analysis
                        </Button>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {children}
                  </motion.div>
                </main>
              </div>
            </div>

            <Toaster />
          </div>
        </DashboardProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}
