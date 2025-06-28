"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  Treemap,
} from "recharts"
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Calculator,
  Download,
  Eye,
  EyeOff,
  AlertTriangle,
  Info,
  Zap,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface DetailedCostBreakdownProps {
  results: CalculationResult[]
  configuration: CalculationConfiguration
  selectedVendors: string[]
}

const COST_COLORS = {
  Software: "#10B981",
  Hardware: "#3B82F6",
  Implementation: "#8B5CF6",
  Support: "#F59E0B",
  Operations: "#EF4444",
  Hidden: "#6B7280",
}

export default function DetailedCostBreakdown({
  results = [],
  configuration,
  selectedVendors = [],
}: DetailedCostBreakdownProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showHiddenCosts, setShowHiddenCosts] = useState(true)
  const [selectedVendor, setSelectedVendor] = useState(results[0]?.vendor || "portnox")

  // Memoize cost calculations
  const costData = useMemo(() => {
    const safeResults = results.filter((result) => result && result.breakdown)

    // Prepare data for different chart types
    const barChartData = safeResults.map((result) => {
      const data: any = { vendor: result.vendorName || result.vendor }
      result.breakdown?.forEach((item) => {
        data[item.name] = item.value
      })
      return data
    })

    // Year-over-year projection
    const yearlyData = Array.from({ length: configuration.years || 3 }, (_, yearIndex) => {
      const year = yearIndex + 1
      const yearData: any = { year: `Year ${year}` }

      safeResults.forEach((result) => {
        const annualCost = (result.total || 0) / (configuration.years || 3)
        yearData[result.vendor] = annualCost * year
      })

      return yearData
    })

    // Cost category breakdown for selected vendor
    const selectedResult = safeResults.find((r) => r.vendor === selectedVendor)
    const pieData =
      selectedResult?.breakdown?.map((item) => ({
        name: item.name,
        value: item.value,
        percentage: item.percentage,
        color: COST_COLORS[item.name as keyof typeof COST_COLORS] || "#6B7280",
      })) || []

    // Treemap data for cost visualization
    const treemapData =
      selectedResult?.breakdown?.map((item) => ({
        name: item.name,
        size: item.value,
        fill: COST_COLORS[item.name as keyof typeof COST_COLORS] || "#6B7280",
      })) || []

    // Hidden costs analysis
    const hiddenCostsData = safeResults.map((result) => {
      const hiddenCost = result.breakdown?.find((b) => b.name === "Hidden")?.value || 0
      const visibleCosts = (result.total || 0) - hiddenCost
      return {
        vendor: result.vendorName || result.vendor,
        visible: visibleCosts,
        hidden: hiddenCost,
        total: result.total || 0,
        hiddenPercentage: ((hiddenCost / (result.total || 1)) * 100).toFixed(1),
      }
    })

    return {
      barChartData,
      yearlyData,
      pieData,
      treemapData,
      hiddenCostsData,
      safeResults,
    }
  }, [results, configuration.years, selectedVendor])

  const { barChartData, yearlyData, pieData, treemapData, hiddenCostsData, safeResults } = costData

  // Calculate savings vs competitors
  const portnoxResult = safeResults.find((r) => r.vendor === "portnox")
  const competitorResults = safeResults.filter((r) => r.vendor !== "portnox")
  const avgCompetitorCost =
    competitorResults.length > 0
      ? competitorResults.reduce((sum, r) => sum + (r.total || 0), 0) / competitorResults.length
      : 0
  const savings = portnoxResult && avgCompetitorCost > 0 ? avgCompetitorCost - portnoxResult.total : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detailed Cost Breakdown</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive TCO analysis over {configuration.years} years
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHiddenCosts(!showHiddenCosts)}
            className="gap-2 bg-transparent"
          >
            {showHiddenCosts ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showHiddenCosts ? "Hide" : "Show"} Hidden Costs
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Total Savings</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">${savings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Portnox TCO</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(portnoxResult?.total || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                <Calculator className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Competitor</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${avgCompetitorCost.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hidden Costs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {hiddenCostsData[0]?.hiddenPercentage || 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Cost Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Category Breakdown</TabsTrigger>
          <TabsTrigger value="timeline">Year-over-Year</TabsTrigger>
          <TabsTrigger value="hidden">Hidden Costs</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Total Cost Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Total Cost of Ownership Comparison</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete cost breakdown by vendor over {configuration.years} years
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                      labelStyle={{ color: "#374151" }}
                    />
                    {Object.entries(COST_COLORS).map(([category, color]) => (
                      <Bar key={category} dataKey={category} stackId="a" fill={color} name={category} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost per Device/User */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost per Device</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safeResults.map((result, index) => {
                    const costPerDevice = (result.total || 0) / (configuration.devices || 1)
                    return (
                      <div key={result.vendor} className="flex items-center justify-between">
                        <span className="font-medium">{result.vendorName || result.vendor}</span>
                        <div className="text-right">
                          <p className="font-bold">${costPerDevice.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">per device</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost per User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safeResults.map((result, index) => {
                    const costPerUser = (result.total || 0) / (configuration.users || 1)
                    return (
                      <div key={result.vendor} className="flex items-center justify-between">
                        <span className="font-medium">{result.vendorName || result.vendor}</span>
                        <div className="text-right">
                          <p className="font-bold">${costPerUser.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">per user</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Category Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          {/* Vendor Selection */}
          <div className="flex gap-2">
            {safeResults.map((result) => (
              <Button
                key={result.vendor}
                variant={selectedVendor === result.vendor ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedVendor(result.vendor)}
                className="bg-transparent"
              >
                {result.vendorName || result.vendor}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Cost Distribution - {safeResults.find((r) => r.vendor === selectedVendor)?.vendorName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Cost"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Treemap */}
            <Card>
              <CardHeader>
                <CardTitle>Cost Hierarchy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={treemapData}
                      dataKey="size"
                      ratio={4 / 3}
                      stroke="#fff"
                      content={({ root, depth, x, y, width, height, index, payload, colors, name }) => {
                        return (
                          <g>
                            <rect
                              x={x}
                              y={y}
                              width={width}
                              height={height}
                              style={{
                                fill: payload?.fill || colors,
                                stroke: "#fff",
                                strokeWidth: 2,
                                strokeOpacity: 1,
                              }}
                            />
                            {width > 60 && height > 30 && (
                              <text
                                x={x + width / 2}
                                y={y + height / 2}
                                textAnchor="middle"
                                fill="#fff"
                                fontSize="12"
                                fontWeight="bold"
                              >
                                {name}
                              </text>
                            )}
                            {width > 80 && height > 50 && (
                              <text
                                x={x + width / 2}
                                y={y + height / 2 + 15}
                                textAnchor="middle"
                                fill="#fff"
                                fontSize="10"
                              >
                                ${(payload?.size || 0).toLocaleString()}
                              </text>
                            )}
                          </g>
                        )
                      }}
                    />
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Breakdown Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Cost Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pieData.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }}></div>
                      <div>
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {
                            safeResults
                              .find((r) => r.vendor === selectedVendor)
                              ?.breakdown?.find((b) => b.name === category.name)?.description
                          }
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${category.value.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{category.percentage}% of total</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Cost Over Time</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">Year-over-year cost accumulation comparison</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                      labelStyle={{ color: "#374151" }}
                    />
                    {safeResults.map((result, index) => (
                      <Area
                        key={result.vendor}
                        type="monotone"
                        dataKey={result.vendor}
                        stackId="1"
                        stroke={Object.values(COST_COLORS)[index]}
                        fill={Object.values(COST_COLORS)[index]}
                        fillOpacity={0.6}
                        name={result.vendorName || result.vendor}
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
              <CardTitle>Annual Cost Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {safeResults.map((result) => {
                  const annualCost = (result.total || 0) / (configuration.years || 3)
                  return (
                    <div key={result.vendor} className="text-center p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{result.vendorName || result.vendor}</h4>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${annualCost.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">per year</p>
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Monthly</span>
                          <span>${(annualCost / 12).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Daily</span>
                          <span>${(annualCost / 365).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hidden Costs Tab */}
        <TabsContent value="hidden" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Hidden Cost Analysis
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Often overlooked costs that can significantly impact your TCO
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hiddenCostsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                      labelStyle={{ color: "#374151" }}
                    />
                    <Bar dataKey="visible" stackId="a" fill="#10B981" name="Visible Costs" />
                    <Bar dataKey="hidden" stackId="a" fill="#EF4444" name="Hidden Costs" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Hidden Cost Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Hidden Costs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-200">Downtime Costs</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Network outages and system failures during implementation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <Info className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-800 dark:text-orange-200">Training Overhead</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Extended training periods and productivity loss
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-800 dark:text-purple-200">Integration Complexity</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Additional tools and customizations required
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portnox Advantage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-200">Minimal Downtime</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Cloud-native deployment reduces implementation risks
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Intuitive Interface</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Reduced training time with user-friendly design
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-800 dark:text-purple-200">Native Integrations</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Pre-built connectors eliminate custom development
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hidden Cost Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Hidden Cost Impact by Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hiddenCostsData.map((vendor) => (
                  <div key={vendor.vendor} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{vendor.vendor}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Hidden costs represent {vendor.hiddenPercentage}% of total TCO
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">${vendor.hidden.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">hidden costs</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
