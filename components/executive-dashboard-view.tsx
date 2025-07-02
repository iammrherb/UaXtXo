"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
import { TrendingUp, DollarSign, Shield, Clock, AlertTriangle, CheckCircle, Target } from "lucide-react"
import {
  SectionTitle,
  MetricCard,
  GradientCard,
  StatusBadge,
  staggerChildren,
  fadeInUp,
  VIBRANT_COLORS,
} from "./shared-ui"

interface ExecutiveDashboardViewProps {
  results: any
  selectedVendors: string[]
}

export default function ExecutiveDashboardView({ results, selectedVendors }: ExecutiveDashboardViewProps) {
  // Safe data access with fallbacks
  const portnoxResult = results?.find((r: any) => r?.vendor === "Portnox") || {}
  const competitorResults = results?.filter((r: any) => r?.vendor !== "Portnox") || []

  // Calculate metrics with safe fallbacks
  const totalSavings = portnoxResult?.totalCost
    ? Math.max(...competitorResults.map((r: any) => r?.totalCost || 0)) - (portnoxResult.totalCost || 0)
    : 0

  const roiValue = portnoxResult?.roi || 0
  const paybackMonths = portnoxResult?.paybackPeriod || 0
  const riskReduction = 85 // Static value for demo

  // Chart data
  const costComparisonData =
    results?.map((result: any) => ({
      vendor: result?.vendor || "Unknown",
      totalCost: result?.totalCost || 0,
      yearOne: result?.yearOneCost || 0,
      yearThree: result?.yearThreeCost || 0,
    })) || []

  const roiProjectionData = [
    { year: "Year 1", roi: Math.max(0, roiValue * 0.3) },
    { year: "Year 2", roi: Math.max(0, roiValue * 0.7) },
    { year: "Year 3", roi: Math.max(0, roiValue) },
    { year: "Year 4", roi: Math.max(0, roiValue * 1.2) },
    { year: "Year 5", roi: Math.max(0, roiValue * 1.5) },
  ]

  const riskAssessmentData = [
    { category: "Security Gaps", current: 75, withPortnox: 15 },
    { category: "Compliance Risk", current: 60, withPortnox: 10 },
    { category: "Operational Risk", current: 45, withPortnox: 8 },
    { category: "Financial Risk", current: 55, withPortnox: 12 },
  ]

  const vendorScoreData =
    results?.map((result: any, index: number) => ({
      vendor: result?.vendor || "Unknown",
      score: result?.overallScore || Math.random() * 100,
      color: VIBRANT_COLORS[index % VIBRANT_COLORS.length],
    })) || []

  return (
    <motion.div initial="initial" animate="animate" variants={staggerChildren} className="space-y-8">
      <SectionTitle
        title="Executive Dashboard"
        subtitle="Strategic overview of your NAC investment analysis"
        icon={<Target className="h-6 w-6" />}
      />

      {/* Key Metrics Grid */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Cost Savings"
          value={`$${(totalSavings / 1000).toFixed(0)}K`}
          change="+23% vs alternatives"
          changeType="positive"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <MetricCard
          title="ROI Improvement"
          value={`${Math.round(roiValue)}%`}
          change="+15% over 3 years"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Payback Period"
          value={`${Math.round(paybackMonths)} months`}
          change="3 months faster"
          changeType="positive"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          title="Risk Reduction"
          value={`${riskReduction}%`}
          change="Critical improvement"
          changeType="positive"
          icon={<Shield className="h-5 w-5" />}
        />
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Comparison Chart */}
        <GradientCard title="Total Cost of Ownership Comparison" gradient="primary">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip
                  formatter={(value: any) => [`$${(value / 1000).toFixed(0)}K`, "Total Cost"]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="totalCost" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GradientCard>

        {/* ROI Projection Chart */}
        <GradientCard title="ROI Projection Over Time" gradient="success">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roiProjectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  formatter={(value: any) => [`${Math.round(value)}%`, "ROI"]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Area type="monotone" dataKey="roi" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GradientCard>
      </div>

      {/* Risk Assessment and Vendor Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <span>Risk Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAssessmentData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.category}</span>
                    <span className="text-muted-foreground">
                      {item.current}% → {item.withPortnox}%
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Progress value={item.current} className="h-2" />
                      <span className="text-xs text-muted-foreground">Current</span>
                    </div>
                    <div className="flex-1">
                      <Progress value={item.withPortnox} className="h-2" />
                      <span className="text-xs text-muted-foreground">With Portnox</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vendor Performance Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Vendor Performance Scores</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={vendorScoreData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="score"
                    label={({ vendor, score }) => `${vendor}: ${Math.round(score)}`}
                  >
                    {vendorScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [Math.round(value), "Score"]}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <StatusBadge status="high" label="High Priority" />
              <h4 className="font-semibold">Immediate Implementation</h4>
              <p className="text-sm text-muted-foreground">
                Deploy Portnox NAC solution to achieve immediate security improvements and cost savings.
              </p>
            </div>
            <div className="space-y-2">
              <StatusBadge status="medium" label="Medium Priority" />
              <h4 className="font-semibold">Staff Training</h4>
              <p className="text-sm text-muted-foreground">
                Invest in comprehensive training programs to maximize ROI and operational efficiency.
              </p>
            </div>
            <div className="space-y-2">
              <StatusBadge status="low" label="Low Priority" />
              <h4 className="font-semibold">Future Expansion</h4>
              <p className="text-sm text-muted-foreground">
                Plan for additional security integrations and advanced features in year 2-3.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
