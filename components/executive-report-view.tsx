"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import { ComprehensiveVendorDatabase } from "@/lib/comprehensive-vendor-data"
import { SectionTitle, staggerChildren, fadeInUp } from "./shared-ui"
import {
  FileText,
  Download,
  Mail,
  Printer,
  Award,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface ExecutiveReportViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

export default function ExecutiveReportView({ results, config }: ExecutiveReportViewProps) {
  const reportData = useMemo(() => {
    const bestValue = results[0] // Assuming sorted by total cost
    const bestRoi = results.reduce((best, current) => (current.roi.percentage > best.roi.percentage ? current : best))
    const fastestPayback = results.reduce((fastest, current) =>
      current.roi.paybackMonths < fastest.roi.paybackMonths ? current : fastest,
    )

    const totalSavings = Math.max(...results.map((r) => r.total)) - Math.min(...results.map((r) => r.total))
    const avgImplementationTime =
      results.length > 0
        ? results.reduce((sum, r) => {
            const vendor = ComprehensiveVendorDatabase[r.vendor]
            return sum + (vendor.id === "por" ? 2 : vendor.id === "mer" ? 4 : 12)
          }, 0) / results.length
        : 0

    return {
      bestValue,
      bestRoi,
      fastestPayback,
      totalSavings,
      avgImplementationTime: Math.round(avgImplementationTime),
      analysisDate: new Date().toLocaleDateString(),
      deviceCount: config.devices,
      analysisYears: config.years,
    }
  }, [results, config])

  const keyFindings = useMemo(
    () => [
      {
        title: "Cost Leadership",
        finding: `${reportData.bestValue.vendorName} offers the lowest total cost of ownership at $${reportData.bestValue.total.toLocaleString()}`,
        impact: "high",
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        title: "Best ROI",
        finding: `${reportData.bestRoi.vendorName} delivers the highest ROI at ${reportData.bestRoi.roi.percentage.toFixed(0)}%`,
        impact: "high",
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        title: "Fastest Implementation",
        finding: `${reportData.fastestPayback.vendorName} has the shortest payback period of ${reportData.fastestPayback.roi.paybackMonths} months`,
        impact: "medium",
        icon: <Clock className="h-4 w-4" />,
      },
      {
        title: "Operational Efficiency",
        finding: `Average FTE savings across solutions: ${(results.reduce((sum, r) => sum + r.ops.fteSaved, 0) / results.length).toFixed(1)} FTE`,
        impact: "medium",
        icon: <Users className="h-4 w-4" />,
      },
    ],
    [reportData, results],
  )

  const recommendations = useMemo(() => {
    const recs = []

    // Cost-focused recommendation
    if (reportData.bestValue.vendor === "portnox") {
      recs.push({
        title: "Recommended: Portnox Cloud NAC",
        reason: "Lowest TCO with fastest implementation",
        benefits: ["Minimal upfront investment", "Rapid deployment (2 weeks)", "Cloud-native scalability"],
        priority: "high",
      })
    } else {
      recs.push({
        title: `Cost Leader: ${reportData.bestValue.vendorName}`,
        reason: "Lowest total cost of ownership",
        benefits: ["Budget-friendly option", "Proven cost savings", "Competitive pricing"],
        priority: "high",
      })
    }

    // ROI-focused recommendation
    if (reportData.bestRoi.vendor !== reportData.bestValue.vendor) {
      recs.push({
        title: `ROI Leader: ${reportData.bestRoi.vendorName}`,
        reason: "Highest return on investment",
        benefits: [
          `${reportData.bestRoi.roi.percentage.toFixed(0)}% ROI`,
          "Strong business case",
          "Excellent value proposition",
        ],
        priority: "medium",
      })
    }

    // Implementation speed recommendation
    if (reportData.fastestPayback.vendor === "portnox" || reportData.fastestPayback.vendor === "meraki") {
      recs.push({
        title: "Quick Win Strategy",
        reason: "Fastest time to value",
        benefits: ["Rapid deployment", "Quick ROI realization", "Minimal disruption"],
        priority: "medium",
      })
    }

    return recs
  }, [reportData])

  const handleExportPDF = () => {
    // PDF export functionality would be implemented here
    console.log("Exporting PDF report...")
  }

  const handleEmailReport = () => {
    // Email functionality would be implemented here
    console.log("Emailing report...")
  }

  const handlePrintReport = () => {
    window.print()
  }

  return (
    <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerChildren}>
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center justify-between">
          <SectionTitle
            icon={<FileText className="h-6 w-6" />}
            title="Executive Summary Report"
            description="Comprehensive analysis and strategic recommendations"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrintReport}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleEmailReport}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button size="sm" onClick={handleExportPDF}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Executive Summary */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Analysis Overview</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {results.length} NAC vendors evaluated</li>
                  <li>• {reportData.deviceCount.toLocaleString()} devices in scope</li>
                  <li>• {reportData.analysisYears}-year TCO analysis period</li>
                  <li>• Analysis completed on {reportData.analysisDate}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Key Metrics</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Cost range: ${reportData.totalSavings.toLocaleString()} variation</li>
                  <li>• Best ROI: {reportData.bestRoi.roi.percentage.toFixed(0)}%</li>
                  <li>• Fastest payback: {reportData.fastestPayback.roi.paybackMonths} months</li>
                  <li>• Avg. implementation: {reportData.avgImplementationTime} weeks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Findings */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Key Findings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keyFindings.map((finding, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div
                    className={`p-2 rounded-lg ${
                      finding.impact === "high" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {finding.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{finding.title}</h4>
                      <Badge variant={finding.impact === "high" ? "default" : "secondary"}>
                        {finding.impact} impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{finding.finding}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strategic Recommendations */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Strategic Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{rec.title}</h4>
                    <Badge variant={rec.priority === "high" ? "default" : "secondary"}>{rec.priority} priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {rec.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  {index < recommendations.length - 1 && <Separator />}
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
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Vendor Comparison Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Vendor</th>
                    <th className="text-right p-2">Total Cost</th>
                    <th className="text-right p-2">ROI</th>
                    <th className="text-right p-2">Payback</th>
                    <th className="text-right p-2">FTE Saved</th>
                    <th className="text-center p-2">Ranking</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result.vendor} className="border-b">
                      <td className="p-2 font-medium">{result.vendorName}</td>
                      <td className="p-2 text-right font-mono">${result.total.toLocaleString()}</td>
                      <td className="p-2 text-right">{result.roi.percentage.toFixed(0)}%</td>
                      <td className="p-2 text-right">{result.roi.paybackMonths}mo</td>
                      <td className="p-2 text-right">{result.ops.fteSaved.toFixed(1)}</td>
                      <td className="p-2 text-center">
                        <Badge variant={index === 0 ? "default" : "outline"}>#{index + 1}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Steps */}
      <motion.div variants={fadeInUp}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Stakeholder Review</h4>
                  <p className="text-sm text-muted-foreground">
                    Present findings to key stakeholders and gather feedback
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Vendor Demonstrations</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule demos with top 2-3 vendors for detailed evaluation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Pilot Program</h4>
                  <p className="text-sm text-muted-foreground">Implement a pilot with the preferred solution</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Full Deployment</h4>
                  <p className="text-sm text-muted-foreground">
                    Execute phased rollout based on implementation timeline
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
