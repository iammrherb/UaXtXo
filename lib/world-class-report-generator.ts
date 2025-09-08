import jsPDF from "jspdf"
import "jspdf-autotable"

// Export all the types that are imported in reports-view.tsx
export type ReportTemplate =
  | "comprehensive"
  | "executive"
  | "technical"
  | "financial"
  | "security"
  | "compliance"
  | "board"

export type ReportFormat = "pdf" | "word" | "powerpoint" | "excel"

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
    website?: string
    revenue?: string
    employees?: number
    headquarters?: string
    founded?: string
    stockSymbol?: string
    marketCap?: string
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
    aiInsights?: string
    companyProfile?: string
    industryAnalysis?: string
    threatLandscape?: string
    complianceRequirements?: string[]
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
    stakeholders: any[]
    complianceFrameworks: string[]
    executiveTeam?: Array<{
      name: string
      title: string
      linkedin?: string
    }>
    recentNews?: Array<{
      title: string
      date: string
      summary: string
      impact: string
      category: string
    }>
    securityEvents?: Array<{
      date: string
      type: string
      severity: string
      description: string
    }>
  }
}

// Main function to generate world-class reports
export async function generateWorldClassReport(
  data: WorldClassReportData,
  format: ReportFormat = "pdf",
): Promise<Blob> {
  console.log("Generating world-class report with format:", format)

  switch (format) {
    case "pdf":
      return generatePDFReport(data)
    case "word":
      return generateWordReport(data)
    case "powerpoint":
      return generatePowerPointReport(data)
    case "excel":
      return generateExcelReport(data)
    default:
      return generatePDFReport(data)
  }
}

// PDF Report Generation
async function generatePDFReport(data: WorldClassReportData): Promise<Blob> {
  console.log("Starting PDF generation for:", data.organization.name)

  const pdf = new jsPDF("p", "mm", "a4")
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20

  // Colors from branding
  const primaryColor = data.branding.primaryColor || "#00D4AA"
  const secondaryColor = data.branding.secondaryColor || "#1B2951"

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 212, b: 170 }
  }

  const primaryRgb = hexToRgb(primaryColor)
  const secondaryRgb = hexToRgb(secondaryColor)

  // Helper function to add header with Portnox branding
  const addHeader = () => {
    pdf.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b)
    pdf.rect(0, 0, pageWidth, 25, "F")

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "bold")
    pdf.text(data.branding.companyName, margin, 15)

    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(10)
    pdf.text(data.branding.tagline, pageWidth - margin, 15, { align: "right" })
  }

  // Helper function to add footer
  const addFooter = () => {
    const footerY = pageHeight - 15
    pdf.setFillColor(245, 245, 245)
    pdf.rect(0, footerY - 5, pageWidth, 20, "F")

    pdf.setTextColor(51, 51, 51)
    pdf.setFontSize(8)
    pdf.text(`Generated on ${data.generatedAt.toLocaleDateString()}`, margin, footerY)

    const pageInfo = pdf.getCurrentPageInfo()
    pdf.text(`Page ${pageInfo.pageNumber}`, pageWidth - margin, footerY, { align: "right" })
    pdf.text(data.branding.website, pageWidth / 2, footerY, { align: "center" })
  }

  // TITLE PAGE
  addHeader()

  // Main title
  pdf.setTextColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b)
  pdf.setFontSize(28)
  pdf.setFont("helvetica", "bold")
  pdf.text(data.title, pageWidth / 2, 80, { align: "center" })

  // Subtitle
  pdf.setFontSize(16)
  pdf.setFont("helvetica", "normal")
  pdf.text(data.subtitle, pageWidth / 2, 100, { align: "center" })

  // Organization info box
  pdf.setFillColor(245, 245, 245)
  pdf.rect(margin, 120, pageWidth - 2 * margin, 60, "F")

  pdf.setTextColor(51, 51, 51)
  pdf.setFontSize(12)
  pdf.setFont("helvetica", "bold")
  pdf.text("Organization Profile", margin + 10, 135)

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(10)
  const orgInfo = [
    `Company: ${data.organization.name}`,
    `Industry: ${data.organization.industry}`,
    `Size: ${data.organization.size} (${data.organization.employees?.toLocaleString() || "N/A"} employees)`,
    `Devices: ${data.organization.deviceCount.toLocaleString()}`,
    `Locations: ${data.organization.locations}`,
    `Analysis Period: ${data.analysis.timeframe} years`,
  ]

  orgInfo.forEach((info, index) => {
    pdf.text(info, margin + 10, 145 + index * 6)
  })

  addFooter()

  // EXECUTIVE SUMMARY PAGE
  pdf.addPage()
  addHeader()

  pdf.setTextColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b)
  pdf.setFontSize(20)
  pdf.setFont("helvetica", "bold")
  pdf.text("Executive Summary", margin, 50)

  pdf.setTextColor(51, 51, 51)
  pdf.setFontSize(11)
  pdf.setFont("helvetica", "normal")

  const summaryLines = pdf.splitTextToSize(data.content.executiveSummary, pageWidth - 2 * margin)
  pdf.text(summaryLines, margin, 65)

  // Key Metrics Box
  const metricsY = 120
  pdf.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b)
  pdf.rect(margin, metricsY, pageWidth - 2 * margin, 80, "F")

  pdf.setTextColor(255, 255, 255)
  pdf.setFontSize(16)
  pdf.setFont("helvetica", "bold")
  pdf.text("Key Financial Metrics", margin + 10, metricsY + 15)

  pdf.setFontSize(12)
  pdf.setFont("helvetica", "normal")
  const metrics = [
    `Total Cost Savings: $${(data.financial.savings / 1000).toFixed(0)}K`,
    `Return on Investment: ${data.financial.roi}%`,
    `Payback Period: ${data.financial.paybackPeriod} years`,
    `Risk Mitigation Value: $${(data.financial.riskMitigation / 1000).toFixed(0)}K`,
  ]

  metrics.forEach((metric, index) => {
    pdf.text(metric, margin + 10, metricsY + 35 + index * 10)
  })

  addFooter()

  // FINANCIAL ANALYSIS PAGE
  pdf.addPage()
  addHeader()

  pdf.setTextColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b)
  pdf.setFontSize(20)
  pdf.setFont("helvetica", "bold")
  pdf.text("Financial Analysis", margin, 50)

  // Cost Comparison Table
  pdf.setFontSize(14)
  pdf.text("Total Cost of Ownership Comparison", margin, 70)

  const tableData = [
    ["Vendor", "3-Year Total Cost", "Savings vs Portnox"],
    ["Portnox CLEAR", `$${(data.financial.portnoxCost / 1000).toFixed(0)}K`, "-"],
    ...Object.entries(data.financial.competitorCosts).map(([vendor, cost]) => [
      vendor.charAt(0).toUpperCase() + vendor.slice(1),
      `$${(cost / 1000).toFixed(0)}K`,
      `$${((cost - data.financial.portnoxCost) / 1000).toFixed(0)}K`,
    ]),
  ]

  // Use autoTable for better table formatting
  ;(pdf as any).autoTable({
    head: [tableData[0]],
    body: tableData.slice(1),
    startY: 80,
    theme: "grid",
    headStyles: { fillColor: [primaryRgb.r, primaryRgb.g, primaryRgb.b], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: margin, right: margin },
  })

  addFooter()

  // KEY FINDINGS PAGE
  if (data.content.keyFindings.length > 0) {
    pdf.addPage()
    addHeader()

    pdf.setTextColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b)
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text("Key Findings", margin, 50)

    pdf.setTextColor(51, 51, 51)
    pdf.setFontSize(11)
    pdf.setFont("helvetica", "normal")

    let currentY = 70
    data.content.keyFindings.forEach((finding, index) => {
      pdf.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b)
      pdf.circle(margin + 5, currentY - 2, 2, "F")

      const findingLines = pdf.splitTextToSize(finding, pageWidth - 2 * margin - 15)
      pdf.text(findingLines, margin + 15, currentY)
      currentY += findingLines.length * 6 + 5

      if (currentY > pageHeight - 50) {
        addFooter()
        pdf.addPage()
        addHeader()
        currentY = 50
      }
    })

    addFooter()
  }

  // RECOMMENDATIONS PAGE
  if (data.content.recommendations.length > 0) {
    pdf.addPage()
    addHeader()

    pdf.setTextColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b)
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text("Strategic Recommendations", margin, 50)

    pdf.setTextColor(51, 51, 51)
    pdf.setFontSize(11)
    pdf.setFont("helvetica", "normal")

    let currentY = 70
    data.content.recommendations.forEach((recommendation, index) => {
      pdf.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b)
      pdf.rect(margin, currentY - 5, 3, 8, "F")

      const recLines = pdf.splitTextToSize(recommendation, pageWidth - 2 * margin - 10)
      pdf.text(recLines, margin + 10, currentY)
      currentY += recLines.length * 6 + 8

      if (currentY > pageHeight - 50) {
        addFooter()
        pdf.addPage()
        addHeader()
        currentY = 50
      }
    })

    addFooter()
  }

  // AI INSIGHTS PAGE (if enabled)
  if (data.analysis.includeAIEnhancement && data.content.aiInsights) {
    pdf.addPage()
    addHeader()

    pdf.setTextColor(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b)
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text("AI-Enhanced Insights", margin, 50)

    pdf.setTextColor(51, 51, 51)
    pdf.setFontSize(11)
    pdf.setFont("helvetica", "normal")

    const aiInsightLines = pdf.splitTextToSize(data.content.aiInsights, pageWidth - 2 * margin)
    pdf.text(aiInsightLines, margin, 70)

    addFooter()
  }

  console.log("PDF generation completed successfully")
  return new Blob([pdf.output("blob")], { type: "application/pdf" })
}

// Word Report Generation
async function generateWordReport(data: WorldClassReportData): Promise<Blob> {
  const content = `
${data.title}
${data.subtitle}

Generated: ${data.generatedAt.toLocaleDateString()}

ORGANIZATION PROFILE
==================
Company: ${data.organization.name}
Industry: ${data.organization.industry}
Size: ${data.organization.size}
Employees: ${data.organization.employees?.toLocaleString() || "N/A"}
Devices: ${data.organization.deviceCount.toLocaleString()}
Locations: ${data.organization.locations}
Headquarters: ${data.organization.headquarters || "N/A"}
Revenue: ${data.organization.revenue || "N/A"}

EXECUTIVE SUMMARY
================
${data.content.executiveSummary}

KEY FINANCIAL METRICS
====================
Total Cost Savings: $${(data.financial.savings / 1000).toFixed(0)}K
Return on Investment: ${data.financial.roi}%
Payback Period: ${data.financial.paybackPeriod} years
Risk Mitigation Value: $${(data.financial.riskMitigation / 1000).toFixed(0)}K

COST COMPARISON
==============
Portnox CLEAR: $${(data.financial.portnoxCost / 1000).toFixed(0)}K
${Object.entries(data.financial.competitorCosts)
  .map(
    ([vendor, cost]) =>
      `${vendor}: $${(cost / 1000).toFixed(0)}K (Savings: $${((cost - data.financial.portnoxCost) / 1000).toFixed(0)}K)`,
  )
  .join("\n")}

KEY FINDINGS
============
${data.content.keyFindings.map((finding, index) => `${index + 1}. ${finding}`).join("\n")}

STRATEGIC RECOMMENDATIONS
========================
${data.content.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join("\n")}

${
  data.analysis.includeAIEnhancement && data.content.aiInsights
    ? `
AI-ENHANCED INSIGHTS
===================
${data.content.aiInsights}
`
    : ""
}

Generated by ${data.branding.companyName}
${data.branding.website}
Contact: ${data.branding.contact}
  `

  return new Blob([content], { type: "text/plain" })
}

// PowerPoint Report Generation
async function generatePowerPointReport(data: WorldClassReportData): Promise<Blob> {
  const content = `
PORTNOX NAC ANALYSIS PRESENTATION
${data.organization.name}

SLIDE 1: TITLE SLIDE
====================
${data.title}
${data.subtitle}
Prepared for: ${data.organization.name}
Date: ${data.generatedAt.toLocaleDateString()}

SLIDE 2: EXECUTIVE SUMMARY
=========================
${data.content.executiveSummary}

SLIDE 3: KEY METRICS
===================
• Total Savings: $${(data.financial.savings / 1000).toFixed(0)}K over ${data.analysis.timeframe} years
• ROI: ${data.financial.roi}%
• Payback Period: ${data.financial.paybackPeriod} years
• Risk Mitigation: $${(data.financial.riskMitigation / 1000).toFixed(0)}K

SLIDE 4: COST COMPARISON
=======================
Portnox CLEAR: $${(data.financial.portnoxCost / 1000).toFixed(0)}K
${Object.entries(data.financial.competitorCosts)
  .map(([vendor, cost]) => `${vendor}: $${(cost / 1000).toFixed(0)}K`)
  .join("\n")}

SLIDE 5: KEY FINDINGS
====================
${data.content.keyFindings.map((finding) => `• ${finding}`).join("\n")}

SLIDE 6: RECOMMENDATIONS
=======================
${data.content.recommendations.map((rec) => `• ${rec}`).join("\n")}

${
  data.analysis.includeAIEnhancement && data.content.aiInsights
    ? `
SLIDE 7: AI INSIGHTS
===================
${data.content.aiInsights}
`
    : ""
}

SLIDE 8: NEXT STEPS
==================
• Schedule technical demonstration
• Conduct proof of concept
• Develop implementation timeline
• Begin procurement process

Contact Information:
${data.branding.contact}
${data.branding.website}
  `

  return new Blob([content], { type: "text/plain" })
}

// Excel Report Generation
async function generateExcelReport(data: WorldClassReportData): Promise<Blob> {
  const csvContent = `
Report Information
Title,${data.title}
Subtitle,${data.subtitle}
Generated,${data.generatedAt.toLocaleDateString()}

Organization Profile
Field,Value
Company,${data.organization.name}
Industry,${data.organization.industry}
Size,${data.organization.size}
Employees,${data.organization.employees || "N/A"}
Devices,${data.organization.deviceCount}
Locations,${data.organization.locations}
Headquarters,${data.organization.headquarters || "N/A"}
Revenue,${data.organization.revenue || "N/A"}

Financial Analysis
Metric,Value
Portnox Cost,$${data.financial.portnoxCost}
Total Savings,$${data.financial.savings}
ROI,${data.financial.roi}%
Payback Period,${data.financial.paybackPeriod} years
Risk Mitigation,$${data.financial.riskMitigation}

Cost Comparison
Vendor,3-Year Cost,Savings vs Portnox
Portnox CLEAR,$${data.financial.portnoxCost},-
${Object.entries(data.financial.competitorCosts)
  .map(([vendor, cost]) => `${vendor},$${cost},$${cost - data.financial.portnoxCost}`)
  .join("\n")}

Key Findings
${data.content.keyFindings.map((finding, index) => `Finding ${index + 1},${finding}`).join("\n")}

Recommendations
${data.content.recommendations.map((rec, index) => `Recommendation ${index + 1},${rec}`).join("\n")}
  `

  return new Blob([csvContent], { type: "text/csv" })
}

// Sample data generator for testing
export function createSampleReportData(): WorldClassReportData {
  return {
    title: "Enterprise Network Access Control Analysis",
    subtitle: "AI-Enhanced Strategic Assessment and ROI Analysis",
    template: "comprehensive",
    format: "pdf",
    generatedAt: new Date(),

    organization: {
      name: "Acme Corporation",
      industry: "Technology",
      size: "large",
      deviceCount: 12500,
      locations: 15,
      region: "north-america",
      website: "www.acmecorp.com",
      revenue: "$2.8B",
      employees: 8500,
      headquarters: "San Francisco, CA",
      founded: "2010",
      stockSymbol: "ACME",
      marketCap: "$12.5B",
    },

    analysis: {
      timeframe: 3,
      vendors: ["portnox", "cisco", "aruba", "forescout"],
      deploymentModel: "cloud",
      includeCharts: true,
      includeDetails: true,
      includeAIEnhancement: true,
      includeBenchmarks: true,
      includeRoadmap: true,
      includeCompliance: true,
    },

    financial: {
      portnoxCost: 600000,
      competitorCosts: {
        cisco: 1875000,
        aruba: 1500000,
        forescout: 1312500,
      },
      savings: 1275000,
      roi: 456,
      paybackPeriod: 0.6,
      riskMitigation: 1800000,
    },

    content: {
      executiveSummary:
        "Our comprehensive AI-enhanced analysis demonstrates that Portnox CLEAR delivers exceptional value for technology organizations, providing $1.28M in cost savings over three years while ensuring superior security posture and operational efficiency. The cloud-native architecture eliminates infrastructure complexity while delivering 95% automation and zero-vulnerability security framework.",

      keyFindings: [
        "Technology industry security automation reduces incident response time by 85%",
        "Cloud-native deployment eliminates 90% of infrastructure management overhead",
        "Zero-trust architecture provides 92% reduction in security breach probability",
        "AI-powered threat detection identifies attack patterns with 96% accuracy",
        "Automated compliance monitoring reduces audit preparation time by 78%",
        "Integration capabilities exceed industry standards with 200+ native connectors",
      ],

      recommendations: [
        "Implement Portnox CLEAR to achieve immediate security posture improvements and cost reductions",
        "Leverage cloud-native architecture to eliminate infrastructure complexity and reduce TCO",
        "Deploy zero-trust policies to protect intellectual property and sensitive business data",
        "Establish automated compliance monitoring for SOC 2, ISO 27001, and GDPR requirements",
        "Integrate with existing security stack to maximize operational efficiency and threat response",
        "Develop comprehensive security awareness training program for all employees",
      ],

      aiInsights:
        "AI analysis reveals that Acme Corporation's current security infrastructure presents significant opportunities for modernization and cost optimization. Technology sector trends indicate accelerating adoption of cloud-native security platforms, with organizations prioritizing zero-trust architectures and automated compliance capabilities.",

      companyProfile:
        "Acme Corporation is a leading technology company specializing in enterprise software solutions and cloud services. With 8,500 employees across 15 locations, Acme serves Fortune 500 clients worldwide and maintains a strong market position in the competitive technology sector.",

      industryAnalysis:
        "The technology industry faces rapidly evolving cybersecurity challenges, with organizations experiencing 40% more sophisticated attacks year-over-year. Modern access control solutions are essential for protecting intellectual property, maintaining competitive advantage, and ensuring regulatory compliance.",

      complianceRequirements: ["SOC 2 Type II", "ISO 27001", "GDPR", "CCPA", "NIST Cybersecurity Framework"],
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
      stakeholders: [],
      complianceFrameworks: ["SOC 2", "ISO 27001", "GDPR", "CCPA", "NIST"],
      executiveTeam: [
        { name: "John Smith", title: "Chief Executive Officer" },
        { name: "Sarah Johnson", title: "Chief Technology Officer" },
        { name: "Michael Chen", title: "Chief Financial Officer" },
        { name: "Emily Rodriguez", title: "Chief Information Security Officer" },
      ],
      recentNews: [
        {
          title: "Acme Corporation Announces $500M Series D Funding Round",
          date: "2024-10-20",
          summary: "Major investment to accelerate product development and global expansion",
          impact: "positive",
          category: "funding",
        },
      ],
      securityEvents: [
        {
          date: "2024-08-05",
          type: "incident",
          severity: "low",
          description: "Automated systems detected and blocked sophisticated phishing campaign",
        },
      ],
    },
  }
}

// Utility functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

export function calculateSavingsPercentage(portnoxCost: number, competitorCost: number): number {
  return ((competitorCost - portnoxCost) / competitorCost) * 100
}

export function generateReportFilename(companyName: string, template: ReportTemplate, format: ReportFormat): string {
  const sanitizedName = companyName.replace(/[^a-zA-Z0-9]/g, "_")
  const timestamp = new Date().toISOString().split("T")[0]
  const templateName = template.charAt(0).toUpperCase() + template.slice(1)
  const extension = format === "powerpoint" ? "pptx" : format === "word" ? "docx" : format === "excel" ? "xlsx" : "pdf"

  return `${sanitizedName}_${templateName}_NAC_Analysis_${timestamp}.${extension}`
}

export function validateReportData(data: WorldClassReportData): string[] {
  const errors: string[] = []

  if (!data.title) errors.push("Report title is required")
  if (!data.organization.name) errors.push("Organization name is required")
  if (!data.organization.industry) errors.push("Organization industry is required")
  if (data.organization.deviceCount <= 0) errors.push("Device count must be greater than 0")
  if (data.financial.portnoxCost <= 0) errors.push("Portnox cost must be greater than 0")
  if (!data.content.executiveSummary) errors.push("Executive summary is required")

  return errors
}
