"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { DollarSign, TrendingUp, Shield, Clock, Users, Award, ArrowRight, Download } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, MetricCard, GradientCard, fadeInUp, staggerContainer, colorPalette } from "./shared-ui"

export default function ExecutiveDashboardView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  // Prepare chart data
  const tcoComparisonData = results.map((result) => ({
    vendor: result.vendor,
    totalCost: result.totalCost,
    savings:
      result.vendor === "portnox" ? 0 : result.totalCost - results.find((r) => r.vendor === "portnox")?.totalCost || 0,
  }))

  const costBreakdownData = results[0]
    ? [
        { name: "Licensing", value: results[0].licensing, color: colorPalette.primary[0] },
        { name: "Implementation", value: results[0].implementation, color: colorPalette.primary[1] },
        { name: "Support", value: results[0].support, color: colorPalette.primary[2] },
        { name: "Training", value: results[0].training, color: colorPalette.primary[3] },
      ]
    : []

  const roiTimelineData = Array.from({ length: config.years }, (_, i) => ({
    year: `Year ${i + 1}`,
    portnox: results.find((r) => r.vendor === "portnox")?.roi || 0,
    competitor: results.find((r) => r.vendor !== "portnox")?.roi || 0,
  }))

  const portnoxResult = results.find((r) => r.vendor === "portnox")
  const bestCompetitor = results.filter((r) => r.vendor !== "portnox").sort((a, b) => a.totalCost - b.totalCost)[0]
  const totalSavings = bestCompetitor ? bestCompetitor.totalCost - (portnoxResult?.totalCost || 0) : 0
  const savingsPercentage = bestCompetitor ? (totalSavings / bestCompetitor.totalCost) * 100 : 0

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      {/* Header Section */}
      <motion.div variants={fadeInUp} className="flex justify-between items-start">
        <SectionTitle
          title="Executive Dashboard"
          subtitle={`TCO Analysis for ${config.devices.toLocaleString()} devices over ${config.years} years`}
        />
        <Button className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </Button>
      </motion.div>

      {/* Key Metrics Row */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Savings"
          value={`$${totalSavings.toLocaleString()}`}
          change={`${savingsPercentage.toFixed(1)}%`}
          changeType="positive"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          title="ROI"
          value={`${portnoxResult?.roi.toFixed(0) || 0}%`}
          change="vs industry avg"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Payback Period"
          value={`${portnoxResult?.paybackPeriod.toFixed(1) || 0} months`}
          change="faster than avg"
          changeType="positive"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          title="Risk Score"
          value="Low"
          change="vs competitors"
          changeType="positive"
          icon={<Shield className="h-5 w-5" />}
        />
      </motion.div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TCO Comparison Chart */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Total Cost of Ownership Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tcoComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Total Cost"]} />
                  <Bar dataKey="totalCost" fill={colorPalette.primary[0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cost Distribution */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Cost Distribution (Portnox)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* ROI Timeline */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>ROI Timeline Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={roiTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, "ROI"]} />
                <Area
                  type="monotone"
                  dataKey="portnox"
                  stackId="1"
                  stroke={colorPalette.success[0]}
                  fill={colorPalette.success[0]}
                />
                <Area
                  type="monotone"
                  dataKey="competitor"
                  stackId="2"
                  stroke={colorPalette.neutral[0]}
                  fill={colorPalette.neutral[0]}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vendor Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Value Highlight */}
        <GradientCard title="Best Value Solution" gradient="success">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Portnox ZTCA</span>
              <Badge className="bg-green-100 text-green-800">Recommended</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Cost:</span>
                <span className="font-semibold">${portnoxResult?.totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ROI:</span>
                <span className="font-semibold">{portnoxResult?.roi.toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Payback:</span>
                <span className="font-semibold">{portnoxResult?.paybackPeriod.toFixed(1)} months</span>
              </div>
            </div>
            <Button className="w-full mt-4">
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </GradientCard>

        {/* Portnox Advantage */}
        <GradientCard title="Portnox Advantage" gradient="primary">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${totalSavings.toLocaleString()}</div>
                <div className="text-sm">Total Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{savingsPercentage.toFixed(0)}%</div>
                <div className="text-sm">Cost Reduction</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Industry-leading security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Simplified management</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm">Zero-trust architecture</span>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>

      {/* Quick Actions */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <Download className="h-6 w-6" />
                <span>Download Report</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Schedule Demo</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                <Shield className="h-6 w-6" />
                <span>Security Assessment</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
