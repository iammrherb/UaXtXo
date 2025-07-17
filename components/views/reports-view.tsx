"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Mail,
  Share2,
  Calendar,
  TrendingUp,
  Shield,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  FileSpreadsheet,
  Presentation,
} from "lucide-react"
import { toast } from "sonner"

import { ReportGenerator, type GeneratedReport } from "@/lib/report-generator"
import type { CalculationResult, CalculationConfiguration } from "@/lib/enhanced-tco-calculator"
import AnimatedPortnoxLogo from "../animated-portnox-logo"

interface ReportsViewProps {
  results: CalculationResult[]
  configuration: CalculationConfiguration
}

export default function ReportsView({ results, configuration }: ReportsViewProps) {
  const [selectedReportType, setSelectedReportType] = useState<"executive" | "technical" | "financial" | "board">(
    "executive",
  )
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "powerpoint">("pdf")
  const [showPreview, setShowPreview] = useState(false)

  const reportGenerator = new ReportGenerator()

  const reportTypes = [
    {
      id: "executive" as const,
      title: "Executive Summary",
      description: "High-level strategic overview for C-suite executives",
      icon: TrendingUp,
      audience: "C-Suite, VPs",
      duration: "5-10 min read",
      sections: 4,
      color: "bg-blue-500",
    },
    {
      id: "technical" as const,
      title: "Technical Assessment",
      description: "Detailed technical analysis for IT and security teams",
      icon: Shield,
      audience: "IT, Security Teams",
      duration: "15-20 min read",
      sections: 6,
      color: "bg-green-500",
    },
    {
      id: "financial" as const,
      title: "Financial Analysis",
      description: "Comprehensive TCO and ROI analysis for finance teams",
      icon: DollarSign,
      audience: "CFO, Finance",
      duration: "10-15 min read",
      sections: 5,
      color: "bg-purple-500",
    },
    {
      id: "board" as const,
      title: "Board Presentation",
      description: "Strategic recommendation for board of directors",
      icon: Users,
      audience: "Board Members",
      duration: "20-30 min presentation",
      sections: 8,
      color: "bg-orange-500",
    },
  ]

  const handleGenerateReport = async () => {
    setIsGenerating(true)

    try {
      // Simulate report generation delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      let report: GeneratedReport

      switch (selectedReportType) {
        case "executive":
          report = reportGenerator.generateExecutiveReport(results, configuration)
          break
        case "technical":
          report = reportGenerator.generateTechnicalReport(results, configuration)
          break
        case "financial":
          report = reportGenerator.generateFinancialReport(results, configuration)
          break
        case "board":
          report = reportGenerator.generateBoardReport(results, configuration)
          break
        default:
          report = reportGenerator.generateExecutiveReport(results, configuration)
      }

      setGeneratedReport(report)
      toast.success("Report generated successfully!")
    } catch (error) {
      toast.error("Failed to generate report")
      console.error("Report generation error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleExportReport = async (format: "pdf" | "excel" | "powerpoint") => {
    if (!generatedReport) return

    setIsExporting(true)
    setExportFormat(format)

    try {
      let blob: Blob
      let filename: string

      switch (format) {
        case "pdf":
          blob = await reportGenerator.exportToPDF(generatedReport)
          filename = `${generatedReport.type}-report-${Date.now()}.pdf`
          break
        case "excel":
          blob = await reportGenerator.exportToExcel(generatedReport)
          filename = `${generatedReport.type}-report-${Date.now()}.xlsx`
          break
        case "powerpoint":
          blob = await reportGenerator.exportToPowerPoint(generatedReport)
          filename = `${generatedReport.type}-report-${Date.now()}.pptx`
          break
      }

      // Create download link
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(`Report exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error(`Failed to export report as ${format.toUpperCase()}`)
      console.error("Export error:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleShareReport = () => {
    if (!generatedReport) return

    const shareData = {
      title: generatedReport.title,
      text: generatedReport.summary,
      url: window.location.href,
    }

    if (navigator.share) {
      navigator.share(shareData)
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`)
      toast.success("Report link copied to clipboard")
    }
  }

  const handleScheduleEmail = () => {
    toast.success("Email scheduling feature coming soon!")
  }

  const selectedReport = reportTypes.find((r) => r.id === selectedReportType)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AnimatedPortnoxLogo width={32} height={32} showText={false} animate={false} />
          <div>
            <h2 className="text-2xl font-bold">Reports & Analytics</h2>
            <p className="text-muted-foreground">Generate comprehensive analysis reports for stakeholders</p>
          </div>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          {results.length} Vendors Analyzed
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Types
              </CardTitle>
              <CardDescription>Choose the report type that best fits your audience and objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportTypes.map((report) => {
                const Icon = report.icon
                const isSelected = selectedReportType === report.id

                return (
                  <Card
                    key={report.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20" : ""
                    }`}
                    onClick={() => setSelectedReportType(report.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${report.color} text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm">{report.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{report.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {report.audience}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {report.duration}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {report.sections} sections
                            </Badge>
                            {isSelected && <CheckCircle className="h-4 w-4 text-blue-500" />}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Report Generation & Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {selectedReport && <selectedReport.icon className="h-5 w-5" />}
                    {selectedReport?.title}
                  </CardTitle>
                  <CardDescription>{selectedReport?.description}</CardDescription>
                </div>
                {generatedReport && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Generated
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generation Controls */}
              <div className="flex items-center gap-3">
                <Button onClick={handleGenerateReport} disabled={isGenerating} className="flex items-center gap-2">
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                  {isGenerating ? "Generating..." : "Generate Report"}
                </Button>

                {generatedReport && (
                  <Dialog open={showPreview} onOpenChange={setShowPreview}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{generatedReport.title}</DialogTitle>
                        <DialogDescription>{generatedReport.subtitle}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{generatedReport.summary}</AlertDescription>
                        </Alert>

                        <Tabs defaultValue="content" className="w-full">
                          <TabsList>
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                            <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
                          </TabsList>

                          <TabsContent value="content" className="space-y-4">
                            {generatedReport.sections.map((section, index) => (
                              <Card key={index}>
                                <CardHeader>
                                  <CardTitle className="text-lg">{section.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-muted-foreground mb-4">{section.content}</p>
                                  {section.data && (
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      {Object.entries(section.data).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                          <span className="font-medium">{key}:</span>
                                          <span>{String(value)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </TabsContent>

                          <TabsContent value="recommendations">
                            <Card>
                              <CardContent className="pt-6">
                                <ul className="space-y-2">
                                  {generatedReport.recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm">{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          </TabsContent>

                          <TabsContent value="next-steps">
                            <Card>
                              <CardContent className="pt-6">
                                <ul className="space-y-2">
                                  {generatedReport.nextSteps.map((step, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex-shrink-0">
                                        {index + 1}
                                      </div>
                                      <span className="text-sm">{step}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              {/* Generation Progress */}
              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Generating {selectedReport?.title}...</span>
                    <span>Processing data</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              )}

              {/* Export Options */}
              {generatedReport && (
                <div className="space-y-4">
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Export & Share Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Export Formats */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Export Formats
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExportReport("pdf")}
                            disabled={isExporting && exportFormat === "pdf"}
                            className="w-full justify-start"
                          >
                            {isExporting && exportFormat === "pdf" ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <FileText className="h-4 w-4 mr-2" />
                            )}
                            Export as PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExportReport("excel")}
                            disabled={isExporting && exportFormat === "excel"}
                            className="w-full justify-start"
                          >
                            {isExporting && exportFormat === "excel" ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                            )}
                            Export as Excel
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExportReport("powerpoint")}
                            disabled={isExporting && exportFormat === "powerpoint"}
                            className="w-full justify-start"
                          >
                            {isExporting && exportFormat === "powerpoint" ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <Presentation className="h-4 w-4 mr-2" />
                            )}
                            Export as PowerPoint
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Share Options */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Share2 className="h-4 w-4" />
                            Share & Collaborate
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleShareReport}
                            className="w-full justify-start bg-transparent"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share Report Link
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleScheduleEmail}
                            className="w-full justify-start bg-transparent"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Schedule Email
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleScheduleEmail}
                            className="w-full justify-start bg-transparent"
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Presentation
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* Report Summary */}
              {generatedReport && (
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Report Summary:</strong> {generatedReport.summary}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Reports Generated</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Cost Savings</p>
                <p className="text-2xl font-bold">73%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Risk Reduction</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Deployment Time</p>
                <p className="text-2xl font-bold">7 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
