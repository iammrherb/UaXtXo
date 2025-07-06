"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
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
  ScatterChart,
  Scatter,
  Cell,
} from "recharts"
import {
  TrendingUp,
  AlertTriangle,
  Shield,
  DollarSign,
  Users,
  Building2,
  Globe,
  Target,
  Activity,
  BarChart3,
  Zap,
  Lock,
  Eye,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Download,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface IndustryAnalysisViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Comprehensive industry benchmarking data
const INDUSTRY_BENCHMARKS = {
  healthcare: {
    name: "Healthcare",
    avgSecuritySpend: 15.2,
    avgBreachCost: 10930000,
    breachFrequency: 0.28,
    complianceRequirement: 95,
    regulatoryFines: 2000000,
    nacAdoption: 68,
    avgDevices: 8500,
    criticalAssets: 95,
    riskTolerance: "Low",
    topThreats: ["Ransomware", "Insider Threats", "Medical Device Attacks"],
    complianceFrameworks: ["HIPAA", "HITECH", "FDA", "SOX"],
    maturityLevel: 72,
    automationLevel: 45,
    incidentResponseTime: 24,
    securityStaffing: 3.2,
    budgetGrowth: 12.5,
    cloudAdoption: 65,
    remoteWork: 35,
    iotDevices: 15000,
    dataVolume: "High",
    regulatoryPressure: "Very High",
  },
  financial: {
    name: "Financial Services",
    avgSecuritySpend: 18.7,
    avgBreachCost: 5970000,
    breachFrequency: 0.24,
    complianceRequirement: 98,
    regulatoryFines: 50000000,
    nacAdoption: 85,
    avgDevices: 12000,
    criticalAssets: 98,
    riskTolerance: "Very Low",
    topThreats: ["APT", "Financial Fraud", "DDoS"],
    complianceFrameworks: ["PCI-DSS", "SOX", "GDPR", "Basel III"],
    maturityLevel: 88,
    automationLevel: 75,
    incidentResponseTime: 8,
    securityStaffing: 5.8,
    budgetGrowth: 15.2,
    cloudAdoption: 55,
    remoteWork: 45,
    iotDevices: 8000,
    dataVolume: "Very High",
    regulatoryPressure: "Extreme",
  },
  retail: {
    name: "Retail",
    avgSecuritySpend: 8.3,
    avgBreachCost: 3620000,
    breachFrequency: 0.2,
    complianceRequirement: 75,
    regulatoryFines: 500000,
    nacAdoption: 45,
    avgDevices: 15000,
    criticalAssets: 70,
    riskTolerance: "Medium",
    topThreats: ["POS Malware", "Card Skimming", "E-commerce Attacks"],
    complianceFrameworks: ["PCI-DSS", "GDPR", "CCPA"],
    maturityLevel: 58,
    automationLevel: 35,
    incidentResponseTime: 48,
    securityStaffing: 2.1,
    budgetGrowth: 8.7,
    cloudAdoption: 78,
    remoteWork: 25,
    iotDevices: 25000,
    dataVolume: "High",
    regulatoryPressure: "Medium",
  },
  manufacturing: {
    name: "Manufacturing",
    avgSecuritySpend: 12.1,
    avgBreachCost: 4470000,
    breachFrequency: 0.22,
    complianceRequirement: 80,
    regulatoryFines: 1000000,
    nacAdoption: 52,
    avgDevices: 20000,
    criticalAssets: 85,
    riskTolerance: "Medium",
    topThreats: ["Industrial Espionage", "Ransomware", "Supply Chain Attacks"],
    complianceFrameworks: ["ISO 27001", "NIST", "IEC 62443"],
    maturityLevel: 65,
    automationLevel: 55,
    incidentResponseTime: 36,
    securityStaffing: 2.8,
    budgetGrowth: 10.3,
    cloudAdoption: 48,
    remoteWork: 30,
    iotDevices: 35000,
    dataVolume: "Medium",
    regulatoryPressure: "Medium",
  },
  education: {
    name: "Education",
    avgSecuritySpend: 6.2,
    avgBreachCost: 3860000,
    breachFrequency: 0.18,
    complianceRequirement: 70,
    regulatoryFines: 100000,
    nacAdoption: 38,
    avgDevices: 25000,
    criticalAssets: 60,
    riskTolerance: "High",
    topThreats: ["Ransomware", "Data Theft", "BYOD Risks"],
    complianceFrameworks: ["FERPA", "GDPR", "COPPA"],
    maturityLevel: 48,
    automationLevel: 25,
    incidentResponseTime: 72,
    securityStaffing: 1.5,
    budgetGrowth: 5.2,
    cloudAdoption: 85,
    remoteWork: 60,
    iotDevices: 18000,
    dataVolume: "Medium",
    regulatoryPressure: "Low",
  },
  government: {
    name: "Government",
    avgSecuritySpend: 20.5,
    avgBreachCost: 5240000,
    breachFrequency: 0.26,
    complianceRequirement: 99,
    regulatoryFines: 10000000,
    nacAdoption: 78,
    avgDevices: 18000,
    criticalAssets: 99,
    riskTolerance: "Very Low",
    topThreats: ["Nation State", "Cyber Espionage", "Critical Infrastructure"],
    complianceFrameworks: ["NIST 800-53", "FedRAMP", "FISMA"],
    maturityLevel: 82,
    automationLevel: 60,
    incidentResponseTime: 12,
    securityStaffing: 6.2,
    budgetGrowth: 18.5,
    cloudAdoption: 42,
    remoteWork: 55,
    iotDevices: 12000,
    dataVolume: "Very High",
    regulatoryPressure: "Extreme",
  },
  technology: {
    name: "Technology",
    avgSecuritySpend: 14.8,
    avgBreachCost: 4880000,
    breachFrequency: 0.16,
    complianceRequirement: 85,
    regulatoryFines: 2000000,
    nacAdoption: 72,
    avgDevices: 8000,
    criticalAssets: 90,
    riskTolerance: "Low",
    topThreats: ["IP Theft", "Supply Chain", "Cloud Attacks"],
    complianceFrameworks: ["SOX", "ISO 27001", "GDPR", "SOC 2"],
    maturityLevel: 78,
    automationLevel: 85,
    incidentResponseTime: 16,
    securityStaffing: 4.5,
    budgetGrowth: 16.8,
    cloudAdoption: 92,
    remoteWork: 75,
    iotDevices: 5000,
    dataVolume: "Very High",
    regulatoryPressure: "High",
  },
  energy: {
    name: "Energy & Utilities",
    avgSecuritySpend: 16.3,
    avgBreachCost: 5010000,
    breachFrequency: 0.25,
    complianceRequirement: 95,
    regulatoryFines: 5000000,
    nacAdoption: 65,
    avgDevices: 30000,
    criticalAssets: 98,
    riskTolerance: "Very Low",
    topThreats: ["Critical Infrastructure", "Nation State", "Industrial Sabotage"],
    complianceFrameworks: ["NERC CIP", "NIST", "IEC 62443"],
    maturityLevel: 75,
    automationLevel: 50,
    incidentResponseTime: 18,
    securityStaffing: 4.8,
    budgetGrowth: 14.2,
    cloudAdoption: 35,
    remoteWork: 20,
    iotDevices: 50000,
    dataVolume: "High",
    regulatoryPressure: "Very High",
  },
}

const IndustryAnalysisView: React.FC<IndustryAnalysisViewProps> = ({ results, config }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(config.industry || "healthcare")
  const [comparisonMode, setComparisonMode] = useState<"single" | "multi">("single")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "securitySpend",
    "breachCost",
    "nacAdoption",
    "maturityLevel",
  ])

  const currentIndustry = INDUSTRY_BENCHMARKS[selectedIndustry as keyof typeof INDUSTRY_BENCHMARKS]
  const portnoxResult = results.find((r) => r.vendorId === "portnox") || results[0]

  // Calculate organization's current profile
  const organizationProfile = useMemo(() => {
    const deviceRatio = config.devices / currentIndustry.avgDevices
    const estimatedSecuritySpend = (portnoxResult?.totalCost / config.years / (config.devices * 100)) * 100 // As % of assumed IT budget

    return {
      securitySpend: estimatedSecuritySpend,
      devices: config.devices,
      maturityLevel: portnoxResult?.risk.securityScore || 75,
      complianceScore: portnoxResult?.risk.complianceScore || 80,
      automationLevel: portnoxResult?.ops.automationLevel || 70,
      estimatedBreachCost: currentIndustry.avgBreachCost * (deviceRatio > 1 ? Math.sqrt(deviceRatio) : 1),
      riskReduction: portnoxResult?.risk.breachReduction * 100 || 75,
      nacReadiness: 85, // Based on analysis completion
    }
  }, [config, currentIndustry, portnoxResult])

  // Risk comparison data
  const riskComparisonData = useMemo(() => {
    return Object.entries(INDUSTRY_BENCHMARKS).map(([key, industry]) => ({
      industry: industry.name,
      avgBreachCost: industry.avgBreachCost / 1000000,
      breachFrequency: industry.breachFrequency * 100,
      securitySpend: industry.avgSecuritySpend,
      maturityLevel: industry.maturityLevel,
      nacAdoption: industry.nacAdoption,
      isSelected: key === selectedIndustry,
    }))
  }, [selectedIndustry])

  // Maturity radar chart data
  const maturityRadarData = [
    {
      metric: "Security Posture",
      industry: currentIndustry.maturityLevel,
      organization: organizationProfile.maturityLevel,
      fullMark: 100,
    },
    {
      metric: "Compliance",
      industry: currentIndustry.complianceRequirement,
      organization: organizationProfile.complianceScore,
      fullMark: 100,
    },
    {
      metric: "Automation",
      industry: currentIndustry.automationLevel,
      organization: organizationProfile.automationLevel,
      fullMark: 100,
    },
    {
      metric: "NAC Adoption",
      industry: currentIndustry.nacAdoption,
      organization: organizationProfile.nacReadiness,
      fullMark: 100,
    },
    {
      metric: "Incident Response",
      industry: Math.max(0, 100 - currentIndustry.incidentResponseTime * 2),
      organization: Math.max(0, 100 - (portnoxResult?.timeline.implementationWeeks || 12) * 4),
      fullMark: 100,
    },
    {
      metric: "Risk Management",
      industry: Math.max(0, 100 - currentIndustry.breachFrequency * 200),
      organization: Math.max(0, 100 - (100 - organizationProfile.riskReduction)),
      fullMark: 100,
    },
  ]

  // Threat landscape comparison
  const threatLandscapeData = [
    { threat: "External Attacks", industry: 85, organization: Math.max(0, 85 - organizationProfile.riskReduction) },
    {
      threat: "Insider Threats",
      industry: 65,
      organization: Math.max(0, 65 - organizationProfile.riskReduction * 0.6),
    },
    { threat: "Ransomware", industry: 78, organization: Math.max(0, 78 - organizationProfile.riskReduction * 0.8) },
    { threat: "Data Breaches", industry: 72, organization: Math.max(0, 72 - organizationProfile.riskReduction * 0.9) },
    {
      threat: "Compliance Violations",
      industry: 45,
      organization: Math.max(0, 45 - organizationProfile.riskReduction * 0.5),
    },
  ]

  const BenchmarkOverview = () => (
    <div className="space-y-6">
      {/* Industry Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Industry Benchmark Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(INDUSTRY_BENCHMARKS).map(([key, industry]) => (
                  <SelectItem key={key} value={key}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline">{currentIndustry.name} Selected</Badge>
          </div>

          {/* Key Industry Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <Badge variant="outline">Industry Avg</Badge>
              </div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {currentIndustry.avgSecuritySpend}%
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Security Spend</div>
            </div>

            <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <Badge variant="outline">Risk Level</Badge>
              </div>
              <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                ${(currentIndustry.avgBreachCost / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">Avg Breach Cost</div>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Shield className="h-5 w-5 text-green-600" />
                <Badge variant="outline">Adoption</Badge>
              </div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                {currentIndustry.nacAdoption}%
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">NAC Adoption</div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-5 w-5 text-purple-600" />
                <Badge variant="outline">Maturity</Badge>
              </div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {currentIndustry.maturityLevel}%
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Security Maturity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Organization vs Industry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  metric: "Security Spend",
                  industry: currentIndustry.avgSecuritySpend,
                  organization: organizationProfile.securitySpend,
                  unit: "%",
                  better: "lower",
                },
                {
                  metric: "Security Maturity",
                  industry: currentIndustry.maturityLevel,
                  organization: organizationProfile.maturityLevel,
                  unit: "%",
                  better: "higher",
                },
                {
                  metric: "Compliance Score",
                  industry: currentIndustry.complianceRequirement,
                  organization: organizationProfile.complianceScore,
                  unit: "%",
                  better: "higher",
                },
                {
                  metric: "Automation Level",
                  industry: currentIndustry.automationLevel,
                  organization: organizationProfile.automationLevel,
                  unit: "%",
                  better: "higher",
                },
              ].map((item, idx) => {
                const diff = item.organization - item.industry
                const isGood = (item.better === "higher" && diff > 0) || (item.better === "lower" && diff < 0)
                const absDiff = Math.abs(diff)

                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.metric}</span>
                      <div className="flex items-center gap-2">
                        {isGood ? (
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        ) : diff === 0 ? (
                          <Minus className="h-4 w-4 text-gray-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-600" />
                        )}
                        <Badge variant={isGood ? "default" : diff === 0 ? "secondary" : "destructive"}>
                          {diff > 0 ? "+" : ""}
                          {diff.toFixed(1)}
                          {item.unit}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Industry Average</div>
                        <div className="font-medium">
                          {item.industry.toFixed(1)}
                          {item.unit}
                        </div>
                        <Progress value={(item.industry / 100) * 100} className="h-2 mt-1" />
                      </div>
                      <div>
                        <div className="text-muted-foreground">Your Organization</div>
                        <div className="font-medium">
                          {item.organization.toFixed(1)}
                          {item.unit}
                        </div>
                        <Progress value={(item.organization / 100) * 100} className="h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Maturity Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={maturityRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Industry Average"
                  dataKey="industry"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Your Organization"
                  dataKey="organization"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Industry Characteristics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {currentIndustry.name} Industry Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Risk Profile</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Risk Tolerance</span>
                  <Badge
                    variant={
                      currentIndustry.riskTolerance === "Very Low" || currentIndustry.riskTolerance === "Low"
                        ? "destructive"
                        : currentIndustry.riskTolerance === "Medium"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {currentIndustry.riskTolerance}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Breach Frequency</span>
                  <span className="font-medium">{(currentIndustry.breachFrequency * 100).toFixed(0)}%/year</span>
                </div>
                <div className="flex justify-between">
                  <span>Critical Assets</span>
                  <span className="font-medium">{currentIndustry.criticalAssets}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Regulatory Pressure</span>
                  <Badge
                    variant={
                      currentIndustry.regulatoryPressure === "Extreme" ||
                      currentIndustry.regulatoryPressure === "Very High"
                        ? "destructive"
                        : currentIndustry.regulatoryPressure === "High"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {currentIndustry.regulatoryPressure}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Technology Landscape</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Cloud Adoption</span>
                  <span className="font-medium">{currentIndustry.cloudAdoption}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Remote Work</span>
                  <span className="font-medium">{currentIndustry.remoteWork}%</span>
                </div>
                <div className="flex justify-between">
                  <span>IoT Devices</span>
                  <span className="font-medium">{(currentIndustry.iotDevices / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Volume</span>
                  <Badge variant="outline">{currentIndustry.dataVolume}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Top Threats</h4>
              <div className="space-y-2">
                {currentIndustry.topThreats.map((threat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">{threat}</span>
                  </div>
                ))}
              </div>
              <h4 className="font-semibold text-lg mt-4">Compliance Frameworks</h4>
              <div className="flex flex-wrap gap-2">
                {currentIndustry.complianceFrameworks.map((framework, idx) => (
                  <Badge key={idx} variant="outline">
                    {framework}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const CrossIndustryComparison = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Cross-Industry Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={riskComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" angle={-45} textAnchor="end" height={100} />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="avgBreachCost" fill="#8884d8" name="Avg Breach Cost ($M)" />
              <Bar yAxisId="right" dataKey="securitySpend" fill="#82ca9d" name="Security Spend (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Maturity by Industry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(INDUSTRY_BENCHMARKS)
                .sort(([, a], [, b]) => b.maturityLevel - a.maturityLevel)
                .map(([key, industry], idx) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{industry.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{industry.maturityLevel}%</span>
                        {key === selectedIndustry && <Badge variant="outline">Your Industry</Badge>}
                      </div>
                    </div>
                    <Progress value={industry.maturityLevel} className="h-2" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              NAC Adoption Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(INDUSTRY_BENCHMARKS)
                .sort(([, a], [, b]) => b.nacAdoption - a.nacAdoption)
                .map(([key, industry], idx) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{industry.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{industry.nacAdoption}%</span>
                        {key === selectedIndustry && <Badge variant="outline">Your Industry</Badge>}
                      </div>
                    </div>
                    <Progress value={industry.nacAdoption} className="h-2" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Risk vs Investment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={riskComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="securitySpend"
                name="Security Spend"
                unit="%"
                label={{ value: "Security Spend (% of IT Budget)", position: "insideBottom", offset: -10 }}
              />
              <YAxis
                dataKey="avgBreachCost"
                name="Breach Cost"
                unit="M"
                label={{ value: "Average Breach Cost ($M)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 border rounded shadow-lg">
                        <p className="font-semibold">{data.industry}</p>
                        <p>Security Spend: {data.securitySpend}%</p>
                        <p>Breach Cost: ${data.avgBreachCost.toFixed(1)}M</p>
                        <p>NAC Adoption: {data.nacAdoption}%</p>
                        <p>Maturity: {data.maturityLevel}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Scatter dataKey="avgBreachCost" fill="#8884d8">
                {riskComparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isSelected ? "#ff7300" : "#8884d8"} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>• Industries in the lower right quadrant have optimal risk/investment ratios</p>
            <p>• Your industry is highlighted in orange</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ThreatLandscape = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Threat Landscape Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Current Threat Exposure</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={threatLandscapeData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="threat" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="industry" fill="#ff7300" name="Industry Average" />
                  <Bar dataKey="organization" fill="#82ca9d" name="With NAC Solution" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Risk Reduction Impact</h4>
              <div className="space-y-4">
                {threatLandscapeData.map((threat, idx) => {
                  const reduction = threat.industry - threat.organization
                  const reductionPercent = (reduction / threat.industry) * 100

                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{threat.threat}</span>
                        <Badge variant="default" className="bg-green-600">
                          -{reductionPercent.toFixed(0)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">Current Risk</div>
                          <Progress value={threat.industry} className="h-2 mt-1" />
                          <div className="text-xs mt-1">{threat.industry}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">With NAC</div>
                          <Progress value={threat.organization} className="h-2 mt-1" />
                          <div className="text-xs mt-1">{threat.organization}%</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              Attack Vectors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { vector: "Unmanaged Devices", risk: 85, mitigation: 90 },
                { vector: "Weak Authentication", risk: 75, mitigation: 95 },
                { vector: "Lateral Movement", risk: 80, mitigation: 85 },
                { vector: "Privilege Escalation", risk: 70, mitigation: 80 },
                { vector: "Data Exfiltration", risk: 65, mitigation: 75 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm">{item.vector}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">
                      {item.risk}%
                    </Badge>
                    <ArrowDown className="h-3 w-3 text-green-600" />
                    <Badge variant="default" className="text-xs bg-green-600">
                      -{item.mitigation}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              Compliance Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentIndustry.complianceFrameworks.map((framework, idx) => {
                const currentGap = Math.max(0, 100 - organizationProfile.complianceScore)
                const futureGap = Math.max(0, currentGap - 25) // Assume 25% improvement

                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{framework}</span>
                      <Badge variant={currentGap > 20 ? "destructive" : currentGap > 10 ? "secondary" : "default"}>
                        {currentGap}% gap
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Current</div>
                        <Progress value={100 - currentGap} className="h-2" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">With NAC</div>
                        <Progress value={100 - futureGap} className="h-2" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-purple-600" />
              Visibility Improvements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { area: "Device Discovery", current: 60, target: 100 },
                { area: "User Activity", current: 45, target: 95 },
                { area: "Network Traffic", current: 70, target: 90 },
                { area: "Policy Violations", current: 30, target: 85 },
                { area: "Threat Detection", current: 55, target: 92 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.area}</span>
                    <Badge variant="outline">+{item.target - item.current}%</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-muted-foreground">Current</div>
                      <Progress value={item.current} className="h-2" />
                      <div className="text-xs mt-1">{item.current}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Target</div>
                      <Progress value={item.target} className="h-2" />
                      <div className="text-xs mt-1">{item.target}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const RecommendationsAndGaps = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Industry-Specific Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-green-600">Strengths to Leverage</h4>
              <div className="space-y-3">
                {organizationProfile.maturityLevel > currentIndustry.maturityLevel && (
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Above-Average Security Maturity</div>
                      <div className="text-sm text-muted-foreground">
                        Your security maturity ({organizationProfile.maturityLevel}%) exceeds industry average (
                        {currentIndustry.maturityLevel}%)
                      </div>
                    </div>
                  </div>
                )}
                {organizationProfile.automationLevel > currentIndustry.automationLevel && (
                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Strong Automation Foundation</div>
                      <div className="text-sm text-muted-foreground">
                        Your automation level ({organizationProfile.automationLevel}%) is above industry standard (
                        {currentIndustry.automationLevel}%)
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Proactive NAC Evaluation</div>
                    <div className="text-sm text-muted-foreground">
                      You're ahead of {100 - currentIndustry.nacAdoption}% of organizations in your industry by
                      evaluating NAC solutions
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-orange-600">Areas for Improvement</h4>
              <div className="space-y-3">
                {organizationProfile.complianceScore < currentIndustry.complianceRequirement && (
                  <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Compliance Gap</div>
                      <div className="text-sm text-muted-foreground">
                        Your compliance score ({organizationProfile.complianceScore}%) is below industry requirement (
                        {currentIndustry.complianceRequirement}%)
                      </div>
                    </div>
                  </div>
                )}
                {config.devices > currentIndustry.avgDevices * 1.5 && (
                  <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Scale Complexity</div>
                      <div className="text-sm text-muted-foreground">
                        Your device count ({config.devices.toLocaleString()}) significantly exceeds industry average (
                        {currentIndustry.avgDevices.toLocaleString()})
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Incident Response Time</div>
                    <div className="text-sm text-muted-foreground">
                      Industry average response time is {currentIndustry.incidentResponseTime} hours - NAC can reduce
                      this significantly
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Peer Comparison & Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4">Organizations Similar to Yours</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    profile: "Large Enterprise",
                    devices: "10K+ devices",
                    nacAdoption: 78,
                    avgSpend: currentIndustry.avgSecuritySpend * 1.2,
                    keyBenefits: ["Reduced complexity", "Better compliance", "Cost savings"],
                  },
                  {
                    profile: "Multi-Location",
                    devices: "5K-15K devices",
                    nacAdoption: 65,
                    avgSpend: currentIndustry.avgSecuritySpend,
                    keyBenefits: ["Centralized control", "Consistent policies", "Remote visibility"],
                  },
                  {
                    profile: "High-Security",
                    devices: "Similar scale",
                    nacAdoption: 85,
                    avgSpend: currentIndustry.avgSecuritySpend * 1.5,
                    keyBenefits: ["Zero trust", "Threat prevention", "Compliance automation"],
                  },
                ].map((peer, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <h5 className="font-semibold mb-2">{peer.profile}</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Scale:</span>
                        <span className="font-medium">{peer.devices}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NAC Adoption:</span>
                        <span className="font-medium">{peer.nacAdoption}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Security Spend:</span>
                        <span className="font-medium">{peer.avgSpend.toFixed(1)}%</span>
                      </div>
                      <div className="mt-3">
                        <div className="text-xs text-muted-foreground mb-1">Key Benefits:</div>
                        {peer.keyBenefits.map((benefit, benefitIdx) => (
                          <div key={benefitIdx} className="flex items-center gap-1 text-xs">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Industry Best Practices</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-blue-600">Implementation Approach</h5>
                  {[
                    "Start with critical assets and high-risk areas",
                    "Implement in phases to minimize disruption",
                    "Establish baseline visibility before enforcement",
                    "Integrate with existing security tools",
                    "Plan for user training and change management",
                  ].map((practice, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      {practice}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <h5 className="font-medium text-purple-600">Success Metrics</h5>
                  {[
                    "100% device visibility within 30 days",
                    "95%+ policy compliance within 90 days",
                    "50%+ reduction in security incidents",
                    "75%+ reduction in manual processes",
                    "ROI achievement within 18 months",
                  ].map((metric, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Target className="h-4 w-4 text-purple-600 mt-0.5" />
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Strategic Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                phase: "Foundation (Months 1-3)",
                priority: "Critical",
                objectives: [
                  "Achieve industry-standard device visibility",
                  "Implement basic access controls",
                  "Establish compliance baseline",
                ],
                metrics: ["100% device discovery", "Basic policy enforcement", "Compliance gap assessment"],
              },
              {
                phase: "Enhancement (Months 4-6)",
                priority: "High",
                objectives: [
                  "Exceed industry automation levels",
                  "Implement advanced threat detection",
                  "Optimize operational processes",
                ],
                metrics: [
                  `>${currentIndustry.automationLevel}% automation`,
                  "Advanced analytics deployment",
                  "Process optimization",
                ],
              },
              {
                phase: "Leadership (Months 7-12)",
                priority: "Strategic",
                objectives: [
                  "Achieve top-quartile security posture",
                  "Become industry benchmark",
                  "Drive continuous improvement",
                ],
                metrics: [
                  `>${Math.max(...Object.values(INDUSTRY_BENCHMARKS).map((i) => i.maturityLevel))}% maturity`,
                  "Industry leadership position",
                  "Continuous optimization",
                ],
              },
            ].map((phase, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{phase.phase}</h4>
                  <Badge
                    variant={
                      phase.priority === "Critical"
                        ? "destructive"
                        : phase.priority === "High"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {phase.priority}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Objectives:</h5>
                    <ul className="space-y-1">
                      {phase.objectives.map((objective, objIdx) => (
                        <li key={objIdx} className="flex items-start gap-2 text-sm">
                          <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Success Metrics:</h5>
                    <ul className="space-y-1">
                      {phase.metrics.map((metric, metricIdx) => (
                        <li key={metricIdx} className="flex items-start gap-2 text-sm">
                          <Activity className="h-4 w-4 text-green-600 mt-0.5" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Analysis</h2>
          <p className="text-muted-foreground">
            Compare your risk profile and security posture against industry standards and peers
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={comparisonMode} onValueChange={(value: "single" | "multi") => setComparisonMode(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Industry</SelectItem>
              <SelectItem value="multi">Multi-Industry</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      <Tabs defaultValue="benchmark" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="benchmark">Benchmark Overview</TabsTrigger>
          <TabsTrigger value="comparison">Cross-Industry</TabsTrigger>
          <TabsTrigger value="threats">Threat Landscape</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="benchmark" className="space-y-6">
          <BenchmarkOverview />
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <CrossIndustryComparison />
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <ThreatLandscape />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <RecommendationsAndGaps />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default IndustryAnalysisView
