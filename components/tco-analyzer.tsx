"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  BarChart3,
  TrendingUp,
  FileText,
  Settings,
  Download,
  Moon,
  Sun,
  Shield,
  Grid3X3,
  Building2,
  Calendar,
  Users,
} from "lucide-react"
import { useTheme } from "next-themes"

// Import all view components (using default imports)
import EnhancedVendorSelection from "./enhanced-vendor-selection"
import SettingsPanel from "./settings-panel"
import ExecutiveDashboardView from "./executive-dashboard-view"
import FinancialAnalysisView from "./financial-analysis-view"
import BusinessImpactView from "./business-impact-view"
import ImplementationTimelineView from "./implementation-timeline-view"
import ExecutiveReportView from "./executive-report-view"
import CybersecurityPostureView from "./cybersecurity-posture-view"
import FeatureMatrixView from "./feature-matrix-view"

// Import data and utilities
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { calculateEnhancedTCO } from "@/lib/enhanced-tco-calculator"

export default function TCOAnalyzer() {
  const { theme, setTheme } = useTheme()
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco"])
  const [activeView, setActiveView] = useState("dashboard")
  const [calculationSettings, setCalculationSettings] = useState({
    timeHorizon: 5,
    discountRate: 0.08,
    inflationRate: 0.03,
    organizationSize: 1000,
    securityRequirements: "high",
    complianceNeeds: ["sox", "pci", "hipaa"],
    deploymentModel: "hybrid",
  })

  // Calculate TCO data for selected vendors
  const tcoResults = selectedVendors
    .map((vendorId) => {
      const vendor = ComprehensiveVendorDatabase[vendorId]
      if (!vendor) return null

      return {
        vendor,
        tco: calculateEnhancedTCO(vendor, calculationSettings),
      }
    })
    .filter(Boolean)

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors((prev) => {
      const isSelected = prev.includes(vendorId)
      if (vendorId === "portnox" && isSelected && prev.length === 1) return prev
      const newSelection = isSelected ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]
      if (newSelection.length > 6) newSelection.shift()
      return newSelection
    })
  }

  const handleSettingsChange = (newSettings: typeof calculationSettings) => {
    setCalculationSettings(newSettings)
  }

  const exportToPDF = () => {
    console.log("Exporting to PDF...")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calculator className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">ZTCA Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Zero Trust Cost Analyzer</p>
                </div>
              </div>
              <Badge variant="secondary" className="ml-4">
                v2.0
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={exportToPDF} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>

              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
                <Moon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Vendor Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Vendor Selection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EnhancedVendorSelection
                  selectedVendors={selectedVendors}
                  onVendorToggle={handleVendorToggle}
                  darkMode={theme === "dark"}
                  onClearAll={() => setSelectedVendors(["portnox"])}
                  onSelectRecommended={() => setSelectedVendors(["portnox", "cisco", "aruba", "forescout"])}
                />
              </CardContent>
            </Card>

            {/* Settings Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SettingsPanel
                  isOpen={true}
                  onClose={() => {}}
                  configuration={{
                    devices: calculationSettings.organizationSize,
                    users: calculationSettings.organizationSize,
                    years: calculationSettings.timeHorizon,
                    licenseTier: "Enterprise",
                    integrations: { mdm: true, siem: true, edr: false },
                    professionalServices: "advanced",
                    includeTraining: true,
                  }}
                  onConfigurationChange={(config) => {
                    setCalculationSettings({
                      ...calculationSettings,
                      organizationSize: config.devices,
                      timeHorizon: config.years,
                    })
                  }}
                  darkMode={theme === "dark"}
                  onDarkModeChange={(dark) => setTheme(dark ? "dark" : "light")}
                />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Vendors Selected</span>
                  <Badge variant="secondary">{selectedVendors.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Horizon</span>
                  <Badge variant="outline">{calculationSettings.timeHorizon} years</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Organization Size</span>
                  <Badge variant="outline">{calculationSettings.organizationSize.toLocaleString()}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="financial" className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Financial</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Business</span>
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="features" className="flex items-center space-x-2">
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Features</span>
                </TabsTrigger>
                <TabsTrigger value="report" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Report</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <ExecutiveDashboardView
                  results={tcoResults.map((r) => ({
                    vendor: r?.vendor?.id || "",
                    vendorName: r?.vendor?.name || "",
                    total: r?.tco?.totalCost || 0,
                    breakdown: Object.entries(r?.tco?.costCategories || {}).map(([name, value]) => ({ name, value })),
                    roi: {
                      percentage: r?.tco?.roi?.percentage || 0,
                      paybackMonths: r?.tco?.roi?.paybackPeriod || 0,
                      annualSavings: 0,
                    },
                    risk: {
                      breachReduction: r?.tco?.riskMetrics?.breachProbabilityReduction || 0,
                      annualizedRiskCost: 0,
                    },
                    ops: {
                      fteSaved: 0,
                      annualOpsSaving: 0,
                    },
                  }))}
                  config={{
                    devices: calculationSettings.organizationSize,
                    users: calculationSettings.organizationSize,
                    years: calculationSettings.timeHorizon,
                    licenseTier: "Enterprise",
                    integrations: { mdm: true, siem: true, edr: false },
                    professionalServices: "advanced",
                    includeTraining: true,
                  }}
                />
              </TabsContent>

              <TabsContent value="financial" className="space-y-6">
                <FinancialAnalysisView
                  results={tcoResults.map((r) => ({
                    vendor: r?.vendor?.id || "",
                    vendorName: r?.vendor?.name || "",
                    total: r?.tco?.totalCost || 0,
                    breakdown: Object.entries(r?.tco?.costCategories || {}).map(([name, value]) => ({ name, value })),
                    roi: {
                      percentage: r?.tco?.roi?.percentage || 0,
                      paybackMonths: r?.tco?.roi?.paybackPeriod || 0,
                      annualSavings: 0,
                    },
                    risk: {
                      breachReduction: r?.tco?.riskMetrics?.breachProbabilityReduction || 0,
                      annualizedRiskCost: 0,
                    },
                    ops: {
                      fteSaved: 0,
                      annualOpsSaving: 0,
                    },
                  }))}
                  config={{
                    devices: calculationSettings.organizationSize,
                    users: calculationSettings.organizationSize,
                    years: calculationSettings.timeHorizon,
                    licenseTier: "Enterprise",
                    integrations: { mdm: true, siem: true, edr: false },
                    professionalServices: "advanced",
                    includeTraining: true,
                  }}
                />
              </TabsContent>

              <TabsContent value="business" className="space-y-6">
                <BusinessImpactView
                  results={tcoResults.map((r) => ({
                    vendor: r?.vendor?.id || "",
                    vendorName: r?.vendor?.name || "",
                    total: r?.tco?.totalCost || 0,
                    breakdown: Object.entries(r?.tco?.costCategories || {}).map(([name, value]) => ({ name, value })),
                    roi: {
                      percentage: r?.tco?.roi?.percentage || 0,
                      paybackMonths: r?.tco?.roi?.paybackPeriod || 0,
                      annualSavings: 0,
                    },
                    risk: {
                      breachReduction: r?.tco?.riskMetrics?.breachProbabilityReduction || 0,
                      annualizedRiskCost: 0,
                    },
                    ops: {
                      fteSaved: 0,
                      annualOpsSaving: 0,
                    },
                  }))}
                  config={{
                    devices: calculationSettings.organizationSize,
                    users: calculationSettings.organizationSize,
                    years: calculationSettings.timeHorizon,
                    licenseTier: "Enterprise",
                    integrations: { mdm: true, siem: true, edr: false },
                    professionalServices: "advanced",
                    includeTraining: true,
                  }}
                />
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6">
                <ImplementationTimelineView
                  results={tcoResults.map((r) => ({
                    vendor: r?.vendor?.id || "",
                    vendorName: r?.vendor?.name || "",
                    total: r?.tco?.totalCost || 0,
                    breakdown: Object.entries(r?.tco?.costCategories || {}).map(([name, value]) => ({ name, value })),
                    roi: {
                      percentage: r?.tco?.roi?.percentage || 0,
                      paybackMonths: r?.tco?.roi?.paybackPeriod || 0,
                      annualSavings: 0,
                    },
                    risk: {
                      breachReduction: r?.tco?.riskMetrics?.breachProbabilityReduction || 0,
                      annualizedRiskCost: 0,
                    },
                    ops: {
                      fteSaved: 0,
                      annualOpsSaving: 0,
                    },
                  }))}
                  config={{
                    devices: calculationSettings.organizationSize,
                    users: calculationSettings.organizationSize,
                    years: calculationSettings.timeHorizon,
                    licenseTier: "Enterprise",
                    integrations: { mdm: true, siem: true, edr: false },
                    professionalServices: "advanced",
                    includeTraining: true,
                  }}
                />
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <CybersecurityPostureView
                  results={tcoResults.map((r) => ({
                    vendor: r?.vendor?.id || "",
                    vendorName: r?.vendor?.name || "",
                    total: r?.tco?.totalCost || 0,
                    breakdown: Object.entries(r?.tco?.costCategories || {}).map(([name, value]) => ({ name, value })),
                    roi: {
                      percentage: r?.tco?.roi?.percentage || 0,
                      paybackMonths: r?.tco?.roi?.paybackPeriod || 0,
                      annualSavings: 0,
                    },
                    risk: {
                      breachReduction: r?.tco?.riskMetrics?.breachProbabilityReduction || 0,
                      annualizedRiskCost: 0,
                    },
                    ops: {
                      fteSaved: 0,
                      annualOpsSaving: 0,
                    },
                  }))}
                  config={{
                    devices: calculationSettings.organizationSize,
                    users: calculationSettings.organizationSize,
                    years: calculationSettings.timeHorizon,
                    licenseTier: "Enterprise",
                    integrations: { mdm: true, siem: true, edr: false },
                    professionalServices: "advanced",
                    includeTraining: true,
                  }}
                />
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <FeatureMatrixView selectedVendors={selectedVendors} />
              </TabsContent>

              <TabsContent value="report" className="space-y-6">
                <ExecutiveReportView
                  results={tcoResults.map((r) => ({
                    vendor: r?.vendor?.id || "",
                    vendorName: r?.vendor?.name || "",
                    total: r?.tco?.totalCost || 0,
                    breakdown: Object.entries(r?.tco?.costCategories || {}).map(([name, value]) => ({ name, value })),
                    roi: {
                      percentage: r?.tco?.roi?.percentage || 0,
                      paybackMonths: r?.tco?.roi?.paybackPeriod || 0,
                      annualSavings: 0,
                    },
                    risk: {
                      breachReduction: r?.tco?.riskMetrics?.breachProbabilityReduction || 0,
                      annualizedRiskCost: 0,
                    },
                    ops: {
                      fteSaved: 0,
                      annualOpsSaving: 0,
                    },
                  }))}
                  config={{
                    devices: calculationSettings.organizationSize,
                    users: calculationSettings.organizationSize,
                    years: calculationSettings.timeHorizon,
                    licenseTier: "Enterprise",
                    integrations: { mdm: true, siem: true, edr: false },
                    professionalServices: "advanced",
                    includeTraining: true,
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
