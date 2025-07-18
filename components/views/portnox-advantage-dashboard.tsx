"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
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
  ScatterChart,
  Scatter,
} from "recharts"
import { DollarSign, Shield, CheckCircle2, Target, Zap, AlertTriangle, Award, Gauge, Users, Rocket } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface PortnoxAdvantageDashboardProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function PortnoxAdvantageDashboard({ results = [], config }: PortnoxAdvantageDashboardProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  const advantageMetrics = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) {
      return {
        costAdvantage: 0,
        timeAdvantage: 0,
        securityAdvantage: 0,
        riskReduction: 0,
        operationalAdvantage: 0,
        totalSavings: 0,
        roi: 0,
        paybackMonths: 0,
      }
    }

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const avgCompetitorTime =
      competitorResults.reduce((sum, r) => sum + r.timeline.implementationWeeks, 0) / competitorResults.length
    const avgCompetitorSecurity =
      competitorResults.reduce((sum, r) => sum + r.risk.securityScore, 0) / competitorResults.length
    const avgCompetitorOps =
      competitorResults.reduce((sum, r) => sum + r.ops.automationLevel, 0) / competitorResults.length

    const costAdvantage =
      avgCompetitorCost > 0 ? ((avgCompetitorCost - portnoxResult.totalCost) / avgCompetitorCost) * 100 : 0
    const timeAdvantage =
      avgCompetitorTime > 0
        ? ((avgCompetitorTime - portnoxResult.timeline.implementationWeeks) / avgCompetitorTime) * 100
        : 0
    const securityAdvantage =
      avgCompetitorSecurity > 0
        ? ((portnoxResult.risk.securityScore - avgCompetitorSecurity) / avgCompetitorSecurity) * 100
        : 0
    const operationalAdvantage =
      avgCompetitorOps > 0 ? ((portnoxResult.ops.automationLevel - avgCompetitorOps) / avgCompetitorOps) * 100 : 0

    return {
      costAdvantage,
      timeAdvantage,
      securityAdvantage,
      riskReduction: portnoxResult.risk.breachReduction * 100,
      operationalAdvantage,
      totalSavings: avgCompetitorCost - portnoxResult.totalCost,
      roi: portnoxResult.roi.percentage,
      paybackMonths: portnoxResult.roi.paybackMonths,
    }
  }, [portnoxResult, competitorResults])

  const costComparisonData = useMemo(() => {
    return results
      .sort((a, b) => a.totalCost - b.totalCost)
      .map((result, index) => ({
        vendor: result.vendorName,
        cost: result.totalCost,
        savings: results[0]?.totalCost ? result.totalCost - results[0].totalCost : 0,
        isPortnox: result.vendorId === "portnox",
        rank: index + 1,
      }))
  }, [results])

  const securityComparisonData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName.replace(/\s+/g, "\n"),
      securityScore: result.risk.securityScore,
      cveCount: result.vendorData.security.cveCount,
      zeroTrustMaturity: result.vendorData.security.zeroTrustMaturity,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  const implementationComparisonData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      weeks: result.timeline.implementationWeeks,
      complexity: result.vendorData.implementation.complexityScore,
      timeToValue: result.timeline.timeToValue,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  const radarData = useMemo(() => {
    if (!portnoxResult) return []

    const avgCompetitor = competitorResults.reduce(
      (acc, r) => ({
        cost:
          acc.cost +
          (100 - (r.totalCost / Math.max(...results.map((res) => res.totalCost))) * 100) / competitorResults.length,
        security: acc.security + r.risk.securityScore / competitorResults.length,
        speed:
          acc.speed +
          (100 -
            (r.timeline.implementationWeeks / Math.max(...results.map((res) => res.timeline.implementationWeeks))) *
              100) /
            competitorResults.length,
        automation: acc.automation + r.ops.automationLevel / competitorResults.length,
        roi: acc.roi + Math.min(r.roi.percentage, 100) / competitorResults.length,
      }),
      { cost: 0, security: 0, speed: 0, automation: 0, roi: 0 },
    )

    return [
      {
        metric: "Cost Efficiency",
        Portnox: 100 - (portnoxResult.totalCost / Math.max(...results.map((r) => r.totalCost))) * 100,
        "Market Average": avgCompetitor.cost,
      },
      {
        metric: "Security",
        Portnox: portnoxResult.risk.securityScore,
        "Market Average": avgCompetitor.security,
      },
      {
        metric: "Deployment Speed",
        Portnox:
          100 -
          (portnoxResult.timeline.implementationWeeks /
            Math.max(...results.map((r) => r.timeline.implementationWeeks))) *
            100,
        "Market Average": avgCompetitor.speed,
      },
      {
        metric: "Automation",
        Portnox: portnoxResult.ops.automationLevel,
        "Market Average": avgCompetitor.automation,
      },
      {
        metric: "ROI",
        Portnox: Math.min(portnoxResult.roi.percentage, 100),
        "Market Average": avgCompetitor.roi,
      },
    ]
  }, [portnoxResult, competitorResults, results])

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

  return (
    <div className="space-y-6">
      {/* Hero Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Cost Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{advantageMetrics.costAdvantage.toFixed(0)}%</div>
            <p className="text-xs text-green-600 mt-1">Lower TCO vs competitors</p>
            <div className="text-sm font-medium text-green-800 mt-2">
              {formatCurrency(advantageMetrics.totalSavings)} saved
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Rocket className="h-4 w-4 text-blue-600" />
              Speed Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{advantageMetrics.timeAdvantage.toFixed(0)}%</div>
            <p className="text-xs text-blue-600 mt-1">Faster deployment</p>
            <div className="flex items-center gap-1 mt-2">
              <Zap className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-blue-600">30 min vs 6+ months</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              Security Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">{advantageMetrics.securityAdvantage.toFixed(0)}%</div>
            <p className="text-xs text-purple-600 mt-1">Higher security rating</p>
            <Badge variant="outline" className="mt-2 text-xs border-purple-300 text-purple-700">
              Zero CVEs
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Gauge className="h-4 w-4 text-orange-600" />
              Operational Advantage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">
              {advantageMetrics.operationalAdvantage.toFixed(0)}%
            </div>
            <p className="text-xs text-orange-600 mt-1">Higher automation level</p>
            <div className="flex items-center gap-1 mt-2">
              <Users className="h-3 w-3 text-orange-600" />
              <span className="text-xs text-orange-600">90% less admin effort</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitive Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portnox vs Market Average - Competitive Analysis</CardTitle>
          <CardDescription>Multi-dimensional comparison across key evaluation criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="Portnox CLEAR"
                dataKey="Portnox"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={3}
              />
              <Radar
                name="Market Average"
                dataKey="Market Average"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.1}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost vs Security Scatter Plot */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cost vs Security Analysis</CardTitle>
            <CardDescription>Total cost of ownership vs security rating</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="totalCost"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  name="Total Cost"
                />
                <YAxis dataKey="securityScore" type="number" domain={[0, 100]} name="Security Score" />
                <Tooltip
                  formatter={(value, name) => [
                    name === "totalCost" ? formatCurrency(value as number) : `${value}%`,
                    name === "totalCost" ? "Total Cost" : "Security Score",
                  ]}
                  labelFormatter={(label) => `Vendor: ${label}`}
                />
                <Scatter
                  name="Vendors"
                  data={results.map((r) => ({
                    totalCost: r.totalCost,
                    securityScore: r.risk.securityScore,
                    vendor: r.vendorName,
                    fill: r.vendorId === "portnox" ? "#10b981" : "#6b7280",
                  }))}
                  fill="#8884d8"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Timeline Comparison</CardTitle>
            <CardDescription>Deployment time across vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={implementationComparisonData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${value}w`} />
                <YAxis dataKey="vendor" type="category" width={80} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(value) => [`${value} weeks`, "Implementation Time"]} />
                <Bar
                  dataKey="weeks"
                  fill={(entry: any) => (entry.isPortnox ? "#10b981" : "#6b7280")}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Total Cost of Ownership Comparison</CardTitle>
          <CardDescription>
            {timeframe}-year TCO analysis for {deviceCount.toLocaleString()} devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={costComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendor" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={100} />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Vendor: ${label}`}
              />
              <Bar
                dataKey="cost"
                fill={(entry: any) => (entry.isPortnox ? "#10b981" : "#6b7280")}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Security Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Security Posture Analysis</CardTitle>
          <CardDescription>Security ratings and vulnerability exposure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityComparisonData
              .sort((a, b) => b.securityScore - a.securityScore)
              .map((vendor) => (
                <div key={vendor.vendor} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm min-w-[120px]">{vendor.vendor}</span>
                      {vendor.isPortnox && (
                        <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                          Zero CVEs
                        </Badge>
                      )}
                      {vendor.cveCount > 50 && (
                        <Badge variant="destructive" className="text-xs">
                          High Risk
                        </Badge>
                      )}
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">{vendor.securityScore}% Security Score</div>
                      <div className="text-muted-foreground">{vendor.cveCount} CVEs</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Progress
                        value={vendor.securityScore}
                        className={`h-2 ${vendor.isPortnox ? "bg-green-100" : ""}`}
                      />
                    </div>
                    <div className="flex-1">
                      <Progress
                        value={vendor.zeroTrustMaturity}
                        className={`h-2 ${vendor.isPortnox ? "bg-blue-100" : ""}`}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Security Rating</span>
                    <span>Zero Trust Maturity: {vendor.zeroTrustMaturity}%</span>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Differentiators */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Award className="h-5 w-5" />
              Portnox Unique Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Zero CVE Security Record</div>
                  <div className="text-xs text-muted-foreground">No known vulnerabilities since inception</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">30-Minute Deployment</div>
                  <div className="text-xs text-muted-foreground">Production ready in minutes, not months</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">True Cloud-Native</div>
                  <div className="text-xs text-muted-foreground">No hardware, no maintenance windows</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">95% Automation Level</div>
                  <div className="text-xs text-muted-foreground">Minimal administrative overhead</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Vendor Agnostic</div>
                  <div className="text-xs text-muted-foreground">Works with any network infrastructure</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Competitor Limitations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Complex Deployments</div>
                  <div className="text-xs text-muted-foreground">6-9 months typical implementation time</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">High Hidden Costs</div>
                  <div className="text-xs text-muted-foreground">Hardware, services, training not included</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Security Vulnerabilities</div>
                  <div className="text-xs text-muted-foreground">15+ CVEs annually on average</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Vendor Lock-in</div>
                  <div className="text-xs text-muted-foreground">Proprietary architectures limit flexibility</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">High Operational Overhead</div>
                  <div className="text-xs text-muted-foreground">2-4 FTE required for ongoing management</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Executive Summary */}
      <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <Target className="h-4 w-4" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">Executive Recommendation</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Portnox CLEAR delivers transformative value:</strong> {advantageMetrics.costAdvantage.toFixed(0)}%
          cost reduction ({formatCurrency(advantageMetrics.totalSavings)} saved),{" "}
          {advantageMetrics.timeAdvantage.toFixed(0)}% faster deployment, and{" "}
          {advantageMetrics.securityAdvantage.toFixed(0)}% superior security posture. With zero CVEs, 95% automation,
          and {advantageMetrics.paybackMonths}-month payback, Portnox represents the clear choice for modern Zero Trust
          NAC.
        </AlertDescription>
      </Alert>
    </div>
  )
}
