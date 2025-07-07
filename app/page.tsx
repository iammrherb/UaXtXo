"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import {
  Calculator,
  TrendingUp,
  Shield,
  Users,
  Building,
  FileText,
  BarChart3,
  Settings,
  Download,
  Eye,
  Clock,
  Target,
  Zap,
  Globe,
  CheckCircle,
  Info,
} from "lucide-react"

// Import all view components
import FinancialAnalysisView from "@/components/financial-analysis-view"
import BusinessImpactView from "@/components/business-impact-view"
import OperationalAnalysisView from "@/components/operational-analysis-view"
import MigrationPlanningView from "@/components/migration-planning-view"
import VendorComparisonMatrix from "@/components/vendor-comparison-matrix"
import ComplianceRiskView from "@/components/compliance-risk-view"
import SettingsPanel from "@/components/settings-panel"
import SecurityRiskAssessmentView from "@/components/security-risk-assessment-view"
import EnhancedFeatureComparisonView from "@/components/enhanced-feature-comparison-view"
import IndustryAnalysisView from "@/components/industry-analysis-view"
import ExecutiveReportView from "@/components/executive-report-view"
import InteractiveDashboard from "@/components/interactive-dashboard"

// Configuration interface
interface AppConfig {
  industry: string
  deviceCount: number
  timeframe: number
  deploymentModel: string
  complianceRequirements: string[]
  selectedVendors: string[]
}

// Default configuration
const DEFAULT_CONFIG: AppConfig = {
  industry: "HEALTHCARE",
  deviceCount: 500,
  timeframe: 3,
  deploymentModel: "CLOUD",
  complianceRequirements: ["HIPAA", "SOC2"],
  selectedVendors: ["portnox", "cisco_ise", "aruba_clearpass", "forescout"],
}

export default function Home() {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Initialize the application
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Update timestamp when config changes
  useEffect(() => {
    setLastUpdated(new Date())
  }, [config])

  const handleConfigChange = (newConfig: Partial<AppConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }))
  }

  const handleVendorSelectionChange = (vendors: string[]) => {
    setConfig((prev) => ({ ...prev, selectedVendors: vendors }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <h2 className="text-xl font-semibold">Loading NAC Analysis Platform...</h2>
          <p className="text-muted-foreground">Initializing comprehensive vendor analysis</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">Portnox TCO Calculator</h1>
                  <p className="text-sm text-muted-foreground">Comprehensive NAC Vendor Analysis Platform</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="hidden md:flex">
                {config.selectedVendors.length} vendors selected
              </Badge>
              <Badge variant="outline" className="hidden md:flex">
                {config.deviceCount.toLocaleString()} devices
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Industry</p>
                  <p className="text-lg font-bold">{config.industry}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Devices</p>
                  <p className="text-lg font-bold">{config.deviceCount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Timeframe</p>
                  <p className="text-lg font-bold">{config.timeframe} years</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Deployment</p>
                  <p className="text-lg font-bold">{config.deploymentModel}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Alert */}
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Analysis last updated: {lastUpdated.toLocaleString()} • {config.selectedVendors.length} vendors in
            comparison • {config.complianceRequirements.length} compliance frameworks selected
          </AlertDescription>
        </Alert>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12">
            <TabsTrigger value="dashboard" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-1">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Financial</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Features</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Business</span>
            </TabsTrigger>
            <TabsTrigger value="operational" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Operations</span>
            </TabsTrigger>
            <TabsTrigger value="migration" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Migration</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Compare</span>
            </TabsTrigger>
            <TabsTrigger value="industry" className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Industry</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="dashboard" className="space-y-6">
              <InteractiveDashboard initialConfig={config} onConfigChange={handleConfigChange} />
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <FinancialAnalysisView />
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <EnhancedFeatureComparisonView />
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <SecurityRiskAssessmentView />
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              <BusinessImpactView />
            </TabsContent>

            <TabsContent value="operational" className="space-y-6">
              <OperationalAnalysisView />
            </TabsContent>

            <TabsContent value="migration" className="space-y-6">
              <MigrationPlanningView />
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <VendorComparisonMatrix
                selectedVendors={config.selectedVendors}
                onVendorSelectionChange={handleVendorSelectionChange}
              />
            </TabsContent>

            <TabsContent value="industry" className="space-y-6">
              <IndustryAnalysisView />
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <ComplianceRiskView />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <ExecutiveReportView />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <SettingsPanel config={config} onConfigChange={handleConfigChange} />
            </TabsContent>
          </motion.div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                © 2024 Portnox TCO Calculator. Comprehensive NAC vendor analysis platform.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">v2.1.0</Badge>
              <span className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
