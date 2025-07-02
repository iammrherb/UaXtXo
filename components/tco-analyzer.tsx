"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import { type CalculationResult, compareVendors, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"

import {
  DollarSign,
  LayoutGrid,
  ShieldCheck,
  BarChartHorizontal,
  FileText,
  RouteIcon as Road,
  FilePieChart,
  Shield,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  SlidersHorizontal,
  InfoIcon,
  MoonIcon,
  RocketIcon,
  SunIcon,
  AlertTriangleIcon,
  UsersIcon,
  Settings,
} from "lucide-react"

// Enhanced color palette with vibrant Portnox branding
const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  primaryLight: "#33DDBB",
  secondary: "#0A1628",
  secondaryLight: "#1A2638",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
  pink: "#EC4899",
  textPrimaryDark: "#E0E0E0",
  textSecondaryDark: "#A0A0A0",
  textPrimaryLight: "#1F2937",
  textSecondaryLight: "#6B7280",
  gradient: {
    primary: "linear-gradient(135deg, #00D4AA 0%, #00A88A 100%)",
    secondary: "linear-gradient(135deg, #0A1628 0%, #1A2638 100%)",
    vibrant: "linear-gradient(135deg, #00D4AA 0%, #3B82F6 50%, #8B5CF6 100%)",
    fire: "linear-gradient(135deg, #FF6B35 0%, #F59E0B 50%, #EF4444 100%)",
    ocean: "linear-gradient(135deg, #00D4AA 0%, #06B6D4 50%, #3B82F6 100%)",
    sunset: "linear-gradient(135deg, #FF6B35 0%, #EC4899 50%, #8B5CF6 100%)",
  },
}

const VIBRANT_COLORS = [
  PORTNOX_COLORS.primary,
  PORTNOX_COLORS.accent,
  PORTNOX_COLORS.info,
  PORTNOX_COLORS.success,
  PORTNOX_COLORS.warning,
  PORTNOX_COLORS.purple,
  PORTNOX_COLORS.pink,
  "#06B6D4",
  "#EF4444",
  "#6366F1",
  "#14B8A6",
  "#F97316",
]

// Animation variants
const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } }
const staggerChildren = { animate: { transition: { staggerChildren: 0.07 } } }

// Styled Components
const GradientCard = ({
  children,
  className,
  gradient = "primary",
  darkMode,
  ...props
}: {
  children: React.ReactNode
  className?: string
  gradient?: keyof typeof PORTNOX_COLORS.gradient
  darkMode?: boolean
  [key: string]: any
}) => (
  <Card
    className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-xl h-full",
      darkMode
        ? "bg-gray-800/50 border-gray-700 hover:border-portnox-primary/50"
        : "bg-white border-gray-200/50 hover:border-portnox-primary/50",
      className,
    )}
    {...props}
  >
    <div
      className="absolute inset-0 opacity-5 dark:opacity-10"
      style={{ background: PORTNOX_COLORS.gradient[gradient] }}
    />
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </Card>
)

const MetricCard = ({
  title,
  value,
  detail,
  icon,
  trend,
  trendValue,
  gradient = "primary",
  darkMode,
}: {
  title: string
  value: string
  detail: string
  icon: React.ReactElement
  trend?: "up" | "down"
  trendValue?: string
  gradient?: keyof typeof PORTNOX_COLORS.gradient
  darkMode?: boolean
}) => (
  <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="h-full">
    <GradientCard gradient={gradient} darkMode={darkMode}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-600")}>
          {title}
        </CardTitle>
        <div
          className="relative p-2 rounded-full"
          style={{ background: `rgba(from ${PORTNOX_COLORS.gradient[gradient]} r g b / 0.1)` }}
        >
          {React.cloneElement(icon, {
            className: cn("h-5 w-5", darkMode ? "text-portnox-primaryLight" : "text-portnox-primary"),
          })}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <motion.div
          className={cn("text-3xl font-bold", darkMode ? "text-white" : "text-gray-900")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {value}
        </motion.div>
        {trend && (
          <div className={cn("flex items-center text-xs mt-1", trend === "up" ? "text-green-500" : "text-red-500")}>
            {trend === "up" ? (
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-0.5" />
            )}
            <span>{trendValue}</span>
          </div>
        )}
        <p className={cn("text-xs mt-1", darkMode ? "text-gray-400" : "text-gray-500")}>{detail}</p>
      </CardContent>
    </GradientCard>
  </motion.div>
)

const TABS_CONFIG = [
  { value: "dashboard", label: "Executive Dashboard", icon: <BarChartHorizontal /> },
  { value: "financials", label: "Financial Analysis", icon: <FilePieChart /> },
  { value: "cybersecurity", label: "Cybersecurity Posture", icon: <ShieldCheck /> },
  { value: "operations", label: "Business Impact", icon: <SlidersHorizontal /> },
  { value: "timeline", label: "Implementation Timeline", icon: <Road /> },
  { value: "report", label: "Executive Report", icon: <FileText /> },
]

// Main Enhanced Component
export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showVendorSelection, setShowVendorSelection] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    orgSize: "medium",
    devices: 2500,
    users: 1500,
    industry: "technology",
    years: 3,
    region: "north-america",
    portnoxBasePrice: 4.0,
    portnoxAddons: { atp: false, compliance: false, iot: false, analytics: false },
    licenseTier: "professional",
  })

  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba", "fortinet"])
  const [activeView, setActiveView] = useState("dashboard")
  const [results, setResults] = useState<CalculationResult[] | null>(null)
  const [calculationError, setCalculationError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("portnox-tco-dark-mode", JSON.stringify(darkMode))
  }, [darkMode])

  const handleCalculate = useCallback(() => {
    setCalculationError(null)
    try {
      const calculatedResults = compareVendors(selectedVendors, configuration)
      setResults(calculatedResults)
    } catch (error) {
      console.error("Calculation error:", error)
      setCalculationError("Failed to calculate TCO. Please check inputs.")
      setResults(null)
    }
  }, [selectedVendors, configuration])

  useEffect(() => {
    if (selectedVendors.length > 0) {
      handleCalculate()
    } else {
      setResults(null)
    }
  }, [handleCalculate, selectedVendors.length])

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors((prev) => {
      const isSelected = prev.includes(vendorId)
      if (vendorId === "portnox" && isSelected && prev.length === 1) return prev
      let newSelection
      if (isSelected) {
        newSelection = prev.filter((id) => id !== vendorId)
      } else {
        if (prev.length >= 6) {
          // Simple toast notification could be added here
          return prev
        }
        newSelection = [...prev, vendorId]
      }
      if (newSelection.includes("portnox")) {
        return ["portnox", ...newSelection.filter((id) => id !== "portnox")]
      }
      return newSelection.length > 0 ? newSelection : ["portnox"]
    })
  }

  const portnoxResult = useMemo(() => results?.find((r) => r?.vendor === "portnox"), [results])

  const Header = () => (
    <motion.header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-lg transition-all duration-300",
        darkMode ? "bg-gray-900/80 border-b border-gray-700/50" : "bg-white/80 border-b border-gray-200/50",
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }} transition={{ duration: 0.5 }}>
              <Image
                src={getVendorLogoPath("portnox") || "/placeholder.svg"}
                alt="Portnox Logo"
                width={140}
                height={35}
                className="h-8 w-auto relative"
                priority
              />
            </motion.div>
            <Separator orientation="vertical" className={cn("h-6", darkMode ? "bg-gray-700" : "bg-gray-300")} />
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-portnox-primary to-portnox-primaryDark bg-clip-text text-transparent">
                TCO & ROI Platform
              </h1>
              <p className={cn("text-xs", darkMode ? "text-gray-400" : "text-gray-500")}>
                Zero Trust Decision Engine v4.0
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowVendorSelection(!showVendorSelection)}
                    className={cn(showVendorSelection ? "bg-portnox-primary/10" : "")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Vendor Selection</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDarkMode(!darkMode)}
                    className={cn(darkMode ? "text-yellow-400" : "text-gray-600")}
                  >
                    {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle {darkMode ? "Light" : "Dark"} Mode</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={() => setShowSettings(true)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Settings & Configuration</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              size="sm"
              className="bg-gradient-to-r from-portnox-primary to-portnox-primaryDark hover:shadow-lg hover:from-portnox-primaryDark hover:to-portnox-primary text-white transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4 mr-1.5" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )

  const TabNavigation = () => (
    <motion.nav
      className={cn(
        "sticky top-16 z-40 backdrop-blur-md",
        darkMode ? "bg-gray-800/70 border-b border-gray-700/60" : "bg-white/70 border-b border-gray-200/60",
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}
    >
      <div className="container mx-auto px-0 sm:px-4">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className={cn("grid w-full h-auto py-0 bg-transparent rounded-none", `grid-cols-3 sm:grid-cols-6`)}>
            {TABS_CONFIG.map((tab, index) => (
              <motion.div
                key={tab.value}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05, type: "spring", stiffness: 120, damping: 15 }}
              >
                <TabsTrigger
                  value={tab.value}
                  className={cn(
                    "relative flex-col sm:flex-row h-16 sm:h-12 text-xs rounded-none px-2 py-1 sm:px-3",
                    "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                    darkMode
                      ? "hover:bg-gray-700/50 data-[state=active]:text-portnox-primaryLight"
                      : "hover:bg-gray-100 data-[state=active]:text-portnox-primary",
                    "transition-all duration-200 group",
                  )}
                >
                  <div
                    className={cn(
                      "h-5 w-5 mb-0.5 sm:mr-1.5 sm:mb-0 transition-transform duration-200 group-hover:scale-110",
                      activeView === tab.value
                        ? darkMode
                          ? "text-portnox-primaryLight"
                          : "text-portnox-primary"
                        : darkMode
                          ? "text-gray-400 group-hover:text-gray-200"
                          : "text-gray-500 group-hover:text-gray-700",
                    )}
                  >
                    {React.cloneElement(tab.icon, { className: "h-full w-full" })}
                  </div>
                  <span className={cn("hidden sm:inline", activeView === tab.value ? "font-semibold" : "")}>
                    {tab.label}
                  </span>
                  <span
                    className={cn(
                      "inline sm:hidden text-[9px] leading-tight mt-0.5 text-center",
                      activeView === tab.value ? "font-semibold" : "",
                    )}
                  >
                    {tab.label}
                  </span>
                  {activeView === tab.value && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-portnox-primary to-portnox-primaryDark"
                      layoutId="activeTabIndicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </motion.nav>
  )

  const renderView = () => {
    if (calculationError)
      return (
        <Card className="p-6 text-center text-destructive animate-fade-in">
          <AlertTriangleIcon className="mx-auto h-8 w-8 mb-2" />
          {calculationError}
        </Card>
      )
    if (!isClient)
      return (
        <div className="w-full h-96 flex items-center justify-center">
          <div className="text-center">
            <RocketIcon className="mx-auto h-12 w-12 text-portnox-primary animate-pulse" />
            <p className="mt-4 text-lg font-semibold">Launching Decision Engine...</p>
            <p className="text-sm text-muted-foreground">Calculating TCO and ROI...</p>
          </div>
        </div>
      )

    if (!results || !portnoxResult)
      return (
        <Card className="p-6 text-center text-muted-foreground animate-fade-in">
          <InfoIcon className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
          Select vendors and configure settings to begin analysis.
        </Card>
      )

    switch (activeView) {
      case "dashboard":
        return <ExecutiveDashboardView results={results} config={configuration} darkMode={darkMode} />
      // Add other views here
      default:
        return (
          <Card className="p-6 text-center text-muted-foreground animate-fade-in">
            <InfoIcon className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
            View not implemented yet: {TABS_CONFIG.find((t) => t.value === activeView)?.label || activeView}
          </Card>
        )
    }
  }

  const ExecutiveDashboardView = ({
    results,
    config,
    darkMode,
  }: {
    results: CalculationResult[]
    config: CalculationConfiguration
    darkMode: boolean
  }) => {
    const portnoxResult = results.find((r) => r.vendor === "portnox")
    if (!portnoxResult) return null

    return (
      <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <GradientCard gradient="vibrant" darkMode={darkMode} className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <motion.h2
                  className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Executive Summary
                </motion.h2>
                <motion.p
                  className="text-sm sm:text-base text-white/80"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {config.years}-Year Financial & Risk Analysis
                </motion.p>
              </div>
              <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                <Crown className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-400" />
                <div className="text-right">
                  <p className="text-xs sm:text-sm text-white/80">Portnox Advantage</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {portnoxResult.financialSummary.savingsPercent.toFixed(0)}% Lower TCO
                  </p>
                </div>
              </motion.div>
            </div>
          </GradientCard>
        </motion.div>

        <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="Total Savings"
              value={`$${(portnoxResult.financialSummary.savingsVsCompetitor / 1000).toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}K`}
              detail={`vs. Next Best Alternative`}
              icon={<DollarSign />}
              trend="up"
              trendValue={`${portnoxResult.financialSummary.savingsPercent.toFixed(0)}%`}
              gradient="vibrant"
              darkMode={darkMode}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="Payback Period"
              value={`${portnoxResult.roi.paybackMonths} mo`}
              detail="Time to recoup investment"
              icon={<RocketIcon />}
              trend="down"
              trendValue="Faster ROI"
              gradient="fire"
              darkMode={darkMode}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="Breach Cost Avoided"
              value={`$${(portnoxResult.risk.breachCostAvoidance / 1000000).toFixed(2)}M`}
              detail="Annualized risk reduction"
              icon={<Shield />}
              trend="up"
              trendValue="Lower Risk"
              gradient="ocean"
              darkMode={darkMode}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="FTE Requirement"
              value={`${portnoxResult.hiddenCosts.fteRequirement}`}
              detail="For ongoing management"
              icon={<UsersIcon />}
              trend="down"
              trendValue="Higher Efficiency"
              gradient="sunset"
              darkMode={darkMode}
            />
          </motion.div>
        </motion.div>
        {/* ... other dashboard components ... */}
      </motion.div>
    )
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={cn(
          "min-h-screen flex flex-col font-sans antialiased transition-colors duration-300",
          darkMode ? "dark bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900",
        )}
      >
        <Header />
        <TabNavigation />

        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {showVendorSelection && (
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="xl:col-span-1"
                  >
                    <div className="sticky top-36">
                      <EnhancedVendorSelection
                        selectedVendors={selectedVendors}
                        onVendorToggle={handleVendorToggle}
                        onClearAll={() => setSelectedVendors(["portnox"])}
                        onSelectRecommended={() => setSelectedVendors(["portnox", "cisco", "aruba", "fortinet"])}
                        darkMode={darkMode}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={cn("transition-all duration-300", showVendorSelection ? "xl:col-span-3" : "xl:col-span-4")}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {renderView()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>

        <SettingsPanel
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          configuration={configuration}
          onConfigurationChange={setConfiguration}
          portnoxAddons={configuration.portnoxAddons}
          onAddonsChange={(addons) => setConfiguration((prev) => ({ ...prev, portnoxAddons: addons }))}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
        />
      </div>
    </TooltipProvider>
  )
}
