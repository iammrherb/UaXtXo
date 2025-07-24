"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts"
import { TrendingUp, Target, Clock } from "lucide-react"
import { motion } from "framer-motion"
import numeral from "numeral"

interface ROITimelineChartProps {
  portnoxResult: any
  competitorResults: any[]
  config: any
}

export default function ROITimelineChart({ portnoxResult, competitorResults, config }: ROITimelineChartProps) {
  const timelineData = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return []

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const monthlyBenefit = totalSavings / (config.years * 12)
    
    const data = []
    for (let month = 0; month <= config.years * 12; month += 3) {
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
        monthlyBenefit: month > 0 ? monthlyBenefit : 0
      })
    }

    return data
  }, [portnoxResult, competitorResults, config])

  const breakevenPoint = useMemo(() => {
    return timelineData.find(d => d.breakeven)?.month || config.years * 12
  }, [timelineData, config])

  const finalROI = useMemo(() => {
    return timelineData[timelineData.length - 1]?.roi || 0
  }, [timelineData])

  const formatCurrency = (value: number) => numeral(value).format('$0,0')
  const formatPercent = (value: number) => `${value.toFixed(1)}%`

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
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

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">ROI Development Timeline</CardTitle>
            <CardDescription>
              Cumulative return on investment and break-even analysis
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Final ROI</div>
            <div className="text-2xl font-bold text-green-600">
              {formatPercent(finalROI)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-green-700 dark:text-green-300">Break-even Point</p>
                      <p className="text-xl font-bold text-green-800 dark:text-green-200">
                        {breakevenPoint} months
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Final ROI</p>
                      <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                        {formatPercent(finalROI)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-700 dark:text-purple-300">Time to Value</p>
                      <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
                        {portnoxResult?.timeline?.timeToValue || 1} days
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Timeline Chart */}
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={timelineData}>
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
                  tickFormatter={(value) => numeral(value).format('$0.0a')}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {/* Break-even reference line */}
                <ReferenceLine 
                  y={0} 
                  stroke="#6B7280" 
                  strokeDasharray="2 2" 
                  label="Break-even"
                />
                
                {/* Investment reference line */}
                <ReferenceLine 
                  yAxisId="right"
                  y={portnoxResult?.totalCost || 0} 
                  stroke="#EF4444" 
                  strokeDasharray="5 5" 
                  label="Initial Investment"
                />

                {/* Cumulative benefit area */}
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

                {/* ROI line */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="roi"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                  name="ROI %"
                />

                {/* Net value line */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="netValue"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  name="Net Value"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-2">
            <h4 className="font-semibold">Key Milestones</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">Deployment</p>
                  <p className="text-xs text-muted-foreground">Month 0</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">Break-even</p>
                  <p className="text-xs text-muted-foreground">Month {breakevenPoint}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <div>
                  <p className="text-sm font-medium">Year 1 ROI</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPercent(timelineData.find(d => d.month === 12)?.roi || 0)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <div>
                  <p className="text-sm font-medium">Final ROI</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPercent(finalROI)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}