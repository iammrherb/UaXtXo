"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, MetricCard, GradientCard, staggerChildren, fadeInUp, VIBRANT_COLORS } from "./shared-ui"
import { TrendingUp, DollarSign, Clock, Target, Award, Zap } from "lucide-react"

interface ExecutiveDashboardViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results, config }: ExecutiveDashboardViewProps) {
  // Safe data processing with fallbacks
  const safeResults = useMemo(() => {
    if (!results || !Array.isArray(results)) return []
    return results.filter((result) => result && typeof result === "object")
  }, [results])

  // Key metrics calculations with safe fallbacks
  const keyMetrics = useMemo(() => {
    if (safeResults.length === 0) {
      return {
        lowestTCO: 0,
        bestROI: 0,
        fastestPayback: 0,
        totalSavings: 0,
        recommendedVendor: "N/A",
      }
    }

    const costs = safeResults.map((r) => r.totalCost || 0)
    const rois = safeResults.map((r) => r.roi?.percentage || 0)
    const paybacks = safeResults.map((r) => r.roi?.paybackPeriod || 0)

    const lowestTCO = Math.min(...costs)
    const bestROI = Math.max(...rois)
    const fastestPayback = Math.min(...paybacks.filter((p) => p > 0))
    const highestCost = Math.max(...costs)
    const totalSavings = highestCost - lowestTCO

    const recommendedVendor = safeResults.find((r) => (r.totalCost || 0) === lowestTCO)?.vendorName || "N/A"

    return {
      lowestTCO,
      bestROI,
      fastestPayback,
      totalSavings,
      recommendedVendor,
    }
  }, [safeResults])

  // Chart data preparation
  const tcoComparisonData = useMemo(() => {
    return safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor || "Unknown",
      totalCost: result.totalCost || 0,
      roi: result.roi?.percentage || 0,
      payback: result.roi?.paybackPeriod || 0,
    }))
  }, [safeResults])

  const costBreakdownData = useMemo(() => {
    return safeResults.map((result) => {
      const categories = result.costCategories || {}
      return {
        vendor: result.vendorName || result.vendor || "Unknown",
        licensing: categories.licensing || 0,
        hardware: categories.hardware || 0,
        services: categories.professionalServices || 0,
        training: categories.training || 0,
        maintenance: categories.maintenance || 0,
        operational: categories.operational || 0,
      }
    })
  }, [safeResults])

  const roiTrendData = useMemo(() => {
    const years = config?.years || 3
    return Array.from({ length: years }, (_, i) => {
      const year = i + 1
      const yearData: any = { year }

      safeResults.forEach((result) => {
        const annualROI = ((result.roi?.percentage || 0) * year) / years
        yearData[result.vendorName || result.vendor || "Unknown"] = annualROI
      })
      return yearData
    })
  }, [safeResults, config])

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<Target className="h-6 w-6" />}
          title="Executive Dashboard"
          subtitle="Strategic overview of NAC investment analysis"
        />
      </motion.div>

      {/* Key Metrics */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <GradientCard
            title="Recommended Solution"
            value={keyMetrics.recommendedVendor}
            subtitle="Lowest TCO"
            gradient="primary"
            icon={<Award className="h-6 w-6" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Total Cost Savings"
            value={`$${keyMetrics.totalSavings.toLocaleString()}`}
            change={`${((keyMetrics.totalSavings / (keyMetrics.lowestTCO || 1)) * 100).toFixed(1)}%`}
            changeType="positive"
            icon={<DollarSign className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Best ROI"
            value={`${keyMetrics.bestROI.toFixed(1)}%`}
            detail="3-year projection"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Fastest Payback"
            value={`${Math.round(keyMetrics.fastestPayback)} months`}
            detail="Break-even point"
            icon={<Clock className="h-4 w-4" />}
          />
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* TCO Comparison */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Total Cost of Ownership
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tcoComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="totalCost" fill={VIBRANT_COLORS[0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* ROI Comparison */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Return on Investment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tcoComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                  <Bar dataKey="roi" fill={VIBRANT_COLORS[1]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Cost Breakdown */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Cost Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Bar dataKey="licensing" stackId="a" fill={VIBRANT_COLORS[0]} name="Licensing" />
                <Bar dataKey="hardware" stackId="a" fill={VIBRANT_COLORS[1]} name="Hardware" />
                <Bar dataKey="services" stackId="a" fill={VIBRANT_COLORS[2]} name="Services" />
                <Bar dataKey="training" stackId="a" fill={VIBRANT_COLORS[3]} name="Training" />
                <Bar dataKey="maintenance" stackId="a" fill={VIBRANT_COLORS[4]} name="Maintenance" />
                <Bar dataKey="operational" stackId="a" fill={VIBRANT_COLORS[5]} name="Operational" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vendor Highlights */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Vendor Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {safeResults.slice(0, 3).map((result, index) => (
                <div key={result.vendor || index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{result.vendorName || result.vendor || "Unknown"}</h4>
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index === 0 ? "Recommended" : `Option ${index + 1}`}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Cost:</span>
                      <span className="font-medium">${(result.totalCost || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ROI:</span>
                      <span className="font-medium">{(result.roi?.percentage || 0).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payback:</span>
                      <span className="font-medium">{Math.round(result.roi?.paybackPeriod || 0)} months</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Implementation Risk</span>
                        <span>{result.riskMetrics?.operationalRisk || "medium"}</span>
                      </div>
                      <Progress
                        value={
                          result.riskMetrics?.operationalRisk === "low"
                            ? 25
                            : result.riskMetrics?.operationalRisk === "medium"
                              ? 50
                              : 75
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ROI Trend */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              ROI Projection Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={roiTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                {safeResults.map((result, index) => (
                  <Line
                    key={result.vendor}
                    type="monotone"
                    dataKey={result.vendorName || result.vendor}
                    stroke={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
