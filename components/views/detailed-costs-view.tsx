"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  LineChart,
  Line,
  ComposedChart,
} from "recharts"
import { DollarSign, TrendingDown, Calculator, Layers } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface DetailedCostsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function DetailedCostsView({ results = [], config }: DetailedCostsViewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const costBreakdownData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      licensing: result.breakdown?.licensing || 0,
      hardware: result.breakdown?.hardware || 0,
      implementation: result.breakdown?.implementation || 0,
      support: result.breakdown?.support || 0,
      training: result.breakdown?.training || 0,
      maintenance: result.breakdown?.maintenance || 0,
      total: result.totalCost,
    }))
  }, [results])

  const yearlyProjections = useMemo(() => {
    const timeframe = config?.years || 3
    const projections = []

    for (let year = 1; year <= timeframe; year++) {
      const yearData: any = { year }

      results.forEach((result) => {
        const annualCost = result.totalCost / timeframe
        const growthFactor = 1 + 0.05 * (year - 1) // 5% annual growth
        yearData[result.vendorName] = annualCost * growthFactor
      })

      projections.push(yearData)
    }

    return projections
  }, [results, config])

  const hiddenCostsData = useMemo(() => {
    return results.map((result) => {
      const baseCost = result.breakdown?.licensing || result.totalCost * 0.6
      const hiddenCosts = {
        training: result.breakdown?.training || baseCost * 0.1,
        integration: result.breakdown?.implementation || baseCost * 0.15,
        downtime: baseCost * 0.05,
        maintenance: result.breakdown?.maintenance || baseCost * 0.2,
        upgrades: baseCost * 0.08,
        support: result.breakdown?.support || baseCost * 0.12,
      }

      return {
        vendor: result.vendorName,
        baseCost,
        ...hiddenCosts,
        totalHidden: Object.values(hiddenCosts).reduce((sum, cost) => sum + cost, 0),
        isPortnox: result.vendorId === "portnox",
      }
    })
  }, [results])

  const efficiencyMetrics = useMemo(() => {
    const deviceCount = config?.devices || 1000

    return results.map((result) => ({
      vendor: result.vendorName,
      costPerDevice: result.totalCost / deviceCount,
      costPerUser: result.totalCost / (config?.users || deviceCount),
      maintenanceRatio: (result.breakdown?.maintenance || 0) / result.totalCost,
      implementationRatio: (result.breakdown?.implementation || 0) / result.totalCost,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results, config])

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16"]

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const avgCompetitorCost =
    results.filter((r) => r.vendorId !== "portnox").reduce((sum, r) => sum + r.totalCost, 0) /
    Math.max(results.filter((r) => r.vendorId !== "portnox").length, 1)

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">No cost data available. Please configure your analysis parameters.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cost Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              Lowest Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {formatCurrency(Math.min(...results.map((r) => r.totalCost)))}
            </div>
            <p className="text-xs text-blue-600 mt-1">
              {results.find((r) => r.totalCost === Math.min(...results.map((r) => r.totalCost)))?.vendorName}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              Average Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {portnoxResult ? formatCurrency(avgCompetitorCost - portnoxResult.totalCost) : "N/A"}
            </div>
            <p className="text-xs text-green-600 mt-1">vs competitors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calculator className="h-4 w-4 text-purple-600" />
              Cost Per Device
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">
              {formatCurrency((portnoxResult?.totalCost || 0) / (config?.devices || 1000))}
            </div>
            <p className="text-xs text-purple-600 mt-1">Portnox CLEAR</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Layers className="h-4 w-4 text-orange-600" />
              Hidden Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              {hiddenCostsData.find((h) => h.isPortnox)
                ? formatCurrency(hiddenCostsData.find((h) => h.isPortnox)!.totalHidden)
                : "N/A"}
            </div>
            <p className="text-xs text-orange-600 mt-1">Portnox total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="breakdown" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="projections">Year-over-Year</TabsTrigger>
          <TabsTrigger value="hidden">Hidden Costs</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown by Vendor</CardTitle>
                <CardDescription>Detailed cost components comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    <Bar dataKey="maintenance" stackId="a" fill="#06b6d4" name="Maintenance" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portnox Cost Distribution</CardTitle>
                <CardDescription>How Portnox costs are allocated</CardDescription>
              </CardHeader>
              <CardContent>
                {portnoxResult && (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Licensing", value: portnoxResult.breakdown?.licensing || 0, fill: "#3b82f6" },
                          {
                            name: "Implementation",
                            value: portnoxResult.breakdown?.implementation || 0,
                            fill: "#10b981",
                          },
                          { name: "Support", value: portnoxResult.breakdown?.support || 0, fill: "#f59e0b" },
                          { name: "Training", value: portnoxResult.breakdown?.training || 0, fill: "#ef4444" },
                        ].filter((item) => item.value > 0)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: "Licensing", value: portnoxResult.breakdown?.licensing || 0, fill: "#3b82f6" },
                          {
                            name: "Implementation",
                            value: portnoxResult.breakdown?.implementation || 0,
                            fill: "#10b981",
                          },
                          { name: "Support", value: portnoxResult.breakdown?.support || 0, fill: "#f59e0b" },
                          { name: "Training", value: portnoxResult.breakdown?.training || 0, fill: "#ef4444" },
                        ]
                          .filter((item) => item.value > 0)
                          .map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Cost Projections</CardTitle>
              <CardDescription>Annual cost development with growth factors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={yearlyProjections}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" tickFormatter={(value) => `Year ${value}`} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  {results.map((result, index) => (
                    <Line
                      key={result.vendorId}
                      type="monotone"
                      dataKey={result.vendorName}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={result.vendorId === "portnox" ? 4 : 2}
                      dot={{ r: result.vendorId === "portnox" ? 6 : 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hidden" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hidden Costs Analysis</CardTitle>
              <CardDescription>Often overlooked costs that impact total TCO</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={hiddenCostsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="baseCost" fill="#e5e7eb" name="Base Cost" />
                  <Bar dataKey="training" stackId="hidden" fill="#ef4444" name="Training" />
                  <Bar dataKey="integration" stackId="hidden" fill="#f59e0b" name="Integration" />
                  <Bar dataKey="downtime" stackId="hidden" fill="#eab308" name="Downtime" />
                  <Bar dataKey="maintenance" stackId="hidden" fill="#22c55e" name="Maintenance" />
                  <Bar dataKey="upgrades" stackId="hidden" fill="#3b82f6" name="Upgrades" />
                  <Bar dataKey="support" stackId="hidden" fill="#8b5cf6" name="Support" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hiddenCostsData.map((vendor) => (
              <Card key={vendor.vendor} className={vendor.isPortnox ? "border-green-200 bg-green-50" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {vendor.vendor}
                    {vendor.isPortnox && <Badge className="bg-green-600">Recommended</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Base Cost:</span>
                    <span className="font-medium">{formatCurrency(vendor.baseCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hidden Costs:</span>
                    <span className="font-medium text-red-600">{formatCurrency(vendor.totalHidden)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>{formatCurrency(vendor.baseCost + vendor.totalHidden)}</span>
                  </div>
                  <Progress
                    value={(vendor.totalHidden / (vendor.baseCost + vendor.totalHidden)) * 100}
                    className="mt-2 h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    {((vendor.totalHidden / (vendor.baseCost + vendor.totalHidden)) * 100).toFixed(0)}% hidden costs
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cost Per Device</CardTitle>
                <CardDescription>Efficiency metrics by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={efficiencyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
                    <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                    <Bar dataKey="costPerDevice" fill="#3b82f6" name="Cost per Device" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Ratios</CardTitle>
                <CardDescription>Implementation and maintenance as % of total cost</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {efficiencyMetrics.map((metric) => (
                    <div key={metric.vendor} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{metric.vendor}</span>
                        {metric.isPortnox && (
                          <Badge variant="outline" className="text-green-600">
                            Best
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Implementation:</span>
                          <span>{(metric.implementationRatio * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={metric.implementationRatio * 100} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Maintenance:</span>
                          <span>{(metric.maintenanceRatio * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={metric.maintenanceRatio * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
