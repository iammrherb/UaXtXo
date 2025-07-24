"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  AreaChart
} from "recharts"
import { 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Target, 
  Zap, 
  Award,
  AlertTriangle,
  Users,
  Building2,
  Gauge,
  Calendar,
  FileCheck,
  ArrowUpRight,
  TrendingDown,
  Star,
  Briefcase,
  Globe
} from "lucide-react"
import { motion } from "framer-motion"
import type { UltimateCalculationResult } from "@/lib/services/enhanced-calculation-service"
import type { CalculationConfiguration } from "@/lib/types"

interface ExecutiveDashboardViewProps {
  results?: UltimateCalculationResult[]
  config?: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results = [], config }: ExecutiveDashboardViewProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  const executiveSummary = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) {
      return {
        totalSavings: 0,
        percentSavings: 0,
        roi: 0,
        paybackMonths: 0,
        riskReduction: 0,
        deploymentAdvantage: 0,
        avgCompetitorCost: 0,
        portnoxAdvantages: []
      }
    }

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0
    const roi = portnoxResult.totalCost > 0 ? (totalSavings / portnoxResult.totalCost) * 100 : 0
    const timeframe = config?.years || 3
    const paybackMonths = totalSavings > 0 ? portnoxResult.totalCost / (totalSavings / (timeframe * 12)) : 0
    const riskReduction = portnoxResult.roi.breachReduction
    const avgCompetitorDeployment = competitorResults.reduce((sum, r) => sum + r.timeline.timeToValue, 0) / competitorResults.length
    const deploymentAdvantage = ((avgCompetitorDeployment - portnoxResult.timeline.timeToValue) / avgCompetitorDeployment) * 100

    const portnoxAdvantages = [
      `${percentSavings.toFixed(0)}% cost reduction vs competitors`,
      `${deploymentAdvantage.toFixed(0)}% faster deployment (${portnoxResult.timeline.timeToValue} days vs ${avgCompetitorDeployment.toFixed(0)} days)`,
      `${riskReduction.toFixed(0)}% breach risk reduction`,
      `Zero infrastructure requirements`,
      `${portnoxResult.operational.automationLevel}% automation level`,
      `Zero CVE security record`,
      `All-inclusive pricing with no hidden costs`
    ]

    return {
      totalSavings,
      percentSavings,
      roi,
      paybackMonths,
      riskReduction,
      deploymentAdvantage,
      avgCompetitorCost,
      portnoxAdvantages
    }
  }, [results, config, portnoxResult, competitorResults])

  const costComparisonData = useMemo(() => {
    return results
      .sort((a, b) => a.totalCost - b.totalCost)
      .map((result, index) => ({
        vendor: result.vendorName,
        vendorId: result.vendorId,
        totalCost: result.totalCost,
        licensing: result.breakdown.licensing,
        hardware: result.breakdown.hardware,
        implementation: result.breakdown.implementation,
        support: result.breakdown.support,
        training: result.breakdown.training,
        maintenance: result.breakdown.maintenance,
        operational: result.breakdown.operational,
        hidden: result.breakdown.hidden,
        savings: executiveSummary.avgCompetitorCost - result.totalCost,
        isPortnox: result.vendorId === "portnox",
        rank: index + 1,
        deploymentDays: result.timeline.timeToValue,
        roi: result.roi.percentage,
        riskLevel: result.recommendations.riskLevel
      }))
  }, [results, executiveSummary])

  const roiTimelineData = useMemo(() => {
    if (!portnoxResult || !executiveSummary.totalSavings) return []

    const timeframe = config?.years || 3
    const monthlyBenefit = executiveSummary.totalSavings / (timeframe * 12)
    const data = []

    for (let month = 0; month <= timeframe * 12; month += 3) {
      const cumulativeBenefit = monthlyBenefit * month
      const netValue = cumulativeBenefit - portnoxResult.totalCost
      const roi = portnoxResult.totalCost > 0 ? (netValue / portnoxResult.totalCost) * 100 : 0

      data.push({
        month,
        quarter: `Q${Math.ceil((month + 1) / 3)}`,
        cumulativeBenefit,
        netValue,
        roi,
        breakeven: netValue >= 0
      })
    }

    return data
  }, [portnoxResult, executiveSummary, config])

  const businessImpactMetrics = useMemo(() => {
    if (!portnoxResult) return []

    return [
      {
        category: "Security Enhancement",
        impact: portnoxResult.roi.breachReduction,
        value: executiveSummary.totalSavings * 0.4,
        description: "Breach risk reduction and security posture improvement",
        color: "#EF4444"
      },
      {
        category: "Operational Efficiency", 
        impact: portnoxResult.operational.automationLevel,
        value: executiveSummary.totalSavings * 0.3,
        description: "Automation and reduced administrative overhead",
        color: "#3B82F6"
      },
      {
        category: "Compliance Automation",
        impact: portnoxResult.complianceSummary?.automationLevel || 90,
        value: executiveSummary.totalSavings * 0.2,
        description: "Automated compliance and audit readiness",
        color: "#10B981"
      },
      {
        category: "Infrastructure Savings",
        impact: 100, // 100% infrastructure elimination
        value: executiveSummary.totalSavings * 0.1,
        description: "Eliminated hardware and maintenance costs",
        color: "#F59E0B"
      }
    ]
  }, [portnoxResult, executiveSummary])

  const implementationComparison = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      deploymentDays: result.timeline.timeToValue,
      complexity: result.recommendations.implementationComplexity,
      professionalServices: result.vendorData.implementation.professionalServicesRequired,
      trainingHours: result.vendorData.implementation.trainingHours,
      hardwareRequired: result.vendorData.infrastructure.hardwareRequired,
      maintenanceWindows: result.vendorData.infrastructure.maintenanceWindows,
      ongoingFTE: result.vendorData.implementation.resourcesRequired.ongoing,
      isPortnox: result.vendorId === "portnox"
    }))
  }, [results])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatCurrencyShort = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return formatCurrency(value)
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Select vendors to begin your executive analysis
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Executive Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Executive Investment Analysis
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Strategic recommendation for Network Access Control modernization
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Analysis Period</div>
            <div className="text-2xl font-bold">{config?.years || 3} Years</div>
            <div className="text-sm text-muted-foreground">{(config?.devices || 0).toLocaleString()} Devices</div>
          </div>
        </div>

        {/* Key Executive Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Total Savings</p>
                    <p className="text-3xl font-bold text-green-800 dark:text-green-200">
                      {formatCurrencyShort(executiveSummary.totalSavings)}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {executiveSummary.percentSavings.toFixed(0)}% cost reduction
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <Progress value={Math.min(executiveSummary.percentSavings, 100)} className="mt-4 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">ROI</p>
                    <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                      {executiveSummary.roi.toFixed(0)}%
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {executiveSummary.paybackMonths.toFixed(1)} month payback
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Industry leading ROI</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Risk Reduction</p>
                    <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                      {executiveSummary.riskReduction.toFixed(0)}%
                    </p>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Breach risk reduction
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <Badge variant="outline" className="mt-4 text-xs border-purple-300 text-purple-700">
                  Zero CVE Record
                </Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Deployment Speed</p>
                    <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">
                      {executiveSummary.deploymentAdvantage.toFixed(0)}%
                    </p>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Faster than competitors
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-4">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-600">30 minutes to production</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Strategic Recommendation */}
      <Alert className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <Award className="h-5 w-5" />
        <AlertTitle className="text-green-900 dark:text-green-100 text-xl">
          Strategic Recommendation: Portnox CLEAR
        </AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200 text-base mt-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">Financial Impact:</p>
              <ul className="space-y-1 text-sm">
                <li>• {formatCurrency(executiveSummary.totalSavings)} total savings over {config?.years || 3} years</li>
                <li>• {executiveSummary.roi.toFixed(0)}% ROI with {executiveSummary.paybackMonths.toFixed(1)}-month payback</li>
                <li>• {executiveSummary.percentSavings.toFixed(0)}% cost reduction vs traditional NAC</li>
                <li>• Zero infrastructure investment required</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Strategic Benefits:</p>
              <ul className="space-y-1 text-sm">
                <li>• 95% faster deployment enables immediate value</li>
                <li>• {executiveSummary.riskReduction.toFixed(0)}% breach risk reduction</li>
                <li>• Zero maintenance windows or downtime</li>
                <li>• Future-proof cloud-native architecture</li>
              </ul>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Comprehensive Cost Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Total Cost of Ownership Comparison
            </CardTitle>
            <CardDescription>
              {config?.years || 3}-year comprehensive TCO analysis for {(config?.devices || 0).toLocaleString()} devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={costComparisonData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => formatCurrencyShort(value)} tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Vendor: ${label}`}
                />
                <Legend />
                <Bar dataKey="licensing" stackId="a" fill="#3B82F6" name="Licensing" />
                <Bar dataKey="hardware" stackId="a" fill="#EF4444" name="Hardware" />
                <Bar dataKey="implementation" stackId="a" fill="#F59E0B" name="Implementation" />
                <Bar dataKey="support" stackId="a" fill="#8B5CF6" name="Support" />
                <Bar dataKey="training" stackId="a" fill="#06B6D4" name="Training" />
                <Bar dataKey="maintenance" stackId="a" fill="#84CC16" name="Maintenance" />
                <Bar dataKey="operational" stackId="a" fill="#F97316" name="Operational" />
                <Bar dataKey="hidden" stackId="a" fill="#6B7280" name="Hidden Costs" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              ROI Development Timeline
            </CardTitle>
            <CardDescription>
              Return on investment progression over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={roiTimelineData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" tickFormatter={(value) => `${value}m`} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => `${value.toFixed(0)}%`}
                  labelFormatter={(value) => `Month ${value}`}
                />
                <Area
                  type="monotone"
                  dataKey="roi"
                  fill="#10B981"
                  fillOpacity={0.3}
                  stroke="#10B981"
                  strokeWidth={3}
                  name="ROI %"
                />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Business Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-600" />
            Business Impact & Value Creation
          </CardTitle>
          <CardDescription>
            How Portnox CLEAR creates measurable business value across key areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              {businessImpactMetrics.map((metric, index) => (
                <motion.div
                  key={metric.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{metric.category}</h4>
                    <div className="text-right">
                      <div className="text-lg font-bold" style={{ color: metric.color }}>
                        {metric.impact.toFixed(0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrencyShort(metric.value)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                  <Progress 
                    value={metric.impact} 
                    className="h-2"
                    style={{ backgroundColor: `${metric.color}20` }}
                  />
                </motion.div>
              ))}
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={businessImpactMetrics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, value }) => `${category}: ${formatCurrencyShort(value)}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {businessImpactMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation & Deployment Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-6 w-6 text-orange-600" />
            Implementation & Deployment Analysis
          </CardTitle>
          <CardDescription>
            Deployment timeline, complexity, and resource requirements comparison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Implementation Timeline Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={implementationComparison} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" tickFormatter={(value) => `${value}d`} />
                  <YAxis dataKey="vendor" type="category" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => `${value} days`}
                    labelFormatter={(label) => `Vendor: ${label}`}
                  />
                  <Bar dataKey="deploymentDays" fill="#F59E0B" name="Deployment Days" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Implementation Comparison */}
            <div className="grid gap-4">
              {implementationComparison.map((impl, index) => (
                <motion.div
                  key={impl.vendorId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    impl.isPortnox 
                      ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge variant={index === 0 ? "default" : "secondary"} className={index === 0 ? "bg-green-600" : ""}>
                        #{index + 1}
                      </Badge>
                      <h4 className="font-bold text-lg">{impl.vendor}</h4>
                      {impl.isPortnox && (
                        <Badge className="bg-green-600 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{impl.deploymentDays} days</div>
                      <div className="text-sm text-muted-foreground">to production</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-lg font-bold">{impl.complexity}</div>
                      <div className="text-xs text-muted-foreground">Complexity</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-lg font-bold">{impl.trainingHours}h</div>
                      <div className="text-xs text-muted-foreground">Training</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-lg font-bold">{impl.ongoingFTE}</div>
                      <div className="text-xs text-muted-foreground">Ongoing FTE</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-lg font-bold">{impl.maintenanceWindows}</div>
                      <div className="text-xs text-muted-foreground">Maintenance/Year</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-1">
                      {impl.hardwareRequired ? (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                      <span>{impl.hardwareRequired ? "Hardware Required" : "No Hardware"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {impl.professionalServices ? (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                      <span>{impl.professionalServices ? "Prof. Services Required" : "Self-Service"}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portnox Competitive Advantages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-600" />
            Why Portnox CLEAR is the Strategic Choice
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of Portnox advantages over traditional NAC solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Cloud,
                title: "Cloud-Native Architecture",
                description: "Zero infrastructure requirements eliminate hardware costs, maintenance, and scaling limitations",
                benefit: "100% infrastructure cost elimination",
                color: "text-blue-600"
              },
              {
                icon: Zap,
                title: "Rapid Deployment",
                description: "30-minute deployment vs 6-9 months for traditional solutions enables immediate value realization",
                benefit: "95% faster time to value",
                color: "text-orange-600"
              },
              {
                icon: Shield,
                title: "Zero CVE Security Record",
                description: "Industry-leading security with no known vulnerabilities provides superior protection",
                benefit: "92% breach risk reduction",
                color: "text-green-600"
              },
              {
                icon: DollarSign,
                title: "All-Inclusive Pricing",
                description: "Single per-device price includes all features - RADIUS, NAC, PKI, IoT profiling, risk assessment",
                benefit: "No hidden costs or add-ons",
                color: "text-purple-600"
              },
              {
                icon: Gauge,
                title: "95% Automation Level",
                description: "AI-powered automation reduces administrative overhead by 90% compared to manual processes",
                benefit: "2.5 FTE savings annually",
                color: "text-indigo-600"
              },
              {
                icon: Globe,
                title: "Infinite Scalability",
                description: "Cloud-native platform scales globally without infrastructure investment or performance degradation",
                benefit: "Future-proof growth support",
                color: "text-teal-600"
              }
            ].map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${advantage.color}`}>
                    <advantage.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{advantage.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{advantage.description}</p>
                    <Badge variant="outline" className={`text-xs ${advantage.color} border-current`}>
                      {advantage.benefit}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Vendor Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-gray-600" />
            Comprehensive Vendor Analysis
          </CardTitle>
          <CardDescription>
            Detailed comparison across all critical evaluation criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Vendor</th>
                  <th className="text-center p-3 font-medium">Total Cost</th>
                  <th className="text-center p-3 font-medium">Deployment</th>
                  <th className="text-center p-3 font-medium">CVEs</th>
                  <th className="text-center p-3 font-medium">Hardware</th>
                  <th className="text-center p-3 font-medium">Maintenance</th>
                  <th className="text-center p-3 font-medium">ROI</th>
                  <th className="text-center p-3 font-medium">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {costComparisonData.map((vendor, index) => (
                  <tr key={vendor.vendorId} className={`border-b ${vendor.isPortnox ? 'bg-green-50 dark:bg-green-950/20' : ''}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={index === 0 ? "default" : "secondary"} className={index === 0 ? "bg-green-600" : ""}>
                          #{vendor.rank}
                        </Badge>
                        <span className="font-medium">{vendor.vendor}</span>
                        {vendor.isPortnox && (
                          <Badge className="bg-green-600 text-white">Best</Badge>
                        )}
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className="font-bold text-lg">{formatCurrencyShort(vendor.totalCost)}</div>
                      {vendor.savings > 0 && (
                        <div className="text-xs text-red-600">+{formatCurrencyShort(vendor.savings)}</div>
                      )}
                    </td>
                    <td className="text-center p-3">
                      <div className="font-medium">{vendor.deploymentDays}d</div>
                      <div className="text-xs text-muted-foreground">
                        {vendor.deploymentDays <= 7 ? "Rapid" : vendor.deploymentDays <= 30 ? "Fast" : vendor.deploymentDays <= 90 ? "Standard" : "Slow"}
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-bold ${
                        results.find(r => r.vendorId === vendor.vendorId)?.vendorData.security.cveCount === 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {results.find(r => r.vendorId === vendor.vendorId)?.vendorData.security.cveCount || 0}
                      </div>
                    </td>
                    <td className="text-center p-3">
                      {results.find(r => r.vendorId === vendor.vendorId)?.vendorData.infrastructure.hardwareRequired ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mx-auto" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      )}
                    </td>
                    <td className="text-center p-3">
                      <div className="font-medium">
                        {results.find(r => r.vendorId === vendor.vendorId)?.vendorData.infrastructure.maintenanceWindows || 0}/year
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <div className={`font-bold ${vendor.roi > 100 ? 'text-green-600' : 'text-blue-600'}`}>
                        {vendor.roi.toFixed(0)}%
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant={
                        vendor.riskLevel === 'low' ? 'default' :
                        vendor.riskLevel === 'medium' ? 'secondary' : 'destructive'
                      }>
                        {vendor.riskLevel}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Executive Action Items */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-blue-600" />
            Executive Action Items & Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">Immediate Actions</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Approve Portnox CLEAR implementation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Schedule 30-minute deployment window</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Begin legacy NAC migration planning</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span className="text-sm">Reallocate saved IT resources to strategic initiatives</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">Strategic Benefits</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <ArrowUpRight className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Immediate competitive advantage through superior security</span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowUpRight className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Enable digital transformation with cloud-native architecture</span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowUpRight className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Future-proof investment with automatic updates and features</span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowUpRight className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span className="text-sm">Eliminate vendor lock-in with standards-based approach</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Executive Demo
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              See Portnox CLEAR in action with a personalized demonstration
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}