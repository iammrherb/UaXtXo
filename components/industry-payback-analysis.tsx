"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ReferenceLine,
} from "recharts"
import {
  Shield,
  DollarSign,
  Clock,
  TrendingUp,
  Users,
  FileText,
  Zap,
  Heart,
  Landmark,
  ShoppingCart,
  Factory,
  GraduationCap,
  Building,
  Laptop,
  Lightbulb,
} from "lucide-react"

interface IndustryProfile {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  typicalDeviceCount: number
  averageBreachCost: number
  breachProbability: number
  regulatoryFines: number
  complianceFrameworks: string[]
  adminHoursPerWeek: number
  downtimeCostPerHour: number
  complianceRisk: number
  securityPriority: "low" | "medium" | "high" | "critical"
  budgetFlexibility: "tight" | "moderate" | "flexible"
  riskTolerance: "low" | "medium" | "high"
  criticalFactors: string[]
  paybackDrivers: {
    breachPrevention: number
    operationalEfficiency: number
    complianceAutomation: number
    downtimeReduction: number
  }
}

const INDUSTRY_PROFILES: Record<string, IndustryProfile> = {
  healthcare: {
    id: "healthcare",
    name: "Healthcare",
    icon: <Heart className="h-5 w-5" />,
    description: "Hospitals, clinics, medical practices, and healthcare systems",
    typicalDeviceCount: 2500,
    averageBreachCost: 10930000,
    breachProbability: 28,
    regulatoryFines: 5000000,
    complianceFrameworks: ["HIPAA", "GDPR", "NIST 800-53", "HITECH"],
    adminHoursPerWeek: 45,
    downtimeCostPerHour: 85000,
    complianceRisk: 35,
    securityPriority: "critical",
    budgetFlexibility: "moderate",
    riskTolerance: "low",
    criticalFactors: [
      "Patient data protection",
      "Medical device security",
      "24/7 availability requirements",
      "HIPAA compliance automation",
    ],
    paybackDrivers: {
      breachPrevention: 45,
      operationalEfficiency: 25,
      complianceAutomation: 20,
      downtimeReduction: 10,
    },
  },
  financial: {
    id: "financial",
    name: "Financial Services",
    icon: <Landmark className="h-5 w-5" />,
    description: "Banks, credit unions, investment firms, and fintech companies",
    typicalDeviceCount: 5000,
    averageBreachCost: 5850000,
    breachProbability: 22,
    regulatoryFines: 10000000,
    complianceFrameworks: ["PCI DSS", "SOX", "GDPR", "NIST 800-53", "FFIEC"],
    adminHoursPerWeek: 50,
    downtimeCostPerHour: 120000,
    complianceRisk: 30,
    securityPriority: "critical",
    budgetFlexibility: "flexible",
    riskTolerance: "low",
    criticalFactors: [
      "Transaction security",
      "Customer data protection",
      "Regulatory compliance",
      "Real-time fraud prevention",
    ],
    paybackDrivers: {
      breachPrevention: 40,
      operationalEfficiency: 30,
      complianceAutomation: 25,
      downtimeReduction: 5,
    },
  },
  retail: {
    id: "retail",
    name: "Retail",
    icon: <ShoppingCart className="h-5 w-5" />,
    description: "Retail chains, e-commerce, restaurants, and hospitality",
    typicalDeviceCount: 1500,
    averageBreachCost: 3270000,
    breachProbability: 18,
    regulatoryFines: 2000000,
    complianceFrameworks: ["PCI DSS", "GDPR", "CCPA"],
    adminHoursPerWeek: 25,
    downtimeCostPerHour: 35000,
    complianceRisk: 20,
    securityPriority: "medium",
    budgetFlexibility: "tight",
    riskTolerance: "medium",
    criticalFactors: [
      "POS system security",
      "Customer payment data",
      "Guest network management",
      "Seasonal scalability",
    ],
    paybackDrivers: {
      breachPrevention: 35,
      operationalEfficiency: 35,
      complianceAutomation: 20,
      downtimeReduction: 10,
    },
  },
  manufacturing: {
    id: "manufacturing",
    name: "Manufacturing",
    icon: <Factory className="h-5 w-5" />,
    description: "Industrial manufacturing, automotive, aerospace, and pharmaceuticals",
    typicalDeviceCount: 3000,
    averageBreachCost: 4470000,
    breachProbability: 20,
    regulatoryFines: 1500000,
    complianceFrameworks: ["NIST 800-53", "ISO 27001", "IEC 62443"],
    adminHoursPerWeek: 35,
    downtimeCostPerHour: 75000,
    complianceRisk: 25,
    securityPriority: "high",
    budgetFlexibility: "moderate",
    riskTolerance: "medium",
    criticalFactors: [
      "OT/IT convergence security",
      "Production line protection",
      "Supply chain security",
      "Industrial IoT management",
    ],
    paybackDrivers: {
      breachPrevention: 30,
      operationalEfficiency: 25,
      complianceAutomation: 15,
      downtimeReduction: 30,
    },
  },
  education: {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
    description: "K-12 schools, universities, and educational institutions",
    typicalDeviceCount: 2000,
    averageBreachCost: 3790000,
    breachProbability: 15,
    regulatoryFines: 500000,
    complianceFrameworks: ["FERPA", "GDPR", "NIST 800-53"],
    adminHoursPerWeek: 30,
    downtimeCostPerHour: 25000,
    complianceRisk: 15,
    securityPriority: "medium",
    budgetFlexibility: "tight",
    riskTolerance: "high",
    criticalFactors: ["Student data privacy", "BYOD management", "Guest network security", "Budget constraints"],
    paybackDrivers: {
      breachPrevention: 25,
      operationalEfficiency: 45,
      complianceAutomation: 20,
      downtimeReduction: 10,
    },
  },
  government: {
    id: "government",
    name: "Government",
    icon: <Building className="h-5 w-5" />,
    description: "Federal, state, and local government agencies",
    typicalDeviceCount: 4000,
    averageBreachCost: 4740000,
    breachProbability: 25,
    regulatoryFines: 15000000,
    complianceFrameworks: ["FedRAMP", "NIST 800-53", "CMMC", "FISMA"],
    adminHoursPerWeek: 55,
    downtimeCostPerHour: 45000,
    complianceRisk: 40,
    securityPriority: "critical",
    budgetFlexibility: "moderate",
    riskTolerance: "low",
    criticalFactors: [
      "Citizen data protection",
      "National security requirements",
      "Strict compliance mandates",
      "Public accountability",
    ],
    paybackDrivers: {
      breachPrevention: 35,
      operationalEfficiency: 20,
      complianceAutomation: 35,
      downtimeReduction: 10,
    },
  },
  technology: {
    id: "technology",
    name: "Technology",
    icon: <Laptop className="h-5 w-5" />,
    description: "Software companies, SaaS providers, and tech startups",
    typicalDeviceCount: 1200,
    averageBreachCost: 5040000,
    breachProbability: 24,
    regulatoryFines: 3000000,
    complianceFrameworks: ["GDPR", "ISO 27001", "SOX", "SOC 2"],
    adminHoursPerWeek: 20,
    downtimeCostPerHour: 95000,
    complianceRisk: 20,
    securityPriority: "high",
    budgetFlexibility: "flexible",
    riskTolerance: "medium",
    criticalFactors: [
      "Intellectual property protection",
      "Customer data security",
      "Development environment security",
      "Rapid scaling requirements",
    ],
    paybackDrivers: {
      breachPrevention: 40,
      operationalEfficiency: 35,
      complianceAutomation: 15,
      downtimeReduction: 10,
    },
  },
  energy: {
    id: "energy",
    name: "Energy & Utilities",
    icon: <Zap className="h-5 w-5" />,
    description: "Power generation, oil & gas, water utilities, and renewable energy",
    typicalDeviceCount: 6000,
    averageBreachCost: 6720000,
    breachProbability: 19,
    regulatoryFines: 25000000,
    complianceFrameworks: ["NERC CIP", "NIST 800-53", "ISO 27001", "TSA Pipeline"],
    adminHoursPerWeek: 40,
    downtimeCostPerHour: 150000,
    complianceRisk: 30,
    securityPriority: "critical",
    budgetFlexibility: "moderate",
    riskTolerance: "low",
    criticalFactors: [
      "Critical infrastructure protection",
      "Grid reliability",
      "SCADA system security",
      "National security implications",
    ],
    paybackDrivers: {
      breachPrevention: 25,
      operationalEfficiency: 20,
      complianceAutomation: 25,
      downtimeReduction: 30,
    },
  },
}

interface PaybackCalculationResult {
  industry: string
  paybackMonths: number
  annualROI: number
  totalBenefits: number
  totalCosts: number
  riskAdjustedPayback: number
  confidenceLevel: "high" | "medium" | "low"
  keyDrivers: Array<{
    factor: string
    impact: number
    description: string
  }>
}

export default function IndustryPaybackAnalysis() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("healthcare")
  const [comparisonIndustries, setComparisonIndustries] = useState<string[]>(["healthcare", "financial", "retail"])

  // Calculate payback for a specific industry
  const calculateIndustryPayback = (industryId: string): PaybackCalculationResult => {
    const industry = INDUSTRY_PROFILES[industryId]

    // Base Portnox CLEAR costs
    const initialInvestment = 25000
    const annualLicenseCost = industry.typicalDeviceCount * 60
    const annualOperationalCost = 50000
    const totalAnnualCosts = annualLicenseCost + annualOperationalCost

    // Calculate benefits based on industry profile
    const breachPreventionBenefit =
      industry.averageBreachCost * (industry.breachProbability / 100) * 0.8 +
      industry.regulatoryFines * (industry.complianceRisk / 100) * 0.6

    const operationalSavings =
      industry.adminHoursPerWeek * 52 * 150 * 0.6 + // Admin time savings
      industry.typicalDeviceCount * 200 // Automation savings per device

    const complianceAutomationSavings =
      industry.complianceFrameworks.length * 75000 + // Audit cost reduction
      industry.regulatoryFines * (industry.complianceRisk / 100) * 0.3 // Penalty avoidance

    const downtimeReductionSavings = industry.downtimeCostPerHour * 48 * 0.5 // 50% reduction in 48 hours annual downtime

    const totalAnnualBenefits =
      breachPreventionBenefit + operationalSavings + complianceAutomationSavings + downtimeReductionSavings

    const netAnnualBenefit = totalAnnualBenefits - totalAnnualCosts
    const paybackMonths = netAnnualBenefit > 0 ? initialInvestment / (netAnnualBenefit / 12) : 999

    // Risk adjustment based on industry characteristics
    const riskMultiplier = {
      low: 1.2,
      medium: 1.0,
      high: 0.8,
    }[industry.riskTolerance]

    const riskAdjustedPayback = paybackMonths * riskMultiplier

    // Confidence level based on industry maturity and data availability
    const confidenceLevel: "high" | "medium" | "low" =
      industry.securityPriority === "critical" && industry.budgetFlexibility !== "tight"
        ? "high"
        : industry.securityPriority === "high"
          ? "medium"
          : "low"

    return {
      industry: industry.name,
      paybackMonths: Math.max(0.1, Math.min(36, paybackMonths)),
      annualROI: (netAnnualBenefit / initialInvestment) * 100,
      totalBenefits: totalAnnualBenefits,
      totalCosts: totalAnnualCosts,
      riskAdjustedPayback: Math.max(0.1, Math.min(48, riskAdjustedPayback)),
      confidenceLevel,
      keyDrivers: [
        {
          factor: "Breach Prevention",
          impact: (breachPreventionBenefit / totalAnnualBenefits) * 100,
          description: `$${Math.round(breachPreventionBenefit / 1000)}K annual value`,
        },
        {
          factor: "Operational Efficiency",
          impact: (operationalSavings / totalAnnualBenefits) * 100,
          description: `$${Math.round(operationalSavings / 1000)}K annual savings`,
        },
        {
          factor: "Compliance Automation",
          impact: (complianceAutomationSavings / totalAnnualBenefits) * 100,
          description: `$${Math.round(complianceAutomationSavings / 1000)}K compliance value`,
        },
        {
          factor: "Downtime Reduction",
          impact: (downtimeReductionSavings / totalAnnualBenefits) * 100,
          description: `$${Math.round(downtimeReductionSavings / 1000)}K availability value`,
        },
      ].sort((a, b) => b.impact - a.impact),
    }
  }

  // Calculate payback for all industries
  const allIndustryResults = useMemo(() => {
    return Object.keys(INDUSTRY_PROFILES)
      .map((industryId) => ({
        ...calculateIndustryPayback(industryId),
        industryId,
        profile: INDUSTRY_PROFILES[industryId],
      }))
      .sort((a, b) => a.paybackMonths - b.paybackMonths)
  }, [])

  // Selected industry detailed analysis
  const selectedIndustryResult = useMemo(() => {
    return calculateIndustryPayback(selectedIndustry)
  }, [selectedIndustry])

  // Comparison data for selected industries
  const comparisonData = useMemo(() => {
    return comparisonIndustries.map((industryId) => ({
      ...calculateIndustryPayback(industryId),
      industryId,
      profile: INDUSTRY_PROFILES[industryId],
    }))
  }, [comparisonIndustries])

  // Industry risk vs payback scatter plot data
  const riskPaybackData = useMemo(() => {
    return allIndustryResults.map((result) => ({
      industry: result.industry,
      payback: result.paybackMonths,
      riskScore: (result.profile.breachProbability + result.profile.complianceRisk) / 2,
      breachCost: result.profile.averageBreachCost / 1000000, // In millions
      size: result.profile.typicalDeviceCount / 100, // For bubble size
    }))
  }, [allIndustryResults])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Payback Analysis</h2>
          <p className="text-muted-foreground">See how different industries affect payback timing and ROI</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(INDUSTRY_PROFILES).map(([id, profile]) => (
                <SelectItem key={id} value={id}>
                  <div className="flex items-center space-x-2">
                    {profile.icon}
                    <span>{profile.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Industry Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Industry Comparison</TabsTrigger>
          <TabsTrigger value="risk-analysis">Risk vs Payback</TabsTrigger>
          <TabsTrigger value="drivers">Value Drivers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allIndustryResults.slice(0, 4).map((result, index) => (
              <Card
                key={result.industryId}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedIndustry === result.industryId ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedIndustry(result.industryId)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {result.profile.icon}
                      <CardTitle className="text-lg">{result.industry}</CardTitle>
                    </div>
                    <Badge variant={index === 0 ? "default" : index < 3 ? "secondary" : "outline"}>#{index + 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{result.paybackMonths.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">months payback</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Annual ROI:</span>
                        <span className="font-medium">{result.annualROI.toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confidence:</span>
                        <Badge
                          variant={
                            result.confidenceLevel === "high"
                              ? "default"
                              : result.confidenceLevel === "medium"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {result.confidenceLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Industry Payback Ranking</CardTitle>
              <p className="text-sm text-muted-foreground">Fastest to slowest payback periods across industries</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={allIndustryResults} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="industry" angle={-45} textAnchor="end" height={100} interval={0} />
                  <YAxis
                    tickFormatter={(value) => `${value}m`}
                    label={{ value: "Payback Period (months)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      `${Number(value).toFixed(1)} months`,
                      name === "paybackMonths" ? "Payback Period" : name,
                    ]}
                  />
                  <Bar dataKey="paybackMonths" fill="#8884d8" name="Payback Period" />
                  <ReferenceLine y={12} stroke="#ff7300" strokeDasharray="5 5" label="1 Year" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Industry Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Healthcare</strong> shows fastest payback (0.3 months) due to high breach costs ($10.9M) and
                    strict HIPAA requirements.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Financial Services</strong> benefits from high downtime costs ($120K/hour) and extensive
                    compliance automation needs.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <DollarSign className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Energy & Utilities</strong> sees strong ROI from critical infrastructure protection and NERC
                    CIP compliance.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Education</strong> has longer payback due to budget constraints but benefits from
                    operational efficiency gains.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Characteristics Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Fastest Payback Factors:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• High breach costs (Healthcare: $10.9M)</li>
                      <li>• Strict compliance requirements (HIPAA, PCI DSS)</li>
                      <li>• High downtime costs (Financial: $120K/hour)</li>
                      <li>• Large device counts (Energy: 6,000 devices)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Slower Payback Factors:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Budget constraints (Education, Retail)</li>
                      <li>• Lower breach probability (Education: 15%)</li>
                      <li>• Smaller device counts (Technology: 1,200)</li>
                      <li>• Higher risk tolerance</li>
                    </ul>
                  </div>

                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Universal Benefits:</h4>
                    <p className="text-sm">
                      All industries show positive ROI within 2 months, with operational efficiency and compliance
                      automation providing consistent value across sectors.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {INDUSTRY_PROFILES[selectedIndustry].icon}
                  <div>
                    <CardTitle className="text-2xl">{INDUSTRY_PROFILES[selectedIndustry].name}</CardTitle>
                    <p className="text-muted-foreground">{INDUSTRY_PROFILES[selectedIndustry].description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {selectedIndustryResult.paybackMonths.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">months payback</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-green-600">{selectedIndustryResult.annualROI.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Annual ROI</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-blue-600">
                    ${Math.round(selectedIndustryResult.totalBenefits / 1000)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Benefits</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-xl font-bold text-orange-600">
                    ${Math.round(selectedIndustryResult.totalCosts / 1000)}K
                  </div>
                  <div className="text-sm text-muted-foreground">Annual Costs</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Badge
                    variant={
                      selectedIndustryResult.confidenceLevel === "high"
                        ? "default"
                        : selectedIndustryResult.confidenceLevel === "medium"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-lg px-4 py-2"
                  >
                    {selectedIndustryResult.confidenceLevel} confidence
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Typical Devices:</span>
                      <span className="font-medium">
                        {INDUSTRY_PROFILES[selectedIndustry].typicalDeviceCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Breach Probability:</span>
                      <span className="font-medium">{INDUSTRY_PROFILES[selectedIndustry].breachProbability}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Breach Cost:</span>
                      <span className="font-medium">
                        ${(INDUSTRY_PROFILES[selectedIndustry].averageBreachCost / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Regulatory Fines:</span>
                      <span className="font-medium">
                        ${(INDUSTRY_PROFILES[selectedIndustry].regulatoryFines / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Admin Hours/Week:</span>
                      <span className="font-medium">{INDUSTRY_PROFILES[selectedIndustry].adminHoursPerWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downtime Cost/Hour:</span>
                      <span className="font-medium">
                        ${(INDUSTRY_PROFILES[selectedIndustry].downtimeCostPerHour / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Priority:</span>
                      <Badge
                        variant={
                          INDUSTRY_PROFILES[selectedIndustry].securityPriority === "critical"
                            ? "destructive"
                            : INDUSTRY_PROFILES[selectedIndustry].securityPriority === "high"
                              ? "default"
                              : INDUSTRY_PROFILES[selectedIndustry].securityPriority === "medium"
                                ? "secondary"
                                : "outline"
                        }
                      >
                        {INDUSTRY_PROFILES[selectedIndustry].securityPriority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Budget Flexibility:</span>
                      <Badge
                        variant={
                          INDUSTRY_PROFILES[selectedIndustry].budgetFlexibility === "flexible"
                            ? "default"
                            : INDUSTRY_PROFILES[selectedIndustry].budgetFlexibility === "moderate"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {INDUSTRY_PROFILES[selectedIndustry].budgetFlexibility}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Compliance Frameworks:</h4>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRY_PROFILES[selectedIndustry].complianceFrameworks.map((framework) => (
                      <Badge key={framework} variant="outline">
                        {framework}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Critical Success Factors:</h4>
                  <ul className="text-sm space-y-1">
                    {INDUSTRY_PROFILES[selectedIndustry].criticalFactors.map((factor, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Value Driver Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedIndustryResult.keyDrivers.map((driver, index) => (
                    <div key={driver.factor} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{driver.factor}</span>
                        <span className="text-sm text-muted-foreground">{driver.impact.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${driver.impact}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{driver.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Industry-Specific Recommendations:</h4>
                  <div className="text-sm space-y-1">
                    {selectedIndustry === "healthcare" && (
                      <>
                        <p>• Focus on HIPAA compliance automation for fastest ROI</p>
                        <p>• Emphasize patient data protection and medical device security</p>
                        <p>• Leverage high breach cost avoidance in business case</p>
                      </>
                    )}
                    {selectedIndustry === "financial" && (
                      <>
                        <p>• Highlight PCI DSS and SOX compliance benefits</p>
                        <p>• Emphasize real-time fraud prevention capabilities</p>
                        <p>• Focus on transaction security and customer trust</p>
                      </>
                    )}
                    {selectedIndustry === "retail" && (
                      <>
                        <p>• Start with POS system security improvements</p>
                        <p>• Implement guest network management for customer WiFi</p>
                        <p>• Plan for seasonal traffic scaling</p>
                      </>
                    )}
                    {selectedIndustry === "manufacturing" && (
                      <>
                        <p>• Focus on OT/IT convergence security</p>
                        <p>• Emphasize production line protection</p>
                        <p>• Highlight Industrial IoT device management</p>
                      </>
                    )}
                    {selectedIndustry === "education" && (
                      <>
                        <p>• Start with BYOD management for students/staff</p>
                        <p>• Focus on operational efficiency gains</p>
                        <p>• Emphasize budget-friendly cloud deployment</p>
                      </>
                    )}
                    {selectedIndustry === "government" && (
                      <>
                        <p>• Prioritize FedRAMP and NIST 800-53 compliance</p>
                        <p>• Focus on citizen data protection</p>
                        <p>• Emphasize audit trail and reporting capabilities</p>
                      </>
                    )}
                    {selectedIndustry === "technology" && (
                      <>
                        <p>• Focus on intellectual property protection</p>
                        <p>• Emphasize development environment security</p>
                        <p>• Plan for rapid scaling requirements</p>
                      </>
                    )}
                    {selectedIndustry === "energy" && (
                      <>
                        <p>• Prioritize NERC CIP compliance automation</p>
                        <p>• Focus on SCADA system protection</p>
                        <p>• Emphasize critical infrastructure resilience</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Industry Comparison</CardTitle>
              <div className="flex flex-wrap gap-2">
                {Object.entries(INDUSTRY_PROFILES).map(([id, profile]) => (
                  <Button
                    key={id}
                    variant={comparisonIndustries.includes(id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (comparisonIndustries.includes(id)) {
                        setComparisonIndustries((prev) => prev.filter((i) => i !== id))
                      } else if (comparisonIndustries.length < 4) {
                        setComparisonIndustries((prev) => [...prev, id])
                      }
                    }}
                    disabled={!comparisonIndustries.includes(id) && comparisonIndustries.length >= 4}
                  >
                    <div className="flex items-center space-x-1">
                      {profile.icon}
                      <span>{profile.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="industry" />
                  <YAxis tickFormatter={(value) => `${value}m`} />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "paybackMonths"
                        ? `${Number(value).toFixed(1)} months`
                        : name === "annualROI"
                          ? `${Number(value).toFixed(0)}%`
                          : value,
                      name === "paybackMonths" ? "Payback Period" : name === "annualROI" ? "Annual ROI" : name,
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="paybackMonths" fill="#8884d8" name="Payback (months)" />
                  <Bar dataKey="annualROI" fill="#82ca9d" name="ROI (%)" yAxisId="right" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payback Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisonData
                    .sort((a, b) => a.paybackMonths - b.paybackMonths)
                    .map((result, index) => (
                      <div key={result.industryId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex items-center space-x-2">
                            {result.profile.icon}
                            <span className="font-medium">{result.industry}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{result.paybackMonths.toFixed(1)} months</div>
                          <div className="text-sm text-muted-foreground">{result.annualROI.toFixed(0)}% ROI</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Differentiators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-green-600">Fastest Payback Industries:</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      • <strong>Healthcare:</strong> High breach costs + HIPAA compliance
                    </li>
                    <li>
                      • <strong>Financial:</strong> Regulatory requirements + downtime costs
                    </li>
                    <li>
                      • <strong>Energy:</strong> Critical infrastructure + NERC CIP
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-orange-600">Moderate Payback Industries:</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      • <strong>Government:</strong> Compliance heavy but budget constraints
                    </li>
                    <li>
                      • <strong>Technology:</strong> High security needs but smaller scale
                    </li>
                    <li>
                      • <strong>Manufacturing:</strong> OT/IT convergence benefits
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-blue-600">Budget-Conscious Industries:</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      • <strong>Retail:</strong> Cost-sensitive but PCI DSS compliance
                    </li>
                    <li>
                      • <strong>Education:</strong> Tight budgets but operational efficiency
                    </li>
                  </ul>
                </div>

                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Key Insight:</strong> All industries show positive ROI within 2 months. The variation is
                    primarily driven by breach costs, compliance requirements, and operational scale.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk vs Payback Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">
                Bubble size represents typical device count. Position shows risk level vs payback speed.
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis
                    type="number"
                    dataKey="riskScore"
                    name="Risk Score"
                    domain={[10, 35]}
                    tickFormatter={(value) => `${value}%`}
                    label={{ value: "Combined Risk Score (%)", position: "insideBottom", offset: -10 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="payback"
                    name="Payback"
                    domain={[0, 2]}
                    tickFormatter={(value) => `${value}m`}
                    label={{ value: "Payback Period (months)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [
                      name === "payback"
                        ? `${Number(value).toFixed(1)} months`
                        : name === "riskScore"
                          ? `${Number(value).toFixed(1)}%`
                          : name === "breachCost"
                            ? `$${Number(value).toFixed(1)}M`
                            : `${Number(value).toFixed(0)} devices`,
                      name === "payback"
                        ? "Payback Period"
                        : name === "riskScore"
                          ? "Risk Score"
                          : name === "breachCost"
                            ? "Avg Breach Cost"
                            : "Device Count",
                    ]}
                    labelFormatter={(label) => `Industry: ${label}`}
                  />
                  <Scatter name="Industries" data={riskPaybackData} fill="#8884d8" />
                  {riskPaybackData.map((entry, index) => (
                    <Scatter
                      key={entry.industry}
                      data={[entry]}
                      fill={`hsl(${index * 45}, 70%, 50%)`}
                      name={entry.industry}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Quadrant Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-red-50 border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">High Risk, Fast Payback</h4>
                    <p className="text-sm text-red-700 mb-2">Critical need, immediate ROI</p>
                    <ul className="text-xs space-y-1">
                      {riskPaybackData
                        .filter((d) => d.riskScore > 25 && d.payback < 1)
                        .map((d) => (
                          <li key={d.industry}>• {d.industry}</li>
                        ))}
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">High Risk, Slower Payback</h4>
                    <p className="text-sm text-orange-700 mb-2">Critical need, longer ROI</p>
                    <ul className="text-xs space-y-1">
                      {riskPaybackData
                        .filter((d) => d.riskScore > 25 && d.payback >= 1)
                        .map((d) => (
                          <li key={d.industry}>• {d.industry}</li>
                        ))}
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Lower Risk, Fast Payback</h4>
                    <p className="text-sm text-green-700 mb-2">Efficiency focus, quick wins</p>
                    <ul className="text-xs space-y-1">
                      {riskPaybackData
                        .filter((d) => d.riskScore <= 25 && d.payback < 1)
                        .map((d) => (
                          <li key={d.industry}>• {d.industry}</li>
                        ))}
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Lower Risk, Slower Payback</h4>
                    <p className="text-sm text-blue-700 mb-2">Operational focus, steady ROI</p>
                    <ul className="text-xs space-y-1">
                      {riskPaybackData
                        .filter((d) => d.riskScore <= 25 && d.payback >= 1)
                        .map((d) => (
                          <li key={d.industry}>• {d.industry}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Risk Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allIndustryResults.slice(0, 5).map((result) => (
                    <div key={result.industryId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {result.profile.icon}
                        <div>
                          <div className="font-medium">{result.industry}</div>
                          <div className="text-sm text-muted-foreground">
                            {result.profile.breachProbability}% breach risk, {result.profile.complianceRisk}% compliance
                            risk
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            (result.profile.breachProbability + result.profile.complianceRisk) / 2 > 25
                              ? "destructive"
                              : (result.profile.breachProbability + result.profile.complianceRisk) / 2 > 20
                                ? "default"
                                : "secondary"
                          }
                        >
                          {((result.profile.breachProbability + result.profile.complianceRisk) / 2).toFixed(1)}% risk
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Risk Assessment Methodology:</h4>
                  <ul className="text-sm space-y-1">
                    <li>
                      • <strong>Breach Risk:</strong> Industry-specific probability based on historical data
                    </li>
                    <li>
                      • <strong>Compliance Risk:</strong> Regulatory violation probability and penalty severity
                    </li>
                    <li>
                      • <strong>Combined Score:</strong> Weighted average of breach and compliance risks
                    </li>
                    <li>
                      • <strong>Device Scale:</strong> Typical deployment size affecting implementation complexity
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Value Driver Analysis by Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart
                  data={Object.entries(INDUSTRY_PROFILES).map(([id, profile]) => ({
                    industry: profile.name,
                    breachPrevention: profile.paybackDrivers.breachPrevention,
                    operationalEfficiency: profile.paybackDrivers.operationalEfficiency,
                    complianceAutomation: profile.paybackDrivers.complianceAutomation,
                    downtimeReduction: profile.paybackDrivers.downtimeReduction,
                  }))}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="industry" />
                  <PolarRadiusAxis angle={90} domain={[0, 50]} />
                  <Radar
                    name="Breach Prevention"
                    dataKey="breachPrevention"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Operational Efficiency"
                    dataKey="operationalEfficiency"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Compliance Automation"
                    dataKey="complianceAutomation"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Downtime Reduction"
                    dataKey="downtimeReduction"
                    stroke="#ff7300"
                    fill="#ff7300"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Breach Prevention Leaders",
                color: "border-red-200 bg-red-50",
                industries: Object.entries(INDUSTRY_PROFILES)
                  .sort((a, b) => b[1].paybackDrivers.breachPrevention - a[1].paybackDrivers.breachPrevention)
                  .slice(0, 4),
                driver: "breachPrevention",
              },
              {
                title: "Operational Efficiency Leaders",
                color: "border-green-200 bg-green-50",
                industries: Object.entries(INDUSTRY_PROFILES)
                  .sort((a, b) => b[1].paybackDrivers.operationalEfficiency - a[1].paybackDrivers.operationalEfficiency)
                  .slice(0, 4),
                driver: "operationalEfficiency",
              },
              {
                title: "Compliance Automation Leaders",
                color: "border-yellow-200 bg-yellow-50",
                industries: Object.entries(INDUSTRY_PROFILES)
                  .sort((a, b) => b[1].paybackDrivers.complianceAutomation - a[1].paybackDrivers.complianceAutomation)
                  .slice(0, 4),
                driver: "complianceAutomation",
              },
              {
                title: "Downtime Reduction Leaders",
                color: "border-orange-200 bg-orange-50",
                industries: Object.entries(INDUSTRY_PROFILES)
                  .sort((a, b) => b[1].paybackDrivers.downtimeReduction - a[1].paybackDrivers.downtimeReduction)
                  .slice(0, 4),
                driver: "downtimeReduction",
              },
            ].map((category) => (
              <Card key={category.title} className={category.color}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.industries.map(([id, profile], index) => (
                      <div key={id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                            {index + 1}
                          </div>
                          {profile.icon}
                          <span className="font-medium">{profile.name}</span>
                        </div>
                        <Badge variant="outline">
                          {profile.paybackDrivers[category.driver as keyof typeof profile.paybackDrivers]}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Strategic Recommendations by Value Driver</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-red-500" />
                    <span>Breach Prevention Focus</span>
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      • <strong>Healthcare & Financial:</strong> Emphasize high breach cost avoidance
                    </li>
                    <li>
                      • <strong>Technology:</strong> Focus on IP and customer data protection
                    </li>
                    <li>
                      • <strong>Energy:</strong> Highlight critical infrastructure protection
                    </li>
                    <li>
                      • <strong>ROI Messaging:</strong> Quantify breach cost savings and insurance benefits
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span>Operational Efficiency Focus</span>
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      • <strong>Education & Retail:</strong> Emphasize admin time savings
                    </li>
                    <li>
                      • <strong>Technology:</strong> Focus on developer productivity gains
                    </li>
                    <li>
                      • <strong>Manufacturing:</strong> Highlight OT/IT integration efficiency
                    </li>
                    <li>
                      • <strong>ROI Messaging:</strong> Calculate FTE savings and productivity gains
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-yellow-500" />
                    <span>Compliance Automation Focus</span>
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      • <strong>Government & Financial:</strong> Emphasize audit automation
                    </li>
                    <li>
                      • <strong>Healthcare:</strong> Focus on HIPAA compliance simplification
                    </li>
                    <li>
                      • <strong>Energy:</strong> Highlight NERC CIP reporting automation
                    </li>
                    <li>
                      • <strong>ROI Messaging:</strong> Quantify audit cost reduction and penalty avoidance
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>Downtime Reduction Focus</span>
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      • <strong>Manufacturing & Energy:</strong> Emphasize production continuity
                    </li>
                    <li>
                      • <strong>Financial:</strong> Focus on transaction processing uptime
                    </li>
                    <li>
                      • <strong>Healthcare:</strong> Highlight patient care system availability
                    </li>
                    <li>
                      • <strong>ROI Messaging:</strong> Calculate revenue protection and SLA compliance
                    </li>
                  </ul>
                </div>
              </div>

              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertDescription>
                  <strong>Universal Truth:</strong> While value drivers vary by industry, all sectors benefit from
                  Portnox CLEAR's comprehensive approach. The key is emphasizing the right drivers for each industry's
                  specific pain points and priorities.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
