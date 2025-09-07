import type { CalculationResult, CalculationConfiguration } from "./enhanced-tco-calculator"
import { BrowserCompatibleReportGenerator, type ReportData } from "./report-generator"

export interface ReportSection {
  title: string
  content: string
  data?: any
  charts?: any[]
  insights?: string[]
}

export interface EnhancedReport {
  title: string
  subtitle: string
  executiveSummary: string
  sections: ReportSection[]
  recommendations: string[]
  nextSteps: string[]
  metadata: {
    generatedAt: Date
    confidence: number
    personalization: number
  }
}

export interface CompanyDetails {
  companyName: string
  industry: string
  companySize: string
  employeeCount: number
  deviceCount: number
  locations: number
  headquarters: string
  website: string
  annualRevenue: string
  marketCap: string
  publiclyTraded: boolean
  cyberInsurancePremium: number
  primaryContact: string
  contactTitle: string
  contactEmail: string
  contactPhone: string
  incumbentVendor: string
  currentSecurityStack: string[]
  deploymentType: string
  businessPriorities: string[]
  securityChallenges: string[]
  transformationGoals: string[]
  industryThreats: string[]
  regulatoryDeadlines: string[]
  recentIncidents: string
  ceo: string
  cfo: string
  ciso: string
  cio: string
  itDirector: string
  complianceOfficer: string[]
  boardMembers: string[]
  executiveMessage: string
  valueProposition: string
  competitiveDifferentiators: string[]
  implementationTimeline: string
}

export interface ReportConfig {
  reportType: "executive" | "technical" | "financial" | "compliance" | "comprehensive"
  format: "pdf" | "word" | "powerpoint" | "excel"
  personalizationLevel: "maximum" | "high" | "medium" | "basic"
  includeCharts: boolean
  includeFinancials: boolean
  includeCompliance: boolean
  includeRoadmap: boolean
  targetAudience: string[]
  deliveryMethod: "download" | "email" | "scheduled"
  scheduledDate?: Date
  includeDetails?: boolean
  includeAIEnhancement?: boolean
  includeBenchmarks?: boolean
}

export interface ReportGenerationParams {
  companyDetails: any
  reportConfig: any
  industry: string
  deviceCount: number
  timeframe: number
  vendors: string[]
  tcoData: any
}

export async function generateEnhancedReport(params: ReportGenerationParams): Promise<any> {
  const reportData: ReportData = {
    title: `Network Access Control Analysis for ${params.companyDetails?.companyName || "Enterprise"}`,
    subtitle: `Strategic Assessment & ROI Analysis - ${params.industry} Industry`,
    template: params.reportConfig?.reportType || "comprehensive",
    templateData: {
      name: params.reportConfig?.reportType || "comprehensive",
      description: "Professional NAC vendor evaluation and strategic analysis",
    },
    format: params.reportConfig?.format || "pdf",
    generatedAt: new Date(),
    industry: params.industry,
    deviceCount: params.deviceCount,
    timeframe: params.timeframe,
    organizationSize: params.companyDetails?.companySize || "medium",
    region: "north-america",
    results: [],
    config: params.reportConfig,
    preview: {
      portnoxCost: 250000,
      avgCompetitorCost: 750000,
      maxSavings: 500000,
      bestROI: 456,
      avgPayback: 0.5,
      securityScore: 95,
    },
    includeCharts: params.reportConfig?.includeCharts ?? true,
    includeDetails: params.reportConfig?.includeDetails ?? true,
    includeAIEnhancement: params.reportConfig?.includeAIEnhancement ?? false,
    includeBenchmarks: params.reportConfig?.includeBenchmarks ?? true,
    includeRoadmap: params.reportConfig?.includeRoadmap ?? true,
    includeCompliance: params.reportConfig?.includeCompliance ?? true,
    executiveSummary: params.companyDetails?.executiveMessage || "",
    keyRecommendations: params.companyDetails?.valueProposition || "",
    aiPrompt: null,
    branding: {
      logo: "/portnox-logo.png",
      primaryColor: "#00D4AA",
      secondaryColor: "#1B2951",
      companyName: "Portnox Ltd.",
      tagline: "Enterprise Network Access Control Solutions",
    },
  }

  const generator = new BrowserCompatibleReportGenerator(reportData)

  // Generate the requested format
  let blob: Blob
  const reportType = params.reportConfig?.reportType || "comprehensive"

  switch (params.reportConfig?.format) {
    case "word":
      blob = await generator.generateWord(reportType as any)
      break
    case "powerpoint":
      blob = await generator.generatePowerPoint(reportType as any)
      break
    case "excel":
      blob = await generator.generateExcel(reportType as any)
      break
    default:
      blob = await generator.generatePDF(reportType as any)
  }

  return {
    blob,
    filename: `${params.companyDetails?.companyName || "Enterprise"}_NAC_Analysis_${new Date().toISOString().split("T")[0]}.${params.reportConfig?.format || "pdf"}`,
    reportData,
  }
}

// Export additional utility functions
export function calculateROI(investment: number, savings: number, timeframe: number): number {
  if (investment <= 0) return 0
  return ((savings * timeframe - investment) / investment) * 100
}

export function calculatePaybackPeriod(investment: number, annualSavings: number): number {
  if (annualSavings <= 0) return 0
  return investment / annualSavings
}

export function calculateTotalSavings(portnoxCost: number, competitorCost: number): number {
  return Math.max(0, competitorCost - portnoxCost)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function generateExecutiveSummary(params: ReportGenerationParams): string {
  const savings = calculateTotalSavings(250000, 750000)
  const roi = calculateROI(250000, savings, params.timeframe)

  return `Our comprehensive analysis of Network Access Control solutions for ${params.deviceCount.toLocaleString()} devices over ${params.timeframe} years demonstrates that Portnox CLEAR delivers superior value through 67% cost savings (${formatCurrency(savings)}), industry-leading security with zero CVE vulnerabilities, and 99% faster deployment (30 minutes vs 3-6 months). This analysis validates Portnox CLEAR as the optimal solution for modern enterprise network security requirements, combining cloud-native architecture with comprehensive Zero Trust capabilities to deliver immediate ROI of ${formatPercentage(roi)} and long-term strategic value.`
}

export function generateKeyRecommendations(reportType: string): string[] {
  return [
    "Immediately initiate Portnox CLEAR proof-of-concept deployment to validate technical capabilities and integration requirements",
    "Schedule executive briefing with Portnox leadership to discuss strategic implementation roadmap and business value realization",
    "Conduct comprehensive assessment of current NAC infrastructure to identify security gaps and migration opportunities",
    "Develop detailed business case presentation for stakeholders highlighting quantified benefits and competitive advantages",
    "Plan phased migration strategy to minimize business disruption while maximizing security improvements and efficiency gains",
  ]
}

function safeString(value: any): string {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  if (typeof value === "number") return value.toString()
  if (typeof value === "boolean") return value.toString()
  return String(value)
}

function safeNumber(value: any, defaultValue = 0): number {
  if (value === null || value === undefined) return defaultValue
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? defaultValue : num
}

function safeArray(value: any): any[] {
  if (Array.isArray(value)) return value
  if (value === null || value === undefined) return []
  return [value]
}

function generateExecutiveSectionsLegacy(
  results: CalculationResult[],
  config: CalculationConfiguration,
  savings: number,
  roi: number,
  paybackMonths: number,
  formatCurrency: (value: number) => string,
): ReportSection[] {
  return [
    {
      title: "Financial Impact Analysis",
      content: `Investment in Portnox CLEAR delivers exceptional financial returns with ${formatCurrency(savings)} in total savings and ${roi.toFixed(0)}% ROI over ${config.years} years.`,
      data: {
        totalSavings: savings,
        roi: roi,
        paybackMonths: paybackMonths,
        annualSavings: savings / (config.years || 3),
      },
      insights: [
        "Payback period of less than 12 months demonstrates exceptional value",
        "Cloud-native architecture eliminates infrastructure costs",
        "Predictable SaaS pricing provides budget certainty",
      ],
    },
    {
      title: "Strategic Advantages",
      content:
        "Portnox CLEAR provides significant competitive advantages through superior technology and operational efficiency.",
      data: {
        deploymentSpeed: "99% faster than traditional NAC",
        securityPosture: "Zero CVE vulnerabilities",
        scalability: "Infinite cloud-native scaling",
        integration: "API-first architecture",
      },
      insights: [
        "Rapid deployment enables faster time-to-value",
        "Superior security reduces breach risk by 92%",
        "Cloud-native design future-proofs the investment",
      ],
    },
    {
      title: "Risk Mitigation",
      content: "Comprehensive risk reduction across security, operational, and financial dimensions.",
      data: {
        securityRisk: "92% reduction in breach probability",
        operationalRisk: "90% reduction in administrative overhead",
        financialRisk: "Predictable OpEx model eliminates budget surprises",
      },
      insights: [
        "Zero CVE track record provides superior security assurance",
        "Automated operations reduce human error risk",
        "SaaS model eliminates infrastructure refresh cycles",
      ],
    },
  ]
}

function generateTechnicalSectionsLegacy(
  results: CalculationResult[],
  config: CalculationConfiguration,
): ReportSection[] {
  return [
    {
      title: "Architecture Comparison",
      content: "Technical architecture analysis comparing cloud-native vs traditional approaches.",
      insights: [
        "Cloud-native architecture provides superior scalability",
        "API-first design enables seamless integrations",
        "Zero infrastructure requirements reduce complexity",
      ],
    },
    {
      title: "Security Analysis",
      content: "Comprehensive security posture evaluation across all vendors.",
      insights: [
        "Portnox maintains zero CVE vulnerability record",
        "Continuous security updates without maintenance windows",
        "Built-in compliance automation reduces audit burden",
      ],
    },
    {
      title: "Integration Capabilities",
      content: "Analysis of integration complexity and vendor ecosystem support.",
      insights: [
        "RESTful APIs enable rapid integration development",
        "Pre-built connectors for major security platforms",
        "Vendor-agnostic approach prevents lock-in",
      ],
    },
  ]
}

function generateFinancialSectionsLegacy(
  results: CalculationResult[],
  config: CalculationConfiguration,
  savings: number,
  roi: number,
  formatCurrency: (value: number) => string,
): ReportSection[] {
  return [
    {
      title: "Total Cost of Ownership",
      content: `Comprehensive TCO analysis revealing ${formatCurrency(savings)} in savings through operational efficiency and eliminated infrastructure costs.`,
      data: {
        directSavings: savings * 0.6,
        operationalSavings: savings * 0.25,
        riskMitigationValue: savings * 0.15,
      },
    },
    {
      title: "Budget Impact Analysis",
      content: "Analysis of budget implications and cash flow optimization opportunities.",
      insights: [
        "OpEx model improves cash flow management",
        "Eliminated CapEx requirements free budget for innovation",
        "Predictable costs enable accurate financial planning",
      ],
    },
    {
      title: "ROI Breakdown",
      content: `Detailed ROI calculation showing ${roi.toFixed(0)}% return through multiple value streams.`,
      data: {
        costSavings: roi * 0.7,
        productivityGains: roi * 0.2,
        riskReduction: roi * 0.1,
      },
    },
  ]
}

function generateComplianceSectionsLegacy(
  results: CalculationResult[],
  config: CalculationConfiguration,
): ReportSection[] {
  return [
    {
      title: "Regulatory Compliance",
      content: "Comprehensive compliance framework support and automation capabilities.",
      insights: [
        "Automated compliance reporting reduces audit preparation time",
        "Built-in policy templates for major frameworks",
        "Continuous monitoring ensures ongoing compliance",
      ],
    },
    {
      title: "Audit Readiness",
      content: "Analysis of audit preparation capabilities and documentation automation.",
      insights: [
        "Real-time compliance dashboards provide audit visibility",
        "Automated evidence collection reduces manual effort",
        "Comprehensive audit trails ensure regulatory requirements",
      ],
    },
    {
      title: "Risk Management",
      content: "Evaluation of compliance risk mitigation and management capabilities.",
      insights: [
        "Proactive compliance monitoring prevents violations",
        "Automated remediation reduces compliance gaps",
        "Centralized policy management ensures consistency",
      ],
    },
  ]
}

function generateNextStepsLegacy(reportType: string): string[] {
  const commonSteps = [
    "Schedule executive briefing to present findings and recommendations",
    "Conduct technical deep-dive session with IT and security teams",
    "Develop detailed implementation timeline and resource requirements",
  ]

  const typeSpecificSteps = {
    executive: [
      "Present business case to board of directors",
      "Secure budget approval and implementation authorization",
      "Establish executive steering committee for project oversight",
    ],
    technical: [
      "Conduct proof-of-concept deployment in test environment",
      "Perform detailed integration testing with existing systems",
      "Develop technical implementation and migration plan",
    ],
    financial: [
      "Finalize budget allocation and procurement process",
      "Establish financial tracking and ROI measurement framework",
      "Negotiate enterprise pricing and contract terms",
    ],
    compliance: [
      "Review compliance requirements with legal and audit teams",
      "Develop compliance monitoring and reporting procedures",
      "Establish audit preparation and documentation processes",
    ],
  }

  return [...commonSteps, ...(typeSpecificSteps[reportType as keyof typeof typeSpecificSteps] || [])]
}

function calculateConfidence(results: CalculationResult[], config: CalculationConfiguration): number {
  let confidence = 60 // Base confidence

  // Data completeness
  if (results.length >= 3) confidence += 15
  if (results.length >= 5) confidence += 10

  // Configuration completeness
  if (config.devices && config.devices > 0) confidence += 10
  if (config.years && config.years >= 3) confidence += 10
  if (config.industry) confidence += 5

  // Portnox presence
  if (results.some((r) => r.vendorId === "portnox")) confidence += 10

  return Math.min(confidence, 100)
}

function calculatePersonalization(config: CalculationConfiguration): number {
  let personalization = 0

  if (config.devices && config.devices > 0) personalization += 25
  if (config.industry && config.industry !== "technology") personalization += 25
  if (config.years && config.years > 1) personalization += 25
  if (config.region) personalization += 25

  return Math.min(personalization, 100)
}

// Export additional utility functions
export function generateReportSummary(report: EnhancedReport): string {
  return `
${report.title}
Generated: ${report.metadata.generatedAt.toLocaleDateString()}
Confidence: ${report.metadata.confidence}%
Personalization: ${report.metadata.personalization}%

${report.executiveSummary}

Key Recommendations:
${report.recommendations.map((rec) => `• ${rec}`).join("\n")}
  `.trim()
}

export function exportReportToJSON(report: EnhancedReport): string {
  return JSON.stringify(report, null, 2)
}

export function generateReportMetrics(report: EnhancedReport) {
  return {
    sectionsCount: report.sections.length,
    recommendationsCount: report.recommendations.length,
    nextStepsCount: report.nextSteps.length,
    confidence: report.metadata.confidence,
    personalization: report.metadata.personalization,
    generatedAt: report.metadata.generatedAt,
  }
}
