"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { CheckCircle } from "lucide-react"

import { useTcoCalculator } from "@/hooks/useTcoCalculator"
import { useVendorData } from "@/hooks/useVendorData"
import type { VendorId } from "@/lib/vendors/comprehensive-vendor-data"
import type { OrgSizeId, IndustryId } from "@/types/common"

// What-If Scenario Builder Component
const WhatIfScenarioBuilder: React.FC = () => {
  const [scenarios, setScenarios] = useState([
    {
      id: "current",
      name: "Current State",
      orgSize: "enterprise" as OrgSizeId,
      industry: "financial_services" as IndustryId,
      projectionYears: 5,
      selectedVendors: ["portnox", "cisco_ise", "aruba_clearpass"] as VendorId[],
      assumptions: {
        growthRate: 15,
        inflationRate: 3,
        securityIncidentCost: 5850000,
        complianceRequirement: "high",
      },
    },
    {
      id: "optimistic",
      name: "Optimistic Growth",
      orgSize: "global_enterprise" as OrgSizeId,
      industry: "financial_services" as IndustryId,
      projectionYears: 5,
      selectedVendors: ["portnox", "cisco_ise", "aruba_clearpass"] as VendorId[],
      assumptions: {
        growthRate: 25,
        inflationRate: 2,
        securityIncidentCost: 5850000,
        complianceRequirement: "critical",
      },
    },
    {
      id: "conservative",
      name: "Conservative Growth",
      orgSize: "mid_market" as OrgSizeId,
      industry: "financial_services" as IndustryId,
      projectionYears: 3,
      selectedVendors: ["portnox", "cisco_ise", "aruba_clearpass"] as VendorId[],
      assumptions: {
        growthRate: 8,
        inflationRate: 4,
        securityIncidentCost: 4500000,
        complianceRequirement: "medium",
      },
    },
  ])

  const [activeScenario, setActiveScenario] = useState("current")
  const { calculateMultiVendorComparison } = useTcoCalculator()
  const { allVendors } = useVendorData()

  const scenarioResults = useMemo(() => {
    return scenarios.map((scenario) => {
      const results = calculateMultiVendorComparison(
        scenario.selectedVendors,
        scenario.orgSize,
        scenario.industry,
        scenario.projectionYears,
      )
      return {
        ...scenario,
        results,
      }
    })
  }, [scenarios, calculateMultiVendorComparison])

  const comparisonData = useMemo(() => {
    const data: any[] = []
    scenarioResults.forEach((scenario) => {
      scenario.results.forEach((result) => {
        data.push({
          scenario: scenario.name,
          vendor: result.vendorName,
          tco: result.totalTCO,
          roi: result.roiMetrics.internalRateOfReturn,
          payback: result.roiMetrics.paybackPeriodMonths,
          security: result.securityMetrics.zeroTrustMaturityScore,
        })
      })
    })
    return data
  }, [scenarioResults])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">What-If Scenario Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Compare different business scenarios and their impact on NAC investment decisions
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Scenario
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className={`cursor-pointer transition-all ${activeScenario === scenario.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => setActiveScenario(scenario.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{scenario.name}</CardTitle>
              <CardDescription>
                {scenario.orgSize.replace("_", " ")} • {scenario.projectionYears} years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Growth Rate:</span>
                  <span className="font-medium">{scenario.assumptions.growthRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vendors:</span>
                  <span className="font-medium">{scenario.selectedVendors.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Industry:</span>
                  <span className="font-medium capitalize">{scenario.industry.replace("_", " ")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scenario Comparison Results</CardTitle>
          <CardDescription>TCO and ROI comparison across different scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scenario" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => [typeof value === "number" ? value.toLocaleString() : value, name]}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="tco" fill="#8884d8" name="Total TCO ($)" />
                <Bar yAxisId="right" dataKey="roi" fill="#82ca9d" name="ROI (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk vs Return Analysis</CardTitle>
            <CardDescription>Security score vs ROI by scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="security" name="Security Score" />
                  <YAxis dataKey="roi" name="ROI %" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Vendors" dataKey="roi" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payback Period Comparison</CardTitle>
            <CardDescription>Time to recover investment by scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="payback" stroke="#8884d8" name="Payback (Months)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Sensitivity Analysis Component
const SensitivityAnalyzer: React.FC = () => {
  const [baseScenario, setBaseScenario] = useState({
    orgSize: "enterprise" as OrgSizeId,
    industry: "financial_services" as IndustryId,
    projectionYears: 5,
    vendor: "portnox" as VendorId,
  })

  const [sensitivityFactors, setSensitivityFactors] = useState({
    deviceGrowth: { min: -20, max: 50, current: 15 },
    securityIncidentCost: { min: -30, max: 100, current: 0 },
    complianceRequirements: { min: -25, max: 75, current: 0 },
    implementationComplexity: { min: -40, max: 200, current: 0 },
    operationalEfficiency: { min: -50, max: 100, current: 0 },
  })

  const { calculateSingleVendorTco } = useTcoCalculator()

  const sensitivityResults = useMemo(() => {
    const baseResult = calculateSingleVendorTco(
      baseScenario.vendor,
      baseScenario.orgSize,
      baseScenario.industry,
      baseScenario.projectionYears,
    )

    if (!baseResult) return []

    const results = Object.entries(sensitivityFactors).flatMap(([factor, range]) => {
      const variations = []
      for (let i = range.min; i <= range.max; i += (range.max - range.min) / 10) {
        // This is a simplified sensitivity calculation
        // In a real implementation, you'd adjust the actual calculation parameters
        const adjustmentFactor = 1 + i / 100
        const adjustedTCO = baseResult.totalTCO * adjustmentFactor
        const adjustedROI = baseResult.roiMetrics.internalRateOfReturn / adjustmentFactor

        variations.push({
          factor,
          variation: i,
          tco: adjustedTCO,
          roi: adjustedROI,
          impact: ((adjustedTCO - baseResult.totalTCO) / baseResult.totalTCO) * 100,
        })
      }
      return variations
    })

    return results
  }, [baseScenario, sensitivityFactors, calculateSingleVendorTco])

  const tornadoData = useMemo(() => {
    const factorImpacts = Object.keys(sensitivityFactors)
      .map((factor) => {
        const factorResults = sensitivityResults.filter((r) => r.factor === factor)
        const maxImpact = Math.max(...factorResults.map((r) => Math.abs(r.impact)))
        const minTCO = Math.min(...factorResults.map((r) => r.tco))
        const maxTCO = Math.max(...factorResults.map((r) => r.tco))

        return {
          factor: factor.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
          impact: maxImpact,
          range: maxTCO - minTCO,
          sensitivity: maxImpact > 20 ? "High" : maxImpact > 10 ? "Medium" : "Low",
        }
      })
      .sort((a, b) => b.impact - a.impact)

    return factorImpacts
  }, [sensitivityResults, sensitivityFactors])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Sensitivity Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Understand how changes in key variables affect your NAC investment decision
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Base Scenario Configuration</CardTitle>
            <CardDescription>Set your baseline assumptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Organization Size</Label>
              <Select
                value={baseScenario.orgSize}
                onValueChange={(value: OrgSizeId) => setBaseScenario((prev) => ({ ...prev, orgSize: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small_business">Small Business</SelectItem>
                  <SelectItem value="mid_market">Mid Market</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="global_enterprise">Global Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              <Select
                value={baseScenario.industry}
                onValueChange={(value: IndustryId) => setBaseScenario((prev) => ({ ...prev, industry: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="financial_services">Financial Services</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="energy_utilities">Energy & Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Projection Years: {baseScenario.projectionYears}</Label>
              <Slider
                value={[baseScenario.projectionYears]}
                onValueChange={([value]) => setBaseScenario((prev) => ({ ...prev, projectionYears: value }))}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sensitivity Factors</CardTitle>
            <CardDescription>Adjust ranges for sensitivity testing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(sensitivityFactors).map(([factor, range]) => (
              <div key={factor} className="space-y-2">
                <Label className="capitalize">
                  {factor.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </Label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground w-8">{range.min}%</span>
                  <Slider
                    value={[range.current]}
                    onValueChange={([value]) =>
                      setSensitivityFactors((prev) => ({
                        ...prev,
                        [factor]: { ...prev[factor], current: value },
                      }))
                    }
                    min={range.min}
                    max={range.max}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-8">{range.max}%</span>
                </div>
                <div className="text-xs text-center text-muted-foreground">Current: {range.current}%</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tornado Diagram - Factor Impact Analysis</CardTitle>
          <CardDescription>Factors ranked by their impact on total cost of ownership</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tornadoData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="factor" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="impact" fill="#8884d8" name="Impact (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {tornadoData.slice(0, 3).map((item, index) => (
          <Card key={item.factor}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{item.factor}</CardTitle>
                <Badge
                  variant={
                    item.sensitivity === "High"
                      ? "destructive"
                      : item.sensitivity === "Medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {item.sensitivity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Max Impact:</span>
                  <span className="font-medium">{item.impact.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>TCO Range:</span>
                  <span className="font-medium">${(item.range / 1000).toFixed(0)}K</span>
                </div>
                <Progress value={item.impact} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Monte Carlo Simulation Component
const MonteCarloSimulator: React.FC = () => {
  const [simulationConfig, setSimulationConfig] = useState({
    iterations: 10000,
    orgSize: "enterprise" as OrgSizeId,
    industry: "financial_services" as IndustryId,
    projectionYears: 5,
    vendors: ["portnox", "cisco_ise", "aruba_clearpass"] as VendorId[],
    uncertaintyFactors: {
      deviceGrowth: { mean: 15, stdDev: 8 },
      securityIncidents: { mean: 0.28, stdDev: 0.15 }, // Annual probability
      implementationDelay: { mean: 1.0, stdDev: 0.3 }, // Multiplier
      costInflation: { mean: 3, stdDev: 2 },
      efficiencyGains: { mean: 1.0, stdDev: 0.2 },
    },
  })

  const [isRunning, setIsRunning] = useState(false)
  const [simulationResults, setSimulationResults] = useState<any[]>([])

  const { calculateMultiVendorComparison } = useTcoCalculator()

  const runSimulation = async () => {
    setIsRunning(true)
    const results: any[] = []

    // Simulate Monte Carlo iterations
    for (let i = 0; i < simulationConfig.iterations; i++) {
      // Generate random variables based on distributions
      const deviceGrowthFactor =
        generateNormalRandom(
          simulationConfig.uncertaintyFactors.deviceGrowth.mean,
          simulationConfig.uncertaintyFactors.deviceGrowth.stdDev,
        ) /
          100 +
        1

      const securityIncidentProb = Math.max(
        0,
        Math.min(
          1,
          generateNormalRandom(
            simulationConfig.uncertaintyFactors.securityIncidents.mean,
            simulationConfig.uncertaintyFactors.securityIncidents.stdDev,
          ),
        ),
      )

      const implementationDelayFactor = Math.max(
        0.5,
        generateNormalRandom(
          simulationConfig.uncertaintyFactors.implementationDelay.mean,
          simulationConfig.uncertaintyFactors.implementationDelay.stdDev,
        ),
      )

      const inflationFactor =
        Math.max(
          0,
          generateNormalRandom(
            simulationConfig.uncertaintyFactors.costInflation.mean,
            simulationConfig.uncertaintyFactors.costInflation.stdDev,
          ),
        ) /
          100 +
        1

      // Calculate TCO for each vendor with random factors
      const vendorResults = calculateMultiVendorComparison(
        simulationConfig.vendors,
        simulationConfig.orgSize,
        simulationConfig.industry,
        simulationConfig.projectionYears,
      )

      vendorResults.forEach((result) => {
        // Apply random factors to the base calculation
        const adjustedTCO = result.totalTCO * deviceGrowthFactor * inflationFactor * implementationDelayFactor
        const securityLoss = securityIncidentProb * 5000000 * simulationConfig.projectionYears // Expected security loss
        const totalCost = adjustedTCO + securityLoss

        results.push({
          iteration: i,
          vendor: result.vendorName,
          vendorId: result.vendorId,
          baseTCO: result.totalTCO,
          adjustedTCO,
          securityLoss,
          totalCost,
          roi: result.roiMetrics.internalRateOfReturn,
          payback: result.roiMetrics.paybackPeriodMonths,
          factors: {
            deviceGrowthFactor,
            securityIncidentProb,
            implementationDelayFactor,
            inflationFactor,
          },
        })
      })

      // Update progress periodically
      if (i % 1000 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1))
      }
    }

    setSimulationResults(results)
    setIsRunning(false)
  }

  // Helper function to generate normal random numbers
  const generateNormalRandom = (mean: number, stdDev: number): number => {
    let u = 0,
      v = 0
    while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    return z * stdDev + mean
  }

  const simulationSummary = useMemo(() => {
    if (simulationResults.length === 0) return null

    const vendorSummaries = simulationConfig.vendors.map((vendorId) => {
      const vendorResults = simulationResults.filter((r) => r.vendorId === vendorId)
      const totalCosts = vendorResults.map((r) => r.totalCost)

      totalCosts.sort((a, b) => a - b)

      const mean = totalCosts.reduce((sum, cost) => sum + cost, 0) / totalCosts.length
      const median = totalCosts[Math.floor(totalCosts.length / 2)]
      const p5 = totalCosts[Math.floor(totalCosts.length * 0.05)]
      const p95 = totalCosts[Math.floor(totalCosts.length * 0.95)]
      const stdDev = Math.sqrt(totalCosts.reduce((sum, cost) => sum + Math.pow(cost - mean, 2), 0) / totalCosts.length)

      return {
        vendorId,
        vendor: vendorResults[0]?.vendor || vendorId,
        mean,
        median,
        stdDev,
        p5,
        p95,
        min: Math.min(...totalCosts),
        max: Math.max(...totalCosts),
        confidenceInterval: p95 - p5,
      }
    })

    return vendorSummaries.sort((a, b) => a.mean - b.mean)
  }, [simulationResults, simulationConfig.vendors])

  const distributionData = useMemo(() => {
    if (!simulationSummary) return []

    const data: any[] = []
    simulationSummary.forEach((summary) => {
      // Create histogram data
      const vendorResults = simulationResults.filter((r) => r.vendorId === summary.vendorId)
      const costs = vendorResults.map((r) => r.totalCost)

      // Create bins for histogram
      const binCount = 50
      const min = Math.min(...costs)
      const max = Math.max(...costs)
      const binSize = (max - min) / binCount

      const bins = Array(binCount).fill(0)
      costs.forEach((cost) => {
        const binIndex = Math.min(Math.floor((cost - min) / binSize), binCount - 1)
        bins[binIndex]++
      })

      bins.forEach((count, index) => {
        data.push({
          vendor: summary.vendor,
          binStart: min + index * binSize,
          binEnd: min + (index + 1) * binSize,
          count,
          probability: count / costs.length,
        })
      })
    })

    return data
  }, [simulationResults, simulationSummary])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Monte Carlo Simulation</h3>
          <p className="text-sm text-muted-foreground">
            Run probabilistic analysis to understand TCO uncertainty and risk
          </p>
        </div>
        <Button onClick={runSimulation} disabled={isRunning} className="min-w-32">
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run Simulation
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Simulation Configuration</CardTitle>
            <CardDescription>Configure uncertainty parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Iterations: {simulationConfig.iterations.toLocaleString()}</Label>
              <Slider
                value={[simulationConfig.iterations]}
                onValueChange={([value]) => setSimulationConfig((prev) => ({ ...prev, iterations: value }))}
                min={1000}
                max={50000}
                step={1000}
                className="w-full"
              />
            </div>

            {Object.entries(simulationConfig.uncertaintyFactors).map(([factor, params]) => (
              <div key={factor} className="space-y-2">
                <Label className="capitalize">
                  {factor.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Mean</Label>
                    <input
                      type="number"
                      value={params.mean}
                      onChange={(e) =>
                        setSimulationConfig((prev) => ({
                          ...prev,
                          uncertaintyFactors: {
                            ...prev.uncertaintyFactors,
                            [factor]: { ...params, mean: Number.parseFloat(e.target.value) || 0 },
                          },
                        }))
                      }
                      className="w-full px-2 py-1 text-xs border rounded"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Std Dev</Label>
                    <input
                      type="number"
                      value={params.stdDev}
                      onChange={(e) =>
                        setSimulationConfig((prev) => ({
                          ...prev,
                          uncertaintyFactors: {
                            ...prev.uncertaintyFactors,
                            [factor]: { ...params, stdDev: Number.parseFloat(e.target.value) || 0 },
                          },
                        }))
                      }
                      className="w-full px-2 py-1 text-xs border rounded"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Simulation Progress</CardTitle>
            <CardDescription>
              {isRunning
                ? "Running simulation..."
                : simulationResults.length > 0
                  ? `Completed ${simulationConfig.iterations.toLocaleString()} iterations`
                  : "Ready to run simulation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isRunning && (
              <div className="space-y-4">
                <Progress value={50} className="w-full" />
                <div className="text-sm text-muted-foreground text-center">Processing probabilistic scenarios...</div>
              </div>
            )}

            {simulationSummary && (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Simulation completed successfully with {simulationConfig.iterations.toLocaleString()} iterations
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h4 className="font-medium">Quick Results</h4>
                  {simulationSummary.slice(0, 3).map((summary, index) => (
                    <div key={summary.vendorId} className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <Badge variant={index === 0 ? "default" : "secondary"} className="mr-2">
                          #{index + 1}
                        </Badge>
                        {summary.vendor}
                      </span>
                      <span className="font-medium">
                        ${(summary.mean / 1000000).toFixed(1)}M ± ${(summary.stdDev / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {simulationSummary && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Statistical Summary</CardTitle>
              <CardDescription>Probabilistic TCO analysis results across all scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Vendor</th>
                      <th className="text-right p-2">Mean TCO</th>
                      <th className="text-right p-2">Median TCO</th>
                      <th className="text-right p-2">Std Dev</th>
                      <th className="text-right p-2">5th Percentile</th>
                      <th className="text-right p-2">95th Percentile</th>
                      <th className="text-right p-2">Risk Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulationSummary.map((summary, index) => (
                      <tr key={summary.vendorId} className="border-b">
                        <td className="p-2">
                          <div className="flex items-center">
                            <Badge variant={index === 0 ? "default" : "secondary"} className="mr-2">
                              #{index + 1}
                            </Badge>
                            {summary.vendor}
                          </div>
                        </td>
                        <td className="text-right p-2 font-medium">${(summary.mean / 1000000).toFixed(2)}M</td>
                        <td className="text-right p-2">${(summary.median / 1000000).toFixed(2)}M</td>
                        <td className="text-right p-2">${(summary.stdDev / 1000000).toFixed(2)}M</td>
                        <td className="text-right p-2 text-green-600">${(summary.p5 / 1000000).toFixed(2)}M</td>
                        <td className="text-right p-2 text-red-600">${(summary.p95 / 1000000).toFixed(2)}M</td>
                        <td className="text-right p-2">${(summary.confidenceInterval / 1000000).toFixed(2)}M</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>TCO Distribution Analysis</CardTitle>
              <CardDescription>Probability distribution of total cost of ownership by vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={distributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="binStart" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) => `TCO: $${(value / 1000000).toFixed(2)}M`}
                      formatter={(value, name) => [`${(value * 100).toFixed(2)}%`, "Probability"]}
                    />
                    <Legend />
                    {simulationConfig.vendors.map((vendorId, index) => (
                      <Line
                        key={vendorId}
                        type="monotone"
                        dataKey="probability"
                        stroke={`hsl(${index * 120}, 70%, 50%)`}
                        name={simulationSummary.find((s) => s.vendorId === vendorId)?.vendor || vendorId}
                        connectNulls={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {simulationSummary.slice(0, 3).map((summary, index) => (
              <Card key={summary.vendorId}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{summary.vendor}</CardTitle>
                    <Badge variant={index === 0 ? "default" : "secondary"}>Rank #{index + 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Expected TCO:</span>
                      <span className="font-medium">${(summary.mean / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Best Case (5%):</span>
                      <span className="font-medium text-green-600">${(summary.p5 / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Worst Case (95%):</span>
                      <span className="font-medium text-red-600">${(summary.p95 / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Risk Range:</span>
                      <span className="font-medium">${(summary.confidenceInterval / 1000000).toFixed(2)}M</span>
                    </div>
                    <Progress
                      value={Math.max(0, 100 - (summary.confidenceInterval / summary.mean) * 100)}
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground text-center">
                      {summary.confidenceInterval / summary.mean < 0.2
                        ? "Low Risk"
                        : summary.confidenceInterval / summary.mean < 0.4
                          ? "Medium Risk"
                          : "High Risk"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Scenario Comparison Component
const ScenarioComparison: React.FC = () => {
  const [comparisonScenarios, setComparisonScenarios] = useState([
    {
      id: 'current_state',
      name: 'Current State Analysis',
      description: 'Existing infrastructure with traditional NAC',
      orgSize: 'enterprise' as OrgSizeId,
      industry: 'financial_services' as IndustryId,
      projectionYears: 5,
      vendors: ['cisco_ise', 'aruba_clearpass'] as VendorId[],
      assumptions: {
        hasExistingInfrastructure: true,
        migrationRequired: false,
        complianceGaps: 25,
        securityIncidents: 2
      }
    },
    {
      id: 'portnox_migration',
      name: 'Portnox Migration',
      description: 'Migration to Portnox cloud-native solution',
      orgSize: 'enterprise' as OrgSizeId,
      industry: 'financial_services' as IndustryId,
      projectionYears: 5,
      vendors: ['portnox'] as VendorId[],
      assumptions: {
        hasExistingInfrastructure: true,
        migrationRequired: true,
        complianceGaps: 5,
        securityIncidents: 0
      }
    },
    {
      id: 'hybrid_approach',
      name: 'Hybrid Approach',
      description: 'Gradual migration with parallel systems',
      orgSize: 'enterprise' as OrgSizeId,
      industry: 'financial_services' as IndustryId,
      projectionYears: 5,
      vendors: ['portnox', 'cisco_ise'] as VendorId[],
      assumptions: {
        hasExistingInfrastructure: true,
        migrationRequired: true,
        complianceGaps: 15,
        securityIncidents: 1
      }
    }
  ])

  const { calculateMultiVendorComparison } = useTcoCalculator()

  const scenarioAnalysis = useMemo(() => {
    return comparisonScenarios.map(scenario => {
      const results = calculateMultiVendorComparison(
        scenario.vendors,
        scenario.orgSize,
        scenario.industry,
        scenario.projectionYears
      )

      // Calculate scenario-specific adjustments
      const totalTCO = results.reduce((sum, result) => sum + result.totalTCO, 0)
      const avgROI = results.reduce((sum, result) => sum + result.roiMetrics.internalRateOfReturn, 0) / results.length
      const avgPayback = results.reduce((sum, result) => sum + result.roiMetrics.paybackPeriodMonths, 0) / results.length
      const avgSecurity = results.reduce((sum, result) => sum + result.securityMetrics.zeroTrustMaturityScore, 0) / results.length

      // Apply scenario-specific costs
      const migrationCost = scenario.assumptions.migrationRequired ? 150000 : 0
      const complianceCost = scenario.assumptions.complianceGaps * 5000 * scenario.projectionYears
      const securityIncidentCost = scenario.assumptions.securityIncidents * 2500000

      const adjustedTCO = totalTCO + migrationCost + complianceCost + securityIncidentCost

      return {
        ...scenario,
        results,
        metrics: {
          totalTCO: adjustedTCO,
          avgROI,
          avgPayback,
          avgSecurity,
          migrationCost,
          complianceCost,
          securityIncidentCost
        }
      }
    })
  }, [comparisonScenarios, calculateMultiVendorComparison])

  const comparisonData = useMemo(() => {
    return scenarioAnalysis.map(scenario => ({
      scenario: scenario.name,
      tco: scenario.metrics.totalTCO,
      roi: scenario.metrics.avgROI,
      payback: scenario.metrics.avgPayback,
      security: scenario.metrics.avgSecurity,
      migration: scenario.metrics.migrationCost,
      compliance: scenario.metrics.complianceCost,
      incidents: scenario.metrics.securityIncidentCost
    }))
  }, [scenarioAnalysis])

  const bestScenario = useMemo(() => {
    return scenarioAnalysis.reduce((best, current) => 
      current.metrics.totalTCO < best.metrics.totalTCO ? current : best
    )
  }, [scenarioAnalysis])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Scenario Comparison Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Compare different implementation approaches and their business impact
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {scenarioAnalysis.map((scenario, index) => (
          <Card 
            key={scenario.id}
            className={scenario.id === bestScenario.id ? 'ring-2 ring-green-500' : ''}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{scenario.name}</CardTitle>
                {scenario.id === bestScenario.id && (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Best
                  </Badge>
                )}
              </div>
              <CardDescription>{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total TCO:</span>
                  <span className="font-medium">
                    ${(scenario.metrics.totalTCO / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg ROI:</span>
                  <span className="font-medium">
                    {scenario.metrics.avgROI.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Payback:</span>
                  <span className="font-medium">
                    {scenario.metrics.avgPayback.toFixed(0)} months
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Security Score:</span>
                  <span className="font-medium">
                    {scenario.metrics.avgSecurity.toFixed(0)}/100
                  </span>
                </div>
                <Progress value={scenario.metrics.avgSecurity} className="h-2" />
                
                {(scenario.metrics.migrationCost > 0 || 
                  scenario.metrics.complianceCost > 0 || 
                  scenario.metrics.securityIncidentCost > 0) && (
                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground mb-2">Additional Costs:</div>
                    {scenario.metrics.migrationCost > 0 && (
                      <div className="flex justify-between text-xs">
                        <span>Migration:</span>
                        <span>${(scenario.metrics.migrationCost / 1000).toFixed(0)}K</span>
                      </div>
                    )}
                    {scenario.metrics.complianceCost > 0 && (
                      <div className="flex justify-between text-xs">
                        <span>Compliance Gaps:</span>
                        <span>${(scenario.metrics.complianceCost / 1000).toFixed(0)}K</span>
                      </div>
                    )}
                    {scenario.metrics.securityIncidentCost > 0 && (
                      <div className="flex justify-between text-xs">
                        <span>Security Incidents:</span>
                        <span>${(scenario.metrics.securityIncidentCost / 1000000).toFixed(1)}M</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>TCO Comparison by Scenario</CardTitle>
            <CardDescription>Total cost of ownership across different approaches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scenario" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip 
                    formatter={(value) => [`$${(value / 1000000).toFixed(2)}M`, 'TCO']}
                  />
                  <Bar dataKey="tco" fill="#8884d8" name="Total TCO" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk vs Return Analysis</CardTitle>
            <CardDescription>Security score vs ROI by scenario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="security" name="Security Score" />
                  <YAxis dataKey="roi" name="ROI %" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Scenarios" dataKey="roi" fill="#82ca9d" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of costs by category across scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scenario" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip 
                  formatter={(value) => [`$${(value / 1000000).toFixed(2)}M`, 'Cost']}
                />
                <Legend />
                <Bar dataKey="tco" stackId="a" fill="#8884d8" name="Base TCO" />
                <Bar dataKey="migration" stackId="a" fill="#82ca9d" name="Migration" />
                <Bar dataKey="compliance" stackId="a" fill="#ffc658" name="Compliance" />
                <Bar dataKey="incidents" stackId="\
