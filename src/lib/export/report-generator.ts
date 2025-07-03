import type { RiskAssessmentResult } from "@/lib/compliance/risk-assessment"
import type { NewVendorData } from "@/lib/vendors/data"
import type { IndustryId, OrgSizeId } from "@/types/common"

export interface ExportData {
  vendors: NewVendorData[]
  riskAssessments: Record<string, RiskAssessmentResult>
  industry: IndustryId
  orgSize: OrgSizeId
  generatedAt: string
  selectedVendors?: string[]
}

export interface ExportOptions {
  format: "pdf" | "excel" | "csv" | "json"
  includeCharts: boolean
  includeRecommendations: boolean
  includeDetailedGaps: boolean
  includeCostAnalysis: boolean
  customTitle?: string
}

export class ReportGenerator {
  private data: ExportData

  constructor(data: ExportData) {
    this.data = data
  }

  async generateReport(options: ExportOptions): Promise<Blob> {
    switch (options.format) {
      case "pdf":
        return this.generatePDF(options)
      case "excel":
        return this.generateExcel(options)
      case "csv":
        return this.generateCSV(options)
      case "json":
        return this.generateJSON(options)
      default:
        throw new Error(`Unsupported format: ${options.format}`)
    }
  }

  private async generatePDF(options: ExportOptions): Promise<Blob> {
    // Import jsPDF dynamically to avoid SSR issues
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()

    // Set up document
    const title = options.customTitle || "Compliance Risk Assessment Report"
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20

    // Title
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text(title, pageWidth / 2, 30, { align: "center" })

    // Metadata
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Industry: ${this.data.industry.replace("_", " ").toUpperCase()}`, margin, 50)
    doc.text(`Organization Size: ${this.data.orgSize.replace("_", " ").toUpperCase()}`, margin, 60)
    doc.text(`Generated: ${new Date(this.data.generatedAt).toLocaleString()}`, margin, 70)

    let yPosition = 90

    // Executive Summary
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Executive Summary", margin, yPosition)
    yPosition += 20

    const assessments = Object.values(this.data.riskAssessments)
    const avgRiskScore = assessments.reduce((sum, a) => sum + a.overallRiskScore, 0) / assessments.length
    const totalGaps = assessments.reduce((sum, a) => sum + a.complianceGaps.length, 0)
    const avgCostRisk = assessments.reduce((sum, a) => sum + a.costOfNonCompliance.total, 0) / assessments.length

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Average Risk Score: ${Math.round(avgRiskScore)}/100`, margin, yPosition)
    yPosition += 10
    doc.text(`Total Compliance Gaps: ${totalGaps}`, margin, yPosition)
    yPosition += 10
    doc.text(`Average Cost Risk: $${Math.round(avgCostRisk / 1000)}K`, margin, yPosition)
    yPosition += 20

    // Vendor Comparison Table
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Vendor Risk Comparison", margin, yPosition)
    yPosition += 20

    // Table headers
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    const tableHeaders = ["Vendor", "Risk Score", "Risk Level", "Gaps", "Cost Risk ($K)"]
    const colWidths = [50, 30, 30, 25, 35]
    let xPosition = margin

    tableHeaders.forEach((header, index) => {
      doc.text(header, xPosition, yPosition)
      xPosition += colWidths[index]
    })
    yPosition += 15

    // Table data
    doc.setFont("helvetica", "normal")
    Object.entries(this.data.riskAssessments).forEach(([vendorId, assessment]) => {
      const vendor = this.data.vendors.find((v) => v.id === vendorId)
      if (!vendor) return

      xPosition = margin
      const rowData = [
        vendor.name,
        assessment.overallRiskScore.toString(),
        assessment.riskLevel.toUpperCase(),
        assessment.complianceGaps.length.toString(),
        Math.round(assessment.costOfNonCompliance.total / 1000).toString(),
      ]

      rowData.forEach((data, index) => {
        doc.text(data, xPosition, yPosition)
        xPosition += colWidths[index]
      })
      yPosition += 12

      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 30
      }
    })

    // Detailed Analysis
    if (options.includeDetailedGaps) {
      doc.addPage()
      yPosition = 30

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.text("Detailed Compliance Gaps", margin, yPosition)
      yPosition += 20

      Object.entries(this.data.riskAssessments).forEach(([vendorId, assessment]) => {
        const vendor = this.data.vendors.find((v) => v.id === vendorId)
        if (!vendor || assessment.complianceGaps.length === 0) return

        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text(`${vendor.name} (${assessment.complianceGaps.length} gaps)`, margin, yPosition)
        yPosition += 15

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")

        assessment.complianceGaps.slice(0, 5).forEach((gap) => {
          doc.text(`• ${gap.standardName}: ${gap.requirementName}`, margin + 5, yPosition)
          yPosition += 8
          doc.text(
            `  Risk: ${gap.riskScore}/10, Cost: $${Math.round(gap.remediationCost / 1000)}K`,
            margin + 10,
            yPosition,
          )
          yPosition += 12

          if (yPosition > 250) {
            doc.addPage()
            yPosition = 30
          }
        })
        yPosition += 10
      })
    }

    // Recommendations
    if (options.includeRecommendations) {
      doc.addPage()
      yPosition = 30

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.text("Recommendations", margin, yPosition)
      yPosition += 20

      Object.entries(this.data.riskAssessments).forEach(([vendorId, assessment]) => {
        const vendor = this.data.vendors.find((v) => v.id === vendorId)
        if (!vendor || assessment.recommendations.length === 0) return

        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text(vendor.name, margin, yPosition)
        yPosition += 15

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")

        assessment.recommendations.slice(0, 3).forEach((rec) => {
          doc.text(`• ${rec.priority.toUpperCase()}: ${rec.action}`, margin + 5, yPosition)
          yPosition += 8
          doc.text(
            `  Cost: $${Math.round(rec.estimatedCost / 1000)}K, Timeline: ${rec.timeframe}`,
            margin + 10,
            yPosition,
          )
          yPosition += 12

          if (yPosition > 250) {
            doc.addPage()
            yPosition = 30
          }
        })
        yPosition += 10
      })
    }

    return new Blob([doc.output("blob")], { type: "application/pdf" })
  }

  private async generateExcel(options: ExportOptions): Promise<Blob> {
    // Import xlsx dynamically
    const XLSX = await import("xlsx")

    const workbook = XLSX.utils.book_new()

    // Summary Sheet
    const summaryData = [
      ["Compliance Risk Assessment Report"],
      [""],
      ["Report Details"],
      ["Industry", this.data.industry.replace("_", " ").toUpperCase()],
      ["Organization Size", this.data.orgSize.replace("_", " ").toUpperCase()],
      ["Generated", new Date(this.data.generatedAt).toLocaleString()],
      [""],
      ["Summary Statistics"],
    ]

    const assessments = Object.values(this.data.riskAssessments)
    const avgRiskScore = assessments.reduce((sum, a) => sum + a.overallRiskScore, 0) / assessments.length
    const totalGaps = assessments.reduce((sum, a) => sum + a.complianceGaps.length, 0)
    const avgCostRisk = assessments.reduce((sum, a) => sum + a.costOfNonCompliance.total, 0) / assessments.length

    summaryData.push(
      ["Average Risk Score", Math.round(avgRiskScore)],
      ["Total Compliance Gaps", totalGaps],
      ["Average Cost Risk ($)", Math.round(avgCostRisk)],
      ["High Risk Vendors", assessments.filter((a) => a.riskLevel === "high" || a.riskLevel === "critical").length],
    )

    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary")

    // Vendor Comparison Sheet
    const comparisonData = [
      [
        "Vendor Name",
        "Risk Score",
        "Risk Level",
        "Compliance Gaps",
        "Cost of Non-Compliance",
        "Remediation Cost",
        "Total Cost Risk",
      ],
    ]

    Object.entries(this.data.riskAssessments).forEach(([vendorId, assessment]) => {
      const vendor = this.data.vendors.find((v) => v.id === vendorId)
      if (!vendor) return

      const remediationCost = assessment.complianceGaps.reduce((sum, gap) => sum + gap.remediationCost, 0)

      comparisonData.push([
        vendor.name,
        assessment.overallRiskScore,
        assessment.riskLevel.toUpperCase(),
        assessment.complianceGaps.length,
        assessment.costOfNonCompliance.total,
        remediationCost,
        assessment.costOfNonCompliance.total + remediationCost,
      ])
    })

    const comparisonSheet = XLSX.utils.aoa_to_sheet(comparisonData)
    XLSX.utils.book_append_sheet(workbook, comparisonSheet, "Vendor Comparison")

    // Detailed Gaps Sheet
    if (options.includeDetailedGaps) {
      const gapsData = [
        [
          "Vendor",
          "Standard",
          "Requirement",
          "Current Coverage",
          "Target Coverage",
          "Risk Score",
          "Business Impact",
          "Remediation Cost",
          "Time to Remediate",
        ],
      ]

      Object.entries(this.data.riskAssessments).forEach(([vendorId, assessment]) => {
        const vendor = this.data.vendors.find((v) => v.id === vendorId)
        if (!vendor) return

        assessment.complianceGaps.forEach((gap) => {
          gapsData.push([
            vendor.name,
            gap.standardName,
            gap.requirementName,
            gap.currentCoverage,
            gap.targetCoverage,
            gap.riskScore,
            gap.businessImpact,
            gap.remediationCost,
            gap.timeToRemediate,
          ])
        })
      })

      const gapsSheet = XLSX.utils.aoa_to_sheet(gapsData)
      XLSX.utils.book_append_sheet(workbook, gapsSheet, "Compliance Gaps")
    }

    // Cost Analysis Sheet
    if (options.includeCostAnalysis) {
      const costData = [
        [
          "Vendor",
          "Potential Fines",
          "Reputational Damage",
          "Operational Disruption",
          "Total Non-Compliance Cost",
          "Remediation Cost",
        ],
      ]

      Object.entries(this.data.riskAssessments).forEach(([vendorId, assessment]) => {
        const vendor = this.data.vendors.find((v) => v.id === vendorId)
        if (!vendor) return

        const remediationCost = assessment.complianceGaps.reduce((sum, gap) => sum + gap.remediationCost, 0)

        costData.push([
          vendor.name,
          assessment.costOfNonCompliance.fines,
          assessment.costOfNonCompliance.reputationalDamage,
          assessment.costOfNonCompliance.operationalDisruption,
          assessment.costOfNonCompliance.total,
          remediationCost,
        ])
      })

      const costSheet = XLSX.utils.aoa_to_sheet(costData)
      XLSX.utils.book_append_sheet(workbook, costSheet, "Cost Analysis")
    }

    // Recommendations Sheet
    if (options.includeRecommendations) {
      const recData = [["Vendor", "Priority", "Action", "Expected Impact", "Estimated Cost", "Timeframe"]]

      Object.entries(this.data.riskAssessments).forEach(([vendorId, assessment]) => {
        const vendor = this.data.vendors.find((v) => v.id === vendorId)
        if (!vendor) return

        assessment.recommendations.forEach((rec) => {
          recData.push([
            vendor.name,
            rec.priority.toUpperCase(),
            rec.action,
            rec.expectedImpact,
            rec.estimatedCost,
            rec.timeframe,
          ])
        })
      })

      const recSheet = XLSX.utils.aoa_to_sheet(recData)
      XLSX.utils.book_append_sheet(workbook, recSheet, "Recommendations")
    }

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    return new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
  }

  private async generateCSV(options: ExportOptions): Promise<Blob> {
    const csvData = [
      ["Vendor Name", "Risk Score", "Risk Level", "Compliance Gaps", "Cost of Non-Compliance", "Remediation Cost"],
    ]

    Object.entries(this.data.riskAssessments).forEach(([vendorId, assessment]) => {
      const vendor = this.data.vendors.find((v) => v.id === vendorId)
      if (!vendor) return

      const remediationCost = assessment.complianceGaps.reduce((sum, gap) => sum + gap.remediationCost, 0)

      csvData.push([
        vendor.name,
        assessment.overallRiskScore.toString(),
        assessment.riskLevel,
        assessment.complianceGaps.length.toString(),
        assessment.costOfNonCompliance.total.toString(),
        remediationCost.toString(),
      ])
    })

    const csvContent = csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")
    return new Blob([csvContent], { type: "text/csv" })
  }

  private async generateJSON(options: ExportOptions): Promise<Blob> {
    const exportData = {
      metadata: {
        title: options.customTitle || "Compliance Risk Assessment Report",
        industry: this.data.industry,
        orgSize: this.data.orgSize,
        generatedAt: this.data.generatedAt,
        exportOptions: options,
      },
      summary: {
        totalVendors: Object.keys(this.data.riskAssessments).length,
        averageRiskScore: Math.round(
          Object.values(this.data.riskAssessments).reduce((sum, a) => sum + a.overallRiskScore, 0) /
            Object.values(this.data.riskAssessments).length,
        ),
        totalComplianceGaps: Object.values(this.data.riskAssessments).reduce(
          (sum, a) => sum + a.complianceGaps.length,
          0,
        ),
        averageCostRisk: Math.round(
          Object.values(this.data.riskAssessments).reduce((sum, a) => sum + a.costOfNonCompliance.total, 0) /
            Object.values(this.data.riskAssessments).length,
        ),
      },
      vendors: Object.entries(this.data.riskAssessments).map(([vendorId, assessment]) => {
        const vendor = this.data.vendors.find((v) => v.id === vendorId)
        return {
          id: vendorId,
          name: vendor?.name || vendorId,
          riskAssessment: assessment,
          vendorDetails: options.includeDetailedGaps ? vendor : undefined,
        }
      }),
    }

    const jsonContent = JSON.stringify(exportData, null, 2)
    return new Blob([jsonContent], { type: "application/json" })
  }
}

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const getDefaultFilename = (format: string, customTitle?: string): string => {
  const timestamp = new Date().toISOString().split("T")[0]
  const title = customTitle ? customTitle.replace(/[^a-zA-Z0-9]/g, "_") : "compliance_risk_report"
  return `${title}_${timestamp}.${format}`
}
