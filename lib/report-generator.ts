// Legacy Report Generator - Browser Compatible
// Maintains backward compatibility while using new advanced chart library

import {
  WorldClassReportGenerator,
  createSampleReportData,
  type ReportData,
  type ReportOptions,
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
function convertLegacyData(legacyData: LegacyReportData): ReportData {
  return {
    metadata: {
      title: legacyData.title,
      subtitle: legacyData.subtitle,
      generatedAt: new Date(),
      generatedBy: "Portnox TCO Analyzer",
    },
    executiveSummary: legacyData.executiveSummary,
    tcoComparison: legacyData.tcoComparison,
    riskAnalysis: [
      { category: "Breach Risk", reduction: 92, value: 920000 },
      { category: "Compliance Risk", reduction: 94, value: 470000 },
      { category: "Operational Risk", reduction: 86, value: 215000 },
      { category: "Reputation Risk", reduction: 85, value: 850000 },
    ],
    recommendations: [
      "Initiate Portnox CLEAR proof of concept within 30 days",
      "Develop comprehensive migration strategy for legacy NAC replacement",
      "Secure executive sponsorship for digital transformation initiative",
      "Establish success metrics and ROI tracking mechanisms",
      "Plan phased deployment to minimize operational disruption",
    ],
  }
}

// Legacy report generator class for backward compatibility
export class BrowserCompatibleReportGenerator {
  private data: LegacyReportData
  private generator: WorldClassReportGenerator

  constructor(data: LegacyReportData) {
    this.data = data
    const convertedData = convertLegacyData(data)
    this.generator = new WorldClassReportGenerator(convertedData, {
      format: "pdf",
      includeCharts: true,
      includeBranding: true,
      template: "executive",
    })
  }

  async generatePDF(): Promise<Blob> {
    this.generator = new WorldClassReportGenerator(convertLegacyData(this.data), {
      format: "pdf",
      includeCharts: true,
      includeBranding: true,
      template: "executive",
    })
    return this.generator.generateReport()
  }

  async generateExcel(): Promise<Blob> {
    this.generator = new WorldClassReportGenerator(convertLegacyData(this.data), {
      format: "excel",
      includeCharts: true,
      includeBranding: true,
      template: "executive",
    })
    return this.generator.generateReport()
  }

  async generateWord(): Promise<Blob> {
    this.generator = new WorldClassReportGenerator(convertLegacyData(this.data), {
      format: "word",
      includeCharts: true,
      includeBranding: true,
      template: "executive",
    })
    return this.generator.generateReport()
  }

  async generatePowerPoint(): Promise<Blob> {
    this.generator = new WorldClassReportGenerator(convertLegacyData(this.data), {
      format: "powerpoint",
      includeCharts: true,
      includeBranding: true,
      template: "executive",
    })
    return this.generator.generateReport()
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
export { WorldClassReportGenerator, createSampleReportData }
export type { ReportData, ReportOptions }
