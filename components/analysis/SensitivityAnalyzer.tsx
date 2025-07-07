"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import {
  Target,
  AlertTriangle,
  Info,
  Play,
  Pause,
  RotateCcw,
  Download,
  Settings,
  BarChart3,
  Activity,
  Brain,
  Filter,
  Lightbulb,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SensitivityParameter {
  id: string
  name: string
  baseValue: number
  min: number
  max: number
  step: number
  unit: string
  category: "cost" | "operational" | "risk" | "business"
  impact: "high" | "medium" | "low"
  description: string
}

interface SensitivityResult {
  parameter: string
  parameterId: string
  baseValue: number
  testValue: number
  baseResult: number
  testResult: number
  absoluteChange: number
  percentageChange: number
  elasticity: number
  sensitivity: number
  rank: number
}

interface TornadoData {
  parameter: string
  low: number
  high: number
  range: number
  impact: number
}

interface SpiderData {
  parameter: string
  value: number
  baseValue: number
  impact: number
}

const SENSITIVITY_PARAMETERS: SensitivityParameter[] = [
  {
    id: "device_count",
    name: "Device Count",
    baseValue: 2500,
    min: 1000,
    max: 10000,
    step: 100,
    unit: "devices",
    category: "operational",
    impact: "high",
    description: "Number of devices to be managed by the NAC solution",
  },
  {
    id: "user_count",
    name: "User Count",
    baseValue: 1500,
    min: 500,
    max: 5000,
    step: 50,
    unit: "users",
    category: "operational",
    impact: "high",
    description: "Number of users requiring network access",
  },
  {
    id: "growth_rate",
    name: "Annual Growth Rate",
    baseValue: 15,
    min: 0,
    max: 50,
    step: 1,
    unit: "%",
    category: "business",
    impact: "medium",
    description: "Expected annual growth in devices and users",
  },
  {
    id: "staff_cost",
    name: "Staff Cost per Hour",
    baseValue: 75,
    min: 40,
    max: 150,
    step: 5,
    unit: "$/hour",
    category: "cost",
    impact: "medium",
    description: "Hourly cost of IT staff for implementation and maintenance",
  },
  {
    id: "implementation_time",
    name: "Implementation Time",
    baseValue: 6,
    min: 1,
    max: 24,
    step: 1,
    unit: "months",
    category: "operational",
    impact: "medium",
    description: "Time required for full implementation",
  },
  {
    id: "breach_probability",
    name: "Breach Probability",
    baseValue: 5,
    min: 1,
    max: 25,
    step: 0.5,
    unit: "%",
    category: "risk",
    impact: "high",
    description: "Annual probability of security breach",
  },
  {
    id: "breach_cost",
    name: "Average Breach Cost",
    baseValue: 4500000,
    min: 1000000,
    max: 15000000,
    step: 100000,
    unit: "$",
    category: "risk",
    impact: "high",
    description: "Average cost of a security breach",
  },
  {
    id: "discount_rate",
    name: "Discount Rate",
    baseValue: 8,
    min: 3,
    max: 15,
    step: 0.5,
    unit: "%",
    category: "business",
    impact: "low",
    description: "Cost of capital for NPV calculations",
  },
  {
    id: "efficiency_gain",
    name: "Efficiency Gain",
    baseValue: 40,
    min: 10,
    max: 80,
    step: 5,
    unit: "%",
    category: "operational",
    impact: "medium",
    description: "Expected operational efficiency improvement",
  },
  {
    id: "vendor_price_increase",
    name: "Annual Price Increase",
    baseValue: 5,
    min: 0,
    max: 20,
    step: 1,
    unit: "%",
    category: "cost",
    impact: "low",
    description: "Expected annual price increases from vendors",
  },
]

const SensitivityAnalyzer: React.FC = () => {
  const [parameters, setParameters] = useState(SENSITIVITY_PARAMETERS)
  const [selectedParameters, setSelectedParameters] = useState<string[]>([
    "device_count",
    "growth_rate",
    "breach_probability",
    "staff_cost",
  ])
  const [analysisType, setAnalysisType] = useState<"one-way" | "tornado" | "spider" | "monte-carlo">("tornado")
  const [variationRange, setVariationRange] = useState(20) // ±20%
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<SensitivityResult[]>([])
  const [tornadoData, setTornadoData] = useState<TornadoData[]>([])
  const [spiderData, setSpiderData] = useState<SpiderData[]>([])
  const [baselineResult, setBaselineResult] = useState(1500000) // Base TCO
  const [showConfidenceIntervals, setShowConfidenceIntervals] = useState(true)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  // Calculate TCO based on parameters (simplified model)
  const calculateTCO = useCallback((paramValues: Record<string, number>) => {
    const deviceCount = paramValues.device_count || 2500
    const userCount = paramValues.user_count || 1500
    const growthRate = (paramValues.growth_rate || 15) / 100
    const staffCost = paramValues.staff_cost || 75
    const implementationTime = paramValues.implementation_time || 6
    const breachProb = (paramValues.breach_probability || 5) / 100
    const breachCost = paramValues.breach_cost || 4500000
    const discountRate = (paramValues.discount_rate || 8) / 100
    const efficiencyGain = (paramValues.efficiency_gain || 40) / 100
    const priceIncrease = (paramValues.vendor_price_increase || 5) / 100

    // Base costs
    const licenseCost = deviceCount * 4.5 * 12 // $4.5/device/month
    const implementationCost = deviceCount * 15 + implementationTime * staffCost * 160 // 160 hours/month
    const operationalSavings = userCount * 2000 * efficiencyGain
    const riskReduction = breachProb * breachCost * 0.8

    // 3-year projection
    let totalCost = implementationCost
    let totalBenefit = 0

    for (let year = 1; year <= 3; year++) {
      const yearlyDevices = deviceCount * Math.pow(1 + growthRate, year - 1)
      const discountFactor = Math.pow(1 + discountRate, year - 1)
      const priceMultiplier = Math.pow(1 + priceIncrease, year - 1)

      const yearlyCost = (licenseCost * Math.pow(1 + growthRate, year - 1) * priceMultiplier) / discountFactor
      const yearlyBenefit = (operationalSavings * Math.pow(1 + growthRate, year - 1) + riskReduction) / discountFactor

      totalCost += yearlyCost
      totalBenefit += yearlyBenefit
    }

    return totalCost - totalBenefit // Net cost
  }, [])

  // Run sensitivity analysis
  const runSensitivityAnalysis = useCallback(async () => {
    setIsRunning(true)
    setAnalysisProgress(0)

    const baseParams = parameters.reduce(
      (acc, param) => {
        acc[param.id] = param.baseValue
        return acc
      },
      {} as Record<string, number>,
    )

    const baseline = calculateTCO(baseParams)
    setBaselineResult(baseline)

    const newResults: SensitivityResult[] = []
    const newTornadoData: TornadoData[] = []
    const newSpiderData: SpiderData[] = []

    for (let i = 0; i < selectedParameters.length; i++) {
      const paramId = selectedParameters[i]
      const param = parameters.find((p) => p.id === paramId)
      if (!param) continue

      setAnalysisProgress((i / selectedParameters.length) * 100)

      // Calculate variation range
      const variation = param.baseValue * (variationRange / 100)
      const lowValue = Math.max(param.min, param.baseValue - variation)
      const highValue = Math.min(param.max, param.baseValue + variation)

      // Test low value
      const lowParams = { ...baseParams, [paramId]: lowValue }
      const lowResult = calculateTCO(lowParams)

      // Test high value
      const highParams = { ...baseParams, [paramId]: highValue }
      const highResult = calculateTCO(highParams)

      // Calculate sensitivity metrics
      const absoluteChange = Math.abs(highResult - lowResult)
      const percentageChange = (absoluteChange / baseline) * 100
      const parameterChange = (highValue - lowValue) / param.baseValue
      const elasticity = percentageChange / (parameterChange * 100)
      const sensitivity = absoluteChange / (highValue - lowValue)

      newResults.push({
        parameter: param.name,
        parameterId: paramId,
        baseValue: param.baseValue,
        testValue: highValue,
        baseResult: baseline,
        testResult: highResult,
        absoluteChange,
        percentageChange,
        elasticity,
        sensitivity,
        rank: 0, // Will be set after sorting
      })

      // Tornado chart data
      newTornadoData.push({
        parameter: param.name,
        low: lowResult,
        high: highResult,
        range: Math.abs(highResult - lowResult),
        impact: percentageChange,
      })

      // Spider chart data
      newSpiderData.push({
        parameter: param.name,
        value: highResult,
        baseValue: baseline,
        impact: percentageChange,
      })

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Sort by impact and assign ranks
    newResults.sort((a, b) => b.percentageChange - a.percentageChange)
    newResults.forEach((result, index) => {
      result.rank = index + 1
    })

    newTornadoData.sort((a, b) => b.range - a.range)

    setResults(newResults)
    setTornadoData(newTornadoData)
    setSpiderData(newSpiderData)
    setAnalysisProgress(100)
    setIsRunning(false)
  }, [parameters, selectedParameters, variationRange, calculateTCO])

  // Custom colors for charts
  const getImpactColor = (impact: number) => {
    if (impact > 15) return "#ef4444" // High impact - red
    if (impact > 5) return "#f59e0b" // Medium impact - orange
    return "#10b981" // Low impact - green
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Sensitivity Analysis</h1>
          <p className="text-slate-400 mt-1">Analyze how changes in key parameters affect TCO calculations</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={runSensitivityAnalysis}
            disabled={isRunning || selectedParameters.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Analysis
              </>
            )}
          </Button>

          <Button variant="outline" onClick={() => setResults([])}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Analysis Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Analysis Type */}
            <div className="space-y-2">
              <Label className="text-slate-300">Analysis Type</Label>
              <Select value={analysisType} onValueChange={(value) => setAnalysisType(value as any)}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tornado">Tornado Chart</SelectItem>
                  <SelectItem value="spider">Spider Chart</SelectItem>
                  <SelectItem value="one-way">One-Way Analysis</SelectItem>
                  <SelectItem value="monte-carlo">Monte Carlo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Variation Range */}
            <div className="space-y-2">
              <Label className="text-slate-300">Variation Range: ±{variationRange}%</Label>
              <Slider
                value={[variationRange]}
                onValueChange={([value]) => setVariationRange(value)}
                min={5}
                max={50}
                step={5}
                className="w-full"
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="confidence"
                  checked={showConfidenceIntervals}
                  onCheckedChange={setShowConfidenceIntervals}
                />
                <Label htmlFor="confidence" className="text-slate-300 text-sm">
                  Show Confidence Intervals
                </Label>
              </div>
            </div>

            {/* Progress */}
            {isRunning && (
              <div className="space-y-2">
                <Label className="text-slate-300">Progress</Label>
                <Progress value={analysisProgress} className="w-full" />
                <div className="text-xs text-slate-400">{analysisProgress.toFixed(0)}% complete</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Parameter Selection */}
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Parameter Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parameters.map((param) => (
              <motion.div
                key={param.id}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                  selectedParameters.includes(param.id)
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50",
                )}
                onClick={() => {
                  setSelectedParameters((prev) =>
                    prev.includes(param.id) ? prev.filter((id) => id !== param.id) : [...prev, param.id],
                  )
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white text-sm">{param.name}</span>
                  <Badge
                    variant={
                      param.impact === "high" ? "destructive" : param.impact === "medium" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {param.impact}
                  </Badge>
                </div>
                <div className="text-xs text-slate-400 mb-2">{param.description}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Base: {param.baseValue} {param.unit}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {param.category}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-400">{selectedParameters.length} parameters selected</div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setSelectedParameters([])}>
                Clear All
              </Button>
              <Button size="sm" variant="outline" onClick={() => setSelectedParameters(parameters.map((p) => p.id))}>
                Select All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Tabs value={analysisType} onValueChange={(value) => setAnalysisType(value as any)}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="tornado" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Tornado
          </TabsTrigger>
          <TabsTrigger value="spider" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Spider
          </TabsTrigger>
          <TabsTrigger value="one-way" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            One-Way
          </TabsTrigger>
          <TabsTrigger value="monte-carlo" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Monte Carlo
          </TabsTrigger>
        </TabsList>

        {/* Tornado Chart */}
        <TabsContent value="tornado" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Tornado Chart - Parameter Impact</CardTitle>
                  <p className="text-slate-400 text-sm">
                    Shows the range of TCO variation for each parameter (±{variationRange}%)
                  </p>
                </CardHeader>
                <CardContent>
                  {tornadoData.length > 0 ? (
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={tornadoData}
                          layout="horizontal"
                          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis
                            type="number"
                            stroke="#9CA3AF"
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                          />
                          <YAxis type="category" dataKey="parameter" stroke="#9CA3AF" width={90} />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                            }}
                            formatter={(value: any, name: string) => [
                              formatCurrency(value),
                              name === "range" ? "Impact Range" : name,
                            ]}
                          />
                          <Bar dataKey="range" fill="#10b981" radius={[0, 4, 4, 0]}>
                            {tornadoData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={getImpactColor(entry.impact)} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-96 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">Run analysis to see tornado chart</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <div className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <div className="text-sm text-slate-400">Baseline TCO</div>
                    <div className="text-xl font-bold text-white">{formatCurrency(baselineResult)}</div>
                  </div>

                  {results.length > 0 && (
                    <>
                      <div className="p-3 rounded-lg bg-slate-800/50">
                        <div className="text-sm text-slate-400">Most Sensitive Parameter</div>
                        <div className="text-lg font-bold text-emerald-400">{results[0]?.parameter}</div>
                        <div className="text-xs text-slate-500">{results[0]?.percentageChange.toFixed(1)}% impact</div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-800/50">
                        <div className="text-sm text-slate-400">Maximum Variation</div>
                        <div className="text-lg font-bold text-red-400">
                          ±{formatCurrency(Math.max(...results.map((r) => r.absoluteChange)))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Top Parameters */}
              {results.length > 0 && (
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Top Impact Parameters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.slice(0, 5).map((result, index) => (
                        <motion.div
                          key={result.parameterId}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div>
                            <div className="font-semibold text-white text-sm">
                              #{result.rank} {result.parameter}
                            </div>
                            <div className="text-xs text-slate-400">Elasticity: {result.elasticity.toFixed(2)}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">{result.percentageChange.toFixed(1)}%</div>
                            <div className="text-xs text-slate-400">{formatCurrency(result.absoluteChange)}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Spider Chart */}
        <TabsContent value="spider" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Spider Chart - Multi-Parameter Analysis</CardTitle>
              <p className="text-slate-400 text-sm">Shows relative sensitivity across all parameters</p>
            </CardHeader>
            <CardContent>
              {spiderData.length > 0 ? (
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={spiderData}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="parameter" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, Math.max(...spiderData.map((d) => d.impact))]}
                        tick={{ fill: "#9CA3AF", fontSize: 10 }}
                      />
                      <Radar
                        name="Impact %"
                        dataKey="impact"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                        formatter={(value: any) => [`${value.toFixed(1)}%`, "Impact"]}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Run analysis to see spider chart</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* One-Way Analysis */}
        <TabsContent value="one-way" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">One-Way Sensitivity Analysis</CardTitle>
              <p className="text-slate-400 text-sm">Detailed analysis of individual parameter variations</p>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <div className="space-y-6">
                  {/* Results Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-slate-300">Rank</th>
                          <th className="text-left py-3 px-4 text-slate-300">Parameter</th>
                          <th className="text-right py-3 px-4 text-slate-300">Base Value</th>
                          <th className="text-right py-3 px-4 text-slate-300">Impact %</th>
                          <th className="text-right py-3 px-4 text-slate-300">Absolute Change</th>
                          <th className="text-right py-3 px-4 text-slate-300">Elasticity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result, index) => (
                          <motion.tr
                            key={result.parameterId}
                            className="border-b border-slate-800 hover:bg-slate-800/30"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="py-3 px-4">
                              <Badge variant={result.rank <= 3 ? "destructive" : "secondary"}>#{result.rank}</Badge>
                            </td>
                            <td className="py-3 px-4 text-white font-medium">{result.parameter}</td>
                            <td className="py-3 px-4 text-right text-slate-300">{result.baseValue.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">
                              <span
                                className={cn(
                                  "font-semibold",
                                  result.percentageChange > 15
                                    ? "text-red-400"
                                    : result.percentageChange > 5
                                      ? "text-yellow-400"
                                      : "text-green-400",
                                )}
                              >
                                {result.percentageChange.toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-slate-300">
                              {formatCurrency(result.absoluteChange)}
                            </td>
                            <td className="py-3 px-4 text-right text-slate-300">{result.elasticity.toFixed(2)}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Run analysis to see detailed results</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monte Carlo */}
        <TabsContent value="monte-carlo" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Monte Carlo Simulation</CardTitle>
              <p className="text-slate-400 text-sm">Statistical analysis with parameter uncertainty</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Brain className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">Monte Carlo simulation coming soon</p>
                <p className="text-slate-500 text-sm mt-2">
                  Advanced statistical analysis with parameter distributions
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights and Recommendations */}
      {results.length > 0 && (
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
                <h4 className="font-semibold text-white">High Impact Parameters</h4>
                {results
                  .filter((r) => r.percentageChange > 10)
                  .map((result) => (
                    <Alert key={result.parameterId} className="border-orange-500/50 bg-orange-500/10">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-orange-200">
                        <strong>{result.parameter}</strong> has high impact ({result.percentageChange.toFixed(1)}%).
                        Consider careful estimation and monitoring of this parameter.
                      </AlertDescription>
                    </Alert>
                  ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-white">Optimization Opportunities</h4>
                {results
                  .filter((r) => r.percentageChange > 5 && r.percentageChange <= 10)
                  .map((result) => (
                    <Alert key={result.parameterId} className="border-blue-500/50 bg-blue-500/10">
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-blue-200">
                        <strong>{result.parameter}</strong> offers optimization potential. Small improvements could
                        yield significant TCO benefits.
                      </AlertDescription>
                    </Alert>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SensitivityAnalyzer
