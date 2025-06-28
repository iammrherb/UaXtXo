"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ComprehensiveVendorDatabase, getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import { type calculateVendorTCO, compareVendors, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  ResponsiveContainer,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts"

import {
  Download,
  BarChart3,
  DollarSign,
  LayoutGrid,
  ShieldCheck,
  BarChartHorizontal,
  FileText,
  RouteIcon as Road,
  FilePieChart,
  Shield,
  Crown,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  SlidersHorizontal,
  HandCoins,
  InfoIcon,
  MoonIcon,
  RocketIcon,
  YoutubeIcon,
  ZapIcon,
  SunIcon,
  AlertTriangleIcon,
  UsersIcon,
  TrendingUpIcon,
  Settings,
} from "lucide-react"

type CalculationResult = NonNullable<ReturnType<typeof calculateVendorTCO>>

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
const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
}

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
      "relative overflow-hidden transition-all duration-300 hover:shadow-xl",
      darkMode
        ? "bg-gray-800 border-gray-700 hover:border-portnox-primary/50"
        : "bg-white border-gray-200 hover:border-portnox-primary/50",
      className,
    )}
    {...props}
  >
    <div className="absolute inset-0 opacity-5" style={{ background: PORTNOX_COLORS.gradient[gradient] }} />
    <div className="relative z-10">{children}</div>
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
    <GradientCard gradient={gradient} darkMode={darkMode} className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-600")}>
          {title}
        </CardTitle>
        <motion.div
          className="relative p-2 rounded-full"
          style={{ background: `rgba(from ${PORTNOX_COLORS.gradient[gradient]} r g b / 0.1)` }}
          animate={pulseAnimation}
        >
          {React.cloneElement(icon, {
            className: cn("h-5 w-5", darkMode ? "text-portnox-primaryLight" : "text-portnox-primary"),
          })}
        </motion.div>
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
  { value: "cost-breakdown", label: "Detailed Costs", icon: <FilePieChart /> },
  { value: "roi-analysis", label: "ROI & Business Value", icon: <BarChart3 /> },
  { value: "compliance", label: "Compliance & Risk", icon: <ShieldCheck /> },
  { value: "operations", label: "Operations Impact", icon: <SlidersHorizontal /> },
  { value: "vendor-comparison", label: "Feature Matrix", icon: <LayoutGrid /> },
  { value: "roadmap", label: "Implementation Roadmap", icon: <Road /> },
  { value: "reports", label: "Reports", icon: <FileText /> },
]

// Main Enhanced Component
export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showVendorSelection, setShowVendorSelection] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Configuration state
  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    orgSize: "medium",
    devices: 2500,
    users: 1500,
    industry: "technology",
    years: 3,
    region: "north-america",
    portnoxBasePrice: 4.0,
    portnoxAddons: {
      atp: false,
      compliance: false,
      iot: false,
      analytics: false,
    },
  })

  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba", "meraki"])
  const [activeView, setActiveView] = useState("dashboard")
  const [results, setResults] = useState<CalculationResult[] | null>(null)
  const [calculationError, setCalculationError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
    // Apply dark mode class to HTML element
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Load saved configuration
    const saved = localStorage.getItem("portnox-tco-config")
    if (saved) {
      try {
        const savedConfig = JSON.parse(saved)
        if (savedConfig.configuration) setConfiguration(savedConfig.configuration)
        if (savedConfig.selectedVendors) setSelectedVendors(savedConfig.selectedVendors)
        if (typeof savedConfig.darkMode === "boolean") setDarkMode(savedConfig.darkMode)
      } catch (error) {
        console.error("Failed to load saved configuration:", error)
      }
    }
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
          if (prev.includes("portnox")) {
            const nonPortnox = prev.filter((id) => id !== "portnox")
            newSelection = ["portnox", ...nonPortnox.slice(0, 4), vendorId]
          } else {
            newSelection = [...prev.slice(0, 5), vendorId]
          }
        } else {
          newSelection = [...prev, vendorId]
        }
      }

      if (newSelection.includes("portnox")) {
        return ["portnox", ...newSelection.filter((id) => id !== "portnox")]
      }
      return newSelection.length > 0 ? newSelection : ["portnox"]
    })
  }

  const portnoxResult = useMemo(() => results?.find((r) => r?.vendor === "portnox"), [results])
  const competitors = useMemo(() => results?.filter((r) => r?.vendor !== "portnox") || [], [results])
  const lowestCompetitor = useMemo(
    () =>
      competitors.sort((a, b) => (a?.total ?? Number.POSITIVE_INFINITY) - (b?.total ?? Number.POSITIVE_INFINITY))[0],
    [competitors],
  )

  const totalSavingsVsLowestCompetitor = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor) return 0
    return lowestCompetitor.total - portnoxResult.total
  }, [portnoxResult, lowestCompetitor])

  const savingsPercentVsLowestCompetitor = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor || lowestCompetitor.total === 0) return 0
    return (totalSavingsVsLowestCompetitor / lowestCompetitor.total) * 100
  }, [totalSavingsVsLowestCompetitor, lowestCompetitor, portnoxResult])

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
                TCO Analyzer
              </h1>
              <p className={cn("text-xs", darkMode ? "text-gray-400" : "text-gray-500")}>
                Enterprise Decision Platform v3.0
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
              variant="outline"
              className={cn(
                "hidden sm:flex items-center space-x-1.5",
                darkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100",
              )}
            >
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </Button>

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
          <TabsList
            className={cn(
              "grid w-full h-auto py-0 bg-transparent rounded-none",
              `grid-cols-${TABS_CONFIG.length < 5 ? TABS_CONFIG.length : "4"} sm:grid-cols-${TABS_CONFIG.length}`,
            )}
          >
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
                    "relative flex-col sm:flex-row h-14 sm:h-12 text-xs rounded-none px-2 py-1 sm:px-3",
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
                      "inline sm:hidden text-[9px] leading-tight mt-0.5",
                      activeView === tab.value ? "font-semibold" : "",
                    )}
                  >
                    {tab.label.split(" ")[0]}
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

  const generateROITimelineData = (results: CalculationResult[] | null, years: number) => {
    if (!results) return []
    const months = years * 12
    const data = []
    const portnoxRes = results.find((r) => r.vendor === "portnox")

    for (let month = 0; month <= months; month += Math.max(1, Math.floor(months / 12))) {
      let portnoxROI = 0
      if (portnoxRes && portnoxRes.roi.paybackMonths && portnoxRes.roi.paybackMonths > 0 && portnoxRes.total > 0) {
        if (month >= portnoxRes.roi.paybackMonths) {
          const annualNetBenefit = portnoxRes.roi.annualSavings - portnoxRes.total / years
          portnoxROI = ((annualNetBenefit * (month / 12)) / portnoxRes.total) * 100
        }
      } else if (portnoxRes && portnoxRes.roi.percentage && month > 0) {
        portnoxROI = (portnoxRes.roi.percentage / months) * month
      }

      const avgCompetitorPayback = 18
      const avgCompetitorAnnualNetBenefitRatio = 0.2
      let averageROI = 0
      if (month >= avgCompetitorPayback) {
        averageROI = avgCompetitorAnnualNetBenefitRatio * (month / 12) * 100
      }

      data.push({
        month,
        portnox: Math.max(0, Math.min(portnoxROI, 600)),
        average: Math.max(0, Math.min(averageROI, 200)),
      })
    }
    return data
  }

  const renderView = () => {
    if (calculationError)
      return (
        <Card className="p-6 text-center text-destructive animate-fade-in">
          <AlertTriangleIcon className="mx-auto h-8 w-8 mb-2" />
          {calculationError}
        </Card>
      )
    if (!isClient && !["reports"].includes(activeView))
      return <Card className="p-6 text-center text-muted-foreground animate-fade-in">Loading charts...</Card>

    switch (activeView) {
      case "dashboard":
        return <ExecutiveDashboardView />
      case "cost-breakdown":
        return <DetailedCostsView results={results} years={configuration.years} darkMode={darkMode} />
      case "compliance":
        return (
          <ComplianceRiskView
            results={results}
            industry={configuration.industry}
            selectedVendors={selectedVendors}
            darkMode={darkMode}
          />
        )
      case "operations":
        return (
          <OperationsImpactView
            results={results}
            currentDeviceCount={configuration.devices}
            currentUsersCount={configuration.users}
            region={configuration.region}
            darkMode={darkMode}
          />
        )
      case "vendor-comparison":
        const safeResultsForFeatures = results || []
        const featureData = safeResultsForFeatures.map((r) => ({
          id: r.vendor,
          name: r.vendorName,
          features: ComprehensiveVendorDatabase[r.vendor]?.features?.core || {},
          logo: getVendorLogoPath(r.vendor),
        }))
        return <FeatureComparison data={featureData} darkMode={darkMode} />
      case "roadmap":
        return (
          <ImplementationRoadmapView
            selectedVendor={selectedVendors[0] || "portnox"}
            deviceCount={configuration.devices}
            userCount={configuration.users}
            darkMode={darkMode}
          />
        )
      case "reports":
        const reportConfig = {
          orgSize: configuration.orgSize,
          devices: configuration.devices,
          users: configuration.users,
          industry: configuration.industry,
          years: configuration.years,
          region: configuration.region,
          selectedVendors: selectedVendors,
          portnoxBasePrice: configuration.portnoxBasePrice,
          portnoxAddons: configuration.portnoxAddons,
        }
        return <ReportsView results={results} config={reportConfig} darkMode={darkMode} />
      default:
        return (
          <Card className="p-6 text-center text-muted-foreground animate-fade-in">
            <InfoIcon className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
            View not implemented yet: {TABS_CONFIG.find((t) => t.value === activeView)?.label || activeView}
          </Card>
        )
    }
  }

  // View Components
  const ExecutiveDashboardView = () => {
    if (!results || !portnoxResult)
      return (
        <Card className="p-6 text-center text-muted-foreground animate-fade-in">
          <InfoIcon className="mx-auto h-8 w-8 mb-2 text-portnox-primary" />
          Select vendors and calculate TCO.
        </Card>
      )

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
                  {configuration.years}-Year Total Cost of Ownership Analysis
                </motion.p>
              </div>
              <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                <Crown className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-400" />
                <div className="text-right">
                  <p className="text-xs sm:text-sm text-white/80">Portnox Advantage</p>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {savingsPercentVsLowestCompetitor.toFixed(0)}% Lower TCO
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
              value={`$${Math.round(Math.abs(totalSavingsVsLowestCompetitor) / 1000).toLocaleString()}K`}
              detail={`vs. ${lowestCompetitor?.vendorName || "Next Best"}`}
              icon={<DollarSign />}
              trend="up"
              trendValue={`${savingsPercentVsLowestCompetitor.toFixed(0)}%`}
              gradient="vibrant"
              darkMode={darkMode}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="ROI Achievement"
              value={`${portnoxResult?.roi?.paybackMonths || 6} mo`}
              detail="Payback period"
              icon={<RocketIcon />}
              trend="up"
              trendValue="Faster"
              gradient="fire"
              darkMode={darkMode}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="Risk Reduction"
              value={`${portnoxResult?.roi?.breachReduction || 80}%`}
              detail="Breach probability decrease"
              icon={<Shield />}
              trend="up"
              trendValue="Significant"
              gradient="ocean"
              darkMode={darkMode}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="Efficiency Gain"
              value={`${portnoxResult?.roi?.laborSavingsFTE || 1.9} FTE`}
              detail="Staff hours saved"
              icon={<UsersIcon />}
              trend="up"
              trendValue="Notable"
              gradient="sunset"
              darkMode={darkMode}
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div className="lg:col-span-3" variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-portnox-primary" />
                  <span>TCO Comparison</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-gray-400" : "text-gray-500")}>
                  {configuration.years}-year total cost across vendors
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={results?.map((r) => ({
                      name: r.vendorName,
                      TCO: r.total,
                      fill:
                        r.vendor === "portnox"
                          ? PORTNOX_COLORS.primary
                          : VIBRANT_COLORS[results.findIndex((v) => v.vendor === r.vendor) % VIBRANT_COLORS.length],
                    }))}
                    layout="vertical"
                    margin={{ right: 30, left: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      type="number"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                      interval={0}
                    />
                    <ReTooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Total TCO"]}
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.secondaryLight : "#FFFFFF",
                        border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                        borderRadius: "8px",
                        color: darkMode ? PORTNOX_COLORS.textPrimaryDark : PORTNOX_COLORS.textPrimaryLight,
                      }}
                      cursor={{ fill: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                    />
                    <Bar dataKey="TCO" radius={[0, 6, 6, 0]} barSize={20} />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUpIcon className="h-5 w-5 text-portnox-primary" />
                  <span>ROI Timeline</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-gray-400" : "text-gray-500")}>
                  Cumulative value over {configuration.years * 12} months
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={generateROITimelineData(results, configuration.years)}
                    margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="roiGradientFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => `M${value}`}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      tickFormatter={(value) => `${value}%`}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <ReTooltip
                      formatter={(value: number, name: string) => [
                        `${value.toFixed(0)}%`,
                        name.charAt(0).toUpperCase() + name.slice(1),
                      ]}
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.secondaryLight : "#FFFFFF",
                        border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="portnox"
                      stroke={PORTNOX_COLORS.primary}
                      strokeWidth={2.5}
                      fill="url(#roiGradientFill)"
                      name="Portnox ROI"
                    />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke={VIBRANT_COLORS[2]}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                      name="Competitor Avg. ROI"
                    />
                    <ReLegend wrapperStyle={{ fontSize: "12px" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>
        </div>

        <motion.div className="grid gap-4 md:grid-cols-3" variants={staggerChildren}>
          {[
            {
              icon: <ZapIcon />,
              title: "Rapid Deployment",
              description: `Live in ${ComprehensiveVendorDatabase.portnox.implementation.deploymentTime.fullDeployment} hours vs. months`,
              stat: "99% Faster",
              gradient: "fire" as const,
            },
            {
              icon: <Brain />,
              title: "AI-Powered Security",
              description: "Predictive threat detection & response",
              stat: "85% Incident Reduction",
              gradient: "ocean" as const,
            },
            {
              icon: <HandCoins />,
              title: "Lowest TCO",
              description: "Cloud-native, no hardware",
              stat: `${savingsPercentVsLowestCompetitor.toFixed(0)}% Savings`,
              gradient: "sunset" as const,
            },
          ].map((item, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <GradientCard gradient={item.gradient} darkMode={darkMode} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <motion.div className="p-3 rounded-lg bg-white/10" whileHover={{ scale: 1.1, rotate: 5 }}>
                      {React.cloneElement(item.icon, { className: "h-6 w-6 text-white" })}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-white/80 mb-2">{item.description}</p>
                      <motion.p
                        className="text-2xl font-bold text-white"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {item.stat}
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )
  }

  // Placeholder view components (implement as needed)
  const DetailedCostsView = ({ results, years, darkMode }: any) => (
    <Card className="p-6">
      <CardTitle>Detailed Costs View</CardTitle>
      <CardContent>Implementation coming soon...</CardContent>
    </Card>
  )

  const ComplianceRiskView = ({ results, industry, selectedVendors, darkMode }: any) => (
    <Card className="p-6">
      <CardTitle>Compliance & Risk View</CardTitle>
      <CardContent>Implementation coming soon...</CardContent>
    </Card>
  )

  const OperationsImpactView = ({ results, currentDeviceCount, currentUsersCount, region, darkMode }: any) => (
    <Card className="p-6">
      <CardTitle>Operations Impact View</CardTitle>
      <CardContent>Implementation coming soon...</CardContent>
    </Card>
  )

  const FeatureComparison = ({ data, darkMode }: any) => (
    <Card className="p-6">
      <CardTitle>Feature Comparison View</CardTitle>
      <CardContent>Implementation coming soon...</CardContent>
    </Card>
  )

  const ImplementationRoadmapView = ({ selectedVendor, deviceCount, userCount, darkMode }: any) => (
    <Card className="p-6">
      <CardTitle>Implementation Roadmap View</CardTitle>
      <CardContent>Implementation coming soon...</CardContent>
    </Card>
  )

  const ReportsView = ({ results, config, darkMode }: any) => (
    <Card className="p-6">
      <CardTitle>Reports View</CardTitle>
      <CardContent>Implementation coming soon...</CardContent>
    </Card>
  )

  const Footer = () => (
    <motion.footer
      className={cn("mt-auto border-t", darkMode ? "bg-gray-900 border-gray-800/50" : "bg-gray-100 border-gray-200/50")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Image
              src={getVendorLogoPath("portnox") || "/placeholder.svg"}
              alt="Portnox Logo"
              width={150}
              height={38}
              className="h-9 w-auto"
            />
            <p className={cn("text-sm", darkMode ? "text-gray-400" : "text-gray-600")}>
              AI-powered cloud-native NAC delivering zero-trust security with unmatched simplicity.
            </p>
            <div className="flex space-x-4">
              {[
                { href: "https://www.linkedin.com/company/portnox/", icon: <Linkedin className="h-5 w-5" /> },
                { href: "https://twitter.com/Portnox", icon: <Twitter className="h-5 w-5" /> },
                { href: "https://www.youtube.com/user/PortNOX", icon: <YoutubeIcon className="h-5 w-5" /> },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, color: PORTNOX_COLORS.primary }}
                  className={cn(darkMode ? "text-gray-400" : "text-gray-500", "transition-colors")}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h4 className={cn("font-semibold mb-3", darkMode ? "text-gray-200" : "text-gray-800")}>Resources</h4>
            <ul className="space-y-1.5 text-sm">
              {["Documentation", "API Reference", "Case Studies", "Webinars", "Blog"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={cn(
                      darkMode
                        ? "text-gray-400 hover:text-portnox-primaryLight"
                        : "text-gray-600 hover:text-portnox-primary",
                      "transition-colors",
                    )}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={cn("font-semibold mb-3", darkMode ? "text-gray-200" : "text-gray-800")}>Company</h4>
            <ul className="space-y-1.5 text-sm">
              {["About Us", "Careers", "Partners", "Newsroom", "Contact Us"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={cn(
                      darkMode
                        ? "text-gray-400 hover:text-portnox-primaryLight"
                        : "text-gray-600 hover:text-portnox-primary",
                      "transition-colors",
                    )}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={cn("font-semibold mb-3", darkMode ? "text-gray-200" : "text-gray-800")}>Get Started</h4>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-portnox-primary to-portnox-primaryDark text-white hover:shadow-md transition-all transform hover:-translate-y-px">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Demo
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "w-full",
                  darkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100",
                )}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
        <Separator className={cn("my-6", darkMode ? "bg-gray-700" : "bg-gray-200")} />
        <div
          className={cn(
            "flex flex-col md:flex-row items-center justify-between text-xs",
            darkMode ? "text-gray-500" : "text-gray-400",
          )}
        >
          <p>
            &copy; {new Date().getFullYear()} Portnox. All rights reserved. This TCO Analyzer is for estimation purposes
            only.
          </p>
          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            <a href="#" className="hover:text-portnox-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-portnox-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={cn(
          "min-h-screen flex flex-col font-sans antialiased",
          darkMode ? "dark bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900",
        )}
      >
        <Header />
        <TabNavigation />

        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Vendor Selection Sidebar */}
              <AnimatePresence>
                {showVendorSelection && (
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="xl:col-span-1"
                  >
                    <div className="sticky top-32">
                      <EnhancedVendorSelection
                        selectedVendors={selectedVendors}
                        onVendorToggle={handleVendorToggle}
                        onClearAll={() => setSelectedVendors(["portnox"])}
                        onSelectRecommended={() => setSelectedVendors(["portnox", "cisco", "aruba", "meraki"])}
                        darkMode={darkMode}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Content */}
              <div className={cn("xl:col-span-3", !showVendorSelection && "xl:col-span-4")}>
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

        <Footer />

        {/* Settings Panel */}
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
