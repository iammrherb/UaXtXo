"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Clock,
  DollarSign,
  Server,
  CheckCircle2,
  Activity,
  Zap,
  Target,
  BarChart3,
} from "lucide-react"

// Enhanced color palette
const COLORS = {
  primary: "#00D4AA",
  secondary: "#1B2951",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
  gradient: ["#00D4AA", "#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
}

// Real-time performance data simulation
const generateRealTimeData = () => {
  const now = Date.now()
  return Array.from({ length: 20 }, (_, i) => ({
    time: new Date(now - (19 - i) * 60000).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }),
    portnoxPerformance: 95 + Math.random() * 5,
    competitorPerformance: 70 + Math.random() * 15,
    networkLoad: 40 + Math.random() * 30,
    securityEvents: Math.floor(Math.random() * 10),
    responseTime: 50 + Math.random() * 100,
  }))
}

// KPI data
const kpiData = [
  {
    title: "Total Cost Savings",
    value: "$1,578,000",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "success",
    description: "vs. Cisco ISE over 3 years",
  },
  {
    title: "Security Score",
    value: "95/100",
    change: "+17%",
    trend: "up",
    icon: Shield,
    color: "primary",
    description: "Industry-leading protection",
  },
  {
    title: "Deployment Time",
    value: "30 min",
    change: "-99.8%",
    trend: "down",
    icon: Clock,
    color: "info",
    description: "vs. traditional NAC (3 months)",
  },
  {
    title: "Device Coverage",
    value: "25,000",
    change: "+100%",
    trend: "up",
    icon: Server,
    color: "purple",
    description: "All device types supported",
  },
]

// Vendor analysis data
const vendorAnalysisData = [
  { name: "Portnox CLEAR", value: 95, cost: 272, deployment: 0.5, fill: COLORS.primary },
  { name: "Cisco ISE", value: 78, cost: 1850, deployment: 90, fill: COLORS.danger },
  { name: "Aruba ClearPass", value: 82, cost: 1245, deployment: 60, fill: COLORS.warning },
  { name: "Forescout", value: 85, cost: 1680, deployment: 120, fill: COLORS.info },
  { name: "Fortinet FortiNAC", value: 75, cost: 980, deployment: 45, fill: COLORS.purple },
]

// Risk mitigation data
const riskMitigationData = [
  { category: "Breach Prevention", before: 35, after: 95, reduction: 92 },
  { category: "Compliance Gaps", before: 45, after: 98, reduction: 94 },
  { category: "Operational Risk", before: 40, after: 86, reduction: 86 },
  { category: "Technical Debt", before: 60, after: 96, reduction: 85 },
  { category: "Vendor Lock-in", before: 80, after: 15, reduction: 81 },
]

// Compliance coverage data
const complianceData = [
  { framework: "HIPAA", coverage: 98, status: "compliant" },
  { framework: "SOX", coverage: 96, status: "compliant" },
  { framework: "PCI DSS", coverage: 99, status: "compliant" },
  { framework: "GDPR", coverage: 97, status: "compliant" },
  { framework: "ISO 27001", coverage: 95, status: "compliant" },
  { framework: "NIST", coverage: 94, status: "compliant" },
]

interface EnhancedDashboardWidgetsProps {
  refreshInterval?: number
}

export default function EnhancedDashboardWidgets({ refreshInterval = 30000 }: EnhancedDashboardWidgetsProps) {
  const [realTimeData, setRealTimeData] = useState(generateRealTimeData())
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setRealTimeData(generateRealTimeData())
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [isLive, refreshInterval])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Real-time Performance Monitor */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Real-time Performance Monitor
              </CardTitle>
              <CardDescription>Live system performance and security metrics</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isLive ? "default" : "secondary"} className="bg-green-100 text-green-800">
                <div className={`w-2 h-2 rounded-full mr-2 ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
                {isLive ? "Live" : "Paused"}
              </Badge>
              <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)}>
                {isLive ? "Pause" : "Resume"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={realTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="portnoxPerformance"
                stroke={COLORS.primary}
                strokeWidth={2}
                name="Portnox Performance"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="competitorPerformance"
                stroke={COLORS.danger}
                strokeWidth={2}
                name="Competitor Average"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="networkLoad"
                stroke={COLORS.warning}
                strokeWidth={2}
                name="Network Load"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Enhanced KPI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          const colorClasses = {
            success: "from-green-50 to-green-100 border-green-200 text-green-900",
            primary: "from-blue-50 to-blue-100 border-blue-200 text-blue-900",
            info: "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-900",
            purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-900",
          }

          return (
            <Card
              key={index}
              className={`bg-gradient-to-br ${colorClasses[kpi.color as keyof typeof colorClasses]} shadow-lg hover:shadow-xl transition-shadow`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-8 w-8 opacity-80" />
                  <Badge variant={kpi.trend === "up" ? "default" : "secondary"} className="text-xs">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {kpi.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{kpi.value}</p>
                  <p className="text-sm font-medium opacity-80">{kpi.title}</p>
                  <p className="text-xs opacity-60 mt-1">{kpi.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Multi-dimensional Vendor Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Vendor Value Analysis
            </CardTitle>
            <CardDescription>Security score vs. total cost positioning</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendorAnalysisData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-semibold text-gray-900">{data.name}</p>
                          <p className="text-sm">Security Score: {data.value}%</p>
                          <p className="text-sm">Total Cost: ${data.cost}K</p>
                          <p className="text-sm">Deployment: {data.deployment} days</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar dataKey="value" fill={COLORS.primary} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Risk Mitigation Analysis
            </CardTitle>
            <CardDescription>Before vs. after Portnox implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskMitigationData.map((risk, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{risk.category}</span>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {risk.reduction}% reduction
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Before</span>
                        <span>{risk.before}%</span>
                      </div>
                      <Progress value={risk.before} className="h-2 bg-red-100" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>After</span>
                        <span>{risk.after}%</span>
                      </div>
                      <Progress value={risk.after} className="h-2 bg-green-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Coverage Analysis */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            Regulatory Compliance Coverage
          </CardTitle>
          <CardDescription>Comprehensive compliance framework analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceData.map((compliance, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{compliance.framework}</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Compliant
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Coverage</span>
                    <span className="font-medium">{compliance.coverage}%</span>
                  </div>
                  <Progress value={compliance.coverage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics Summary */}
      <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Advanced Analytics Summary
          </CardTitle>
          <CardDescription>Key insights and recommendations from comprehensive analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-900">Immediate Impact</span>
              </div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• 30-minute deployment vs. 3-month traditional</li>
                <li>• Zero infrastructure requirements</li>
                <li>• Instant security policy enforcement</li>
                <li>• Immediate ROI realization</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Financial Benefits</span>
              </div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• $1.58M total savings over 3 years</li>
                <li>• 456% ROI with 6-month payback</li>
                <li>• 85% reduction in operational costs</li>
                <li>• Predictable OpEx model</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-900">Security Excellence</span>
              </div>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• 95/100 security score (industry-leading)</li>
                <li>• 92% breach risk reduction</li>
                <li>• Zero-Trust architecture</li>
                <li>• Continuous compliance monitoring</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
