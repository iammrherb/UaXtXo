"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  BarChart3,
  Shield,
  Users,
  FileText,
  Calculator,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Target,
  Award,
} from "lucide-react"

// Import all view components
import SettingsPanel from "@/components/settings-panel"
import EnhancedVendorSelection from "@/components/enhanced-vendor-selection"
import ExecutiveDashboardView from "@/components/views/executive-dashboard-view"
import PortnoxAdvantageDashboard from "@/components/views/portnox-advantage-dashboard"
import DetailedCostsView from "@/components/views/detailed-costs-view"
import SecurityPostureView from "@/components/views/security-posture-view"
import ImplementationRoadmapView from "@/components/views/implementation-roadmap-view"
import ReportsView from "@/components/views/reports-view"
import ROIView from "@/components/views/roi-view"
import BusinessImpactView from "@/components/views/business-impact-view"
import ComplianceRiskView from "@/components/views/compliance-risk-view"
import CybersecurityPostureView from "@/components/views/cybersecurity-posture-view"
import OperationalAnalysisView from "@/components/views/operational-analysis-view"

// Import calculation engine
import { compareVendors } from "@/lib/enhanced-tco-calculator"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

// Import animated logo
import AnimatedPortnoxLogo from "@/components/animated-portnox-logo"

export default function TcoAnalyzerUltimate() {
  // Configuration state
  const [config, setConfig] = useState<CalculationConfiguration>({
    devices: 1000,
    users: 800,
    years: 3,
    industry: "Technology",
    organizationSize: "Mid-Market",
    region: "North America",
    portnoxBasePrice: 36,
    portnoxAddons: {
      atp: false,
      compliance: false,
      iot: false,
      analytics: false,
    },
  })

  // Vendor selection state
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba"])
  const [activeTab, setActiveTab] = useState("executive")

  // Calculate results
  const results = useMemo(() => {
    try {
      return compareVendors(selectedVendors, config)
    } catch (error) {
      console.error("Calculation error:", error)
      return []
    }
  }, [selectedVendors, config])

  // Calculate key metrics
  const keyMetrics = useMemo(() => {
    if (results.length === 0) return null

    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitorResults = results.filter((r) => r.vendorId !== "portnox")

    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0

    return {
      totalSavings,
      percentSavings,
      roi: portnoxResult.roi.percentage,
      paybackMonths: portnoxResult.roi.paybackMonths,
      riskReduction: portnoxResult.risk.breachReduction * 100,
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

  const tabConfig = [
    {
      id: "executive",
      label: "Executive Dashboard",
      icon: Users,
      description: "C-Suite focused metrics and strategic insights",
      component: <ExecutiveDashboardView results={results} config={config} />,
    },
    {
      id: "advantage",
      label: "Portnox Advantage",
      icon: Award,
      description: "Competitive advantages and differentiators",
      component: <PortnoxAdvantageDashboard results={results} config={config} />,
    },
    {
      id: "costs",
      label: "Detailed Costs",
      icon: Calculator,
      description: "Comprehensive cost breakdown and analysis",
      component: <DetailedCostsView results={results} config={config} />,
    },
    {
      id: "security",
      label: "Security Posture",
      icon: Shield,
      description: "Security capabilities and risk assessment",
      component: <SecurityPostureView results={results} config={config} />,
    },
    {
      id: "implementation",
      label: "Implementation",
      icon: Target,
      description: "Deployment timeline and complexity analysis",
      component: <ImplementationRoadmapView results={results} config={config} />,
    },
    {
      id: "reports",
      label: "Reports & Analysis",
      icon: FileText,
      description: "Executive reports and Portnox advantages",
      component: <ReportsView results={results} configuration={config} />,
    },
    {
      id: "roi",
      label: "ROI Analysis",
      icon: TrendingUp,
      description: "Return on investment and financial impact",
      component: <ROIView results={results} config={config} />,
    },
    {
      id: "business",
      label: "Business Impact",
      icon: BarChart3,
      description: "Operational and strategic business impact",
      component: <BusinessImpactView results={results} config={config} />,
    },
    {
      id: "compliance",
      label: "Compliance & Risk",
      icon: AlertTriangle,
      description: "Regulatory compliance and risk management",
      component: <ComplianceRiskView results={results} config={config} />,
    },
    {
      id: "cybersecurity",
      label: "Cybersecurity",
      icon: Shield,
      description: "Advanced security analysis and threat protection",
      component: <CybersecurityPostureView results={results} config={config} />,
    },
    {
      id: "operations",
      label: "Operations",
      icon: Settings,
      description: "Operational efficiency and automation analysis",
      component: <OperationalAnalysisView results={results} config={config} />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <AnimatedPortnoxLogo />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ultimate Portnox TCO Analyzer
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Enterprise Edition - Complete NAC Investment Analysis
              </p>
            </div>
          </div>

          {keyMetrics && (
            <Alert className="max-w-4xl mx-auto border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Portnox Advantage:</strong> Save {formatCurrency(keyMetrics.totalSavings)} (
                {keyMetrics.percentSavings.toFixed(0)}% cost reduction) with {keyMetrics.roi.toFixed(0)}% ROI and{" "}
                {keyMetrics.paybackMonths.toFixed(1)}-month payback period. Reduce security risk by{" "}
                {keyMetrics.riskReduction.toFixed(0)}% with zero CVEs.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Configuration Panel */}
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuration
                </CardTitle>
                <CardDescription>Customize your analysis parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <SettingsPanel config={config} onConfigChange={setConfig} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendor Selection</CardTitle>
                <CardDescription>Choose up to 3 vendors to compare</CardDescription>
              </CardHeader>
              <CardContent>
                <EnhancedVendorSelection
                  selectedVendors={selectedVendors}
                  onSelectionChange={setSelectedVendors}
                  maxSelection={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Analysis Area */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>NAC Investment Analysis</CardTitle>
                    <CardDescription>
                      Comprehensive analysis for {config.devices.toLocaleString()} devices over {config.years} years
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{config.industry}</Badge>
                    <Badge variant="outline">{config.organizationSize}</Badge>
                    <Badge variant="outline">{selectedVendors.length} vendors</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11 gap-1">
                    {tabConfig.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex items-center gap-1 text-xs px-2 py-1"
                        title={tab.description}
                      >
                        <tab.icon className="h-3 w-3" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {tabConfig.map((tab) => (
                    <TabsContent key={tab.id} value={tab.id} className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <tab.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="text-lg font-semibold">{tab.label}</h3>
                          <p className="text-sm text-muted-foreground">{tab.description}</p>
                        </div>
                      </div>
                      <Separator />
                      {tab.component}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Powered by Portnox CLEAR • Enterprise NAC Analysis • Data updated {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
