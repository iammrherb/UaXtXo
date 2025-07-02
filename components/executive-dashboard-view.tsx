"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, DollarSign, Clock, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExecutiveDashboardViewProps {
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

export default function ExecutiveDashboardView({ results, config }: ExecutiveDashboardViewProps) {
  if (!results || results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>No data available for dashboard view</p>
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

  const bestROI = Math.max(...results.map((r) => safeNumber(r.roi?.percentage, 0)))
  const lowestTCO = Math.min(...results.map((r) => safeNumber(r.total, 0)))
  const fastestPayback = Math.min(...results.map((r) => safeNumber(r.roi?.paybackMonths, 999)))

  const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Lowest TCO</p>
                <p className="text-2xl font-bold">{formatCurrency(lowestTCO)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Best ROI</p>
                <p className="text-2xl font-bold">{Math.round(safeNumber(bestROI, 0))}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Fastest Payback</p>
                <p className="text-2xl font-bold">{safeNumber(fastestPayback, 0)} mo</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Devices</p>
                <p className="text-2xl font-bold">{safeNumber(config?.devices, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TCO Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Total Cost of Ownership Comparison</CardTitle>
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

      {/* ROI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ROI Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={results.map((r) => ({ ...r, roiPercentage: safeNumber(r.roi?.percentage, 0) }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendorName" />
                <YAxis />
                <Tooltip formatter={(value) => [`${safeNumber(value, 0)}%`, "ROI"]} />
                <Bar dataKey="roiPercentage" fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.slice(0, 3).map((result, index) => {
                const total = safeNumber(result.total, 0)
                const maxTotal = Math.max(...results.map((r) => safeNumber(r.total, 0)))
                const progressValue = maxTotal > 0 ? (total / maxTotal) * 100 : 0

                return (
                  <div key={result.vendor} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{result.vendorName}</span>
                      <span className="text-sm text-muted-foreground">{formatCurrency(total)}</span>
                    </div>
                    <Progress value={safeNumber(progressValue, 0)} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Comparison Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Vendor</th>
                  <th className="text-right p-2">Total Cost</th>
                  <th className="text-right p-2">ROI</th>
                  <th className="text-right p-2">Payback</th>
                  <th className="text-center p-2">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => {
                  const roiPercentage = safeNumber(result.roi?.percentage, 0)
                  const paybackMonths = safeNumber(result.roi?.paybackMonths, 0)
                  const breachReduction = safeNumber(result.risk?.breachReduction, 0)

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
                      <td className="text-right p-2">{formatCurrency(safeNumber(result.total, 0))}</td>
                      <td className="text-right p-2">
                        <span className={cn("font-medium", roiPercentage > 0 ? "text-green-600" : "text-red-600")}>
                          {Math.round(roiPercentage)}%
                        </span>
                      </td>
                      <td className="text-right p-2">{paybackMonths > 0 ? `${paybackMonths} mo` : "N/A"}</td>
                      <td className="text-center p-2">
                        <Badge
                          variant={
                            breachReduction > 0.5 ? "default" : breachReduction > 0.3 ? "secondary" : "destructive"
                          }
                        >
                          {breachReduction > 0.5 ? "Low" : breachReduction > 0.3 ? "Medium" : "High"}
                        </Badge>
                      </td>
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
