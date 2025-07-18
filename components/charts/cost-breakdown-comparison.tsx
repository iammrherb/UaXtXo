"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { DollarSign, TrendingDown, Zap, CheckCircle2 } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface CostBreakdownComparisonProps {
  results: CalculationResult[]
  config?: CalculationConfiguration
}

export default function CostBreakdownComparison({ results, config }: CostBreakdownComparisonProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorResults = results.filter((r) => r.vendorId !== "portnox")

  const costAnalysis = useMemo(() => {
    if (!portnoxResult || competitorResults.length === 0) return null

    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - portnoxResult.totalCost
    const percentSavings = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0

    return {
      portnoxCost: portnoxResult.totalCost,
      avgCompetitorCost,
      totalSavings,
      percentSavings,
      perDeviceSavings: totalSavings / (config?.devices || 1000),
    }
  }, [portnoxResult, competitorResults, config?.devices])

  const costBreakdownData = useMemo(() => {
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

  const savingsBreakdownData = useMemo(() => {
    if (!portnoxResult || !costAnalysis) return []

    const avgCompetitor = competitorResults.reduce(
      (acc, r) => ({
        licensing: acc.licensing + r.breakdown.licensing / competitorResults.length,
        hardware: acc.hardware + r.breakdown.hardware / competitorResults.length,
        implementation: acc.implementation + r.breakdown.implementation / competitorResults.length,
        support: acc.support + r.breakdown.support / competitorResults.length,
        training: acc.training + r.breakdown.training / competitorResults.length,
        maintenance: acc.maintenance + r.breakdown.maintenance / competitorResults.length,
        operational: acc.operational + r.breakdown.operational / competitorResults.length,
      }),
      { licensing: 0, hardware: 0, implementation: 0, support: 0, training: 0, maintenance: 0, operational: 0 },
    )

    return [
      {
        category: "Software Licensing",
        savings: avgCompetitor.licensing - portnoxResult.breakdown.licensing,
        color: "#3b82f6",
      },
      {
        category: "Hardware/Infrastructure",
        savings: avgCompetitor.hardware - portnoxResult.breakdown.hardware,
        color: "#10b981",
      },
      {
        category: "Implementation Services",
        savings: avgCompetitor.implementation - portnoxResult.breakdown.implementation,
        color: "#f59e0b",
      },
      {
        category: "Support & Maintenance",
        savings:
          avgCompetitor.support +
          avgCompetitor.maintenance -
          (portnoxResult.breakdown.support + portnoxResult.breakdown.maintenance),
        color: "#ef4444",
      },
      {
        category: "Training & Operational",
        savings:
          avgCompetitor.training +
          avgCompetitor.operational -
          (portnoxResult.breakdown.training + portnoxResult.breakdown.operational),
        color: "#8b5cf6",
      },
    ].filter((item) => item.savings > 0)
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
        <p className="text-muted-foreground">No cost comparison data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cost Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{formatCurrency(costAnalysis.totalSavings)}</div>
            <p className="text-xs text-green-600 mt-1">{costAnalysis.percentSavings.toFixed(0)}% cost reduction</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-blue-600" />
              Per Device Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{formatCurrency(costAnalysis.perDeviceSavings)}</div>
            <p className="text-xs text-blue-600 mt-1">per device over {config?.years || 3} years</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-600" />
              Portnox TCO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{formatCurrency(costAnalysis.portnoxCost)}</div>
            <p className="text-xs text-purple-600 mt-1">all-inclusive pricing</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-orange-600" />
              Market Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{formatCurrency(costAnalysis.avgCompetitorCost)}</div>
            <p className="text-xs text-orange-600 mt-1">competitor average</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Cost Breakdown Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Cost Breakdown Comparison</CardTitle>
          <CardDescription>{config?.years || 3}-year total cost breakdown by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={costBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendor" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
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

      {/* Savings Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Savings Breakdown</CardTitle>
            <CardDescription>Where Portnox delivers cost savings</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={savingsBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, savings }) => `${category}: ${formatCurrency(savings)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="savings"
                >
                  {savingsBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Efficiency Metrics</CardTitle>
            <CardDescription>Per-device cost comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results
                .sort((a, b) => a.totalCost / (config?.devices || 1000) - b.totalCost / (config?.devices || 1000))
                .map((result) => {
                  const perDeviceCost = result.totalCost / (config?.devices || 1000)
                  const maxCost = Math.max(...results.map((r) => r.totalCost / (config?.devices || 1000)))
                  const efficiency = ((maxCost - perDeviceCost) / maxCost) * 100

                  return (
                    <div key={result.vendorId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{result.vendorName}</span>
                          {result.vendorId === "portnox" && (
                            <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                              Best Value
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">{formatCurrency(perDeviceCost)}</div>
                          <div className="text-xs text-muted-foreground">per device</div>
                        </div>
                      </div>
                      <Progress
                        value={efficiency}
                        className={`h-2 ${result.vendorId === "portnox" ? "bg-green-100" : ""}`}
                      />
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hidden Cost Elimination */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="text-green-800">Hidden Cost Elimination</CardTitle>
          <CardDescription className="text-green-700">
            Costs eliminated with Portnox cloud-native architecture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">$0</div>
              <div className="text-sm text-green-600 mt-1">Hardware Costs</div>
              <div className="text-xs text-muted-foreground mt-1">No appliances needed</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">$0</div>
              <div className="text-sm text-green-600 mt-1">Maintenance</div>
              <div className="text-xs text-muted-foreground mt-1">Cloud-managed</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">$0</div>
              <div className="text-sm text-green-600 mt-1">Training Costs</div>
              <div className="text-xs text-muted-foreground mt-1">Intuitive interface</div>
            </div>
            <div className="text-center p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">$0</div>
              <div className="text-sm text-green-600 mt-1">Downtime</div>
              <div className="text-xs text-muted-foreground mt-1">99.99% uptime SLA</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
