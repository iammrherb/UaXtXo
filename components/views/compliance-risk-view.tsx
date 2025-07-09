"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Award,
  ShieldCheck,
  DollarSign,
  Info,
  FileCheck,
  ClipboardCheck,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"

interface ComplianceRiskViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Compliance framework details
const COMPLIANCE_FRAMEWORKS = {
  HIPAA: {
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    industries: ["healthcare"],
    penalty: 2000000,
    requirements: [
      "Access Controls",
      "Audit Controls",
      "Integrity Controls",
      "Transmission Security",
      "Administrative Safeguards",
    ],
  },
  "PCI-DSS": {
    name: "PCI-DSS",
    fullName: "Payment Card Industry Data Security Standard",
    industries: ["retail", "financial"],
    penalty: 500000,
    requirements: [
      "Network Segmentation",
      "Access Control",
      "Regular Monitoring",
      "Vulnerability Management",
      "Strong Authentication",
    ],
  },
  SOC2: {
    name: "SOC 2",
    fullName: "Service Organization Control 2",
    industries: ["technology", "financial"],
    penalty: 250000,
    requirements: ["Security Controls", "Availability", "Processing Integrity", "Confidentiality", "Privacy"],
  },
  ISO27001: {
    name: "ISO 27001",
    fullName: "Information Security Management System",
    industries: ["all"],
    penalty: 500000,
    requirements: ["Risk Assessment", "Security Policy", "Asset Management", "Access Control", "Incident Management"],
  },
  GDPR: {
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    industries: ["all"],
    penalty: 20000000,
    requirements: ["Data Protection", "Privacy by Design", "Consent Management", "Right to Access", "Data Portability"],
  },
  NIST: {
    name: "NIST",
    fullName: "National Institute of Standards and Technology",
    industries: ["government", "technology"],
    penalty: 1000000,
    requirements: ["Identify", "Protect", "Detect", "Respond", "Recover"],
  },
  FISMA: {
    name: "FISMA",
    fullName: "Federal Information Security Management Act",
    industries: ["government"],
    penalty: 5000000,
    requirements: [
      "Continuous Monitoring",
      "Risk Management",
      "Security Controls",
      "Incident Response",
      "System Authorization",
    ],
  },
  FedRAMP: {
    name: "FedRAMP",
    fullName: "Federal Risk and Authorization Management Program",
    industries: ["government"],
    penalty: 10000000,
    requirements: [
      "Cloud Security",
      "Continuous Monitoring",
      "Security Assessment",
      "Authorization",
      "Incident Response",
    ],
  },
}

// Industry-specific compliance requirements
const INDUSTRY_COMPLIANCE_REQUIREMENTS = {
  healthcare: ["HIPAA", "HITECH", "SOC2", "ISO27001"],
  financial: ["PCI-DSS", "SOX", "GLBA", "SOC2", "ISO27001"],
  government: ["FISMA", "FedRAMP", "NIST", "ISO27001"],
  technology: ["SOC2", "ISO27001", "GDPR"],
  retail: ["PCI-DSS", "GDPR", "SOC2"],
  manufacturing: ["ISO27001", "NIST", "SOC2"],
  education: ["FERPA", "SOC2", "ISO27001"],
  default: ["SOC2", "ISO27001", "GDPR"],
}

export default function ComplianceRiskView({ results, config }: ComplianceRiskViewProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")

  // Get industry-specific compliance requirements
  const industryRequirements =
    INDUSTRY_COMPLIANCE_REQUIREMENTS[config.industry as keyof typeof INDUSTRY_COMPLIANCE_REQUIREMENTS] ||
    INDUSTRY_COMPLIANCE_REQUIREMENTS.default

  // Compliance readiness assessment
  const complianceReadiness = useMemo(() => {
    return results.map((r) => {
      const vendor = ComprehensiveVendorDatabase[r.vendorId]

      // Calculate framework-specific readiness
      const frameworkScores = industryRequirements
        .map((req) => {
          const framework = COMPLIANCE_FRAMEWORKS[req as keyof typeof COMPLIANCE_FRAMEWORKS]
          if (!framework) return null

          let score = 0
          if (vendor?.compliance?.frameworks?.includes(req)) {
            score = 90
          } else if (vendor?.compliance?.frameworks?.some((f) => f.includes("ISO") || f.includes("SOC"))) {
            score = 70
          } else {
            score = 40
          }

          // Adjust based on automation
          if (vendor?.compliance?.automatedCompliance) {
            score = Math.min(100, score + 10)
          }

          return {
            framework: req,
            score,
            automated: vendor?.compliance?.automatedCompliance || false,
            certified: vendor?.compliance?.certifications?.includes(req) || false,
          }
        })
        .filter(Boolean)

      const overallReadiness = frameworkScores.reduce((sum, f) => sum + (f?.score || 0), 0) / frameworkScores.length

      return {
        vendor: r.vendorName,
        vendorId: r.vendorId,
        overallReadiness,
        frameworkScores,
        auditReadiness: vendor?.compliance?.auditReadiness || 60,
        automatedCompliance: vendor?.compliance?.automatedCompliance || false,
        certifications: vendor?.compliance?.certifications || [],
      }
    })
  }, [results, industryRequirements])

  // Risk exposure analysis
  const riskExposure = useMemo(() => {
    return results.map((r) => {
      const readiness = complianceReadiness.find((c) => c.vendorId === r.vendorId)
      const avgCompliance = readiness?.overallReadiness || 0

      // Calculate financial risk
      const maxPenalty = industryRequirements
        .map((req) => COMPLIANCE_FRAMEWORKS[req as keyof typeof COMPLIANCE_FRAMEWORKS]?.penalty || 0)
        .reduce((max, penalty) => Math.max(max, penalty), 0)

      const complianceGap = 100 - avgCompliance
      const financialRisk = (complianceGap / 100) * maxPenalty * 0.1 // 10% annual risk

      // Calculate operational risk
      const auditRisk = 100 - (readiness?.auditReadiness || 0)
      const processRisk = readiness?.automatedCompliance ? 20 : 60
      const operationalRisk = (auditRisk + processRisk) / 2

      // Calculate remediation effort
      const remediationDays = Math.ceil((complianceGap / 100) * 180) // Up to 180 days
      const remediationCost = remediationDays * 2000 // $2k per day

      return {
        vendor: r.vendorName,
        vendorId: r.vendorId,
        complianceGap,
        financialRisk,
        operationalRisk,
        remediationDays,
        remediationCost,
        totalRisk: financialRisk + remediationCost,
      }
    })
  }, [complianceReadiness, industryRequirements])

  // Compliance automation capabilities
  const automationCapabilities = useMemo(() => {
    const capabilities = [
      "Policy Management",
      "Access Reviews",
      "Audit Logging",
      "Compliance Reporting",
      "Risk Assessment",
      "Evidence Collection",
      "Control Monitoring",
      "Incident Tracking",
    ]

    return capabilities.map((capability) => {
      const dataPoint: any = { capability }

      results.forEach((r) => {
        let score = 0
        const vendor = ComprehensiveVendorDatabase[r.vendorId]

        switch (capability) {
          case "Policy Management":
            score = vendor?.compliance?.automatedCompliance ? 90 : 40
            break
          case "Access Reviews":
            score = vendor?.features?.advanced?.aiDriven ? 85 : 50
            break
          case "Audit Logging":
            score = 95 // All vendors have this
            break
          case "Compliance Reporting":
            score = vendor?.compliance?.automatedCompliance ? 95 : 60
            break
          case "Risk Assessment":
            score = vendor?.features?.advanced?.riskBasedAccess ? 80 : 40
            break
          case "Evidence Collection":
            score = vendor?.compliance?.auditReadiness || 60
            break
          case "Control Monitoring":
            score = vendor?.features?.advanced?.zeroTrust ? 90 : 50
            break
          case "Incident Tracking":
            score = vendor?.operationalMetrics?.reportingCapabilities === "advanced" ? 85 : 50
            break
        }

        dataPoint[r.vendorName] = score
      })

      return dataPoint
    })
  }, [results])

  // Framework coverage matrix
  const frameworkCoverage = useMemo(() => {
    return Object.entries(COMPLIANCE_FRAMEWORKS).map(([key, framework]) => {
      const coverage = results.map((r) => {
        const vendor = ComprehensiveVendorDatabase[r.vendorId]
        return {
          vendor: r.vendorName,
          vendorId: r.vendorId,
          supported: vendor?.compliance?.frameworks?.includes(key) || false,
          certified: vendor?.compliance?.certifications?.includes(key) || false,
          automated:
            (vendor?.compliance?.automatedCompliance && vendor?.compliance?.frameworks?.includes(key)) || false,
        }
      })

      return {
        framework: framework.name,
        fullName: framework.fullName,
        ...coverage.reduce(
          (acc, c) => {
            acc[c.vendor] = {
              supported: c.supported,
              certified: c.certified,
              automated: c.automated,
            }
            return acc
          },
          {} as Record<string, any>,
        ),
      }
    })
  }, [results])

  // Industry-specific compliance requirements
  const industryComplianceAnalysis = useMemo(() => {
    const requirements = industryRequirements
      .map((req) => {
        const framework = COMPLIANCE_FRAMEWORKS[req as keyof typeof COMPLIANCE_FRAMEWORKS]
        if (!framework) return null

        const vendorSupport = results.map((r) => {
          const vendor = ComprehensiveVendorDatabase[r.vendorId]
          const supported = vendor?.compliance?.frameworks?.includes(req) || false
          const score = supported
            ? vendor?.compliance?.automatedCompliance
              ? 95
              : 80
            : vendor?.compliance?.frameworks?.length > 3
              ? 60
              : 40

          return {
            vendor: r.vendorName,
            vendorId: r.vendorId,
            score,
            gap: 100 - score,
          }
        })

        return {
          framework: framework.name,
          penalty: framework.penalty,
          requirements: framework.requirements,
          vendorSupport,
        }
      })
      .filter(Boolean)

    return requirements
  }, [results, industryRequirements])

  // Colors
  const COLORS = {
    portnox: "#3B82F6",
    compliant: "#10B981",
    partial: "#F59E0B",
    gap: "#EF4444",
    neutral: "#6B7280",
  }

  const getComplianceColor = (score: number) => {
    if (score >= 90) return COLORS.compliant
    if (score >= 70) return COLORS.partial
    return COLORS.gap
  }

  return (
    <div className="space-y-6">
      {/* Compliance Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Best Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...complianceReadiness.map((r) => r.overallReadiness)).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {
                complianceReadiness.find(
                  (r) => r.overallReadiness === Math.max(...complianceReadiness.map((r) => r.overallReadiness)),
                )?.vendor
              }
            </p>
            <Progress value={Math.max(...complianceReadiness.map((r) => r.overallReadiness))} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-blue-600" />
              Automated Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceReadiness.filter((r) => r.automatedCompliance).length}</div>
            <p className="text-xs text-muted-foreground mt-1">vendors with automation</p>
            <div className="flex gap-1 mt-2">
              {complianceReadiness.map((r) => (
                <div
                  key={r.vendorId}
                  className={`h-2 flex-1 rounded ${r.automatedCompliance ? "bg-blue-600" : "bg-gray-300"}`}
                  title={r.vendor}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-600" />
              Risk Exposure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              ${Math.min(...riskExposure.map((r) => r.totalRisk)).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">minimum annual risk</p>
            <Badge variant="outline" className="mt-2 text-xs">
              Up to $
              {Math.max(
                ...industryRequirements.map(
                  (req) => COMPLIANCE_FRAMEWORKS[req as keyof typeof COMPLIANCE_FRAMEWORKS]?.penalty || 0,
                ),
              ).toLocaleString()}{" "}
              penalty
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-600" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...complianceReadiness.map((r) => r.certifications.length))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">maximum certifications</p>
            {portnoxResult && (
              <Badge
                variant={
                  complianceReadiness.find((r) => r.vendorId === "portnox")?.certifications.length ===
                  Math.max(...complianceReadiness.map((r) => r.certifications.length))
                    ? "default"
                    : "outline"
                }
                className="mt-2 text-xs"
              >
                Portnox: {complianceReadiness.find((r) => r.vendorId === "portnox")?.certifications.length || 0} certs
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Compliance Analysis */}
      <Tabs defaultValue="readiness" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="readiness">Compliance Readiness</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
        </TabsList>

        <TabsContent value="readiness" className="space-y-6">
          {/* Overall Compliance Readiness */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Readiness Assessment</CardTitle>
              <CardDescription>Vendor readiness for {industryRequirements.join(", ")} compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={complianceReadiness}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => `${value.toFixed(0)}%`} />
                  <Legend />
                  <Bar
                    dataKey="overallReadiness"
                    fill={COLORS.compliant}
                    name="Overall Readiness"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar dataKey="auditReadiness" fill={COLORS.neutral} name="Audit Readiness" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Framework-Specific Readiness */}
          <div className="grid gap-6 lg:grid-cols-2">
            {industryComplianceAnalysis.slice(0, 2).map((req) => (
              <Card key={req.framework}>
                <CardHeader>
                  <CardTitle className="text-lg">{req.framework} Compliance</CardTitle>
                  <CardDescription>Maximum penalty: ${req.penalty.toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {req.vendorSupport
                      .sort((a, b) => b.score - a.score)
                      .map((vendor) => (
                        <div key={vendor.vendorId} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{vendor.vendor}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={vendor.score} className="w-24 h-2" />
                              <Badge
                                variant={
                                  vendor.score >= 90 ? "default" : vendor.score >= 70 ? "secondary" : "destructive"
                                }
                                className="text-xs min-w-[50px] text-center"
                              >
                                {vendor.score}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {/* Risk Exposure Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Risk Exposure</CardTitle>
              <CardDescription>Financial and operational risk from compliance gaps</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={riskExposure}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="financialRisk" stackId="a" fill={COLORS.gap} name="Financial Risk" />
                  <Bar dataKey="remediationCost" stackId="a" fill={COLORS.partial} name="Remediation Cost" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Mitigation */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Gap Analysis</CardTitle>
                <CardDescription>Percentage gap from full compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskExposure
                    .sort((a, b) => a.complianceGap - b.complianceGap)
                    .map((vendor) => (
                      <div key={vendor.vendorId} className="flex items-center justify-between">
                        <span className="text-sm">{vendor.vendor}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={100 - vendor.complianceGap} className="w-32 h-2" />
                          <Badge
                            variant={
                              vendor.complianceGap <= 10
                                ? "default"
                                : vendor.complianceGap <= 30
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {vendor.complianceGap.toFixed(0)}% gap
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Remediation Timeline</CardTitle>
                <CardDescription>Estimated time to achieve compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={riskExposure} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" />
                    <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => `${value} days`} />
                    <Bar dataKey="remediationDays" fill={COLORS.neutral} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          {/* Compliance Automation Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Automation Capabilities</CardTitle>
              <CardDescription>Automated compliance management features</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={automationCapabilities}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="capability" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  {results.slice(0, 4).map((result, index) => (
                    <Radar
                      key={result.vendorId}
                      name={result.vendorName}
                      dataKey={result.vendorName}
                      stroke={result.vendorId === "portnox" ? COLORS.portnox : COLORS.neutral}
                      fill={result.vendorId === "portnox" ? COLORS.portnox : COLORS.neutral}
                      fillOpacity={result.vendorId === "portnox" ? 0.3 : 0.1}
                      strokeWidth={result.vendorId === "portnox" ? 2 : 1}
                    />
                  ))}
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Automation Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Automation Impact on Compliance</CardTitle>
              <CardDescription>How automation reduces compliance burden</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-blue-200 dark:border-blue-800">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Automation Benefits</AlertTitle>
                  <AlertDescription>
                    Vendors with automated compliance reduce audit preparation time by 70% and decrease compliance
                    violations by 85% on average.
                  </AlertDescription>
                </Alert>

                <div className="grid gap-4">
                  {complianceReadiness
                    .filter((r) => r.automatedCompliance)
                    .map((result) => (
                      <div key={result.vendorId} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">{result.vendor}</p>
                            <p className="text-xs text-muted-foreground">Automated compliance enabled</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {Math.round(
                              (1 - riskExposure.find((r) => r.vendorId === result.vendorId)!.operationalRisk / 100) * 8,
                            )}{" "}
                            hrs/month saved
                          </p>
                          <p className="text-xs text-muted-foreground">in compliance tasks</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-6">
          {/* Framework Coverage Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Coverage</CardTitle>
              <CardDescription>Support across major compliance standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Framework</th>
                      {results.map((r) => (
                        <th key={r.vendorId} className="text-center p-2 min-w-[120px]">
                          {r.vendorName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {frameworkCoverage.map((framework) => (
                      <tr key={framework.framework} className="border-b">
                        <td className="p-2">
                          <div>
                            <p className="font-medium">{framework.framework}</p>
                            <p className="text-xs text-muted-foreground">{framework.fullName}</p>
                          </div>
                        </td>
                        {results.map((r) => {
                          const coverage = framework[r.vendorName]
                          return (
                            <td key={r.vendorId} className="text-center p-2">
                              {coverage?.supported ? (
                                <div className="flex flex-col items-center gap-1">
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                  {coverage.certified && (
                                    <Badge variant="outline" className="text-xs">
                                      Certified
                                    </Badge>
                                  )}
                                  {coverage.automated && (
                                    <Badge variant="outline" className="text-xs">
                                      Automated
                                    </Badge>
                                  )}
                                </div>
                              ) : (
                                <XCircle className="h-5 w-5 text-gray-400 mx-auto" />
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Compliance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Risk Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {portnoxResult &&
            complianceReadiness.find((c) => c.vendorId === "portnox")?.overallReadiness ===
              Math.max(...complianceReadiness.map((c) => c.overallReadiness)) && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 dark:text-green-100">
                    Industry-Leading Compliance Posture
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Portnox achieves{" "}
                    {complianceReadiness.find((c) => c.vendorId === "portnox")?.overallReadiness.toFixed(0)}% compliance
                    readiness with automated controls, reducing risk exposure by $
                    {(
                      Math.max(...riskExposure.map((r) => r.totalRisk)) -
                      riskExposure.find((r) => r.vendorId === "portnox")!.totalRisk
                    ).toLocaleString()}
                    annually compared to the highest-risk option.
                  </p>
                </div>
              </div>
            )}

          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <ClipboardCheck className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Automation is Critical</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Vendors with automated compliance (
                {complianceReadiness
                  .filter((r) => r.automatedCompliance)
                  .map((r) => r.vendor)
                  .join(", ")}
                ) reduce audit preparation time by 70% and compliance violations by 85%. Manual processes increase both
                cost and risk.
              </p>
            </div>
          </div>

          {industryRequirements.some(
            (req) => COMPLIANCE_FRAMEWORKS[req as keyof typeof COMPLIANCE_FRAMEWORKS]?.penalty >= 1000000,
          ) && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100">High-Stakes Compliance</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Your compliance requirements include frameworks with penalties up to $
                  {Math.max(
                    ...industryRequirements.map(
                      (req) => COMPLIANCE_FRAMEWORKS[req as keyof typeof COMPLIANCE_FRAMEWORKS]?.penalty || 0,
                    ),
                  ).toLocaleString()}
                  . Choose vendors with proven compliance capabilities and automated controls.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
