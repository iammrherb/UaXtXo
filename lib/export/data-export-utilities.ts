import { ChartCaptureService, type CapturedChart } from "./chart-capture-utilities"

// Export formats
export enum ExportFormat {
  PDF = "pdf",
  EXCEL = "excel",
  CSV = "csv",
  JSON = "json",
  POWERPOINT = "pptx",
  WORD = "docx",
}

// Export configuration interface
export interface ExportConfiguration {
  includeCharts: boolean
  includeDetailedBreakdown: boolean
  includeRecommendations: boolean
  includeComplianceAnalysis: boolean
  format: "pdf" | "excel" | "csv"
  chartQuality: "high" | "medium" | "low"
}

// Export data structure
export interface ExportData {
  summary: {
    totalVendors: number
    recommendedVendor: string
    totalSavings: number
    averagePayback: number
    industryFocus: string
    analysisDate: string
  }
  vendors: Array<{
    name: string
    totalCost: number
    year1Cost: number
    year3Cost: number
    year5Cost: number
    roi: number
    paybackPeriod: number
    securityScore: number
    complianceScore: number
    implementationTime: number
  }>
  charts: CapturedChart[]
  recommendations: string[]
  complianceAnalysis: {
    frameworks: string[]
    coverageScore: number
    automationLevel: number
    riskReduction: number
  }
}

// Main export utility class
export class NACAnalysisExporter {
  private static instance: NACAnalysisExporter
  private chartCaptureService: ChartCaptureService

  constructor() {
    this.chartCaptureService = ChartCaptureService.getInstance()
  }

  static getInstance(): NACAnalysisExporter {
    if (!NACAnalysisExporter.instance) {
      NACAnalysisExporter.instance = new NACAnalysisExporter()
    }
    return NACAnalysisExporter.instance
  }

  async exportToPDF(data: ExportData, config: ExportConfiguration): Promise<void> {
    // Dynamic import to avoid SSR issues
    const { jsPDF } = await import("jspdf")

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    let yPosition = 20
    const pageHeight = pdf.internal.pageSize.height
    const pageWidth = pdf.internal.pageSize.width
    const margin = 20

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredHeight: number) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        pdf.addPage()
        yPosition = 20
      }
    }

    // Title Page
    pdf.setFontSize(24)
    pdf.setFont("helvetica", "bold")
    pdf.text("NAC Vendor Analysis Report", margin, yPosition)
    yPosition += 15

    pdf.setFontSize(12)
    pdf.setFont("helvetica", "normal")
    pdf.text(`Generated on: ${data.summary.analysisDate}`, margin, yPosition)
    yPosition += 10
    pdf.text(`Industry Focus: ${data.summary.industryFocus}`, margin, yPosition)
    yPosition += 20

    // Executive Summary
    checkPageBreak(40)
    pdf.setFontSize(16)
    pdf.setFont("helvetica", "bold")
    pdf.text("Executive Summary", margin, yPosition)
    yPosition += 10

    pdf.setFontSize(10)
    pdf.setFont("helvetica", "normal")

    // Summary metrics in a box
    pdf.setDrawColor(0, 123, 255)
    pdf.setFillColor(240, 248, 255)
    pdf.rect(margin, yPosition, pageWidth - 2 * margin, 30, "FD")

    yPosition += 8
    pdf.text(`Recommended Vendor: ${data.summary.recommendedVendor}`, margin + 5, yPosition)
    yPosition += 6
    pdf.text(`Total Projected Savings: $${data.summary.totalSavings.toLocaleString()}`, margin + 5, yPosition)
    yPosition += 6
    pdf.text(`Average Payback Period: ${data.summary.averagePayback.toFixed(1)} months`, margin + 5, yPosition)
    yPosition += 6
    pdf.text(`Vendors Analyzed: ${data.summary.totalVendors}`, margin + 5, yPosition)
    yPosition += 20

    // Charts Section
    if (config.includeCharts && data.charts.length > 0) {
      checkPageBreak(60)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text("Financial Analysis Charts", margin, yPosition)
      yPosition += 15

      for (const chart of data.charts) {
        checkPageBreak(80)

        try {
          // Calculate chart dimensions for PDF
          const maxWidth = pageWidth - 2 * margin
          const maxHeight = 60
          const aspectRatio = chart.width / chart.height

          let chartWidth = Math.min(maxWidth, chart.width * 0.1)
          let chartHeight = chartWidth / aspectRatio

          if (chartHeight > maxHeight) {
            chartHeight = maxHeight
            chartWidth = chartHeight * aspectRatio
          }

          // Center the chart
          const xPosition = (pageWidth - chartWidth) / 2

          pdf.addImage(chart.dataUrl, "PNG", xPosition, yPosition, chartWidth, chartHeight)
          yPosition += chartHeight + 10

          // Add chart caption
          pdf.setFontSize(9)
          pdf.setFont("helvetica", "italic")
          pdf.text(`Chart: ${chart.id}`, margin, yPosition)
          yPosition += 10
        } catch (error) {
          console.error(`Failed to add chart ${chart.id} to PDF:`, error)
        }
      }
    }

    // Vendor Comparison Table
    checkPageBreak(80)
    pdf.setFontSize(16)
    pdf.setFont("helvetica", "bold")
    pdf.text("Vendor Comparison", margin, yPosition)
    yPosition += 15

    // Table headers
    pdf.setFontSize(8)
    pdf.setFont("helvetica", "bold")
    const colWidths = [40, 25, 25, 25, 25, 25, 25]
    const headers = ["Vendor", "Total Cost", "Year 1", "Year 3", "ROI", "Payback", "Security"]

    let xPos = margin
    headers.forEach((header, index) => {
      pdf.text(header, xPos, yPosition)
      xPos += colWidths[index]
    })
    yPosition += 8

    // Table data
    pdf.setFont("helvetica", "normal")
    data.vendors.forEach((vendor) => {
      checkPageBreak(8)
      xPos = margin
      const rowData = [
        vendor.name,
        `$${(vendor.totalCost / 1000).toFixed(0)}k`,
        `$${(vendor.year1Cost / 1000).toFixed(0)}k`,
        `$${(vendor.year3Cost / 1000).toFixed(0)}k`,
        `$${(vendor.roi / 1000).toFixed(0)}k`,
        `${vendor.paybackPeriod.toFixed(1)}m`,
        `${vendor.securityScore}%`,
      ]

      rowData.forEach((data, index) => {
        pdf.text(data, xPos, yPosition)
        xPos += colWidths[index]
      })
      yPosition += 6
    })

    // Recommendations Section
    if (config.includeRecommendations && data.recommendations.length > 0) {
      checkPageBreak(40)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text("Recommendations", margin, yPosition)
      yPosition += 15

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      data.recommendations.forEach((recommendation, index) => {
        checkPageBreak(15)
        pdf.text(`${index + 1}. ${recommendation}`, margin, yPosition)
        yPosition += 8
      })
    }

    // Compliance Analysis
    if (config.includeComplianceAnalysis) {
      checkPageBreak(40)
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text("Compliance Analysis", margin, yPosition)
      yPosition += 15

      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      pdf.text(`Compliance Frameworks: ${data.complianceAnalysis.frameworks.join(", ")}`, margin, yPosition)
      yPosition += 8
      pdf.text(`Coverage Score: ${data.complianceAnalysis.coverageScore}%`, margin, yPosition)
      yPosition += 8
      pdf.text(`Automation Level: ${data.complianceAnalysis.automationLevel}%`, margin, yPosition)
      yPosition += 8
      pdf.text(`Risk Reduction: ${data.complianceAnalysis.riskReduction}%`, margin, yPosition)
    }

    // Save the PDF
    pdf.save("nac-vendor-analysis-report.pdf")
  }

  async exportToExcel(data: ExportData, config: ExportConfiguration): Promise<void> {
    // Dynamic import to avoid SSR issues
    const XLSX = await import("xlsx")

    const workbook = XLSX.utils.book_new()

    // Summary Sheet
    const summaryData = [
      ["NAC Vendor Analysis Report"],
      [""],
      ["Analysis Date", data.summary.analysisDate],
      ["Industry Focus", data.summary.industryFocus],
      ["Total Vendors Analyzed", data.summary.totalVendors],
      ["Recommended Vendor", data.summary.recommendedVendor],
      ["Total Projected Savings", `$${data.summary.totalSavings.toLocaleString()}`],
      ["Average Payback Period", `${data.summary.averagePayback.toFixed(1)} months`],
    ]

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary")

    // Vendor Comparison Sheet
    const vendorHeaders = [
      "Vendor Name",
      "Total Cost",
      "Year 1 Cost",
      "Year 3 Cost",
      "Year 5 Cost",
      "ROI",
      "Payback Period (months)",
      "Security Score",
      "Compliance Score",
      "Implementation Time (days)",
    ]

    const vendorData = [
      vendorHeaders,
      ...data.vendors.map((vendor) => [
        vendor.name,
        vendor.totalCost,
        vendor.year1Cost,
        vendor.year3Cost,
        vendor.year5Cost,
        vendor.roi,
        vendor.paybackPeriod,
        vendor.securityScore,
        vendor.complianceScore,
        vendor.implementationTime,
      ]),
    ]

    const vendorSheet = XLSX.utils.aoa_to_sheet(vendorData)
    XLSX.utils.book_append_sheet(workbook, vendorSheet, "Vendor Comparison")

    // Compliance Analysis Sheet
    if (config.includeComplianceAnalysis) {
      const complianceData = [
        ["Compliance Analysis"],
        [""],
        ["Frameworks", data.complianceAnalysis.frameworks.join(", ")],
        ["Coverage Score", `${data.complianceAnalysis.coverageScore}%`],
        ["Automation Level", `${data.complianceAnalysis.automationLevel}%`],
        ["Risk Reduction", `${data.complianceAnalysis.riskReduction}%`],
      ]

      const complianceSheet = XLSX.utils.aoa_to_sheet(complianceData)
      XLSX.utils.book_append_sheet(workbook, complianceSheet, "Compliance")
    }

    // Recommendations Sheet
    if (config.includeRecommendations && data.recommendations.length > 0) {
      const recommendationsData = [
        ["Recommendations"],
        [""],
        ...data.recommendations.map((rec, index) => [`${index + 1}`, rec]),
      ]

      const recommendationsSheet = XLSX.utils.aoa_to_sheet(recommendationsData)
      XLSX.utils.book_append_sheet(workbook, recommendationsSheet, "Recommendations")
    }

    // Save the Excel file
    XLSX.writeFile(workbook, "nac-vendor-analysis-report.xlsx")
  }

  async exportToCSV(data: ExportData): Promise<void> {
    const csvData = [
      [
        "Vendor Name",
        "Total Cost",
        "Year 1 Cost",
        "Year 3 Cost",
        "Year 5 Cost",
        "ROI",
        "Payback Period",
        "Security Score",
        "Compliance Score",
        "Implementation Time",
      ],
      ...data.vendors.map((vendor) => [
        vendor.name,
        vendor.totalCost.toString(),
        vendor.year1Cost.toString(),
        vendor.year3Cost.toString(),
        vendor.year5Cost.toString(),
        vendor.roi.toString(),
        vendor.paybackPeriod.toString(),
        vendor.securityScore.toString(),
        vendor.complianceScore.toString(),
        vendor.implementationTime.toString(),
      ]),
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "nac-vendor-analysis-report.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  async prepareExportData(
    tcoData: Record<string, any>,
    config: any,
    industryData: any,
    summaryMetrics: any,
  ): Promise<ExportData> {
    // Capture charts if needed
    const charts = await this.chartCaptureService.captureChartsBySelector("[data-chart]", "export-chart", {
      width: 800,
      height: 400,
      scale: 2,
      backgroundColor: "#ffffff",
    })

    // Prepare vendor data
    const vendors = Object.entries(tcoData).map(([vendorId, data]: [string, any]) => ({
      name: data.vendorName || vendorId,
      totalCost: data.totalCost || 0,
      year1Cost: data.year1 || 0,
      year3Cost: data.year3 || 0,
      year5Cost: data.year5 || 0,
      roi: data.roi?.totalSavings || 0,
      paybackPeriod: data.roi?.paybackPeriod || 0,
      securityScore: data.securityScore || 0,
      complianceScore: data.complianceScore || 0,
      implementationTime: data.implementationTime || 0,
    }))

    // Find recommended vendor (lowest total cost)
    const recommendedVendor = vendors.reduce((best, current) =>
      current.totalCost < best.totalCost ? current : best,
    ).name

    return {
      summary: {
        totalVendors: vendors.length,
        recommendedVendor,
        totalSavings: summaryMetrics?.totalSavings || 0,
        averagePayback: summaryMetrics?.paybackPeriod || 0,
        industryFocus: config?.industry || "General",
        analysisDate: new Date().toLocaleDateString(),
      },
      vendors,
      charts,
      recommendations: [
        `${recommendedVendor} offers the best total cost of ownership`,
        "Consider implementation timeline and resource requirements",
        "Validate compliance requirements with selected vendor",
        "Plan for adequate training and change management",
        "Establish clear success metrics and monitoring",
      ],
      complianceAnalysis: {
        frameworks: config?.complianceRequirements || [],
        coverageScore: 85,
        automationLevel: 90,
        riskReduction: 75,
      },
    }
  }
}

// Data export service class
export class DataExportService {
  private static instance: DataExportService
  private chartCaptureService: ChartCaptureService

  constructor() {
    this.chartCaptureService = ChartCaptureService.getInstance()
  }

  static getInstance(): DataExportService {
    if (!DataExportService.instance) {
      DataExportService.instance = new DataExportService()
    }
    return DataExportService.instance
  }

  async exportToPDF(data: ExportData, config: ExportConfiguration): Promise<void> {
    const exporter = new NACAnalysisExporter()
    return exporter.exportToPDF(data, config)
  }

  async exportToExcel(data: ExportData, config: ExportConfiguration): Promise<void> {
    const exporter = new NACAnalysisExporter()
    return exporter.exportToExcel(data, config)
  }

  async exportToCSV(data: ExportData): Promise<void> {
    const exporter = new NACAnalysisExporter()
    return exporter.exportToCSV(data)
  }

  async prepareExportData(
    tcoData: Record<string, any>,
    config: any,
    industryData: any,
    summaryMetrics: any,
  ): Promise<ExportData> {
    const exporter = new NACAnalysisExporter()
    return exporter.prepareExportData(tcoData, config, industryData, summaryMetrics)
  }
}

// Utility functions
export const exportData = async (
  format: "pdf" | "excel" | "csv",
  tcoData: Record<string, any>,
  config: any,
  industryData: any,
  summaryMetrics: any,
  exportConfig: ExportConfiguration,
): Promise<void> => {
  const exportService = DataExportService.getInstance()
  const data = await exportService.prepareExportData(tcoData, config, industryData, summaryMetrics)

  switch (format) {
    case "pdf":
      await exportService.exportToPDF(data, exportConfig)
      break
    case "excel":
      await exportService.exportToExcel(data, exportConfig)
      break
    case "csv":
      await exportService.exportToCSV(data)
      break
    default:
      throw new Error(`Unsupported export format: ${format}`)
  }
}

export const getDefaultExportConfig = (): ExportConfiguration => ({
  includeCharts: true,
  includeDetailedBreakdown: true,
  includeRecommendations: true,
  includeComplianceAnalysis: true,
  format: "pdf",
  chartQuality: "high",
})
