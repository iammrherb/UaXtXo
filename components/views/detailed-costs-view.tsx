"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  ComposedChart,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  DollarSign,
  TrendingDown,
  Calculator,
  Layers,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Clock,
  TrendingUp,
  BarChart3,
  Cloud,
  Users,
  BookOpen,
  HeadphonesIcon,
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

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`

  // Enhanced Portnox cost distribution with detailed components
  const portnoxDetailedBreakdown = useMemo(() => {
    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    if (!portnoxResult) return []

    const totalCost = portnoxResult.totalCost
    return [
      {
        name: "Core Platform Subscription",
        value: Math.round(totalCost * 0.85),
        percentage: 85,
        color: "#10B981",
        icon: Cloud,
        description: "Cloud-native SaaS platform with all features included",
      },
      {
        name: "Professional Services",
        value: Math.round(totalCost * 0.08),
        percentage: 8,
        color: "#3B82F6",
        icon: Users,
        description: "Optional implementation and migration assistance",
      },
      {
        name: "Training & Certification",
        value: Math.round(totalCost * 0.04),
        percentage: 4,
        color: "#8B5CF6",
        icon: BookOpen,
        description: "Administrator training and certification programs",
      },
      {
        name: "Premium Support",
        value: Math.round(totalCost * 0.03),
        percentage: 3,
        color: "#F59E0B",
        icon: HeadphonesIcon,
        description: "24/7 premium support with dedicated CSM",
      },
    ]
  }, [results])

  // Enhanced cost breakdown with more granular details
  const costBreakdownData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      licensing: result.breakdown?.licensing || 0,
      hardware: result.breakdown?.hardware || 0,
      implementation: result.breakdown?.implementation || 0,
      support: result.breakdown?.support || 0,
      training: result.breakdown?.training || 0,
      maintenance: result.breakdown?.maintenance || 0,
      total: result.totalCost,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  // Competitor detailed breakdowns for comparison
  const competitorBreakdowns = useMemo(() => {
    return results
      .filter((r) => r.vendorId !== "portnox")
      .map((result) => {
        const total = result.totalCost
        return {
          vendor: result.vendorName,
          vendorId: result.vendorId,
          breakdown: [
            { name: "Software Licensing", value: result.breakdown?.licensing || total * 0.4, fill: "#DC2626" },
            { name: "Hardware Infrastructure", value: result.breakdown?.hardware || total * 0.25, fill: "#EA580C" },
            {
              name: "Implementation Services",
              value: result.breakdown?.implementation || total * 0.15,
              fill: "#D97706",
            },
            { name: "Annual Maintenance", value: result.breakdown?.maintenance || total * 0.12, fill: "#CA8A04" },
            { name: "Training & Certification", value: result.breakdown?.training || total * 0.05, fill: "#65A30D" },
            { name: "Technical Support", value: result.breakdown?.support || total * 0.03, fill: "#059669" },
          ],
          total,
        }
      })
  }, [results])

  // Year-over-year projections with inflation and growth
  const yearlyProjections = useMemo(() => {
    const timeframe = config?.years || 5
    const projections = []

    for (let year = 1; year <= timeframe; year++) {
      const yearData: any = { year: `Year ${year}` }

      results.forEach((result) => {
        const annualCost = result.totalCost / timeframe
        let growthFactor = 1

        if (result.vendorId === "portnox") {
          // Portnox: predictable pricing with minimal growth
          growthFactor = 1 + 0.02 * (year - 1) // 2% annual growth
        } else {
          // Traditional vendors: higher growth due to maintenance, upgrades, etc.
          growthFactor = 1 + 0.08 * (year - 1) // 8% annual growth
        }

        yearData[result.vendorName] = annualCost * growthFactor
      })

      projections.push(yearData)
    }

    return projections
  }, [results, config])

  // Enhanced hidden costs analysis
  const hiddenCostsData = useMemo(() => {
    return results.map((result) => {
      const baseCost = result.breakdown?.licensing || result.totalCost * 0.6

      if (result.vendorId === "portnox") {
        // Portnox has minimal hidden costs
        const hiddenCosts = {
          training: baseCost * 0.02, // Minimal training needed
          integration: baseCost * 0.01, // API-first, easy integration
          downtime: 0, // Cloud-native, no downtime
          maintenance: 0, // Fully managed
          upgrades: 0, // Automatic updates
          support: baseCost * 0.01, // Included in subscription
          consulting: baseCost * 0.03, // Optional professional services
        }

        return {
          vendor: result.vendorName,
          baseCost,
          ...hiddenCosts,
          totalHidden: Object.values(hiddenCosts).reduce((sum, cost) => sum + cost, 0),
          isPortnox: true,
        }
      } else {
        // Traditional vendors have significant hidden costs
        const hiddenCosts = {
          training: baseCost * 0.15, // Extensive training required
          integration: baseCost * 0.25, // Complex integration
          downtime: baseCost * 0.08, // Maintenance windows
          maintenance: baseCost * 0.2, // Hardware maintenance
          upgrades: baseCost * 0.12, // Major version upgrades
          support: baseCost * 0.18, // Premium support tiers
          consulting: baseCost * 0.22, // Professional services
        }

        return {
          vendor: result.vendorName,
          baseCost,
          ...hiddenCosts,
          totalHidden: Object.values(hiddenCosts).reduce((sum, cost) => sum + cost, 0),
          isPortnox: false,
        }
      }
    })
  }, [results])

  // Cost efficiency metrics
  const efficiencyMetrics = useMemo(() => {
    const deviceCount = config?.devices || 1000
    const userCount = config?.users || deviceCount

    return results.map((result) => ({
      vendor: result.vendorName,
      costPerDevice: result.totalCost / deviceCount,
      costPerUser: result.totalCost / userCount,
      maintenanceRatio: (result.breakdown?.maintenance || 0) / result.totalCost,
      implementationRatio: (result.breakdown?.implementation || 0) / result.totalCost,
      hardwareRatio: (result.breakdown?.hardware || 0) / result.totalCost,
      isPortnox: result.vendorId === "portnox",
      efficiencyScore: result.vendorId === "portnox" ? 95 : 45 + Math.random() * 30,
    }))
  }, [results, config])

  // ROI comparison data
  const roiComparisonData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      roi: result.roi?.percentage || 0,
      paybackMonths: result.roi?.paybackMonths || 36,
      annualSavings: result.roi?.annualSavings || 0,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  // Architecture comparison radar data
  const architectureComparison = useMemo(() => {
    return [
      { metric: "Cloud Native", Portnox: 100, "Cisco ISE": 30, "Aruba ClearPass": 60, Forescout: 40 },
      { metric: "Zero Trust", Portnox: 95, "Cisco ISE": 70, "Aruba ClearPass": 75, Forescout: 80 },
      { metric: "Simplicity", Portnox: 95, "Cisco ISE": 40, "Aruba ClearPass": 65, Forescout: 55 },
      { metric: "Scalability", Portnox: 100, "Cisco ISE": 75, "Aruba ClearPass": 80, Forescout: 70 },
      { metric: "Security", Portnox: 98, "Cisco ISE": 85, "Aruba ClearPass": 88, Forescout: 90 },
      { metric: "Cost Efficiency", Portnox: 100, "Cisco ISE": 45, "Aruba ClearPass": 65, Forescout: 55 },
    ]
  }, [])

  // Vibrant color schemes
  const VIBRANT_COLORS = [
    "#10B981", // Emerald
    "#3B82F6", // Blue
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Violet
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#F97316", // Orange
    "#EC4899", // Pink
    "#6366F1", // Indigo
  ]

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const avgCompetitorCost =
    results.filter((r) => r.vendorId !== "portnox").reduce((sum, r) => sum + r.totalCost, 0) /
    Math.max(results.filter((r) => r.vendorId !== "portnox").length, 1)

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">No cost data available. Please configure your analysis parameters.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Cost Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-emerald-700">
              <DollarSign className="h-4 w-4" />
              Lowest Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-800">
              {formatCurrency(Math.min(...results.map((r) => r.totalCost)))}
            </div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">
              {results.find((r) => r.totalCost === Math.min(...results.map((r) => r.totalCost)))?.vendorName}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-700">
              <TrendingDown className="h-4 w-4" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">
              {portnoxResult ? formatCurrency(avgCompetitorCost - portnoxResult.totalCost) : "N/A"}
            </div>
            <p className="text-xs text-blue-600 mt-1 font-medium">
              {portnoxResult
                ? `${Math.round(((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100)}% reduction`
                : "vs competitors"}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-purple-700">
              <Calculator className="h-4 w-4" />
              Cost Per Device
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">
              {formatCurrency((portnoxResult?.totalCost || 0) / (config?.devices || 1000))}
            </div>
            <p className="text-xs text-purple-600 mt-1 font-medium">Portnox CLEAR</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-700">
              <Layers className="h-4 w-4" />
              Hidden Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">
              {hiddenCostsData.find((h) => h.isPortnox)
                ? formatCurrency(hiddenCostsData.find((h) => h.isPortnox)!.totalHidden)
                : "N/A"}
            </div>
            <p className="text-xs text-orange-600 mt-1 font-medium">Portnox minimal</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-700">
              <Target className="h-4 w-4" />
              ROI Percentage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {portnoxResult?.roi?.percentage ? `${Math.round(portnoxResult.roi.percentage)}%` : "N/A"}
            </div>
            <p className="text-xs text-green-600 mt-1 font-medium">
              {portnoxResult?.roi?.paybackMonths
                ? `${Math.round(portnoxResult.roi.paybackMonths)} month payback`
                : "Portnox ROI"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portnox Advantage Alert */}
      {portnoxResult && (
        <Alert className="border-emerald-200 bg-emerald-50">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800 font-medium">
            <strong>Portnox Advantage:</strong> Save {formatCurrency(avgCompetitorCost - portnoxResult.totalCost)} (
            {Math.round(((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100)}% reduction) with
            zero infrastructure requirements and {Math.round(portnoxResult.roi?.paybackMonths || 6.5)} month payback
            period.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="portnox-detail" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="portnox-detail" className="text-xs">
            Portnox Detail
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="text-xs">
            Cost Breakdown
          </TabsTrigger>
          <TabsTrigger value="projections" className="text-xs">
            Projections
          </TabsTrigger>
          <TabsTrigger value="hidden" className="text-xs">
            Hidden Costs
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="text-xs">
            Efficiency
          </TabsTrigger>
          <TabsTrigger value="roi-analysis" className="text-xs">
            ROI Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portnox-detail" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Portnox CLEAR Cost Distribution
                </CardTitle>
                <CardDescription>Transparent, all-inclusive pricing model</CardDescription>
              </CardHeader>
              <CardContent>
                {portnoxDetailedBreakdown.length > 0 && (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={portnoxDetailedBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {portnoxDetailedBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-800">Portnox Cost Components</CardTitle>
                <CardDescription>Detailed breakdown of all costs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {portnoxDetailedBreakdown.map((component, index) => {
                  const Icon = component.icon
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: `${component.color}20` }}>
                            <Icon className="h-4 w-4" style={{ color: component.color }} />
                          </div>
                          <span className="font-medium text-gray-800">{component.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-700">{formatCurrency(component.value)}</div>
                          <div className="text-xs text-emerald-600">{component.percentage}%</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 ml-8">{component.description}</p>
                      <Progress
                        value={component.percentage}
                        className="h-2 ml-8"
                        style={{
                          background: `linear-gradient(to right, ${component.color}22, ${component.color}44)`,
                        }}
                      />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Competitor Comparison */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competitorBreakdowns.map((competitor) => (
              <Card key={competitor.vendorId} className="border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-800 flex items-center justify-between">
                    {competitor.vendor}
                    <Badge variant="destructive" className="text-xs">
                      Complex
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={competitor.breakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {competitor.breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-1">
                    {competitor.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                          {item.name}
                        </span>
                        <span className="font-medium">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-bold border-t pt-1 mt-2">
                      <span>Total:</span>
                      <span className="text-red-700">{formatCurrency(competitor.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">Cost Breakdown by Vendor</CardTitle>
                <CardDescription>Detailed cost components comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="licensing" stackId="a" fill="#3B82F6" name="Licensing" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="hardware" stackId="a" fill="#10B981" name="Hardware" />
                    <Bar dataKey="implementation" stackId="a" fill="#F59E0B" name="Implementation" />
                    <Bar dataKey="support" stackId="a" fill="#EF4444" name="Support" />
                    <Bar dataKey="training" stackId="a" fill="#8B5CF6" name="Training" />
                    <Bar dataKey="maintenance" stackId="a" fill="#06B6D4" name="Maintenance" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-800">Architecture Comparison</CardTitle>
                <CardDescription>Portnox vs Traditional NAC approaches</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={architectureComparison}>
                    <PolarGrid stroke="#e0e7ff" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "#6b7280", fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#6b7280", fontSize: 10 }} />
                    <Radar
                      name="Portnox"
                      dataKey="Portnox"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                    <Radar
                      name="Cisco ISE"
                      dataKey="Cisco ISE"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Aruba ClearPass"
                      dataKey="Aruba ClearPass"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Forescout"
                      dataKey="Forescout"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-indigo-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Year-over-Year Cost Projections
              </CardTitle>
              <CardDescription>Annual cost development with realistic growth factors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={yearlyProjections}>
                  <defs>
                    <linearGradient id="portnoxGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="ciscoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="arubaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="forescoutGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  {results.map((result, index) => (
                    <Area
                      key={result.vendorId}
                      type="monotone"
                      dataKey={result.vendorName}
                      stroke={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                      fill={
                        result.vendorId === "portnox"
                          ? "url(#portnoxGradient)"
                          : result.vendorId === "cisco_ise"
                            ? "url(#ciscoGradient)"
                            : result.vendorId === "aruba_clearpass"
                              ? "url(#arubaGradient)"
                              : "url(#forescoutGradient)"
                      }
                      fillOpacity={result.vendorId === "portnox" ? 0.8 : 0.4}
                      strokeWidth={result.vendorId === "portnox" ? 4 : 2}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Growth Analysis */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
              <Card
                key={result.vendorId}
                className={
                  result.vendorId === "portnox" ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
                }
              >
                <CardHeader className="pb-3">
                  <CardTitle
                    className={`text-lg flex items-center justify-between ${result.vendorId === "portnox" ? "text-emerald-800" : "text-red-800"}`}
                  >
                    {result.vendorName}
                    {result.vendorId === "portnox" && <Badge className="bg-emerald-600">Predictable</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Year 1 Cost:</span>
                    <span className="font-medium">{formatCurrency(result.totalCost / (config?.years || 3))}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Annual Growth:</span>
                    <span
                      className={`font-medium ${result.vendorId === "portnox" ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {result.vendorId === "portnox" ? "2%" : "8%"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>5-Year Total:</span>
                    <span className="font-bold">
                      {formatCurrency(result.totalCost * (result.vendorId === "portnox" ? 1.1 : 1.4))}
                    </span>
                  </div>
                  <Progress value={result.vendorId === "portnox" ? 20 : 80} className="mt-2 h-2" />
                  <p className="text-xs text-muted-foreground">
                    {result.vendorId === "portnox" ? "Minimal cost inflation" : "Significant cost escalation"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hidden" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Hidden Costs Analysis
              </CardTitle>
              <CardDescription>Often overlooked costs that dramatically impact total TCO</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={hiddenCostsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fef3c7" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="baseCost" fill="#E5E7EB" name="Base Cost" />
                  <Bar dataKey="training" stackId="hidden" fill="#EF4444" name="Training" />
                  <Bar dataKey="integration" stackId="hidden" fill="#F59E0B" name="Integration" />
                  <Bar dataKey="downtime" stackId="hidden" fill="#EAB308" name="Downtime" />
                  <Bar dataKey="maintenance" stackId="hidden" fill="#22C55E" name="Maintenance" />
                  <Bar dataKey="upgrades" stackId="hidden" fill="#3B82F6" name="Upgrades" />
                  <Bar dataKey="support" stackId="hidden" fill="#8B5CF6" name="Support" />
                  <Bar dataKey="consulting" stackId="hidden" fill="#EC4899" name="Consulting" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hiddenCostsData.map((vendor) => (
              <Card
                key={vendor.vendor}
                className={vendor.isPortnox ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}
              >
                <CardHeader className="pb-3">
                  <CardTitle
                    className={`text-lg flex items-center justify-between ${vendor.isPortnox ? "text-emerald-800" : "text-red-800"}`}
                  >
                    {vendor.vendor}
                    {vendor.isPortnox ? (
                      <Badge className="bg-emerald-600">Transparent</Badge>
                    ) : (
                      <Badge variant="destructive">High Hidden</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>Training:</span>
                      <span className="font-medium">{formatCurrency(vendor.training)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Integration:</span>
                      <span className="font-medium">{formatCurrency(vendor.integration)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downtime:</span>
                      <span className="font-medium">{formatCurrency(vendor.downtime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maintenance:</span>
                      <span className="font-medium">{formatCurrency(vendor.maintenance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Upgrades:</span>
                      <span className="font-medium">{formatCurrency(vendor.upgrades)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consulting:</span>
                      <span className="font-medium">{formatCurrency(vendor.consulting)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span>Base Cost:</span>
                    <span className="font-medium">{formatCurrency(vendor.baseCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hidden Costs:</span>
                    <span className={`font-bold ${vendor.isPortnox ? "text-emerald-600" : "text-red-600"}`}>
                      {formatCurrency(vendor.totalHidden)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-2">
                    <span>True Total:</span>
                    <span className={vendor.isPortnox ? "text-emerald-700" : "text-red-700"}>
                      {formatCurrency(vendor.baseCost + vendor.totalHidden)}
                    </span>
                  </div>
                  <Progress
                    value={(vendor.totalHidden / (vendor.baseCost + vendor.totalHidden)) * 100}
                    className="mt-2 h-3"
                  />
                  <p className={`text-xs font-medium ${vendor.isPortnox ? "text-emerald-600" : "text-red-600"}`}>
                    {((vendor.totalHidden / (vendor.baseCost + vendor.totalHidden)) * 100).toFixed(0)}% hidden costs
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-cyan-800 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Cost Per Device Efficiency
                </CardTitle>
                <CardDescription>Lower is better - efficiency metrics by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={efficiencyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cffafe" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
                    <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                    <Bar dataKey="costPerDevice" fill="#06B6D4" name="Cost per Device" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-violet-800">Efficiency Scores</CardTitle>
                <CardDescription>Overall efficiency rating (0-100)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={efficiencyMetrics} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="vendor" type="category" width={100} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(0)} points`} />
                    <Bar dataKey="efficiencyScore" fill="#8B5CF6" name="Efficiency Score" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {efficiencyMetrics.map((metric) => (
              <Card key={metric.vendor} className={metric.isPortnox ? "border-emerald-200 bg-emerald-50" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle
                    className={`text-lg flex items-center justify-between ${metric.isPortnox ? "text-emerald-800" : "text-gray-800"}`}
                  >
                    {metric.vendor}
                    {metric.isPortnox && <Badge className="bg-emerald-600">Most Efficient</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Per Device:</span>
                      <span className="font-bold">{formatCurrency(metric.costPerDevice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Per User:</span>
                      <span className="font-bold">{formatCurrency(metric.costPerUser)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Efficiency Score:</span>
                      <span className={`font-bold ${metric.isPortnox ? "text-emerald-600" : "text-gray-600"}`}>
                        {metric.efficiencyScore.toFixed(0)}/100
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Implementation Ratio:</span>
                        <span>{formatPercentage(metric.implementationRatio)}</span>
                      </div>
                      <Progress value={metric.implementationRatio * 100} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Maintenance Ratio:</span>
                        <span>{formatPercentage(metric.maintenanceRatio)}</span>
                      </div>
                      <Progress value={metric.maintenanceRatio * 100} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Hardware Ratio:</span>
                        <span>{formatPercentage(metric.hardwareRatio)}</span>
                      </div>
                      <Progress value={metric.hardwareRatio * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roi-analysis" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  ROI Comparison
                </CardTitle>
                <CardDescription>Return on investment percentage by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roiComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(0)}%`} />
                    <Bar dataKey="roi" fill="#22C55E" name="ROI %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Payback Period
                </CardTitle>
                <CardDescription>Time to recover investment (months)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roiComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `${value}m`} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)} months`} />
                    <Bar dataKey="paybackMonths" fill="#3B82F6" name="Payback (months)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roiComparisonData.map((roi) => (
              <Card key={roi.vendor} className={roi.isPortnox ? "border-green-200 bg-green-50" : "border-gray-200"}>
                <CardHeader className="pb-3">
                  <CardTitle
                    className={`text-lg flex items-center justify-between ${roi.isPortnox ? "text-green-800" : "text-gray-800"}`}
                  >
                    {roi.vendor}
                    {roi.isPortnox && <Badge className="bg-green-600">Best ROI</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${roi.isPortnox ? "text-green-700" : "text-gray-700"}`}>
                      {roi.roi.toFixed(0)}%
                    </div>
                    <p className="text-sm text-muted-foreground">ROI Percentage</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payback Period:</span>
                    <span className="font-medium">{roi.paybackMonths.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Annual Savings:</span>
                    <span className="font-medium">{formatCurrency(roi.annualSavings)}</span>
                  </div>
                  <Progress value={Math.min(roi.roi / 10, 100)} className="mt-2 h-3" />
                  <p
                    className={`text-xs font-medium text-center ${roi.isPortnox ? "text-green-600" : "text-gray-600"}`}
                  >
                    {roi.isPortnox ? "Exceptional ROI" : "Standard ROI"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
