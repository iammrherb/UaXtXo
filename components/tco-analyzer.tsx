"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, BarChart3, TrendingUp, Shield, Clock, FileText, Settings, Download, Calendar } from "lucide-react"

// Import components
import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"
import ExecutiveDashboardView from "./executive-dashboard-view"
import FinancialAnalysisView from "./financial-analysis-view"
import BusinessImpactView from "./business-impact-view"
import CybersecurityPostureView from "./cybersecurity-posture-view"
import FeatureMatrixView from "./feature-matrix-view"
import ImplementationTimelineView from "./implementation-timeline-view"
import ExecutiveReportView from "./executive-report-view"

// Import data and utilities
import { calculateEnhancedTCO } from "@/lib/enhanced-tco-calculator"
import { comprehensiveVendorData } from "@/lib/comprehensive-vendor-data"
import { staggerChildren, fadeInUp } from "./shared-ui"

interface TCOAnalyzerProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export default function TCOAnalyzer({ isDarkMode, onToggleDarkMode }: TCOAnalyzerProps) {
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["Portnox", "Cisco ISE"])
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showSettings, setShowSettings] = useState(false)
  const [calculationSettings, setCalculationSettings] = useState({
    organizationSize: 1000,
    industryType: "enterprise",
    complianceRequirements: ["SOX", "HIPAA"],
    currentSolution: "legacy",
    implementationComplexity: "medium",
    geographicScope: "multi-region",
  })
  const [results, setResults] = useState<any[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  // Calculate TCO when vendors or settings change
  useEffect(() => {
    if (selectedVendors.length > 0) {
      setIsCalculating(true)

      // Simulate calculation delay
      setTimeout(() => {
        const calculatedResults = selectedVendors
          .map((vendorName) => {
            const vendorData = comprehensiveVendorData.find((v) => v.name === vendorName)
            if (!vendorData) return null

            return calculateEnhancedTCO(vendorData, calculationSettings)
          })
          .filter(Boolean)

        setResults(calculatedResults)
        setIsCalculating(false)
      }, 1000)
    }
  }, [selectedVendors, calculationSettings])

  const handleVendorToggle = (vendorName: string) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorName) ? prev.filter((v) => v !== vendorName) : [...prev, vendorName],
    )
  }

  const handleExportReport = () => {
    // Export functionality would be implemented here
    console.log("Exporting report...")
  }

  const handleScheduleDemo = () => {
    // Demo scheduling functionality would be implemented here
    console.log("Scheduling demo...")
  }

  const tabs = [
    { id: "dashboard", label: "Executive Dashboard", icon: BarChart3 },
    { id: "financial", label: "Financial Analysis", icon: Calculator },
    { id: "business", label: "Business Impact", icon: TrendingUp },
    { id: "security", label: "Security Posture", icon: Shield },
    { id: "features", label: "Feature Matrix", icon: Settings },
    { id: "timeline", label: "Implementation", icon: Clock },
    { id: "report", label: "Executive Report", icon: FileText },
  ]

  return (
    <motion.div initial="initial" animate="animate" variants={staggerChildren} className="min-h-screen bg-background">
      {/* Header */}
      <motion.div variants={fadeInUp} className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">ZTCA Dashboard</h1>
              <p className="text-muted-foreground">Zero Trust Cost Analyzer - Strategic NAC Investment Analysis</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                {selectedVendors.length} Vendor{selectedVendors.length !== 1 ? "s" : ""} Selected
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportReport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={handleScheduleDemo}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div variants={fadeInUp} className="lg:col-span-1 space-y-6">
            {/* Vendor Selection */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Vendor Selection</h3>
                <EnhancedVendorSelection
                  selectedVendors={selectedVendors}
                  onVendorToggle={handleVendorToggle}
                  availableVendors={comprehensiveVendorData.map((v) => v.name)}
                />
              </CardContent>
            </Card>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <SettingsPanel settings={calculationSettings} onSettingsChange={setCalculationSettings} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats */}
            {results.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Best ROI</span>
                      <span className="font-medium">{Math.round(Math.max(...results.map((r) => r?.roi || 0)))}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Lowest TCO</span>
                      <span className="font-medium">
                        ${Math.round(Math.min(...results.map((r) => r?.totalCost || 0)) / 1000)}K
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fastest Payback</span>
                      <span className="font-medium">
                        {Math.round(Math.min(...results.map((r) => r?.paybackPeriod || 0)))} months
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Main Content */}
          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2 text-xs">
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="min-h-[600px]">
                {isCalculating ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Calculating TCO analysis...</p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <TabsContent value="dashboard">
                      <ExecutiveDashboardView results={results} selectedVendors={selectedVendors} />
                    </TabsContent>
                    <TabsContent value="financial">
                      <FinancialAnalysisView results={results} selectedVendors={selectedVendors} />
                    </TabsContent>
                    <TabsContent value="business">
                      <BusinessImpactView results={results} selectedVendors={selectedVendors} />
                    </TabsContent>
                    <TabsContent value="security">
                      <CybersecurityPostureView results={results} selectedVendors={selectedVendors} />
                    </TabsContent>
                    <TabsContent value="features">
                      <FeatureMatrixView results={results} selectedVendors={selectedVendors} />
                    </TabsContent>
                    <TabsContent value="timeline">
                      <ImplementationTimelineView results={results} selectedVendors={selectedVendors} />
                    </TabsContent>
                    <TabsContent value="report">
                      <ExecutiveReportView results={results} selectedVendors={selectedVendors} />
                    </TabsContent>
                  </>
                )}
              </div>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
