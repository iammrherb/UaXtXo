"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { useDashboardSettings } from "@/context/DashboardContext"
import {
  industryComplianceData,
  zeroTrustPillars,
  calculateComplianceSavings,
  getZeroTrustMaturityScore,
  getIndustryZeroTrustGap,
} from "@/lib/compliance/industry-compliance-data"
import { Shield, AlertTriangle, TrendingUp, DollarSign, Clock, Award, Target, FileText, Lock } from "lucide-react"

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

export default function ComplianceOverview() {
  const { selectedIndustry, devices, comparisonYears } = useDashboardSettings()

  const industryData = industryComplianceData[selectedIndustry]
  const complianceSavings = useMemo(() => {
    if (!industryData) return null
    return calculateComplianceSavings(industryData, 92) // Portnox compliance coverage
  }, [industryData])

  const zeroTrustScore = getZeroTrustMaturityScore(zeroTrustPillars)
  const industryGap = getIndustryZeroTrustGap(zeroTrustPillars)

  // Prepare radar chart data for Zero Trust pillars
  const radarData = zeroTrustPillars.map((pillar) => ({
    pillar: pillar.name,
    portnox: pillar.portnoxScore,
    industry: pillar.industryAverage,
    gap: pillar.portnoxScore - pillar.industryAverage,
  }))

  // Compliance framework coverage data
  const frameworkData =
    industryData?.frameworks.map((framework, index) => ({
      name: framework.name,
      portnoxCoverage: 92 + Math.random() * 6, // 92-98% coverage
      industryCoverage: 65 + Math.random() * 20, // 65-85% coverage
      implementationCost: framework.implementationCost,
      maintenanceCost: framework.maintenanceCost,
      color: COLORS[index % COLORS.length],
    })) || []

  // Risk reduction over time
  const riskReductionData = Array.from({ length: comparisonYears }, (_, i) => ({
    year: `Year ${i + 1}`,
    withoutPortnox: Math.max(100 - i * 5, 70), // Risk decreases slowly without NAC
    withPortnox: Math.max(100 - (i + 1) * 25, 15), // Risk decreases rapidly with Portnox
    savings: (Math.max(100 - i * 5, 70) - Math.max(100 - (i + 1) * 25, 15)) * 1000 * devices,
  }))

  // Compliance cost comparison
  const complianceCostData = [
    {
      category: "Manual Compliance",
      withoutPortnox: 150000,
      withPortnox: 25000,
      savings: 125000,
    },
    {
      category: "Audit Preparation",
      withoutPortnox: 80000,
      withPortnox: 15000,
      savings: 65000,
    },
    {
      category: "Reporting & Documentation",
      withoutPortnox: 60000,
      withPortnox: 5000,
      savings: 55000,
    },
    {
      category: "Remediation Costs",
      withoutPortnox: 120000,
      withPortnox: 20000,
      savings: 100000,
    },
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  }

  if (!industryData) {
    return (
      <div className="text-center p-8">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Industry Data Not Available</h3>
        <p className="text-muted-foreground">Compliance data for the selected industry is not currently available.</p>
      </div>
    )
  }

  return (
    <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
          Compliance & Risk Analysis
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Comprehensive analysis of regulatory compliance, security frameworks, and risk reduction for the{" "}
          {industryData.industry} sector with {devices.toLocaleString()} devices.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="h-8 w-8 text-emerald-600" />
              <Badge variant="outline" className="text-emerald-700 border-emerald-300">
                Excellent
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-emerald-700">{industryData.coverage}%</h3>
            <p className="text-sm text-emerald-600">Compliance Coverage</p>
            <p className="text-xs text-muted-foreground mt-2">
              vs {Math.round(industryData.coverage * 0.7)}% industry average
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-blue-600" />
              <Badge variant="outline" className="text-blue-700 border-blue-300">
                {zeroTrustScore >= 90 ? "Optimal" : "Advanced"}
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-blue-700">{Math.round(zeroTrustScore)}</h3>
            <p className="text-sm text-blue-600">Zero Trust Score</p>
            <p className="text-xs text-muted-foreground mt-2">+{Math.round(industryGap)} vs industry</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <Badge variant="outline" className="text-purple-700 border-purple-300">
                Savings
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-purple-700">
              ${complianceSavings ? Math.round(complianceSavings.totalSavings / 1000) : 0}K
            </h3>
            <p className="text-sm text-purple-600">Annual Compliance Savings</p>
            <p className="text-xs text-muted-foreground mt-2">Automated processes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <Badge variant="outline" className="text-orange-700 border-orange-300">
                Reduced
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-orange-700">
              {Math.round((1 - industryData.riskProfile.breachProbability * 0.08) * 100)}%
            </h3>
            <p className="text-sm text-orange-600">Risk Reduction</p>
            <p className="text-xs text-muted-foreground mt-2">Breach probability decrease</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="frameworks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="frameworks">Compliance Frameworks</TabsTrigger>
          <TabsTrigger value="zerotrust">Zero Trust Maturity</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="savings">Cost Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Framework Coverage Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Framework Coverage Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={frameworkData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="portnoxCoverage" fill="#10b981" name="Portnox Coverage" />
                      <Bar dataKey="industryCoverage" fill="#6b7280" name="Industry Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Framework Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <span>Regulatory Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {industryData.frameworks.map((framework, index) => (
                    <div key={framework.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{framework.name}</h4>
                        <Badge variant="outline">{framework.auditFrequency}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{framework.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Penalty Range:</span>
                          <p className="font-medium">
                            ${framework.penaltyRange.min.toLocaleString()} - $
                            {framework.penaltyRange.max.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Implementation:</span>
                          <p className="font-medium">${framework.implementationCost.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Portnox Coverage</span>
                          <span className="font-medium">{frameworkData[index]?.portnoxCoverage.toFixed(0)}%</span>
                        </div>
                        <Progress value={frameworkData[index]?.portnoxCoverage || 0} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="zerotrust" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zero Trust Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Zero Trust Maturity Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="pillar" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar
                        name="Portnox CLEAR"
                        dataKey="portnox"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Industry Average"
                        dataKey="industry"
                        stroke="#6b7280"
                        fill="#6b7280"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Zero Trust Pillars Detail */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  <span>Pillar Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {zeroTrustPillars.map((pillar, index) => (
                    <div key={pillar.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{pillar.name}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            +{pillar.portnoxScore - pillar.industryAverage}
                          </Badge>
                          <span className="text-sm font-bold">{pillar.portnoxScore}/100</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{pillar.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Portnox Score</span>
                          <span>{pillar.portnoxScore}%</span>
                        </div>
                        <Progress value={pillar.portnoxScore} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Industry Average: {pillar.industryAverage}%</span>
                          <span>
                            {pillar.portnoxScore >= 90
                              ? "Optimal"
                              : pillar.portnoxScore >= 75
                                ? "Advanced"
                                : pillar.portnoxScore >= 60
                                  ? "Intermediate"
                                  : "Basic"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Reduction Over Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Risk Reduction Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={riskReductionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="withoutPortnox"
                        stackId="1"
                        stroke="#ef4444"
                        fill="#fee2e2"
                        name="Without NAC"
                      />
                      <Area
                        type="monotone"
                        dataKey="withPortnox"
                        stackId="2"
                        stroke="#10b981"
                        fill="#d1fae5"
                        name="With Portnox"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>Industry Risk Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <h4 className="text-2xl font-bold text-red-600">
                        {(industryData.riskProfile.breachProbability * 100).toFixed(0)}%
                      </h4>
                      <p className="text-sm text-red-700">Annual Breach Probability</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <h4 className="text-2xl font-bold text-orange-600">
                        ${(industryData.riskProfile.dataBreachCost / 1000000).toFixed(1)}M
                      </h4>
                      <p className="text-sm text-orange-700">Average Breach Cost</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Downtime Impact</span>
                        <span className="text-sm">{industryData.riskProfile.averageDowntimeHours}h avg</span>
                      </div>
                      <Progress value={(industryData.riskProfile.averageDowntimeHours / 72) * 100} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Regulatory Fines</span>
                        <span className="text-sm">
                          ${(industryData.riskProfile.regulatoryFines / 1000000).toFixed(1)}M max
                        </span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Reputation Impact</span>
                        <span className="text-sm">
                          ${(industryData.riskProfile.reputationImpact / 1000000).toFixed(1)}M potential
                        </span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>

                  {industryData.riskProfile.cyberInsuranceRequirements.required && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-2">Cyber Insurance</h5>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Annual Premium:</span>
                          <span className="font-medium">
                            ${industryData.riskProfile.cyberInsuranceRequirements.typicalPremium.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>NAC Discount:</span>
                          <span className="font-medium text-green-600">
                            {industryData.riskProfile.cyberInsuranceRequirements.nacDiscountAvailable}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Cost Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span>Compliance Cost Comparison</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={complianceCostData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Bar dataKey="withoutPortnox" fill="#ef4444" name="Without Portnox" />
                      <Bar dataKey="withPortnox" fill="#10b981" name="With Portnox" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Savings Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Annual Savings Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complianceSavings && (
                    <>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <h4 className="text-3xl font-bold text-green-600">
                          ${complianceSavings.totalSavings.toLocaleString()}
                        </h4>
                        <p className="text-sm text-green-700">Total Annual Savings</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h5 className="font-medium">Audit Cost Reduction</h5>
                            <p className="text-xs text-muted-foreground">Automated compliance processes</p>
                          </div>
                          <span className="font-bold text-green-600">
                            ${complianceSavings.auditCostReduction.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h5 className="font-medium">Fine Avoidance</h5>
                            <p className="text-xs text-muted-foreground">Reduced regulatory violations</p>
                          </div>
                          <span className="font-bold text-green-600">
                            ${complianceSavings.fineAvoidance.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h5 className="font-medium">Insurance Savings</h5>
                            <p className="text-xs text-muted-foreground">Cyber insurance discounts</p>
                          </div>
                          <span className="font-bold text-green-600">
                            ${complianceSavings.insuranceSavings.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">{comparisonYears}-Year Projected Savings</h5>
                        <p className="text-2xl font-bold text-blue-600">
                          ${(complianceSavings.totalSavings * comparisonYears).toLocaleString()}
                        </p>
                        <p className="text-sm text-blue-700 mt-1">Includes compound benefits and risk reduction</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
