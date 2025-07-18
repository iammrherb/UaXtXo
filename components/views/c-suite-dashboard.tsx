"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
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
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Users,
  BarChart3,
  Activity,
  Award,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface CSuiteDashboardProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function CSuiteDashboard({ results, config }: CSuiteDashboardProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  // Executive KPIs calculation
  const executiveKPIs = React.useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0
    const roi = portnoxResult.totalCost > 0 ? (totalSavings / portnoxResult.totalCost) * 100 : 0
    const paybackMonths = totalSavings > 0 ? portnoxResult.totalCost / (totalSavings / (config.years * 12)) : 0

    // Risk metrics
    const avgCompetitorCVEs =
      competitorResults.reduce((sum, r) => {
        return sum + (r.vendorData?.security?.cveCount || 0)
      }, 0) / competitorResults.length

    const avgCompetitorDeployment =
      competitorResults.reduce((sum, r) => {
        return sum + (r.vendorData?.implementation?.deploymentDays || 90)
      }, 0) / competitorResults.length

    // Business impact calculations
    const annualBreachCost = 4500000 // Average data breach cost
    const breachProbabilityReduction = 0.92 // 92% reduction with Portnox
    const annualRiskReduction = annualBreachCost * breachProbabilityReduction

    const productivityGains = config.devices * 1000 // $1000 per device in productivity gains
    const complianceValue = 500000 // Annual compliance cost avoidance

    return {
      totalSavings,
      percentSavings,
      roi,
      paybackMonths,
      avgCompetitorCost,
      avgCompetitorCVEs,
      avgCompetitorDeployment,
      annualRiskReduction,
      productivityGains,
      complianceValue,
      totalBusinessValue: totalSavings + annualRiskReduction + productivityGains + complianceValue,
    }
  }, [portnoxResult, competitorResults, config])

  // Strategic positioning data
  const strategicPositioning = React.useMemo(() => {
    return [
      { metric: "Cost Efficiency", portnox: 95, market: 65, competitor: 45 },
      { metric: "Security Posture", portnox: 98, market: 75, competitor: 60 },
      { metric: "Deployment Speed", portnox: 100, market: 30, competitor: 15 },
      { metric: "Operational Efficiency", portnox: 92, market: 55, competitor: 40 },
      { metric: "Scalability", portnox: 100, market: 60, competitor: 45 },
      { metric: "Innovation", portnox: 95, market: 50, competitor: 35 },
    ]
  }, [])

  // Financial impact timeline
  const financialTimeline = React.useMemo(() => {
    if (!executiveKPIs) return []

    const timeline = []
    const monthlyBenefit = executiveKPIs.totalBusinessValue / (config.years * 12)
    const initialInvestment = portnoxResult?.totalCost || 0

    for (let month = 0; month <= config.years * 12; month += 3) {
      const cumulativeBenefit = monthlyBenefit * month
      const netValue = cumulativeBenefit - initialInvestment
      const roi = initialInvestment > 0 ? (netValue / initialInvestment) * 100 : 0

      timeline.push({
        month,
        quarter: `Q${Math.floor(month / 3) + 1}`,
        cumulativeBenefit,
        netValue,
        roi: Math.max(roi, -100),
        breakeven: netValue >= 0,
      })
    }

    return timeline
  }, [executiveKPIs, config.years, portnoxResult])

  // Risk assessment data
  const riskAssessment = React.useMemo(() => {
    return [
      {
        category: "Cybersecurity Threats",
        currentRisk: 85,
        portnoxRisk: 8,
        impact: "Critical",
        color: "#dc2626",
      },
      {
        category: "Compliance Violations",
        currentRisk: 65,
        portnoxRisk: 5,
        impact: "High",
        color: "#ea580c",
      },
      {
        category: "Operational Downtime",
        currentRisk: 45,
        portnoxRisk: 2,
        impact: "Medium",
        color: "#d97706",
      },
      {
        category: "Vendor Lock-in",
        currentRisk: 75,
        portnoxRisk: 0,
        impact: "High",
        color: "#dc2626",
      },
    ]
  }, [])

  // Business value breakdown
  const businessValueBreakdown = React.useMemo(() => {
    if (!executiveKPIs) return []

    return [
      {
        category: "Direct Cost Savings",
        value: executiveKPIs.totalSavings,
        percentage: (executiveKPIs.totalSavings / executiveKPIs.totalBusinessValue) * 100,
        color: "#10b981",
      },
      {
        category: "Risk Mitigation",
        value: executiveKPIs.annualRiskReduction,
        percentage: (executiveKPIs.annualRiskReduction / executiveKPIs.totalBusinessValue) * 100,
        color: "#3b82f6",
      },
      {
        category: "Productivity Gains",
        value: executiveKPIs.productivityGains,
        percentage: (executiveKPIs.productivityGains / executiveKPIs.totalBusinessValue) * 100,
        color: "#8b5cf6",
      },
      {
        category: "Compliance Value",
        value: executiveKPIs.complianceValue,
        percentage: (executiveKPIs.complianceValue / executiveKPIs.totalBusinessValue) * 100,
        color: "#f59e0b",
      },
    ]
  }, [executiveKPIs])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatLargeCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return formatCurrency(value)
  }

  if (!executiveKPIs) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No executive data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Executive Summary Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Executive Investment Analysis</h1>
            <p className="text-blue-700">
              Strategic NAC Decision Framework for {config.devices.toLocaleString()} Devices
            </p>
          </div>
        </div>

        <Alert className="bg-white/50 border-blue-300">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-blue-900">Strategic Recommendation</AlertTitle>
          <AlertDescription className="text-blue-800">
            <strong>Portnox CLEAR delivers {executiveKPIs.percentSavings.toFixed(0)}% cost reduction</strong> with
            {formatLargeCurrency(executiveKPIs.totalBusinessValue)} in total business value over {config.years} years.
            ROI of {executiveKPIs.roi.toFixed(0)}% with {executiveKPIs.paybackMonths.toFixed(1)}-month payback period
            makes this a compelling strategic investment.
          </AlertDescription>
        </Alert>
      </div>

      {/* Executive KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Total Business Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">
              {formatLargeCurrency(executiveKPIs.totalBusinessValue)}
            </div>
            <p className="text-sm text-green-600 mt-1">Over {config.years} years</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">
                {((executiveKPIs.totalBusinessValue / (portnoxResult?.totalCost || 1)) * 100).toFixed(0)}% value
                multiple
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Return on Investment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{executiveKPIs.roi.toFixed(0)}%</div>
            <p className="text-sm text-blue-600 mt-1">{executiveKPIs.paybackMonths.toFixed(1)} month payback</p>
            <div className="flex items-center gap-1 mt-2">
              <Award className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-blue-600">Industry leading ROI</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Risk Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">
              {formatLargeCurrency(executiveKPIs.annualRiskReduction)}
            </div>
            <p className="text-sm text-purple-600 mt-1">Annual risk mitigation</p>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle2 className="h-3 w-3 text-purple-600" />
              <span className="text-xs text-purple-600">92% breach risk reduction</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              Time to Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-700">30 min</div>
            <p className="text-sm text-orange-600 mt-1">Deployment time</p>
            <div className="flex items-center gap-1 mt-2">
              <Clock className="h-3 w-3 text-orange-600" />
              <span className="text-xs text-orange-600">
                vs {Math.round(executiveKPIs.avgCompetitorDeployment)} days average
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Executive Analysis Tabs */}
      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financial Impact
          </TabsTrigger>
          <TabsTrigger value="strategic" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Strategic Position
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk Management
          </TabsTrigger>
          <TabsTrigger value="operational" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Operational Impact
          </TabsTrigger>
        </TabsList>

        {/* Financial Impact Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Business Value Breakdown</CardTitle>
                <CardDescription>Total value creation over {config.years} years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={businessValueBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, value }) => `${category}: ${formatLargeCurrency(value)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {businessValueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Timeline</CardTitle>
                <CardDescription>Cumulative return on investment by quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={financialTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip
                      formatter={(value: number) => `${value.toFixed(0)}%`}
                      labelFormatter={(label) => `Quarter: ${label}`}
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
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Metrics Summary</CardTitle>
              <CardDescription>Key financial indicators for executive decision making</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 rounded-lg border border-green-200 bg-green-50">
                  <div className="text-2xl font-bold text-green-700">{formatCurrency(executiveKPIs.totalSavings)}</div>
                  <div className="text-sm text-green-600 mt-1">Direct Cost Savings</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {executiveKPIs.percentSavings.toFixed(0)}% reduction vs competitors
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg border border-blue-200 bg-blue-50">
                  <div className="text-2xl font-bold text-blue-700">{executiveKPIs.roi.toFixed(0)}%</div>
                  <div className="text-sm text-blue-600 mt-1">3-Year ROI</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {executiveKPIs.paybackMonths.toFixed(1)} month payback
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg border border-purple-200 bg-purple-50">
                  <div className="text-2xl font-bold text-purple-700">
                    {formatLargeCurrency(executiveKPIs.totalBusinessValue)}
                  </div>
                  <div className="text-sm text-purple-600 mt-1">Total Business Value</div>
                  <div className="text-xs text-muted-foreground mt-1">Including risk mitigation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategic Position Tab */}
        <TabsContent value="strategic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Positioning Analysis</CardTitle>
              <CardDescription>Portnox vs Market vs Closest Competitor across key dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={strategicPositioning}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Portnox CLEAR"
                    dataKey="portnox"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                  <Radar
                    name="Market Average"
                    dataKey="market"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Closest Competitor"
                    dataKey="competitor"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Competitive Advantages</CardTitle>
                <CardDescription>Key differentiators driving business value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-green-200 bg-green-50">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">Cloud-Native Architecture</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Zero infrastructure, infinite scalability, 99.99% uptime SLA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-blue-200 bg-blue-50">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Zero CVE Security Record</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Perfect security track record vs {Math.round(executiveKPIs.avgCompetitorCVEs)} average CVEs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-purple-200 bg-purple-50">
                    <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Rapid Deployment</h4>
                      <p className="text-sm text-purple-700 mt-1">
                        30-minute deployment vs {Math.round(executiveKPIs.avgCompetitorDeployment)} days average
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Position</CardTitle>
                <CardDescription>Industry leadership metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Cost Efficiency</span>
                      <span className="text-muted-foreground">95% vs 65% market</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Security Leadership</span>
                      <span className="text-muted-foreground">98% vs 75% market</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Innovation Index</span>
                      <span className="text-muted-foreground">95% vs 50% market</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Deployment Speed</span>
                      <span className="text-muted-foreground">100% vs 30% market</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Management Tab */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Risk Assessment</CardTitle>
              <CardDescription>Current risk exposure vs Portnox risk mitigation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {riskAssessment.map((risk) => (
                  <div key={risk.category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{risk.category}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            risk.impact === "Critical"
                              ? "border-red-300 text-red-700"
                              : risk.impact === "High"
                                ? "border-orange-300 text-orange-700"
                                : "border-yellow-300 text-yellow-700"
                          }`}
                        >
                          {risk.impact} Impact
                        </Badge>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-medium">
                          {risk.currentRisk}% → {risk.portnoxRisk}%
                        </div>
                        <div className="text-muted-foreground">
                          {(((risk.currentRisk - risk.portnoxRisk) / risk.currentRisk) * 100).toFixed(0)}% reduction
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Current Risk</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${risk.currentRisk}%`,
                              backgroundColor: risk.color,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">With Portnox</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: `${risk.portnoxRisk}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Current Risk Exposure
                </CardTitle>
                <CardDescription className="text-red-700">Without modern NAC protection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-4 rounded-lg border border-red-300 bg-red-100">
                    <div className="text-2xl font-bold text-red-700">$4.5M</div>
                    <div className="text-sm text-red-600">Average breach cost</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-red-300 bg-red-100">
                    <div className="text-2xl font-bold text-red-700">85%</div>
                    <div className="text-sm text-red-600">Annual breach probability</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-red-300 bg-red-100">
                    <div className="text-2xl font-bold text-red-700">{Math.round(executiveKPIs.avgCompetitorCVEs)}</div>
                    <div className="text-sm text-red-600">Average CVEs per vendor</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Portnox Risk Mitigation
                </CardTitle>
                <CardDescription className="text-green-700">Comprehensive protection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-4 rounded-lg border border-green-300 bg-green-100">
                    <div className="text-2xl font-bold text-green-700">92%</div>
                    <div className="text-sm text-green-600">Breach risk reduction</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-green-300 bg-green-100">
                    <div className="text-2xl font-bold text-green-700">0</div>
                    <div className="text-sm text-green-600">CVEs since inception</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-green-300 bg-green-100">
                    <div className="text-2xl font-bold text-green-700">
                      {formatLargeCurrency(executiveKPIs.annualRiskReduction)}
                    </div>
                    <div className="text-sm text-green-600">Annual risk value</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Operational Impact Tab */}
        <TabsContent value="operational" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Operational Efficiency Gains</CardTitle>
                <CardDescription>Productivity and efficiency improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Admin Overhead Reduction</div>
                        <div className="text-sm text-muted-foreground">FTE savings</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-700">90%</div>
                      <div className="text-xs text-muted-foreground">vs traditional NAC</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium">Deployment Speed</div>
                        <div className="text-sm text-muted-foreground">Time to production</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-700">30 min</div>
                      <div className="text-xs text-muted-foreground">vs 90+ days</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <div>
                        <div className="font-medium">Automation Level</div>
                        <div className="text-sm text-muted-foreground">Self-healing operations</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-700">95%</div>
                      <div className="text-xs text-muted-foreground">vs 65% average</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Continuity</CardTitle>
                <CardDescription>Uptime and reliability metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-lg border border-green-200 bg-green-50">
                    <div className="text-3xl font-bold text-green-700">99.99%</div>
                    <div className="text-sm text-green-600 mt-1">Uptime SLA</div>
                    <div className="text-xs text-muted-foreground mt-1">4.38 minutes downtime/year</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="text-3xl font-bold text-blue-700">0</div>
                    <div className="text-sm text-blue-600 mt-1">Maintenance Windows</div>
                    <div className="text-xs text-muted-foreground mt-1">Continuous updates</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-purple-200 bg-purple-50">
                    <div className="text-3xl font-bold text-purple-700">Global</div>
                    <div className="text-sm text-purple-600 mt-1">Redundancy</div>
                    <div className="text-xs text-muted-foreground mt-1">Multi-region deployment</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Productivity Impact Analysis</CardTitle>
              <CardDescription>Quantified productivity gains across the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-blue-700">
                    {formatLargeCurrency(executiveKPIs.productivityGains)}
                  </div>
                  <div className="text-sm text-blue-600 mt-1">Annual Productivity Gains</div>
                  <div className="text-xs text-muted-foreground mt-1">$1,000 per device efficiency improvement</div>
                </div>
                <div className="text-center p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-green-700">
                    {formatLargeCurrency(executiveKPIs.complianceValue)}
                  </div>
                  <div className="text-sm text-green-600 mt-1">Compliance Value</div>
                  <div className="text-xs text-muted-foreground mt-1">Automated compliance reporting</div>
                </div>
                <div className="text-center p-4 rounded-lg border">
                  <div className="text-2xl font-bold text-purple-700">2.5</div>
                  <div className="text-sm text-purple-600 mt-1">FTE Savings</div>
                  <div className="text-xs text-muted-foreground mt-1">Reduced operational overhead</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Executive Action Items */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Executive Action Items
          </CardTitle>
          <CardDescription className="text-blue-700">Recommended next steps for decision makers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800">Immediate Actions (Next 30 Days)</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Schedule Portnox executive briefing and technical demo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Initiate 30-day proof of concept deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Review current NAC vendor contracts and exit clauses</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-800">Strategic Planning (Next 90 Days)</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Develop migration timeline and change management plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Secure budget approval for {formatCurrency(portnoxResult?.totalCost || 0)} investment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Begin stakeholder alignment and communication strategy</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
