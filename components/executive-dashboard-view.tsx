"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { staggerChildren, fadeInUp, VIBRANT_COLORS, GradientCard, GRADIENTS } from "./shared-ui"
import { Award, Shield, Clock, DollarSign, Target } from "lucide-react"

interface ExecutiveDashboardViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveDashboardView({ results, config }: ExecutiveDashboardViewProps) {
  // Safe results processing
  const safeResults = useMemo(() => {
    return (results || []).filter((result) => result && typeof result === "object" && result.totalCost)
  }, [results])

  const topPerformer = useMemo(() => {
    if (!safeResults.length) return null
    return safeResults.reduce((best, current) => {
      const currentScore = (current.roi?.percentage || 0) - (current.totalCost || 0) / 1000000
      const bestScore = (best.roi?.percentage || 0) - (best.totalCost || 0) / 1000000
      return currentScore > bestScore ? current : best
    })
  }, [safeResults])

  const costComparisonData = useMemo(() => {
    return safeResults.map((result) => ({
      vendor: result.vendorName || "Unknown",
      totalCost: (result.totalCost || 0) / 1000, // Convert to thousands
      roi: result.roi?.percentage || 0,
      payback: result.roi?.paybackPeriod || 0,
    }))
  }, [safeResults])

  const riskReductionData = useMemo(() => {
    return safeResults.map((result) => ({
      vendor: result.vendorName || "Unknown",
      breachReduction: (result.riskMetrics?.breachProbabilityReduction || 0) * 100,
      complianceScore: result.riskMetrics?.complianceScore || 0,
    }))
  }, [safeResults])

  const implementationData = useMemo(() => {
    return safeResults.map((result) => ({
      vendor: result.vendorName || "Unknown",
      timeToValue: result.implementationTime || 6,
      complexity: result.fteRequirement || 1,
    }))
  }, [safeResults])

  const totalInvestment = useMemo(() => {
    return safeResults.reduce((sum, result) => sum + (result.totalCost || 0), 0)
  }, [safeResults])

  const averageROI = useMemo(() => {
    if (!safeResults.length) return 0
    return safeResults.reduce((sum, result) => sum + (result.roi?.percentage || 0), 0) / safeResults.length
  }, [safeResults])

  const averagePayback = useMemo(() => {
    if (!safeResults.length) return 0
    return safeResults.reduce((sum, result) => sum + (result.roi?.paybackPeriod || 0), 0) / safeResults.length
  }, [safeResults])

  const riskReduction = useMemo(() => {
    if (!safeResults.length) return 0
    return (
      safeResults.reduce((sum, result) => sum + (result.riskMetrics?.breachProbabilityReduction || 0) * 100, 0) /
      safeResults.length
    )
  }, [safeResults])

  if (!safeResults.length) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No data available. Please select vendors to analyze.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Executive Summary Cards */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <GradientCard
            title="Total Investment"
            value={`$${(totalInvestment / 1000000).toFixed(1)}M`}
            subtitle={`Across ${safeResults.length} vendors`}
            gradient={GRADIENTS.primary}
          >
            <div className="mt-2">
              <Badge variant="secondary" className="text-white bg-white/20">
                {config.years || 5} Year Analysis
              </Badge>
            </div>
          </GradientCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <GradientCard
            title="Average ROI"
            value={`${averageROI.toFixed(1)}%`}
            subtitle="Expected return on investment"
            gradient={GRADIENTS.success}
          >
            <div className="mt-2">
              <Badge variant="secondary" className="text-white bg-white/20">
                {averageROI > 15 ? "Excellent" : averageROI > 10 ? "Good" : "Fair"}
              </Badge>
            </div>
          </GradientCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <GradientCard
            title="Risk Reduction"
            value={`${riskReduction.toFixed(0)}%`}
            subtitle="Average breach probability reduction"
            gradient={GRADIENTS.warning}
          >
            <div className="mt-2">
              <Badge variant="secondary" className="text-white bg-white/20">
                Security Improvement
              </Badge>
            </div>
          </GradientCard>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <GradientCard
            title="Payback Period"
            value={`${averagePayback.toFixed(1)}mo`}
            subtitle="Average time to break even"
            gradient={GRADIENTS.danger}
          >
            <div className="mt-2">
              <Badge variant="secondary" className="text-white bg-white/20">
                Time to Value
              </Badge>
            </div>
          </GradientCard>
        </motion.div>
      </motion.div>

      {/* Top Performer Highlight */}
      {topPerformer && (
        <motion.div variants={fadeInUp}>
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Top Performer: {topPerformer.vendorName}</h3>
                    <p className="text-muted-foreground">Best overall value proposition</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {(topPerformer.roi?.percentage || 0).toFixed(1)}% ROI
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${((topPerformer.totalCost || 0) / 1000000).toFixed(1)}M Total Cost
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost vs ROI Analysis */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Cost vs ROI Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis yAxisId="cost" orientation="left" tickFormatter={(value) => `$${value}K`} />
                  <YAxis yAxisId="roi" orientation="right" tickFormatter={(value) => `${value}%`} />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === "totalCost" ? `$${value.toLocaleString()}K` : `${value.toFixed(1)}%`,
                      name === "totalCost" ? "Total Cost" : "ROI",
                    ]}
                  />
                  <Legend />
                  <Bar yAxisId="cost" dataKey="totalCost" fill={VIBRANT_COLORS[0]} name="Total Cost ($K)" />
                  <Bar yAxisId="roi" dataKey="roi" fill={VIBRANT_COLORS[1]} name="ROI (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Reduction Comparison */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Risk Reduction</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskReductionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Risk Reduction"]} />
                  <Bar dataKey="breachReduction" fill={VIBRANT_COLORS[2]} name="Breach Reduction %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Implementation Timeline */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Implementation Timeline & Complexity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={implementationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis tickFormatter={(value) => `${value}mo`} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "timeToValue" ? `${value} months` : `${value} FTE`,
                    name === "timeToValue" ? "Time to Value" : "FTE Required",
                  ]}
                />
                <Legend />
                <Bar dataKey="timeToValue" fill={VIBRANT_COLORS[3]} name="Time to Value (months)" />
                <Bar dataKey="complexity" fill={VIBRANT_COLORS[4]} name="FTE Required" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vendor Scorecard */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Vendor Scorecard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {safeResults.map((result, index) => {
                const roi = result.roi?.percentage || 0
                const cost = result.totalCost || 0
                const risk = (result.riskMetrics?.breachProbabilityReduction || 0) * 100
                const implementation = result.implementationTime || 6

                // Calculate overall score (0-100)
                const costScore = Math.max(0, 100 - (cost / 1000000) * 10) // Lower cost = higher score
                const roiScore = Math.min(100, Math.max(0, roi * 2)) // Higher ROI = higher score
                const riskScore = risk // Direct mapping
                const implScore = Math.max(0, 100 - implementation * 5) // Faster implementation = higher score

                const overallScore = (costScore + roiScore + riskScore + implScore) / 4

                return (
                  <div key={result.vendor} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">{result.vendorName}</h4>
                      <Badge
                        variant={overallScore > 75 ? "default" : overallScore > 50 ? "secondary" : "destructive"}
                        className="text-sm px-3 py-1"
                      >
                        {Math.round(overallScore)}/100 Overall Score
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Cost Efficiency</p>
                        <Progress value={costScore} className="mb-1" />
                        <p className="text-xs text-muted-foreground">{Math.round(costScore)}/100</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">ROI Potential</p>
                        <Progress value={roiScore} className="mb-1" />
                        <p className="text-xs text-muted-foreground">{Math.round(roiScore)}/100</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Risk Reduction</p>
                        <Progress value={riskScore} className="mb-1" />
                        <p className="text-xs text-muted-foreground">{Math.round(riskScore)}/100</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Implementation</p>
                        <Progress value={implScore} className="mb-1" />
                        <p className="text-xs text-muted-foreground">{Math.round(implScore)}/100</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
