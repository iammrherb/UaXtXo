"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
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
  LineChart,
  Line,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Users,
  Server,
  Shield,
  Zap,
  Download,
  Eye,
  Calculator,
} from "lucide-react"
import { calculateTCO, type CalculationResult } from "@/lib/enhanced-tco-calculator"

interface DetailedCostsViewProps {
  results?: CalculationResult[]
  configuration?: {
    devices: number
    years: number
    industry: string
    orgSize: string
  }
}

// Safe utility functions
function safeString(value: any): string {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  if (typeof value === "number") return value.toString()
  if (typeof value === "boolean") return value.toString()
  return String(value)
}

function safeNumber(value: any, defaultValue = 0): number {
  if (value === null || value === undefined) return defaultValue
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? defaultValue : num
}

function safeLocaleString(value: any): string {
  const num = safeNumber(value, 0)
  try {
    return num.toLocaleString()
  } catch (error) {
    return num.toString()
  }
}

function formatCurrency(amount: any): string {
  const num = safeNumber(amount, 0)
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  } catch (error) {
    return `$${num.toString()}`
  }
}

function getSafeVendorName(vendor: any): string {
  const vendorStr = safeString(vendor)
  if (!vendorStr) return "Unknown Vendor"

  try {
    return vendorStr.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  } catch (error) {
    return vendorStr || "Unknown Vendor"
  }
}

const COLORS = ["#00D4AA", "#1B2951", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#10B981", "#F97316"]

export default function DetailedCostsView({ results = [], configuration }: DetailedCostsViewProps) {
  const [selectedVendor, setSelectedVendor] = useState<string>("")
  const [viewMode, setViewMode] = useState<"summary" | "breakdown" | "comparison">("summary")

  // Generate sample data if no results provided
  const sampleResults = useMemo(() => {
    if (results.length > 0) return results

    const deviceCount = config?.deviceCount || 5000
    const timeframe = config?.timeframe || 3

    return [
      calculateTCO("PORTNOX", deviceCount, timeframe, "HEALTHCARE", "LARGE"),
      calculateTCO("CISCO_ISE", deviceCount, timeframe, "HEALTHCARE", "LARGE"),
      calculateTCO("ARUBA_CLEARPASS", deviceCount, timeframe, "HEALTHCARE", "LARGE"),
      calculateTCO("FORESCOUT", deviceCount, timeframe, "HEALTHCARE", "LARGE"),
    ]
  }, [results, config])

  // Safe data processing
  const processedResults = useMemo(() => {
    return sampleResults.map((result) => ({
      ...result,
      vendor: getSafeVendorName(result.vendor),
      totalCost: safeNumber(result.totalCost, 0),
      yearlyBreakdown: (result.yearlyBreakdown || []).map((year) => ({
        ...year,
        total: safeNumber(year.total, 0),
        licensing: safeNumber(year.licensing, 0),
        hardware: safeNumber(year.hardware, 0),
        services: safeNumber(year.services, 0),
        maintenance: safeNumber(year.maintenance, 0),
      })),
      costBreakdown: {
        licensing: safeNumber(result.costBreakdown?.licensing, 0),
        hardware: safeNumber(result.costBreakdown?.hardware, 0),
        services: safeNumber(result.costBreakdown?.services, 0),
        maintenance: safeNumber(result.costBreakdown?.maintenance, 0),
        training: safeNumber(result.costBreakdown?.training, 0),
        support: safeNumber(result.costBreakdown?.support, 0),
      },
    }))
  }, [sampleResults])

  // Chart data preparation
  const comparisonData = useMemo(() => {
    return processedResults.map((result) => ({
      vendor: result.vendor,
      totalCost: result.totalCost,
      licensing: result.costBreakdown.licensing,
      hardware: result.costBreakdown.hardware,
      services: result.costBreakdown.services,
      maintenance: result.costBreakdown.maintenance,
      training: result.costBreakdown.training,
      support: result.costBreakdown.support,
    }))
  }, [processedResults])

  const yearlyData = useMemo(() => {
    if (processedResults.length === 0) return []

    const years = processedResults[0].yearlyBreakdown.length
    return Array.from({ length: years }, (_, index) => {
      const yearData: any = { year: `Year ${index + 1}` }
      processedResults.forEach((result) => {
        const yearBreakdown = result.yearlyBreakdown[index]
        if (yearBreakdown) {
          yearData[result.vendor] = yearBreakdown.total
        }
      })
      return yearData
    })
  }, [processedResults])

  const selectedVendorData = useMemo(() => {
    if (!selectedVendor) return processedResults[0] || null
    return processedResults.find((r) => r.vendor === selectedVendor) || processedResults[0] || null
  }, [selectedVendor, processedResults])

  const pieData = useMemo(() => {
    if (!selectedVendorData) return []

    return [
      { name: "Licensing", value: selectedVendorData.costBreakdown.licensing, color: COLORS[0] },
      { name: "Hardware", value: selectedVendorData.costBreakdown.hardware, color: COLORS[1] },
      { name: "Services", value: selectedVendorData.costBreakdown.services, color: COLORS[2] },
      { name: "Maintenance", value: selectedVendorData.costBreakdown.maintenance, color: COLORS[3] },
      { name: "Training", value: selectedVendorData.costBreakdown.training, color: COLORS[4] },
      { name: "Support", value: selectedVendorData.costBreakdown.support, color: COLORS[5] },
    ].filter((item) => item.value > 0)
  }, [selectedVendorData])

  // Calculate savings and metrics
  const portnoxResult = processedResults.find((r) => r.vendor.includes("Portnox") || r.vendor.includes("PORTNOX"))
  const savings = useMemo(() => {
    if (!portnoxResult) return []

    return processedResults
      .filter((r) => r.vendor !== portnoxResult.vendor)
      .map((result) => ({
        vendor: result.vendor,
        savings: result.totalCost - portnoxResult.totalCost,
        percentage: ((result.totalCost - portnoxResult.totalCost) / result.totalCost) * 100,
      }))
      .sort((a, b) => b.savings - a.savings)
  }, [processedResults, portnoxResult])

  if (processedResults.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Cost Data Available</h3>
          <p className="text-muted-foreground">Please run a TCO analysis to view detailed costs.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Detailed Cost Analysis
          </h2>
          <p className="text-muted-foreground">Comprehensive breakdown of Total Cost of Ownership across all vendors</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Analysis
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Lowest TCO</p>
                <p className="text-2xl font-bold text-green-900">
                  {formatCurrency(Math.min(...processedResults.map((r) => r.totalCost)))}
                </p>
                <p className="text-xs text-green-600">
                  {
                    processedResults.find((r) => r.totalCost === Math.min(...processedResults.map((r) => r.totalCost)))
                      ?.vendor
                  }
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Average TCO</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(processedResults.reduce((sum, r) => sum + r.totalCost, 0) / processedResults.length)}
                </p>
                <p className="text-xs text-blue-600">{config?.timeframe || 3}-year analysis</p>
              </div>
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Max Savings</p>
                <p className="text-2xl font-bold text-purple-900">
                  {savings.length > 0 ? formatCurrency(savings[0].savings) : "$0"}
                </p>
                <p className="text-xs text-purple-600">
                  {savings.length > 0 ? `vs ${savings[0].vendor}` : "No comparison"}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Cost Range</p>
                <p className="text-2xl font-bold text-orange-900">
                  {Math.round(
                    ((Math.max(...processedResults.map((r) => r.totalCost)) -
                      Math.min(...processedResults.map((r) => r.totalCost))) /
                      Math.min(...processedResults.map((r) => r.totalCost))) *
                      100,
                  )}
                  %
                </p>
                <p className="text-xs text-orange-600">Variation across vendors</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Cost Summary</TabsTrigger>
          <TabsTrigger value="breakdown">Detailed Breakdown</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
        </TabsList>

        {/* Cost Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* TCO Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Total Cost of Ownership Comparison</CardTitle>
                <CardDescription>{config?.timeframe || 3}-Year TCO Analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="totalCost" fill="#00D4AA" name="Total Cost" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Savings Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Potential Savings Analysis</CardTitle>
                <CardDescription>Savings compared to Portnox CLEAR</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {savings.map((saving, index) => (
                  <div key={saving.vendor} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{saving.vendor}</span>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{formatCurrency(saving.savings)}</div>
                        <div className="text-sm text-muted-foreground">{saving.percentage.toFixed(1)}% savings</div>
                      </div>
                    </div>
                    <Progress value={Math.min(saving.percentage, 100)} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Yearly Trend Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Multi-Year Cost Trends</CardTitle>
              <CardDescription>Annual cost progression across vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  {processedResults.map((result, index) => (
                    <Line
                      key={result.vendor}
                      type="monotone"
                      dataKey={result.vendor}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detailed Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="flex gap-2 mb-4">
            {processedResults.map((result) => (
              <Button
                key={result.vendor}
                variant={selectedVendor === result.vendor ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedVendor(result.vendor)}
              >
                {result.vendor}
              </Button>
            ))}
          </div>

          {selectedVendorData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cost Breakdown Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{selectedVendorData.vendor} - Cost Breakdown</CardTitle>
                  <CardDescription>Distribution of costs by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Detailed Cost Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Cost Category Details</CardTitle>
                  <CardDescription>Breakdown by cost component</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(selectedVendorData.costBreakdown).map(([category, amount]) => {
                    const percentage = (amount / selectedVendorData.totalCost) * 100
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {category === "licensing" && <Shield className="h-4 w-4 text-blue-500" />}
                            {category === "hardware" && <Server className="h-4 w-4 text-gray-500" />}
                            {category === "services" && <Users className="h-4 w-4 text-green-500" />}
                            {category === "maintenance" && <Zap className="h-4 w-4 text-orange-500" />}
                            {category === "training" && <Users className="h-4 w-4 text-purple-500" />}
                            {category === "support" && <CheckCircle className="h-4 w-4 text-red-500" />}
                            <span className="font-medium capitalize">{category}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{formatCurrency(amount)}</div>
                            <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Yearly Breakdown Table */}
          {selectedVendorData && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedVendorData.vendor} - Annual Cost Progression</CardTitle>
                <CardDescription>Year-over-year cost breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-right p-2">Licensing</th>
                        <th className="text-right p-2">Hardware</th>
                        <th className="text-right p-2">Services</th>
                        <th className="text-right p-2">Maintenance</th>
                        <th className="text-right p-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedVendorData.yearlyBreakdown.map((year, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">Year {index + 1}</td>
                          <td className="text-right p-2">{formatCurrency(year.licensing)}</td>
                          <td className="text-right p-2">{formatCurrency(year.hardware)}</td>
                          <td className="text-right p-2">{formatCurrency(year.services)}</td>
                          <td className="text-right p-2">{formatCurrency(year.maintenance)}</td>
                          <td className="text-right p-2 font-bold">{formatCurrency(year.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Vendor Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          {/* Stacked Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Component Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of cost categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="licensing" stackId="a" fill={COLORS[0]} name="Licensing" />
                  <Bar dataKey="hardware" stackId="a" fill={COLORS[1]} name="Hardware" />
                  <Bar dataKey="services" stackId="a" fill={COLORS[2]} name="Services" />
                  <Bar dataKey="maintenance" stackId="a" fill={COLORS[3]} name="Maintenance" />
                  <Bar dataKey="training" stackId="a" fill={COLORS[4]} name="Training" />
                  <Bar dataKey="support" stackId="a" fill={COLORS[5]} name="Support" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Vendor Comparison</CardTitle>
              <CardDescription>Complete cost breakdown across all vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Vendor</th>
                      <th className="text-right p-3">Total TCO</th>
                      <th className="text-right p-3">Licensing</th>
                      <th className="text-right p-3">Hardware</th>
                      <th className="text-right p-3">Services</th>
                      <th className="text-right p-3">Maintenance</th>
                      <th className="text-right p-3">Training</th>
                      <th className="text-right p-3">Support</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processedResults.map((result, index) => (
                      <tr key={result.vendor} className={`border-b ${index === 0 ? "bg-green-50" : ""}`}>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={index === 0 ? "default" : "secondary"}>{result.vendor}</Badge>
                            {index === 0 && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                        </td>
                        <td className="text-right p-3 font-bold">{formatCurrency(result.totalCost)}</td>
                        <td className="text-right p-3">{formatCurrency(result.costBreakdown.licensing)}</td>
                        <td className="text-right p-3">{formatCurrency(result.costBreakdown.hardware)}</td>
                        <td className="text-right p-3">{formatCurrency(result.costBreakdown.services)}</td>
                        <td className="text-right p-3">{formatCurrency(result.costBreakdown.maintenance)}</td>
                        <td className="text-right p-3">{formatCurrency(result.costBreakdown.training)}</td>
                        <td className="text-right p-3">{formatCurrency(result.costBreakdown.support)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Cost Efficiency Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost per Device Analysis</CardTitle>
                <CardDescription>Annual cost per managed device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processedResults.map((result, index) => {
                    const costPerDevice = result.totalCost / (config?.timeframe || 3) / (config?.deviceCount || 5000)
                    return (
                      <div key={result.vendor} className="flex justify-between items-center">
                        <span className="font-medium">{result.vendor}</span>
                        <div className="text-right">
                          <div className="font-bold">{formatCurrency(costPerDevice)}</div>
                          <div className="text-sm text-muted-foreground">per device/year</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Comparison</CardTitle>
                <CardDescription>Return on investment vs Portnox</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savings.map((saving) => {
                    const roi = (saving.savings / (portnoxResult?.totalCost || 1)) * 100
                    return (
                      <div key={saving.vendor} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{saving.vendor}</span>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{roi.toFixed(0)}% ROI</div>
                            <div className="text-sm text-muted-foreground">{formatCurrency(saving.savings)} saved</div>
                          </div>
                        </div>
                        <Progress value={Math.min(roi, 100)} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
