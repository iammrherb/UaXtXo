"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Settings,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BarChart3,
  DollarSign,
  TrendingUp,
  Shield,
  FileCheck,
  Users,
  LayoutGrid,
  MapPin,
  Building2,
  FileText,
  Calendar,
  HelpCircle,
} from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

// Removed complex vendor selection - now using compact top selector
import SettingsPanel from "./settings-panel"
import ExecutiveDashboardView from "./views/executive-dashboard-view"
import DetailedCostsView from "./views/detailed-costs-view"
import ROIView from "./views/roi-view"
import SecurityPostureView from "./views/security-posture-view"
import ComplianceRiskView from "./views/compliance-risk-view"
import OperationsImpactView from "./views/operational-analysis-view"
import FeatureMatrixView from "./views/feature-matrix-view"
import ImplementationRoadmapView from "./views/implementation-roadmap-view"
import BusinessImpactView from "./views/business-impact-view"
import ReportsView from "./views/reports-view"
import AnimatedPortnoxLogo from "./animated-portnox-logo"

import { compareVendors } from "@/lib/enhanced-tco-calculator"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

const DEFAULT_VENDORS = ["portnox"]

export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  // Removed sidebar state - now using top vendor selector

  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    devices: 2500,
    users: 1500,
    industry: "technology",
    orgSize: "medium",
    years: 3,
    region: "north-america",
    portnoxBasePrice: 4.0,
    portnoxAddons: { tacacs: false, ztna: false },
    aiConfig: {
      openaiApiKey: "",
      openaiModel: "gpt-4o",
      claudeApiKey: "",
      claudeModel: "claude-3-sonnet-20240229",
      geminiApiKey: "",
      geminiModel: "gemini-pro",
      defaultProvider: "openai",
      maxTokens: 2000,
      temperature: 0.7,
    },
  })

  const [selectedVendors, setSelectedVendors] = useState<string[]>(DEFAULT_VENDORS)
  const [results, setResults] = useState<CalculationResult[]>([])

  useEffect(() => {
    setIsClient(true)
    // Load from localStorage
    try {
      const saved = localStorage.getItem("portnox-tco-config")
      if (saved) {
        const { configuration: savedConfig, selectedVendors: savedVendors, darkMode: savedDarkMode } = JSON.parse(saved)
        if (savedConfig) setConfiguration(savedConfig)
        if (savedVendors) setSelectedVendors(savedVendors)
        if (typeof savedDarkMode === "boolean") setDarkMode(savedDarkMode)
      }
    } catch (error) {
      console.error("Failed to load from localStorage", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const newResults = compareVendors(selectedVendors, configuration)
      setResults(newResults)
      // Save to localStorage
      localStorage.setItem(
        "portnox-tco-config",
        JSON.stringify({ configuration, selectedVendors, darkMode, timestamp: new Date().toISOString() }),
      )
    }
  }, [selectedVendors, configuration, darkMode, isLoading])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Available vendors for comparison (excluding Portnox which is always selected)
  const availableVendors = [
    { id: "cisco", name: "Cisco ISE", logo: "/cisco-logo.png" },
    { id: "aruba", name: "Aruba ClearPass", logo: "/aruba-logo.png" },
    { id: "forescout", name: "Forescout", logo: "/forescout-logo.png" },
    { id: "fortinet", name: "Fortinet FortiNAC", logo: "/fortinet-logo.png" },
    { id: "extreme", name: "Extreme Networks", logo: "/extreme-logo.png" },
    { id: "juniper", name: "Juniper", logo: "/juniper-logo.png" },
    { id: "microsoft", name: "Microsoft NAP", logo: "/microsoft-logo.png" },
    { id: "securew2", name: "SecureW2", logo: "/securew2-logo.png" },
  ]

  const handleVendorChange = (position: "first" | "second", vendorId: string) => {
    setSelectedVendors((prev) => {
      const newVendors = ["portnox"] // Always start with Portnox
      const currentComparisonVendors = prev.filter(v => v !== "portnox")
      
      if (position === "first") {
        newVendors.push(vendorId)
        // Keep the second vendor if it exists and is different
        if (currentComparisonVendors.length > 1 && currentComparisonVendors[1] !== vendorId) {
          newVendors.push(currentComparisonVendors[1])
        } else if (currentComparisonVendors.length > 0 && currentComparisonVendors[0] !== vendorId) {
          newVendors.push(currentComparisonVendors[0])
        }
      } else {
        // Position is "second"
        if (currentComparisonVendors.length > 0) {
          newVendors.push(currentComparisonVendors[0])
        }
        newVendors.push(vendorId)
      }
      
      return newVendors
    })
    toast(`Comparison updated with ${vendorId}`)
  }

  const handleClearComparison = () => {
    setSelectedVendors(["portnox"])
    toast("Comparison vendors cleared. Portnox remains selected.")
  }

  const handleConfigChange = (newConfig: any) => {
    setConfiguration((prev) => ({ ...prev, ...newConfig }))
  }

  const handleAddonsChange = (newAddons: any) => {
    setConfiguration((prev) => ({
      ...prev,
      portnoxAddons: { ...prev.portnoxAddons, ...newAddons },
    }))
  }

  if (!isClient || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <AnimatedPortnoxLogo width={120} height={40} animate={true} />
          <div className="mt-6 space-y-2">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Executive Intelligence Decision Platform
            </h2>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading comprehensive analysis...</p>
            <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto mt-4">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const TABS = [
    {
      value: "executive",
      label: "Executive Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
      component: <ExecutiveDashboardView results={results} config={configuration} />,
    },
    {
      value: "costs",
      label: "Detailed Costs",
      icon: <DollarSign className="h-4 w-4" />,
      component: <DetailedCostsView results={results} config={configuration} />,
    },
    {
      value: "roi",
      label: "ROI Analysis",
      icon: <TrendingUp className="h-4 w-4" />,
      component: <ROIView results={results} config={configuration} />,
    },
    {
      value: "security",
      label: "Security Posture",
      icon: <Shield className="h-4 w-4" />,
      component: <SecurityPostureView results={results} config={configuration} />,
    },
    {
      value: "compliance",
      label: "Compliance & Risk",
      icon: <FileCheck className="h-4 w-4" />,
      component: <ComplianceRiskView results={results} config={configuration} />,
    },
    {
      value: "operations",
      label: "Operations Impact",
      icon: <Users className="h-4 w-4" />,
      component: <OperationsImpactView results={results} config={configuration} />,
    },
    {
      value: "features",
      label: "Feature Matrix",
      icon: <LayoutGrid className="h-4 w-4" />,
      component: <FeatureMatrixView results={results} config={configuration} />,
    },
    {
      value: "roadmap",
      label: "Implementation",
      icon: <MapPin className="h-4 w-4" />,
      component: <ImplementationRoadmapView results={results} config={configuration} />,
    },
    {
      value: "business",
      label: "Business Impact",
      icon: <Building2 className="h-4 w-4" />,
      component: <BusinessImpactView results={results} config={configuration} />,
    },
    {
      value: "reports",
      label: "Reports",
      icon: <FileText className="h-4 w-4" />,
      component: <ReportsView results={results} configuration={configuration} />,
    },
  ]

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <AnimatedPortnoxLogo width={140} height={40} showText={true} animate={true} />
              <Separator orientation="vertical" className="h-8" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Executive Intelligence Decision Platform
                </h1>
                <p className="text-sm text-muted-foreground">
                  Data-driven insights for Network Access Control vendor evaluation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden md:flex">
                v3.0
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setSettingsOpen(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </header>

        {/* Vendor Selection Bar */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-medium text-sm">NAC Vendor Comparison</span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Always Show Portnox */}
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <img src="/portnox-logo.png" alt="Portnox" className="h-5 w-5" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">Portnox CLEAR</span>
                  <Badge variant="secondary" className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">Baseline</Badge>
                </div>

                <span className="text-muted-foreground">vs</span>

                {/* First Comparison Vendor */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Compare with:</span>
                  <Select 
                    value={selectedVendors[1] || ""} 
                    onValueChange={(value) => handleVendorChange("first", value)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select competitor" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          <div className="flex items-center gap-2">
                            <img src={vendor.logo} alt={vendor.name} className="h-4 w-4" />
                            {vendor.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Second Comparison Vendor (Optional) */}
                {selectedVendors.length >= 2 && (
                  <>
                    <span className="text-muted-foreground">&</span>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={selectedVendors[2] || ""} 
                        onValueChange={(value) => handleVendorChange("second", value === "none" ? "" : value)}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Add second competitor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Remove second competitor</SelectItem>
                          {availableVendors
                            .filter(v => v.id !== selectedVendors[1])
                            .map((vendor) => (
                              <SelectItem key={vendor.id} value={vendor.id}>
                                <div className="flex items-center gap-2">
                                  <img src={vendor.logo} alt={vendor.name} className="h-4 w-4" />
                                  {vendor.name}
                                </div>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleClearComparison}>
                Clear Comparison
              </Button>
              <Badge variant="outline" className="text-xs">
                {selectedVendors.length} vendor{selectedVendors.length !== 1 ? 's' : ''} selected
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col h-full bg-white dark:bg-gray-900">
            {/* Tab Navigation */}
            <div className="border-b bg-white dark:bg-gray-900 px-6 py-3 flex-shrink-0">
              <Tabs defaultValue="executive" className="w-full">
                <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto bg-gray-100 dark:bg-gray-800 p-1">
                  {TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="text-xs px-2 py-2 flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded-md transition-all"
                    >
                      {tab.icon}
                      <span className="hidden sm:inline truncate">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Tab Content */}
                <div className="mt-4">
                  {TABS.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-0 focus-visible:outline-none">
                      <div
                        className="h-[calc(100vh-280px)] overflow-y-auto overflow-x-hidden"
                        style={{ scrollbarWidth: "thin" }}
                      >
                        <div className="pr-2">{tab.component}</div>
                      </div>
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AnimatedPortnoxLogo width={100} height={28} showText={true} animate={false} />
              <Separator orientation="vertical" className="h-6" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Executive Intelligence Decision Platform</span>
                <span className="mx-2">•</span>
                <span>Powered by Portnox CLEAR</span>
                <span className="mx-2">•</span>
                <span>© 2024 Portnox Ltd.</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Last Updated: {new Date().toLocaleDateString()}</span>
              <Badge variant="outline" className="text-xs">
                {selectedVendors.length} vendors selected
              </Badge>
              <Badge variant="outline" className="text-xs">
                {configuration.devices.toLocaleString()} devices
              </Badge>
              <Badge variant="outline" className="text-xs">
                {configuration.years} year analysis
              </Badge>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <HelpCircle className="h-3 w-3 mr-1" />
                Help
              </Button>
            </div>
          </div>
        </footer>

        {/* Settings Panel */}
        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setSettingsOpen(false)}
          configuration={configuration}
          onConfigurationChange={handleConfigChange}
          portnoxAddons={configuration.portnoxAddons}
          onAddonsChange={handleAddonsChange}
          darkMode={darkMode}
          onDarkModeChange={setDarkMode}
        />

        <Toaster />
      </div>
    </div>
  )
}
