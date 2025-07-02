"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { DollarSign, TrendingDown, Calculator, PieChart } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, MetricCard, ComparisonTable, fadeInUp, staggerContainer, colorPalette } from "./shared-ui"

export default function FinancialAnalysisView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  // Prepare data for charts
  const costBreakdownData = results.map((result) => ({
    vendor: result.vendor,
    licensing: result.licensing,
    implementation: result.implementation,
    support: result.support,
    training: result.training,
    total: result.totalCost,
  }))

  const yearlyProjectionData = Array.from({ length: config.years }, (_, yearIndex) => {
    const yearData: any = { year: `Year ${yearIndex + 1}` }
    results.forEach((result) => {
      const yearlyLicensing = result.licensing / config.years
      const yearlySupport = result.support / config.years
      const implementationCost = yearIndex === 0 ? result.implementation : 0
      const trainingCost = yearIndex === 0 ? result.training : 0

      yearData[result.vendor] = yearlyLicensing + yearlySupport + implementationCost + trainingCost
    })
    return yearData
  })

  const portnoxResult = results.find((r) => r.vendor === "portnox")
  const competitorResults = results.filter((r) => r.vendor !== "portnox")
  const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
  const totalSavings = avgCompetitorCost - (portnoxResult?.totalCost || 0)

  // Cost comparison table data
  const comparisonTableData = results.map((result) => ({
    vendor: result.vendor,
    licensing: result.licensing,
    implementation: result.implementation,
    support: result.support,
    training: result.training,
    total: result.totalCost,
    savings: result.vendor === "portnox" ? 0 : result.totalCost - (portnoxResult?.totalCost || 0),
  }))

  const tableColumns = [
    { key: "vendor", label: "Vendor", format: (value: string) => value.charAt(0).toUpperCase() + value.slice(1) },
    { key: "licensing", label: "Licensing", format: (value: number) => `$${value.toLocaleString()}` },
    { key: "implementation", label: "Implementation", format: (value: number) => `$${value.toLocaleString()}` },
    { key: "support", label: "Support", format: (value: number) => `$${value.toLocaleString()}` },
    { key: "training", label: "Training", format: (value: number) => `$${value.toLocaleString()}` },
    { key: "total", label: "Total Cost", format: (value: number) => `$${value.toLocaleString()}` },
    {
      key: "savings",
      label: "vs Portnox",
      format: (value: number) => (value === 0 ? "Baseline" : `+$${value.toLocaleString()}`),
    },
  ]

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      <SectionTitle title="Financial Analysis" subtitle="Detailed cost breakdown and financial projections" />

      {/* Financial Metrics */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Portnox Total Cost"
          value={`$${portnoxResult?.totalCost.toLocaleString() || 0}`}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          title="Average Competitor Cost"
          value={`$${avgCompetitorCost.toLocaleString()}`}
          icon={<Calculator className="h-5 w-5" />}
        />
        <MetricCard
          title="Total Savings"
          value={`$${totalSavings.toLocaleString()}`}
          change={`${((totalSavings / avgCompetitorCost) * 100).toFixed(1)}%`}
          changeType="positive"
          icon={<TrendingDown className="h-5 w-5" />}
        />
        <MetricCard
          title="Cost per Device"
          value={`$${Math.round((portnoxResult?.totalCost || 0) / config.devices)}`}
          icon={<PieChart className="h-5 w-5" />}
        />
      </motion.div>

      {/* Cost Breakdown Chart */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="licensing" stackId="a" fill={colorPalette.primary[0]} name="Licensing" />
                <Bar dataKey="implementation" stackId="a" fill={colorPalette.primary[1]} name="Implementation" />
                <Bar dataKey="support" stackId="a" fill={colorPalette.primary[2]} name="Support" />
                <Bar dataKey="training" stackId="a" fill={colorPalette.primary[3]} name="Training" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Yearly Projection */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Yearly Cost Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={yearlyProjectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                {results.map((result, index) => (
                  <Area
                    key={result.vendor}
                    type="monotone"
                    dataKey={result.vendor}
                    stroke={colorPalette.primary[index % colorPalette.primary.length]}
                    fill={colorPalette.primary[index % colorPalette.primary.length]}
                    fillOpacity={0.6}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Cost Comparison Table */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Cost Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ComparisonTable data={comparisonTableData} columns={tableColumns} highlightBest={true} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Cost Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Licensing Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.map((result, index) => (
                <div key={result.vendor} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize font-medium">{result.vendor}</span>
                    <span>${result.licensing.toLocaleString()}</span>
                  </div>
                  <Progress
                    value={(result.licensing / Math.max(...results.map((r) => r.licensing))) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Implementation Costs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.map((result, index) => (
                <div key={result.vendor} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="capitalize font-medium">{result.vendor}</span>
                    <span>${result.implementation.toLocaleString()}</span>
                  </div>
                  <Progress
                    value={(result.implementation / Math.max(...results.map((r) => r.implementation))) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
