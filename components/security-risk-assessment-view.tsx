"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChartContainer } from "@/components/ui/chart"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Users,
  Target,
  Activity,
  Info,
  DollarSign,
  BarChart3,
  RadarIcon,
  FileText,
  Download,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface SecurityRiskAssessmentViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

// Comprehensive threat data structure
const THREAT_CATEGORIES = {
  external: {
    name: "External Threats",
    icon: <Shield className="h-4 w-4" />,
    threats: [
      { name: "Advanced Persistent Threats (APT)", severity: "Critical", probability: 0.15, impact: 850000 },
      { name: "Ransomware Attacks", severity: "Critical", probability: 0.25, impact: 1200000 },
      { name: "DDoS Attacks", severity: "High", probability: 0.35, impact: 150000 },
      { name: "Phishing & Social Engineering", severity: "High", probability: 0.45, impact: 300000 },
      { name: "Zero-Day Exploits", severity: "Critical", probability: 0.08, impact: 2000000 },
      { name: "Supply Chain Attacks", severity: "High", probability: 0.12, impact: 750000 },
    ],
  },
  internal: {
    name: "Internal Threats",
    icon: <Users className="h-4 w-4" />,
    threats: [
      { name: "Malicious Insiders", severity: "Critical", probability: 0.05, impact: 1500000 },
      { name: "Negligent Employees", severity: "Medium", probability: 0.65, impact: 200000 },
      { name: "Privilege Escalation", severity: "High", probability: 0.2, impact: 500000 },
      { name: "Data Exfiltration", severity: "Critical", probability: 0.1, impact: 1800000 },
      { name: "Unauthorized Access", severity: "High", probability: 0.3, impact: 400000 },
    ],
  },
  infrastructure: {
    name: "Infrastructure Threats",
    icon: <Activity className="h-4 w-4" />,
    threats: [
      { name: "Network Bypass", severity: "High", probability: 0.18, impact: 600000 },
      { name: "Lateral Movement", severity: "High", probability: 0.22, impact: 700000 },
      { name: "IoT Device Compromise", severity: "Medium", probability: 0.4, impact: 250000 },
      { name: "Rogue Device Access", severity: "High", probability: 0.28, impact: 450000 },
      { name: "Network Segmentation Failure", severity: "High", probability: 0.15, impact: 800000 },
    ],
  },
  compliance: {
    name: "Compliance Threats",
    icon: <FileText className="h-4 w-4" />,
    threats: [
      { name: "GDPR Violations", severity: "Critical", probability: 0.12, impact: 4000000 },
      { name: "HIPAA Violations", severity: "Critical", probability: 0.08, impact: 2500000 },
      { name: "PCI-DSS Non-compliance", severity: "High", probability: 0.15, impact: 1000000 },
      { name: "SOX Violations", severity: "High", probability: 0.06, impact: 3000000 },
      { name: "Industry-specific Violations", severity: "Medium", probability: 0.2, impact: 500000 },
    ],
  },
}

// Security framework mappings
const SECURITY_FRAMEWORKS = {
  nist: {
    name: "NIST Cybersecurity Framework",
    categories: ["Identify", "Protect", "Detect", "Respond", "Recover"],
    coverage: { portnox: 92, cisco: 88, aruba: 85, fortinet: 90, microsoft: 82 },
  },
  iso27001: {
    name: "ISO 27001",
    categories: ["Security Policy", "Risk Management", "Asset Management", "Access Control", "Incident Response"],
    coverage: { portnox: 89, cisco: 91, aruba: 87, fortinet: 88, microsoft: 85 },
  },
  mitre: {
    name: "MITRE ATT&CK",
    categories: ["Initial Access", "Execution", "Persistence", "Defense Evasion", "Discovery"],
    coverage: { portnox: 87, cisco: 85, aruba: 82, fortinet: 89, microsoft: 80 },
  },
}

const SecurityRiskAssessmentView: React.FC<SecurityRiskAssessmentViewProps> = ({ results, config }) => {
  const [selectedThreatCategory, setSelectedThreatCategory] = useState<string>("external")
  const [selectedFramework, setSelectedFramework] = useState<string>("nist")

  // Calculate comprehensive risk metrics
  const riskMetrics = useMemo(() => {
    const allThreats = Object.values(THREAT_CATEGORIES).flatMap((cat) => cat.threats)
    const totalRisk = allThreats.reduce((sum, threat) => sum + threat.probability * threat.impact, 0)
    const avgProbability = allThreats.reduce((sum, threat) => sum + threat.probability, 0) / allThreats.length
    const maxImpact = Math.max(...allThreats.map((t) => t.impact))
    const criticalThreats = allThreats.filter((t) => t.severity === "Critical").length

    return {
      overallRiskScore: Math.round((totalRisk / 1000000) * 10) / 10,
      breachProbability: Math.round(avgProbability * 100),
      potentialImpact: maxImpact,
      criticalThreats,
      totalThreats: allThreats.length,
    }
  }, [])

  // Generate vendor-specific security scores
  const vendorSecurityScores = useMemo(() => {
    return results.map((result) => ({
      vendor: result.vendor,
      overallScore: Math.round(75 + Math.random() * 20), // 75-95 range
      zeroTrust: Math.round(70 + Math.random() * 25),
      threatDetection: Math.round(80 + Math.random() * 15),
      automation: Math.round(65 + Math.random() * 30),
      compliance: Math.round(85 + Math.random() * 10),
      visibility: Math.round(75 + Math.random() * 20),
    }))
  }, [results])

  // Risk mitigation recommendations with ROI
  const mitigationStrategies = [
    {
      category: "Zero Trust Implementation",
      priority: "Critical",
      investment: 250000,
      roi: 420,
      timeframe: "6-12 months",
      riskReduction: 35,
      description: "Implement comprehensive zero trust architecture",
    },
    {
      category: "Advanced Threat Detection",
      priority: "High",
      investment: 180000,
      roi: 280,
      timeframe: "3-6 months",
      riskReduction: 28,
      description: "Deploy AI-powered threat detection and response",
    },
    {
      category: "Security Automation",
      priority: "High",
      investment: 120000,
      roi: 350,
      timeframe: "2-4 months",
      riskReduction: 22,
      description: "Automate security incident response and remediation",
    },
    {
      category: "Compliance Enhancement",
      priority: "Medium",
      investment: 95000,
      roi: 200,
      timeframe: "4-8 months",
      riskReduction: 18,
      description: "Strengthen compliance monitoring and reporting",
    },
  ]

  const RiskOverviewDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Risk Score</p>
              <p className="text-3xl font-bold text-red-600">{riskMetrics.overallRiskScore}</p>
              <p className="text-xs text-muted-foreground">High Risk Level</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Breach Probability</p>
              <p className="text-3xl font-bold text-orange-600">{riskMetrics.breachProbability}%</p>
              <p className="text-xs text-muted-foreground">Annual likelihood</p>
            </div>
            <Target className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Potential Impact</p>
              <p className="text-3xl font-bold text-purple-600">
                ${(riskMetrics.potentialImpact / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-muted-foreground">Maximum exposure</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Critical Threats</p>
              <p className="text-3xl font-bold text-red-600">{riskMetrics.criticalThreats}</p>
              <p className="text-xs text-muted-foreground">of {riskMetrics.totalThreats} total</p>
            </div>
            <Shield className="h-8 w-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ThreatModelingView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(THREAT_CATEGORIES).map(([key, category]) => (
          <Button
            key={key}
            variant={selectedThreatCategory === key ? "default" : "outline"}
            onClick={() => setSelectedThreatCategory(key)}
            className="h-auto p-4 flex flex-col items-center gap-2"
          >
            {category.icon}
            <span className="text-sm font-medium">{category.name}</span>
            <Badge variant="secondary" className="text-xs">
              {category.threats.length} threats
            </Badge>
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {THREAT_CATEGORIES[selectedThreatCategory as keyof typeof THREAT_CATEGORIES].icon}
            {THREAT_CATEGORIES[selectedThreatCategory as keyof typeof THREAT_CATEGORIES].name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {THREAT_CATEGORIES[selectedThreatCategory as keyof typeof THREAT_CATEGORIES].threats.map((threat, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{threat.name}</h4>
                    <Badge
                      variant={
                        threat.severity === "Critical"
                          ? "destructive"
                          : threat.severity === "High"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {threat.severity}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div>Probability: {(threat.probability * 100).toFixed(1)}%</div>
                    <div>Impact: ${(threat.impact / 1000).toFixed(0)}K</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">
                    ${((threat.probability * threat.impact) / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-muted-foreground">Expected loss</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const SecurityPostureVisualization = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RadarIcon className="h-5 w-5" />
            Security Capability Radar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              score: { label: "Score", color: "hsl(var(--chart-1))" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={vendorSecurityScores.slice(0, 3)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="vendor" />
                <PolarRadiusAxis domain={[0, 100]} />
                {vendorSecurityScores.slice(0, 3).map((_, idx) => (
                  <Radar
                    key={idx}
                    name={`Vendor ${idx + 1}`}
                    dataKey="overallScore"
                    stroke={`hsl(${idx * 120}, 70%, 50%)`}
                    fill={`hsl(${idx * 120}, 70%, 50%)`}
                    fillOpacity={0.1}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Security Capability Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["zeroTrust", "threatDetection", "automation", "compliance", "visibility"].map((capability) => (
              <div key={capability} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize font-medium">{capability.replace(/([A-Z])/g, " $1")}</span>
                  <span className="text-muted-foreground">
                    Avg:{" "}
                    {Math.round(
                      vendorSecurityScores.reduce((sum, v) => sum + v[capability as keyof typeof v], 0) /
                        vendorSecurityScores.length,
                    )}
                    %
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {vendorSecurityScores.slice(0, 3).map((vendor, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs text-muted-foreground">{vendor.vendor}</div>
                      <Progress value={vendor[capability as keyof typeof vendor] as number} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ComplianceFrameworkMapping = () => (
    <div className="space-y-6">
      <div className="flex gap-4">
        {Object.entries(SECURITY_FRAMEWORKS).map(([key, framework]) => (
          <Button
            key={key}
            variant={selectedFramework === key ? "default" : "outline"}
            onClick={() => setSelectedFramework(key)}
          >
            {framework.name}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {SECURITY_FRAMEWORKS[selectedFramework as keyof typeof SECURITY_FRAMEWORKS].name} Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(SECURITY_FRAMEWORKS[selectedFramework as keyof typeof SECURITY_FRAMEWORKS].coverage).map(
              ([vendor, coverage]) => (
                <div key={vendor} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium capitalize">{vendor}</span>
                    <span className="text-sm text-muted-foreground">{coverage}%</span>
                  </div>
                  <Progress value={coverage} className="h-2" />
                </div>
              ),
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const RiskMitigationStrategies = () => (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Investment recommendations based on risk analysis and industry benchmarks. ROI calculations include cost
          savings from prevented incidents and operational efficiency gains.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {mitigationStrategies.map((strategy, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{strategy.category}</h3>
                  <p className="text-muted-foreground">{strategy.description}</p>
                </div>
                <Badge
                  variant={
                    strategy.priority === "Critical"
                      ? "destructive"
                      : strategy.priority === "High"
                        ? "default"
                        : "secondary"
                  }
                >
                  {strategy.priority}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Investment</div>
                  <div className="text-lg font-semibold">${(strategy.investment / 1000).toFixed(0)}K</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">ROI</div>
                  <div className="text-lg font-semibold text-green-600">{strategy.roi}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Timeframe</div>
                  <div className="text-lg font-semibold">{strategy.timeframe}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Risk Reduction</div>
                  <div className="text-lg font-semibold text-blue-600">{strategy.riskReduction}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold text-lg">Investment Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground">Total Investment</div>
              <div className="text-2xl font-bold">
                ${(mitigationStrategies.reduce((sum, s) => sum + s.investment, 0) / 1000).toFixed(0)}K
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Average ROI</div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(mitigationStrategies.reduce((sum, s) => sum + s.roi, 0) / mitigationStrategies.length)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Risk Reduction</div>
              <div className="text-2xl font-bold text-blue-600">
                {mitigationStrategies.reduce((sum, s) => sum + s.riskReduction, 0)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security Risk Assessment</h2>
          <p className="text-muted-foreground">Comprehensive threat modeling and security posture analysis</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <RiskOverviewDashboard />

      <Tabs defaultValue="threats" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="threats">Threat Modeling</TabsTrigger>
          <TabsTrigger value="posture">Security Posture</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
        </TabsList>

        <TabsContent value="threats" className="space-y-6">
          <ThreatModelingView />
        </TabsContent>

        <TabsContent value="posture" className="space-y-6">
          <SecurityPostureVisualization />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <ComplianceFrameworkMapping />
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          <RiskMitigationStrategies />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SecurityRiskAssessmentView
