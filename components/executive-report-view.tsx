"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Building2,
  Loader2,
  FileSliders,
  Presentation,
  Code,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface ExecutiveReportViewProps {
  results: CalculationResult[]
  config: CalculationConfiguration
}

const safeNumber = (value: any, fallback = 0): number => {
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? fallback : num
}

const formatCurrency = (value: any): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(safeNumber(value))

const formatPercentage = (value: any): string => `${safeNumber(value).toFixed(1)}%`

type ReportSection = "keyFindings" | "financialAnalysis" | "roiTimeline" | "implementationRoadmap" | "riskAssessment"
type ReportTemplate = "executiveSummary" | "fullProposal" | "securityBriefing"
type ExportFormat = "pdf" | "powerpoint" | "html"

const templateSections: Record<ReportTemplate, ReportSection[]> = {
  executiveSummary: ["keyFindings", "financialAnalysis"],
  fullProposal: ["keyFindings", "financialAnalysis", "roiTimeline", "implementationRoadmap", "riskAssessment"],
  securityBriefing: ["keyFindings", "riskAssessment"],
}

const ReportHeader = () => (
  <div className="report-header hidden print:flex justify-between items-center p-4 border-b bg-white">
    <img src="/portnox-logo.png" alt="Portnox Logo" className="h-8" />
    <div className="text-right">
      <p className="font-bold text-sm">Confidential TCO Analysis</p>
      <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
    </div>
  </div>
)

const ReportFooter = ({ pageNumber }: { pageNumber: number }) => (
  <div className="report-footer hidden print:flex justify-between items-center p-4 border-t text-xs text-gray-500 bg-white">
    <span>Portnox ZTCA TCO Analysis</span>
    <span>Page {pageNumber}</span>
  </div>
)

export default function ExecutiveReportView({ results = [], config }: ExecutiveReportViewProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Record<ReportSection, boolean>>(
    templateSections.fullProposal.reduce((acc, s) => ({ ...acc, [s]: true }), {} as Record<ReportSection, boolean>),
  )
  const reportRef = useRef<HTMLDivElement>(null)

  const handleTemplateChange = (template: ReportTemplate) => {
    const newVisibleSections = Object.keys(visibleSections).reduce(
      (acc, key) => ({
        ...acc,
        [key]: templateSections[template].includes(key as ReportSection),
      }),
      {} as Record<ReportSection, boolean>,
    )
    setVisibleSections(newVisibleSections)
  }

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true)
    const reportElement = reportRef.current
    if (!reportElement) {
      setIsExporting(false)
      return
    }

    // Add a print-specific class for styling during export
    document.body.classList.add(`print-${format}`)

    if (format === "pdf" || format === "powerpoint") {
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        windowWidth: format === "powerpoint" ? 1280 : reportElement.scrollWidth,
        windowHeight: format === "powerpoint" ? 720 : reportElement.scrollHeight,
      })
      const imgData = canvas.toDataURL("image/png")
      const orientation = format === "powerpoint" ? "l" : "p"
      const pdf = new jsPDF(orientation, "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgProps = pdf.getImageProperties(imgData)
      const imgRatio = imgProps.width / imgProps.height
      const pdfRatio = pdfWidth / pdfHeight

      let imgWidth, imgHeight
      if (orientation === "l" ? imgRatio > pdfRatio : imgRatio < pdfRatio) {
        imgWidth = pdfWidth
        imgHeight = pdfWidth / imgRatio
      } else {
        imgHeight = pdfHeight
        imgWidth = pdfHeight * imgRatio
      }

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`Portnox_TCO_Report_${new Date().toISOString().split("T")[0]}.pdf`)
    } else if (format === "html") {
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join("")
          } catch (e) {
            return ""
          }
        })
        .join("\n")
      const htmlContent = `
        <html>
          <head>
            <title>Portnox TCO Report</title>
            <style>${styles}</style>
          </head>
          <body class="print-html">
            ${reportElement.innerHTML}
          </body>
        </html>
      `
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")
      URL.revokeObjectURL(url)
    }

    document.body.classList.remove(`print-${format}`)
    setIsExporting(false)
  }

  if (!results || results.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No Data Available</h3>
        <p className="text-muted-foreground">Select vendors to generate executive report</p>
      </Card>
    )
  }

  const portnoxResult = results.find((r) => r.vendor === "portnox") || results[0]
  const competitorResults = results.filter((r) => r.vendor !== "portnox")

  const totalDevices = safeNumber(config.devices, 5000)
  const analysisYears = safeNumber(config.years, 3)

  const portnoxTotalCost = safeNumber(portnoxResult.total)
  const portnoxRoi = safeNumber(portnoxResult.roi.percentage)
  const portnoxPayback = safeNumber(portnoxResult.roi.paybackMonths)

  const costBreakdownData = portnoxResult
    ? portnoxResult.breakdown
        .map((item, index) => ({
          ...item,
          value: safeNumber(item.value),
          color: ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][index % 5],
        }))
        .filter((item) => item.value > 0)
    : []

  const comparisonData = results.map((result) => ({
    vendor: result.vendorName || "Unknown",
    totalCost: safeNumber(result.total),
  }))

  const roiTimelineData = Array.from({ length: analysisYears }, (_, i) => ({
    year: `Year ${i + 1}`,
    portnox: safeNumber(portnoxResult.roi.percentage) * ((i + 1) / analysisYears),
    competitor:
      competitorResults.length > 0
        ? safeNumber(competitorResults.reduce((acc, r) => acc + r.roi.percentage, 0) / competitorResults.length) *
          ((i + 1) / analysisYears)
        : 0,
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Executive Report Builder</CardTitle>
              <CardDescription>Customize and export your board-room ready TCO analysis.</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FileSliders className="h-4 w-4 mr-2" />
                    Customize Report
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Report Template</DropdownMenuLabel>
                  <DropdownMenuRadioGroup onValueChange={(val) => handleTemplateChange(val as ReportTemplate)}>
                    <DropdownMenuRadioItem value="fullProposal">Full Proposal</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="executiveSummary">Executive Summary</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="securityBriefing">Security Briefing</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Visible Sections</DropdownMenuLabel>
                  {Object.keys(visibleSections).map((key) => (
                    <DropdownMenuCheckboxItem
                      key={key}
                      checked={visibleSections[key as ReportSection]}
                      onCheckedChange={(checked) => setVisibleSections((prev) => ({ ...prev, [key]: checked }))}
                    >
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button disabled={isExporting}>
                    {isExporting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup onValueChange={(val) => handleExport(val as ExportFormat)}>
                    <DropdownMenuRadioItem value="pdf">
                      <FileText className="h-4 w-4 mr-2" />
                      PDF Document
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="powerpoint">
                      <Presentation className="h-4 w-4 mr-2" />
                      PowerPoint (as PDF)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="html">
                      <Code className="h-4 w-4 mr-2" />
                      HTML File
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div ref={reportRef} className="report-container bg-background p-4 sm:p-6 rounded-lg">
        <ReportHeader />
        <div className="report-content space-y-6">
          {visibleSections.keyFindings && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Key Findings & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">{formatPercentage(portnoxRoi)}</div>
                    <div className="text-sm text-muted-foreground">Expected ROI</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-600">{portnoxPayback} months</div>
                    <div className="text-sm text-muted-foreground">Payback Period</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-purple-600">{formatCurrency(portnoxTotalCost)}</div>
                    <div className="text-sm text-muted-foreground">Total Investment</div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Strategic Recommendations
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5">
                        1
                      </Badge>
                      <span>
                        <strong>Immediate Action:</strong> Portnox offers the best ROI at {formatPercentage(portnoxRoi)}
                        with fastest payback period of {portnoxPayback} months.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5">
                        2
                      </Badge>
                      <span>
                        <strong>Cost Optimization:</strong> Total {analysisYears}-year investment of{" "}
                        {formatCurrency(portnoxTotalCost)}
                        provides comprehensive NAC coverage for {totalDevices.toLocaleString()} devices.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Badge variant="outline" className="mr-2 mt-0.5">
                        3
                      </Badge>
                      <span>
                        <strong>Risk Mitigation:</strong> Advanced zero-trust architecture reduces security incidents by
                        an estimated 75% compared to legacy solutions.
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {visibleSections.financialAnalysis && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown Analysis (Portnox)</CardTitle>
                </CardHeader>
                <CardContent>
                  {costBreakdownData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={costBreakdownData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(safeNumber(percent, 0) * 100).toFixed(0)}%`}
                        >
                          {costBreakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No cost breakdown data available
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>TCO Vendor Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  {comparisonData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="vendor" />
                        <YAxis tickFormatter={(value) => `$${(safeNumber(value, 0) / 1000).toFixed(0)}K`} />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Bar dataKey="totalCost" fill="#0ea5e9" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No comparison data available
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {visibleSections.roiTimeline && (
            <Card>
              <CardHeader>
                <CardTitle>ROI Projection Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                {roiTimelineData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={roiTimelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `${safeNumber(value, 0).toFixed(0)}%`} />
                      <Tooltip formatter={(value) => `${safeNumber(value).toFixed(1)}%`} />
                      <Bar dataKey="portnox" fill="#10b981" strokeWidth={3} name="Portnox" />
                      <Bar
                        dataKey="competitor"
                        fill="#ef4444"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Competitor Average"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No timeline data available
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {visibleSections.implementationRoadmap && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Implementation Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { phase: "Phase 1: Planning & Design", duration: "2-4 weeks", progress: 100 },
                    { phase: "Phase 2: Core Deployment", duration: "4-6 weeks", progress: 75 },
                    { phase: "Phase 3: Integration & Testing", duration: "2-3 weeks", progress: 50 },
                    { phase: "Phase 4: Training & Go-Live", duration: "1-2 weeks", progress: 25 },
                  ].map((phase, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{phase.phase}</span>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                      <Progress value={safeNumber(phase.progress, 0)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {visibleSections.riskAssessment && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Risk Assessment & Mitigation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">Risk Mitigation Benefits</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        75% reduction in security incidents
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        90% faster threat detection
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        60% reduction in compliance costs
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        50% improvement in operational efficiency
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-amber-600">Implementation Risks</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        Network disruption during migration
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        User training and adoption curve
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        Integration complexity with legacy systems
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        Resource allocation during deployment
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <ReportFooter pageNumber={1} />
      </div>
    </div>
  )
}
