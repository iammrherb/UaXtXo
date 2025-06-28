"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Award,
  Lock,
  Users,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
} from "lucide-react"

const PORTNOX_COLORS = {
  primary: "#00D4AA",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
}

const COMPLIANCE_FRAMEWORKS = {
  "SOC 2": {
    name: "SOC 2 Type II",
    description: "Security, Availability, Processing Integrity, Confidentiality, Privacy",
    industry: ["Technology", "SaaS", "Financial Services"],
    annualCost: 75000,
    penaltyRisk: 500000,
    automationPotential: 85,
    portnoxSupport: 95,
    competitorAverage: 65,
  },
  "ISO 27001": {
    name: "ISO 27001:2022",
    description: "Information Security Management Systems",
    industry: ["All Industries"],
    annualCost: 60000,
    penaltyRisk: 300000,
    automationPotential: 80,
    portnoxSupport: 90,
    competitorAverage: 70,
  },
  HIPAA: {
    name: "HIPAA",
    description: "Healthcare Information Privacy and Security",
    industry: ["Healthcare", "Health Tech"],
    annualCost: 120000,
    penaltyRisk: 1800000,
    automationPotential: 75,
    portnoxSupport: 88,
    competitorAverage: 55,
  },
  "PCI DSS": {
    name: "PCI DSS v4.0",
    description: "Payment Card Industry Data Security Standard",
    industry: ["Retail", "E-commerce", "Financial"],
    annualCost: 90000,
    penaltyRisk: 500000,
    automationPotential: 70,
    portnoxSupport: 85,
    competitorAverage: 60,
  },
  GDPR: {
    name: "GDPR",
    description: "General Data Protection Regulation",
    industry: ["All (EU Operations)"],
    annualCost: 150000,
    penaltyRisk: 20000000,
    automationPotential: 65,
    portnoxSupport: 82,
    competitorAverage: 50,
  },
  NIST: {
    name: "NIST Cybersecurity Framework",
    description: "Comprehensive Cybersecurity Framework",
    industry: ["Government", "Critical Infrastructure"],
    annualCost: 200000,
    penaltyRisk: 1000000,
    automationPotential: 85,
    portnoxSupport: 92,
    competitorAverage: 65,
  },
  FedRAMP: {
    name: "FedRAMP",
    description: "Federal Risk and Authorization Management Program",
    industry: ["Government", "Federal Contractors"],
    annualCost: 500000,
    penaltyRisk: 5000000,
    automationPotential: 90,
    portnoxSupport: 95,
    competitorAverage: 40,
  },
}

interface ComplianceRiskViewProps {
  results: any[]
  industry: string
  selectedVendors: string[]
  darkMode: boolean
}

export default function ComplianceRiskView({ results, industry, selectedVendors, darkMode }: ComplianceRiskViewProps) {
  const [selectedFramework, setSelectedFramework] = useState("SOC 2")
  const [activeTab, setActiveTab] = useState("overview")
  const [riskTimeframe, setRiskTimeframe] = useState(12)

  const portnoxResult = useMemo(() => results?.find((r) => r.vendor === "portnox"), [results])

  const complianceScoreData = useMemo(() => {
    if (!results) return []

    return results.map((result) => ({
      vendor: result.vendorName,
      vendorId: result.vendor,
      automation: result.riskMetrics?.operationalEfficiency || 50,
      auditReadiness: result.complianceSummary?.auditReadiness || 60,
      continuousCompliance: result.complianceSummary?.continuousCompliance ? 100 : 30,
      frameworkSupport: (result.complianceSummary?.frameworks?.length || 0) * 12.5,
      overallScore:
        ((result.riskMetrics?.operationalEfficiency || 50) +
          (result.complianceSummary?.auditReadiness || 60) +
          (result.complianceSummary?.continuousCompliance ? 100 : 30) +
          (result.complianceSummary?.frameworks?.length || 0) * 12.5) /
        4,
      isPortnox: result.vendor === "portnox",
    }))
  }, [results])

  const riskReductionData = useMemo(() => {
    const baseRisk = {
      breachProbability: 0.25,
      complianceViolation: 0.15,
      auditFailure: 0.12,
      dataLoss: 0.08,
      downtime: 0.2,
    }

    const portnoxReduction = {
      breachProbability: 0.85,
      complianceViolation: 0.9,
      auditFailure: 0.95,
      dataLoss: 0.8,
      downtime: 0.75,
    }

    const competitorAverage = {
      breachProbability: 0.55,
      complianceViolation: 0.6,
      auditFailure: 0.65,
      dataLoss: 0.5,
      downtime: 0.45,
    }

    return [
      {
        risk: "Security Breach",
        baseline: baseRisk.breachProbability * 100,
        portnox: baseRisk.breachProbability * (1 - portnoxReduction.breachProbability) * 100,
        competitor: baseRisk.breachProbability * (1 - competitorAverage.breachProbability) * 100,
        impact: 4500000,
      },
      {
        risk: "Compliance Violation",
        baseline: baseRisk.complianceViolation * 100,
        portnox: baseRisk.complianceViolation * (1 - portnoxReduction.complianceViolation) * 100,
        competitor: baseRisk.complianceViolation * (1 - competitorAverage.complianceViolation) * 100,
        impact: 500000,
      },
      {
        risk: "Audit Failure",
        baseline: baseRisk.auditFailure * 100,
        portnox: baseRisk.auditFailure * (1 - portnoxReduction.auditFailure) * 100,
        competitor: baseRisk.auditFailure * (1 - competitorAverage.auditFailure) * 100,
        impact: 200000,
      },
      {
        risk: "Data Loss",
        baseline: baseRisk.dataLoss * 100,
        portnox: baseRisk.dataLoss * (1 - portnoxReduction.dataLoss) * 100,
        competitor: baseRisk.dataLoss * (1 - competitorAverage.dataLoss) * 100,
        impact: 1200000,
      },
      {
        risk: "System Downtime",
        baseline: baseRisk.downtime * 100,
        portnox: baseRisk.downtime * (1 - portnoxReduction.downtime) * 100,
        competitor: baseRisk.downtime * (1 - competitorAverage.downtime) * 100,
        impact: 300000,
      },
    ]
  }, [])

  const frameworkComplianceData = useMemo(() => {
    return Object.entries(COMPLIANCE_FRAMEWORKS).map(([key, framework]) => ({
      framework: key,
      name: framework.name,
      portnoxSupport: framework.portnoxSupport,
      competitorAverage: framework.competitorAverage,
      automationPotential: framework.automationPotential,
      annualCost: framework.annualCost,
      penaltyRisk: framework.penaltyRisk,
      gap: framework.portnoxSupport - framework.competitorAverage,
    }))
  }, [])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
    return `$${value.toLocaleString()}`
  }

  const RiskMetricCard = ({ title, value, change, icon, severity = "medium" }: any) => (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className={cn(
        "p-4 rounded-lg border transition-all duration-200",
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={cn("text-sm font-medium", darkMode ? "text-gray-300" : "text-gray-600")}>{title}</p>
          <p className={cn("text-2xl font-bold mt-1", darkMode ? "text-white" : "text-gray-900")}>{value}</p>
          {change && (
            <div className={cn("flex items-center text-sm mt-1", change > 0 ? "text-red-500" : "text-green-500")}>
              {change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(change)}% vs baseline
            </div>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-full",
            severity === "high" ? "bg-red-100" : severity === "medium" ? "bg-yellow-100" : "bg-green-100",
          )}
        >
          {React.cloneElement(icon, {
            className: cn(
              "h-6 w-6",
              severity === "high" ? "text-red-600" : severity === "medium" ? "text-yellow-600" : "text-green-600",
            ),
          })}
        </div>
      </div>
    </motion.div>
  )

  if (!results || results.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Compliance Data Available</h3>
        <p className="text-gray-600">Select vendors to see compliance and risk analysis.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Compliance & Risk Analysis</h2>
          <p className={cn("text-sm", darkMode ? "text-gray-400" : "text-gray-600")}>
            Comprehensive security posture and regulatory compliance assessment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
            className={cn(
              "px-3 py-2 border rounded-md text-sm",
              darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300",
            )}
          >
            {Object.keys(COMPLIANCE_FRAMEWORKS).map((framework) => (
              <option key={framework} value={framework}>
                {framework}
              </option>
            ))}
          </select>

          <Button variant="outline" size="sm">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RiskMetricCard
          title="Security Posture Score"
          value={`${portnoxResult?.riskMetrics?.complianceScore || 95}/100`}
          change={-15}
          icon={<Shield />}
          severity="low"
        />
        <RiskMetricCard
          title="Breach Risk Reduction"
          value={`${portnoxResult?.roi?.breachReduction || 85}%`}
          change={-70}
          icon={<Lock />}
          severity="low"
        />
        <RiskMetricCard
          title="Compliance Automation"
          value={`${portnoxResult?.riskMetrics?.operationalEfficiency || 95}%`}
          change={-45}
          icon={<Zap />}
          severity="low"
        />
        <RiskMetricCard
          title="Audit Readiness"
          value={`${portnoxResult?.complianceSummary?.auditReadiness || 98}%`}
          change={-25}
          icon={<FileText />}
          severity="low"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="vendor-comparison">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Score Radar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Compliance Maturity Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      data={[
                        { metric: "Policy Management", portnox: 95, competitor: 65 },
                        { metric: "Access Controls", portnox: 98, competitor: 70 },
                        { metric: "Audit Logging", portnox: 100, competitor: 75 },
                        { metric: "Risk Assessment", portnox: 90, competitor: 55 },
                        { metric: "Incident Response", portnox: 85, competitor: 60 },
                        { metric: "Continuous Monitoring", portnox: 95, competitor: 45 },
                        { metric: "Evidence Collection", portnox: 92, competitor: 50 },
                        { metric: "Reporting Automation", portnox: 98, competitor: 40 },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Portnox"
                        dataKey="portnox"
                        stroke={PORTNOX_COLORS.primary}
                        fill={PORTNOX_COLORS.primary}
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Competitor Average"
                        dataKey="competitor"
                        stroke={PORTNOX_COLORS.danger}
                        fill={PORTNOX_COLORS.danger}
                        fillOpacity={0.1}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk Heat Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Reduction Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskReductionData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 25]} />
                      <YAxis type="category" dataKey="risk" width={120} />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          `${value.toFixed(1)}%`,
                          name === "baseline"
                            ? "Current Risk"
                            : name === "portnox"
                              ? "With Portnox"
                              : "Competitor Average",
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="baseline" fill={PORTNOX_COLORS.danger} name="Current Risk" />
                      <Bar dataKey="competitor" fill={PORTNOX_COLORS.warning} name="Competitor Average" />
                      <Bar dataKey="portnox" fill={PORTNOX_COLORS.success} name="With Portnox" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(COMPLIANCE_FRAMEWORKS)
              .slice(0, 4)
              .map(([key, framework]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {key}
                      <Badge
                        variant={
                          framework.portnoxSupport >= 90
                            ? "default"
                            : framework.portnoxSupport >= 70
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {framework.portnoxSupport}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Portnox Support</span>
                          <span>{framework.portnoxSupport}%</span>
                        </div>
                        <Progress value={framework.portnoxSupport} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Industry Average</span>
                          <span>{framework.competitorAverage}%</span>
                        </div>
                        <Progress value={framework.competitorAverage} className="h-2" />
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span>Advantage</span>
                          <span className="font-semibold text-green-600">
                            +{framework.portnoxSupport - framework.competitorAverage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Frameworks Tab */}
        <TabsContent value="frameworks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Compliance Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={frameworkComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="framework" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="portnoxSupport" fill={PORTNOX_COLORS.primary} name="Portnox Support" />
                    <Bar dataKey="competitorAverage" fill={PORTNOX_COLORS.warning} name="Competitor Average" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Framework Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    {COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Annual Compliance Cost</p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(
                          COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].annualCost,
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Penalty Risk</p>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(
                          COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].penaltyRisk,
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Portnox Automation Level</p>
                    <Progress
                      value={
                        COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].portnoxSupport
                      }
                      className="h-3"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      {COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].portnoxSupport}%
                      automated compliance
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Applicable Industries</p>
                    <div className="flex flex-wrap gap-1">
                      {COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].industry.map(
                        (ind) => (
                          <Badge key={ind} variant="outline" className="text-xs">
                            {ind}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance ROI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Portnox Compliance Advantage
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Audit Preparation Time</span>
                        <span className="text-green-600 font-semibold">-80%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manual Evidence Collection</span>
                        <span className="text-green-600 font-semibold">-95%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance Staff Requirements</span>
                        <span className="text-green-600 font-semibold">-60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Audit Failure Risk</span>
                        <span className="text-green-600 font-semibold">-90%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Annual Savings</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(
                          COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].annualCost *
                            0.6,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Risk Mitigation Value</span>
                      <span className="font-bold text-green-600">
                        {formatCurrency(
                          COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].penaltyRisk *
                            0.8,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-medium">Total Annual Value</span>
                      <span className="font-bold text-green-600 text-lg">
                        {formatCurrency(
                          COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].annualCost *
                            0.6 +
                            COMPLIANCE_FRAMEWORKS[selectedFramework as keyof typeof COMPLIANCE_FRAMEWORKS].penaltyRisk *
                              0.8,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="risk-analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Risk Exposure Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={Array.from({ length: 12 }, (_, i) => ({
                        month: i + 1,
                        withoutNAC: 25 - i * 0.5,
                        withCompetitor: 15 - i * 0.3,
                        withPortnox: 5 - i * 0.1,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Risk Level"]} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="withoutNAC"
                        stackId="1"
                        stroke={PORTNOX_COLORS.danger}
                        fill={PORTNOX_COLORS.danger}
                        fillOpacity={0.6}
                        name="Without NAC"
                      />
                      <Area
                        type="monotone"
                        dataKey="withCompetitor"
                        stackId="2"
                        stroke={PORTNOX_COLORS.warning}
                        fill={PORTNOX_COLORS.warning}
                        fillOpacity={0.6}
                        name="Competitor NAC"
                      />
                      <Area
                        type="monotone"
                        dataKey="withPortnox"
                        stackId="3"
                        stroke={PORTNOX_COLORS.success}
                        fill={PORTNOX_COLORS.success}
                        fillOpacity={0.6}
                        name="Portnox NAC"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk Impact Matrix */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Risk Impact Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskReductionData.map((risk, index) => (
                    <motion.div
                      key={risk.risk}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{risk.risk}</h4>
                        <Badge variant="outline">{formatCurrency(risk.impact)} impact</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current Risk</span>
                          <span className="text-red-600 font-semibold">{risk.baseline.toFixed(1)}%</span>
                        </div>
                        <Progress value={risk.baseline} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>With Portnox</span>
                          <span className="text-green-600 font-semibold">{risk.portnox.toFixed(1)}%</span>
                        </div>
                        <Progress value={risk.portnox} className="h-2" />

                        <div className="flex justify-between text-sm pt-1 border-t">
                          <span>Risk Reduction</span>
                          <span className="text-green-600 font-bold">
                            -{(((risk.baseline - risk.portnox) / risk.baseline) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Quantification */}
          <Card>
            <CardHeader>
              <CardTitle>Quantified Risk Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">
                    {formatCurrency(
                      riskReductionData.reduce((sum, risk) => sum + (risk.baseline / 100) * risk.impact, 0),
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Annual Risk Exposure (Current)</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(
                      riskReductionData.reduce((sum, risk) => sum + (risk.portnox / 100) * risk.impact, 0),
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Annual Risk Exposure (With Portnox)</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-portnox-primary">
                    {formatCurrency(
                      riskReductionData.reduce(
                        (sum, risk) => sum + ((risk.baseline - risk.portnox) / 100) * risk.impact,
                        0,
                      ),
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Annual Risk Reduction Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vendor Comparison Tab */}
        <TabsContent value="vendor-comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Vendor Compliance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="automation" fill={PORTNOX_COLORS.primary} name="Automation Score" />
                    <Bar dataKey="auditReadiness" fill={PORTNOX_COLORS.info} name="Audit Readiness" />
                    <Bar dataKey="frameworkSupport" fill={PORTNOX_COLORS.success} name="Framework Support" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Comparison Table */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Compliance Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={cn("border-b", darkMode ? "border-gray-700" : "border-gray-200")}>
                      <th className="text-left p-3">Vendor</th>
                      <th className="text-center p-3">Automation</th>
                      <th className="text-center p-3">Audit Ready</th>
                      <th className="text-center p-3">Continuous</th>
                      <th className="text-center p-3">Frameworks</th>
                      <th className="text-center p-3">Overall Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceScoreData.map((vendor, index) => (
                      <motion.tr
                        key={vendor.vendor}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "border-b transition-colors",
                          darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50",
                          vendor.isPortnox ? "bg-portnox-primary/5" : "",
                        )}
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{vendor.vendor}</span>
                            {vendor.isPortnox && (
                              <Badge variant="default" className="text-xs">
                                Best
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center gap-2">
                            <Progress value={vendor.automation} className="w-16 h-2" />
                            <span className="text-xs">{vendor.automation}%</span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          <div className="flex items-center justify-center gap-2">
                            <Progress value={vendor.auditReadiness} className="w-16 h-2" />
                            <span className="text-xs">{vendor.auditReadiness}%</span>
                          </div>
                        </td>
                        <td className="text-center p-3">
                          {vendor.continuousCompliance > 50 ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          <Badge variant="outline">{Math.floor(vendor.frameworkSupport / 12.5)}/8</Badge>
                        </td>
                        <td className="text-center p-3">
                          <span
                            className={cn(
                              "font-bold",
                              vendor.overallScore >= 80
                                ? "text-green-600"
                                : vendor.overallScore >= 60
                                  ? "text-yellow-600"
                                  : "text-red-600",
                            )}
                          >
                            {vendor.overallScore.toFixed(0)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Immediate Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      priority: "High",
                      action: "Deploy Portnox NAC",
                      impact: "85% risk reduction",
                      timeline: "1-2 weeks",
                    },
                    {
                      priority: "High",
                      action: "Enable automated compliance reporting",
                      impact: "90% audit prep time savings",
                      timeline: "1 day",
                    },
                    {
                      priority: "Medium",
                      action: "Configure industry-specific policies",
                      impact: "Framework compliance",
                      timeline: "1 week",
                    },
                    {
                      priority: "Medium",
                      action: "Set up continuous monitoring",
                      impact: "Real-time compliance",
                      timeline: "2-3 days",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.action}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={item.priority === "High" ? "destructive" : "secondary"} className="text-xs">
                              {item.priority}
                            </Badge>
                            <span className="text-sm font-medium">{item.action}</span>
                          </div>
                          <p className="text-xs text-gray-600">{item.impact}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.timeline}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Long-term Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      phase: "Phase 1 (Month 1)",
                      goals: ["Deploy core NAC", "Basic compliance automation"],
                      outcome: "Immediate risk reduction",
                    },
                    {
                      phase: "Phase 2 (Months 2-3)",
                      goals: ["Advanced policy tuning", "Integration completion"],
                      outcome: "Optimized security posture",
                    },
                    {
                      phase: "Phase 3 (Months 4-6)",
                      goals: ["Full automation", "Continuous improvement"],
                      outcome: "Mature compliance program",
                    },
                    {
                      phase: "Phase 4 (Ongoing)",
                      goals: ["Regular assessments", "Framework updates"],
                      outcome: "Sustained compliance",
                    },
                  ].map((phase, index) => (
                    <motion.div
                      key={phase.phase}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="p-4 border rounded-lg"
                    >
                      <h4 className="font-semibold mb-2">{phase.phase}</h4>
                      <ul className="text-sm text-gray-600 mb-2">
                        {phase.goals.map((goal) => (
                          <li key={goal}>• {goal}</li>
                        ))}
                      </ul>
                      <Badge variant="outline" className="text-xs">
                        {phase.outcome}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Executive Summary & Business Case
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Recommendation: Deploy Portnox NAC Immediately
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Portnox provides the highest compliance automation, fastest deployment, and strongest risk reduction
                    in the market. The solution pays for itself through compliance cost savings alone.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">85%</p>
                    <p className="text-sm text-gray-600">Risk Reduction</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">90%</p>
                    <p className="text-sm text-gray-600">Compliance Automation</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-portnox-primary">{formatCurrency(500000)}</p>
                    <p className="text-sm text-gray-600">Annual Risk Savings</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Key Decision Factors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-green-600 mb-1">Portnox Advantages</h5>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Fastest deployment (hours vs months)</li>
                        <li>• Highest automation level (95%)</li>
                        <li>• No hardware requirements</li>
                        <li>• All features included</li>
                        <li>• Lowest total cost</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-600 mb-1">Competitor Limitations</h5>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Complex, lengthy deployments</li>
                        <li>• Manual compliance processes</li>
                        <li>• Hardware dependencies</li>
                        <li>• Additional licensing costs</li>
                        <li>• Higher operational overhead</li>
                      </ul>
                    </div>
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
