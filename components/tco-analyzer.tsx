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
import OperationalAnalysisView from "./operational-analysis-view"
import FeatureMatrixView from "./feature-matrix-view"
import ExecutiveReportView from "./executive-report-view"
import IntegrationHubView from "./integration-hub-view"
import ComplianceRiskView from "./compliance-risk-view"
import SecurityRiskAssessmentView from "./security-risk-assessment-view"

import {
  LayoutGrid,
  ShieldCheck,
  BarChartHorizontal,
  FileText,
  Settings2,
  FilePieChart,
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

// Update the TABS_CONFIG to include the new risk assessment tab
const TABS_CONFIG = [
  { value: "dashboard", label: "Dashboard", icon: <BarChartHorizontal /> },
  { value: "financials", label: "Financials", icon: <FilePieChart /> },
  { value: "roi", label: "ROI & Value", icon: <TrendingUp /> },
  { value: "security", label: "Security & Risk", icon: <ShieldCheck /> },
  { value: "riskAssessment", label: "Risk Assessment", icon: <AlertTriangleIcon /> },
  { value: "complianceRisk", label: "Compliance & Risk", icon: <ShieldCheck /> },
  { value: "integrations", label: "Integrations", icon: <Zap /> },
  { value: "operations", label: "Operations", icon: <Settings2 /> },
  { value: "features", label: "Features", icon: <LayoutGrid /> },
  { value: "implementation", label: "Implementation", icon: <SlidersHorizontal /> },
  { value: "report", label: "Report", icon: <FileText /> },
]

// Main Enhanced Component
export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showVendorSelection, setShowVendorSelection] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  // Configuration state with updated defaults based on 500 devices
  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    devices: 500,
    users: 500,
    years: 3,
    licenseTier: "Enterprise",
    integrations: { mdm: true, siem: true, edr: false },
    professionalServices: "advanced",
    includeTraining: true,
    portnoxDeviceCost: 20,
    avgFteCost: 150000,
  })

  // Updated to use the correct vendor IDs from the database
  const [selectedVendors, setSelectedVendors] = useState<string[]>([
    "portnox",
    "cisco",
    "aruba",
    "fortinet",
    "microsoft",
    "securew2",
    "foxpass",
    "pulse",
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
      // Always keep Portnox as primary - don't allow deselection if it's the only one
      if (vendorId === "portnox" && isSelected && prev.length === 1) return prev
      const newSelection = isSelected ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
      if (newSelection.length > 13) newSelection.shift() // Allow up to 13 vendors
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
          Select vendors with complete data to begin analysis.
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
      case "riskAssessment":
        return <SecurityRiskAssessmentView results={results} config={configuration} />
      case "complianceRisk":
        return <ComplianceRiskView results={results} config={configuration} />
      case "integrations":
        return <IntegrationHubView selectedVendors={selectedVendors} config={configuration} />
      case "operations":
        return (
          <OperationalAnalysisView
            selectedVendors={selectedVendors}
            devices={configuration.devices}
            users={configuration.users}
          />
        )
      case "features":
        return <FeatureMatrixView selectedVendors={selectedVendors} />
      case "implementation":
        return (
          <OperationalAnalysisView
            selectedVendors={selectedVendors}
            devices={configuration.devices}
            users={configuration.users}
          />
        )
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowVendorSelection(!showVendorSelection)}
                  className={cn(showVendorSelection && "bg-primary text-primary-foreground")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Vendor Selection</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Theme</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header
        showVendorSelection={showVendorSelection}
        setShowVendorSelection={setShowVendorSelection}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowSettings={setShowSettings}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence>
          {showVendorSelection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <EnhancedVendorSelection
                selectedVendors={selectedVendors}
                onVendorToggle={handleVendorToggle}
                onCalculate={handleCalculate}
                configuration={configuration}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto p-1">
              {TABS_CONFIG.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="flex flex-col items-center gap-1 p-2 text-xs">
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </div>
      </div>

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        configuration={configuration}
        onConfigurationChange={setConfiguration}
      />
    </div>
  )
}
