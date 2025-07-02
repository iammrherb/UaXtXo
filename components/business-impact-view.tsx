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
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import {
  SectionTitle,
  MetricCard,
  GradientCard,
  ProgressRing,
  staggerChildren,
  fadeInUp,
  VIBRANT_COLORS,
} from "./shared-ui"
import { TrendingUp, Users, Clock, Target, Zap, Award, DollarSign, Calendar } from "lucide-react"

interface BusinessImpactViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function BusinessImpactView({ results, config }: BusinessImpactViewProps) {
  const roiData = useMemo(() => {
    return results.map((result) => ({
      name: result.vendorName,
      roi: result.roi.percentage,
      payback: result.roi.paybackMonths,
      annualSavings: result.roi.annualSavings,
      fteSaved: result.ops.fteSaved,
    }))
  }, [results])

  const productivityImpact = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      fteSaved: result.ops.fteSaved,
      annualSaving: result.ops.annualOpsSaving,
      efficiencyGain: (result.ops.fteSaved / 3) * 100, // Assuming baseline of 3 FTE
    }))
  }, [results])

  const paybackAnalysis = useMemo(() => {
    const months = Array.from({ length: 36 }, (_, i) => i + 1)
    return months.map((month) => {
      const monthData: any = { month }
      results.forEach((result) => {
        const monthlySavings = result.roi.annualSavings / 12
        const cumulativeSavings = monthlySavings * month
        const initialCost = result.total / config.years // Simplified
        monthData[result.vendorName] = Math.max(0, cumulativeSavings - initialCost)
      })
      return monthData
    })
  }, [results, config.years])

  const bestRoi = results.reduce((best, current) => (current.roi.percentage > best.roi.percentage ? current : best))

  const fastestPayback = results.reduce((fastest, current) =>
    current.roi.paybackMonths < fastest.roi.paybackMonths ? current : fastest,
  )

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<TrendingUp className="h-6 w-6" />}
          title="Business Impact & ROI Analysis"
          description="Quantifying the business value and operational impact"
        />
      </motion.div>

      {/* ROI Metrics */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Best ROI"
            value={`${bestRoi.roi.percentage.toFixed(0)}%`}
            detail={bestRoi.vendorName}
            icon={<Target className="h-4 w-4" />}
            gradient="forest"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Fastest Payback"
            value={`${fastestPayback.roi.paybackMonths} months`}
            detail={fastestPayback.vendorName}
            icon={<Clock className="h-4 w-4" />}
            gradient="ocean"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Max FTE Savings"
            value={`${Math.max(...results.map((r) => r.ops.fteSaved)).toFixed(1)}`}
            detail="Full-time equivalents"
            icon={<Users className="h-4 w-4" />}
            gradient="royal"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Total Annual Savings"
            value={`$${Math.max(...results.map((r) => r.roi.annualSavings)).toLocaleString()}`}
            detail="Best case scenario"
            icon={<DollarSign className="h-4 w-4" />}
            gradient="sunset"
          />
        </motion.div>
      </motion.div>

      {/* ROI Comparison Chart */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              ROI vs Payback Period Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="payback" name="Payback Period" unit=" months" />
                <YAxis dataKey="roi" name="ROI" unit="%" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value, name) => [
                    name === "roi" ? `${value}%` : `${value} months`,
                    name === "roi" ? "ROI" : "Payback Period",
                  ]}
                  labelFormatter={(label) => `Vendor: ${roiData[label]?.name || "Unknown"}`}
                />
                <Scatter dataKey="roi" fill="#00D4AA" r={8} />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Productivity Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                FTE Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productivityImpact}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fteSaved" fill="#00D4AA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Efficiency Gains
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {productivityImpact.map((item, index) => (
                <div key={item.vendor} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.vendor}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.efficiencyGain.toFixed(0)}% efficiency gain
                    </span>
                  </div>
                  <Progress value={Math.min(item.efficiencyGain, 100)} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    ${item.annualSaving.toLocaleString()} annual savings
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payback Timeline */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Cumulative Savings Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={paybackAnalysis.slice(0, 24)}>
                {" "}
                {/* Show first 24 months */}
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={(value) => `M${value}`} />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Cumulative Savings"]}
                  labelFormatter={(label) => `Month ${label}`}
                />
                {results.map((result, index) => (
                  <Line
                    key={result.vendor}
                    type="monotone"
                    dataKey={result.vendorName}
                    stroke={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Business Value Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp}>
          <GradientCard gradient="forest">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Best ROI Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{bestRoi.vendorName}</div>
                  <div className="text-muted-foreground">Highest Return on Investment</div>
                </div>
                <div className="flex justify-center">
                  <ProgressRing progress={Math.min(bestRoi.roi.percentage, 100)} size={80} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">${bestRoi.roi.annualSavings.toLocaleString()}</div>
                    <div className="text-muted-foreground">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{bestRoi.roi.paybackMonths} months</div>
                    <div className="text-muted-foreground">Payback Period</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </GradientCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <GradientCard gradient="ocean">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Fastest Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{fastestPayback.vendorName}</div>
                  <div className="text-muted-foreground">Quickest Time to Value</div>
                </div>
                <div className="flex justify-center">
                  <ProgressRing progress={Math.max(0, 100 - (fastestPayback.roi.paybackMonths / 24) * 100)} size={80} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{fastestPayback.roi.paybackMonths}</div>
                    <div className="text-muted-foreground">Months to Payback</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{fastestPayback.ops.fteSaved.toFixed(1)}</div>
                    <div className="text-muted-foreground">FTE Saved</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </GradientCard>
        </motion.div>
      </div>
    </motion.div>
  )
}
