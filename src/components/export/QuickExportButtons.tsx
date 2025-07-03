"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Download, FileText, FileSpreadsheet, Database, FileJson, ChevronDown, Loader2 } from "lucide-react"
import { ReportGenerator, downloadBlob, getDefaultFilename, type ExportData } from "@/lib/export/report-generator"

interface QuickExportButtonsProps {
  data: ExportData
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  showLabels?: boolean
}

export const QuickExportButtons: React.FC<QuickExportButtonsProps> = ({
  data,
  variant = "outline",
  size = "sm",
  showLabels = false,
}) => {
  const [exportingFormat, setExportingFormat] = useState<string | null>(null)

  const quickExport = async (format: "pdf" | "excel" | "csv" | "json") => {
    setExportingFormat(format)

    try {
      toast.loading(`Generating ${format.toUpperCase()} report...`, {
        id: `export-${format}`,
      })

      const generator = new ReportGenerator(data)
      const options = {
        format,
        includeCharts: format === "pdf",
        includeRecommendations: true,
        includeDetailedGaps: format !== "csv",
        includeCostAnalysis: format !== "csv",
      }

      const blob = await generator.generateReport(options)
      const filename = getDefaultFilename(format)
      downloadBlob(blob, filename)

      toast.success(`${format.toUpperCase()} report downloaded successfully!`, {
        id: `export-${format}`,
      })
    } catch (error) {
      console.error(`Export failed:`, error)
      toast.error(`Failed to export ${format.toUpperCase()} report`, {
        id: `export-${format}`,
      })
    } finally {
      setExportingFormat(null)
    }
  }

  const exportFormats = [
    {
      format: "pdf" as const,
      icon: FileText,
      label: "PDF Report",
      description: "Professional formatted report",
      color: "text-red-400",
    },
    {
      format: "excel" as const,
      icon: FileSpreadsheet,
      label: "Excel Workbook",
      description: "Detailed spreadsheet analysis",
      color: "text-green-400",
    },
    {
      format: "csv" as const,
      icon: Database,
      label: "CSV Data",
      description: "Raw data export",
      color: "text-blue-400",
    },
    {
      format: "json" as const,
      icon: FileJson,
      label: "JSON Data",
      description: "Structured data format",
      color: "text-purple-400",
    },
  ]

  return (
    <div className="flex items-center gap-2">
      {/* Individual Export Buttons */}
      <div className="hidden md:flex items-center gap-1">
        {exportFormats.map(({ format, icon: Icon, label, color }) => (
          <Button
            key={format}
            variant={variant}
            size={size}
            onClick={() => quickExport(format)}
            disabled={exportingFormat === format}
            className="flex items-center gap-2"
          >
            {exportingFormat === format ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Icon className={`w-4 h-4 ${color}`} />
            )}
            {showLabels && <span className="hidden lg:inline">{format.toUpperCase()}</span>}
          </Button>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={variant} size={size}>
              <Download className="w-4 h-4 mr-2" />
              Export
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
            {exportFormats.map(({ format, icon: Icon, label, description, color }) => (
              <DropdownMenuItem
                key={format}
                onClick={() => quickExport(format)}
                disabled={exportingFormat === format}
                className="flex items-center gap-3 p-3 text-white hover:bg-slate-700"
              >
                {exportingFormat === format ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Icon className={`w-4 h-4 ${color}`} />
                )}
                <div className="flex-1">
                  <div className="font-medium">{label}</div>
                  <div className="text-xs text-slate-400">{description}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Export Status Badge */}
      {exportingFormat && (
        <Badge variant="outline" className="animate-pulse">
          Exporting {exportingFormat.toUpperCase()}...
        </Badge>
      )}
    </div>
  )
}
