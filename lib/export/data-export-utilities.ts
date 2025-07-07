import { COMPREHENSIVE_VENDOR_DATA, INDUSTRIES } from "../vendors/comprehensive-vendor-data"
import type { DetailedCostBreakdown } from "../calculators/comprehensive-tco-calculator"

// Export formats
export enum ExportFormat {
  PDF = "pdf",
  EXCEL = "excel",
  CSV = "csv",
  JSON = "json",
  POWERPOINT = "pptx",
  WORD = "docx",
}

// Export data structure
export interface ExportData {
  metadata: {
    generatedAt: Date
    generatedBy: string
    version: string
    title: string
    description: string
  }
  configuration: {
    industry: string
    deviceCount: number
    timeframe: number
    vendors: string[]
    deploymentModel: string
  }
  analysis: {
    tcoComparison: Record<string, DetailedCostBreakdown>
    roiAnalysis: any
    riskAssessment: any
    complianceMapping: any
    migrationPlan?: any
  }
  recommendations: {
    executive: string[]
    technical: string[]
    financial: string[]
  }
}

// Main export utility class
export class NACAnalysisExporter {
  private data: ExportData

  constructor(data: Partial<ExportData>) {
    this.data = {
      metadata: {
        generatedAt: new Date(),
        generatedBy: "Portnox TCO Analyzer",
        version: "1.0.0",
        title: "NAC Vendor Analysis Report",
        description: "Comprehensive analysis of Network Access Control solutions",
        ...data.metadata,
      },
      configuration: data.configuration || {
        industry: "HEALTHCARE",
        deviceCount: 500,
        timeframe: 3,
        vendors: ["PORTNOX", "CISCO_ISE", "ARUBA_CLEARPASS"],
        deploymentModel: "CLOUD",
      },
      analysis: data.analysis || {
        tcoComparison: {},
        roiAnalysis: {},
        riskAssessment: {},
        complianceMapping: {},
      },
      recommendations: data.recommendations || {
        executive: [],
        technical: [],
        financial: [],
      },
    }
  }

  // Export to JSON
  async exportToJSON(): Promise<string> {
    return JSON.stringify(this.data, null, 2)
  }

  // Export to CSV
  async exportToCSV(): Promise<string> {
    const vendors = Object.keys(this.data.analysis.tcoComparison)
    const headers = [
      "Vendor",
      "Total Cost",
      "Software Cost",
      "Hardware Cost",
      "Implementation Cost",
      "Operational Cost",
      "Hidden Costs",
      "ROI %",
      "Payback Period (days)",
      "Risk Score",
      "Compliance Score",
    ]

    const rows = vendors.map((vendor) => {
      const tco = this.data.analysis.tcoComparison[vendor]
      return [
        COMPREHENSIVE_VENDOR_DATA[vendor]?.name || vendor,
        tco.totalCost,
        tco.software.total,
        tco.hardware.total,
        tco.implementation.total,
        tco.operational.total,
        tco.hidden.total,
        tco.roi.toFixed(0),
        tco.paybackPeriod.toFixed(0),
        this.calculateRiskScore(vendor),
        this.calculateComplianceScore(vendor),
      ].join(",")
    })

    return [headers.join(","), ...rows].join("\n")
  }

  // Generate executive summary
  generateExecutiveSummary(): string {
    const portnoxData = this.data.analysis.tcoComparison["PORTNOX"]
    const competitorAvg = this.calculateCompetitorAverage()
    const savings = competitorAvg - (portnoxData?.totalCost || 0)
    const percentSavings = Math.round((savings / competitorAvg) * 100)

    return `
# Executive Summary: NAC Investment Analysis

## Overview
Organization: ${this.data.configuration.deviceCount} devices
Industry: ${INDUSTRIES[this.data.configuration.industry]?.name}
Analysis Period: ${this.data.configuration.timeframe} years

## Key Findings
1. **Recommended Solution**: Portnox CLEAR
2. **Cost Savings**: ${percentSavings}% reduction (${this.formatCurrency(savings)})
3. **ROI**: ${portnoxData?.roi || 5506}% over ${this.data.configuration.timeframe} years
4. **Payback Period**: ${(portnoxData?.paybackPeriod || 195) / 30} months

## Strategic Benefits
- **Deployment Speed**: 95% faster than traditional NAC (7 days vs 6-9 months)
- **Risk Reduction**: 92% reduction in breach probability
- **Operational Efficiency**: 90% reduction in administrative overhead
- **Zero Infrastructure**: No hardware investment or maintenance

## Financial Impact
- Total Investment: ${this.formatCurrency(portnoxData?.totalCost || 0)}
- Total Benefit: ${this.formatCurrency(portnoxData?.totalBenefit || 0)}
- Net Benefit: ${this.formatCurrency(portnoxData?.netBenefit || 0)}

## Recommendation
Immediate implementation of Portnox CLEAR is recommended based on:
- Superior financial returns
- Minimal deployment risk
- Comprehensive security capabilities
- Future-proof cloud architecture
`
  }

  // Generate technical comparison table
  generateTechnicalComparison(): any {
    const vendors = Object.keys(this.data.analysis.tcoComparison)
    const comparison: any = {}

    vendors.forEach((vendor) => {
      const vendorData = COMPREHENSIVE_VENDOR_DATA[vendor]
      if (!vendorData) return

      comparison[vendor] = {
        name: vendorData.name,
        architecture: vendorData.architecture,
        deployment: {
          cloud: vendorData.deploymentModels.CLOUD?.available || false,
          onPremise: vendorData.deploymentModels.ON_PREMISE?.available || false,
          hybrid: vendorData.deploymentModels.HYBRID?.available || false,
          deploymentTime: vendorData.deploymentModels.CLOUD?.deploymentTime || "N/A",
        },
        capabilities: {
          zeroTrust: vendorData.capabilities.zeroTrust,
          riskBased: vendorData.capabilities.riskBasedAccess,
          cloudPKI: vendorData.capabilities.cloudPKI,
          iotProfiling: vendorData.capabilities.iotProfiling,
          apiAccess: vendorData.capabilities.apiAccess,
          multiTenant: vendorData.capabilities.multiTenant,
        },
        vendorLockIn: vendorData.vendorLockIn,
      }
    })

    return comparison
  }

  // Generate compliance mapping
  generateComplianceMapping(): any {
    const industry = this.data.configuration.industry
    const regulations = INDUSTRIES[industry]?.regulations || []
    const mapping: any = {}

    regulations.forEach((regulation) => {
      mapping[regulation] = {
        requirements: this.getRegulationRequirements(regulation),
        portnoxCoverage: "95%+",
        automationLevel: "Fully Automated",
        reportingCapabilities: [
          "Real-time dashboards",
          "Scheduled reports",
          "Audit trail generation",
          "Violation alerts",
        ],
      }
    })

    return mapping
  }

  // Generate migration timeline
  generateMigrationTimeline(): any {
    const hasExistingNAC = this.data.configuration.vendors.length > 1

    return {
      approach: "Phased Migration",
      totalDuration: hasExistingNAC ? "6-8 weeks" : "2-4 weeks",
      phases: [
        {
          name: "Planning & Design",
          duration: "5 days",
          tasks: ["Requirements gathering", "Architecture design", "Policy mapping"],
        },
        {
          name: "Pilot Deployment",
          duration: "7 days",
          tasks: ["Test group selection", "Configuration", "Validation"],
        },
        {
          name: "Production Rollout",
          duration: hasExistingNAC ? "21 days" : "14 days",
          tasks: ["Phased deployment", "User training", "Monitoring"],
        },
        {
