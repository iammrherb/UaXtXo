"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ResponsiveContainer,
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
  Trash2,
  Plus,
  Settings,
  Info,
  BarChart3,
  Brain,
  Shuffle,
  Lightbulb,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Types for scenario analysis
interface ScenarioParameter {
  id: string
  name: string
  category: "cost" | "operational" | "risk" | "business"
  baseValue: number
  currentValue: number
  min: number
  max: number
  step: number
  unit: string
  description: string
  impact: "high" | "medium" | "low"
  distribution?: "normal" | "uniform" | "triangular" | "beta"
  confidence?: number
}

interface Scenario {
  id: string
  name: string
  description: string
  parameters: Record<string, number>
  results?: ScenarioResults
  createdAt: Date
  isBaseline?: boolean
  color?: string
}

interface ScenarioResults {
  totalCost: number
  roi: number
  paybackPeriod: number
  riskScore: number
  confidenceInterval: [number, number]
  sensitivityFactors: Record<string, number>
}

interface SensitivityAnalysisResult {
  parameter: string
  impact: number
  correlation: number
  elasticity: number
  riskContribution: number
}

interface MonteCarloResult {
  scenarios: number
  mean: number
  median: number
  standardDeviation: number
  confidenceIntervals: {
    "90%": [number, number]
    "95%": [number, number]
    "99%": [number, number]
  }
  percentiles: Record<string, number>
  riskMetrics: {
    valueAtRisk: number
    conditionalValueAtRisk: number
    probabilityOfLoss: number
  }
}

// Default parameters for analysis
const DEFAULT_PARAMETERS: ScenarioParameter[] = [
  {
    id: "device_count",
    name: "Device Count",
    category: "operational",
    baseValue: 2500,
    currentValue: 2500,
    min: 100,
    max: 50000,
    step: 100,
    unit: "devices",
    description: "Total number of network devices to be managed",
    impact: "high",
    distribution: "normal",
    confidence: 0.8,
  },
  {
    id: "user_count",
    name: "User Count",
    category: "operational",
    baseValue: 1500,
    currentValue: 1500,
    min: 50,
    max: 35000,
    step: 50,
    unit: "users",
    description: "Total number of users requiring network access",
    impact: "high",
    distribution: "normal",
    confidence: 0.85,
  },
  {
    id: "growth_rate",
    name: "Annual Growth Rate",
    category: "business",
    baseValue: 15,
    currentValue: 15,
    min: -10,
    max: 50,
    step: 1,
    unit: "%",
    description: "Expected annual growth in devices and users",
    impact: "medium",
    distribution: "triangular",
    confidence: 0.6,
  },
  {
    id: "implementation_complexity",
    name: "Implementation Complexity",
    category: "operational",
    baseValue: 1.0,
    currentValue: 1.0,
    min: 0.5,
    max: 3.0,
    step: 0.1,
    unit: "multiplier",
    description: "Complexity multiplier for implementation costs",
    impact: "medium",
    distribution: "beta",
    confidence: 0.7,
  },
  {
    id: "staff_efficiency",
    name: "Staff Efficiency Gain",
    category: "operational",
    baseValue: 40,
    currentValue: 40,
    min: 0,
    max: 80,
    step: 5,
    unit: "%",
    description: "Expected efficiency improvement with new solution",
    impact: "high",
    distribution: "normal",
    confidence: 0.75,
  },
  {
    id: "breach_probability",
    name: "Annual Breach Probability",
    category: "risk",
    baseValue: 5,
    currentValue: 5,
    min: 0.1,
    max: 25,
    step: 0.1,
    unit: "%",
    description: "Probability of security breach per year",
    impact: "high",
    distribution: "beta",
    confidence: 0.6,
  },
  {
    id: "breach_cost",
    name: "Average Breach Cost",
    category: "risk",
    baseValue: 4500000,
    currentValue: 4500000,
    min: 500000,
    max: 20000000,
    step: 100000,
    unit: "$",
    description: "Average cost of a security breach",
    impact: "high",
    distribution: "triangular",
    confidence: 0.5,
  },
  {
    id: "discount_rate",
    name: "Discount Rate",
    category: "business",
    baseValue: 8,
    currentValue: 8,
    min: 2,
    max: 15,
    step: 0.5,
    unit: "%",
    description: "Cost of capital for NPV calculations",
    impact: "medium",
    distribution: "normal",
    confidence: 0.8,
  },
  {
    id: "inflation_rate",
    name: "Inflation Rate",
    category: "business",
    baseValue: 3,
    currentValue: 3,
    min: 0,
    max: 10,
    step: 0.1,
    unit: "%",
    description: "Expected annual inflation rate",
    impact: "low",
    distribution: "normal",
    confidence: 0.9,
  },
  {
    id: "vendor_price_increase",
    name: "Vendor Price Increase",
    category: "cost",
    baseValue: 5,
    currentValue: 5,
    min: 0,
    max: 20,
    step: 1,
    unit: "%",
    description: "Expected annual price increases from vendors",
    impact: "medium",
    distribution: "uniform",
    confidence: 0.7,
  },
]

// Scenario templates
const SCENARIO_TEMPLATES = [
  {
    name: "Conservative Growth",
    description: "Low growth, high confidence assumptions",
    parameters: {
      growth_rate: 8,
      staff_efficiency: 25,
      breach_probability: 3,
      implementation_complexity: 0.8,
    },
  },
  {
    name: "Aggressive Growth",
    description: "High growth, optimistic assumptions",
    parameters: {
      growth_rate: 25,
      staff_efficiency: 60,
      breach_probability: 8,
      implementation_complexity: 1.3,
    },
  },
  {
    name: "Economic Downturn",
    description: "Pessimistic economic conditions",
    parameters: {
      growth_rate: -5,
      staff_efficiency: 15,
      breach_probability: 12,
      discount_rate: 12,
      inflation_rate: 6,
    },
  },
  {
    name: "High Security Risk",
    description: "Elevated security threat environment",
    parameters: {
      breach_probability: 15,
      breach_cost: 8000000,
      staff_efficiency: 50,
      implementation_complexity: 1.2,
    },
  },
  {
    name: "Rapid Expansion",
    description: "Fast-growing organization scenario",
    parameters: {
      device_count: 5000,
      user_count: 3500,
      growth_rate: 35,
      implementation_complexity: 1.5,
    },
  },
]

const WhatIfScenarioBuilder: React.FC = () => {
  const [parameters, setParameters] = useState<ScenarioParameter[]>(DEFAULT_PARAMETERS)
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [activeScenario, setActiveScenario] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [analysisType, setAnalysisType] = useState<"sensitivity" | "montecarlo" | "scenario">("scenario")
  const [monteCarloRuns, setMonteCarloRuns] = useState(10000)
  const [sensitivityResults, setSensitivityResults] = useState<SensitivityAnalysisResult[]>([])
  const [monteCarloResults, setMonteCarloResults] = useState<MonteCarloResult | null>(null)
  const [selectedParameters, setSelectedParameters] = useState<string[]>([
    "device_count",
    "growth_rate",
    "staff_efficiency",
  ])
  const [viewMode, setViewMode] = useState<"builder" | "analysis" | "comparison">("builder")
  const [autoRun, setAutoRun] = useState(false)

  // Create baseline scenario
  useEffect(() => {
    if (scenarios.length === 0) {
      const baselineScenario: Scenario = {
        id: "baseline",
        name: "Baseline Scenario",
        description: "Current assumptions and parameters",
        parameters: parameters.reduce(
          (acc, param) => {
            acc[param.id] = param.baseValue
            return acc
          },
          {} as Record<string, number>,
        ),
        createdAt: new Date(),
        isBaseline: true,
        color: "#10b981",
      }
      setScenarios([baselineScenario])
      setActiveScenario("baseline")
    }
  }, [parameters, scenarios.length])

  // Calculate scenario results
  const calculateScenarioResults = useCallback((scenario: Scenario): ScenarioResults => {
    const params = scenario.parameters

    // Simplified TCO calculation with scenario parameters
    const deviceCount = params.device_count || 2500
    const userCount = params.user_count || 1500
    const growthRate = (params.growth_rate || 15) / 100
    const complexityMultiplier = params.implementation_complexity || 1.0
    const efficiencyGain = (params.staff_efficiency || 40) / 100
    const breachProb = (params.breach_probability || 5) / 100
    const breachCost = params.breach_cost || 4500000
    const discountRate = (params.discount_rate || 8) / 100

    // Base costs (simplified)
    const baseLicenseCost = deviceCount * 4.5 * 12 // $4.5/device/month
    const implementationCost = deviceCount * 15 * complexityMultiplier
    const operationalSavings = userCount * 2000 * efficiencyGain // $2000/user/year savings
    const riskReduction = breachProb * breachCost * 0.8 // 80% risk reduction

    // 3-year projection with growth
    let totalCost = 0
    let totalBenefit = 0

    for (let year = 1; year <= 3; year++) {
      const yearlyDevices = deviceCount * Math.pow(1 + growthRate, year - 1)
      const yearlyUsers = userCount * Math.pow(1 + growthRate, year - 1)
      const discountFactor = Math.pow(1 + discountRate, year - 1)

      const yearlyCost = (baseLicenseCost * Math.pow(1 + growthRate, year - 1)) / discountFactor
      const yearlyBenefit = (operationalSavings * Math.pow(1 + growthRate, year - 1) + riskReduction) / discountFactor

      totalCost += yearlyCost
      totalBenefit += yearlyBenefit
    }

    totalCost += implementationCost

    const netBenefit = totalBenefit - totalCost
    const roi = totalCost > 0 ? (netBenefit / totalCost) * 100 : 0
    const paybackPeriod = totalBenefit > 0 ? (totalCost / (totalBenefit / 3)) * 12 : 999 // months

    // Risk score calculation
    const riskScore = Math.min(
      100,
      Math.max(0, breachProb * 30 + complexityMultiplier * 20 + (1 - efficiencyGain) * 25 + Math.abs(growthRate) * 25),
    )

    // Confidence interval (simplified)
    const variance = totalCost * 0.15 // 15% variance
    const confidenceInterval: [number, number] = [totalCost - variance, totalCost + variance]

    return {
      totalCost,
      roi,
      paybackPeriod,
      riskScore,
      confidenceInterval,
      sensitivityFactors: {
        device_count: 0.4,
        growth_rate: 0.3,
        staff_efficiency: 0.2,
        breach_probability: 0.1,
      },
    }
  }, [])

  // Update parameter value
  const updateParameter = useCallback(
    (parameterId: string, value: number) => {
      setParameters((prev) =>
        prev.map((param) => (param.id === parameterId ? { ...param, currentValue: value } : param)),
      )

      if (activeScenario && autoRun) {
        setScenarios((prev) =>
          prev.map((scenario) => {
            if (scenario.id === activeScenario) {
              const updatedScenario = {
                ...scenario,
                parameters: { ...scenario.parameters, [parameterId]: value },
              }
              return {
                ...updatedScenario,
                results: calculateScenarioResults(updatedScenario),
              }
            }
            return scenario
          }),
        )
      }
    },
    [activeScenario, autoRun, calculateScenarioResults],
  )

  // Create new scenario
  const createScenario = useCallback(
    (name: string, description: string, template?: any) => {
      const newScenario: Scenario = {
        id: `scenario_${Date.now()}`,
        name,
        description,
        parameters: template
          ? { ...parameters.reduce((acc, param) => ({ ...acc, [param.id]: param.currentValue }), {}), ...template }
          : parameters.reduce((acc, param) => ({ ...acc, [param.id]: param.currentValue }), {}),
        createdAt: new Date(),
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      }

      newScenario.results = calculateScenarioResults(newScenario)
      setScenarios((prev) => [...prev, newScenario])
      setActiveScenario(newScenario.id)
    },
    [parameters, calculateScenarioResults],
  )

  // Run sensitivity analysis
  const runSensitivityAnalysis = useCallback(async () => {
    setIsRunning(true)

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const results: SensitivityAnalysisResult[] = selectedParameters
      .map((paramId) => {
        const param = parameters.find((p) => p.id === paramId)
        if (!param) return null

        // Simulate sensitivity calculation
        const baseResult = calculateScenarioResults({
          id: "temp",
          name: "temp",
          description: "temp",
          parameters: parameters.reduce((acc, p) => ({ ...acc, [p.id]: p.currentValue }), {}),
          createdAt: new Date(),
        })

        // Calculate impact by varying parameter ±10%
        const variation = param.currentValue * 0.1
        const highResult = calculateScenarioResults({
          id: "temp",
          name: "temp",
          description: "temp",
          parameters: {
            ...parameters.reduce((acc, p) => ({ ...acc, [p.id]: p.currentValue }), {}),
            [paramId]: param.currentValue + variation,
          },
          createdAt: new Date(),
        })

        const impact = Math.abs(highResult.totalCost - baseResult.totalCost) / baseResult.totalCost
        const correlation = Math.random() * 0.8 + 0.2 // Simulate correlation
        const elasticity = (highResult.totalCost / baseResult.totalCost - 1) / (variation / param.currentValue)

        return {
          parameter: param.name,
          impact: impact * 100,
          correlation,
          elasticity,
          riskContribution: impact * correlation * 100,
        }
      })
      .filter(Boolean) as SensitivityAnalysisResult[]

    setSensitivityResults(results.sort((a, b) => b.impact - a.impact))
    setIsRunning(false)
  }, [selectedParameters, parameters, calculateScenarioResults])

  // Run Monte Carlo simulation
  const runMonteCarloSimulation = useCallback(async () => {
    setIsRunning(true)

    // Simulate Monte Carlo analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const results: number[] = []

    for (let i = 0; i < monteCarloRuns; i++) {
      const randomParams = parameters.reduce(
        (acc, param) => {
          let randomValue: number

          switch (param.distribution) {
            case "normal":
              randomValue = param.currentValue + (Math.random() - 0.5) * param.currentValue * 0.2
              break
            case "uniform":
              randomValue = param.min + Math.random() * (param.max - param.min)
              break
            case "triangular":
              const u = Math.random()
              const mode = param.currentValue
              if (u < (mode - param.min) / (param.max - param.min)) {
                randomValue = param.min + Math.sqrt(u * (param.max - param.min) * (mode - param.min))
              } else {
                randomValue = param.max - Math.sqrt((1 - u) * (param.max - param.min) * (param.max - mode))
              }
              break
            default:
              randomValue = param.currentValue
          }

          acc[param.id] = Math.max(param.min, Math.min(param.max, randomValue))
          return acc
        },
        {} as Record<string, number>,
      )

      const result = calculateScenarioResults({
        id: "temp",
        name: "temp",
        description: "temp",
        parameters: randomParams,
        createdAt: new Date(),
      })

      results.push(result.totalCost)
    }

    results.sort((a, b) => a - b)

    const mean = results.reduce((sum, val) => sum + val, 0) / results.length
    const median = results[Math.floor(results.length / 2)]
    const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length
    const standardDeviation = Math.sqrt(variance)

    const getPercentile = (p: number) => results[Math.floor((results.length * p) / 100)]

    const monteCarloResult: MonteCarloResult = {
      scenarios: monteCarloRuns,
      mean,
      median,
      standardDeviation,
      confidenceIntervals: {
        "90%": [getPercentile(5), getPercentile(95)],
        "95%": [getPercentile(2.5), getPercentile(97.5)],
        "99%": [getPercentile(0.5), getPercentile(99.5)],
      },
      percentiles: {
        "10%": getPercentile(10),
        "25%": getPercentile(25),
        "50%": getPercentile(50),
        "75%": getPercentile(75),
        "90%": getPercentile(90),
      },
      riskMetrics: {
        valueAtRisk: getPercentile(95),
        conditionalValueAtRisk:
          results.slice(Math.floor(results.length * 0.95)).reduce((sum, val) => sum + val, 0) / (results.length * 0.05),
        probabilityOfLoss: results.filter((val) => val > mean * 1.2).length / results.length,
      },
    }

    setMonteCarloResults(monteCarloResult)
    setIsRunning(false)
  }, [monteCarloRuns, parameters, calculateScenarioResults])

  // Parameter control component
  const ParameterControl: React.FC<{ parameter: ScenarioParameter }> = ({ parameter }) => (
    <motion.div
      className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Label className="font-semibold text-white">{parameter.name}</Label>
          <Badge
            variant={
              parameter.impact === "high" ? "destructive" : parameter.impact === "medium" ? "default" : "secondary"
            }
          >
            {parameter.impact}
          </Badge>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-slate-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{parameter.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Slider
              value={[parameter.currentValue]}
              onValueChange={([value]) => updateParameter(parameter.id, value)}
              min={parameter.min}
              max={parameter.max}
              step={parameter.step}
              className="w-full"
            />
          </div>
          <div className="w-24">
            <Input
              type="number"
              value={parameter.currentValue}
              onChange={(e) => updateParameter(parameter.id, Number(e.target.value))}
              min={parameter.min}
              max={parameter.max}
              step={parameter.step}
              className="text-center bg-slate-700/50 border-slate-600"
            />
          </div>
          <span className="text-sm text-slate-400 w-16">{parameter.unit}</span>
        </div>

        <div className="flex justify-between text-xs text-slate-500">
          <span>
            {parameter.min} {parameter.unit}
          </span>
          <span className="text-emerald-400 font-semibold">
            Base: {parameter.baseValue} {parameter.unit}
          </span>
          <span>
            {parameter.max} {parameter.unit}
          </span>
        </div>

        {parameter.distribution && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Distribution:</span>
            <Badge variant="outline" className="text-xs">
              {parameter.distribution}
            </Badge>
            {parameter.confidence && (
              <span className="text-slate-400">Confidence: {(parameter.confidence * 100).toFixed(0)}%</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">What-If Scenario Analysis</h1>
          <p className="text-slate-400 mt-1">Explore different assumptions and their impact on TCO calculations</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch checked={autoRun} onCheckedChange={setAutoRun} id="auto-run" />
            <Label htmlFor="auto-run" className="text-sm text-slate-300">
              Auto-run
            </Label>
          </div>

          <Button
            onClick={() => {
              if (analysisType === "sensitivity") runSensitivityAnalysis()
              else if (analysisType === "montecarlo") runMonteCarloSimulation()
            }}
            disabled={isRunning}
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

          <Button variant="outline" onClick={() => setParameters(DEFAULT_PARAMETERS)}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Main Navigation */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Scenario Builder
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Sensitivity Analysis
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Scenario Comparison
          </TabsTrigger>
        </TabsList>

        {/* Scenario Builder */}
        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Parameter Controls */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Scenario Parameters</CardTitle>
                    <div className="flex items-center gap-2">
                      <Select value={analysisType} onValueChange={(value) => setAnalysisType(value as any)}>
                        <SelectTrigger className="w-40 bg-slate-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scenario">Scenario Analysis</SelectItem>
                          <SelectItem value="sensitivity">Sensitivity Analysis</SelectItem>
                          <SelectItem value="montecarlo">Monte Carlo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="cost" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
                      <TabsTrigger value="cost">Cost</TabsTrigger>
                      <TabsTrigger value="operational">Operational</TabsTrigger>
                      <TabsTrigger value="risk">Risk</TabsTrigger>
                      <TabsTrigger value="business">Business</TabsTrigger>
                    </TabsList>

                    {["cost", "operational", "risk", "business"].map((category) => (
                      <TabsContent key={category} value={category} className="space-y-4 mt-6">
                        {parameters
                          .filter((param) => param.category === category)
                          .map((parameter) => (
                            <ParameterControl key={parameter.id} parameter={parameter} />
                          ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Scenario Management */}
            <div className="space-y-6">
              {/* Quick Templates */}
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Quick Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {SCENARIO_TEMPLATES.map((template, index) => (
                    <motion.button
                      key={index}
                      onClick={() => createScenario(template.name, template.description, template.parameters)}
                      className="w-full p-3 text-left rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-semibold text-white text-sm">{template.name}</div>
                      <div className="text-xs text-slate-400 mt-1">{template.description}</div>
                    </motion.button>
                  ))}
                </CardContent>
              </Card>

              {/* Current Scenarios */}
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Scenarios</CardTitle>
                    <Button
                      size="sm"
                      onClick={() => createScenario(`Scenario ${scenarios.length + 1}`, "Custom scenario")}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-2">
                      {scenarios.map((scenario) => (
                        <motion.div
                          key={scenario.id}
                          className={cn(
                            "p-3 rounded-lg border cursor-pointer transition-colors",
                            activeScenario === scenario.id
                              ? "border-emerald-500 bg-emerald-500/10"
                              : "border-slate-700/50 bg-slate-800/30 hover:bg-slate-700/50",
                          )}
                          onClick={() => setActiveScenario(scenario.id)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scenario.color }} />
                              <span className="font-semibold text-white text-sm">{scenario.name}</span>
                              {scenario.isBaseline && (
                                <Badge variant="outline" className="text-xs">
                                  Baseline
                                </Badge>
                              )}
                            </div>
                            {!scenario.isBaseline && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setScenarios((prev) => prev.filter((s) => s.id !== scenario.id))
                                }}
                                className="h-6 w-6 p-0 text-slate-400 hover:text-red-400"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">{scenario.description}</div>
                          {scenario.results && (
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <span className="text-emerald-400">
                                TCO: ${(scenario.results.totalCost / 1000).toFixed(0)}K
                              </span>
                              <span className="text-blue-400">ROI: {scenario.results.roi.toFixed(1)}%</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Sensitivity Analysis */}
        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sensitivity Results */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Sensitivity Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                {sensitivityResults.length > 0 ? (
                  <div className="space-y-4">
                    {sensitivityResults.map((result, index) => (
                      <motion.div
                        key={result.parameter}
                        className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">{result.parameter}</span>
                          <Badge
                            variant={result.impact > 20 ? "destructive" : result.impact > 10 ? "default" : "secondary"}
                          >
                            {result.impact.toFixed(1)}% impact
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Correlation:</span>
                            <div className="font-semibold text-white">{result.correlation.toFixed(2)}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Elasticity:</span>
                            <div className="font-semibold text-white">{result.elasticity.toFixed(2)}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Risk:</span>
                            <div className="font-semibold text-white">{result.riskContribution.toFixed(1)}%</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Run sensitivity analysis to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Monte Carlo Results */}
            <Card className="bg-slate-900/50 border-slate-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Monte Carlo Simulation</CardTitle>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm text-slate-400">Runs:</Label>
                    <Input
                      type="number"
                      value={monteCarloRuns}
                      onChange={(e) => setMonteCarloRuns(Number(e.target.value))}
                      className="w-20 bg-slate-800 border-slate-600"
                      min={1000}
                      max={100000}
                      step={1000}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {monteCarloResults ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-slate-800/50">
                        <div className="text-sm text-slate-400">Mean TCO</div>
                        <div className="text-lg font-bold text-white">
                          ${(monteCarloResults.mean / 1000).toFixed(0)}K
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-800/50">
                        <div className="text-sm text-slate-400">Std Deviation</div>
                        <div className="text-lg font-bold text-white">
                          ${(monteCarloResults.standardDeviation / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Confidence Intervals</h4>
                      {Object.entries(monteCarloResults.confidenceIntervals).map(([level, [low, high]]) => (
                        <div key={level} className="flex justify-between text-sm">
                          <span className="text-slate-400">{level}:</span>
                          <span className="text-white">
                            ${(low / 1000).toFixed(0)}K - ${(high / 1000).toFixed(0)}K
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">Risk Metrics</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Value at Risk (95%):</span>
                        <span className="text-red-400 font-semibold">
                          ${(monteCarloResults.riskMetrics.valueAtRisk / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Probability of Loss:</span>
                        <span className="text-yellow-400 font-semibold">
                          {(monteCarloResults.riskMetrics.probabilityOfLoss * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shuffle className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">Run Monte Carlo simulation to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Scenario Comparison */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Scenario Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              {scenarios.length > 1 ? (
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={scenarios
                        .filter((s) => s.results)
                        .map((scenario) => ({
                          name: scenario.name,
                          totalCost: scenario.results!.totalCost,
                          roi: scenario.results!.roi,
                          payback: scenario.results!.paybackPeriod,
                          risk: scenario.results!.riskScore,
                        }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="totalCost" fill="#10b981" name="Total Cost" />
                      <Bar dataKey="roi" fill="#3b82f6" name="ROI %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Create multiple scenarios to compare them</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WhatIfScenarioBuilder
