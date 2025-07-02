"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Clock, Target, Zap, Shield, DollarSign, Award } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import {
  SectionTitle,
  MetricCard,
  GradientCard,
  StatusBadge,
  ProgressRing,
  fadeInUp,
  staggerContainer,
  colorPalette,
} from "./shared-ui"

interface BusinessImpactViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function BusinessImpactView({ results, config }: BusinessImpactViewProps) {
  const safeResults = results || []

  // Calculate business impact metrics
  const portnoxResult = safeResults.find((r) => r.vendor === "portnox")
  const avgCompetitorROI =
    safeResults.filter((r) => r.vendor !== "portnox").reduce((sum, r) => sum + (r.roi?.percentage || 0), 0) /
    Math.max(safeResults.length - 1, 1)

  const businessMetrics = {
    roiImprovement: (portnoxResult?.roi?.percentage || 0) - avgCompetitorROI,
    paybackAcceleration: 24 - (portnoxResult?.roi?.paybackMonths || 24),
    operationalEfficiency: 85,
    riskReduction: (portnoxResult?.risk?.breachReduction || 0) * 100,
    complianceScore: 92,
    userProductivity: 78,
  }

  // ROI projection data
  const roiProjectionData = Array.from({ length: config.years || 5 }, (_, i) => {
    const year = i + 1
    const portnoxROI = Math.min(100, 15 + year * 12)
    const competitorROI = Math.min(80, 8 + year * 8)
    return {
      year: `Year ${year}`,
      portnox: portnoxROI,
      competitor: competitorROI,
      savings: (portnoxROI - competitorROI) * 1000,
    }
  })

  // Business value categories
  const businessValueData = [
    { category: "Cost Reduction", portnox: 95, competitor: 70 },
    { category: "Security Posture", portnox: 92, competitor: 75 },
    { category: "Operational Efficiency", portnox: 88, competitor: 65 },
    { category: "Compliance", portnox: 94, competitor: 78 },
    { category: "User Experience", portnox: 85, competitor: 60 },
    { category: "Scalability", portnox: 90, competitor: 68 },
  ]

  // Strategic impact assessment
  const strategicImpacts = [
    {
      area: "Digital Transformation",
      impact: "High",
      description: "Accelerates zero-trust adoption and cloud migration",
      value: "$2.5M over 3 years",
    },
    {
      area: "Risk Mitigation",
      impact: "High",
      description: "Reduces breach probability by 60% and compliance costs",
      value: "$1.8M risk avoidance",
    },
    {
      area: "Operational Excellence",
      impact: "Medium",
      description: "Streamlines IT operations and reduces manual processes",
      value: "2.5 FTE savings",
    },
    {
      area: "Innovation Enablement",
      impact: "Medium",
      description: "Frees up resources for strategic initiatives",
      value: "25% faster deployment",
    },
  ]

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <SectionTitle
          title="Business Impact Analysis"
          subtitle="Strategic value assessment and ROI projections"
          icon={<Target className="h-6 w-6" />}
        />
      </motion.div>

      {/* Key Business Metrics */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="ROI Improvement"
          value={`+${businessMetrics.roiImprovement.toFixed(1)}%`}
          change="vs competitors"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Payback Acceleration"
          value={`${businessMetrics.paybackAcceleration} months`}
          change="faster than average"
          changeType="positive"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          title="Risk Reduction"
          value={`${businessMetrics.riskReduction.toFixed(0)}%`}
          change="breach probability"
          changeType="positive"
          icon={<Shield className="h-5 w-5" />}
        />
        <MetricCard
          title="Efficiency Gain"
          value={`${businessMetrics.operationalEfficiency}%`}
          change="operational improvement"
          changeType="positive"
          icon={<Zap className="h-5 w-5" />}
        />
      </motion.div>

      {/* ROI Projection and Business Value */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI Projection Over Time */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>ROI Projection Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={roiProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip
                    formatter={(value, name) => [`${value}%`, name === "portnox" ? "Portnox ROI" : "Competitor ROI"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="portnox"
                    stackId="1"
                    stroke={colorPalette.success[0]}
                    fill={colorPalette.success[0]}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="competitor"
                    stackId="2"
                    stroke={colorPalette.neutral[0]}
                    fill={colorPalette.neutral[0]}
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Value Radar */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Business Value Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={businessValueData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar
                    name="Portnox"
                    dataKey="portnox"
                    stroke={colorPalette.success[0]}
                    fill={colorPalette.success[0]}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Competitor"
                    dataKey="competitor"
                    stroke={colorPalette.neutral[0]}
                    fill={colorPalette.neutral[0]}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Strategic Impact Assessment */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Strategic Impact Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategicImpacts.map((impact, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{impact.area}</h4>
                    <StatusBadge
                      status={impact.impact.toLowerCase() as "high" | "medium" | "low"}
                      label={impact.impact}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{impact.description}</p>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">{impact.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Business Readiness Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp}>
          <GradientCard title="Operational Readiness" gradient="success">
            <div className="space-y-4">
              <ProgressRing value={businessMetrics.operationalEfficiency} size={100} />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Process Automation</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Staff Training</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </GradientCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <GradientCard title="Compliance Score" gradient="primary">
            <div className="space-y-4">
              <ProgressRing value={businessMetrics.complianceScore} size={100} />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>SOX Compliance</span>
                  <span>95%</span>
                </div>
                <Progress value={95} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>GDPR Readiness</span>
                  <span>89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
            </div>
          </GradientCard>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <GradientCard title="User Adoption" gradient="ocean">
            <div className="space-y-4">
              <ProgressRing value={businessMetrics.userProductivity} size={100} />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>User Satisfaction</span>
                  <span>84%</span>
                </div>
                <Progress value={84} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Training Complete</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
          </GradientCard>
        </motion.div>
      </div>

      {/* Financial Impact Summary */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Financial Impact Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${((portnoxResult?.total || 0) * 0.3).toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Annual Cost Savings</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {(portnoxResult?.roi?.percentage || 0).toFixed(0)}%
                </div>
                <div className="text-sm text-muted-foreground">3-Year ROI</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {((portnoxResult?.roi?.paybackMonths || 24) / 12).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Years to Payback</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
