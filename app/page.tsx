"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  Shield,
  Building,
  Clock,
  FileText,
  Settings,
  BarChart3,
  Target,
  Zap,
  CheckCircle,
} from "lucide-react"

// Import all view components
import { ExecutiveDashboardView } from "@/components/executive-dashboard-view"
import { SecurityRiskAssessmentView } from "@/components/security-risk-assessment-view"
import { IndustryAnalysisDashboard } from "@/components/industry-analysis-dashboard"
import { ImplementationTimelineView } from "@/components/implementation-timeline-view"
import { ROICalculatorView } from "@/components/roi-calculator-view"
import { ExecutiveReportView } from "@/components/executive-report-view"
import { IntegrationHubView } from "@/components/integration-hub-view"
import { EnhancedFeatureComparisonView } from "@/components/enhanced-feature-comparison-view"
import { ComplianceRiskView } from "@/components/compliance-risk-view"
import { SettingsPanel } from "@/components/settings-panel"

// Import calculation utilities
import { calculateTCO, type CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

export default function ZTCADashboard() {
  // Configuration state
  const [config, setConfig] = useState<CalculationConfiguration>({
    deviceCount: 1000,
    timeframe: 3,
    industry: "healthcare",
    hasExistingNAC: false,
    existingVendor: "",
    annualRevenue: 100000000,
    securityBudget: 2000000,
    complianceRequirements: ["hipaa", "sox"],
    deploymentComplexity: "medium",
    geographicScope: "national",
    integrationRequirements: ["active_directory", "siem", "itsm"],
    businessCriticality: "high",
    selectedVendors: ["portnox", "cisco", "aruba", "fortinet", "microsoft"],
  })

  // Active view state
  const [activeView, setActiveView] = useState("executive")
  const [showSettings, setShowSettings] = useState(false)

  // Calculate results for all vendors
  const results = useMemo(() => {
    return calculateTCO(config)
  }, [config])

  // Main navigation items
  const navigationItems = [
    {
      id: "executive",
      label: "Executive Dashboard",
      icon: BarChart3,
      description: "High-level overview and key metrics",
    },
    {
      id: "industry-analysis",
      label: "Industry Analysis",
      icon: Building,
      description: "Industry-specific insights and benchmarks",
    },
    {
      id: "vendor-comparison",
      label: "Vendor Comparison",
      icon: Target,
      description: "Detailed vendor feature and cost comparison",
    },
    {
      id: "security-assessment",
      label: "Security Assessment",
      icon: Shield,
      description: "Risk analysis and security posture evaluation",
    },
    {
      id: "roi-calculator",
      label: "ROI Calculator",
      icon: Calculator,
      description: "Return on investment analysis",
    },
    {
      id: "implementation",
      label: "Implementation",
      icon: Clock,
      description: "Timeline and migration planning",
    },
    {
      id: "compliance",
      label: "Compliance",
      icon: CheckCircle,
      description: "Regulatory compliance analysis",
    },
    {
      id: "integration",
      label: "Integration Hub",
      icon: Zap,
      description: "Third-party integrations and APIs",
    },
    {
      id: "reports",
      label: "Executive Reports",
      icon: FileText,
      description: "Generate comprehensive reports",
    },
  ]

  const renderActiveView = () => {
    switch (activeView) {
      case "executive":
        return <ExecutiveDashboardView results={results} config={config} />
      case "industry-analysis":
        return (
          <IndustryAnalysisDashboard
            selectedIndustry={config.industry.toUpperCase()}
            deviceCount={config.deviceCount}
            timeframe={config.timeframe}
          />
        )
      case "vendor-comparison":
        return <EnhancedFeatureComparisonView results={results} config={config} />
      case "security-assessment":
        return <SecurityRiskAssessmentView results={results} config={config} />
      case "roi-calculator":
        return <ROICalculatorView selectedVendors={config.selectedVendors || []} />
      case "implementation":
        return (
          <ImplementationTimelineView
            selectedVendors={config.selectedVendors || []}
            config={config}
            results={results}
          />
        )
      case "compliance":
        return <ComplianceRiskView results={results} config={config} />
      case "integration":
        return <IntegrationHubView selectedVendors={config.selectedVendors || []} config={config} />
      case "reports":
        return <ExecutiveReportView results={results} config={config} />
      default:
        return <ExecutiveDashboardView results={results} config={config} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Zero Trust NAC Analyzer</h1>
                  <p className="text-sm text-gray-500">Comprehensive Network Access Control Analysis Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                {config.deviceCount.toLocaleString()} Devices
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {config.industry.charAt(0).toUpperCase() + config.industry.slice(1)}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-80 space-y-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Analysis Modules</CardTitle>
                <CardDescription>Select an analysis view</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant={activeView === item.id ? "default" : "ghost"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setActiveView(item.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                        <div className="text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Best ROI</span>
                  <span className="font-semibold text-green-600">
                    {results.length > 0
                      ? `${Math.max(...results.map((r) => r.roi?.percentage || 0)).toFixed(0)}%`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lowest TCO</span>
                  <span className="font-semibold">
                    {results.length > 0 ? `$${Math.min(...results.map((r) => r.totalCost)).toLocaleString()}` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risk Reduction</span>
                  <span className="font-semibold text-blue-600">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Compliance Score</span>
                  <span className="font-semibold text-purple-600">98%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {showSettings && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Configuration Settings</CardTitle>
                  <CardDescription>Adjust parameters to customize your analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingsPanel config={config} onConfigChange={setConfig} />
                </CardContent>
              </Card>
            )}

            {renderActiveView()}
          </div>
        </div>
      </div>
    </div>
  )
}
