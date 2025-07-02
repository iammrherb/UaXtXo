"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { type CalculationResult, compareVendors, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"
import ExecutiveDashboardView from "./executive-dashboard-view"
import FinancialAnalysisView from "./financial-analysis-view"
import CybersecurityPostureView from "./cybersecurity-posture-view"
import BusinessImpactView from "./business-impact-view"
import ImplementationTimelineView from "./implementation-timeline-view"
import ExecutiveReportView from "./executive-report-view"
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
  FileDown,
  Presentation,
  FileSpreadsheet,
  Printer,
} from "lucide-react"
import { useReactToPrint } from "react-to-print"

// Main Component
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

  const reportRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({ content: () => reportRef.current })

  useEffect(() => {
    setIsClient(true)
    const savedDarkMode = localStorage.getItem("portnox-tco-dark-mode")
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      document.documentElement.classList.toggle("dark", darkMode)
      localStorage.setItem("portnox-tco-dark-mode", JSON.stringify(darkMode))
    }
  }, [darkMode, isClient])

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
          // TODO: Add a toast notification here
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

  const TABS_CONFIG = [
    { value: "dashboard", label: "Executive Dashboard", icon: <BarChartHorizontal /> },
    { value: "financials", label: "Financial Analysis", icon: <FilePieChart /> },
    { value: "cybersecurity", label: "Cybersecurity Posture", icon: <ShieldCheck /> },
    { value: "operations", label: "Business Impact", icon: <SlidersHorizontal /> },
    { value: "timeline", label: "Implementation", icon: <Road /> },
    { value: "report", label: "Executive Report", icon: <FileText /> },
  ]

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
            <RocketIcon className="mx-auto h-12 w-12 text-primary animate-pulse" />
            <p className="mt-4 text-lg font-semibold">Launching Decision Engine...</p>
            <p className="text-sm text-muted-foreground">Calculating TCO and ROI...</p>
          </div>
        </div>
      )

    if (!results || results.length === 0)
      return (
        <Card className="p-6 text-center text-muted-foreground animate-fade-in">
          <InfoIcon className="mx-auto h-8 w-8 mb-2 text-primary" />
          Select vendors and configure settings to begin analysis.
        </Card>
      )

    switch (activeView) {
      case "dashboard":
        return <ExecutiveDashboardView results={results} config={configuration} />
      case "financials":
        return <FinancialAnalysisView results={results} config={configuration} />
      case "cybersecurity":
        return <CybersecurityPostureView results={results} config={configuration} />
      case "operations":
        return <BusinessImpactView results={results} config={configuration} />
      case "timeline":
        return <ImplementationTimelineView results={results} config={configuration} />
      case "report":
        return (
          <ExecutiveReportView
            results={results}
            config={configuration}
            darkMode={darkMode}
            ref={reportRef}
            handlePrint={handlePrint}
          />
        )
      default:
        return <Card className="p-6">View not implemented.</Card>
    }
  }

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={cn(
          "min-h-screen flex flex-col font-sans antialiased transition-colors duration-300",
          darkMode ? "dark bg-background text-foreground" : "bg-background text-foreground",
        )}
      >
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          showVendorSelection={showVendorSelection}
          setShowVendorSelection={setShowVendorSelection}
          setShowSettings={setShowSettings}
          handlePrint={handlePrint}
        />
        <TabNavigation tabs={TABS_CONFIG} activeView={activeView} setActiveView={setActiveView} darkMode={darkMode} />

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

// Header Component
const Header = ({
  darkMode,
  setDarkMode,
  showVendorSelection,
  setShowVendorSelection,
  setShowSettings,
  handlePrint,
}: any) => (
  <motion.header
    className={cn(
      "sticky top-0 z-50 backdrop-blur-lg transition-all duration-300",
      "bg-background/80 border-b border-border/50",
    )}
    initial={{ y: -80, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <Image src="/portnox-logo.png" alt="Portnox Logo" width={140} height={35} className="h-8 w-auto" priority />
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-portnox-primary to-portnox-primaryDark bg-clip-text text-transparent">
              TCO & ROI Platform
            </h1>
            <p className="text-xs text-muted-foreground">Zero Trust Decision Engine v4.0</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowVendorSelection(!showVendorSelection)}
                  className={cn(showVendorSelection && "bg-primary/10 text-primary")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Vendor Selection</TooltipContent>
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
              <TooltipContent>Settings & Configuration</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="ml-2 bg-transparent">
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Generate PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Presentation className="h-4 w-4 mr-2" />
                Export to PowerPoint
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export to Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="bg-portnox-primary text-white hover:bg-portnox-primaryDark">
            <Phone className="h-4 w-4 mr-2" />
            Schedule Demo
          </Button>
        </div>
      </div>
    </div>
  </motion.header>
)

// Tab Navigation Component
const TabNavigation = ({ tabs, activeView, setActiveView, darkMode }: any) => (
  <motion.nav
    className={cn("sticky top-16 z-40 backdrop-blur-md", "bg-background/70 border-b border-border/60")}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}
  >
    <div className="container mx-auto px-0 sm:px-4">
      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className={cn("grid w-full h-auto py-0 bg-transparent rounded-none", `grid-cols-3 sm:grid-cols-6`)}>
          {tabs.map((tab: any, index: number) => (
            <motion.div
              key={tab.value}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.05, type: "spring", stiffness: 120, damping: 15 }}
            >
              <TabsTrigger
                value={tab.value}
                className={cn(
                  "relative flex-col sm:flex-row h-16 sm:h-12 text-xs rounded-none px-2 py-1 sm:px-3 w-full",
                  "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                  "hover:bg-primary/5 data-[state=active]:text-primary",
                  "transition-all duration-200 group",
                )}
              >
                <div className="h-5 w-5 mb-0.5 sm:mr-1.5 sm:mb-0 transition-transform duration-200 group-hover:scale-110">
                  {React.cloneElement(tab.icon, { className: "h-full w-full" })}
                </div>
                <span className="hidden sm:inline font-medium">{tab.label}</span>
                <span className="inline sm:hidden text-[9px] leading-tight mt-0.5 text-center font-medium">
                  {tab.label}
                </span>
                {activeView === tab.value && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
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
