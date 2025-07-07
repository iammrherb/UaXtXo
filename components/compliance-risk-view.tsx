"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts"
import { Shield, CheckCircle, FileText, Users, Building, Target } from "lucide-react"

interface ComplianceRiskViewProps {
  results: any[]
  config: any
}

const COMPLIANCE_FRAMEWORKS = {
  hipaa: {
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    maxFine: 1900000,
    controls: 18,
    color: "#ef4444",
  },
  sox: {
    name: "SOX",
    description: "Sarbanes-Oxley Act",
    maxFine: 5000000,
    controls: 12,
    color: "#f97316",
  },
  pci_dss: {
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    maxFine: 500000,
    controls: 12,
    color: "#eab308",
  },
  gdpr: {
    name: "GDPR",
    description: "General Data Protection Regulation",
    maxFine: 20000000,
    controls: 15,
    color: "#22c55e",
  },
  iso_27001: {
    name: "ISO 27001",
    description: "Information Security Management",
    maxFine: 0,
    controls: 114,
    color: "#3b82f6",
  },
  nist: {
    name: "NIST CSF",
    description: "NIST Cybersecurity Framework",
    maxFine: 0,
    controls: 23,
    color: "#8b5cf6",
  },
}

const RISK_CATEGORIES = [
  {
    id: "data_breach",
    name: "Data Breach",
    icon: Shield,
    baseRisk: 2800000,
    probability: 0.28,
    color: "#ef4444",
  },
  {
    id: "insider_threat",
    name: "Insider Threat",
    icon: Users,
    baseRisk: 1500000,
    probability: 0.22,
    color: "#f97316",
  },
  {
    id: "compliance_violation",
    name: "Compliance Violation",
    icon: FileText,
    baseRisk: 3200000,
    probability: 0.15,
    color: "#eab308",
  },
  {
    id: "operational_disruption",
    name: "Operational Disruption",
    icon: Building,
    baseRisk: 950000,
    probability: 0.35,
    color: "#22c55e",
  },
]

export function ComplianceRiskView({ results, config }: ComplianceRiskViewProps) {
  const [selectedFramework, setSelectedFramework] = useState("all")
  const [timeframe, setTimeframe] = useState("annual")

  // Calculate compliance coverage for each vendor
  const complianceData = useMemo(() => {
    return results.map((result) => {
      const vendor = result.vendor || "Unknown"
      const coverage = {
        hipaa: Math.min(95, 65 + (vendor === "Portnox" ? 30 : vendor === "Cisco" ? 25 : 15)),
        sox: Math.min(92, 60 + (vendor === "Portnox" ? 32 : vendor === "Cisco" ? 22 : 12)),
        pci_dss: Math.min(88, 55 + (vendor === "Portnox" ? 33 : vendor === "Cisco" ? 28 : 18)),
        gdpr: Math.min(94, 62 + (vendor === "Portnox" ? 32 : vendor === "Cisco" ? 26 : 16)),
        iso_27001: Math.min(96, 68 + (vendor === "Portnox" ? 28 : vendor === "Cisco" ? 23 : 13)),
        nist: Math.min(93, 64 + (vendor === "Portnox" ? 29 : vendor === "Cisco" ? 24 : 14)),
      }

      const avgCoverage = Object.values(coverage).reduce((sum, val) => sum + val, 0) / 6

      return {
        vendor,
        coverage,
        avgCoverage,
        riskReduction: Math.min(85, avgCoverage * 0.9),
        complianceCost: result.totalCost * 0.15,
      }
    })
  }, [results])

  // Calculate risk metrics
  const riskMetrics = useMemo(() => {
    return RISK_CATEGORIES.map((category) => {
      const withoutNAC = category.baseRisk * category.probability
      const withNAC = withoutNAC * 0.25 // 75% risk reduction
      const reduction = withoutNAC - withNAC

      return {
        ...category,
        withoutNAC,
        withNAC,
        reduction,
        reductionPercent: ((reduction / withoutNAC) * 100).toFixed(0),
      }
    })
  }, [])

  // Zero Trust maturity assessment
  const zeroTrustMaturity = useMemo(() => {
    return complianceData.map((data) => ({
      vendor: data.vendor,
      identity: Math.min(100, 70 + (data.vendor === "Portnox" ? 25 : data.vendor === "Cisco" ? 20 : 10)),
      device: Math.min(100, 65 + (data.vendor === "Portnox" ? 30 : data.vendor === "Cisco" ? 25 : 15)),
      network: Math.min(100, 75 + (data.vendor === "Portnox" ? 20 : data.vendor === "Cisco" ? 15 : 8)),
      application: Math.min(100, 60 + (data.vendor === "Portnox" ? 35 : data.vendor === "Cisco" ? 30 : 20)),
      data: Math.min(100, 55 + (data.vendor === "Portnox" ? 40 : data.vendor === "Cisco" ? 35 : 25)),
    }))
  }, [complianceData])

  // Cyber insurance impact
  const insuranceImpact = useMemo(() => {
    const basePremium = config.securityBudget * 0.02 // 2% of security budget
    return complianceData.map((data) => ({
      vendor: data.vendor,
      basePremium,
      discountPercent: Math.min(35, data.avgCoverage * 0.35),
      newPremium: basePremium * (1 - Math.min(0.35, data.avgCoverage * 0.0035)),
      coverageIncrease: Math.min(50, data.avgCoverage * 0.5),
    }))
  }, [complianceData, config.securityBudget])

  const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f97316", "#8b5cf6", "#06b6d4"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compliance & Risk Analysis</h2>
          <p className="text-muted-foreground">Security posture and regulatory compliance assessment</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedFramework} onValueChange={setSelectedFramework}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Frameworks</SelectItem>
              {Object.entries(COMPLIANCE_FRAMEWORKS).map(([key, framework]) => (
                <SelectItem key={key} value={key}>
                  {framework.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="3year">3 Year</SelectItem>
              <SelectItem value="5year">5 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((risk) => {
          const Icon = risk.icon
          return (
            <Card key={risk.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8" style={{ color: risk.color }} />
                  <Badge variant="outline" className="text-green-600">
                    -{risk.reductionPercent}%
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{risk.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Without NAC</span>
                    <span className="font-medium text-red-600">${risk.withoutNAC.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">With NAC</span>
                    <span className="font-medium text-green-600">${risk.withNAC.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Risk Reduction</span>
                      <span className="text-blue-600">${risk.reduction.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="frameworks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="frameworks">Compliance Frameworks</TabsTrigger>
          <TabsTrigger value="posture">Security Posture</TabsTrigger>
          <TabsTrigger value="assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="insurance">Cyber Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Coverage Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Framework Coverage</CardTitle>
                <CardDescription>Coverage percentage by vendor and framework</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis domain={[0, 100]} />
                    <RechartsTooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    {Object.entries(COMPLIANCE_FRAMEWORKS).map(([key, framework], index) => (
                      <Bar
                        key={key}
                        dataKey={`coverage.${key}`}
                        fill={framework.color}
                        name={framework.name}
                        stackId="coverage"
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Framework Details */}
            <Card>
              <CardHeader>
                <CardTitle>Framework Requirements</CardTitle>
                <CardDescription>Regulatory framework details and penalties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(COMPLIANCE_FRAMEWORKS).map(([key, framework]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-semibold">{framework.name}</div>
                        <div className="text-sm text-muted-foreground">{framework.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">{framework.controls} controls</div>
                      </div>
                      <div className="text-right">
                        {framework.maxFine > 0 && (
                          <div className="text-sm font-semibold text-red-600">
                            Max Fine: ${framework.maxFine.toLocaleString()}
                          </div>
                        )}
                        <Badge variant="outline" style={{ borderColor: framework.color, color: framework.color }}>\
                          {complianceData[0] && complianceData[0].coverage[key as keyof typeof complianceData[0].coverage] || 0}% Coverage
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Gap Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Gap Analysis</CardTitle>
              <CardDescription>Areas requiring attention for full compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {complianceData.map((data, index) => (
                  <div key={data.vendor} className="space-y-3">
                    <h4 className="font-semibold">{data.vendor}</h4>
                    {Object.entries(data.coverage).map(([framework, coverage]) => {
                      const frameworkData = COMPLIANCE_FRAMEWORKS[framework as keyof typeof COMPLIANCE_FRAMEWORKS]
                      const isCompliant = coverage >= 90
                      return (
                        <div key={framework} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{frameworkData.name}</span>
                            <span className={isCompliant ? "text-green-600" : "text-orange-600"}>
                              {coverage}%
                            </span>
                          </div>
                          <Progress value={coverage} className="h-2" />
                          {!isCompliant && (
                            <div className="text-xs text-muted-foreground">
                              Gap: {(90 - coverage).toFixed(0)}% to compliance
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posture" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zero Trust Maturity Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Zero Trust Maturity Assessment</CardTitle>
                <CardDescription>Security capabilities across Zero Trust pillars</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={zeroTrustMaturity}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="vendor" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Identity"
                      dataKey="identity"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.1}
                    />
                    <Radar name="Device" dataKey="device" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                    <Radar name="Network" dataKey="network" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
                    <Radar
                      name="Application"
                      dataKey="application"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.1}
                    />
                    <Radar name="Data" dataKey="data" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Security Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle>Security Capabilities Comparison</CardTitle>
                <CardDescription>Key security features by vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {zeroTrustMaturity.map((vendor, index) => (
                    <div key={vendor.vendor} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{vendor.vendor}</h4>
                        <Badge variant="outline">
                          {Math.round((vendor.identity + vendor.device + vendor.network + vendor.application + vendor.data) / 5)}% Maturity
                        </Badge>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-medium text-blue-600">{vendor.identity}%</div>
                          <div className="text-muted-foreground">Identity</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-red-600">{vendor.device}%</div>
                          <div className="text-muted-foreground">Device</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-green-600">{vendor.network}%</div>
                          <div className="text-muted-foreground">Network</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-orange-600">{vendor.application}%</div>
                          <div className="text-muted-foreground">App</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-purple-600">{vendor.data}%</div>
                          <div className="text-muted-foreground">Data</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Reduction Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Quantified Risk Reduction</CardTitle>
                <CardDescription>Annual risk exposure with and without NAC</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="withoutNAC" fill="#ef4444" name="Without NAC" />
                    <Bar dataKey="withNAC" fill="#22c55e" name="With NAC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Compliance Cost Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Cost Impact</CardTitle>
                <CardDescription>Investment vs. potential penalties and losses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData.map((data, index) => {
                    const totalRisk = riskMetrics.reduce((sum, risk) => sum + risk.withoutNAC, 0)
                    const reducedRisk = riskMetrics.reduce((sum, risk) => sum + risk.withNAC, 0)
                    const riskSavings = totalRisk - reducedRisk

                    return (
                      <div key={data.vendor} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{data.vendor}</h4>
                          <Badge variant={riskSavings > data.complianceCost ? "default" : "secondary"}>
                            ROI: {((riskSavings / data.complianceCost - 1) * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Investment</div>
                            <div className="font-semibold text-blue-600">
                              ${data.complianceCost.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Risk Reduction</div>
                            <div className="font-semibold text-green-600">${riskSavings.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Net Benefit</div>
                            <div className="font-semibold text-purple-600">
                              ${(riskSavings - data.complianceCost).toLocaleString()}
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

          {/* Risk Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Exposure Timeline</CardTitle>
              <CardDescription>Projected risk reduction over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={[
                    { month: "Month 0", withoutNAC: 100, withNAC: 100 },
                    { month: "Month 3", withoutNAC: 100, withNAC: 85 },
                    { month: "Month 6", withoutNAC: 100, withNAC: 65 },
                    { month: "Month 9", withoutNAC: 100, withNAC: 45 },
                    { month: "Month 12", withoutNAC: 100, withNAC: 25 },
                    { month: "Month 18", withoutNAC: 100, withNAC: 20 },
                    { month: "Month 24", withoutNAC: 100, withNAC: 15 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <RechartsTooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line type="monotone" dataKey="withoutNAC" stroke="#ef4444" name="Without NAC" strokeWidth={2} />
                  <Line type="monotone" dataKey="withNAC" stroke="#22c55e" name="With NAC" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Premium Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Cyber Insurance Premium Impact</CardTitle>
                <CardDescription>How NAC implementation affects insurance costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insuranceImpact.map((impact, index) => (
                    <div key={impact.vendor} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{impact.vendor}</h4>
                        <Badge variant="outline" className="text-green-600">
                          -{impact.discountPercent.toFixed(0)}% Premium
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Current Premium</div>
                          <div className="font-semibold">${impact.basePremium.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">New Premium</div>
                          <div className="font-semibold text-green-600">${impact.newPremium.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Annual Savings</div>
                          <div className="font-semibold text-blue-600">
                            ${(impact.basePremium - impact.newPremium).toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Coverage Increase</div>
                          <div className="font-semibold text-purple-600">+{impact.coverageIncrease.toFixed(0)}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Coverage Enhancement */}
            <Card>
              <CardHeader>
                <CardTitle>Coverage Enhancement</CardTitle>
                <CardDescription>Additional protection with NAC implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Enhanced Coverage Benefits:</strong> NAC implementation typically qualifies for enhanced
                      cyber insurance coverage including lower deductibles, higher limits, and additional protection for
                      business interruption.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="font-semibold text-green-600">Coverage Improvements</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Lower deductibles (up to 50% reduction)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Higher coverage limits available
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Business interruption protection
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Regulatory fine coverage
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-blue-600">Risk Mitigation</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          Reduced breach probability
                        </li>
                        <li className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          Faster incident response
                        </li>
                        <li className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          Better compliance posture
                        </li>
                        <li className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          Improved security controls
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Total Insurance Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Total Insurance Impact Analysis</CardTitle>
              <CardDescription>Comprehensive view of insurance benefits over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={insuranceImpact}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <RechartsTooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="basePremium" fill="#ef4444" name="Current Premium" />
                  <Bar dataKey="newPremium" fill="#22c55e" name="New Premium" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ComplianceRiskView
