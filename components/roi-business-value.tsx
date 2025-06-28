"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Line,
  Area,
  BarChart,
  Bar,
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
  ComposedChart,
  ScatterChart,
  Scatter,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  Target,
  Award,
  Briefcase,
  Calculator,
  PieChartIcon,
  BarChart3,
  Activity,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Rocket,
} from "lucide-react"

const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
}

interface ROIBusinessValueProps {
  results: any[]
  configuration: any
  darkMode: boolean
}

export default function ROIBusinessValue({ results, configuration, darkMode }: ROIBusinessValueProps) {
  const [selectedMetric, setSelectedMetric] = useState("roi")
  const [timeHorizon, setTimeHorizon] = useState(5)
  const [activeTab, setActiveTab] = useState("overview")

  const portnoxResult = useMemo(() => results?.find((r) => r.vendor === "portnox"), [results])

  const competitorAverage = useMemo(() => {
    const competitors = results?.filter((r) => r.vendor !== "portnox") || []
    if (competitors.length === 0) return null

    return {
      total: competitors.reduce((sum, r) => sum + r.total, 0) / competitors.length,
      paybackMonths: competitors.reduce((sum, r) => sum + (r.roi?.paybackMonths || 24), 0) / competitors.length,
      annualSavings: competitors.reduce((sum, r) => sum + (r.roi?.annualSavings || 0), 0) / competitors.length,
    }
  }, [results])

  const roiTimelineData = useMemo(() => {
    if (!portnoxResult) return []

    const data = []
    const monthlyInvestment = portnoxResult.total / (configuration.years * 12)
    const monthlySavings = (portnoxResult.roi?.annualSavings || 0) / 12

    let cumulativeInvestment = 0
    let cumulativeSavings = 0
    let netValue = 0

    for (let month = 0; month <= timeHorizon * 12; month++) {
      if (month > 0) {
        cumulativeInvestment += monthlyInvestment
        cumulativeSavings += monthlySavings
        netValue = cumulativeSavings - cumulativeInvestment
      }

      data.push({
        month,
        investment: cumulativeInvestment,
        savings: cumulativeSavings,
        netValue,
        roi: cumulativeInvestment > 0 ? (netValue / cumulativeInvestment) * 100 : 0,
      })
    }

    return data
  }, [portnoxResult, configuration.years, timeHorizon])

  const businessValueMetrics = useMemo(() => {
    if (!portnoxResult) return []

    return [
      {
        category: "Financial Impact",
        metrics: [
          { name: "Total ROI", value: `${portnoxResult.roi?.percentage || 0}%`, trend: "up", impact: "high" },
          {
            name: "Payback Period",
            value: `${portnoxResult.roi?.paybackMonths || 0} months`,
            trend: "down",
            impact: "high",
          },
          {
            name: "Annual Savings",
            value: `$${((portnoxResult.roi?.annualSavings || 0) / 1000).toFixed(0)}K`,
            trend: "up",
            impact: "high",
          },
          {
            name: "Cost Avoidance",
            value: `$${(((portnoxResult.roi?.annualSavings || 0) * 0.3) / 1000).toFixed(0)}K`,
            trend: "up",
            impact: "medium",
          },
        ],
      },
      {
        category: "Operational Efficiency",
        metrics: [
          { name: "FTE Savings", value: `${portnoxResult.roi?.laborSavingsFTE || 0}`, trend: "up", impact: "high" },
          { name: "Deployment Time", value: "4 hours", trend: "down", impact: "high" },
          { name: "Admin Overhead", value: "-75%", trend: "down", impact: "medium" },
          { name: "Incident Response", value: "-60%", trend: "down", impact: "medium" },
        ],
      },
      {
        category: "Risk Reduction",
        metrics: [
          { name: "Breach Risk", value: `-${portnoxResult.roi?.breachReduction || 0}%`, trend: "down", impact: "high" },
          { name: "Compliance Score", value: "95%", trend: "up", impact: "high" },
          { name: "Audit Readiness", value: "98%", trend: "up", impact: "medium" },
          { name: "Security Posture", value: "+85%", trend: "up", impact: "high" },
        ],
      },
      {
        category: "Strategic Value",
        metrics: [
          { name: "Time to Market", value: "-90%", trend: "down", impact: "high" },
          { name: "Scalability", value: "Unlimited", trend: "up", impact: "medium" },
          { name: "Innovation Index", value: "+40%", trend: "up", impact: "medium" },
          { name: "Competitive Edge", value: "High", trend: "up", impact: "high" },
        ],
      },
    ]
  }, [portnoxResult])

  const competitiveAnalysisData = useMemo(() => {
    if (!results || results.length === 0) return []

    return results.map((result) => ({
      vendor: result.vendorName,
      roi: result.roi?.percentage || 0,
      payback: result.roi?.paybackMonths || 24,
      savings: (result.roi?.annualSavings || 0) / 1000,
      riskReduction: result.roi?.breachReduction || 0,
      efficiency: result.riskMetrics?.operationalEfficiency || 50,
      isPortnox: result.vendor === "portnox",
    }))
  }, [results])

  const industryBenchmarkData = useMemo(() => {
    const industryAverages = {
      healthcare: { roi: 180, payback: 18, savings: 450 },
      financial: { roi: 220, payback: 15, savings: 380 },
      technology: { roi: 250, payback: 12, savings: 320 },
      manufacturing: { roi: 190, payback: 16, savings: 290 },
      government: { roi: 160, payback: 20, savings: 240 },
      education: { roi: 140, payback: 22, savings: 180 },
      retail: { roi: 200, payback: 14, savings: 260 },
      energy: { roi: 170, payback: 18, savings: 310 },
    }

    const industry = configuration.industry || "technology"
    const benchmark = industryAverages[industry as keyof typeof industryAverages] || industryAverages.technology

    return [
      {
        metric: "ROI %",
        portnox: portnoxResult?.roi?.percentage || 0,
        industry: benchmark.roi,
        difference: (portnoxResult?.roi?.percentage || 0) - benchmark.roi,
      },
      {
        metric: "Payback (months)",
        portnox: portnoxResult?.roi?.paybackMonths || 0,
        industry: benchmark.payback,
        difference: benchmark.payback - (portnoxResult?.roi?.paybackMonths || 0),
      },
      {
        metric: "Annual Savings ($K)",
        portnox: (portnoxResult?.roi?.annualSavings || 0) / 1000,
        industry: benchmark.savings,
        difference: (portnoxResult?.roi?.annualSavings || 0) / 1000 - benchmark.savings,
      },
    ]
  }, [portnoxResult, configuration.industry])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toLocaleString()}`
  }

  const MetricCard = ({ title, value, subtitle, icon, trend, color = "primary" }: any) => (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "p-6 rounded-xl border transition-all duration-300",
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        "hover:shadow-lg",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn("text-sm font-medium mb-2", darkMode ? "text-gray-300" : "text-gray-600")}>{title}</p>
          <p className={cn("text-3xl font-bold mb-1", darkMode ? "text-white" : "text-gray-900")}>{value}</p>
          {subtitle && <p className={cn("text-sm", darkMode ? "text-gray-400" : "text-gray-500")}>{subtitle}</p>}
          {trend && (
            <div className={cn("flex items-center mt-2 text-sm", trend === "up" ? "text-green-500" : "text-red-500")}>
              {trend === "up" ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              <span>vs industry average</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-full", color === "primary" ? "bg-portnox-primary/10" : `bg-${color}-100`)}>
          {React.cloneElement(icon, {
            className: cn("h-6 w-6", color === "primary" ? "text-portnox-primary" : `text-${color}-600`),
          })}
        </div>
      </div>
    </motion.div>
  )

  if (!results || results.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Calculator className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No ROI Data Available</h3>
        <p className="text-gray-600">Configure your environment and select vendors to see ROI analysis.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">ROI & Business Value Analysis</h2>
          <p className={cn("text-sm", darkMode ? "text-gray-400" : "text-gray-600")}>
            Comprehensive financial impact and business value assessment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={timeHorizon}
            onChange={(e) => setTimeHorizon(Number(e.target.value))}
            className={cn(
              "px-3 py-2 border rounded-md text-sm",
              darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
            )}
          >
            <option value={3}>3 Years</option>
            <option value={5}>5 Years</option>
            <option value={7}>7 Years</option>
          </select>

          <Button variant="outline" size="sm">
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Key ROI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total ROI"
          value={`${portnoxResult?.roi?.percentage || 0}%`}
          subtitle={`${timeHorizon}-year projection`}
          icon={<TrendingUp />}
          trend="up"
          color="primary"
        />
        <MetricCard
          title="Payback Period"
          value={`${portnoxResult?.roi?.paybackMonths || 0} mo`}
          subtitle="Break-even point"
          icon={<Clock />}
          trend="down"
          color="success"
        />
        <MetricCard
          title="Annual Savings"
          value={formatCurrency(portnoxResult?.roi?.annualSavings || 0)}
          subtitle="Recurring value"
          icon={<DollarSign />}
          trend="up"
          color="info"
        />
        <MetricCard
          title="Risk Reduction"
          value={`${portnoxResult?.roi?.breachReduction || 0}%`}
          subtitle="Security improvement"
          icon={<Shield />}
          trend="up"
          color="warning"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">ROI Timeline</TabsTrigger>
          <TabsTrigger value="comparison">Competitive Analysis</TabsTrigger>
          <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
          <TabsTrigger value="business-case">Business Case</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROI Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  ROI Value Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Labor Savings",
                            value: (portnoxResult?.roi?.annualSavings || 0) * 0.4,
                            fill: PORTNOX_COLORS.primary,
                          },
                          {
                            name: "Risk Reduction",
                            value: (portnoxResult?.roi?.annualSavings || 0) * 0.35,
                            fill: PORTNOX_COLORS.success,
                          },
                          {
                            name: "Compliance Savings",
                            value: (portnoxResult?.roi?.annualSavings || 0) * 0.15,
                            fill: PORTNOX_COLORS.info,
                          },
                          {
                            name: "Efficiency Gains",
                            value: (portnoxResult?.roi?.annualSavings || 0) * 0.1,
                            fill: PORTNOX_COLORS.warning,
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        dataKey="value"
                      ></Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Business Value Radar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Business Value Radar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      data={[
                        { metric: "Cost Savings", portnox: 95, industry: 60 },
                        { metric: "Risk Reduction", portnox: 85, industry: 50 },
                        { metric: "Operational Efficiency", portnox: 90, industry: 55 },
                        { metric: "Compliance", portnox: 95, industry: 65 },
                        { metric: "Scalability", portnox: 100, industry: 45 },
                        { metric: "Innovation", portnox: 85, industry: 40 },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Portnox"
                        dataKey="portnox"
                        stroke={PORTNOX_COLORS.primary}
                        fill={PORTNOX_COLORS.primary}
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Industry Average"
                        dataKey="industry"
                        stroke={PORTNOX_COLORS.accent}
                        fill={PORTNOX_COLORS.accent}
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Value Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {businessValueMetrics.map((category, categoryIndex) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.metrics.map((metric, index) => (
                      <motion.div
                        key={metric.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              metric.impact === "high"
                                ? "bg-green-500"
                                : metric.impact === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400",
                            )}
                          />
                          <span className="text-sm font-medium">{metric.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold">{metric.value}</span>
                          {metric.trend === "up" ? (
                            <ArrowUpRight className="h-3 w-3 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ROI Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                ROI Timeline Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={roiTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => `M${value}`}
                      tick={{ fill: darkMode ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
                    />
                    <YAxis
                      yAxisId="currency"
                      orientation="left"
                      tickFormatter={formatCurrency}
                      tick={{ fill: darkMode ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
                    />
                    <YAxis
                      yAxisId="percentage"
                      orientation="right"
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fill: darkMode ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value: number, name: string) => {
                        if (name === "ROI %") return [`${value.toFixed(1)}%`, name]
                        return [formatCurrency(value), name]
                      }}
                      contentStyle={{
                        backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                        border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area
                      yAxisId="currency"
                      type="monotone"
                      dataKey="investment"
                      fill={PORTNOX_COLORS.accent}
                      fillOpacity={0.3}
                      stroke={PORTNOX_COLORS.accent}
                      name="Cumulative Investment"
                    />
                    <Area
                      yAxisId="currency"
                      type="monotone"
                      dataKey="savings"
                      fill={PORTNOX_COLORS.success}
                      fillOpacity={0.3}
                      stroke={PORTNOX_COLORS.success}
                      name="Cumulative Savings"
                    />
                    <Line
                      yAxisId="currency"
                      type="monotone"
                      dataKey="netValue"
                      stroke={PORTNOX_COLORS.primary}
                      strokeWidth={3}
                      name="Net Value"
                    />
                    <Line
                      yAxisId="percentage"
                      type="monotone"
                      dataKey="roi"
                      stroke={PORTNOX_COLORS.purple}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="ROI %"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* ROI Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Break-Even Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Break-even month</span>
                    <Badge variant="outline">{portnoxResult?.roi?.paybackMonths || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monthly net positive</span>
                    <span className="text-sm font-semibold text-green-600">
                      {formatCurrency(
                        (portnoxResult?.roi?.annualSavings || 0) / 12 -
                          (portnoxResult?.total || 0) / (configuration.years * 12),
                      )}
                    </span>
                  </div>
                  <Progress value={((portnoxResult?.roi?.paybackMonths || 0) / 24) * 100} className="h-2" />
                  <p className="text-xs text-gray-600">Faster payback than 85% of NAC solutions</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Value Acceleration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Year 1 ROI</span>
                    <span className="text-sm font-semibold">
                      {(
                        (((portnoxResult?.roi?.annualSavings || 0) -
                          (portnoxResult?.total || 0) / configuration.years) /
                          ((portnoxResult?.total || 0) / configuration.years)) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Year 3 ROI</span>
                    <span className="text-sm font-semibold text-green-600">
                      {(
                        (((portnoxResult?.roi?.annualSavings || 0) * 3 - (portnoxResult?.total || 0)) /
                          (portnoxResult?.total || 0)) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Year 5 ROI</span>
                    <span className="text-sm font-semibold text-green-600">
                      {(
                        (((portnoxResult?.roi?.annualSavings || 0) * 5 - (portnoxResult?.total || 0)) /
                          (portnoxResult?.total || 0)) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk-Adjusted Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Probability of Success</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      95%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Worst Case ROI</span>
                    <span className="text-sm font-semibold">
                      {Math.max(0, (portnoxResult?.roi?.percentage || 0) * 0.6).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Best Case ROI</span>
                    <span className="text-sm font-semibold text-green-600">
                      {((portnoxResult?.roi?.percentage || 0) * 1.4).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Competitive Analysis Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Competitive ROI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={competitiveAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="payback" name="Payback Period (months)" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="roi" name="ROI %" tick={{ fontSize: 12 }} />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "Payback Period (months)" ? `${value} months` : `${value}%`,
                        name,
                      ]}
                      labelFormatter={(label) => `Vendor: ${label}`}
                    />
                    <Scatter name="Vendors" dataKey="roi">
                      {competitiveAnalysisData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isPortnox ? PORTNOX_COLORS.primary : PORTNOX_COLORS.accent}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Competitive Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Competitive Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={cn("border-b", darkMode ? "border-gray-700" : "border-gray-200")}>
                      <th className="text-left p-3">Vendor</th>
                      <th className="text-right p-3">ROI %</th>
                      <th className="text-right p-3">Payback (months)</th>
                      <th className="text-right p-3">Annual Savings</th>
                      <th className="text-right p-3">Risk Reduction</th>
                      <th className="text-right p-3">Efficiency Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveAnalysisData.map((vendor, index) => (
                      <motion.tr
                        key={vendor.vendor}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "border-b transition-colors",
                          darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50",
                          vendor.isPortnox ? "bg-portnox-primary/5" : "",
                        )}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{vendor.vendor}</span>
                            {vendor.isPortnox && (
                              <Badge variant="default" className="text-xs">
                                Recommended
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-right p-3 font-semibold">
                          <span
                            className={
                              vendor.roi > 200
                                ? "text-green-600"
                                : vendor.roi > 100
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }
                          >
                            {vendor.roi.toFixed(0)}%
                          </span>
                        </td>
                        <td className="text-right p-3">{vendor.payback}</td>
                        <td className="text-right p-3">{formatCurrency(vendor.savings * 1000)}</td>
                        <td className="text-right p-3">
                          <span
                            className={
                              vendor.riskReduction > 70
                                ? "text-green-600"
                                : vendor.riskReduction > 50
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }
                          >
                            {vendor.riskReduction}%
                          </span>
                        </td>
                        <td className="text-right p-3">
                          <div className="flex items-center justify-end gap-2">
                            <Progress value={vendor.efficiency} className="w-16 h-2" />
                            <span className="text-xs">{vendor.efficiency}</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Industry Benchmarks Tab */}
        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Industry Benchmark Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryBenchmarkData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="metric" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="portnox" fill={PORTNOX_COLORS.primary} name="Portnox" />
                    <Bar dataKey="industry" fill={PORTNOX_COLORS.accent} name="Industry Average" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Benchmark Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industryBenchmarkData.map((benchmark, index) => (
              <Card key={benchmark.metric}>
                <CardHeader>
                  <CardTitle className="text-lg">{benchmark.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Portnox</span>
                      <span className="font-bold text-portnox-primary">
                        {benchmark.metric.includes("months")
                          ? `${benchmark.portnox} mo`
                          : benchmark.metric.includes("$K")
                            ? formatCurrency(benchmark.portnox * 1000)
                            : `${benchmark.portnox}%`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Industry Avg</span>
                      <span className="font-bold text-gray-600">
                        {benchmark.metric.includes("months")
                          ? `${benchmark.industry} mo`
                          : benchmark.metric.includes("$K")
                            ? formatCurrency(benchmark.industry * 1000)
                            : `${benchmark.industry}%`}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Advantage</span>
                        <div className="flex items-center gap-1">
                          <span
                            className={cn("font-bold", benchmark.difference > 0 ? "text-green-600" : "text-red-600")}
                          >
                            {benchmark.difference > 0 ? "+" : ""}
                            {benchmark.difference.toFixed(0)}
                            {benchmark.metric.includes("%") ? "%" : benchmark.metric.includes("months") ? " mo" : "K"}
                          </span>
                          {benchmark.difference > 0 ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Business Case Tab */}
        <TabsContent value="business-case" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Executive Business Case
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Investment Recommendation: APPROVE
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Portnox delivers exceptional ROI with minimal risk and rapid deployment.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm">
                        <strong>{portnoxResult?.roi?.percentage || 0}% ROI</strong> in {configuration.years} years
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm">
                        <strong>{portnoxResult?.roi?.paybackMonths || 0} month</strong> payback period
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm">
                        <strong>{formatCurrency(portnoxResult?.roi?.annualSavings || 0)}</strong> annual savings
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm">
                        <strong>{portnoxResult?.roi?.breachReduction || 0}%</strong> security risk reduction
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strategic Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Strategic Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Competitive Advantage",
                      description: "99% faster deployment than traditional NAC solutions",
                      impact: "High",
                    },
                    {
                      title: "Future-Proof Architecture",
                      description: "Cloud-native design scales with business growth",
                      impact: "High",
                    },
                    {
                      title: "Operational Excellence",
                      description: "AI-powered automation reduces manual overhead",
                      impact: "Medium",
                    },
                    {
                      title: "Risk Mitigation",
                      description: "Comprehensive security posture improvement",
                      impact: "High",
                    },
                    {
                      title: "Innovation Enablement",
                      description: "Frees IT resources for strategic initiatives",
                      impact: "Medium",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 border rounded-lg"
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-2",
                          benefit.impact === "High" ? "bg-green-500" : "bg-yellow-500",
                        )}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{benefit.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{benefit.description}</p>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs mt-2",
                            benefit.impact === "High"
                              ? "border-green-500 text-green-700"
                              : "border-yellow-500 text-yellow-700",
                          )}
                        >
                          {benefit.impact} Impact
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Implementation & Value Realization Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    phase: "Phase 1: Pilot Deployment",
                    duration: "Week 1",
                    activities: ["Initial setup", "Core team training", "Pilot environment"],
                    value: "Immediate visibility gains",
                  },
                  {
                    phase: "Phase 2: Production Rollout",
                    duration: "Weeks 2-4",
                    activities: ["Full deployment", "Policy configuration", "User onboarding"],
                    value: "Security posture improvement",
                  },
                  {
                    phase: "Phase 3: Optimization",
                    duration: "Months 2-3",
                    activities: ["Advanced features", "Integration completion", "Process automation"],
                    value: "Operational efficiency gains",
                  },
                  {
                    phase: "Phase 4: Value Realization",
                    duration: "Months 4-6",
                    activities: ["ROI measurement", "Continuous improvement", "Expansion planning"],
                    value: "Full ROI achievement",
                  },
                ].map((phase, index) => (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
                          index === 0
                            ? "bg-portnox-primary"
                            : index === 1
                              ? "bg-blue-500"
                              : index === 2
                                ? "bg-purple-500"
                                : "bg-green-500",
                        )}
                      >
                        {index + 1}
                      </div>
                      {index < 3 && <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2" />}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{phase.phase}</h4>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{phase.value}</p>
                      <div className="flex flex-wrap gap-1">
                        {phase.activities.map((activity) => (
                          <Badge key={activity} variant="secondary" className="text-xs">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
