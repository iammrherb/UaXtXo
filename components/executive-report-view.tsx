"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
} from "lucide-react"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { SectionTitle, fadeInUp, staggerContainer } from "./shared-ui"

export default function ExecutiveReportView({
  results,
  config,
}: {
  results: CalculationResult[]
  config: CalculationConfiguration
}) {
  // Safe data access with fallbacks
  const portnoxResult = results?.find((r) => r?.vendor === "portnox")
  const competitorResults = results?.filter((r) => r?.vendor !== "portnox") || []
  const bestCompetitor = competitorResults.sort((a, b) => (a?.totalCost || 0) - (b?.totalCost || 0))[0]

  const portnoxTotalCost = portnoxResult?.totalCost || 0
  const bestCompetitorCost = bestCompetitor?.totalCost || 0
  const totalSavings = bestCompetitorCost > portnoxTotalCost ? bestCompetitorCost - portnoxTotalCost : 0
  const savingsPercentage = bestCompetitorCost > 0 ? (totalSavings / bestCompetitorCost) * 100 : 0

  // Safe ROI access with fallback
  const portnoxROI = typeof portnoxResult?.roi === "number" ? portnoxResult.roi : 0

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

  // Safe config access with fallbacks
  const deviceCount = config?.devices || 1000
  const analysisYears = config?.years || 3
  const licenseTier = config?.licenseTier || "standard"

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
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
            <CardTitle>Key Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyFindings.map((finding, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <div className="flex-shrink-0">{finding.icon}</div>
                  <div>
                    <h4 className="font-semibold">{finding.title}</h4>
                    <p className="text-lg font-bold text-primary">{finding.value}</p>
                    <p className="text-sm text-muted-foreground">{finding.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
                              <Badge className="bg-green-100 text-green-800">Recommended</Badge>
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
            <CardTitle>Strategic Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
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
