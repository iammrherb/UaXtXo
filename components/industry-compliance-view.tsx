"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Building2,
  Gavel,
  Globe,
  TrendingUp,
  Users,
  Lock,
  Download,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { staggerChildren, fadeInUp, MetricCard, VIBRANT_COLORS } from "./shared-ui"

interface IndustryComplianceViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Industry-specific compliance requirements
const industryCompliance = {
  healthcare: {
    name: "Healthcare",
    icon: <Users className="h-5 w-5" />,
    primaryRegulations: ["HIPAA", "HITECH", "FDA 21 CFR Part 11"],
    secondaryRegulations: ["SOC2", "ISO 27001", "NIST"],
    criticalRequirements: [
      "PHI Protection",
      "Access Logging",
      "Encryption at Rest",
      "Audit Trails",
      "Role-Based Access",
      "Data Breach Notification",
    ],
    riskLevel: "High",
    auditFrequency: "Annual",
    penalties: "Up to $1.5M per incident",
    keyControls: {
      "Access Control": 95,
      "Data Encryption": 90,
      "Audit Logging": 85,
      "Network Segmentation": 80,
      "Incident Response": 75,
    },
  },
  finance: {
    name: "Financial Services",
    icon: <Building2 className="h-5 w-5" />,
    primaryRegulations: ["PCI DSS", "SOX", "GLBA", "FFIEC"],
    secondaryRegulations: ["SOC2", "ISO 27001", "NIST CSF"],
    criticalRequirements: [
      "Cardholder Data Protection",
      "Strong Authentication",
      "Network Segmentation",
      "Vulnerability Management",
      "Regular Testing",
      "Information Security Policy",
    ],
    riskLevel: "Critical",
    auditFrequency: "Quarterly",
    penalties: "Up to $100K per month",
    keyControls: {
      "Access Control": 98,
      "Data Encryption": 95,
      "Network Segmentation": 92,
      "Vulnerability Management": 88,
      Monitoring: 85,
    },
  },
  government: {
    name: "Government",
    icon: <Gavel className="h-5 w-5" />,
    primaryRegulations: ["FISMA", "FedRAMP", "NIST 800-53", "CJIS"],
    secondaryRegulations: ["ISO 27001", "Common Criteria"],
    criticalRequirements: [
      "FIPS 140-2 Compliance",
      "Continuous Monitoring",
      "Risk Assessment",
      "Security Controls",
      "Incident Response",
      "Personnel Security",
    ],
    riskLevel: "Critical",
    auditFrequency: "Continuous",
    penalties: "Contract termination",
    keyControls: {
      "Access Control": 99,
      Encryption: 98,
      Monitoring: 95,
      "Incident Response": 92,
      "Risk Management": 90,
    },
  },
  education: {
    name: "Education",
    icon: <Globe className="h-5 w-5" />,
    primaryRegulations: ["FERPA", "COPPA", "CIPA"],
    secondaryRegulations: ["SOC2", "ISO 27001"],
    criticalRequirements: [
      "Student Data Protection",
      "Parental Consent",
      "Content Filtering",
      "Access Controls",
      "Data Retention",
      "Privacy Policies",
    ],
    riskLevel: "Medium",
    auditFrequency: "Annual",
    penalties: "Funding loss",
    keyControls: {
      "Access Control": 85,
      "Content Filtering": 90,
      "Data Protection": 80,
      "Privacy Controls": 75,
      Monitoring: 70,
    },
  },
  retail: {
    name: "Retail",
    icon: <TrendingUp className="h-5 w-5" />,
    primaryRegulations: ["PCI DSS", "GDPR", "CCPA"],
    secondaryRegulations: ["SOC2", "ISO 27001"],
    criticalRequirements: [
      "Payment Card Security",
      "Customer Data Protection",
      "Privacy Rights",
      "Data Breach Notification",
      "Vendor Management",
      "Security Awareness",
    ],
    riskLevel: "High",
    auditFrequency: "Annual",
    penalties: "Up to 4% of revenue",
    keyControls: {
      "Payment Security": 95,
      "Data Protection": 85,
      "Access Control": 80,
      "Network Security": 75,
      "Incident Response": 70,
    },
  },
  manufacturing: {
    name: "Manufacturing",
    icon: <Lock className="h-5 w-5" />,
    primaryRegulations: ["NIST CSF", "ISO 27001", "IEC 62443"],
    secondaryRegulations: ["SOC2", "ITAR", "EAR"],
    criticalRequirements: [
      "OT Security",
      "Supply Chain Security",
      "Intellectual Property Protection",
      "Safety Systems",
      "Network Segmentation",
      "Incident Response",
    ],
    riskLevel: "High",
    auditFrequency: "Annual",
    penalties: "Production downtime",
    keyControls: {
      "OT Security": 90,
      "Network Segmentation": 85,
      "Access Control": 80,
      "Asset Management": 75,
      "Incident Response": 70,
    },
  },
}

export default function IndustryComplianceView({ results, config }: IndustryComplianceViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("healthcare")
  const [selectedRegulation, setSelectedRegulation] = useState<string>("all")

  const safeResults = useMemo(() => {
    return (results || []).filter((result) => result && typeof result === "object")
  }, [results])

  const currentIndustry = industryCompliance[selectedIndustry as keyof typeof industryCompliance]

  // Calculate compliance scores for each vendor
  const complianceScores = useMemo(() => {
    return safeResults.map((result) => {
      const vendorData = ComprehensiveVendorDatabase[result.vendor]
      if (!vendorData?.featureSupport?.compliance) {
        return {
          vendor: result.vendorName || "Unknown",
          overallScore: 0,
          regulationScores: {},
        }
      }

      const compliance = vendorData.featureSupport.compliance
      const regulations = currentIndustry.primaryRegulations

      let totalScore = 0
      const regulationScores: Record<string, number> = {}

      regulations.forEach((reg) => {
        const level = compliance[reg] || "✗"
        let score = 0
        if (level === "✓✓✓") score = 100
        else if (level === "✓✓") score = 75
        else if (level === "✓") score = 50
        else score = 0

        regulationScores[reg] = score
        totalScore += score
      })

      return {
        vendor: result.vendorName || "Unknown",
        overallScore: totalScore / regulations.length,
        regulationScores,
      }
    })
  }, [safeResults, currentIndustry])

  // Risk assessment data
  const riskAssessment = useMemo(() => {
    const highCompliance = complianceScores.filter((score) => score.overallScore >= 80).length
    const mediumCompliance = complianceScores.filter(
      (score) => score.overallScore >= 50 && score.overallScore < 80,
    ).length
    const lowCompliance = complianceScores.filter((score) => score.overallScore < 50).length

    return [
      { name: "High Compliance", value: highCompliance, color: "#22C55E" },
      { name: "Medium Compliance", value: mediumCompliance, color: "#F59E0B" },
      { name: "Low Compliance", value: lowCompliance, color: "#EF4444" },
    ]
  }, [complianceScores])

  // Regulation coverage data
  const regulationCoverage = useMemo(() => {
    return currentIndustry.primaryRegulations.map((regulation) => {
      const scores = complianceScores.map((vendor) => ({
        vendor: vendor.vendor,
        score: vendor.regulationScores[regulation] || 0,
      }))

      const avgScore = scores.reduce((sum, s) => sum + s.score, 0) / scores.length || 0

      return {
        regulation,
        averageScore: avgScore,
        vendors: scores,
      }
    })
  }, [currentIndustry, complianceScores])

  // Gap analysis
  const gapAnalysis = useMemo(() => {
    return currentIndustry.criticalRequirements.map((requirement, index) => {
      const coverage = Math.random() * 40 + 60 // Simulated coverage data
      const gap = 100 - coverage

      return {
        requirement,
        coverage,
        gap,
        priority: gap > 30 ? "High" : gap > 15 ? "Medium" : "Low",
        estimatedCost: gap > 30 ? 50000 : gap > 15 ? 25000 : 10000,
      }
    })
  }, [currentIndustry])

  const handleExportCompliance = () => {
    console.log("Exporting compliance report...")
  }

  if (!safeResults.length) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No compliance data available. Please select vendors to analyze.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Industry Selection Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Industry Compliance Analysis</h2>
          <p className="text-muted-foreground">Regulatory requirements and compliance assessment</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(industryCompliance).map(([key, industry]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center space-x-2">
                    {industry.icon}
                    <span>{industry.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleExportCompliance} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Industry Overview */}
      <motion.div variants={fadeInUp}>
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {currentIndustry.icon}
              <span>{currentIndustry.name} Compliance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Risk Level</p>
                <Badge
                  variant={
                    currentIndustry.riskLevel === "Critical"
                      ? "destructive"
                      : currentIndustry.riskLevel === "High"
                        ? "default"
                        : "secondary"
                  }
                  className="text-sm"
                >
                  {currentIndustry.riskLevel}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Audit Frequency</p>
                <p className="font-semibold">{currentIndustry.auditFrequency}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Potential Penalties</p>
                <p className="font-semibold text-red-600">{currentIndustry.penalties}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Primary Regulations</p>
                <p className="font-semibold">{currentIndustry.primaryRegulations.length} Required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Compliance Metrics */}
      <motion.div variants={fadeInUp} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Average Compliance Score"
          value={`${Math.round(complianceScores.reduce((sum, s) => sum + s.overallScore, 0) / complianceScores.length || 0)}%`}
          detail="Across all vendors"
          icon={<Shield className="h-5 w-5" />}
          trend="up"
        />
        <MetricCard
          title="Regulations Covered"
          value={`${currentIndustry.primaryRegulations.length}/${currentIndustry.primaryRegulations.length + currentIndustry.secondaryRegulations.length}`}
          detail="Primary + Secondary"
          icon={<FileText className="h-5 w-5" />}
        />
        <MetricCard
          title="High Compliance Vendors"
          value={riskAssessment.find((r) => r.name === "High Compliance")?.value || 0}
          detail="Score ≥ 80%"
          icon={<CheckCircle className="h-5 w-5" />}
          trend="up"
        />
        <MetricCard
          title="Critical Requirements"
          value={currentIndustry.criticalRequirements.length}
          detail="Must implement"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vendor Compliance Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Vendor Compliance Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={complianceScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: any) => [`${value.toFixed(1)}%`, "Compliance Score"]} />
                    <Bar dataKey="overallScore" fill={VIBRANT_COLORS[0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskAssessment}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskAssessment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Vendor Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Vendor Compliance Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complianceScores.map((vendor, index) => (
                  <div key={vendor.vendor} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">{vendor.vendor}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            vendor.overallScore >= 80
                              ? "default"
                              : vendor.overallScore >= 50
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {vendor.overallScore >= 80
                            ? "High Compliance"
                            : vendor.overallScore >= 50
                              ? "Medium Compliance"
                              : "Low Compliance"}
                        </Badge>
                        <span className="text-2xl font-bold text-primary">{vendor.overallScore.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(vendor.regulationScores).map(([regulation, score]) => (
                        <div key={regulation}>
                          <p className="text-sm text-muted-foreground mb-2">{regulation}</p>
                          <Progress value={score} className="mb-1" />
                          <p className="text-sm font-medium">{score}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-6">
          {/* Primary Regulations */}
          <Card>
            <CardHeader>
              <CardTitle>Primary Regulatory Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentIndustry.primaryRegulations.map((regulation) => {
                  const coverage = regulationCoverage.find((r) => r.regulation === regulation)
                  return (
                    <div key={regulation} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{regulation}</h4>
                        <Badge variant="outline">{coverage?.averageScore.toFixed(0)}% avg</Badge>
                      </div>
                      <Progress value={coverage?.averageScore || 0} className="mb-3" />
                      <div className="space-y-2">
                        {coverage?.vendors.map((vendor) => (
                          <div key={vendor.vendor} className="flex justify-between text-sm">
                            <span>{vendor.vendor}</span>
                            <span className="font-medium">{vendor.score}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Secondary Regulations */}
          <Card>
            <CardHeader>
              <CardTitle>Secondary & Supporting Regulations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentIndustry.secondaryRegulations.map((regulation) => (
                  <div key={regulation} className="text-center p-4 border rounded-lg">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h4 className="font-semibold">{regulation}</h4>
                    <p className="text-sm text-muted-foreground">Supporting framework</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gapAnalysis.map((gap, index) => (
                  <div key={gap.requirement} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{gap.requirement}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            gap.priority === "High"
                              ? "destructive"
                              : gap.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {gap.priority} Priority
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Est. Cost: ${gap.estimatedCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Current Coverage</p>
                        <Progress value={gap.coverage} className="mb-1" />
                        <p className="text-sm font-medium">{gap.coverage.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Compliance Gap</p>
                        <Progress value={gap.gap} className="mb-1" />
                        <p className="text-sm font-medium text-red-600">{gap.gap.toFixed(1)}% gap</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Controls Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={Object.entries(currentIndustry.keyControls).map(([control, score]) => ({
                    control,
                    score,
                    required: 85, // Minimum required score
                  }))}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="control" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Radar
                    name="Current Implementation"
                    dataKey="score"
                    stroke={VIBRANT_COLORS[0]}
                    fill={VIBRANT_COLORS[0]}
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Required Minimum"
                    dataKey="required"
                    stroke={VIBRANT_COLORS[1]}
                    fill={VIBRANT_COLORS[1]}
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Implementation Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    phase: "Phase 1: Assessment & Planning",
                    duration: "4-6 weeks",
                    tasks: ["Compliance gap analysis", "Risk assessment", "Implementation planning"],
                    priority: "High",
                  },
                  {
                    phase: "Phase 2: Critical Controls",
                    duration: "8-12 weeks",
                    tasks: ["Access controls", "Encryption", "Audit logging"],
                    priority: "High",
                  },
                  {
                    phase: "Phase 3: Monitoring & Response",
                    duration: "6-8 weeks",
                    tasks: ["SIEM integration", "Incident response", "Continuous monitoring"],
                    priority: "Medium",
                  },
                  {
                    phase: "Phase 4: Optimization & Maintenance",
                    duration: "Ongoing",
                    tasks: ["Regular audits", "Policy updates", "Training programs"],
                    priority: "Medium",
                  },
                ].map((phase, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{phase.phase}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant={phase.priority === "High" ? "destructive" : "default"} className="text-xs">
                          {phase.priority}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{phase.duration}</span>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
