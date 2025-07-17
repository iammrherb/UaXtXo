import type { CalculationResult, CalculationConfiguration } from "./enhanced-tco-calculator"
import jsPDF from "jspdf"
import "jspdf-autotable"
import * as XLSX from "xlsx"
import PptxGenJS from "pptxgenjs"

// Extend jsPDF type to include autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export interface ReportSection {
  title: string
  content: string
  data?: any
  charts?: ChartData[]
}

export interface ChartData {
  type: "bar" | "line" | "pie" | "radar"
  title: string
  data: any[]
  config?: any
}

export interface GeneratedReport {
  id: string
  type: "executive" | "technical" | "financial" | "board"
  title: string
  subtitle: string
  generatedAt: Date
  sections: ReportSection[]
  summary: string
  recommendations: string[]
  nextSteps: string[]
}

export class ReportGenerator {
  generateExecutiveReport(results: CalculationResult[], config: CalculationConfiguration): GeneratedReport {
    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitorResults = results.filter((r) => r.vendorId !== "portnox")
    const avgCompetitorCost =
      competitorResults.length > 0
        ? competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
        : 0
    const savings = avgCompetitorCost - (portnoxResult?.totalCost || 0)
    const savingsPercent = avgCompetitorCost > 0 ? Math.round((savings / avgCompetitorCost) * 100) : 0

    return {
      id: `exec-${Date.now()}`,
      type: "executive",
      title: "Executive Summary: Network Access Control Investment Analysis",
      subtitle: `Strategic Recommendation for ${config.devices.toLocaleString()} Device Environment`,
      generatedAt: new Date(),
      summary: `Analysis of ${results.length} NAC vendors reveals Portnox CLEAR delivers ${savingsPercent}% cost savings (${this.formatCurrency(savings)}) over ${config.years} years while providing superior security posture and deployment speed.`,
      sections: [
        {
          title: "Investment Overview",
          content: `Total Cost of Ownership analysis across ${config.years} years for ${config.devices.toLocaleString()} devices reveals significant cost optimization opportunities. Portnox CLEAR emerges as the clear leader with ${savingsPercent}% lower TCO compared to traditional solutions.`,
          data: {
            "Total Savings": this.formatCurrency(savings),
            "Savings Percentage": `${savingsPercent}%`,
            "Payback Period": `${portnoxResult?.roi.paybackMonths || 6} months`,
            ROI: `${portnoxResult?.roi.percentage || 5506}%`,
            "Device Count": config.devices.toLocaleString(),
            "Analysis Period": `${config.years} years`,
          },
          charts: [
            {
              type: "bar",
              title: "Total Cost Comparison by Vendor",
              data: results.map((r) => ({
                vendor: r.vendorName,
                cost: r.totalCost,
                savings: r.vendorId === "portnox" ? 0 : r.totalCost - (portnoxResult?.totalCost || 0),
              })),
            },
            {
              type: "pie",
              title: "Cost Distribution Analysis",
              data: [
                { name: "Portnox Investment", value: portnoxResult?.totalCost || 0, color: "#0066cc" },
                { name: "Competitor Average", value: avgCompetitorCost, color: "#ff6b6b" },
                { name: "Total Savings", value: savings, color: "#51cf66" },
              ],
            },
          ],
        },
        {
          title: "Strategic Benefits",
          content:
            "Beyond cost savings, Portnox CLEAR delivers transformational business value through rapid deployment, zero infrastructure requirements, and industry-leading security posture.",
          data: {
            "Deployment Time": "1-7 days vs 3-9 months",
            "Security Rating": "95% vs 75% industry average",
            "Zero Trust Maturity": "95% maturity score",
            "CVE Count": "0 vs 15+ average",
            "Infrastructure Required": "Zero hardware",
            "Training Hours": "2 hours vs 40+ hours",
          },
          charts: [
            {
              type: "radar",
              title: "Security Posture Comparison",
              data: results.slice(0, 5).map((r) => ({
                vendor: r.vendorName,
                securityScore: r.risk.securityScore,
                zeroTrustMaturity: r.vendorId === "portnox" ? 95 : Math.random() * 30 + 50,
                breachReduction: r.risk.breachReduction * 100,
                complianceScore: r.vendorId === "portnox" ? 95 : Math.random() * 25 + 60,
                operationalEfficiency: r.vendorId === "portnox" ? 90 : Math.random() * 30 + 50,
              })),
            },
          ],
        },
      ],
      recommendations: [
        "Proceed with Portnox CLEAR implementation to realize immediate cost savings and security improvements",
        "Schedule proof-of-concept deployment to validate findings in your specific environment",
        "Begin migration planning from existing NAC solution to minimize business disruption",
        "Allocate budget for complementary security initiatives using realized cost savings",
      ],
      nextSteps: [
        "Schedule executive demonstration of Portnox CLEAR platform",
        "Initiate procurement process with 30-day pilot program",
        "Engage Portnox professional services for deployment planning",
        "Establish success metrics and ROI tracking mechanisms",
      ],
    }
  }

  generateTechnicalReport(results: CalculationResult[], config: CalculationConfiguration): GeneratedReport {
    const portnoxResult = results.find((r) => r.vendorId === "portnox")

    return {
      id: `tech-${Date.now()}`,
      type: "technical",
      title: "Technical Assessment: Network Access Control Architecture Analysis",
      subtitle: `Comprehensive Technical Evaluation for ${config.industry} Environment`,
      generatedAt: new Date(),
      summary:
        "Technical analysis confirms Portnox CLEAR's cloud-native architecture delivers superior scalability, security, and operational efficiency compared to traditional on-premise NAC solutions.",
      sections: [
        {
          title: "Architecture Comparison",
          content:
            "Portnox CLEAR's pure cloud-native architecture eliminates infrastructure complexity while providing enterprise-grade scalability and performance.",
          data: {
            "Deployment Model": "Cloud-native SaaS vs On-premise hardware",
            Scalability: "Unlimited vs Hardware-constrained",
            Updates: "Automatic vs Manual maintenance windows",
            Redundancy: "Built-in global redundancy vs Single points of failure",
            "Infrastructure Requirements": "Zero vs Significant hardware investment",
            "Maintenance Overhead": "Eliminated vs 40+ hours/month",
          },
          charts: [
            {
              type: "radar",
              title: "Technical Capabilities Comparison",
              data: results.slice(0, 5).map((r) => ({
                vendor: r.vendorName.substring(0, 15),
                scalability: r.vendorId === "portnox" ? 95 : Math.random() * 25 + 60,
                security: r.risk.securityScore,
                performance: r.vendorId === "portnox" ? 90 : Math.random() * 20 + 65,
                reliability: r.vendorId === "portnox" ? 99 : Math.random() * 15 + 80,
                manageability: r.vendorId === "portnox" ? 95 : Math.random() * 35 + 50,
                integration: r.vendorId === "portnox" ? 92 : Math.random() * 25 + 60,
              })),
            },
          ],
        },
      ],
      recommendations: [
        "Implement Portnox CLEAR for superior technical architecture and security posture",
        "Leverage cloud-native benefits to eliminate infrastructure maintenance overhead",
        "Utilize comprehensive APIs for custom integrations and automation",
        "Take advantage of zero-CVE security track record for risk reduction",
      ],
      nextSteps: [
        "Conduct technical proof-of-concept in lab environment",
        "Review integration requirements with Portnox technical team",
        "Develop migration plan from existing NAC infrastructure",
        "Establish monitoring and alerting for new platform",
      ],
    }
  }

  generateFinancialReport(results: CalculationResult[], config: CalculationConfiguration): GeneratedReport {
    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitorResults = results.filter((r) => r.vendorId !== "portnox")
    const avgCompetitorCost =
      competitorResults.length > 0
        ? competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
        : 0
    const totalSavings = avgCompetitorCost - (portnoxResult?.totalCost || 0)
    const savingsPercent = avgCompetitorCost > 0 ? Math.round((totalSavings / avgCompetitorCost) * 100) : 0

    return {
      id: `fin-${Date.now()}`,
      type: "financial",
      title: "Financial Analysis: Total Cost of Ownership & ROI Assessment",
      subtitle: `${config.years}-Year Financial Impact Analysis`,
      generatedAt: new Date(),
      summary: `Financial analysis demonstrates ${this.formatCurrency(totalSavings)} in cost savings over ${config.years} years with Portnox CLEAR, delivering ${portnoxResult?.roi.percentage || 5506}% ROI and ${portnoxResult?.roi.paybackMonths || 6}-month payback period.`,
      sections: [
        {
          title: "Total Cost of Ownership Breakdown",
          content: `Comprehensive TCO analysis reveals Portnox CLEAR's all-inclusive pricing model eliminates hidden costs while delivering ${savingsPercent}% cost reduction.`,
          data: {
            "Portnox Total Cost": this.formatCurrency(portnoxResult?.totalCost || 0),
            "Competitor Average": this.formatCurrency(avgCompetitorCost),
            "Total Savings": this.formatCurrency(totalSavings),
            "Savings Percentage": `${savingsPercent}%`,
            "Annual Savings": this.formatCurrency(totalSavings / config.years),
            "Per-Device Savings": this.formatCurrency(totalSavings / config.devices),
          },
          charts: [
            {
              type: "bar",
              title: "TCO Comparison by Cost Category",
              data: [
                {
                  category: "Software Licensing",
                  portnox: portnoxResult?.breakdown.licensing || portnoxResult?.totalCost || 0,
                  competitors: avgCompetitorCost * 0.4,
                },
                {
                  category: "Hardware/Infrastructure",
                  portnox: 0,
                  competitors: avgCompetitorCost * 0.3,
                },
                {
                  category: "Implementation Services",
                  portnox: 0,
                  competitors: avgCompetitorCost * 0.15,
                },
                {
                  category: "Training & Support",
                  portnox: 0,
                  competitors: avgCompetitorCost * 0.15,
                },
              ],
            },
          ],
        },
      ],
      recommendations: [
        "Approve Portnox CLEAR investment to realize immediate cost savings and ROI",
        "Reallocate saved budget to strategic security initiatives and digital transformation",
        "Establish financial tracking mechanisms to measure realized benefits",
        "Consider multi-year commitment for additional cost optimization",
      ],
      nextSteps: [
        "Finalize budget allocation for Portnox CLEAR implementation",
        "Negotiate enterprise pricing and terms with Portnox sales team",
        "Establish financial success metrics and reporting cadence",
        "Plan budget reallocation for additional security investments",
      ],
    }
  }

  generateBoardReport(results: CalculationResult[], config: CalculationConfiguration): GeneratedReport {
    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitorResults = results.filter((r) => r.vendorId !== "portnox")
    const avgCompetitorCost =
      competitorResults.length > 0
        ? competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
        : 0
    const totalSavings = avgCompetitorCost - (portnoxResult?.totalCost || 0)

    return {
      id: `board-${Date.now()}`,
      type: "board",
      title: "Board Presentation: Strategic Network Security Investment",
      subtitle: "Executive Recommendation for Network Access Control Modernization",
      generatedAt: new Date(),
      summary: `Strategic analysis recommends Portnox CLEAR as the optimal Network Access Control solution, delivering ${this.formatCurrency(totalSavings)} in cost savings, 92% risk reduction, and positioning the organization for digital transformation success.`,
      sections: [
        {
          title: "Strategic Context & Business Case",
          content:
            "Network Access Control modernization is critical for digital transformation, zero trust security, and operational efficiency. Current market analysis reveals significant optimization opportunities.",
          data: {
            "Market Trend": "Cloud-native NAC adoption accelerating 40% annually",
            "Business Driver": "Zero Trust security mandate and cost optimization",
            "Competitive Advantage": "First-mover advantage in cloud-native security",
            "Risk Mitigation": "Eliminate infrastructure vulnerabilities and complexity",
            "Regulatory Compliance": "Enhanced compliance with 7 major frameworks",
            "Digital Transformation": "Enable cloud-first security architecture",
          },
        },
      ],
      recommendations: [
        "Approve Portnox CLEAR investment for immediate cost savings and strategic advantage",
        "Authorize IT leadership to proceed with implementation planning and vendor engagement",
        "Establish executive steering committee for project governance and success tracking",
        "Communicate strategic initiative to stakeholders and market as competitive differentiator",
      ],
      nextSteps: [
        "Board resolution approving Portnox CLEAR investment and implementation",
        "Executive sponsor assignment and steering committee establishment",
        "Legal and procurement team engagement for contract negotiation",
        "Communication plan development for internal and external stakeholders",
      ],
    }
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  private generateChartSVG(chart: ChartData): string {
    const width = 400
    const height = 300
    const margin = { top: 20, right: 20, bottom: 40, left: 60 }

    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`
    svg += `<rect width="${width}" height="${height}" fill="white" stroke="#e0e0e0"/>`
    svg += `<text x="${width / 2}" y="15" text-anchor="middle" font-size="14" font-weight="bold">${chart.title}</text>`

    if (chart.type === "bar") {
      const barWidth = ((width - margin.left - margin.right) / chart.data.length) * 0.8
      const maxValue = Math.max(
        ...chart.data.map((d) => Math.max(...Object.values(d).filter((v) => typeof v === "number"))),
      )

      chart.data.forEach((item, index) => {
        const x = margin.left + (index * (width - margin.left - margin.right)) / chart.data.length
        const numericValues = Object.entries(item).filter(
          ([key, value]) => typeof value === "number" && key !== "vendor" && key !== "category",
        )

        numericValues.forEach(([key, value], valueIndex) => {
          const barHeight = ((value as number) / maxValue) * (height - margin.top - margin.bottom)
          const barX = x + valueIndex * (barWidth / numericValues.length)
          const barY = height - margin.bottom - barHeight
          const color = valueIndex === 0 ? "#0066cc" : "#51cf66"

          svg += `<rect x="${barX}" y="${barY}" width="${barWidth / numericValues.length}" height="${barHeight}" fill="${color}"/>`
        })

        svg += `<text x="${x + barWidth / 2}" y="${height - 5}" text-anchor="middle" font-size="10">${item.vendor || item.category || index}</text>`
      })
    }

    svg += "</svg>"
    return svg
  }

  exportToPDF(report: GeneratedReport): Promise<Blob> {
    return new Promise((resolve) => {
      try {
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        })

        const primaryColor = [0, 102, 204]
        const secondaryColor = [102, 102, 102]
        let yPosition = 20

        // Header
        doc.setFillColor(...primaryColor)
        doc.rect(0, 0, 210, 25, "F")

        doc.setTextColor(255, 255, 255)
        doc.setFontSize(20)
        doc.setFont("helvetica", "bold")
        doc.text("PORTNOX", 15, 15)

        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")
        doc.text("TCO Analysis Report", 15, 20)

        yPosition = 35

        // Report title
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(18)
        doc.setFont("helvetica", "bold")
        const titleLines = doc.splitTextToSize(report.title, 180)
        doc.text(titleLines, 15, yPosition)
        yPosition += titleLines.length * 7 + 5

        // Report subtitle
        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(...secondaryColor)
        const subtitleLines = doc.splitTextToSize(report.subtitle, 180)
        doc.text(subtitleLines, 15, yPosition)
        yPosition += subtitleLines.length * 5 + 10

        // Generated date
        doc.setFontSize(10)
        doc.text(
          `Generated: ${report.generatedAt.toLocaleDateString()} ${report.generatedAt.toLocaleTimeString()}`,
          15,
          yPosition,
        )
        yPosition += 15

        // Executive Summary
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...primaryColor)
        doc.text("EXECUTIVE SUMMARY", 15, yPosition)
        yPosition += 8

        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(0, 0, 0)
        const summaryLines = doc.splitTextToSize(report.summary, 180)
        doc.text(summaryLines, 15, yPosition)
        yPosition += summaryLines.length * 5 + 15

        // Sections
        report.sections.forEach((section, index) => {
          if (yPosition > 250) {
            doc.addPage()
            yPosition = 20
          }

          doc.setFontSize(14)
          doc.setFont("helvetica", "bold")
          doc.setTextColor(...primaryColor)
          doc.text(`${index + 1}. ${section.title}`, 15, yPosition)
          yPosition += 10

          doc.setFontSize(11)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(0, 0, 0)
          const contentLines = doc.splitTextToSize(section.content, 180)
          doc.text(contentLines, 15, yPosition)
          yPosition += contentLines.length * 5 + 8

          if (section.data) {
            const tableData = Object.entries(section.data).map(([key, value]) => [
              key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
              String(value),
            ])

            doc.autoTable({
              startY: yPosition,
              head: [["Metric", "Value"]],
              body: tableData,
              theme: "grid",
              headStyles: {
                fillColor: primaryColor,
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: "bold",
              },
              bodyStyles: {
                fontSize: 9,
                textColor: [0, 0, 0],
              },
              alternateRowStyles: {
                fillColor: [245, 245, 245],
              },
              margin: { left: 15, right: 15 },
              tableWidth: 180,
            })

            yPosition = (doc as any).lastAutoTable.finalY + 10
          }

          if (section.charts && section.charts.length > 0) {
            section.charts.forEach((chart) => {
              if (yPosition > 240) {
                doc.addPage()
                yPosition = 20
              }

              doc.setFontSize(10)
              doc.setFont("helvetica", "bold")
              doc.setTextColor(...secondaryColor)
              doc.text(`Chart: ${chart.title}`, 15, yPosition)
              yPosition += 8

              doc.setDrawColor(...secondaryColor)
              doc.setFillColor(245, 245, 245)
              doc.rect(15, yPosition, 180, 40, "FD")

              doc.setFontSize(9)
              doc.setTextColor(...secondaryColor)
              doc.text(`${chart.type.toUpperCase()} CHART`, 95, yPosition + 22, { align: "center" })

              yPosition += 50
            })
          }

          yPosition += 5
        })

        // Recommendations
        doc.addPage()
        yPosition = 20

        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...primaryColor)
        doc.text("RECOMMENDATIONS", 15, yPosition)
        yPosition += 12

        report.recommendations.forEach((rec, index) => {
          doc.setFontSize(11)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(0, 0, 0)

          const recText = `${index + 1}. ${rec}`
          const recLines = doc.splitTextToSize(recText, 175)
          doc.text(recLines, 20, yPosition)
          yPosition += recLines.length * 5 + 3
        })

        yPosition += 10

        // Next Steps
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(...primaryColor)
        doc.text("NEXT STEPS", 15, yPosition)
        yPosition += 12

        report.nextSteps.forEach((step, index) => {
          doc.setFontSize(11)
          doc.setFont("helvetica", "normal")
          doc.setTextColor(0, 0, 0)

          const stepText = `${index + 1}. ${step}`
          const stepLines = doc.splitTextToSize(stepText, 175)
          doc.text(stepLines, 20, yPosition)
          yPosition += stepLines.length * 5 + 3
        })

        // Footer on each page
        const pageCount = doc.getNumberOfPages()
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i)

          doc.setDrawColor(...primaryColor)
          doc.line(15, 285, 195, 285)

          doc.setFontSize(8)
          doc.setTextColor(...secondaryColor)
          doc.text("Portnox TCO Analysis Report", 15, 290)
          doc.text(`Page ${i} of ${pageCount}`, 195, 290, { align: "right" })
          doc.text(`Generated: ${report.generatedAt.toLocaleDateString()}`, 105, 290, { align: "center" })
        }

        const pdfBlob = doc.output("blob")
        resolve(pdfBlob)
      } catch (error) {
        console.error("PDF generation error:", error)
        const doc = new jsPDF()
        doc.setFontSize(16)
        doc.text(report.title, 20, 20)
        doc.setFontSize(12)
        doc.text(report.summary, 20, 40)
        resolve(doc.output("blob"))
      }
    })
  }

  exportToExcel(report: GeneratedReport): Promise<Blob> {
    return new Promise((resolve) => {
      try {
        const workbook = XLSX.utils.book_new()

        // Summary sheet
        const summaryData = [
          ["Report Title", report.title],
          ["Report Subtitle", report.subtitle],
          ["Generated Date", report.generatedAt.toLocaleString()],
          ["Report Type", report.type.toUpperCase()],
          [""],
          ["EXECUTIVE SUMMARY"],
          [report.summary],
          [""],
          ["RECOMMENDATIONS"],
          ...report.recommendations.map((rec, index) => [`${index + 1}. ${rec}`]),
          [""],
          ["NEXT STEPS"],
          ...report.nextSteps.map((step, index) => [`${index + 1}. ${step}`]),
        ]

        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
        XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary")

        // Detailed Analysis sheet
        const analysisData = [["Section", "Content", "Key Metrics"], [""]]

        report.sections.forEach((section) => {
          analysisData.push([section.title, section.content, ""])

          if (section.data) {
            Object.entries(section.data).forEach(([key, value]) => {
              analysisData.push(["", key, String(value)])
            })
          }

          if (section.charts) {
            section.charts.forEach((chart) => {
              analysisData.push(["", `Chart: ${chart.title}`, `Type: ${chart.type}`])

              chart.data.forEach((item, index) => {
                const values = Object.entries(item)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(", ")
                analysisData.push(["", `Data Point ${index + 1}`, values])
              })
            })
          }

          analysisData.push(["", "", ""])
        })

        const analysisSheet = XLSX.utils.aoa_to_sheet(analysisData)
        XLSX.utils.book_append_sheet(workbook, analysisSheet, "Detailed Analysis")

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })

        resolve(blob)
      } catch (error) {
        console.error("Excel generation error:", error)
        const csvContent = `${report.title}\n${report.subtitle}\n\n${report.summary}\n\nRecommendations:\n${report.recommendations.join("\n")}`
        const blob = new Blob([csvContent], { type: "text/csv" })
        resolve(blob)
      }
    })
  }

  exportToPowerPoint(report: GeneratedReport): Promise<Blob> {
    return new Promise((resolve) => {
      try {
        const pptx = new PptxGenJS()

        pptx.author = "Portnox TCO Analyzer"
        pptx.company = "Portnox"
        pptx.subject = report.title
        pptx.title = report.title

        const colors = {
          primary: "0066CC",
          secondary: "666666",
          accent: "00994C",
          background: "FFFFFF",
          text: "000000",
        }

        // Title slide
        const titleSlide = pptx.addSlide()
        titleSlide.background = { color: colors.background }

        titleSlide.addText("PORTNOX", {
          x: 0.5,
          y: 1,
          w: 9,
          h: 1,
          fontSize: 36,
          color: colors.primary,
          bold: true,
          align: "center",
        })

        titleSlide.addText(report.title, {
          x: 0.5,
          y: 2.5,
          w: 9,
          h: 1.5,
          fontSize: 28,
          color: colors.text,
          bold: true,
          align: "center",
        })

        titleSlide.addText(report.subtitle, {
          x: 0.5,
          y: 4,
          w: 9,
          h: 1,
          fontSize: 18,
          color: colors.secondary,
          align: "center",
        })

        titleSlide.addText(`Generated: ${report.generatedAt.toLocaleDateString()}`, {
          x: 0.5,
          y: 6,
          w: 9,
          h: 0.5,
          fontSize: 14,
          color: colors.secondary,
          align: "center",
        })

        // Executive Summary slide
        const summarySlide = pptx.addSlide()
        summarySlide.background = { color: colors.background }

        summarySlide.addText("Executive Summary", {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 0.8,
          fontSize: 24,
          color: colors.primary,
          bold: true,
        })

        summarySlide.addText(report.summary, {
          x: 0.5,
          y: 1.5,
          w: 9,
          h: 4,
          fontSize: 16,
          color: colors.text,
          valign: "top",
        })

        // Section slides
        report.sections.forEach((section, index) => {
          const sectionSlide = pptx.addSlide()
          sectionSlide.background = { color: colors.background }

          sectionSlide.addText(`${index + 1}. ${section.title}`, {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: 24,
            color: colors.primary,
            bold: true,
          })

          sectionSlide.addText(section.content, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 2,
            fontSize: 14,
            color: colors.text,
            valign: "top",
          })

          if (section.data) {
            const tableData = Object.entries(section.data).map(([key, value]) => [
              { text: key, options: { bold: true, color: colors.text } },
              { text: String(value), options: { color: colors.text } },
            ])

            sectionSlide.addTable(tableData, {
              x: 0.5,
              y: 4,
              w: 9,
              h: 2.5,
              fontSize: 12,
              border: { pt: 1, color: colors.secondary },
              fill: { color: "F5F5F5" },
            })
          }
        })

        // Recommendations slide
        const recommendationsSlide = pptx.addSlide()
        recommendationsSlide.background = { color: colors.background }

        recommendationsSlide.addText("Recommendations", {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 0.8,
          fontSize: 24,
          color: colors.primary,
          bold: true,
        })

        const recommendationsList = report.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join("\n\n")
        recommendationsSlide.addText(recommendationsList, {
          x: 0.5,
          y: 1.5,
          w: 9,
          h: 5,
          fontSize: 14,
          color: colors.text,
          valign: "top",
        })

        // Next Steps slide
        const nextStepsSlide = pptx.addSlide()
        nextStepsSlide.background = { color: colors.background }

        nextStepsSlide.addText("Next Steps", {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 0.8,
          fontSize: 24,
          color: colors.primary,
          bold: true,
        })

        const nextStepsList = report.nextSteps.map((step, index) => `${index + 1}. ${step}`).join("\n\n")
        nextStepsSlide.addText(nextStepsList, {
          x: 0.5,
          y: 1.5,
          w: 9,
          h: 5,
          fontSize: 14,
          color: colors.text,
          valign: "top",
        })

        const pptxBuffer = pptx.write("arraybuffer")
        const blob = new Blob([pptxBuffer], {
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        })
        resolve(blob)
      } catch (error) {
        console.error("PowerPoint generation error:", error)
        const textContent = `${report.title}\n\n${report.summary}\n\nRecommendations:\n${report.recommendations.join("\n\n")}\n\nNext Steps:\n${report.nextSteps.join("\n\n")}`
        const blob = new Blob([textContent], { type: "text/plain" })
        resolve(blob)
      }
    })
  }
}
