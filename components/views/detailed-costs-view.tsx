"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calculator,
  PieChartIcon,
  BarChart3,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Shield,
  Server,
  Wrench,
  GraduationCap,
  HeadphonesIcon,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface DetailedCostsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

const ENHANCED_COLORS = {
  portnox: {
    primary: "#0066CC",
    secondary: "#4A90E2",
    gradient: "linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)",
    light: "#E3F2FD",
  },
  cisco: {
    primary: "#1BA0D7",
    secondary: "#049FD9",
    gradient: "linear-gradient(135deg, #1BA0D7 0%, #049FD9 100%)",
    light: "#E1F5FE",
  },
  aruba: {
    primary: "#FF6900",
    secondary: "#FF8533",
    gradient: "linear-gradient(135deg, #FF6900 0%, #FF8533 100%)",
    light: "#FFF3E0",
  },
  forescout: {
    primary: "#00A651",
    secondary: "#33B86A",
    gradient: "linear-gradient(135deg, #00A651 0%, #33B86A 100%)",
    light: "#E8F5E8",
  },
  juniper: {
    primary: "#84BD00",
    secondary: "#9ACD32",
    gradient: "linear-gradient(135deg, #84BD00 0%, #9ACD32 100%)",
    light: "#F1F8E9",
  },
  fortinet: {
    primary: "#EE3124",
    secondary: "#FF5722",
    gradient: "linear-gradient(135deg, #EE3124 0%, #FF5722 100%)",
    light: "#FFEBEE",
  },
}

const CHART_COLORS = [
  "#0066CC",
  "#1BA0D7",
  "#FF6900",
  "#00A651",
  "#84BD00",
  "#EE3124",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#00BCD4",
  "#009688",
]

export default function DetailedCostsView({ results = [], config }: DetailedCostsViewProps) {
  const costAnalysis = useMemo(() => {
    if (results.length === 0) return null

    const totalCostData = results.map((result, index) => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      totalCost: result.totalCost,
      licensing: result.breakdown.licensing,
      hardware: result.breakdown.hardware,
      implementation: result.breakdown.implementation,
      support: result.breakdown.support,
      training: result.breakdown.training,
      maintenance: result.breakdown.maintenance,
      color: CHART_COLORS[index % CHART_COLORS.length],
      isPortnox: result.vendorId === "portnox",
    }))

    const costBreakdownData = results.map((result, index) => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      "Software Licensing": result.breakdown.licensing,
      "Hardware & Infrastructure": result.breakdown.hardware,
      "Implementation Services": result.breakdown.implementation,
      "Support & Maintenance": result.breakdown.support + result.breakdown.maintenance,
      "Training & Certification": result.breakdown.training,
      color: CHART_COLORS[index % CHART_COLORS.length],
      isPortnox: result.vendorId === "portnox",
    }))

    const yearlyProjection = Array.from({ length: config?.years || 3 }, (_, year) => {
      const yearData: any = { year: `Year ${year + 1}` }
      results.forEach((result) => {
        const yearlyLicensing = result.breakdown.licensing / (config?.years || 3)
        const yearlyMaintenance = result.breakdown.maintenance / (config?.years || 3)
        const implementationCost = year === 0 ? result.breakdown.implementation : 0
        const trainingCost = year === 0 ? result.breakdown.training : 0

        yearData[result.vendorName] = yearlyLicensing + yearlyMaintenance + implementationCost + trainingCost
      })
      return yearData
    })

    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitorAverage =
      results.filter((r) => r.vendorId !== "portnox").reduce((sum, r) => sum + r.totalCost, 0) /
      Math.max(1, results.filter((r) => r.vendorId !== "portnox").length)

    const savings = portnoxResult ? competitorAverage - portnoxResult.totalCost : 0
    const savingsPercentage = portnoxResult ? Math.round((savings / competitorAverage) * 100) : 0

    return {
      totalCostData,
      costBreakdownData,
      yearlyProjection,
      portnoxResult,
      competitorAverage,
      savings,
      savingsPercentage,
    }
  }, [results, config])

  if (!costAnalysis || results.length === 0) {
    return (
      <Card className="h-96">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <Calculator className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-muted-foreground">No Cost Analysis Available</h3>
              <p className="text-sm text-muted-foreground">Please select vendors to view detailed cost breakdown</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Executive Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10" />
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              Total Investment Range
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(Math.min(...costAnalysis.totalCostData.map((d) => d.totalCost)))} -{" "}
              {formatCurrency(Math.max(...costAnalysis.totalCostData.map((d) => d.totalCost)))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{config?.years || 3} year total cost of ownership</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              Portnox Advantage
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-green-600">{costAnalysis.savingsPercentage}% Savings</div>
            <p className="text-xs text-muted-foreground mt-1">{formatCurrency(costAnalysis.savings)} total savings</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              Cost Per Device
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency((costAnalysis.portnoxResult?.totalCost || 0) / (config?.devices || 1))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Portnox per device over {config?.years || 3} years</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
          <CardHeader className="relative pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-600" />
              Market Position
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-orange-600">
              #{results.findIndex((r) => r.vendorId === "portnox") + 1}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Most cost-effective solution</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            <BarChart3 className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold text-xs">Cost Overview</div>
              <Badge variant="secondary" className="text-xs mt-1">
                Total Comparison
              </Badge>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="breakdown"
            className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            <PieChartIcon className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold text-xs">Cost Breakdown</div>
              <Badge variant="secondary" className="text-xs mt-1">
                By Category
              </Badge>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="timeline"
            className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            <TrendingUp className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold text-xs">Timeline Analysis</div>
              <Badge variant="secondary" className="text-xs mt-1">
                Year by Year
              </Badge>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="components"
            className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            <Calculator className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold text-xs">Cost Components</div>
              <Badge variant="secondary" className="text-xs mt-1">
                Detailed View
              </Badge>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="savings"
            className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-teal-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            <Zap className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold text-xs">Savings Analysis</div>
              <Badge variant="secondary" className="text-xs mt-1">
                ROI Focus
              </Badge>
            </div>
          </TabsTrigger>

          <TabsTrigger
            value="hidden"
            className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
          >
            <AlertTriangle className="h-5 w-5" />
            <div className="text-center">
              <div className="font-semibold text-xs">Hidden Costs</div>
              <Badge variant="secondary" className="text-xs mt-1">
                Risk Analysis
              </Badge>
            </div>
          </TabsTrigger>
        </TabsList>

        {/* Cost Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Total Cost Comparison
                </CardTitle>
                <CardDescription>{config?.years || 3}-year total cost of ownership across all vendors</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={costAnalysis.totalCostData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      {costAnalysis.totalCostData.map((entry, index) => (
                        <linearGradient
                          key={entry.vendorId}
                          id={`gradient-${entry.vendorId}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.3} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="totalCost"
                      fill={(entry: any) => `url(#gradient-${entry.vendorId})`}
                      radius={[4, 4, 0, 0]}
                      stroke={(entry: any) => entry.color}
                      strokeWidth={2}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  Cost Savings Analysis
                </CardTitle>
                <CardDescription>Portnox CLEAR savings compared to traditional NAC solutions</CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-6">
                {costAnalysis.totalCostData
                  .filter((d) => !d.isPortnox)
                  .map((competitor) => {
                    const portnoxCost = costAnalysis.portnoxResult?.totalCost || 0
                    const savings = competitor.totalCost - portnoxCost
                    const savingsPercent = Math.round((savings / competitor.totalCost) * 100)

                    return (
                      <div key={competitor.vendorId} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{competitor.vendor}</span>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{savingsPercent}% savings</div>
                            <div className="text-xs text-muted-foreground">{formatCurrency(savings)}</div>
                          </div>
                        </div>
                        <Progress
                          value={savingsPercent}
                          className="h-2"
                          style={{
                            background: `linear-gradient(to right, ${competitor.color}20 0%, ${competitor.color}20 ${100 - savingsPercent}%, #10b98120 ${100 - savingsPercent}%, #10b98120 100%)`,
                          }}
                        />
                      </div>
                    )
                  })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cost Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-purple-600" />
                  Cost Category Breakdown
                </CardTitle>
                <CardDescription>Detailed breakdown by cost category across vendors</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={costAnalysis.costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                    <defs>
                      <linearGradient id="licensingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                      </linearGradient>
                      <linearGradient id="hardwareGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
                      </linearGradient>
                      <linearGradient id="implementationGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.3} />
                      </linearGradient>
                      <linearGradient id="supportGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                      </linearGradient>
                      <linearGradient id="trainingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="Software Licensing"
                      stackId="a"
                      fill="url(#licensingGradient)"
                      stroke="#3b82f6"
                      strokeWidth={1}
                    />
                    <Bar
                      dataKey="Hardware & Infrastructure"
                      stackId="a"
                      fill="url(#hardwareGradient)"
                      stroke="#ef4444"
                      strokeWidth={1}
                    />
                    <Bar
                      dataKey="Implementation Services"
                      stackId="a"
                      fill="url(#implementationGradient)"
                      stroke="#f59e0b"
                      strokeWidth={1}
                    />
                    <Bar
                      dataKey="Support & Maintenance"
                      stackId="a"
                      fill="url(#supportGradient)"
                      stroke="#10b981"
                      strokeWidth={1}
                    />
                    <Bar
                      dataKey="Training & Certification"
                      stackId="a"
                      fill="url(#trainingGradient)"
                      stroke="#8b5cf6"
                      strokeWidth={1}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Cost Category Analysis
                </CardTitle>
                <CardDescription>Breakdown of major cost components by vendor</CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-4">
                {costAnalysis.totalCostData.map((vendor) => (
                  <div key={vendor.vendorId} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{vendor.vendor}</span>
                      <Badge
                        variant={vendor.isPortnox ? "default" : "secondary"}
                        className={vendor.isPortnox ? "bg-blue-600" : ""}
                      >
                        {formatCurrency(vendor.totalCost)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Server className="h-3 w-3 text-blue-500" />
                        <span>Licensing: {formatCurrency(vendor.licensing)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-red-500" />
                        <span>Hardware: {formatCurrency(vendor.hardware)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-3 w-3 text-orange-500" />
                        <span>Implementation: {formatCurrency(vendor.implementation)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HeadphonesIcon className="h-3 w-3 text-green-500" />
                        <span>Support: {formatCurrency(vendor.support)}</span>
                      </div>
                    </div>

                    {vendor.vendorId !== costAnalysis.totalCostData[costAnalysis.totalCostData.length - 1].vendorId && (
                      <Separator className="my-3" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timeline Analysis Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Multi-Year Cost Projection
              </CardTitle>
              <CardDescription>
                Year-over-year cost analysis showing implementation and operational expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <ResponsiveContainer width="100%" height={500}>
                <ComposedChart
                  data={costAnalysis.yearlyProjection}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    {results.map((result, index) => (
                      <linearGradient key={result.vendorId} id={`area-${result.vendorId}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS[index]} stopOpacity={0.6} />
                        <stop offset="100%" stopColor={CHART_COLORS[index]} stopOpacity={0.1} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {results.map((result, index) => (
                    <Area
                      key={result.vendorId}
                      type="monotone"
                      dataKey={result.vendorName}
                      stackId="1"
                      stroke={CHART_COLORS[index]}
                      fill={`url(#area-${result.vendorId})`}
                      strokeWidth={2}
                    />
                  ))}
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Components Tab */}
        <TabsContent value="components" className="space-y-6">
          <div className="grid gap-6">
            {costAnalysis.totalCostData.map((vendor) => (
              <Card
                key={vendor.vendorId}
                className={`relative overflow-hidden ${vendor.isPortnox ? "border-blue-200 dark:border-blue-800" : ""}`}
              >
                <div
                  className={`absolute inset-0 ${vendor.isPortnox ? "bg-gradient-to-br from-blue-500/5 to-indigo-500/5" : "bg-gradient-to-br from-gray-500/5 to-slate-500/5"}`}
                />
                <CardHeader className="relative">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: vendor.color }} />
                      <span>{vendor.vendor}</span>
                      {vendor.isPortnox && <Badge className="bg-blue-600 text-white">Recommended</Badge>}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{formatCurrency(vendor.totalCost)}</div>
                      <div className="text-sm text-muted-foreground">Total {config?.years || 3}-year cost</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Software Licensing</span>
                      </div>
                      <div className="text-lg font-semibold">{formatCurrency(vendor.licensing)}</div>
                      <Progress value={(vendor.licensing / vendor.totalCost) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Hardware & Infrastructure</span>
                      </div>
                      <div className="text-lg font-semibold">{formatCurrency(vendor.hardware)}</div>
                      <Progress value={(vendor.hardware / vendor.totalCost) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Implementation</span>
                      </div>
                      <div className="text-lg font-semibold">{formatCurrency(vendor.implementation)}</div>
                      <Progress value={(vendor.implementation / vendor.totalCost) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <HeadphonesIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Support & Maintenance</span>
                      </div>
                      <div className="text-lg font-semibold">{formatCurrency(vendor.support + vendor.maintenance)}</div>
                      <Progress
                        value={((vendor.support + vendor.maintenance) / vendor.totalCost) * 100}
                        className="h-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Training & Certification</span>
                      </div>
                      <div className="text-lg font-semibold">{formatCurrency(vendor.training)}</div>
                      <Progress value={(vendor.training / vendor.totalCost) * 100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calculator className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Per Device Cost</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {formatCurrency(vendor.totalCost / (config?.devices || 1))}
                      </div>
                      <div className="text-xs text-muted-foreground">Over {config?.years || 3} years</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Savings Analysis Tab */}
        <TabsContent value="savings" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-600" />
                  Cumulative Savings Analysis
                </CardTitle>
                <CardDescription>Total savings achieved by choosing Portnox CLEAR</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                    <div className="text-4xl font-bold text-green-600 mb-2">{formatCurrency(costAnalysis.savings)}</div>
                    <div className="text-lg font-semibold text-green-700 dark:text-green-300">
                      Total Savings vs. Market Average
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {costAnalysis.savingsPercentage}% reduction in total cost of ownership
                    </div>
                  </div>

                  <div className="space-y-4">
                    {costAnalysis.totalCostData
                      .filter((d) => !d.isPortnox)
                      .map((competitor) => {
                        const portnoxCost = costAnalysis.portnoxResult?.totalCost || 0
                        const savings = competitor.totalCost - portnoxCost
                        const savingsPercent = Math.round((savings / competitor.totalCost) * 100)

                        return (
                          <div key={competitor.vendorId} className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: competitor.color }} />
                                <span className="font-medium">{competitor.vendor}</span>
                              </div>
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                {savingsPercent}% savings
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Their Cost</div>
                                <div className="font-semibold">{formatCurrency(competitor.totalCost)}</div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">Your Savings</div>
                                <div className="font-semibold text-green-600">{formatCurrency(savings)}</div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  ROI & Payback Analysis
                </CardTitle>
                <CardDescription>Return on investment and payback period calculations</CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-6">
                {costAnalysis.portnoxResult && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {costAnalysis.portnoxResult.roi.percentage.toFixed(0)}%
                        </div>
                        <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                          ROI Over {config?.years || 3} Years
                        </div>
                      </div>

                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {costAnalysis.portnoxResult.roi.paybackMonths.toFixed(1)}
                        </div>
                        <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                          Payback Period (Months)
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Annual Savings</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(costAnalysis.portnoxResult.roi.annualSavings)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Breach Risk Reduction</span>
                        <span className="font-semibold text-blue-600">
                          {(costAnalysis.portnoxResult.roi.breachReduction * 100).toFixed(0)}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm font-medium">Labor Savings (FTE)</span>
                        <span className="font-semibold text-purple-600">
                          {costAnalysis.portnoxResult.roi.laborSavingsFTE.toFixed(1)} FTEs
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hidden Costs Tab */}
        <TabsContent value="hidden" className="space-y-6">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Hidden Cost Analysis
              </CardTitle>
              <CardDescription>
                Often overlooked expenses that can significantly impact your total investment
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Portnox CLEAR - No Hidden Costs
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="text-sm">Hardware Infrastructure</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        $0
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="text-sm">Professional Services</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        $0
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="text-sm">Training & Certification</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        $0
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <span className="text-sm">Maintenance Windows</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        $0
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Traditional NAC Hidden Costs
                  </h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <span className="text-sm">Hardware Refresh (Year 3-5)</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        $50K-200K
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <span className="text-sm">Professional Services</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        $75K-300K
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <span className="text-sm">Training & Certification</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        $25K-100K
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <span className="text-sm">Downtime & Maintenance</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">
                        $30K-150K
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {formatCurrency(180000)} - {formatCurrency(750000)}
                </div>
                <div className="text-lg font-semibold text-orange-700 dark:text-orange-300">
                  Typical Hidden Costs Range
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Additional expenses not included in initial vendor quotes
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
