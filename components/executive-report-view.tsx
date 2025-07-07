"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, CheckCircle2, TrendingUp, Mail, Printer } from "lucide-react"
import { INDUSTRIES, INDUSTRY_ROI } from "@/lib/vendors/comprehensive-vendor-data"

interface ExecutiveReportViewProps {
  results: any[]
  config: any
}

export function ExecutiveReportView({ results, config }: ExecutiveReportViewProps) {
  const [reportType, setReportType] = useState<"executive" | "technical" | "financial" | "compliance">("executive")
  const [reportFormat, setReportFormat] = useState<"pdf" | "pptx" | "docx">("pdf")

  const industryData = INDUSTRIES[config.industry?.toUpperCase()] || INDUSTRIES["HEALTHCARE"]
  const industryROI = INDUSTRY_ROI[config.industry?.toUpperCase()] || INDUSTRY_ROI["HEALTHCARE"]

  // Calculate comparison data from results
  const comparisonData = useMemo(() => {
    const data: Record<string, any> = {}
    results.forEach((result) => {
      if (result.vendor) {
        data[result.vendor] = {
          totalCost: result.totalCost || 0,
          software: result.softwareCost || 0,
          implementation: result.implementationCost || 0,
          operational: result.operationalCost || 0,
        }
      }
    })
    return data
  }, [results])

  // Calculate ROI data
  const roiData = useMemo(() => {
    const portnoxResult = results.find((r) => r.vendor === "PORTNOX")
    if (!portnoxResult) return null

    const competitorAvg =
      results.filter((r) => r.vendor !== "PORTNOX").reduce((acc, r) => acc + (r.totalCost || 0), 0) /
      Math.max(1, results.length - 1)

    const savings = competitorAvg - (portnoxResult.totalCost || 0)
    const roi = portnoxResult.roi || 5506
    const paybackMonths = portnoxResult.paybackPeriod || 6.5

    return {
      roi,
      paybackMonths,
      totalBenefit: savings * 3,
      directSavings: savings,
      riskReduction: industryData.avgBreachCost * 0.92,
      productivity: config.deviceCount * 1000,
      compliance: 250000,
      annualBenefit: savings,
      netBenefit: savings * 2.5,
    }
  }, [results, config, industryData])

  // Generate report content based on type
  const reportContent = useMemo(() => {
    const portnoxData = comparisonData?.["PORTNOX"] || { totalCost: 146000 }
    const competitorAvg =
      Object.entries(comparisonData || {})
        .filter(([key]) => key !== "PORTNOX")
        .reduce((acc, [_, data]: [string, any]) => acc + (data?.totalCost || 0), 0) /
      Math.max(1, Object.keys(comparisonData || {}).length - 1)

    const savings = competitorAvg - portnoxData.totalCost
    const percentSavings = Math.round((savings / Math.max(competitorAvg, 1)) * 100)

    switch (reportType) {
      case "executive":
        return {
          title: "Executive Summary: NAC Investment Analysis",
          subtitle: `${industryData.name} | ${config.deviceCount} Devices | ${config.timeframe}-Year Analysis`,
          sections: [
            {
              title: "Strategic Recommendation",
              content: `Portnox CLEAR is the recommended Network Access Control solution, delivering ${percentSavings}% cost savings ($${formatCurrency(savings)}) while providing superior security capabilities and operational efficiency.`,
              highlights: [
                `${roiData?.roi || "5,506"}% ROI with ${roiData?.paybackMonths || "6.5"} month payback`,
                "95% faster deployment than traditional NAC",
                "92% reduction in breach risk",
                "90% reduction in administrative overhead",
              ],
            },
            {
              title: "Financial Impact",
              content: `Total investment of $${formatCurrency(portnoxData.totalCost)} over ${config.timeframe} years delivers $${formatCurrency(roiData?.totalBenefit || savings * 3)} in quantifiable benefits.`,
              metrics: {
                "Direct Cost Savings": `$${formatCurrency(roiData?.directSavings || savings)}`,
                "Risk Mitigation Value": `$${formatCurrency(roiData?.riskReduction || industryData.avgBreachCost * 0.92)}`,
                "Productivity Gains": `$${formatCurrency(roiData?.productivity || config.deviceCount * 1000)}`,
                "Compliance Benefits": `$${formatCurrency(roiData?.compliance || 250000)}`,
              },
            },
            {
              title: "Strategic Benefits",
              content: "Beyond financial returns, Portnox enables digital transformation initiatives:",
              benefits: [
                "Cloud-native architecture eliminates infrastructure constraints",
                "API-first design enables automation and integration",
                "Zero Trust security aligns with modern security frameworks",
                "Vendor-agnostic approach protects existing investments",
              ],
            },
          ],
        }

      case "technical":
        return {
          title: "Technical Analysis: NAC Platform Comparison",
          subtitle: `Architecture, Capabilities, and Implementation Assessment`,
          sections: [
            {
              title: "Architecture Comparison",
              content: "Portnox CLEAR's cloud-native SaaS architecture provides significant advantages:",
              comparison: {
                "Deployment Model": { portnox: "Pure SaaS", traditional: "On-premise/Hybrid" },
                Infrastructure: { portnox: "Zero hardware", traditional: "Appliances required" },
                Scalability: { portnox: "Unlimited", traditional: "Hardware constrained" },
                "High Availability": { portnox: "Built-in global", traditional: "Complex HA setup" },
              },
            },
            {
              title: "Security Capabilities",
              content: "Comprehensive security feature analysis:",
              features: {
                "Zero Trust": { portnox: true, cisco: false, aruba: false },
                "Risk-Based Access": { portnox: true, cisco: false, aruba: false },
                "Cloud PKI": { portnox: true, cisco: false, aruba: false },
                "API Security": { portnox: true, cisco: true, aruba: true },
              },
            },
            {
              title: "Implementation Requirements",
              content: "Deployment complexity and resource requirements:",
              requirements: {
                "Time to Deploy": { portnox: "1-7 days", traditional: "3-9 months" },
                "Professional Services": { portnox: "Optional", traditional: "Mandatory" },
                "Training Required": { portnox: "2 hours", traditional: "5+ days" },
                "Ongoing FTE": { portnox: "0.1", traditional: "2.5" },
              },
            },
          ],
        }

      case "financial":
        return {
          title: "Financial Analysis: Total Cost of Ownership",
          subtitle: `Comprehensive ${config.timeframe}-Year Cost Breakdown`,
          sections: [
            {
              title: "Cost Comparison",
              content: "Detailed cost analysis across all vendors:",
              breakdown: {
                "Software Licensing": { portnox: portnoxData.software || 50000, competitors: competitorAvg * 0.4 },
                "Hardware/Infrastructure": { portnox: 0, competitors: competitorAvg * 0.3 },
                Implementation: { portnox: portnoxData.implementation || 25000, competitors: competitorAvg * 0.2 },
                Operations: { portnox: portnoxData.operational || 50000, competitors: competitorAvg * 0.1 },
              },
            },
            {
              title: "ROI Calculation",
              content: `Investment in Portnox delivers exceptional returns:`,
              roi: {
                "Total Investment": `$${formatCurrency(portnoxData.totalCost)}`,
                "Annual Benefits": `$${formatCurrency(roiData?.annualBenefit || savings)}`,
                "3-Year Net Benefit": `$${formatCurrency(roiData?.netBenefit || savings * 2.5)}`,
                "Return on Investment": `${roiData?.roi || "5,506"}%`,
              },
            },
            {
              title: "Hidden Cost Analysis",
              content: "Often overlooked costs eliminated with Portnox:",
              hidden: [
                "No hardware refresh cycles",
                "No maintenance windows or downtime",
                "No complex licensing audits",
                "No specialized training requirements",
              ],
            },
          ],
        }

      case "compliance":
        return {
          title: "Compliance & Risk Management Report",
          subtitle: `${industryData.name} Regulatory Requirements Analysis`,
          sections: [
            {
              title: "Regulatory Compliance",
              content: `Portnox addresses ${industryData.regulations.join(", ")} requirements:`,
              frameworks: industryData.regulations.map((reg) => ({
                name: reg,
                coverage: "95%+",
                automation: "Fully automated reporting",
                controls: "All required controls implemented",
              })),
            },
            {
              title: "Risk Mitigation",
              content: "Quantifiable risk reduction across all categories:",
              risks: {
                "Breach Risk": { reduction: "92%", value: `$${formatCurrency(industryData.avgBreachCost * 0.92)}` },
                "Compliance Risk": { reduction: "94%", value: `$${formatCurrency(500000 * 0.94)}` },
                "Operational Risk": { reduction: "86%", value: `$${formatCurrency(250000 * 0.86)}` },
                "Reputational Risk": { reduction: "85%", value: "Protected brand value" },
              },
            },
            {
              title: "Audit Readiness",
              content: "Continuous compliance monitoring and reporting:",
              capabilities: [
                "Real-time compliance dashboards",
                "Automated audit trail generation",
                "Policy violation alerts",
                "Scheduled compliance reports",
              ],
            },
          ],
        }

      default:
        return null
    }
  }, [reportType, config, comparisonData, roiData, industryData])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return `${Math.round(value).toLocaleString()}`
  }

  const generateReport = () => {
    // In a real implementation, this would generate the actual report file
    console.log("Generating report:", {
      type: reportType,
      format: reportFormat,
      content: reportContent,
    })

    // Simulate file download
    const reportData = {
      ...reportContent,
      metadata: {
        generatedAt: new Date().toISOString(),
        industry: config.industry,
        deviceCount: config.deviceCount,
        timeframe: config.timeframe,
        selectedVendors: results.map((r) => r.vendor),
      },
    }

    const dataStr = JSON.stringify(reportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `NAC_Analysis_Report_${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Executive Report Generator
          </CardTitle>
          <CardDescription>Create customized reports for different stakeholders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={(v: any) => setReportType(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive">Executive Summary</SelectItem>
                  <SelectItem value="technical">Technical Analysis</SelectItem>
                  <SelectItem value="financial">Financial Deep Dive</SelectItem>
                  <SelectItem value="compliance">Compliance & Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <Select value={reportFormat} onValueChange={(v: any) => setReportFormat(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="pptx">PowerPoint Presentation</SelectItem>
                  <SelectItem value="docx">Word Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex gap-2">
                <Button onClick={generateReport} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Printer className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      {reportContent && (
        <Card>
          <CardHeader>
            <CardTitle>{reportContent.title}</CardTitle>
            <CardDescription>{reportContent.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {reportContent.sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold text-lg">{section.title}</h3>
                <p className="text-muted-foreground">{section.content}</p>

                {section.highlights && (
                  <ul className="space-y-2">
                    {section.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.metrics && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(section.metrics).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded p-3">
                        <p className="text-sm text-muted-foreground">{key}</p>
                        <p className="font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.benefits && (
                  <ul className="space-y-2">
                    {section.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.comparison && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Aspect</th>
                          <th className="text-center py-2 px-4">Portnox</th>
                          <th className="text-center py-2 px-4">Traditional NAC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(section.comparison).map(([aspect, values]: [string, any]) => (
                          <tr key={aspect} className="border-b">
                            <td className="py-2">{aspect}</td>
                            <td className="text-center px-4 text-green-600 font-medium">{values.portnox}</td>
                            <td className="text-center px-4 text-gray-600">{values.traditional}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.requirements && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Requirement</th>
                          <th className="text-center py-2 px-4">Portnox</th>
                          <th className="text-center py-2 px-4">Traditional NAC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(section.requirements).map(([req, values]: [string, any]) => (
                          <tr key={req} className="border-b">
                            <td className="py-2">{req}</td>
                            <td className="text-center px-4 text-green-600 font-medium">{values.portnox}</td>
                            <td className="text-center px-4 text-gray-600">{values.traditional}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.frameworks && (
                  <div className="space-y-3">
                    {section.frameworks.map((framework, i) => (
                      <div key={i} className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{framework.name}</h4>
                          <Badge variant="default">{framework.coverage}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{framework.automation}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.risks && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(section.risks).map(([risk, data]: [string, any]) => (
                      <div key={risk} className="border rounded p-3">
                        <h4 className="font-medium">{risk}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-muted-foreground">Reduction:</span>
                          <Badge variant="default" className="bg-green-600">
                            {data.reduction}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium mt-1">{data.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.capabilities && (
                  <ul className="space-y-2">
                    {section.capabilities.map((capability, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span className="text-sm">{capability}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {index < reportContent.sections.length - 1 && <Separator />}
              </div>
            ))}

            {/* Call to Action */}
            <Alert className="bg-green-50 border-green-200">
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <strong>Next Steps:</strong> Schedule a demonstration of Portnox CLEAR to validate these findings for
                your specific environment. Implementation can begin immediately with production deployment achievable
                within 7 days.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats for Executive Dashboard */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle>Executive Dashboard Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">73%</div>
              <p className="text-sm text-muted-foreground">Cost Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">7 days</div>
              <p className="text-sm text-muted-foreground">Time to Deploy</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">92%</div>
              <p className="text-sm text-muted-foreground">Risk Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">5,506%</div>
              <p className="text-sm text-muted-foreground">3-Year ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Default export for backward compatibility
export default ExecutiveReportView

// Add this line at the end of the file
export const ExecutiveReportGenerator = ExecutiveReportView
