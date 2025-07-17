import type { CalculationResult, CalculationConfiguration } from "./enhanced-tco-calculator"

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
    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const savings = avgCompetitorCost - (portnoxResult?.totalCost || 0)
    const savingsPercent = Math.round((savings / avgCompetitorCost) * 100)

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
            totalSavings: savings,
            savingsPercent,
            paybackMonths: portnoxResult?.roi.paybackMonths || 6,
            roi: portnoxResult?.roi.percentage || 5506,
          },
          charts: [
            {
              type: "bar",
              title: "Total Cost Comparison",
              data: results.map((r) => ({
                vendor: r.vendorName,
                cost: r.totalCost,
                savings: r.vendorId === "portnox" ? 0 : r.totalCost - (portnoxResult?.totalCost || 0),
              })),
            },
          ],
        },
        {
          title: "Strategic Benefits",
          content:
            "Beyond cost savings, Portnox CLEAR delivers transformational business value through rapid deployment, zero infrastructure requirements, and industry-leading security posture.",
          data: {
            deploymentTime: "1-7 days vs 3-9 months",
            securityRating: "95% vs 75% industry average",
            zeroTrust: "95% maturity score",
            cveCount: "0 vs 15+ average",
          },
        },
        {
          title: "Risk Mitigation",
          content: `Portnox CLEAR reduces organizational risk by ${portnoxResult?.risk.breachReduction ? Math.round(portnoxResult.risk.breachReduction * 100) : 92}% through zero CVE history, comprehensive compliance coverage, and proactive threat detection.`,
          data: {
            breachReduction: portnoxResult?.risk.breachReduction || 0.92,
            complianceFrameworks: 7,
            securityIncidents: 0,
            mttr: "< 1 hour",
          },
        },
        {
          title: "Implementation Roadmap",
          content:
            "Portnox CLEAR can be deployed in production within 7 days with zero infrastructure changes, minimal training requirements, and immediate ROI realization.",
          data: {
            phase1: "Planning & Design (1-2 days)",
            phase2: "Deployment & Testing (2-3 days)",
            phase3: "Production Rollout (1-2 days)",
            training: "2 hours total",
          },
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
            deployment: "Cloud-native SaaS vs On-premise hardware",
            scalability: "Unlimited vs Hardware-constrained",
            updates: "Automatic vs Manual maintenance windows",
            redundancy: "Built-in global redundancy vs Single points of failure",
          },
          charts: [
            {
              type: "radar",
              title: "Technical Capabilities",
              data: results.map((r) => ({
                vendor: r.vendorName,
                scalability: r.vendorId === "portnox" ? 95 : 70,
                security: r.risk.securityScore,
                performance: r.vendorId === "portnox" ? 90 : 75,
                reliability: r.vendorId === "portnox" ? 99 : 85,
                manageability: r.vendorId === "portnox" ? 95 : 60,
              })),
            },
          ],
        },
        {
          title: "Security Posture Analysis",
          content:
            "Comprehensive security assessment reveals Portnox CLEAR's zero-CVE track record and 95% Zero Trust maturity score significantly outperform traditional solutions.",
          data: {
            cveHistory: "0 CVEs vs industry average 15+",
            zeroTrust: "95% maturity vs 65% average",
            encryption: "End-to-end AES-256 encryption",
            compliance: "7 major frameworks supported",
          },
        },
        {
          title: "Integration Capabilities",
          content:
            "Portnox CLEAR provides comprehensive integration with existing infrastructure through REST APIs, SIEM connectors, and native cloud platform support.",
          data: {
            apis: "RESTful APIs with comprehensive documentation",
            siem: "Native SIEM integrations (Splunk, QRadar, Sentinel)",
            identity: "Active Directory, LDAP, SAML, OAuth",
            cloud: "AWS, Azure, GCP native integrations",
          },
        },
        {
          title: "Performance Metrics",
          content:
            "Performance testing demonstrates Portnox CLEAR's ability to handle enterprise-scale deployments with sub-second response times and 99.9% uptime SLA.",
          data: {
            responseTime: "< 100ms average",
            throughput: "10,000+ authentications/second",
            uptime: "99.9% SLA with global redundancy",
            scalability: "Unlimited device support",
          },
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
    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
    const totalSavings = avgCompetitorCost - (portnoxResult?.totalCost || 0)

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
          content: `Comprehensive TCO analysis reveals Portnox CLEAR's all-inclusive pricing model eliminates hidden costs while delivering ${Math.round((totalSavings / avgCompetitorCost) * 100)}% cost reduction.`,
          data: {
            portnoxTCO: portnoxResult?.totalCost || 0,
            competitorAvgTCO: avgCompetitorCost,
            totalSavings,
            savingsPercent: Math.round((totalSavings / avgCompetitorCost) * 100),
          },
          charts: [
            {
              type: "bar",
              title: "TCO Comparison by Category",
              data: [
                {
                  category: "Software Licensing",
                  portnox: portnoxResult?.breakdown.licensing || 0,
                  competitors: avgCompetitorCost * 0.4,
                },
                { category: "Hardware/Infrastructure", portnox: 0, competitors: avgCompetitorCost * 0.3 },
                { category: "Implementation Services", portnox: 0, competitors: avgCompetitorCost * 0.15 },
                { category: "Training & Support", portnox: 0, competitors: avgCompetitorCost * 0.15 },
              ],
            },
          ],
        },
        {
          title: "Return on Investment Analysis",
          content: `Portnox CLEAR delivers exceptional ROI through cost savings, operational efficiency gains, and risk reduction benefits.`,
          data: {
            initialInvestment: portnoxResult?.totalCost || 0,
            annualSavings: portnoxResult?.roi.annualSavings || 0,
            paybackPeriod: `${portnoxResult?.roi.paybackMonths || 6} months`,
            roi: `${portnoxResult?.roi.percentage || 5506}%`,
            npv: totalSavings * 0.8, // Simplified NPV calculation
          },
        },
        {
          title: "Hidden Cost Analysis",
          content:
            "Traditional NAC solutions carry significant hidden costs that Portnox CLEAR eliminates through its all-inclusive SaaS model.",
          data: {
            hardwareRefresh: "Eliminated - No hardware required",
            maintenanceWindows: "Eliminated - Automatic updates",
            professionalServices: "Eliminated - Self-service deployment",
            trainingCosts: "Minimized - 2 hours vs 40+ hours",
          },
        },
        {
          title: "Budget Impact & Cash Flow",
          content:
            "Portnox CLEAR's predictable OpEx model improves cash flow management while reducing capital expenditure requirements.",
          data: {
            capexReduction: avgCompetitorCost * 0.6, // Hardware and initial services
            opexOptimization: totalSavings / config.years, // Annual savings
            budgetPredictability: "100% - Fixed annual subscription",
            cashFlowImprovement: "Immediate - No upfront hardware costs",
          },
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
    const avgCompetitorCost = competitorResults.reduce((sum, r) => sum + r.totalCost, 0) / competitorResults.length
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
            marketTrend: "Cloud-native NAC adoption accelerating 40% annually",
            businessDriver: "Zero Trust security mandate and cost optimization",
            competitiveAdvantage: "First-mover advantage in cloud-native security",
            riskMitigation: "Eliminate infrastructure vulnerabilities and complexity",
          },
        },
        {
          title: "Investment Recommendation",
          content: `Board approval requested for Portnox CLEAR implementation, representing ${this.formatCurrency(portnoxResult?.totalCost || 0)} investment over ${config.years} years with ${this.formatCurrency(totalSavings)} net savings.`,
          data: {
            investment: portnoxResult?.totalCost || 0,
            savings: totalSavings,
            roi: `${portnoxResult?.roi.percentage || 5506}%`,
            payback: `${portnoxResult?.roi.paybackMonths || 6} months`,
            riskReduction: "92% security risk reduction",
          },
          charts: [
            {
              type: "pie",
              title: "Investment vs Savings",
              data: [
                { name: "Portnox Investment", value: portnoxResult?.totalCost || 0 },
                { name: "Cost Savings", value: totalSavings },
              ],
            },
          ],
        },
        {
          title: "Strategic Benefits & Competitive Advantage",
          content:
            "Portnox CLEAR delivers transformational benefits beyond cost savings, positioning the organization as a digital transformation leader.",
          data: {
            timeToMarket: "7 days vs 6+ months deployment",
            scalability: "Unlimited growth without infrastructure constraints",
            innovation: "AI-powered security and automation capabilities",
            compliance: "Comprehensive regulatory framework support",
          },
        },
        {
          title: "Risk Assessment & Mitigation",
          content:
            "Comprehensive risk analysis confirms Portnox CLEAR significantly reduces organizational risk while eliminating traditional NAC vulnerabilities.",
          data: {
            securityRisk: "92% reduction through zero-CVE platform",
            operationalRisk: "Eliminated through cloud-native architecture",
            complianceRisk: "Mitigated through automated compliance reporting",
            vendorRisk: "Reduced through proven cloud-native vendor",
          },
        },
        {
          title: "Implementation Timeline & Success Metrics",
          content:
            "Rapid implementation timeline with clear success metrics ensures quick value realization and measurable business impact.",
          data: {
            timeline: "30-day implementation with 7-day production deployment",
            successMetrics: "Cost savings, security posture, operational efficiency",
            governance: "Monthly steering committee reviews and reporting",
            riskManagement: "Comprehensive change management and rollback procedures",
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

  exportToPDF(report: GeneratedReport): Promise<Blob> {
    // Simulate PDF generation
    return new Promise((resolve) => {
      setTimeout(() => {
        const pdfContent = this.generatePDFContent(report)
        const blob = new Blob([pdfContent], { type: "application/pdf" })
        resolve(blob)
      }, 2000)
    })
  }

  exportToExcel(report: GeneratedReport): Promise<Blob> {
    // Simulate Excel generation
    return new Promise((resolve) => {
      setTimeout(() => {
        const excelContent = this.generateExcelContent(report)
        const blob = new Blob([excelContent], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
        resolve(blob)
      }, 1500)
    })
  }

  exportToPowerPoint(report: GeneratedReport): Promise<Blob> {
    // Simulate PowerPoint generation
    return new Promise((resolve) => {
      setTimeout(() => {
        const pptContent = this.generatePowerPointContent(report)
        const blob = new Blob([pptContent], {
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        })
        resolve(blob)
      }, 3000)
    })
  }

  private generatePDFContent(report: GeneratedReport): string {
    return `PDF Report: ${report.title}\nGenerated: ${report.generatedAt}\n\n${report.summary}\n\nSections:\n${report.sections.map((s) => `${s.title}: ${s.content}`).join("\n\n")}`
  }

  private generateExcelContent(report: GeneratedReport): string {
    return `Excel Report: ${report.title}\nGenerated: ${report.generatedAt}\n\nData analysis and charts would be included here.`
  }

  private generatePowerPointContent(report: GeneratedReport): string {
    return `PowerPoint Presentation: ${report.title}\nGenerated: ${report.generatedAt}\n\nSlides would be generated here with charts and visualizations.`
  }
}
