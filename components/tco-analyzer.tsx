"use client"

import { useState, useMemo } from "react"
import { compareVendors, type CalculationConfiguration, type CalculationResult } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase, getVendorLogoPath } from "@/lib/comprehensive-vendor-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, BarChart2, FileText, Shield, Briefcase, HardHat } from "lucide-react"
import SettingsPanel from "./settings-panel"
import EnhancedVendorSelection from "./enhanced-vendor-selection"
import FinancialAnalysisView from "./financial-analysis-view"
import ExecutiveReportView from "./executive-report-view"
import CybersecurityPostureView from "./cybersecurity-posture-view"
import BusinessImpactView from "./business-impact-view"
import ImplementationTimelineView from "./implementation-timeline-view"

export default function TcoAnalyzer() {
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba"])
  const [configuration, setConfiguration] = useState<CalculationConfiguration>({
    devices: 500,
    users: 500,
    years: 3,
    licenseTier: "Professional",
    integrations: { mdm: true, siem: true, edr: true },
    professionalServices: "basic",
    includeTraining: true,
    portnoxDeviceCost: 60,
    avgFteCost: 150000,
  })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const results: CalculationResult[] = useMemo(() => {
    return compareVendors(selectedVendors, configuration)
  }, [selectedVendors, configuration])

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((v) => v !== vendorId) : [...prev, vendorId]))
  }

  const toggleDarkMode = (isDark: boolean) => {
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className={`p-4 sm:p-6 md:p-8 ${darkMode ? "dark" : ""}`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">ZTCA TCO Analyzer</h1>
            <Button onClick={() => setIsSettingsOpen(true)} variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            An interactive tool to analyze the Total Cost of Ownership for leading ZTCA / NAC vendors.
          </p>
        </header>

        <EnhancedVendorSelection
          vendors={Object.values(ComprehensiveVendorDatabase)}
          selectedVendors={selectedVendors}
          onVendorToggle={handleVendorToggle}
          getLogoPath={getVendorLogoPath}
        />

        <Tabs defaultValue="executive-report" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="executive-report">
              <FileText className="h-4 w-4 mr-2" />
              Report
            </TabsTrigger>
            <TabsTrigger value="financial-analysis">
              <BarChart2 className="h-4 w-4 mr-2" />
              Financials
            </TabsTrigger>
            <TabsTrigger value="security-risk">
              <Shield className="h-4 w-4 mr-2" />
              Security & Risk
            </TabsTrigger>
            <TabsTrigger value="business-impact">
              <Briefcase className="h-4 w-4 mr-2" />
              Business Impact
            </TabsTrigger>
            <TabsTrigger value="implementation">
              <HardHat className="h-4 w-4 mr-2" />
              Implementation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="executive-report" className="mt-6">
            <ExecutiveReportView results={results} config={configuration} />
          </TabsContent>
          <TabsContent value="financial-analysis" className="mt-6">
            <FinancialAnalysisView results={results} config={configuration} />
          </TabsContent>
          <TabsContent value="security-risk" className="mt-6">
            <CybersecurityPostureView results={results} config={configuration} />
          </TabsContent>
          <TabsContent value="business-impact" className="mt-6">
            <BusinessImpactView results={results} config={configuration} />
          </TabsContent>
          <TabsContent value="implementation" className="mt-6">
            <ImplementationTimelineView results={results} config={configuration} />
          </TabsContent>
        </Tabs>

        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          configuration={configuration}
          onConfigurationChange={setConfiguration}
          darkMode={darkMode}
          onDarkModeChange={toggleDarkMode}
        />
      </div>
    </div>
  )
}
