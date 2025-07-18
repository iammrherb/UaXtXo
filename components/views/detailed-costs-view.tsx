"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TooltipProvider } from "@/components/ui/tooltip"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { AlertTriangle, CheckCircle, Zap, TrendingUp, BarChart3, PieChartIcon, HelpCircle } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import CostBreakdownComparison from "@/components/charts/cost-breakdown-comparison"

interface DetailedCostsViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

interface HelpTooltipProps {
  title: string
  content: string
  calculation?: string
  children: React.ReactNode
}

function HelpTooltip({ title, content, calculation, children }: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 cursor-help">
        {children}
        <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
      </div>
    </TooltipProvider>
  )
}

export default function DetailedCostsView({ results = [], config }: DetailedCostsViewProps) {
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">No Cost Data Available</p>
            <p className="text-muted-foreground">
              Please configure your analysis parameters to view detailed cost breakdowns.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const competitors = results.filter((r) => r.vendorId !== "portnox")
  const avgCompetitorCost = competitors.reduce((sum, r) => sum + r.totalCost, 0) / Math.max(competitors.length, 1)
  const totalSavings = portnoxResult ? avgCompetitorCost - portnoxResult.totalCost : 0
  const savingsPercentage = avgCompetitorCost > 0 ? (totalSavings / avgCompetitorCost) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Enhanced Cost Analysis Alert */}
      {totalSavings > 0 && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-2">
              <div>
                <strong>Executive Summary:</strong> Portnox CLEAR delivers {formatCurrency(totalSavings)} in savings (
                {savingsPercentage.toFixed(1)}% cost reduction) over {config?.years || 3} years compared to traditional
                NAC solutions.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm">
                <div>
                  <strong>Deployment:</strong> 30 minutes vs 90+ days average
                </div>
                <div>
                  <strong>Complexity:</strong> 1/10 vs 7/10 average
                </div>
                <div>
                  <strong>Security:</strong> 0 CVEs vs 12+ average CVEs
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakdown" className="flex items-center gap-1 text-xs">
            <PieChartIcon className="h-3 w-3" />
            Cost Breakdown
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center gap-1 text-xs">
            <BarChart3 className="h-3 w-3" />
            Comparison
          </TabsTrigger>
          <TabsTrigger value="projections" className="flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3" />
            Projections
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="flex items-center gap-1 text-xs">
            <Zap className="h-3 w-3" />
            Efficiency
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-6">
          {/* Enhanced Cost Breakdown with Visual Comparisons */}
          <Card>
            <CardHeader>
              <HelpTooltip
                title="Enhanced Cost Breakdown Analysis"
                content="This comprehensive analysis shows detailed cost comparisons with savings breakdown, efficiency metrics, and hidden cost elimination."
                calculation="Total Savings = Competitor Average - Portnox Cost"
              >
                <CardTitle>Enhanced Cost Breakdown Analysis</CardTitle>
              </HelpTooltip>
              <CardDescription>Comprehensive cost comparison with detailed savings analysis</CardDescription>
            </CardHeader>
            <CardContent>{config && <CostBreakdownComparison results={results} config={config} />}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          {/* Vendor Comparison Charts */}
          <Card>
            <CardHeader>
              <CardTitle>Vendor Cost Comparison</CardTitle>
              <CardDescription>Side-by-side cost analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={results.map((r) => ({
                    vendor: r.vendorName,
                    total: r.totalCost,
                    isPortnox: r.vendorId === "portnox",
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="total" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          {/* Cost Projections */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Projections</CardTitle>
              <CardDescription>Multi-year cost analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <p className="text-muted-foreground">Cost projection charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          {/* Efficiency Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Efficiency Analysis</CardTitle>
              <CardDescription>Per-device and operational efficiency metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results.map((result) => (
                  <div
                    key={result.vendorId}
                    className={`p-4 rounded-lg border ${
                      result.vendorId === "portnox" ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{result.vendorName}</span>
                      {result.vendorId === "portnox" && (
                        <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                          Most Efficient
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg font-bold">{formatCurrency(result.totalCost)}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatCurrency(result.totalCost / (config?.devices || 1000))} per device
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
