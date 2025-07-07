"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Settings,
  TrendingUp,
  Shield,
  FileText,
  Users,
  Building,
  Zap,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Clock,
  Target,
  Activity,
} from "lucide-react"

// Import all view components as default exports
import SettingsPanel from "@/components/settings-panel"
import ExecutiveDashboardView from "@/components/executive-dashboard-view"
import EnhancedFeatureComparisonView from "@/components/enhanced-feature-comparison-view"
import ComplianceRiskView from "@/components/compliance-risk-view"
import FinancialAnalysisView from "@/components/financial-analysis-view"
import BusinessImpactView from "@/components/business-impact-view"
import CybersecurityPostureView from "@/components/cybersecurity-posture-view"
import ImplementationTimelineView from "@/components/implementation-timeline-view"
import IntegrationHubView from "@/components/integration-hub-view"
import ROICalculatorView from "@/components/roi-calculator-view"
import SecurityRiskAssessmentView from "@/components/security-risk-assessment-view"
import IndustryAnalysisView from "@/components/industry-analysis-view"
import MigrationPlanningView from "@/components/migration-planning-view"
import ExecutiveReportView from "@/components/executive-report-view"
import InteractiveDashboard from "@/components/interactive-dashboard"

// Import calculation functions
import {
  calculateTCO,
  getAllVendors,
  getAllIndustries,
  type CalculationConfiguration,
  ENHANCED_VENDOR_DATABASE,
  INDUSTRY_DATABASE,
  COMPLIANCE_FRAMEWORK_MAPPINGS,
} from "@/lib/enhanced-tco-calculator"

export default function ZTCAIntegratedDashboard() {
  const [activeTab, setActiveTab] = useState("interactive-dashboard")
  const [showSettings, setShowSettings] = useState(false)

  // Configuration state
  const [config, setConfig] = useState<CalculationConfiguration>({
    deviceCount: 1000,
    userCount: 800,
    timeframe: 3,
    industry: "healthcare",
    deploymentModel: "cloud",
    hasExistingNAC: false,
    currentVendor: undefined,
    includeCompliance: true,
    includeRiskReduction: true,
    includeHiddenCosts: true,
  })

  // Calculate TCO data
  const tcoData = useMemo(() => {
    return calculateTCO(config)
  }, [config])

  // Get industry and vendor data
  const industryData = INDUSTRY_DATABASE[config.industry]
  const allVendors = getAllVendors()
  const allIndustries = getAllIndustries()

  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    const portnoxData = tcoData["portnox"]
    const competitorData = Object.entries(tcoData)
      .filter(([id]) => id !== "portnox")
      .map(([, data]) => data)

    const avgCompetitorCost = competitorData.reduce((sum, data) => sum + data.year3, 0) / competitorData.length
    const savings = avgCompetitorCost - portnoxData.year3
    const savingsPercent = (savings / avgCompetitorCost) * 100

    return {
      totalSavings: savings,
      savingsPercent,
      paybackPeriod: portnoxData.roi.paybackPeriod,
      riskReduction: portnoxData.roi.breachRiskReduction,
      complianceScore: 95,
      timeToValue: 7,
    }
  }, [tcoData])

  const handleConfigChange = (newConfig: Partial<CalculationConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Zero Trust Cybersecurity Analyzer</h1>
            <p className="text-lg text-gray-600 mt-2">Comprehensive NAC vendor analysis and TCO calculator</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Savings</p>
                  <p className="text-xl font-bold text-green-600">${Math.round(summaryMetrics.totalSavings / 1000)}K</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Cost Reduction</p>
                  <p className="text-xl font-bold text-blue-600">{Math.round(summaryMetrics.savingsPercent)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Payback Period</p>
                  <p className="text-xl font-bold text-purple-600">{summaryMetrics.paybackPeriod} mo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Risk Reduction</p>
                  <p className="text-xl font-bold text-red-600">{summaryMetrics.riskReduction}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Compliance Score</p>
                  <p className="text-xl font-bold text-green-600">{summaryMetrics.complianceScore}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Time to Value</p>
                  <p className="text-xl font-bold text-orange-600">{summaryMetrics.timeToValue} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Configuration</CardTitle>
              <CardDescription>Adjust parameters to customize your analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsPanel
                config={config}
                onConfigChange={handleConfigChange}
                industries={allIndustries}
                vendors={allVendors}
              />
            </CardContent>
          </Card>
        )}

        {/* Main Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:grid-cols-14">
            <TabsTrigger value="interactive-dashboard" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Interactive
            </TabsTrigger>
            <TabsTrigger value="executive-dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Executive
            </TabsTrigger>
            <TabsTrigger value="feature-comparison" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="compliance-risk" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="financial-analysis" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Financial
            </TabsTrigger>
            <TabsTrigger value="business-impact" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Business
            </TabsTrigger>
            <TabsTrigger value="security-posture" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="integration-hub" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Integration
            </TabsTrigger>
            <TabsTrigger value="roi-calculator" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              ROI
            </TabsTrigger>
            <TabsTrigger value="risk-assessment" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Risk
            </TabsTrigger>
            <TabsTrigger value="industry-analysis" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Industry
            </TabsTrigger>
            <TabsTrigger value="migration-planning" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Migration
            </TabsTrigger>
            <TabsTrigger value="executive-report" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="interactive-dashboard">
            <InteractiveDashboard initialConfig={config} onConfigChange={handleConfigChange} />
          </TabsContent>

          <TabsContent value="executive-dashboard">
            <ExecutiveDashboardView
              tcoData={tcoData}
              config={config}
              industryData={industryData}
              summaryMetrics={summaryMetrics}
            />
          </TabsContent>

          <TabsContent value="feature-comparison">
            <EnhancedFeatureComparisonView vendors={allVendors} config={config} />
          </TabsContent>

          <TabsContent value="compliance-risk">
            <ComplianceRiskView
              config={config}
              industryData={industryData}
              complianceMappings={COMPLIANCE_FRAMEWORK_MAPPINGS}
              tcoData={tcoData}
            />
          </TabsContent>

          <TabsContent value="financial-analysis">
            <FinancialAnalysisView tcoData={tcoData} config={config} industryData={industryData} />
          </TabsContent>

          <TabsContent value="business-impact">
            <BusinessImpactView tcoData={tcoData} config={config} industryData={industryData} />
          </TabsContent>

          <TabsContent value="security-posture">
            <CybersecurityPostureView vendors={allVendors} config={config} industryData={industryData} />
          </TabsContent>

          <TabsContent value="implementation">
            <ImplementationTimelineView vendors={allVendors} config={config} />
          </TabsContent>

          <TabsContent value="integration-hub">
            <IntegrationHubView vendors={allVendors} config={config} />
          </TabsContent>

          <TabsContent value="roi-calculator">
            <ROICalculatorView tcoData={tcoData} config={config} onConfigChange={handleConfigChange} />
          </TabsContent>

          <TabsContent value="risk-assessment">
            <SecurityRiskAssessmentView vendors={allVendors} config={config} industryData={industryData} />
          </TabsContent>

          <TabsContent value="industry-analysis">
            <IndustryAnalysisView config={config} industryData={industryData} tcoData={tcoData} />
          </TabsContent>

          <TabsContent value="migration-planning">
            <MigrationPlanningView config={config} vendors={allVendors} tcoData={tcoData} />
          </TabsContent>

          <TabsContent value="executive-report">
            <ExecutiveReportView
              tcoData={tcoData}
              config={config}
              industryData={industryData}
              summaryMetrics={summaryMetrics}
            />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-8 border-t">
          <p>Zero Trust Cybersecurity Analyzer - Comprehensive NAC vendor analysis and TCO calculator</p>
          <p className="mt-1">
            Analysis includes {Object.keys(ENHANCED_VENDOR_DATABASE).length} vendors,{" "}
            {Object.keys(INDUSTRY_DATABASE).length} industries, and {Object.keys(COMPLIANCE_FRAMEWORK_MAPPINGS).length}{" "}
            compliance frameworks
          </p>
        </div>
      </div>
    </div>
  )
}
