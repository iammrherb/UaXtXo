"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Activity,
  BarChart3,
  PieChartIcon,
  Download,
  Mail,
  Printer,
  Globe,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"

interface ExecutiveReportViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

const ExecutiveReportView: React.FC<ExecutiveReportViewProps> = ({ results, config }) => {
  const [selectedMetric, setSelectedMetric] = useState<string>("security")
  const [timeframe, setTimeframe] = useState<string>("5year")

  // Find Portnox result for detailed analysis
  const portnoxResult = results.find((r) => r.vendorId === "portnox") || results[0]
  const topThreeResults = results.slice(0, 3)

  // Enhanced risk assessment calculations
  const riskAssessment = useMemo(() => {
    const industryRiskFactors = {
      healthcare: { multiplier: 1.4, breachCost: 10930000, regulatoryRisk: 95 },
      financial: { multiplier: 1.3, breachCost: 5970000, regulatoryRisk: 90 },
      retail: { multiplier: 1.1, breachCost: 3620000, regulatoryRisk: 70 },
      manufacturing: { multiplier: 1.2, breachCost: 4470000, regulatoryRisk: 75 },
      education: { multiplier: 1.0, breachCost: 3860000, regulatoryRisk: 60 },
      government: { multiplier: 1.5, breachCost: 5240000, regulatoryRisk: 98 },
      technology: { multiplier: 1.1, breachCost: 4880000, regulatoryRisk: 65 },
      default: { multiplier: 1.2, breachCost: 4450000, regulatoryRisk: 75 },
    }

    const industryData =
      industryRiskFactors[config.industry as keyof typeof industryRiskFactors] || industryRiskFactors.default

    // Calculate comprehensive risk metrics for each vendor
    return results.map((result) => {
      // Security Risk Score (0-100, lower is better)
      const securityRisk = Math.max(0, 100 - result.risk.securityScore)

      // Compliance Risk Score
      const complianceRisk = Math.max(0, 100 - result.risk.complianceScore)

      // Financial Risk (based on TCO and ROI)
      const financialRisk = Math.min(100, Math.max(0, (result.totalCost / (config.devices * 1000)) * 20))

      // Operational Risk (based on automation and complexity)
      const operationalRisk = result.risk.operationalRisk

      // Implementation Risk
      const implementationRisk =
        result.timeline.migrationRisk === "high" ? 80 : result.timeline.migrationRisk === "medium" ? 50 : 20

      // Vendor Risk (stability and market position)
      const vendorRisk = result.vendorData.marketShare < 5 ? 70 : result.vendorData.marketShare < 15 ? 40 : 20

      // Calculate potential breach cost with industry factors
      const annualBreachProbability = (securityRisk / 100) * 0.3 // Max 30% annual probability
      const potentialBreachCost = industryData.breachCost * industryData.multiplier
      const expectedAnnualLoss = annualBreachProbability * potentialBreachCost

      // Risk mitigation value
      const riskMitigationValue = (result.risk.breachReduction * potentialBreachCost) / 100

      // Overall risk score (weighted average)
      const overallRisk = Math.round(
        securityRisk * 0.25 +
          complianceRisk * 0.2 +
          financialRisk * 0.15 +
          operationalRisk * 0.15 +
          implementationRisk * 0.15 +
          vendorRisk * 0.1,
      )

      return {
        vendor: result.vendorName,
        vendorId: result.vendorId,
        overallRisk,
        securityRisk,
        complianceRisk,
        financialRisk,
        operationalRisk,
        implementationRisk,
        vendorRisk,
        annualBreachProbability: Math.round(annualBreachProbability * 100),
        potentialBreachCost,
        expectedAnnualLoss,
        riskMitigationValue,
        regulatoryExposure: industryData.regulatoryRisk,
        riskCategory: overallRisk > 70 ? "High" : overallRisk > 40 ? "Medium" : "Low",
        riskColor: overallRisk > 70 ? "#ef4444" : overallRisk > 40 ? "#f59e0b" : "#10b981",
      }
    })
  }, [results, config])

  // Convert breakdown object to array for charts
  const getBreakdownArray = (breakdown: any) => {
    return [
      { name: "Licensing", value: breakdown.licensing, color: "#8884d8" },
      { name: "Hardware", value: breakdown.hardware, color: "#82ca9d" },
      { name: "Implementation", value: breakdown.implementation, color: "#ffc658" },
      { name: "Support", value: breakdown.support, color: "#ff7300" },
      { name: "Training", value: breakdown.training, color: "#00ff00" },
      { name: "Maintenance", value: breakdown.maintenance, color: "#ff00ff" },
      { name: "Operational", value: breakdown.operational, color: "#00ffff" },
    ].filter((item) => item.value > 0)
  }

  // Enhanced business impact calculations
  const businessImpact = useMemo(() => {
    const portnoxRisk = riskAssessment.find((r) => r.vendorId === "portnox")
    const currentStateRisk = {
      annualBreachProbability: 25, // 25% without NAC
      potentialBreachCost: riskAssessment[0]?.potentialBreachCost || 4450000,
      operationalEfficiency: 60, // Current efficiency
      complianceGaps: 40, // 40% compliance gaps
    }

    return {
      riskReduction: {
        breachProbabilityReduction: Math.max(
          0,
          currentStateRisk.annualBreachProbability - (portnoxRisk?.annualBreachProbability || 15),
        ),
        annualRiskSavings:
          ((currentStateRisk.annualBreachProbability - (portnoxRisk?.annualBreachProbability || 15)) / 100) *
          currentStateRisk.potentialBreachCost,
        complianceImprovement: Math.max(
          0,
          (portnoxResult?.risk.complianceScore || 90) - (100 - currentStateRisk.complianceGaps),
        ),
      },
      operationalBenefits: {
        efficiencyGain: Math.max(
          0,
          (portnoxResult?.ops.automationLevel || 90) - currentStateRisk.operationalEfficiency,
        ),
        fteSavings: portnoxResult?.ops.fteSaved || 0,
        annualOpsSavings: portnoxResult?.ops.annualOpsSaving || 0,
        maintenanceReduction: Math.max(0, 40 - (portnoxResult?.ops.maintenanceHours || 20)),
      },
      strategicValue: {
        digitalTransformationReadiness: ((portnoxResult?.risk.securityScore || 90) / 100) * 100,
        futureProofing: portnoxResult?.vendorData.cloudNative ? 85 : 65,
        scalabilityScore: Math.min(100, (portnoxResult?.vendorData.maxDevices || 50000) / 1000),
        innovationIndex: portnoxResult?.vendorData.aiMlCapabilities ? 90 : 70,
      },
    }
  }, [portnoxResult, riskAssessment])

  // Industry benchmarking data
  const industryBenchmarks = {
    healthcare: { avgSecuritySpend: 15, avgBreachCost: 10930000, complianceRequirement: 95 },
    financial: { avgSecuritySpend: 18, avgBreachCost: 5970000, complianceRequirement: 98 },
    retail: { avgSecuritySpend: 8, avgBreachCost: 3620000, complianceRequirement: 75 },
    manufacturing: { avgSecuritySpend: 12, avgBreachCost: 4470000, complianceRequirement: 80 },
    education: { avgSecuritySpend: 6, avgBreachCost: 3860000, complianceRequirement: 70 },
    government: { avgSecuritySpend: 20, avgBreachCost: 5240000, complianceRequirement: 99 },
    technology: { avgSecuritySpend: 14, avgBreachCost: 4880000, complianceRequirement: 85 },
    default: { avgSecuritySpend: 12, avgBreachCost: 4450000, complianceRequirement: 80 },
  }

  const currentBenchmark =
    industryBenchmarks[config.industry as keyof typeof industryBenchmarks] || industryBenchmarks.default

  const ExecutiveSummary = () => (
    <div className="space-y-6">
      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Recommended Solution</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{portnoxResult.vendorName}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Best overall value</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">5-Year TCO</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  ${(portnoxResult.totalCost / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {(
                    ((portnoxResult.totalCost - results[results.length - 1].totalCost) /
                      results[results.length - 1].totalCost) *
                    100
                  ).toFixed(0)}
                  % savings vs highest
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">ROI</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {portnoxResult.roi.percentage.toFixed(0)}%
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  {portnoxResult.roi.paybackMonths} month payback
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Risk Reduction</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {businessImpact.riskReduction.breachProbabilityReduction.toFixed(0)}%
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Breach probability</p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Recommendation */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Executive Recommendation</h3>
              <p className="text-lg opacity-90">
                Deploy {portnoxResult.vendorName} as your Network Access Control solution to achieve optimal security
                posture while minimizing total cost of ownership and operational complexity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">
                    ${(businessImpact.riskReduction.annualRiskSavings / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm opacity-80">Annual risk savings</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{businessImpact.operationalBenefits.fteSavings.toFixed(1)}</div>
                  <div className="text-sm opacity-80">FTE savings</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">{portnoxResult.timeline.implementationWeeks}</div>
                  <div className="text-sm opacity-80">Weeks to deploy</div>
                </div>
              </div>
            </div>
            <Target className="h-16 w-16 opacity-80" />
          </div>
        </CardContent>
      </Card>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Security Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Zero Trust Architecture</span>
              <Badge variant="default">Implemented</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Threat Detection</span>
              <div className="text-right">
                <div className="text-sm font-medium">{portnoxResult.risk.securityScore}% Coverage</div>
                <Progress value={portnoxResult.risk.securityScore} className="w-20 h-2" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Compliance Score</span>
              <div className="text-right">
                <div className="text-sm font-medium">{portnoxResult.risk.complianceScore}%</div>
                <Progress value={portnoxResult.risk.complianceScore} className="w-20 h-2" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Breach Risk Reduction</span>
              <Badge variant="outline" className="text-green-600">
                -{(portnoxResult.risk.breachReduction * 100).toFixed(0)}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Operational Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Automation Level</span>
              <div className="text-right">
                <div className="text-sm font-medium">{portnoxResult.ops.automationLevel}%</div>
                <Progress value={portnoxResult.ops.automationLevel} className="w-20 h-2" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>FTE Reduction</span>
              <Badge variant="outline" className="text-blue-600">
                {portnoxResult.ops.fteSaved.toFixed(1)} FTEs
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Annual OpEx Savings</span>
              <Badge variant="outline" className="text-green-600">
                ${(portnoxResult.ops.annualOpsSaving / 1000).toFixed(0)}K
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Maintenance Hours</span>
              <Badge variant="outline">{portnoxResult.ops.maintenanceHours}h/month</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const EnhancedRiskAssessment = () => (
    <div className="space-y-6">
      {/* Risk Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskAssessment.slice(0, 4).map((risk, idx) => (
          <Card key={risk.vendorId} className={`border-l-4`} style={{ borderLeftColor: risk.riskColor }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">{risk.vendor}</h4>
                <Badge
                  variant={
                    risk.riskCategory === "Low"
                      ? "default"
                      : risk.riskCategory === "Medium"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {risk.riskCategory} Risk
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Overall Risk Score</span>
                  <span className="font-medium">{risk.overallRisk}/100</span>
                </div>
                <Progress value={100 - risk.overallRisk} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Annual breach probability: {risk.annualBreachProbability}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Risk Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "securityRisk",
                "complianceRisk",
                "financialRisk",
                "operationalRisk",
                "implementationRisk",
                "vendorRisk",
              ].map((riskType) => (
                <div key={riskType} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize font-medium">
                      {riskType.replace(/([A-Z])/g, " $1").replace("Risk", " Risk")}
                    </span>
                    <span className="text-muted-foreground">
                      Avg:{" "}
                      {Math.round(
                        riskAssessment.reduce((sum, r) => sum + r[riskType as keyof typeof r], 0) /
                          riskAssessment.length,
                      )}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {riskAssessment.slice(0, 3).map((risk, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-xs text-muted-foreground">{risk.vendor}</div>
                        <Progress value={100 - (risk[riskType as keyof typeof risk] as number)} className="h-2" />
                        <div className="text-xs text-center">
                          {100 - (risk[riskType as keyof typeof risk] as number)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-red-600" />
              Financial Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                expectedLoss: { label: "Expected Annual Loss", color: "hsl(var(--chart-1))" },
                mitigation: { label: "Risk Mitigation Value", color: "hsl(var(--chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskAssessment.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vendor" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="expectedAnnualLoss" fill="hsl(var(--chart-1))" name="Expected Annual Loss" />
                  <Bar dataKey="riskMitigationValue" fill="hsl(var(--chart-2))" name="Risk Mitigation Value" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Industry Risk Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Industry Risk Benchmarking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Current Industry: {config.industry}</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Average Security Spend</span>
                  <span className="font-medium">{currentBenchmark.avgSecuritySpend}% of IT budget</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Breach Cost</span>
                  <span className="font-medium">${(currentBenchmark.avgBreachCost / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Requirement</span>
                  <span className="font-medium">{currentBenchmark.complianceRequirement}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Your Risk Profile</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Regulatory Exposure</span>
                  <Badge variant={riskAssessment[0]?.regulatoryExposure > 90 ? "destructive" : "secondary"}>
                    {riskAssessment[0]?.regulatoryExposure}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Potential Breach Cost</span>
                  <span className="font-medium text-red-600">
                    ${(riskAssessment[0]?.potentialBreachCost / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Current Breach Probability</span>
                  <span className="font-medium text-orange-600">25%/year</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">With Recommended Solution</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Reduced Breach Probability</span>
                  <span className="font-medium text-green-600">
                    {riskAssessment.find((r) => r.vendorId === "portnox")?.annualBreachProbability}%/year
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Risk Savings</span>
                  <span className="font-medium text-green-600">
                    ${(businessImpact.riskReduction.annualRiskSavings / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Compliance Improvement</span>
                  <span className="font-medium text-blue-600">
                    +{businessImpact.riskReduction.complianceImprovement}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Mitigation Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Risk Mitigation Roadmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                phase: "Phase 1: Foundation (Weeks 1-4)",
                priority: "Critical",
                actions: [
                  "Deploy core NAC infrastructure",
                  "Implement basic device authentication",
                  "Establish network segmentation",
                  "Configure initial security policies",
                ],
                riskReduction: 35,
                cost: 150000,
              },
              {
                phase: "Phase 2: Enhancement (Weeks 5-8)",
                priority: "High",
                actions: [
                  "Enable advanced threat detection",
                  "Implement behavioral analytics",
                  "Deploy automated response capabilities",
                  "Integrate with SIEM/SOAR platforms",
                ],
                riskReduction: 25,
                cost: 75000,
              },
              {
                phase: "Phase 3: Optimization (Weeks 9-12)",
                priority: "Medium",
                actions: [
                  "Fine-tune security policies",
                  "Implement compliance reporting",
                  "Deploy advanced analytics",
                  "Establish continuous monitoring",
                ],
                riskReduction: 15,
                cost: 50000,
              },
            ].map((phase, idx) => (
              <div key={idx} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-lg">{phase.phase}</h4>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        phase.priority === "Critical"
                          ? "destructive"
                          : phase.priority === "High"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {phase.priority}
                    </Badge>
                    <Badge variant="outline">-{phase.riskReduction}% Risk</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Key Actions:</h5>
                    <ul className="space-y-1 text-sm">
                      {phase.actions.map((action, actionIdx) => (
                        <li key={actionIdx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Investment:</span>
                      <span className="font-medium">${(phase.cost / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Risk Reduction:</span>
                      <span className="font-medium text-green-600">{phase.riskReduction}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">ROI:</span>
                      <span className="font-medium text-blue-600">
                        {(
                          ((phase.riskReduction * businessImpact.riskReduction.annualRiskSavings) / 100 / phase.cost) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Heat Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-600" />
            Vendor Risk Heat Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              risk: { label: "Risk Score", color: "hsl(var(--chart-1))" },
              cost: { label: "Total Cost", color: "hsl(var(--chart-2))" },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                data={riskAssessment.map((risk, idx) => ({
                  ...risk,
                  totalCost: results[idx]?.totalCost / 1000000 || 0,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="overallRisk"
                  name="Risk Score"
                  domain={[0, 100]}
                  label={{ value: "Risk Score (Lower is Better)", position: "insideBottom", offset: -10 }}
                />
                <YAxis
                  dataKey="totalCost"
                  name="Total Cost"
                  label={{ value: "Total Cost ($M)", angle: -90, position: "insideLeft" }}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-semibold">{data.vendor}</p>
                          <p>Risk Score: {data.overallRisk}</p>
                          <p>Total Cost: ${data.totalCost.toFixed(1)}M</p>
                          <p>Category: {data.riskCategory}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Scatter dataKey="totalCost" fill="hsl(var(--chart-1))" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>• Lower left quadrant represents optimal solutions (low risk, low cost)</p>
            <p>• Upper right quadrant represents high-risk, high-cost solutions to avoid</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const CostAnalysis = () => (
    <div className="space-y-6">
      {/* Cost Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            5-Year Total Cost Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              totalCost: { label: "Total Cost", color: "hsl(var(--chart-1))" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vendorName" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="totalCost" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              {portnoxResult.vendorName} Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: { label: "Cost", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getBreakdownArray(portnoxResult.breakdown)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getBreakdownArray(portnoxResult.breakdown).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getBreakdownArray(portnoxResult.breakdown).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${(item.value / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-muted-foreground">
                      {((item.value / portnoxResult.totalCost) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Return on Investment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topThreeResults.map((result, idx) => (
              <div key={result.vendorId} className="space-y-4">
                <h4 className="font-semibold text-lg">{result.vendorName}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>ROI</span>
                    <span className={`font-medium ${result.roi.percentage > 0 ? "text-green-600" : "text-red-600"}`}>
                      {result.roi.percentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback Period</span>
                    <span className="font-medium">{result.roi.paybackMonths} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Savings</span>
                    <span className="font-medium text-green-600">${(result.roi.annualSavings / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>NPV</span>
                    <span
                      className={`font-medium ${result.roi.netPresentValue > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ${(result.roi.netPresentValue / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const ImplementationPlan = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Implementation Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                phase: "Planning & Design",
                weeks: "1-2",
                tasks: ["Requirements gathering", "Network assessment", "Solution design", "Stakeholder alignment"],
              },
              {
                phase: "Infrastructure Setup",
                weeks: "3-4",
                tasks: ["Hardware deployment", "Software installation", "Basic configuration", "Network integration"],
              },
              {
                phase: "Policy Configuration",
                weeks: "5-6",
                tasks: ["Security policies", "User groups", "Device profiles", "Access rules"],
              },
              {
                phase: "Testing & Validation",
                weeks: "7-8",
                tasks: ["Pilot deployment", "User acceptance testing", "Performance validation", "Security testing"],
              },
              {
                phase: "Production Rollout",
                weeks: "9-12",
                tasks: ["Phased deployment", "User training", "Monitoring setup", "Documentation"],
              },
              {
                phase: "Optimization",
                weeks: "13-16",
                tasks: ["Performance tuning", "Policy refinement", "Advanced features", "Continuous improvement"],
              },
            ].map((phase, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{phase.phase}</h4>
                  <Badge variant="outline">Weeks {phase.weeks}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {phase.tasks.map((task, taskIdx) => (
                    <div key={taskIdx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Project Manager</span>
                <span>1 FTE × 16 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Network Engineer</span>
                <span>2 FTE × 12 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Security Analyst</span>
                <span>1 FTE × 16 weeks</span>
              </div>
              <div className="flex justify-between">
                <span>System Administrator</span>
                <span>1 FTE × 8 weeks</span>
              </div>
              <div className="border-t pt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Total Effort</span>
                  <span>52 person-weeks</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Device Visibility</span>
                <Badge variant="outline">100%</Badge>
              </div>
              <div className="flex justify-between">
                <span>Policy Compliance</span>
                <Badge variant="outline">≥95%</Badge>
              </div>
              <div className="flex justify-between">
                <span>Incident Reduction</span>
                <Badge variant="outline">≥75%</Badge>
              </div>
              <div className="flex justify-between">
                <span>User Satisfaction</span>
                <Badge variant="outline">≥4.5/5</Badge>
              </div>
              <div className="flex justify-between">
                <span>Time to Remediation</span>
                <Badge variant="outline">≤15 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Executive Report</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis and recommendations for Network Access Control implementation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email Report
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <ExecutiveSummary />
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <EnhancedRiskAssessment />
        </TabsContent>

        <TabsContent value="cost" className="space-y-6">
          <CostAnalysis />
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <ImplementationPlan />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ExecutiveReportView
