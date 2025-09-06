"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Shield, AlertTriangle, CheckCircle2, XCircle, Clock, FileText, Download, TrendingUp, TrendingDown, Eye, Lock, Users, Building, Zap, Brain, AlertCircle } from 'lucide-react'
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ComplianceRiskViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function ComplianceRiskView({ results = [], config }: ComplianceRiskViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)

  // Calculate compliance and risk metrics
  const complianceMetrics = useMemo(() => {
    if (results.length === 0) return null

    const avgComplianceScore = results.reduce((sum, r) => sum + r.complianceScore, 0) / results.length
    const avgSecurityScore = results.reduce((sum, r) => sum + r.securityScore, 0) / results.length
    const avgOverallRisk = results.reduce((sum, r) => sum + r.riskAssessment.overallRisk, 0) / results.length
    
    const bestCompliance = Math.max(...results.map(r => r.complianceScore))
    const bestSecurity = Math.max(...results.map(r => r.securityScore))
    const lowestRisk = Math.min(...results.map(r => r.riskAssessment.overallRisk))
    
    const bestComplianceVendor = results.find(r => r.complianceScore === bestCompliance)
    const bestSecurityVendor = results.find(r => r.securityScore === bestSecurity)
    const lowestRiskVendor = results.find(r => r.riskAssessment.overallRisk === lowestRisk)

    return {
      avgComplianceScore,
      avgSecurityScore,
      avgOverallRisk,
      bestCompliance,
      bestSecurity,
      lowestRisk,
      bestComplianceVendor,
      bestSecurityVendor,
      lowestRiskVendor,
    }
  }, [results])

  // Compliance framework coverage data
  const complianceData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      complianceScore: result.complianceScore,
      securityScore: result.securityScore,
      hipaa: result.vendorData.features.compliance.hipaa ? 100 : 0,
      pciDss: result.vendorData.features.compliance.pciDss ? 100 : 0,
      sox: result.vendorData.features.compliance.sox ? 100 : 0,
      gdpr: result.vendorData.features.compliance.gdpr ? 100 : 0,
      nist: result.vendorData.features.compliance.nist ? 100 : 0,
      iso27001: result.vendorData.features.compliance.iso27001 ? 100 : 0,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  // Risk assessment data
  const riskData = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendorName,
      securityRisk: result.riskAssessment.securityRisk,
      operationalRisk: result.riskAssessment.operationalRisk,
      financialRisk: result.riskAssessment.financialRisk,
      complianceRisk: result.riskAssessment.complianceRisk,
      overallRisk: result.riskAssessment.overallRisk,
      breachProbability: result.riskAssessment.breachProbability * 100,
      mttr: result.riskAssessment.mttr,
      isPortnox: result.vendorId === "portnox",
    }))
  }, [results])

  // Security posture radar data
  const securityRadarData = useMemo(() => {
    if (!selectedVendor) {
      const portnoxResult = results.find(r => r.vendorId === "portnox")
      if (portnoxResult) {
        return [
          { subject: 'Device Discovery', portnox: portnoxResult.vendorData.features.core.deviceDiscovery ? 100 : 0, fullMark: 100 },
          { subject: 'Policy Enforcement', portnox: portnoxResult.vendorData.features.core.policyEnforcement ? 100 : 0, fullMark: 100 },
          { subject: 'AI Analytics', portnox: portnoxResult.vendorData.features.advanced.aiAnalytics ? 100 : 0, fullMark: 100 },
          { subject: 'Zero Trust', portnox: portnoxResult.vendorData.features.advanced.zeroTrustIntegration ? 100 : 0, fullMark: 100 },
          { subject: 'Threat Intelligence', portnox: portnoxResult.vendorData.features.advanced.threatIntelligence ? 100 : 0, fullMark: 100 },
          { subject: 'Automated Remediation', portnox: portnoxResult.vendorData.features.advanced.automatedRemediation ? 100 : 0, fullMark: 100 },
        ]
      }
    }
    
    const vendor = results.find(r => r.vendorId === selectedVendor)
    if (vendor) {
      return [
        { subject: 'Device Discovery', value: vendor.vendorData.features.core.deviceDiscovery ? 100 : 0, fullMark: 100 },
        { subject: 'Policy Enforcement', value: vendor.vendorData.features.core.policyEnforcement ? 100 : 0, fullMark: 100 },
        { subject: 'AI Analytics', value: vendor.vendorData.features.advanced.aiAnalytics ? 100 : 0, fullMark: 100 },
        { subject: 'Zero Trust', value: vendor.vendorData.features.advanced.zeroTrustIntegration ? 100 : 0, fullMark: 100 },
        { subject: 'Threat Intelligence', value: vendor.vendorData.features.advanced.threatIntelligence ? 100 : 0, fullMark: 100 },
        { subject: 'Automated Remediation', value: vendor.vendorData.features.advanced.automatedRemediation ? 100 : 0, fullMark: 100 },
      ]
    }
    
    return []
  }, [results, selectedVendor])

  // Industry compliance requirements
  const industryRequirements = useMemo(() => {
    const industryMap = {
      healthcare: {
        name: "Healthcare",
        frameworks: ["HIPAA", "HITECH", "FDA 21 CFR Part 11"],
        criticalRequirements: ["PHI Protection", "Audit Trails", "Access Controls", "Encryption"],
        avgBreachCost: "$10.9M",
        regulatoryFines: "Up to $1.8M per incident"
      },
      financial: {
        name: "Financial Services",
        frameworks: ["PCI DSS", "SOX", "GLBA", "FFIEC"],
        criticalRequirements: ["Transaction Security", "Fraud Prevention", "Data Encryption", "Audit Compliance"],
        avgBreachCost: "$5.9M",
        regulatoryFines: "Up to $500M for major violations"
      },
      government: {
        name: "Government",
        frameworks: ["FedRAMP", "FISMA", "NIST 800-53", "CMMC"],
        criticalRequirements: ["Continuous Monitoring", "Supply Chain Security", "Incident Response", "Risk Management"],
        avgBreachCost: "$5.0M",
        regulatoryFines: "Up to $50M plus criminal penalties"
      },
      technology: {
        name: "Technology",
        frameworks: ["SOC 2", "ISO 27001", "GDPR"],
        criticalRequirements: ["Data Protection", "Privacy Controls", "Security Monitoring", "Incident Management"],
        avgBreachCost: "$5.0M",
        regulatoryFines: "Up to 4% of annual revenue (GDPR)"
      }
    }
    
    return industryMap[config?.industry as keyof typeof industryMap] || industryMap.technology
  }, [config?.industry])

  // Colors for charts
  const COLORS = {
    portnox: "#10B981",
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#F59E0B",
    danger: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    muted: "#6B7280",
  }

  const getBarColor = (item: any) => {
    if (item.isPortnox) return COLORS.portnox
    return COLORS.primary
  }

  const getRiskColor = (risk: number) => {
    if (risk <= 25) return COLORS.success
    if (risk <= 50) return COLORS.warning
    if (risk <= 75) return COLORS.accent
    return COLORS.danger
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Please configure your analysis parameters and select vendors to compare.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              Best Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {complianceMetrics?.bestCompliance}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {complianceMetrics?.bestComplianceVendor?.vendorName} leads in compliance automation
            </p>
            <Progress value={complianceMetrics?.bestCompliance || 0} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-blue-600" />
              Highest Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {complianceMetrics?.bestSecurity}/100
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {complianceMetrics?.bestSecurityVendor?.vendorName} security posture
            </p>
            <Progress value={complianceMetrics?.bestSecurity || 0} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Lowest Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {complianceMetrics?.lowestRisk}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {complianceMetrics?.lowestRiskVendor?.vendorName} overall risk assessment
            </p>
            <Progress 
              value={100 - (complianceMetrics?.lowestRisk || 0)} 
              className="mt-2 h-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building className="h-4 w-4 text-purple-600" />
              Industry Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {industryRequirements.frameworks.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {industryRequirements.name} compliance frameworks
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              {industryRequirements.avgBreachCost} avg breach cost
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Industry-Specific Alert */}
      <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription>
          <strong>{industryRequirements.name} Industry Requirements:</strong> Your organization must comply with {industryRequirements.frameworks.join(", ")} frameworks. 
          Average breach cost is {industryRequirements.avgBreachCost} with potential regulatory fines of {industryRequirements.regulatoryFines}.
        </AlertDescription>
      </Alert>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="security">Security Posture</TabsTrigger>
          <TabsTrigger value="frameworks">Framework Coverage</TabsTrigger>
        </TabsList>

        {/* Compliance Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Compliance Scores Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Automation Scores</CardTitle>
                <CardDescription>
                  Percentage of compliance requirements automated by each vendor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="vendor" 
                      tick={{ fontSize: 12 }} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: number) => [`${value}%`, "Compliance Score"]} />
                    <Bar 
                      dataKey="complianceScore" 
                      radius={[8, 8, 0, 0]}
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Security vs Compliance Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>Security vs Compliance Matrix</CardTitle>
                <CardDescription>
                  Vendor positioning based on security and compliance capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="vendor" 
                      tick={{ fontSize: 12 }} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="securityScore" fill={COLORS.primary} name="Security Score" />
                    <Bar dataKey="complianceScore" fill={COLORS.success} name="Compliance Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Framework Coverage */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Coverage</CardTitle>
              <CardDescription>
                Support for major compliance frameworks by vendor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Vendor</th>
                      <th className="text-center p-3 font-semibold">HIPAA</th>
                      <th className="text-center p-3 font-semibold">PCI DSS</th>
                      <th className="text-center p-3 font-semibold">SOX</th>
                      <th className="text-center p-3 font-semibold">GDPR</th>
                      <th className="text-center p-3 font-semibold">NIST</th>
                      <th className="text-center p-3 font-semibold">ISO 27001</th>
                      <th className="text-center p-3 font-semibold">Overall</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceData.map((vendor, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">
                          <div className="flex items-center gap-2">
                            {vendor.isPortnox && (
                              <Badge variant="default" className="bg-green-600">Recommended</Badge>
                            )}
                            {vendor.vendor}
                          </div>
                        </td>
                        <td className="text-center p-3">
                          {vendor.hipaa ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {vendor.pciDss ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {vendor.sox ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {vendor.gdpr ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {vendor.nist ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {vendor.iso27001 ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          <Badge 
                            variant="outline" 
                            className={vendor.complianceScore >= 80 ? "border-green-600 text-green-600" : 
                                      vendor.complianceScore >= 60 ? "border-yellow-600 text-yellow-600" : 
                                      "border-red-600 text-red-600"}
                          >
                            {vendor.complianceScore}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Assessment Tab */}
        <TabsContent value="risk" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Overall Risk Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Risk Assessment</CardTitle>
                <CardDescription>
                  Comprehensive risk scores across all categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="vendor" 
                      tick={{ fontSize: 12 }} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: number) => [`${value}`, "Risk Score"]} />
                    <Bar 
                      dataKey="overallRisk" 
                      radius={[8, 8, 0, 0]}
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRiskColor(entry.overallRisk)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Category Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of risk factors by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="vendor" 
                      tick={{ fontSize: 12 }} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="securityRisk" stackId="a" fill={COLORS.danger} name="Security Risk" />
                    <Bar dataKey="operationalRisk" stackId="a" fill={COLORS.warning} name="Operational Risk" />
                    <Bar dataKey="financialRisk" stackId="a" fill={COLORS.accent} name="Financial Risk" />
                    <Bar dataKey="complianceRisk" stackId="a" fill={COLORS.secondary} name="Compliance Risk" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Breach Probability and MTTR */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Breach Probability Analysis</CardTitle>
                <CardDescription>
                  Annual probability of security breach by vendor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="vendor" 
                      tick={{ fontSize: 12 }} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                    />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Breach Probability"]} />
                    <Bar 
                      dataKey="breachProbability" 
                      radius={[8, 8, 0, 0]}
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRiskColor(entry.breachProbability)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mean Time to Recovery (MTTR)</CardTitle>
                <CardDescription>
                  Average time to recover from security incidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="vendor" 
                      tick={{ fontSize: 12 }} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                    />
                    <YAxis />
                    <Tooltip formatter={(value: number) => [`${value} minutes`, "MTTR"]} />
                    <Bar 
                      dataKey="mttr" 
                      radius={[8, 8, 0, 0]}
                      fill={COLORS.primary}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Risk Mitigation Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Mitigation Recommendations</CardTitle>
              <CardDescription>
                AI-powered recommendations for reducing security and compliance risks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 dark:text-red-100">Critical Risk Alert</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    Legacy NAC solutions present significant security vulnerabilities with 15+ CVEs annually. 
                    Immediate migration to zero-vulnerability solutions like Portnox CLEAR is recommended.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100">Compliance Gap Warning</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Solutions with less than 80% compliance automation increase audit failure risk by 34%. 
                    Consider vendors with 95%+ automation for {industryRequirements.name} requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 dark:text-green-100">Optimal Risk Reduction</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Portnox CLEAR provides 92% breach risk reduction and 95% compliance automation, 
                    delivering optimal risk mitigation for {industryRequirements.name} organizations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Posture Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Vendor Selection for Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Security Capability Radar</CardTitle>
                <CardDescription>
                  Select a vendor to view detailed security capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {results.map((result) => (
                      <Button
                        key={result.vendorId}
                        variant={selectedVendor === result.vendorId ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedVendor(result.vendorId)}
                        className={result.vendorId === "portnox" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {result.vendorName}
                      </Button>
                    ))}
                  </div>
                  
                  {securityRadarData.length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={securityRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar
                          name={selectedVendor ? results.find(r => r.vendorId === selectedVendor)?.vendorName : "Portnox CLEAR"}
                          dataKey={selectedVendor ? "value" : "portnox"}
                          stroke={selectedVendor === "portnox" || !selectedVendor ? COLORS.portnox : COLORS.primary}
                          fill={selectedVendor === "portnox" || !selectedVendor ? COLORS.portnox : COLORS.primary}
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Security Score Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Security Score Comparison</CardTitle>
                <CardDescription>
                  Overall security posture scores by vendor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="vendor" 
                      tick={{ fontSize: 12 }} 
                      angle={-45} 
                      textAnchor="end" 
                      height={80}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value: number) => [`${value}/100`, "Security Score"]} />
                    <Bar 
                      dataKey="securityScore" 
                      radius={[8, 8, 0, 0]}
                    >
                      {complianceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Security Features Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Security Features</CardTitle>
              <CardDescription>
                Comparison of advanced security capabilities across vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Vendor</th>
                      <th className="text-center p-3 font-semibold">AI Analytics</th>
                      <th className="text-center p-3 font-semibold">Auto Remediation</th>
                      <th className="text-center p-3 font-semibold">Risk Scoring</th>
                      <th className="text-center p-3 font-semibold">Behavioral Analysis</th>
                      <th className="text-center p-3 font-semibold">Threat Intel</th>
                      <th className="text-center p-3 font-semibold">Zero Trust</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-medium">
                          <div className="flex items-center gap-2">
                            {result.vendorId === "portnox" && (
                              <Badge variant="default" className="bg-green-600">Recommended</Badge>
                            )}
                            {result.vendorName}
                          </div>
                        </td>
                        <td className="text-center p-3">
                          {result.vendorData.features.advanced.aiAnalytics ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {result.vendorData.features.advanced.automatedRemediation ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {result.vendorData.features.advanced.riskScoring ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {result.vendorData.features.advanced.behavioralAnalysis ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {result.vendorData.features.advanced.threatIntelligence ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="text-center p-3">
                          {result.vendorData.features.advanced.zeroTrustIntegration ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Framework Coverage Tab */}
        <TabsContent value="frameworks" className="space-y-6 mt-6">
          {/* Industry-Specific Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>{industryRequirements.name} Industry Requirements</CardTitle>
              <CardDescription>
                Specific compliance frameworks and requirements for your industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-3">Required Frameworks</h4>
                  <div className="space-y-2">
                    {industryRequirements.frameworks.map((framework, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline">{framework}</Badge>
                        <span className="text-sm text-muted-foreground">Mandatory</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Critical Requirements</h4>
                  <div className="space-y-2">
                    {industryRequirements.criticalRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="font-medium text-sm">Average Breach Cost</h5>
                    <p className="text-2xl font-bold text-red-600">{industryRequirements.avgBreachCost}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm">Regulatory Fines</h5>
                    <p className="text-2xl font-bold text-amber-600">{industryRequirements.regulatoryFines}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Coverage Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Coverage Heatmap</CardTitle>
              <CardDescription>
                Visual representation of compliance framework support across vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={complianceData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="vendor" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hipaa" stackId="a" fill="#EF4444" name="HIPAA" />
                  <Bar dataKey="pciDss" stackId="a" fill="#F59E0B" name="PCI DSS" />
                  <Bar dataKey="sox" stackId="a" fill="#10B981" name="SOX" />
                  <Bar dataKey="gdpr" stackId="a" fill="#3B82F6" name="GDPR" />
                  <Bar dataKey="nist" stackId="a" fill="#8B5CF6" name="NIST" />
                  <Bar dataKey="iso27001" stackId="a" fill="#EC4899" name="ISO 27001" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI-Powered Compliance Recommendations
              </CardTitle>
              <CardDescription>
                Intelligent recommendations for achieving optimal compliance posture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    Immediate Improvements
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span>Deploy Portnox CLEAR for 95% compliance automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span>Eliminate manual compliance processes reducing audit risk by 78%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <span>Implement continuous compliance monitoring</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    Risk Mitigation
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span>Migrate from legacy solutions with 15+ annual CVEs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span>Address compliance gaps increasing audit failure risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <span>Reduce breach probability from 25% to 8% annually</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6 pt-4 border-t">
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Compliance Report
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Generate Risk Assessment
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Schedule Compliance Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
