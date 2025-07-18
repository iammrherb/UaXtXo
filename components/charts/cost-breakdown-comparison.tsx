"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { DollarSign, TrendingDown, AlertCircle } from "lucide-react"
import type { CalculationResult } from "@/lib/enhanced-tco-calculator"

interface CostBreakdownComparisonProps {
  results: CalculationResult[]
  timeframe?: number
}

export function CostBreakdownComparison({ results, timeframe = 3 }: CostBreakdownComparisonProps) {
  const costBreakdownData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      vendorId: result.vendorId,
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

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitorAverage = useMemo(() => {
    const competitors = results.filter((r) => r.vendorId !== "portnox")
    if (competitors.length === 0) return null

    return competitors.reduce(
      (acc, r) => ({
        licensing: acc.licensing + r.breakdown.licensing / competitors.length,
        hardware: acc.hardware + r.breakdown.hardware / competitors.length,
        implementation: acc.implementation + r.breakdown.implementation / competitors.length,
        support: acc.support + r.breakdown.support / competitors.length,
        training: acc.training + r.breakdown.training / competitors.length,
        maintenance: acc.maintenance + r.breakdown.maintenance / competitors.length,
        operational: acc.operational + r.breakdown.operational / competitors.length,
        total: acc.total + r.totalCost / competitors.length,
      }),
      {
        licensing: 0,
        hardware: 0,
        implementation: 0,
        support: 0,
        training: 0,
        maintenance: 0,
        operational: 0,
        total: 0,
      },
    )
  }, [results])

  const savingsBreakdown = useMemo(() => {
    if (!portnoxResult || !competitorAverage) return []

    return [
      {
        category: "Hardware Elimination",
        savings: competitorAverage.hardware - portnoxResult.breakdown.hardware,
        percentage: competitorAverage.hardware > 0 ? 100 : 0,
        color: "#10b981",
      },
      {
        category: "Reduced Services",
        savings: competitorAverage.implementation - portnoxResult.breakdown.implementation,
        percentage:
          competitorAverage.implementation > 0
            ? ((competitorAverage.implementation - portnoxResult.breakdown.implementation) /
                competitorAverage.implementation) *
              100
            : 0,
        color: "#3b82f6",
      },
      {
        category: "Lower Support Costs",
        savings: competitorAverage.support - portnoxResult.breakdown.support,
        percentage:
          competitorAverage.support > 0
            ? ((competitorAverage.support - portnoxResult.breakdown.support) / competitorAverage.support) * 100
            : 0,
        color: "#8b5cf6",
      },
      {
        category: "Minimal Training",
        savings: competitorAverage.training - portnoxResult.breakdown.training,
        percentage:
          competitorAverage.training > 0
            ? ((competitorAverage.training - portnoxResult.breakdown.training) / competitorAverage.training) * 100
            : 0,
        color: "#f59e0b",
      },
      {
        category: "No Maintenance",
        savings: competitorAverage.maintenance - portnoxResult.breakdown.maintenance,
        percentage: competitorAverage.maintenance > 0 ? 100 : 0,
        color: "#ef4444",
      },
      {
        category: "Operational Efficiency",
        savings: competitorAverage.operational - portnoxResult.breakdown.operational,
        percentage:
          competitorAverage.operational > 0
            ? ((competitorAverage.operational - portnoxResult.breakdown.operational) / competitorAverage.operational) *
              100
            : 0,
        color: "#06b6d4",
      },
    ].filter((item) => item.savings > 0)
  }, [portnoxResult, competitorAverage])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const totalSavings = savingsBreakdown.reduce((sum, item) => sum + item.savings, 0)

  return (
    <div className="space-y-6">
      {/* Total Savings Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{formatCurrency(totalSavings)}</div>
            <p className="text-xs text-green-600 mt-1">Over {timeframe} years</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              Cost Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {competitorAverage && competitorAverage.total > 0
                ? (
                    ((competitorAverage.total - (portnoxResult?.totalCost || 0)) / competitorAverage.total) *
                    100
                  ).toFixed(0)
                : 0}
              %
            </div>
            <p className="text-xs text-blue-600 mt-1">vs market average</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              Hidden Cost Elimination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {formatCurrency(
                (competitorAverage?.hardware || 0) +
                  (competitorAverage?.maintenance || 0) +
                  (competitorAverage?.operational || 0) * 0.6,
              )}
            </div>
            <p className="text-xs text-purple-600 mt-1">Avoided hidden costs</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Cost Breakdown Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Cost Breakdown Comparison</CardTitle>
          <CardDescription>{timeframe}-year total cost of ownership by category across all vendors</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number, name: string) => [formatCurrency(value), name]}
                labelFormatter={(label) => `Vendor: ${label}`}
              />
              <Legend />
              <Bar dataKey="licensing" stackId="a" fill="#3b82f6" name="Licensing" />
              <Bar dataKey="hardware" stackId="a" fill="#ef4444" name="Hardware" />
              <Bar dataKey="implementation" stackId="a" fill="#f59e0b" name="Implementation" />
              <Bar dataKey="support" stackId="a" fill="#8b5cf6" name="Support" />
              <Bar dataKey="training" stackId="a" fill="#06b6d4" name="Training" />
              <Bar dataKey="maintenance" stackId="a" fill="#84cc16" name="Maintenance" />
              <Bar dataKey="operational" stackId="a" fill="#6b7280" name="Operational" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Savings Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Portnox Savings Breakdown</CardTitle>
            <CardDescription>Cost savings by category vs market average</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={savingsBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, savings }) => `${category}: ${formatCurrency(savings)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="savings"
                >
                  {savingsBreakdown.map((entry, index) => (
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
            <CardTitle>Cost Category Analysis</CardTitle>
            <CardDescription>Detailed savings by cost category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savingsBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">{formatCurrency(item.savings)}</div>
                      <div className="text-xs text-muted-foreground">{item.percentage.toFixed(0)}% reduction</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${Math.min(item.percentage, 100)}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Efficiency Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Efficiency Analysis</CardTitle>
          <CardDescription>Per-device and per-user cost comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {costBreakdownData.map((vendor) => (
              <div
                key={vendor.vendorId}
                className={`p-4 rounded-lg border ${
                  vendor.isPortnox
                    ? "border-green-200 bg-green-50 dark:bg-green-950/20"
                    : "border-gray-200 bg-gray-50 dark:bg-gray-950/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{vendor.vendor}</span>
                  {vendor.isPortnox && (
                    <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                      Best Value
                    </Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-bold">{formatCurrency(vendor.total)}</div>
                  <div className="text-xs text-muted-foreground">Total {timeframe}-year cost</div>
                  <div className="text-sm font-medium text-blue-600">
                    {formatCurrency(vendor.total / timeframe / 12)} /month
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
