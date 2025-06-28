"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  LineChart,
  Area,
  AreaChart,
} from "recharts"
import { DollarSign, TrendingUp, Shield, Clock, Zap, Award } from "lucide-react"
import Image from "next/image"

const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  accent: "#FF6B35",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
}

const CHART_COLORS = [
  PORTNOX_COLORS.primary,
  PORTNOX_COLORS.accent,
  PORTNOX_COLORS.info,
  PORTNOX_COLORS.success,
  PORTNOX_COLORS.warning,
  "#8B5CF6",
  "#EC4899",
]

interface TCOOverviewProps {
  results: any
  configuration: any
  darkMode: boolean
}

const TCOOverview: React.FC<TCOOverviewProps> = ({ results, configuration, darkMode }) => {
  // Mock data for demonstration
  const mockResults = {
    portnox: { tco: 180000, roi: 285, complianceScore: 98, deploymentTime: 2 },
    cisco: { tco: 450000, roi: 145, complianceScore: 85, deploymentTime: 180 },
    aruba: { tco: 380000, roi: 165, complianceScore: 82, deploymentTime: 120 },
    meraki: { tco: 320000, roi: 180, complianceScore: 88, deploymentTime: 90 },
  }

  const tcoData = Object.entries(mockResults).map(([vendor, data]) => ({
    vendor: vendor.charAt(0).toUpperCase() + vendor.slice(1),
    tco: data.tco,
    roi: data.roi,
    compliance: data.complianceScore,
  }))

  const savingsData = [
    { name: "Year 1", portnox: 45000, competitors: 120000 },
    { name: "Year 2", portnox: 90000, competitors: 240000 },
    { name: "Year 3", portnox: 135000, competitors: 360000 },
  ]

  const costBreakdown = [
    { name: "Licensing", value: 60, color: PORTNOX_COLORS.primary },
    { name: "Implementation", value: 15, color: PORTNOX_COLORS.accent },
    { name: "Support", value: 20, color: PORTNOX_COLORS.info },
    { name: "Training", value: 5, color: PORTNOX_COLORS.success },
  ]

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color = PORTNOX_COLORS.primary }: any) => (
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
      {/* Executive Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card
          className={`${darkMode ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-blue-50 to-indigo-50"}`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <Image src="/portnox-logo.png" alt="Portnox" width={120} height={30} className="h-8 w-auto" />
                  TCO Analysis Summary
                </CardTitle>
                <p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {configuration.years}-year analysis for {configuration.devices.toLocaleString()} devices
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  ${((mockResults.cisco.tco - mockResults.portnox.tco) / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-green-600">Total Savings vs Cisco</div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total TCO"
          value={`$${(mockResults.portnox.tco / 1000).toFixed(0)}K`}
          subtitle="3-year projection"
          icon={DollarSign}
          trend={-60}
          color={PORTNOX_COLORS.primary}
        />
        <MetricCard
          title="ROI"
          value={`${mockResults.portnox.roi}%`}
          subtitle="Return on investment"
          icon={TrendingUp}
          trend={85}
          color={PORTNOX_COLORS.success}
        />
        <MetricCard
          title="Compliance Score"
          value={`${mockResults.portnox.complianceScore}%`}
          subtitle="Security frameworks"
          icon={Shield}
          trend={15}
          color={PORTNOX_COLORS.info}
        />
        <MetricCard
          title="Deployment"
          value={`${mockResults.portnox.deploymentTime} days`}
          subtitle="Time to production"
          icon={Clock}
          trend={-95}
          color={PORTNOX_COLORS.accent}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TCO Comparison */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              TCO Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tcoData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                <XAxis dataKey="vendor" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "TCO"]}
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="tco" fill={PORTNOX_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Percentage"]}
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{item.name}</span>
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Timeline */}
      <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-purple-600" />
            Cumulative Savings Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={savingsData}>
              <defs>
                <linearGradient id="portnoxGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="competitorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PORTNOX_COLORS.accent} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={PORTNOX_COLORS.accent} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
              <XAxis dataKey="name" tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }} />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                tick={{ fill: darkMode ? "#D1D5DB" : "#6B7280", fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === "portnox" ? "Portnox" : "Competitors",
                ]}
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
                fill="url(#portnoxGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="competitors"
                stroke={PORTNOX_COLORS.accent}
                fillOpacity={1}
                fill="url(#competitorGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: Zap,
            title: "Fastest Deployment",
            description: "2 days vs 6 months average",
            color: PORTNOX_COLORS.accent,
          },
          {
            icon: Award,
            title: "Highest ROI",
            description: "285% return in 3 years",
            color: PORTNOX_COLORS.success,
          },
          {
            icon: Shield,
            title: "Best Compliance",
            description: "98% framework coverage",
            color: PORTNOX_COLORS.info,
          },
        ].map((advantage, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
              <CardContent className="p-6 text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${advantage.color}20` }}
                >
                  <advantage.icon className="h-6 w-6" style={{ color: advantage.color }} />
                </div>
                <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{advantage.title}</h3>
                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{advantage.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default TCOOverview
