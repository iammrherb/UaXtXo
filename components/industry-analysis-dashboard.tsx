"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
  CreditCard,
  Factory,
  ShoppingCart,
  GraduationCap,
  Landmark,
  Zap,
  Target,
} from "lucide-react"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { INDUSTRIES, INDUSTRY_ROI, COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"

interface IndustryAnalysisProps {
  selectedIndustry: string
  deviceCount: number
  timeframe: 1 | 3 | 5
}

// Industry-specific icons
const INDUSTRY_ICONS = {
  HEALTHCARE: Stethoscope,
  FINANCIAL: CreditCard,
  MANUFACTURING: Factory,
  RETAIL: ShoppingCart,
  EDUCATION: GraduationCap,
  GOVERNMENT: Landmark,
}

// Industry-specific challenges and solutions
const INDUSTRY_CHALLENGES = {
  HEALTHCARE: {
    challenges: [
      {
        name: "Medical Device Security",
        severity: "CRITICAL" as const,
        description: "40% of medical devices run outdated OS versions",
        portnoxSolution: "Agentless profiling and automatic isolation of vulnerable devices",
      },
      {
        name: "HIPAA Compliance",
        severity: "CRITICAL" as const,
        description: "Average HIPAA fine: $1.9M",
        portnoxSolution: "Automated compliance reporting and continuous monitoring",
      },
      {
        name: "Clinical Workflow Disruption",
        severity: "HIGH" as const,
        description: "Every minute of downtime impacts patient care",
        portnoxSolution: "Zero-downtime cloud deployment, no inline infrastructure",
      },
      {
        name: "PHI Protection",
        severity: "CRITICAL" as const,
        description: "Healthcare breaches cost $10.93M on average",
        portnoxSolution: "Micro-segmentation and continuous risk assessment",
      },
    ],
    specificFeatures: [
      "FDA-approved medical device profiles",
      "HL7/FHIR integration support",
      "Epic/Cerner EMR compatibility",
      "Biomedical device isolation",
      "Clinical workflow optimization",
    ],
    vendors: {
      recommended: ["PORTNOX", "FORESCOUT"],
      acceptable: ["CISCO_ISE", "ARUBA_CLEARPASS"],
      avoid: ["MICROSOFT_NPS", "FOXPASS", "SECUREW2"],
    },
  },
  FINANCIAL: {
    challenges: [
      {
        name: "Trading Floor Latency",
        severity: "CRITICAL" as const,
        description: "Microseconds matter - $4M per millisecond delay",
        portnoxSolution: "Sub-5ms authentication with local caching",
      },
      {
        name: "PCI-DSS Requirements",
        severity: "CRITICAL" as const,
        description: "Non-compliance fines up to $500K/month",
        portnoxSolution: "Automated PCI compliance with network segmentation",
      },
      {
        name: "Insider Threats",
        severity: "HIGH" as const,
        description: "60% of breaches involve insiders",
        portnoxSolution: "Behavior analytics and continuous verification",
      },
      {
        name: "Multi-Regulation Compliance",
        severity: "HIGH" as const,
        description: "SOX, GLBA, Basel III, FINRA requirements",
        portnoxSolution: "Unified compliance dashboard for all frameworks",
      },
    ],
    specificFeatures: [
      "Ultra-low latency authentication",
      "Real-time transaction monitoring",
      "Privileged access management",
      "Segregation of duties enforcement",
      "Automated SOX reporting",
    ],
    vendors: {
      recommended: ["PORTNOX", "CISCO_ISE"],
      acceptable: ["ARUBA_CLEARPASS", "FORESCOUT"],
      avoid: ["PACKETFENCE", "FOXPASS", "MERAKI_ACCESS_CONTROL"],
    },
  },
  MANUFACTURING: {
    challenges: [
      {
        name: "OT/IT Convergence",
        severity: "CRITICAL" as const,
        description: "82% lack visibility into OT assets",
        portnoxSolution: "Unified visibility across IT and OT networks",
      },
      {
        name: "Legacy System Support",
        severity: "HIGH" as const,
        description: "Average industrial system: 19 years old",
        portnoxSolution: "Agentless approach works with any system",
      },
      {
        name: "Production Downtime",
        severity: "CRITICAL" as const,
        description: "Downtime costs $50K/minute",
        portnoxSolution: "Non-disruptive deployment, no inline devices",
      },
      {
        name: "Supply Chain Security",
        severity: "HIGH" as const,
        description: "73% experienced supplier breaches",
        portnoxSolution: "Vendor access control and segmentation",
      },
    ],
    specificFeatures: [
      "Industrial protocol support",
      "SCADA/HMI compatibility",
      "Purdue model alignment",
      "Air-gap bridging capabilities",
      "Predictive maintenance integration",
    ],
    vendors: {
      recommended: ["PORTNOX", "FORESCOUT"],
      acceptable: ["CISCO_ISE", "EXTREME_NAC"],
      avoid: ["FOXPASS", "SECUREW2", "MERAKI_ACCESS_CONTROL"],
    },
  },
  RETAIL: {
    challenges: [
      {
        name: "POS System Security",
        severity: "CRITICAL" as const,
        description: "Average retail breach: $3.28M",
        portnoxSolution: "POS isolation and continuous monitoring",
      },
      {
        name: "Multi-Site Management",
        severity: "HIGH" as const,
        description: "Managing 100s of locations",
        portnoxSolution: "Cloud-based central management",
      },
      {
        name: "Guest WiFi Security",
        severity: "MEDIUM" as const,
        description: "Customer experience vs security",
        portnoxSolution: "Automated guest isolation and captive portal",
      },
      {
        name: "Seasonal Scaling",
        severity: "HIGH" as const,
        description: "3-5x traffic during holidays",
        portnoxSolution: "Elastic cloud scaling, no hardware limits",
      },
    ],
    specificFeatures: [
      "PCI-DSS automation",
      "Guest WiFi management",
      "Multi-tenant architecture",
      "Inventory system protection",
      "Customer analytics integration",
    ],
    vendors: {
      recommended: ["PORTNOX", "ARUBA_CLEARPASS"],
      acceptable: ["MERAKI_ACCESS_CONTROL", "EXTREME_NAC"],
      avoid: ["MICROSOFT_NPS", "PACKETFENCE"],
    },
  },
  EDUCATION: {
    challenges: [
      {
        name: "BYOD Explosion",
        severity: "HIGH" as const,
        description: "Average 3.5 devices per student",
        portnoxSolution: "Self-service BYOD onboarding portal",
      },
      {
        name: "Limited IT Budget",
        severity: "CRITICAL" as const,
        description: "IT budget: 3% of total budget",
        portnoxSolution: "Low TCO, no hardware investment",
      },
      {
        name: "Student Privacy",
        severity: "HIGH" as const,
        description: "FERPA/COPPA compliance required",
        portnoxSolution: "Privacy-preserving authentication",
      },
      {
        name: "Chromebook Management",
        severity: "MEDIUM" as const,
        description: "50M+ Chromebooks in education",
        portnoxSolution: "Native Chromebook support",
      },
    ],
    specificFeatures: [
      "Student self-service portal",
      "Chromebook integration",
      "Google Workspace sync",
      "Classroom management tools",
      "E-rate funding eligible",
    ],
    vendors: {
      recommended: ["PORTNOX", "ARUBA_CLEARPASS"],
      acceptable: ["EXTREME_NAC", "FOXPASS"],
      avoid: ["CISCO_ISE", "FORESCOUT"],
    },
  },
  GOVERNMENT: {
    challenges: [
      {
        name: "Nation-State Threats",
        severity: "CRITICAL" as const,
        description: "89% report sophisticated attacks",
        portnoxSolution: "Zero Trust architecture with continuous verification",
      },
      {
        name: "Clearance-Based Access",
        severity: "CRITICAL" as const,
        description: "Multi-level security requirements",
        portnoxSolution: "Attribute-based access control",
      },
      {
        name: "Air-Gapped Networks",
        severity: "HIGH" as const,
        description: "Classified network isolation",
        portnoxSolution: "Flexible deployment models",
      },
      {
        name: "FedRAMP Compliance",
        severity: "CRITICAL" as const,
        description: "Mandatory for cloud services",
        portnoxSolution: "FedRAMP-ready architecture",
      },
    ],
    specificFeatures: [
      "FIPS 140-2 cryptography",
      "CAC/PIV authentication",
      "Classified network support",
      "STIG compliance",
      "Continuous diagnostics",
    ],
    vendors: {
      recommended: ["PORTNOX", "CISCO_ISE"],
      acceptable: ["ARUBA_CLEARPASS", "FORESCOUT"],
      avoid: ["FOXPASS", "SECUREW2", "IVANTI_NEURONS"],
    },
  },
}

export function IndustryAnalysisDashboard({ selectedIndustry, deviceCount, timeframe }: IndustryAnalysisProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const industryData = INDUSTRIES[selectedIndustry]
  const industryROI = INDUSTRY_ROI[selectedIndustry]
  const industryChallenges = INDUSTRY_CHALLENGES[selectedIndustry]
  const IndustryIcon = INDUSTRY_ICONS[selectedIndustry]

  // Calculate industry-specific metrics
  const industryMetrics = useMemo(() => {
    const avgBreachCost = industryData.avgBreachCost
    const breachProbability =
      industryData.riskProfile === "CRITICAL" ? 0.08 : industryData.riskProfile === "HIGH" ? 0.05 : 0.03
    const annualRiskExposure = avgBreachCost * breachProbability
    const portnoxRiskReduction = annualRiskExposure * 0.92 // 92% reduction

    return {
      avgBreachCost,
      breachProbability,
      annualRiskExposure,
      portnoxRiskReduction,
      complianceScore: 95, // Portnox compliance score
      competitorAvgScore: 75,
      deploymentComplexity: {
        portnox: "Simple",
        traditional: "Complex",
      },
    }
  }, [industryData])

  // Vendor suitability scores for the industry
  const vendorScores = useMemo(() => {
    const scores = Object.keys(COMPREHENSIVE_VENDOR_DATA).map((vendorKey) => {
      let score = 50 // Base score

      // Adjust based on industry recommendations
      if (industryChallenges.vendors.recommended.includes(vendorKey)) {
        score = 90 + Math.random() * 10
      } else if (industryChallenges.vendors.acceptable.includes(vendorKey)) {
        score = 70 + Math.random() * 20
      } else if (industryChallenges.vendors.avoid.includes(vendorKey)) {
        score = 20 + Math.random() * 30
      }

      return {
        vendor: COMPREHENSIVE_VENDOR_DATA[vendorKey].name,
        score: Math.round(score),
        category: score >= 90 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Fair" : "Poor",
      }
    })

    return scores.sort((a, b) => b.score - a.score)
  }, [industryChallenges])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    return `$${(value / 1000).toFixed(0)}K`
  }

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]

  return (
    <div className="space-y-6">
      {/* Industry Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <IndustryIcon className="w-8 h-8 text-blue-600" />
            {industryData.name} Industry NAC Analysis
          </CardTitle>
          <CardDescription>
            Tailored recommendations based on industry-specific requirements and challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Risk Profile</p>
              <Badge
                variant={industryData.riskProfile === "CRITICAL" ? "destructive" : "secondary"}
                className="text-lg px-3 py-1"
              >
                {industryData.riskProfile}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Avg Breach Cost</p>
              <p className="text-2xl font-bold">{formatCurrency(industryData.avgBreachCost)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Key Regulations</p>
              <p className="font-medium">{industryData.regulations.slice(0, 2).join(", ")}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Portnox Fit Score</p>
              <p className="text-2xl font-bold text-green-600">98%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Industry Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges & Solutions</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Requirements</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Comparison</TabsTrigger>
        </TabsList>

        {/* Industry Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Industry-Specific Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(industryData.specificRequirements).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      {value ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk & Financial Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Risk Mitigated", value: industryMetrics.portnoxRiskReduction },
                        {
                          name: "Residual Risk",
                          value: industryMetrics.annualRiskExposure - industryMetrics.portnoxRiskReduction,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <Tooltip formatter={(value: any) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center mt-4">
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(industryMetrics.portnoxRiskReduction)}
                  </p>
                  <p className="text-sm text-muted-foreground">Annual Risk Reduction</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Industry ROI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(industryROI.portnoxBenefits).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                    <p className="text-lg font-bold">{formatCurrency(value)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Annual Benefit</p>
                  <p className="text-2xl font-bold">{formatCurrency(industryROI.totalAnnualBenefit)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">3-Year ROI</p>
                  <p className="text-2xl font-bold text-green-600">{industryROI.threeYearROI}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Challenges & Solutions Tab */}
        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industryChallenges.challenges.map((challenge, index) => (
              <Card
                key={index}
                className={
                  challenge.severity === "CRITICAL"
                    ? "border-red-200"
                    : challenge.severity === "HIGH"
                      ? "border-orange-200"
                      : "border-yellow-200"
                }
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {challenge.name}
                    <Badge
                      variant={
                        challenge.severity === "CRITICAL"
                          ? "destructive"
                          : challenge.severity === "HIGH"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {challenge.severity}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Challenge:</p>
                    <p className="text-sm">{challenge.description}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-green-600">Portnox Solution:</p>
                    <p className="text-sm">{challenge.portnoxSolution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {industryChallenges.specificFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Requirements Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryData.regulations.map((regulation) => (
                  <div key={regulation} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{regulation}</h4>
                      <Badge variant="default" className="bg-green-600">
                        95%+ Coverage
                      </Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto mb-1" />
                        <p className="text-xs">Access Control</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto mb-1" />
                        <p className="text-xs">Audit Logging</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto mb-1" />
                        <p className="text-xs">Encryption</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto mb-1" />
                        <p className="text-xs">Monitoring</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Automated Reporting</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time Dashboards</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Policy Templates</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Trail Generation</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Violation Alerts</span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Readiness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-8 border-green-200 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold">95%</p>
                        <p className="text-xs text-muted-foreground">Ready</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-center mt-4 text-muted-foreground">
                  Portnox maintains continuous compliance readiness with automated evidence collection
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vendor Comparison Tab */}
        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Suitability Scores for {industryData.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={vendorScores.slice(0, 8)} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="vendor" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="score">
                    {vendorScores.slice(0, 8).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.score >= 90
                            ? "#10b981"
                            : entry.score >= 70
                              ? "#3b82f6"
                              : entry.score >= 50
                                ? "#f59e0b"
                                : "#ef4444"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Recommended Vendors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {industryChallenges.vendors.recommended.map((vendorKey) => (
                    <div key={vendorKey} className="p-2 bg-green-50 rounded">
                      <p className="font-medium">{COMPREHENSIVE_VENDOR_DATA[vendorKey]?.name}</p>
                      <p className="text-xs text-muted-foreground">Excellent fit for {industryData.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Acceptable Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {industryChallenges.vendors.acceptable.map((vendorKey) => (
                    <div key={vendorKey} className="p-2 bg-blue-50 rounded">
                      <p className="font-medium">{COMPREHENSIVE_VENDOR_DATA[vendorKey]?.name}</p>
                      <p className="text-xs text-muted-foreground">Good fit with some limitations</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Not Recommended
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {industryChallenges.vendors.avoid.map((vendorKey) => (
                    <div key={vendorKey} className="p-2 bg-red-50 rounded">
                      <p className="font-medium">{COMPREHENSIVE_VENDOR_DATA[vendorKey]?.name}</p>
                      <p className="text-xs text-muted-foreground">Missing critical requirements</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className="bg-green-50 border-green-200">
            <Zap className="h-4 w-4" />
            <AlertDescription>
              <strong>Industry Insight:</strong> Portnox CLEAR is specifically optimized for {industryData.name} with
              features like {industryChallenges.specificFeatures[0].toLowerCase()}
              and {industryChallenges.specificFeatures[1].toLowerCase()}, delivering immediate value while addressing
              all compliance requirements.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
