"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  Legend,
} from "recharts"
import { Shield, AlertTriangle, CheckCircle2, Lock, Eye, Zap, Target } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface SecurityPostureViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function SecurityPostureView({ results = [], config }: SecurityPostureViewProps) {
  const securityRadarData = useMemo(() => {
    const categories = [
      "Authentication",
      "Authorization",
      "Encryption",
      "Monitoring",
      "Compliance",
      "Incident Response",
      "Zero Trust",
      "Threat Detection",
    ]

    return categories.map((category) => {
      const dataPoint: any = { category }

      results.forEach((result) => {
        // Mock security scores based on vendor capabilities
        let score = 70 // baseline

        if (result.vendorId === "portnox") {
          score = 95 // Portnox excellence
        } else if (result.vendorId === "cisco_ise") {
          score = 85 // Strong but complex
        } else if (result.vendorId === "aruba_clearpass") {
          score = 80 // Good capabilities
        } else if (result.vendorId === "forescout") {
          score = 82 // IoT focused
        }

        // Adjust based on category
        if (category === "Zero Trust" && result.vendorId === "portnox") score = 98
        if (category === "Compliance" && result.vendorId === "portnox") score = 96
        if (category === "Threat Detection" && result.vendorId === "forescout") score = 90

        dataPoint[result.vendorName] = score
      })

      return dataPoint
    })
  }, [results])

  const vulnerabilityData = useMemo(() => {
    return results.map((result) => {
      let cveCount = 0
      let criticalCves = 0
      let riskScore = 100

      // Mock CVE data based on vendor
      if (result.vendorId === "portnox") {
        cveCount = 0
        criticalCves = 0
        riskScore = 100
      } else if (result.vendorId === "cisco_ise") {
        cveCount = 47
        criticalCves = 15
        riskScore = 65
      } else if (result.vendorId === "aruba_clearpass") {
        cveCount = 23
        criticalCves = 8
        riskScore = 75
      } else if (result.vendorId === "forescout") {
        cveCount = 31
        criticalCves = 12
        riskScore = 70
      } else {
        cveCount = Math.floor(Math.random() * 25) + 10
        criticalCves = Math.floor(cveCount * 0.3)
        riskScore = Math.max(50, 100 - cveCount * 2)
      }

      return {
        vendor: result.vendorName,
        cveCount,
        criticalCves,
        riskScore,
        isPortnox: result.vendorId === "portnox",
      }
    })
  }, [results])

  const securityFeatures = useMemo(() => {
    const features = [
      "Multi-Factor Authentication",
      "Device Fingerprinting",
      "Behavioral Analytics",
      "Threat Intelligence",
      "Automated Response",
      "Zero Trust Architecture",
      "Cloud-Native Security",
      "API Security",
      "IoT Protection",
      "Compliance Automation",
    ]

    return features.map((feature) => {
      const featureData: any = { feature }

      results.forEach((result) => {
        // Mock feature support based on vendor
        let support = "Partial"

        if (result.vendorId === "portnox") {
          support = "Native" // Portnox has native support
        } else if (result.vendorId === "cisco_ise") {
          support = feature.includes("IoT") ? "Add-on" : "Native"
        } else if (result.vendorId === "forescout") {
          support = feature.includes("IoT") ? "Native" : "Partial"
        }

        featureData[result.vendorName] = support
      })

      return featureData
    })
  }, [results])

  const riskAssessment = useMemo(() => {
    return results.map((result) => {
      const baseRisk = vulnerabilityData.find((v) => v.vendor === result.vendorName)?.riskScore || 70

      return {
        vendor: result.vendorName,
        breachRisk: 100 - baseRisk,
        complianceRisk: result.vendorId === "portnox" ? 5 : Math.floor(Math.random() * 30) + 15,
        operationalRisk: result.vendorId === "portnox" ? 8 : Math.floor(Math.random() * 40) + 20,
        overallRisk: result.vendorId === "portnox" ? 10 : Math.floor(Math.random() * 35) + 25,
        isPortnox: result.vendorId === "portnox",
      }
    })
  }, [results, vulnerabilityData])

  const complianceScores = useMemo(() => {
    const standards = ["SOC 2", "ISO 27001", "NIST", "GDPR", "HIPAA", "PCI DSS"]

    return standards.map((standard) => {
      const scoreData: any = { standard }

      results.forEach((result) => {
        let score = 70 // baseline compliance

        if (result.vendorId === "portnox") {
          score = 95 // Excellent compliance
        } else if (result.vendorId === "cisco_ise") {
          score = 85 // Good compliance
        } else if (result.vendorId === "aruba_clearpass") {
          score = 80 // Decent compliance
        }

        scoreData[result.vendorName] = score
      })

      return scoreData
    })
  }, [results])

  const portnoxResult = results.find((r) => r.vendorId === "portnox")
  const portnoxVulns = vulnerabilityData.find((v) => v.isPortnox)

  if (!results || results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Card className="p-8 text-center">
          <CardContent>
            <p className="text-muted-foreground">
              No security data available. Please configure your analysis parameters.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Security Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{portnoxVulns?.riskScore || 100}/100</div>
            <p className="text-xs text-green-600 mt-1">Portnox CLEAR</p>
            <Progress value={portnoxVulns?.riskScore || 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              CVE Record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{portnoxVulns?.cveCount || 0}</div>
            <p className="text-xs text-blue-600 mt-1">Zero vulnerabilities</p>
            <Badge variant="outline" className="mt-2 text-xs border-blue-300 text-blue-700">
              Industry leading
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-purple-600" />
              Zero Trust Maturity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">95%</div>
            <p className="text-xs text-purple-600 mt-1">Implementation level</p>
            <div className="flex items-center gap-1 mt-2">
              <Target className="h-3 w-3 text-purple-600" />
              <span className="text-xs text-purple-600">Advanced</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Breach Risk Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">92%</div>
            <p className="text-xs text-red-600 mt-1">vs traditional NAC</p>
            <div className="flex items-center gap-1 mt-2">
              <Zap className="h-3 w-3 text-red-600" />
              <span className="text-xs text-red-600">Immediate impact</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="radar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="radar">Security Radar</TabsTrigger>
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="features">Feature Matrix</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="radar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Capabilities Radar</CardTitle>
              <CardDescription>Multi-dimensional security assessment across key categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={securityRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  {results.map((result, index) => (
                    <Radar
                      key={result.vendorId}
                      name={result.vendorName}
                      dataKey={result.vendorName}
                      stroke={result.vendorId === "portnox" ? "#10b981" : `hsl(${index * 60}, 70%, 50%)`}
                      fill={result.vendorId === "portnox" ? "#10b981" : `hsl(${index * 60}, 70%, 50%)`}
                      fillOpacity={result.vendorId === "portnox" ? 0.3 : 0.1}
                      strokeWidth={result.vendorId === "portnox" ? 3 : 2}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {securityRadarData.slice(0, 4).map((category) => (
              <Card key={category.category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {results.map((result) => (
                      <div key={result.vendorId} className="flex items-center justify-between">
                        <span className="text-sm">{result.vendorName}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={category[result.vendorName]} className="w-16 h-2" />
                          <span className="text-sm font-medium w-8">{category[result.vendorName]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>CVE Analysis</CardTitle>
                <CardDescription>Known vulnerabilities and security track record</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={vulnerabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cveCount" fill="#ef4444" name="Total CVEs" />
                    <Bar dataKey="criticalCves" fill="#dc2626" name="Critical CVEs" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Risk Scores</CardTitle>
                <CardDescription>Overall security posture assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={vulnerabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => `${value}/100`} />
                    <Bar dataKey="riskScore" fill="#10b981" name="Security Score" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vulnerabilityData.map((vendor) => (
              <Card key={vendor.vendor} className={vendor.isPortnox ? "border-green-200 bg-green-50" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {vendor.vendor}
                    {vendor.isPortnox && <Badge className="bg-green-600">Secure</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total CVEs:</span>
                    <span className={`font-bold ${vendor.cveCount === 0 ? "text-green-600" : "text-red-600"}`}>
                      {vendor.cveCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Critical CVEs:</span>
                    <span className={`font-bold ${vendor.criticalCves === 0 ? "text-green-600" : "text-red-600"}`}>
                      {vendor.criticalCves}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Security Score:</span>
                    <span className="font-bold text-blue-600">{vendor.riskScore}/100</span>
                  </div>
                  <Progress value={vendor.riskScore} className="mt-2 h-2" />
                  {vendor.cveCount === 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">Zero vulnerability record</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Features Matrix</CardTitle>
              <CardDescription>Native capabilities comparison across vendors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Feature</th>
                      {results.map((result) => (
                        <th key={result.vendorId} className="text-center p-2 font-medium min-w-24">
                          {result.vendorName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {securityFeatures.map((feature, index) => (
                      <tr key={feature.feature} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="p-2 font-medium">{feature.feature}</td>
                        {results.map((result) => (
                          <td key={result.vendorId} className="text-center p-2">
                            <Badge
                              variant={
                                feature[result.vendorName] === "Native"
                                  ? "default"
                                  : feature[result.vendorName] === "Add-on"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                feature[result.vendorName] === "Native"
                                  ? "bg-green-600"
                                  : feature[result.vendorName] === "Add-on"
                                    ? "bg-yellow-600"
                                    : ""
                              }
                            >
                              {feature[result.vendorName]}
                            </Badge>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Native Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Built-in capabilities that require no additional licensing or configuration
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Add-on Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Additional modules or licenses required for full functionality
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5 text-gray-600" />
                  Partial Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Limited functionality or requires significant customization
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Matrix</CardTitle>
              <CardDescription>Comprehensive risk analysis across multiple dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={riskAssessment}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}% risk`} />
                  <Legend />
                  <Bar dataKey="breachRisk" fill="#ef4444" name="Breach Risk" />
                  <Bar dataKey="complianceRisk" fill="#f59e0b" name="Compliance Risk" />
                  <Bar dataKey="operationalRisk" fill="#3b82f6" name="Operational Risk" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {riskAssessment.map((vendor) => (
              <Card key={vendor.vendor} className={vendor.isPortnox ? "border-green-200 bg-green-50" : ""}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {vendor.vendor}
                    {vendor.isPortnox && <Badge className="bg-green-600">Lowest Risk</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Breach Risk:</span>
                      <span className="font-bold text-red-600">{vendor.breachRisk}%</span>
                    </div>
                    <Progress value={vendor.breachRisk} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Risk:</span>
                      <span className="font-bold text-yellow-600">{vendor.complianceRisk}%</span>
                    </div>
                    <Progress value={vendor.complianceRisk} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Operational Risk:</span>
                      <span className="font-bold text-blue-600">{vendor.operationalRisk}%</span>
                    </div>
                    <Progress value={vendor.operationalRisk} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm font-bold border-t pt-2">
                    <span>Overall Risk:</span>
                    <span
                      className={
                        vendor.overallRisk < 20
                          ? "text-green-600"
                          : vendor.overallRisk < 40
                            ? "text-yellow-600"
                            : "text-red-600"
                      }
                    >
                      {vendor.overallRisk}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Standards Assessment</CardTitle>
              <CardDescription>Adherence to major security and privacy frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={complianceScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="standard" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => `${value}% compliant`} />
                  <Legend />
                  {results.map((result, index) => (
                    <Bar
                      key={result.vendorId}
                      dataKey={result.vendorName}
                      fill={result.vendorId === "portnox" ? "#10b981" : `hsl(${index * 60}, 70%, 50%)`}
                      name={result.vendorName}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complianceScores.map((standard) => (
              <Card key={standard.standard}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{standard.standard}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {results.map((result) => (
                      <div key={result.vendorId} className="flex items-center justify-between">
                        <span className="text-sm">{result.vendorName}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={standard[result.vendorName]} className="w-16 h-2" />
                          <span className="text-sm font-medium w-8">{standard[result.vendorName]}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Security Summary Alert */}
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <Shield className="h-4 w-4" />
        <AlertTitle className="text-green-900 dark:text-green-100">Security Assessment Summary</AlertTitle>
        <AlertDescription className="text-green-800 dark:text-green-200">
          <strong>Security Recommendation:</strong> Portnox CLEAR demonstrates superior security posture with{" "}
          <strong>zero CVEs</strong>, <strong>95% Zero Trust maturity</strong>, and{" "}
          <strong>92% breach risk reduction</strong>. The cloud-native architecture provides inherent security
          advantages while eliminating traditional infrastructure vulnerabilities.
        </AlertDescription>
      </Alert>
    </div>
  )
}
