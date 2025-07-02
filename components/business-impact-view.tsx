"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Users, Clock, Shield, Zap, Target, Award } from "lucide-react"
import {
  SectionTitle,
  MetricCard,
  GradientCard,
  StatusBadge,
  ProgressRing,
  staggerChildren,
  fadeInUp,
} from "./shared-ui"

interface BusinessImpactViewProps {
  results: any
  selectedVendors: string[]
}

export default function BusinessImpactView({ results, selectedVendors }: BusinessImpactViewProps) {
  // Safe data access with fallbacks
  const portnoxResult = results?.find((r: any) => r?.vendor === "Portnox") || {}
  const competitorResults = results?.filter((r: any) => r?.vendor !== "Portnox") || []

  // Business impact metrics
  const businessMetrics = {
    fteReduction: 2.5,
    productivityGain: 35,
    incidentReduction: 78,
    complianceImprovement: 92,
    timeToValue: 3, // months
    userSatisfaction: 94,
  }

  // ROI breakdown data
  const roiBreakdownData = [
    { category: "Staff Efficiency", value: 45, color: "#10B981" },
    { category: "Incident Reduction", value: 30, color: "#3B82F6" },
    { category: "Compliance Savings", value: 15, color: "#F59E0B" },
    { category: "Infrastructure Optimization", value: 10, color: "#EF4444" },
  ]

  // Productivity impact over time
  const productivityData = [
    { month: "Month 1", baseline: 100, withPortnox: 105 },
    { month: "Month 3", baseline: 100, withPortnox: 115 },
    { month: "Month 6", baseline: 100, withPortnox: 125 },
    { month: "Month 12", baseline: 100, withPortnox: 135 },
    { month: "Month 18", baseline: 100, withPortnox: 140 },
    { month: "Month 24", baseline: 100, withPortnox: 145 },
  ]

  // Risk mitigation radar
  const riskMitigationData = [
    { subject: "Data Breaches", current: 65, withPortnox: 95 },
    { subject: "Compliance Violations", current: 70, withPortnox: 92 },
    { subject: "Unauthorized Access", current: 60, withPortnox: 98 },
    { subject: "Network Vulnerabilities", current: 55, withPortnox: 90 },
    { subject: "Insider Threats", current: 45, withPortnox: 85 },
    { subject: "Operational Disruption", current: 75, withPortnox: 95 },
  ]

  // Strategic impact assessment
  const strategicImpacts = [
    {
      category: "Operational Excellence",
      impact: "High",
      description: "Streamlined network access management reduces manual overhead by 60%",
      metrics: ["2.5 FTE reduction", "35% faster incident response", "78% fewer security incidents"],
    },
    {
      category: "Financial Performance",
      impact: "High",
      description: "Significant cost savings through automation and risk reduction",
      metrics: [
        `$${Math.round((portnoxResult?.totalSavings || 0) / 1000)}K total savings`,
        `${Math.round(portnoxResult?.roi || 0)}% ROI`,
        `${Math.round(portnoxResult?.paybackPeriod || 0)} month payback`,
      ],
    },
    {
      category: "Risk Management",
      impact: "Critical",
      description: "Comprehensive security posture improvement across all threat vectors",
      metrics: ["85% risk reduction", "92% compliance improvement", "Zero-trust architecture"],
    },
  ]

  return (
    <motion.div initial="initial" animate="animate" variants={staggerChildren} className="space-y-8">
      <SectionTitle
        title="Business Impact Analysis"
        subtitle="Comprehensive assessment of operational and strategic benefits"
        icon={<Target className="h-6 w-6" />}
      />

      {/* Key Business Metrics */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="FTE Reduction"
          value={`${businessMetrics.fteReduction} FTE`}
          change="Annual savings"
          changeType="positive"
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Productivity Gain"
          value={`${businessMetrics.productivityGain}%`}
          change="Team efficiency"
          changeType="positive"
          icon={<Zap className="h-5 w-5" />}
        />
        <MetricCard
          title="Incident Reduction"
          value={`${businessMetrics.incidentReduction}%`}
          change="Security incidents"
          changeType="positive"
          icon={<Shield className="h-5 w-5" />}
        />
        <MetricCard
          title="Time to Value"
          value={`${businessMetrics.timeToValue} months`}
          change="Implementation"
          changeType="positive"
          icon={<Clock className="h-5 w-5" />}
        />
      </motion.div>

      {/* ROI Breakdown and Productivity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI Contribution Breakdown */}
        <GradientCard title="ROI Contribution by Category" gradient="success">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiBreakdownData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                <YAxis dataKey="category" type="category" width={120} />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, "Contribution"]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="value" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GradientCard>

        {/* Productivity Impact Over Time */}
        <GradientCard title="Productivity Impact Timeline" gradient="primary">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    `${value}%`,
                    name === "baseline" ? "Baseline" : "With Portnox",
                  ]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line type="monotone" dataKey="baseline" stroke="#94A3B8" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="withPortnox" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GradientCard>
      </div>

      {/* Risk Mitigation Radar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Risk Mitigation Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={riskMitigationData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Current State" dataKey="current" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} />
                <Radar name="With Portnox" dataKey="withPortnox" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                <Tooltip
                  formatter={(value: any, name: string) => [
                    `${value}%`,
                    name === "current" ? "Current State" : "With Portnox",
                  ]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Impact Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-purple-500" />
            <span>Strategic Impact Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {strategicImpacts.map((impact, index) => (
              <motion.div key={index} variants={fadeInUp} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{impact.category}</h4>
                  <StatusBadge
                    status={impact.impact === "Critical" ? "high" : impact.impact === "High" ? "medium" : "low"}
                    label={impact.impact}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{impact.description}</p>
                <div className="space-y-2">
                  {impact.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Value Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Business Value Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <ProgressRing value={businessMetrics.userSatisfaction} size={80} />
              <div>
                <p className="font-semibold">User Satisfaction</p>
                <p className="text-sm text-muted-foreground">Post-implementation</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <ProgressRing value={businessMetrics.complianceImprovement} size={80} />
              <div>
                <p className="font-semibold">Compliance Score</p>
                <p className="text-sm text-muted-foreground">Regulatory alignment</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <ProgressRing value={85} size={80} />
              <div>
                <p className="font-semibold">Security Posture</p>
                <p className="text-sm text-muted-foreground">Overall improvement</p>
              </div>
            </div>
            <div className="text-center space-y-2">
              <ProgressRing value={92} size={80} />
              <div>
                <p className="font-semibold">Operational Efficiency</p>
                <p className="text-sm text-muted-foreground">Process optimization</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
