"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  Tooltip,
} from "recharts"
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, Lock, Eye, Zap, Award, AlertCircle } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ComplianceRiskViewProps {
  results: CalculationResult[]
  configuration: CalculationConfiguration
  selectedVendors: string[]
}

const COMPLIANCE_FRAMEWORKS = [
  { id: "sox", name: "SOX", description: "Sarbanes-Oxley Act", color: "#3B82F6" },
  { id: "hipaa", name: "HIPAA", description: "Health Insurance Portability", color: "#10B981" },
  { id: "pci", name: "PCI DSS", description: "Payment Card Industry", color: "#8B5CF6" },
  { id: "gdpr", name: "GDPR", description: "General Data Protection Regulation", color: "#F59E0B" },
  { id: "iso27001", name: "ISO 27001", description: "Information Security Management", color: "#EF4444" },
  { id: "nist", name: "NIST", description: "Cybersecurity Framework", color: "#06B6D4" },
]

const RISK_CATEGORIES = [
  { name: "Data Breach", weight: 0.3, color: "#EF4444" },
  { name: "Compliance Violation", weight: 0.25, color: "#F59E0B" },
  { name: "Operational Downtime", weight: 0.2, color: "#8B5CF6" },
  { name: "Insider Threats", weight: 0.15, color: "#06B6D4" },
  { name: "Supply Chain", weight: 0.1, color: "#10B981" },
]

export default function ComplianceRiskView({
  results = [],
  configuration,
  selectedVendors = [],
}: ComplianceRiskViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Memoize compliance data calculations
  const complianceData = useMemo(() => {
    const safeResults = results.filter((result) => result && result.vendor)

    // Mock compliance scores based on vendor capabilities
    const getComplianceScore = (vendorId: string, framework: string) => {
      const baseScores: Record<string, Record<string, number>> = {
        portnox: { sox: 95, hipaa: 98, pci: 92, gdpr: 96, iso27001: 94, nist: 97 },
        cisco: { sox: 88, hipaa: 85, pci: 90, gdpr: 82, iso27001: 89, nist: 87 },
        aruba: { sox: 85, hipaa: 82, pci: 88, gdpr: 80, iso27001: 86, nist: 84 },
        meraki: { sox: 82, hipaa: 78, pci: 85, gdpr: 77, iso27001: 83, nist: 81 },
        forescout: { sox: 90, hipaa: 88, pci: 91, gdpr: 85, iso27001: 92, nist: 89 },
      }
      return baseScores[vendorId]?.[framework] || 70
    }

    // Calculate risk reduction scores
    const getRiskReduction = (vendorId: string, category: string) => {
      const baseReductions: Record<string, Record<string, number>> = {
        portnox: {
          "Data Breach": 85,
          "Compliance Violation": 90,
          "Operational Downtime": 75,
          "Insider Threats": 80,
          "Supply Chain": 70,
        },
        cisco: {
          "Data Breach": 70,
          "Compliance Violation": 75,
          "Operational Downtime": 80,
          "Insider Threats": 65,
          "Supply Chain": 60,
        },
        aruba: {
          "Data Breach": 65,
          "Compliance Violation": 70,
          "Operational Downtime": 75,
          "Insider Threats": 60,
          "Supply Chain": 55,
        },
      }
      return baseReductions[vendorId]?.[category] || 50
    }

    // Prepare radar chart data for compliance frameworks
    const radarData = COMPLIANCE_FRAMEWORKS.map((framework) => {
      const data: any = { framework: framework.name }
      safeResults.forEach((result) => {
        data[result.vendor] = getComplianceScore(result.vendor, framework.id)
      })
      return data
    })

    // Prepare risk reduction data
    const riskData = RISK_CATEGORIES.map((category) => {
      const data: any = { category: category.name, weight: category.weight }
      safeResults.forEach((result) => {
        data[result.vendor] = getRiskReduction(result.vendor, category.name)
      })
      return data
    })

    // Calculate overall compliance scores
    const overallScores = safeResults.map((result) => {
      const scores = COMPLIANCE_FRAMEWORKS.map((framework) => getComplianceScore(result.vendor, framework.id))
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length
      return {
        vendor: result.vendor,
        vendorName: result.vendorName || result.vendor,
        score: Math.round(average),
        grade: average >= 90 ? "A" : average >= 80 ? "B" : average >= 70 ? "C" : "D",
      }
    })

    return {
      radarData,
      riskData,
      overallScores,
      getComplianceScore,
      getRiskReduction,
    }
  }, [results])

  const { radarData, riskData, overallScores } = complianceData

  // Industry-specific compliance requirements
  const getIndustryRequirements = () => {
    const requirements: Record<string, string[]> = {
      healthcare: ["HIPAA", "SOX", "GDPR", "NIST"],
      financial: ["SOX", "PCI DSS", "GDPR", "ISO 27001"],
      government: ["NIST", "ISO 27001", "SOX"],
      education: ["GDPR", "NIST", "ISO 27001"],
      retail: ["PCI DSS", "GDPR", "SOX"],
      technology: ["SOX", "GDPR", "ISO 27001", "NIST"],
    }
    return requirements[configuration.industry] || ["GDPR", "ISO 27001", "NIST"]
  }

  const industryRequirements = getIndustryRequirements()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compliance & Risk Assessment</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Security posture and regulatory compliance analysis for {configuration.industry} industry
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          {industryRequirements.length} Frameworks Required
        </Badge>
      </div>

      {/* Industry Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your {configuration.industry} organization must comply with: {industryRequirements.join(", ")}. Portnox
          provides automated compliance reporting and audit trails for all major frameworks.
        </AlertDescription>
      </Alert>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
          <TabsTrigger value="audit-readiness">Audit Readiness</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Overall Compliance Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {overallScores.map((vendor, index) => (
              <Card
                key={vendor.vendor}
                className={index === 0 ? "border-green-200 bg-green-50 dark:bg-green-900/20" : ""}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{vendor.vendorName}</h3>
                    <Badge variant={vendor.grade === "A" ? "default" : "secondary"}>{vendor.grade}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Score</span>
                      <span className="font-medium">{vendor.score}%</span>
                    </div>
                    <Progress value={vendor.score} className="h-2" />
                  </div>
                  {index === 0 && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      Industry Leader
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Compliance Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="framework" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    {results.slice(0, 3).map((result, index) => (
                      <Radar
                        key={result.vendor}
                        name={result.vendorName || result.vendor}
                        dataKey={result.vendor}
                        stroke={["#10B981", "#3B82F6", "#8B5CF6"][index]}
                        fill={["#10B981", "#3B82F6", "#8B5CF6"][index]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Frameworks Tab */}
        <TabsContent value="frameworks" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPLIANCE_FRAMEWORKS.map((framework) => (
              <Card key={framework.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: framework.color }}></div>
                    {framework.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{framework.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.slice(0, 3).map((result) => {
                    const score = complianceData.getComplianceScore(result.vendor, framework.id)
                    return (
                      <div key={result.vendor} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{result.vendorName || result.vendor}</span>
                          <span className="font-medium">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    )
                  })}
                  {industryRequirements.includes(framework.name) && (
                    <Badge variant="outline" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Required for {configuration.industry}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="risk-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Reduction Analysis</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Percentage reduction in risk probability by category
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: number) => [`${value}%`, "Risk Reduction"]} />
                    {results.slice(0, 3).map((result, index) => (
                      <Bar
                        key={result.vendor}
                        dataKey={result.vendor}
                        fill={["#10B981", "#3B82F6", "#8B5CF6"][index]}
                        name={result.vendorName || result.vendor}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Risk Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RISK_CATEGORIES.map((category) => (
              <Card key={category.name}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <h4 className="font-medium">{category.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Weight: {(category.weight * 100).toFixed(0)}% of total risk
                  </p>
                  {results.slice(0, 1).map((result) => {
                    const reduction = complianceData.getRiskReduction(result.vendor, category.name)
                    return (
                      <div key={result.vendor} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Portnox Reduction</span>
                          <span className="font-medium text-green-600">{reduction}%</span>
                        </div>
                        <Progress value={reduction} className="h-2" />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Audit Readiness Tab */}
        <TabsContent value="audit-readiness" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Audit Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Automated Compliance Reports</span>
                  </div>
                  <Badge variant="outline">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Audit Trail Logging</span>
                  </div>
                  <Badge variant="outline">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Policy Enforcement Records</span>
                  </div>
                  <Badge variant="outline">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Incident Response Logs</span>
                  </div>
                  <Badge variant="outline">Ready</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Audit Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Pre-audit Preparation</p>
                      <p className="text-xs text-gray-500">1-2 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Documentation Review</p>
                      <p className="text-xs text-gray-500">2-3 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Technical Assessment</p>
                      <p className="text-xs text-gray-500">3-5 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Final Report</p>
                      <p className="text-xs text-gray-500">1-2 weeks</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Award className="h-4 w-4" />
                    <span>Estimated audit duration: 4-6 weeks</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Automation Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Portnox Compliance Automation Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium mb-2">90% Faster Reporting</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automated compliance reports generated in minutes, not weeks
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium mb-2">Real-time Monitoring</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Continuous compliance monitoring with instant alerts
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Lock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium mb-2">Zero-Trust Enforcement</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automated policy enforcement ensures continuous compliance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
