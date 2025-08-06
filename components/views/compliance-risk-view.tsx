"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, CheckCircle2, XCircle, Clock, DollarSign, FileCheck, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ComplianceRiskViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ComplianceRiskView({ results = [], config }: ComplianceRiskViewProps) {
  const complianceData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      complianceScore: result.complianceScore,
      securityScore: result.securityScore,
      overallRisk: result.riskAssessment.overallRisk,
      securityRisk: result.riskAssessment.securityRisk,
      operationalRisk: result.riskAssessment.operationalRisk,
      financialRisk: result.riskAssessment.financialRisk,
      complianceRisk: result.riskAssessment.complianceRisk,
      breachProbability: result.riskAssessment.breachProbability * 100,
      mttr: result.riskAssessment.mttr,
      riskReduction: result.businessImpact.riskReduction,
      complianceSavings: result.businessImpact.complianceSavings
    }))
  }, [results])

  const riskComparisonData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      Security: 100 - result.riskAssessment.securityRisk,
      Operational: 100 - result.riskAssessment.operationalRisk,
      Financial: 100 - result.riskAssessment.financialRisk,
      Compliance: 100 - result.riskAssessment.complianceRisk,
    }))
  }, [results])

  const complianceFrameworks = [
    { name: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
    { name: "PCI-DSS", description: "Payment Card Industry Data Security Standard" },
    { name: "SOX", description: "Sarbanes-Oxley Act" },
    { name: "GDPR", description: "General Data Protection Regulation" },
    { name: "NIST", description: "National Institute of Standards and Technology" },
    { name: "ISO27001", description: "Information Security Management System" }
  ]

  const getRiskLevel = (risk: number) => {
    if (risk <= 25) return { level: "Low", color: "text-green-600", bgColor: "bg-green-100" }
    if (risk <= 50) return { level: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-100" }
    if (risk <= 75) return { level: "High", color: "text-orange-600", bgColor: "bg-orange-100" }
    return { level: "Critical", color: "text-red-600", bgColor: "bg-red-100" }
  }

  const getComplianceLevel = (score: number) => {
    if (score >= 90) return { level: "Excellent", color: "text-green-600", bgColor: "bg-green-100" }
    if (score >= 75) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-100" }
    if (score >= 60) return { level: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-100" }
    return { level: "Poor", color: "text-red-600", bgColor: "bg-red-100" }
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Please select vendors to view compliance and risk analysis.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="security">Security Posture</TabsTrigger>
          <TabsTrigger value="financial">Financial Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Risk Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {complianceData.map((vendor) => {
              const riskLevel = getRiskLevel(vendor.overallRisk)
              return (
                <Card key={vendor.vendor}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{vendor.vendor}</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{vendor.overallRisk}%</div>
                    <Badge variant="outline" className={`${riskLevel.color} ${riskLevel.bgColor} mt-2`}>
                      {riskLevel.level} Risk
                    </Badge>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Breach Probability: {vendor.breachProbability.toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Risk Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Profile Comparison</CardTitle>
              <CardDescription>Lower scores indicate higher risk levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={riskComparisonData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="vendor" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  {results.map((_, index) => (
                    <Radar
                      key={index}
                      name={results[index].vendorName}
                      dataKey={results[index].vendorName}
                      stroke={COLORS[index % COLORS.length]}
                      fill={COLORS[index % COLORS.length]}
                      fillOpacity={0.1}
                    />
                  ))}
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Critical Risk Alerts */}
          <div className="space-y-4">
            {complianceData.map((vendor) => {
              if (vendor.overallRisk > 75) {
                return (
                  <Alert key={vendor.vendor} variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>{vendor.vendor}</strong> shows critical risk levels ({vendor.overallRisk}% overall risk). 
                      Immediate attention required for security and compliance posture.
                    </AlertDescription>
                  </Alert>
                )
              }
              return null
            })}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Compliance Scores */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complianceData.map((vendor) => {
              const complianceLevel = getComplianceLevel(vendor.complianceScore)
              return (
                <Card key={vendor.vendor}>
                  <CardHeader>
                    <CardTitle className="text-base">{vendor.vendor}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Compliance Score</span>
                      <Badge className={`${complianceLevel.color} ${complianceLevel.bgColor}`}>
                        {complianceLevel.level}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall</span>
                        <span>{vendor.complianceScore}%</span>
                      </div>
                      <Progress value={vendor.complianceScore} className="h-2" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Annual Compliance Savings: ${vendor.complianceSavings.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Compliance Framework Support */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Support</CardTitle>
              <CardDescription>Support for major regulatory frameworks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceFrameworks.map((framework) => (
                  <div key={framework.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{framework.name}</h4>
                        <p className="text-sm text-muted-foreground">{framework.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {results.map((result) => {
                        const supported = result.vendorData.features.compliance[framework.name.toLowerCase().replace('-', '') as keyof typeof result.vendorData.features.compliance]
                        return (
                          <div key={result.vendorId} className="flex items-center space-x-2 p-2 rounded border">
                            {supported ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm">{result.vendorName}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {complianceData.map((vendor) => (
              <Card key={vendor.vendor}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vendor.securityScore}%</div>
                  <Progress value={vendor.securityScore} className="mt-2 h-2" />
                  <div className="mt-2 text-xs text-muted-foreground">
                    MTTR: {vendor.mttr < 60 ? `${vendor.mttr} min` : `${Math.round(vendor.mttr / 60)} hrs`}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Risk Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Security Risk Analysis</CardTitle>
              <CardDescription>Detailed breakdown of security risk factors</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="securityRisk" fill="#ef4444" name="Security Risk" />
                  <Bar dataKey="operationalRisk" fill="#f97316" name="Operational Risk" />
                  <Bar dataKey="complianceRisk" fill="#eab308" name="Compliance Risk" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Breach Probability */}
          <Card>
            <CardHeader>
              <CardTitle>Annual Breach Probability</CardTitle>
              <CardDescription>Estimated likelihood of security incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData.map((vendor) => (
                  <div key={vendor.vendor} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{vendor.vendor}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{vendor.breachProbability.toFixed(1)}%</span>
                        {vendor.breachProbability > 20 ? (
                          <TrendingUp className="h-4 w-4 text-red-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <Progress value={vendor.breachProbability} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          {/* Financial Risk Impact */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complianceData.map((vendor) => (
              <Card key={vendor.vendor}>
                <CardHeader>
                  <CardTitle className="text-base">{vendor.vendor}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk Reduction Value</span>
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ${vendor.riskReduction.toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compliance Savings</span>
                      <FileCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-xl font-semibold text-blue-600">
                      ${vendor.complianceSavings.toLocaleString()}
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground">
                      Financial Risk Level: {vendor.financialRisk}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Risk vs Savings Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Mitigation ROI</CardTitle>
              <CardDescription>Financial benefits of risk reduction</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="riskReduction" fill="#10b981" name="Risk Reduction Value" />
                  <Bar dataKey="complianceSavings" fill="#3b82f6" name="Compliance Savings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Risk Cost Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Potential Risk Costs</CardTitle>
              <CardDescription>Estimated annual costs if risks materialize</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData.map((vendor) => {
                  const potentialBreachCost = vendor.breachProbability * 50000 // Simplified calculation
                  const riskLevel = getRiskLevel(vendor.overallRisk)
                  
                  return (
                    <div key={vendor.vendor} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{vendor.vendor}</h4>
                        <Badge className={`${riskLevel.color} ${riskLevel.bgColor}`}>
                          {riskLevel.level}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Potential Breach Cost:</span>
                          <div className="font-semibold">${potentialBreachCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Risk Mitigation:</span>
                          <div className="font-semibold text-green-600">
                            ${vendor.riskReduction.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
