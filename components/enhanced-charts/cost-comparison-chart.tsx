"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  Cell
} from "recharts"
import { TrendingDown, DollarSign, Award } from "lucide-react"
import { motion } from "framer-motion"
import numeral from "numeral"

interface CostComparisonChartProps {
  data: Array<{
    vendorName: string
    vendorId: string
    totalCost: number
    breakdown: any
  }>
  config: any
}

export default function CostComparisonChart({ data, config }: CostComparisonChartProps) {
  const chartData = useMemo(() => {
    const portnoxCost = data.find(d => d.vendorId === 'portnox')?.totalCost || 0
    
    return data.map((item, index) => ({
      vendor: item.vendorName,
      vendorId: item.vendorId,
      cost: item.totalCost,
      savings: Math.max(0, item.totalCost - portnoxCost),
      savingsPercent: portnoxCost > 0 ? ((item.totalCost - portnoxCost) / item.totalCost) * 100 : 0,
      isPortnox: item.vendorId === 'portnox',
      rank: index + 1,
      costPerDevice: item.totalCost / (config.devices || 1000),
      costPerUser: item.totalCost / (config.users || 1000)
    })).sort((a, b) => a.cost - b.cost)
  }, [data, config])

  const maxCost = Math.max(...chartData.map(d => d.cost))
  const minCost = Math.min(...chartData.map(d => d.cost))
  const avgCost = chartData.reduce((sum, d) => sum + d.cost, 0) / chartData.length

  const formatCurrency = (value: number) => numeral(value).format('$0,0')
  const formatCurrencyShort = (value: number) => numeral(value).format('$0.0a')

  const getBarColor = (item: any, index: number) => {
    if (item.isPortnox) return '#10B981' // Green for Portnox
    if (index === 0) return '#3B82F6' // Blue for lowest cost
    if (item.cost > avgCost * 1.5) return '#EF4444' // Red for expensive
    return '#6B7280' // Gray for others
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <h4 className="font-semibold text-lg mb-2">{label}</h4>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Total Cost:</span> {formatCurrency(data.cost)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Cost per Device:</span> {formatCurrency(data.costPerDevice)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Cost per User:</span> {formatCurrency(data.costPerUser)}
            </p>
            {data.savings > 0 && (
              <p className="text-sm text-green-600">
                <span className="font-medium">Savings vs Portnox:</span> {formatCurrency(data.savings)} ({data.savingsPercent.toFixed(1)}%)
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={data.rank === 1 ? "default" : "secondary"}>
                Rank #{data.rank}
              </Badge>
              {data.isPortnox && (
                <Badge className="bg-green-600">
                  <Award className="w-3 h-3 mr-1" />
                  Recommended
                </Badge>
              )}
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Total Cost of Ownership Comparison</CardTitle>
            <CardDescription>
              {config.years}-year TCO for {numeral(config.devices).format('0,0')} devices
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Cost Range</div>
            <div className="text-lg font-semibold">
              {formatCurrencyShort(minCost)} - {formatCurrencyShort(maxCost)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-700 dark:text-green-300">Lowest Cost</p>
                      <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                        {formatCurrencyShort(minCost)}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {chartData.find(d => d.cost === minCost)?.vendor}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Average Savings</p>
                      <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                        {formatCurrencyShort(avgCost - minCost)}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        vs market average
                      </p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Cost Spread</p>
                      <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                        {((maxCost - minCost) / minCost * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        variation range
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Chart */}
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
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
                <ReferenceLine 
                  y={avgCost} 
                  stroke="#6B7280" 
                  strokeDasharray="5 5" 
                  label="Market Average"
                />
                <Bar 
                  dataKey="cost" 
                  name="Total Cost"
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getBarColor(entry, index)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Vendor Rankings */}
          <div className="space-y-2">
            <h4 className="font-semibold text-lg">Cost Rankings</h4>
            <div className="grid gap-2">
              {chartData.map((vendor, index) => (
                <motion.div
                  key={vendor.vendorId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    vendor.isPortnox 
                      ? 'border-green-200 bg-green-50 dark:bg-green-950/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={index === 0 ? "default" : "secondary"}
                      className={index === 0 ? "bg-green-600" : ""}
                    >
                      #{vendor.rank}
                    </Badge>
                    <div>
                      <p className="font-medium">{vendor.vendor}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(vendor.costPerDevice)}/device
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatCurrency(vendor.cost)}</p>
                    {vendor.savings > 0 && (
                      <p className="text-sm text-red-600">
                        +{formatCurrency(vendor.savings)} vs lowest
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}