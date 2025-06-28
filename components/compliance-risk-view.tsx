"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Shield, AlertTriangle, CheckCircle, Info, TrendingDown, Clock } from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ComplianceRiskViewProps {
  results?: CalculationResult[]
  configuration?: CalculationConfiguration
  selectedVendors?: string[]
}

const COMPLIANCE_FRAMEWORKS = [
  { id: "sox", name: "SOX", description: "Sarbanes-Oxley Act" },
  { id: "pci", name: "PCI DSS", description: "Payment Card Industry Data Security Standard" },
  { id: "hipaa", name: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
  { id: "gdpr", name: "GDPR", description: "General Data Protection Regulation" },
  { id: "iso27001", name: "ISO 27001", description: "Information Security Management" },
  { id: "nist", name: "NIST", description: "National Institute of Standards and Technology" },
  { id: "fedramp", name: "FedRAMP", description: "Federal Risk and Authorization Management Program" },
]

const RISK_CATEGORIES = [
  { id: "data_breach", name: "Data Breach", weight: 0.3 },
  { id: "compliance_violation", name: "Compliance Violation", weight: 0.25 },
  { id: "operational_disruption", name: "Operational Disruption", weight: 0.2 },
  { id: "reputation_damage", name: "Reputation Damage", weight: 0.15 },
  { id: "financial_loss", name: "Financial Loss", weight: 0.1 },
]

const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EF4444", "#6B7280"]

export default function ComplianceRiskView({
  results = [],
  configuration = {
    orgSize: "medium",
    devices: 2500,
    users: 1500,
    industry: "technology",
    years: 3,
    region: "north-america",
    portnoxBasePrice: 3.0,
    portnoxAddons: {
      atp: false,
      compliance: false,
      iot: false,
      analytics: false,
    },
  },
  selectedVendors = [],
}: ComplianceRiskViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)

  // Safe data handling
  const safeResults = results.filter((result) => result && result.riskMetrics)
  const portnoxResult = safeResults.find((r) => r.vendor === "portnox")

  // Calculate compliance scores
  const getComplianceScore = (vendor: string) => {
    const result = safeResults.find((r) => r.vendor === vendor)
    return result?.riskMetrics?.complianceScore || 0
  }

  // Calculate risk reduction
  const getRiskReduction = (vendor: string) => {
    const result = safeResults.find((r) => r.vendor === vendor)
    return result?.riskMetrics?.breachProbabilityReduction || 0
  }

  // Prepare radar chart data
  const radarData = COMPLIANCE_FRAMEWORKS.map((framework) => {
    const data: any = { framework: framework.name }
    safeResults.forEach((result) => {
      // Simulate compliance scores based on vendor capabilities
      let score = 0
      switch (result.vendor) {
        case "portnox":
          score = Math.min(95, 85 + Math.random() * 10)
          break
        case "cisco":
          score = Math.min(90, 75 + Math.random() * 15)
          break
        case "aruba":
          score = Math.min(85, 70 + Math.random() * 15)
          break
        default:
          score = Math.min(80, 60 + Math.random() * 20)
      }
      data[result.vendorName || result.vendor] = Math.round(score)
    })
    return data
  })

  // Risk assessment data
  const riskData = RISK_CATEGORIES.map((category) => {
    const data: any = { category: category.name }
    safeResults.forEach((result) => {
      const baseRisk = 100
      const reduction = getRiskReduction(result.vendor) * 100
      data[result.vendorName || result.vendor] = Math.max(0, baseRisk - reduction)
    })
    return data
  })

  // Industry-specific compliance requirements
  const getIndustryRequirements = () => {
    const industry = configuration.industry || "technology"
    const requirements = {
      healthcare: ["HIPAA", "SOX", "NIST"],
      financial: ["SOX", "PCI DSS", "NIST", "GDPR"],
      government: ["FedRAMP", "NIST", "ISO 27001"],
      education: ["GDPR", "NIST", "ISO 27001"],
      technology: ["SOX", "GDPR", "ISO 27001"],
      manufacturing: ["ISO 27001", "NIST"],
      retail: ["PCI DSS", "GDPR", "SOX"],
      energy: ["NIST", "ISO 27001", "SOX"],
    }
    return requirements[industry as keyof typeof requirements] || ["ISO 27001", "NIST"]
  }

  const industryRequirements = getIndustryRequirements()

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">Compliance Score</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {portnoxResult ? getComplianceScore("portnox") : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingDown className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Risk Reduction</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {portnoxResult ? Math.round(getRiskReduction("portnox") * 100) : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Frameworks</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{industryRequirements.length}</p>
                  <p className="text-xs text-gray-500">Required for {configuration.industry}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Audit Readiness</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portnoxResult ? Math.round(portnoxResult.riskMetrics?.operationalEfficiency || 0) : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Compliance Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="framework" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    {safeResults.map((result, index) => (
                      <Radar
                        key={result.vendor}
                        name={result.vendorName || result.vendor}
                        dataKey={result.vendorName || result.vendor}
                        stroke={COLORS[index % COLORS.length]}
                        fill={COLORS[index % COLORS.length]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    ))}
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Industry Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Industry-Specific Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industryRequirements.map((req) => {
                  const framework = COMPLIANCE_FRAMEWORKS.find((f) => f.name === req)
                  return (
                    <div key={req} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{req}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {framework?.description || "Compliance framework"}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Supported
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Framework Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {COMPLIANCE_FRAMEWORKS.map((framework) => (
                  <div key={framework.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{framework.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{framework.description}</p>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{framework.name} Compliance</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">{framework.description}</p>
                            <div className="space-y-2">
                              {safeResults.map((result) => (
                                <div key={result.vendor} className="flex items-center justify-between">
                                  <span>{result.vendorName || result.vendor}</span>
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={
                                        radarData.find((d) => d.framework === framework.name)?.[
                                          result.vendorName || result.vendor
                                        ] || 0
                                      }
                                      className="w-20"
                                    />
                                    <span className="text-sm font-medium">
                                      {radarData.find((d) => d.framework === framework.name)?.[
                                        result.vendorName || result.vendor
                                      ] || 0}
                                      %
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {safeResults.map((result) => {
                        const score =
                          radarData.find((d) => d.framework === framework.name)?.[result.vendorName || result.vendor] ||
                          0
                        return (
                          <div key={result.vendor} className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {result.vendorName || result.vendor}
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-1">
                              <Progress value={score} className="w-16" />
                              <span className="text-sm font-medium">{score}%</span>
                            </div>
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

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Category Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    {safeResults.map((result, index) => (
                      <Bar
                        key={result.vendor}
                        dataKey={result.vendorName || result.vendor}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">Implement Zero Trust Architecture</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Deploy comprehensive network access control with continuous device verification
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Automate Compliance Reporting</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Reduce audit preparation time by 75% with automated compliance documentation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-800 dark:text-purple-200">Enhanced Threat Detection</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    AI-powered behavioral analysis identifies threats 90% faster than traditional methods
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-800 dark:text-orange-200">Risk Mitigation Priority</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Focus on data breach prevention - highest impact risk category for your industry
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
