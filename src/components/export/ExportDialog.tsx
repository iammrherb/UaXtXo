"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  Database,
  CheckCircle,
  AlertCircle,
  Loader2,
  Settings,
  Eye,
  BarChart3,
  DollarSign,
  Target,
} from "lucide-react"
import {
  ReportGenerator,
  downloadBlob,
  getDefaultFilename,
  type ExportData,
  type ExportOptions,
} from "@/lib/export/report-generator"

interface ExportDialogProps {
  data: ExportData
  trigger?: React.ReactNode
  defaultFormat?: "pdf" | "excel" | "csv" | "json"
}

const formatIcons = {
  pdf: FileText,
  excel: FileSpreadsheet,
  csv: Database,
  json: FileJson,
}

const formatDescriptions = {
  pdf: "Professional report with charts and formatted layout",
  excel: "Spreadsheet with multiple sheets for detailed analysis",
  csv: "Simple comma-separated values for basic data import",
  json: "Structured data format for technical integration",
}

const formatSizes = {
  pdf: "~2-5 MB",
  excel: "~500KB-2MB",
  csv: "~50-200KB",
  json: "~100-500KB",
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ data, trigger, defaultFormat = "pdf" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportStatus, setExportStatus] = useState<"idle" | "preparing" | "generating" | "complete" | "error">("idle")
  const [exportError, setExportError] = useState<string | null>(null)

  const [options, setOptions] = useState<ExportOptions>({
    format: defaultFormat,
    includeCharts: true,
    includeRecommendations: true,
    includeDetailedGaps: true,
    includeCostAnalysis: true,
    customTitle: "",
  })

  const handleExport = async () => {
    setIsExporting(true)
    setExportStatus("preparing")
    setExportProgress(0)
    setExportError(null)

    try {
      // Simulate preparation phase
      setExportProgress(20)
      await new Promise((resolve) => setTimeout(resolve, 500))

      setExportStatus("generating")
      setExportProgress(40)

      const generator = new ReportGenerator(data)
      const blob = await generator.generateReport(options)

      setExportProgress(80)
      await new Promise((resolve) => setTimeout(resolve, 300))

      const filename = getDefaultFilename(options.format, options.customTitle)
      downloadBlob(blob, filename)

      setExportProgress(100)
      setExportStatus("complete")

      // Auto-close after success
      setTimeout(() => {
        setIsOpen(false)
        setExportStatus("idle")
        setExportProgress(0)
      }, 2000)
    } catch (error) {
      console.error("Export failed:", error)
      setExportError(error instanceof Error ? error.message : "Export failed")
      setExportStatus("error")
    } finally {
      setIsExporting(false)
    }
  }

  const getEstimatedSize = () => {
    let baseSize = formatSizes[options.format]
    if (options.includeCharts && options.format === "pdf") {
      baseSize = "~3-7 MB"
    }
    return baseSize
  }

  const getIncludedSections = () => {
    const sections = ["Vendor Comparison", "Risk Scores"]
    if (options.includeDetailedGaps) sections.push("Compliance Gaps")
    if (options.includeCostAnalysis) sections.push("Cost Analysis")
    if (options.includeRecommendations) sections.push("Recommendations")
    if (options.includeCharts && options.format === "pdf") sections.push("Charts & Visualizations")
    return sections
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white flex items-center gap-2">
            <Download className="w-6 h-6" />
            Export Compliance Risk Report
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Format Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Export Format
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formatIcons).map(([format, Icon]) => (
                    <div
                      key={format}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        options.format === format
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                      }`}
                      onClick={() => setOptions((prev) => ({ ...prev, format: format as any }))}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-6 h-6 ${options.format === format ? "text-blue-400" : "text-slate-400"}`} />
                        <span className={`font-semibold ${options.format === format ? "text-blue-300" : "text-white"}`}>
                          {format.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">
                        {formatDescriptions[format as keyof typeof formatDescriptions]}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {formatSizes[format as keyof typeof formatSizes]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Options */}
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Content Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeCharts"
                      checked={options.includeCharts}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeCharts: checked as boolean }))
                      }
                      disabled={options.format === "csv" || options.format === "json"}
                    />
                    <Label htmlFor="includeCharts" className="text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Include Charts & Visualizations
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeDetailedGaps"
                      checked={options.includeDetailedGaps}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeDetailedGaps: checked as boolean }))
                      }
                    />
                    <Label htmlFor="includeDetailedGaps" className="text-white flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Detailed Compliance Gaps
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeCostAnalysis"
                      checked={options.includeCostAnalysis}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeCostAnalysis: checked as boolean }))
                      }
                    />
                    <Label htmlFor="includeCostAnalysis" className="text-white flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Cost Analysis & Breakdown
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeRecommendations"
                      checked={options.includeRecommendations}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includeRecommendations: checked as boolean }))
                      }
                    />
                    <Label htmlFor="includeRecommendations" className="text-white flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Recommendations & Action Items
                    </Label>
                  </div>
                </div>

                <Separator className="bg-slate-600" />

                <div className="space-y-2">
                  <Label htmlFor="customTitle" className="text-white">
                    Custom Report Title (Optional)
                  </Label>
                  <Input
                    id="customTitle"
                    placeholder="e.g., Q4 2024 Compliance Risk Assessment"
                    value={options.customTitle}
                    onChange={(e) => setOptions((prev) => ({ ...prev, customTitle: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Export */}
          <div className="space-y-6">
            <Card className="bg-slate-800/30 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-lg text-white">Export Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Format:</span>
                    <span className="text-white font-medium">{options.format.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Estimated Size:</span>
                    <span className="text-white font-medium">{getEstimatedSize()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Vendors:</span>
                    <span className="text-white font-medium">{Object.keys(data.riskAssessments).length}</span>
                  </div>
                </div>

                <Separator className="bg-slate-600" />

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Included Sections:</h4>
                  <div className="space-y-1">
                    {getIncludedSections().map((section, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        {section}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Progress */}
            {isExporting && (
              <Card className="bg-slate-800/30 border-slate-700/50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                      <span className="text-white font-medium">
                        {exportStatus === "preparing" && "Preparing export..."}
                        {exportStatus === "generating" && "Generating report..."}
                        {exportStatus === "complete" && "Export complete!"}
                      </span>
                    </div>
                    <Progress value={exportProgress} className="h-2" />
                    <p className="text-xs text-slate-400">
                      {exportProgress < 100 ? `${exportProgress}% complete` : "Download started automatically"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Export Error */}
            {exportStatus === "error" && exportError && (
              <Alert className="bg-red-900/20 border-red-500/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-100">
                  <strong>Export Failed:</strong> {exportError}
                </AlertDescription>
              </Alert>
            )}

            {/* Export Success */}
            {exportStatus === "complete" && (
              <Alert className="bg-green-900/20 border-green-500/50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-100">
                  <strong>Export Successful!</strong> Your report has been downloaded.
                </AlertDescription>
              </Alert>
            )}

            {/* Export Button */}
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export {options.format.toUpperCase()} Report
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
