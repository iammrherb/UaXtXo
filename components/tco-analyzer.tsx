"use client"

import { useState, useCallback, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart3,
  Calculator,
  Shield,
  TrendingUp,
  Users,
  Building2,
  FileText,
  Target,
  Crown,
  Zap,
  CheckCircle2,
} from "lucide-react"

import { EnhancedVendorSelection } from "./enhanced-vendor-selection"
import { SettingsPanel } from "./settings-panel"
import ExecutiveDashboardView from "./views/executive-dashboard-view"
import CSuiteDashboard from "./views/c-suite-dashboard"
import PortnoxAdvantageDashboard from "./views/portnox-advantage-dashboard"
import DetailedCostsView from "./views/detailed-costs-view"
import SecurityPostureView from "./views/security-posture-view"
import ImplementationRoadmapView from "./views/implementation-roadmap-view"
import BusinessImpactView from "./views/business-impact-view"
import ComplianceRiskView from "./views/compliance-risk-view"
import OperationsImpactView from "./views/operations-impact-view"
import FeatureMatrixView from "./views/feature-matrix-view"
import ROIView from "./views/roi-view"
import ReportsView from "./views/reports-view"

import { compareVendors, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

export default function TCOAnalyzer() {
  // Configuration state
  const [config, setConfig] = useState<CalculationConfiguration>({
    devices: 1000,
    users: 1200,
    years: 3,
    industry: "technology",
    orgSize: "medium",
    region: "north-america",
    portnoxBasePrice: 60,
    portnoxAddons: {
      atp: false,
      compliance: false,
      iot: false,
      analytics: false,
    },
  })

  // Selected vendors state
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba"])

  // Active tab state
  const [activeTab, setActiveTab] = useState("executive")

  // Calculate results
  const results = useMemo(() => {
    try {
      return compareVendors(selectedVendors, config)
    } catch (error) {
      console.error("Error calculating vendor comparison:", error)
      return []
    }
  }, [selectedVendors, config])

  // Update configuration
  const updateConfig = useCallback((updates: Partial<CalculationConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }, [])

  // Handle vendor selection
  const handleVendorChange = useCallback((vendors: string[]) => {
    // Ensure Portnox is always included
    const vendorsWithPortnox = vendors.includes("portnox") ? vendors : ["portnox", ...vendors]
    setSelectedVendors(vendorsWithPortnox.slice(0, 3)) // Limit to 3 vendors
  }, [])

  // Get summary metrics
  const summaryMetrics = useMemo(() => {
    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitorResults = results.filter((r) => r.vendorId !== "portnox")

    if (!portnoxResult || competitorResults.length === 0) {
      return null
    }

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0

    return {
      totalSavings,
      percentSavings,
      portnoxCost: portnoxResult.totalCost,
      avgCompetitorCost,
      roi: portnoxResult.totalCost > 0 ? (totalSavings / portnoxResult.totalCost) * 100 : 0,
    }
  }, [results])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ultimate Portnox TCO Analyzer
              </h1>
              <p className="text-xl text-muted-foreground">Enterprise Edition</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive Network Access Control vendor analysis with real-time cost calculations, security assessments,
            and ROI projections across 14 major vendors.
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EnhancedVendorSelection
              selectedVendors={selectedVendors}
              onVendorChange={handleVendorChange}
              maxSelections={3}
            />
          </div>
          <div>
            <SettingsPanel config={config} onConfigChange={updateConfig} />
          </div>
        </div>

        {/* Summary Metrics */}
        {summaryMetrics && (
          <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div>
                  <strong>Total Savings:</strong> {formatCurrency(summaryMetrics.totalSavings)} (
                  {summaryMetrics.percentSavings.toFixed(0)}%)
                </div>
                <div>
                  <strong>ROI:</strong> {summaryMetrics.roi.toFixed(0)}%
                </div>
                <div>
                  <strong>Portnox TCO:</strong> {formatCurrency(summaryMetrics.portnoxCost)}
                </div>
                <div>
                  <strong>Competitor Avg:</strong> {formatCurrency(summaryMetrics.avgCompetitorCost)}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 h-auto p-1">
            <TabsTrigger value="executive" className="flex flex-col items-center gap-1 p-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Executive</span>
            </TabsTrigger>
            <TabsTrigger value="c-suite" className="flex flex-col items-center gap-1 p-3">
              <Crown className="h-4 w-4" />
              <span className="text-xs">C-Suite</span>
            </TabsTrigger>
            <TabsTrigger value="portnox-advantage" className="flex flex-col items-center gap-1 p-3">
              <Zap className="h-4 w-4" />
              <span className="text-xs">Advantage</span>
            </TabsTrigger>
            <TabsTrigger value="detailed-costs" className="flex flex-col items-center gap-1 p-3">
              <Calculator className="h-4 w-4" />
              <span className="text-xs">Costs</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col items-center gap-1 p-3">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Security</span>
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex flex-col items-center gap-1 p-3">
              <Target className="h-4 w-4" />
              <span className="text-xs">Deploy</span>
            </TabsTrigger>
            <TabsTrigger value="business-impact" className="flex flex-col items-center gap-1 p-3">
              <Building2 className="h-4 w-4" />
              <span className="text-xs">Business</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex flex-col items-center gap-1 p-3">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex flex-col items-center gap-1 p-3">
              <Users className="h-4 w-4" />
              <span className="text-xs">Operations</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="flex flex-col items-center gap-1 p-3">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs">Features</span>
            </TabsTrigger>
            <TabsTrigger value="roi" className="flex flex-col items-center gap-1 p-3">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">ROI</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex flex-col items-center gap-1 p-3">
              <FileText className="h-4 w-4" />
              <span className="text-xs">Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="executive" className="space-y-6">
            <ExecutiveDashboardView results={results} config={config} />
          </TabsContent>

          <TabsContent value="c-suite" className="space-y-6">
            <CSuiteDashboard results={results} config={config} />
          </TabsContent>

          <TabsContent value="portnox-advantage" className="space-y-6">
            <PortnoxAdvantageDashboard results={results} config={config} />
          </TabsContent>

          <TabsContent value="detailed-costs" className="space-y-6">
            <DetailedCostsView results={results} config={config} />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityPostureView results={results} config={config} />
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <ImplementationRoadmapView results={results} config={config} />
          </TabsContent>

          <TabsContent value="business-impact" className="space-y-6">
            <BusinessImpactView results={results} config={config} />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <ComplianceRiskView results={results} config={config} />
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <OperationsImpactView results={results} config={config} />
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <FeatureMatrixView results={results} config={config} />
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <ROIView results={results} config={config} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsView results={results} config={config} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
