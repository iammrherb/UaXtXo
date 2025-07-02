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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, MetricCard, ProgressRing, staggerChildren, fadeInUp, VIBRANT_COLORS } from "./shared-ui"
import { TrendingUp, Users, Shield, Zap, Target, Clock, DollarSign, Award } from "lucide-react"

interface BusinessImpactViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function BusinessImpactView({ results, config }: BusinessImpactViewProps) {
  // Safe data processing with fallbacks
  const safeResults = useMemo(() => {
    if (!results || !Array.isArray(results)) return []
    return results.filter((result) => result && typeof result === "object")
  }, [results])

  // Business impact calculations
  const businessMetrics = useMemo(() => {
    if (safeResults.length === 0) {
      return {
        productivityGain: 0,
        riskReduction: 0,
        complianceImprovement: 0,
        operationalEfficiency: 0,
        fteSavings: 0,
        annualSavings: 0,
      }
    }

    const avgROI = safeResults.reduce((sum, r) => sum + (r.roi?.percentage || 0), 0) / safeResults.length
    const avgRiskReduction =
      safeResults.reduce((sum, r) => sum + (r.riskMetrics?.breachProbabilityReduction || 0), 0) / safeResults.length
    const avgComplianceScore =
      safeResults.reduce((sum, r) => sum + (r.riskMetrics?.complianceScore || 0), 0) / safeResults.length
    const avgFteReduction = safeResults.reduce((sum, r) => sum + (r.fteRequirement || 0), 0) / safeResults.length

    return {
      productivityGain: Math.min(avgROI * 0.3, 40), // Cap at 40%
      riskReduction: avgRiskReduction * 100,
      complianceImprovement: Math.min(avgComplianceScore, 95),
      operationalEfficiency: Math.min(avgROI * 0.5, 60),
      fteSavings: Math.max(2 - avgFteReduction, 0),
      annualSavings: Math.max(2 - avgFteReduction, 0) * 150000,
    }
  }, [safeResults])

  // ROI improvement data
  const roiImprovementData = useMemo(() => {
    return safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor || "Unknown",
      currentROI: Math.max((result.roi?.percentage || 0) * 0.7, 5), // Simulated current state
      projectedROI: result.roi?.percentage || 0,
      improvement: Math.max((result.roi?.percentage || 0) * 0.3, 2),
    }))
  }, [safeResults])

  // Business value radar data
  const businessValueData = useMemo(() => {
    return safeResults.map((result) => ({
      vendor: result.vendorName || result.vendor || "Unknown",
      Security: Math.min((result.riskMetrics?.breachProbabilityReduction || 0) * 100, 100),
      Compliance: Math.min(result.riskMetrics?.complianceScore || 0, 100),
      Efficiency: Math.min((result.roi?.percentage || 0) * 2, 100),
      Scalability: Math.min(85 + Math.random() * 15, 100), // Simulated
      Integration: Math.min(75 + Math.random() * 20, 100), // Simulated
      Support: Math.min(80 + Math.random() * 15, 100), // Simulated
    }))
  }, [safeResults])

  // Payback acceleration data
  const paybackData = useMemo(() => {
    const years = config?.years || 3
    return Array.from({ length: years }, (_, i) => {
      const year = i + 1
      const yearData: any = { year: `Year ${year}` }

      safeResults.forEach((result) => {
        const paybackPeriod = result.roi?.paybackPeriod || 24
        const monthsElapsed = year * 12
        const paybackProgress = Math.min((monthsElapsed / paybackPeriod) * 100, 100)
        yearData[result.vendorName || result.vendor || "Unknown"] = paybackProgress
      })
      return yearData
    })
  }, [safeResults, config])

  // Strategic impact assessment
  const strategicImpact = useMemo(() => {
    const impacts = [
      {
        category: "Security Posture",
        impact: "High",
        description: "Significant reduction in security incidents and breach probability",
        value: businessMetrics.riskReduction,
      },
      {
        category: "Operational Efficiency",
        impact: "High",
        description: "Streamlined access management and reduced manual processes",
        value: businessMetrics.operationalEfficiency,
      },
      {
        category: "Compliance Readiness",
        impact: "Medium",
        description: "Enhanced audit capabilities and regulatory compliance",
        value: businessMetrics.complianceImprovement,
      },
      {
        category: "Cost Optimization",
        impact: "High",
        description: "Reduced operational overhead and improved resource allocation",
        value: businessMetrics.fteSavings * 50, // Convert to percentage
      },
      {
        category: "User Experience",
        impact: "Medium",
        description: "Improved access experience and reduced friction",
        value: businessMetrics.productivityGain,
      },
    ]
    return impacts
  }, [businessMetrics])

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <SectionTitle
          icon={<TrendingUp className="h-6 w-6" />}
          title="Business Impact Analysis"
          subtitle="Strategic value and operational benefits assessment"
        />
      </motion.div>

      {/* Key Business Metrics */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Productivity Gain"
            value={`${businessMetrics.productivityGain.toFixed(1)}%`}
            detail="User efficiency improvement"
            icon={<Zap className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Risk Reduction"
            value={`${businessMetrics.riskReduction.toFixed(1)}%`}
            detail="Security incident reduction"
            icon={<Shield className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="FTE Savings"
            value={`${businessMetrics.fteSavings.toFixed(1)}`}
            detail="Full-time equivalent reduction"
            icon={<Users className="h-4 w-4" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Annual Savings"
            value={`$${businessMetrics.annualSavings.toLocaleString()}`}
            detail="Operational cost reduction"
            icon={<DollarSign className="h-4 w-4" />}
          />
        </motion.div>
      </motion.div>

      {/* ROI Improvement Chart */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              ROI Improvement Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiImprovementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Bar dataKey="currentROI" fill={VIBRANT_COLORS[3]} name="Current ROI" />
                <Bar dataKey="projectedROI" fill={VIBRANT_COLORS[0]} name="Projected ROI" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Business Value Radar */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Business Value Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={businessValueData[0] ? [businessValueData[0]] : []}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="vendor" tick={false} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar
                    name="Security"
                    dataKey="Security"
                    stroke={VIBRANT_COLORS[0]}
                    fill={VIBRANT_COLORS[0]}
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Compliance"
                    dataKey="Compliance"
                    stroke={VIBRANT_COLORS[1]}
                    fill={VIBRANT_COLORS[1]}
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Efficiency"
                    dataKey="Efficiency"
                    stroke={VIBRANT_COLORS[2]}
                    fill={VIBRANT_COLORS[2]}
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payback Acceleration */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Payback Acceleration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={paybackData}>
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
      </div>

      {/* Strategic Impact Assessment */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Strategic Impact Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {strategicImpact.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{item.category}</h4>
                      <Badge
                        variant={
                          item.impact === "High" ? "default" : item.impact === "Medium" ? "secondary" : "outline"
                        }
                      >
                        {item.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex items-center space-x-3">
                      <Progress value={Math.min(item.value, 100)} className="flex-1" />
                      <span className="text-sm font-medium w-12">{Math.round(item.value)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Business Value Summary */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Business Value Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <ProgressRing value={businessMetrics.operationalEfficiency} size={120} />
                <h4 className="font-semibold mt-4">Operational Efficiency</h4>
                <p className="text-sm text-muted-foreground">Process optimization and automation</p>
              </div>
              <div className="text-center">
                <ProgressRing value={businessMetrics.riskReduction} size={120} />
                <h4 className="font-semibold mt-4">Risk Mitigation</h4>
                <p className="text-sm text-muted-foreground">Security posture improvement</p>
              </div>
              <div className="text-center">
                <ProgressRing value={businessMetrics.complianceImprovement} size={120} />
                <h4 className="font-semibold mt-4">Compliance Readiness</h4>
                <p className="text-sm text-muted-foreground">Regulatory requirement fulfillment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
