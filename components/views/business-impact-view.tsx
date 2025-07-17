"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Building2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Target,
  Award,
  AlertTriangle,
  CheckCircle2,
  GraduationCap,
  Heart,
  Factory,
  Landmark,
  Code,
  ShoppingCart,
  ArrowUpRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface BusinessImpactViewProps {
  results?: CalculationResult[]
  config?: CalculationConfiguration
}

export default function BusinessImpactView({ results = [], config }: BusinessImpactViewProps) {
  const portnoxResult = results.find((r) => r.vendorId === "portnox")

  const impactPoints = [
    {
      icon: Zap,
      title: "Accelerated Digital Transformation",
      description:
        "Cloud-native architecture removes infrastructure bottlenecks, enabling rapid adoption of new technologies and faster project delivery.",
      metric: "95% Faster Deployment",
      value: "enables agility",
    },
    {
      icon: TrendingUp,
      title: "Enhanced Competitive Advantage",
      description:
        "Superior security posture and operational efficiency allow resources to be refocused on innovation and core business objectives.",
      metric: "Reallocate 2.5 FTEs",
      value: "to strategic initiatives",
    },
    {
      icon: Shield,
      title: "Strengthened Brand Reputation",
      description:
        "A zero-CVE track record and proactive security significantly reduce the risk of damaging data breaches and compliance failures.",
      metric: "92% Breach Risk Reduction",
      value: "protects brand value",
    },
    {
      icon: Users,
      title: "Improved Employee & User Experience",
      description:
        "Seamless, secure access for all users and devices, including BYOD and IoT, improves productivity and satisfaction without compromising security.",
      metric: "Frictionless Access",
      value: "for any user, any device",
    },
    {
      icon: Globe,
      title: "Future-Proof Scalability",
      description:
        "The SaaS platform scales effortlessly with your organization's growth, supporting global expansion and M&A activities without costly hardware rollouts.",
      metric: "Infinite Cloud Scale",
      value: "supports global growth",
    },
    {
      icon: CheckCircle2,
      title: "Simplified Compliance & Governance",
      description:
        "Automated compliance reporting and continuous monitoring reduce the burden of audits and ensure adherence to regulatory standards.",
      metric: "90% Audit Time Reduction",
      value: "simplifies governance",
    },
  ]

  const INDUSTRY_ROI_FACTORS = {
    healthcare: {
      name: "Healthcare",
      efficiencyGain: 1.2,
      compliancePenalty: 5000000,
      downtimeHourly: 8500,
    },
    financial: {
      name: "Financial Services",
      efficiencyGain: 1.1,
      compliancePenalty: 10000000,
      downtimeHourly: 12000,
    },
    retail: {
      name: "Retail",
      efficiencyGain: 1.3,
      compliancePenalty: 1000000,
      downtimeHourly: 5500,
    },
    manufacturing: {
      name: "Manufacturing",
      efficiencyGain: 1.4,
      compliancePenalty: 2000000,
      downtimeHourly: 15000,
    },
    education: {
      name: "Education",
      efficiencyGain: 1.1,
      compliancePenalty: 500000,
      downtimeHourly: 3000,
    },
    government: {
      name: "Government",
      efficiencyGain: 1.0,
      compliancePenalty: 15000000,
      downtimeHourly: 8000,
    },
    technology: {
      name: "Technology",
      efficiencyGain: 1.5,
      compliancePenalty: 3000000,
      downtimeHourly: 10000,
    },
    default: {
      name: "General",
      efficiencyGain: 1.2,
      compliancePenalty: 2000000,
      downtimeHourly: 7500,
    },
  }

  const industryFactors =
    INDUSTRY_ROI_FACTORS[config?.industry as keyof typeof INDUSTRY_ROI_FACTORS] || INDUSTRY_ROI_FACTORS.default

  // Business value metrics
  const businessMetrics = useMemo(() => {
    return results.map((r) => {
      // Calculate productivity gains
      const productivityGain =
        r.operational?.automationLevel * industryFactors.efficiencyGain * (r.operational?.fteSaved || 1) * 150000

      // Calculate compliance value
      const complianceValue = ((r.risk?.complianceScore || 80) / 100) * industryFactors.compliancePenalty * 0.5

      // Calculate downtime prevention value
      const downtimePrevention =
        (1 - (r.operational?.maintenanceWindows || 4) / 12) * industryFactors.downtimeHourly * 8

      // Calculate competitive advantage
      const competitiveScore = ((r.competitive?.innovationScore || 70) + (r.competitive?.futureReadiness || 70)) / 2

      // Calculate total business value
      const totalBusinessValue = productivityGain + complianceValue + downtimePrevention + (r.roi?.annualSavings || 0)

      return {
        vendor: r.vendorName,
        vendorId: r.vendorId,
        productivityGain,
        complianceValue,
        downtimePrevention,
        securityValue: r.roi?.annualSavings || 0,
        totalBusinessValue,
        competitiveScore,
        timeToValue: r.timeline?.timeToValue || 30,
        scalabilityScore: 80,
      }
    })
  }, [results, industryFactors])

  // Industry-specific impact analysis
  const industryImpact = useMemo(() => {
    const getIndustryIcon = (industry: string) => {
      const icons = {
        healthcare: Heart,
        financial: Landmark,
        retail: ShoppingCart,
        manufacturing: Factory,
        education: GraduationCap,
        government: Building2,
        technology: Code,
      }
      return icons[industry as keyof typeof icons] || Building2
    }

    const IndustryIcon = getIndustryIcon(config?.industry)

    // Industry-specific metrics
    const metrics = results.map((r) => {
      let primaryMetric = 0
      let primaryLabel = ""
      let secondaryMetric = 0
      let secondaryLabel = ""

      switch (config?.industry) {
        case "healthcare":
          primaryMetric = ((r.risk?.complianceScore || 80) / 100) * 100
          primaryLabel = "HIPAA Compliance"
          secondaryMetric = 90
          secondaryLabel = "Medical Device Support"
          break
        case "financial":
          primaryMetric = (r.operational?.mttr || 60) * 10
          primaryLabel = "Incident Response"
          secondaryMetric = ((r.risk?.securityScore || 80) / 100) * 100
          secondaryLabel = "Security Posture"
          break
        case "retail":
          primaryMetric = 90
          primaryLabel = "Multi-Site Support"
          secondaryMetric = (r.perDevicePerMonth || 5) * 12
          secondaryLabel = "Cost per Device"
          break
        case "manufacturing":
          primaryMetric = 95
          primaryLabel = "OT/IT Convergence"
          secondaryMetric = r.operational?.maintenanceWindows || 4
          secondaryLabel = "Maintenance Windows"
          break
        case "education":
          primaryMetric = 90
          primaryLabel = "BYOD Capability"
          secondaryMetric = (r.totalCost || 100000) / config?.users
          secondaryLabel = "Cost per User"
          break
        case "government":
          primaryMetric = 100
          primaryLabel = "FedRAMP Compliance"
          secondaryMetric = 90
          secondaryLabel = "On-Premise Score"
          break
        case "technology":
          primaryMetric = r.operational?.automationLevel || 80
          primaryLabel = "Automation Level"
          secondaryMetric = r.competitive?.innovationScore || 70
          secondaryLabel = "Innovation Score"
          break
        default:
          primaryMetric = r.risk?.securityScore || 80
          primaryLabel = "Security Score"
          secondaryMetric = r.operational?.automationLevel || 80
          secondaryLabel = "Automation Level"
      }

      return {
        vendor: r.vendorName,
        vendorId: r.vendorId,
        primaryMetric,
        primaryLabel,
        secondaryMetric,
        secondaryLabel,
      }
    })

    return {
      icon: IndustryIcon,
      metrics,
    }
  }, [results, config?.industry])

  // Strategic value assessment
  const strategicValue = useMemo(() => {
    return results.map((r) => {
      const scores = {
        "Digital Transformation": 85 + (r.vendorId === "portnox" ? 10 : -10),
        "Operational Excellence":
          (r.operational?.automationLevel || 80) + (100 - (r.operational?.maintenanceWindows || 4) * 5),
        "Risk Management": (r.risk?.securityScore || 80) + (r.risk?.complianceScore || 80),
        "Innovation Enablement": (r.competitive?.innovationScore || 70) + (r.competitive?.futureReadiness || 70),
        "Cost Optimization":
          100 -
          (((r.totalCost || 100000) - (results[0]?.totalCost || 100000)) / (results[0]?.totalCost || 100000)) * 100,
        Scalability: 80,
      }

      const averageScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length

      return {
        vendor: r.vendorName,
        vendorId: r.vendorId,
        scores,
        averageScore,
      }
    })
  }, [results])

  // Business continuity impact
  const continuityImpact = useMemo(() => {
    return results.map((r) => {
      const uptimeScore = 100 - (r.operational?.maintenanceWindows || 4) * 2
      const recoveryScore = 100 - (r.operational?.mttr || 60) * 10
      const redundancyScore = r.vendorId === "portnox" ? 90 : 70

      return {
        vendor: r.vendorName,
        vendorId: r.vendorId,
        uptimeScore,
        recoveryScore,
        redundancyScore,
        overallContinuity: (uptimeScore + recoveryScore + redundancyScore) / 3,
      }
    })
  }, [results])

  // Value realization timeline
  const valueTimeline = useMemo(() => {
    const quarters = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"]

    return quarters.map((quarter, index) => {
      const monthsElapsed = (index + 1) * 3
      const dataPoint: any = { quarter }

      results.forEach((r) => {
        const deploymentComplete = monthsElapsed >= ((r.timeline?.implementationWeeks || 12) * 7) / 30
        const valueRealized = deploymentComplete
          ? Math.min(100, ((monthsElapsed - ((r.timeline?.timeToValue || 30) * 7) / 30) / 12) * 100)
          : 0

        dataPoint[r.vendorName] = valueRealized
      })

      return dataPoint
    })
  }, [results])

  // Colors
  const COLORS = {
    portnox: "#3b82f6",
    cisco: "#059669",
    aruba: "#dc2626",
    meraki: "#7c3aed",
    other: "#6b7280",
  }

  const getVendorColor = (vendorId: string) => {
    return COLORS[vendorId as keyof typeof COLORS] || COLORS.other
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Please select vendors to analyze business impact.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Business Impact Analysis</h2>
          <p className="text-muted-foreground">Strategic value assessment and business outcome projections</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {config?.industry.charAt(0).toUpperCase() + config?.industry.slice(1)} Industry
        </Badge>
      </div>

      {/* Strategic Business Impact of Portnox CLEAR */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Business Impact of Portnox CLEAR</CardTitle>
          <CardDescription>
            How a modern NAC solution drives tangible business outcomes beyond cost savings.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {impactPoints.map((point, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <point.icon className="h-8 w-8 text-portnox-primary" />
                  <CardTitle className="text-lg">{point.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-semibold text-portnox-primary">{point.metric}</p>
                  <p className="text-xs text-muted-foreground">{point.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Business Value</p>
                <p className="text-2xl font-bold">${(businessMetrics[0]?.totalBusinessValue || 0).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">
                {portnoxResult
                  ? Math.round(((businessMetrics[0]?.totalBusinessValue || 0) / (portnoxResult.totalCost || 1)) * 100)
                  : 0}
                % ROI
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time to Value</p>
                <p className="text-2xl font-bold">{businessMetrics[0]?.timeToValue || 0} days</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">95% faster than legacy</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Productivity Gain</p>
                <p className="text-2xl font-bold">${(businessMetrics[0]?.productivityGain || 0).toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Users className="h-4 w-4 text-purple-600 mr-1" />
              <span className="text-purple-600">{results[0]?.operational?.fteSaved || 0} FTE saved</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Reduction</p>
                <p className="text-2xl font-bold">{results[0]?.roi?.breachReduction || 0}%</p>
              </div>
              <Target className="h-8 w-8 text-red-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">Enterprise-grade security</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="strategic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="strategic">Strategic Value</TabsTrigger>
          <TabsTrigger value="industry">Industry Impact</TabsTrigger>
          <TabsTrigger value="continuity">Business Continuity</TabsTrigger>
          <TabsTrigger value="timeline">Value Timeline</TabsTrigger>
          <TabsTrigger value="competitive">Competitive Edge</TabsTrigger>
        </TabsList>

        {/* Strategic Value Tab */}
        <TabsContent value="strategic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strategic Value Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Strategic Value Assessment</CardTitle>
                <CardDescription>Multi-dimensional business value analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={strategicValue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="averageScore" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Business Value Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Business Value Components</CardTitle>
                <CardDescription>Quantified business impact by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={businessMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Bar dataKey="productivityGain" stackId="a" fill="#3b82f6" name="Productivity" />
                    <Bar dataKey="complianceValue" stackId="a" fill="#10b981" name="Compliance" />
                    <Bar dataKey="downtimePrevention" stackId="a" fill="#f59e0b" name="Uptime" />
                    <Bar dataKey="securityValue" stackId="a" fill="#ef4444" name="Security" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Capabilities Matrix */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Capabilities Matrix</CardTitle>
              <CardDescription>Detailed breakdown of strategic value drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strategicValue.map((vendor, index) => (
                  <div key={vendor.vendorId} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{vendor.vendor}</h4>
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        {Math.round(vendor.averageScore)}% Overall
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(vendor.scores).map(([category, score]) => (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{category}</span>
                            <span>{Math.round(score)}%</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Industry Impact Tab */}
        <TabsContent value="industry" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Industry-Specific Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <industryImpact.icon className="h-5 w-5" />
                  {config?.industry.charAt(0).toUpperCase() + config?.industry.slice(1)} Industry Metrics
                </CardTitle>
                <CardDescription>Key performance indicators for your industry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryImpact.metrics.map((vendor, index) => (
                    <div key={vendor.vendorId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{vendor.vendor}</h4>
                        <Badge variant={index === 0 ? "default" : "secondary"}>Rank #{index + 1}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{vendor.primaryLabel}</span>
                            <span>{Math.round(vendor.primaryMetric)}%</span>
                          </div>
                          <Progress value={vendor.primaryMetric} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{vendor.secondaryLabel}</span>
                            <span>{Math.round(vendor.secondaryMetric)}</span>
                          </div>
                          <Progress value={Math.min(100, vendor.secondaryMetric)} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Benchmarks */}
            <Card>
              <CardHeader>
                <CardTitle>Industry Benchmarks</CardTitle>
                <CardDescription>Performance vs industry standards</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={industryImpact.metrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="primaryMetric" fill="#3b82f6" name="Primary Metric" />
                    <Bar dataKey="secondaryMetric" fill="#10b981" name="Secondary Metric" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Industry-Specific Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Industry Requirement:</strong>{" "}
                {config?.industry === "healthcare"
                  ? "HIPAA compliance mandatory for patient data protection"
                  : config?.industry === "financial"
                    ? "SOX compliance required for financial reporting controls"
                    : config?.industry === "retail"
                      ? "PCI-DSS compliance essential for payment processing"
                      : "Industry-specific compliance requirements must be addressed"}
              </AlertDescription>
            </Alert>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Best Practice:</strong>{" "}
                {config?.industry === "healthcare"
                  ? "Implement device profiling for medical equipment"
                  : config?.industry === "financial"
                    ? "Enable real-time fraud detection and response"
                    : config?.industry === "retail"
                      ? "Deploy network segmentation for POS systems"
                      : "Follow zero-trust principles for enhanced security"}
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>

        {/* Business Continuity Tab */}
        <TabsContent value="continuity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Continuity Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Business Continuity Assessment</CardTitle>
                <CardDescription>Operational resilience and availability metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={continuityImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendor" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="uptimeScore" fill="#3b82f6" name="Uptime" />
                    <Bar dataKey="recoveryScore" fill="#10b981" name="Recovery" />
                    <Bar dataKey="redundancyScore" fill="#f59e0b" name="Redundancy" />
                    <Line type="monotone" dataKey="overallContinuity" stroke="#ef4444" strokeWidth={3} name="Overall" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Downtime Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Downtime Impact Analysis</CardTitle>
                <CardDescription>Financial impact of service disruptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {continuityImpact.map((vendor, index) => {
                    const annualDowntime = (100 - vendor.uptimeScore) * 87.6
                    const downtimeCost = annualDowntime * industryFactors.downtimeHourly

                    return (
                      <div key={vendor.vendorId} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{vendor.vendor}</h4>
                          <Badge
                            variant={
                              vendor.overallContinuity > 90
                                ? "default"
                                : vendor.overallContinuity > 80
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {Math.round(vendor.overallContinuity)}% Continuity
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Annual Downtime:</span>
                            <span className="ml-2 font-medium">{Math.round(annualDowntime)}h</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Cost Impact:</span>
                            <span className="ml-2 font-medium">${downtimeCost.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Value Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Value Realization Timeline</CardTitle>
              <CardDescription>Projected business value delivery over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={valueTimeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${Math.round(Number(value))}% value realized`} />
                  <Legend />
                  {results.map((result, index) => (
                    <Area
                      key={result.vendorId}
                      type="monotone"
                      dataKey={result.vendorName}
                      stackId="1"
                      stroke={getVendorColor(result.vendorId)}
                      fill={getVendorColor(result.vendorId)}
                      fillOpacity={0.6}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Implementation Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((result, index) => (
              <Card key={result.vendorId}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{result.vendorName}</h4>
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                      {result.timeline?.implementationWeeks || 12}w
                    </Badge>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deployment:</span>
                      <span>{result.timeline?.implementationWeeks || 12} weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">First Value:</span>
                      <span>{result.timeline?.timeToValue || 30} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Full ROI:</span>
                      <span>{result.roi?.paybackMonths || 18} months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Competitive Edge Tab */}
        <TabsContent value="competitive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Innovation & Future Readiness */}
            <Card>
              <CardHeader>
                <CardTitle>Innovation & Future Readiness</CardTitle>
                <CardDescription>Technology leadership and adaptability</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={results}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="vendorName" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="competitive.innovationScore" fill="#3b82f6" name="Innovation" />
                    <Line
                      type="monotone"
                      dataKey="competitive.futureReadiness"
                      stroke="#ef4444"
                      strokeWidth={3}
                      name="Future Ready"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Scalability Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Scalability Assessment</CardTitle>
                <CardDescription>Growth capacity and performance scaling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessMetrics.map((vendor, index) => (
                    <div key={vendor.vendorId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{vendor.vendor}</h4>
                        <Badge
                          variant={
                            vendor.scalabilityScore > 80
                              ? "default"
                              : vendor.scalabilityScore > 60
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {Math.round(vendor.scalabilityScore)}% Scalable
                        </Badge>
                      </div>
                      <Progress value={vendor.scalabilityScore} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Competitive Advantages */}
          <Card>
            <CardHeader>
              <CardTitle>Competitive Advantage Analysis</CardTitle>
              <CardDescription>Key differentiators and market positioning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.slice(0, 2).map((result, index) => (
                  <div key={result.vendorId} className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      {result.vendorName} Advantages
                    </h4>
                    <div className="space-y-2">
                      {result.vendorId === "portnox"
                        ? [
                            "Cloud-native architecture eliminates infrastructure overhead",
                            "AI-powered automation reduces manual intervention by 90%",
                            "Zero-trust security model provides superior protection",
                            "Fastest deployment in market (hours vs months)",
                            "Lowest total cost of ownership",
                          ]
                        : result.vendorId === "cisco"
                          ? [
                              "Market leader with proven enterprise track record",
                              "Comprehensive feature set and ecosystem integration",
                              "Strong compliance and certification portfolio",
                              "Extensive partner and support network",
                            ]
                          : [
                              "Competitive pricing and value proposition",
                              "Good integration with existing infrastructure",
                              "Solid feature set for core requirements",
                              "Established market presence",
                            ].map((advantage, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{advantage}</span>
                              </div>
                            ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
