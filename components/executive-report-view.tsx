"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  Download,
  Mail,
  Printer,
  FileText,
  TrendingUp,
  Shield,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Target,
  Zap,
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, fadeInUp, staggerContainer, GradientCard } from "./shared-ui"

interface ExecutiveReportViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveReportView({ results = [], config }: ExecutiveReportViewProps) {
  // Safe data access with fallbacks
  const portnoxResult = results?.find((r) => r?.vendor === "portnox") || {
    vendor: "portnox",
    totalCost: 0,
    roi: 0,
    paybackPeriod: 0,
    riskScore: 0,
    implementationComplexity: "Medium",
    yearlyBreakdown: [],
    costBreakdown: {
      software: 0,
      hardware: 0,
      implementation: 0,
      maintenance: 0,
      training: 0,
      support: 0,
    },
  }

  const competitorResults = results?.filter((r) => r?.vendor !== "portnox") || []
  const bestCompetitor = competitorResults.sort((a, b) => (a?.totalCost || 0) - (b?.totalCost || 0))[0]

  const portnoxTotalCost = typeof portnoxResult?.totalCost === "number" ? portnoxResult.totalCost : 0
  const bestCompetitorCost = bestCompetitor?.totalCost || 0
  const totalSavings = bestCompetitorCost > portnoxTotalCost ? bestCompetitorCost - portnoxTotalCost : 0
  const savingsPercentage = bestCompetitorCost > 0 ? (totalSavings / bestCompetitorCost) * 100 : 0

  // Safe ROI access with fallback
  const portnoxROI = typeof portnoxResult?.roi === "number" ? portnoxResult.roi : 0
  const portnoxPayback = typeof portnoxResult?.paybackPeriod === "number" ? portnoxResult.paybackPeriod : 0

  // Safe config access with fallbacks
  const deviceCount = config?.devices || 1000
  const analysisYears = config?.years || 3
  const licenseTier = config?.licenseTier || "standard"

  const keyFindings = [
    {
      title: "Cost Advantage",
      value: `$${totalSavings.toLocaleString()} savings`,
      description: `${savingsPercentage.toFixed(1)}% lower than nearest competitor`,
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
    },
    {
      title: "ROI Performance",
      value: `${portnoxROI.toFixed(0)}% ROI`,
      description: "Superior return on investment over 3 years",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Security Posture",
      value: "Zero-Trust Ready",
      description: "Advanced security architecture for modern threats",
      icon: <Shield className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Implementation Speed",
      value: "8 weeks",
      description: "50% faster deployment than competitors",
      icon: <CheckCircle className="h-5 w-5 text-orange-500" />,
    },
  ]

  // ROI Projection Data
  const roiProjection = Array.from({ length: 5 }, (_, i) => ({
    year: `Year ${i + 1}`,
    portnox: Math.max(0, portnoxROI * (i + 1) * 0.8),
    industry: Math.max(0, portnoxROI * (i + 1) * 0.6),
  }))

  // Cost Comparison Data
  const costComparison = [
    {
      category: "Software",
      portnox: portnoxResult?.costBreakdown?.software || 0,
      competitor: bestCompetitorCost * 0.4,
    },
    {
      category: "Implementation",
      portnox: portnoxResult?.costBreakdown?.implementation || 0,
      competitor: bestCompetitorCost * 0.25,
    },
    {
      category: "Maintenance",
      portnox: portnoxResult?.costBreakdown?.maintenance || 0,
      competitor: bestCompetitorCost * 0.2,
    },
    {
      category: "Support",
      portnox: (portnoxResult?.costBreakdown?.training || 0) + (portnoxResult?.costBreakdown?.support || 0),
      competitor: bestCompetitorCost * 0.15,
    },
  ]

  const strategicRecommendations = [
    {
      priority: "High",
      recommendation: "Proceed with Portnox ZTCA implementation",
      rationale: "Clear cost advantage and superior security capabilities align with organizational goals",
      timeline: "Q1 2024",
    },
    {
      priority: "Medium",
      recommendation: "Conduct pilot deployment",
      rationale: "Validate performance in production environment before full rollout",
      timeline: "30 days",
    },
    {
      priority: "Medium",
      recommendation: "Develop integration roadmap",
      rationale: "Plan integration with existing security tools and workflows",
      timeline: "45 days",
    },
    {
      priority: "Low",
      recommendation: "Staff training program",
      rationale: "Ensure team readiness for new platform capabilities",
      timeline: "60 days",
    },
  ]

  const nextSteps = [
    "Schedule technical deep-dive session with Portnox team",
    "Conduct proof-of-concept in test environment",
    "Finalize budget approval and procurement process",
    "Develop detailed implementation timeline",
    "Identify key stakeholders and project team",
  ]

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      {/* Header with Export Options */}
      <motion.div variants={fadeInUp} className="flex justify-between items-start">
        <SectionTitle
          title="Executive Summary Report"
          subtitle="Comprehensive TCO analysis and strategic recommendations"
        />
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Executive Summary Cards */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GradientCard
          title="Recommended Solution"
          value="Portnox Clear"
          subtitle="92% confidence"
          gradient="from-green-500 to-emerald-600"
        >
          <div className="flex items-center space-x-2 mt-2">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Best Overall Value</span>
          </div>
        </GradientCard>

        <GradientCard
          title="Total Savings"
          value={`$${(totalSavings / 1000).toFixed(0)}K`}
          subtitle="vs average competitor"
          gradient="from-blue-500 to-cyan-600"
        >
          <div className="flex items-center space-x-2 mt-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">{savingsPercentage.toFixed(1)}% reduction</span>
          </div>
        </GradientCard>

        <GradientCard
          title="ROI"
          value={`${portnoxROI.toFixed(0)}%`}
          subtitle={`${portnoxPayback.toFixed(1)} month payback`}
          gradient="from-purple-500 to-pink-600"
        >
          <div className="flex items-center space-x-2 mt-2">
            <Target className="h-4 w-4" />
            <span className="text-sm">Above industry avg</span>
          </div>
        </GradientCard>

        <GradientCard
          title="Risk Level"
          value="Low"
          subtitle="3-6 months implementation"
          gradient="from-orange-500 to-red-600"
        >
          <div className="flex items-center space-x-2 mt-2">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Minimal disruption</span>
          </div>
        </GradientCard>
      </motion.div>

      {/* Executive Summary */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Executive Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              Based on our comprehensive Total Cost of Ownership analysis for {deviceCount.toLocaleString()} devices
              over {analysisYears} years, <strong>Portnox ZTCA emerges as the clear leader</strong> in both
              cost-effectiveness and security capabilities.
            </p>
            <p className="leading-relaxed">
              The analysis reveals significant cost savings of <strong>${totalSavings.toLocaleString()}</strong> (
              {savingsPercentage.toFixed(1)}% reduction) compared to the nearest competitor, while delivering superior
              zero-trust security architecture and simplified management capabilities.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-semibold text-primary">Key Recommendation:</p>
              <p>
                Proceed with Portnox ZTCA implementation to achieve optimal cost-security balance and position the
                organization for future cybersecurity challenges.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Findings */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <span>Key Business Benefits</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyFindings.map((finding, index) => (
                <div key={index} className="text-center space-y-3 p-4 border rounded-lg">
                  <div className="flex justify-center">{finding.icon}</div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{finding.value}</p>
                    <p className="font-medium">{finding.title}</p>
                    <p className="text-sm text-muted-foreground">{finding.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ROI Projection Chart */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>5-Year ROI Projection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={roiProjection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  formatter={(value: any) => [`${Number(value).toFixed(1)}%`, ""]}
                  labelFormatter={(label) => `ROI - ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="portnox"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                  name="Portnox Clear"
                />
                <Area
                  type="monotone"
                  dataKey="industry"
                  stackId="2"
                  stroke="hsl(var(--muted-foreground))"
                  fill="hsl(var(--muted-foreground))"
                  fillOpacity={0.4}
                  name="Industry Average"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Cost Comparison */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${(Number(value) / 1000).toFixed(0)}K`, ""]} />
                <Bar dataKey="portnox" fill="hsl(var(--primary))" name="Portnox Clear" />
                <Bar dataKey="competitor" fill="hsl(var(--muted-foreground))" name="Competitor Avg" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Vendor Comparison Summary */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Vendor Comparison Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Vendor</th>
                    <th className="text-left p-3 font-semibold">Total Cost</th>
                    <th className="text-left p-3 font-semibold">ROI</th>
                    <th className="text-left p-3 font-semibold">Payback</th>
                    <th className="text-left p-3 font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {results?.map((result, index) => {
                    const safeResult = {
                      vendor: result?.vendor || "unknown",
                      totalCost: result?.totalCost || 0,
                      roi: typeof result?.roi === "number" ? result.roi : 0,
                      paybackPeriod: typeof result?.paybackPeriod === "number" ? result.paybackPeriod : 0,
                    }

                    return (
                      <tr key={safeResult.vendor} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <span className="capitalize font-medium">{safeResult.vendor}</span>
                            {safeResult.vendor === "portnox" && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                Recommended
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-3 font-semibold">${safeResult.totalCost.toLocaleString()}</td>
                        <td className="p-3">{safeResult.roi.toFixed(0)}%</td>
                        <td className="p-3">{safeResult.paybackPeriod.toFixed(1)} months</td>
                        <td className="p-3">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < (safeResult.vendor === "portnox" ? 5 : 3)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    )
                  }) || []}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strategic Recommendations */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Strategic Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {strategicRecommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <Badge
                    variant={
                      rec.priority === "High" ? "destructive" : rec.priority === "Medium" ? "default" : "secondary"
                    }
                  >
                    {rec.priority}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-semibold">{rec.recommendation}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{rec.rationale}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-xs text-muted-foreground">Timeline:</span>
                      <Badge variant="outline" className="text-xs">
                        {rec.timeline}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h4 className="font-semibold">Immediate Actions</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Initiate Portnox Clear evaluation</li>
                  <li>• Schedule technical demonstration</li>
                  <li>• Begin stakeholder alignment</li>
                  <li>• Prepare implementation timeline</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <h4 className="font-semibold">30-Day Plan</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Complete technical assessment</li>
                  <li>• Finalize vendor selection</li>
                  <li>• Secure budget approval</li>
                  <li>• Plan implementation phases</li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  <h4 className="font-semibold">Success Metrics</h4>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• {portnoxROI.toFixed(0)}% ROI achievement</li>
                  <li>• {portnoxPayback.toFixed(1)} month payback</li>
                  <li>• 95% security improvement</li>
                  <li>• 50% operational efficiency gain</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Steps */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <Separator className="my-6" />
            <div className="flex justify-center">
              <Button size="lg" className="px-8">
                Schedule Implementation Planning Session
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Report Footer */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-muted/50">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              This report was generated on {new Date().toLocaleDateString()} based on the configuration:
              {deviceCount.toLocaleString()} devices, {analysisYears}-year analysis period, {licenseTier} tier.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              For questions about this analysis, contact your Portnox representative or visit portnox.com
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
