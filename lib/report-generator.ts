// Legacy Report Generator - Browser Compatible
// Maintains backward compatibility while avoiding Node.js dependencies

import {
  generateWorldClassReport,
  createSampleReportData,
  type WorldClassReportData,
  type ReportTemplate,
  type ReportFormat,
} from "./world-class-report-generator"

// Legacy interface for backward compatibility
export interface LegacyReportData {
  title: string
  subtitle: string
  sections: Array<{
    title: string
    content: string
    highlights?: string[]
    metrics?: Record<string, string>
  }>
  executiveSummary: {
    totalSavings: number
    roi: number
    paybackPeriod: number
    securityScore: number
  }
  tcoComparison: Array<{
    vendor: string
    totalCost: number
    breakdown: {
      licensing: number
      hardware: number
      services: number
      operations: number
    }
  }>
}

// Convert legacy data to new format
function convertLegacyData(legacyData: LegacyReportData): WorldClassReportData {
  return {
    title: legacyData.title,
    subtitle: legacyData.subtitle,
    template: "comprehensive",
    format: "pdf",
    generatedAt: new Date(),

    organization: {
      name: "Sample Organization",
      industry: "Technology",
      size: "medium",
      deviceCount: 5000,
      locations: 10,
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
      portnoxCost: 250000,
      competitorCosts: { cisco: 750000, aruba: 625000 },
      savings: legacyData.executiveSummary.totalSavings,
      roi: legacyData.executiveSummary.roi,
      paybackPeriod: legacyData.executiveSummary.paybackPeriod,
      riskMitigation: 600000,
    },

    content: {
      executiveSummary: "Strategic analysis for network access control vendor evaluation.",
      keyFindings: [
        "65% cost reduction compared to traditional NAC solutions",
        "92% reduction in security breach risk",
        "30-minute deployment vs 6-month traditional implementations",
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
      stakeholders: [],
      complianceFrameworks: [],
    },
  }
}

// Browser-compatible report generator class
export class BrowserCompatibleReportGenerator {
  private data: LegacyReportData

  constructor(data: LegacyReportData) {
    this.data = data
  }

  async generatePDF(): Promise<Blob> {
    const convertedData = convertLegacyData(this.data)
    return generateWorldClassReport(convertedData, "pdf")
  }

  async generateExcel(): Promise<Blob> {
    const convertedData = convertLegacyData(this.data)
    return generateWorldClassReport(convertedData, "excel")
  }

  async generateWord(): Promise<Blob> {
    const convertedData = convertLegacyData(this.data)
    return generateWorldClassReport(convertedData, "word")
  }

  async generatePowerPoint(): Promise<Blob> {
    const convertedData = convertLegacyData(this.data)
    return generateWorldClassReport(convertedData, "powerpoint")
  }

  // Utility method to download files
  downloadFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

// Export for backward compatibility
export { generateWorldClassReport, createSampleReportData }
export type { WorldClassReportData, ReportTemplate, ReportFormat }
