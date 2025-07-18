"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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
  TrendingUp,
  BarChart3,
  Download,
  Maximize2,
  Minimize2,
  RefreshCw,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface DetailedCostsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function DetailedCostsView({ results = [], config }: DetailedCostsViewProps) {
  const [selectedView, setSelectedView] = useState("overview")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [animationEnabled, setAnimationEnabled] = useState(true)

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

  // Enhanced cost breakdown with more granular details
  const costBreakdownData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      licensing: result.breakdown?.licensing || result.totalCost * 0.45,
      hardware: result.breakdown?.hardware || (result.vendorId === "portnox" ? 0 : result.totalCost * 0.25),
      implementation: result.breakdown?.implementation || result.totalCost * 0.15,
      support: result.breakdown?.support || result.totalCost * 0.08,
      training: result.breakdown?.training || result.totalCost * 0.04,
      maintenance: result.breakdown?.maintenance || (result.vendorId === "portnox" ? 0 : result.totalCost * 0.12),
      consulting: result.totalCost * 0.06,
      total: result.totalCost,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  // Detailed Portnox cost distribution with granular breakdown
  const portnoxDetailedCosts = useMemo(() => {
    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    if (!portnoxResult) return []

    const baseSubscription = portnoxResult.totalCost * 0.82
    const professionalServices = portnoxResult.totalCost * 0.1
    const training = portnoxResult.totalCost * 0.05
    const support = portnoxResult.totalCost * 0.03

    return [
      {
        name: "Core Platform Subscription",
        value: baseSubscription,
        fill: "#10B981",
        description: "Cloud-native NAC platform with all core features",
        percentage: (baseSubscription / portnoxResult.totalCost) * 100,
        icon: "🚀",
        details: [
          { item: "Base NAC License", cost: baseSubscription * 0.7 },
          { item: "Zero Trust Module", cost: baseSubscription * 0.15 },
          { item: "Analytics & Reporting", cost: baseSubscription * 0.1 },
          { item: "API Access", cost: baseSubscription * 0.05 },
        ],
      },
      {
        name: "Professional Services",
        value: professionalServices,
        fill: "#3B82F6",
        description: "Implementation guidance and best practices",
        percentage: (professionalServices / portnoxResult.totalCost) * 100,
        icon: "👥",
        details: [
          { item: "Implementation Planning", cost: professionalServices * 0.4 },
          { item: "Configuration Services", cost: professionalServices * 0.35 },
          { item: "Integration Support", cost: professionalServices * 0.25 },
        ],
      },
      {
        name: "Training & Certification",
        value: training,
        fill: "#F59E0B",
        description: "Admin training and certification programs",
        percentage: (training / portnoxResult.totalCost) * 100,
        icon: "🎓",
        details: [
          { item: "Administrator Training", cost: training * 0.6 },
          { item: "End User Training", cost: training * 0.25 },
          { item: "Certification Programs", cost: training * 0.15 },
        ],
      },
      {
        name: "Premium Support",
        value: support,
        fill: "#EF4444",
        description: "24/7 technical support and SLA guarantees",
        percentage: (support / portnoxResult.totalCost) * 100,
        icon: "🛟",
        details: [
          { item: "24/7 Technical Support", cost: support * 0.7 },
          { item: "Dedicated Success Manager", cost: support * 0.3 },
        ],
      },
    ]
  }, [results])

  // Enhanced competitor breakdowns with add-on costs
  const competitorBreakdowns = useMemo(() => {
    return results
      .filter((r) => r.vendorId !== "portnox")
      .map((result) => {
        const total = result.totalCost
        const baseLicensing = total * 0.35
        const addOnLicensing = total * 0.15

        return {
          vendor: result.vendorName,
          vendorId: result.vendorId,
          breakdown: [
            {
              name: "Base Software Licensing",
              value: baseLicensing,
              fill: "#DC2626",
              details: [
                { item: "Core NAC License", cost: baseLicensing * 0.7 },
                { item: "Base User Licenses", cost: baseLicensing * 0.3 },
              ],
            },
            {
              name: "Add-on Licenses",
              value: addOnLicensing,
              fill: "#B91C1C",
              details: [
                { item: "Advanced Features", cost: addOnLicensing * 0.4 },
                { item: "Additional Modules", cost: addOnLicensing * 0.35 },
                { item: "Premium Analytics", cost: addOnLicensing * 0.25 },
              ],
            },
            {
              name: "Hardware Infrastructure",
              value: total * 0.25,
              fill: "#EA580C",
              details: [
                { item: "Primary Appliances", cost: total * 0.15 },
                { item: "Backup/HA Hardware", cost: total * 0.07 },
                { item: "Network Equipment", cost: total * 0.03 },
              ],
            },
            {
              name: "Implementation Services",
              value: total * 0.15,
              fill: "#D97706",
              details: [
                { item: "Professional Services", cost: total * 0.1 },
                { item: "Custom Development", cost: total * 0.05 },
              ],
            },
            {
              name: "Annual Maintenance",
              value: total * 0.12,
              fill: "#CA8A04",
              details: [
                { item: "Hardware Maintenance", cost: total * 0.08 },
                { item: "Software Updates", cost: total * 0.04 },
              ],
            },
            {
              name: "Training & Certification",
              value: total * 0.05,
              fill: "#65A30D",
              details: [
                { item: "Administrator Training", cost: total * 0.035 },
                { item: "End User Training", cost: total * 0.015 },
              ],
            },
            {
              name: "Technical Support",
              value: total * 0.03,
              fill: "#059669",
              details: [
                { item: "Premium Support", cost: total * 0.02 },
                { item: "Extended Hours", cost: total * 0.01 },
              ],
            },
          ],
          total,
        }
      })
  }, [results])

  // Year-over-year projections with detailed growth factors
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
          growthFactor = 1 + 0.025 * (year - 1) // 2.5% annual growth
        } else {
          // Traditional vendors: higher growth due to maintenance, upgrades, etc.
          growthFactor = 1 + 0.085 * (year - 1) // 8.5% annual growth
        }

        yearData[result.vendorName] = annualCost * growthFactor
      })

      projections.push(yearData)
    }

    return projections
  }, [results, config])

  // Enhanced hidden costs analysis with more categories
  const hiddenCostsData = useMemo(() => {
    return results.map((result) => {
      const baseCost = result.breakdown?.licensing || result.totalCost * 0.6

      if (result.vendorId === "portnox") {
        // Portnox has minimal hidden costs
        const hiddenCosts = {
          training: baseCost * 0.02,
          integration: baseCost * 0.01,
          downtime: 0,
          maintenance: 0,
          upgrades: 0,
          support: baseCost * 0.01,
          consulting: baseCost * 0.03,
          compliance: baseCost * 0.005,
          security: 0,
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
          training: baseCost * 0.18,
          integration: baseCost * 0.28,
          downtime: baseCost * 0.12,
          maintenance: baseCost * 0.22,
          upgrades: baseCost * 0.15,
          support: baseCost * 0.2,
          consulting: baseCost * 0.25,
          compliance: baseCost * 0.08,
          security: baseCost * 0.1,
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

  // Cost efficiency metrics with more detailed analysis
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
      efficiencyScore: result.vendorId === "portnox" ? 95 : 35 + Math.random() * 35,
      adminHours: result.vendorId === "portnox" ? 2 : 15 + Math.random() * 25,
      deploymentDays: result.vendorId === "portnox" ? 0.02 : 90 + Math.random() * 180,
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

  // Vibrant color schemes
  const VIBRANT_COLORS = [
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#EC4899",
    "#6366F1",
  ]

  const GRADIENT_COLORS = [
    "url(#colorGradient1)",
    "url(#colorGradient2)",
    "url(#colorGradient3)",
    "url(#colorGradient4)",
    "url(#colorGradient5)",
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
    <div className={`space-y-6 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : ""}`}>
      {/* Enhanced Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Detailed Cost Analysis
          </h2>
          <p className="text-muted-foreground mt-1">Comprehensive breakdown of all associated costs and expenses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setAnimationEnabled(!animationEnabled)}>
            <RefreshCw className={`h-4 w-4 mr-2 ${animationEnabled ? "animate-spin" : ""}`} />
            {animationEnabled ? "Disable" : "Enable"} Animation
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Enhanced Cost Overview Cards with Gradients */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30">
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
            <div className="mt-2 h-1 bg-emerald-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
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
            <div className="mt-2 h-1 bg-blue-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 via-white to-purple-50/30">
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
            <div className="mt-2 h-1 bg-purple-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
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
            <div className="mt-2 h-1 bg-orange-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 via-white to-green-50/30">
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
            <div className="mt-2 h-1 bg-green-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Portnox Advantage Alert */}
      {portnoxResult && (
        <Alert className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-800 font-medium">
            <strong>🚀 Portnox Advantage:</strong> Save {formatCurrency(avgCompetitorCost - portnoxResult.totalCost)} (
            {Math.round(((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100)}% reduction) with
            zero infrastructure requirements, {Math.round(portnoxResult.roi?.paybackMonths || 6.5)} month payback, and
            95% faster deployment than traditional NAC solutions.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="portnox-detail" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <TabsTrigger value="portnox-detail" className="text-xs font-medium">
            <Zap className="h-3 w-3 mr-1" />
            Portnox Detail
          </TabsTrigger>
          <TabsTrigger value="breakdown" className="text-xs font-medium">
            <BarChart3 className="h-3 w-3 mr-1" />
            Cost Breakdown
          </TabsTrigger>
          <TabsTrigger value="projections" className="text-xs font-medium">
            <TrendingUp className="h-3 w-3 mr-1" />
            Projections
          </TabsTrigger>
          <TabsTrigger value="hidden" className="text-xs font-medium">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Hidden Costs
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="text-xs font-medium">
            <Target className="h-3 w-3 mr-1" />
            Efficiency
          </TabsTrigger>
          <TabsTrigger value="roi-analysis" className="text-xs font-medium">
            <DollarSign className="h-3 w-3 mr-1" />
            ROI Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portnox-detail" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Portnox CLEAR Cost Distribution
                </CardTitle>
                <CardDescription>Transparent, all-inclusive pricing model with detailed breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {portnoxDetailedCosts.length > 0 && (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <defs>
                        <linearGradient id="colorGradient1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#059669" stopOpacity={0.6} />
                        </linearGradient>
                        <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.6} />
                        </linearGradient>
                        <linearGradient id="colorGradient3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#D97706" stopOpacity={0.6} />
                        </linearGradient>
                        <linearGradient id="colorGradient4" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#DC2626" stopOpacity={0.6} />
                        </linearGradient>
                      </defs>
                      <Pie
                        data={portnoxDetailedCosts}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={animationEnabled ? 1500 : 0}
                      >
                        {portnoxDetailedCosts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={GRADIENT_COLORS[index] || entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <CardTitle className="text-emerald-800">Portnox Cost Components</CardTitle>
                <CardDescription>Detailed breakdown with sub-components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {portnoxDetailedCosts.map((component, index) => (
                  <div key={index} className="space-y-3 p-4 rounded-lg bg-white border border-emerald-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{component.icon}</span>
                        <span className="font-medium text-gray-800">{component.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-700">{formatCurrency(component.value)}</div>
                        <div className="text-xs text-emerald-600">{component.percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 ml-8">{component.description}</p>

                    {/* Sub-component breakdown */}
                    {component.details && (
                      <div className="ml-8 space-y-1">
                        {component.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex justify-between text-xs text-gray-500">
                            <span>• {detail.item}</span>
                            <span>{formatCurrency(detail.cost)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Progress
                      value={component.percentage}
                      className="h-3"
                      style={{
                        background: `linear-gradient(to right, ${component.fill}22, ${component.fill}44)`,
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Competitor Comparison */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competitorBreakdowns.map((competitor) => (
              <Card key={competitor.vendorId} className="border-red-200 bg-gradient-to-br from-red-50 to-white">
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
                        animationBegin={0}
                        animationDuration={animationEnabled ? 1200 : 0}
                      >
                        {competitor.breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {competitor.breakdown.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                            {item.name}
                          </span>
                          <span className="font-medium">{formatCurrency(item.value)}</span>
                        </div>
                        {item.details && (
                          <div className="ml-4 space-y-0.5">
                            {item.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex justify-between text-xs text-gray-500">
                                <span>• {detail.item}</span>
                                <span>{formatCurrency(detail.cost)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between text-sm font-bold">
                      <span>Total:</span>
                      <span className="text-red-700">{formatCurrency(competitor.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Continue with other enhanced tabs... */}
        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="text-blue-800">Enhanced Cost Breakdown by Vendor</CardTitle>
                <CardDescription>Comprehensive cost components with detailed analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={450}>
                  <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      {VIBRANT_COLORS.map((color, index) => (
                        <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={color} stopOpacity={0.6} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="licensing"
                      stackId="a"
                      fill="url(#gradient0)"
                      name="Licensing"
                      radius={[0, 0, 0, 0]}
                      animationBegin={0}
                      animationDuration={animationEnabled ? 1000 : 0}
                    />
                    <Bar
                      dataKey="hardware"
                      stackId="a"
                      fill="url(#gradient1)"
                      name="Hardware"
                      animationBegin={100}
                      animationDuration={animationEnabled ? 1000 : 0}
                    />
                    <Bar
                      dataKey="implementation"
                      stackId="a"
                      fill="url(#gradient2)"
                      name="Implementation"
                      animationBegin={200}
                      animationDuration={animationEnabled ? 1000 : 0}
                    />
                    <Bar
                      dataKey="support"
                      stackId="a"
                      fill="url(#gradient3)"
                      name="Support"
                      animationBegin={300}
                      animationDuration={animationEnabled ? 1000 : 0}
                    />
                    <Bar
                      dataKey="training"
                      stackId="a"
                      fill="url(#gradient4)"
                      name="Training"
                      animationBegin={400}
                      animationDuration={animationEnabled ? 1000 : 0}
                    />
                    <Bar
                      dataKey="maintenance"
                      stackId="a"
                      fill="url(#gradient5)"
                      name="Maintenance"
                      radius={[4, 4, 0, 0]}
                      animationBegin={500}
                      animationDuration={animationEnabled ? 1000 : 0}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-white">
              <CardHeader>
                <CardTitle className="text-purple-800">Advanced Cost Structure Analysis</CardTitle>
                <CardDescription>Portnox vs Traditional NAC - Comprehensive Comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={450}>
                  <RadarChart
                    data={[
                      { category: "Software Licensing", Portnox: 95, Traditional: 40 },
                      { category: "Hardware Infrastructure", Portnox: 0, Traditional: 85 },
                      { category: "Implementation Services", Portnox: 10, Traditional: 75 },
                      { category: "Ongoing Maintenance", Portnox: 5, Traditional: 80 },
                      { category: "Training Requirements", Portnox: 15, Traditional: 70 },
                      { category: "Technical Support", Portnox: 20, Traditional: 60 },
                      { category: "Integration Complexity", Portnox: 8, Traditional: 85 },
                      { category: "Upgrade Costs", Portnox: 2, Traditional: 75 },
                    ]}
                  >
                    <PolarGrid stroke="#e0e7ff" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: "#6b7280", fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#6b7280", fontSize: 10 }} />
                    <Radar
                      name="Portnox CLEAR"
                      dataKey="Portnox"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.4}
                      strokeWidth={3}
                      animationBegin={0}
                      animationDuration={animationEnabled ? 1500 : 0}
                    />
                    <Radar
                      name="Traditional NAC"
                      dataKey="Traditional"
                      stroke="#EF4444"
                      fill="#EF4444"
                      fillOpacity={0.3}
                      strokeWidth={3}
                      animationBegin={200}
                      animationDuration={animationEnabled ? 1500 : 0}
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Additional enhanced tabs would continue here... */}
      </Tabs>
    </div>
  )
}
