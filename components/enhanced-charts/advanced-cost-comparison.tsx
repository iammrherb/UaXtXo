"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  ComposedChart,
  Line,
  Area
} from "recharts"
import { TrendingDown, DollarSign, Award, Info, Download, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import numeral from "numeral"
import type { UltimateCalculationResult } from "@/lib/services/enhanced-calculation-service"

interface AdvancedCostComparisonProps {
  results: UltimateCalculationResult[]
  config: any
  onExport?: () => void
  onShare?: () => void
}

export default function AdvancedCostComparison({ results, config, onExport, onShare }: AdvancedCostComparisonProps) {
  const chartData = useMemo(() => {
    const portnoxResult = results.find(r => r.vendorId === 'portnox')
    const portnoxCost = portnoxResult?.totalCost || 0
    
    return results.map((result, index) => ({
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
      savings: Math.max(0, result.totalCost - portnoxCost),
      savingsPercent: portnoxCost > 0 ? ((result.totalCost - portnoxCost) / result.totalCost) * 100 : 0,
      isPortnox: result.vendorId === 'portnox',
      rank: index + 1,
      costPerDevice: result.perDevicePerMonth * 12,
      costPerUser: result.perUserPerMonth * 12,
      roi: result.roi.percentage,
      payback: result.roi.paybackMonths,
      riskLevel: result.recommendations.riskLevel,
      overallScore: result.recommendations.overallScore
    })).sort((a, b) => a.totalCost - b.totalCost)
  }, [results])

  const costCategories = [
    { key: 'licensing', name: 'Licensing', color: '#3B82F6' },
    { key: 'hardware', name: 'Hardware', color: '#10B981' },
    { key: 'implementation', name: 'Implementation', color: '#F59E0B' },
    { key: 'support', name: 'Support', color: '#EF4444' },
    { key: 'training', name: 'Training', color: '#8B5CF6' },
    { key: 'maintenance', name: 'Maintenance', color: '#06B6D4' },
    { key: 'operational', name: 'Operational', color: '#84CC16' },
    { key: 'hidden', name: 'Hidden Costs', color: '#F97316' }
  ]

  const maxCost = Math.max(...chartData.map(d => d.totalCost))
  const minCost = Math.min(...chartData.map(d => d.totalCost))
  const avgCost = chartData.reduce((sum, d) => sum + d.totalCost, 0) / chartData.length

  const formatCurrency = (value: number) => numeral(value).format('$0,0')
  const formatCurrencyShort = (value: number) => numeral(value).format('$0.0a')
  const formatPercent = (value: number) => `${value.toFixed(1)}%`

  const getBarColor = (item: any) => {
    if (item.isPortnox) return '#10B981'
    if (item.riskLevel === 'high') return '#EF4444'
    if (item.riskLevel === 'low') return '#3B82F6'
    return '#6B7280'
  }

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'default'
      case 'medium': return 'secondary'
      case 'high': return 'destructive'
      default: return 'outline'
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-w-sm"
        >
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            {label}
            {data.isPortnox && <Award className="w-4 h-4 text-yellow-500" />}
          </h4>
          
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Total Cost</p>
                <p className="font-bold text-lg">{formatCurrency(data.totalCost)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Per Device/Year</p>
                <p className="font-bold text-lg">{formatCurrency(data.costPerDevice)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">ROI</p>
                <p className="font-semibold text-green-600">{formatPercent(data.roi)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payback</p>
                <p className="font-semibold">{data.payback.toFixed(1)}m</p>
              </div>
            </div>

            {data.savings > 0 && (
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">Savings vs Portnox</p>
                <p className="font-bold text-red-600">
                  +{formatCurrency(data.savings)} ({formatPercent(data.savingsPercent)})
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t">
              <Badge variant={getRiskBadgeVariant(data.riskLevel)}>
                {data.riskLevel} risk
              </Badge>
              <Badge variant="outline">
                Score: {data.overallScore.toFixed(0)}
              </Badge>
            </div>
          </div>
        </motion.div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                Total Cost of Ownership Analysis
              </CardTitle>
              <CardDescription className="text-base">
                {config.years}-year comprehensive TCO for {numeral(config.devices).format('0,0')} devices across {results.length} vendors
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onShare}>
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Key Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">Lowest Cost</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                        {formatCurrencyShort(minCost)}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {chartData.find(d => d.totalCost === minCost)?.vendor}
                      </p>
                    </div>
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <TrendingDown className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Maximum Savings</p>
                      <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                        {formatCurrencyShort(maxCost - minCost)}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {formatPercent((maxCost - minCost) / maxCost * 100)} potential
                      </p>
                    </div>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Best ROI</p>
                      <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                        {formatPercent(Math.max(...chartData.map(d => d.roi)))}
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        {chartData.find(d => d.roi === Math.max(...chartData.map(d => d.roi)))?.vendor}
                      </p>
                    </div>
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Cost Spread</p>
                      <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                        {formatPercent((maxCost - minCost) / minCost * 100)}
                      </p>
                      <p className="text-xs text-orange-600 dark:text-orange-400">
                        variation range
                      </p>
                    </div>
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                      <Info className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Comparison Chart */}
          <div className="h-96 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="vendor" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="cost"
                  tickFormatter={formatCurrencyShort}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="roi"
                  orientation="right"
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                <ReferenceLine 
                  yAxisId="cost"
                  y={avgCost} 
                  stroke="#6B7280" 
                  strokeDasharray="5 5" 
                  label="Market Average"
                />
                
                {/* Stacked cost breakdown */}
                {costCategories.map((category) => (
                  <Bar 
                    key={category.key}
                    yAxisId="cost"
                    dataKey={category.key}
                    stackId="costs"
                    fill={category.color}
                    name={category.name}
                  />
                ))}
                
                {/* ROI line */}
                <Line
                  yAxisId="roi"
                  type="monotone"
                  dataKey="roi"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  name="ROI %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Vendor Comparison Table */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Detailed Vendor Analysis</h4>
            <div className="grid gap-4">
              <AnimatePresence>
                {chartData.map((vendor, index) => (
                  <motion.div
                    key={vendor.vendorId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      vendor.isPortnox 
                        ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={index === 0 ? "default" : "secondary"}
                          className={`${index === 0 ? "bg-green-600" : ""} text-sm px-3 py-1`}
                        >
                          #{vendor.rank}
                        </Badge>
                        <div>
                          <h5 className="font-bold text-lg flex items-center gap-2">
                            {vendor.vendor}
                            {vendor.isPortnox && (
                              <Badge className="bg-green-600 text-white">
                                <Award className="w-3 h-3 mr-1" />
                                Recommended
                              </Badge>
                            )}
                          </h5>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getRiskBadgeVariant(vendor.riskLevel)}>
                              {vendor.riskLevel} risk
                            </Badge>
                            <Badge variant="outline">
                              Score: {vendor.overallScore.toFixed(0)}/100
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {formatCurrency(vendor.totalCost)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(vendor.costPerDevice)}/device/year
                        </div>
                        {vendor.savings > 0 && (
                          <div className="text-sm text-red-600 font-medium">
                            +{formatCurrency(vendor.savings)} vs lowest
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cost Breakdown Progress Bars */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Cost Breakdown</span>
                        <span>ROI: {formatPercent(vendor.roi)} | Payback: {vendor.payback.toFixed(1)}m</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {costCategories.slice(0, 4).map((category) => {
                          const value = vendor[category.key as keyof typeof vendor] as number
                          const percentage = (value / vendor.totalCost) * 100
                          return (
                            <div key={category.key} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">{category.name}</span>
                                <span className="font-medium">{formatPercent(percentage)}</span>
                              </div>
                              <Progress 
                                value={percentage} 
                                className="h-2"
                                style={{ 
                                  backgroundColor: `${category.color}20`,
                                }}
                              />
                              <div className="text-xs text-muted-foreground">
                                {formatCurrency(value)}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}