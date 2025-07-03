import type { NewVendorData } from "@/lib/vendors/data"
import type { IndustryId, OrgSizeId } from "@/types/common"

export interface ComplianceGap {
  standard: string
  requirement: string
  description: string
  businessImpact: "low" | "medium" | "high" | "critical"
}

export interface RiskAssessmentResult {
  vendorId: string
  overallRiskScore: number // 0-100, lower is better
  riskLevel: "low" | "medium" | "high" | "critical"
  complianceGaps: ComplianceGap[]
  costOfNonCompliance: {
    direct: number
    indirect: number
    total: number
  }
}

export class ComplianceRiskAssessor {
  assess(vendor: NewVendorData, industry: IndustryId, orgSize: OrgSizeId): RiskAssessmentResult {
    // This is a mock implementation. A real implementation would be much more complex.
    const score = (vendor.name.length * 5) % 100
    const riskLevel = score > 75 ? "critical" : score > 50 ? "high" : score > 25 ? "medium" : "low"
    return {
      vendorId: vendor.id,
      overallRiskScore: score,
      riskLevel,
      complianceGaps: [],
      costOfNonCompliance: {
        direct: score * 1000,
        indirect: score * 500,
        total: score * 1500,
      },
    }
  }
}

export function compareVendorRisks(assessments: Record<string, RiskAssessmentResult>) {
  // Mock comparison logic
  return Object.values(assessments).sort((a, b) => a.overallRiskScore - b.overallRiskScore)
}
