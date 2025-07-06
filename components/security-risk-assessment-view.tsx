"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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
  AlertTriangle,
  TrendingUp,
  Users,
  Eye,
  Target,
  Server,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { enhancedVendorDatabase } from "@/lib/vendors/enhanced-vendor-data"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface SecurityRiskAssessmentViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Threat modeling data
const threatCategories = [
  {
    id: "external_threats",
    name: "External Threats",
    icon: <Shield className="h-4 w-4" />,
    threats: [
      { name: "Advanced Persistent Threats (APT)", severity: "critical", likelihood: "medium", impact: "high" },
      { name: "Ransomware Attacks", severity: "critical", likelihood: "high", impact: "critical" },
      { name: "DDoS Attacks", severity: "high", likelihood: "medium", impact: "medium" },
      { name: "Phishing & Social Engineering", severity: "high", likelihood: "high", impact: "high" },
      { name: "Zero-day Exploits", severity: "critical", likelihood: "low", impact: "critical" },
    ],
  },
  {
    id: "internal_threats",
    name: "Internal Threats",
    icon: <Users className="h-4 w-4" />,
    threats: [
      { name: "Malicious Insiders", severity: "high", likelihood: "low", impact: "high" },
      { name: "Negligent Employees", severity: "medium", likelihood: "high", impact: "medium" },
      { name: "Privilege Escalation", severity: "high", likelihood: "medium", impact: "high" },
      { name: "Data Exfiltration", severity: "critical", likelihood: "medium", impact: "critical" },
      { name: "Shadow IT", severity: "medium", likelihood: "high", impact: "medium" },
    ],
  },
  {
    id: "infrastructure_threats",
    name: "Infrastructure Threats",
    icon: <Server className="h-4 w-4" />,
    threats: [
      { name: "Network Segmentation Bypass", severity: "high", likelihood: "medium", impact: "high" },
      { name: "Lateral Movement", severity: "critical", likelihood: "medium", impact: "critical" },
      { name: "IoT Device Compromise", severity: "high", likelihood: "high", impact: "medium" },
      { name: "Cloud Misconfigurations", severity: "high", likelihood: "medium", impact: "high" },
      { name: "Legacy System Vulnerabilities", severity: "high", likelihood: "high", impact: "high" },
    ],
  },
  {
    id: "compliance_threats",
    name: "Compliance & Regulatory",
    icon: <AlertTriangle className="h-4 w-4" />,
    threats: [
      { name: "GDPR Violations", severity: "critical", likelihood: "medium", impact: "critical" },
      { name: "HIPAA Compliance Failures", severity: "critical", likelihood: "low", impact: "critical" },
      { name: "PCI-DSS Non-compliance", severity: "high", likelihood: "medium", impact: "high" },
      { name: "SOX Audit Failures", severity: "high", likelihood: "low", impact: "high" },
      { name: "Industry-specific Violations", severity: "medium", likelihood: "medium", impact: "high" },
    ],
  },
]

// Risk assessment framework
const riskFrameworks = [
  {
    name: "NIST Cybersecurity Framework",
    categories: ["Identify", "Protect", "Detect", "Respond", "Recover"],
    coverage: 85,
  },
  {
    name: "ISO 27001",
    categories: ["Information Security Management", "Risk Management", "Asset Management", "Access Control"],
    coverage: 78,
  },
  {
    name: "MITRE ATT&CK",
    categories: ["Initial Access", "Execution", "Persistence", "Privilege Escalation", "Defense Evasion"],
    coverage: 72,
  },
]

// Attack surface analysis
const attackSurfaces = [
  { name: "Network Perimeter", exposure: 85, criticality: "high", devices: 450 },
  { name: "Endpoint Devices", exposure: 92, criticality: "critical", devices: 500 },
  { name: "Cloud Services", exposure: 68, criticality: "medium", devices: 25 },
  { name: "Mobile Devices", exposure: 78, criticality: "high", devices: 200 },
  { name: "IoT Devices", exposure: 95, criticality: "medium", devices: 150 },
  { name: "Remote Access", exposure: 82, criticality: "high", devices: 300 },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "hsl(var(--destructive))"
    case "high":
      return "hsl(var(--orange))"
    case "medium":
      return "hsl(var(--yellow))"
    case "low":
      return "hsl(var(--green))"
    default:
      return "hsl(var(--muted))"
  }
}

const getSeverityBadgeVariant = (severity: string) => {
  switch (severity) {
    case "critical":
      return "destructive"
    case "high":
      return "secondary"
    case "medium":
      return "outline"
    case "low":
      return "default"
    default:
      return "outline"
  }
}

export default function SecurityRiskAssessmentView({ results, config }: SecurityRiskAssessmentViewProps) {
  const [selectedThreatCategory, setSelectedThreatCategory] = useState("external_threats")
  const [selectedVendor, setSelectedVendor] = useState(results[0]?.vendorId || "portnox")

  // Get vendor security data
  const getVendorSecurityData = (vendorId: string) => {
    const vendor = enhancedVendorDatabase[vendorId]
    if (!vendor) return null

    return {
      zeroTrustScore: vendor.security.zeroTrustScore,
      riskReduction: vendor.security.riskReduction,
      securityFeatures: vendor.security.securityFeatures,
      complianceMapping: vendor.security.complianceMapping,
      breachCostSavings: vendor.security.breachCostSavings,
    }
  }

  // Calculate risk scores
  const calculateRiskScore = (threats: any[]) => {
    const severityWeights = { critical: 4, high: 3, medium: 2, low: 1 }
    const likelihoodWeights = { high: 3, medium: 2, low: 1 }

    return threats.reduce((total, threat) => {
      const severityScore = severityWeights[threat.severity as keyof typeof severityWeights] || 1
      const likelihoodScore = likelihoodWeights[threat.likelihood as keyof typeof likelihoodWeights] || 1
      return total + severityScore * likelihoodScore
    }, 0)
  }

  // Prepare radar chart data for security posture
  const securityPostureData = results
    .slice(0, 5)
    .map((result) => {
      const vendor = enhancedVendorDatabase[result.vendorId]
      if (!vendor) return null

      return {
        vendor: vendor.name,
        "Zero Trust": vendor.security.zeroTrustScore,
        "Threat Detection": vendor.security.securityFeatures.behavior_analytics ? 90 : 60,
        "Access Control": vendor.security.riskReduction.unauthorized_access,
        "Data Protection": vendor.security.riskReduction.data_breach,
        Compliance:
          vendor.security.complianceMapping.reduce((avg, comp) => avg + comp.coverage, 0) /
          vendor.security.complianceMapping.length,
        "Incident Response": vendor.security.securityFeatures.automated_response ? 85 : 50,
      }
    })
    .filter(Boolean)

  // Risk heat map data
  const riskHeatMapData = threatCategories.map((category) => ({
    category: category.name,
    riskScore: calculateRiskScore(category.threats),
    threatCount: category.threats.length,
    criticalThreats: category.threats.filter((t) => t.severity === "critical").length,
  }))

  const selectedVendorData = getVendorSecurityData(selectedVendor)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Risk Assessment</h2>
          <p className="text-muted-foreground">Comprehensive threat modeling and risk analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            {results.map((result) => {
              const vendor = enhancedVendorDatabase[result.vendorId]
              return vendor ? (
                <option key={result.vendorId} value={result.vendorId}>
                  {vendor.name}
                </option>
              ) : null
            })}
          </select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="threats">Threat Modeling</TabsTrigger>
          <TabsTrigger value="attack-surface">Attack Surface</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Risk</TabsTrigger>
          <TabsTrigger value="mitigation">Risk Mitigation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Risk Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Risk Score</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">7.2/10</div>
                <p className="text-xs text-muted-foreground">High Risk Level</p>
                <Progress value={72} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Threats</CardTitle>
                <ShieldAlert className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">12</div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Breach Probability</CardTitle>
                <Target className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-500">23%</div>
                <p className="text-xs text-muted-foreground">Annual likelihood</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Potential Impact</CardTitle>
                <TrendingUp className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">$2.8M</div>
                <p className="text-xs text-muted-foreground">Average breach cost</p>
              </CardContent>
            </Card>
          </div>

          {/* Security Posture Radar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Posture Comparison</CardTitle>
                <CardDescription>Multi-dimensional security assessment across vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    portnox: { label: "Portnox", color: "hsl(var(--chart-1))" },
                    cisco: { label: "Cisco ISE", color: "hsl(var(--chart-2))" },
                    aruba: { label: "Aruba", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={securityPostureData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="vendor" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Security Score"
                        dataKey="Zero Trust"
                        stroke="hsl(var(--chart-1))"
                        fill="hsl(var(--chart-1))"
                        fillOpacity={0.1}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Heat Map</CardTitle>
                <CardDescription>Threat categories by risk level and impact</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    riskScore: { label: "Risk Score", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskHeatMapData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Bar dataKey="riskScore" fill="hsl(var(--chart-1))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Current Security Status */}
          {selectedVendorData && (
            <Card>
              <CardHeader>
                <CardTitle>Current Security Status - {enhancedVendorDatabase[selectedVendor]?.name}</CardTitle>
                <CardDescription>Detailed security metrics and capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Zero Trust Score</h4>
                    <div className="text-3xl font-bold text-green-500">{selectedVendorData.zeroTrustScore}/100</div>
                    <Progress value={selectedVendorData.zeroTrustScore} className="w-full" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Security Features</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedVendorData.securityFeatures).map(([feature, enabled]) => (
                        <div key={feature} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{feature.replace(/_/g, " ")}</span>
                          {enabled ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Risk Reduction</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedVendorData.riskReduction).map(([risk, reduction]) => (
                        <div key={risk} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{risk.replace(/_/g, " ")}</span>
                            <span>{reduction}%</span>
                          </div>
                          <Progress value={reduction} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Threat Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Threat Categories</CardTitle>
                <CardDescription>Select a category to view detailed threats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {threatCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedThreatCategory === category.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedThreatCategory(category.id)}
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {category.threats.length}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Threat Details */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {threatCategories.find((c) => c.id === selectedThreatCategory)?.name} - Detailed Analysis
                </CardTitle>
                <CardDescription>Threat assessment with severity and likelihood ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatCategories
                    .find((c) => c.id === selectedThreatCategory)
                    ?.threats.map((threat, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{threat.name}</h4>
                          <div className="flex space-x-2">
                            <Badge variant={getSeverityBadgeVariant(threat.severity)}>{threat.severity}</Badge>
                            <Badge variant="outline">{threat.likelihood} likelihood</Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Severity:</span>
                            <div className="mt-1">
                              <Progress
                                value={
                                  threat.severity === "critical"
                                    ? 100
                                    : threat.severity === "high"
                                      ? 75
                                      : threat.severity === "medium"
                                        ? 50
                                        : 25
                                }
                                className="h-2"
                              />
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Likelihood:</span>
                            <div className="mt-1">
                              <Progress
                                value={threat.likelihood === "high" ? 100 : threat.likelihood === "medium" ? 60 : 30}
                                className="h-2"
                              />
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Impact:</span>
                            <div className="mt-1">
                              <Progress
                                value={
                                  threat.impact === "critical"
                                    ? 100
                                    : threat.impact === "high"
                                      ? 75
                                      : threat.impact === "medium"
                                        ? 50
                                        : 25
                                }
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attack-surface" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attack Surface Analysis</CardTitle>
                <CardDescription>Exposure levels across different attack vectors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attackSurfaces.map((surface, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{surface.name}</span>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              surface.criticality === "critical"
                                ? "destructive"
                                : surface.criticality === "high"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {surface.criticality}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{surface.devices} devices</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={surface.exposure} className="flex-1" />
                        <span className="text-sm font-medium">{surface.exposure}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attack Surface Distribution</CardTitle>
                <CardDescription>Device distribution across attack surfaces</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    devices: { label: "Devices", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attackSurfaces}
                        dataKey="devices"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="hsl(var(--chart-1))"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {attackSurfaces.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${(index % 6) + 1}))`} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Framework Coverage</CardTitle>
                <CardDescription>Assessment against major security frameworks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskFrameworks.map((framework, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{framework.name}</span>
                      <span className="text-sm font-medium">{framework.coverage}%</span>
                    </div>
                    <Progress value={framework.coverage} />
                    <div className="flex flex-wrap gap-1">
                      {framework.categories.map((category, catIndex) => (
                        <Badge key={catIndex} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Gaps</CardTitle>
                <CardDescription>Areas requiring attention for full compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>GDPR Article 32:</strong> Technical and organizational measures need enhancement
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>NIST CSF PR.AC-4:</strong> Access permissions management requires improvement
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>ISO 27001 A.12.4:</strong> Logging and monitoring capabilities need expansion
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Strategies</CardTitle>
                <CardDescription>Recommended actions to reduce security risks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Implement Zero Trust Architecture</h4>
                      <p className="text-sm text-muted-foreground">
                        Deploy comprehensive identity verification and least-privilege access controls
                      </p>
                      <Badge variant="outline" className="mt-1">
                        High Priority
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Enhanced Monitoring & Detection</h4>
                      <p className="text-sm text-muted-foreground">
                        Deploy advanced threat detection and behavioral analytics
                      </p>
                      <Badge variant="outline" className="mt-1">
                        Medium Priority
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start space-x-3">
                    <UserCheck className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Security Awareness Training</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular training programs to reduce human error risks
                      </p>
                      <Badge variant="outline" className="mt-1">
                        Ongoing
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Recommendations</CardTitle>
                <CardDescription>Security investments by priority and ROI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Network Access Control</span>
                      <Badge variant="default">ROI: 340%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Primary defense against unauthorized access</p>
                    <div className="text-sm">
                      <span className="text-green-600">Investment: $150K</span> |
                      <span className="text-blue-600 ml-1">Savings: $510K</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">SIEM/SOAR Platform</span>
                      <Badge variant="secondary">ROI: 220%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Centralized security monitoring and response</p>
                    <div className="text-sm">
                      <span className="text-green-600">Investment: $200K</span> |
                      <span className="text-blue-600 ml-1">Savings: $440K</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Endpoint Detection & Response</span>
                      <Badge variant="outline">ROI: 180%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Advanced endpoint threat detection</p>
                    <div className="text-sm">
                      <span className="text-green-600">Investment: $120K</span> |
                      <span className="text-blue-600 ml-1">Savings: $216K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
