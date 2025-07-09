"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
} from "recharts"
import { Shield, Lock, AlertTriangle, CheckCircle2, Brain, ShieldCheck, Bug } from "lucide-react"
import type { CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

// Industry-specific security standards and compliance frameworks
const INDUSTRY_SECURITY_STANDARDS = {
  healthcare: {
    name: "Healthcare",
    frameworks: [
      {
        name: "HIPAA",
        fullName: "Health Insurance Portability and Accountability Act",
        requirements: ["Access Controls", "Audit Logs", "Encryption", "Risk Assessments", "Breach Notification"],
        criticality: "mandatory",
        penalties: "Up to $1.5M per incident",
      },
      {
        name: "HITECH",
        fullName: "Health Information Technology for Economic and Clinical Health Act",
        requirements: ["Enhanced HIPAA", "Breach Notification", "Business Associate Agreements"],
        criticality: "mandatory",
        penalties: "Up to $1.5M per violation",
      },
      {
        name: "FDA 21 CFR Part 11",
        fullName: "FDA Electronic Records and Signatures",
        requirements: ["Electronic Signatures", "Audit Trails", "System Validation", "Access Controls"],
        criticality: "regulated",
        penalties: "FDA enforcement actions",
      },
      {
        name: "NIST 800-66",
        fullName: "HIPAA Security Rule Implementation Guide",
        requirements: ["Security Controls", "Risk Management", "Incident Response"],
        criticality: "recommended",
        penalties: "Compliance gaps",
      },
    ],
    securityBenchmarks: {
      minimumSecurityScore: 85,
      requiredFeatures: ["encryption", "auditLogs", "accessControls", "riskAssessment"],
      breachCostAverage: 10930000,
      regulatoryFines: 1500000,
    },
  },
  finance: {
    name: "Financial Services",
    frameworks: [
      {
        name: "SOX",
        fullName: "Sarbanes-Oxley Act",
        requirements: ["Internal Controls", "Financial Reporting", "Audit Trails", "Access Controls"],
        criticality: "mandatory",
        penalties: "Criminal prosecution, $5M fines",
      },
      {
        name: "PCI DSS",
        fullName: "Payment Card Industry Data Security Standard",
        requirements: ["Network Segmentation", "Encryption", "Access Controls", "Monitoring", "Testing"],
        criticality: "mandatory",
        penalties: "$5K-$100K per month",
      },
      {
        name: "GLBA",
        fullName: "Gramm-Leach-Bliley Act",
        requirements: ["Privacy Notices", "Safeguards Rule", "Pretexting Protection"],
        criticality: "mandatory",
        penalties: "$100K per violation",
      },
      {
        name: "FFIEC",
        fullName: "Federal Financial Institutions Examination Council",
        requirements: ["Risk Management", "Authentication", "Incident Response", "Business Continuity"],
        criticality: "regulatory",
        penalties: "Regulatory enforcement",
      },
      {
        name: "NYDFS 23 NYCRR 500",
        fullName: "New York Department of Financial Services Cybersecurity Regulation",
        requirements: ["CISO Designation", "Risk Assessment", "Multi-factor Authentication", "Encryption"],
        criticality: "state-mandatory",
        penalties: "$1K per day per violation",
      },
    ],
    securityBenchmarks: {
      minimumSecurityScore: 90,
      requiredFeatures: ["encryption", "mfa", "networkSegmentation", "continuousMonitoring"],
      breachCostAverage: 5720000,
      regulatoryFines: 5000000,
    },
  },
  government: {
    name: "Government",
    frameworks: [
      {
        name: "FedRAMP",
        fullName: "Federal Risk and Authorization Management Program",
        requirements: ["Security Controls", "Continuous Monitoring", "Incident Response", "Documentation"],
        criticality: "mandatory",
        penalties: "Contract termination",
      },
      {
        name: "FISMA",
        fullName: "Federal Information Security Management Act",
        requirements: ["Risk Management", "Security Controls", "Continuous Monitoring", "Annual Assessments"],
        criticality: "mandatory",
        penalties: "Agency sanctions",
      },
      {
        name: "NIST 800-53",
        fullName: "Security and Privacy Controls for Federal Information Systems",
        requirements: ["Access Control", "Audit & Accountability", "Configuration Management", "Incident Response"],
        criticality: "mandatory",
        penalties: "Compliance violations",
      },
      {
        name: "CJIS",
        fullName: "Criminal Justice Information Services",
        requirements: ["Advanced Authentication", "Audit Logs", "Encryption", "Physical Security"],
        criticality: "law-enforcement",
        penalties: "Access revocation",
      },
      {
        name: "ITAR",
        fullName: "International Traffic in Arms Regulations",
        requirements: ["Export Controls", "Access Restrictions", "Audit Trails", "Physical Security"],
        criticality: "defense",
        penalties: "Criminal prosecution",
      },
    ],
    securityBenchmarks: {
      minimumSecurityScore: 95,
      requiredFeatures: ["encryption", "mfa", "auditLogs", "continuousMonitoring", "incidentResponse"],
      breachCostAverage: 4740000,
      regulatoryFines: 10000000,
    },
  },
}

// Compliance scoring function
const calculateComplianceScore = (vendor: any, industry: string) => {
  const standards = INDUSTRY_SECURITY_STANDARDS[industry as keyof typeof INDUSTRY_SECURITY_STANDARDS]
  if (!standards) return 0

  const vendorFeatures = vendor.features
  const requiredFeatures = standards.securityBenchmarks.requiredFeatures

  let score = 0
  const totalRequirements = requiredFeatures.length

  requiredFeatures.forEach((feature) => {
    switch (feature) {
      case "encryption":
        if (vendorFeatures.security?.encryption) score += 1
        break
      case "auditLogs":
        if (vendorFeatures.core?.reporting) score += 1
        break
      case "accessControls":
        if (vendorFeatures.core?.policyEnforcement) score += 1
        break
      case "mfa":
        if (vendorFeatures.core?.certificateAuth) score += 1
        break
      case "networkSegmentation":
        if (vendorFeatures.advanced?.microsegmentation) score += 1
        break
      case "continuousMonitoring":
        if (vendorFeatures.advanced?.behaviorAnalytics) score += 1
        break
      case "incidentResponse":
        if (vendorFeatures.security?.incidentResponse) score += 1
        break
      case "riskAssessment":
        if (vendorFeatures.advanced?.riskScoring) score += 1
        break
    }
  })

  return Math.round((score / totalRequirements) * 100)
}

// Define the types for the cybersecurity view
interface TCOResult {
  vendorId: string
  vendorName: string
  vendor: string
  total: number
  totalCost: number
  risk: {
    securityScore: number
    breachReduction: number
    vendorRisk: number
  }
  roi: {
    breachReduction: number
    laborSavingsFTE: number
    paybackMonths: number
    percentage: number
    annualSavings: number
  }
  vendorData: {
    features: {
      core: {
        certificateAuth: boolean
      }
      advanced: {
        zeroTrust: boolean
        riskBasedAccess: boolean
        microsegmentation: boolean
        threatIntelligence: boolean
        behavioralAnalytics: boolean
        aiDriven: boolean
        cloudPKI: boolean
        iotProfiling: boolean
      }
    }
    security: {
      zeroTrustScore: number
      vulnerabilities: {
        critical_count: number
        last_cve: string
        patch_frequency: string
      }
      riskReduction: {
        unauthorized_access: number
        lateral_movement: number
        data_breach: number
        insider_threat: number
        compliance_violation: number
      }
      breachCostSavings: {
        average_breach_cost: number
        reduction_percentage: number
        insurance_discount: number
      }
    }
    scalability: {
      cloudNative: boolean
    }
  }
}

interface CybersecurityPostureViewProps {
  results: TCOResult[]
  config: CalculationConfiguration
}

export default function CybersecurityPostureView({ results, config }: CybersecurityPostureViewProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")

  // Security metrics comparison
  const securityMetrics = useMemo(() => {
    return results.map((r) => {
      const vendor = r.vendorData
      const features = vendor.features

      // Calculate security capabilities score
      const capabilities = {
        zeroTrust: features.advanced.zeroTrust ? 100 : 0,
        riskBased: features.advanced.riskBasedAccess ? 90 : 0,
        microsegmentation: features.advanced.microsegmentation ? 85 : 0,
        threatIntel: features.advanced.threatIntelligence ? 80 : 0,
        behavioral: features.advanced.behavioralAnalytics ? 95 : 0,
        aiDriven: features.advanced.aiDriven ? 90 : 0,
        cloudPKI: features.advanced.cloudPKI ? 75 : 0,
        continuousAuth: vendor.features.core.certificateAuth ? 70 : 0,
      }

      const capabilityScore =
        Object.values(capabilities).reduce((sum, val) => sum + val, 0) / Object.keys(capabilities).length

      return {
        vendor: r.vendorName,
        vendorId: r.vendorId,
        overallScore: r.risk.securityScore,
        zeroTrustScore: vendor.security.zeroTrustScore,
        breachReduction: r.risk.breachReduction,
        capabilityScore,
        capabilities,
        vulnerabilities: vendor.security.vulnerabilities,
        riskReduction: vendor.security.riskReduction,
      }
    })
  }, [results])

  // Threat protection radar data
  const threatProtectionData = useMemo(() => {
    const categories = [
      "Unauthorized Access",
      "Lateral Movement",
      "Data Breach",
      "Insider Threat",
      "Compliance Violation",
      "Zero Day Attacks",
      "IoT Threats",
      "Cloud Threats",
    ]

    return categories.map((category) => {
      const dataPoint: any = { category }

      results.forEach((r) => {
        const vendor = r.vendorData
        let score = 0

        switch (category) {
          case "Unauthorized Access":
            score = vendor.security.riskReduction.unauthorized_access
            break
          case "Lateral Movement":
            score = vendor.security.riskReduction.lateral_movement
            break
          case "Data Breach":
            score = vendor.security.riskReduction.data_breach
            break
          case "Insider Threat":
            score = vendor.security.riskReduction.insider_threat
            break
          case "Compliance Violation":
            score = vendor.security.riskReduction.compliance_violation
            break
          case "Zero Day Attacks":
            score = vendor.features.advanced.threatIntelligence ? 80 : 40
            break
          case "IoT Threats":
            score = vendor.features.advanced.iotProfiling ? 85 : 30
            break
          case "Cloud Threats":
            score = vendor.scalability.cloudNative ? 90 : 50
            break
        }

        dataPoint[r.vendorName] = score
      })

      return dataPoint
    })
  }, [results])

  // Security maturity levels
  const maturityLevels = useMemo(() => {
    return results.map((r) => {
      const score = r.risk.securityScore
      let level = "Initial"
      let levelScore = 1
      let color = "#EF4444" // red

      if (score >= 90) {
        level = "Optimized"
        levelScore = 5
        color = "#10B981" // green
      } else if (score >= 80) {
        level = "Managed"
        levelScore = 4
        color = "#3B82F6" // blue
      } else if (score >= 70) {
        level = "Defined"
        levelScore = 3
        color = "#F59E0B" // amber
      } else if (score >= 60) {
        level = "Repeatable"
        levelScore = 2
        color = "#F97316" // orange
      }

      return {
        vendor: r.vendorName,
        vendorId: r.vendorId,
        score,
        level,
        levelScore,
        color,
        gap: 100 - score,
      }
    })
  }, [results])

  // Vulnerability analysis
  const vulnerabilityData = useMemo(() => {
    return results.map((r) => ({
      vendor: r.vendorName,
      vendorId: r.vendorId,
      criticalCVEs: r.vendorData.security.vulnerabilities.critical_count,
      lastCVE: r.vendorData.security.vulnerabilities.last_cve,
      patchFrequency: r.vendorData.security.vulnerabilities.patch_frequency,
      vendorRisk: r.risk.vendorRisk,
      hasRecentCVE:
        r.vendorData.security.vulnerabilities.last_cve !== "None" &&
        r.vendorData.security.vulnerabilities.last_cve !== "None recent",
    }))
  }, [results])

  // Security investment efficiency
  const investmentEfficiency = useMemo(() => {
    return results.map((r) => ({
      vendor: r.vendorName,
      vendorId: r.vendorId,
      costPerPoint: r.totalCost / r.risk.securityScore,
      securityROI:
        (r.risk.breachReduction * r.vendorData.security.breachCostSavings.average_breach_cost * 0.1) / r.totalCost,
      breachCostSavings: r.vendorData.security.breachCostSavings.reduction_percentage,
      insuranceDiscount: r.vendorData.security.breachCostSavings.insurance_discount,
    }))
  }, [results])

  // Colors
  const COLORS = {
    portnox: "#3B82F6",
    high: "#10B981",
    medium: "#F59E0B",
    low: "#EF4444",
    gray: "#6B7280",
  }

  // Get severity color
  const getSeverityColor = (score: number) => {
    if (score >= 80) return COLORS.high
    if (score >= 60) return COLORS.medium
    return COLORS.low
  }

  return (
    <div className="space-y-6">
      {/* Security Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Highest Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.max(...results.map((r) => r.risk.securityScore))}/100</div>
            <p className="text-xs text-muted-foreground mt-1">
              {
                results.find((r) => r.risk.securityScore === Math.max(...results.map((r) => r.risk.securityScore)))
                  ?.vendorName
              }
            </p>
            <Progress value={Math.max(...results.map((r) => r.risk.securityScore))} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-blue-600" />
              Zero Trust Leaders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {securityMetrics.filter((m) => m.capabilities.zeroTrust === 100).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">vendors with Zero Trust</p>
            <div className="flex gap-1 mt-2">
              {results.map((r) => (
                <div
                  key={r.vendorId}
                  className={`h-2 flex-1 rounded ${
                    r.vendorData.features.advanced.zeroTrust ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  title={r.vendorName}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              Breach Risk Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.max(...results.map((r) => r.risk.breachReduction)).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">maximum risk reduction</p>
            {portnoxResult && (
              <Badge
                variant="outline"
                className="mt-2 text-xs"
                style={{
                  borderColor:
                    portnoxResult.risk.breachReduction === Math.max(...results.map((r) => r.risk.breachReduction))
                      ? "#10B981"
                      : "#6B7280",
                }}
              >
                Portnox: {portnoxResult.risk.breachReduction.toFixed(0)}%
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bug className="h-4 w-4 text-red-600" />
              Active Vulnerabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {vulnerabilityData.reduce((sum, v) => sum + v.criticalCVEs, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">critical CVEs across vendors</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="destructive" className="text-xs">
                {vulnerabilityData.filter((v) => v.hasRecentCVE).length} vendors affected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Security Posture Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Industry-Specific Compliance Insight */}
          {INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS] && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
              <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100">
                  {INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS].name}{" "}
                  Industry Requirements
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  Your industry requires a minimum security score of{" "}
                  {
                    INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS]
                      .securityBenchmarks.minimumSecurityScore
                  }
                  /100.
                  {
                    results.filter(
                      (r) =>
                        r.risk.securityScore >=
                        INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS]
                          .securityBenchmarks.minimumSecurityScore,
                    ).length
                  }
                  of {results.length} vendors meet this standard. Average breach cost in your industry is $
                  {(
                    INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS]
                      .securityBenchmarks.breachCostAverage / 1000000
                  ).toFixed(1)}
                  M with potential regulatory fines up to $
                  {(
                    INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS]
                      .securityBenchmarks.regulatoryFines / 1000000
                  ).toFixed(1)}
                  M.
                </p>
              </div>
            </div>
          )}

          {portnoxResult && portnoxResult.risk.securityScore >= 90 && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 dark:text-green-100">Industry-Leading Security Posture</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Portnox achieves a {portnoxResult.risk.securityScore}/100 security score with Zero Trust architecture,
                  reducing breach risk by {portnoxResult.risk.breachReduction.toFixed(0)}%. This translates to $
                  {(
                    (portnoxResult.vendorData.security.breachCostSavings.average_breach_cost *
                      portnoxResult.vendorData.security.breachCostSavings.reduction_percentage) /
                    100
                  ).toLocaleString()}
                  in potential breach cost savings.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">AI and Zero Trust Adoption</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                {securityMetrics.filter((m) => m.capabilities.aiDriven > 0).length} vendors offer AI-driven security,
                while {securityMetrics.filter((m) => m.capabilities.zeroTrust > 0).length} support Zero Trust
                architecture. These next-generation capabilities are critical for defending against sophisticated
                threats in {config.industry} environments.
              </p>
            </div>
          </div>

          {vulnerabilityData.some((v) => v.criticalCVEs > 0) && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                  Active Vulnerability Considerations
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  {vulnerabilityData.filter((v) => v.criticalCVEs > 0).length} vendors have active critical CVEs.
                  Consider patch management capabilities and vendor response times when evaluating security posture.
                  Cloud-native solutions typically offer automatic patching without maintenance windows.
                </p>
              </div>
            </div>
          )}

          {/* Regulatory Risk Warning */}
          {config.industry === "healthcare" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 dark:text-red-100">HIPAA Compliance Critical</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Healthcare organizations face up to $1.5M in HIPAA violations per incident. Ensure your NAC solution
                  provides comprehensive audit trails, encryption, and access controls. Non-compliance can result in
                  both regulatory fines and civil lawsuits.
                </p>
              </div>
            </div>
          )}

          {config.industry === "finance" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 dark:text-red-100">Financial Regulatory Requirements</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Financial institutions must comply with SOX, PCI-DSS, and state regulations like NYDFS 23 NYCRR 500.
                  Violations can result in criminal prosecution and fines up to $5M. Ensure multi-factor authentication,
                  encryption, and continuous monitoring capabilities.
                </p>
              </div>
            </div>
          )}

          {config.industry === "government" && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 dark:text-red-100">Government Security Standards</h4>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  Government agencies require FedRAMP authorization and NIST 800-53 compliance. Solutions must meet
                  FISMA requirements with continuous monitoring and incident response capabilities. Non-compliance can
                  result in contract termination and security clearance issues.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Security Analysis */}
      <Tabs defaultValue="threat-protection" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="threat-protection">Threat Protection</TabsTrigger>
          <TabsTrigger value="maturity">Security Maturity</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="compliance">Industry Compliance</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
        </TabsList>

        <TabsContent value="threat-protection" className="space-y-6">
          {/* Threat Protection Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Threat Protection Capabilities</CardTitle>
              <CardDescription>Comparative analysis of protection against various threat vectors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={threatProtectionData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  {results.map((result, index) => (
                    <Radar
                      key={result.vendorId}
                      name={result.vendorName}
                      dataKey={result.vendorName}
                      stroke={result.vendorId === "portnox" ? COLORS.portnox : COLORS.gray}
                      fill={result.vendorId === "portnox" ? COLORS.portnox : COLORS.gray}
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

          {/* Security Capabilities Comparison */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Security Features</CardTitle>
                <CardDescription>Next-generation security capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["zeroTrust", "aiDriven", "behavioral", "riskBased"].map((feature) => {
                    const vendorsWithFeature = securityMetrics.filter(
                      (m) => m.capabilities[feature as keyof typeof m.capabilities] > 0,
                    )
                    return (
                      <div key={feature} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">
                            {feature.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {vendorsWithFeature.length} vendors
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          {results.map((r) => {
                            const hasFeature = securityMetrics.find((metric) => metric.vendorId === r.vendorId)
                              ?.capabilities[feature as keyof typeof r.capabilities]
                            return (
                              <div
                                key={r.vendorId}
                                className={`h-6 flex-1 rounded flex items-center justify-center ${
                                  hasFeature ? "bg-green-500" : "bg-gray-300"
                                }`}
                                title={r.vendorName}
                              >
                                {hasFeature ? <CheckCircle2 className="h-3 w-3 text-white" /> : null}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Score Distribution</CardTitle>
                <CardDescription>Overall security posture comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={securityMetrics} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar
                      dataKey="overallScore"
                      fill={(entry: any) => getSeverityColor(entry.overallScore)}
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maturity" className="space-y-6">
          {/* Security Maturity Model */}
          <Card>
            <CardHeader>
              <CardTitle>Security Maturity Assessment</CardTitle>
              <CardDescription>Based on NIST Cybersecurity Framework maturity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maturityLevels.map((vendor) => (
                  <div key={vendor.vendorId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{vendor.vendor}</span>
                        <Badge variant="outline" style={{ borderColor: vendor.color, color: vendor.color }}>
                          {vendor.level}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold">{vendor.score}/100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-8 bg-muted rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 flex">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`flex-1 border-r border-background ${
                                level <= vendor.levelScore ? "" : "opacity-30"
                              }`}
                              style={{
                                backgroundColor: level <= vendor.levelScore ? vendor.color : "#e5e7eb",
                              }}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-around text-xs font-medium">
                          <span className={vendor.levelScore >= 1 ? "text-white" : ""}>Initial</span>
                          <span className={vendor.levelScore >= 2 ? "text-white" : ""}>Repeatable</span>
                          <span className={vendor.levelScore >= 3 ? "text-white" : ""}>Defined</span>
                          <span className={vendor.levelScore >= 4 ? "text-white" : ""}>Managed</span>
                          <span className={vendor.levelScore >= 5 ? "text-white" : ""}>Optimized</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maturity Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Maturity Gap Analysis</CardTitle>
              <CardDescription>Distance from optimal security maturity (100 points)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={maturityLevels}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill={COLORS.portnox} name="Current Score" />
                  <Bar dataKey="gap" fill={COLORS.low} name="Gap to 100" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-6">
          {/* Vulnerability Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Vulnerability & Patch Management</CardTitle>
              <CardDescription>Known vulnerabilities and vendor patch frequency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilityData
                  .sort((a, b) => b.criticalCVEs - a.criticalCVEs)
                  .map((vendor) => (
                    <div key={vendor.vendorId} className="space-y-2 p-4 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{vendor.vendor}</span>
                          {vendor.criticalCVEs === 0 ? (
                            <Badge variant="outline" className="text-xs border-green-600 text-green-600">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              No Critical CVEs
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {vendor.criticalCVEs} Critical CVEs
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Patch Frequency</p>
                          <p className="text-xs text-muted-foreground">{vendor.patchFrequency}</p>
                        </div>
                      </div>
                      {vendor.lastCVE !== "None" && vendor.lastCVE !== "None recent" && (
                        <Alert className="mt-2">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-xs">Latest CVE: {vendor.lastCVE}</AlertDescription>
                        </Alert>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Vendor Risk Score</span>
                        <div className="flex items-center gap-2">
                          <Progress value={100 - vendor.vendorRisk} className="w-24 h-2" />
                          <span className="font-medium">{100 - vendor.vendorRisk}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          {/* Security Investment Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle>Security Investment Efficiency</CardTitle>
              <CardDescription>Cost per security point and breach prevention ROI</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={investmentEfficiency}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="vendor" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis yAxisId="left" tickFormatter={(value) => `$${value.toFixed(0)}`} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      if (name === "Cost per Security Point") return `$${value.toFixed(2)}`
                      return `${(value * 100).toFixed(1)}%`
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="costPerPoint" fill={COLORS.portnox} name="Cost per Security Point" />
                  <Bar yAxisId="right" dataKey="securityROI" fill={COLORS.high} name="Security ROI" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Insurance and Risk Reduction Benefits */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Breach Cost Reduction</CardTitle>
                <CardDescription>Percentage reduction in potential breach costs</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={investmentEfficiency} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="vendor" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Bar
                      dataKey="breachCostSavings"
                      fill={(entry: any) => (entry.vendorId === "portnox" ? COLORS.portnox : COLORS.gray)}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cyber Insurance Benefits</CardTitle>
                <CardDescription>Premium discounts from improved security posture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {investmentEfficiency
                    .sort((a, b) => b.insuranceDiscount - a.insuranceDiscount)
                    .map((vendor) => (
                      <div key={vendor.vendorId} className="flex items-center justify-between">
                        <span className="text-sm">{vendor.vendor}</span>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={vendor.insuranceDiscount}
                            className="w-24 h-2"
                            style={
                              {
                                "--progress-color": vendor.vendorId === "portnox" ? COLORS.portnox : COLORS.gray,
                              } as any
                            }
                          />
                          <Badge variant="outline" className="text-xs min-w-[50px] text-center">
                            {vendor.insuranceDiscount}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Industry Standards Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Industry Security Standards Compliance</CardTitle>
              <CardDescription>
                Compliance assessment for{" "}
                {INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS]?.name ||
                  config.industry}{" "}
                industry requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS] && (
                <div className="space-y-6">
                  {/* Compliance Framework Cards */}
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {INDUSTRY_SECURITY_STANDARDS[
                      config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS
                    ].frameworks.map((framework) => (
                      <Card key={framework.name} className="relative">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">{framework.name}</CardTitle>
                            <Badge
                              variant={
                                framework.criticality === "mandatory"
                                  ? "destructive"
                                  : framework.criticality === "regulatory"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {framework.criticality}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">{framework.fullName}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Key Requirements:</p>
                            <div className="flex flex-wrap gap-1">
                              {framework.requirements.slice(0, 3).map((req) => (
                                <Badge key={req} variant="outline" className="text-xs">
                                  {req}
                                </Badge>
                              ))}
                              {framework.requirements.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{framework.requirements.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="pt-2 border-t">
                            <p className="text-xs font-medium text-red-600">Penalties:</p>
                            <p className="text-xs text-muted-foreground">{framework.penalties}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Vendor Compliance Comparison */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Vendor Compliance Assessment</CardTitle>
                      <CardDescription>
                        How well each vendor meets{" "}
                        {INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS].name}{" "}
                        industry requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.map((result) => {
                          const complianceScore = calculateComplianceScore(result.vendorData, config.industry)
                          const benchmark =
                            INDUSTRY_SECURITY_STANDARDS[config.industry as keyof typeof INDUSTRY_SECURITY_STANDARDS]
                              .securityBenchmarks
                          const meetsMinimum = result.risk.securityScore >= benchmark.minimumSecurityScore

                          return (
                            <div key={result.vendorId} className="space-y-3 p-4 rounded-lg border">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="font-medium">{result.vendorName}</span>
                                  {meetsMinimum ? (
                                    <Badge variant="outline" className="text-xs border-green-600 text-green-600">
                                      <CheckCircle2 className="h-3 w-3 mr-1" />
                                      Meets Standards
                                    </Badge>
                                  ) : (
                                    <Badge variant="destructive" className="text-xs">
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      Below Minimum
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium">Compliance Score</p>
                                  <p className="text-lg font-bold">{complianceScore}%</p>
                                </div>
                              </div>

                              <div className="grid gap-3 md:grid-cols-2">
                                <div>
                                  <p className="text-sm font-medium mb-2">Security Score vs. Minimum</p>
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={(result.risk.securityScore / benchmark.minimumSecurityScore) * 100}
                                      className="flex-1 h-2"
                                    />
                                    <span className="text-sm font-medium">
                                      {result.risk.securityScore}/{benchmark.minimumSecurityScore}
                                    </span>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium mb-2">Feature Compliance</p>
                                  <div className="flex items-center gap-2">
                                    <Progress value={complianceScore} className="flex-1 h-2" />
                                    <span className="text-sm font-medium">{complianceScore}%</span>
                                  </div>
                                </div>
                              </div>

                              {/* Risk Assessment */}
                              <div className="pt-3 border-t">
                                <div className="grid gap-3 md:grid-cols-3 text-sm">
                                  <div>
                                    <p className="font-medium text-muted-foreground">Breach Risk</p>
                                    <p className="text-lg font-semibold text-red-600">
                                      $
                                      {(
                                        (benchmark.breachCostAverage * (100 - result.risk.breachReduction)) /
                                        100 /
                                        1000000
                                      ).toFixed(1)}
                                      M
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-muted-foreground">Regulatory Risk</p>
                                    <p className="text-lg font-semibold text-orange-600">
                                      ${(benchmark.regulatoryFines / 1000000).toFixed(1)}M max
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-muted-foreground">Insurance Discount</p>
                                    <p className="text-lg font-semibold text-green-600">
                                      {result.vendorData.security.breachCostSavings.insurance_discount}%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
