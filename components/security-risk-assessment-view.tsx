"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Shield,
  AlertTriangle,
  Target,
  Users,
  Server,
  Smartphone,
  Globe,
  Eye,
  TrendingUp,
  Calculator,
  Download,
} from "lucide-react"
import { enhancedVendorDatabase } from "@/lib/vendors/enhanced-vendor-data"

interface SecurityRiskAssessmentViewProps {
  results: any[]
  config: any
}

// Threat categories and their characteristics
const THREAT_CATEGORIES = {
  external: {
    name: "External Threats",
    icon: Globe,
    color: "#ef4444",
    threats: [
      {
        id: "apt",
        name: "Advanced Persistent Threats (APT)",
        likelihood: 0.15,
        impact: 0.9,
        description: "Sophisticated, long-term attacks by nation-states or organized groups",
        mitigation: ["Network segmentation", "Behavioral analytics", "Zero trust architecture"],
      },
      {
        id: "ransomware",
        name: "Ransomware Attacks",
        likelihood: 0.35,
        impact: 0.85,
        description: "Malicious software that encrypts data and demands payment",
        mitigation: ["Endpoint protection", "Network isolation", "Backup systems"],
      },
      {
        id: "ddos",
        name: "Distributed Denial of Service",
        likelihood: 0.25,
        impact: 0.6,
        description: "Overwhelming network resources to disrupt services",
        mitigation: ["Traffic filtering", "Load balancing", "Cloud protection"],
      },
      {
        id: "phishing",
        name: "Phishing & Social Engineering",
        likelihood: 0.7,
        impact: 0.7,
        description: "Deceptive attempts to steal credentials or install malware",
        mitigation: ["User training", "Email filtering", "Multi-factor authentication"],
      },
    ],
  },
  insider: {
    name: "Insider Threats",
    icon: Users,
    color: "#f97316",
    threats: [
      {
        id: "malicious_insider",
        name: "Malicious Insider",
        likelihood: 0.08,
        impact: 0.95,
        description: "Employees or contractors intentionally causing harm",
        mitigation: ["Access controls", "Activity monitoring", "Background checks"],
      },
      {
        id: "negligent_insider",
        name: "Negligent Insider",
        likelihood: 0.4,
        impact: 0.6,
        description: "Unintentional security breaches by authorized users",
        mitigation: ["Security training", "Data loss prevention", "Access restrictions"],
      },
      {
        id: "compromised_account",
        name: "Compromised Accounts",
        likelihood: 0.3,
        impact: 0.8,
        description: "Legitimate accounts used by unauthorized individuals",
        mitigation: ["Continuous authentication", "Behavioral analysis", "Privilege management"],
      },
    ],
  },
  infrastructure: {
    name: "Infrastructure Threats",
    icon: Server,
    color: "#8b5cf6",
    threats: [
      {
        id: "system_vulnerabilities",
        name: "System Vulnerabilities",
        likelihood: 0.6,
        impact: 0.75,
        description: "Unpatched software and configuration weaknesses",
        mitigation: ["Patch management", "Vulnerability scanning", "Configuration hardening"],
      },
      {
        id: "network_intrusion",
        name: "Network Intrusion",
        likelihood: 0.3,
        impact: 0.85,
        description: "Unauthorized access to network infrastructure",
        mitigation: ["Network segmentation", "Intrusion detection", "Access control"],
      },
      {
        id: "supply_chain",
        name: "Supply Chain Attacks",
        likelihood: 0.12,
        impact: 0.9,
        description: "Compromised third-party software or hardware",
        mitigation: ["Vendor assessment", "Code signing", "Isolation"],
      },
    ],
  },
  device: {
    name: "Device & Endpoint Threats",
    icon: Smartphone,
    color: "#06b6d4",
    threats: [
      {
        id: "malware",
        name: "Malware & Viruses",
        likelihood: 0.5,
        impact: 0.7,
        description: "Malicious software on endpoints and devices",
        mitigation: ["Antivirus software", "Device compliance", "Application control"],
      },
      {
        id: "rogue_devices",
        name: "Rogue Devices",
        likelihood: 0.25,
        impact: 0.65,
        description: "Unauthorized devices connecting to the network",
        mitigation: ["Device authentication", "Network access control", "Device discovery"],
      },
      {
        id: "byod_risks",
        name: "BYOD Security Risks",
        likelihood: 0.45,
        impact: 0.6,
        description: "Personal devices accessing corporate resources",
        mitigation: ["Mobile device management", "Containerization", "Access policies"],
      },
    ],
  },
}

// Industry risk profiles
const INDUSTRY_PROFILES = {
  healthcare: {
    name: "Healthcare",
    riskMultipliers: { external: 1.3, insider: 1.4, infrastructure: 1.2, device: 1.1 },
    specificThreats: ["Medical device attacks", "Patient data theft", "Ransomware targeting hospitals"],
  },
  financial: {
    name: "Financial Services",
    riskMultipliers: { external: 1.5, insider: 1.3, infrastructure: 1.4, device: 1.2 },
    specificThreats: ["Financial fraud", "Trading system attacks", "Regulatory compliance breaches"],
  },
  manufacturing: {
    name: "Manufacturing",
    riskMultipliers: { external: 1.2, insider: 1.1, infrastructure: 1.5, device: 1.3 },
    specificThreats: ["Industrial espionage", "OT/IT convergence risks", "Supply chain disruption"],
  },
  education: {
    name: "Education",
    riskMultipliers: { external: 1.1, insider: 1.2, infrastructure: 1.0, device: 1.4 },
    specificThreats: ["Student data privacy", "Research IP theft", "Campus network security"],
  },
  government: {
    name: "Government",
    riskMultipliers: { external: 1.6, insider: 1.5, infrastructure: 1.3, device: 1.2 },
    specificThreats: ["Nation-state attacks", "Classified data breaches", "Critical infrastructure"],
  },
  retail: {
    name: "Retail",
    riskMultipliers: { external: 1.2, insider: 1.1, infrastructure: 1.1, device: 1.2 },
    specificThreats: ["Payment card fraud", "Customer data theft", "E-commerce attacks"],
  },
}

const COLORS = ["#00D4AA", "#0EA5E9", "#8B5CF6", "#EF4444", "#F97316", "#06B6D4"]

export default function SecurityRiskAssessmentView({ results, config }: SecurityRiskAssessmentViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<keyof typeof INDUSTRY_PROFILES>("healthcare")
  const [riskTolerance, setRiskTolerance] = useState([50])
  const [threatWeights, setThreatWeights] = useState({
    external: 25,
    insider: 25,
    infrastructure: 25,
    device: 25,
  })

  // Calculate risk scores for each vendor
  const vendorRiskAnalysis = useMemo(() => {
    if (!results || results.length === 0) return []

    return results
      .map((result) => {
        const vendor = enhancedVendorDatabase[result.vendor]
        if (!vendor) return null

        const industryProfile = INDUSTRY_PROFILES[selectedIndustry]
        const baseRiskReduction = vendor.security.riskReduction

        // Calculate threat-specific risk scores
        const threatScores = Object.entries(THREAT_CATEGORIES).map(([categoryKey, category]) => {
          const categoryRisk = category.threats.reduce((acc, threat) => {
            const likelihood =
              threat.likelihood *
              (industryProfile.riskMultipliers[categoryKey as keyof typeof industryProfile.riskMultipliers] || 1)
            const impact = threat.impact
            const riskScore = likelihood * impact * 100

            // Apply vendor's risk reduction capability
            const reductionFactor =
              baseRiskReduction[threat.id as keyof typeof baseRiskReduction] ||
              baseRiskReduction.unauthorized_access ||
              50
            const residualRisk = riskScore * (1 - reductionFactor / 100)

            return acc + residualRisk
          }, 0)

          return {
            category: categoryKey,
            name: category.name,
            score: categoryRisk / category.threats.length,
            color: category.color,
          }
        })

        // Calculate overall risk score
        const overallRisk = threatScores.reduce((acc, threat) => {
          const weight = threatWeights[threat.category as keyof typeof threatWeights] / 100
          return acc + threat.score * weight
        }, 0)

        return {
          vendorId: result.vendor,
          vendorName: result.vendorName || vendor.name,
          overallRisk: Math.round(overallRisk),
          threatScores,
          riskReduction: baseRiskReduction,
          zeroTrustScore: vendor.security.zeroTrustScore,
          securityFeatures: vendor.security.securityFeatures,
        }
      })
      .filter(Boolean)
  }, [results, selectedIndustry, threatWeights])

  // Calculate threat landscape data
  const threatLandscapeData = useMemo(() => {
    const industryProfile = INDUSTRY_PROFILES[selectedIndustry]

    return Object.entries(THREAT_CATEGORIES).map(([categoryKey, category]) => {
      const multiplier =
        industryProfile.riskMultipliers[categoryKey as keyof typeof industryProfile.riskMultipliers] || 1
      const avgLikelihood =
        category.threats.reduce((acc, threat) => acc + threat.likelihood, 0) / category.threats.length
      const avgImpact = category.threats.reduce((acc, threat) => acc + threat.impact, 0) / category.threats.length

      return {
        category: category.name,
        likelihood: Math.round(avgLikelihood * multiplier * 100),
        impact: Math.round(avgImpact * 100),
        riskScore: Math.round(avgLikelihood * avgImpact * multiplier * 100),
        color: category.color,
      }
    })
  }, [selectedIndustry])

  // Risk mitigation effectiveness
  const mitigationEffectiveness = useMemo(() => {
    if (!vendorRiskAnalysis.length) return []

    return vendorRiskAnalysis.map((vendor) => ({
      vendor: vendor.vendorName,
      beforeNAC: 85, // Baseline risk without NAC
      afterNAC: vendor.overallRisk,
      reduction: Math.round(((85 - vendor.overallRisk) / 85) * 100),
    }))
  }, [vendorRiskAnalysis])

  // Cost of risk calculation
  const riskCostAnalysis = useMemo(() => {
    const baseCosts = {
      dataBreachCost: 4450000,
      downtimeCostPerHour: 50000,
      complianceFine: 2000000,
      reputationDamage: 1000000,
    }

    return vendorRiskAnalysis.map((vendor) => {
      const riskProbability = vendor.overallRisk / 100
      const expectedAnnualLoss =
        baseCosts.dataBreachCost * riskProbability * 0.1 + // 10% chance of breach
        baseCosts.downtimeCostPerHour * 24 * riskProbability * 0.2 + // 20% chance of downtime
        baseCosts.complianceFine * riskProbability * 0.05 + // 5% chance of fine
        baseCosts.reputationDamage * riskProbability * 0.1 // 10% chance of reputation damage

      return {
        vendor: vendor.vendorName,
        riskScore: vendor.overallRisk,
        expectedAnnualLoss: Math.round(expectedAnnualLoss),
        riskAdjustedROI: Math.round(expectedAnnualLoss / 10000), // Simplified ROI calculation
      }
    })
  }, [vendorRiskAnalysis])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security Risk Assessment & Threat Modeling</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of security threats and vendor risk mitigation capabilities
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Assessment
          </Button>
          <Button variant="outline" size="sm">
            <Calculator className="h-4 w-4 mr-2" />
            Risk Calculator
          </Button>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Risk Assessment Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Industry Profile</Label>
              <Select
                value={selectedIndustry}
                onValueChange={(value: keyof typeof INDUSTRY_PROFILES) => setSelectedIndustry(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(INDUSTRY_PROFILES).map(([key, profile]) => (
                    <SelectItem key={key} value={key}>
                      {profile.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Risk Tolerance Level: {riskTolerance[0]}%</Label>
              <Slider value={riskTolerance} onValueChange={setRiskTolerance} max={100} step={5} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label>Threat Category Weights</Label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(threatWeights).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize">{key}:</span>
                    <span className="font-medium">{value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Comparison</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation Strategies</TabsTrigger>
          <TabsTrigger value="cost">Risk Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Risk Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium">Critical Threats</p>
                    <p className="text-2xl font-bold">{threatLandscapeData.filter((t) => t.riskScore > 70).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Avg Risk Reduction</p>
                    <p className="text-2xl font-bold">
                      {vendorRiskAnalysis.length > 0
                        ? Math.round(
                            vendorRiskAnalysis.reduce((acc, v) => acc + ((85 - v.overallRisk) / 85) * 100, 0) /
                              vendorRiskAnalysis.length,
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Expected Annual Loss</p>
                    <p className="text-2xl font-bold">
                      $
                      {riskCostAnalysis.length > 0
                        ? Math.round(
                            riskCostAnalysis.reduce((acc, r) => acc + r.expectedAnnualLoss, 0) /
                              riskCostAnalysis.length /
                              1000,
                          )
                        : 0}
                      K
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Zero Trust Readiness</p>
                    <p className="text-2xl font-bold">
                      {vendorRiskAnalysis.length > 0
                        ? Math.round(
                            vendorRiskAnalysis.reduce((acc, v) => acc + v.zeroTrustScore, 0) /
                              vendorRiskAnalysis.length,
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Landscape Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Landscape by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={threatLandscapeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="riskScore" fill="#ef4444" name="Risk Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendor Risk Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={vendorRiskAnalysis.slice(0, 6)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendorName" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="overallRisk" fill="#0ea5e9" name="Overall Risk Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Industry-Specific Threats */}
          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific Threat Profile: {INDUSTRY_PROFILES[selectedIndustry].name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {INDUSTRY_PROFILES[selectedIndustry].specificThreats.map((threat, index) => (
                    <Alert key={index}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{threat}</AlertDescription>
                    </Alert>
                  ))}
                </div>
                <Separator />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(INDUSTRY_PROFILES[selectedIndustry].riskMultipliers).map(([category, multiplier]) => (
                    <div key={category} className="text-center">
                      <div className="text-2xl font-bold text-primary">{multiplier}x</div>
                      <div className="text-sm text-muted-foreground capitalize">{category} Risk</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          {/* Detailed Threat Analysis */}
          {Object.entries(THREAT_CATEGORIES).map(([categoryKey, category]) => (
            <Card key={categoryKey}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <category.icon className="h-5 w-5 mr-2" style={{ color: category.color }} />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.threats.map((threat) => {
                    const industryMultiplier =
                      INDUSTRY_PROFILES[selectedIndustry].riskMultipliers[
                        categoryKey as keyof (typeof INDUSTRY_PROFILES)[typeof selectedIndustry]["riskMultipliers"]
                      ] || 1
                    const adjustedLikelihood = threat.likelihood * industryMultiplier
                    const riskScore = adjustedLikelihood * threat.impact * 100

                    return (
                      <div key={threat.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{threat.name}</h4>
                          <Badge variant={riskScore > 70 ? "destructive" : riskScore > 40 ? "secondary" : "default"}>
                            Risk: {Math.round(riskScore)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{threat.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <Label className="text-xs">Likelihood</Label>
                            <Progress value={adjustedLikelihood * 100} className="h-2" />
                            <span className="text-xs text-muted-foreground">
                              {Math.round(adjustedLikelihood * 100)}%
                            </span>
                          </div>
                          <div>
                            <Label className="text-xs">Impact</Label>
                            <Progress value={threat.impact * 100} className="h-2" />
                            <span className="text-xs text-muted-foreground">{Math.round(threat.impact * 100)}%</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Key Mitigations</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {threat.mitigation.map((mitigation, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {mitigation}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          {/* Vendor Risk Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Vendor Security Capabilities Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart
                  data={[
                    {
                      capability: "External Threat Defense",
                      ...vendorRiskAnalysis.reduce(
                        (acc, vendor) => {
                          acc[vendor.vendorName] =
                            100 - (vendor.threatScores.find((t) => t.category === "external")?.score || 50)
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    },
                    {
                      capability: "Insider Threat Protection",
                      ...vendorRiskAnalysis.reduce(
                        (acc, vendor) => {
                          acc[vendor.vendorName] =
                            100 - (vendor.threatScores.find((t) => t.category === "insider")?.score || 50)
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    },
                    {
                      capability: "Infrastructure Security",
                      ...vendorRiskAnalysis.reduce(
                        (acc, vendor) => {
                          acc[vendor.vendorName] =
                            100 - (vendor.threatScores.find((t) => t.category === "infrastructure")?.score || 50)
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    },
                    {
                      capability: "Device Protection",
                      ...vendorRiskAnalysis.reduce(
                        (acc, vendor) => {
                          acc[vendor.vendorName] =
                            100 - (vendor.threatScores.find((t) => t.category === "device")?.score || 50)
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    },
                    {
                      capability: "Zero Trust Maturity",
                      ...vendorRiskAnalysis.reduce(
                        (acc, vendor) => {
                          acc[vendor.vendorName] = vendor.zeroTrustScore
                          return acc
                        },
                        {} as Record<string, number>,
                      ),
                    },
                  ]}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="capability" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  {vendorRiskAnalysis.slice(0, 5).map((vendor, index) => (
                    <Radar
                      key={vendor.vendorId}
                      name={vendor.vendorName}
                      dataKey={vendor.vendorName}
                      stroke={COLORS[index % COLORS.length]}
                      fill={COLORS[index % COLORS.length]}
                      fillOpacity={0.1}
                    />
                  ))}
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Vendor Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vendorRiskAnalysis.slice(0, 6).map((vendor) => (
              <Card key={vendor.vendorId}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {vendor.vendorName}
                    <Badge
                      variant={
                        vendor.overallRisk < 30 ? "default" : vendor.overallRisk < 60 ? "secondary" : "destructive"
                      }
                    >
                      Risk: {vendor.overallRisk}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm">Zero Trust Score</Label>
                      <Progress value={vendor.zeroTrustScore} className="h-2" />
                      <span className="text-xs text-muted-foreground">{vendor.zeroTrustScore}%</span>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Threat Category Scores</Label>
                      {vendor.threatScores.map((threat) => (
                        <div key={threat.category} className="flex items-center justify-between">
                          <span className="text-xs">{threat.name}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={100 - threat.score} className="h-1 w-16" />
                            <span className="text-xs w-8">{Math.round(100 - threat.score)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <Label className="text-sm">Security Features</Label>
                      <div className="grid grid-cols-2 gap-1 mt-1">
                        {Object.entries(vendor.securityFeatures).map(([feature, enabled]) => (
                          <div key={feature} className="flex items-center space-x-1">
                            <div className={`w-2 h-2 rounded-full ${enabled ? "bg-green-500" : "bg-gray-300"}`} />
                            <span className="text-xs capitalize">{feature.replace("_", " ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-6">
          {/* Risk Mitigation Effectiveness */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Mitigation Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mitigationEffectiveness}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="beforeNAC" fill="#ef4444" name="Before NAC" />
                  <Bar dataKey="afterNAC" fill="#10b981" name="After NAC" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Mitigation Strategies */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Mitigation Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      strategy: "Zero Trust Architecture Implementation",
                      priority: "High",
                      impact: "85%",
                      description: "Implement continuous verification and least-privilege access",
                    },
                    {
                      strategy: "Network Micro-Segmentation",
                      priority: "High",
                      impact: "78%",
                      description: "Isolate critical assets and limit lateral movement",
                    },
                    {
                      strategy: "Behavioral Analytics & AI",
                      priority: "Medium",
                      impact: "65%",
                      description: "Detect anomalous behavior and insider threats",
                    },
                    {
                      strategy: "Multi-Factor Authentication",
                      priority: "High",
                      impact: "72%",
                      description: "Strengthen authentication across all access points",
                    },
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{item.strategy}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant={item.priority === "High" ? "destructive" : "secondary"}>
                            {item.priority}
                          </Badge>
                          <Badge variant="outline">{item.impact} Impact</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Implementation Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      phase: "Phase 1: Foundation",
                      duration: "0-3 months",
                      items: ["Risk assessment", "Policy definition", "Architecture planning"],
                    },
                    {
                      phase: "Phase 2: Core Implementation",
                      duration: "3-6 months",
                      items: ["NAC deployment", "Identity integration", "Basic segmentation"],
                    },
                    {
                      phase: "Phase 3: Advanced Features",
                      duration: "6-9 months",
                      items: ["Behavioral analytics", "Automation", "Advanced policies"],
                    },
                    {
                      phase: "Phase 4: Optimization",
                      duration: "9-12 months",
                      items: ["Fine-tuning", "Monitoring", "Continuous improvement"],
                    },
                  ].map((phase, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{phase.phase}</h4>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {phase.items.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cost" className="space-y-6">
          {/* Risk Cost Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Expected Annual Loss by Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={riskCostAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Expected Annual Loss"]} />
                  <Area
                    type="monotone"
                    dataKey="expectedAnnualLoss"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Cost Components</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Data Breach", value: 4450000, color: "#ef4444" },
                        { name: "Downtime", value: 1200000, color: "#f97316" },
                        { name: "Compliance Fines", value: 2000000, color: "#8b5cf6" },
                        { name: "Reputation Damage", value: 1000000, color: "#06b6d4" },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {[
                        { name: "Data Breach", value: 4450000, color: "#ef4444" },
                        { name: "Downtime", value: 1200000, color: "#f97316" },
                        { name: "Compliance Fines", value: 2000000, color: "#8b5cf6" },
                        { name: "Reputation Damage", value: 1000000, color: "#06b6d4" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI from Risk Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskCostAnalysis.slice(0, 5).map((vendor) => (
                    <div key={vendor.vendor} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{vendor.vendor}</h4>
                        <Badge variant="outline">Risk Score: {vendor.riskScore}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Expected Annual Loss:</span>
                          <div className="font-medium">${vendor.expectedAnnualLoss.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Risk-Adjusted ROI:</span>
                          <div className="font-medium text-green-600">+{vendor.riskAdjustedROI}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Justification */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Justification</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  Based on the risk assessment, implementing a comprehensive NAC solution can reduce expected annual
                  losses by 60-85%, providing strong ROI justification for security investments. The average payback
                  period is 8-14 months when factoring in risk reduction benefits.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
