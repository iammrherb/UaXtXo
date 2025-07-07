import type { EnhancedVendorData } from "@/lib/vendors/enhanced-data"
import { enhancedVendorDatabase, calculateTotalCostOfOwnership, calculateROI } from "@/lib/vendors/enhanced-data"
import type { OrgSizeId, IndustryId } from "@/types/common"

export type VendorId = keyof typeof enhancedVendorDatabase

export interface EnhancedTCOResult {
  vendorId: VendorId
  vendorName: string
  totalTCO: number
  annualTCO: number
  perDevicePerMonthTCO: number
  breakdown: {
    software: number[]
    hardware: number[]
    implementation: number[]
    operations: number[]
    support: number[]
    training: number[]
  }
  roi: {
    breachRiskReduction: number
    operationalSavings: number
    complianceSavings: number
    totalSavings: number
    paybackPeriod: number
  }
  securityMetrics: {
    zeroTrustScore: number
    riskReduction: {
      unauthorized_access: number
      lateral_movement: number
      data_breach: number
      insider_threat: number
      compliance_violation: number
    }
  }
  implementationMetrics: {
    timeToValue: {
      poc: number
      small: number
      medium: number
      large: number
    }
    complexity: string
    migrationEffort: string
  }
}

export function calculateEnhancedTCO(
  vendorId: VendorId,
  devices: number,
  years = 3,
  orgSizeId: OrgSizeId = "mid_market",
  industryId: IndustryId = "technology",
): EnhancedTCOResult | null {
  const vendor = enhancedVendorDatabase[vendorId]
  if (!vendor) return null

  const tco = calculateTotalCostOfOwnership(vendor, devices, years)
  const roi = calculateROI(vendor, tco, devices)

  const annualTCO = tco.year3 / 3
  const perDevicePerMonthTCO = annualTCO / (devices * 12)

  return {
    vendorId,
    vendorName: vendor.name,
    totalTCO: tco.year3,
    annualTCO,
    perDevicePerMonthTCO,
    breakdown: tco.breakdown,
    roi,
    securityMetrics: {
      zeroTrustScore: vendor.security.zeroTrustScore,
      riskReduction: vendor.security.riskReduction,
    },
    implementationMetrics: {
      timeToValue: vendor.implementation.timeToValue,
      complexity: vendor.implementation.complexity,
      migrationEffort: vendor.implementation.migrationFromExisting.effort,
    },
  }
}

export function compareVendorsTCO(
  vendorIds: VendorId[],
  devices: number,
  years = 3,
  orgSizeId: OrgSizeId = "mid_market",
  industryId: IndustryId = "technology",
): EnhancedTCOResult[] {
  const results: EnhancedTCOResult[] = []

  for (const vendorId of vendorIds) {
    const result = calculateEnhancedTCO(vendorId, devices, years, orgSizeId, industryId)
    if (result) {
      results.push(result)
    }
  }

  // Sort by total TCO (lowest first)
  return results.sort((a, b) => a.totalTCO - b.totalTCO)
}

export function getVendorById(vendorId: VendorId): EnhancedVendorData | undefined {
  return enhancedVendorDatabase[vendorId]
}

export function getAllVendors(): EnhancedVendorData[] {
  return Object.values(enhancedVendorDatabase)
}

export function getVendorsByCategory(category: EnhancedVendorData["category"]): EnhancedVendorData[] {
  return Object.values(enhancedVendorDatabase).filter((vendor) => vendor.category === category)
}

export function getVendorsByMarketPosition(position: EnhancedVendorData["marketPosition"]): EnhancedVendorData[] {
  return Object.values(enhancedVendorDatabase).filter((vendor) => vendor.marketPosition === position)
}

// Cost analysis helpers
export function calculatePerDeviceCost(vendorId: VendorId, devices: number): number {
  const vendor = enhancedVendorDatabase[vendorId]
  if (!vendor) return 0

  const discounts = vendor.pricing.perDevice.volumeDiscounts
  if (devices >= 10000) return discounts[10000]
  if (devices >= 5000) return discounts[5000]
  if (devices >= 1000) return discounts[1000]
  if (devices >= 500) return discounts[500]
  return vendor.pricing.perDevice.base
}

export function calculateImplementationTime(vendorId: VendorId, devices: number): number {
  const vendor = enhancedVendorDatabase[vendorId]
  if (!vendor) return 0

  if (devices <= 1000) return vendor.implementation.timeToValue.small
  if (devices <= 5000) return vendor.implementation.timeToValue.medium
  return vendor.implementation.timeToValue.large
}

export function getSecurityScore(vendorId: VendorId): number {
  const vendor = enhancedVendorDatabase[vendorId]
  return vendor?.security.zeroTrustScore || 0
}

export function getComplexityRating(vendorId: VendorId): string {
  const vendor = enhancedVendorDatabase[vendorId]
  return vendor?.implementation.complexity || "unknown"
}

// Market analysis helpers
export function getMarketLeaders(): EnhancedVendorData[] {
  return getVendorsByMarketPosition("leader")
}

export function getCloudNativeVendors(): EnhancedVendorData[] {
  return getVendorsByCategory("cloud-native")
}

export function getOnPremiseVendors(): EnhancedVendorData[] {
  return getVendorsByCategory("on-premise")
}

export function getHybridVendors(): EnhancedVendorData[] {
  return getVendorsByCategory("hybrid")
}

// ROI analysis helpers
export function calculateBreakEvenPoint(vendorId: VendorId, devices: number): number {
  const vendor = enhancedVendorDatabase[vendorId]
  if (!vendor) return 0

  const tco = calculateTotalCostOfOwnership(vendor, devices, 3)
  const roi = calculateROI(vendor, tco, devices)

  return roi.paybackPeriod
}

export function calculateAnnualSavings(vendorId: VendorId, devices: number): number {
  const vendor = enhancedVendorDatabase[vendorId]
  if (!vendor) return 0

  const tco = calculateTotalCostOfOwnership(vendor, devices, 3)
  const roi = calculateROI(vendor, tco, devices)

  return roi.totalSavings
}

// Vendor recommendation engine
export function recommendVendors(
  devices: number,
  budget: number,
  complexity: "low" | "medium" | "high" | "very high",
  deployment: "cloud" | "on-premise" | "hybrid",
): VendorId[] {
  const vendors = getAllVendors()

  const filtered = vendors.filter((vendor) => {
    // Check deployment model compatibility
    if (!vendor.deploymentModels.includes(deployment)) return false

    // Check complexity preference
    const complexityOrder = ["low", "medium", "high", "very high"]
    const vendorComplexityIndex = complexityOrder.indexOf(vendor.implementation.complexity)
    const preferredComplexityIndex = complexityOrder.indexOf(complexity)
    if (vendorComplexityIndex > preferredComplexityIndex) return false

    // Check if vendor can handle device count
    if (devices > vendor.scalability.maxDevices) return false

    // Check budget (rough estimate)
    const estimatedCost = calculatePerDeviceCost(vendor.id as VendorId, devices) * devices
    if (estimatedCost > budget) return false

    return true
  })

  // Sort by zero trust score (highest first)
  return filtered
    .sort((a, b) => b.security.zeroTrustScore - a.security.zeroTrustScore)
    .map((vendor) => vendor.id as VendorId)
    .slice(0, 5) // Return top 5 recommendations
}

console.log("Enhanced TCO Calculator with comprehensive vendor data loaded successfully.")
