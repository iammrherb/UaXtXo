"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import { type CalculationResult, compareVendors, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"
import ExecutiveDashboardView from "./executive-dashboard-view"
import FinancialAnalysisView from "./financial-analysis-view"
import CybersecurityPostureView from "./cybersecurity-posture-view"
import BusinessImpactView from "./business-impact-view"
import ImplementationTimelineView from "./implementation-timeline-view"
import FeatureMatrixView from "./feature-matrix-view"
import ExecutiveReportView from "./executive-report-view"
import IntegrationHubView from "./integration-hub-view"

import {
  LayoutGrid,
  ShieldCheck,
  BarChartHorizontal,
  FileText,
  RouteIcon as Road,
  FilePieChart,
  Phone,
  SlidersHorizontal,
  InfoIcon,
  MoonIcon,
  RocketIcon,
  SunIcon,
  AlertTriangleIcon,
  Settings,
  TrendingUp,
  Zap,
} from "lucide-react"

const TABS_CONFIG = [
  { value: "dashboard", label: "Dashboard", icon: <BarChartHorizontal /> },
  { value: "financials", label: "Financials", icon: <FilePieChart /> },
  { value: "roi", label: "ROI & Value", icon: <TrendingUp /> },
  { value: "security", label: "Security & Risk", icon: <ShieldCheck /> },
  { value: "integrations", label: "Integrations", icon: <Zap /> },
  { value: "operations", label: "Operations", icon: <SlidersHorizontal /> },
  { value: "features", label: "Features", icon: <LayoutGrid /> },
  { value: "implementation", label: "Implementation", icon: <Road /> },
  { value: "report", label: "Report", icon: <FileText /> },
]

// Main Enhanced Component
export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showVendorSelection, setShowVendorSelection] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  // Configuration state
  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    devices: 5000,
    users: 5000,
    years: 3,
    licenseTier: "Enterprise",
    integrations: { mdm: true, siem: true, edr: false },
    professionalServices: "advanced",
    includeTraining: true,
  })

  const [selectedVendors, setSelectedVendors] = useState<string[]>([
    "portnox",
    "cisco",
    "aruba",
    "fortinet",
    "microsoft",
  ])
  const [activeView, setActiveView] = useState("dashboard")
  const [results, setResults] = useState<CalculationResult[] | null>(null)
  const [calculationError, setCalculationError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
    document.documentElement.classList.toggle("dark", darkMode)
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
      const newSelection = isSelected ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
      if (newSelection.length > 6) newSelection.shift() // Limit to 6 vendors
      return newSelection
    })
  }

  const renderView = () => {
    if (calculationError)
      return (
        <Card className="p-6 text-center text-destructive">
          <AlertTriangleIcon className="mx-auto h-8 w-8 mb-2" />
          {calculationError}
        </Card>
      )
    if (!isClient)
      return (
        <div className="w-full h-96 flex items-center justify-center">
          <RocketIcon className="mx-auto h-12 w-12 text-primary animate-pulse" />
          <p className="mt-4">Launching...</p>
        </div>
      )
    if (!results || results.length === 0)
      return (
        <Card className="p-6 text-center text-muted-foreground">
          <InfoIcon className="mx-auto h-8 w-8 mb-2 text-primary" />
          Select vendors to begin.
        </Card>
      )

    switch (activeView) {
      case "dashboard":
        return <ExecutiveDashboardView results={results} config={configuration} />
      case "financials":
        return <FinancialAnalysisView results={results} config={configuration} />
      case "roi":
        return <BusinessImpactView results={results} config={configuration} />
      case "security":
        return <CybersecurityPostureView results={results} config={configuration} />
      case "integrations":
        return <IntegrationHubView selectedVendors={selectedVendors} config={configuration} />
      case "operations":
        return <ImplementationTimelineView results={results} config={configuration} />
      case "features":
        return <FeatureMatrixView selectedVendors={selectedVendors} />
      case "implementation":
        return <ImplementationTimelineView results={results} config={configuration} />
      case "report":
        return <ExecutiveReportView results={results} config={configuration} />
      default:
        return <Card className="p-6">Not Implemented</Card>
    }
  }

  const Header = ({ showVendorSelection, setShowVendorSelection, darkMode, setDarkMode, setShowSettings }: any) => (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <Image
            src={getVendorLogoPath("portnox") || "/placeholder.svg"}
            alt="Portnox Logo"
            width={140}
            height={35}
            className="h-8 w-auto"
          />
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            TCO Analyzer
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVendorSelection(!showVendorSelection)}
                className={cn(showVendorSelection && "bg-muted")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle Vendors</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle Theme</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Configuration</TooltipContent>
          </Tooltip>
          <Button size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Schedule Demo
          </Button>
        </div>
      </div>
    </header>
  )

  const TabNavigation = ({ activeView, setActiveView }: any) => (
    <nav className="sticky top-16 z-40 backdrop-blur-md bg-background/70 border-b">
      <div className="container mx-auto px-0 sm:px-4">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full h-auto py-0 bg-transparent rounded-none grid-cols-5 sm:grid-cols-9">
            {TABS_CONFIG.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="relative flex-col sm:flex-row h-16 sm:h-12 text-xs rounded-none px-2 py-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:bg-muted/50 data-[state=active]:text-primary group"
              >
                <div className="h-5 w-5 mb-0.5 sm:mr-1.5 sm:mb-0 transition-transform group-hover:scale-110">
                  {tab.icon}
                </div>
                <span className="hidden sm:inline">{tab.label}</span>
                {activeView === tab.value && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTabIndicator"
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </nav>
  )

  return (
    <TooltipProvider>
      <div
        className={cn(
          "min-h-screen flex flex-col font-sans",
          darkMode ? "dark bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900",
        )}
      >
        <Header {...{ showVendorSelection, setShowVendorSelection, darkMode, setDarkMode, setShowSettings }} />
        <TabNavigation {...{ activeView, setActiveView }} />
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {showVendorSelection && (
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    className="xl:col-span-1"
                  >
                    <div className="sticky top-32">
                      <EnhancedVendorSelection
                        {...{ selectedVendors, handleVendorToggle, darkMode }}
                        onClearAll={() => setSelectedVendors(["portnox"])}
                        onSelectRecommended={() =>
                          setSelectedVendors(["portnox", "cisco", "aruba", "fortinet", "microsoft"])
                        }
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
                  >
                    {renderView()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
        <SettingsPanel
          {...{
            isOpen: showSettings,
            onClose: () => setShowSettings(false),
            configuration,
            onConfigurationChange: setConfiguration,
            darkMode,
            onDarkModeChange: setDarkMode,
          }}
        />
      </div>
    </TooltipProvider>
  )
}
