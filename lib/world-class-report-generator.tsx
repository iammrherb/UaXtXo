// Browser-Compatible World-Class Report Generator
// Generates professional enterprise reports without Node.js dependencies

export type ReportTemplate =
  | "comprehensive"
  | "executive"
  | "technical"
  | "financial"
  | "security"
  | "compliance"
  | "board"

export type ReportFormat = "pdf" | "word" | "excel" | "powerpoint"

export type OrganizationSize = "small" | "medium" | "large" | "enterprise"

export type DeploymentModel = "cloud" | "hybrid" | "on-premise"

export interface WorldClassReportData {
  title: string
  subtitle: string
  template: ReportTemplate
  format: ReportFormat
  generatedAt: Date

  organization: {
    name: string
    industry: string
    size: OrganizationSize
    deviceCount: number
    locations: number
    region: string
  }

  analysis: {
    timeframe: number
    vendors: string[]
    deploymentModel: DeploymentModel
    includeCharts: boolean
    includeDetails: boolean
    includeAIEnhancement: boolean
    includeBenchmarks: boolean
    includeRoadmap: boolean
    includeCompliance: boolean
  }

  financial: {
    portnoxCost: number
    competitorCosts: Record<string, number>
    savings: number
    roi: number
    paybackPeriod: number
    riskMitigation: number
  }

  content: {
    executiveSummary: string
    keyFindings: string[]
    recommendations: string[]
  }

  branding: {
    primaryColor: string
    secondaryColor: string
    logo: string
    companyName: string
    tagline: string
    website: string
    contact: string
  }

  advanced: {
    customCharts: any[]
    stakeholders: string[]
    complianceFrameworks: string[]
  }
}

// Browser-compatible PDF generation using jsPDF
export async function generateWorldClassReport(
  data: WorldClassReportData,
  format: ReportFormat = "pdf",
): Promise<Blob> {
  if (typeof window === "undefined") {
    throw new Error("Report generation is only available in browser environment")
  }

  try {
    // Dynamic import for browser-only usage
    const { jsPDF } = await import("jspdf")

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Set up document properties
    doc.setProperties({
      title: data.title,
      subject: data.subtitle,
      author: data.branding.companyName,
      creator: "Portnox TCO Analyzer",
    })

    let yPosition = 20

    // Header with Portnox branding
    doc.setFillColor(27, 41, 81) // Portnox dark blue
    doc.rect(0, 0, 210, 25, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("PORTNOX", 20, 15)

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Executive Intelligence Decision Platform", 20, 20)

    yPosition = 35

    // Title Section
    doc.setTextColor(27, 41, 81)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(data.title, 20, yPosition)
    yPosition += 10

    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 100, 100)
    doc.text(data.subtitle, 20, yPosition)
    yPosition += 20

    // Executive Summary Section
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(27, 41, 81)
    doc.text("Executive Summary", 20, yPosition)
    yPosition += 10

    // Key Metrics Cards
    const metrics = [
      { label: "Total Savings", value: `$${(data.financial.savings / 1000).toFixed(0)}K`, color: [0, 212, 170] },
      { label: "ROI", value: `${data.financial.roi}%`, color: [59, 130, 246] },
      { label: "Payback Period", value: `${data.financial.paybackPeriod} months`, color: [168, 85, 247] },
      { label: "Risk Reduction", value: "92%", color: [34, 197, 94] },
    ]

    let xPos = 20
    metrics.forEach((metric, index) => {
      // Metric card background
      doc.setFillColor(metric.color[0], metric.color[1], metric.color[2])
      doc.roundedRect(xPos, yPosition, 40, 20, 2, 2, "F")

      // Metric text
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text(metric.label, xPos + 2, yPosition + 6)

      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text(metric.value, xPos + 2, yPosition + 14)

      xPos += 45
    })

    yPosition += 35

    // TCO Comparison Table
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(27, 41, 81)
    doc.text("Total Cost of Ownership Comparison", 20, yPosition)
    yPosition += 15

    // Table header
    doc.setFillColor(240, 240, 240)
    doc.rect(20, yPosition, 170, 8, "F")

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 0, 0)
    doc.text("Vendor", 25, yPosition + 5)
    doc.text("3-Year TCO", 80, yPosition + 5)
    doc.text("Savings vs Portnox", 130, yPosition + 5)

    yPosition += 8

    // Table rows
    const vendors = [
      { name: "Portnox CLEAR", cost: data.financial.portnoxCost, savings: 0 },
      { name: "Cisco ISE", cost: data.financial.competitorCosts.cisco || 750000, savings: 500000 },
      { name: "Aruba ClearPass", cost: data.financial.competitorCosts.aruba || 625000, savings: 375000 },
    ]

    vendors.forEach((vendor, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250)
        doc.rect(20, yPosition, 170, 8, "F")
      }

      doc.setFontSize(9)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)
      doc.text(vendor.name, 25, yPosition + 5)
      doc.text(`$${(vendor.cost / 1000).toFixed(0)}K`, 80, yPosition + 5)

      if (vendor.savings > 0) {
        doc.setTextColor(34, 197, 94)
        doc.text(`$${(vendor.savings / 1000).toFixed(0)}K`, 130, yPosition + 5)
      } else {
        doc.setTextColor(100, 100, 100)
        doc.text("Baseline", 130, yPosition + 5)
      }

      yPosition += 8
    })

    yPosition += 15

    // Key Recommendations
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(27, 41, 81)
    doc.text("Strategic Recommendations", 20, yPosition)
    yPosition += 10

    const recommendations = [
      "Initiate Portnox CLEAR proof of concept within 30 days",
      "Develop comprehensive migration strategy for legacy NAC replacement",
      "Secure executive sponsorship for digital transformation initiative",
      "Establish success metrics and ROI tracking mechanisms",
      "Plan phased deployment to minimize operational disruption",
    ]

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0)

    recommendations.forEach((rec, index) => {
      doc.setFillColor(0, 212, 170)
      doc.circle(25, yPosition + 2, 1, "F")
      doc.text(`${index + 1}. ${rec}`, 30, yPosition + 3)
      yPosition += 8
    })

    // Add new page if needed
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    // Risk Analysis Section
    yPosition += 10
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(27, 41, 81)
    doc.text("Risk Mitigation Analysis", 20, yPosition)
    yPosition += 15

    const risks = [
      { category: "Security Breach Risk", reduction: "92%", value: "$920K" },
      { category: "Compliance Risk", reduction: "94%", value: "$470K" },
      { category: "Operational Risk", reduction: "86%", value: "$215K" },
      { category: "Reputation Risk", reduction: "85%", value: "$850K" },
    ]

    risks.forEach((risk, index) => {
      doc.setFillColor(index % 2 === 0 ? 250 : 240, 250, 250)
      doc.rect(20, yPosition, 170, 10, "F")

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(0, 0, 0)
      doc.text(risk.category, 25, yPosition + 6)

      doc.setTextColor(34, 197, 94)
      doc.setFont("helvetica", "bold")
      doc.text(risk.reduction, 120, yPosition + 6)
      doc.text(risk.value, 150, yPosition + 6)

      yPosition += 10
    })

    // Footer
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)

      // Footer background
      doc.setFillColor(27, 41, 81)
      doc.rect(0, 285, 210, 12, "F")

      doc.setTextColor(255, 255, 255)
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")
      doc.text("© 2024 Portnox Ltd. | enterprise@portnox.com | www.portnox.com", 20, 292)
      doc.text(`Generated: ${data.generatedAt.toLocaleDateString()} | Page ${i} of ${pageCount}`, 140, 292)
    }

    // Handle different formats
    switch (format) {
      case "pdf":
        return new Blob([doc.output("blob")], { type: "application/pdf" })

      case "word":
        // For Word format, create a structured HTML that can be saved as .docx
        const htmlContent = generateWordContent(data)
        return new Blob([htmlContent], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })

      case "excel":
        // For Excel format, create CSV content that can be imported
        const csvContent = generateExcelContent(data)
        return new Blob([csvContent], { type: "text/csv" })

      case "powerpoint":
        // For PowerPoint, create structured HTML for slides
        const pptContent = generatePowerPointContent(data)
        return new Blob([pptContent], { type: "text/html" })

      default:
        return new Blob([doc.output("blob")], { type: "application/pdf" })
    }
  } catch (error) {
    console.error("Report generation error:", error)
    throw new Error("Failed to generate report. Please try again.")
  }
}

function generateWordContent(data: WorldClassReportData): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${data.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { background: #1B2951; color: white; padding: 20px; margin-bottom: 30px; }
        .metric { display: inline-block; margin: 10px; padding: 15px; background: #f0f0f0; border-radius: 5px; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <h1>PORTNOX</h1>
        <h2>${data.title}</h2>
        <p>${data.subtitle}</p>
    </div>
    
    <h2>Executive Summary</h2>
    <div class="metric">Total Savings: $${(data.financial.savings / 1000).toFixed(0)}K</div>
    <div class="metric">ROI: ${data.financial.roi}%</div>
    <div class="metric">Payback: ${data.financial.paybackPeriod} months</div>
    
    <h2>TCO Comparison</h2>
    <table class="table">
        <tr><th>Vendor</th><th>3-Year TCO</th><th>Savings vs Portnox</th></tr>
        <tr><td>Portnox CLEAR</td><td>$${(data.financial.portnoxCost / 1000).toFixed(0)}K</td><td>Baseline</td></tr>
        <tr><td>Cisco ISE</td><td>$${((data.financial.competitorCosts.cisco || 750000) / 1000).toFixed(0)}K</td><td>$500K</td></tr>
        <tr><td>Aruba ClearPass</td><td>$${((data.financial.competitorCosts.aruba || 625000) / 1000).toFixed(0)}K</td><td>$375K</td></tr>
    </table>
    
    <h2>Strategic Recommendations</h2>
    <ol>
        <li>Initiate Portnox CLEAR proof of concept within 30 days</li>
        <li>Develop comprehensive migration strategy for legacy NAC replacement</li>
        <li>Secure executive sponsorship for digital transformation initiative</li>
        <li>Establish success metrics and ROI tracking mechanisms</li>
        <li>Plan phased deployment to minimize operational disruption</li>
    </ol>
</body>
</html>`
}

function generateExcelContent(data: WorldClassReportData): string {
  return `Vendor,3-Year TCO,Savings vs Portnox
Portnox CLEAR,${data.financial.portnoxCost},0
Cisco ISE,${data.financial.competitorCosts.cisco || 750000},500000
Aruba ClearPass,${data.financial.competitorCosts.aruba || 625000},375000

Metrics,Value
Total Savings,${data.financial.savings}
ROI,${data.financial.roi}%
Payback Period,${data.financial.paybackPeriod} months
Risk Reduction,92%

Risk Category,Reduction,Value
Security Breach Risk,92%,$920K
Compliance Risk,94%,$470K
Operational Risk,86%,$215K
Reputation Risk,85%,$850K`
}

function generatePowerPointContent(data: WorldClassReportData): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${data.title} - Presentation</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; }
        .slide { width: 100vw; height: 100vh; padding: 40px; box-sizing: border-box; page-break-after: always; }
        .slide-1 { background: linear-gradient(135deg, #1B2951, #00D4AA); color: white; }
        .slide-2 { background: white; }
        .title { font-size: 48px; font-weight: bold; margin-bottom: 20px; }
        .subtitle { font-size: 24px; margin-bottom: 40px; }
        .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .metric-card { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; }
    </style>
</head>
<body>
    <div class="slide slide-1">
        <div class="title">PORTNOX CLEAR</div>
        <div class="subtitle">${data.title}</div>
        <div class="subtitle">${data.subtitle}</div>
        <p>Executive Intelligence Decision Platform</p>
    </div>
    
    <div class="slide slide-2">
        <h1>Executive Summary</h1>
        <div class="metric-grid">
            <div class="metric-card">
                <h2>$${(data.financial.savings / 1000).toFixed(0)}K</h2>
                <p>Total Savings</p>
            </div>
            <div class="metric-card">
                <h2>${data.financial.roi}%</h2>
                <p>ROI</p>
            </div>
            <div class="metric-card">
                <h2>${data.financial.paybackPeriod} months</h2>
                <p>Payback Period</p>
            </div>
            <div class="metric-card">
                <h2>92%</h2>
                <p>Risk Reduction</p>
            </div>
        </div>
    </div>
</body>
</html>`
}

export function createSampleReportData(): WorldClassReportData {
  return {
    title: "Healthcare Systems Inc. - Network Access Control Analysis",
    subtitle: "Strategic Assessment for Healthcare Industry",
    template: "comprehensive",
    format: "pdf",
    generatedAt: new Date(),

    organization: {
      name: "Healthcare Systems Inc.",
      industry: "Healthcare",
      size: "large",
      deviceCount: 15000,
      locations: 25,
      region: "north-america",
    },

    analysis: {
      timeframe: 3,
      vendors: ["portnox", "cisco", "aruba"],
      deploymentModel: "cloud",
      includeCharts: true,
      includeDetails: true,
      includeAIEnhancement: false,
      includeBenchmarks: true,
      includeRoadmap: true,
      includeCompliance: true,
    },

    financial: {
      portnoxCost: 450000,
      competitorCosts: { cisco: 1200000, aruba: 875000 },
      savings: 750000,
      roi: 456,
      paybackPeriod: 0.5,
      riskMitigation: 2400000,
    },

    content: {
      executiveSummary:
        "Healthcare Systems Inc. can achieve significant cost savings and security improvements by migrating to Portnox CLEAR.",
      keyFindings: [
        "65% cost reduction compared to traditional NAC solutions",
        "92% reduction in security breach risk",
        "30-minute deployment vs 6-month traditional implementations",
        "Zero CVEs vs 47 CVEs in competing solutions",
      ],
      recommendations: [
        "Initiate Portnox CLEAR proof of concept within 30 days",
        "Develop comprehensive migration strategy for legacy NAC replacement",
        "Secure executive sponsorship for digital transformation initiative",
      ],
    },

    branding: {
      primaryColor: "#00D4AA",
      secondaryColor: "#1B2951",
      logo: "/portnox-logo.png",
      companyName: "Portnox Ltd.",
      tagline: "Enterprise Network Access Control Solutions",
      website: "www.portnox.com",
      contact: "enterprise@portnox.com",
    },

    advanced: {
      customCharts: [],
      stakeholders: ["CISO", "CIO", "CFO"],
      complianceFrameworks: ["HIPAA", "SOC 2", "PCI DSS"],
    },
  }
}
