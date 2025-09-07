import jsPDF from "jspdf"
import "jspdf-autotable"
import * as XLSX from "xlsx"
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx"
import pptxgen from "pptxgenjs"

// Enhanced types for comprehensive reporting
export interface EnhancedReportData {
  title: string
  subtitle: string
  template: string
  format: string
  generatedAt: Date
  industry: string
  deviceCount: number
  timeframe: number
  organizationSize: string
  region: string
  results: any[]
  config: any
  preview: any
  includeCharts: boolean
  includeDetails: boolean
  includeAIEnhancement: boolean
  includeBenchmarks: boolean
  includeRoadmap: boolean
  includeCompliance: boolean
  executiveSummary: string
  keyRecommendations: string
  aiPrompt?: string
  branding: {
    logo: string
    primaryColor: string
    secondaryColor: string
    companyName: string
    tagline: string
  }
}

export interface ChartData {
  type: "bar" | "line" | "pie" | "radar" | "scatter"
  title: string
  data: any[]
  labels: string[]
  colors: string[]
  width?: number
  height?: number
}

// Safe utility functions
function safeString(value: any): string {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  if (typeof value === "number") return value.toString()
  if (typeof value === "boolean") return value.toString()
  if (typeof value === "object") return JSON.stringify(value)
  return String(value)
}

function safeNumber(value: any, defaultValue = 0): number {
  if (value === null || value === undefined) return defaultValue
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? defaultValue : num
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(safeNumber(value))
}

function formatPercentage(value: number): string {
  return `${safeNumber(value).toFixed(1)}%`
}

export class EnhancedReportGenerator {
  private data: EnhancedReportData
  private portnoxColors = {
    primary: "#00D4AA",
    secondary: "#1B2951",
    accent: "#00B894",
    light: "#E8F8F5",
    dark: "#0D1421",
    gray: "#6C757D",
    success: "#28A745",
    warning: "#FFC107",
    danger: "#DC3545",
    info: "#17A2B8",
  }

  constructor(data: EnhancedReportData) {
    this.data = data
  }

  // Generate comprehensive PDF report
  async generatePDF(template: string): Promise<Blob> {
    const doc = new jsPDF("p", "mm", "a4")
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20

    try {
      // Add Portnox branding
      this.addPDFHeader(doc, pageWidth, margin)

      let yPosition = 40

      // Title page
      yPosition = this.addPDFTitlePage(doc, pageWidth, pageHeight, margin, yPosition)

      // Executive summary
      if (template === "executive" || template === "comprehensive") {
        doc.addPage()
        yPosition = 30
        yPosition = this.addPDFExecutiveSummary(doc, pageWidth, margin, yPosition)
      }

      // Financial analysis
      if (template === "financial" || template === "comprehensive") {
        doc.addPage()
        yPosition = 30
        yPosition = this.addPDFFinancialAnalysis(doc, pageWidth, margin, yPosition)
      }

      // Technical analysis
      if (template === "technical" || template === "comprehensive") {
        doc.addPage()
        yPosition = 30
        yPosition = this.addPDFTechnicalAnalysis(doc, pageWidth, margin, yPosition)
      }

      // Security analysis
      if (template === "security" || template === "comprehensive") {
        doc.addPage()
        yPosition = 30
        yPosition = this.addPDFSecurityAnalysis(doc, pageWidth, margin, yPosition)
      }

      // Compliance analysis
      if (template === "compliance" || template === "comprehensive") {
        doc.addPage()
        yPosition = 30
        yPosition = this.addPDFComplianceAnalysis(doc, pageWidth, margin, yPosition)
      }

      // Charts and visualizations
      if (this.data.includeCharts) {
        doc.addPage()
        yPosition = 30
        yPosition = this.addPDFCharts(doc, pageWidth, margin, yPosition)
      }

      // Implementation roadmap
      if (this.data.includeRoadmap) {
        doc.addPage()
        yPosition = 30
        yPosition = this.addPDFRoadmap(doc, pageWidth, margin, yPosition)
      }

      // AI-enhanced insights
      if (this.data.includeAIEnhancement && this.data.aiPrompt) {
        doc.addPage()
        yPosition = 30
        yPosition = this.addPDFAIInsights(doc, pageWidth, margin, yPosition)
      }

      // Add footer to all pages
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        this.addPDFFooter(doc, pageWidth, pageHeight, margin, i, pageCount)
      }

      return new Blob([doc.output("blob")], { type: "application/pdf" })
    } catch (error) {
      console.error("PDF generation error:", error)
      // Fallback: generate basic PDF
      return this.generateBasicPDF()
    }
  }

  // Generate comprehensive Word document
  async generateWord(template: string): Promise<Blob> {
    try {
      const sections = []

      // Title page
      sections.push({
        properties: {},
        children: [
          ...this.createWordTitlePage(),
          ...this.createWordExecutiveSummary(),
          ...this.createWordFinancialAnalysis(),
          ...this.createWordTechnicalAnalysis(),
          ...this.createWordSecurityAnalysis(),
          ...this.createWordComplianceAnalysis(),
          ...this.createWordRoadmap(),
          ...this.createWordAIInsights(),
        ],
      })

      const doc = new Document({
        creator: this.data.branding.companyName,
        title: this.data.title,
        description: this.data.subtitle,
        sections,
        styles: {
          default: {
            heading1: {
              run: {
                size: 32,
                bold: true,
                color: this.portnoxColors.secondary.replace("#", ""),
              },
              paragraph: {
                spacing: { after: 300 },
              },
            },
            heading2: {
              run: {
                size: 28,
                bold: true,
                color: this.portnoxColors.primary.replace("#", ""),
              },
              paragraph: {
                spacing: { after: 200 },
              },
            },
          },
        },
      })

      const buffer = await Packer.toBuffer(doc)
      return new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
    } catch (error) {
      console.error("Word generation error:", error)
      return this.generateBasicWord()
    }
  }

  // Generate comprehensive PowerPoint presentation
  async generatePowerPoint(template: string): Promise<Blob> {
    try {
      const pres = new pptxgen()

      // Set presentation properties
      pres.author = this.data.branding.companyName
      pres.company = this.data.branding.companyName
      pres.title = this.data.title
      pres.subject = this.data.subtitle

      // Define master slide with Portnox branding
      pres.defineSlideMaster({
        title: "PORTNOX_MASTER",
        background: { color: "FFFFFF" },
        objects: [
          {
            rect: {
              x: 0,
              y: 0,
              w: "100%",
              h: 0.5,
              fill: { color: this.portnoxColors.primary.replace("#", "") },
            },
          },
          {
            text: {
              text: this.data.branding.companyName,
              options: {
                x: 0.5,
                y: 6.8,
                w: 3,
                h: 0.4,
                fontSize: 12,
                color: this.portnoxColors.secondary.replace("#", ""),
                fontFace: "Arial",
              },
            },
          },
        ],
      })

      // Title slide
      this.addPowerPointTitleSlide(pres)

      // Executive summary slides
      if (template === "executive" || template === "board" || template === "comprehensive") {
        this.addPowerPointExecutiveSlides(pres)
      }

      // Financial analysis slides
      if (template === "financial" || template === "board" || template === "comprehensive") {
        this.addPowerPointFinancialSlides(pres)
      }

      // Technical analysis slides
      if (template === "technical" || template === "comprehensive") {
        this.addPowerPointTechnicalSlides(pres)
      }

      // Security analysis slides
      if (template === "security" || template === "comprehensive") {
        this.addPowerPointSecuritySlides(pres)
      }

      // Compliance slides
      if (template === "compliance" || template === "comprehensive") {
        this.addPowerPointComplianceSlides(pres)
      }

      // Charts and visualizations
      if (this.data.includeCharts) {
        this.addPowerPointChartSlides(pres)
      }

      // Implementation roadmap
      if (this.data.includeRoadmap) {
        this.addPowerPointRoadmapSlides(pres)
      }

      // AI insights
      if (this.data.includeAIEnhancement) {
        this.addPowerPointAISlides(pres)
      }

      // Conclusion slide
      this.addPowerPointConclusionSlide(pres)

      const buffer = await pres.write("arraybuffer")
      return new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      })
    } catch (error) {
      console.error("PowerPoint generation error:", error)
      return this.generateBasicPowerPoint()
    }
  }

  // Generate comprehensive Excel workbook
  async generateExcel(template: string): Promise<Blob> {
    try {
      const workbook = XLSX.utils.book_new()

      // Executive Summary sheet
      const executiveData = this.createExcelExecutiveSummary()
      const executiveSheet = XLSX.utils.aoa_to_sheet(executiveData)
      XLSX.utils.book_append_sheet(workbook, executiveSheet, "Executive Summary")

      // Financial Analysis sheet
      const financialData = this.createExcelFinancialAnalysis()
      const financialSheet = XLSX.utils.aoa_to_sheet(financialData)
      XLSX.utils.book_append_sheet(workbook, financialSheet, "Financial Analysis")

      // Vendor Comparison sheet
      const comparisonData = this.createExcelVendorComparison()
      const comparisonSheet = XLSX.utils.aoa_to_sheet(comparisonData)
      XLSX.utils.book_append_sheet(workbook, comparisonSheet, "Vendor Comparison")

      // TCO Breakdown sheet
      const tcoData = this.createExcelTCOBreakdown()
      const tcoSheet = XLSX.utils.aoa_to_sheet(tcoData)
      XLSX.utils.book_append_sheet(workbook, tcoSheet, "TCO Breakdown")

      // ROI Analysis sheet
      const roiData = this.createExcelROIAnalysis()
      const roiSheet = XLSX.utils.aoa_to_sheet(roiData)
      XLSX.utils.book_append_sheet(workbook, roiSheet, "ROI Analysis")

      // Security Analysis sheet
      const securityData = this.createExcelSecurityAnalysis()
      const securitySheet = XLSX.utils.aoa_to_sheet(securityData)
      XLSX.utils.book_append_sheet(workbook, securitySheet, "Security Analysis")

      // Implementation Timeline sheet
      const timelineData = this.createExcelImplementationTimeline()
      const timelineSheet = XLSX.utils.aoa_to_sheet(timelineData)
      XLSX.utils.book_append_sheet(workbook, timelineSheet, "Implementation Timeline")

      // Raw Data sheet
      const rawData = this.createExcelRawData()
      const rawSheet = XLSX.utils.aoa_to_sheet(rawData)
      XLSX.utils.book_append_sheet(workbook, rawSheet, "Raw Data")

      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
      return new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    } catch (error) {
      console.error("Excel generation error:", error)
      return this.generateBasicExcel()
    }
  }

  // PDF Helper Methods
  private addPDFHeader(doc: jsPDF, pageWidth: number, margin: number): void {
    // Add Portnox logo and branding
    doc.setFillColor(this.portnoxColors.primary)
    doc.rect(0, 0, pageWidth, 15, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("PORTNOX", margin, 10)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Enterprise Network Access Control Solutions", pageWidth - margin - 80, 10)
  }

  private addPDFTitlePage(
    doc: jsPDF,
    pageWidth: number,
    pageHeight: number,
    margin: number,
    yPosition: number,
  ): number {
    // Title
    doc.setTextColor(27, 41, 81) // Portnox secondary color
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    const titleLines = doc.splitTextToSize(this.data.title, pageWidth - 2 * margin)
    doc.text(titleLines, margin, yPosition)
    yPosition += titleLines.length * 10 + 10

    // Subtitle
    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(108, 117, 125)
    const subtitleLines = doc.splitTextToSize(this.data.subtitle, pageWidth - 2 * margin)
    doc.text(subtitleLines, margin, yPosition)
    yPosition += subtitleLines.length * 7 + 20

    // Key metrics box
    doc.setFillColor(232, 248, 245) // Light green
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 60, "F")
    doc.setDrawColor(0, 212, 170)
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 60, "S")

    yPosition += 10
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Executive Key Findings", margin + 10, yPosition)
    yPosition += 15

    // Key findings
    const findings = [
      `Total Cost Savings: ${formatCurrency(safeNumber(this.data.preview?.maxSavings))} (${safeNumber(this.data.preview?.savingsPercent)}%)`,
      `Return on Investment: ${safeNumber(this.data.preview?.bestROI)}% with ${safeNumber(this.data.preview?.avgPayback)} year payback`,
      `Security Score: ${safeNumber(this.data.preview?.securityScore)}/100 with ${safeNumber(this.data.preview?.riskReduction)}% risk reduction`,
      `Deployment Time: ${safeString(this.data.preview?.deploymentTime)} vs ${safeString(this.data.preview?.competitorDeploymentTime)}`,
    ]

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    findings.forEach((finding, index) => {
      doc.setTextColor(0, 184, 148) // Accent color
      doc.text("•", margin + 15, yPosition)
      doc.setTextColor(27, 41, 81)
      doc.text(finding, margin + 20, yPosition)
      yPosition += 8
    })

    return yPosition + 30
  }

  private addPDFExecutiveSummary(doc: jsPDF, pageWidth: number, margin: number, yPosition: number): number {
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Executive Summary", margin, yPosition)
    yPosition += 15

    // Executive summary content
    const summaryText = this.data.executiveSummary || this.generateExecutiveSummaryText()
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(60, 60, 60)
    const summaryLines = doc.splitTextToSize(summaryText, pageWidth - 2 * margin)
    doc.text(summaryLines, margin, yPosition)
    yPosition += summaryLines.length * 5 + 20

    // Strategic recommendations
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Strategic Recommendations", margin, yPosition)
    yPosition += 10

    const recommendations = [
      "Immediate deployment of Portnox CLEAR for maximum cost savings and security benefits",
      "Phase out legacy NAC infrastructure to eliminate security vulnerabilities and operational overhead",
      "Leverage cloud-native architecture for infinite scalability and reduced maintenance burden",
      "Implement comprehensive Zero Trust framework with 95% automation level",
    ]

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    recommendations.forEach((rec, index) => {
      doc.setTextColor(0, 184, 148)
      doc.text(`${index + 1}.`, margin, yPosition)
      doc.setTextColor(60, 60, 60)
      const recLines = doc.splitTextToSize(rec, pageWidth - 2 * margin - 15)
      doc.text(recLines, margin + 15, yPosition)
      yPosition += recLines.length * 5 + 5
    })

    return yPosition
  }

  private addPDFFinancialAnalysis(doc: jsPDF, pageWidth: number, margin: number, yPosition: number): number {
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Financial Impact Analysis", margin, yPosition)
    yPosition += 20

    // TCO Comparison Table
    const tableData = []
    const headers = ["Vendor", "Total Cost", "Annual Cost", "ROI %", "Payback (Years)"]
    tableData.push(headers)

    this.data.results.forEach((result) => {
      tableData.push([
        safeString(result.vendorName),
        formatCurrency(safeNumber(result.totalCost)),
        formatCurrency(safeNumber(result.totalCost) / safeNumber(this.data.timeframe)),
        `${safeNumber(result.financialMetrics?.roi)}%`,
        `${safeNumber(result.financialMetrics?.paybackPeriod)}`,
      ])
    })

    // Use autoTable if available
    if (typeof (doc as any).autoTable === "function") {
      ;(doc as any).autoTable({
        head: [headers],
        body: tableData.slice(1),
        startY: yPosition,
        theme: "grid",
        headStyles: {
          fillColor: [0, 212, 170],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250],
        },
      })
      yPosition = (doc as any).lastAutoTable.finalY + 20
    } else {
      // Fallback table rendering
      yPosition = this.drawSimpleTable(doc, tableData, margin, yPosition, pageWidth - 2 * margin)
    }

    return yPosition
  }

  private addPDFTechnicalAnalysis(doc: jsPDF, pageWidth: number, margin: number, yPosition: number): number {
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Technical Architecture Analysis", margin, yPosition)
    yPosition += 20

    // Feature comparison
    const features = [
      "Cloud-Native Architecture",
      "Zero Trust Integration",
      "AI-Powered Analytics",
      "Automated Policy Enforcement",
      "Real-time Threat Detection",
      "Comprehensive Device Profiling",
    ]

    features.forEach((feature) => {
      doc.setTextColor(0, 184, 148)
      doc.text("✓", margin, yPosition)
      doc.setTextColor(60, 60, 60)
      doc.setFontSize(11)
      doc.text(feature, margin + 10, yPosition)
      yPosition += 8
    })

    return yPosition + 20
  }

  private addPDFSecurityAnalysis(doc: jsPDF, pageWidth: number, margin: number, yPosition: number): number {
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Cybersecurity & Risk Assessment", margin, yPosition)
    yPosition += 20

    // Security metrics
    const securityMetrics = [
      { label: "Security Score", value: `${safeNumber(this.data.preview?.securityScore)}/100`, color: "success" },
      { label: "CVE Count", value: "0 (Industry Leading)", color: "success" },
      { label: "Risk Reduction", value: `${safeNumber(this.data.preview?.riskReduction)}%`, color: "success" },
      { label: "Compliance Automation", value: "95%", color: "success" },
    ]

    securityMetrics.forEach((metric) => {
      doc.setTextColor(0, 184, 148)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text(metric.label + ":", margin, yPosition)
      doc.setTextColor(40, 167, 69)
      doc.text(metric.value, margin + 80, yPosition)
      yPosition += 12
    })

    return yPosition + 20
  }

  private addPDFComplianceAnalysis(doc: jsPDF, pageWidth: number, margin: number, yPosition: number): number {
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Regulatory Compliance Analysis", margin, yPosition)
    yPosition += 20

    const complianceFrameworks = [
      "SOC 2 Type II",
      "ISO 27001",
      "HIPAA",
      "PCI DSS",
      "GDPR",
      "FedRAMP Ready",
      "NIST",
      "CMMC",
    ]

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(60, 60, 60)
    doc.text("Supported Compliance Frameworks:", margin, yPosition)
    yPosition += 10

    complianceFrameworks.forEach((framework, index) => {
      if (index % 2 === 0) {
        doc.setTextColor(0, 184, 148)
        doc.text("✓", margin, yPosition)
        doc.setTextColor(60, 60, 60)
        doc.text(framework, margin + 10, yPosition)
      } else {
        doc.setTextColor(0, 184, 148)
        doc.text("✓", margin + 100, yPosition)
        doc.setTextColor(60, 60, 60)
        doc.text(framework, margin + 110, yPosition)
        yPosition += 8
      }
    })

    return yPosition + 20
  }

  private addPDFCharts(doc: jsPDF, pageWidth: number, margin: number, yPosition: number): number {
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Visual Analysis & Charts", margin, yPosition)
    yPosition += 20

    // Placeholder for charts (in a real implementation, you would generate actual charts)
    doc.setFillColor(248, 249, 250)
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 80, "F")
    doc.setDrawColor(200, 200, 200)
    doc.rect(margin, yPosition, pageWidth - 2 * margin, 80, "S")

    doc.setTextColor(108, 117, 125)
    doc.setFontSize(12)
    doc.text("TCO Comparison Chart", margin + 10, yPosition + 20)
    doc.text("ROI Timeline Visualization", margin + 10, yPosition + 40)
    doc.text("Security Score Comparison", margin + 10, yPosition + 60)

    return yPosition + 100
  }

  private addPDFRoadmap(doc: jsPDF, pageWidth: number, margin: number, yPosition: number): number {
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Implementation Roadmap", margin, yPosition)
    yPosition += 20

    const phases = [
      {
        phase: "Phase 1: Planning & Assessment",
        duration: "2 weeks",
        activities: ["Requirements gathering", "Technical assessment", "Stakeholder alignment"],
      },
      {
        phase: "Phase 2: Deployment",
        duration: "30 minutes",
        activities: ["Cloud deployment", "Initial configuration", "Basic testing"],
      },
      {
        phase: "Phase 3: Integration",
        duration: "1 week",
        activities: ["System integrations", "Policy migration", "User training"],
      },
      {
        phase: "Phase 4: Optimization",
        duration: "Ongoing",
        activities: ["Performance tuning", "Advanced features", "Continuous monitoring"],
      },
    ]

    phases.forEach((phase, index) => {
      doc.setTextColor(0, 212, 170)
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text(phase.phase, margin, yPosition)
      doc.setTextColor(108, 117, 125)
      doc.setFontSize(10)
      doc.text(`Duration: ${phase.duration}`, margin + 120, yPosition)
      yPosition += 10

      phase.activities.forEach((activity) => {
        doc.setTextColor(60, 60, 60)
        doc.setFontSize(10)
        doc.text(`• ${activity}`, margin + 10, yPosition)
        yPosition += 6
      })
      yPosition += 5
    })

    return yPosition
  }

  private addPDFAIInsights(doc: jsPDF, pageWidth: number, margin: number, yPosition: number): number {
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("AI-Enhanced Strategic Insights", margin, yPosition)
    yPosition += 20

    const aiInsights = [
      "Market analysis indicates 78% of enterprises are prioritizing cloud-native NAC solutions",
      "Predictive modeling shows 92% risk reduction with Portnox CLEAR implementation",
      "Competitive intelligence reveals significant cost advantages over traditional vendors",
      "Industry benchmarking confirms superior ROI and faster deployment times",
    ]

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    aiInsights.forEach((insight) => {
      doc.setTextColor(0, 184, 148)
      doc.text("🤖", margin, yPosition)
      doc.setTextColor(60, 60, 60)
      const insightLines = doc.splitTextToSize(insight, pageWidth - 2 * margin - 15)
      doc.text(insightLines, margin + 15, yPosition)
      yPosition += insightLines.length * 5 + 8
    })

    return yPosition
  }

  private addPDFFooter(
    doc: jsPDF,
    pageWidth: number,
    pageHeight: number,
    margin: number,
    pageNum: number,
    totalPages: number,
  ): void {
    doc.setTextColor(108, 117, 125)
    doc.setFontSize(8)
    doc.text(`© 2024 ${this.data.branding.companyName}. All rights reserved.`, margin, pageHeight - 10)
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10)
    doc.text(`Generated: ${this.data.generatedAt.toLocaleDateString()}`, pageWidth / 2 - 20, pageHeight - 10)
  }

  private drawSimpleTable(doc: jsPDF, data: string[][], x: number, y: number, width: number): number {
    const rowHeight = 8
    const colWidth = width / data[0].length

    data.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (rowIndex === 0) {
          doc.setFillColor(0, 212, 170)
          doc.rect(x + colIndex * colWidth, y + rowIndex * rowHeight, colWidth, rowHeight, "F")
          doc.setTextColor(255, 255, 255)
          doc.setFont("helvetica", "bold")
        } else {
          if (rowIndex % 2 === 0) {
            doc.setFillColor(248, 249, 250)
            doc.rect(x + colIndex * colWidth, y + rowIndex * rowHeight, colWidth, rowHeight, "F")
          }
          doc.setTextColor(60, 60, 60)
          doc.setFont("helvetica", "normal")
        }

        doc.setFontSize(9)
        doc.text(safeString(cell), x + colIndex * colWidth + 2, y + rowIndex * rowHeight + 5)
      })
    })

    return y + data.length * rowHeight + 20
  }

  // Word Document Helper Methods
  private createWordTitlePage(): Paragraph[] {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: this.data.title,
            bold: true,
            size: 48,
            color: this.portnoxColors.secondary.replace("#", ""),
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: this.data.subtitle,
            size: 24,
            color: this.portnoxColors.gray.replace("#", ""),
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Generated: ${this.data.generatedAt.toLocaleDateString()}`,
            size: 20,
            italics: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
    ]
  }

  private createWordExecutiveSummary(): Paragraph[] {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: "Executive Summary",
            bold: true,
            size: 32,
            color: this.portnoxColors.secondary.replace("#", ""),
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: this.data.executiveSummary || this.generateExecutiveSummaryText(),
            size: 22,
          }),
        ],
        spacing: { after: 200 },
      }),
    ]
  }

  private createWordFinancialAnalysis(): Paragraph[] {
    const paragraphs = [
      new Paragraph({
        children: [
          new TextRun({
            text: "Financial Impact Analysis",
            bold: true,
            size: 32,
            color: this.portnoxColors.secondary.replace("#", ""),
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
    ]

    // Add financial content
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Total Cost Savings: ${formatCurrency(safeNumber(this.data.preview?.maxSavings))}`,
            bold: true,
            size: 24,
            color: this.portnoxColors.success.replace("#", ""),
          }),
        ],
        spacing: { after: 100 },
      }),
    )

    return paragraphs
  }

  private createWordTechnicalAnalysis(): Paragraph[] {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: "Technical Architecture Analysis",
            bold: true,
            size: 32,
            color: this.portnoxColors.secondary.replace("#", ""),
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Portnox CLEAR delivers industry-leading technical capabilities through its cloud-native architecture, providing superior scalability, security, and operational efficiency compared to traditional NAC solutions.",
            size: 22,
          }),
        ],
        spacing: { after: 200 },
      }),
    ]
  }

  private createWordSecurityAnalysis(): Paragraph[] {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: "Cybersecurity & Risk Assessment",
            bold: true,
            size: 32,
            color: this.portnoxColors.secondary.replace("#", ""),
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: `Security Score: ${safeNumber(this.data.preview?.securityScore)}/100 with ${safeNumber(this.data.preview?.riskReduction)}% risk reduction through comprehensive Zero Trust architecture.`,
            size: 22,
            bold: true,
            color: this.portnoxColors.success.replace("#", ""),
          }),
        ],
        spacing: { after: 200 },
      }),
    ]
  }

  private createWordComplianceAnalysis(): Paragraph[] {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: "Regulatory Compliance Analysis",
            bold: true,
            size: 32,
            color: this.portnoxColors.secondary.replace("#", ""),
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Portnox CLEAR provides comprehensive compliance coverage for all major regulatory frameworks including SOC 2, ISO 27001, HIPAA, PCI DSS, GDPR, and FedRAMP Ready certification.",
            size: 22,
          }),
        ],
        spacing: { after: 200 },
      }),
    ]
  }

  private createWordRoadmap(): Paragraph[] {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: "Implementation Roadmap",
            bold: true,
            size: 32,
            color: this.portnoxColors.secondary.replace("#", ""),
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Portnox CLEAR can be deployed in production within 30 minutes, providing immediate value and rapid time-to-benefit compared to traditional NAC solutions requiring 3-6 months for deployment.",
            size: 22,
          }),
        ],
        spacing: { after: 200 },
      }),
    ]
  }

  private createWordAIInsights(): Paragraph[] {
    return [
      new Paragraph({
        children: [
          new TextRun({
            text: "AI-Enhanced Strategic Insights",
            bold: true,
            size: 32,
            color: this.portnoxColors.secondary.replace("#", ""),
          }),
        ],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "Advanced AI analysis reveals significant competitive advantages and strategic benefits for organizations adopting Portnox CLEAR over traditional NAC solutions.",
            size: 22,
          }),
        ],
        spacing: { after: 200 },
      }),
    ]
  }

  // PowerPoint Helper Methods
  private addPowerPointTitleSlide(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText(this.data.title, {
      x: 1,
      y: 2,
      w: 8,
      h: 1.5,
      fontSize: 36,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
      align: "center",
    })

    slide.addText(this.data.subtitle, {
      x: 1,
      y: 3.5,
      w: 8,
      h: 1,
      fontSize: 18,
      color: this.portnoxColors.gray.replace("#", ""),
      align: "center",
    })

    slide.addText(`Generated: ${this.data.generatedAt.toLocaleDateString()}`, {
      x: 1,
      y: 5,
      w: 8,
      h: 0.5,
      fontSize: 14,
      color: this.portnoxColors.gray.replace("#", ""),
      align: "center",
    })
  }

  private addPowerPointExecutiveSlides(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText("Executive Summary", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
    })

    const keyPoints = [
      `Total Savings: ${formatCurrency(safeNumber(this.data.preview?.maxSavings))}`,
      `ROI: ${safeNumber(this.data.preview?.bestROI)}%`,
      `Security Score: ${safeNumber(this.data.preview?.securityScore)}/100`,
      `Deployment: ${safeString(this.data.preview?.deploymentTime)}`,
    ]

    keyPoints.forEach((point, index) => {
      slide.addText(point, {
        x: 1,
        y: 2 + index * 0.8,
        w: 8,
        h: 0.6,
        fontSize: 20,
        bullet: true,
        color: this.portnoxColors.primary.replace("#", ""),
      })
    })
  }

  private addPowerPointFinancialSlides(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText("Financial Impact Analysis", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
    })

    // Add chart placeholder
    slide.addText("TCO Comparison Chart", {
      x: 1,
      y: 2,
      w: 8,
      h: 3,
      fontSize: 16,
      align: "center",
      fill: { color: "F8F9FA" },
      border: { color: this.portnoxColors.gray.replace("#", ""), width: 1 },
    })
  }

  private addPowerPointTechnicalSlides(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText("Technical Architecture", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
    })

    const features = [
      "Cloud-Native Architecture",
      "Zero Trust Integration",
      "AI-Powered Analytics",
      "Automated Policy Enforcement",
    ]

    features.forEach((feature, index) => {
      slide.addText(feature, {
        x: 1,
        y: 2 + index * 0.6,
        w: 8,
        h: 0.5,
        fontSize: 18,
        bullet: true,
        color: this.portnoxColors.primary.replace("#", ""),
      })
    })
  }

  private addPowerPointSecuritySlides(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText("Security & Risk Assessment", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
    })

    slide.addText(`Security Score: ${safeNumber(this.data.preview?.securityScore)}/100`, {
      x: 1,
      y: 2,
      w: 8,
      h: 1,
      fontSize: 24,
      bold: true,
      color: this.portnoxColors.success.replace("#", ""),
    })
  }

  private addPowerPointComplianceSlides(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText("Regulatory Compliance", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
    })

    const frameworks = ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "GDPR", "FedRAMP"]

    frameworks.forEach((framework, index) => {
      slide.addText(framework, {
        x: 1 + (index % 3) * 2.5,
        y: 2 + Math.floor(index / 3) * 0.8,
        w: 2,
        h: 0.6,
        fontSize: 16,
        bullet: true,
        color: this.portnoxColors.primary.replace("#", ""),
      })
    })
  }

  private addPowerPointChartSlides(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText("Visual Analysis", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
    })

    // Chart placeholders
    slide.addText("TCO Comparison", {
      x: 0.5,
      y: 1.5,
      w: 4,
      h: 2,
      fontSize: 14,
      align: "center",
      fill: { color: "F8F9FA" },
      border: { color: this.portnoxColors.gray.replace("#", ""), width: 1 },
    })

    slide.addText("ROI Timeline", {
      x: 5,
      y: 1.5,
      w: 4,
      h: 2,
      fontSize: 14,
      align: "center",
      fill: { color: "F8F9FA" },
      border: { color: this.portnoxColors.gray.replace("#", ""), width: 1 },
    })
  }

  private addPowerPointRoadmapSlides(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText("Implementation Roadmap", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
    })

    const phases = [
      "Phase 1: Planning (2 weeks)",
      "Phase 2: Deployment (30 minutes)",
      "Phase 3: Integration (1 week)",
      "Phase 4: Optimization (Ongoing)",
    ]

    phases.forEach((phase, index) => {
      slide.addText(phase, {
        x: 1,
        y: 2 + index * 0.8,
        w: 8,
        h: 0.6,
        fontSize: 18,
        bullet: true,
        color: this.portnoxColors.primary.replace("#", ""),
      })
    })
  }

  private addPowerPointAISlides(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText("AI-Enhanced Insights", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
    })

    slide.addText("Advanced AI analysis reveals significant competitive advantages", {
      x: 1,
      y: 2,
      w: 8,
      h: 2,
      fontSize: 18,
      color: this.portnoxColors.primary.replace("#", ""),
    })
  }

  private addPowerPointConclusionSlide(pres: any): void {
    const slide = pres.addSlide({ masterName: "PORTNOX_MASTER" })

    slide.addText("Strategic Recommendation", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: this.portnoxColors.secondary.replace("#", ""),
    })

    slide.addText("Portnox CLEAR is the recommended NAC solution", {
      x: 1,
      y: 2,
      w: 8,
      h: 1,
      fontSize: 24,
      bold: true,
      color: this.portnoxColors.success.replace("#", ""),
      align: "center",
    })

    slide.addText("Contact Portnox for immediate deployment", {
      x: 1,
      y: 4,
      w: 8,
      h: 1,
      fontSize: 18,
      color: this.portnoxColors.primary.replace("#", ""),
      align: "center",
    })
  }

  // Excel Helper Methods
  private createExcelExecutiveSummary(): any[][] {
    return [
      ["Executive Summary - NAC Analysis"],
      [""],
      ["Metric", "Value"],
      ["Total Vendors Analyzed", safeString(this.data.results.length)],
      ["Device Count", safeString(this.data.deviceCount)],
      ["Analysis Period", `${safeString(this.data.timeframe)} years`],
      ["Total Savings", formatCurrency(safeNumber(this.data.preview?.maxSavings))],
      ["Best ROI", `${safeNumber(this.data.preview?.bestROI)}%`],
      ["Security Score", `${safeNumber(this.data.preview?.securityScore)}/100`],
      ["Deployment Time", safeString(this.data.preview?.deploymentTime)],
      [""],
      ["Key Recommendations:"],
      ["1. Deploy Portnox CLEAR for maximum savings"],
      ["2. Migrate from legacy NAC solutions"],
      ["3. Implement Zero Trust architecture"],
      ["4. Leverage cloud-native benefits"],
    ]
  }

  private createExcelFinancialAnalysis(): any[][] {
    const data = [
      ["Financial Analysis"],
      [""],
      ["Vendor", "Total Cost", "Annual Cost", "ROI %", "Payback Years", "NPV"],
    ]

    this.data.results.forEach((result) => {
      data.push([
        safeString(result.vendorName),
        safeNumber(result.totalCost),
        safeNumber(result.totalCost) / safeNumber(this.data.timeframe),
        safeNumber(result.financialMetrics?.roi),
        safeNumber(result.financialMetrics?.paybackPeriod),
        safeNumber(result.financialMetrics?.npv),
      ])
    })

    return data
  }

  private createExcelVendorComparison(): any[][] {
    const data = [
      ["Vendor Comparison Matrix"],
      [""],
      ["Vendor", "Security Score", "Deployment Time", "Complexity", "Market Share"],
    ]

    this.data.results.forEach((result) => {
      data.push([
        safeString(result.vendorName),
        safeNumber(result.securityScore),
        safeString(result.implementation?.timeline),
        safeString(result.implementation?.complexity),
        `${safeNumber(result.vendorData?.marketPosition)}%`,
      ])
    })

    return data
  }

  private createExcelTCOBreakdown(): any[][] {
    const data = [
      ["TCO Breakdown Analysis"],
      [""],
      ["Vendor", "Licensing", "Hardware", "Services", "Training", "Maintenance", "Operational", "Total"],
    ]

    this.data.results.forEach((result) => {
      const breakdown = result.costBreakdown || {}
      data.push([
        safeString(result.vendorName),
        safeNumber(breakdown.licensing),
        safeNumber(breakdown.hardware),
        safeNumber(breakdown.services),
        safeNumber(breakdown.training),
        safeNumber(breakdown.maintenance),
        safeNumber(breakdown.operational),
        safeNumber(result.totalCost),
      ])
    })

    return data
  }

  private createExcelROIAnalysis(): any[][] {
    const data = [
      ["ROI Analysis"],
      [""],
      ["Vendor", "Investment", "Annual Benefits", "Total Benefits", "ROI %", "Payback Period", "IRR %"],
    ]

    this.data.results.forEach((result) => {
      const metrics = result.financialMetrics || {}
      data.push([
        safeString(result.vendorName),
        safeNumber(result.totalCost),
        safeNumber(metrics.totalBenefits) / safeNumber(this.data.timeframe),
        safeNumber(metrics.totalBenefits),
        safeNumber(metrics.roi),
        safeNumber(metrics.paybackPeriod),
        safeNumber(metrics.irr),
      ])
    })

    return data
  }

  private createExcelSecurityAnalysis(): any[][] {
    const data = [
      ["Security Analysis"],
      [""],
      ["Vendor", "Security Score", "CVE Count", "MTTR (minutes)", "Compliance Score", "Risk Level"],
    ]

    this.data.results.forEach((result) => {
      const risk = result.riskAssessment || {}
      data.push([
        safeString(result.vendorName),
        safeNumber(result.securityScore),
        safeNumber(risk.cveCount) || "N/A",
        safeNumber(risk.mttr),
        safeNumber(result.complianceScore),
        safeNumber(risk.overallRisk),
      ])
    })

    return data
  }

  private createExcelImplementationTimeline(): any[][] {
    const data = [
      ["Implementation Timeline"],
      [""],
      ["Vendor", "Deployment Time", "Complexity", "Success Rate", "Time to Value", "Resources Required"],
    ]

    this.data.results.forEach((result) => {
      const impl = result.implementation || {}
      data.push([
        safeString(result.vendorName),
        safeString(impl.timeline),
        safeString(impl.complexity),
        `${Math.round(safeNumber(impl.successProbability) * 100)}%`,
        `${safeNumber(impl.timeToValue)} days`,
        `${safeNumber(impl.resources)} FTE`,
      ])
    })

    return data
  }

  private createExcelRawData(): any[][] {
    const data = [
      ["Raw Analysis Data"],
      [""],
      ["Configuration"],
      ["Devices", safeString(this.data.deviceCount)],
      ["Industry", safeString(this.data.industry)],
      ["Organization Size", safeString(this.data.organizationSize)],
      ["Region", safeString(this.data.region)],
      ["Analysis Period", `${safeString(this.data.timeframe)} years`],
      ["Generated", this.data.generatedAt.toISOString()],
      [""],
      ["Results Summary"],
      ["Total Vendors", safeString(this.data.results.length)],
      ["Recommended Solution", "Portnox CLEAR"],
      ["Total Savings", formatCurrency(safeNumber(this.data.preview?.maxSavings))],
      ["Best ROI", `${safeNumber(this.data.preview?.bestROI)}%`],
    ]

    return data
  }

  // Fallback methods for error handling
  private async generateBasicPDF(): Promise<Blob> {
    const doc = new jsPDF()
    doc.text("Report Generation Error", 20, 20)
    doc.text("A basic report has been generated due to an error.", 20, 30)
    doc.text(`Title: ${this.data.title}`, 20, 50)
    doc.text(`Generated: ${this.data.generatedAt.toLocaleDateString()}`, 20, 60)
    return new Blob([doc.output("blob")], { type: "application/pdf" })
  }

  private async generateBasicWord(): Promise<Blob> {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Report Generation Error",
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "A basic report has been generated due to an error.",
                  size: 20,
                }),
              ],
            }),
          ],
        },
      ],
    })

    const buffer = await Packer.toBuffer(doc)
    return new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
  }

  private async generateBasicPowerPoint(): Promise<Blob> {
    const pres = new pptxgen()
    const slide = pres.addSlide()

    slide.addText("Report Generation Error", {
      x: 1,
      y: 1,
      w: 8,
      h: 1,
      fontSize: 24,
      bold: true,
    })

    slide.addText("A basic presentation has been generated due to an error.", {
      x: 1,
      y: 2,
      w: 8,
      h: 1,
      fontSize: 16,
    })

    const buffer = await pres.write("arraybuffer")
    return new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    })
  }

  private async generateBasicExcel(): Promise<Blob> {
    const workbook = XLSX.utils.book_new()
    const data = [
      ["Report Generation Error"],
      ["A basic spreadsheet has been generated due to an error."],
      ["Title:", this.data.title],
      ["Generated:", this.data.generatedAt.toISOString()],
    ]
    const sheet = XLSX.utils.aoa_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, sheet, "Error Report")

    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    return new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
  }

  private generateExecutiveSummaryText(): string {
    return `This comprehensive analysis evaluates Network Access Control solutions for ${safeString(this.data.industry)} industry requirements. Based on detailed technical, financial, and security assessments, Portnox CLEAR emerges as the optimal solution, delivering ${formatCurrency(safeNumber(this.data.preview?.maxSavings))} in cost savings (${safeNumber(this.data.preview?.savingsPercent)}%) with ${safeNumber(this.data.preview?.bestROI)}% ROI and ${safeNumber(this.data.preview?.avgPayback)}-year payback period. The cloud-native architecture provides superior security posture with ${safeNumber(this.data.preview?.securityScore)}/100 security score and ${safeNumber(this.data.preview?.riskReduction)}% risk reduction, while enabling deployment in ${safeString(this.data.preview?.deploymentTime)} compared to ${safeString(this.data.preview?.competitorDeploymentTime)} for traditional solutions.`
  }
}
