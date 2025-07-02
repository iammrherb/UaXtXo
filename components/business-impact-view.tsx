"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, Users, Clock, Target, Zap, Shield } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, MetricCard, ProgressRing, fadeInUp, staggerContainer, colorPalette } from "./shared-ui"

export default function BusinessImpactView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  // Prepare ROI vs Payback scatter data
  const roiPaybackData = results.map((result) => ({
    vendor: result.vendor,
    roi: result.roi,
    payback: result.paybackPeriod,
    totalCost: result.totalCost,
  }))

  // FTE Impact calculation (simplified)
  const fteImpactData = results.map((result) => ({
    vendor: result.vendor,
    currentFTE: 5, // Baseline FTE requirement
    projectedFTE: result.vendor === "portnox" ? 2 : 4, // Portnox reduces FTE needs
    efficiency: result.vendor === "portnox" ? 60 : 20, // Efficiency gain %
  }))

  // Payback timeline data
  const paybackTimelineData = Array.from({ length: 24 }, (_, month) => {
    const monthData: any = { month: month + 1 }
    results.forEach((result) => {
      const monthlySavings = (result.totalCost * 0.15) / 12 // Assume 15% annual savings
      const cumulativeSavings = monthlySavings * (month + 1)
      monthData[result.vendor] = Math.max(0, cumulativeSavings - result.implementation)
    })
    return monthData
  })

  const portnoxResult = results.find((r) => r.vendor === "portnox")
  const bestCompetitor = results.filter((r) => r.vendor !== "portnox").sort((a, b) => a.totalCost - b.totalCost)[0]

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      <SectionTitle
        title="Business Impact & ROI Analysis"
        subtitle="Quantifying the business value and operational impact"
      />

      {/* ROI Metrics */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Portnox ROI"
          value={`${portnoxResult?.roi.toFixed(0) || 0}%`}
          change="3-year projection"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Payback Period"
          value={`${portnoxResult?.paybackPeriod.toFixed(1) || 0} months`}
          change="vs 18 mo avg"
          changeType="positive"
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          title="FTE Reduction"
          value="60%"
          change="operational efficiency"
          changeType="positive"
          icon={<Users className="h-5 w-5" />}
        />
        <MetricCard
          title="Risk Reduction"
          value="85%"
          change="security incidents"
          changeType="positive"
          icon={<Shield className="h-5 w-5" />}
        />
      </motion.div>

      {/* ROI vs Payback Scatter Plot */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>ROI vs Payback Period Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="payback"
                  name="Payback Period"
                  unit=" months"
                  domain={[0, "dataMax + 5"]}
                />
                <YAxis type="number" dataKey="roi" name="ROI" unit="%" domain={[0, "dataMax + 50"]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value, name) => [
                    name === "roi" ? `${value}%` : `${value} months`,
                    name === "roi" ? "ROI" : "Payback Period",
                  ]}
                />
                <Scatter name="Vendors" data={roiPaybackData} fill={colorPalette.primary[0]} />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* FTE Impact and Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>FTE Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fteImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="currentFTE" fill={colorPalette.neutral[0]} name="Current FTE" />
                  <Bar dataKey="projectedFTE" fill={colorPalette.success[0]} name="Projected FTE" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader>
              <CardTitle>Operational Efficiency Gains</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {fteImpactData.map((data, index) => (
                <div key={data.vendor} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="capitalize font-medium">{data.vendor}</span>
                    <Badge variant={data.vendor === "portnox" ? "default" : "secondary"}>
                      {data.efficiency}% efficiency
                    </Badge>
                  </div>
                  <ProgressRing
                    value={data.efficiency}
                    size={80}
                    color={data.vendor === "portnox" ? colorPalette.success[0] : colorPalette.neutral[0]}
                  />
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
            <CardTitle>Cumulative Savings Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={paybackTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={(value) => `M${value}`} />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                {results.map((result, index) => (
                  <Area
                    key={result.vendor}
                    type="monotone"
                    dataKey={result.vendor}
                    stroke={colorPalette.primary[index % colorPalette.primary.length]}
                    fill={colorPalette.primary[index % colorPalette.primary.length]}
                    fillOpacity={0.6}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Business Value Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp}>
          <Card className="text-center p-6">
            <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Strategic Value</h3>
            <p className="text-muted-foreground">
              Zero-trust architecture positions your organization for future security challenges
            </p>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="text-center p-6">
            <Zap className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-lg font-semibold mb-2">Operational Excellence</h3>
            <p className="text-muted-foreground">
              Streamlined operations reduce manual overhead and improve response times
            </p>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="text-center p-6">
            <Shield className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-semibold mb-2">Risk Mitigation</h3>
            <p className="text-muted-foreground">Advanced threat detection reduces security incidents by up to 85%</p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
