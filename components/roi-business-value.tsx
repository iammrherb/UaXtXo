"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
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
  Area,
  AreaChart,
  ScatterChart,
  Scatter,
} from "recharts"
import { TrendingUp, DollarSign, Shield, Zap, Clock, Target, Award } from "lucide-react"

const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
}

interface ROIBusinessValueProps {
  results?: any
  configuration?: any
  darkMode?: boolean
}

const ROIBusinessValue: React.FC<ROIBusinessValueProps> = ({ results = {}, configuration = {}, darkMode = false }) => {
  const devices = configuration?.devices || 2500
  const users = configuration?.users || 1500
  const years = configuration?.years || 3

  // ROI calculation data
  const roiData = {
    portnox: {
      investment: 180000,
      annualSavings: 95000,
      paybackMonths: 23,
      roi3Year: 285,
      npv: 145000,
      irr: 42,
    },
    cisco: {
      investment: 450000,
      annualSavings: 65000,
      paybackMonths: 83,
      roi3Year: 145,
      npv: 45000,
      irr: 18,
    },
    aruba: {
      investment: 380000,
      annualSavings: 72000,
      paybackMonths: 63,
      roi3Year: 165,
      npv: 68000,
      irr: 22,
    },
    meraki: {
      investment: 320000,
      annualSavings: 78000,
      paybackMonths: 49,
      roi3Year: 180,
      npv: 85000,
      irr: 28,
    },
  }

  // Business value metrics
  const businessValueData = [
    {
      vendor: "Portnox",
      security: 98,
      efficiency: 95,
      compliance: 98,
      scalability: 96,
      innovation: 94,
      cost: 95,
    },
    {
      vendor: "Cisco ISE",
      security: 88,
      efficiency: 72,
      compliance: 85,
      scalability: 82,
      innovation: 68,
      cost: 65,
    },
    {
      vendor: "Aruba",
      security: 85,
      efficiency: 75,
      compliance: 82,
      scalability: 85,
      innovation: 72,
      cost: 72,
    },
    {
      vendor: "Meraki",
      security: 82,
      efficiency: 88,
      compliance: 88,
      scalability: 85,
      innovation: 85,
      cost: 78,
    },
  ]

  // ROI timeline data
  const roiTimelineData = Array.from({ length: 36 }, (_, index) => {
    const month = index + 1
    const portnoxROI =
      month >= roiData.portnox.paybackMonths
        ? ((roiData.portnox.annualSavings * (month / 12) - roiData.portnox.investment) / roiData.portnox.investment) *
          100
        : -((roiData.portnox.investment - roiData.portnox.annualSavings * (month / 12)) / roiData.portnox.investment) *
          100

    const ciscoROI =
      month >= roiData.cisco.paybackMonths
        ? ((roiData.cisco.annualSavings * (month / 12) - roiData.cisco.investment) / roiData.cisco.investment) * 100
        : -((roiData.cisco.investment - roiData.cisco.annualSavings * (month / 12)) / roiData.cisco.investment) * 100

    return {
      month,
      portnox: Math.max(-100, Math.min(portnoxROI, 300)),
      cisco: Math.max(-100, Math.min(ciscoROI, 200)),
      aruba: Math.max(-100, Math.min(ciscoROI * 0.9, 180)),
      meraki: Math.max(-100, Math.min(ciscoROI * 1.1, 190)),
    }
  })

  // Risk vs Return scatter plot
  const riskReturnData = [
    { vendor: "Portnox", risk: 15, return: 285, size: 180 },
    { vendor: "Cisco ISE", risk: 65, return: 145, size: 450 },
    { vendor: "Aruba", risk: 55, return: 165, size: 380 },
    { vendor: "Meraki", risk: 45, return: 180, size: 320 },
  ]

  const BusinessValueCard = ({ title, value, subtitle, icon: Icon, trend, color = PORTNOX_COLORS.primary }: any) => (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20`, color: color }}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{title}</p>
                <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{value}</p>
                {subtitle && <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</p>}
              </div>
            </div>
            {trend && (
              <Badge variant={trend > 0 ? "default" : "destructive"} className="ml-2">
                {trend > 0 ? "+" : ""}
                {trend}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card
          className={`${darkMode ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-green-50 to-blue-50"}`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  ROI & Business Value Analysis
                </CardTitle>
                <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Comprehensive return on investment and business impact assessment
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{roiData.portnox.roi3Year}%</div>
                <div className="text-sm text-green-600">3-Year ROI</div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Key ROI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BusinessValueCard
          title="Payback Period"
          value={`${roiData.portnox.paybackMonths} mo`}
          subtitle="Break-even point"
          icon={Clock}
          trend={-65}
          color={PORTNOX_COLORS.primary}
        />
        <BusinessValueCard
          title="Net Present Value"
          value={`$${(roiData.portnox.npv / 1000).toFixed(0)}K`}
          subtitle="Discounted cash flow"
          icon={DollarSign}
          trend={85}
          color={PORTNOX_COLORS.success}
        />
        <BusinessValueCard
          title="Internal Rate of Return"
          value={`${roiData.portnox.irr}%`}
          subtitle="Annual return rate"
          icon={Target}
          trend={42}
          color={PORTNOX_COLORS.info}
        />
        <BusinessValueCard
          title="Annual Savings"
          value={`$${(roiData.portnox.annualSavings / 1000).toFixed(0)}K`}
          subtitle="Operational efficiency"
          icon={Award}
          trend={95}
          color={PORTNOX_COLORS.accent}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI Timeline */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-600" />
              ROI Timeline Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={roiTimelineData}>
                <defs>
                  <linearGradient id="portnoxROIGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                <XAxis
                  dataKey="month"
                  tickFormatter={(value) => `M${value}`}
                  tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="portnox"
                  stroke={PORTNOX_COLORS.primary}
                  fillOpacity={1}
                  fill="url(#portnoxROIGradient)"
                  strokeWidth={3}
                  name="Portnox"
                />
                <Line
                  type="monotone"
                  dataKey="cisco"
                  stroke={PORTNOX_COLORS.accent}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                  name="Cisco ISE"
                />
                <Line
                  type="monotone"
                  dataKey="aruba"
                  stroke={PORTNOX_COLORS.info}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                  name="Aruba"
                />
                <Line
                  type="monotone"
                  dataKey="meraki"
                  stroke={PORTNOX_COLORS.warning}
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                  name="Meraki"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Business Value Radar */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Business Value Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={businessValueData}>
                <PolarGrid stroke={darkMode ? "#374151" : "#E5E7EB"} />
                <PolarAngleAxis dataKey="vendor" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 10 }}
                />
                <Radar
                  name="Security"
                  dataKey="security"
                  stroke={PORTNOX_COLORS.primary}
                  fill={PORTNOX_COLORS.primary}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Efficiency"
                  dataKey="efficiency"
                  stroke={PORTNOX_COLORS.accent}
                  fill={PORTNOX_COLORS.accent}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Compliance"
                  dataKey="compliance"
                  stroke={PORTNOX_COLORS.info}
                  fill={PORTNOX_COLORS.info}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk vs Return Analysis */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Risk vs Return Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={riskReturnData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
              <XAxis
                dataKey="risk"
                name="Risk"
                unit="%"
                tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
                label={{ value: "Implementation Risk (%)", position: "insideBottom", offset: -5 }}
              />
              <YAxis
                dataKey="return"
                name="Return"
                unit="%"
                tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
                label={{ value: "3-Year ROI (%)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `${value}${name === "return" ? "%" : name === "risk" ? "%" : "K"}`,
                  name === "return" ? "ROI" : name === "risk" ? "Risk" : "Investment",
                ]}
                contentStyle={{
                  backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                  border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                  borderRadius: "8px",
                }}
              />
              <Scatter dataKey="return" fill={PORTNOX_COLORS.primary} name="Vendors" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Business Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Security Enhancement",
            description: "Advanced threat detection and zero-trust architecture",
            value: "98% Security Score",
            color: PORTNOX_COLORS.success,
            icon: Shield,
          },
          {
            title: "Operational Efficiency",
            description: "Automated processes and reduced manual intervention",
            value: "95% Efficiency Gain",
            color: PORTNOX_COLORS.accent,
            icon: Zap,
          },
          {
            title: "Compliance Readiness",
            description: "Built-in compliance frameworks and audit trails",
            value: "98% Compliance",
            color: PORTNOX_COLORS.info,
            icon: Award,
          },
        ].map((impact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
              <CardContent className="p-6">
                <div className="text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${impact.color}20` }}
                  >
                    <impact.icon className="h-6 w-6" style={{ color: impact.color }} />
                  </div>
                  <div className="text-2xl font-bold mb-2" style={{ color: impact.color }}>
                    {impact.value}
                  </div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{impact.title}</h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{impact.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ROIBusinessValue
