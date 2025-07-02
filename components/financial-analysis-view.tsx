"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, DollarSign, Calculator, PieChartIcon } from "lucide-react"

interface FinancialAnalysisViewProps {
  results: any[]
  config: any
}

// Safe number helper function
const safeNumber = (value: any, fallback = 0): number => {
  if (typeof value === "number" && !isNaN(value) && isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return !isNaN(parsed) && isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

export default function FinancialAnalysisView({ results, config }: FinancialAnalysisViewProps) {
  if (!results || results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>No financial data available</p>
        </CardContent>
      </Card>
    )
  }

  const formatCurrency = (value: number) => {
    const safeValue = safeNumber(value, 0)
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(safeValue)
  }

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  // Calculate financial metrics with safe numbers
  const totalInvestment = results.reduce((sum, r) => sum + safeNumber(r.total, 0), 0)
  const averageROI = results.reduce((sum, r) => sum + safeNumber(r.roi?.percentage, 0), 0) / Math.max(results.length, 1)
  const configYears = safeNumber(config?.years, 3)
  const totalSavings = results.reduce((sum, r) => sum + safeNumber(r.roi?.annualSavings, 0) * configYears, 0)

  // Prepare cost breakdown data
  const costBreakdownData =
    results[0]?.breakdown?.map((item: any) => ({
      name: item.name,
      value: safeNumber(item.value, 0),
    })) || []

  // Prepare year-over-year projection
  const projectionData = Array.from({ length: configYears }, (_, i) => ({
    year: `Year ${i + 1}`,
    ...results.reduce(
      (acc, result) => {
        acc[result.vendorName] = safeNumber(result.total, 0) / configYears
        return acc
      },
      {} as Record<string, number>,
    ),
  }))

  return (
    <div className="space-y-6">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Total Investment</p>
                <p className="text-2xl font-bold">{formatCurrency(totalInvestment)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Average ROI</p>
                <p className="text-2xl font-bold">{Math.round(safeNumber(averageROI, 0))}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Projected Savings</p>
                <p className="text-2xl font-bold">{formatCurrency(totalSavings)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Analysis Period</p>
                <p className="text-2xl font-bold">{configYears} Years</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Comparison and Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Cost Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={results.map((r) => ({ ...r, total: safeNumber(r.total, 0) }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendorName" />
                <YAxis tickFormatter={(value) => `$${(safeNumber(value, 0) / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => [formatCurrency(safeNumber(value, 0)), "Total Cost"]} />
                <Bar dataKey="total" fill="#00D4AA" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdownData.filter((d) => safeNumber(d.value, 0) > 0)}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(safeNumber(percent, 0) * 100).toFixed(0)}%`}
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatCurrency(safeNumber(value, 0)), "Cost"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Year-over-Year Projection */}
      <Card>
        <CardHeader>
          <CardTitle>Annual Cost Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `$${(safeNumber(value, 0) / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value) => [formatCurrency(safeNumber(value, 0)), "Annual Cost"]} />
              {results.map((result, index) => (
                <Area
                  key={result.vendorName}
                  type="monotone"
                  dataKey={result.vendorName}
                  stackId="1"
                  stroke={COLORS[index % COLORS.length]}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={0.6}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Financial Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Financial Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Vendor</th>
                  <th className="text-right p-2">Initial Cost</th>
                  <th className="text-right p-2">Annual OpEx</th>
                  <th className="text-right p-2">3-Year Total</th>
                  <th className="text-right p-2">ROI</th>
                  <th className="text-right p-2">Payback Period</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => {
                  const hardwareCost = safeNumber(result.breakdown?.find((b: any) => b.name === "Hardware")?.value, 0)
                  const psCost = safeNumber(
                    result.breakdown?.find((b: any) => b.name === "Professional Services")?.value,
                    0,
                  )
                  const initialCost = hardwareCost + psCost
                  const totalCost = safeNumber(result.total, 0)
                  const annualOpEx = (totalCost - initialCost) / configYears
                  const roiPercentage = safeNumber(result.roi?.percentage, 0)
                  const paybackMonths = safeNumber(result.roi?.paybackMonths, 0)

                  return (
                    <tr key={result.vendor} className="border-b">
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium">{result.vendorName}</span>
                        </div>
                      </td>
                      <td className="text-right p-2">{formatCurrency(initialCost)}</td>
                      <td className="text-right p-2">{formatCurrency(annualOpEx)}</td>
                      <td className="text-right p-2 font-semibold">{formatCurrency(totalCost)}</td>
                      <td className="text-right p-2">
                        <Badge variant={roiPercentage > 0 ? "default" : "destructive"}>
                          {Math.round(roiPercentage)}%
                        </Badge>
                      </td>
                      <td className="text-right p-2">{paybackMonths > 0 ? `${paybackMonths} months` : "N/A"}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
