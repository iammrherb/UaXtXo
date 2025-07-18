"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, DollarSign, Calendar, Target, Zap, CheckCircle2 } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ROIComparisonDashboardProps {
  results: CalculationResult[]
  config?: CalculationConfiguration
}

export function ROIComparisonDashboard({ results, config }: ROIComparisonDashboardProps) {
  const roiData = useMemo(() => {
    return results
      .map((result) => ({
        vendor: result.vendorName,
        vendorId: result.vendorId,
        totalCost: result.totalCost,
        annualSavings: result.roi.annualSavings,
        paybackMonths: result.roi.paybackMonths,
        roiPercentage: result.roi.percentage,
        netPresentValue: result.roi.netPresentValue,
        fteSaved: result.ops.fteSaved,
        annualOpsSaving: result.ops.annualOpsSaving,
        automationLevel: result.ops.automationLevel,
        efficiencyGains: result.vendorData.roi.efficiencyGains,
        riskReduction: result.vendorData.roi.riskReduction,
        isPortnox: result.vendorId === "portnox",
      }))
      .sort((a, b) => b.roiPercentage - a.roiPercentage)
  }, [results])

  const timeframe = config?.years || 3
  const deviceCount = config?.devices || 1000

  // Calculate cumulative savings over time
  const cumulativeSavingsData = useMemo(() => {
    const years = Array.from({ length: timeframe }, (_, i) => i + 1)

    return years.map((year) => {
      const yearData: any = { year: `Year ${year}` }

      roiData.forEach((vendor) => {
        const cumulativeSavings = vendor.annualSavings * year - vendor.totalCost
        yearData[vendor.vendor] = Math.max(0, cumulativeSavings)
      })

      return yearData
    })
  }, [roiData, timeframe])

  // Calculate break-even analysis
  const breakEvenData = useMemo(() => {
    return roiData
      .map((vendor) => ({
        vendor: vendor.vendor,
        vendorId: vendor.vendorId,
        paybackMonths: vendor.paybackMonths,
        breakEvenPoint: vendor.totalCost / (vendor.annualSavings / 12),
        isPortnox: vendor.isPortnox,
      }))
      .sort((a, b) => a.paybackMonths - b.paybackMonths)
  }, [roiData])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const portnoxData = roiData.find((r) => r.isPortnox)
  const avgROI = roiData.reduce((sum, r) => sum + r.roiPercentage, 0) / roiData.length
  const totalSavings = roiData.reduce((sum, r) => sum + r.annualSavings * timeframe, 0)

  return (
    <div className="space-y-6">
      {/* ROI Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Best ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {Math.max(...roiData.map((r) => r.roiPercentage)).toFixed(0)}%
            </div>
            <p className="text-xs text-green-600 mt-1">
              {roiData.find((r) => r.roiPercentage === Math.max(...roiData.map((r) => r.roiPercentage)))?.vendor}
            </p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              Fastest Payback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {Math.min(...roiData.map((r) => r.paybackMonths))} mo
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {roiData.find((r) => r.paybackMonths === Math.min(...roiData.map((r) => r.paybackMonths)))?.vendor}
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">{formatCurrency(totalSavings)}</div>
            <p className="text-xs text-purple-600 mt-1">Over {timeframe} years</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-600" />
              Average ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{avgROI.toFixed(0)}%</div>
            <p className="text-xs text-orange-600 mt-1">Market average</p>
          </CardContent>
        </Card>
      </div>

      {/* ROI Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Return on Investment Comparison</CardTitle>
          <CardDescription>
            {timeframe}-year ROI analysis for {deviceCount.toLocaleString()} devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={roiData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip
                formatter={(value: number, name: string) => [
                  name === "roiPercentage" ? `${value.toFixed(1)}%` : formatCurrency(value),
                  name === "roiPercentage" ? "ROI" : "Annual Savings",
                ]}
                labelFormatter={(label) => `Vendor: ${label}`}
              />
              <Legend />
              <Bar dataKey="roiPercentage" fill="#3b82f6" name="ROI %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cumulative Savings Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Cumulative Savings Timeline</CardTitle>
          <CardDescription>Net savings accumulation over {timeframe} years</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={cumulativeSavingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              {roiData.map((vendor, index) => (
                <Area
                  key={vendor.vendorId}
                  type="monotone"
                  dataKey={vendor.vendor}
                  stackId="1"
                  stroke={vendor.isPortnox ? "#10b981" : `hsl(${(index * 360) / roiData.length}, 70%, 50%)`}
                  fill={vendor.isPortnox ? "#10b981" : `hsl(${(index * 360) / roiData.length}, 70%, 50%)`}
                  fillOpacity={vendor.isPortnox ? 0.8 : 0.6}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payback Period Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payback Period Comparison</CardTitle>
            <CardDescription>Time to recover initial investment</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={breakEvenData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${value} mo`} />
                <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(value: number) => [`${value} months`, "Payback Period"]} />
                <Bar
                  dataKey="paybackMonths"
                  fill={(entry: any) => (entry.isPortnox ? "#10b981" : "#6b7280")}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Efficiency Gains</CardTitle>
            <CardDescription>FTE savings and automation benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roiData.map((vendor) => (
                <div key={vendor.vendorId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{vendor.vendor}</span>
                      {vendor.isPortnox && (
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-300">
                          Best
                        </Badge>
                      )}
                    </div>
                    <div className="text-right text-xs">
                      <div className="font-medium">{vendor.fteSaved.toFixed(1)} FTE saved</div>
                      <div className="text-muted-foreground">{formatCurrency(vendor.annualOpsSaving)}/year</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Automation Level</span>
                      <span>{vendor.automationLevel}%</span>
                    </div>
                    <Progress
                      value={vendor.automationLevel}
                      className={`h-2 ${vendor.isPortnox ? "bg-green-100" : ""}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed ROI Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed ROI Analysis</CardTitle>
          <CardDescription>Comprehensive return on investment breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Vendor</th>
                  <th className="text-right p-2">Total Investment</th>
                  <th className="text-right p-2">Annual Savings</th>
                  <th className="text-right p-2">Payback Period</th>
                  <th className="text-right p-2">ROI %</th>
                  <th className="text-right p-2">NPV</th>
                  <th className="text-right p-2">Risk Reduction</th>
                </tr>
              </thead>
              <tbody>
                {roiData.map((vendor) => (
                  <tr
                    key={vendor.vendorId}
                    className={`border-b ${vendor.isPortnox ? "bg-green-50 dark:bg-green-950/20" : ""}`}
                  >
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        {vendor.vendor}
                        {vendor.isPortnox && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      </div>
                    </td>
                    <td className="text-right p-2 font-medium">{formatCurrency(vendor.totalCost)}</td>
                    <td className="text-right p-2 text-green-600 font-medium">
                      {formatCurrency(vendor.annualSavings)}
                    </td>
                    <td className="text-right p-2">{vendor.paybackMonths} months</td>
                    <td className="text-right p-2 font-bold text-blue-600">{vendor.roiPercentage.toFixed(1)}%</td>
                    <td className="text-right p-2">{formatCurrency(vendor.netPresentValue)}</td>
                    <td className="text-right p-2">{vendor.riskReduction}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ROI Summary Alert */}
      {portnoxData && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <Zap className="h-4 w-4" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            <strong>ROI Leadership:</strong> Portnox CLEAR delivers exceptional {portnoxData.roiPercentage.toFixed(0)}%
            ROI with {formatCurrency(portnoxData.annualSavings)} annual savings and {portnoxData.paybackMonths}-month
            payback period. The combination of {portnoxData.fteSaved.toFixed(1)} FTE savings,{" "}
            {portnoxData.automationLevel}% automation, and {portnoxData.riskReduction}% risk reduction creates
            compelling business value that significantly outperforms traditional NAC solutions.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
