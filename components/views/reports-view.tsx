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
  BarChart3,
  PieChart,
  LineChart,
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
  const [generationProgress, setGenerationProgress] = useState(0)

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
    setGenerationProgress(0)

    try {
      const progressInterval = setInterval(() => {
        setGenerationProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 300)

      await new Promise((resolve) => setTimeout(resolve, 2500))

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

      clearInterval(progressInterval)
      setGenerationProgress(100)

      await new Promise((resolve) => setTimeout(resolve, 300))

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
                                  {section.charts && section.charts.length > 0 && (
                                    <div className="mt-4 border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
                                      <h4 className="text-sm font-medium mb-2">Charts & Visualizations</h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {section.charts.map((chart, idx) => (
                                          <div key={idx} className="border rounded-md p-2 bg-white dark:bg-gray-800">
                                            <div className="flex items-center justify-between mb-2">
                                              <span className="text-xs font-medium">{chart.title}</span>
                                              {chart.type === "bar" && <BarChart3 className="h-3 w-3 text-blue-500" />}
                                              {chart.type === "pie" && <PieChart className="h-3 w-3 text-green-500" />}
                                              {chart.type === "line" && (
                                                <LineChart className="h-3 w-3 text-purple-500" />
                                              )}
                                            </div>
                                            <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                                              <span className="text-xs text-muted-foreground">Chart visualization</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
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
                    <span>{Math.round(generationProgress)}% complete</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    <div className="text-xs text-center">
                      <Badge variant={generationProgress >= 25 ? "secondary" : "outline"} className="w-full">
                        Data Analysis
                      </Badge>
                    </div>
                    <div className="text-xs text-center">
                      <Badge variant={generationProgress >= 50 ? "secondary" : "outline"} className="w-full">
                        Content Generation
                      </Badge>
                    </div>
                    <div className="text-xs text-center">
                      <Badge variant={generationProgress >= 75 ? "secondary" : "outline"} className="w-full">
                        Chart Rendering
                      </Badge>
                    </div>
                    <div className="text-xs text-center">
                      <Badge variant={generationProgress >= 100 ? "secondary" : "outline"} className="w-full">
                        Finalization
                      </Badge>
                    </div>
                  </div>
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
                <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{generatedReport.summary}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
