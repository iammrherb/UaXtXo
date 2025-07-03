import type { IndustryId, OrgSizeId, ComplianceLevel } from "@/types/common"
import type { ComplianceStandard } from "./standards"
import type { NewVendorData } from "@/lib/vendors/data"

export interface RiskFactor {
  id: string
  name: string
  description: string
  weight: number // 0-1, how much this factor contributes to overall risk
  industryMultipliers: Partial<Record<IndustryId, number>> // Industry-specific risk multipliers
}

export interface ComplianceGap {
  standardId: string
  standardName: string
  requirementId: string
  requirementName: string
  currentCoverage: ComplianceLevel
  targetCoverage: ComplianceLevel
  riskScore: number // 1-10
  businessImpact: "low" | "medium" | "high" | "critical"
  remediationEffort: "low" | "medium" | "high" | "very_high"
  remediationCost: number
  timeToRemediate: number // days
}

export interface RiskAssessmentResult {
  overallRiskScore: number // 1-100
  riskLevel: "low" | "medium" | "high" | "critical"
  complianceGaps: ComplianceGap[]
  industrySpecificRisks: {
    standardId: string
    riskScore: number
    description: string
  }[]
  recommendations: {
    priority: "high" | "medium" | "low"
    action: string
    expectedImpact: string
    estimatedCost: number
    timeframe: string
  }[]
  costOfNonCompliance: {
    fines: number
    reputationalDamage: number
    operationalDisruption: number
    total: number
  }
}

// Risk factors that contribute to overall compliance risk
export const riskFactors: RiskFactor[] = [
  {
    id: "data_breach_exposure",
    name: "Data Breach Exposure",
    description: "Risk of unauthorized access to sensitive data",
    weight: 0.3,
    industryMultipliers: {
      healthcare: 2.0,
      financial_services: 1.8,
      government: 1.6,
      education: 1.4,
    },
  },
  {
    id: "regulatory_penalties",
    name: "Regulatory Penalties",
    description: "Risk of fines and sanctions for non-compliance",
    weight: 0.25,
    industryMultipliers: {
      financial_services: 2.2,
      healthcare: 2.0,
      government: 1.8,
      energy_utilities: 1.6,
    },
  },
  {
    id: "operational_disruption",
    name: "Operational Disruption",
    description: "Risk of business operations being disrupted",
    weight: 0.2,
    industryMultipliers: {
      manufacturing: 1.8,
      energy_utilities: 1.7,
      healthcare: 1.6,
      financial_services: 1.5,
    },
  },
  {
    id: "reputational_damage",
    name: "Reputational Damage",
    description: "Risk of brand and reputation damage",
    weight: 0.15,
    industryMultipliers: {
      retail: 1.8,
      financial_services: 1.6,
      healthcare: 1.5,
      technology: 1.4,
    },
  },
  {
    id: "audit_failures",
    name: "Audit Failures",
    description: "Risk of failing compliance audits",
    weight: 0.1,
    industryMultipliers: {
      financial_services: 1.9,
      healthcare: 1.7,
      government: 1.6,
      manufacturing: 1.3,
    },
  },
]

// Industry-specific compliance cost estimates (annual)
export const complianceCostsByIndustry: Record<
  IndustryId,
  {
    averageComplianceBudget: number
    costOfNonComplianceMultiplier: number
    averageFineAmount: number
  }
> = {
  healthcare: {
    averageComplianceBudget: 250000,
    costOfNonComplianceMultiplier: 8.5,
    averageFineAmount: 2800000,
  },
  financial_services: {
    averageComplianceBudget: 450000,
    costOfNonComplianceMultiplier: 12.0,
    averageFineAmount: 5200000,
  },
  government: {
    averageComplianceBudget: 180000,
    costOfNonComplianceMultiplier: 6.0,
    averageFineAmount: 1500000,
  },
  education: {
    averageComplianceBudget: 120000,
    costOfNonComplianceMultiplier: 4.5,
    averageFineAmount: 850000,
  },
  retail: {
    averageComplianceBudget: 200000,
    costOfNonComplianceMultiplier: 7.0,
    averageFineAmount: 1800000,
  },
  manufacturing: {
    averageComplianceBudget: 180000,
    costOfNonComplianceMultiplier: 5.5,
    averageFineAmount: 1200000,
  },
  technology: {
    averageComplianceBudget: 300000,
    costOfNonComplianceMultiplier: 9.0,
    averageFineAmount: 3500000,
  },
  telecommunications: {
    averageComplianceBudget: 220000,
    costOfNonComplianceMultiplier: 6.5,
    averageFineAmount: 1600000,
  },
  energy_utilities: {
    averageComplianceBudget: 350000,
    costOfNonComplianceMultiplier: 10.0,
    averageFineAmount: 4200000,
  },
  legal_services: {
    averageComplianceBudget: 150000,
    costOfNonComplianceMultiplier: 8.0,
    averageFineAmount: 950000,
  },
  insurance: {
    averageComplianceBudget: 280000,
    costOfNonComplianceMultiplier: 9.5,
    averageFineAmount: 2900000,
  },
  pharmaceuticals: {
    averageComplianceBudget: 400000,
    costOfNonComplianceMultiplier: 11.0,
    averageFineAmount: 6800000,
  },
}

export class ComplianceRiskAssessor {
  private industry: IndustryId
  private orgSize: OrgSizeId
  private applicableStandards: ComplianceStandard[]

  constructor(industry: IndustryId, orgSize: OrgSizeId, applicableStandards: ComplianceStandard[]) {
    this.industry = industry
    this.orgSize = orgSize
    this.applicableStandards = applicableStandards
  }

  assessVendorRisk(vendor: NewVendorData): RiskAssessmentResult {
    const complianceGaps = this.identifyComplianceGaps(vendor)
    const overallRiskScore = this.calculateOverallRiskScore(complianceGaps)
    const riskLevel = this.determineRiskLevel(overallRiskScore)
    const industrySpecificRisks = this.assessIndustrySpecificRisks(vendor)
    const recommendations = this.generateRecommendations(complianceGaps, vendor)
    const costOfNonCompliance = this.calculateCostOfNonCompliance(complianceGaps)

    return {
      overallRiskScore,
      riskLevel,
      complianceGaps,
      industrySpecificRisks,
      recommendations,
      costOfNonCompliance,
    }
  }

  private identifyComplianceGaps(vendor: NewVendorData): ComplianceGap[] {
    const gaps: ComplianceGap[] = []

    for (const standard of this.applicableStandards) {
      const vendorSupport = vendor.complianceSupport?.find((cs) => cs.standardId === standard.id)

      for (const requirement of standard.requirements) {
        const currentCoverage = this.determineCurrentCoverage(vendorSupport, requirement.id)
        const targetCoverage: ComplianceLevel = "Covered" // Assume full coverage is the target

        if (currentCoverage !== targetCoverage) {
          const riskScore = this.calculateRequirementRiskScore(requirement, currentCoverage, standard.id)
          const businessImpact = this.assessBusinessImpact(requirement, standard.id)
          const remediationEffort = this.assessRemediationEffort(currentCoverage, targetCoverage)
          const remediationCost = this.estimateRemediationCost(requirement, businessImpact, remediationEffort)
          const timeToRemediate = this.estimateTimeToRemediate(remediationEffort)

          gaps.push({
            standardId: standard.id,
            standardName: standard.name,
            requirementId: requirement.id,
            requirementName: requirement.name,
            currentCoverage,
            targetCoverage,
            riskScore,
            businessImpact,
            remediationEffort,
            remediationCost,
            timeToRemediate,
          })
        }
      }
    }

    return gaps.sort((a, b) => b.riskScore - a.riskScore)
  }

  private determineCurrentCoverage(vendorSupport: any, requirementId: string): ComplianceLevel {
    if (!vendorSupport) return "NotCovered"

    // Simple mapping - in reality this would be more sophisticated
    const coverageLevel = vendorSupport.coverageLevel?.toLowerCase()
    if (coverageLevel?.includes("certified") || coverageLevel?.includes("compliant")) {
      return "Covered"
    } else if (coverageLevel?.includes("partial")) {
      return "Partial"
    }
    return "NotCovered"
  }

  private calculateRequirementRiskScore(requirement: any, coverage: ComplianceLevel, standardId: string): number {
    let baseScore = 5 // Default medium risk

    // Adjust based on coverage level
    switch (coverage) {
      case "NotCovered":
        baseScore = 8
        break
      case "Partial":
        baseScore = 5
        break
      case "Covered":
        baseScore = 2
        break
    }

    // Apply industry-specific multipliers
    const industryMultiplier = this.getIndustryRiskMultiplier(standardId)
    return Math.min(10, Math.round(baseScore * industryMultiplier))
  }

  private getIndustryRiskMultiplier(standardId: string): number {
    // Industry-specific risk multipliers for different standards
    const multipliers: Record<string, Partial<Record<IndustryId, number>>> = {
      hipaa: { healthcare: 1.8, insurance: 1.4 },
      pci_dss: { retail: 1.6, financial_services: 1.5 },
      sox: { financial_services: 1.9 },
      gdpr: { technology: 1.3, retail: 1.2 },
      nerc_cip: { energy_utilities: 2.0 },
      ferpa: { education: 1.7 },
    }

    return multipliers[standardId]?.[this.industry] || 1.0
  }

  private assessBusinessImpact(requirement: any, standardId: string): "low" | "medium" | "high" | "critical" {
    // Critical standards for specific industries
    const criticalStandards = {
      healthcare: ["hipaa", "hitech"],
      financial_services: ["pci_dss", "sox", "glba"],
      government: ["fedramp", "fisma"],
      energy_utilities: ["nerc_cip"],
    }

    if (criticalStandards[this.industry]?.includes(standardId)) {
      return "critical"
    }

    // Default assessment based on requirement type
    if (requirement.id.includes("access_control") || requirement.id.includes("encryption")) {
      return "high"
    } else if (requirement.id.includes("audit") || requirement.id.includes("monitoring")) {
      return "medium"
    }

    return "low"
  }

  private assessRemediationEffort(
    current: ComplianceLevel,
    target: ComplianceLevel,
  ): "low" | "medium" | "high" | "very_high" {
    if (current === "NotCovered" && target === "Covered") return "very_high"
    if (current === "NotCovered" && target === "Partial") return "high"
    if (current === "Partial" && target === "Covered") return "medium"
    return "low"
  }

  private estimateRemediationCost(requirement: any, impact: string, effort: string): number {
    const baseCosts = {
      low: 5000,
      medium: 15000,
      high: 35000,
      very_high: 75000,
      critical: 100000,
    }

    const impactMultiplier = impact === "critical" ? 2.0 : impact === "high" ? 1.5 : 1.0
    const effortCost = baseCosts[effort as keyof typeof baseCosts] || baseCosts.medium

    return Math.round(effortCost * impactMultiplier)
  }

  private estimateTimeToRemediate(effort: string): number {
    const timelines = {
      low: 30,
      medium: 90,
      high: 180,
      very_high: 365,
    }

    return timelines[effort as keyof typeof timelines] || 90
  }

  private calculateOverallRiskScore(gaps: ComplianceGap[]): number {
    if (gaps.length === 0) return 10 // Low risk if no gaps

    const totalRisk = gaps.reduce((sum, gap) => sum + gap.riskScore, 0)
    const averageRisk = totalRisk / gaps.length
    const gapCountPenalty = Math.min(gaps.length * 2, 20) // Penalty for having many gaps

    return Math.min(100, Math.round(averageRisk * 10 + gapCountPenalty))
  }

  private determineRiskLevel(score: number): "low" | "medium" | "high" | "critical" {
    if (score >= 80) return "critical"
    if (score >= 60) return "high"
    if (score >= 40) return "medium"
    return "low"
  }

  private assessIndustrySpecificRisks(vendor: NewVendorData) {
    const risks = []

    // Check for industry-specific compliance requirements
    if (this.industry === "healthcare" && !vendor.complianceSupport?.some((cs) => cs.standardId === "hipaa")) {
      risks.push({
        standardId: "hipaa",
        riskScore: 90,
        description: "HIPAA compliance is mandatory for healthcare organizations handling PHI",
      })
    }

    if (
      this.industry === "financial_services" &&
      !vendor.complianceSupport?.some((cs) => cs.standardId === "pci_dss")
    ) {
      risks.push({
        standardId: "pci_dss",
        riskScore: 85,
        description: "PCI-DSS compliance is required for organizations processing credit card data",
      })
    }

    return risks
  }

  private generateRecommendations(gaps: ComplianceGap[], vendor: NewVendorData) {
    const recommendations = []

    // High-priority gaps
    const criticalGaps = gaps.filter((gap) => gap.businessImpact === "critical")
    if (criticalGaps.length > 0) {
      recommendations.push({
        priority: "high" as const,
        action: `Address critical compliance gaps in ${criticalGaps.map((g) => g.standardName).join(", ")}`,
        expectedImpact: "Significantly reduce regulatory and business risk",
        estimatedCost: criticalGaps.reduce((sum, gap) => sum + gap.remediationCost, 0),
        timeframe: "Immediate (0-90 days)",
      })
    }

    // Vendor-specific recommendations
    if (vendor.vendorType === "Traditional NAC" && gaps.some((g) => g.requirementId.includes("cloud"))) {
      recommendations.push({
        priority: "medium" as const,
        action: "Consider migrating to a cloud-native NAC solution for better compliance automation",
        expectedImpact: "Reduce operational overhead and improve compliance posture",
        estimatedCost: 50000,
        timeframe: "Medium-term (3-6 months)",
      })
    }

    return recommendations
  }

  private calculateCostOfNonCompliance(gaps: ComplianceGap[]) {
    const industryData = complianceCostsByIndustry[this.industry]
    const criticalGaps = gaps.filter((gap) => gap.businessImpact === "critical").length
    const highGaps = gaps.filter((gap) => gap.businessImpact === "high").length

    const fines = industryData.averageFineAmount * (criticalGaps * 0.3 + highGaps * 0.1)
    const reputationalDamage = fines * 0.5 // Estimated as 50% of potential fines
    const operationalDisruption = industryData.averageComplianceBudget * 2 * (criticalGaps + highGaps * 0.5)

    return {
      fines: Math.round(fines),
      reputationalDamage: Math.round(reputationalDamage),
      operationalDisruption: Math.round(operationalDisruption),
      total: Math.round(fines + reputationalDamage + operationalDisruption),
    }
  }
}

export function compareVendorRisks(
  vendors: NewVendorData[],
  industry: IndustryId,
  orgSize: OrgSizeId,
  applicableStandards: ComplianceStandard[],
): Record<string, RiskAssessmentResult> {
  const assessor = new ComplianceRiskAssessor(industry, orgSize, applicableStandards)
  const results: Record<string, RiskAssessmentResult> = {}

  for (const vendor of vendors) {
    results[vendor.id] = assessor.assessVendorRisk(vendor)
  }

  return results
}
