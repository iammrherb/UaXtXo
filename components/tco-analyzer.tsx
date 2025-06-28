"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, DollarSign, Clock, Shield, AlertTriangle, CheckCircle, BarChart3, Download } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface TCOAnalyzerProps {
  results: CalculationResult[]
  configuration: CalculationConfiguration
  onConfigurationChange: (config: Partial<CalculationConfiguration>) => void
  selectedVendors: string[]
  onVendorSelectionChange: (vendors: string[]) => void
  isLoading?: boolean
}

const CHART_COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4", "#84CC16", "#F97316"]

const COST_CATEGORIES = [
  { key: "licensing", name: "Licensing", color: "#3B82F6" },
  { key: "hardware", name: "Hardware", color: "#EF4444" },
  { key: "implementation", name: "Implementation", color: "#10B981" },
  { key: "support", name: "Support", color: "#8B5CF6" },
  { key: "training", name: "Training", color: "#F59E0B" },
  { key: "maintenance", name: "Maintenance", color: "#06B6D4" },
  { key: "hidden", name: "Hidden Costs", color: "#84CC16" },
]

export default function TCOAnalyzer({
  results,
  configuration,
  onConfigurationChange,
  selectedVendors,
  onVendorSelectionChange,
  isLoading = false,
}: TCOAnalyzerProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Memoized calculations
  const analysisData = useMemo(() => {
    if (!results || results.length === 0) return null

    // Find Portnox and best competitor
    const portnoxResult = results.find((r) => r.vendor === "portnox")
    const competitorResults = results.filter((r) => r.vendor !== "portnox")
    const bestCompetitor = competitorResults.reduce((best, current) =>
      !best || current.total < best.total ? current : best,
    )

    // Calculate savings
    const savings = bestCompetitor ? bestCompetitor.total - (portnoxResult?.total || 0) : 0
    const savingsPercentage = bestCompetitor ? (savings / bestCompetitor.total) * 100 : 0

    // Prepare chart data
    const costComparisonData = results.map((result, index) => ({
      vendor: result.name,
      total: Math.round(result.total),
      licensing: Math.round(result.breakdown.licensing),
      hardware: Math.round(result.breakdown.hardware),
      implementation: Math.round(result.breakdown.implementation),
      support: Math.round(result.breakdown.support),
      training: Math.round(result.breakdown.training),
      maintenance: Math.round(result.breakdown.maintenance),
      hidden: Math.round(result.breakdown.hidden),
      roi: result.roi.percentage,
      payback: result.roi.paybackMonths,
      color: CHART_COLORS[index % CHART_COLORS.length],
    }))

    // Timeline data
    const timelineData = []
    const maxYears = Math.max(...results.map((r) => r.yearlyBreakdown.length))

    for (let year = 1; year <= maxYears; year++) {
      const yearData: any = { year: `Year ${year}` }
      results.forEach((result) => {
        const yearBreakdown = result.yearlyBreakdown.find((y) => y.year === year)
        yearData[result.name] = yearBreakdown ? Math.round(yearBreakdown.cumulative) : 0
      })
      timelineData.push(yearData)
    }

    // ROI comparison data
    const roiData = results.map((result) => ({
      vendor: result.name,
      roi: result.roi.percentage,
      payback: result.roi.paybackMonths,
      npv: Math.round(result.roi.netPresentValue),
      savings: Math.round(result.roi.savings),
    }))

    // Risk assessment data
    const riskData = results.map((result) => ({
      vendor: result.name,
      complexity: result.riskFactors.complexity,
      vendorRisk: result.riskFactors.vendor,
      technology: result.riskFactors.technology,
      implementation: result.riskFactors.implementation,
      overall: Math.round(
        (result.riskFactors.complexity +
          result.riskFactors.vendor +
          result.riskFactors.technology +
          result.riskFactors.implementation) /
          4,
      ),
    }))

    return {
      portnoxResult,
      bestCompetitor,
      savings,
      savingsPercentage,
      costComparisonData,
      timelineData,
      roiData,
      riskData,
    }
  }, [results])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analysisData) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Analysis Data</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Select vendors and configure parameters to see TCO analysis.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Portnox Savings</p>
                <p className="text-2xl font-bold text-green-600">${analysisData.savings.toLocaleString()}</p>
                <p className="text-xs text-gray-500">
                  {analysisData.savingsPercentage.toFixed(1)}% less than competitors
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Portnox ROI</p>
                <p className="text-2xl font-bold text-blue-600">{analysisData.portnoxResult?.roi.percentage || 0}%</p>
                <p className="text-xs text-gray-500">
                  {analysisData.portnoxResult?.roi.paybackMonths || 0} month payback
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Deployment Time</p>
                <p className="text-2xl font-bold text-purple-600">2-4 weeks</p>
                <p className="text-xs text-gray-500">vs 6-12 months competitors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Risk Score</p>
                <p className="text-2xl font-bold text-green-600">Low</p>
                <p className="text-xs text-gray-500">Minimal implementation risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Cost Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Total Cost of Ownership Comparison</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {configuration.years}-year TCO analysis for {configuration.devices.toLocaleString()} devices
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={analysisData.costComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis yAxisId="cost" orientation="left" />
                    <YAxis yAxisId="roi" orientation="right" />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === "roi" ? `${value}%` : `$${value.toLocaleString()}`,
                        name === "roi" ? "ROI" : "Total Cost",
                      ]}
                    />
                    <Legend />
                    <Bar yAxisId="cost" dataKey="total" fill="#3B82F6" name="Total Cost" />
                    <Line yAxisId="roi" type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={3} name="ROI %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={COST_CATEGORIES.map((category) => ({
                          name: category.name,
                          value:
                            analysisData.portnoxResult?.breakdown[
                              category.key as keyof typeof analysisData.portnoxResult.breakdown
                            ] || 0,
                          color: category.color,
                        }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {COST_CATEGORIES.map((category, index) => (
                          <Cell key={`cell-${index}`} fill={category.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Cost"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendor Comparison Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.costComparisonData.map((vendor, index) => (
                    <div key={vendor.vendor} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: vendor.color }}></div>
                        <div>
                          <p className="font-medium">{vendor.vendor}</p>
                          <p className="text-sm text-gray-500">${vendor.total.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={vendor.roi > 0 ? "default" : "destructive"} className="mb-1">
                          {vendor.roi}% ROI
                        </Badge>
                        <p className="text-xs text-gray-500">{vendor.payback}mo payback</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Cost Timeline</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                How costs accumulate over the {configuration.years}-year period
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analysisData.timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Cumulative Cost"]} />
                    <Legend />
                    {results.map((result, index) => (
                      <Area
                        key={result.vendor}
                        type="monotone"
                        dataKey={result.name}
                        stackId="1"
                        stroke={CHART_COLORS[index]}
                        fill={CHART_COLORS[index]}
                        fillOpacity={0.6}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Annual Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Annual Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Vendor</th>
                      {Array.from({ length: configuration.years }, (_, i) => (
                        <th key={i} className="text-left p-3">
                          Year {i + 1}
                        </th>
                      ))}
                      <th className="text-left p-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.vendor} className="border-b">
                        <td className="p-3 font-medium">{result.name}</td>
                        {result.yearlyBreakdown.map((year) => (
                          <td key={year.year} className="p-3">
                            ${year.cost.toLocaleString()}
                          </td>
                        ))}
                        <td className="p-3 font-bold">${result.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI Tab */}
        <TabsContent value="roi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Return on Investment Analysis</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expected returns and payback periods for each solution
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={analysisData.roiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis yAxisId="roi" orientation="left" />
                    <YAxis yAxisId="payback" orientation="right" />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === "payback" ? `${value} months` : `${value}%`,
                        name === "payback" ? "Payback Period" : "ROI",
                      ]}
                    />
                    <Legend />
                    <Bar yAxisId="roi" dataKey="roi" fill="#10B981" name="ROI %" />
                    <Line
                      yAxisId="payback"
                      type="monotone"
                      dataKey="payback"
                      stroke="#EF4444"
                      strokeWidth={3}
                      name="Payback (months)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* ROI Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysisData.roiData.map((vendor) => (
              <Card key={vendor.vendor}>
                <CardHeader>
                  <CardTitle className="text-lg">{vendor.vendor}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">ROI</p>
                      <p className="text-2xl font-bold text-green-600">{vendor.roi}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payback</p>
                      <p className="text-2xl font-bold text-blue-600">{vendor.payback}mo</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">NPV</p>
                      <p className="text-lg font-medium">${vendor.npv.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Savings</p>
                      <p className="text-lg font-medium">${vendor.savings.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Risk Tab */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Implementation and operational risk factors (1=Low, 10=High)
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={analysisData.riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="complexity" fill="#EF4444" name="Complexity" />
                    <Bar dataKey="vendorRisk" fill="#F59E0B" name="Vendor Risk" />
                    <Bar dataKey="technology" fill="#8B5CF6" name="Technology" />
                    <Bar dataKey="implementation" fill="#06B6D4" name="Implementation" />
                    <Line type="monotone" dataKey="overall" stroke="#10B981" strokeWidth={3} name="Overall Risk" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisData.riskData.map((vendor) => (
              <Card key={vendor.vendor}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {vendor.overall <= 3 ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : vendor.overall <= 6 ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                    {vendor.vendor}
                  </CardTitle>
                  <Badge variant={vendor.overall <= 3 ? "default" : vendor.overall <= 6 ? "secondary" : "destructive"}>
                    {vendor.overall <= 3 ? "Low Risk" : vendor.overall <= 6 ? "Medium Risk" : "High Risk"}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Complexity</span>
                      <span>{vendor.complexity}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(vendor.complexity / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Vendor Risk</span>
                      <span>{vendor.vendorRisk}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(vendor.vendorRisk / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Technology</span>
                      <span>{vendor.technology}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(vendor.technology / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Implementation</span>
                      <span>{vendor.implementation}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: `${(vendor.implementation / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
