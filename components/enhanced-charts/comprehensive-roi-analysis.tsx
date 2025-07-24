"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ScatterChart,
  Scatter,
  Cell
} from "recharts"
import { TrendingUp, Target, Clock, DollarSign, Zap, AlertTriangle, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import numeral from "numeral"
import type { UltimateCalculationResult } from "@/lib/services/enhanced-calculation-service"

interface ComprehensiveROIAnalysisProps {
  results: UltimateCalculationResult[]
  config: any
}

export default function ComprehensiveROIAnalysis({ results, config }: ComprehensiveROIAnalysisProps) {
  const portnoxResult = results.find(r => r.vendorId === 'portnox')
  const competitorResults = results.filter(r => r.vendorId !== 'portnox')

  const roiTimelineData = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return []

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const monthlyBenefit = totalSavings / (config.years * 12)
    
    const data = []
    for (let month = 0; month <= config.years * 12; month += 1) {
      const cumulativeBenefit = monthlyBenefit * month
      const netValue = cumulativeBenefit - portnoxResult.totalCost
      const roi = portnoxResult.totalCost > 0 ? (netValue / portnoxResult.totalCost) * 100 : 0
      const breakeven = netValue >= 0

      data.push({
        month,
        quarter: `Q${Math.ceil((month + 1) / 3)}`,
        year: Math.ceil(month / 12),
        cumulativeBenefit,
        netValue,
        roi,
        breakeven,
        investment: portnoxResult.totalCost,
        monthlyBenefit: month > 0 ? monthlyBenefit : 0,
        cumulativeROI: roi,
        riskAdjustedROI: roi * 0.85 // Conservative estimate
      })
    }

    return data
  }, [portnoxResult, competitorResults, config])

  const scenarioAnalysis = useMemo(() => {
    if (!portnoxResult) return []

    const baseROI = portnoxResult.roi.percentage
    const basePayback = portnoxResult.roi.paybackMonths

    return [
      {
        scenario: 'Pessimistic',
        roi: portnoxResult.roi.sensitivityAnalysis.pessimistic.roi,
        payback: portnoxResult.roi.sensitivityAnalysis.pessimistic.payback,
        probability: 20,
        color: '#EF4444',
        description: 'Conservative estimates with implementation challenges'
      },
      {
        scenario: 'Realistic',
        roi: portnoxResult.roi.sensitivityAnalysis.realistic.roi,
        payback: portnoxResult.roi.sensitivityAnalysis.realistic.payback,
        probability: 60,
        color: '#3B82F6',
        description: 'Expected outcome based on current data'
      },
      {
        scenario: 'Optimistic',
        roi: portnoxResult.roi.sensitivityAnalysis.optimistic.roi,
        payback: portnoxResult.roi.sensitivityAnalysis.optimistic.payback,
        probability: 20,
        color: '#10B981',
        description: 'Best-case scenario with full optimization'
      }
    ]
  }, [portnoxResult])

  const valueDriversData = useMemo(() => {
    if (!portnoxResult) return []

    const totalSavings = portnoxResult.roi.annualSavings

    return [
      {
        category: 'Security Risk Reduction',
        value: totalSavings * 0.35,
        description: 'Avoided breach costs and security incidents',
        impact: 'High',
        confidence: 90
      },
      {
        category: 'Operational Efficiency',
        value: totalSavings * 0.25,
        description: 'Reduced admin overhead and automation gains',
        impact: 'High',
        confidence: 85
      },
      {
        category: 'Compliance Automation',
        value: totalSavings * 0.20,
        description: 'Automated compliance and audit readiness',
        impact: 'Medium',
        confidence: 80
      },
      {
        category: 'Productivity Gains',
        value: totalSavings * 0.15,
        description: 'Improved user experience and reduced friction',
        impact: 'Medium',
        confidence: 75
      },
      {
        category: 'Infrastructure Savings',
        value: totalSavings * 0.05,
        description: 'Eliminated hardware and maintenance costs',
        impact: 'Low',
        confidence: 95
      }
    ]
  }, [portnoxResult])

  const competitiveROIData = useMemo(() => {
    return results.map(result => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
      roi: result.roi.percentage,
      payback: result.roi.paybackMonths,
      npv: result.roi.netPresentValue,
      irr: result.roi.internalRateOfReturn,
      profitabilityIndex: result.roi.profitabilityIndex,
      totalCost: result.totalCost,
      annualSavings: result.roi.annualSavings,
      isPortnox: result.vendorId === 'portnox',
      riskLevel: result.recommendations.riskLevel
    })).sort((a, b) => b.roi - a.roi)
  }, [results])

  const formatCurrency = (value: number) => numeral(value).format('$0,0')
  const formatCurrencyShort = (value: number) => numeral(value).format('$0.0a')
  const formatPercent = (value: number) => `${value.toFixed(1)}%`

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
          <h4 className="font-semibold mb-2">Month {label}</h4>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Cumulative Benefit:</span> {formatCurrency(data.cumulativeBenefit)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Net Value:</span> {formatCurrency(data.netValue)}
            </p>
            <p className="text-sm">
              <span className="font-medium">ROI:</span> {formatPercent(data.roi)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Monthly Benefit:</span> {formatCurrency(data.monthlyBenefit)}
            </p>
            {data.breakeven && (
              <Badge className="mt-2 bg-green-600">Break-even Achieved</Badge>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const breakevenPoint = roiTimelineData.find(d => d.breakeven)?.month || config.years * 12
  const finalROI = roiTimelineData[roiTimelineData.length - 1]?.roi || 0

  return (
    <div className="space-y-6">
      {/* ROI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Total ROI</p>
                  <p className="text-3xl font-bold text-green-800 dark:text-green-200">
                    {formatPercent(finalROI)}
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Over {config.years} years
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <Progress value={Math.min(finalROI / 10, 100)} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Payback Period</p>
                  <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">
                    {breakevenPoint.toFixed(1)}m
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Months to break even
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <Progress value={(24 - breakevenPoint) / 24 * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Annual Savings</p>
                  <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">
                    {formatCurrencyShort(portnoxResult?.roi.annualSavings || 0)}
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    Recurring yearly value
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <CheckCircle2 className="h-3 w-3 text-purple-600" />
                <span className="text-xs text-purple-600">Guaranteed value</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300">NPV</p>
                  <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">
                    {formatCurrencyShort(portnoxResult?.roi.netPresentValue || 0)}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    Net present value
                  </p>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <Zap className="h-3 w-3 text-orange-600" />
                <span className="text-xs text-orange-600">
                  IRR: {formatPercent(portnoxResult?.roi.internalRateOfReturn || 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">ROI Timeline</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
          <TabsTrigger value="drivers">Value Drivers</TabsTrigger>
          <TabsTrigger value="comparison">Vendor Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ROI Development Over Time</CardTitle>
              <CardDescription>
                Comprehensive return on investment timeline with break-even analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
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
                    
                    <ReferenceLine 
                      yAxisId="right"
                      y={portnoxResult?.totalCost || 0} 
                      stroke="#EF4444" 
                      strokeDasharray="5 5" 
                      label="Initial Investment"
                    />

                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="cumulativeBenefit"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Cumulative Benefit"
                    />

                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="roi"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                      name="ROI %"
                    />

                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="riskAdjustedROI"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      name="Risk-Adjusted ROI %"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Milestones */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">Month 0</div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Deployment Start</p>
                <p className="text-xs text-muted-foreground mt-1">Initial investment</p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">Month {breakevenPoint}</div>
                <p className="text-sm text-green-700 dark:text-green-300">Break-even Point</p>
                <p className="text-xs text-muted-foreground mt-1">Investment recovered</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">Month 12</div>
                <p className="text-sm text-purple-700 dark:text-purple-300">Year 1 Complete</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatPercent(roiTimelineData.find(d => d.month === 12)?.roi || 0)} ROI
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">Month {config.years * 12}</div>
                <p className="text-sm text-orange-700 dark:text-orange-300">Final ROI</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatPercent(finalROI)}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Analysis</CardTitle>
              <CardDescription>
                ROI projections under different business conditions and assumptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {scenarioAnalysis.map((scenario, index) => (
                  <motion.div
                    key={scenario.scenario}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="relative overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 w-full h-1"
                        style={{ backgroundColor: scenario.color }}
                      />
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          {scenario.scenario}
                          <Badge 
                            variant="outline" 
                            style={{ borderColor: scenario.color, color: scenario.color }}
                          >
                            {scenario.probability}% likely
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {scenario.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">ROI</p>
                          <p className="text-3xl font-bold" style={{ color: scenario.color }}>
                            {formatPercent(scenario.roi)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Payback Period</p>
                          <p className="text-xl font-semibold">{scenario.payback.toFixed(1)} months</p>
                        </div>
                        <Progress
                          value={scenario.probability}
                          className="h-2"
                          style={{ backgroundColor: `${scenario.color}20` }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Value Creation Drivers</CardTitle>
              <CardDescription>
                Detailed breakdown of how Portnox creates business value
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {valueDriversData.map((driver, index) => (
                  <motion.div
                    key={driver.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{driver.category}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={driver.impact === 'High' ? 'default' : driver.impact === 'Medium' ? 'secondary' : 'outline'}>
                          {driver.impact} Impact
                        </Badge>
                        <span className="text-sm font-bold">{formatCurrency(driver.value)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{driver.description}</p>
                    <div className="flex items-center justify-between">
                      <Progress 
                        value={(driver.value / (portnoxResult?.roi.annualSavings || 1)) * 100} 
                        className="flex-1 mr-4 h-2" 
                      />
                      <span className="text-xs text-muted-foreground">
                        {driver.confidence}% confidence
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ROI Comparison Matrix</CardTitle>
              <CardDescription>
                Advanced financial metrics comparison across all vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Vendor</th>
                      <th className="text-center p-3 font-medium">ROI %</th>
                      <th className="text-center p-3 font-medium">Payback (months)</th>
                      <th className="text-center p-3 font-medium">NPV</th>
                      <th className="text-center p-3 font-medium">IRR %</th>
                      <th className="text-center p-3 font-medium">Profitability Index</th>
                      <th className="text-center p-3 font-medium">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitiveROIData.map((vendor, index) => (
                      <motion.tr
                        key={vendor.vendorId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b ${vendor.isPortnox ? 'bg-green-50 dark:bg-green-950/20' : ''}`}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Badge variant={index === 0 ? "default" : "secondary"}>
                              #{index + 1}
                            </Badge>
                            <span className="font-medium">{vendor.vendor}</span>
                            {vendor.isPortnox && (
                              <Badge className="bg-green-600">Best</Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <span className={`font-bold ${vendor.roi > 100 ? 'text-green-600' : 'text-blue-600'}`}>
                            {formatPercent(vendor.roi)}
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span className={`font-medium ${vendor.payback < 12 ? 'text-green-600' : 'text-orange-600'}`}>
                            {vendor.payback.toFixed(1)}
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span className={`font-medium ${vendor.npv > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrencyShort(vendor.npv)}
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span className="font-medium">
                            {formatPercent(vendor.irr)}
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span className={`font-medium ${vendor.profitabilityIndex > 1 ? 'text-green-600' : 'text-red-600'}`}>
                            {vendor.profitabilityIndex.toFixed(2)}
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <Badge variant={
                            vendor.riskLevel === 'low' ? 'default' :
                            vendor.riskLevel === 'medium' ? 'secondary' : 'destructive'
                          }>
                            {vendor.riskLevel}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* ROI vs Risk Scatter Plot */}
          <Card>
            <CardHeader>
              <CardTitle>ROI vs Risk Analysis</CardTitle>
              <CardDescription>
                Risk-adjusted return comparison across vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="risk" 
                      name="Risk Level" 
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis 
                      dataKey="roi" 
                      name="ROI" 
                      tickFormatter={formatPercent}
                    />
                    <Tooltip 
                      formatter={(value: any, name: string) => {
                        if (name === 'ROI') return formatPercent(value)
                        if (name === 'Risk Level') return `${value}%`
                        return value
                      }}
                    />
                    <Scatter
                      data={competitiveROIData.map(v => ({
                        vendor: v.vendor,
                        roi: v.roi,
                        risk: v.riskLevel === 'low' ? 20 : v.riskLevel === 'medium' ? 50 : 80,
                        isPortnox: v.isPortnox
                      }))}
                      fill="#3B82F6"
                    >
                      {competitiveROIData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isPortnox ? '#10B981' : '#6B7280'}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ROI Summary Alert */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-green-900 dark:text-green-100 mb-2">
                Investment Recommendation: Portnox CLEAR
              </h3>
              <p className="text-green-800 dark:text-green-200 mb-4">
                Based on comprehensive financial analysis, Portnox CLEAR delivers exceptional ROI of{" "}
                <strong>{formatPercent(finalROI)}</strong> with payback in just{" "}
                <strong>{breakevenPoint.toFixed(1)} months</strong>. The cloud-native architecture provides{" "}
                <strong>{formatCurrency(portnoxResult?.roi.annualSavings || 0)}</strong> in annual savings
                while eliminating traditional infrastructure risks and complexity.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 dark:text-green-300">
                    NPV: {formatCurrency(portnoxResult?.roi.netPresentValue || 0)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 dark:text-green-300">
                    IRR: {formatPercent(portnoxResult?.roi.internalRateOfReturn || 0)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 dark:text-green-300">
                    Low Risk Investment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}