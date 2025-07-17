"use client"

import { useState, useEffect } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Settings, Loader2 } from "lucide-react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"
import ExecutiveDashboardView from "./views/executive-dashboard-view"
import DetailedCostsView from "./views/detailed-costs-view"
import ROIView from "./views/roi-view"
import SecurityPostureView from "./views/security-posture-view"
import ComplianceRiskView from "./views/compliance-risk-view"
import OperationsImpactView from "./views/operations-impact-view"
import FeatureMatrixView from "./views/feature-matrix-view"
import ImplementationRoadmapView from "./views/implementation-roadmap-view"
import BusinessImpactView from "./views/business-impact-view"
import ReportsView from "./views/reports-view"

import { compareVendors } from "@/lib/enhanced-tco-calculator"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

const DEFAULT_VENDORS = ["portnox", "cisco", "aruba", "forescout"]

export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSettingsOpen, setSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    devices: 2500,
    users: 1500,
    industry: "technology",
    orgSize: "medium",
    years: 3,
    region: "north-america",
    portnoxBasePrice: 4.0,
    portnoxAddons: { atp: false, compliance: false, iot: false, analytics: false },
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
      localStorage.setItem("portnox-tco-config", JSON.stringify({ configuration, selectedVendors, darkMode }))
    }
  }, [selectedVendors, configuration, darkMode, isLoading])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((v) => v !== vendorId) : [...prev, vendorId]))
    toast(`${vendorId} selection updated.`)
  }

  const handleClearAll = () => {
    setSelectedVendors([])
    toast("All vendors cleared.")
  }

  const handleSelectRecommended = () => {
    setSelectedVendors(DEFAULT_VENDORS)
    toast("Recommended vendors selected.")
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-portnox-primary" />
      </div>
    )
  }

  const TABS = [
    {
      value: "executive",
      label: "Executive Dashboard",
      component: <ExecutiveDashboardView results={results} config={configuration} />,
    },
    {
      value: "costs",
      label: "Detailed Costs",
      component: <DetailedCostsView results={results} config={configuration} />,
    },
    { value: "roi", label: "ROI Analysis", component: <ROIView results={results} config={configuration} /> },
    {
      value: "security",
      label: "Security Posture",
      component: <SecurityPostureView results={results} config={configuration} />,
    },
    {
      value: "compliance",
      label: "Compliance & Risk",
      component: <ComplianceRiskView results={results} config={configuration} />,
    },
    {
      value: "operations",
      label: "Operations Impact",
      component: <OperationsImpactView results={results} config={configuration} />,
    },
    {
      value: "features",
      label: "Feature Matrix",
      component: <FeatureMatrixView results={results} config={configuration} />,
    },
    {
      value: "roadmap",
      label: "Implementation",
      component: <ImplementationRoadmapView results={results} config={configuration} />,
    },
    {
      value: "business",
      label: "Business Impact",
      component: <BusinessImpactView results={results} config={configuration} />,
    },
    { value: "reports", label: "Reports", component: <ReportsView results={results} config={configuration} /> },
  ]

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-background text-foreground min-h-screen">
        <ResizablePanelGroup direction="horizontal" className="h-screen w-full">
          <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
            <div className="p-4 h-full overflow-y-auto">
              <EnhancedVendorSelection
                selectedVendors={selectedVendors}
                onVendorToggle={handleVendorToggle}
                onClearAll={handleClearAll}
                onSelectRecommended={handleSelectRecommended}
                darkMode={darkMode}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex flex-col h-full">
              <header className="flex items-center justify-between p-4 border-b">
                <div>
                  <h1 className="text-2xl font-bold text-portnox-primary">Portnox TCO & ROI Analyzer</h1>
                  <p className="text-sm text-muted-foreground">
                    Data-driven insights for modern Network Access Control
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setSettingsOpen(true)}>
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </header>
              <main className="flex-1 p-6 overflow-y-auto">
                <Tabs defaultValue="executive" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto">
                    {TABS.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value} className="text-xs px-2 py-1.5">
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {TABS.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-6">
                      {tab.component}
                    </TabsContent>
                  ))}
                </Tabs>
              </main>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
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
