"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Clock, Shield, Building, CheckCircle2, DollarSign, Target, BarChart3 } from "lucide-react"
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
  Legend,
} from "recharts"

interface IndustryPaybackAnalysisProps {
  results?: any[]
  config?: any
}

// Comprehensive industry data with detailed payback analysis
const INDUSTRY_PAYBACK_DATA = {
  healthcare: {
    name: "Healthcare",
    paybackMonths: 0.3,
    avgBreachCost: 10930000,
    breachProbability: 0.28,
    downtimeCostPerHour: 85000,
    complianceFrameworks: ["HIPAA", "HITECH", "FDA", "SOX"],
    regulatoryFines: 2500000,
    criticalFactors: [
      "Patient data protection",
      "Medical device security",
      "24/7 availability requirements",
      "Audit trail compliance",
    ],
    valueDrivers: {
      breachPrevention: 45,
      operationalEfficiency: 25,
      complianceAutomation: 20,
      downtimeReduction: 10,
    },
    riskProfile: "Very High",
    urgencyScore: 95,
    budgetSensitivity: "Low",
    implementationComplexity: "Medium",
    roiFactors: {
      breachCostAvoidance: 4900000,
      operationalSavings: 450000,
      complianceSavings: 280000,
      downtimeSavings: 170000,
    },
  },
  financial: {
    name: "Financial Services",
    paybackMonths: 0.4,
    avgBreachCost: 5970000,
    breachProbability: 0.24,
    downtimeCostPerHour: 120000,
    complianceFrameworks: ["PCI-DSS", "SOX", "GDPR", "Basel III"],
    regulatoryFines: 50000000,
    criticalFactors: [
      "Transaction security",
      "Real-time fraud prevention",
      "Regulatory compliance",
      "Customer trust protection",
    ],
    valueDrivers: {
      breachPrevention: 40,
      operationalEfficiency: 30,
      complianceAutomation: 25,
      downtimeReduction: 5,
    },
    riskProfile: "Very High",
    urgencyScore: 92,
    budgetSensitivity: "Low",
    implementationComplexity: "High",
    roiFactors: {
      breachCostAvoidance: 2390000,
      operationalSavings: 380000,
      complianceSavings: 520000,
      downtimeSavings: 240000,
    },
  },
  energy: {
    name: "Energy & Utilities",
    paybackMonths: 0.5,
    avgBreachCost: 5010000,
    breachProbability: 0.25,
    downtimeCostPerHour: 150000,
    complianceFrameworks: ["NERC CIP", "NIST", "IEC 62443"],
    regulatoryFines: 5000000,
    criticalFactors: ["Grid reliability", "SCADA protection", "National security implications", "Environmental safety"],
    valueDrivers: {
      breachPrevention: 25,
      operationalEfficiency: 20,
      complianceAutomation: 25,
      downtimeReduction: 30,
    },
    riskProfile: "Very High",
    urgencyScore: 90,
    budgetSensitivity: "Low",
    implementationComplexity: "High",
    roiFactors: {
      breachCostAvoidance: 1250000,
      operationalSavings: 320000,
      complianceSavings: 450000,
      downtimeSavings: 900000,
    },
  },
  technology: {
    name: "Technology",
    paybackMonths: 0.8,
    avgBreachCost: 4880000,
    breachProbability: 0.16,
    downtimeCostPerHour: 75000,
    complianceFrameworks: ["SOX", "ISO 27001", "GDPR", "SOC 2"],
    regulatoryFines: 2000000,
    criticalFactors: [
      "Intellectual property protection",
      "Development productivity",
      "Cloud security",
      "API protection",
    ],
    valueDrivers: {
      breachPrevention: 35,
      operationalEfficiency: 35,
      complianceAutomation: 20,
      downtimeReduction: 10,
    },
    riskProfile: "High",
    urgencyScore: 78,
    budgetSensitivity: "Medium",
    implementationComplexity: "Medium",
    roiFactors: {
      breachCostAvoidance: 780000,
      operationalSavings: 420000,
      complianceSavings: 180000,
      downtimeSavings: 150000,
    },
  },
  government: {
    name: "Government",
    paybackMonths: 1.2,
    avgBreachCost: 5240000,
    breachProbability: 0.26,
    downtimeCostPerHour: 65000,
    complianceFrameworks: ["NIST 800-53", "FedRAMP", "FISMA"],
    regulatoryFines: 10000000,
    criticalFactors: [
      "Citizen data protection",
      "National security",
      "Transparency requirements",
      "Budget accountability",
    ],
    valueDrivers: {
      breachPrevention: 35,
      operationalEfficiency: 20,
      complianceAutomation: 35,
      downtimeReduction: 10,
    },
    riskProfile: "Very High",
    urgencyScore: 82,
    budgetSensitivity: "High",
    implementationComplexity: "High",
    roiFactors: {
      breachCostAvoidance: 1360000,
      operationalSavings: 240000,
      complianceSavings: 420000,
      downtimeSavings: 130000,
    },
  },
  manufacturing: {
    name: "Manufacturing",
    paybackMonths: 1.4,
    avgBreachCost: 4470000,
    breachProbability: 0.22,
    downtimeCostPerHour: 95000,
    complianceFrameworks: ["ISO 27001", "NIST", "IEC 62443"],
    regulatoryFines: 1000000,
    criticalFactors: ["Production line protection", "OT/IT convergence", "Supply chain security", "Quality assurance"],
    valueDrivers: {
      breachPrevention: 30,
      operationalEfficiency: 25,
      complianceAutomation: 15,
      downtimeReduction: 30,
    },
    riskProfile: "Medium",
    urgencyScore: 65,
    budgetSensitivity: "Medium",
    implementationComplexity: "Medium",
    roiFactors: {
      breachCostAvoidance: 980000,
      operationalSavings: 300000,
      complianceSavings: 150000,
      downtimeSavings: 570000,
    },
  },
  retail: {
    name: "Retail",
    paybackMonths: 1.6,
    avgBreachCost: 3620000,
    breachProbability: 0.2,
    downtimeCostPerHour: 45000,
    complianceFrameworks: ["PCI-DSS", "GDPR", "CCPA"],
    regulatoryFines: 500000,
    criticalFactors: ["Payment data protection", "Guest network management", "Seasonal scaling", "Customer experience"],
    valueDrivers: {
      breachPrevention: 35,
      operationalEfficiency: 35,
      complianceAutomation: 20,
      downtimeReduction: 10,
    },
    riskProfile: "Medium",
    urgencyScore: 58,
    budgetSensitivity: "High",
    implementationComplexity: "Low",
    roiFactors: {
      breachCostAvoidance: 724000,
      operationalSavings: 420000,
      complianceSavings: 100000,
      downtimeSavings: 90000,
    },
  },
  education: {
    name: "Education",
    paybackMonths: 1.8,
    avgBreachCost: 3860000,
    breachProbability: 0.18,
    downtimeCostPerHour: 25000,
    complianceFrameworks: ["FERPA", "GDPR", "COPPA"],
    regulatoryFines: 100000,
    criticalFactors: ["Student data privacy", "BYOD management", "Guest network security", "Limited IT resources"],
    valueDrivers: {
      breachPrevention: 25,
      operationalEfficiency: 45,
      complianceAutomation: 20,
      downtimeReduction: 10,
    },
    riskProfile: "Medium",
    urgencyScore: 48,
    budgetSensitivity: "Very High",
    implementationComplexity: "Low",
    roiFactors: {
      breachCostAvoidance: 695000,
      operationalSavings: 540000,
      complianceSavings: 80000,
      downtimeSavings: 50000,
    },
  },
}

// Payback comparison data for charts
const paybackComparisonData = Object.entries(INDUSTRY_PAYBACK_DATA)
  .map(([key, data]) => ({
    industry: data.name,
    paybackMonths: data.paybackMonths,
    urgencyScore: data.urgencyScore,
    totalROI: Object.values(data.roiFactors).reduce((sum, val) => sum + val, 0),
    riskLevel: data.riskProfile === "Very High" ? 4 : data.riskProfile === "High" ? 3 : 2,
  }))
  .sort((a, b) => a.paybackMonths - b.paybackMonths)

// Value driver comparison
const valueDriverData = Object.entries(INDUSTRY_PAYBACK_DATA).map(([key, data]) => ({
  industry: data.name.split(" ")[0], // Shortened for chart
  ...data.valueDrivers,
}))

// Risk vs Payback scatter data
const riskPaybackData = Object.entries(INDUSTRY_PAYBACK_DATA).map(([key, data]) => ({
  industry: data.name,
  payback: data.paybackMonths,
  risk: data.urgencyScore,
  breachCost: data.avgBreachCost / 1000000, // In millions
  size: data.avgBreachCost / 100000, // For bubble size
}))

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF7C7C"]

export default function IndustryPaybackAnalysis({ results = [], config = {} }: IndustryPaybackAnalysisProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("healthcare")
  const [viewMode, setViewMode] = useState<"overview" | "detailed" | "comparison">("overview")
  const [sortBy, setSortBy] = useState<"payback" | "risk" | "roi">("payback")

  const selectedIndustryData = INDUSTRY_PAYBACK_DATA[selectedIndustry as keyof typeof INDUSTRY_PAYBACK_DATA]

  const sortedIndustries = useMemo(() => {
    const industries = Object.entries(INDUSTRY_PAYBACK_DATA)
    return industries.sort(([, a], [, b]) => {
      switch (sortBy) {
        case "payback":
          return a.paybackMonths - b.paybackMonths
        case "risk":
          return b.urgencyScore - a.urgencyScore
        case "roi":
          const aROI = Object.values(a.roiFactors).reduce((sum, val) => sum + val, 0)
          const bROI = Object.values(b.roiFactors).reduce((sum, val) => sum + val, 0)
          return bROI - aROI
        default:
          return 0
      }
    })
  }, [sortBy])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${Math.round(value).toLocaleString()}`
  }

  const getPaybackColor = (months: number) => {
    if (months <= 0.5) return "text-green-600 bg-green-50"
    if (months <= 1.0) return "text-blue-600 bg-blue-50"
    if (months <= 1.5) return "text-orange-600 bg-orange-50"
    return "text-red-600 bg-red-50"
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Very High":
        return "destructive"
      case "High":
        return "secondary"
      case "Medium":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Payback Analysis</h2>
          <p className="text-muted-foreground">See how different industries affect NAC investment payback timing</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(INDUSTRY_PAYBACK_DATA).map(([key, industry]) => (
                <SelectItem key={key} value={key}>
                  {industry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="payback">Payback</SelectItem>
              <SelectItem value="risk">Risk</SelectItem>
              <SelectItem value="roi">ROI</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Fastest Payback</p>
                <p className="text-lg font-semibold">0.3 months</p>
                <p className="text-xs text-muted-foreground">Healthcare</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Highest Risk</p>
                <p className="text-lg font-semibold">95/100</p>
                <p className="text-xs text-muted-foreground">Healthcare</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Breach Cost</p>
                <p className="text-lg font-semibold">$5.8M</p>
                <p className="text-xs text-muted-foreground">Across industries</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Universal ROI</p>
                <p className="text-lg font-semibold">100%</p>
                <p className="text-xs text-muted-foreground">All industries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={viewMode} onValueChange={(v: any) => setViewMode(v)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Industry Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Payback Timeline Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Payback Timeline by Industry</CardTitle>
              <CardDescription>Time to achieve positive ROI across different sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={paybackComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="industry" angle={-45} textAnchor="end" height={100} />
                  <YAxis label={{ value: "Months to Payback", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    formatter={(value: any, name: string) => [
                      name === "paybackMonths" ? `${value} months` : value,
                      name === "paybackMonths" ? "Payback Time" : name,
                    ]}
                  />
                  <Bar dataKey="paybackMonths" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Industry Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Rankings</CardTitle>
              <CardDescription>
                Sorted by {sortBy === "payback" ? "payback time" : sortBy === "risk" ? "risk score" : "total ROI"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedIndustries.map(([key, industry], index) => {
                  const totalROI = Object.values(industry.roiFactors).reduce((sum, val) => sum + val, 0)
                  return (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium">{industry.name}</h4>
                          <div className="flex gap-2 mt-1">
                            <Badge variant={getRiskBadgeVariant(industry.riskProfile)}>
                              {industry.riskProfile} Risk
                            </Badge>
                            <Badge variant="outline">{industry.budgetSensitivity} Budget Sensitivity</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-semibold px-2 py-1 rounded ${getPaybackColor(industry.paybackMonths)}`}
                        >
                          {industry.paybackMonths} mo
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{formatCurrency(totalROI)} ROI</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          {/* Selected Industry Deep Dive */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                {selectedIndustryData.name} Industry Analysis
              </CardTitle>
              <CardDescription>Detailed payback analysis and value drivers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedIndustryData.paybackMonths} mo</div>
                  <div className="text-sm text-muted-foreground">Payback Time</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(selectedIndustryData.avgBreachCost)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Breach Cost</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedIndustryData.urgencyScore}/100</div>
                  <div className="text-sm text-muted-foreground">Urgency Score</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {(selectedIndustryData.breachProbability * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Breach Probability</div>
                </div>
              </div>

              {/* Value Drivers */}
              <div>
                <h4 className="font-semibold mb-3">Value Driver Breakdown</h4>
                <div className="space-y-3">
                  {Object.entries(selectedIndustryData.valueDrivers).map(([driver, percentage]) => (
                    <div key={driver} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{driver.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Factors */}
              <div>
                <h4 className="font-semibold mb-3">Critical Success Factors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedIndustryData.criticalFactors.map((factor, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROI Breakdown */}
              <div>
                <h4 className="font-semibold mb-3">ROI Factor Breakdown</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedIndustryData.roiFactors).map(([factor, value]) => (
                    <div key={factor} className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground capitalize">
                        {factor.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="font-semibold">{formatCurrency(value)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Frameworks */}
              <div>
                <h4 className="font-semibold mb-3">Relevant Compliance Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIndustryData.complianceFrameworks.map((framework) => (
                    <Badge key={framework} variant="secondary">
                      {framework}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          {/* Risk vs Payback Scatter */}
          <Card>
            <CardHeader>
              <CardTitle>Risk vs Payback Analysis</CardTitle>
              <CardDescription>Industry positioning based on risk profile and payback timing</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={riskPaybackData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="payback"
                    label={{ value: "Payback Time (Months)", position: "insideBottom", offset: -10 }}
                  />
                  <YAxis label={{ value: "Risk Score", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    formatter={(value: any, name: string) => [
                      name === "payback"
                        ? `${value} months`
                        : name === "risk"
                          ? `${value}/100`
                          : name === "breachCost"
                            ? `$${value}M`
                            : value,
                      name === "payback"
                        ? "Payback Time"
                        : name === "risk"
                          ? "Risk Score"
                          : name === "breachCost"
                            ? "Avg Breach Cost"
                            : name,
                    ]}
                    labelFormatter={(label) =>
                      `Industry: ${riskPaybackData.find((d) => d.payback === label)?.industry}`
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ fill: "#8884d8", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Value Driver Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Value Driver Comparison</CardTitle>
              <CardDescription>How different industries prioritize NAC value drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={valueDriverData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="industry" />
                  <PolarRadiusAxis angle={90} domain={[0, 50]} />
                  <Radar
                    name="Breach Prevention"
                    dataKey="breachPrevention"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Operational Efficiency"
                    dataKey="operationalEfficiency"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Compliance Automation"
                    dataKey="complianceAutomation"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Downtime Reduction"
                    dataKey="downtimeReduction"
                    stroke="#ff7c7c"
                    fill="#ff7c7c"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Industry Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Fastest Payback (&lt; 1 month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(INDUSTRY_PAYBACK_DATA)
                    .filter(([, data]) => data.paybackMonths < 1)
                    .map(([key, data]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm">{data.name}</span>
                        <Badge variant="default" className="bg-green-600">
                          {data.paybackMonths} mo
                        </Badge>
                      </div>
                    ))}
                </div>
                <Alert className="mt-4">
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>High-Risk Industries</AlertTitle>
                  <AlertDescription>
                    Critical infrastructure and regulated industries show fastest payback due to severe breach
                    consequences.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">Moderate Payback (1-1.5 months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(INDUSTRY_PAYBACK_DATA)
                    .filter(([, data]) => data.paybackMonths >= 1 && data.paybackMonths < 1.5)
                    .map(([key, data]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm">{data.name}</span>
                        <Badge variant="secondary">{data.paybackMonths} mo</Badge>
                      </div>
                    ))}
                </div>
                <Alert className="mt-4">
                  <BarChart3 className="h-4 w-4" />
                  <AlertTitle>Balanced Value</AlertTitle>
                  <AlertDescription>
                    These industries benefit from balanced security and operational efficiency gains.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">Budget-Conscious (1.5+ months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(INDUSTRY_PAYBACK_DATA)
                    .filter(([, data]) => data.paybackMonths >= 1.5)
                    .map(([key, data]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm">{data.name}</span>
                        <Badge variant="outline">{data.paybackMonths} mo</Badge>
                      </div>
                    ))}
                </div>
                <Alert className="mt-4">
                  <DollarSign className="h-4 w-4" />
                  <AlertTitle>Efficiency Focus</AlertTitle>
                  <AlertDescription>
                    Cost-sensitive industries achieve ROI primarily through operational efficiency improvements.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Key Insights Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle>Key Industry Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Universal Success Factors</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  All industries achieve payback within 2 months
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Operational efficiency provides consistent value across sectors
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Compliance automation scales with regulatory complexity
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  Breach prevention value correlates with industry-specific costs
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Strategic Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                  <strong>Healthcare/Financial:</strong> Lead with breach cost avoidance
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                  <strong>Manufacturing/Energy:</strong> Emphasize production continuity
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                  <strong>Government:</strong> Focus on compliance mandates
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                  <strong>Education/Retail:</strong> Highlight operational efficiency
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
