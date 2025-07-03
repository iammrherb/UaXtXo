import type { NewVendorData } from "@/lib/vendors/data"
import type { ComplianceStandard, ComplianceRequirement } from "./standards"

export interface ComplianceGap {
  standardId: string
  standardName: string
  requirementId: string
  requirementName: string
  currentCoverage: string
  targetCoverage: string
  gapSeverity: "low" | "medium" | "high" | "critical"
  riskScore: number
  businessImpact: string
  remediationCost: number
  timeToRemediate: string
  remediationSteps: string[]
}

export interface CostOfNonCompliance {
  fines: number
  reputationalDamage: number
  operationalDisruption: number
  legalCosts: number
  total: number
}

export interface Recommendation {
  id: string
  priority: "low" | "medium" | "high" | "critical"
  category: string
  action: string
  expectedImpact: string
  estimatedCost: number
  timeframe: string
  dependencies: string[]
}

export interface RiskAssessmentResult {
  vendorId: string
  overallRiskScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  complianceGaps: ComplianceGap[]
  costOfNonCompliance: CostOfNonCompliance
  recommendations: Recommendation[]
  lastAssessed: string
  assessmentVersion: string
}

export class ComplianceRiskAssessor {
  private industryRiskMultipliers: Record<string, number> = {
    healthcare: 1.5,
    financial: 1.4,
    government: 1.3,
    retail: 1.2,
    technology: 1.1,
    manufacturing: 1.0,
    education: 0.9,
  }

  private orgSizeMultipliers: Record<string, number> = {
    enterprise: 1.3,
    large: 1.2,
    medium: 1.1,
    small: 1.0,
    startup: 0.9,
  }

  assessVendorRisk(
    vendor: NewVendorData,
    industry: string,
    orgSize: string,
    applicableStandards: ComplianceStandard[],
  ): RiskAssessmentResult {
    const complianceGaps = this.identifyComplianceGaps(vendor, applicableStandards)
    const baseRiskScore = this.calculateBaseRiskScore(vendor, complianceGaps)
    const adjustedRiskScore = this.applyContextualAdjustments(baseRiskScore, industry, orgSize)
    const riskLevel = this.determineRiskLevel(adjustedRiskScore)
    const costOfNonCompliance = this.calculateCostOfNonCompliance(complianceGaps, industry, orgSize)
    const recommendations = this.generateRecommendations(vendor, complianceGaps, riskLevel)

    return {
      vendorId: vendor.id,
      overallRiskScore: Math.round(adjustedRiskScore),
      riskLevel,
      complianceGaps,
      costOfNonCompliance,
      recommendations,
      lastAssessed: new Date().toISOString(),
      assessmentVersion: "1.0",
    }
  }

  private identifyComplianceGaps(vendor: NewVendorData, standards: ComplianceStandard[]): ComplianceGap[] {
    const gaps: ComplianceGap[] = []

    for (const standard of standards) {
      for (const requirement of standard.requirements) {
        const coverage = this.assessRequirementCoverage(vendor, requirement)

        if (coverage.hasGap) {
          gaps.push({
            standardId: standard.id,
            standardName: standard.name,
            requirementId: requirement.id,
            requirementName: requirement.name,
            currentCoverage: coverage.current,
            targetCoverage: coverage.target,
            gapSeverity: coverage.severity,
            riskScore: requirement.riskLevel,
            businessImpact: this.assessBusinessImpact(requirement, vendor),
            remediationCost: requirement.implementationCost,
            timeToRemediate: requirement.timeToImplement,
            remediationSteps: this.generateRemediationSteps(requirement, vendor),
          })
        }
      }
    }

    return gaps.sort((a, b) => b.riskScore - a.riskScore)
  }

  private assessRequirementCoverage(vendor: NewVendorData, requirement: ComplianceRequirement) {
    // Simplified coverage assessment based on vendor capabilities
    const hasSecurityFeatures = vendor.security_features.length > 0
    const hasCompliance = vendor.compliance_certifications.some((cert) =>
      cert.toLowerCase().includes(requirement.category.toLowerCase()),
    )
    const hasIntegrations = vendor.integration_capabilities.length > 2

    let coverageScore = 0
    if (hasSecurityFeatures) coverageScore += 30
    if (hasCompliance) coverageScore += 50
    if (hasIntegrations) coverageScore += 20

    const hasGap = coverageScore < 70
    const severity =
      coverageScore < 30 ? "critical" : coverageScore < 50 ? "high" : coverageScore < 70 ? "medium" : "low"

    return {
      hasGap,
      current: `${coverageScore}% coverage`,
      target: "100% coverage",
      severity: severity as "low" | "medium" | "high" | "critical",
    }
  }

  private calculateBaseRiskScore(vendor: NewVendorData, gaps: ComplianceGap[]): number {
    let riskScore = 0

    // Base vendor risk factors
    const lockInRisk = vendor.vendor_lock_in_risk === "high" ? 20 : vendor.vendor_lock_in_risk === "medium" ? 10 : 5
    const stabilityRisk =
      vendor.financial_stability === "unstable" ? 15 : vendor.financial_stability === "at_risk" ? 10 : 5
    const innovationRisk = vendor.innovation_score < 5 ? 10 : vendor.innovation_score < 7 ? 5 : 0

    riskScore += lockInRisk + stabilityRisk + innovationRisk

    // Compliance gaps contribution
    const gapRisk = gaps.reduce((sum, gap) => {
      const severityMultiplier =
        gap.gapSeverity === "critical" ? 3 : gap.gapSeverity === "high" ? 2 : gap.gapSeverity === "medium" ? 1.5 : 1
      return sum + gap.riskScore * severityMultiplier
    }, 0)

    riskScore += Math.min(gapRisk, 50) // Cap gap contribution at 50

    return Math.min(riskScore, 100)
  }

  private applyContextualAdjustments(baseScore: number, industry: string, orgSize: string): number {
    const industryMultiplier = this.industryRiskMultipliers[industry] || 1.0
    const sizeMultiplier = this.orgSizeMultipliers[orgSize] || 1.0

    return Math.min(baseScore * industryMultiplier * sizeMultiplier, 100)
  }

  private determineRiskLevel(score: number): "low" | "medium" | "high" | "critical" {
    if (score >= 80) return "critical"
    if (score >= 60) return "high"
    if (score >= 40) return "medium"
    return "low"
  }

  private calculateCostOfNonCompliance(gaps: ComplianceGap[], industry: string, orgSize: string): CostOfNonCompliance {
    const baseMultiplier = this.industryRiskMultipliers[industry] || 1.0
    const sizeMultiplier = this.orgSizeMultipliers[orgSize] || 1.0

    const fines = gaps.reduce((sum, gap) => {
      const baseFine =
        gap.gapSeverity === "critical"
          ? 100000
          : gap.gapSeverity === "high"
            ? 50000
            : gap.gapSeverity === "medium"
              ? 25000
              : 10000
      return sum + baseFine * baseMultiplier * sizeMultiplier
    }, 0)

    const reputationalDamage = fines * 0.5
    const operationalDisruption = fines * 0.3
    const legalCosts = fines * 0.2

    return {
      fines,
      reputationalDamage,
      operationalDisruption,
      legalCosts,
      total: fines + reputationalDamage + operationalDisruption + legalCosts,
    }
  }

  private assessBusinessImpact(requirement: ComplianceRequirement, vendor: NewVendorData): string {
    if (requirement.riskLevel >= 8) return "critical"
    if (requirement.riskLevel >= 6) return "high"
    if (requirement.riskLevel >= 4) return "medium"
    return "low"
  }

  private generateRemediationSteps(requirement: ComplianceRequirement, vendor: NewVendorData): string[] {
    return [
      `Assess current ${requirement.category} capabilities`,
      `Implement required ${requirement.name.toLowerCase()} controls`,
      `Validate implementation through ${requirement.validationMethod}`,
      "Document compliance evidence",
      "Establish ongoing monitoring",
    ]
  }

  private generateRecommendations(vendor: NewVendorData, gaps: ComplianceGap[], riskLevel: string): Recommendation[] {
    const recommendations: Recommendation[] = []

    // High-priority gaps
    const criticalGaps = gaps.filter((gap) => gap.gapSeverity === "critical" || gap.gapSeverity === "high")

    if (criticalGaps.length > 0) {
      recommendations.push({
        id: "rec-1",
        priority: "critical",
        category: "compliance",
        action: `Address ${criticalGaps.length} critical compliance gaps immediately`,
        expectedImpact: "Reduce regulatory risk by 60-80%",
        estimatedCost: criticalGaps.reduce((sum, gap) => sum + gap.remediationCost, 0),
        timeframe: "1-3 months",
        dependencies: ["Management approval", "Budget allocation"],
      })
    }

    // Vendor-specific recommendations
    if (vendor.vendor_lock_in_risk === "high") {
      recommendations.push({
        id: "rec-2",
        priority: "medium",
        category: "strategic",
        action: "Develop vendor diversification strategy",
        expectedImpact: "Reduce vendor dependency risk",
        estimatedCost: 25000,
        timeframe: "3-6 months",
        dependencies: ["Alternative vendor evaluation"],
      })
    }

    return recommendations
  }
}

export function compareVendorRisks(
  vendors: NewVendorData[],
  industry: string,
  orgSize: string,
  applicableStandards: ComplianceStandard[],
): Record<string, RiskAssessmentResult> {
  const assessor = new ComplianceRiskAssessor()
  const results: Record<string, RiskAssessmentResult> = {}

  for (const vendor of vendors) {
    results[vendor.id] = assessor.assessVendorRisk(vendor, industry, orgSize, applicableStandards)
  }

  return results
}
