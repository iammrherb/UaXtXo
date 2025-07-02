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
import { SectionTitle, MetricCard, ProgressRing, fadeInUp, staggerContainer, colorPalette } from "./shared-ui"

interface BusinessImpactViewProps {
  tcoResults: any[]
  settings: any
}

export default function BusinessImpactView({ tcoResults, settings }: BusinessImpactViewProps) {
  // Mock data for demonstration
  const roiPaybackData = [
    { vendor: "Portnox", roi: 245, payback: 8, totalCost: 450000 },
    { vendor: "Cisco ISE", roi: 180, payback: 12, totalCost: 680000 },
    { vendor: "Aruba ClearPass", roi: 165, payback: 14, totalCost: 720000 },
    { vendor: "Forescout", roi: 155, payback: 16, totalCost: 850000 },
  ]

  const fteImpactData = [
    { vendor: "Portnox", currentFTE: 5, projectedFTE: 2, efficiency: 60 },
    { vendor: "Cisco ISE", currentFTE: 5, projectedFTE: 3.5, efficiency: 30 },
    { vendor: "Aruba ClearPass", currentFTE: 5, projectedFTE: 3.8, efficiency: 24 },
    { vendor: "Forescout", currentFTE: 5, projectedFTE: 4, efficiency: 20 },
  ]

  const paybackTimelineData = Array.from({ length: 24 }, (_, month) => ({
    month: month + 1,
    Portnox: Math.max(0, (month + 1) * 15000 - 50000),
    "Cisco ISE": Math.max(0, (month + 1) * 12000 - 80000),
    "Aruba ClearPass": Math.max(0, (month + 1) * 10000 - 85000),
    Forescout: Math.max(0, (month + 1) * 8000 - 95000),
  }))

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
          value="245%"
          change="3-year projection"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="Payback Period"
          value="8 months"
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
                    <Badge variant={data.vendor === "Portnox" ? "default" : "secondary"}>
                      {data.efficiency}% efficiency
                    </Badge>
                  </div>
                  <ProgressRing
                    progress={data.efficiency}
                    size={80}
                    color={data.vendor === "Portnox" ? colorPalette.success[0] : colorPalette.neutral[0]}
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
                <Area
                  type="monotone"
                  dataKey="Portnox"
                  stroke={colorPalette.primary[0]}
                  fill={colorPalette.primary[0]}
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Cisco ISE"
                  stroke={colorPalette.primary[1]}
                  fill={colorPalette.primary[1]}
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Aruba ClearPass"
                  stroke={colorPalette.primary[2]}
                  fill={colorPalette.primary[2]}
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Forescout"
                  stroke={colorPalette.success[0]}
                  fill={colorPalette.success[0]}
                  fillOpacity={0.6}
                />
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
