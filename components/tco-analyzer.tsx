"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Shield,
  Users,
  Building2,
  FileText,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Settings,
  CheckCircle2,
  Zap,
} from "lucide-react"

import { calculateTCO } from "@/lib/enhanced-tco-calculator"
import { getVendorData } from "@/lib/comprehensive-vendor-data"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

import SettingsPanel from "@/components/settings-panel"
import EnhancedVendorSelection from "@/components/enhanced-vendor-selection"
import ExecutiveDashboardView from "@/components/views/executive-dashboard-view"
import CSuiteDashboard from "@/components/views/c-suite-dashboard"
import PortnoxAdvantageDashboard from "@/components/views/portnox-advantage-dashboard"
import DetailedCostsView from "@/components/views/detailed-costs-view"
import SecurityPostureView from "@/components/views/security-posture-view"
import ImplementationRoadmapView from "@/components/views/implementation-roadmap-view"
import ComplianceRiskView from "@/components/views/compliance-risk-view"
import BusinessImpactView from "@/components/views/business-impact-view"
import OperationsImpactView from "@/components/views/operations-impact-view"
import ROIView from "@/components/views/roi-view"
import ReportsView from "@/components/views/reports-view"

export default function TCOAnalyzer() {
  const [config, setConfig] = useState<CalculationConfiguration>({
    devices: 1000,
    users: 1200,
    years: 3,
    industry: "technology",
    organizationSize: "medium",
    region: "north-america",
    portnoxPricing: {
      tier: "professional",
      customPricing: false,
      annualDiscount: 0.1,
      multiYearDiscount: 0.15,
    },
    portnoxAddOns: {
      advancedAnalytics: false,
      premiumSupport: false,
      professionalServices: false,
      customIntegration: false,
    },
  })

  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba"])
  const [activeTab, setActiveTab] = useState("executive")

  const results = useMemo(() => {
    return selectedVendors.map((vendorId) => {
      const vendorData = getVendorData(vendorId)
      if (!vendorData) {
        throw new Error(`Vendor data not found for ${vendorId}`)
      }
      return calculateTCO(vendorData, config)
    })
  }, [selectedVendors, config])

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  const executiveSummary = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = (totalSavings / avgCompetitorCost) * 100

    return {
      totalSavings,
      percentSavings,
      roi: (totalSavings / portnoxResult.totalCost) * 100,
      paybackMonths: (portnoxResult.totalCost / (totalSavings / config.years)) * 12,
      portnoxCost: portnoxResult.totalCost,
      avgCompetitorCost,
    }
  }, [portnoxResult, competitorResults, config.years])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ultimate Portnox TCO Analyzer
              </h1>
              <p className="text-lg text-muted-foreground">Enterprise Edition</p>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive Network Access Control vendor comparison and ROI analysis platform. Compare Portnox CLEAR
            against 13 major NAC vendors with detailed cost, security, and implementation analysis.
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SettingsPanel config={config} onConfigChange={setConfig} />
          </div>
          <div className="lg:col-span-2">
            <EnhancedVendorSelection
              selectedVendors={selectedVendors}
              onVendorChange={setSelectedVendors}
              maxSelections={4}
            />
          </div>
        </div>

        {/* Executive Summary Cards */}
        {executiveSummary && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Savings</p>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {formatCurrency(executiveSummary.totalSavings)}
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      {executiveSummary.percentSavings.toFixed(0)}% cost reduction
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">ROI</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {executiveSummary.roi.toFixed(0)}%
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      {executiveSummary.paybackMonths.toFixed(1)} month payback
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Portnox Cost</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {formatCurrency(executiveSummary.portnoxCost)}
                    </p>
                    <p className="text-xs text-purple-700 dark:text-purple-300">All-inclusive pricing</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Time to Value</p>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">30 min</p>
                    <p className="text-xs text-orange-700 dark:text-orange-300">vs 3-9 months competitors</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
            <TabsTrigger value="executive" className="flex items-center gap-1 text-xs">
              <Target className="h-3 w-3" />
              <span className="hidden sm:inline">Executive</span>
            </TabsTrigger>
            <TabsTrigger value="c-suite" className="flex items-center gap-1 text-xs">
              <Building2 className="h-3 w-3" />
              <span className="hidden sm:inline">C-Suite</span>
            </TabsTrigger>
            <TabsTrigger value="advantage" className="flex items-center gap-1 text-xs">
              <Zap className="h-3 w-3" />
              <span className="hidden sm:inline">Advantage</span>
            </TabsTrigger>
            <TabsTrigger value="costs" className="flex items-center gap-1 text-xs">
              <DollarSign className="h-3 w-3" />
              <span className="hidden sm:inline">Costs</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1 text-xs">
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-1 text-xs">
              <Settings className="h-3 w-3" />
              <span className="hidden sm:inline">Deploy</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-1 text-xs">
              <CheckCircle2 className="h-3 w-3" />
              <span className="hidden sm:inline">Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3" />
              <span className="hidden sm:inline">Business</span>
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center gap-1 text-xs">
              <Users className="h-3 w-3" />
              <span className="hidden sm:inline">Operations</span>
            </TabsTrigger>
            <TabsTrigger value="roi" className="flex items-center gap-1 text-xs">
              <BarChart3 className="h-3 w-3" />
              <span className="hidden sm:inline">ROI</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-1 text-xs">
              <FileText className="h-3 w-3" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="executive" className="space-y-6">
            <ExecutiveDashboardView results={results} config={config} />
          </TabsContent>

          <TabsContent value="c-suite" className="space-y-6">
            <CSuiteDashboard results={results} config={config} />
          </TabsContent>

          <TabsContent value="advantage" className="space-y-6">
            <PortnoxAdvantageDashboard results={results} config={config} />
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <DetailedCostsView results={results} config={config} />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityPostureView results={results} config={config} />
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <ImplementationRoadmapView results={results} config={config} />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <ComplianceRiskView results={results} config={config} />
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <BusinessImpactView results={results} config={config} />
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <OperationsImpactView results={results} config={config} />
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <ROIView results={results} config={config} />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsView results={results} config={config} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-sm text-muted-foreground">
            © 2024 Portnox TCO Analyzer. Enterprise-grade NAC comparison platform.
          </p>
        </div>
      </div>
    </div>
  )
}
