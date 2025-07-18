"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, DollarSign, Shield, Clock, CheckCircle2, Target, Zap } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import CostBreakdownComparison from "@/components/charts/cost-breakdown-comparison"
import SecurityVulnerabilityTimeline from "@/components/charts/security-vulnerability-timeline"
import ImplementationTimelineVisual from "@/components/charts/implementation-timeline-visual"

interface ExecutiveDashboardViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results = [], config }: ExecutiveDashboardViewProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  // All hooks are now at the top level, before any conditional returns.
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
    }
  }, [results, config, portnoxResult, competitorResults])

  const costComparisonData = useMemo(() => {
    return results
      .sort((a, b) => a.totalCost - b.totalCost)
      .map((result) => ({
        vendor: result.vendorName,
        cost: result.totalCost,
        savings: keyMetrics ? keyMetrics.avgCompetitorCost - result.totalCost : 0,
        isPortnox: result.vendorId === "portnox",
      }))
  }, [results, keyMetrics])

  const roiTimelineData = useMemo(() => {
    if (!keyMetrics || !portnoxResult || keyMetrics.totalSavings <= 0) return []

    const timeframe = config?.years || 3
    const monthlyBenefit = keyMetrics.totalSavings / (timeframe * 12)
    const data = []

    for (let month = 0; month <= timeframe * 12; month += 6) {
      const cumulativeBenefit = monthlyBenefit * month
      const netValue = cumulativeBenefit - portnoxResult.totalCost
      const roi = portnoxResult.totalCost > 0 ? (netValue / portnoxResult.totalCost) * 100 : 0

      data.push({
        month,
        cumulativeBenefit,
        netValue,
        roi,
      })
    }

    return data
  }, [keyMetrics, portnoxResult, config])

  const riskData = useMemo(() => {
    const categories = [
      { name: "Security Breaches", portnox: 8, competitor: 45, color: "#ef4444" },
      { name: "Compliance Violations", portnox: 5, competitor: 25, color: "#f59e0b" },
      { name: "Operational Downtime", portnox: 2, competitor: 15, color: "#10b981" },
      { name: "Integration Issues", portnox: 3, competitor: 35, color: "#3b82f6" },
    ]

    return categories
  }, [])

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

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{formatCurrency(keyMetrics.totalSavings)}</div>
            <p className="text-xs text-green-600 mt-1">{keyMetrics.percentSavings.toFixed(0)}% cost reduction</p>
            <Progress value={Math.min(keyMetrics.percentSavings, 100)} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{keyMetrics.roi.toFixed(0)}%</div>
            <p className="text-xs text-blue-600 mt-1">{keyMetrics.paybackMonths.toFixed(1)} month payback</p>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle2 className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-blue-600">Industry leading</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              Risk Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">92%</div>
            <p className="text-xs text-purple-600 mt-1">breach risk reduction</p>
            <Badge variant="outline" className="mt-2 text-xs border-purple-300 text-purple-700">
              Zero CVEs
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              Deployment Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">30 min</div>
            <p className="text-xs text-orange-600 mt-1">vs 6-9 months typical</p>
            <div className="flex items-center gap-1 mt-2">
              <Zap className="h-3 w-3 text-orange-600" />
              <span className="text-xs text-orange-600">95% faster</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Total Cost of Ownership Comparison</CardTitle>
          <CardDescription>
            {timeframe}-year TCO for {deviceCount.toLocaleString()} devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={costComparisonData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="cost" fill="#3b82f6" name="Total Cost" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ROI Timeline */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ROI Timeline</CardTitle>
            <CardDescription>Cumulative return on investment over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={roiTimelineData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tickFormatter={(value) => `${value}m`} />
                <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} />
                <Tooltip
                  formatter={(value: number) => `${value.toFixed(0)}%`}
                  labelFormatter={(value) => `Month ${value}`}
                />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Comparison</CardTitle>
            <CardDescription>Annual risk exposure by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskData.map((risk) => (
                <div key={risk.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{risk.name}</span>
                    <span className="text-muted-foreground">
                      {risk.portnox}% vs {risk.competitor}%
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Portnox</div>
                      <Progress value={risk.portnox} className="h-2" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Competitors</div>
                      <Progress value={risk.competitor} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Advantages */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Advantages</CardTitle>
          <CardDescription>Why Portnox CLEAR delivers superior value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">Cloud-Native Architecture</h4>
                <p className="text-sm text-muted-foreground mt-1">No hardware, no maintenance, infinite scalability</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">Zero CVE Security Record</h4>
                <p className="text-sm text-muted-foreground mt-1">Unmatched security with no known vulnerabilities</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">30-Minute Deployment</h4>
                <p className="text-sm text-muted-foreground mt-1">Production-ready in minutes, not months</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">95% Zero Trust Maturity</h4>
                <p className="text-sm text-muted-foreground mt-1">Industry-leading Zero Trust implementation</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">No Vendor Lock-in</h4>
                <p className="text-sm text-muted-foreground mt-1">Standards-based, open architecture</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">90% Admin Overhead Reduction</h4>
                <p className="text-sm text-muted-foreground mt-1">Automated operations and self-healing</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Visual Comparisons */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis Deep Dive</CardTitle>
            <CardDescription>Comprehensive cost breakdown and savings analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <CostBreakdownComparison results={results} config={config} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Posture Analysis</CardTitle>
            <CardDescription>Vulnerability exposure and security track record</CardDescription>
          </CardHeader>
          <CardContent>
            <SecurityVulnerabilityTimeline results={results} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Speed Analysis</CardTitle>
            <CardDescription>Deployment timeline and resource requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <ImplementationTimelineVisual results={results} />
          </CardContent>
        </Card>
      </div>

      {/* Executive Summary */}
      <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <Target className="h-4 w-4" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">Executive Summary</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Recommendation:</strong> Portnox CLEAR delivers {keyMetrics.percentSavings.toFixed(0)}% cost savings (
          {formatCurrency(keyMetrics.totalSavings)}) over {timeframe} years with {keyMetrics.roi.toFixed(0)}% ROI and{" "}
          {keyMetrics.paybackMonths.toFixed(1)}-month payback. The cloud-native architecture eliminates infrastructure
          complexity while providing superior security (92% risk reduction) and operational efficiency (90% less admin
          overhead).
        </AlertDescription>
      </Alert>
    </div>
  )
}
