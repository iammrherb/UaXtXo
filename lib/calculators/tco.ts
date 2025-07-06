import { VENDOR_DATA } from "@/lib/vendors/data"

export type OrgSizeKey = "startup" | "smb" | "medium" | "enterprise" | "xlarge" | "custom"

export interface VendorTCOBreakdown {
  licensing: number
  implementation: number
  hardware: number
  operational: number
  support: number
  training: number
  other: number
}

export interface ROIMetrics {
  breachRiskReduction: number
  operationalEfficiency: number
  complianceAutomation: number
  annualizedROIPercent: number
  paybackPeriodMonths: number
}

export interface FullTCOForVendor {
  vendorId: string
  vendorName: string
  totalTCO: number
  breakdown: VendorTCOBreakdown
  roiMetrics: ROIMetrics
}

export function calculateFullTCOForVendor(
  vendorId: string,
  orgSizeKey: OrgSizeKey,
  industry: string,
  projectionYears: number,
): FullTCOForVendor {
  const vendor = VENDOR_DATA[vendorId]

  if (!vendor) {
    throw new Error(`Vendor with ID ${vendorId} not found.`)
  }

  const baseCost = 100000 // Example base cost
  const licensingCost = vendor.pricing.startingPrice * 1000 * projectionYears
  const implementationCost = vendor.implementation.deploymentTime.fullDeployment * 100
  const hardwareCost = vendor.implementation.requiresHardware ? 50000 : 0
  const operationalCost = 0.1 * licensingCost * projectionYears // 10% of licensing
  const supportCost = 0.05 * licensingCost * projectionYears // 5% of licensing
  const trainingCost = 10000 // Example training cost
  const otherCosts = 5000 // Example other costs

  const totalTCO =
    baseCost +
    licensingCost +
    implementationCost +
    hardwareCost +
    operationalCost +
    supportCost +
    trainingCost +
    otherCosts

  const breakdown: VendorTCOBreakdown = {
    licensing: licensingCost,
    implementation: implementationCost,
    hardware: hardwareCost,
    operational: operationalCost,
    support: supportCost,
    training: trainingCost,
    other: otherCosts,
  }

  const roiMetrics: ROIMetrics = {
    breachRiskReduction: vendor.roi.breachRiskReduction,
    operationalEfficiency: vendor.roi.operationalEfficiency,
    complianceAutomation: vendor.roi.complianceAutomation,
    annualizedROIPercent: (vendor.roi.breachRiskReduction + vendor.roi.operationalEfficiency) * 100,
    paybackPeriodMonths: 12,
  }

  return {
    vendorId: vendor.id,
    vendorName: vendor.name,
    totalTCO: totalTCO,
    breakdown: breakdown,
    roiMetrics: roiMetrics,
  }
}

export function compareMultipleVendorsTCO(
  vendorIds: string[],
  orgSizeKey: OrgSizeKey,
  industry: string,
  projectionYears: number,
): FullTCOForVendor[] {
  return vendorIds.map((vendorId) => calculateFullTCOForVendor(vendorId, orgSizeKey, industry, projectionYears))
}
