// Report Generator Module
// Handles report generation, formatting, and export functionality

import type { WorldClassReportData, ReportFormat } from "./world-class-report-generator"
import type { CompanyResearchResult, AIReportEnhancement } from "./ai-company-research"

export interface ReportData {
  companyName: string
  industry: string
  deviceCount: number
  employeeCount: number
  analysisDate: string
  timeframe: number
  vendors: string[]
  totalSavings: number
  roi: number
  paybackPeriod: number
  executiveSummary: string
  keyFindings: string[]
  recommendations: string[]
  aiInsights?: AIReportEnhancement
  companyResearch?: CompanyResearchResult
}

export interface ReportOptions {
  format: ReportFormat
  template: "executive" | "technical" | "financial" | "comprehensive" | "security" | "compliance" | "board"
  includeCharts: boolean
  includeAIEnhancement: boolean
  includeBenchmarks: boolean
  includeCompliance: boolean
  includeRoadmap: boolean
  branding: {
    primaryColor: string
    secondaryColor: string
    logo?: string
    companyName: string
    tagline: string
  }
}

// Report Templates Configuration
export const REPORT_TEMPLATES: Record<string, any> = {
  comprehensive: {
    id: "comprehensive",
    name: "Comprehensive Analysis",
    description: "Complete enterprise analysis with all sections and detailed insights",
    sections: [
      {
        id: "executive-summary",
        title: "Executive Summary",
        content: "High-level overview and key findings",
        order: 1,
        required: true,
        template: ["comprehensive", "executive", "board"],
      },
      {
        id: "organization-profile",
        title: "Organization Profile",
        content: "Company background and current state analysis",
        order: 2,
        required: true,
        template: ["comprehensive", "technical"],
      },
      {
        id: "financial-analysis",
        title: "Financial Analysis",
        content: "TCO, ROI, and cost-benefit analysis",
        order: 3,
        required: true,
        template: ["comprehensive", "financial", "executive"],
      },
      {
        id: "security-assessment",
        title: "Security Assessment",
        content: "Current security posture and risk analysis",
        order: 4,
        required: true,
        template: ["comprehensive", "security", "technical"],
      },
      {
        id: "compliance-mapping",
        title: "Compliance Mapping",
        content: "Regulatory requirements and compliance analysis",
        order: 5,
        required: false,
        template: ["comprehensive", "compliance", "security"],
      },
      {
        id: "vendor-comparison",
        title: "Vendor Comparison",
        content: "Detailed comparison of NAC solutions",
        order: 6,
        required: true,
        template: ["comprehensive", "technical"],
      },
      {
        id: "implementation-roadmap",
        title: "Implementation Roadmap",
        content: "Phased implementation plan and timeline",
        order: 7,
        required: true,
        template: ["comprehensive", "technical", "executive"],
      },
      {
        id: "ai-insights",
        title: "AI-Enhanced Insights",
        content: "Machine learning-powered analysis and recommendations",
        order: 8,
        required: false,
        template: ["comprehensive"],
      },
    ],
    defaultFormat: "pdf",
    targetAudience: ["executives", "technical", "procurement"],
    estimatedPages: 45,
    features: ["AI Enhancement", "Interactive Charts", "Detailed Analysis", "Custom Branding"],
  },
  executive: {
    id: "executive",
    name: "Executive Summary",
    description: "Concise report focused on business value and strategic recommendations",
    sections: [
      {
        id: "executive-summary",
        title: "Executive Summary",
        content: "Strategic overview and business impact",
        order: 1,
        required: true,
        template: ["executive", "board"],
      },
      {
        id: "key-metrics",
        title: "Key Business Metrics",
        content: "ROI, cost savings, and business value metrics",
        order: 2,
        required: true,
        template: ["executive", "financial"],
      },
      {
        id: "strategic-recommendations",
        title: "Strategic Recommendations",
        content: "High-level recommendations and next steps",
        order: 3,
        required: true,
        template: ["executive", "board"],
      },
    ],
    defaultFormat: "pdf",
    targetAudience: ["executives", "board"],
    estimatedPages: 12,
    features: ["Executive Focus", "Key Metrics", "Strategic Insights"],
  },
  technical: {
    id: "technical",
    name: "Technical Analysis",
    description: "Detailed technical assessment and architecture analysis",
    sections: [
      {
        id: "technical-overview",
        title: "Technical Overview",
        content: "Current architecture and technical requirements",
        order: 1,
        required: true,
        template: ["technical"],
      },
      {
        id: "solution-architecture",
        title: "Solution Architecture",
        content: "Proposed technical architecture and integration",
        order: 2,
        required: true,
        template: ["technical", "comprehensive"],
      },
      {
        id: "feature-comparison",
        title: "Feature Comparison",
        content: "Detailed feature and capability analysis",
        order: 3,
        required: true,
        template: ["technical", "comprehensive"],
      },
      {
        id: "implementation-details",
        title: "Implementation Details",
        content: "Technical implementation plan and requirements",
        order: 4,
        required: true,
        template: ["technical"],
      },
    ],
    defaultFormat: "pdf",
    targetAudience: ["technical", "architects"],
    estimatedPages: 20,
    features: ["Technical Deep Dive", "Architecture Diagrams", "Feature Matrix"],
  },
  financial: {
    id: "financial",
    name: "Financial Analysis",
    description: "Comprehensive financial analysis and cost modeling",
    sections: [
      {
        id: "cost-analysis",
        title: "Cost Analysis",
        content: "Detailed cost breakdown and TCO analysis",
        order: 1,
        required: true,
        template: ["financial", "comprehensive"],
      },
      {
        id: "roi-calculation",
        title: "ROI Calculation",
        content: "Return on investment and payback analysis",
        order: 2,
        required: true,
        template: ["financial", "executive"],
      },
      {
        id: "cost-comparison",
        title: "Cost Comparison",
        content: "Vendor cost comparison and savings analysis",
        order: 3,
        required: true,
        template: ["financial", "comprehensive"],
      },
    ],
    defaultFormat: "excel",
    targetAudience: ["financial", "procurement"],
    estimatedPages: 15,
    features: ["Financial Modeling", "Cost Projections", "Savings Analysis"],
  },
  security: {
    id: "security",
    name: "Security Assessment",
    description: "Security-focused analysis and risk assessment",
    sections: [
      {
        id: "security-posture",
        title: "Current Security Posture",
        content: "Assessment of current security capabilities",
        order: 1,
        required: true,
        template: ["security", "comprehensive"],
      },
      {
        id: "threat-analysis",
        title: "Threat Analysis",
        content: "Threat landscape and risk assessment",
        order: 2,
        required: true,
        template: ["security"],
      },
      {
        id: "security-improvements",
        title: "Security Improvements",
        content: "Proposed security enhancements and benefits",
        order: 3,
        required: true,
        template: ["security", "comprehensive"],
      },
    ],
    defaultFormat: "pdf",
    targetAudience: ["security", "compliance"],
    estimatedPages: 18,
    features: ["Risk Assessment", "Threat Analysis", "Security Metrics"],
  },
  compliance: {
    id: "compliance",
    name: "Compliance Report",
    description: "Regulatory compliance and audit readiness analysis",
    sections: [
      {
        id: "compliance-overview",
        title: "Compliance Overview",
        content: "Current compliance status and requirements",
        order: 1,
        required: true,
        template: ["compliance"],
      },
      {
        id: "regulatory-mapping",
        title: "Regulatory Mapping",
        content: "Mapping to regulatory frameworks and standards",
        order: 2,
        required: true,
        template: ["compliance", "comprehensive"],
      },
      {
        id: "audit-readiness",
        title: "Audit Readiness",
        content: "Audit preparation and compliance automation",
        order: 3,
        required: true,
        template: ["compliance"],
      },
    ],
    defaultFormat: "pdf",
    targetAudience: ["compliance", "legal"],
    estimatedPages: 16,
    features: ["Compliance Mapping", "Audit Preparation", "Regulatory Analysis"],
  },
  board: {
    id: "board",
    name: "Board Presentation",
    description: "Executive presentation for board-level decision making",
    sections: [
      {
        id: "strategic-overview",
        title: "Strategic Overview",
        content: "High-level strategic context and business case",
        order: 1,
        required: true,
        template: ["board"],
      },
      {
        id: "investment-summary",
        title: "Investment Summary",
        content: "Investment requirements and expected returns",
        order: 2,
        required: true,
        template: ["board", "executive"],
      },
      {
        id: "risk-mitigation",
        title: "Risk Mitigation",
        content: "Risk reduction and business continuity benefits",
        order: 3,
        required: true,
        template: ["board"],
      },
    ],
    defaultFormat: "powerpoint",
    targetAudience: ["board", "executives"],
    estimatedPages: 8,
    features: ["Board Focus", "Strategic Context", "Investment Analysis"],
  },
}

// Report Generation Utilities
export class ReportGenerator {
  private static instance: ReportGenerator
  private templates: Map<string, any> = new Map()

  constructor() {
    this.initializeTemplates()
  }

  static getInstance(): ReportGenerator {
    if (!ReportGenerator.instance) {
      ReportGenerator.instance = new ReportGenerator()
    }
    return ReportGenerator.instance
  }

  private initializeTemplates(): void {
    Object.values(REPORT_TEMPLATES).forEach((template) => {
      this.templates.set(template.id, template)
    })
  }

  getTemplate(templateId: string): any | undefined {
    return this.templates.get(templateId)
  }

  getAllTemplates(): any[] {
    return Array.from(this.templates.values())
  }

  generateReportStructure(templateId: string, customizations?: any): any[] {
    const template = this.getTemplate(templateId)
    if (!template) {
      throw new Error(`Template '${templateId}' not found`)
    }

    let sections = [...template.sections]

    // Apply customizations
    if (customizations) {
      sections = this.applyCustomizations(sections, customizations)
    }

    return sections.sort((a, b) => a.order - b.order)
  }

  private applyCustomizations(sections: any[], customizations: any): any[] {
    const filteredSections = sections.filter((section) => {
      switch (section.id) {
        case "executive-summary":
          return customizations.includeExecutiveSummary
        case "financial-analysis":
        case "cost-analysis":
        case "roi-calculation":
          return customizations.includeFinancialAnalysis
        case "security-assessment":
        case "security-posture":
          return customizations.includeSecurityAssessment
        case "compliance-mapping":
        case "compliance-overview":
          return customizations.includeComplianceMapping
        case "implementation-roadmap":
        case "implementation-details":
          return customizations.includeImplementationRoadmap
        case "ai-insights":
          return customizations.includeAIInsights
        default:
          return section.required
      }
    })

    // Add custom sections
    if (customizations.customSections) {
      filteredSections.push(...customizations.customSections)
    }

    return filteredSections
  }

  estimateGenerationTime(templateId: string, format: ReportFormat): number {
    const template = this.getTemplate(templateId)
    if (!template) return 0

    const baseTime = template.estimatedPages * 2 // 2 seconds per page base
    const formatMultiplier = {
      pdf: 1.0,
      word: 0.8,
      powerpoint: 1.2,
      excel: 0.6,
    }

    return Math.round(baseTime * formatMultiplier[format])
  }

  validateReportData(data: WorldClassReportData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Required fields validation
    if (!data.title) errors.push("Report title is required")
    if (!data.organization.name) errors.push("Organization name is required")
    if (!data.organization.industry) errors.push("Industry is required")
    if (data.organization.deviceCount <= 0) errors.push("Device count must be greater than 0")
    if (!data.content.executiveSummary) errors.push("Executive summary is required")

    // Financial data validation
    if (data.financial.portnoxCost <= 0) errors.push("Portnox cost must be greater than 0")
    if (Object.keys(data.financial.competitorCosts).length === 0) {
      errors.push("At least one competitor cost is required")
    }

    // Content validation
    if (data.content.keyFindings.length === 0) {
      errors.push("At least one key finding is required")
    }
    if (data.content.recommendations.length === 0) {
      errors.push("At least one recommendation is required")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  generateMetadata(data: WorldClassReportData): any {
    return {
      id: `report-${Date.now()}`,
      title: data.title,
      description: data.subtitle,
      template: data.template,
      format: data.format,
      estimatedPages: this.getTemplate(data.template)?.estimatedPages || 20,
      generationTime: this.estimateGenerationTime(data.template, data.format),
      lastModified: new Date(),
      version: "1.0",
      author: "Portnox AI Report Generator",
      tags: [data.organization.industry, data.organization.size, data.template, "NAC Analysis"],
    }
  }
}

// Utility Functions
export function formatReportTitle(companyName: string, template: any): string {
  const templateTitles = {
    comprehensive: "Comprehensive Network Access Control Analysis",
    executive: "Executive NAC Assessment Summary",
    technical: "Technical NAC Solution Analysis",
    financial: "Financial Analysis and ROI Assessment",
    security: "Security Posture and Risk Assessment",
    compliance: "Compliance and Regulatory Analysis",
    board: "Strategic NAC Investment Proposal",
  }

  return `${companyName} - ${templateTitles[template]}`
}

export function generateReportId(companyName: string, template: any): string {
  const sanitizedName = companyName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()
  const timestamp = Date.now()
  return `${sanitizedName}_${template}_${timestamp}`
}

export function calculateReportComplexity(data: WorldClassReportData): "simple" | "moderate" | "complex" {
  let complexity = 0

  // Organization complexity
  if (data.organization.deviceCount > 10000) complexity += 2
  else if (data.organization.deviceCount > 1000) complexity += 1

  // Analysis complexity
  if (data.analysis.vendors.length > 3) complexity += 1
  if (data.analysis.includeAIEnhancement) complexity += 2
  if (data.analysis.includeCompliance) complexity += 1
  if (data.analysis.includeBenchmarks) complexity += 1

  // Content complexity
  if (data.content.keyFindings.length > 10) complexity += 1
  if (data.content.recommendations.length > 8) complexity += 1

  if (complexity <= 3) return "simple"
  if (complexity <= 6) return "moderate"
  return "complex"
}

export function getRecommendedFormat(template: any, audience: string[]): ReportFormat {
  if (audience.includes("board") || audience.includes("executives")) {
    return template === "board" ? "powerpoint" : "pdf"
  }
  if (audience.includes("financial") || audience.includes("procurement")) {
    return "excel"
  }
  if (audience.includes("technical")) {
    return "pdf"
  }
  return "pdf"
}

// Export singleton instance
export const reportGenerator = ReportGenerator.getInstance()

// Export utility constants
export const SUPPORTED_FORMATS: ReportFormat[] = ["pdf", "word", "powerpoint", "excel"]
export const TEMPLATE_CATEGORIES = {
  business: ["executive", "board", "financial"],
  technical: ["technical", "comprehensive"],
  compliance: ["security", "compliance"],
  all: ["comprehensive"],
}

export interface ReportSection {
  id: string
  title: string
  content: string
  order: number
  required: boolean
  template: any[]
}

export interface ReportMetadata {
  id: string
  title: string
  description: string
  template: any
  format: ReportFormat
  estimatedPages: number
  generationTime: number
  lastModified: Date
  version: string
  author: string
  tags: string[]
}

export interface CustomizationOptions {
  includeExecutiveSummary: boolean
  includeFinancialAnalysis: boolean
  includeSecurityAssessment: boolean
  includeComplianceMapping: boolean
  includeImplementationRoadmap: boolean
  includeRiskAnalysis: boolean
  includeBenchmarking: boolean
  includeAIInsights: boolean
  customSections: ReportSection[]
  branding: {
    primaryColor: string
    secondaryColor: string
    logo: string
    companyName: string
    tagline: string
  }
}

// Generate executive report with enhanced formatting
export async function generateExecutiveReport(data: ReportData, options: ReportOptions): Promise<Blob> {
  console.log("Generating executive report for:", data.companyName)

  // Transform ReportData to WorldClassReportData format
  const worldClassData: WorldClassReportData = {
    title: `${data.companyName} - Network Access Control Analysis`,
    subtitle: `Executive Strategic Assessment for ${data.industry} Industry`,
    template: options.template,
    format: options.format,
    generatedAt: new Date(),

    organization: {
      name: data.companyName,
      industry: data.industry,
      size: determineOrganizationSize(data.employeeCount),
      deviceCount: data.deviceCount,
      locations: 1, // Default value
      region: "north-america", // Default value
      employees: data.employeeCount,
      headquarters: data.companyResearch?.headquarters || "N/A",
      revenue: data.companyResearch?.revenue,
      marketCap: data.companyResearch?.marketCap,
      founded: data.companyResearch?.founded,
      stockSymbol: data.companyResearch?.stockSymbol,
    },

    analysis: {
      timeframe: data.timeframe,
      vendors: data.vendors,
      deploymentModel: "cloud", // Default value
      includeCharts: options.includeCharts,
      includeDetails: true,
      includeAIEnhancement: options.includeAIEnhancement,
      includeBenchmarks: options.includeBenchmarks,
      includeRoadmap: options.includeRoadmap,
      includeCompliance: options.includeCompliance,
    },

    financial: {
      portnoxCost: calculatePortnoxCost(data.deviceCount, data.timeframe),
      competitorCosts: calculateCompetitorCosts(data.deviceCount, data.timeframe),
      savings: data.totalSavings,
      roi: data.roi,
      paybackPeriod: data.paybackPeriod,
      riskMitigation: calculateRiskMitigation(data.deviceCount),
    },

    content: {
      executiveSummary: data.executiveSummary,
      keyFindings: data.keyFindings,
      recommendations: data.recommendations,
      aiInsights: data.aiInsights?.executiveSummary,
      companyProfile: data.companyResearch?.description,
      industryAnalysis: data.aiInsights?.industryAnalysis,
      threatLandscape: data.aiInsights?.threatLandscape,
      complianceRequirements: data.companyResearch?.complianceRequirements,
    },

    branding: {
      primaryColor: options.branding.primaryColor,
      secondaryColor: options.branding.secondaryColor,
      logo: options.branding.logo || "/portnox-logo.png",
      companyName: "Portnox Ltd.",
      tagline: "Enterprise Network Access Control Solutions",
      website: "www.portnox.com",
      contact: "enterprise@portnox.com",
    },

    advanced: {
      customCharts: [],
      stakeholders: [],
      complianceFrameworks: data.companyResearch?.complianceRequirements || [],
      executiveTeam: data.companyResearch?.executiveTeam,
      recentNews: data.companyResearch?.recentNews,
      securityEvents: data.companyResearch?.securityEvents,
    },
  }

  // Generate the report using the world-class generator
  return await reportGenerator.generateReportStructure(options.template)
}

// Download report with proper filename
export function downloadReport(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Utility function to determine organization size
function determineOrganizationSize(employeeCount: number): "small" | "medium" | "large" | "enterprise" {
  if (employeeCount <= 100) return "small"
  if (employeeCount <= 1000) return "medium"
  if (employeeCount <= 10000) return "large"
  return "enterprise"
}

// Calculate Portnox costs
function calculatePortnoxCost(deviceCount: number, timeframe: number): number {
  const monthlyPerDevice = 4 // $4 per device per month
  return deviceCount * monthlyPerDevice * 12 * timeframe
}

// Calculate competitor costs
function calculateCompetitorCosts(deviceCount: number, timeframe: number): Record<string, number> {
  return {
    cisco: deviceCount * 150 * timeframe, // $150 per device per year
    aruba: deviceCount * 100 * timeframe, // $100 per device per year
    forescout: deviceCount * 125 * timeframe, // $125 per device per year
    fortinet: deviceCount * 80 * timeframe, // $80 per device per year
  }
}

// Calculate risk mitigation value
function calculateRiskMitigation(deviceCount: number): number {
  // Base risk mitigation value scaled by device count
  const baseValue = 500000 // $500K base value
  const scaleFactor = Math.log10(deviceCount) / Math.log10(1000) // Logarithmic scaling
  return Math.round(baseValue * (1 + scaleFactor))
}

// Generate filename for report
export function generateReportFilename(companyName: string, template: string, format: ReportFormat): string {
  const sanitizedName = companyName.replace(/[^a-zA-Z0-9]/g, "_")
  const timestamp = new Date().toISOString().split("T")[0]
  const extension = getFileExtension(format)

  return `${sanitizedName}_${template}_NAC_Analysis_${timestamp}.${extension}`
}

// Get file extension for format
function getFileExtension(format: ReportFormat): string {
  switch (format) {
    case "pdf":
      return "pdf"
    case "word":
      return "docx"
    case "powerpoint":
      return "pptx"
    case "excel":
      return "xlsx"
    default:
      return "pdf"
  }
}

// Create sample report data for testing
export function createSampleReportData(): ReportData {
  return {
    companyName: "Acme Corporation",
    industry: "Technology",
    deviceCount: 12500,
    employeeCount: 8500,
    analysisDate: new Date().toISOString().split("T")[0],
    timeframe: 3,
    vendors: ["portnox", "cisco", "aruba", "forescout"],
    totalSavings: 1275000,
    roi: 456,
    paybackPeriod: 0.6,
    executiveSummary:
      "Our comprehensive analysis demonstrates that Portnox CLEAR delivers exceptional value for technology organizations, providing $1.28M in cost savings over three years while ensuring superior security posture and operational efficiency.",
    keyFindings: [
      "Technology industry security automation reduces incident response time by 85%",
      "Cloud-native deployment eliminates 90% of infrastructure management overhead",
      "Zero-trust architecture provides 92% reduction in security breach probability",
      "AI-powered threat detection identifies attack patterns with 96% accuracy",
      "Automated compliance monitoring reduces audit preparation time by 78%",
    ],
    recommendations: [
      "Implement Portnox CLEAR to achieve immediate security posture improvements",
      "Leverage cloud-native architecture to eliminate infrastructure complexity",
      "Deploy zero-trust policies to protect intellectual property and sensitive data",
      "Establish automated compliance monitoring for regulatory requirements",
      "Integrate with existing security stack to maximize operational efficiency",
    ],
  }
}

// Validate report data
export function validateReportData(data: ReportData): string[] {
  const errors: string[] = []

  if (!data.companyName) errors.push("Company name is required")
  if (!data.industry) errors.push("Industry is required")
  if (data.deviceCount <= 0) errors.push("Device count must be greater than 0")
  if (data.employeeCount <= 0) errors.push("Employee count must be greater than 0")
  if (data.timeframe <= 0) errors.push("Analysis timeframe must be greater than 0")
  if (!data.executiveSummary) errors.push("Executive summary is required")
  if (!data.keyFindings || data.keyFindings.length === 0) errors.push("Key findings are required")
  if (!data.recommendations || data.recommendations.length === 0) errors.push("Recommendations are required")

  return errors
}

// Format currency values
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format percentage values
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

// Calculate savings percentage
export function calculateSavingsPercentage(portnoxCost: number, competitorCost: number): number {
  return ((competitorCost - portnoxCost) / competitorCost) * 100
}

// Export report configuration
export interface ReportConfiguration {
  company: {
    name: string
    industry: string
    size: string
    devices: number
    employees: number
  }
  analysis: {
    timeframe: number
    vendors: string[]
    includeAI: boolean
  }
  output: {
    format: ReportFormat
    template: string
    features: string[]
  }
}

// Create report configuration
export function createReportConfiguration(data: ReportData, options: ReportOptions): ReportConfiguration {
  return {
    company: {
      name: data.companyName,
      industry: data.industry,
      size: determineOrganizationSize(data.employeeCount),
      devices: data.deviceCount,
      employees: data.employeeCount,
    },
    analysis: {
      timeframe: data.timeframe,
      vendors: data.vendors,
      includeAI: options.includeAIEnhancement,
    },
    output: {
      format: options.format,
      template: options.template,
      features: [
        options.includeCharts ? "charts" : "",
        options.includeBenchmarks ? "benchmarks" : "",
        options.includeCompliance ? "compliance" : "",
        options.includeRoadmap ? "roadmap" : "",
      ].filter(Boolean),
    },
  }
}
