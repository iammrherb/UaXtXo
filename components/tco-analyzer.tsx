"use client"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import { type CalculationResult, compareVendors, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import ExecutiveDashboardView from "./executive-dashboard-view"
import FinancialAnalysisView from "./financial-analysis-view"
import CybersecurityPostureView from "./cybersecurity-posture-view"
import BusinessImpactView from "./business-impact-view"
import OperationalAnalysisView from "./operational-analysis-view"
import FeatureMatrixView from "./feature-matrix-view"
import ExecutiveReportView from "./executive-report-view"
import IntegrationHubView from "./integration-hub-view"
import ComplianceRiskView from "./compliance-risk-view"

import {
  LayoutGrid,
  ShieldCheck,
  BarChartHorizontal,
  FileText,
  Settings2,
  FilePieChart,
  SlidersHorizontal,
  InfoIcon,
  RocketIcon,
  AlertTriangleIcon,
  TrendingUp,
  Zap,
} from "lucide-react"

const TABS_CONFIG = [
  { value: "dashboard", label: "Dashboard", icon: <BarChartHorizontal /> },
  { value: "financials", label: "Financials", icon: <FilePieChart /> },
  { value: "roi", label: "ROI & Value", icon: <TrendingUp /> },
  { value: "security", label: "Security & Risk", icon: <ShieldCheck /> },
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

  // Updated to include all required vendors with Portnox as primary
  const [selectedVendors, setSelectedVendors] = useState<string[]>([
    "portnox",
    "cisco_ise",
    "aruba_clearpass",
    "juniper_mist",
    "extreme",
    "arista",
    "pulse_secure",
    "microsoft_nps",
    "foxpass",
    "securew2",
    "packetfence",
    "forescout",
    "meraki",
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
      case "complianceRisk":
        return <ComplianceRiskView results={results} config={configuration} />
      case "integrations":
        return <IntegrationHubView selectedVendors={selectedVendors} config={configuration} />
      case "operations":
        return <OperationalAnalysisView selectedVendors={selectedVendors} devices={configuration.devices} users={configuration.users} />
      case "features":
        return <FeatureMatrixView selectedVendors={selectedVendors} />
      case "implementation":
        return <OperationalAnalysisView selectedVendors={selectedVendors} devices={configuration.devices} users={configuration.users} />
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
        <div\
