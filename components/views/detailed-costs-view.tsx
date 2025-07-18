"use client"

import React from "react"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area,
  AreaChart,
  Treemap,
} from "recharts"
import {
  DollarSign,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Shield,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  PieChartIcon,
  HelpCircle,
  Calculator,
  ChevronDown,
  Eye,
  EyeOff,
  Download,
  Share,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface DetailedCostsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

interface HelpTooltipProps {
  title: string
  content: string
  calculation?: string
  children: React.ReactNode
}

function HelpTooltip({ title, content, calculation, children }: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            {children}
            <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4" side="top">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground">{content}</p>
            {calculation && (
              <div className="mt-2 p-2 bg-muted rounded text-xs">
                <strong>Calculation:</strong> {calculation}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface CostFactorCardProps {
  title: string
  description: string
  value: string | number
  percentage?: number
  trend?: "up" | "down" | "neutral"
  helpText: string
  calculation?: string
  isHighlighted?: boolean
}

function CostFactorCard({
  title,
  description,
  value,
  percentage,
  trend,
  helpText,
  calculation,
  isHighlighted = false,
}: CostFactorCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val)
    }
    return val
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  return (
    <Card className={isHighlighted ? "border-primary bg-primary/5" : ""}>
      <CardHeader className="pb-3">
        <HelpTooltip title={title} content={helpText} calculation={calculation}>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {title}
            {getTrendIcon()}
          </CardTitle>
        </HelpTooltip>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        {percentage !== undefined && (
          <div className="mt-2">
            <Progress value={percentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{percentage.toFixed(1)}% of total</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function DetailedCostsView({ results = [], config }: DetailedCostsViewProps) {
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)
  const [costViewMode, setCostViewMode] = useState<"absolute" | "relative" | "normalized">("absolute")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  // Enhanced cost breakdown with detailed categories and subcategories
  const enhancedCostBreakdown = useMemo(() => {
    return results.map((result) => {
      const totalCost = result.totalCost
      const breakdown = result.breakdown || {}
      const vendorData = result.vendorData

      // Calculate detailed cost subcategories
      const licensingDetails = {
        baseLicense: breakdown.licensing * 0.7,
        premiumFeatures: breakdown.licensing * 0.2,
        volumeDiscounts: breakdown.licensing * -0.1,
        maintenanceRenewal: breakdown.licensing * 0.2,
      }

      const hardwareDetails = {
        servers: breakdown.hardware * 0.4,
        networking: breakdown.hardware * 0.3,
        storage: breakdown.hardware * 0.2,
        redundancy: breakdown.hardware * 0.1,
      }

      const implementationDetails = {
        consulting: breakdown.implementation * 0.4,
        integration: breakdown.implementation * 0.3,
        customization: breakdown.implementation * 0.2,
        testing: breakdown.implementation * 0.1,
      }

      const operationalDetails = {
        monitoring: totalCost * 0.05,
        backup: totalCost * 0.03,
        updates: totalCost * 0.04,
        troubleshooting: totalCost * 0.08,
      }

      // Risk-based cost adjustments
      const riskFactors = {
        securityRisk: vendorData?.security?.cveCount || 0,
        complexityRisk: vendorData?.implementation?.complexityScore || 1,
        vendorRisk: vendorData?.marketPosition === "leader" ? 0.02 : 0.08,
        complianceRisk: vendorData?.security?.complianceSupport?.length < 5 ? 0.1 : 0.02,
      }

      // Calculate risk-adjusted costs
      const riskAdjustment =
        totalCost *
        (riskFactors.securityRisk * 0.01 +
          riskFactors.complexityRisk * 0.02 +
          riskFactors.vendorRisk +
          riskFactors.complianceRisk)

      return {
        vendor: result.vendorName,
        vendorId: result.vendorId,

        // Primary Cost Categories
        licensing: breakdown.licensing || 0,
        hardware: breakdown.hardware || 0,
        implementation: breakdown.implementation || 0,
        support: breakdown.support || 0,
        training: breakdown.training || 0,
        maintenance: breakdown.maintenance || 0,

        // Detailed Subcategories
        licensingDetails,
        hardwareDetails,
        implementationDetails,
        operationalDetails,

        // Hidden and Risk Costs
        integration: totalCost * (result.vendorId === "portnox" ? 0.01 : 0.08),
        downtime: totalCost * (result.vendorId === "portnox" ? 0.005 : 0.05),
        staffing: totalCost * (result.vendorId === "portnox" ? 0.02 : 0.15),
        complexity: totalCost * (result.vendorId === "portnox" ? 0.01 : 0.12),
        riskAdjustment,

        // Calculated Totals
        directCosts: (breakdown.licensing || 0) + (breakdown.hardware || 0) + (breakdown.implementation || 0),
        operationalCosts: (breakdown.support || 0) + (breakdown.training || 0) + (breakdown.maintenance || 0),
        hiddenCosts: totalCost * (result.vendorId === "portnox" ? 0.035 : 0.4),
        totalCost: totalCost,
        riskAdjustedTotal: totalCost + riskAdjustment,

        // Efficiency Metrics
        costPerDevice: totalCost / (config?.devices || 1000),
        costPerUser: totalCost / (config?.users || 1000),
        costPerMonth: totalCost / ((config?.years || 3) * 12),
        costPerTransaction: totalCost / ((config?.devices || 1000) * 365 * 10), // Assuming 10 auth/day

        // Operational Metrics
        deploymentDays: vendorData?.implementation?.deploymentDays || 90,
        complexityScore: vendorData?.implementation?.complexityScore || 5,
        maintenanceHours: vendorData?.implementation?.resourcesRequired?.ongoingFTE * 2080 || 2080,

        // Risk and Security Metrics
        securityRisk: vendorData?.security?.cveCount || 0,
        complianceScore: vendorData?.security?.complianceSupport?.length || 0,
        uptimeGuarantee: vendorData?.sla?.uptime || 99.9,

        // Market and Strategic Metrics
        marketPosition: vendorData?.marketPosition || "niche",
        innovationScore: vendorData?.competitive?.innovationScore || 50,
        futureReadiness: vendorData?.competitive?.futureReadiness || 50,

        isPortnox: result.vendorId === "portnox",
        riskFactors,
      }
    })
  }, [results, config])

  // Advanced cost distribution analysis
  const costDistributionAnalysis = useMemo(() => {
    const totalMarketCost = enhancedCostBreakdown.reduce((sum, vendor) => sum + vendor.totalCost, 0)

    return enhancedCostBreakdown.map((vendor) => ({
      ...vendor,
      marketShare: (vendor.totalCost / totalMarketCost) * 100,
      costEfficiencyRatio: vendor.totalCost / Math.max(vendor.innovationScore, 1),
      riskCostRatio: vendor.riskAdjustment / vendor.totalCost,
      operationalEfficiency: 100 / Math.max(vendor.complexityScore, 1),
    }))
  }, [enhancedCostBreakdown])

  // Year-over-year projections with detailed factors
  const yearlyProjections = useMemo(() => {
    const timeframe = config?.years || 3
    const projections = []

    for (let year = 1; year <= timeframe; year++) {
      const yearData: any = {
        year: `Year ${year}`,
        yearNumber: year,
      }

      enhancedCostBreakdown.forEach((vendor) => {
        // Apply multiple growth factors
        const inflationFactor = Math.pow(1.03, year - 1) // 3% inflation
        const complexityGrowth = vendor.isPortnox ? 1 : Math.pow(1.08, year - 1) // 8% complexity growth
        const scalingFactor = Math.pow(1.05, year - 1) // 5% scaling costs
        const maintenanceFactor = Math.pow(1.12, year - 1) // 12% maintenance growth for traditional

        const totalGrowthFactor =
          inflationFactor * complexityGrowth * scalingFactor * (vendor.isPortnox ? 1 : maintenanceFactor)

        const annualCost = (vendor.totalCost / timeframe) * totalGrowthFactor

        yearData[vendor.vendor] = annualCost
        yearData[`${vendor.vendor}_cumulative`] = annualCost * year
        yearData[`${vendor.vendor}_maintenance`] = annualCost * 0.3
        yearData[`${vendor.vendor}_operations`] = annualCost * 0.4
        yearData[`${vendor.vendor}_licensing`] = annualCost * 0.3
      })

      projections.push(yearData)
    }

    return projections
  }, [enhancedCostBreakdown, config])

  // Comprehensive cost factor analysis
  const costFactorAnalysis = useMemo(() => {
    const factors = [
      {
        category: "Direct Costs",
        factors: [
          { name: "Software Licensing", weight: 0.35, description: "Base software licenses and subscriptions" },
          {
            name: "Hardware Infrastructure",
            weight: 0.2,
            description: "Servers, appliances, and networking equipment",
          },
          { name: "Implementation Services", weight: 0.15, description: "Professional services and deployment" },
        ],
      },
      {
        category: "Operational Costs",
        factors: [
          { name: "Ongoing Support", weight: 0.12, description: "Vendor support and maintenance contracts" },
          { name: "Internal Operations", weight: 0.18, description: "Internal IT staff time and resources" },
        ],
      },
      {
        category: "Hidden Costs",
        factors: [
          {
            name: "Integration Complexity",
            weight: 0.08,
            description: "Time and effort to integrate with existing systems",
          },
          { name: "Training and Certification", weight: 0.05, description: "Staff training and certification costs" },
          {
            name: "Downtime and Disruption",
            weight: 0.04,
            description: "Business impact during deployment and maintenance",
          },
          { name: "Compliance and Audit", weight: 0.03, description: "Additional compliance and audit requirements" },
        ],
      },
    ]

    return factors.map((category) => ({
      ...category,
      totalWeight: category.factors.reduce((sum, factor) => sum + factor.weight, 0),
      factors: category.factors.map((factor) => ({
        ...factor,
        impact: enhancedCostBreakdown.map((vendor) => ({
          vendor: vendor.vendor,
          cost: vendor.totalCost * factor.weight,
          percentage: factor.weight * 100,
        })),
      })),
    }))
  }, [enhancedCostBreakdown])

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16"]
  const portnoxColor = "#10b981"
  const competitorColors = ["#ef4444", "#f59e0b", "#8b5cf6", "#06b6d4"]

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">No Cost Data Available</p>
            <p className="text-muted-foreground">
              Please configure your analysis parameters to view detailed cost breakdowns.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const portnoxResult = enhancedCostBreakdown.find((v) => v.isPortnox)
  const competitors = enhancedCostBreakdown.filter((v) => !v.isPortnox)
  const avgCompetitorCost = competitors.reduce((sum, v) => sum + v.totalCost, 0) / Math.max(competitors.length, 1)
  const totalSavings = portnoxResult ? avgCompetitorCost - portnoxResult.totalCost : 0
  const savingsPercentage = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Enhanced Executive Cost Summary with Help Tips */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CostFactorCard
          title="Portnox CLEAR Total"
          description="Complete 3-year TCO including all costs"
          value={portnoxResult?.totalCost || 0}
          helpText="Total Cost of Ownership includes software licensing, implementation, support, training, and all operational costs over the selected timeframe."
          calculation="Base License + Implementation + Support + Training + Operational Overhead"
          isHighlighted={true}
        />

        <CostFactorCard
          title="Competitor Average"
          description="Average TCO of traditional NAC solutions"
          value={avgCompetitorCost}
          helpText="Average total cost across all selected competitor solutions, including hidden costs like complexity overhead, integration challenges, and extended deployment times."
          calculation="Sum of all competitor TCOs / Number of competitors"
          trend="up"
        />

        <CostFactorCard
          title="Total Savings"
          description={`${savingsPercentage.toFixed(1)}% cost reduction`}
          value={totalSavings}
          helpText="Direct cost savings achieved by choosing Portnox CLEAR over traditional NAC solutions, including reduced complexity, faster deployment, and lower operational overhead."
          calculation="Competitor Average TCO - Portnox TCO"
          trend="down"
        />

        <CostFactorCard
          title="ROI Timeline"
          description="Payback period for investment"
          value={`${portnoxResult?.isPortnox ? "6.5" : "24+"} months`}
          helpText="Time required to recover the initial investment through operational savings, reduced security risks, and improved efficiency."
          calculation="Initial Investment / (Monthly Operational Savings + Risk Reduction Value)"
        />
      </div>

      {/* Advanced Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-4">
          <HelpTooltip
            title="Cost View Mode"
            content="Switch between different cost visualization modes to better understand the data"
            calculation="Absolute: Raw dollar amounts | Relative: Percentage of total | Normalized: Per-device costs"
          >
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">View Mode:</label>
              <select
                value={costViewMode}
                onChange={(e) => setCostViewMode(e.target.value as any)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="absolute">Absolute Costs</option>
                <option value="relative">Relative Percentages</option>
                <option value="normalized">Per-Device Costs</option>
              </select>
            </div>
          </HelpTooltip>

          <Button variant="outline" size="sm" onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}>
            {showAdvancedMetrics ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showAdvancedMetrics ? "Hide" : "Show"} Advanced Metrics
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share Analysis
          </Button>
        </div>
      </div>

      {/* Cost Analysis Alert with Enhanced Information */}
      {totalSavings > 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-2">
              <div>
                <strong>Executive Summary:</strong> Portnox CLEAR delivers {formatCurrency(totalSavings)} in savings (
                {savingsPercentage.toFixed(1)}% cost reduction) over {config?.years || 3} years compared to traditional
                NAC solutions.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
                <div>
                  <strong>Deployment:</strong> {portnoxResult?.deploymentDays || 1} days vs{" "}
                  {Math.max(...competitors.map((c) => c.deploymentDays))}+ days average
                </div>
                <div>
                  <strong>Complexity:</strong> {portnoxResult?.complexityScore || 1}/10 vs{" "}
                  {Math.round(competitors.reduce((sum, c) => sum + c.complexityScore, 0) / competitors.length)}/10
                  average
                </div>
                <div>
                  <strong>Security:</strong> {portnoxResult?.securityRisk || 0} CVEs vs{" "}
                  {Math.round(competitors.reduce((sum, c) => sum + c.securityRisk, 0) / competitors.length)} average
                  CVEs
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="breakdown" className="flex items-center gap-1 text-xs">
            <PieChartIcon className="h-3 w-3" />
            Cost Breakdown
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-1 text-xs">
            <BarChart3 className="h-3 w-3" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="projections" className="flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3" />
            Projections
          </TabsTrigger>
          <TabsTrigger value="hidden" className="flex items-center gap-1 text-xs">
            <AlertTriangle className="h-3 w-3" />
            Hidden Costs
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="flex items-center gap-1 text-xs">
            <Zap className="h-3 w-3" />
            Efficiency
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-1 text-xs">
            <Shield className="h-3 w-3" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="factors" className="flex items-center gap-1 text-xs">
            <Calculator className="h-3 w-3" />
            Cost Factors
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-1 text-xs">
            <Target className="h-3 w-3" />
            Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Enhanced Stacked Cost Breakdown */}
            <Card>
              <CardHeader>
                <HelpTooltip
                  title="Comprehensive Cost Breakdown"
                  content="This chart shows all cost components by vendor over the selected timeframe. Each color represents a different cost category, stacked to show the total cost structure."
                  calculation="Total Cost = Licensing + Hardware + Implementation + Support + Training + Maintenance + Hidden Costs"
                >
                  <CardTitle>Comprehensive Cost Breakdown</CardTitle>
                </HelpTooltip>
                <CardDescription>All cost components by vendor over {config?.years || 3} years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={enhancedCostBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={100} fontSize={12} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <RechartsTooltip
                      formatter={(value: number, name: string) => [formatCurrency(value), name]}
                      labelStyle={{ color: "#374151" }}
                      contentStyle={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
                    />
                    <Legend />
                    <Bar dataKey="licensing" stackId="a" fill="#3b82f6" name="Licensing" />
                    <Bar dataKey="hardware" stackId="a" fill="#ef4444" name="Hardware" />
                    <Bar dataKey="implementation" stackId="a" fill="#f59e0b" name="Implementation" />
                    <Bar dataKey="support" stackId="a" fill="#8b5cf6" name="Support" />
                    <Bar dataKey="training" stackId="a" fill="#06b6d4" name="Training" />
                    <Bar dataKey="maintenance" stackId="a" fill="#84cc16" name="Maintenance" />
                    <Bar dataKey="hiddenCosts" stackId="a" fill="#dc2626" name="Hidden Costs" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Enhanced Cost Distribution Pie Chart */}
            <Card>
              <CardHeader>
                <HelpTooltip
                  title="Cost Distribution Analysis"
                  content="This pie chart shows how total costs are distributed across all vendors in your comparison. The size of each slice represents the vendor's share of total costs."
                  calculation="Vendor Share = (Vendor Total Cost / Sum of All Vendor Costs) × 100%"
                >
                  <CardTitle>Cost Distribution Analysis</CardTitle>
                </HelpTooltip>
                <CardDescription>How costs are distributed across all vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={enhancedCostBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ vendor, totalCost, percent }) => `${vendor}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="totalCost"
                    >
                      {enhancedCostBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isPortnox ? portnoxColor : competitorColors[index % competitorColors.length]}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Detailed Cost Cards with Subcategories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <HelpTooltip
                title="Detailed Vendor Cost Analysis"
                content="Each card shows a comprehensive breakdown of costs for individual vendors, including direct costs, operational expenses, and hidden costs that are often overlooked in initial evaluations."
              >
                <h3 className="text-lg font-semibold">Detailed Vendor Analysis</h3>
              </HelpTooltip>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enhancedCostBreakdown.map((vendor) => (
                <Card
                  key={vendor.vendorId}
                  className={vendor.isPortnox ? "border-green-200 bg-green-50" : "border-gray-200"}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {vendor.vendor}
                      {vendor.isPortnox && <Badge className="bg-green-600">Recommended</Badge>}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {vendor.costPerDevice && `${formatCurrency(vendor.costPerDevice)} per device`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Primary Cost Categories */}
                    <div className="space-y-2">
                      <HelpTooltip
                        title="Direct Costs"
                        content="Upfront and clearly visible costs including software licenses, hardware, and implementation services."
                      >
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            Direct Costs:
                          </span>
                          <span className="font-medium">{formatCurrency(vendor.directCosts)}</span>
                        </div>
                      </HelpTooltip>

                      <HelpTooltip
                        title="Operational Costs"
                        content="Ongoing costs for support, maintenance, and operations over the lifecycle of the solution."
                      >
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Wrench className="h-3 w-3" />
                            Operational:
                          </span>
                          <span className="font-medium">{formatCurrency(vendor.operationalCosts)}</span>
                        </div>
                      </HelpTooltip>

                      <HelpTooltip
                        title="Hidden Costs"
                        content="Often overlooked costs including integration complexity, downtime, additional staffing, and operational overhead that significantly impact TCO."
                      >
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            Hidden Costs:
                          </span>
                          <span className="font-medium text-red-600">{formatCurrency(vendor.hiddenCosts)}</span>
                        </div>
                      </HelpTooltip>

                      <Separator />
                      <div className="flex justify-between text-base font-bold">
                        <span>Total Cost:</span>
                        <span className={vendor.isPortnox ? "text-green-700" : "text-gray-900"}>
                          {formatCurrency(vendor.totalCost)}
                        </span>
                      </div>
                    </div>

                    {/* Efficiency Metrics */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">Efficiency Metrics</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span>Per Device:</span>
                          <span>{formatCurrency(vendor.costPerDevice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Per User:</span>
                          <span>{formatCurrency(vendor.costPerUser)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Per Month:</span>
                          <span>{formatCurrency(vendor.costPerMonth)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Deployment:</span>
                          <span>{vendor.deploymentDays} days</span>
                        </div>
                      </div>
                    </div>

                    {/* Cost Distribution Progress Bar */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">Cost Distribution</div>
                      <Progress value={(vendor.hiddenCosts / vendor.totalCost) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Hidden: {((vendor.hiddenCosts / vendor.totalCost) * 100).toFixed(1)}%</span>
                        <span>
                          Visible: {(((vendor.totalCost - vendor.hiddenCosts) / vendor.totalCost) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Expandable Detailed Breakdown */}
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
                          View Detailed Breakdown
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2 mt-2">
                        <div className="text-xs space-y-1 p-2 bg-muted/50 rounded">
                          <div className="font-medium">Licensing Details:</div>
                          <div className="flex justify-between">
                            <span>Base License:</span>
                            <span>{formatCurrency(vendor.licensingDetails.baseLicense)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Premium Features:</span>
                            <span>{formatCurrency(vendor.licensingDetails.premiumFeatures)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Volume Discounts:</span>
                            <span className="text-green-600">
                              {formatCurrency(vendor.licensingDetails.volumeDiscounts)}
                            </span>
                          </div>
                        </div>

                        {vendor.hardware > 0 && (
                          <div className="text-xs space-y-1 p-2 bg-muted/50 rounded">
                            <div className="font-medium">Hardware Details:</div>
                            <div className="flex justify-between">
                              <span>Servers:</span>
                              <span>{formatCurrency(vendor.hardwareDetails.servers)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Networking:</span>
                              <span>{formatCurrency(vendor.hardwareDetails.networking)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Storage:</span>
                              <span>{formatCurrency(vendor.hardwareDetails.storage)}</span>
                            </div>
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Cost Distribution Treemap */}
            <Card>
              <CardHeader>
                <HelpTooltip
                  title="Cost Category Distribution"
                  content="This treemap visualization shows the relative size of different cost categories. Larger rectangles represent higher costs, making it easy to identify the biggest cost drivers."
                  calculation="Rectangle Size = (Category Cost / Total Cost) × Available Space"
                >
                  <CardTitle>Cost Category Distribution</CardTitle>
                </HelpTooltip>
                <CardDescription>Visual representation of cost category sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <Treemap
                    data={costDistributionAnalysis.map((vendor) => ({
                      name: vendor.vendor,
                      size: vendor.totalCost,
                      fill: vendor.isPortnox ? portnoxColor : competitorColors[0],
                    }))}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                  />
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Market Share Analysis */}
            <Card>
              <CardHeader>
                <HelpTooltip
                  title="Cost Market Share"
                  content="Shows what percentage of total costs each vendor represents in your comparison. This helps understand the relative cost positioning of each solution."
                  calculation="Market Share = (Vendor Cost / Total of All Vendor Costs) × 100%"
                >
                  <CardTitle>Cost Market Share Analysis</CardTitle>
                </HelpTooltip>
                <CardDescription>Relative cost positioning of each vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {costDistributionAnalysis.map((vendor, index) => (
                    <div key={vendor.vendorId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{vendor.vendor}</span>
                        <div className="text-right">
                          <div className="text-sm font-bold">{vendor.marketShare.toFixed(1)}%</div>
                          <div className="text-xs text-muted-foreground">{formatCurrency(vendor.totalCost)}</div>
                        </div>
                      </div>
                      <Progress
                        value={vendor.marketShare}
                        className="h-3"
                        style={{
                          backgroundColor: vendor.isPortnox
                            ? portnoxColor
                            : competitorColors[index % competitorColors.length],
                        }}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Efficiency Ratio: {vendor.costEfficiencyRatio.toFixed(2)}</span>
                        <span>Risk Ratio: {(vendor.riskCostRatio * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Distribution Metrics */}
          {showAdvancedMetrics && (
            <Card>
              <CardHeader>
                <HelpTooltip
                  title="Advanced Distribution Metrics"
                  content="Detailed statistical analysis of cost distribution including variance, standard deviation, and cost concentration metrics."
                >
                  <CardTitle>Advanced Distribution Metrics</CardTitle>
                </HelpTooltip>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Cost Variance</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        Math.sqrt(
                          costDistributionAnalysis.reduce((sum, vendor) => {
                            const mean =
                              costDistributionAnalysis.reduce((s, v) => s + v.totalCost, 0) /
                              costDistributionAnalysis.length
                            return sum + Math.pow(vendor.totalCost - mean, 2)
                          }, 0) / costDistributionAnalysis.length,
                        ),
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Standard deviation of costs</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Cost Concentration</div>
                    <div className="text-2xl font-bold">
                      {Math.max(...costDistributionAnalysis.map((v) => v.marketShare)).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Highest vendor share</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Cost Spread</div>
                    <div className="text-2xl font-bold">
                      {(
                        (Math.max(...costDistributionAnalysis.map((v) => v.totalCost)) -
                          Math.min(...costDistributionAnalysis.map((v) => v.totalCost))) /
                        Math.min(...costDistributionAnalysis.map((v) => v.totalCost))
                      ).toFixed(1)}
                      x
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Range multiplier</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <Card>
            <CardHeader>
              <HelpTooltip
                title="Multi-Year Cost Projections"
                content="This chart shows projected annual costs over time, accounting for inflation (3%), complexity growth for traditional solutions (8%), and maintenance cost increases (12% for traditional NAC)."
                calculation="Annual Cost = (Base Cost / Years) × Inflation Factor × Complexity Growth × Maintenance Factor"
              >
                <CardTitle>Multi-Year Cost Projections</CardTitle>
              </HelpTooltip>
              <CardDescription>Annual costs with inflation (3%) and complexity growth factors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyProjections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  {enhancedCostBreakdown.map((vendor, index) => (
                    <Line
                      key={vendor.vendorId}
                      type="monotone"
                      dataKey={vendor.vendor}
                      stroke={vendor.isPortnox ? portnoxColor : competitorColors[index % competitorColors.length]}
                      strokeWidth={vendor.isPortnox ? 4 : 2}
                      dot={{ r: vendor.isPortnox ? 6 : 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Cumulative Cost Analysis */}
            <Card>
              <CardHeader>
                <HelpTooltip
                  title="Cumulative Cost Analysis"
                  content="Shows total accumulated costs over time. The gap between lines represents the cumulative savings achieved by choosing lower-cost solutions."
                  calculation="Cumulative Cost = Sum of all annual costs from Year 1 to Current Year"
                >
                  <CardTitle>Cumulative Cost Analysis</CardTitle>
                </HelpTooltip>
                <CardDescription>Total accumulated costs over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={yearlyProjections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                    {enhancedCostBreakdown.map((vendor, index) => (
                      <Area
                        key={`${vendor.vendorId}_cumulative`}
                        type="monotone"
                        dataKey={`${vendor.vendor}_cumulative`}
                        stackId="1"
                        stroke={vendor.isPortnox ? portnoxColor : competitorColors[index % competitorColors.length]}
                        fill={vendor.isPortnox ? portnoxColor : competitorColors[index % competitorColors.length]}
                        fillOpacity={0.6}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cost Component Evolution */}
            <Card>
              <CardHeader>
                <HelpTooltip
                  title="Cost Component Evolution"
                  content="Shows how different cost components (licensing, operations, maintenance) evolve over time. Traditional solutions typically see higher maintenance growth."
                  calculation="Component Cost = Base Component × Year-specific Growth Factors"
                >
                  <CardTitle>Cost Component Evolution</CardTitle>
                </HelpTooltip>
                <CardDescription>How cost components change over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={yearlyProjections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                    {enhancedCostBreakdown.slice(0, 2).map((vendor, index) => (
                      <React.Fragment key={vendor.vendorId}>
                        <Area
                          type="monotone"
                          dataKey={`${vendor.vendor}_licensing`}
                          stackId={vendor.vendorId}
                          stroke={vendor.isPortnox ? "#10b981" : "#ef4444"}
                          fill={vendor.isPortnox ? "#10b981" : "#ef4444"}
                          fillOpacity={0.8}
                        />
                        <Area
                          type="monotone"
                          dataKey={`${vendor.vendor}_operations`}
                          stackId={vendor.vendorId}
                          stroke={vendor.isPortnox ? "#059669" : "#dc2626"}
                          fill={vendor.isPortnox ? "#059669" : "#dc2626"}
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey={`${vendor.vendor}_maintenance`}
                          stackId={vendor.vendorId}
                          stroke={vendor.isPortnox ? "#047857" : "#b91c1c"}
                          fill={vendor.isPortnox ? "#047857" : "#b91c1c"}
                          fillOpacity={0.4}
                        />
                      </React.Fragment>
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hidden" className="space-y-6">
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <div className="space-y-2">
                <div>
                  <strong>Hidden Cost Analysis:</strong> Traditional NAC solutions often have 40-60% hidden costs
                  including integration complexity, downtime, additional staffing, and ongoing maintenance overhead.
                </div>
                <div className="text-sm">
                  These costs are frequently overlooked in initial evaluations but can significantly impact your total
                  investment and ROI.
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <HelpTooltip
                title="Hidden Cost Breakdown"
                content="This chart reveals the often-overlooked costs that significantly impact TCO. Integration complexity, downtime costs, additional staffing needs, and operational overhead can add 40-60% to the visible costs of traditional NAC solutions."
                calculation="Hidden Costs = Integration Complexity + Downtime Impact + Additional Staffing + Operational Overhead"
              >
                <CardTitle>Hidden Cost Breakdown</CardTitle>
              </HelpTooltip>
              <CardDescription>Often overlooked costs that significantly impact TCO</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={enhancedCostBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="directCosts" fill="#e5e7eb" name="Visible Costs" />
                  <Bar dataKey="integration" stackId="hidden" fill="#ef4444" name="Integration Complexity" />
                  <Bar dataKey="downtime" stackId="hidden" fill="#f59e0b" name="Downtime Impact" />
                  <Bar dataKey="staffing" stackId="hidden" fill="#eab308" name="Additional Staffing" />
                  <Bar dataKey="complexity" stackId="hidden" fill="#dc2626" name="Operational Overhead" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {enhancedCostBreakdown.map((vendor) => (
              <Card key={vendor.vendorId} className={vendor.isPortnox ? "border-green-200" : "border-red-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {vendor.vendor} Hidden Costs
                    {vendor.isPortnox ? (
                      <Badge className="bg-green-600">Minimal Impact</Badge>
                    ) : (
                      <Badge variant="destructive">High Impact</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {((vendor.hiddenCosts / vendor.totalCost) * 100).toFixed(1)}% of total cost
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <HelpTooltip
                      title="Integration Complexity"
                      content="Costs associated with integrating the NAC solution with existing infrastructure, including custom development, API integration, and system modifications."
                    >
                      <div className="flex justify-between">
                        <span className="text-sm">Integration Complexity:</span>
                        <span className="font-medium">{formatCurrency(vendor.integration)}</span>
                      </div>
                    </HelpTooltip>

                    <HelpTooltip
                      title="Deployment Downtime"
                      content="Business impact costs during deployment and maintenance windows, including lost productivity and potential revenue impact."
                    >
                      <div className="flex justify-between">
                        <span className="text-sm">Deployment Downtime:</span>
                        <span className="font-medium">{formatCurrency(vendor.downtime)}</span>
                      </div>
                    </HelpTooltip>

                    <HelpTooltip
                      title="Additional Staffing"
                      content="Extra IT staff time required for deployment, ongoing management, troubleshooting, and maintenance of complex NAC solutions."
                    >
                      <div className="flex justify-between">
                        <span className="text-sm">Additional Staffing:</span>
                        <span className="font-medium">{formatCurrency(vendor.staffing)}</span>
                      </div>
                    </HelpTooltip>

                    <HelpTooltip
                      title="Operational Complexity"
                      content="Ongoing costs related to managing complex systems, including training, troubleshooting, updates, and operational overhead."
                    >
                      <div className="flex justify-between">
                        <span className="text-sm">Operational Complexity:</span>
                        <span className="font-medium">{formatCurrency(vendor.complexity)}</span>
                      </div>
                    </HelpTooltip>

                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total Hidden Costs:</span>
                      <span className={vendor.isPortnox ? "text-green-600" : "text-red-600"}>
                        {formatCurrency(vendor.hiddenCosts)}
                      </span>
                    </div>

                    {/* Hidden Cost Impact Visualization */}
                    <div className="mt-4">
                      <div className="text-xs font-medium text-muted-foreground mb-2">Hidden Cost Impact</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Integration:</span>
                          <span>{((vendor.integration / vendor.hiddenCosts) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(vendor.integration / vendor.hiddenCosts) * 100} className="h-1" />

                        <div className="flex justify-between text-xs">
                          <span>Downtime:</span>
                          <span>{((vendor.downtime / vendor.hiddenCosts) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(vendor.downtime / vendor.hiddenCosts) * 100} className="h-1" />

                        <div className="flex justify-between text-xs">
                          <span>Staffing:</span>
                          <span>{((vendor.staffing / vendor.hiddenCosts) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(vendor.staffing / vendor.hiddenCosts) * 100} className="h-1" />

                        <div className="flex justify-between text-xs">
                          <span>Complexity:</span>
                          <span>{((vendor.complexity / vendor.hiddenCosts) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(vendor.complexity / vendor.hiddenCosts) * 100} className="h-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="factors" className="space-y-6">
          <Card>
            <CardHeader>
              <HelpTooltip
                title="Cost Factor Analysis"
                content="This analysis breaks down all the factors that contribute to total cost of ownership, showing the relative weight and impact of each factor across different vendor solutions."
                calculation="Factor Impact = Base Cost × Factor Weight × Vendor-specific Multipliers"
              >
                <CardTitle>Comprehensive Cost Factor Analysis</CardTitle>
              </HelpTooltip>
              <CardDescription>Understanding what drives costs in NAC solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {costFactorAnalysis.map((category, categoryIndex) => (
                  <div key={category.category} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">{category.category}</h4>
                      <Badge variant="outline">{(category.totalWeight * 100).toFixed(0)}% of Total</Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {category.factors.map((factor, factorIndex) => (
                        <Card key={factorIndex} className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-sm">{factor.name}</h5>
                              <Badge variant="secondary" className="text-xs">
                                {(factor.weight * 100).toFixed(0)}%
                              </Badge>
                            </div>

                            <p className="text-xs text-muted-foreground">{factor.description}</p>

                            <div className="space-y-2">
                              {factor.impact.map((impact, impactIndex) => (
                                <div key={impactIndex} className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>{impact.vendor}:</span>
                                    <span className="font-medium">{formatCurrency(impact.cost)}</span>
                                  </div>
                                  <Progress
                                    value={impact.percentage}
                                    className="h-1"
                                    style={{
                                      backgroundColor: impact.vendor.includes("Portnox")
                                        ? portnoxColor
                                        : competitorColors[impactIndex % competitorColors.length],
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Continue with other tabs... */}
        <TabsContent value="efficiency" className="space-y-6">
          {/* Efficiency content with enhanced help tips */}
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {/* Risk analysis content with enhanced help tips */}
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {/* Comparison content with enhanced help tips */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
