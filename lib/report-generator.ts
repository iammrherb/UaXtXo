import type { CalculationResult, CalculationConfiguration } from "./enhanced-tco-calculator"

export interface ReportData {
  title: string
  subtitle: string
  executiveSummary: string
  keyFindings: string[]
  recommendations: string[]
  sections: ReportSection[]
  appendices?: ReportAppendix[]
}

export interface ReportSection {
  title: string
  content: string
  subsections?: ReportSubsection[]
  charts?: ChartData[]
  tables?: TableData[]
  callouts?: CalloutBox[]
}

export interface ReportSubsection {
  title: string
  content: string
  bullets?: string[]
  metrics?: Record<string, string | number>
}

export interface ChartData {
  type: "bar" | "pie" | "line" | "radar" | "waterfall"
  title: string
  data: any[]
  config?: Record<string, any>
}

export interface TableData {
  title: string
  headers: string[]
  rows: (string | number)[][]
  formatting?: Record<string, string>
}

export interface CalloutBox {
  type: "success" | "warning" | "info" | "critical"
  title: string
  content: string
  metrics?: Record<string, string>
}

export interface ReportAppendix {
  title: string
  content: string
  data?: any
}

export class ProductionReportGenerator {
  private results: CalculationResult[]
  private config: CalculationConfiguration
  private portnoxResult?: CalculationResult
  private competitors: CalculationResult[]

  constructor(results: CalculationResult[], config: CalculationConfiguration) {
    this.results = results
    this.config = config
    this.portnoxResult = results.find((r) => r.vendorId === "portnox")
    this.competitors = results.filter((r) => r.vendorId !== "portnox")
  }

  /**
   * Generate Executive Summary Report - C-Suite Ready
   */
  generateExecutiveReport(): ReportData {
    const totalSavings = this.calculateTotalSavings()
    const savingsPercentage = this.calculateSavingsPercentage()
    const avgCompetitorCost =
      this.competitors.reduce((sum, r) => sum + r.totalCost, 0) / Math.max(this.competitors.length, 1)

    return {
      title: "Executive Investment Analysis: Network Access Control Modernization",
      subtitle: `Strategic NAC Evaluation | ${this.config.devices.toLocaleString()} Devices | ${this.config.years}-Year Analysis`,
      executiveSummary: `
        This comprehensive analysis evaluates Network Access Control (NAC) solutions for ${this.config.industry} organizations. 
        Our analysis demonstrates that Portnox CLEAR delivers exceptional value with ${savingsPercentage.toFixed(1)}% cost savings 
        (${this.formatCurrency(totalSavings)}) while providing superior security capabilities and operational efficiency.
        
        Key strategic advantages include 95% faster deployment, 92% breach risk reduction, and 90% reduction in administrative overhead 
        compared to traditional NAC solutions. The recommended solution achieves full ROI in ${this.portnoxResult?.roi.paybackMonths || 6.5} months 
        with quantifiable benefits exceeding ${this.formatCurrency(totalSavings * 3)} over the analysis period.
      `,
      keyFindings: [
        `${savingsPercentage.toFixed(1)}% total cost reduction with Portnox CLEAR vs traditional NAC`,
        `${this.portnoxResult?.roi.paybackMonths || 6.5} month payback period with ${this.portnoxResult?.roi.percentage || 550}% ROI`,
        `95% faster deployment: ${this.portnoxResult?.vendorData.implementation.deploymentDays || 1} days vs ${Math.max(...this.competitors.map((c) => c.vendorData.implementation.deploymentDays))} days`,
        `Zero security vulnerabilities vs ${Math.round(this.competitors.reduce((sum, c) => sum + c.vendorData.security.cveCount, 0) / Math.max(this.competitors.length, 1))} average CVEs`,
        `90% reduction in operational complexity and administrative overhead`,
        `92% breach risk reduction with Zero Trust architecture`,
      ],
      recommendations: [
        "Immediate deployment of Portnox CLEAR for maximum cost savings and security benefits",
        "Leverage cloud-native architecture to eliminate infrastructure investments",
        "Implement Zero Trust security model to reduce breach risk by 92%",
        "Capitalize on rapid deployment to achieve competitive advantage",
        "Utilize API-first design for seamless integration with existing security stack",
      ],
      sections: [
        {
          title: "Strategic Investment Overview",
          content: `
            The Network Access Control market is undergoing fundamental transformation. Traditional on-premise solutions 
            are being disrupted by cloud-native platforms that deliver superior security at dramatically lower costs.
            
            This analysis evaluates ${this.results.length} leading NAC vendors across comprehensive criteria including 
            total cost of ownership, security effectiveness, deployment complexity, and operational efficiency.
          `,
          callouts: [
            {
              type: "success",
              title: "Recommended Solution: Portnox CLEAR",
              content: "Cloud-native Zero Trust NAC platform delivering exceptional value",
              metrics: {
                "Total Investment": this.formatCurrency(this.portnoxResult?.totalCost || 0),
                "Annual Savings": this.formatCurrency(this.portnoxResult?.roi.annualSavings || 0),
                "Payback Period": `${this.portnoxResult?.roi.paybackMonths || 6.5} months`,
                "Security Rating": `${this.portnoxResult?.vendorData.security.securityRating || 98}/100`,
              },
            },
          ],
        },
        {
          title: "Financial Impact Analysis",
          content: `
            The financial case for Portnox CLEAR is compelling across all evaluation criteria. Direct cost savings 
            of ${this.formatCurrency(totalSavings)} represent only the beginning of the value proposition.
          `,
          subsections: [
            {
              title: "Total Cost of Ownership Comparison",
              content: "Comprehensive 3-year TCO analysis including all direct, operational, and hidden costs:",
              metrics: {
                "Portnox CLEAR": this.formatCurrency(this.portnoxResult?.totalCost || 0),
                "Traditional NAC Average": this.formatCurrency(avgCompetitorCost),
                "Total Savings": this.formatCurrency(totalSavings),
                "Savings Percentage": `${savingsPercentage.toFixed(1)}%`,
              },
            },
            {
              title: "Hidden Cost Elimination",
              content: "Traditional NAC solutions carry significant hidden costs that Portnox eliminates:",
              bullets: [
                "Zero hardware infrastructure requirements",
                "No complex integration projects",
                "Minimal training and certification needs",
                "Automated operations reducing staffing requirements",
                "Elimination of maintenance windows and downtime",
              ],
            },
          ],
        },
        {
          title: "Security & Risk Mitigation",
          content: `
            Security effectiveness is paramount in NAC selection. Portnox CLEAR provides superior protection 
            with zero security vulnerabilities since inception.
          `,
          callouts: [
            {
              type: "critical",
              title: "Security Advantage",
              content:
                "Portnox maintains perfect security record while competitors average multiple critical vulnerabilities annually",
              metrics: {
                "Portnox CVEs": "0",
                "Competitor Average": `${Math.round(this.competitors.reduce((sum, c) => sum + c.vendorData.security.cveCount, 0) / Math.max(this.competitors.length, 1))}`,
                "Zero Trust Maturity": "95%",
                "Breach Risk Reduction": "92%",
              },
            },
          ],
        },
        {
          title: "Operational Excellence",
          content: `
            Operational efficiency drives long-term value. Portnox CLEAR's cloud-native architecture 
            eliminates traditional NAC complexity while providing superior capabilities.
          `,
          subsections: [
            {
              title: "Deployment Advantage",
              content: "Revolutionary deployment speed provides immediate competitive advantage:",
              bullets: [
                `${this.portnoxResult?.vendorData.implementation.deploymentDays || 1} day deployment vs ${Math.max(...this.competitors.map((c) => c.vendorData.implementation.deploymentDays))} days for traditional solutions`,
                "Zero hardware procurement and installation",
                "Automated configuration and policy deployment",
                "Immediate global availability and scalability",
              ],
            },
            {
              title: "Ongoing Operations",
              content: "Minimal operational overhead maximizes IT efficiency:",
              metrics: {
                "Administrative Overhead": "90% reduction",
                "Required FTE": `${this.portnoxResult?.vendorData.implementation.resourcesRequired.ongoingFTE || 0.1}`,
                "Automation Level": "95%",
                "Self-Service Capability": "100%",
              },
            },
          ],
        },
      ],
      appendices: [
        {
          title: "Vendor Comparison Matrix",
          content: "Detailed feature and capability comparison across all evaluated vendors",
          data: this.results,
        },
        {
          title: "ROI Calculation Methodology",
          content: "Comprehensive methodology for calculating return on investment and payback periods",
          data: this.config,
        },
      ],
    }
  }

  /**
   * Generate Technical Analysis Report - IT/Security Teams
   */
  generateTechnicalReport(): ReportData {
    return {
      title: "Technical Architecture Analysis: NAC Platform Evaluation",
      subtitle: `Comprehensive Technical Assessment | Security, Architecture & Implementation`,
      executiveSummary: `
        This technical analysis evaluates NAC platforms across architecture, security capabilities, 
        integration requirements, and operational characteristics. Portnox CLEAR's cloud-native 
        architecture provides significant technical advantages over traditional on-premise solutions.
      `,
      keyFindings: [
        "Cloud-native SaaS architecture eliminates infrastructure complexity",
        "API-first design enables seamless integration with existing security tools",
        "Zero Trust security model provides superior threat protection",
        "Agentless deployment reduces endpoint impact and management overhead",
        "Real-time policy enforcement with microsecond response times",
      ],
      recommendations: [
        "Adopt cloud-native NAC architecture for scalability and reliability",
        "Leverage API integrations for security orchestration and automation",
        "Implement Zero Trust model for comprehensive threat protection",
        "Utilize agentless approach to minimize endpoint complexity",
      ],
      sections: [
        {
          title: "Architecture Comparison",
          content: "Fundamental architectural differences drive operational and security outcomes:",
          tables: [
            {
              title: "Architecture Comparison Matrix",
              headers: ["Capability", "Portnox CLEAR", "Traditional NAC"],
              rows: [
                ["Deployment Model", "Pure SaaS", "On-premise/Hybrid"],
                ["Infrastructure", "Zero hardware", "Appliances required"],
                ["Scalability", "Unlimited", "Hardware constrained"],
                ["High Availability", "Built-in global", "Complex HA setup"],
                ["Updates", "Automatic", "Manual maintenance"],
                ["API Access", "Full REST API", "Limited/Legacy"],
              ],
            },
          ],
        },
        {
          title: "Security Capabilities Assessment",
          content: "Comprehensive security feature analysis across all evaluated platforms:",
          subsections: [
            {
              title: "Zero Trust Implementation",
              content: "Portnox CLEAR provides the most mature Zero Trust implementation:",
              bullets: [
                "Continuous device and user verification",
                "Risk-based access control with real-time assessment",
                "Microsegmentation with dynamic policy enforcement",
                "Behavioral analytics and anomaly detection",
              ],
            },
            {
              title: "Vulnerability Management",
              content: "Security track record comparison:",
              metrics: {
                "Portnox CLEAR CVEs": "0 (since inception)",
                "Cisco ISE CVEs": "47 (last 3 years)",
                "Aruba ClearPass CVEs": "12 (last 3 years)",
                "Industry Average": "15-20 annually",
              },
            },
          ],
        },
      ],
    }
  }

  /**
   * Generate Financial Analysis Report - CFO/Finance Teams
   */
  generateFinancialReport(): ReportData {
    const totalSavings = this.calculateTotalSavings()
    const savingsPercentage = this.calculateSavingsPercentage()

    return {
      title: "Financial Analysis: NAC Investment Business Case",
      subtitle: `Comprehensive Financial Evaluation | ROI, TCO & Budget Impact Analysis`,
      executiveSummary: `
        This financial analysis provides comprehensive evaluation of NAC investment options with detailed 
        cost-benefit analysis, ROI calculations, and budget impact assessment. The analysis demonstrates 
        clear financial advantages for cloud-native NAC solutions.
      `,
      keyFindings: [
        `${this.formatCurrency(totalSavings)} total cost savings over ${this.config.years} years`,
        `${savingsPercentage.toFixed(1)}% reduction in total cost of ownership`,
        `${this.portnoxResult?.roi.paybackMonths || 6.5} month payback period`,
        `${this.portnoxResult?.roi.percentage || 550}% return on investment`,
        "Zero capital expenditure requirements with SaaS model",
      ],
      recommendations: [
        "Approve Portnox CLEAR implementation for maximum financial benefit",
        "Leverage OpEx model to preserve capital for strategic initiatives",
        "Realize immediate cost savings through elimination of hardware investments",
        "Capture productivity gains through operational efficiency improvements",
      ],
      sections: [
        {
          title: "Investment Summary",
          content: "Comprehensive financial overview of recommended NAC investment:",
          callouts: [
            {
              type: "success",
              title: "Investment Highlights",
              content: "Key financial metrics for Portnox CLEAR implementation",
              metrics: {
                "Total Investment": this.formatCurrency(this.portnoxResult?.totalCost || 0),
                "Annual Operating Cost": this.formatCurrency((this.portnoxResult?.totalCost || 0) / this.config.years),
                "Cost per Device": this.formatCurrency((this.portnoxResult?.totalCost || 0) / this.config.devices),
                "Cost per User": this.formatCurrency((this.portnoxResult?.totalCost || 0) / this.config.users),
              },
            },
          ],
        },
        {
          title: "Return on Investment Analysis",
          content: "Detailed ROI calculation including all quantifiable benefits:",
          subsections: [
            {
              title: "Direct Cost Savings",
              content: "Immediate cost reductions compared to traditional NAC solutions:",
              bullets: [
                "Elimination of hardware infrastructure costs",
                "Reduced implementation and integration expenses",
                "Lower ongoing maintenance and support costs",
                "Decreased training and certification requirements",
              ],
            },
            {
              title: "Productivity Benefits",
              content: "Operational efficiency gains translate to measurable financial benefits:",
              metrics: {
                "IT Staff Productivity": `${this.portnoxResult?.roi.laborSavingsFTE || 2.5} FTE savings`,
                "Annual Labor Savings": this.formatCurrency((this.portnoxResult?.roi.laborSavingsFTE || 2.5) * 95000),
                "Deployment Time Savings": "95% faster implementation",
                "Administrative Overhead": "90% reduction",
              },
            },
          ],
        },
      ],
    }
  }

  /**
   * Generate Board Presentation Report - Board of Directors
   */
  generateBoardReport(): ReportData {
    const totalSavings = this.calculateTotalSavings()
    const savingsPercentage = this.calculateSavingsPercentage()

    return {
      title: "Board Report: Strategic NAC Investment Recommendation",
      subtitle: `Executive Summary for Board Approval | Risk Mitigation & Strategic Value`,
      executiveSummary: `
        The Board is requested to approve the strategic investment in Portnox CLEAR Network Access Control 
        platform. This investment delivers ${this.formatCurrency(totalSavings)} in cost savings while 
        significantly reducing cybersecurity risk and enabling digital transformation initiatives.
      `,
      keyFindings: [
        `${savingsPercentage.toFixed(1)}% cost reduction with superior security capabilities`,
        "92% reduction in data breach risk through Zero Trust architecture",
        "95% faster deployment enabling rapid competitive advantage",
        `${this.portnoxResult?.roi.percentage || 550}% ROI with ${this.portnoxResult?.roi.paybackMonths || 6.5} month payback`,
        "Strategic alignment with cloud-first digital transformation",
      ],
      recommendations: [
        "Approve immediate implementation of Portnox CLEAR NAC platform",
        "Authorize budget allocation for cloud-native security infrastructure",
        "Endorse Zero Trust security strategy for enterprise-wide adoption",
        "Support digital transformation through modern security architecture",
      ],
      sections: [
        {
          title: "Strategic Business Case",
          content: `
            Network Access Control represents a critical security infrastructure investment that directly 
            impacts business risk, operational efficiency, and competitive positioning. The recommended 
            solution provides exceptional value while advancing strategic objectives.
          `,
          callouts: [
            {
              type: "info",
              title: "Strategic Alignment",
              content: "Investment aligns with key business objectives and risk management priorities",
              metrics: {
                "Risk Reduction": "92% breach risk mitigation",
                "Cost Savings": this.formatCurrency(totalSavings),
                "Competitive Advantage": "95% faster deployment",
                "Digital Transformation": "Cloud-native architecture",
              },
            },
          ],
        },
        {
          title: "Risk Management",
          content: `
            Cybersecurity risk represents one of the most significant threats to business continuity 
            and shareholder value. The recommended NAC investment provides comprehensive risk mitigation.
          `,
          subsections: [
            {
              title: "Cybersecurity Risk Mitigation",
              content: "Quantifiable risk reduction through advanced security capabilities:",
              bullets: [
                "92% reduction in data breach probability",
                "Zero security vulnerabilities in recommended solution",
                "Continuous compliance monitoring and reporting",
                "Real-time threat detection and response",
              ],
            },
            {
              title: "Business Continuity",
              content: "Enhanced operational resilience and business continuity:",
              bullets: [
                "99.99% uptime SLA with global redundancy",
                "Automated disaster recovery and failover",
                "Scalable architecture supporting business growth",
                "Vendor-agnostic approach reducing lock-in risk",
              ],
            },
          ],
        },
      ],
    }
  }

  // Utility methods
  private calculateTotalSavings(): number {
    if (!this.portnoxResult || this.competitors.length === 0) return 0
    const avgCompetitorCost = this.competitors.reduce((sum, r) => sum + r.totalCost, 0) / this.competitors.length
    return avgCompetitorCost - this.portnoxResult.totalCost
  }

  private calculateSavingsPercentage(): number {
    if (!this.portnoxResult || this.competitors.length === 0) return 0
    const avgCompetitorCost = this.competitors.reduce((sum, r) => sum + r.totalCost, 0) / this.competitors.length
    const savings = avgCompetitorCost - this.portnoxResult.totalCost
    return (savings / avgCompetitorCost) * 100
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
}

// Export factory function
export function createReportGenerator(
  results: CalculationResult[],
  config: CalculationConfiguration,
): ProductionReportGenerator {
  return new ProductionReportGenerator(results, config)
}
