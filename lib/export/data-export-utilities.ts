import { COMPREHENSIVE_VENDOR_DATA, INDUSTRIES } from "../vendors/comprehensive-vendor-data"
import type { DetailedCostBreakdown } from "../calculators/comprehensive-tco-calculator"

// Export formats
export enum ExportFormat {
  PDF = "pdf",
  EXCEL = "excel",
  CSV = "csv",
  JSON = "json",
  POWERPOINT = "pptx",
  WORD = "docx",
}

// Export data structure
export interface ExportData {
  metadata: {
    generatedAt: Date
    generatedBy: string
    version: string
    title: string
    description: string
  }
  configuration: {
    industry: string
    deviceCount: number
    timeframe: number
    vendors: string[]
    deploymentModel: string
  }
  analysis: {
    tcoComparison: Record<string, DetailedCostBreakdown>
    roiAnalysis: any
    riskAssessment: any
    complianceMapping: any
    migrationPlan?: any
  }
  recommendations: {
    executive: string[]
    technical: string[]
    financial: string[]
  }
}

// PDF generation interface
export interface PDFReportData {
  title: string
  subtitle: string
  executiveSummary: {
    recommendation: string
    keyMetrics: Array<{ label: string; value: string; color?: string }>
    highlights: string[]
  }
  financialAnalysis: {
    totalInvestment: number
    totalBenefits: number
    roi: number
    paybackMonths: number
    costBreakdown: Array<{ category: string; amount: number; percentage: number }>
  }
  riskAssessment: {
    currentRisk: number
    projectedRisk: number
    riskReduction: number
    complianceScore: number
  }
  vendorComparison: Array<{
    vendor: string
    totalCost: number
    payback: number
    riskScore: number
    recommended: boolean
  }>
  implementation: {
    timeline: Array<{ phase: string; duration: string; tasks: string[] }>
    resources: Array<{ role: string; allocation: string }>
  }
}

// Main export utility class
export class NACAnalysisExporter {
  private data: ExportData

  constructor(data: Partial<ExportData>) {
    this.data = {
      metadata: {
        generatedAt: new Date(),
        generatedBy: "Portnox TCO Analyzer",
        version: "1.0.0",
        title: "NAC Vendor Analysis Report",
        description: "Comprehensive analysis of Network Access Control solutions",
        ...data.metadata,
      },
      configuration: data.configuration || {
        industry: "HEALTHCARE",
        deviceCount: 500,
        timeframe: 3,
        vendors: ["PORTNOX", "CISCO_ISE", "ARUBA_CLEARPASS"],
        deploymentModel: "CLOUD",
      },
      analysis: data.analysis || {
        tcoComparison: {},
        roiAnalysis: {},
        riskAssessment: {},
        complianceMapping: {},
      },
      recommendations: data.recommendations || {
        executive: [],
        technical: [],
        financial: [],
      },
    }
  }

  // Generate PDF report data
  generatePDFReportData(): PDFReportData {
    const portnoxData = this.data.analysis.tcoComparison["PORTNOX"]
    const competitorAvg = this.calculateCompetitorAverage()
    const savings = competitorAvg - (portnoxData?.totalCost || 0)
    const percentSavings = Math.round((savings / Math.max(competitorAvg, 1)) * 100)

    return {
      title: "Executive NAC Analysis Report",
      subtitle: `${INDUSTRIES[this.data.configuration.industry]?.name || "Healthcare"} | ${this.data.configuration.deviceCount} Devices | ${this.data.configuration.timeframe}-Year Analysis`,
      executiveSummary: {
        recommendation: "Portnox CLEAR",
        keyMetrics: [
          { label: "Cost Savings", value: `${percentSavings}%`, color: "#10b981" },
          { label: "ROI", value: `${portnoxData?.roi || 5506}%`, color: "#3b82f6" },
          {
            label: "Payback Period",
            value: `${Math.round((portnoxData?.paybackPeriod || 195) / 30)} mo`,
            color: "#f59e0b",
          },
          { label: "Risk Reduction", value: "92%", color: "#ef4444" },
        ],
        highlights: [
          "Fastest payback in industry at 0.3 months",
          "95% faster deployment than traditional NAC",
          "92% reduction in security breach risk",
          "Zero infrastructure investment required",
          "$4.9M annual risk mitigation value",
        ],
      },
      financialAnalysis: {
        totalInvestment: portnoxData?.totalCost || 230000,
        totalBenefits: (portnoxData?.totalCost || 230000) * 25,
        roi: portnoxData?.roi || 5506,
        paybackMonths: Math.round((portnoxData?.paybackPeriod || 195) / 30),
        costBreakdown: [
          { category: "Software Licensing", amount: 120000, percentage: 52 },
          { category: "Implementation", amount: 25000, percentage: 11 },
          { category: "Training", amount: 15000, percentage: 6 },
          { category: "Support", amount: 35000, percentage: 15 },
          { category: "Infrastructure", amount: 35000, percentage: 15 },
        ],
      },
      riskAssessment: {
        currentRisk: 28,
        projectedRisk: 4,
        riskReduction: 86,
        complianceScore: 92,
      },
      vendorComparison: Object.entries(this.data.analysis.tcoComparison).map(([vendor, data]) => ({
        vendor: COMPREHENSIVE_VENDOR_DATA[vendor]?.name || vendor,
        totalCost: data.totalCost,
        payback: Math.round(data.paybackPeriod / 30),
        riskScore: this.calculateRiskScore(vendor),
        recommended: vendor === "PORTNOX",
      })),
      implementation: {
        timeline: [
          {
            phase: "Planning & Design",
            duration: "1 week",
            tasks: ["Requirements gathering", "Architecture design", "Policy mapping"],
          },
          {
            phase: "Pilot Deployment",
            duration: "1 week",
            tasks: ["Test group selection", "Configuration", "Validation"],
          },
          {
            phase: "Production Rollout",
            duration: "2-4 weeks",
            tasks: ["Phased deployment", "User training", "Monitoring"],
          },
          {
            phase: "Optimization",
            duration: "1 week",
            tasks: ["Performance tuning", "Policy refinement", "Documentation"],
          },
        ],
        resources: [
          { role: "Project Manager", allocation: "1.0 FTE" },
          { role: "Network Engineer", allocation: "0.5 FTE" },
          { role: "Security Analyst", allocation: "0.5 FTE" },
          { role: "Portnox Professional Services", allocation: "Included" },
        ],
      },
    }
  }

  // Generate PDF using jsPDF
  async generatePDF(): Promise<Blob> {
    // Dynamic import to avoid SSR issues
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()
    const reportData = this.generatePDFReportData()

    // PDF styling constants
    const colors = {
      primary: [16, 185, 129], // Green
      secondary: [59, 130, 246], // Blue
      accent: [245, 158, 11], // Orange
      text: [31, 41, 55], // Gray-800
      lightGray: [243, 244, 246], // Gray-100
    }

    let yPosition = 20

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
      doc.setFontSize(fontSize)
      const lines = doc.splitTextToSize(text, maxWidth)
      doc.text(lines, x, y)
      return y + lines.length * fontSize * 0.4
    }

    // Header
    doc.setFillColor(...colors.primary)
    doc.rect(0, 0, 210, 40, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(reportData.title, 20, 25)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(reportData.subtitle, 20, 35)

    yPosition = 50

    // Executive Summary Section
    doc.setTextColor(...colors.text)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Executive Summary", 20, yPosition)
    yPosition += 10

    // Recommendation box
    doc.setFillColor(...colors.lightGray)
    doc.rect(20, yPosition, 170, 20, "F")
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...colors.primary)
    doc.text(`Recommended Solution: ${reportData.executiveSummary.recommendation}`, 25, yPosition + 12)
    yPosition += 30

    // Key metrics in a grid
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...colors.text)
    const metricsPerRow = 2
    const metricWidth = 80
    const metricHeight = 25

    reportData.executiveSummary.keyMetrics.forEach((metric, index) => {
      const row = Math.floor(index / metricsPerRow)
      const col = index % metricsPerRow
      const x = 20 + col * (metricWidth + 10)
      const y = yPosition + row * (metricHeight + 5)

      // Metric box
      doc.setFillColor(245, 245, 245)
      doc.rect(x, y, metricWidth, metricHeight, "F")
      doc.setDrawColor(200, 200, 200)
      doc.rect(x, y, metricWidth, metricHeight, "S")

      // Metric value
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(16, 185, 129) // Green color for values
      doc.text(metric.value, x + 5, y + 12)

      // Metric label
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(...colors.text)
      doc.text(metric.label, x + 5, y + 20)
    })

    yPosition += Math.ceil(reportData.executiveSummary.keyMetrics.length / metricsPerRow) * (metricHeight + 5) + 15

    // Key highlights
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Key Business Drivers:", 20, yPosition)
    yPosition += 8

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    reportData.executiveSummary.highlights.forEach((highlight) => {
      doc.text("• " + highlight, 25, yPosition)
      yPosition += 6
    })

    yPosition += 10

    // Financial Analysis Section
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...colors.text)
    doc.text("Financial Analysis", 20, yPosition)
    yPosition += 15

    // Financial summary boxes
    const financialMetrics = [
      { label: "Total Investment", value: this.formatCurrency(reportData.financialAnalysis.totalInvestment) },
      { label: "Total Benefits", value: this.formatCurrency(reportData.financialAnalysis.totalBenefits) },
      { label: "Net ROI", value: `${reportData.financialAnalysis.roi}%` },
      { label: "Payback Period", value: `${reportData.financialAnalysis.paybackMonths} months` },
    ]

    financialMetrics.forEach((metric, index) => {
      const row = Math.floor(index / 2)
      const col = index % 2
      const x = 20 + col * 90
      const y = yPosition + row * 20

      doc.setFillColor(240, 249, 255)
      doc.rect(x, y, 85, 15, "F")
      doc.setDrawColor(59, 130, 246)
      doc.rect(x, y, 85, 15, "S")

      doc.setFontSize(8)
      doc.setTextColor(...colors.text)
      doc.text(metric.label, x + 2, y + 6)

      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(...colors.secondary)
      doc.text(metric.value, x + 2, y + 12)
      doc.setFont("helvetica", "normal")
    })

    yPosition += 50

    // Cost breakdown table
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Cost Breakdown:", 20, yPosition)
    yPosition += 10

    // Table header
    doc.setFillColor(...colors.primary)
    doc.rect(20, yPosition, 170, 8, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Category", 25, yPosition + 6)
    doc.text("Amount", 100, yPosition + 6)
    doc.text("Percentage", 150, yPosition + 6)
    yPosition += 8

    // Table rows
    doc.setTextColor(...colors.text)
    doc.setFont("helvetica", "normal")
    reportData.financialAnalysis.costBreakdown.forEach((item, index) => {
      const bgColor = index % 2 === 0 ? [255, 255, 255] : [249, 250, 251]
      doc.setFillColor(...bgColor)
      doc.rect(20, yPosition, 170, 8, "F")

      doc.text(item.category, 25, yPosition + 6)
      doc.text(this.formatCurrency(item.amount), 100, yPosition + 6)
      doc.text(`${item.percentage}%`, 150, yPosition + 6)
      yPosition += 8
    })

    yPosition += 15

    // Risk Assessment Section
    if (yPosition > 220) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Risk Assessment", 20, yPosition)
    yPosition += 15

    // Risk reduction visualization
    doc.setFontSize(12)
    doc.text("Security Risk Reduction:", 20, yPosition)
    yPosition += 10

    // Current risk bar
    doc.setFillColor(239, 68, 68) // Red
    doc.rect(20, yPosition, reportData.riskAssessment.currentRisk * 2, 8, "F")
    doc.setTextColor(...colors.text)
    doc.text(`Current Risk: ${reportData.riskAssessment.currentRisk}%`, 25, yPosition + 6)
    yPosition += 15

    // Projected risk bar
    doc.setFillColor(...colors.primary) // Green
    doc.rect(20, yPosition, reportData.riskAssessment.projectedRisk * 2, 8, "F")
    doc.text(`With NAC: ${reportData.riskAssessment.projectedRisk}%`, 25, yPosition + 6)
    yPosition += 15

    // Risk reduction highlight
    doc.setFillColor(254, 243, 199) // Yellow background
    doc.rect(20, yPosition, 170, 15, "F")
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(146, 64, 14) // Orange text
    doc.text(`${reportData.riskAssessment.riskReduction}% Risk Reduction Achieved`, 25, yPosition + 10)
    yPosition += 25

    // Compliance score
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(...colors.text)
    doc.text(`Compliance Score Improvement: ${reportData.riskAssessment.complianceScore}%`, 20, yPosition)
    yPosition += 20

    // Vendor Comparison Section
    if (yPosition > 200) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Vendor Comparison", 20, yPosition)
    yPosition += 15

    // Comparison table header
    doc.setFillColor(...colors.secondary)
    doc.rect(20, yPosition, 170, 10, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Vendor", 25, yPosition + 7)
    doc.text("Total Cost", 70, yPosition + 7)
    doc.text("Payback", 110, yPosition + 7)
    doc.text("Risk Score", 140, yPosition + 7)
    doc.text("Status", 170, yPosition + 7)
    yPosition += 10

    // Comparison table rows
    doc.setTextColor(...colors.text)
    doc.setFont("helvetica", "normal")
    reportData.vendorComparison.forEach((vendor, index) => {
      const bgColor = vendor.recommended ? [220, 252, 231] : index % 2 === 0 ? [255, 255, 255] : [249, 250, 251]
      doc.setFillColor(...bgColor)
      doc.rect(20, yPosition, 170, 8, "F")

      if (vendor.recommended) {
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...colors.primary)
      } else {
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...colors.text)
      }

      doc.text(vendor.vendor, 25, yPosition + 6)
      doc.text(this.formatCurrency(vendor.totalCost), 70, yPosition + 6)
      doc.text(`${vendor.payback} mo`, 110, yPosition + 6)
      doc.text(`${vendor.riskScore}%`, 140, yPosition + 6)
      doc.text(vendor.recommended ? "Recommended" : "Alternative", 170, yPosition + 6)
      yPosition += 8
    })

    yPosition += 15

    // Implementation Timeline
    if (yPosition > 180) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(...colors.text)
    doc.text("Implementation Timeline", 20, yPosition)
    yPosition += 15

    reportData.implementation.timeline.forEach((phase, index) => {
      // Phase header
      doc.setFillColor(...colors.accent)
      doc.rect(20, yPosition, 170, 8, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text(`${phase.phase} (${phase.duration})`, 25, yPosition + 6)
      yPosition += 8

      // Phase tasks
      doc.setTextColor(...colors.text)
      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      phase.tasks.forEach((task) => {
        doc.text(`• ${task}`, 30, yPosition + 5)
        yPosition += 5
      })
      yPosition += 5
    })

    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text(`Generated by Portnox TCO Analyzer - Page ${i} of ${pageCount}`, 20, 290)
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 150, 290)
    }

    return new Promise((resolve) => {
      const pdfBlob = doc.output("blob")
      resolve(pdfBlob)
    })
  }

  // Export to JSON
  async exportToJSON(): Promise<string> {
    return JSON.stringify(this.data, null, 2)
  }

  // Export to CSV
  async exportToCSV(): Promise<string> {
    const vendors = Object.keys(this.data.analysis.tcoComparison)
    const headers = [
      "Vendor",
      "Total Cost",
      "Software Cost",
      "Hardware Cost",
      "Implementation Cost",
      "Operational Cost",
      "Hidden Costs",
      "ROI %",
      "Payback Period (days)",
      "Risk Score",
      "Compliance Score",
    ]

    const rows = vendors.map((vendor) => {
      const tco = this.data.analysis.tcoComparison[vendor]
      return [
        COMPREHENSIVE_VENDOR_DATA[vendor]?.name || vendor,
        tco.totalCost,
        tco.software.total,
        tco.hardware.total,
        tco.implementation.total,
        tco.operational.total,
        tco.hidden.total,
        tco.roi.toFixed(0),
        tco.paybackPeriod.toFixed(0),
        this.calculateRiskScore(vendor),
        this.calculateComplianceScore(vendor),
      ].join(",")
    })

    return [headers.join(","), ...rows].join("\n")
  }

  // Generate executive summary
  generateExecutiveSummary(): string {
    const portnoxData = this.data.analysis.tcoComparison["PORTNOX"]
    const competitorAvg = this.calculateCompetitorAverage()
    const savings = competitorAvg - (portnoxData?.totalCost || 0)
    const percentSavings = Math.round((savings / competitorAvg) * 100)

    return `
# Executive Summary: NAC Investment Analysis

## Overview
Organization: ${this.data.configuration.deviceCount} devices
Industry: ${INDUSTRIES[this.data.configuration.industry]?.name}
Analysis Period: ${this.data.configuration.timeframe} years

## Key Findings
1. **Recommended Solution**: Portnox CLEAR
2. **Cost Savings**: ${percentSavings}% reduction (${this.formatCurrency(savings)})
3. **ROI**: ${portnoxData?.roi || 5506}% over ${this.data.configuration.timeframe} years
4. **Payback Period**: ${(portnoxData?.paybackPeriod || 195) / 30} months

## Strategic Benefits
- **Deployment Speed**: 95% faster than traditional NAC (7 days vs 6-9 months)
- **Risk Reduction**: 92% reduction in breach probability
- **Operational Efficiency**: 90% reduction in administrative overhead
- **Zero Infrastructure**: No hardware investment or maintenance

## Financial Impact
- Total Investment: ${this.formatCurrency(portnoxData?.totalCost || 0)}
- Total Benefit: ${this.formatCurrency(portnoxData?.totalBenefit || 0)}
- Net Benefit: ${this.formatCurrency(portnoxData?.netBenefit || 0)}

## Recommendation
Immediate implementation of Portnox CLEAR is recommended based on:
- Superior financial returns
- Minimal deployment risk
- Comprehensive security capabilities
- Future-proof cloud architecture
`
  }

  // Helper methods
  private calculateCompetitorAverage(): number {
    const vendors = Object.keys(this.data.analysis.tcoComparison)
    const competitorCosts = vendors
      .filter((v) => v !== "PORTNOX")
      .map((v) => this.data.analysis.tcoComparison[v]?.totalCost || 0)

    return competitorCosts.length > 0
      ? competitorCosts.reduce((sum, cost) => sum + cost, 0) / competitorCosts.length
      : 0
  }

  private calculateRiskScore(vendor: string): number {
    const vendorData = COMPREHENSIVE_VENDOR_DATA[vendor]
    if (!vendorData) return 50

    // Calculate risk score based on various factors
    let score = 100

    // Architecture complexity
    if (vendorData.architecture === "DISTRIBUTED") score -= 20
    if (vendorData.architecture === "CENTRALIZED") score -= 10

    // Vendor lock-in
    if (vendorData.vendorLockIn === "HIGH") score -= 30
    if (vendorData.vendorLockIn === "MEDIUM") score -= 15

    // Deployment complexity
    const cloudDeployment = vendorData.deploymentModels.CLOUD
    if (!cloudDeployment?.available) score -= 25

    return Math.max(0, Math.min(100, score))
  }

  private calculateComplianceScore(vendor: string): number {
    const vendorData = COMPREHENSIVE_VENDOR_DATA[vendor]
    if (!vendorData) return 50

    // Calculate compliance score based on capabilities
    let score = 0
    const capabilities = vendorData.capabilities

    if (capabilities.zeroTrust) score += 20
    if (capabilities.riskBasedAccess) score += 15
    if (capabilities.cloudPKI) score += 15
    if (capabilities.iotProfiling) score += 10
    if (capabilities.apiAccess) score += 10
    if (capabilities.multiTenant) score += 10
    if (capabilities.reporting) score += 20

    return Math.min(100, score)
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Export methods for different formats
  async exportToPDF(): Promise<Blob> {
    return await this.generatePDF()
  }

  async exportToExcel(): Promise<Blob> {
    // This would integrate with an Excel generation library
    const csvContent = await this.exportToCSV()
    return new Blob([csvContent], { type: "application/vnd.ms-excel" })
  }

  async exportToPowerPoint(): Promise<Blob> {
    // This would integrate with a PowerPoint generation library
    const content = this.generateExecutiveSummary()
    return new Blob([content], { type: "application/vnd.ms-powerpoint" })
  }
}

// Utility functions for export
export function createExportData(configuration: any, analysis: any, recommendations?: any): ExportData {
  return {
    metadata: {
      generatedAt: new Date(),
      generatedBy: "Portnox TCO Analyzer",
      version: "1.0.0",
      title: "NAC Vendor Analysis Report",
      description: "Comprehensive analysis of Network Access Control solutions",
    },
    configuration,
    analysis,
    recommendations: recommendations || {
      executive: [
        "Implement Portnox CLEAR for optimal ROI",
        "Leverage cloud-native architecture",
        "Prioritize zero-trust security model",
      ],
      technical: [
        "Deploy in cloud-first configuration",
        "Integrate with existing identity systems",
        "Implement automated policy enforcement",
      ],
      financial: [
        "Realize immediate cost savings",
        "Eliminate infrastructure investments",
        "Reduce operational overhead",
      ],
    },
  }
}

export function downloadFile(content: string | Blob, filename: string, mimeType: string) {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Simplified export functions for direct use
export async function exportAnalysis(data: any, format: ExportFormat) {
  const exporter = new NACAnalysisExporter(data)

  switch (format) {
    case ExportFormat.PDF:
      const pdfBlob = await exporter.exportToPDF()
      downloadFile(pdfBlob, `NAC_Analysis_${new Date().toISOString().split("T")[0]}.pdf`, "application/pdf")
      break
    case ExportFormat.CSV:
      const csvContent = await exporter.exportToCSV()
      downloadFile(csvContent, `NAC_Analysis_${new Date().toISOString().split("T")[0]}.csv`, "text/csv")
      break
    case ExportFormat.JSON:
      const jsonContent = await exporter.exportToJSON()
      downloadFile(jsonContent, `NAC_Analysis_${new Date().toISOString().split("T")[0]}.json`, "application/json")
      break
    case ExportFormat.EXCEL:
      const excelBlob = await exporter.exportToExcel()
      downloadFile(
        excelBlob,
        `NAC_Analysis_${new Date().toISOString().split("T")[0]}.xlsx`,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      )
      break
    default:
      console.warn(`Export format ${format} not yet implemented`)
  }
}

export function generateComprehensiveReport(config: any): ExportData {
  return createExportData(config, {
    tcoComparison: {
      PORTNOX: {
        totalCost: 230000,
        software: { total: 120000 },
        hardware: { total: 0 },
        implementation: { total: 25000 },
        operational: { total: 50000 },
        hidden: { total: 35000 },
        roi: 5506,
        paybackPeriod: 195,
      },
      CISCO_ISE: {
        totalCost: 850000,
        software: { total: 400000 },
        hardware: { total: 200000 },
        implementation: { total: 150000 },
        operational: { total: 100000 },
        hidden: { total: 0 },
        roi: 285,
        paybackPeriod: 1260,
      },
    },
    roiAnalysis: {},
    riskAssessment: {},
    complianceMapping: {},
  })
}
