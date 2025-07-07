"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { Building2, Shield, AlertTriangle, TrendingUp, CheckCircle, XCircle, Info, Download } from "lucide-react"

interface IndustryAnalysisViewProps {
  results?: any[]
  config?: any
  selectedVendors: string[]
}

// Industry benchmarks and data
const INDUSTRY_BENCHMARKS = {
  healthcare: {
    name: "Healthcare",
    averageDevicesPerUser: 2.8,
    complianceRequirements: ["HIPAA", "HITECH", "SOC 2", "FDA 21 CFR Part 11"],
    riskTolerance: "very_low",
    budgetMultiplier: 1.4,
    securityScore: 92,
    complianceScore: 95,
    threatLevel: "high",
    commonThreats: ["Ransomware", "Data Breach", "Insider Threats", "Medical Device Attacks"],
    averageTCO: 185000,
    implementationTime: 16,
  },
  finance: {
    name: "Financial Services",
    averageDevicesPerUser: 2.2,
    complianceRequirements: ["PCI DSS", "SOX", "GLBA", "FFIEC", "GDPR"],
    riskTolerance: "very_low",
    budgetMultiplier: 1.6,
    securityScore: 95,
    complianceScore: 98,
    threatLevel: "very_high",
    commonThreats: ["APT", "Financial Fraud", "Data Theft", "Regulatory Violations"],
    averageTCO: 220000,
    implementationTime: 20,
  },
  education: {
    name: "Education",
    averageDevicesPerUser: 3.5,
    complianceRequirements: ["FERPA", "COPPA", "CIPA", "SOC 2"],
    riskTolerance: "medium",
    budgetMultiplier: 0.7,
    securityScore: 78,
    complianceScore: 82,
    threatLevel: "medium",
    commonThreats: ["Student Data Breach", "Ransomware", "BYOD Risks", "Social Engineering"],
    averageTCO: 95000,
    implementationTime: 10,
  },
  government: {
    name: "Government",
    averageDevicesPerUser: 1.9,
    complianceRequirements: ["FISMA", "FedRAMP", "NIST 800-53", "CJIS", "IRS 1075"],
    riskTolerance: "very_low",
    budgetMultiplier: 1.5,
    securityScore: 88,
    complianceScore: 92,
    threatLevel: "very_high",
    commonThreats: ["Nation State Attacks", "Data Exfiltration", "Supply Chain Attacks", "Insider Threats"],
    averageTCO: 280000,
    implementationTime: 24,
  },
  manufacturing: {
    name: "Manufacturing",
    averageDevicesPerUser: 4.2,
    complianceRequirements: ["ISO 27001", "NIST CSF", "IEC 62443", "SOC 2"],
    riskTolerance: "medium",
    budgetMultiplier: 1.1,
    securityScore: 82,
    complianceScore: 85,
    threatLevel: "high",
    commonThreats: ["Industrial Espionage", "OT/IT Convergence Risks", "Ransomware", "Supply Chain Attacks"],
    averageTCO: 165000,
    implementationTime: 14,
  },
  retail: {
    name: "Retail",
    averageDevicesPerUser: 2.5,
    complianceRequirements: ["PCI DSS", "GDPR", "CCPA", "SOC 2"],
    riskTolerance: "medium",
    budgetMultiplier: 0.9,
    securityScore: 75,
    complianceScore: 80,
    threatLevel: "high",
    commonThreats: ["Payment Card Fraud", "Customer Data Breach", "POS Malware", "E-commerce Attacks"],
    averageTCO: 125000,
    implementationTime: 12,
  },
  technology: {
    name: "Technology",
    averageDevicesPerUser: 3.8,
    complianceRequirements: ["SOC 2", "ISO 27001", "GDPR", "CCPA"],
    riskTolerance: "low",
    budgetMultiplier: 1.2,
    securityScore: 90,
    complianceScore: 88,
    threatLevel: "very_high",
    commonThreats: ["IP Theft", "Advanced Persistent Threats", "Insider Threats", "Supply Chain Attacks"],
    averageTCO: 195000,
    implementationTime: 16,
  },
}

const THREAT_LANDSCAPE = {
  2024: {
    ransomware: { incidents: 4200, avgCost: 4450000, growth: 15 },
    dataBreach: { incidents: 3800, avgCost: 4880000, growth: 8 },
    insiderThreats: { incidents: 2100, avgCost: 2650000, growth: 22 },
    supplyChain: { incidents: 1850, avgCost: 5200000, growth: 35 },
    iot: { incidents: 3200, avgCost: 1850000, growth: 45 },
  },
}

export default function IndustryAnalysisView({
  results = [],
  config = {},
  selectedVendors = [],
}: IndustryAnalysisViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState(config.industry || "healthcare")
  const [activeTab, setActiveTab] = useState("overview")

  const industryData = INDUSTRY_BENCHMARKS[selectedIndustry as keyof typeof INDUSTRY_BENCHMARKS]

  // Calculate organization metrics vs industry benchmarks
  const organizationMetrics = useMemo(() => {
    const devices = config.devices || 1000
    const users = config.users || 500
    const devicesPerUser = devices / users

    // Calculate current security posture
    const hasNAC = config.currentSolution !== "none"
    const securityLevel = config.securityLevel || "standard"

    let securityScore = 60 // Base score
    if (hasNAC) securityScore += 15
    if (securityLevel === "high") securityScore += 10
    if (securityLevel === "critical") securityScore += 20
    if (selectedVendors.length > 0) securityScore += 10

    // Calculate compliance score
    let complianceScore = 50 // Base score
    if (config.complianceRequirements?.length > 0) complianceScore += 20
    if (hasNAC) complianceScore += 15
    if (securityLevel === "critical") complianceScore += 15

    return {
      devicesPerUser,
      securityScore: Math.min(100, securityScore),
      complianceScore: Math.min(100, complianceScore),
      estimatedTCO: calculateEstimatedTCO(),
      riskLevel: calculateRiskLevel(),
    }
  }, [config, selectedVendors])

  function calculateEstimatedTCO() {
    if (!results || results.length === 0) return industryData?.averageTCO || 150000

    const avgTCO = results.reduce((sum, result) => sum + (result.totalCost || 0), 0) / results.length
    return avgTCO
  }

  function calculateRiskLevel() {
    const hasNAC = config.currentSolution !== "none"
    const securityLevel = config.securityLevel || "standard"

    if (!hasNAC && securityLevel === "standard") return "high"
    if (!hasNAC && securityLevel === "high") return "medium"
    if (hasNAC && securityLevel === "standard") return "medium"
    return "low"
  }

  // Prepare benchmark comparison data
  const benchmarkData = useMemo(() => {
    if (!industryData) return []

    return [
      {
        metric: "Security Score",
        organization: organizationMetrics.securityScore,
        industry: industryData.securityScore,
        target: 95,
      },
      {
        metric: "Compliance Score",
        organization: organizationMetrics.complianceScore,
        industry: industryData.complianceScore,
        target: 98,
      },
      {
        metric: "TCO Efficiency",
        organization: Math.round((industryData.averageTCO / organizationMetrics.estimatedTCO) * 100),
        industry: 100,
        target: 120,
      },
    ]
  }, [industryData, organizationMetrics])

  // Prepare threat landscape data
  const threatData = useMemo(() => {
    if (!industryData) return []

    return industryData.commonThreats.map((threat, index) => ({
      threat,
      likelihood: Math.floor(Math.random() * 40) + 60, // 60-100%
      impact: Math.floor(Math.random() * 30) + 70, // 70-100%
      mitigation:
        selectedVendors.length > 0 ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20) + 40,
    }))
  }, [industryData, selectedVendors])

  // Prepare compliance gap analysis
  const complianceGaps = useMemo(() => {
    if (!industryData) return []

    return industryData.complianceRequirements.map((requirement) => {
      const hasControl = config.complianceRequirements?.includes(requirement) || selectedVendors.length > 0
      const coverage = hasControl ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 30) + 30

      return {
        framework: requirement,
        coverage,
        status: coverage >= 80 ? "compliant" : coverage >= 60 ? "partial" : "gap",
        priority: coverage < 60 ? "high" : coverage < 80 ? "medium" : "low",
      }
    })
  }, [industryData, config, selectedVendors])

  if (!industryData) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <Building2 className="h-12 w-12 mx-auto mb-4" />
          <p>Industry analysis not available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Industry Analysis</h2>
          <p className="text-muted-foreground">Benchmark analysis for {industryData.name} sector</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(INDUSTRY_BENCHMARKS).map(([key, industry]) => (
                <SelectItem key={key} value={key}>
                  {industry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Industry Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Industry</p>
                <p className="text-lg font-bold">{industryData.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Security Maturity</p>
                <p className="text-lg font-bold">{industryData.securityScore}/100</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Threat Level</p>
                <Badge
                  variant={
                    industryData.threatLevel === "very_high"
                      ? "destructive"
                      : industryData.threatLevel === "high"
                        ? "default"
                        : "secondary"
                  }
                >
                  {industryData.threatLevel.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Avg. TCO</p>
                <p className="text-lg font-bold">${(industryData.averageTCO / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="threats">Threat Landscape</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Organization vs Industry */}
          <Card>
            <CardHeader>
              <CardTitle>Your Organization vs Industry Average</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={benchmarkData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="organization" fill="#00D4AA" name="Your Organization" />
                  <Bar dataKey="industry" fill="#0EA5E9" name="Industry Average" />
                  <Bar dataKey="target" fill="#8B5CF6" name="Best Practice" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Posture Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Security Score</span>
                    <span>{organizationMetrics.securityScore}/100</span>
                  </div>
                  <Progress value={organizationMetrics.securityScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Industry Average</span>
                    <span>{industryData.securityScore}/100</span>
                  </div>
                  <Progress value={industryData.securityScore} className="h-2" />
                </div>
                <div className="pt-2">
                  {organizationMetrics.securityScore < industryData.securityScore ? (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Your security score is {industryData.securityScore - organizationMetrics.securityScore} points
                        below industry average. Consider implementing NAC solution.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>Your security posture meets or exceeds industry standards.</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Current Risk Level</span>
                  <Badge
                    variant={
                      organizationMetrics.riskLevel === "high"
                        ? "destructive"
                        : organizationMetrics.riskLevel === "medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {organizationMetrics.riskLevel} risk
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Devices per User</span>
                  <span>{organizationMetrics.devicesPerUser.toFixed(1)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Industry Average</span>
                  <span>{industryData.averageDevicesPerUser}</span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    Risk tolerance for {industryData.name}: {industryData.riskTolerance.replace("_", " ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmarks Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={benchmarkData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 120]} />
                  <Radar
                    name="Your Organization"
                    dataKey="organization"
                    stroke="#00D4AA"
                    fill="#00D4AA"
                    fillOpacity={0.3}
                  />
                  <Radar name="Industry Average" dataKey="industry" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.3} />
                  <Radar name="Best Practice" dataKey="target" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">{industryData.implementationTime}</p>
                  <p className="text-sm text-muted-foreground">weeks average</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Budget Multiplier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">{industryData.budgetMultiplier}x</p>
                  <p className="text-sm text-muted-foreground">vs baseline</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Compliance Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold">{industryData.complianceRequirements.length}</p>
                  <p className="text-sm text-muted-foreground">frameworks</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Threat Landscape for {industryData.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatData.map((threat, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{threat.threat}</h4>
                      <Badge
                        variant={
                          threat.likelihood > 80 ? "destructive" : threat.likelihood > 60 ? "default" : "secondary"
                        }
                      >
                        {threat.likelihood}% likelihood
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Impact</p>
                        <Progress value={threat.impact} className="h-2 mt-1" />
                        <p className="text-xs mt-1">{threat.impact}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Likelihood</p>
                        <Progress value={threat.likelihood} className="h-2 mt-1" />
                        <p className="text-xs mt-1">{threat.likelihood}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Mitigation</p>
                        <Progress value={threat.mitigation} className="h-2 mt-1" />
                        <p className="text-xs mt-1">{threat.mitigation}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceGaps.map((gap, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {gap.status === "compliant" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : gap.status === "partial" ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <h4 className="font-semibold">{gap.framework}</h4>
                        <p className="text-sm text-muted-foreground">{gap.coverage}% coverage</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={gap.coverage} className="w-24 h-2" />
                      <Badge
                        variant={
                          gap.priority === "high" ? "destructive" : gap.priority === "medium" ? "default" : "secondary"
                        }
                      >
                        {gap.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Based on your industry requirements, implementing a NAC solution can improve compliance coverage by
                    25-40% across key frameworks.
                  </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">High Priority Actions</h4>
                    <ul className="text-sm space-y-1">
                      {complianceGaps
                        .filter((gap) => gap.priority === "high")
                        .map((gap, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span>Address {gap.framework} gaps</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Medium Priority Actions</h4>
                    <ul className="text-sm space-y-1">
                      {complianceGaps
                        .filter((gap) => gap.priority === "medium")
                        .map((gap, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                            <span>Enhance {gap.framework} controls</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
