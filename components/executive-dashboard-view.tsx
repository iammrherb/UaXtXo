"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
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
  LineChart,
  Line,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, MetricCard, GradientCard, staggerChildren, fadeInUp, VIBRANT_COLORS } from "./shared-ui"
import { DollarSign, TrendingUp, Clock, Users, Shield, Zap, Award, Target } from "lucide-react"

interface ExecutiveDashboardViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results, config }: ExecutiveDashboardViewProps) {
  const chartData = useMemo(() => {
    return results.map((result) => ({
      name: result.vendorName,
      totalCost: result.total,
      roi: result.roi.percentage,
      payback: result.roi.paybackMonths,
      fteSaved: result.ops.fteSaved,
    }))
  }, [results])

  const pieData = useMemo(() => {
    return results.map((result, index) => ({
      name: result.vendorName,
      value: result.total,
      color: VIBRANT_COLORS[index % VIBRANT_COLORS.length],
    }))
  }, [results])

  const bestValue = results[0] // Assuming sorted by total cost
  const portnoxResult = results.find((r) => r.vendor === "portnox")

  const keyMetrics = useMemo(() => {
    const totalSavings = results.reduce((sum, r) => sum + r.roi.annualSavings, 0) / results.length
    const avgPayback = results.reduce((sum, r) => sum + r.roi.paybackMonths, 0) / results.length
    const totalFteSaved = results.reduce((sum, r) => sum + r.ops.fteSaved, 0) / results.length
    const avgRiskReduction = results.reduce((sum, r) => sum + r.risk.breachReduction, 0) / results.length

    return {
      totalSavings: Math.round(totalSavings),
      avgPayback: Math.round(avgPayback),
      totalFteSaved: totalFteSaved.toFixed(1),
      avgRiskReduction: (avgRiskReduction * 100).toFixed(0),
    }
  }, [results])

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Header Section */}
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<Target className="h-6 w-6" />}
          title="Executive Dashboard"
          description="High-level TCO analysis and vendor comparison overview"
        />
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Average Annual Savings"
            value={`$${keyMetrics.totalSavings.toLocaleString()}`}
            detail="Across all vendors"
            icon={<DollarSign className="h-4 w-4" />}
            gradient="forest"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Average Payback Period"
            value={`${keyMetrics.avgPayback} months`}
            detail="Time to ROI"
            icon={<Clock className="h-4 w-4" />}
            gradient="ocean"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="FTE Savings"
            value={`${keyMetrics.totalFteSaved} FTE`}
            detail="Operational efficiency"
            icon={<Users className="h-4 w-4" />}
            gradient="royal"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Risk Reduction"
            value={`${keyMetrics.avgRiskReduction}%`}
            detail="Security improvement"
            icon={<Shield className="h-4 w-4" />}
            gradient="sunset"
          />
        </motion.div>
      </motion.div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TCO Comparison Chart */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Total Cost of Ownership ({config.years} Years)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Total Cost"]} />
                  <Bar dataKey="totalCost" fill="#00D4AA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cost Distribution Pie Chart */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Cost Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Vendor Highlights */}
      <motion.div variants={fadeInUp}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Best Value Highlight */}
          <GradientCard gradient="forest">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Best Value Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{bestValue.vendorName}</span>
                  <Badge variant="secondary">Lowest TCO</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Cost:</span>
                    <div className="font-semibold">${bestValue.total.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ROI:</span>
                    <div className="font-semibold">{bestValue.roi.percentage.toFixed(0)}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payback:</span>
                    <div className="font-semibold">{bestValue.roi.paybackMonths} months</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">FTE Saved:</span>
                    <div className="font-semibold">{bestValue.ops.fteSaved.toFixed(1)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </GradientCard>

          {/* Portnox Highlight (if included) */}
          {portnoxResult && (
            <GradientCard gradient="portnox">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Portnox Advantage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">Portnox</span>
                    <Badge variant="default">Cloud-Native</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Implementation:</span>
                      <div className="font-semibold">1-2 weeks</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">FTE Required:</span>
                      <div className="font-semibold">0.25</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Uptime:</span>
                      <div className="font-semibold">99.9%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Support:</span>
                      <div className="font-semibold">24/7</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GradientCard>
          )}
        </div>
      </motion.div>

      {/* ROI Timeline */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              ROI Timeline Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="#00D4AA"
                  strokeWidth={2}
                  dot={{ fill: "#00D4AA", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats Summary */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{results.length}</div>
                <div className="text-sm text-muted-foreground">Vendors Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{config.devices.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Devices in Scope</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{config.years}</div>
                <div className="text-sm text-muted-foreground">Year Analysis Period</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
