"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
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
  Legend,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Target,
  Building2,
  Download,
  Presentation,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ExecutiveDashboardViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

const COLORS = ["#00D4AA", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"]

export default function ExecutiveDashboardView({ results = [], config }: ExecutiveDashboardViewProps) {
  const [selectedMetric, setSelectedMetric] = useState<string>("savings")
  const [timeRange, setTimeRange] = useState<string>("3years")

  // Safely handle results and config with comprehensive defaults
  const safeResults = Array.isArray(results) ? results : []
  const safeConfig = config || {
    devices: 2500,
    years: 3,
    industry: "healthcare",
    currentSolution: "none",
  }

  // Calculate key metrics from results with comprehensive safety checks
  const portnoxResult = safeResults.find((r) => r && typeof r === "object" && r.vendor === "portnox")
  const competitorResults = safeResults.filter((r) => r && typeof r === "object" && r.vendor && r.vendor !== "portnox")

  const totalSavings =
    competitorResults.length > 0
      ? Math.max(...competitorResults.map((r) => (r && r.totalCost ? r.totalCost : 0))) -
        (portnoxResult && portnoxResult.totalCost ? portnoxResult.totalCost : 0)
      : 500000

  const roi =
    portnoxResult && portnoxResult.totalCost
      ? ((totalSavings * safeConfig.years - portnoxResult.totalCost) / portnoxResult.totalCost) * 100
      : 456

  const paybackPeriod =
    portnoxResult && portnoxResult.totalCost && totalSavings > 0
      ? portnoxResult.totalCost / (totalSavings / safeConfig.years)
      : 0.5

  // Executive KPI data
  const executiveKPIs = [
    {
      title: "Total Cost Savings",
      value: `$${Math.round(Math.abs(totalSavings) / 1000)}K`,
      change: "+67%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "vs. industry average NAC solution",
    },
    {
      title: "Return on Investment",
      value: `${Math.round(Math.abs(roi))}%`,
      change: "+312%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "3-year ROI projection",
    },
    {
      title: "Payback Period",
      value: `${Math.abs(paybackPeriod).toFixed(1)} years`,
      change: "-75%",
      trend: "down",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "faster than industry average",
    },
    {
      title: "Security Score",
      value: "95/100",
      change: "+23pts",
      trend: "up",
      icon: Shield,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "vs. legacy NAC solutions",
    },
  ]

  // TCO comparison data with comprehensive safety checks
  const tcoData = safeResults
    .filter((result) => result && typeof result === "object" && result.vendor)
    .map((result) => {
      const vendorName = result.vendor || "Unknown"
      const formattedVendor =
        typeof vendorName === "string"
          ? vendorName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
          : "Unknown Vendor"

      return {
        vendor: formattedVendor,
        totalCost: (result.totalCost || 0) / 1000,
        licensing: (result.breakdown?.licensing || 0) / 1000,
        hardware: (result.breakdown?.hardware || 0) / 1000,
        services: (result.breakdown?.services || 0) / 1000,
        operations: (result.breakdown?.operations || 0) / 1000,
      }
    })

  // Add default data if no results available
  if (tcoData.length === 0) {
    tcoData.push(
      {
        vendor: "Portnox Clear",
        totalCost: 250,
        licensing: 180,
        hardware: 0,
        services: 35,
        operations: 35,
      },
      {
        vendor: "Cisco Ise",
        totalCost: 1000,
        licensing: 400,
        hardware: 300,
        services: 200,
        operations: 100,
      },
      {
        vendor: "Aruba Clearpass",
        totalCost: 650,
        licensing: 300,
        hardware: 150,
        services: 120,
        operations: 80,
      },
    )
  }

  // ROI timeline data with safety checks
  const roiTimelineData = Array.from({ length: safeConfig.years || 3 }, (_, i) => {
    const year = i + 1
    const cumulativeSavings = (Math.abs(totalSavings) / (safeConfig.years || 3)) * year
    const investment = portnoxResult && portnoxResult.totalCost ? portnoxResult.totalCost : 250000
    const roiValue = ((cumulativeSavings - investment) / investment) * 100

    return {
      year: `Year ${year}`,
      roi: Math.max(0, roiValue),
      savings: cumulativeSavings / 1000,
      investment: investment / 1000,
    }
  })

  // Risk reduction data
  const riskData = [
    { category: "Breach Risk", reduction: 92, value: 920000 },
    { category: "Compliance Risk", reduction: 94, value: 470000 },
    { category: "Operational Risk", reduction: 86, value: 215000 },
    { category: "Reputation Risk", reduction: 85, value: 850000 },
  ]

  // Security posture radar data
  const securityPosture = [
    { subject: "Threat Detection", portnox: 95, industry: 72 },
    { subject: "Zero Trust", portnox: 95, industry: 45 },
    { subject: "Compliance", portnox: 98, industry: 68 },
    { subject: "Automation", portnox: 92, industry: 35 },
    { subject: "Integration", portnox: 90, industry: 58 },
    { subject: "Scalability", portnox: 96, industry: 62 },
  ]

  // Business impact metrics
  const businessImpact = [
    { metric: "Deployment Time", portnox: "30 min", industry: "3-6 months", improvement: "99%" },
    { metric: "Admin Overhead", portnox: "90% reduction", industry: "High", improvement: "90%" },
    { metric: "CVE Vulnerabilities", portnox: "0", industry: "15+ annually", improvement: "100%" },
    { metric: "Compliance Automation", portnox: "95%", industry: "25%", improvement: "280%" },
  ]

  return (
    <div className="space-y-6">
      {/* Executive Summary Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Executive Intelligence Dashboard</h1>
            <p className="text-blue-100 text-lg">
              Strategic NAC Investment Analysis • {(safeConfig.devices || 2500).toLocaleString()} Devices •{" "}
              {safeConfig.years || 3} Year Projection
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="secondary" size="sm">
              <Presentation className="mr-2 h-4 w-4" />
              Board Presentation
            </Button>
          </div>
        </div>
      </div>

      {/* Executive KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {executiveKPIs.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div
                className={`absolute top-0 right-0 w-20 h-20 ${kpi.bgColor} rounded-full -mr-10 -mt-10 opacity-20`}
              />
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <Badge variant={kpi.trend === "up" ? "default" : "secondary"} className="text-xs">
                  {kpi.change}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-600 text-sm">{kpi.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-sm text-gray-500">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TCO Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Total Cost of Ownership Analysis
            </CardTitle>
            <CardDescription>3-year TCO comparison across NAC vendors (in thousands)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tcoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendor" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [`$${value}K`, ""]}
                  labelFormatter={(label) => `Vendor: ${label}`}
                />
                <Bar dataKey="totalCost" fill="#00D4AA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Key Insight:</strong> Portnox CLEAR delivers 67% lower TCO than industry average, saving $
                {Math.round(Math.abs(totalSavings) / 1000)}K over {safeConfig.years || 3} years.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ROI Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              ROI Progression Timeline
            </CardTitle>
            <CardDescription>Return on investment growth over {safeConfig.years || 3} years</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={roiTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    name === "roi" ? `${value.toFixed(1)}%` : `$${value}K`,
                    name === "roi" ? "ROI" : name === "savings" ? "Cumulative Savings" : "Investment",
                  ]}
                />
                <Area type="monotone" dataKey="roi" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Payback Achievement:</strong> Investment recovered in {Math.abs(paybackPeriod).toFixed(1)}{" "}
                years, with {Math.round(Math.abs(roi))}% total ROI by year {safeConfig.years || 3}.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security & Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Posture Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Posture Analysis
            </CardTitle>
            <CardDescription>Portnox vs Industry Average Security Capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={securityPosture}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Portnox CLEAR"
                  dataKey="portnox"
                  stroke="#00D4AA"
                  fill="#00D4AA"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Industry Average"
                  dataKey="industry"
                  stroke="#FF6B6B"
                  fill="#FF6B6B"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Security Advantage:</strong> 95/100 overall security score, 23 points higher than industry
                average.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Risk Reduction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Mitigation Value
            </CardTitle>
            <CardDescription>Quantified risk reduction across security categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskData.map((risk, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{risk.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{risk.reduction}% reduction</span>
                      <Badge variant="outline" className="text-xs">
                        ${Math.round(risk.value / 1000)}K value
                      </Badge>
                    </div>
                  </div>
                  <Progress value={risk.reduction} className="h-2" />
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>Total Risk Mitigation:</strong> $2.45M in quantified risk reduction through enhanced security
                posture and compliance automation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Strategic Business Impact
          </CardTitle>
          <CardDescription>Operational improvements and competitive advantages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessImpact.map((impact, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold text-sm text-gray-600 mb-2">{impact.metric}</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-green-600">{impact.portnox}</span>
                  </div>
                  <div className="text-xs text-gray-500">vs {impact.industry}</div>
                  <Badge variant="secondary" className="text-xs">
                    {impact.improvement} better
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Executive Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Recommended Executive Actions
          </CardTitle>
          <CardDescription>Strategic next steps for NAC investment decision</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h4 className="font-semibold text-green-800 mb-2">Immediate (30 days)</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Initiate Portnox CLEAR POC</li>
                <li>• Schedule executive briefing</li>
                <li>• Assess current NAC gaps</li>
              </ul>
            </div>
            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
              <h4 className="font-semibold text-yellow-800 mb-2">Short-term (90 days)</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Develop business case</li>
                <li>• Plan migration strategy</li>
                <li>• Secure budget approval</li>
              </ul>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h4 className="font-semibold text-blue-800 mb-2">Long-term (6+ months)</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Execute deployment plan</li>
                <li>• Realize cost savings</li>
                <li>• Measure ROI achievement</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
