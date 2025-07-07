"use client"

import type React from "react"
import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  Target,
  BarChart3,
  Activity,
  Layers,
  Download,
  Share,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Lightbulb,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ComparisonScenario {
  id: string
  name: string
  description: string
  color: string
  parameters: Record<string, number>
  results: {
    totalCost: number
    roi: number
    paybackPeriod: number
    riskScore: number
    npv: number
    irr: number
  }
  isBaseline?: boolean
  createdAt: Date
}

interface ComparisonMetric {
  id: string
  name: string
  unit: string
  format: (value: number) => string
  category: "financial" | "operational" | "risk"
  higherIsBetter: boolean
}

const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    id: "totalCost",
    name: "Total Cost",
    unit: "$",
    format: (value) => `$${(value / 1000).toFixed(0)}K`,
    category: "financial",
    higherIsBetter: false,
  },
  {
    id: "roi",
    name: "ROI",
    unit: "%",
    format: (value) => `${value.toFixed(1)}%`,
    category: "financial",
    higherIsBetter: true,
  },
  {
    id: "paybackPeriod",
    name: "Payback Period",
    unit: "months",
    format: (value) => `${value.toFixed(1)}m`,
    category: "financial",
    higherIsBetter: false,
  },
  {
    id: "riskScore",
    name: "Risk Score",
    unit: "points",
    format: (value) => `${value.toFixed(0)}`,
    category: "risk",
    higherIsBetter: false,
  },
  {
    id: "npv",
    name: "Net Present Value",
    unit: "$",
    format: (value) => `$${(value / 1000).toFixed(0)}K`,
    category: "financial",
    higherIsBetter: true,
  },
  {
    id: "irr",
    name: "Internal Rate of Return",
    unit: "%",
    format: (value) => `${value.toFixed(1)}%`,
    category: "financial",
    higherIsBetter: true,
  },
]

const SAMPLE_SCENARIOS: ComparisonScenario[] = [
  {
    id: "baseline",
    name: "Baseline Scenario",
    description: "Current assumptions and market conditions",
    color: "#10b981",
    parameters: {
      device_count: 2500,
      growth_rate: 15,
      staff_efficiency: 40,
      breach_probability: 5,
      implementation_time: 6,
    },
    results: {
      totalCost: 1500000,
      roi: 45.2,
      paybackPeriod: 18.5,
      riskScore: 35,
      npv: 850000,
      irr: 28.5,
    },
    isBaseline: true,
    createdAt: new Date(),
  },
  {
    id: "optimistic",
    name: "Optimistic Growth",
    description: "High growth, maximum efficiency gains",
    color: "#3b82f6",
    parameters: {
      device_count: 3500,
      growth_rate: 25,
      staff_efficiency: 60,
      breach_probability: 3,
      implementation_time: 4,
    },
    results: {
      totalCost: 1850000,
      roi: 68.7,
      paybackPeriod: 14.2,
      riskScore: 25,
      npv: 1250000,
      irr: 42.1,
    },
    createdAt: new Date(),
  },
  {
    id: "conservative",
    name: "Conservative Approach",
    description: "Lower growth, cautious assumptions",
    color: "#f59e0b",
    parameters: {
      device_count: 1800,
      growth_rate: 8,
      staff_efficiency: 25,
      breach_probability: 8,
      implementation_time: 9,
    },
    results: {
      totalCost: 1200000,
      roi: 28.4,
      paybackPeriod: 24.8,
      riskScore: 45,
      npv: 520000,
      irr: 18.9,
    },
    createdAt: new Date(),
  },
  {
    id: "high_risk",
    name: "High Risk Environment",
    description: "Elevated security threats and compliance requirements",
    color: "#ef4444",
    parameters: {
      device_count: 2500,
      growth_rate: 12,
      staff_efficiency: 35,
      breach_probability: 15,
      implementation_time: 8,
    },
    results: {
      totalCost: 1650000,
      roi: 38.9,
      paybackPeriod: 21.3,
      riskScore: 65,
      npv: 720000,
      irr: 24.7,
    },
    createdAt: new Date(),
  },
]

const ScenarioComparison: React.FC = () => {
  const [scenarios, setScenarios] = useState<ComparisonScenario[]>(SAMPLE_SCENARIOS)
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(["baseline", "optimistic", "conservative"])
  const [comparisonView, setComparisonView] = useState<"table" | "chart" | "radar" | "waterfall">("chart")
  const [selectedMetric, setSelectedMetric] = useState<string>("totalCost")
  const [showDifferences, setShowDifferences] = useState(true)
  const [baselineScenario, setBaselineScenario] = useState<string>("baseline")

  // Calculate differences from baseline
  const scenarioComparisons = useMemo(() => {
    const baseline = scenarios.find((s) => s.id === baselineScenario)
    if (!baseline) return []

    return scenarios
      .filter((s) => selectedScenarios.includes(s.id))
      .map((scenario) => {
        const differences: Record<string, { absolute: number; percentage: number }> = {}

        COMPARISON_METRICS.forEach((metric) => {
          const baseValue = baseline.results[metric.id as keyof typeof baseline.results]
          const currentValue = scenario.results[metric.id as keyof typeof scenario.results]
          const absolute = currentValue - baseValue
          const percentage = baseValue !== 0 ? (absolute / baseValue) * 100 : 0

          differences[metric.id] = { absolute, percentage }
        })

        return {
          ...scenario,
          differences,
        }
      })
  }, [scenarios, selectedScenarios, baselineScenario])

  // Prepare chart data
  const chartData = useMemo(() => {
    return COMPARISON_METRICS.map((metric) => {
      const dataPoint: any = { metric: metric.name }

      scenarioComparisons.forEach((scenario) => {
        dataPoint[scenario.name] = scenario.results[metric.id as keyof typeof scenario.results]
      })

      return dataPoint
    })
  }, [scenarioComparisons])

  // Prepare radar chart data
  const radarData = useMemo(() => {
    const normalizedMetrics = ["roi", "npv", "irr"] // Higher is better
    const invertedMetrics = ["totalCost", "paybackPeriod", "riskScore"] // Lower is better

    return scenarioComparisons.map((scenario) => {
      const dataPoint: any = { scenario: scenario.name }

      COMPARISON_METRICS.forEach((metric) => {
        const value = scenario.results[metric.id as keyof typeof scenario.results]

        // Normalize values to 0-100 scale for radar chart
        if (normalizedMetrics.includes(metric.id)) {
          // For metrics where higher is better, use as-is (scaled)
          dataPoint[metric.name] = Math.min(100, Math.max(0, value))
        } else if (invertedMetrics.includes(metric.id)) {
          // For metrics where lower is better, invert the scale
          const maxValue = Math.max(...scenarios.map((s) => s.results[metric.id as keyof typeof s.results]))
          dataPoint[metric.name] = Math.max(0, 100 - (value / maxValue) * 100)
        }
      })

      return dataPoint
    })
  }, [scenarioComparisons, scenarios])

  // Get best and worst performers for each metric
  const getPerformanceRanking = useCallback(
    (metricId: string) => {
      const metric = COMPARISON_METRICS.find((m) => m.id === metricId)
      if (!metric) return { best: null, worst: null }

      const sorted = [...scenarioComparisons].sort((a, b) => {
        const aValue = a.results[metricId as keyof typeof a.results]
        const bValue = b.results[metricId as keyof typeof b.results]
        return metric.higherIsBetter ? bValue - aValue : aValue - bValue
      })

      return {
        best: sorted[0],
        worst: sorted[sorted.length - 1],
      }
    },
    [scenarioComparisons],
  )

  // Format difference display
  const formatDifference = (difference: { absolute: number; percentage: number }, metric: ComparisonMetric) => {
    const sign = difference.absolute >= 0 ? "+" : ""
    const color = metric.higherIsBetter
      ? difference.absolute >= 0
        ? "text-green-400"
        : "text-red-400"
      : difference.absolute >= 0
        ? "text-red-400"
        : "text-green-400"

    return (
      <span className={color}>
        {sign}
        {metric.format(difference.absolute)} ({sign}
        {difference.percentage.toFixed(1)}%)
      </span>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Scenario Comparison</h1>
          <p className="text-slate-400 mt-1">
            Compare multiple scenarios side-by-side to understand trade-offs and opportunities
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Scenario
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Configuration */}
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Comparison Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Baseline Scenario</label>
              <Select value={baselineScenario} onValueChange={setBaselineScenario}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map((scenario) => (
                    <SelectItem key={scenario.id} value={scenario.id}>
                      {scenario.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">View Type</label>
              <Select value={comparisonView} onValueChange={(value) => setComparisonView(value as any)}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Comparison Table</SelectItem>
                  <SelectItem value="chart">Bar Chart</SelectItem>
                  <SelectItem value="radar">Radar Chart</SelectItem>
                  <SelectItem value="waterfall">Waterfall Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Primary Metric</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMPARISON_METRICS.map((metric) => (
                    <SelectItem key={metric.id} value={metric.id}>
                      {metric.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="show-differences"
                checked={showDifferences}
                onChange={(e) => setShowDifferences(e.target.checked)}
                className="rounded border-slate-600 bg-slate-800"
              />
              <label htmlFor="show-differences" className="text-sm text-slate-300">
                Show differences from baseline
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scenario Selection */}
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Select Scenarios to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map((scenario) => (
              <motion.div
                key={scenario.id}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                  selectedScenarios.includes(scenario.id)
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50",
                )}
                onClick={() => {
                  setSelectedScenarios((prev) =>
                    prev.includes(scenario.id) ? prev.filter((id) => id !== scenario.id) : [...prev, scenario.id],
                  )
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scenario.color }} />
                    <span className="font-semibold text-white text-sm">{scenario.name}</span>
                  </div>
                  {scenario.isBaseline && (
                    <Badge variant="outline" className="text-xs">
                      Baseline
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-slate-400 mb-3">{scenario.description}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">TCO:</span>
                    <div className="font-semibold text-white">${(scenario.results.totalCost / 1000).toFixed(0)}K</div>
                  </div>
                  <div>
                    <span className="text-slate-500">ROI:</span>
                    <div className="font-semibold text-emerald-400">{scenario.results.roi.toFixed(1)}%</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Views */}
      <Tabs value={comparisonView} onValueChange={(value) => setComparisonView(value as any)}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="table" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Table
          </TabsTrigger>
          <TabsTrigger value="chart" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Chart
          </TabsTrigger>
          <TabsTrigger value="radar" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Radar
          </TabsTrigger>
          <TabsTrigger value="waterfall" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Waterfall
          </TabsTrigger>
        </TabsList>

        {/* Table View */}
        <TabsContent value="table" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Detailed Comparison Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300">Metric</th>
                      {scenarioComparisons.map((scenario) => (
                        <th key={scenario.id} className="text-center py-3 px-4 text-slate-300">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scenario.color }} />
                            {scenario.name}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_METRICS.map((metric) => {
                      const ranking = getPerformanceRanking(metric.id)

                      return (
                        <tr key={metric.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white">{metric.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {metric.category}
                              </Badge>
                            </div>
                          </td>
                          {scenarioComparisons.map((scenario) => {
                            const value = scenario.results[metric.id as keyof typeof scenario.results]
                            const isBest = ranking.best?.id === scenario.id
                            const isWorst = ranking.worst?.id === scenario.id

                            return (
                              <td key={scenario.id} className="py-3 px-4 text-center">
                                <div className="space-y-1">
                                  <div
                                    className={cn(
                                      "font-semibold",
                                      isBest ? "text-green-400" : isWorst ? "text-red-400" : "text-white",
                                    )}
                                  >
                                    {metric.format(value)}
                                    {isBest && <CheckCircle className="inline h-3 w-3 ml-1" />}
                                    {isWorst && <XCircle className="inline h-3 w-3 ml-1" />}
                                  </div>
                                  {showDifferences && scenario.id !== baselineScenario && (
                                    <div className="text-xs">
                                      {formatDifference(scenario.differences[metric.id], metric)}
                                    </div>
                                  )}
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chart View */}
        <TabsContent value="chart" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Scenario Comparison Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="metric" stroke="#9CA3AF" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#9CA3AF" />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    {scenarioComparisons.map((scenario) => (
                      <Bar key={scenario.id} dataKey={scenario.name} fill={scenario.color} name={scenario.name} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Radar View */}
        <TabsContent value="radar" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Multi-Dimensional Comparison</CardTitle>
              <p className="text-slate-400 text-sm">Normalized view showing relative performance across all metrics</p>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData[0] ? [radarData[0]] : []}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#9CA3AF", fontSize: 10 }} />
                    {scenarioComparisons.map((scenario, index) => (
                      <Radar
                        key={scenario.id}
                        name={scenario.name}
                        dataKey={scenario.name}
                        stroke={scenario.color}
                        fill={scenario.color}
                        fillOpacity={0.1}
                        strokeWidth={2}
                        data={radarData}
                      />
                    ))}
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Waterfall View */}
        <TabsContent value="waterfall" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Waterfall Analysis</CardTitle>
              <p className="text-slate-400 text-sm">
                Shows cumulative impact of different scenarios on{" "}
                {COMPARISON_METRICS.find((m) => m.id === selectedMetric)?.name}
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">Waterfall chart coming soon</p>
                <p className="text-slate-500 text-sm mt-2">
                  Advanced visualization showing step-by-step impact analysis
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Key Insights */}
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Key Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Best Performers</h4>
              {COMPARISON_METRICS.slice(0, 3).map((metric) => {
                const ranking = getPerformanceRanking(metric.id)
                if (!ranking.best) return null

                return (
                  <Alert key={metric.id} className="border-green-500/50 bg-green-500/10">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-green-200">
                      <strong>{ranking.best.name}</strong> performs best in {metric.name} with{" "}
                      {metric.format(ranking.best.results[metric.id as keyof typeof ranking.best.results])}.
                    </AlertDescription>
                  </Alert>
                )
              })}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-white">Trade-off Analysis</h4>
              <Alert className="border-blue-500/50 bg-blue-500/10">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-blue-200">
                  <strong>Risk vs Return:</strong> Higher growth scenarios show better ROI but increased risk scores.
                  Consider your organization's risk tolerance when choosing a path forward.
                </AlertDescription>
              </Alert>

              <Alert className="border-yellow-500/50 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-yellow-200">
                  <strong>Implementation Complexity:</strong> Faster implementations may compromise thoroughness.
                  Balance speed with quality for optimal outcomes.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ScenarioComparison
