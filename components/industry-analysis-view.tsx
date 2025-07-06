"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  Shield,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Factory,
  GraduationCap,
  Heart,
  Landmark,
  ShoppingCart,
  Info,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface IndustryAnalysisViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Industry-specific data and benchmarks
const INDUSTRY_PROFILES = {
  healthcare: {
    name: "Healthcare",
    icon: <Heart className="h-5 w-5" />,
    description: "Hospitals, clinics, and healthcare providers",
    complianceRequirements: ["HIPAA", "HITECH", "SOC 2", "FDA 21 CFR Part 11"],
    riskProfile: "Very High",
    avgDevicesPerUser: 3.2,
    avgBreachCost: 10930000,
    regulatoryFines: 5500000,
    budgetMultiplier: 1.4,
    securityPriorities: ["Data Protection", "Access Control", "Audit Trails", "Device Management"],
    commonThreats: ["Ransomware", "Data Theft", "Insider Threats", "Medical Device Compromise"],
    benchmarks: {
      securitySpend: 0.08, // 8% of IT budget
      complianceSpend: 0.12, // 12% of IT budget
      incidentResponse: 24, // hours
      auditFrequency: 2, // per year
    },
  },
  finance: {
    name: "Financial Services",
    icon: <DollarSign className="h-5 w-5" />,
    description: "Banks, credit unions, and financial institutions",
    complianceRequirements: ["PCI DSS", "SOX", "GLBA", "FFIEC", "Basel III"],
    riskProfile: "Critical",
    avgDevicesPerUser: 2.8,
    avgBreachCost: 5850000,
    regulatoryFines: 8200000,
    budgetMultiplier: 1.6,
    securityPriorities: ["Transaction Security", "Fraud Prevention", "Identity Management", "Compliance Reporting"],
    commonThreats: ["Financial Fraud", "APTs", "Insider Trading", "Payment Card Theft"],
    benchmarks: {
      securitySpend: 0.15, // 15% of IT budget
      complianceSpend: 0.18, // 18% of IT budget
      incidentResponse: 12, // hours
      auditFrequency: 4, // per year
    },
  },
  education: {
    name: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
    description: "Schools, universities, and educational institutions",
    complianceRequirements: ["FERPA", "COPPA", "CIPA", "State Privacy Laws"],
    riskProfile: "Medium",
    avgDevicesPerUser: 4.1,
    avgBreachCost: 3790000,
    regulatoryFines: 1200000,
    budgetMultiplier: 0.7,
    securityPriorities: ["Student Privacy", "BYOD Management", "Content Filtering", "Network Segmentation"],
    commonThreats: ["Data Breaches", "Cyberbullying", "Malware", "Unauthorized Access"],
    benchmarks: {
      securitySpend: 0.05, // 5% of IT budget
      complianceSpend: 0.08, // 8% of IT budget
      incidentResponse: 48, // hours
      auditFrequency: 1, // per year
    },
  },
  government: {
    name: "Government",
    icon: <Landmark className="h-5 w-5" />,
    description: "Federal, state, and local government agencies",
    complianceRequirements: ["FISMA", "FedRAMP", "NIST 800-53", "CJIS", "IRS 1075"],
    riskProfile: "Critical",
    avgDevicesPerUser: 2.2,
    avgBreachCost: 9040000,
    regulatoryFines: 12000000,
    budgetMultiplier: 1.3,
    securityPriorities: ["National Security", "Citizen Privacy", "Critical Infrastructure", "Classified Data"],
    commonThreats: ["Nation-State Attacks", "Espionage", "Data Theft", "Infrastructure Attacks"],
    benchmarks: {
      securitySpend: 0.12, // 12% of IT budget
      complianceSpend: 0.2, // 20% of IT budget
      incidentResponse: 8, // hours
      auditFrequency: 3, // per year
    },
  },
  manufacturing: {
    name: "Manufacturing",
    icon: <Factory className="h-5 w-5" />,
    description: "Industrial and manufacturing companies",
    complianceRequirements: ["ISO 27001", "NIST CSF", "IEC 62443", "GDPR"],
    riskProfile: "High",
    avgDevicesPerUser: 5.3,
    avgBreachCost: 4990000,
    regulatoryFines: 2800000,
    budgetMultiplier: 1.1,
    securityPriorities: ["OT Security", "Supply Chain", "IP Protection", "Safety Systems"],
    commonThreats: ["Industrial Espionage", "Ransomware", "Supply Chain Attacks", "OT Disruption"],
    benchmarks: {
      securitySpend: 0.06, // 6% of IT budget
      complianceSpend: 0.09, // 9% of IT budget
      incidentResponse: 36, // hours
      auditFrequency: 2, // per year
    },
  },
  retail: {
    name: "Retail",
    icon: <ShoppingCart className="h-5 w-5" />,
    description: "Retail stores and e-commerce companies",
    complianceRequirements: ["PCI DSS", "GDPR", "CCPA", "State Breach Laws"],
    riskProfile: "High",
    avgDevicesPerUser: 3.7,
    avgBreachCost: 3270000,
    regulatoryFines: 1800000,
    budgetMultiplier: 0.9,
    securityPriorities: ["Payment Security", "Customer Data", "Point-of-Sale", "E-commerce Protection"],
    commonThreats: ["Payment Card Theft", "E-commerce Attacks", "POS Malware", "Customer Data Theft"],
    benchmarks: {
      securitySpend: 0.04, // 4% of IT budget
      complianceSpend: 0.07, // 7% of IT budget
      incidentResponse: 72, // hours
      auditFrequency: 2, // per year
    },
  },
}

// Vendor suitability by industry
const VENDOR_INDUSTRY_FIT = {
  healthcare: {
    portnox: { score: 95, strengths: ["HIPAA Compliance", "Zero Trust", "Device Classification"] },
    cisco: { score: 90, strengths: ["Enterprise Scale", "Medical Device Support", "Compliance Tools"] },
    aruba: { score: 88, strengths: ["Healthcare Workflows", "Mobile Support", "Policy Management"] },
    fortinet: { score: 85, strengths: ["Security Fabric", "Threat Protection", "Compliance Reporting"] },
    microsoft: { score: 82, strengths: ["Azure Integration", "Office 365", "Conditional Access"] },
  },
  finance: {
    cisco: { score: 95, strengths: ["Enterprise Security", "Compliance Tools", "Audit Capabilities"] },
    portnox: { score: 92, strengths: ["Zero Trust", "Risk Analytics", "Cloud Native"] },
    fortinet: { score: 90, strengths: ["Security Fabric", "Threat Intelligence", "Compliance"] },
    aruba: { score: 85, strengths: ["Policy Management", "Network Visibility", "Access Control"] },
    microsoft: { score: 83, strengths: ["Identity Integration", "Compliance Center", "Risk Management"] },
  },
  education: {
    portnox: { score: 93, strengths: ["BYOD Support", "Easy Management", "Student Privacy"] },
    aruba: { score: 90, strengths: ["Campus Networks", "BYOD", "Guest Access"] },
    cisco: { score: 87, strengths: ["Network Infrastructure", "Content Filtering", "Scale"] },
    microsoft: { score: 85, strengths: ["Education Licensing", "Office 365", "Teams Integration"] },
    fortinet: { score: 80, strengths: ["Content Filtering", "Threat Protection", "Firewall Integration"] },
  },
  government: {
    cisco: { score: 96, strengths: ["FedRAMP", "FIPS Compliance", "Government Contracts"] },
    fortinet: { score: 92, strengths: ["Security Fabric", "Government Compliance", "Threat Intelligence"] },
    portnox: { score: 88, strengths: ["Zero Trust", "Cloud Security", "Risk Analytics"] },
    aruba: { score: 85, strengths: ["Policy Management", "Network Security", "Compliance Tools"] },
    microsoft: { score: 90, strengths: ["Government Cloud", "Compliance", "Identity Management"] },
  },
  manufacturing: {
    fortinet: { score: 94, strengths: ["OT Security", "Industrial Protocols", "Security Fabric"] },
    cisco: { score: 91, strengths: ["Industrial Networks", "OT Integration", "Scalability"] },
    portnox: { score: 87, strengths: ["IoT Classification", "Zero Trust", "Cloud Management"] },
    aruba: { score: 84, strengths: ["Industrial Wi-Fi", "Policy Management", "Network Visibility"] },
    microsoft: { score: 78, strengths: ["Azure IoT", "Conditional Access", "Hybrid Cloud"] },
  },
  retail: {
    portnox: { score: 91, strengths: ["PCI Compliance", "Guest Access", "Multi-location"] },
    aruba: { score: 89, strengths: ["Retail Networks", "Guest Wi-Fi", "Location Services"] },
    cisco: { score: 86, strengths: ["Branch Networks", "PCI Compliance", "Scalability"] },
    fortinet: { score: 84, strengths: ["POS Security", "Threat Protection", "Branch Security"] },
    microsoft: { score: 80, strengths: ["Retail Solutions", "Cloud Integration", "Analytics"] },
  },
}

export default function IndustryAnalysisView({ results, config }: IndustryAnalysisViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("healthcare")
  const [selectedMetric, setSelectedMetric] = useState<string>("suitability")

  const industryProfile = INDUSTRY_PROFILES[selectedIndustry as keyof typeof INDUSTRY_PROFILES]
  const vendorFit = VENDOR_INDUSTRY_FIT[selectedIndustry as keyof typeof VENDOR_INDUSTRY_FIT]

  // Calculate industry-specific metrics
  const industryMetrics = useMemo(() => {
    const adjustedResults = results.map((result) => {
      const fit = vendorFit[result.vendor as keyof typeof vendorFit]
      const adjustedCost = result.totalCost * industryProfile.budgetMultiplier
      const riskAdjustment = fit ? (100 - fit.score) / 100 : 0.5
      const complianceCost = adjustedCost * industryProfile.benchmarks.complianceSpend

      return {
        ...result,
        industryScore: fit?.score || 50,
        adjustedCost,
        complianceCost,
        riskScore: Math.max(0, 100 - riskAdjustment * 50),
        strengths: fit?.strengths || [],
      }
    })

    return adjustedResults.sort((a, b) => b.industryScore - a.industryScore)
  }, [results, selectedIndustry, industryProfile, vendorFit])

  // Benchmark comparison data
  const benchmarkData = Object.entries(INDUSTRY_PROFILES).map(([key, profile]) => ({
    industry: profile.name,
    securitySpend: profile.benchmarks.securitySpend * 100,
    complianceSpend: profile.benchmarks.complianceSpend * 100,
    breachCost: profile.avgBreachCost / 1000000,
    riskLevel:
      profile.riskProfile === "Critical"
        ? 100
        : profile.riskProfile === "Very High"
          ? 85
          : profile.riskProfile === "High"
            ? 70
            : 50,
  }))

  // Compliance requirements analysis
  const complianceAnalysis = industryProfile.complianceRequirements.map((req) => ({
    requirement: req,
    coverage: Math.floor(Math.random() * 30 + 70), // Simulated coverage
    gap: Math.floor(Math.random() * 20 + 5), // Simulated gap
    priority: Math.random() > 0.5 ? "High" : Math.random() > 0.3 ? "Medium" : "Low",
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Analysis</h2>
          <p className="text-muted-foreground">Industry-specific security requirements and vendor suitability</p>
        </div>
      </div>

      {/* Industry Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(INDUSTRY_PROFILES).map(([key, profile]) => (
          <Button
            key={key}
            variant={selectedIndustry === key ? "default" : "outline"}
            onClick={() => setSelectedIndustry(key)}
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            {profile.icon}
            <span className="text-sm font-medium">{profile.name}</span>
          </Button>
        ))}
      </div>

      {/* Industry Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {industryProfile.icon}
            {industryProfile.name} Industry Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Risk Profile</h4>
              <Badge
                variant={
                  industryProfile.riskProfile === "Critical"
                    ? "destructive"
                    : industryProfile.riskProfile === "Very High"
                      ? "destructive"
                      : industryProfile.riskProfile === "High"
                        ? "default"
                        : "secondary"
                }
              >
                {industryProfile.riskProfile}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">{industryProfile.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Key Metrics</h4>
              <div className="space-y-2 text-sm">
                <div>Devices/User: {industryProfile.avgDevicesPerUser}</div>
                <div>Avg Breach Cost: ${(industryProfile.avgBreachCost / 1000000).toFixed(1)}M</div>
                <div>Budget Multiplier: {industryProfile.budgetMultiplier}x</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Security Priorities</h4>
              <div className="flex flex-wrap gap-1">
                {industryProfile.securityPriorities.slice(0, 3).map((priority, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Compliance Requirements</h4>
              <div className="flex flex-wrap gap-1">
                {industryProfile.complianceRequirements.slice(0, 3).map((req, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {req}
                  </Badge>
                ))}
                {industryProfile.complianceRequirements.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{industryProfile.complianceRequirements.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="suitability" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suitability">Vendor Suitability</TabsTrigger>
          <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Analysis</TabsTrigger>
          <TabsTrigger value="threats">Threat Landscape</TabsTrigger>
        </TabsList>

        <TabsContent value="suitability" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Suitability Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    score: { label: "Suitability Score", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={industryMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vendor" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="industryScore" fill="var(--color-score)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost vs Suitability Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryMetrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium capitalize">{metric.vendor}</span>
                          <Badge variant="outline">{metric.industryScore}/100</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {metric.strengths.slice(0, 2).map((strength, sIdx) => (
                            <Badge key={sIdx} variant="secondary" className="text-xs">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">${(metric.adjustedCost / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-muted-foreground">3-year TCO</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Suitability scores are based on industry-specific requirements, compliance capabilities, and feature
              alignment. Higher scores indicate better fit for {industryProfile.name.toLowerCase()} organizations.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security & Compliance Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    securitySpend: { label: "Security Spend (%)", color: "hsl(var(--chart-1))" },
                    complianceSpend: { label: "Compliance Spend (%)", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={benchmarkData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="industry" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="securitySpend" fill="var(--color-securitySpend)" name="Security Spend %" />
                      <Bar dataKey="complianceSpend" fill="var(--color-complianceSpend)" name="Compliance Spend %" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Breach Cost by Industry</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    breachCost: { label: "Breach Cost ($M)", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={benchmarkData}
                        dataKey="breachCost"
                        nameKey="industry"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, value }) => `${name}: $${value}M`}
                      >
                        {benchmarkData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmarks - {industryProfile.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {(industryProfile.benchmarks.securitySpend * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Security Spend</div>
                  <div className="text-xs text-muted-foreground">of IT budget</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(industryProfile.benchmarks.complianceSpend * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Compliance Spend</div>
                  <div className="text-xs text-muted-foreground">of IT budget</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {industryProfile.benchmarks.incidentResponse}h
                  </div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                  <div className="text-xs text-muted-foreground">incident response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{industryProfile.benchmarks.auditFrequency}</div>
                  <div className="text-sm text-muted-foreground">Audits/Year</div>
                  <div className="text-xs text-muted-foreground">compliance audits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Requirements Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceAnalysis.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.requirement}</span>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.priority === "High"
                              ? "destructive"
                              : item.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {item.priority}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{item.coverage}% coverage</span>
                      </div>
                    </div>
                    <Progress value={item.coverage} className="h-2" />
                    {item.gap > 10 && (
                      <div className="text-sm text-orange-600">Gap: {item.gap}% - Requires attention</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Compliance Score</span>
                    <span className="text-2xl font-bold text-green-600">87%</span>
                  </div>
                  <Progress value={87} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <CheckCircle className="h-4 w-4 text-green-600 inline mr-2" />
                      Ready: {complianceAnalysis.filter((c) => c.coverage > 80).length}
                    </div>
                    <div>
                      <AlertTriangle className="h-4 w-4 text-orange-600 inline mr-2" />
                      Gaps: {complianceAnalysis.filter((c) => c.coverage < 80).length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regulatory Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Potential Fine Exposure</span>
                    <span className="text-2xl font-bold text-red-600">
                      ${(industryProfile.regulatoryFines / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on historical fines and current compliance gaps
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Risk Level</span>
                      <span className="font-medium">{industryProfile.riskProfile}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Audit Frequency</span>
                      <span className="font-medium">{industryProfile.benchmarks.auditFrequency}/year</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry-Specific Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {industryProfile.commonThreats.map((threat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{threat}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{Math.floor(Math.random() * 30 + 60)}% likely</Badge>
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threat Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      ${(industryProfile.avgBreachCost / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-muted-foreground">Average breach cost</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Direct Costs</div>
                      <div className="text-muted-foreground">
                        ${((industryProfile.avgBreachCost * 0.6) / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Indirect Costs</div>
                      <div className="text-muted-foreground">
                        ${((industryProfile.avgBreachCost * 0.4) / 1000000).toFixed(1)}M
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Recovery Time</div>
                      <div className="text-muted-foreground">
                        {Math.floor(industryProfile.avgBreachCost / 100000)} days
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Reputation Impact</div>
                      <div className="text-muted-foreground">12-24 months</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              {industryProfile.name} organizations face unique security challenges. The recommended security investment
              is {(industryProfile.benchmarks.securitySpend * 100).toFixed(0)}% of IT budget to maintain adequate
              protection against industry-specific threats.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
