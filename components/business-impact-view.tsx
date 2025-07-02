"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Users, Clock, Target, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { motion } from "framer-motion"
import { SectionTitle, GradientCard, StatusBadge, VIBRANT_COLORS, fadeInUp, staggerChildren } from "./shared-ui"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface BusinessImpactViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function BusinessImpactView({ results, config }: BusinessImpactViewProps) {
  if (!results || results.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No data available for business impact analysis</p>
      </Card>
    )
  }

  // Calculate business impact metrics
  const bestVendor = results[0]
  const worstVendor = results[results.length - 1]
  const avgROI = results.reduce((sum, r) => sum + r.roi.percentage, 0) / results.length
  const totalSavings = results.reduce((sum, r) => sum + r.roi.annualSavings, 0)
  const avgPayback = results.reduce((sum, r) => sum + r.roi.paybackMonths, 0) / results.length

  // ROI comparison data
  const roiData = results.map((result) => ({
    vendor: result.vendorName,
    roi: result.roi.percentage,
    payback: result.roi.paybackMonths,
    savings: result.roi.annualSavings,
  }))

  // Productivity impact data
  const productivityData = results.map((result) => ({
    vendor: result.vendorName,
    fteSaved: result.ops.fteSaved,
    costSavings: result.ops.annualOpsSaving,
    efficiency: Math.min(100, result.ops.fteSaved * 20), // Convert to percentage
  }))

  // Risk reduction data
  const riskData = results.map((result) => ({
    vendor: result.vendorName,
    riskReduction: result.risk.breachReduction * 100,
    costAvoidance: result.risk.annualizedRiskCost,
  }))

  // Time-based ROI projection
  const timeProjection = Array.from({ length: config.years }, (_, index) => {
    const year = index + 1
    return {
      year: `Year ${year}`,
      ...results.reduce(
        (acc, result) => {
          acc[result.vendorName] = result.roi.annualSavings * year - (result.total / config.years) * year
          return acc
        },
        {} as Record<string, number>,
      ),
    }
  })

  return (
    <motion.div className="space-y-6" variants={staggerChildren} initial="initial" animate="animate">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <SectionTitle
          title="Business Impact Analysis"
          subtitle="ROI, productivity gains, and strategic value assessment"
        />
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GradientCard
          title="Best ROI"
          value={`${bestVendor.roi.percentage.toFixed(1)}%`}
          gradient="success"
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <GradientCard
          title="Avg Payback"
          value={`${avgPayback.toFixed(1)} mo`}
          gradient="info"
          icon={<Clock className="h-6 w-6" />}
        />
        <GradientCard
          title="Total Savings"
          value={`$${(totalSavings / 1000).toFixed(0)}K`}
          gradient="primary"
          icon={<DollarSign className="h-6 w-6" />}
        />
        <GradientCard
          title="FTE Reduction"
          value={`${results.reduce((sum, r) => sum + r.ops.fteSaved, 0).toFixed(1)}`}
          gradient="warning"
          icon={<Users className="h-6 w-6" />}
        />
      </motion.div>

      {/* ROI Comparison */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>ROI Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    name === "roi" ? `${value.toFixed(1)}%` : value,
                    name === "roi" ? "ROI" : name,
                  ]}
                />
                <Bar dataKey="roi" fill={VIBRANT_COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Payback Period</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value} months`, "Payback Period"]} />
                <Bar dataKey="payback" fill={VIBRANT_COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Productivity Impact */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Productivity Impact</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="efficiency"
                    stroke={VIBRANT_COLORS[2]}
                    fill={VIBRANT_COLORS[2]}
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="space-y-4">
                {productivityData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.vendor}</span>
                      <Badge variant="outline">{item.fteSaved.toFixed(1)} FTE</Badge>
                    </div>
                    <Progress value={item.efficiency} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      ${(item.costSavings / 1000).toFixed(0)}K annual savings
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Risk Reduction Value */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Risk Reduction Value</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ vendor, riskReduction }) => `${vendor}: ${riskReduction.toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="riskReduction"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-4">
                <h4 className="font-semibold">Risk Mitigation Benefits</h4>
                {riskData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.vendor}</p>
                      <p className="text-sm text-muted-foreground">{item.riskReduction.toFixed(0)}% risk reduction</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${(item.costAvoidance / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-muted-foreground">cost avoidance</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ROI Projection Over Time */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>ROI Projection Over Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={timeProjection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value: any, name: string) => [`$${(value / 1000).toFixed(0)}K`, name]} />
                {results.map((result, index) => (
                  <Line
                    key={result.vendor}
                    type="monotone"
                    dataKey={result.vendorName}
                    stroke={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strategic Value Assessment */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Strategic Value Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center space-x-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span>High Impact</span>
                </h4>
                <div className="space-y-2">
                  {results
                    .filter((r) => r.roi.percentage > avgROI)
                    .map((result) => (
                      <div key={result.vendor} className="flex justify-between items-center">
                        <span className="text-sm">{result.vendorName}</span>
                        <StatusBadge status="success">{result.roi.percentage.toFixed(1)}% ROI</StatusBadge>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold flex items-center space-x-2">
                  <Minus className="h-4 w-4 text-yellow-500" />
                  <span>Moderate Impact</span>
                </h4>
                <div className="space-y-2">
                  {results
                    .filter((r) => r.roi.percentage <= avgROI && r.roi.percentage > 0)
                    .map((result) => (
                      <div key={result.vendor} className="flex justify-between items-center">
                        <span className="text-sm">{result.vendorName}</span>
                        <StatusBadge status="warning">{result.roi.percentage.toFixed(1)}% ROI</StatusBadge>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold flex items-center space-x-2">
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                  <span>Low Impact</span>
                </h4>
                <div className="space-y-2">
                  {results
                    .filter((r) => r.roi.percentage <= 0)
                    .map((result) => (
                      <div key={result.vendor} className="flex justify-between items-center">
                        <span className="text-sm">{result.vendorName}</span>
                        <StatusBadge status="danger">{result.roi.percentage.toFixed(1)}% ROI</StatusBadge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
