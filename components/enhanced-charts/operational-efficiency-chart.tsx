"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  ComposedChart,
  Line,
  Area
} from "recharts"
import { Users, Clock, Zap, Gauge, Brain, Timer } from "lucide-react"
import { motion } from "framer-motion"
import numeral from "numeral"

interface OperationalEfficiencyChartProps {
  results: any[]
  config: any
}

export default function OperationalEfficiencyChart({ results, config }: OperationalEfficiencyChartProps) {
  const efficiencyData = useMemo(() => {
    return results.map(result => {
      const operational = result.operational || {}
      const implementation = result.vendorData?.implementation || {}
      
      return {
        vendor: result.vendorName,
        vendorId: result.vendorId,
        automationLevel: operational.automationLevel || 40,
        fteSaved: operational.fteSaved || 0,
        maintenanceWindows: operational.maintenanceWindows || 4,
        mttr: operational.mttr || 2,
        deploymentDays: implementation.time_to_deploy_days || 90,
        trainingHours: implementation.training_hours || 24,
        complexity: implementation.complexity || 'medium',
        annualSavings: operational.annualOpsSaving || 0,
        isPortnox: result.vendorId === 'portnox'
      }
    }).sort((a, b) => b.automationLevel - a.automationLevel)
  }, [results])

  const automationImpact = useMemo(() => {
    const categories = [
      'Policy Management',
      'User Provisioning', 
      'Device Onboarding',
      'Compliance Reporting',
      'Incident Response',
      'Patch Management',
      'Audit Logging',
      'Integration'
    ]

    return categories.map(category => {
      const dataPoint: any = { category }

      results.forEach(result => {
        let score = result.operational?.automationLevel || 40

        // Adjust based on category and vendor
        if (category === 'Patch Management') {
          score = result.vendorData?.vendor?.deployment_type === 'cloud' ? 95 : 30
        } else if (category === 'Policy Management') {
          if (result.vendorId === 'portnox') score = 95
          else if (result.vendorId === 'cisco_ise') score = 85
          else score = Math.max(50, score)
        } else if (category === 'Compliance Reporting') {
          const hasAutomatedCompliance = result.vendorData?.features?.some((f: any) => 
            f.feature_category === 'compliance' && f.support_level === 'native'
          )
          score = hasAutomatedCompliance ? score : score * 0.6
        }

        dataPoint[result.vendorName] = Math.round(score)
      })

      return dataPoint
    })
  }, [results])

  const formatCurrency = (value: number) => numeral(value).format('$0,0')
  const formatHours = (value: number) => `${value.toFixed(1)}h`

  const getEfficiencyColor = (automation: number) => {
    if (automation >= 85) return '#10B981'
    if (automation >= 70) return '#3B82F6'
    if (automation >= 50) return '#F59E0B'
    return '#EF4444'
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return '#10B981'
      case 'medium': return '#F59E0B'
      case 'high': return '#EF4444'
      default: return '#6B7280'
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <h4 className="font-semibold mb-2">{label}</h4>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">Automation:</span> {data.automationLevel}%
            </p>
            <p className="text-sm">
              <span className="font-medium">FTE Saved:</span> {data.fteSaved.toFixed(1)}
            </p>
            <p className="text-sm">
              <span className="font-medium">MTTR:</span> {formatHours(data.mttr)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Annual Savings:</span> {formatCurrency(data.annualSavings)}
            </p>
            <p className="text-sm">
              <span className="font-medium">Deployment:</span> {data.deploymentDays} days
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Efficiency Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Gauge className="h-6 w-6 text-blue-600" />
            Operational Efficiency Analysis
          </CardTitle>
          <CardDescription>
            Automation levels, resource requirements, and operational savings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-green-700 dark:text-green-300">Max Automation</p>
                        <p className="text-xl font-bold text-green-800 dark:text-green-200">
                          {Math.max(...efficiencyData.map(d => d.automationLevel))}%
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
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-blue-700 dark:text-blue-300">Max FTE Saved</p>
                        <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
                          {Math.max(...efficiencyData.map(d => d.fteSaved)).toFixed(1)}
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
                      <Timer className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-purple-700 dark:text-purple-300">Fastest MTTR</p>
                        <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
                          {formatHours(Math.min(...efficiencyData.map(d => d.mttr)))}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm text-orange-700 dark:text-orange-300">Fastest Deploy</p>
                        <p className="text-xl font-bold text-orange-800 dark:text-orange-200">
                          {Math.min(...efficiencyData.map(d => d.deploymentDays))}d
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Efficiency Comparison Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={efficiencyData}>
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
                    tickFormatter={(value) => numeral(value).format('$0.0a')}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  <Bar 
                    yAxisId="left"
                    dataKey="automationLevel" 
                    fill="#10B981" 
                    name="Automation Level (%)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="annualSavings"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    name="Annual Savings ($)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automation Capabilities Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            Automation Capabilities Matrix
          </CardTitle>
          <CardDescription>
            Detailed automation assessment across operational categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Automation Heatmap */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Category</th>
                    {results.map(result => (
                      <th key={result.vendorId} className="text-center p-2 font-medium min-w-24">
                        {result.vendorName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {automationImpact.map((category, index) => (
                    <tr key={category.category} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                      <td className="p-2 font-medium">{category.category}</td>
                      {results.map(result => {
                        const score = category[result.vendorName] || 0
                        return (
                          <td key={result.vendorId} className="text-center p-2">
                            <div 
                              className="w-full h-8 rounded flex items-center justify-center text-white text-sm font-medium"
                              style={{ backgroundColor: getEfficiencyColor(score) }}
                            >
                              {score}%
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Efficiency Rankings */}
            <div className="space-y-3">
              <h4 className="font-semibold">Operational Efficiency Rankings</h4>
              <div className="grid gap-3">
                {efficiencyData.map((vendor, index) => (
                  <motion.div
                    key={vendor.vendorId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      vendor.isPortnox 
                        ? 'border-green-200 bg-green-50 dark:bg-green-950/20' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Badge 
                        variant={index === 0 ? "default" : "secondary"}
                        className={index === 0 ? "bg-green-600" : ""}
                      >
                        #{index + 1}
                      </Badge>
                      <div>
                        <h5 className="font-medium">{vendor.vendor}</h5>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Automation: {vendor.automationLevel}%</span>
                          <span>Deploy: {vendor.deploymentDays}d</span>
                          <Badge 
                            variant="outline"
                            style={{ 
                              borderColor: getComplexityColor(vendor.complexity),
                              color: getComplexityColor(vendor.complexity)
                            }}
                          >
                            {vendor.complexity} complexity
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {formatCurrency(vendor.annualSavings)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vendor.fteSaved.toFixed(1)} FTE saved
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Operational Insights */}
            <div className="space-y-3">
              <h4 className="font-semibold">Key Operational Insights</h4>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100">
                      Automation Impact
                    </h5>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Vendors with 80%+ automation (
                      {efficiencyData.filter(d => d.automationLevel >= 80).map(d => d.vendor).join(', ')}
                      ) reduce operational overhead by an average of{' '}
                      {(efficiencyData.filter(d => d.automationLevel >= 80).reduce((sum, d) => sum + d.fteSaved, 0) / 
                        Math.max(1, efficiencyData.filter(d => d.automationLevel >= 80).length)).toFixed(1)} FTE.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
              >
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-green-900 dark:text-green-100">
                      Deployment Speed Advantage
                    </h5>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Cloud-native solutions deploy {Math.round(
                        efficiencyData.filter(d => d.vendor.includes('on-premise')).reduce((sum, d) => sum + d.deploymentDays, 0) /
                        Math.max(1, efficiencyData.filter(d => d.vendor.includes('cloud')).reduce((sum, d) => sum + d.deploymentDays, 0))
                      )}x faster than traditional on-premise solutions, 
                      enabling immediate value realization.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}