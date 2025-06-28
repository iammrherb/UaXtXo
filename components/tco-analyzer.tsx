"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingDown, TrendingUp, Clock, Shield, Zap, CheckCircle, Info, Download, Share } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface TCOAnalyzerProps {
  results: CalculationResult[]
  configuration: CalculationConfiguration
  onConfigurationChange: (config: Partial<CalculationConfiguration>) => void
  selectedVendors: string[]
  onVendorSelectionChange: (vendors: string[]) => void
  isLoading?: boolean
}

const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#6B7280"]

export default function TCOAnalyzer({
  results = [],
  configuration,
  onConfigurationChange,
  selectedVendors,
  onVendorSelectionChange,
  isLoading = false,
}: TCOAnalyzerProps) {
  const [selectedMetric, setSelectedMetric] = useState("total")

  // Memoize calculations to prevent re-renders
  const analysisData = useMemo(() => {
    // Safe data handling
    const safeResults = results.filter((result) => result && typeof result.total === "number")
    const portnoxResult = safeResults.find((r) => r.vendor === "portnox")
    const competitorResults = safeResults.filter((r) => r.vendor !== "portnox")

    // Calculate savings vs competitors
    const calculateSavings = () => {
      if (!portnoxResult || competitorResults.length === 0) return null

      const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + (r.total || 0), 0) / competitorResults.length
      const savings = avgCompetitorCost - portnoxResult.total
      const percentage = (savings / avgCompetitorCost) * 100

      return {
        amount: savings,
        percentage: percentage,
        paybackMonths: portnoxResult.roi?.paybackMonths || 0,
      }
    }

    const savings = calculateSavings()

    // Prepare chart data
    const chartData = safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor,
      total: result.total || 0,
      software: result.breakdown?.find((b) => b.name === "Software")?.value || 0,
      hardware: result.breakdown?.find((b) => b.name === "Hardware")?.value || 0,
      implementation: result.breakdown?.find((b) => b.name === "Implementation")?.value || 0,
      support: result.breakdown?.find((b) => b.name === "Support")?.value || 0,
      operations: result.breakdown?.find((b) => b.name === "Operations")?.value || 0,
    }))

    // ROI Timeline data
    const roiTimelineData = Array.from({ length: configuration.years || 3 }, (_, i) => {
      const year = i + 1
      const portnoxCumulative = portnoxResult ? (portnoxResult.total / (configuration.years || 3)) * year : 0
      const avgCompetitorCumulative =
        competitorResults.length > 0
          ? (competitorResults.reduce((sum, r) => sum + (r.total || 0), 0) /
              competitorResults.length /
              (configuration.years || 3)) *
            year
          : 0

      return {
        year: `Year ${year}`,
        portnox: portnoxCumulative,
        competitor: avgCompetitorCumulative,
        savings: avgCompetitorCumulative - portnoxCumulative,
      }
    })

    return {
      safeResults,
      portnoxResult,
      competitorResults,
      savings,
      chartData,
      roiTimelineData,
    }
  }, [results, configuration.years])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const { safeResults, portnoxResult, competitorResults, savings, chartData, roiTimelineData } = analysisData

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">Total Savings</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {savings ? `$${savings.amount.toLocaleString()}` : "$0"}
                  </p>
                  <p className="text-xs text-green-600">
                    {savings ? `${savings.percentage.toFixed(1)}% less than competitors` : "No comparison data"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Payback Period</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portnoxResult?.roi?.paybackMonths || 0} months
                  </p>
                  <p className="text-xs text-gray-500">ROI: {portnoxResult?.roi?.percentage || 0}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Risk Reduction</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portnoxResult?.roi?.breachReduction || 0}%
                  </p>
                  <p className="text-xs text-gray-500">Security breach probability</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Key Insights */}
      {portnoxResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">Lower Total Cost</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Portnox offers {savings ? `${savings.percentage.toFixed(1)}%` : "significant"} cost savings compared
                    to traditional NAC solutions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Faster Implementation</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Cloud-native architecture enables rapid deployment with minimal infrastructure requirements
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800 dark:text-purple-200">Enhanced Security</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    AI-powered threat detection provides superior security posture with automated response
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-800 dark:text-orange-200">Operational Efficiency</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Reduced operational overhead saves {portnoxResult.roi?.laborSavingsFTE || 0} FTE annually
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cost Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Total Cost of Ownership Comparison</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={selectedMetric === "total" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric("total")}
            >
              Total Cost
            </Button>
            <Button
              variant={selectedMetric === "breakdown" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric("breakdown")}
            >
              Cost Breakdown
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === "total" ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Total Cost"]}
                    labelStyle={{ color: "#374151" }}
                  />
                  <Bar dataKey="total" fill="#3B82F6" />
                </BarChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                    labelStyle={{ color: "#374151" }}
                  />
                  <Bar dataKey="software" stackId="a" fill="#10B981" />
                  <Bar dataKey="hardware" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="implementation" stackId="a" fill="#8B5CF6" />
                  <Bar dataKey="support" stackId="a" fill="#F59E0B" />
                  <Bar dataKey="operations" stackId="a" fill="#EF4444" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ROI Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>ROI Timeline Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={roiTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                  labelStyle={{ color: "#374151" }}
                />
                <Line type="monotone" dataKey="portnox" stroke="#10B981" strokeWidth={3} name="Portnox" />
                <Line type="monotone" dataKey="competitor" stroke="#EF4444" strokeWidth={3} name="Avg Competitor" />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Cumulative Savings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Share className="h-4 w-4" />
          Share Analysis
        </Button>
      </div>
    </div>
  )
}
