"use client"

import { useMemo, useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ReferenceLine
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Shield,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Award,
  Target,
  Zap,
  Building2,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Gauge,
  Brain,
  Cloud,
  Server,
  Database,
  Wifi,
  Lock,
  Eye,
  RefreshCw,
  Download,
  Share2,
  Info,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  FileText,
  Settings,
  HelpCircle
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import numeral from "numeral"
import type { UltimateCalculationResult } from "@/lib/services/enhanced-calculation-service"
import type { CalculationConfiguration } from "@/lib/types"

interface ExecutiveDashboardViewProps {
  results: UltimateCalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results, config }: ExecutiveDashboardViewProps) {
  const [selectedMetric, setSelectedMetric] = useState<string>('tco')
  const [isRealTimeActive, setIsRealTimeActive] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Find Portnox result for comparisons
  const portnoxResult = useMemo(() => 
    results.find(r => r.vendorId === 'portnox'), [results]
  )

  const competitorResults = useMemo(() => 
    results.filter(r => r.vendorId !== 'portnox'), [results]
  )

  // Executive Summary Metrics
  const executiveSummary = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const savingsPercentage = (totalSavings / avgCompetitorCost) * 100

    const avgCompetitorROI = competitorResults.reduce((sum, r) => sum + r.roi.percentage, 0) / competitorResults.length
    const roiAdvantage = portnoxResult.roi.percentage - avgCompetitorROI

    const avgCompetitorPayback = competitorResults.reduce((sum, r) => sum + r.roi.paybackMonths, 0) / competitorResults.length
    const paybackAdvantage = avgCompetitorPayback - portnoxResult.roi.paybackMonths

    const avgCompetitorSecurity = competitorResults.reduce((sum, r) => sum + r.risk.securityScore, 0) / competitorResults.length
    const securityAdvantage = portnoxResult.risk.securityScore - avgCompetitorSecurity

    return {
      totalSavings,
      savingsPercentage,
      roiAdvantage,
      paybackAdvantage,
      securityAdvantage,
      avgCompetitorCost,
      avgCompetitorROI,
      avgCompetitorPayback,
      avgCompetitorSecurity
    }
  }, [portnoxResult, competitorResults])

  // Cost Comparison Data
  const costComparisonData = useMemo(() => {
    return results.map(result => ({
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
      isPortnox: result.vendorId === 'portnox',
      perDevicePerMonth: result.perDevicePerMonth,
      riskLevel: result.recommendations.riskLevel
    })).sort((a, b) => a.totalCost - b.totalCost)
  }, [results])

  // ROI Timeline Data
  const roiTimelineData = useMemo(() => {
    if (!portnoxResult) return []

    const data = []
    const monthlyBenefit = portnoxResult.roi.annualSavings / 12
    
    for (let month = 0; month <= config.years * 12; month += 3) {
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
  }, [portnoxResult, config.years])

  // Security Comparison Data
  const securityComparisonData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      securityScore: result.risk.securityScore,
      cveCount: result.vendorData.security?.cveCount || 0,
      zeroTrustMaturity: result.vendorData.security?.zeroTrustMaturity || 0,
      complianceScore: result.risk.complianceScore,
      breachReduction: result.risk.breachReduction,
      isPortnox: result.vendorId === 'portnox'
    }))
  }, [results])

  // Implementation Timeline Data
  const implementationData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      deploymentDays: result.timeline.timeToValue,
      complexity: result.recommendations.implementationComplexity,
      requiredFTE: result.operational.fteSaved > 0 ? 4 - result.operational.fteSaved : 4,
      trainingHours: result.timeline.trainingDays * 8,
      isPortnox: result.vendorId === 'portnox'
    }))
  }, [results])

  // Business Impact Data
  const businessImpactData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      securityValue: result.roi.valueDrivers.securityValue,
      operationalValue: result.roi.valueDrivers.operationalValue,
      complianceValue: result.roi.valueDrivers.complianceValue,
      productivityValue: result.roi.valueDrivers.productivityValue,
      infrastructureValue: result.roi.valueDrivers.infrastructureValue,
      innovationValue: result.roi.valueDrivers.innovationValue || 0,
      totalValue: Object.values(result.roi.valueDrivers).reduce((sum, val) => sum + (val || 0), 0),
      isPortnox: result.vendorId === 'portnox'
    }))
  }, [results])

  // Operational Efficiency Data
  const operationalData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      automationLevel: result.operational.automationLevel,
      fteSaved: result.operational.fteSaved,
      mttr: result.operational.mttr,
      maintenanceWindows: result.operational.maintenanceWindows,
      deploymentSpeed: result.operational.deploymentSpeed,
      userExperience: result.operational.userExperienceScore,
      isPortnox: result.vendorId === 'portnox'
    }))
  }, [results])

  // Format currency
  const formatCurrency = (value: number) => numeral(value).format('$0,0')
  const formatCurrencyShort = (value: number) => numeral(value).format('$0.0a')
  const formatPercent = (value: number) => `${value.toFixed(1)}%`

  // Chart colors
  const COLORS = {
    portnox: '#10B981',
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    warning: '#F59E0B',
    danger: '#EF4444',
    success: '#10B981',
    info: '#06B6D4'
  }

  const getVendorColor = (vendorId: string, index: number) => {
    if (vendorId === 'portnox') return COLORS.portnox
    const colors = [COLORS.primary, COLORS.secondary, COLORS.warning, COLORS.info]
    return colors[index % colors.length]
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
          <h4 className="font-semibold mb-2">{label}</h4>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm">
                  {entry.name}: {
                    typeof entry.value === 'number' && entry.value > 1000 
                      ? formatCurrency(entry.value)
                      : entry.value
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center max-w-md">
          <CardContent>
            <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Analysis Data</h3>
            <p className="text-muted-foreground mb-4">
              Please select vendors and configure your analysis parameters to view the executive dashboard.
            </p>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure Analysis
            </Button>
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
        className="relative overflow-hidden"
      >
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold text-green-900 dark:text-green-100 flex items-center gap-3">
                  <Award className="h-8 w-8 text-green-600" />
                  Executive Investment Recommendation
                </CardTitle>
                <CardDescription className="text-lg text-green-700 dark:text-green-300 mt-2">
                  Strategic analysis for {config.industry} industry • {numeral(config.devices).format('0,0')} devices • {config.years}-year projection
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600 text-white px-4 py-2 text-lg">
                  <Star className="w-4 h-4 mr-1" />
                  Recommended: Portnox CLEAR
                </Badge>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule Demo
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {executiveSummary && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {formatCurrencyShort(executiveSummary.totalSavings)}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300 mb-1">Total Savings</div>
                  <div className="text-xs text-muted-foreground">
                    {formatPercent(executiveSummary.savingsPercentage)} vs competitors
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {formatPercent(portnoxResult?.roi.percentage || 0)}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">ROI</div>
                  <div className="text-xs text-muted-foreground">
                    +{formatPercent(executiveSummary.roiAdvantage)} vs avg
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {portnoxResult?.roi.paybackMonths.toFixed(1)}m
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Payback</div>
                  <div className="text-xs text-muted-foreground">
                    {executiveSummary.paybackAdvantage.toFixed(1)}m faster
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {portnoxResult?.risk.breachReduction.toFixed(0)}%
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300 mb-1">Risk Reduction</div>
                  <div className="text-xs text-muted-foreground">
                    +{executiveSummary.securityAdvantage.toFixed(0)} vs avg
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Strategic Recommendation Summary
                </h4>
                <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed">
                  {portnoxResult?.recommendations.executiveSummary}
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 h-auto bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2 py-3">
            <DollarSign className="h-4 w-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 py-3">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="operational" className="flex items-center gap-2 py-3">
            <Gauge className="h-4 w-4" />
            Operations
          </TabsTrigger>
          <TabsTrigger value="implementation" className="flex items-center gap-2 py-3">
            <Clock className="h-4 w-4" />
            Implementation
          </TabsTrigger>
          <TabsTrigger value="strategic" className="flex items-center gap-2 py-3">
            <Target className="h-4 w-4" />
            Strategic
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Total Cost Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Total Cost of Ownership Comparison
                </CardTitle>
                <CardDescription>
                  {config.years}-year TCO analysis for {numeral(config.devices).format('0,0')} devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="vendor" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        tickFormatter={formatCurrencyShort}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="totalCost" 
                        name="Total Cost"
                        radius={[4, 4, 0, 0]}
                      >
                        {costComparisonData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={getVendorColor(entry.vendorId, index)}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* ROI Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Portnox ROI Development
                </CardTitle>
                <CardDescription>
                  Return on investment timeline and break-even analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={roiTimelineData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="month" 
                        tickFormatter={(value) => `${value}m`}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        yAxisId="left"
                        tickFormatter={formatPercent}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={formatCurrencyShort}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      
                      <ReferenceLine 
                        yAxisId="left"
                        y={0} 
                        stroke="#6B7280" 
                        strokeDasharray="2 2" 
                        label="Break-even"
                      />
                      
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="cumulativeBenefit"
                        fill={COLORS.primary}
                        fillOpacity={0.3}
                        stroke={COLORS.primary}
                        strokeWidth={2}
                        name="Cumulative Benefit"
                      />

                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="roi"
                        stroke={COLORS.success}
                        strokeWidth={3}
                        dot={{ fill: COLORS.success, strokeWidth: 2, r: 4 }}
                        name="ROI %"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vendor Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Vendor Analysis</CardTitle>
              <CardDescription>
                Detailed comparison across all key metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Vendor</th>
                      <th className="text-center p-3 font-medium">Total Cost</th>
                      <th className="text-center p-3 font-medium">Per Device/Month</th>
                      <th className="text-center p-3 font-medium">ROI %</th>
                      <th className="text-center p-3 font-medium">Payback</th>
                      <th className="text-center p-3 font-medium">Security Score</th>
                      <th className="text-center p-3 font-medium">Deployment</th>
                      <th className="text-center p-3 font-medium">Risk Level</th>
                      <th className="text-center p-3 font-medium">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <motion.tr
                        key={result.vendorId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-b ${result.vendorId === 'portnox' ? 'bg-green-50 dark:bg-green-950/20' : ''}`}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                              #{index + 1}
                            </Badge>
                            <span className="font-medium">{result.vendorName}</span>
                            {result.vendorId === 'portnox' && (
                              <Badge className="bg-green-600">
                                <Award className="w-3 h-3 mr-1" />
                                Best
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-center p-3 font-bold">
                          {formatCurrency(result.totalCost)}
                        </td>
                        <td className="text-center p-3">
                          {formatCurrency(result.perDevicePerMonth)}
                        </td>
                        <td className="text-center p-3">
                          <span className={`font-bold ${result.roi.percentage > 100 ? 'text-green-600' : 'text-blue-600'}`}>
                            {formatPercent(result.roi.percentage)}
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span className={`font-medium ${result.roi.paybackMonths < 12 ? 'text-green-600' : 'text-orange-600'}`}>
                            {result.roi.paybackMonths.toFixed(1)}m
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span className={`font-medium ${result.risk.securityScore > 90 ? 'text-green-600' : result.risk.securityScore > 70 ? 'text-blue-600' : 'text-red-600'}`}>
                            {result.risk.securityScore}/100
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span className={`font-medium ${result.timeline.timeToValue < 7 ? 'text-green-600' : result.timeline.timeToValue < 30 ? 'text-blue-600' : 'text-orange-600'}`}>
                            {result.timeline.timeToValue}d
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <Badge variant={
                            result.recommendations.riskLevel === 'low' ? 'default' :
                            result.recommendations.riskLevel === 'medium' ? 'secondary' :
                            result.recommendations.riskLevel === 'high' ? 'destructive' : 'destructive'
                          }>
                            {result.recommendations.riskLevel}
                          </Badge>
                        </td>
                        <td className="text-center p-3">
                          <Badge variant={
                            result.recommendations.overallScore > 80 ? 'default' :
                            result.recommendations.overallScore > 60 ? 'secondary' : 'outline'
                          }>
                            {result.recommendations.overallScore.toFixed(0)}/100
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Cost Breakdown</CardTitle>
                <CardDescription>
                  Comprehensive cost analysis by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="vendor" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        tickFormatter={formatCurrencyShort}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="licensing" stackId="a" fill="#3B82F6" name="Licensing" />
                      <Bar dataKey="hardware" stackId="a" fill="#10B981" name="Hardware" />
                      <Bar dataKey="implementation" stackId="a" fill="#F59E0B" name="Implementation" />
                      <Bar dataKey="support" stackId="a" fill="#EF4444" name="Support" />
                      <Bar dataKey="training" stackId="a" fill="#8B5CF6" name="Training" />
                      <Bar dataKey="maintenance" stackId="a" fill="#06B6D4" name="Maintenance" />
                      <Bar dataKey="operational" stackId="a" fill="#84CC16" name="Operational" />
                      <Bar dataKey="hidden" stackId="a" fill="#F97316" name="Hidden Costs" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Business Value Creation */}
            <Card>
              <CardHeader>
                <CardTitle>Business Value Creation</CardTitle>
                <CardDescription>
                  Value drivers and business impact analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={businessImpactData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" tickFormatter={formatCurrencyShort} />
                      <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="securityValue" fill="#EF4444" name="Security Value" />
                      <Bar dataKey="operationalValue" fill="#10B981" name="Operational Value" />
                      <Bar dataKey="complianceValue" fill="#3B82F6" name="Compliance Value" />
                      <Bar dataKey="productivityValue" fill="#8B5CF6" name="Productivity Value" />
                      <Bar dataKey="infrastructureValue" fill="#F59E0B" name="Infrastructure Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {results.map((result, index) => (
              <motion.div
                key={result.vendorId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={result.vendorId === 'portnox' ? 'border-green-200 bg-green-50 dark:bg-green-950/20' : ''}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {result.vendorName}
                      {result.vendorId === 'portnox' && (
                        <Badge className="bg-green-600">Best Value</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Total Cost</div>
                        <div className="font-bold text-lg">{formatCurrencyShort(result.totalCost)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Per Device</div>
                        <div className="font-bold text-lg">{formatCurrency(result.perDevicePerMonth)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">ROI</div>
                        <div className="font-bold text-green-600">{formatPercent(result.roi.percentage)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">NPV</div>
                        <div className="font-bold text-blue-600">{formatCurrencyShort(result.roi.netPresentValue)}</div>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(100, result.recommendations.overallScore)} 
                      className="h-2" 
                    />
                    <div className="text-xs text-center text-muted-foreground">
                      Overall Score: {result.recommendations.overallScore.toFixed(0)}/100
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Security Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Security Posture Analysis
                </CardTitle>
                <CardDescription>
                  Multi-dimensional security assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={[
                      {
                        category: 'Overall Security',
                        ...Object.fromEntries(securityComparisonData.map(d => [d.vendor, d.securityScore]))
                      },
                      {
                        category: 'Zero Trust',
                        ...Object.fromEntries(securityComparisonData.map(d => [d.vendor, d.zeroTrustMaturity]))
                      },
                      {
                        category: 'Compliance',
                        ...Object.fromEntries(securityComparisonData.map(d => [d.vendor, d.complianceScore]))
                      },
                      {
                        category: 'Breach Protection',
                        ...Object.fromEntries(securityComparisonData.map(d => [d.vendor, d.breachReduction]))
                      }
                    ]}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Legend />
                      {results.slice(0, 4).map((result, index) => (
                        <Radar
                          key={result.vendorId}
                          name={result.vendorName}
                          dataKey={result.vendorName}
                          stroke={getVendorColor(result.vendorId, index)}
                          fill={getVendorColor(result.vendorId, index)}
                          fillOpacity={result.vendorId === 'portnox' ? 0.3 : 0.1}
                          strokeWidth={result.vendorId === 'portnox' ? 3 : 2}
                        />
                      ))}
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* CVE Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Analysis</CardTitle>
                <CardDescription>
                  Known vulnerabilities and security track record
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={securityComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="vendor" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="cveCount" fill="#EF4444" name="Total CVEs" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Insights */}
          <div className="space-y-4">
            {portnoxResult && portnoxResult.vendorData.security?.cveCount === 0 && (
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle className="text-green-900 dark:text-green-100">
                  Zero CVE Security Leader
                </AlertTitle>
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Portnox CLEAR maintains a perfect security record with zero known vulnerabilities,
                  providing {portnoxResult.risk.breachReduction.toFixed(0)}% breach risk reduction
                  compared to traditional NAC solutions.
                </AlertDescription>
              </Alert>
            )}

            {results.some(r => (r.vendorData.security?.cveCount || 0) > 20) && (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-red-900 dark:text-red-100">
                  High Vulnerability Count Warning
                </AlertTitle>
                <AlertDescription className="text-red-800 dark:text-red-200">
                  Some vendors show concerning vulnerability counts. Consider security track record
                  when making your decision, especially for critical infrastructure.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>

        {/* Operational Tab */}
        <TabsContent value="operational" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Automation Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Automation & Efficiency
                </CardTitle>
                <CardDescription>
                  Operational automation and efficiency metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={operationalData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="vendor" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey="automationLevel" 
                        fill="#8B5CF6" 
                        name="Automation Level (%)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="fteSaved"
                        stroke="#10B981"
                        strokeWidth={3}
                        name="FTE Saved"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Experience */}
            <Card>
              <CardHeader>
                <CardTitle>User Experience & Deployment</CardTitle>
                <CardDescription>
                  Deployment speed and user experience metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {operationalData.map((vendor, index) => (
                    <motion.div
                      key={vendor.vendorId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        vendor.isPortnox 
                          ? 'border-green-200 bg-green-50 dark:bg-green-950/20' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{vendor.vendor}</h4>
                        <Badge variant={vendor.isPortnox ? "default" : "secondary"}>
                          {vendor.deploymentSpeed.toFixed(0)}% deployment efficiency
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <div className="text-muted-foreground">Automation</div>
                          <div className="font-bold">{vendor.automationLevel}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">MTTR</div>
                          <div className="font-bold">{vendor.mttr.toFixed(1)}h</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">User Experience</div>
                          <div className="font-bold">{vendor.userExperience}/100</div>
                        </div>
                      </div>
                      <Progress value={vendor.automationLevel} className="mt-3 h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Implementation Tab */}
        <TabsContent value="implementation" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Deployment Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Deployment Timeline Comparison
                </CardTitle>
                <CardDescription>
                  Implementation speed and complexity analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={implementationData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" />
                      <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="deploymentDays" 
                        name="Deployment Days"
                        radius={[0, 4, 4, 0]}
                      >
                        {implementationData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={getVendorColor(entry.vendorId, index)}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Resource Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Requirements</CardTitle>
                <CardDescription>
                  FTE and training requirements by vendor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {implementationData.map((vendor, index) => (
                    <motion.div
                      key={vendor.vendorId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${
                        vendor.isPortnox 
                          ? 'border-green-200 bg-green-50 dark:bg-green-950/20' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{vendor.vendor}</h4>
                        <Badge 
                          variant={
                            vendor.complexity === 'simple' ? 'default' :
                            vendor.complexity === 'moderate' ? 'secondary' : 'destructive'
                          }
                        >
                          {vendor.complexity} complexity
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <div className="text-muted-foreground">Deployment</div>
                          <div className="font-bold">{vendor.deploymentDays} days</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Required FTE</div>
                          <div className="font-bold">{vendor.requiredFTE.toFixed(1)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Training</div>
                          <div className="font-bold">{vendor.trainingHours}h</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Implementation Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Strategy Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portnoxResult && (
                  <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                    <Zap className="h-4 w-4" />
                    <AlertTitle className="text-green-900 dark:text-green-100">
                      Rapid Deployment Advantage
                    </AlertTitle>
                    <AlertDescription className="text-green-800 dark:text-green-200">
                      Portnox CLEAR deploys in {portnoxResult.timeline.timeToValue} day(s) vs {
                        Math.round(implementationData.filter(d => !d.isPortnox).reduce((sum, d) => sum + d.deploymentDays, 0) / 
                        Math.max(1, implementationData.filter(d => !d.isPortnox).length))
                      } days average for competitors. This {
                        Math.round(implementationData.filter(d => !d.isPortnox).reduce((sum, d) => sum + d.deploymentDays, 0) / 
                        Math.max(1, implementationData.filter(d => !d.isPortnox).length) / portnoxResult.timeline.timeToValue)
                      }x faster deployment enables immediate value realization and competitive advantage.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Cloud-Native Advantages
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Zero infrastructure deployment</li>
                      <li>• Automatic updates and patches</li>
                      <li>• Infinite scalability</li>
                      <li>• Built-in high availability</li>
                      <li>• No maintenance windows</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      Legacy NAC Challenges
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• 6+ month deployment timelines</li>
                      <li>• Significant hardware investments</li>
                      <li>• Complex integration requirements</li>
                      <li>• Ongoing maintenance overhead</li>
                      <li>• Limited scalability options</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategic Tab */}
        <TabsContent value="strategic" className="space-y-6">
          {/* Strategic Recommendations */}
          <div className="grid gap-6">
            {results.map((result, index) => (
              <motion.div
                key={result.vendorId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={result.vendorId === 'portnox' ? 'border-green-200 bg-green-50 dark:bg-green-950/20' : ''}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {result.vendorId === 'portnox' ? (
                          <Award className="h-5 w-5 text-green-600" />
                        ) : result.recommendations.riskLevel === 'critical' ? (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        ) : (
                          <Building2 className="h-5 w-5 text-blue-600" />
                        )}
                        {result.vendorName} Strategic Assessment
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          result.recommendations.overallScore > 80 ? 'default' :
                          result.recommendations.overallScore > 60 ? 'secondary' : 'destructive'
                        }>
                          {result.recommendations.overallScore.toFixed(0)}/100
                        </Badge>
                        <Badge variant={
                          result.recommendations.riskLevel === 'low' ? 'default' :
                          result.recommendations.riskLevel === 'medium' ? 'secondary' : 'destructive'
                        }>
                          {result.recommendations.riskLevel} risk
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed">
                        {result.recommendations.executiveSummary}
                      </p>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Key Benefits
                          </h4>
                          <ul className="text-sm space-y-1">
                            {result.recommendations.keyBenefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            Risk Factors
                          </h4>
                          <ul className="text-sm space-y-1">
                            {result.recommendations.majorRisks.map((risk, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                                <span>{risk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {result.recommendations.aiInsights && result.recommendations.aiInsights.length > 0 && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-1">
                            <Brain className="h-4 w-4 text-blue-600" />
                            AI-Enhanced Insights
                          </h4>
                          <ul className="text-sm space-y-1">
                            {result.recommendations.aiInsights.map((insight, i) => (
                              <li key={i} className="text-blue-800 dark:text-blue-200">
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Items */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <Target className="h-5 w-5 text-blue-600" />
            Executive Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <h4 className="font-semibold mb-2 text-green-600">Immediate (0-30 days)</h4>
              <ul className="text-sm space-y-1">
                <li>• Approve Portnox CLEAR investment</li>
                <li>• Schedule technical deep-dive</li>
                <li>• Begin legacy NAC migration planning</li>
                <li>• Establish success metrics</li>
              </ul>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <h4 className="font-semibold mb-2 text-blue-600">Short-term (1-3 months)</h4>
              <ul className="text-sm space-y-1">
                <li>• Deploy Portnox CLEAR</li>
                <li>• Migrate critical systems</li>
                <li>• Train security team</li>
                <li>• Measure initial ROI</li>
              </ul>
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <h4 className="font-semibold mb-2 text-purple-600">Long-term (3-12 months)</h4>
              <ul className="text-sm space-y-1">
                <li>• Complete legacy decommission</li>
                <li>• Optimize security policies</li>
                <li>• Expand to additional sites</li>
                <li>• Realize full business value</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}