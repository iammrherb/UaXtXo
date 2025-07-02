"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { staggerChildren, fadeInUp, MetricCard, VIBRANT_COLORS } from "./shared-ui"
import { TrendingUp, Users, Zap, Target, Clock, DollarSign, Award, Activity } from "lucide-react"

interface BusinessImpactViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function BusinessImpactView({ results, config }: BusinessImpactViewProps) {
  // Safe results processing
  const safeResults = useMemo(() => {
    return (results || []).filter((result) => result && typeof result === "object" && result.totalCost)
  }, [results])

  const businessMetrics = useMemo(() => {
    return safeResults.map((result) => {
      const roi = result.roi?.percentage || 0
      const payback = result.roi?.paybackPeriod || 0
      const cost = result.totalCost || 0

      return {
        vendor: result.vendorName || "Unknown",
        roi: roi,
        payback: payback,
        productivity: Math.min(100, 40 + roi * 0.5), // Simulated productivity gain
        efficiency: Math.min(100, 50 + roi * 0.3), // Simulated efficiency improvement
        userSatisfaction: Math.min(100, 60 + roi * 0.4), // Simulated user satisfaction
        costSavings: Math.max(0, roi * cost * 0.01), // Annual cost savings
        riskReduction: (result.riskMetrics?.breachProbabilityReduction || 0) * 100,
      }
    })
  }, [safeResults])

  const roiProjection = useMemo(() => {
    const years = config.years || 5
    return Array.from({ length: years }, (_, index) => {
      const year = index + 1
      const yearData: any = { year: `Year ${year}` }

      safeResults.forEach((result) => {
        const baseROI = result.roi?.percentage || 0
        // ROI typically improves over time as benefits compound
        const projectedROI = baseROI * (1 + 0.1 * (year - 1))
        yearData[result.vendorName || "Unknown"] = Math.min(100, projectedROI)
      })

      return yearData
    })
  }, [safeResults, config.years])

  const impactCategories = useMemo(() => {
    const categories = ["Productivity", "Efficiency", "Security", "Compliance", "User Experience"]
    return categories.map((category) => {
      const categoryData: any = { category }

      safeResults.forEach((result) => {
        const roi = result.roi?.percentage || 0
        const riskReduction = (result.riskMetrics?.breachProbabilityReduction || 0) * 100

        let impact = 0
        switch (category) {
          case "Productivity":
            impact = Math.min(100, 40 + roi * 0.8)
            break
          case "Efficiency":
            impact = Math.min(100, 50 + roi * 0.6)
            break
          case "Security":
            impact = riskReduction
            break
          case "Compliance":
            impact = Math.min(100, (result.riskMetrics?.complianceScore || 0) + 20)
            break
          case "User Experience":
            impact = Math.min(100, 60 + roi * 0.4)
            break
        }

        categoryData[result.vendorName || "Unknown"] = impact
      })

      return categoryData
    })
  }, [safeResults])

  const strategicImpact = useMemo(() => {
    return safeResults.map((result) => {
      const roi = result.roi?.percentage || 0
      const riskReduction = (result.riskMetrics?.breachProbabilityReduction || 0) * 100

      return {
        vendor: result.vendorName || "Unknown",
        strategic: roi > 20 ? "High" : roi > 10 ? "Medium" : "Low",
        operational: riskReduction > 60 ? "High" : riskReduction > 40 ? "Medium" : "Low",
        financial: roi > 15 ? "High" : roi > 8 ? "Medium" : "Low",
        timeline:
          (result.implementationTime || 6) < 4 ? "Fast" : (result.implementationTime || 6) < 8 ? "Medium" : "Slow",
      }
    })
  }, [safeResults])

  const totalBusinessValue = useMemo(() => {
    return safeResults.reduce((sum, result) => {
      const roi = result.roi?.percentage || 0
      const cost = result.totalCost || 0
      return sum + roi * cost * 0.01 // Annual value creation
    }, 0)
  }, [safeResults])

  const averageProductivityGain = useMemo(() => {
    if (!businessMetrics.length) return 0
    return businessMetrics.reduce((sum, metric) => sum + metric.productivity, 0) / businessMetrics.length
  }, [businessMetrics])

  if (!safeResults.length) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No business impact data available. Please select vendors to analyze.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Business Impact Overview */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Total Business Value"
            value={`$${(totalBusinessValue / 1000000).toFixed(1)}M`}
            detail="Annual value creation"
            icon={<DollarSign className="h-5 w-5" />}
            trend="up"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Productivity Gain"
            value={`${averageProductivityGain.toFixed(0)}%`}
            detail="Average improvement"
            icon={<TrendingUp className="h-5 w-5" />}
            trend="up"
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Strategic Impact"
            value={strategicImpact.filter((s) => s.strategic === "High").length}
            detail="High-impact vendors"
            icon={<Target className="h-5 w-5" />}
          />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <MetricCard
            title="Implementation Speed"
            value={strategicImpact.filter((s) => s.timeline === "Fast").length}
            detail="Fast deployment options"
            icon={<Clock className="h-5 w-5" />}
            trend="up"
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Impact Radar */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Business Impact Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={impactCategories}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  {safeResults.map((result, i) => (
                    <Radar
                      key={result.vendor}
                      name={result.vendorName}
                      dataKey={result.vendorName}
                      stroke={VIBRANT_COLORS[i % VIBRANT_COLORS.length]}
                      fill={VIBRANT_COLORS[i % VIBRANT_COLORS.length]}
                      fillOpacity={0.6}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
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
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={roiProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "ROI"]} />
                  <Legend />
                  {safeResults.map((result, index) => (
                    <Area
                      key={result.vendor}
                      type="monotone"
                      dataKey={result.vendorName}
                      stackId="1"
                      stroke={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                      fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                      fillOpacity={0.6}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Business Metrics Comparison */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Business Metrics Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={businessMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="productivity" fill={VIBRANT_COLORS[0]} name="Productivity Gain %" />
                <Bar dataKey="efficiency" fill={VIBRANT_COLORS[1]} name="Efficiency Improvement %" />
                <Bar dataKey="userSatisfaction" fill={VIBRANT_COLORS[2]} name="User Satisfaction %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strategic Assessment */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Strategic Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategicImpact.map((impact, index) => (
                <div key={impact.vendor} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-4">{impact.vendor}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Strategic Impact</span>
                      <Badge
                        variant={
                          impact.strategic === "High"
                            ? "default"
                            : impact.strategic === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {impact.strategic}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Operational Impact</span>
                      <Badge
                        variant={
                          impact.operational === "High"
                            ? "default"
                            : impact.operational === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {impact.operational}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Financial Impact</span>
                      <Badge
                        variant={
                          impact.financial === "High"
                            ? "default"
                            : impact.financial === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {impact.financial}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Implementation</span>
                      <Badge
                        variant={
                          impact.timeline === "Fast"
                            ? "default"
                            : impact.timeline === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {impact.timeline}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ROI Improvement Analysis */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>ROI Improvement Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {businessMetrics.map((metric, index) => (
                <div key={metric.vendor} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">{metric.vendor}</h4>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{metric.roi.toFixed(1)}% ROI</div>
                      <div className="text-sm text-muted-foreground">{metric.payback.toFixed(1)} month payback</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Productivity Gain</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.productivity} className="flex-1" />
                        <span className="text-sm font-medium w-12">{Math.round(metric.productivity)}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Efficiency</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.efficiency} className="flex-1" />
                        <span className="text-sm font-medium w-12">{Math.round(metric.efficiency)}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">User Satisfaction</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.userSatisfaction} className="flex-1" />
                        <span className="text-sm font-medium w-12">{Math.round(metric.userSatisfaction)}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Risk Reduction</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={metric.riskReduction} className="flex-1" />
                        <span className="text-sm font-medium w-12">{Math.round(metric.riskReduction)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Annual Cost Savings:</span>
                      <span className="font-medium">${metric.costSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
