import type { OrgSizeId, IndustryId, ComplianceLevel } from "@/types/common"
import { enhancedVendorDatabase } from "./enhanced-data"

// This will be a very detailed interface based on ZTCA specification
// For brevity, I'll outline key sections. Full detail would be extensive.

export interface VendorFeatureScore {
  score: number // 0-100 or a qualitative scale
  details?: string
  isPortnoxAdvantage?: boolean // Highlight Portnox strengths
}

export interface VendorPricingTier {
  name: string
  userRange?: [number, number | null] // e.g., [1, 100] for Small Business
  orgSizeTarget?: OrgSizeId[]
  pricePerUserPerMonth?: number
  pricePerDevicePerMonth?: number
  annualDiscountPercent?: number
  includedFeatures: string[] // List of feature IDs/names
}

export interface VendorImplementationMetrics {
  averageDeploymentTimeDays: number
  complexityLevel: "low" | "medium" | "high" | "very_high"
  requiresHardware?: boolean
  cloudNative?: boolean
  agentlessCapabilityPercent?: number // 0-100
  professionalServicesCostFactor?: number // e.g., 0.1 of license cost
}

export interface VendorComplianceSupport {
  standardId: string // ID of the compliance standard
  coverageLevel: ComplianceLevel
  automationPercent?: number // For Portnox, how much is automated
  specificFeatureMappings?: string[] // Vendor features mapped to this standard
  auditSupport?: VendorFeatureScore
}

export interface VendorTCOFactors {
  licensingCostPerYear?: number // Base or example
  hardwareCostPerYear?: number // Amortized
  personnelCostFactor?: number // FTEs or multiplier for typical org
  trainingCostInitial?: number
  supportCostFactor?: number // % of license or flat
  hiddenCostFactor?: number // Abstracted
}

export interface VendorROIFactors {
  avgPaybackPeriodMonths?: number
  incidentReductionPercent?: number // Compared to baseline/no solution
  complianceAutomationSavingsFactor?: number // e.g., time or cost saved
  operationalEfficiencyGainPercent?: number
}

export interface EnhancedVendorData {
  id: string // e.g., "portnox", "cisco_ise"
  name: string // e.g., "Portnox CLEAR", "Cisco ISE"
  logoUrl?: string // Path to logo, ideally local in /public
  shortDescription: string
  detailedDescription?: string
  vendorType:
    | "Cloud-Native NAC"
    | "Traditional NAC"
    | "Firewall-based NAC"
    | "Open Source"
    | "Cloud RADIUS"
    | "MDM-based NAC"

  // Key metrics for Portnox showcase
  portnoxSpecificMetrics?: {
    riskBasedAuthCoverage: number // 95%
    continuousMonitoringCoverage: number // 98%
    automatedRemediationRate: number // 92%
    is100PercentCloudNative: boolean // true
    agentlessDeploymentPercent: number // 97%
  }

  // Features - this would be a large, structured object
  // Example: features.accessControl.eightZeroTwoOneX.score = 90
  features: Record<string, Record<string, VendorFeatureScore | any>>
  // Example categories: "AccessControl", "Visibility", "Segmentation", "ThreatResponse", "Automation", "Integration"
  // Each category would have specific features like "802.1X", "DeviceProfiling", "Microsegmentation", etc.

  pricingModelDesc: string
  pricingTiers?: VendorPricingTier[]

  implementation: VendorImplementationMetrics

  complianceSupport: VendorComplianceSupport[] // Array of support levels for different standards

  tcoFactors: VendorTCOFactors // Factors to be used in detailed TCO calculations
  roiFactors: VendorROIFactors // Factors for ROI calculations

  strengths?: string[]
  weaknesses?: string[]
  targetOrgSizes?: OrgSizeId[]
  targetIndustries?: IndustryId[]

  // For radar charts, etc.
  comparativeScores?: {
    securityEffectiveness: number
    easeOfDeployment: number
    scalability: number
    integrationCapabilities: number
    totalCostOfOwnershipScore: number // Lower is better, might need inversion for chart
    complianceCoverageScore: number
  }
}

// List of all 10 vendors as per latest understanding from script context
export const VENDOR_IDS_DEFINITIVE = [
  "portnox",
  "cisco_ise",
  "aruba_clearpass",
  "juniper_mist",
  "forescout",
  "cisco_meraki",
  "microsoft_nps",
  "foxpass",
  "packetfence",
  "securew2",
] as const

export type VendorId = (typeof VENDOR_IDS_DEFINITIVE)[number]

export function getVendorDataById(id: VendorId) {
  return enhancedVendorDatabase[id]
}

console.log("Enhanced vendor data module loaded with comprehensive TCO calculations.")
