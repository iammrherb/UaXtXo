"use client"

import type React from "react"
import { useState, useMemo, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Settings,
  AlertTriangle,
  Info,
  BarChart3,
  Activity,
  Calculator,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface DistributionParameter {
  id: string
  name: string
  type: "normal" | "uniform" | "triangular" | "beta" | "lognormal"
  mean: number
  stdDev?: number
  min: number
  max: number
  mode?: number // For triangular distribution
  alpha?: number // For beta distribution
  beta?: number // For beta distribution
  unit: string
  description: string
}

interface SimulationResult {
  run: number
  totalCost: number
  roi: number
  paybackPeriod: number
  riskScore: number
  parameters: Record<string, number>
}

interface StatisticalSummary {
  mean: number
  median: number
  mode: number
  standardDeviation: number
  variance: number
  skewness: number
  kurtosis: number
  min: number
  max: number
  range: number
  percentiles: Record<string, number>
  confidenceIntervals: Record<string, [number, number]>
}

interface RiskMetrics {
  valueAtRisk95: number
  valueAtRisk99: number
  conditionalValueAtRisk95: number
  conditionalValueAtRisk99: number
  probabilityOfLoss: number
  expectedShortfall: number
  maximumDrawdown: number
}

const DISTRIBUTION_PARAMETERS: DistributionParameter[] = [
  {
    id: "device_count",
    name: "Device Count",
    type: "normal",
    mean: 2500,
    stdDev: 500,
    min: 1000,
    max: 10000,
    unit: "devices",
    description: "Number of devices with normal distribution around expected value",
  },
  {
    id: "growth_rate",
    name: "Annual Growth Rate",
    type: "triangular",
    mean: 15,
    min: 5,
    max: 35,
    mode: 15,
    unit: "%",
    description: "Growth rate with triangular distribution (pessimistic/likely/optimistic)",
  },
  {
    id: "implementation_time",
    name: "Implementation Time",
    type: "beta",
    mean: 6,
    min: 2,
    max: 18,
    alpha: 2,
    beta: 5,
    unit: "months",
    description: "Implementation time with beta distribution (right-skewed)",
  },
  {
    id: "staff_efficiency",
    name: "Staff Efficiency Gain",
    type: "normal",
    mean: 40,
    stdDev: 10,
    min: 10,
    max: 80,
    unit: "%",
    description: "Efficiency improvement with normal distribution",
  },
  {
    id: "breach_probability",
    name: "Breach Probability",
    type: "lognormal",
    mean: 5,
    stdDev: 2,
    min: 0.5,
    max: 25,
    unit: "%",
    description: "Breach probability with log-normal distribution (right-skewed)",
  },
  {
    id: "breach_cost",
    name: "Breach Cost",
    type: "lognormal",
    mean: 4500000,
    stdDev: 2000000,
    min: 500000,
    max: 20000000,
    unit: "$",
    description: "Breach cost with log-normal distribution",
  },
  {
    id: "vendor_price_increase",
    name: "Vendor Price Increase",
    type: "uniform",
    mean: 5,
    min: 0,
    max: 15,
    unit: "%",
    description: "Price increase with uniform distribution",
  },
  {
    id: "discount_rate",
    name: "Discount Rate",
    type: "normal",
    mean: 8,
    stdDev: 2,
    min: 3,
    max: 15,
    unit: "%",
    description: "Cost of capital with normal distribution",
  },
]

const MonteCarloSimulator: React.FC = () => {
  const [parameters, setParameters] = useState<DistributionParameter[]>(DISTRIBUTION_PARAMETERS)
  const [simulationRuns, setSimulationRuns] = useState(10000)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<SimulationResult[]>([])
  const [statistics, setStatistics] = useState<StatisticalSummary | null>(null)
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<"totalCost" | "roi" | "paybackPeriod">("totalCost")
  const [confidenceLevel, setConfidenceLevel] = useState(95)
  const [showDistributions, setShowDistributions] = useState(false)
  const [convergenceData, setConvergenceData] = useState<any[]>([])

  // Random number generators for different distributions
  const generateRandomValue = useCallback((param: DistributionParameter): number => {
    const { type, mean, stdDev, min, max, mode, alpha, beta } = param

    switch (type) {
      case "normal":
        // Box-Muller transform for normal distribution
        const u1 = Math.random()
        const u2 = Math.random()
        const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
        const value = mean + (stdDev || 1) * z0
        return Math.max(min, Math.min(max, value))

      case "uniform":
        return min + Math.random() * (max - min)

      case "triangular":
        const u = Math.random()
        const modeNorm = (mode || mean - min) / (max - min)
        if (u < modeNorm) {
          return min + Math.sqrt(u * (max - min) * ((mode || mean) - min))
        } else {
          return max - Math.sqrt((1 - u) * (max - min) * (max - (mode || mean)))
        }

      case "beta":
        // Simplified beta distribution using rejection sampling
        const a = alpha || 2
        const b = beta || 5
        let x, y
        do {
          x = Math.random()
          y = Math.random()
        } while (y > Math.pow(x, a - 1) * Math.pow(1 - x, b - 1))
        return min + x * (max - min)

      case "lognormal":
        const normalValue = mean + (stdDev || 1) * (Math.random() - 0.5) * 2
        const logValue = Math.exp(normalValue / 1000) * 1000 // Scaled for practical values
        return Math.max(min, Math.min(max, logValue))

      default:
        return mean
    }
  }, [])

  // Calculate TCO for given parameters
  const calculateTCO = useCallback((paramValues: Record<string, number>) => {
    const deviceCount = paramValues.device_count || 2500
    const growthRate = (paramValues.growth_rate || 15) / 100
    const implementationTime = paramValues.implementation_time || 6
    const staffEfficiency = (paramValues.staff_efficiency || 40) / 100
    const breachProb = (paramValues.breach_probability || 5) / 100
    const breachCost = paramValues.breach_cost || 4500000
    const priceIncrease = (paramValues.vendor_price_increase || 5) / 100
    const discountRate = (paramValues.discount_rate || 8) / 100

    // Simplified TCO calculation
    const baseLicenseCost = deviceCount * 4.5 * 12
    const implementationCost = deviceCount * 15 + implementationTime * 50000
    const operationalSavings = deviceCount * 100 * staffEfficiency
    const riskReduction = breachProb * breachCost * 0.8

    let totalCost = implementationCost
    let totalBenefit = 0

    for (let year = 1; year <= 3; year++) {
      const discountFactor = Math.pow(1 + discountRate, year - 1)
      const growthFactor = Math.pow(1 + growthRate, year - 1)
      const priceFactor = Math.pow(1 + priceIncrease, year - 1)

      const yearlyCost = (baseLicenseCost * growthFactor * priceFactor) / discountFactor
      const yearlyBenefit = (operationalSavings * growthFactor + riskReduction) / discountFactor

      totalCost += yearlyCost
      totalBenefit += yearlyBenefit
    }

    const netCost = totalCost - totalBenefit
    const roi = totalCost > 0 ? ((totalBenefit - totalCost) / totalCost) * 100 : 0
    const paybackPeriod = totalBenefit > 0 ? (totalCost / (totalBenefit / 3)) * 12 : 999
    const riskScore = Math.min(100, breachProb * 20 + (implementationTime / 24) * 30 + (1 - staffEfficiency) * 50)

    return { totalCost: netCost, roi, paybackPeriod, riskScore }
  }, [])

  // Run Monte Carlo simulation
  const runSimulation = useCallback(async () => {
    setIsRunning(true)
    setProgress(0)
    setResults([])

    const newResults: SimulationResult[] = []
    const convergencePoints: any[] = []
    let runningSum = 0

    for (let i = 0; i < simulationRuns; i++) {
      // Generate random parameter values
      const paramValues: Record<string, number> = {}
      parameters.forEach((param) => {
        paramValues[param.id] = generateRandomValue(param)
      })

      // Calculate results
      const tcoResult = calculateTCO(paramValues)

      const result: SimulationResult = {
        run: i + 1,
        ...tcoResult,
        parameters: paramValues,
      }

      newResults.push(result)
      runningSum += result.totalCost

      // Track convergence every 100 runs
      if (i % 100 === 0) {
        convergencePoints.push({
          run: i + 1,
          mean: runningSum / (i + 1),
          current: result.totalCost,
        })
      }

      // Update progress
      if (i % Math.floor(simulationRuns / 100) === 0) {
        setProgress((i / simulationRuns) * 100)
        await new Promise((resolve) => setTimeout(resolve, 1))
      }
    }

    setResults(newResults)
    setConvergenceData(convergencePoints)
    calculateStatistics(newResults)
    setProgress(100)
    setIsRunning(false)
  }, [simulationRuns, parameters, generateRandomValue, calculateTCO])

  // Calculate statistical summary
  const calculateStatistics = useCallback(
    (results: SimulationResult[]) => {
      if (results.length === 0) return

      const values = results.map((r) => r[selectedMetric]).sort((a, b) => a - b)
      const n = values.length

      const mean = values.reduce((sum, val) => sum + val, 0) / n
      const median = n % 2 === 0 ? (values[n / 2 - 1] + values[n / 2]) / 2 : values[Math.floor(n / 2)]

      const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n
      const standardDeviation = Math.sqrt(variance)

      const skewness = values.reduce((sum, val) => sum + Math.pow((val - mean) / standardDeviation, 3), 0) / n
      const kurtosis = values.reduce((sum, val) => sum + Math.pow((val - mean) / standardDeviation, 4), 0) / n - 3

      const percentiles = {
        "1%": values[Math.floor(n * 0.01)],
        "5%": values[Math.floor(n * 0.05)],
        "10%": values[Math.floor(n * 0.1)],
        "25%": values[Math.floor(n * 0.25)],
        "50%": median,
        "75%": values[Math.floor(n * 0.75)],
        "90%": values[Math.floor(n * 0.9)],
        "95%": values[Math.floor(n * 0.95)],
        "99%": values[Math.floor(n * 0.99)],
      }

      const confidenceIntervals = {
        "90%": [values[Math.floor(n * 0.05)], values[Math.floor(n * 0.95)]] as [number, number],
        "95%": [values[Math.floor(n * 0.025)], values[Math.floor(n * 0.975)]] as [number, number],
        "99%": [values[Math.floor(n * 0.005)], values[Math.floor(n * 0.995)]] as [number, number],
      }

      const stats: StatisticalSummary = {
        mean,
        median,
        mode: values[0], // Simplified
        standardDeviation,
        variance,
        skewness,
        kurtosis,
        min: values[0],
        max: values[n - 1],
        range: values[n - 1] - values[0],
        percentiles,
        confidenceIntervals,
      }

      setStatistics(stats)

      // Calculate risk metrics
      const var95 = values[Math.floor(n * 0.95)]
      const var99 = values[Math.floor(n * 0.99)]
      const tail95 = values.slice(Math.floor(n * 0.95))
      const tail99 = values.slice(Math.floor(n * 0.99))

      const riskMetrics: RiskMetrics = {
        valueAtRisk95: var95,
        valueAtRisk99: var99,
        conditionalValueAtRisk95: tail95.reduce((sum, val) => sum + val, 0) / tail95.length,
        conditionalValueAtRisk99: tail99.reduce((sum, val) => sum + val, 0) / tail99.length,
        probabilityOfLoss: values.filter((val) => val > mean * 1.2).length / n,
        expectedShortfall: tail95.reduce((sum, val) => sum + Math.max(0, val - var95), 0) / tail95.length,
        maximumDrawdown: Math.max(...values) - Math.min(...values),
      }

      setRiskMetrics(riskMetrics)
    },
    [selectedMetric],
  )

  // Update statistics when metric changes
  useEffect(() => {
    if (results.length > 0) {
      calculateStatistics(results)
    }
  }, [selectedMetric, results, calculateStatistics])

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Prepare histogram data
  const histogramData = useMemo(() => {
    if (results.length === 0) return []

    const values = results.map((r) => r[selectedMetric])
    const min = Math.min(...values)
    const max = Math.max(...values)
    const binCount = 50
    const binSize = (max - min) / binCount

    const bins = Array(binCount)
      .fill(0)
      .map((_, i) => ({
        x: min + i * binSize,
        y: 0,
        range: `${formatCurrency(min + i * binSize)} - ${formatCurrency(min + (i + 1) * binSize)}`,
      }))

    values.forEach((value) => {
      const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1)
      bins[binIndex].y++
    })

    return bins
  }, [results, selectedMetric])

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Monte Carlo Simulation</h1>
          <p className="text-slate-400 mt-1">Statistical analysis with parameter uncertainty and risk assessment</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={runSimulation} disabled={isRunning} className="bg-emerald-600 hover:bg-emerald-700">
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Simulation
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

      {/* Configuration */}
      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Simulation Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-300">Number of Runs</Label>
              <Input
                type="number"
                value={simulationRuns}
                onChange={(e) => setSimulationRuns(Number(e.target.value))}
                min={1000}
                max={100000}
                step={1000}
                className="bg-slate-800 border-slate-600"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Analysis Metric</Label>
              <Select value={selectedMetric} onValueChange={(value) => setSelectedMetric(value as any)}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="totalCost">Total Cost</SelectItem>
                  <SelectItem value="roi">ROI %</SelectItem>
                  <SelectItem value="paybackPeriod">Payback Period</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Confidence Level</Label>
              <Select value={confidenceLevel.toString()} onValueChange={(value) => setConfidenceLevel(Number(value))}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="90">90%</SelectItem>
                  <SelectItem value="95">95%</SelectItem>
                  <SelectItem value="99">99%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isRunning && (
              <div className="space-y-2">
                <Label className="text-slate-300">Progress</Label>
                <Progress value={progress} className="w-full" />
                <div className="text-xs text-slate-400">{progress.toFixed(1)}% complete</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="convergence">Convergence</TabsTrigger>
        </TabsList>

        {/* Distribution Analysis */}
        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">
                    {selectedMetric === "totalCost"
                      ? "Total Cost"
                      : selectedMetric === "roi"
                        ? "ROI"
                        : "Payback Period"}{" "}
                    Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {histogramData.length > 0 ? (
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={histogramData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis
                            dataKey="x"
                            stroke="#9CA3AF"
                            tickFormatter={(value) =>
                              selectedMetric === "totalCost"
                                ? `$${(value / 1000).toFixed(0)}K`
                                : selectedMetric === "roi"
                                  ? `${value.toFixed(0)}%`
                                  : `${value.toFixed(0)}m`
                            }
                          />
                          <YAxis stroke="#9CA3AF" />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: "#1F2937",
                              border: "1px solid #374151",
                              borderRadius: "8px",
                            }}
                            formatter={(value: any) => [value, "Frequency"]}
                            labelFormatter={(label) => histogramData.find((d) => d.x === label)?.range}
                          />
                          <Bar dataKey="y" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-96 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">Run simulation to see distribution</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              {statistics && (
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Quick Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-slate-800/50">
                        <div className="text-sm text-slate-400">Mean</div>
                        <div className="text-lg font-bold text-white">
                          {selectedMetric === "totalCost"
                            ? formatCurrency(statistics.mean)
                            : selectedMetric === "roi"
                              ? `${statistics.mean.toFixed(1)}%`
                              : `${statistics.mean.toFixed(1)}m`}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/50">
                        <div className="text-sm text-slate-400">Median</div>
                        <div className="text-lg font-bold text-white">
                          {selectedMetric === "totalCost"
                            ? formatCurrency(statistics.median)
                            : selectedMetric === "roi"
                              ? `${statistics.median.toFixed(1)}%`
                              : `${statistics.median.toFixed(1)}m`}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/50">
                        <div className="text-sm text-slate-400">Std Dev</div>
                        <div className="text-lg font-bold text-white">
                          {selectedMetric === "totalCost"
                            ? formatCurrency(statistics.standardDeviation)
                            : selectedMetric === "roi"
                              ? `${statistics.standardDeviation.toFixed(1)}%`
                              : `${statistics.standardDeviation.toFixed(1)}m`}
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/50">
                        <div className="text-sm text-slate-400">Range</div>
                        <div className="text-lg font-bold text-white">
                          {selectedMetric === "totalCost"
                            ? formatCurrency(statistics.range)
                            : selectedMetric === "roi"
                              ? `${statistics.range.toFixed(1)}%`
                              : `${statistics.range.toFixed(1)}m`}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Confidence Intervals */}
              {statistics && (
                <Card className="bg-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Confidence Intervals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(statistics.confidenceIntervals).map(([level, [low, high]]) => (
                      <div key={level} className="flex justify-between items-center">
                        <span className="text-slate-400">{level}:</span>
                        <span className="text-white font-semibold">
                          {selectedMetric === "totalCost"
                            ? `${formatCurrency(low)} - ${formatCurrency(high)}`
                            : selectedMetric === "roi"
                              ? `${low.toFixed(1)}% - ${high.toFixed(1)}%`
                              : `${low.toFixed(1)}m - ${high.toFixed(1)}m`}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Detailed Statistics */}
        <TabsContent value="statistics" className="space-y-6">
          {statistics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Descriptive Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Mean", value: statistics.mean },
                      { label: "Median", value: statistics.median },
                      { label: "Standard Deviation", value: statistics.standardDeviation },
                      { label: "Variance", value: statistics.variance },
                      { label: "Skewness", value: statistics.skewness },
                      { label: "Kurtosis", value: statistics.kurtosis },
                      { label: "Minimum", value: statistics.min },
                      { label: "Maximum", value: statistics.max },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-slate-800">
                        <span className="text-slate-400">{label}:</span>
                        <span className="text-white font-semibold">
                          {selectedMetric === "totalCost"
                            ? formatCurrency(value)
                            : selectedMetric === "roi"
                              ? `${value.toFixed(2)}%`
                              : `${value.toFixed(2)}m`}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Percentiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(statistics.percentiles).map(([percentile, value]) => (
                      <div
                        key={percentile}
                        className="flex justify-between items-center py-2 border-b border-slate-800"
                      >
                        <span className="text-slate-400">{percentile}:</span>
                        <span className="text-white font-semibold">
                          {selectedMetric === "totalCost"
                            ? formatCurrency(value)
                            : selectedMetric === "roi"
                              ? `${value.toFixed(1)}%`
                              : `${value.toFixed(1)}m`}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calculator className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Run simulation to see detailed statistics</p>
            </div>
          )}
        </TabsContent>

        {/* Risk Analysis */}
        <TabsContent value="risk" className="space-y-6">
          {riskMetrics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "Value at Risk (95%)", value: riskMetrics.valueAtRisk95, color: "text-yellow-400" },
                      { label: "Value at Risk (99%)", value: riskMetrics.valueAtRisk99, color: "text-red-400" },
                      {
                        label: "Conditional VaR (95%)",
                        value: riskMetrics.conditionalValueAtRisk95,
                        color: "text-orange-400",
                      },
                      { label: "Expected Shortfall", value: riskMetrics.expectedShortfall, color: "text-red-400" },
                      { label: "Maximum Drawdown", value: riskMetrics.maximumDrawdown, color: "text-purple-400" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-slate-800">
                        <span className="text-slate-400">{label}:</span>
                        <span className={cn("font-semibold", color)}>
                          {selectedMetric === "totalCost"
                            ? formatCurrency(value)
                            : selectedMetric === "roi"
                              ? `${value.toFixed(1)}%`
                              : `${value.toFixed(1)}m`}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="font-semibold text-red-400">Probability of Loss</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {(riskMetrics.probabilityOfLoss * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-slate-400 mt-1">Chance of exceeding baseline by 20%</div>
                  </div>

                  <Alert className="border-blue-500/50 bg-blue-500/10">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-blue-200">
                      <strong>Risk Interpretation:</strong> Based on the simulation, there's a{" "}
                      {(riskMetrics.probabilityOfLoss * 100).toFixed(1)}% chance that costs will exceed expectations
                      significantly. Consider risk mitigation strategies.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Run simulation to see risk analysis</p>
            </div>
          )}
        </TabsContent>

        {/* Convergence Analysis */}
        <TabsContent value="convergence" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Convergence Analysis</CardTitle>
              <p className="text-slate-400 text-sm">Shows how the mean stabilizes as more simulations are run</p>
            </CardHeader>
            <CardContent>
              {convergenceData.length > 0 ? (
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={convergenceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="run" stroke="#9CA3AF" />
                      <YAxis
                        stroke="#9CA3AF"
                        tickFormatter={(value) =>
                          selectedMetric === "totalCost"
                            ? `$${(value / 1000).toFixed(0)}K`
                            : selectedMetric === "roi"
                              ? `${value.toFixed(0)}%`
                              : `${value.toFixed(0)}m`
                        }
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                        formatter={(value: any, name: string) => [
                          selectedMetric === "totalCost"
                            ? formatCurrency(value)
                            : selectedMetric === "roi"
                              ? `${value.toFixed(1)}%`
                              : `${value.toFixed(1)}m`,
                          name === "mean" ? "Running Mean" : "Current Value",
                        ]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="mean"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Running Mean"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="current"
                        stroke="#3b82f6"
                        strokeWidth={1}
                        strokeOpacity={0.6}
                        name="Individual Results"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Run simulation to see convergence analysis</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MonteCarloSimulator
