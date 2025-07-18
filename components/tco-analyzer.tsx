"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertTriangle,
  Calculator,
  TrendingDown,
  Shield,
  Clock,
  DollarSign,
  CheckCircle2,
  BarChart3,
  Settings,
  Users,
  Building2,
  Zap,
  FileText,
} from "lucide-react"
import LiveMarketDashboard from "@/components/live-market-dashboard"

// Import calculation functions and data
import { compareVendors, type CalculationConfiguration, PORTNOX_PRICING_TIERS } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { useMarketAlerts } from "@/lib/hooks/use-market-data"

// Import all view components
import ExecutiveDashboardView from "@/components/views/executive-dashboard-view"
import DetailedCostsView from "@/components/views/detailed-costs-view"
import ROIView from "@/components/views/roi-view"
import SecurityPostureView from "@/components/views/security-posture-view"
import ComplianceRiskView from "@/components/views/compliance-risk-view"
import OperationalAnalysisView from "@/components/views/operational-analysis-view"
import BusinessImpactView from "@/components/views/business-impact-view"
import FeatureMatrixView from "@/components/views/feature-matrix-view"
import ImplementationRoadmapView from "@/components/views/implementation-roadmap-view"
import ReportsView from "@/components/views/reports-view"
import MarketIntelligenceView from "@/components/views/market-intelligence-view"

// Industry definitions
const INDUSTRIES = [
  { value: "healthcare", label: "Healthcare" },
  { value: "financial", label: "Financial Services" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "government", label: "Government" },
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
]

const REGIONS = [
  { value: "north-america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia-pacific", label: "Asia Pacific" },
  { value: "latin-america", label: "Latin America" },
  { value: "middle-east", label: "Middle East" },
]

const ORG_SIZES = [
  { value: "small", label: "Small (100-500 devices)", devices: 250, users: 150 },
  { value: "medium", label: "Medium (500-2,500 devices)", devices: 1250, users: 750 },
  { value: "large", label: "Large (2,500-10,000 devices)", devices: 5000, users: 3000 },
  { value: "enterprise", label: "Enterprise (10,000+ devices)", devices: 15000, users: 10000 },
]

export default function TCOAnalyzer() {
  // Configuration state
  const [config, setConfig] = useState<CalculationConfiguration>({
    orgSize: "medium",
    devices: 1250,
    users: 750,
    industry: "technology",
    years: 5,
    region: "north-america",
    portnoxTier: "Professional",
    includeOptionalAddOns: true,
  })

  // Selected vendors for comparison
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba", "forescout"])

  // Current view
  const [currentView, setCurrentView] = useState("executive")

  // Market alerts
  const { unreadCount } = useMarketAlerts()

  // Calculate results
  const results = useMemo(() => {
    return compareVendors(selectedVendors, config)
  }, [selectedVendors, config])

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const avgCompetitorCost =
    results.filter((r) => r.vendorId !== "portnox").reduce((sum, r) => sum + r.totalCost, 0) /
    Math.max(1, results.filter((r) => r.vendorId !== "portnox").length)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleConfigChange = (key: keyof CalculationConfiguration, value: any) => {
    setConfig((prev) => {
      const newConfig = { ...prev, [key]: value }

      // Auto-update devices/users based on org size
      if (key === "orgSize") {
        const orgSize = ORG_SIZES.find((s) => s.value === value)
        if (orgSize) {
          newConfig.devices = orgSize.devices
          newConfig.users = orgSize.users
        }
      }

      return newConfig
    })
  }

  const toggleVendor = (vendorId: string) => {
    setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]))
  }

  const availableVendors = Object.entries(ComprehensiveVendorDatabase).map(([id, vendor]) => ({
    id,
    name: vendor.name,
    category: vendor.category,
    marketShare: vendor.marketShare,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header with Live Market Data */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Portnox TCO Analyzer
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive Network Access Control cost analysis and vendor comparison
                </p>
              </div>
            </div>
          </div>

          {/* Live Market Data Compact View */}
          <div className="lg:w-2/3">
            <LiveMarketDashboard mode="compact" selectedVendors={selectedVendors} />
          </div>
        </div>

        {/* Configuration Panel */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Analysis Configuration
            </CardTitle>
            <CardDescription>Configure your organization parameters for accurate TCO analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={config.industry} onValueChange={(value) => handleConfigChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgSize">Organization Size</Label>
                <Select value={config.orgSize} onValueChange={(value) => handleConfigChange("orgSize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORG_SIZES.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="devices">Device Count</Label>
                <Input
                  id="devices"
                  type="number"
                  value={config.devices}
                  onChange={(e) => handleConfigChange("devices", Number.parseInt(e.target.value) || 0)}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Analysis Period</Label>
                <Select
                  value={config.years.toString()}
                  onValueChange={(value) => handleConfigChange("years", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="7">7 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="portnoxTier">Portnox Tier</Label>
                <Select value={config.portnoxTier} onValueChange={(value) => handleConfigChange("portnoxTier", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PORTNOX_PRICING_TIERS.map((tier) => (
                      <SelectItem key={tier.name} value={tier.name.split(" ")[1]}>
                        {tier.name} - ${tier.pricePerDevice}/device/month
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={config.region} onValueChange={(value) => handleConfigChange("region", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Vendor Selection */}
            <div className="space-y-3">
              <Label>Vendors to Compare</Label>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {availableVendors.map((vendor) => (
                  <div key={vendor.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={vendor.id}
                      checked={selectedVendors.includes(vendor.id)}
                      onCheckedChange={() => toggleVendor(vendor.id)}
                    />
                    <Label htmlFor={vendor.id} className="flex items-center gap-2 cursor-pointer">
                      <span>{vendor.name}</span>
                      <Badge variant={vendor.category === "leader" ? "default" : "secondary"} className="text-xs">
                        {vendor.category}
                      </Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        {results.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700">
                  <TrendingDown className="h-4 w-4" />
                  Lowest Cost Solution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-800">
                  {formatCurrency(Math.min(...results.map((r) => r.totalCost)))}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {results.find((r) => r.totalCost === Math.min(...results.map((r) => r.totalCost)))?.vendorName}
                </p>
                <Progress value={100} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700">
                  <DollarSign className="h-4 w-4" />
                  Portnox Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-800">
                  {portnoxResult ? formatCurrency(avgCompetitorCost - portnoxResult.totalCost) : "N/A"}
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  {portnoxResult
                    ? `${Math.round(((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100)}% reduction`
                    : "vs competitors"}
                </p>
                <Progress
                  value={portnoxResult ? ((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100 : 0}
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700">
                  <Clock className="h-4 w-4" />
                  Fastest Deployment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-800">
                  {Math.min(...results.map((r) => r.timeline?.implementationWeeks || 12)).toFixed(1)} weeks
                </div>
                <p className="text-xs text-purple-600 mt-1">
                  {
                    results.find(
                      (r) =>
                        (r.timeline?.implementationWeeks || 12) ===
                        Math.min(...results.map((r) => r.timeline?.implementationWeeks || 12)),
                    )?.vendorName
                  }
                </p>
                <Progress value={100} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-700">
                  <Shield className="h-4 w-4" />
                  Best Security Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-800">
                  {Math.max(...results.map((r) => r.risk?.securityScore || 0))}
                </div>
                <p className="text-xs text-orange-600 mt-1">
                  {
                    results.find(
                      (r) =>
                        (r.risk?.securityScore || 0) === Math.max(...results.map((r) => r.risk?.securityScore || 0)),
                    )?.vendorName
                  }
                </p>
                <Progress value={Math.max(...results.map((r) => r.risk?.securityScore || 0))} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Portnox Advantage Alert */}
        {portnoxResult && (
          <Alert className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <AlertTitle className="text-emerald-800">🚀 Portnox CLEAR Advantage</AlertTitle>
            <AlertDescription className="text-emerald-700">
              <strong>Save {formatCurrency(avgCompetitorCost - portnoxResult.totalCost)}</strong> (
              {Math.round(((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100)}% reduction) with
              <strong> zero infrastructure requirements</strong>,{" "}
              <strong>{Math.round(portnoxResult.roi?.paybackMonths || 6.5)} month payback</strong>, and
              <strong> 95% faster deployment</strong> than traditional NAC solutions. Cloud-native architecture with
              industry-leading security posture.
            </AlertDescription>
          </Alert>
        )}

        {/* Critical Vendor Warnings */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Critical Vendor Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Alert className="bg-red-50 border-red-300">
                <AlertDescription>
                  <strong>Ivanti/Pulse Secure:</strong> Mandatory migration required. Active nation-state exploitation.
                  20+ critical vulnerabilities. Legacy systems reaching EOL December 2024.
                </AlertDescription>
              </Alert>
              <Alert className="bg-orange-50 border-orange-300">
                <AlertDescription>
                  <strong>Microsoft NPS:</strong> No longer being developed. Lacks modern NAC features. Requires
                  multiple expensive add-ons (Azure AD Premium, Intune) for basic functionality.
                </AlertDescription>
              </Alert>
              <Alert className="bg-yellow-50 border-yellow-300">
                <AlertDescription>
                  <strong>Cloud-Only Vendors (FoxPass, SecureW2):</strong> Limited to WiFi/PKI only. No wired NAC, no
                  risk-based access, no IoT profiling. Missing 80% of enterprise NAC features.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Main Analysis Views */}
        <Tabs value={currentView} onValueChange={setCurrentView} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            <TabsTrigger value="executive" className="text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              Executive
            </TabsTrigger>
            <TabsTrigger value="detailed-costs" className="text-xs">
              <Calculator className="h-3 w-3 mr-1" />
              Costs
            </TabsTrigger>
            <TabsTrigger value="roi" className="text-xs">
              <TrendingDown className="h-3 w-3 mr-1" />
              ROI
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Security
            </TabsTrigger>
            <TabsTrigger value="compliance" className="text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="operational" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Operations
            </TabsTrigger>
            <TabsTrigger value="business" className="text-xs">
              <Building2 className="h-3 w-3 mr-1" />
              Business
            </TabsTrigger>
            <TabsTrigger value="features" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Features
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="market" className="text-xs relative">
              <BarChart3 className="h-3 w-3 mr-1" />
              Market
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-red-600">{unreadCount}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="executive">
            <ExecutiveDashboardView results={results} config={config} />
          </TabsContent>

          <TabsContent value="detailed-costs">
            <DetailedCostsView results={results} config={config} />
          </TabsContent>

          <TabsContent value="roi">
            <ROIView results={results} config={config} />
          </TabsContent>

          <TabsContent value="security">
            <SecurityPostureView results={results} config={config} />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceRiskView results={results} config={config} />
          </TabsContent>

          <TabsContent value="operational">
            <OperationalAnalysisView results={results} config={config} />
          </TabsContent>

          <TabsContent value="business">
            <BusinessImpactView results={results} config={config} />
          </TabsContent>

          <TabsContent value="features">
            <FeatureMatrixView results={results} config={config} />
          </TabsContent>

          <TabsContent value="roadmap">
            <ImplementationRoadmapView results={results} config={config} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsView results={results} config={config} />
          </TabsContent>

          <TabsContent value="market">
            <MarketIntelligenceView results={results} config={config} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
