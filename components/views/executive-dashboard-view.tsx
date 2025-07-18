"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  CheckCircle2,
  Zap,
  Users,
  Building2,
  Award,
  Rocket,
  TrendingDown,
  Download,
  Maximize2,
  Minimize2,
  RefreshCw,
  BarChart3,
  PieChartIcon,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ExecutiveDashboardViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results = [], config }: ExecutiveDashboardViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState("savings")

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  // Enhanced key metrics with more comprehensive data
  const keyMetrics = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) {
      return {
        totalSavings: 0,
        percentSavings: 0,
        roi: 0,
        paybackMonths: 0,
        lowestCompetitorCost: 0,
        highestCompetitorCost: 0,
        avgCompetitorCost: 0,
        riskReduction: 92,
        deploymentSpeedup: 95,
        adminEfficiency: 90,
        complianceScore: 98,
        securityScore: 95,
      }
    }

    const lowestCompetitorCost = Math.min(...competitorResults.map((r) => r.totalCost))
    const highestCompetitorCost = Math.max(...competitorResults.map((r) => r.totalCost))
    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length

    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0
    const roi = portnoxResult.totalCost > 0 ? (totalSavings / portnoxResult.totalCost) * 100 : 0
    const timeframe = config?.years || 3
    const paybackMonths = totalSavings > 0 ? portnoxResult.totalCost / (totalSavings / (timeframe * 12)) : 0

    return {
      totalSavings,
      percentSavings,
      roi,
      paybackMonths,
      lowestCompetitorCost,
      highestCompetitorCost,
      avgCompetitorCost,
      riskReduction: 92,
      deploymentSpeedup: 95,
      adminEfficiency: 90,
      complianceScore: 98,
      securityScore: 95,
    }
  }, [results, config, portnoxResult, competitorResults])

  // Enhanced cost comparison with more detailed breakdown
  const costComparisonData = useMemo(() => {
    return results
      .sort((a, b) => a.totalCost - b.totalCost)
      .map((result) => ({
        vendor: result.vendorName,
        cost: result.totalCost,
        savings: keyMetrics ? keyMetrics.avgCompetitorCost - result.totalCost : 0,
        isPortnox: result.vendorId === "portnox",
        licensing: result.totalCost * (result.vendorId === "portnox" ? 0.82 : 0.45),
        hardware: result.totalCost * (result.vendorId === "portnox" ? 0 : 0.25),
        services: result.totalCost * (result.vendorId === "portnox" ? 0.18 : 0.3),
        efficiency: result.vendorId === "portnox" ? 95 : 35 + Math.random() * 30,
      }))
  }, [results, keyMetrics])

  // Enhanced ROI timeline with quarterly breakdown
  const roiTimelineData = useMemo(() => {
    if (!keyMetrics || !portnoxResult || keyMetrics.totalSavings <= 0) return []

    const timeframe = config?.years || 3
    const monthlyBenefit = keyMetrics.totalSavings / (timeframe * 12)
    const data = []

    for (let quarter = 0; quarter <= timeframe * 4; quarter++) {
      const month = quarter * 3
      const cumulativeBenefit = monthlyBenefit * month
      const netValue = cumulativeBenefit - portnoxResult.totalCost
      const roi = portnoxResult.totalCost > 0 ? (netValue / portnoxResult.totalCost) * 100 : 0

      data.push({
        quarter: `Q${(quarter % 4) + 1} Y${Math.floor(quarter / 4) + 1}`,
        month,
        cumulativeBenefit,
        netValue,
        roi: Math.max(roi, -100),
        breakeven: month >= keyMetrics.paybackMonths,
      })
    }

    return data
  }, [keyMetrics, portnoxResult, config])

  // Enhanced business impact metrics
  const businessImpactData = useMemo(() => {
    const categories = [
      {
        name: "Security Posture",
        portnox: 95,
        competitor: 65,
        color: "#10B981",
        description: "Zero CVEs vs industry average",
        impact: "High",
      },
      {
        name: "Operational Efficiency",
        portnox: 92,
        competitor: 45,
        color: "#3B82F6",
        description: "90% reduction in admin overhead",
        impact: "Critical",
      },
      {
        name: "Deployment Speed",
        portnox: 98,
        competitor: 25,
        color: "#F59E0B",
        description: "30 minutes vs 6-9 months",
        impact: "High",
      },
      {
        name: "Compliance Readiness",
        portnox: 96,
        competitor: 70,
        color: "#8B5CF6",
        description: "Built-in compliance frameworks",
        impact: "Medium",
      },
      {
        name: "Scalability",
        portnox: 94,
        competitor: 55,
        color: "#EC4899",
        description: "Cloud-native infinite scale",
        impact: "High",
      },
      {
        name: "Integration Ease",
        portnox: 90,
        competitor: 40,
        color: "#06B6D4",
        description: "API-first architecture",
        impact: "Medium",
      },
    ]

    return categories
  }, [])

  // Strategic advantage metrics
  const strategicAdvantages = useMemo(
    () => [
      {
        title: "Zero Infrastructure",
        value: "100%",
        description: "Cloud-native, no hardware required",
        icon: <Rocket className="h-5 w-5" />,
        color: "emerald",
        trend: "+100%",
      },
      {
        title: "Deployment Time",
        value: "30 min",
        description: "vs 6-9 months traditional",
        icon: <Zap className="h-5 w-5" />,
        color: "blue",
        trend: "95% faster",
      },
      {
        title: "Security Record",
        value: "0 CVEs",
        description: "Zero known vulnerabilities",
        icon: <Shield className="h-5 w-5" />,
        color: "green",
        trend: "Industry leading",
      },
      {
        title: "Admin Efficiency",
        value: "90%",
        description: "Reduction in operational overhead",
        icon: <Users className="h-5 w-5" />,
        color: "purple",
        trend: "+90% efficiency",
      },
      {
        title: "Zero Trust Maturity",
        value: "95%",
        description: "Industry-leading implementation",
        icon: <Award className="h-5 w-5" />,
        color: "orange",
        trend: "Best-in-class",
      },
      {
        title: "Vendor Independence",
        value: "100%",
        description: "No vendor lock-in",
        icon: <Building2 className="h-5 w-5" />,
        color: "cyan",
        trend: "Future-proof",
      },
    ],
    [],
  )

  // Conditional return is now after all hooks have been called.
  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">
              No vendor data available. Please configure your analysis parameters.
            </p>
          </CardContent>
        </Card>
      </div>
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

  const deviceCount = config?.devices || 1000
  const timeframe = config?.years || 3

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}:{" "}
              {typeof entry.value === "number"
                ? entry.name.includes("$") || entry.name.includes("Cost")
                  ? formatCurrency(entry.value)
                  : entry.name.includes("%")
                    ? `${entry.value.toFixed(1)}%`
                    : entry.value.toLocaleString()
                : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className={`space-y-6 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-6 overflow-auto" : ""}`}>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
            Executive Intelligence Dashboard
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Strategic insights for C-suite decision making • {deviceCount.toLocaleString()} devices • {timeframe} year
            analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setAnimationEnabled(!animationEnabled)}>
            <RefreshCw className={`h-4 w-4 mr-2 ${animationEnabled ? "animate-spin" : ""}`} />
            {animationEnabled ? "Disable" : "Enable"} Animation
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Enhanced Strategic Advantages Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {strategicAdvantages.map((advantage, index) => (
          <Card
            key={index}
            className={`border-l-4 border-l-${advantage.color}-500 bg-gradient-to-br from-${advantage.color}-50 via-white to-${advantage.color}-50/30 hover:shadow-lg transition-all duration-300`}
          >
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium flex items-center gap-2 text-${advantage.color}-700`}>
                {advantage.icon}
                {advantage.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold text-${advantage.color}-800 mb-1`}>{advantage.value}</div>
              <p className={`text-xs text-${advantage.color}-600 mb-2`}>{advantage.description}</p>
              <Badge variant="outline" className={`text-xs border-${advantage.color}-300 text-${advantage.color}-700`}>
                {advantage.trend}
              </Badge>
              <div className={`mt-2 h-1 bg-${advantage.color}-200 rounded-full overflow-hidden`}>
                <div
                  className={`h-full bg-gradient-to-r from-${advantage.color}-400 to-${advantage.color}-600 rounded-full animate-pulse`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-white hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700 mb-2">{formatCurrency(keyMetrics.totalSavings)}</div>
            <p className="text-sm text-green-600 mb-2">{keyMetrics.percentSavings.toFixed(0)}% cost reduction</p>
            <Progress value={Math.min(keyMetrics.percentSavings, 100)} className="mb-2 h-3" />
            <div className="flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600 font-medium">vs market average</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-white hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              ROI & Payback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700 mb-2">{keyMetrics.roi.toFixed(0)}%</div>
            <p className="text-sm text-blue-600 mb-2">{keyMetrics.paybackMonths.toFixed(1)} month payback</p>
            <Progress value={Math.min(keyMetrics.roi / 10, 100)} className="mb-2 h-3" />
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Industry leading</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-violet-50 to-white hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              Risk Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700 mb-2">{keyMetrics.riskReduction}%</div>
            <p className="text-sm text-purple-600 mb-2">breach risk reduction</p>
            <Progress value={keyMetrics.riskReduction} className="mb-2 h-3" />
            <Badge variant="outline" className="text-xs border-purple-300 text-purple-700">
              Zero CVEs
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              Deployment Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700 mb-2">30 min</div>
            <p className="text-sm text-orange-600 mb-2">vs 6-9 months typical</p>
            <Progress value={keyMetrics.deploymentSpeedup} className="mb-2 h-3" />
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-orange-600" />
              <span className="text-xs text-orange-600 font-medium">95% faster</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enhanced Cost Comparison */}
        <Card className="bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Total Cost of Ownership Comparison
            </CardTitle>
            <CardDescription>
              {timeframe}-year TCO analysis for {deviceCount.toLocaleString()} devices with detailed breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={costComparisonData}>
                <defs>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#047857" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="vendor" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="cost" fill="url(#costGradient)" />
                <Area dataKey="savings" fill="url(#savingsGradient)" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced ROI Timeline */}
        <Card className="bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-green-600" />
              ROI Timeline
            </CardTitle>
            <CardDescription>Quarterly breakdown of ROI over {timeframe} years</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={roiTimelineData}>
                <defs>
                  <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="quarter" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line dataKey="roi" stroke="url(#roiGradient)" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
