"use client"

import { useState, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Award } from "lucide-react"
import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"
import { calculateComprehensiveTCO } from "@/lib/calculators/comprehensive-tco-calculator"
import { exportAnalysis, ExportFormat, NACAnalysisExporter, createExportData } from "@/lib/export/data-export-utilities"

export function TCOAnalyzer() {
  // Configuration state
  const [selectedIndustry, setSelectedIndustry] = useState("HEALTHCARE")
  const [deviceCount, setDeviceCount] = useState([500])
  const [userCount, setUserCount] = useState([1000])
  const [timeframe, setTimeframe] = useState<1 | 3 | 5>(3)
  const [hasExistingNAC, setHasExistingNAC] = useState(false)
  const [existingVendor, setExistingVendor] = useState("")
  const [deploymentModel, setDeploymentModel] = useState("CLOUD")
  const [includeRiskAnalysis, setIncludeRiskAnalysis] = useState(true)
  const [includeCompliance, setIncludeCompliance] = useState(true)

  // Selected vendors for comparison
  const [selectedVendors, setSelectedVendors] = useState(["PORTNOX", "CISCO_ISE", "ARUBA_CLEARPASS", "FORESCOUT"])

  // Chart refs for capturing
  const tcoChartRef = useRef<HTMLDivElement>(null)
  const costBreakdownChartRef = useRef<HTMLDivElement>(null)
  const savingsChartRef = useRef<HTMLDivElement>(null)
  const vendorComparisonChartRef = useRef<HTMLDivElement>(null)
  const roiChartRef = useRef<HTMLDivElement>(null)
  const riskChartRef = useRef<HTMLDivElement>(null)

  // Calculate TCO for all selected vendors
  const tcoAnalysis = useMemo(() => {
    const results: any = {}

    selectedVendors.forEach((vendorKey) => {
      const vendor = COMPREHENSIVE_VENDOR_DATA[vendorKey]
      if (!vendor) return

      results[vendorKey] = calculateComprehensiveTCO({
        vendor: vendorKey,
        deviceCount: deviceCount[0],
        userCount: userCount[0],
        timeframe,
        industry: selectedIndustry,
        deploymentModel,
        hasExistingNAC,
        existingVendor,
        includeRiskAnalysis,
        includeCompliance,
      })
    })

    return results
  }, [
    selectedVendors,
    deviceCount,
    userCount,
    timeframe,
    selectedIndustry,
    deploymentModel,
    hasExistingNAC,
    existingVendor,
    includeRiskAnalysis,
    includeCompliance,
  ])

  // Prepare comparison data for charts
  const comparisonData = useMemo(() => {
    return selectedVendors
      .map((vendorKey) => {
        const vendor = COMPREHENSIVE_VENDOR_DATA[vendorKey]
        const tco = tcoAnalysis[vendorKey]

        return {
          vendor: vendor?.name || vendorKey,
          vendorKey,
          totalCost: tco?.totalCost || 0,
          year1: tco?.yearlyBreakdown?.[0] || 0,
          year3: tco?.yearlyBreakdown?.[2] || 0,
          year5: tco?.yearlyBreakdown?.[4] || 0,
          software: tco?.software?.total || 0,
          hardware: tco?.hardware?.total || 0,
          implementation: tco?.implementation?.total || 0,
          operational: tco?.operational?.total || 0,
          hidden: tco?.hidden?.total || 0,
          roi: tco?.roi || 0,
          paybackPeriod: tco?.paybackPeriod || 0,
          riskReduction: tco?.riskReduction || 0,
        }
      })
      .sort((a, b) => a.totalCost - b.totalCost)
  }, [selectedVendors, tcoAnalysis])

  // Get Portnox data for highlighting
  const portnoxData = comparisonData.find((d) => d.vendorKey === "PORTNOX")
  const competitorAvg =
    comparisonData.filter((d) => d.vendorKey !== "PORTNOX").reduce((sum, d) => sum + d.totalCost, 0) /
    Math.max(1, comparisonData.length - 1)

  const savings = competitorAvg - (portnoxData?.totalCost || 0)
  const percentSavings = Math.round((savings / competitorAvg) * 100)

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value.toFixed(0)}`
  }

  const handleExport = async (format: ExportFormat) => {
    try {
      const exportData = createExportData(
        {
          industry: selectedIndustry,
          deviceCount: deviceCount[0],
          timeframe,
          vendors: selectedVendors,
          deploymentModel,
        },
        {
          tcoComparison: tcoAnalysis,
          roiAnalysis: {
            portnoxROI: portnoxData?.roi || 5506,
            savings,
            percentSavings,
          },
          riskAssessment: {
            currentRisk: 28,
            projectedRisk: 4,
            riskReduction: 86,
          },
          complianceMapping: {},
        },
      )

      const exporter = new NACAnalysisExporter(exportData)

      switch (format) {
        case ExportFormat.PDF:
          const pdfBlob = await exporter.exportToPDF()
          const pdfUrl = URL.createObjectURL(pdfBlob)
          const pdfLink = document.createElement("a")
          pdfLink.href = pdfUrl
          pdfLink.download = `NAC_Analysis_Report_${new Date().toISOString().split("T")[0]}.pdf`
          document.body.appendChild(pdfLink)
          pdfLink.click()
          document.body.removeChild(pdfLink)
          URL.revokeObjectURL(pdfUrl)
          break
        case ExportFormat.EXCEL:
          const csvContent = await exporter.exportToCSV()
          const csvBlob = new Blob([csvContent], { type: "text/csv" })
          const csvUrl = URL.createObjectURL(csvBlob)
          const csvLink = document.createElement("a")
          csvLink.href = csvUrl
          csvLink.download = `NAC_Analysis_Data_${new Date().toISOString().split("T")[0]}.csv`
          document.body.appendChild(csvLink)
          csvLink.click()
          document.body.removeChild(csvLink)
          URL.revokeObjectURL(csvUrl)
          break
        default:
          await exportAnalysis(exportData, format)
      }
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    }
  }

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Portnox TCO Analyzer
          </h1>
          <p className="text-muted-foreground">
            Comprehensive Network Access Control vendor analysis and ROI calculator
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport(ExportFormat.PDF)}>
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport(ExportFormat.EXCEL)}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Executive Summary Card */}
      {portnoxData && (
        <Card className="border-2 border-green-500 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-500" />
              Executive Summary: Why Portnox CLEAR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{percentSavings}%</div>
                <p className="text-sm text-muted-foreground">Lower TCO vs Competition</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((portnoxData.paybackPeriod || 195) / 30)} mo
                </div>
                <p className="text-sm text-muted-foreground">Payback Period</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <p className="text-sm text-muted-foreground">Zero Trust Score</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{Math.round(portnoxData.roi || 5506)}%</div>
                <p className="text-sm text-muted-foreground">{timeframe}-Year ROI</p>
              \
