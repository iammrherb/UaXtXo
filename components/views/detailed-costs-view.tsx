"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Calculator, TrendingDown, DollarSign, PieChartIcon } from "lucide-react"
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
} from "recharts"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import CostBreakdownComparison from "@/components/charts/cost-breakdown-comparison"

interface DetailedCostsViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function DetailedCostsView({ results, config }: DetailedCostsViewProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  const costAnalysis = React.useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0

    return {
      portnoxCost: portnoxResult.totalCost,
      avgCompetitorCost,
      totalSavings,
      percentSavings,
      roi: portnoxResult.totalCost > 0 ? (totalSavings / portnoxResult.totalCost) * 100 : 0,
      paybackMonths: totalSavings > 0 ? portnoxResult.totalCost / (totalSavings / (config.years * 12)) : 0,
    }
  }, [portnoxResult, competitorResults, config.years])

  const yearlyProjections = React.useMemo(() => {
    const projections = []
    for (let year = 1; year <= config.years; year++) {
      const yearData: any = { year: `Year ${year}` }

      results.forEach((result) => {
        // Calculate yearly cost (total cost divided by years)
        yearData[result.vendorId] = result.totalCost / config.years
      })

      projections.push(yearData)
    }
    return projections
  }, [results, config.years])

  const costBreakdownData = React.useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      licensing: result.breakdown.licensing,
      hardware: result.breakdown.hardware,
      implementation: result.breakdown.implementation,
      support: result.breakdown.support,
      training: result.breakdown.training,
      maintenance: result.breakdown.maintenance,
      operational: result.breakdown.operational,
      total: result.totalCost,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  const hiddenCostAnalysis = React.useMemo(() => {
    const portnoxHiddenCosts = 0 // Portnox has no hidden costs
    const competitorHiddenCosts =
      competitorResults.reduce((sum, r) => {
        // Calculate hidden costs: training, downtime, complexity, etc.
        const trainingCost = r.breakdown.training
        const maintenanceCost = r.breakdown.maintenance
        const operationalOverhead = r.breakdown.operational * 0.3 // 30% overhead
        return sum + trainingCost + maintenanceCost + operationalOverhead
      }, 0) / competitorResults.length

    return [
      { category: "Training & Certification", portnox: 0, competitor: competitorHiddenCosts * 0.3 },
      { category: "Downtime & Maintenance", portnox: 0, competitor: competitorHiddenCosts * 0.4 },
      { category: "Complexity Overhead", portnox: 0, competitor: competitorHiddenCosts * 0.3 },
    ]
  }, [portnoxResult, competitorResults])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (!costAnalysis) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No cost analysis data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cost Analysis Header */}
      <Alert className="border-blue-200 bg-blue-50">
        <Calculator className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="space-y-2">
            <div className="font-semibold">
              Comprehensive {config.years}-Year Cost Analysis for {config.devices.toLocaleString()} Devices
            </div>
            <div className="text-sm">
              Portnox CLEAR delivers {costAnalysis.percentSavings.toFixed(0)}% cost savings (
              {formatCurrency(costAnalysis.totalSavings)}) with {costAnalysis.roi.toFixed(0)}% ROI and{" "}
              {costAnalysis.paybackMonths.toFixed(1)}-month payback period.
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Cost Analysis Tabs */}
      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakdown" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            Cost Breakdown
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Vendor Comparison
          </TabsTrigger>
          <TabsTrigger value="projections" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Yearly Projections
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Cost Efficiency
          </TabsTrigger>
        </TabsList>

        {/* Cost Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-6">
          <CostBreakdownComparison results={results} config={config} />
        </TabsContent>

        {/* Vendor Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Cost Comparison</CardTitle>
              <CardDescription>Total cost of ownership across all selected vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={costBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="licensing" stackId="a" fill="#3b82f6" name="Licensing" />
                  <Bar dataKey="hardware" stackId="a" fill="#10b981" name="Hardware" />
                  <Bar dataKey="implementation" stackId="a" fill="#f59e0b" name="Implementation" />
                  <Bar dataKey="support" stackId="a" fill="#ef4444" name="Support" />
                  <Bar dataKey="training" stackId="a" fill="#8b5cf6" name="Training" />
                  <Bar dataKey="maintenance" stackId="a" fill="#f97316" name="Maintenance" />
                  <Bar dataKey="operational" stackId="a" fill="#06b6d4" name="Operational" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Summary by Vendor</CardTitle>
                <CardDescription>Ranked by total cost of ownership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results
                    .sort((a, b) => a.totalCost - b.totalCost)
                    .map((result, index) => (
                      <div key={result.vendorId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              #{index + 1}
                            </Badge>
                            <span className="font-medium">{result.vendorName}</span>
                            {result.vendorId === "portnox" && (
                              <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                                Best Value
                              </Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{formatCurrency(result.totalCost)}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatCurrency(result.totalCost / config.devices)} per device
                            </div>
                          </div>
                        </div>
                        <Progress
                          value={100 - ((result.totalCost - results[0].totalCost) / results[0].totalCost) * 50}
                          className="h-2"
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hidden Cost Analysis</CardTitle>
                <CardDescription>Costs eliminated with Portnox cloud-native approach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hiddenCostAnalysis.map((cost, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{cost.category}</span>
                        <div className="text-right">
                          <div className="text-sm">
                            <span className="text-green-600 font-medium">$0</span>
                            <span className="text-muted-foreground"> vs </span>
                            <span className="text-red-600 font-medium">{formatCurrency(cost.competitor)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-green-600 mb-1">Portnox</div>
                          <div className="h-2 bg-green-100 rounded-full">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "0%" }} />
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-red-600 mb-1">Competitors</div>
                          <div className="h-2 bg-red-100 rounded-full">
                            <div className="h-2 bg-red-500 rounded-full" style={{ width: "100%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Yearly Projections Tab */}
        <TabsContent value="projections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Year Cost Projections</CardTitle>
              <CardDescription>Annual cost breakdown over {config.years} years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyProjections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  {results.map((result) => (
                    <Line
                      key={result.vendorId}
                      type="monotone"
                      dataKey={result.vendorId}
                      stroke={result.vendorId === "portnox" ? "#10b981" : "#3b82f6"}
                      strokeWidth={result.vendorId === "portnox" ? 3 : 2}
                      name={result.vendorName}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cumulative Savings Timeline</CardTitle>
                <CardDescription>How savings accumulate over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: config.years }, (_, i) => i + 1).map((year) => {
                    const cumulativeSavings = costAnalysis.totalSavings * (year / config.years)
                    return (
                      <div key={year} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <div className="font-medium">Year {year}</div>
                          <div className="text-sm text-muted-foreground">Cumulative savings</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-700">{formatCurrency(cumulativeSavings)}</div>
                          <div className="text-xs text-muted-foreground">
                            {((cumulativeSavings / costAnalysis.avgCompetitorCost) * 100).toFixed(0)}% saved
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Progression</CardTitle>
                <CardDescription>Return on investment over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: config.years }, (_, i) => i + 1).map((year) => {
                    const yearlyROI =
                      ((costAnalysis.totalSavings * (year / config.years)) / costAnalysis.portnoxCost) * 100
                    return (
                      <div key={year} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Year {year}</span>
                          <span className="text-lg font-bold text-blue-700">{yearlyROI.toFixed(0)}%</span>
                        </div>
                        <Progress value={Math.min(yearlyROI, 500) / 5} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cost Efficiency Tab */}
        <TabsContent value="efficiency" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Cost Per Device</CardTitle>
                <CardDescription className="text-green-700">Over {config.years} years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-700">
                  {formatCurrency(costAnalysis.portnoxCost / config.devices)}
                </div>
                <p className="text-sm text-green-600 mt-1">Portnox CLEAR</p>
                <div className="text-xs text-muted-foreground mt-2">
                  vs {formatCurrency(costAnalysis.avgCompetitorCost / config.devices)} average
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">Cost Per User</CardTitle>
                <CardDescription className="text-blue-700">Over {config.years} years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-700">
                  {formatCurrency(costAnalysis.portnoxCost / config.users)}
                </div>
                <p className="text-sm text-blue-600 mt-1">Portnox CLEAR</p>
                <div className="text-xs text-muted-foreground mt-2">
                  vs {formatCurrency(costAnalysis.avgCompetitorCost / config.users)} average
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="text-purple-800">Monthly Cost</CardTitle>
                <CardDescription className="text-purple-700">Average per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-700">
                  {formatCurrency(costAnalysis.portnoxCost / (config.years * 12))}
                </div>
                <p className="text-sm text-purple-600 mt-1">Portnox CLEAR</p>
                <div className="text-xs text-muted-foreground mt-2">
                  vs {formatCurrency(costAnalysis.avgCompetitorCost / (config.years * 12))} average
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cost Efficiency Analysis</CardTitle>
              <CardDescription>Detailed efficiency metrics across all vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results
                  .sort((a, b) => a.totalCost / config.devices - b.totalCost / config.devices)
                  .map((result) => {
                    const perDeviceCost = result.totalCost / config.devices
                    const perUserCost = result.totalCost / config.users
                    const monthlyTotal = result.totalCost / (config.years * 12)

                    return (
                      <div key={result.vendorId} className="p-4 rounded-lg border space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.vendorName}</span>
                            {result.vendorId === "portnox" && (
                              <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                                Most Efficient
                              </Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{formatCurrency(result.totalCost)}</div>
                            <div className="text-xs text-muted-foreground">Total {config.years}-year cost</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <div className="font-medium">{formatCurrency(perDeviceCost)}</div>
                            <div className="text-muted-foreground">Per Device</div>
                          </div>
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <div className="font-medium">{formatCurrency(perUserCost)}</div>
                            <div className="text-muted-foreground">Per User</div>
                          </div>
                          <div className="text-center p-2 bg-muted/50 rounded">
                            <div className="font-medium">{formatCurrency(monthlyTotal)}</div>
                            <div className="text-muted-foreground">Monthly</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cost Analysis Help */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Understanding the Cost Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 text-sm text-blue-700">
            <div className="space-y-2">
              <h4 className="font-semibold">Cost Categories Explained:</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <strong>Licensing:</strong> Software licenses and subscriptions
                </li>
                <li>
                  <strong>Hardware:</strong> Appliances, servers, and infrastructure
                </li>
                <li>
                  <strong>Implementation:</strong> Professional services and deployment
                </li>
                <li>
                  <strong>Support:</strong> Vendor support and maintenance contracts
                </li>
                <li>
                  <strong>Training:</strong> Staff training and certification costs
                </li>
                <li>
                  <strong>Operational:</strong> Ongoing management and administration
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Why Portnox Costs Less:</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <strong>No Hardware:</strong> Cloud-native eliminates appliance costs
                </li>
                <li>
                  <strong>No Training:</strong> Intuitive interface requires minimal training
                </li>
                <li>
                  <strong>No Maintenance:</strong> Automatic updates and self-healing
                </li>
                <li>
                  <strong>No Complexity:</strong> Simple deployment and management
                </li>
                <li>
                  <strong>All-Inclusive:</strong> Single license covers all features
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
