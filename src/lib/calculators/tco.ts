import type { NewVendorData, VendorId, VendorPricingTier } from "@/src/lib/vendors/data"
import { getVendorDataById } from "@/src/lib/vendors/data"
import type { OrgSizeId } from "@/src/types/common"

// --- Configuration Data ---
const staffCostsByRegion: Record<
  string,
  { itAdminAvgSalary: number; securityAnalystAvgSalary: number; networkEngineerAvgSalary: number }
> = {
  "north-america": { itAdminAvgSalary: 125000, securityAnalystAvgSalary: 145000, networkEngineerAvgSalary: 135000 },
  europe: { itAdminAvgSalary: 95000, securityAnalystAvgSalary: 115000, networkEngineerAvgSalary: 105000 },
  "asia-pacific": { itAdminAvgSalary: 65000, securityAnalystAvgSalary: 85000, networkEngineerAvgSalary: 75000 },
  // Add other regions as needed
}

// Added baseline costs for ROI calculations
const defaultOrgSizeDetails: Record<
  OrgSizeId,
  {
    deviceCount: number
    userCount: number
    itStaffCount: number
    avgAnnualBreachCostBaseline: number // Average annual cost of a security breach without an advanced NAC solution
    manualComplianceCostBaseline: number // Annual cost of manual compliance efforts
    operationalInefficiencyCostBaseline: number // Annual cost due to operational inefficiencies addressable by NAC
  }
> = {
  small_business: {
    deviceCount: 50,
    userCount: 50,
    itStaffCount: 1,
    avgAnnualBreachCostBaseline: 50000,
    manualComplianceCostBaseline: 20000,
    operationalInefficiencyCostBaseline: 15000,
  },
  mid_market: {
    deviceCount: 500,
    userCount: 500,
    itStaffCount: 5,
    avgAnnualBreachCostBaseline: 250000,
    manualComplianceCostBaseline: 100000,
    operationalInefficiencyCostBaseline: 75000,
  },
  enterprise: {
    deviceCount: 5000,
    userCount: 5000,
    itStaffCount: 25,
    avgAnnualBreachCostBaseline: 1000000,
    manualComplianceCostBaseline: 400000,
    operationalInefficiencyCostBaseline: 300000,
  },
  global_enterprise: {
    deviceCount: 25000,
    userCount: 25000,
    itStaffCount: 100,
    avgAnnualBreachCostBaseline: 5000000,
    manualComplianceCostBaseline: 1500000,
    operationalInefficiencyCostBaseline: 1000000,
  },
}

// --- Cost Calculation Functions ---
function calculateLicensingCost(
  vendor: NewVendorData,
  orgSize: OrgSizeId,
  numDevices: number,
  numUsers: number,
  years: number,
): number {
  if (vendor.pricingTiers && vendor.pricingTiers.length > 0) {
    let tier: VendorPricingTier | undefined = vendor.pricingTiers.find((t) => t.orgSizeTarget?.includes(orgSize))
    if (!tier)
      tier = vendor.pricingTiers.find(
        (t) => t.userRange && numUsers >= t.userRange[0] && (t.userRange[1] === null || numUsers <= t.userRange[1]),
      )
    if (!tier && vendor.pricingTiers.length > 0) tier = vendor.pricingTiers[0]

    if (tier) {
      let unitPriceAnnual = 0
      let units = 0
      if (tier.pricePerDevicePerMonth !== undefined) {
        unitPriceAnnual = tier.pricePerDevicePerMonth * 12
        units = numDevices
      } else if (tier.pricePerUserPerMonth !== undefined) {
        unitPriceAnnual = tier.pricePerUserPerMonth * 12
        units = numUsers
      }
      if (tier.annualDiscountPercent) {
        // Assuming this discount is for annual prepay vs monthly
        unitPriceAnnual *= 1 - tier.annualDiscountPercent / 100
      }
      // Further multi-year discounts could be baked into vendor.tcoFactors.licensingCostPerYear if not in tiers
      if (units > 0 && unitPriceAnnual > 0) return unitPriceAnnual * units * years
    }
  }
  // Fallback: tcoFactors.licensingCostPerYear is assumed to be an annual cost for a 'typical' setup for this vendor
  // This might need scaling logic if it's not a flat rate regardless of size.
  // For now, assume it's a representative annual figure for the vendor's target segment.
  return (vendor.tcoFactors.licensingCostPerYear || 0) * years
}

function calculateHardwareCost(vendor: NewVendorData, years: number): number {
  // tcoFactors.hardwareCostPerYear should be the amortized annual cost of required hardware.
  return (vendor.tcoFactors.hardwareCostPerYear || 0) * years
}

function calculateImplementationCost(vendor: NewVendorData, annualSoftwareCost: number): number {
  const implMetrics = vendor.implementation
  let psCost = 0

  // If professionalServicesCostFactor is a percentage (e.g., 0.1 for 10%) of the first year's software cost
  if (
    implMetrics.professionalServicesCostFactor &&
    implMetrics.professionalServicesCostFactor > 0 &&
    implMetrics.professionalServicesCostFactor <= 1
  ) {
    psCost = annualSoftwareCost * implMetrics.professionalServicesCostFactor
  }
  // Else if it's a fixed sum (typically larger numbers like 5000, 10000)
  else if (implMetrics.professionalServicesCostFactor && implMetrics.professionalServicesCostFactor > 1) {
    psCost = implMetrics.professionalServicesCostFactor
  }
  // Fallback based on complexity if no factor is provided
  else {
    if (implMetrics.complexityLevel === "very_high") psCost = 50000
    else if (implMetrics.complexityLevel === "high") psCost = 25000
    else if (implMetrics.complexityLevel === "medium") psCost = 10000
    else psCost = 5000 // low complexity
  }
  return (vendor.tcoFactors.trainingCostInitial || 0) + psCost
}

function calculateOperationalCost(
  vendor: NewVendorData,
  orgItStaffCount: number,
  region: string,
  years: number,
): number {
  const regionalCost = staffCostsByRegion[region] || staffCostsByRegion["north-america"]
  // Using a blended average salary for simplicity. Could be more granular.
  const avgSalary =
    (regionalCost.itAdminAvgSalary + regionalCost.securityAnalystAvgSalary + regionalCost.networkEngineerAvgSalary) / 3
  // personnelCostFactor is assumed to be the number of FTEs required to manage this solution.
  return (vendor.tcoFactors.personnelCostFactor || 0.5) * avgSalary * years
}

function calculateSupportCost(vendor: NewVendorData, annualSoftwareCost: number, years: number): number {
  // For SaaS like Portnox, support is often included.
  if (vendor.id === "portnox" && vendor.vendorType === "Cloud-Native NAC") return 0
  // supportCostFactor is an annual percentage of the annual software cost.
  return annualSoftwareCost * (vendor.tcoFactors.supportCostFactor || 0.2) * years
}

function calculateHiddenCosts(vendor: NewVendorData, orgDeviceCount: number, years: number): number {
  // hiddenCostFactor is an estimated annual cost per device, potentially influenced by complexity.
  // This is an abstract value. A more detailed model might break this down.
  let complexityMultiplier = 1
  if (vendor.implementation.complexityLevel === "very_high") complexityMultiplier = 3
  else if (vendor.implementation.complexityLevel === "high") complexityMultiplier = 2
  else if (vendor.implementation.complexityLevel === "medium") complexityMultiplier = 1.5

  // If hiddenCostFactor is provided in data, assume it's an annual sum or per device.
  // If it's a small number (e.g. < 100), assume per device. If large, assume total annual.
  // For this example, let's assume it's a per-device factor or use a default.
  const perDeviceHiddenCost =
    vendor.tcoFactors.hiddenCostFactor !== undefined ? vendor.tcoFactors.hiddenCostFactor : 5 * complexityMultiplier
  return perDeviceHiddenCost * orgDeviceCount * years
}

// --- ROI Metrics Calculation ---
export interface ROIMetrics {
  totalProjectedSavingsOverYears: number
  paybackPeriodMonths: number | string
  annualizedROIPercent: number | string
  incidentReductionSavingsAnnual: number
  complianceAutomationSavingsAnnual: number
  operationalEfficiencyGainsAnnual: number
  totalAnnualizedBenefits: number
  percentage?: number
  paybackMonths?: number
}

function calculateROIMetrics(
  vendor: NewVendorData,
  totalTCO: number,
  orgSizeId: OrgSizeId,
  projectionYears: number,
): ROIMetrics {
  const roiFactors = vendor.roiFactors // Factors specific to how this vendor impacts ROI
  const orgDetails = defaultOrgSizeDetails[orgSizeId] // Baseline costs for this org size
  const annualTCO = projectionYears > 0 ? totalTCO / projectionYears : 0

  // Savings from reducing security incidents
  const incidentReductionSavingsAnnual =
    (orgDetails.avgAnnualBreachCostBaseline || 0) * ((roiFactors.incidentReductionPercent || 0) / 100)

  // Savings from automating compliance tasks
  // Assuming complianceAutomationSavingsFactor is the percentage of manual costs saved
  const complianceAutomationSavingsAnnual =
    (orgDetails.manualComplianceCostBaseline || 0) * (roiFactors.complianceAutomationSavingsFactor || 0)

  // Gains from improved operational efficiency
  // Assuming operationalEfficiencyGainPercent is the percentage of inefficiency costs recovered
  const operationalEfficiencyGainsAnnual =
    (orgDetails.operationalInefficiencyCostBaseline || 0) * ((roiFactors.operationalEfficiencyGainPercent || 0) / 100)

  const totalAnnualizedBenefits =
    incidentReductionSavingsAnnual + complianceAutomationSavingsAnnual + operationalEfficiencyGainsAnnual
  const netAnnualBenefit = totalAnnualizedBenefits - annualTCO
  const totalProjectedSavingsOverYears = netAnnualBenefit * projectionYears

  let paybackPeriodMonths: number | string = "N/A"
  if (netAnnualBenefit > 0) {
    if (totalTCO === 0 && netAnnualBenefit > 0)
      paybackPeriodMonths = "Immediate" // Should only happen if TCO is 0
    else if (totalTCO > 0) paybackPeriodMonths = (totalTCO / netAnnualBenefit) * 12
    else paybackPeriodMonths = "Immediate" // e.g. free tool with benefits, or TCO is negative (benefit itself)
  } else if (vendor.id === "portnox" && roiFactors.avgPaybackPeriodMonths) {
    // Fallback to vendor stated payback ONLY for Portnox if calculated is not favorable, as per ZTCA emphasis
    paybackPeriodMonths = roiFactors.avgPaybackPeriodMonths
  }

  let annualizedROIPercent: number | string = "N/A"
  if (totalTCO > 0) {
    // ROI = (Net Benefit / Total Cost) * 100. Annualized: (Annual Net Benefit / Annual Cost) * 100
    annualizedROIPercent = (netAnnualBenefit / annualTCO) * 100
  } else if (netAnnualBenefit > 0) {
    // If TCO is zero or negative (a net gain from the start), ROI is effectively infinite or very high
    annualizedROIPercent = "Infinite"
  }

  return {
    totalProjectedSavingsOverYears,
    paybackPeriodMonths,
    annualizedROIPercent:
      typeof annualizedROIPercent === "number"
        ? Number.parseFloat(annualizedROIPercent.toFixed(2))
        : annualizedROIPercent,
    incidentReductionSavingsAnnual: Number.parseFloat(incidentReductionSavingsAnnual.toFixed(2)),
    complianceAutomationSavingsAnnual: Number.parseFloat(complianceAutomationSavingsAnnual.toFixed(2)),
    operationalEfficiencyGainsAnnual: Number.parseFloat(operationalEfficiencyGainsAnnual.toFixed(2)),
    totalAnnualizedBenefits: Number.parseFloat(totalAnnualizedBenefits.toFixed(2)),
    // Add compatibility fields for the component
    percentage: typeof annualizedROIPercent === "number" ? Number.parseFloat(annualizedROIPercent.toFixed(2)) : 0,
    paybackMonths: typeof paybackPeriodMonths === "number" ? paybackPeriodMonths : 12,
  }
}

// --- Main TCO Calculation Function ---
export interface TCOResultBreakdown {
  software: number
  hardware: number
  implementation: number
  operational: number
  support: number
  hidden: number
}

export interface TCOResult {
  vendorId: VendorId
  vendor: VendorId
  vendorName: string
  totalTCO: number
  total: number
  annualTCO: number
  perDevicePerMonthTCO?: number
  breakdown: TCOResultBreakdown
  roiMetrics: ROIMetrics
  roi?: ROIMetrics
  licensing?: number
  operations?: number
}

export function calculateFullTCOForVendor(
  vendorId: VendorId,
  orgSizeId: OrgSizeId,
  industryId: string,
  projectionYears: number,
): TCOResult | null {
  const vendor = getVendorDataById(vendorId)
  const orgDetails = defaultOrgSizeDetails[orgSizeId]

  if (!vendor || !orgDetails) {
    console.error(`Error: Missing data for vendor '${vendorId}' or org size '${orgSizeId}'`)
    return null
  }
  if (projectionYears <= 0) {
    console.error(`Error: projectionYears must be positive for vendor '${vendorId}'. Received: ${projectionYears}`)
    return null
  }

  const numDevices = orgDetails.deviceCount
  const numUsers = orgDetails.userCount
  const itStaffCount = orgDetails.itStaffCount
  const region = "north-america" // Make this configurable through UI later

  // Calculate costs
  const softwareCost = calculateLicensingCost(vendor, orgSizeId, numDevices, numUsers, projectionYears)
  const annualSoftwareCost = softwareCost / projectionYears

  const hardwareCost = calculateHardwareCost(vendor, projectionYears)
  const implementationCost = calculateImplementationCost(vendor, annualSoftwareCost) // One-time cost, pass annual for %-based PS
  const operationalCost = calculateOperationalCost(vendor, itStaffCount, region, projectionYears)
  const supportCost = calculateSupportCost(vendor, annualSoftwareCost, projectionYears)
  const hiddenCost = calculateHiddenCosts(vendor, numDevices, projectionYears)

  const costs: TCOResultBreakdown = {
    software: Number.parseFloat(softwareCost.toFixed(2)),
    hardware: Number.parseFloat(hardwareCost.toFixed(2)),
    implementation: Number.parseFloat(implementationCost.toFixed(2)),
    operational: Number.parseFloat(operationalCost.toFixed(2)),
    support: Number.parseFloat(supportCost.toFixed(2)),
    hidden: Number.parseFloat(hiddenCost.toFixed(2)),
  }

  const totalTCO = Object.values(costs).reduce((sum, cost) => sum + (cost || 0), 0)
  const annualTCO = totalTCO / projectionYears
  const perDevicePerMonthTCO = numDevices > 0 ? annualTCO / (numDevices * 12) : undefined

  // Calculate ROI
  const roiMetrics = calculateROIMetrics(vendor, totalTCO, orgSizeId, projectionYears)

  return {
    vendorId,
    vendor: vendorId,
    vendorName: vendor.name,
    totalTCO: Number.parseFloat(totalTCO.toFixed(2)),
    total: Number.parseFloat(totalTCO.toFixed(2)),
    annualTCO: Number.parseFloat(annualTCO.toFixed(2)),
    perDevicePerMonthTCO: perDevicePerMonthTCO ? Number.parseFloat(perDevicePerMonthTCO.toFixed(2)) : undefined,
    breakdown: costs,
    roiMetrics,
    roi: roiMetrics,
    licensing: costs.software,
    operations: costs.operational,
  }
}

// --- Comparison Function ---
export function compareMultipleVendorsTCO(
  vendorIds: VendorId[],
  orgConfig: {
    devices: number
    users: number
    industry: string
    region: string
  },
  analysisConfig: {
    years: number
  },
  pricingConfig?: {
    portnoxBasePrice: number
    portnoxAddons: any
  },
): TCOResult[] {
  const results: TCOResult[] = []

  // Map the device/user counts to an org size
  let orgSizeId: OrgSizeId = "mid_market"
  if (orgConfig.devices <= 100) {
    orgSizeId = "small_business"
  } else if (orgConfig.devices <= 2500) {
    orgSizeId = "mid_market"
  } else if (orgConfig.devices <= 10000) {
    orgSizeId = "enterprise"
  } else {
    orgSizeId = "global_enterprise"
  }

  if (analysisConfig.years <= 0) {
    console.error("Projection years must be positive for comparison.")
    return []
  }

  for (const vendorId of vendorIds) {
    const result = calculateFullTCOForVendor(vendorId, orgSizeId, orgConfig.industry, analysisConfig.years)
    if (result) {
      results.push(result)
    }
  }
  results.sort((a, b) => a.totalTCO - b.totalTCO)
  return results
}

console.log("New TCO Calculator module updated with ROI calculations and refined TCO flow (v2).")
