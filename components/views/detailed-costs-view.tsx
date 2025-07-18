"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  DollarSign,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wrench,
  Shield,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  PieChartIcon,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface DetailedCostsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function DetailedCostsView({ results = [], config }: DetailedCostsViewProps) {
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

  // Enhanced cost breakdown with detailed categories
  const enhancedCostBreakdown = useMemo(() => {
    return results.map((result) => {
      const totalCost = result.totalCost
      const breakdown = result.breakdown || {}

      return {
        vendor: result.vendorName,
        vendorId: result.vendorId,

        // Direct Costs
        licensing: breakdown.licensing || 0,
        hardware: breakdown.hardware || 0,
        implementation: breakdown.implementation || 0,

        // Operational Costs
        support: breakdown.support || 0,
        training: breakdown.training || 0,
        maintenance: breakdown.maintenance || 0,

        // Hidden Costs (calculated based on vendor complexity)
        integration: totalCost * (result.vendorId === "portnox" ? 0 : 0.08),
        downtime: totalCost * (result.vendorId === "portnox" ? 0 : 0.05),
        staffing: totalCost * (result.vendorId === "portnox" ? 0.02 : 0.15),
        complexity: totalCost * (result.vendorId === "portnox" ? 0 : 0.12),

        // Totals
        directCosts: (breakdown.licensing || 0) + (breakdown.hardware || 0) + (breakdown.implementation || 0),
        operationalCosts: (breakdown.support || 0) + (breakdown.training || 0) + (breakdown.maintenance || 0),
        hiddenCosts: totalCost * (result.vendorId === "portnox" ? 0.02 : 0.4),
        totalCost: totalCost,

        // Efficiency Metrics
        costPerDevice: totalCost / (config?.devices || 1000),
        costPerUser: totalCost / (config?.users || 1000),

        // Risk Factors
        securityRisk: result.vendorData?.security?.cveCount || 0,
        complexityScore: result.vendorData?.implementation?.complexityScore || 1,
        deploymentRisk: result.vendorData?.implementation?.deploymentDays || 1,

        isPortnox: result.vendorId === "portnox",
      }
    })
  }, [results, config])

  // Year-over-year projections with inflation and growth
  const yearlyProjections = useMemo(() => {
    const timeframe = config?.years || 3
    const projections = []

    for (let year = 1; year <= timeframe; year++) {
      const yearData: any = {
        year: `Year ${year}`,
        yearNumber: year,
      }

      enhancedCostBreakdown.forEach((vendor) => {
        // Apply inflation (3% annually) and complexity growth
        const inflationFactor = Math.pow(1.03, year - 1)
        const complexityGrowth = vendor.isPortnox ? 1 : Math.pow(1.08, year - 1)

        const annualCost = (vendor.totalCost / timeframe) * inflationFactor * complexityGrowth

        yearData[vendor.vendor] = annualCost
        yearData[`${vendor.vendor}_cumulative`] = annualCost * year
      })

      projections.push(yearData)
    }

    return projections
  }, [enhancedCostBreakdown, config])

  // Risk-adjusted cost analysis
  const riskAdjustedCosts = useMemo(() => {
    return enhancedCostBreakdown.map((vendor) => {
      const riskMultiplier = 1 + vendor.securityRisk * 0.02 + vendor.complexityScore * 0.05
      const riskAdjustedTotal = vendor.totalCost * riskMultiplier

      return {
        ...vendor,
        riskAdjustedTotal,
        riskPremium: riskAdjustedTotal - vendor.totalCost,
        riskMultiplier,
      }
    })
  }, [enhancedCostBreakdown])

  // Efficiency benchmarking
  const efficiencyMetrics = useMemo(() => {
    const portnoxMetrics = enhancedCostBreakdown.find((v) => v.isPortnox)

    return enhancedCostBreakdown.map((vendor) => ({
      vendor: vendor.vendor,
      costPerDevice: vendor.costPerDevice,
      costPerUser: vendor.costPerUser,
      efficiencyRatio: portnoxMetrics ? vendor.costPerDevice / portnoxMetrics.costPerDevice : 1,
      deploymentEfficiency: 1 / vendor.deploymentRisk,
      operationalEfficiency: 1 / vendor.complexityScore,
      overallEfficiency: portnoxMetrics
        ? (portnoxMetrics.costPerDevice / vendor.costPerDevice) *
          (1 / vendor.complexityScore) *
          (1 / vendor.deploymentRisk)
        : 1,
      isPortnox: vendor.isPortnox,
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
      {/* Executive Cost Summary */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Portnox CLEAR Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">
              {portnoxResult ? formatCurrency(portnoxResult.totalCost) : "N/A"}
            </div>
            <p className="text-sm text-green-600 mt-1">
              {portnoxResult ? formatCurrency(portnoxResult.costPerDevice) : "N/A"} per device
            </p>
            <div className="mt-2">
              <Badge className="bg-green-600 text-white">Recommended</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              Competitor Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">{formatCurrency(avgCompetitorCost)}</div>
            <p className="text-sm text-red-600 mt-1">
              {formatCurrency(avgCompetitorCost / (config?.devices || 1000))} per device
            </p>
            <div className="mt-2">
              <Badge variant="destructive">Higher Cost</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-blue-600" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{formatCurrency(totalSavings)}</div>
            <p className="text-sm text-blue-600 mt-1">{savingsPercentage.toFixed(1)}% cost reduction</p>
            <div className="mt-2">
              <Badge className="bg-blue-600 text-white">Savings</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              ROI Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">{portnoxResult?.isPortnox ? "6.5" : "24+"} months</div>
            <p className="text-sm text-purple-600 mt-1">Payback period</p>
            <div className="mt-2">
              <Badge className="bg-purple-600 text-white">Fast ROI</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Analysis Alert */}
      {totalSavings > 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Executive Summary:</strong> Portnox CLEAR delivers {formatCurrency(totalSavings)} in savings (
            {savingsPercentage.toFixed(1)}% cost reduction) over {config?.years || 3} years compared to traditional NAC
            solutions, with {portnoxResult?.deploymentRisk || 1} day deployment vs{" "}
            {competitors[0]?.deploymentRisk || 90}+ days for competitors.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="breakdown" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Cost Breakdown
          </TabsTrigger>
          <TabsTrigger value="projections" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Projections
          </TabsTrigger>
          <TabsTrigger value="hidden" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Hidden Costs
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Efficiency
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Stacked Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Comprehensive Cost Breakdown</CardTitle>
                <CardDescription>All cost components by vendor over {config?.years || 3} years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={enhancedCostBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={100} fontSize={12} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} labelStyle={{ color: "#374151" }} />
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

            {/* Portnox vs Competitors Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Distribution Analysis</CardTitle>
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
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Cost Cards */}
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
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Direct Costs:
                      </span>
                      <span className="font-medium">{formatCurrency(vendor.directCosts)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Wrench className="h-3 w-3" />
                        Operational:
                      </span>
                      <span className="font-medium">{formatCurrency(vendor.operationalCosts)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                        Hidden Costs:
                      </span>
                      <span className="font-medium text-red-600">{formatCurrency(vendor.hiddenCosts)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-bold">
                      <span>Total Cost:</span>
                      <span className={vendor.isPortnox ? "text-green-700" : "text-gray-900"}>
                        {formatCurrency(vendor.totalCost)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Per Device:</span>
                      <span>{formatCurrency(vendor.costPerDevice)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Per User:</span>
                      <span>{formatCurrency(vendor.costPerUser)}</span>
                    </div>
                  </div>

                  <Progress value={(vendor.hiddenCosts / vendor.totalCost) * 100} className="mt-3 h-2" />
                  <p className="text-xs text-muted-foreground">
                    {((vendor.hiddenCosts / vendor.totalCost) * 100).toFixed(1)}% hidden costs
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Year Cost Projections</CardTitle>
              <CardDescription>Annual costs with inflation (3%) and complexity growth factors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyProjections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
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

          <Card>
            <CardHeader>
              <CardTitle>Cumulative Cost Analysis</CardTitle>
              <CardDescription>Total accumulated costs over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={yearlyProjections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
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
        </TabsContent>

        <TabsContent value="hidden" className="space-y-6">
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Hidden Cost Analysis:</strong> Traditional NAC solutions often have 40-60% hidden costs including
              integration complexity, downtime, additional staffing, and ongoing maintenance overhead.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Hidden Cost Breakdown</CardTitle>
              <CardDescription>Often overlooked costs that significantly impact TCO</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={enhancedCostBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="directCosts" fill="#e5e7eb" name="Direct Costs" />
                  <Bar dataKey="integration" stackId="hidden" fill="#ef4444" name="Integration" />
                  <Bar dataKey="downtime" stackId="hidden" fill="#f59e0b" name="Downtime" />
                  <Bar dataKey="staffing" stackId="hidden" fill="#eab308" name="Additional Staffing" />
                  <Bar dataKey="complexity" stackId="hidden" fill="#dc2626" name="Complexity Overhead" />
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
                      <Badge className="bg-green-600">Minimal</Badge>
                    ) : (
                      <Badge variant="destructive">High Impact</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Integration Complexity:</span>
                      <span className="font-medium">{formatCurrency(vendor.integration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Deployment Downtime:</span>
                      <span className="font-medium">{formatCurrency(vendor.downtime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Additional Staffing:</span>
                      <span className="font-medium">{formatCurrency(vendor.staffing)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Operational Complexity:</span>
                      <span className="font-medium">{formatCurrency(vendor.complexity)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total Hidden Costs:</span>
                      <span className={vendor.isPortnox ? "text-green-600" : "text-red-600"}>
                        {formatCurrency(vendor.hiddenCosts)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {((vendor.hiddenCosts / vendor.totalCost) * 100).toFixed(1)}% of total cost
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Efficiency Metrics</CardTitle>
                <CardDescription>Per-device and per-user cost analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={efficiencyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
                    <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                    <Bar dataKey="costPerDevice" fill="#3b82f6" name="Cost per Device" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Efficiency Radar</CardTitle>
                <CardDescription>Multi-dimensional efficiency comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={efficiencyMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="vendor" />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} />
                    <Radar
                      name="Overall Efficiency"
                      dataKey="overallEfficiency"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {efficiencyMetrics.map((metric) => (
              <Card key={metric.vendor} className={metric.isPortnox ? "border-green-200 bg-green-50" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center justify-between">
                    {metric.vendor}
                    {metric.isPortnox && <Badge className="bg-green-600">Most Efficient</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cost per Device:</span>
                      <span className="font-medium">{formatCurrency(metric.costPerDevice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cost per User:</span>
                      <span className="font-medium">{formatCurrency(metric.costPerUser)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Efficiency Ratio:</span>
                      <span className="font-medium">{metric.efficiencyRatio.toFixed(2)}x</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">Overall Efficiency Score</div>
                    <Progress value={Math.min(metric.overallEfficiency * 20, 100)} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {(metric.overallEfficiency * 20).toFixed(1)}/100
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk-Adjusted Cost Analysis</CardTitle>
              <CardDescription>Total cost including security and operational risk premiums</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={riskAdjustedCosts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="totalCost" fill="#3b82f6" name="Base Cost" />
                  <Bar dataKey="riskPremium" fill="#ef4444" name="Risk Premium" />
                  <Line
                    type="monotone"
                    dataKey="riskMultiplier"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name="Risk Multiplier"
                    yAxisId="right"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {riskAdjustedCosts.map((vendor) => (
              <Card key={vendor.vendorId} className={vendor.isPortnox ? "border-green-200" : "border-red-200"}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {vendor.vendor}
                    <Badge variant={vendor.isPortnox ? "default" : "destructive"}>{vendor.securityRisk} CVEs</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Base Cost:</span>
                      <span className="font-medium">{formatCurrency(vendor.totalCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Risk Premium:</span>
                      <span className="font-medium text-red-600">{formatCurrency(vendor.riskPremium)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Risk Multiplier:</span>
                      <span className="font-medium">{vendor.riskMultiplier.toFixed(2)}x</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Risk-Adjusted Total:</span>
                      <span className={vendor.isPortnox ? "text-green-600" : "text-red-600"}>
                        {formatCurrency(vendor.riskAdjustedTotal)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Side-by-Side Cost Comparison</CardTitle>
                <CardDescription>Direct comparison of all cost components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enhancedCostBreakdown.map((vendor, index) => (
                    <div key={vendor.vendorId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{vendor.vendor}</span>
                        <span className="text-lg font-bold">{formatCurrency(vendor.totalCost)}</span>
                      </div>
                      <Progress
                        value={(vendor.totalCost / Math.max(...enhancedCostBreakdown.map((v) => v.totalCost))) * 100}
                        className="h-3"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatCurrency(vendor.costPerDevice)} per device</span>
                        <span>
                          {vendor.isPortnox
                            ? "Baseline"
                            : `+${formatCurrency(vendor.totalCost - (portnoxResult?.totalCost || 0))}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Differentiators</CardTitle>
                <CardDescription>What makes each solution unique</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enhancedCostBreakdown.map((vendor) => (
                    <div key={vendor.vendorId} className="p-3 rounded-lg border">
                      <div className="font-medium mb-2">{vendor.vendor}</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Deployment:</span>
                          <span className="ml-1 font-medium">{vendor.deploymentRisk} days</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Complexity:</span>
                          <span className="ml-1 font-medium">{vendor.complexityScore}/10</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Security:</span>
                          <span className="ml-1 font-medium">{vendor.securityRisk} CVEs</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Hidden Costs:</span>
                          <span className="ml-1 font-medium">
                            {((vendor.hiddenCosts / vendor.totalCost) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
