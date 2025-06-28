"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Line,
  AreaChart,
  Area,
  ComposedChart,
  Legend,
} from "recharts"
import {
  Calculator,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Building,
  Zap,
  Award,
  Target,
  AlertTriangle,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface TCOAnalyzerProps {
  results: CalculationResult[]
  configuration: CalculationConfiguration
  onConfigurationChange: (config: Partial<CalculationConfiguration>) => void
  selectedVendors: string[]
  onVendorSelectionChange: (vendors: string[]) => void
  isLoading: boolean
}

const COST_COLORS = {
  Software: "#10B981",
  Hardware: "#3B82F6",
  Implementation: "#8B5CF6",
  Support: "#F59E0B",
  Operations: "#EF4444",
  Hidden: "#6B7280",
}

const CHART_COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#06B6D4"]

export default function TCOAnalyzer({
  results = [],
  configuration,
  onConfigurationChange,
  selectedVendors = [],
  onVendorSelectionChange,
  isLoading,
}: TCOAnalyzerProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedMetric, setSelectedMetric] = useState("total")

  // Memoize calculations
  const analysisData = useMemo(() => {
    const safeResults = results.filter((result) => result && result.total)

    // Total cost comparison
    const totalCostData = safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor,
      total: result.total,
      software: result.breakdown?.find((b) => b.name === "Software")?.value || 0,
      hardware: result.breakdown?.find((b) => b.name === "Hardware")?.value || 0,
      implementation: result.breakdown?.find((b) => b.name === "Implementation")?.value || 0,
      support: result.breakdown?.find((b) => b.name === "Support")?.value || 0,
      operations: result.breakdown?.find((b) => b.name === "Operations")?.value || 0,
      hidden: result.breakdown?.find((b) => b.name === "Hidden")?.value || 0,
    }))

    // ROI comparison
    const roiData = safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor,
      roi: result.roi?.percentage || 0,
      payback: result.roi?.paybackMonths || 0,
      annualSavings: result.roi?.annualSavings || 0,
    }))

    // Year-over-year projection
    const yearlyProjection = Array.from({ length: configuration.years || 3 }, (_, index) => {
      const year = index + 1
      const yearData: any = { year: `Year ${year}` }

      safeResults.forEach((result) => {
        const annualCost = (result.total || 0) / (configuration.years || 3)
        yearData[result.vendor] = annualCost * year
      })

      return yearData
    })

    // Cost per device/user calculations
    const costPerDeviceData = safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor,
      costPerDevice: (result.total || 0) / (configuration.devices || 1),
      costPerUser: (result.total || 0) / (configuration.users || 1),
      costPerDevicePerMonth: (result.total || 0) / (configuration.devices || 1) / (configuration.years || 3) / 12,
    }))

    // Savings analysis
    const portnoxResult = safeResults.find((r) => r.vendor === "portnox")
    const competitorResults = safeResults.filter((r) => r.vendor !== "portnox")
    const avgCompetitorCost =
      competitorResults.length > 0
        ? competitorResults.reduce((sum, r) => sum + (r.total || 0), 0) / competitorResults.length
        : 0
    const totalSavings = portnoxResult && avgCompetitorCost > 0 ? avgCompetitorCost - portnoxResult.total : 0

    // Risk metrics
    const riskData = safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor,
      complianceScore: result.riskMetrics?.complianceScore || 0,
      securityPosture: result.riskMetrics?.operationalEfficiency || 0,
      breachReduction: result.roi?.breachReduction || 0,
    }))

    return {
      totalCostData,
      roiData,
      yearlyProjection,
      costPerDeviceData,
      totalSavings,
      riskData,
      safeResults,
    }
  }, [results, configuration])

  const { totalCostData, roiData, yearlyProjection, costPerDeviceData, totalSavings, riskData, safeResults } =
    analysisData

  // Calculate key metrics
  const portnoxResult = safeResults.find((r) => r.vendor === "portnox")
  const bestROI = Math.max(...roiData.map((r) => r.roi))
  const fastestPayback = Math.min(...roiData.map((r) => r.payback))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">TCO Analysis Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive total cost of ownership analysis for {configuration.years} years
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-2">
            <Building className="h-4 w-4" />
            {(configuration.devices || 0).toLocaleString()} devices
          </Badge>
          <Badge variant="outline" className="gap-2">
            <Users className="h-4 w-4" />
            {(configuration.users || 0).toLocaleString()} users
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Total Savings</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  ${totalSavings.toLocaleString()}
                </p>
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
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Best ROI</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{bestROI}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-800 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Fastest Payback</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{fastestPayback} months</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Cost Overview</TabsTrigger>
          <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
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
                  <BarChart data={totalCostData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                      labelStyle={{ color: "#374151" }}
                    />
                    <Legend />
                    {Object.entries(COST_COLORS).map(([category, color]) => (
                      <Bar key={category} dataKey={category.toLowerCase()} stackId="a" fill={color} name={category} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeResults.slice(0, 3).map((result, index) => (
              <Card key={result.vendor}>
                <CardHeader>
                  <CardTitle className="text-lg">{result.vendorName}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total: ${result.total.toLocaleString()}</p>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={result.breakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {result.breakdown?.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Cost"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ROI Analysis Tab */}
        <TabsContent value="roi" className="space-y-6">
          {/* ROI Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Return on Investment Comparison</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">ROI percentage and payback period analysis</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis yAxisId="left" label={{ value: "ROI (%)", angle: -90, position: "insideLeft" }} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{ value: "Payback (months)", angle: 90, position: "insideRight" }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="roi" fill="#10B981" name="ROI %" />
                    <Line
                      yAxisId="right"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safeResults.map((result, index) => (
              <Card
                key={result.vendor}
                className={index === 0 ? "border-green-200 bg-green-50 dark:bg-green-900/20" : ""}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {index === 0 && <Award className="h-5 w-5 text-green-600" />}
                    {result.vendorName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ROI</p>
                      <p className="text-xl font-bold text-green-600">{result.roi?.percentage || 0}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Payback</p>
                      <p className="text-xl font-bold">{result.roi?.paybackMonths || 0} months</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Annual Savings</p>
                    <p className="text-lg font-bold">${(result.roi?.annualSavings || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Labor Savings</p>
                    <p className="text-lg font-bold">{result.roi?.laborSavingsFTE || 0} FTE</p>
                  </div>
                  {index === 0 && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Target className="h-4 w-4" />
                      <span>Best ROI</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          {/* Cumulative Cost Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Cost Over Time</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">Year-over-year cost accumulation comparison</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={yearlyProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                      labelStyle={{ color: "#374151" }}
                    />
                    <Legend />
                    {safeResults.map((result, index) => (
                      <Area
                        key={result.vendor}
                        type="monotone"
                        dataKey={result.vendor}
                        stackId="1"
                        stroke={CHART_COLORS[index]}
                        fill={CHART_COLORS[index]}
                        fillOpacity={0.6}
                        name={result.vendorName || result.vendor}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Timeline Comparison</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time to value and deployment complexity</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {safeResults.map((result) => (
                  <div key={result.vendor} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          result.implementation.complexity === "low"
                            ? "bg-green-500"
                            : result.implementation.complexity === "medium"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <h4 className="font-medium">{result.vendorName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{result.implementation.timeToValue}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          result.implementation.complexity === "low"
                            ? "text-green-600 border-green-600"
                            : result.implementation.complexity === "medium"
                              ? "text-yellow-600 border-yellow-600"
                              : "text-red-600 border-red-600"
                        }
                      >
                        {result.implementation.complexity} complexity
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Key Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          {/* Cost per Device/User */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost per Device</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total cost divided by number of devices</p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costPerDeviceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vendor" />
                      <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
                      <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Cost per Device"]} />
                      <Bar dataKey="costPerDevice" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost per User</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total cost divided by number of users</p>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costPerDeviceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vendor" />
                      <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
                      <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Cost per User"]} />
                      <Bar dataKey="costPerUser" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk and Compliance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Risk and Compliance Metrics</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Security posture and compliance readiness scores
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="complianceScore" fill="#10B981" name="Compliance Score" />
                    <Bar dataKey="securityPosture" fill="#3B82F6" name="Security Posture" />
                    <Bar dataKey="breachReduction" fill="#8B5CF6" name="Breach Reduction %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Calculator className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Cost/Device/Month</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      $
                      {(
                        costPerDeviceData.reduce((sum, item) => sum + item.costPerDevicePerMonth, 0) /
                        costPerDeviceData.length
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Zap className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Implementation</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(
                        safeResults.reduce((sum, r) => {
                          const impl = r.breakdown?.find((b) => b.name === "Implementation")?.value || 0
                          return sum + impl
                        }, 0) / safeResults.length,
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Hidden Costs</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round(
                        safeResults.reduce((sum, r) => {
                          const hidden = r.breakdown?.find((b) => b.name === "Hidden")?.value || 0
                          return sum + hidden
                        }, 0) / safeResults.length,
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Best Value</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {safeResults.length > 0 ? safeResults[0].vendorName : "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
