"use client"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface IndustryAnalysisViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Comprehensive compliance frameworks with detailed controls
const COMPLIANCE_FRAMEWORKS = {
  hipaa: {
    name: "HIPAA",
    fullName: "Health Insurance Portability and Accountability Act",
    industry: ["healthcare"],
    maxFine: 2000000,
    controls: {
      "164.308(a)(1)": {
        name: "Security Management Process",
        description: "Implement policies and procedures to prevent, detect, contain, and correct security violations",
        nacRequirement: "critical",
        nacCapabilities: ["Policy enforcement", "Incident detection", "Automated response", "Audit logging"],
        implementationCost: 25000,
        ongoingCost: 5000,
        riskReduction: 35,
        complianceScore: 90,
      },
      "164.308(a)(3)": {
        name: "Workforce Security",
        description:
          "Implement procedures for authorization and/or supervision of workforce members who work with ePHI",
        nacRequirement: "critical",
        nacCapabilities: ["Role-based access", "User authentication", "Session monitoring", "Access reviews"],
        implementationCost: 15000,
        ongoingCost: 3000,
        riskReduction: 40,
        complianceScore: 95,
      },
      "164.308(a)(4)": {
        name: "Information Access Management",
        description: "Implement policies and procedures for authorizing access to ePHI",
        nacRequirement: "critical",
        nacCapabilities: ["Access control", "Least privilege", "Dynamic authorization", "Context-aware access"],
        implementationCost: 20000,
        ongoingCost: 4000,
        riskReduction: 45,
        complianceScore: 92,
      },
      "164.310(a)": {
        name: "Facility Access Controls",
        description: "Implement physical safeguards for all workstations that access ePHI",
        nacRequirement: "important",
        nacCapabilities: ["Device authentication", "Location-based access", "Physical security integration"],
        implementationCost: 30000,
        ongoingCost: 2000,
        riskReduction: 25,
        complianceScore: 85,
      },
      "164.312(a)": {
        name: "Access Control",
        description: "Implement technical policies and procedures for electronic information systems",
        nacRequirement: "critical",
        nacCapabilities: [
          "Unique user identification",
          "Automatic logoff",
          "Encryption",
          "Multi-factor authentication",
        ],
        implementationCost: 35000,
        ongoingCost: 6000,
        riskReduction: 50,
        complianceScore: 98,
      },
      "164.312(b)": {
        name: "Audit Controls",
        description: "Implement hardware, software, and/or procedural mechanisms to record and examine activity",
        nacRequirement: "critical",
        nacCapabilities: ["Activity logging", "Log analysis", "Audit trails", "Real-time monitoring"],
        implementationCost: 18000,
        ongoingCost: 4500,
        riskReduction: 30,
        complianceScore: 88,
      },
    },
  },
  pci_dss: {
    name: "PCI-DSS",
    fullName: "Payment Card Industry Data Security Standard",
    industry: ["retail", "financial", "healthcare"],
    maxFine: 500000,
    controls: {
      "1.1": {
        name: "Network Segmentation",
        description: "Establish and implement firewall and router configuration standards",
        nacRequirement: "critical",
        nacCapabilities: ["Network segmentation", "VLAN assignment", "Micro-segmentation", "Traffic isolation"],
        implementationCost: 40000,
        ongoingCost: 8000,
        riskReduction: 55,
        complianceScore: 95,
      },
      "2.1": {
        name: "Default Credentials",
        description: "Always change vendor-supplied defaults and remove unnecessary default accounts",
        nacRequirement: "critical",
        nacCapabilities: ["Credential management", "Default detection", "Enforcement policies", "Password policies"],
        implementationCost: 12000,
        ongoingCost: 2000,
        riskReduction: 35,
        complianceScore: 90,
      },
      "7.1": {
        name: "Access Control",
        description:
          "Limit access to system components and cardholder data to only those individuals whose job requires such access",
        nacRequirement: "critical",
        nacCapabilities: [
          "Role-based access",
          "Need-to-know enforcement",
          "Access certification",
          "Privilege management",
        ],
        implementationCost: 25000,
        ongoingCost: 5000,
        riskReduction: 45,
        complianceScore: 93,
      },
      "8.1": {
        name: "User Identification",
        description: "Assign all users a unique ID before allowing them to access system components",
        nacRequirement: "critical",
        nacCapabilities: ["Identity management", "Unique authentication", "User lifecycle", "Identity federation"],
        implementationCost: 20000,
        ongoingCost: 4000,
        riskReduction: 40,
        complianceScore: 88,
      },
      "10.1": {
        name: "Audit Trails",
        description: "Implement audit trails to link all access to system components to each individual user",
        nacRequirement: "critical",
        nacCapabilities: ["Comprehensive logging", "User attribution", "Log integrity", "Forensic analysis"],
        implementationCost: 22000,
        ongoingCost: 4500,
        riskReduction: 38,
        complianceScore: 92,
      },
      "11.1": {
        name: "Wireless Detection",
        description: "Test for the presence of wireless access points and detect unauthorized wireless access points",
        nacRequirement: "important",
        nacCapabilities: ["Rogue device detection", "Wireless monitoring", "Automated response", "RF analysis"],
        implementationCost: 15000,
        ongoingCost: 3000,
        riskReduction: 30,
        complianceScore: 85,
      },
    },
  },
}

// Enhanced threat modeling with detailed attack vectors
const THREAT_MODELS = {
  healthcare: {
    threats: [
      {
        name: "Ransomware Attacks",
        probability: 0.35,
        impact: 12000000,
        attackVectors: ["Email phishing", "Unpatched systems", "Lateral movement", "Backup encryption"],
        nacMitigation: 85,
        timeToDetect: 72,
        timeToContain: 168,
        recoveryTime: 720,
        reputationImpact: "Severe",
        regulatoryFines: 2500000,
      },
      {
        name: "Medical Device Compromise",
        probability: 0.25,
        impact: 8500000,
        attackVectors: ["Default credentials", "Unencrypted communications", "Legacy protocols", "Network access"],
        nacMitigation: 90,
        timeToDetect: 120,
        timeToContain: 48,
        recoveryTime: 240,
        reputationImpact: "High",
        regulatoryFines: 1500000,
      },
      {
        name: "Insider Data Theft",
        probability: 0.15,
        impact: 6200000,
        attackVectors: ["Privileged access abuse", "Data exfiltration", "Credential sharing", "Policy violations"],
        nacMitigation: 75,
        timeToDetect: 180,
        timeToContain: 24,
        recoveryTime: 120,
        reputationImpact: "High",
        regulatoryFines: 3000000,
      },
    ],
  },
  financial: {
    threats: [
      {
        name: "Advanced Persistent Threat",
        probability: 0.28,
        impact: 18000000,
        attackVectors: ["Spear phishing", "Zero-day exploits", "Living off the land", "Credential harvesting"],
        nacMitigation: 80,
        timeToDetect: 200,
        timeToContain: 72,
        recoveryTime: 360,
        reputationImpact: "Severe",
        regulatoryFines: 50000000,
      },
      {
        name: "Financial Fraud",
        probability: 0.32,
        impact: 12000000,
        attackVectors: ["Account takeover", "Transaction manipulation", "Identity theft", "Social engineering"],
        nacMitigation: 85,
        timeToDetect: 24,
        timeToContain: 12,
        recoveryTime: 72,
        reputationImpact: "High",
        regulatoryFines: 25000000,
      },
    ],
  },
}

// Comprehensive industry benchmarking data with detailed operational metrics
const INDUSTRY_BENCHMARKS = {
  healthcare: {
    name: "Healthcare",
    avgSecuritySpend: 15.2,
    avgBreachCost: 10930000,
    breachFrequency: 0.28,
    complianceRequirement: 95,
    regulatoryFines: 2000000,
    nacAdoption: 68,
    avgDevices: 8500,
    criticalAssets: 95,
    riskTolerance: "Low",
    topThreats: ["Ransomware", "Insider Threats", "Medical Device Attacks"],
    complianceFrameworks: ["HIPAA", "HITECH", "FDA", "SOX"],
    maturityLevel: 72,
    automationLevel: 45,
    incidentResponseTime: 24,
    securityStaffing: 3.2,
    budgetGrowth: 12.5,
    cloudAdoption: 65,
    remoteWork: 35,
    iotDevices: 15000,
    dataVolume: "High",
    regulatoryPressure: "Very High",
  },
  financial: {
    name: "Financial Services",
    avgSecuritySpend: 18.7,
    avgBreachCost: 5970000,
    breachFrequency: 0.24,
    complianceRequirement: 98,
    regulatoryFines: 50000000,
    nacAdoption: 85,
    avgDevices: 12000,
    criticalAssets: 98,
    riskTolerance: "Very Low",
    topThreats: ["APT", "Financial Fraud", "DDoS"],
    complianceFrameworks: ["PCI-DSS", "SOX", "GDPR", "Basel III"],
    maturityLevel: 88,
    automationLevel: 75,
    incidentResponseTime: 8,
    securityStaffing: 5.8,
    budgetGrowth: 15.2,
    cloudAdoption: 55,
    remoteWork: 45,
    iotDevices: 8000,
    dataVolume: "Very High",
    regulatoryPressure: "Extreme",
  },
}

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, AlertTriangle, Building, CheckCircle, Info } from "lucide-react"

export default function IndustryAnalysisView({ results, config }: IndustryAnalysisViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(config.industry || "healthcare")
  const [selectedFramework, setSelectedFramework] = useState<string>("hipaa")
  const [comparisonMode, setComparisonMode] = useState<"single" | "multi">("single")

  const industryBenchmark = INDUSTRY_BENCHMARKS[selectedIndustry as keyof typeof INDUSTRY_BENCHMARKS]
  const threatModel = THREAT_MODELS[selectedIndustry as keyof typeof THREAT_MODELS]
  const relevantFrameworks = Object.entries(COMPLIANCE_FRAMEWORKS).filter(([_, framework]) =>
    framework.industry.includes(selectedIndustry),
  )

  const riskAnalysis = useMemo(() => {
    if (!threatModel) return { totalRisk: 0, mitigatedRisk: 0, residualRisk: 0 }

    const totalRisk = threatModel.threats.reduce((sum, threat) => sum + threat.probability * threat.impact, 0)

    const mitigatedRisk = threatModel.threats.reduce(
      (sum, threat) => sum + threat.probability * threat.impact * (threat.nacMitigation / 100),
      0,
    )

    return {
      totalRisk,
      mitigatedRisk,
      residualRisk: totalRisk - mitigatedRisk,
    }
  }, [threatModel])

  const complianceGap = useMemo(() => {
    if (!relevantFrameworks.length) return []

    return relevantFrameworks.map(([key, framework]) => {
      const totalControls = Object.keys(framework.controls).length
      const criticalControls = Object.values(framework.controls).filter(
        (control) => control.nacRequirement === "critical",
      ).length

      const avgScore =
        Object.values(framework.controls).reduce((sum, control) => sum + control.complianceScore, 0) / totalControls

      return {
        framework: framework.name,
        key,
        totalControls,
        criticalControls,
        avgScore,
        gap: 100 - avgScore,
      }
    })
  }, [relevantFrameworks])

  const benchmarkComparison = useMemo(() => {
    if (!industryBenchmark) return []

    const currentResult = results[0]
    if (!currentResult) return []

    return [
      {
        metric: "Security Spend %",
        industry: industryBenchmark.avgSecuritySpend,
        current: (currentResult.totalCost / (config.annualRevenue || 100000000)) * 100,
        unit: "%",
      },
      {
        metric: "NAC Adoption",
        industry: industryBenchmark.nacAdoption,
        current: results.length > 1 ? 100 : 0,
        unit: "%",
      },
      {
        metric: "Maturity Level",
        industry: industryBenchmark.maturityLevel,
        current: 65, // Calculated based on selected features
        unit: "/100",
      },
      {
        metric: "Automation Level",
        industry: industryBenchmark.automationLevel,
        current: 80, // Based on vendor capabilities
        unit: "%",
      },
    ]
  }, [industryBenchmark, results, config])

  if (!industryBenchmark) {
    return (
      <div className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Industry Data Not Available</AlertTitle>
          <AlertDescription>Please select a valid industry to view the analysis.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Analysis</h2>
          <p className="text-muted-foreground">
            Compare your security posture against industry benchmarks and standards
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(INDUSTRY_BENCHMARKS).map(([key, industry]) => (
                <SelectItem key={key} value={key}>
                  {industry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Industry Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {industryBenchmark.name} Industry Overview
          </CardTitle>
          <CardDescription>Key metrics and characteristics for your industry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{industryBenchmark.avgSecuritySpend}%</div>
              <div className="text-sm text-muted-foreground">Avg Security Spend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                ${(industryBenchmark.avgBreachCost / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Avg Breach Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {(industryBenchmark.breachFrequency * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">Breach Frequency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{industryBenchmark.nacAdoption}%</div>
              <div className="text-sm text-muted-foreground">NAC Adoption</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="benchmarks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="threats">Threat Landscape</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmark Comparison</CardTitle>
              <CardDescription>How your organization compares to industry averages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {benchmarkComparison.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.metric}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Industry: {item.industry}
                          {item.unit}
                        </span>
                        <span className={item.current > item.industry ? "text-green-600" : "text-red-600"}>
                          Current: {item.current.toFixed(1)}
                          {item.unit}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Progress
                          value={(item.industry / Math.max(item.industry, item.current)) * 100}
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground mt-1">Industry Average</div>
                      </div>
                      <div className="flex-1">
                        <Progress
                          value={(item.current / Math.max(item.industry, item.current)) * 100}
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground mt-1">Your Organization</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Threat Landscape Analysis
              </CardTitle>
              <CardDescription>Industry-specific threats and risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatModel?.threats.map((threat, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{threat.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Probability: {(threat.probability * 100).toFixed(0)}% | Impact: $
                          {(threat.impact / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <Badge variant={threat.reputationImpact === "Severe" ? "destructive" : "secondary"}>
                        {threat.reputationImpact}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-medium mb-1">NAC Mitigation</div>
                        <Progress value={threat.nacMitigation} className="h-2" />
                        <div className="text-xs text-muted-foreground">{threat.nacMitigation}% effective</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Detection Time</div>
                        <div className="text-sm">{threat.timeToDetect} hours</div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="font-medium mb-1">Attack Vectors:</div>
                      <div className="flex flex-wrap gap-1">
                        {threat.attackVectors.map((vector, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {vector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Analysis</CardTitle>
              <CardDescription>Relevant compliance frameworks and gap analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceGap.map((framework, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h4 className="font-semibold">{framework.framework}</h4>
                        <p className="text-sm text-muted-foreground">
                          {framework.totalControls} total controls, {framework.criticalControls} critical
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{framework.avgScore.toFixed(0)}%</div>
                        <div className="text-sm text-muted-foreground">Compliance Score</div>
                      </div>
                    </div>

                    <Progress value={framework.avgScore} className="h-3" />

                    {framework.gap > 10 && (
                      <Alert className="mt-3">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Compliance Gap Identified</AlertTitle>
                        <AlertDescription>
                          {framework.gap.toFixed(0)}% gap in compliance. Consider implementing additional controls.
                        </AlertDescription>
                      </Alert>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific Recommendations</CardTitle>
              <CardDescription>Tailored recommendations based on your industry profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Priority Recommendations</AlertTitle>
                  <AlertDescription>
                    Based on {industryBenchmark.name} industry standards and threat landscape
                  </AlertDescription>
                </Alert>

                <div className="grid gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Security Investment</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Industry average: {industryBenchmark.avgSecuritySpend}% of revenue
                    </p>
                    <Badge variant="outline">Budget Planning</Badge>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Compliance Focus</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Key frameworks: {industryBenchmark.complianceFrameworks.join(", ")}
                    </p>
                    <Badge variant="outline">Regulatory</Badge>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Threat Mitigation</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Top threats: {industryBenchmark.topThreats.join(", ")}
                    </p>
                    <Badge variant="outline">Security</Badge>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Export the dashboard component as well
export { default as IndustryAnalysisDashboard } from "./industry-analysis-dashboard"
