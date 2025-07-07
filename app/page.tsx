"use client"

import { useState, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calculator,
  TrendingUp,
  Shield,
  Building,
  Users,
  FileText,
  BarChart3,
  Settings,
  Download,
  Eye,
  Zap,
  Target,
  Clock,
  DollarSign,
  Activity,
} from "lucide-react"

// Import all view components
import FinancialAnalysisView from "@/components/financial-analysis-view"
import OperationalAnalysisView from "@/components/operational-analysis-view"
import CybersecurityPostureView from "@/components/cybersecurity-posture-view"
import BusinessImpactView from "@/components/business-impact-view"
import FeatureMatrixView from "@/components/feature-matrix-view"
import EnhancedVendorSelection from "@/components/enhanced-vendor-selection"
import MigrationPlanningView from "@/components/migration-planning-view"
import VendorComparisonMatrix from "@/components/vendor-comparison-matrix"
import ExecutiveReportGenerator from "@/components/executive-report-generator"
import IndustryAnalysisDashboard from "@/components/industry-analysis-dashboard"
import ComplianceRiskView from "@/components/compliance-risk-view"
import SettingsPanel from "@/components/settings-panel"
import SecurityRiskAssessmentView from "@/components/security-risk-assessment-view"
import EnhancedFeatureComparisonView from "@/components/enhanced-feature-comparison-view"
import ImplementationTimelineView from "@/components/implementation-timeline-view"
import ROICalculatorView from "@/components/roi-calculator-view"
import ExecutiveDashboardView from "@/components/executive-dashboard-view"
import IntegrationHubView from "@/components/integration-hub-view"
import PaybackSensitivityAnalysis from "@/components/payback-sensitivity-analysis"
import IndustryPaybackAnalysis from "@/components/industry-payback-analysis"
import IndustryAnalysisView from "@/components/industry-analysis-view"
import ExecutiveReportView from "@/components/executive-report-view"
import TCOAnalyzer from "@/components/tco-analyzer"
import InteractiveDashboard from "@/components/interactive-dashboard"

import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [config, setConfig] = useState<CalculationConfiguration>({
    deviceCount: 1000,
    industry: "technology",
    companySize: "medium",
    securityRequirements: "high",
    complianceFrameworks: ["SOX", "GDPR"],
    currentSolution: "none",
    timeframe: 3,
    region: "north-america",
    deploymentModel: "cloud",
    integrationComplexity: "medium",
    supportLevel: "premium",
    customizations: [],
  })

  // Memoized config change handler to prevent infinite loops
  const handleConfigChange = useCallback((newConfig: CalculationConfiguration) => {
    setConfig(newConfig)
  }, [])

  const tabConfig = [
    {
      id: "dashboard",
      label: "Interactive Dashboard",
      icon: Activity,
      description: "Real-time analysis with advanced filtering",
      component: <InteractiveDashboard initialConfig={config} onConfigChange={handleConfigChange} />,
    },
    {
      id: "executive",
      label: "Executive Dashboard",
      icon: TrendingUp,
      description: "High-level overview for decision makers",
      component: <ExecutiveDashboardView />,
    },
    {
      id: "financial",
      label: "Financial Analysis",
      icon: Calculator,
      description: "Comprehensive TCO and ROI analysis",
      component: <FinancialAnalysisView />,
    },
    {
      id: "operational",
      label: "Operational Analysis",
      icon: Settings,
      description: "Operational efficiency and resource planning",
      component: <OperationalAnalysisView />,
    },
    {
      id: "security",
      label: "Security Posture",
      icon: Shield,
      description: "Cybersecurity assessment and risk analysis",
      component: <CybersecurityPostureView />,
    },
    {
      id: "business",
      label: "Business Impact",
      icon: Building,
      description: "Strategic business value assessment",
      component: <BusinessImpactView />,
    },
    {
      id: "features",
      label: "Feature Matrix",
      icon: BarChart3,
      description: "Detailed feature comparison across vendors",
      component: <FeatureMatrixView />,
    },
    {
      id: "vendors",
      label: "Vendor Selection",
      icon: Users,
      description: "Enhanced vendor comparison and selection",
      component: <EnhancedVendorSelection />,
    },
    {
      id: "migration",
      label: "Migration Planning",
      icon: Target,
      description: "Implementation roadmap and migration strategy",
      component: <MigrationPlanningView />,
    },
    {
      id: "comparison",
      label: "Vendor Comparison",
      icon: Eye,
      description: "Side-by-side vendor analysis matrix",
      component: <VendorComparisonMatrix />,
    },
    {
      id: "reports",
      label: "Executive Reports",
      icon: FileText,
      description: "Generate comprehensive analysis reports",
      component: <ExecutiveReportGenerator />,
    },
    {
      id: "industry",
      label: "Industry Analysis",
      icon: Building,
      description: "Industry-specific insights and benchmarks",
      component: <IndustryAnalysisDashboard />,
    },
    {
      id: "compliance",
      label: "Compliance Risk",
      icon: Shield,
      description: "Regulatory compliance assessment",
      component: <ComplianceRiskView />,
    },
    {
      id: "risk-assessment",
      label: "Security Risk",
      icon: Shield,
      description: "Comprehensive security risk evaluation",
      component: <SecurityRiskAssessmentView />,
    },
    {
      id: "feature-comparison",
      label: "Enhanced Features",
      icon: BarChart3,
      description: "Advanced feature comparison tools",
      component: <EnhancedFeatureComparisonView />,
    },
    {
      id: "timeline",
      label: "Implementation",
      icon: Clock,
      description: "Project timeline and milestone tracking",
      component: <ImplementationTimelineView />,
    },
    {
      id: "roi",
      label: "ROI Calculator",
      icon: DollarSign,
      description: "Advanced ROI modeling and projections",
      component: <ROICalculatorView />,
    },
    {
      id: "integration",
      label: "Integration Hub",
      icon: Zap,
      description: "Integration capabilities and requirements",
      component: <IntegrationHubView />,
    },
    {
      id: "payback",
      label: "Payback Analysis",
      icon: TrendingUp,
      description: "Sensitivity analysis for payback periods",
      component: <PaybackSensitivityAnalysis />,
    },
    {
      id: "industry-payback",
      label: "Industry Payback",
      icon: Building,
      description: "Industry-specific payback analysis",
      component: <IndustryPaybackAnalysis />,
    },
    {
      id: "industry-view",
      label: "Industry Insights",
      icon: Building,
      description: "Comprehensive industry analysis view",
      component: <IndustryAnalysisView />,
    },
    {
      id: "executive-report",
      label: "Executive Report",
      icon: FileText,
      description: "Executive summary and recommendations",
      component: <ExecutiveReportView />,
    },
    {
      id: "tco-analyzer",
      label: "TCO Analyzer",
      icon: Calculator,
      description: "Advanced TCO calculation and analysis",
      component: <TCOAnalyzer />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      description: "Configuration and preferences",
      component: <SettingsPanel />,
    },
  ]

  const currentTab = tabConfig.find((tab) => tab.id === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Zero Trust & NAC Analysis Platform
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Comprehensive vendor analysis and TCO calculator for Network Access Control solutions
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="px-3 py-1">
                v2.0
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
        </div>

        {/* Current Tab Info */}
        {currentTab && (
          <Alert className="mb-6">
            <currentTab.icon className="h-4 w-4" />
            <AlertDescription>
              <strong>{currentTab.label}:</strong> {currentTab.description}
            </AlertDescription>
          </Alert>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid grid-cols-6 lg:grid-cols-12 w-full min-w-max">
              {tabConfig.slice(0, 12).map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-1 text-xs">
                  <tab.icon className="h-3 w-3" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Secondary Tabs for Additional Views */}
          {tabConfig.length > 12 && (
            <div className="overflow-x-auto">
              <TabsList className="grid grid-cols-6 lg:grid-cols-12 w-full min-w-max">
                {tabConfig.slice(12).map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-1 text-xs">
                    <tab.icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          )}

          {/* Tab Content */}
          {tabConfig.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </CardTitle>
                  <CardDescription>{tab.description}</CardDescription>
                </CardHeader>
                <CardContent>{tab.component}</CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
