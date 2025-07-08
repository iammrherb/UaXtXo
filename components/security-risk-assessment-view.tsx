"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  Lock,
  Zap,
  FileText,
  Download,
  Info,
  Target,
  Activity,
} from "lucide-react"

interface SecurityRiskAssessmentViewProps {
  config?: {
    industry: string
    deviceCount: number
    timeframe: number
    deploymentModel: string
    complianceRequirements: string[]
    selectedVendors: string[]
  }
}

interface SecurityMetric {
  name: string
  weight: number
  description: string
  category: "authentication" | "authorization" | "monitoring" | "compliance" | "infrastructure"
}

const SECURITY_METRICS: SecurityMetric[] = [
  {
    name: "Multi-Factor Authentication",
    weight: 15,
    description: "Support for multiple authentication methods",
    category: "authentication",
  },
  {
    name: "Zero Trust Architecture",
    weight: 20,
    description: "Implementation of zero trust security model",
    category: "authorization",
  },
  {
    name: "Real-time Monitoring",
    weight: 15,
    description: "Continuous security monitoring and alerting",
    category: "monitoring",
  },
  {
    name: "Compliance Frameworks",
    weight: 10,
    description: "Support for industry compliance standards",
    category: "compliance",
  },
  {
    name: "Encryption Standards",
    weight: 10,
    description: "Data encryption in transit and at rest",
    category: "infrastructure",
  },
  {
    name: "Vulnerability Management",
    weight: 10,
    description: "Regular security updates and patch management",
    category: "infrastructure",
  },
  {
    name: "Access Control Granularity",
    weight: 10,
    description: "Fine-grained access control policies",
    category: "authorization",
  },
  {
    name: "Incident Response",
    weight: 10,
    description: "Automated incident detection and response",
    category: "monitoring",
  },
]

const RISK_CATEGORIES = {
  authentication: { name: "Authentication", icon: Lock, color: "blue" },
  authorization: { name: "Authorization", icon: Shield, color: "green" },
  monitoring: { name: "Monitoring", icon: Eye, color: "purple" },
  compliance: { name: "Compliance", icon: FileText, color: "orange" },
  infrastructure: { name: "Infrastructure", icon: Zap, color: "red" },
}

export default function SecurityRiskAssessmentView({
  config = {
    industry: "HEALTHCARE",
    deviceCount: 500,
    timeframe: 3,
    deploymentModel: "CLOUD",
    complianceRequirements: ["HIPAA", "SOC2"],
    selectedVendors: ["portnox", "cisco_ise", "aruba_clearpass", "forescout"],
  },
}: SecurityRiskAssessmentViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [comparisonMode, setComparisonMode] = useState<"absolute" | "relative">("relative")

  // Calculate security scores for each vendor
  const vendorSecurityAnalysis = useMemo(() => {
    const analysis: Record<string, any> = {}

    config.selectedVendors.forEach((vendorId) => {
      const vendor = COMPREHENSIVE_VENDOR_DATA[vendorId]
      if (!vendor) return

      const securityData = vendor.security || {}
      const overallScore = securityData.overallScore || 0
      const vulnerabilities = securityData.vulnerabilities || []
      const certifications = securityData.certifications || []

      // Calculate category scores
      const categoryScores: Record<string, number> = {}
      Object.keys(RISK_CATEGORIES).forEach((category) => {
        const categoryMetrics = SECURITY_METRICS.filter((m) => m.category === category)
        const totalWeight = categoryMetrics.reduce((sum, m) => sum + m.weight, 0)

        // Simulate category-specific scores based on overall score with some variation
        const baseScore = overallScore
        const variation = (Math.random() - 0.5) * 20 // ±10 points variation
        categoryScores[category] = Math.max(0, Math.min(100, baseScore + variation))
      })

      analysis[vendorId] = {
        vendor,
        overallScore,
        categoryScores,
        vulnerabilities,
        certifications,
        riskLevel: overallScore >= 80 ? "low" : overallScore >= 60 ? "medium" : "high",
        strengths: securityData.strengths || [],
        weaknesses: securityData.weaknesses || [],
      }
    })

    return analysis
  }, [config.selectedVendors])

  // Calculate industry-specific risk factors
  const industryRiskFactors = useMemo(() => {
    const factors = {
      HEALTHCARE: [
        { name: "HIPAA Compliance", severity: "high", impact: "Data breach penalties up to $1.5M" },
        { name: "Patient Data Protection", severity: "high", impact: "Reputation and legal liability" },
        { name: "Medical Device Security", severity: "medium", impact: "Patient safety concerns" },
      ],
      FINANCE: [
        { name: "PCI DSS Compliance", severity: "high", impact: "Payment processing restrictions" },
        { name: "SOX Compliance", severity: "high", impact: "Financial reporting accuracy" },
        { name: "Customer Data Protection", severity: "high", impact: "Regulatory fines and penalties" },
      ],
      EDUCATION: [
        { name: "FERPA Compliance", severity: "medium", impact: "Student privacy violations" },
        { name: "Research Data Protection", severity: "medium", impact: "Intellectual property theft" },
        { name: "Campus Network Security", severity: "medium", impact: "Operational disruption" },
      ],
      GOVERNMENT: [
        { name: "FedRAMP Compliance", severity: "high", impact: "Loss of government contracts" },
        { name: "FISMA Requirements", severity: "high", impact: "Security clearance issues" },
        { name: "Classified Data Protection", severity: "high", impact: "National security implications" },
      ],
    }

    return factors[config.industry as keyof typeof factors] || factors.HEALTHCARE
  }, [config.industry])

  // Calculate overall risk assessment
  const overallRiskAssessment = useMemo(() => {
    if (Object.keys(vendorSecurityAnalysis).length === 0) {
      return { level: "unknown", score: 0, recommendations: [] }
    }

    const scores = Object.values(vendorSecurityAnalysis).map((analysis: any) => analysis.overallScore)
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
    const highestScore = Math.max(...scores)
    const lowestScore = Math.min(...scores)

    const level = averageScore >= 80 ? "low" : averageScore >= 60 ? "medium" : "high"

    const recommendations = []
    if (averageScore < 70) {
      recommendations.push("Consider prioritizing vendors with higher security scores")
    }
    if (highestScore - lowestScore > 30) {
      recommendations.push("Large security score variance detected - review vendor selection")
    }
    if (averageScore < 60) {
      recommendations.push("Current selection may not meet enterprise security requirements")
    }

    return {
      level,
      score: Math.round(averageScore),
      highestScore: Math.round(highestScore),
      lowestScore: Math.round(lowestScore),
      variance: Math.round(highestScore - lowestScore),
      recommendations,
    }
  }, [vendorSecurityAnalysis])

  const SecurityScoreCard = ({ vendorId, analysis }: { vendorId: string; analysis: any }) => {
    const { vendor, overallScore, categoryScores, riskLevel, vulnerabilities, certifications } = analysis

    return (
      <Card
        className={`${riskLevel === "high" ? "border-red-200" : riskLevel === "medium" ? "border-yellow-200" : "border-green-200"}`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{vendor.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={riskLevel === "low" ? "default" : riskLevel === "medium" ? "secondary" : "destructive"}>
                {riskLevel.toUpperCase()} RISK
              </Badge>
              <div className="text-right">
                <div className="text-2xl font-bold">{overallScore}%</div>
                <div className="text-xs text-muted-foreground">Security Score</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Security Categories</h4>
            {Object.entries(RISK_CATEGORIES).map(([categoryKey, category]) => {
              const score = categoryScores[categoryKey] || 0
              const Icon = category.icon
              return (
                <div key={categoryKey} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 text-${category.color}-600`} />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={score} className="w-16 h-2" />
                    <span className="text-sm font-medium w-8">{score}%</span>
                  </div>
                </div>
              )
            })}
          </div>

          <Separator />

          {/* Vulnerabilities */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm">Known Vulnerabilities</h4>
              <Badge variant="outline">{vulnerabilities.length}</Badge>
            </div>
            {vulnerabilities.length > 0 ? (
              <div className="space-y-1">
                {vulnerabilities.slice(0, 3).map((vuln: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-3 w-3 text-red-500" />
                    <span className="text-muted-foreground">{vuln.severity || "Medium"} severity</span>
                  </div>
                ))}
                {vulnerabilities.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{vulnerabilities.length - 3} more vulnerabilities
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                <span>No known vulnerabilities</span>
              </div>
            )}
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Security Certifications</h4>
            <div className="flex flex-wrap gap-1">
              {certifications.length > 0 ? (
                certifications.slice(0, 4).map((cert: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">No certifications listed</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security Risk Assessment</h2>
          <p className="text-muted-foreground">
            Comprehensive security analysis for {config.industry} industry with {config.deviceCount} devices
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Overall Risk Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Risk Level</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{overallRiskAssessment.level}</div>
            <p className="text-xs text-muted-foreground">Average Score: {overallRiskAssessment.score}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallRiskAssessment.highestScore}%</div>
            <p className="text-xs text-muted-foreground">Best performing vendor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest Score</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overallRiskAssessment.lowestScore}%</div>
            <p className="text-xs text-muted-foreground">Needs improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Variance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallRiskAssessment.variance}%</div>
            <p className="text-xs text-muted-foreground">Selection consistency</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Alert */}
      {overallRiskAssessment.recommendations.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Security Recommendations:</strong>
            <ul className="mt-2 space-y-1">
              {overallRiskAssessment.recommendations.map((rec, index) => (
                <li key={index} className="text-sm">
                  • {rec}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Analysis</TabsTrigger>
          <TabsTrigger value="industry">Industry Risks</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Security Categories Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Security Categories Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(RISK_CATEGORIES).map(([categoryKey, category]) => {
                  const Icon = category.icon
                  const categoryMetrics = SECURITY_METRICS.filter((m) => m.category === categoryKey)
                  const totalWeight = categoryMetrics.reduce((sum, m) => sum + m.weight, 0)

                  // Calculate average score for this category across all vendors
                  const categoryScores = Object.values(vendorSecurityAnalysis).map(
                    (analysis: any) => analysis.categoryScores[categoryKey] || 0,
                  )
                  const averageScore =
                    categoryScores.length > 0
                      ? categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length
                      : 0

                  return (
                    <Card key={categoryKey} className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className={`h-5 w-5 text-${category.color}-600`} />
                        <div>
                          <h4 className="font-semibold">{category.name}</h4>
                          <p className="text-xs text-muted-foreground">{totalWeight}% weight</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average Score</span>
                          <span className="font-semibold">{Math.round(averageScore)}%</span>
                        </div>
                        <Progress value={averageScore} className="h-2" />
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        {categoryMetrics.length} metrics evaluated
                      </div>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          {Object.keys(vendorSecurityAnalysis).length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(vendorSecurityAnalysis).map(([vendorId, analysis]) => (
                <SecurityScoreCard key={vendorId} vendorId={vendorId} analysis={analysis} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Vendors Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select vendors from the Vendors tab to see their security analysis.
                </p>
                <Button variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Select Vendors
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="industry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific Risk Factors</CardTitle>
              <p className="text-sm text-muted-foreground">
                Security considerations specific to the {config.industry} industry
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryRiskFactors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {factor.severity === "high" ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : factor.severity === "medium" ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Info className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{factor.name}</h4>
                        <Badge
                          variant={
                            factor.severity === "high"
                              ? "destructive"
                              : factor.severity === "medium"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {factor.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{factor.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Security Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">Implement Zero Trust Architecture</h5>
                      <p className="text-xs text-muted-foreground">
                        Verify every user and device before granting access
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">Enable Multi-Factor Authentication</h5>
                      <p className="text-xs text-muted-foreground">Add additional layers of authentication security</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">Regular Security Audits</h5>
                      <p className="text-xs text-muted-foreground">
                        Conduct periodic security assessments and penetration testing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">Continuous Monitoring</h5>
                      <p className="text-xs text-muted-foreground">
                        Implement real-time security monitoring and alerting
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Risk Mitigation Strategies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">Vendor Diversification</h5>
                      <p className="text-xs text-muted-foreground">
                        Avoid single points of failure by using multiple vendors
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">Regular Updates</h5>
                      <p className="text-xs text-muted-foreground">
                        Maintain current software versions and security patches
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">Incident Response Plan</h5>
                      <p className="text-xs text-muted-foreground">
                        Prepare comprehensive incident response procedures
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-blue-500 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-sm">Staff Training</h5>
                      <p className="text-xs text-muted-foreground">
                        Regular security awareness training for all personnel
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overallRiskAssessment.level === "high" && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>High Risk Detected:</strong> Immediate action required to improve security posture.
                      Consider prioritizing vendors with security scores above 70%.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                      Immediate Actions (0-30 days)
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Review vendor security documentation</li>
                      <li>• Validate compliance certifications</li>
                      <li>• Assess current vulnerability exposure</li>
                      <li>• Update security policies</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-500" />
                      Long-term Actions (30-90 days)
                    </h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Implement security monitoring tools</li>
                      <li>• Conduct security training programs</li>
                      <li>• Establish incident response procedures</li>
                      <li>• Plan regular security assessments</li>
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
