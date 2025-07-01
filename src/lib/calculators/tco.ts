import type { NewVendorData, VendorId } from "@/lib/vendors/data"
import { getVendorDataById } from "@/lib/vendors/data"
import type { Industry, IndustryId } from "@/lib/industries/data"
import { getIndustryById } from "@/lib/industries/data"
import type { OrgSizeId } from "@/types/common"

// --- Configuration Data ---
const staffCostsByRegion: Record<
  string,
  { itAdminAvgSalary: number; securityAnalystAvgSalary: number; networkEngineerAvgSalary: number }
> = {
  "north-america": { itAdminAvgSalary: 125000, securityAnalystAvgSalary: 145000, networkEngineerAvgSalary: 135000 },
  europe: { itAdminAvgSalary: 95000, securityAnalystAvgSalary: 115000, networkEngineerAvgSalary: 105000 },
  "asia-pacific": { itAdminAvgSalary: 65000, securityAnalystAvgSalary: 85000, networkEngineerAvgSalary: 75000 },
}

const defaultOrgSizeDetails: Record<
  OrgSizeId,
  {
    deviceCount: number
    userCount: number
    itStaffCount: number
    avgAnnualBreachCostBaseline: number
    manualComplianceCostBaseline: number
    operationalInefficiencyCostBaseline: number
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

// --- ENHANCED COST CALCULATION FUNCTIONS ---

function parsePrice(price: string | number | undefined): number {
  if (typeof price === "number") return price
  if (typeof price === "string") {
    // Handles "$50/endpoint/year", "$19,995", "15k-17k"
    const cleaned = price.replace(/[$,/a-zA-Z]/g, "").trim()
    if (cleaned.includes("-")) {
      const parts = cleaned.split("-").map((p) => Number.parseFloat(p.replace("k", "000")))
      return (parts[0] + parts[1]) / 2 // Average of range
    }
    return Number.parseFloat(cleaned.replace("k", "000"))
  }
  return 0
}

function calculateLicensingCost(vendor: NewVendorData, numDevices: number, years: number): number {
  if (!vendor.licensingDetails) {
    return (vendor.tcoFactors.licensingCostPerYear || 0) * years
  }

  let annualCost = 0
  const tiers = vendor.licensingDetails.licensingTiers

  // Find the most relevant tier - this is a simplification
  const tierKey =
    Object.keys(tiers).find((k) => k.toLowerCase().includes("enterprise")) ||
    Object.keys(tiers).find((k) => k.toLowerCase().includes("premier")) ||
    Object.keys(tiers)[0]
  const tier = tiers[tierKey]

  if (tier && tier.listPrice) {
    const pricePerDeviceYear = parsePrice(tier.listPrice)
    annualCost = pricePerDeviceYear * numDevices
  } else {
    // Fallback to old model if new one isn't fully populated
    return (vendor.tcoFactors.licensingCostPerYear || 50000) * years
  }

  // Add module costs
  if (vendor.licensingDetails.modules) {
    for (const moduleKey in vendor.licensingDetails.modules) {
      const module = vendor.licensingDetails.modules[moduleKey]
      const modulePrice = parsePrice(module.listPrice)
      if (moduleKey.toLowerCase().includes("per 1,000")) {
        annualCost += modulePrice * (numDevices / 1000)
      } else if (moduleKey.toLowerCase().includes("per 5,000")) {
        annualCost += modulePrice * (numDevices / 5000)
      } else if (
        module.listPrice?.toString().toLowerCase().includes("endpoint") ||
        module.listPrice?.toString().toLowerCase().includes("device")
      ) {
        annualCost += modulePrice * numDevices
      } else {
        // Assume it's a flat annual cost for the module
        annualCost += modulePrice
      }
    }
  }

  // Apply mandatory support/maintenance if it's a percentage of license cost
  if (
    vendor.tcoFactors.supportCostFactor &&
    vendor.tcoFactors.supportCostFactor > 0 &&
    vendor.tcoFactors.supportCostFactor < 1
  ) {
    annualCost *= 1 + vendor.tcoFactors.supportCostFactor
  }

  return annualCost * years
}

function calculateHardwareCost(vendor: NewVendorData, numDevices: number, years: number): number {
  if (!vendor.hardwareDetails || !vendor.requiresHardware) {
    return (vendor.tcoFactors.hardwareCostPerYear || 0) * years
  }

  let totalHardwareCost = 0
  const hardware = { ...vendor.hardwareDetails.physical, ...vendor.hardwareDetails.virtual }

  // Simplified logic: find a hardware model that can support the number of devices
  let chosenHardwareKey = Object.keys(hardware).find((k) => {
    const capacityStr = hardware[k].capacity || "0"
    const capacity = Number.parseInt(capacityStr.replace(/,/g, ""))
    return capacity >= numDevices
  })

  if (!chosenHardwareKey && Object.keys(hardware).length > 0) {
    // If no single appliance is big enough, find the largest and scale up
    chosenHardwareKey = Object.keys(hardware).sort((a, b) => {
      const capA = Number.parseInt((hardware[a].capacity || "0").replace(/,/g, ""))
      const capB = Number.parseInt((hardware[b].capacity || "0").replace(/,/g, ""))
      return capB - capA
    })[0]
  }

  if (chosenHardwareKey) {
    const chosenHardware = hardware[chosenHardwareKey]
    const capacity = Number.parseInt((chosenHardware.capacity || "1").replace(/,/g, ""))
    const numAppliances = Math.ceil(numDevices / capacity)
    const costPerAppliance = parsePrice(chosenHardware.streetPrice || chosenHardware.listPrice)

    // Assume 2 for HA
    totalHardwareCost = costPerAppliance * numAppliances * 2
  }

  // Amortize over 5 years, then multiply by projection years
  const annualAmortizedCost = totalHardwareCost / 5
  return annualAmortizedCost * years
}

function calculateImplementationCost(vendor: NewVendorData, annualSoftwareCost: number): number {
  let totalPsCost = 0
  if (vendor.professionalServices) {
    // Simplified: take the "Advanced Deployment" cost if available
    const advancedKey = Object.keys(vendor.professionalServices).find((k) => k.toLowerCase().includes("advanced"))
    if (advancedKey) {
      totalPsCost = parsePrice(vendor.professionalServices[advancedKey].listPrice)
    } else {
      // Fallback to QuickStart
      const quickstartKey = Object.keys(vendor.professionalServices).find((k) => k.toLowerCase().includes("quickstart"))
      if (quickstartKey) {
        totalPsCost = parsePrice(vendor.professionalServices[quickstartKey].listPrice)
      }
    }
  }

  // Fallback to factor if no detailed PS data
  if (totalPsCost === 0 && vendor.implementation.professionalServicesCostFactor) {
    totalPsCost = annualSoftwareCost * vendor.implementation.professionalServicesCostFactor
  }

  return (vendor.tcoFactors.trainingCostInitial || 0) + totalPsCost
}

function calculateOperationalCost(vendor: NewVendorData, region: string, years: number): number {
  const regionalCost = staffCostsByRegion[region] || staffCostsByRegion["north-america"]
  const avgSalary =
    (regionalCost.itAdminAvgSalary + regionalCost.securityAnalystAvgSalary + regionalCost.networkEngineerAvgSalary) / 3
  return (vendor.tcoFactors.personnelCostFactor || 0.5) * avgSalary * years
}

function calculateHiddenCosts(vendor: NewVendorData, numDevices: number, years: number): number {
  let totalHiddenCost = 0
  if (vendor.hiddenCosts) {
    vendor.hiddenCosts.forEach((category) => {
      Object.values(category.items).forEach((item) => {
        totalHiddenCost += parsePrice(item.listPrice)
      })
    })
  }
  // Fallback to simple factor
  if (totalHiddenCost === 0 && vendor.tcoFactors.hiddenCostFactor) {
    return vendor.tcoFactors.hiddenCostFactor * numDevices * years
  }
  // This is a one-time cost in the model, but should be annualized. Let's assume the detailed costs are over the project lifetime.
  return totalHiddenCost
}

// --- ROI Metrics Calculation (no changes needed here for now) ---
export interface ROIMetrics {
  totalProjectedSavingsOverYears: number
  paybackPeriodMonths: number | string
  annualizedROIPercent: number | string
  incidentReductionSavingsAnnual: number
  complianceAutomationSavingsAnnual: number
  operationalEfficiencyGainsAnnual: number
  totalAnnualizedBenefits: number
}

function calculateROIMetrics(
  vendor: NewVendorData,
  totalTCO: number,
  orgSizeId: OrgSizeId,
  industry: Industry | undefined,
  projectionYears: number,
): ROIMetrics {
  const roiFactors = vendor.roiFactors
  const orgDetails = defaultOrgSizeDetails[orgSizeId]
  const annualTCO = projectionYears > 0 ? totalTCO / projectionYears : 0

  const incidentReductionSavingsAnnual =
    (orgDetails.avgAnnualBreachCostBaseline || 0) * ((roiFactors.incidentReductionPercent || 0) / 100)
  const complianceAutomationSavingsAnnual =
    (orgDetails.manualComplianceCostBaseline || 0) * (roiFactors.complianceAutomationSavingsFactor || 0)
  const operationalEfficiencyGainsAnnual =
    (orgDetails.operationalInefficiencyCostBaseline || 0) * ((roiFactors.operationalEfficiencyGainPercent || 0) / 100)

  const totalAnnualizedBenefits =
    incidentReductionSavingsAnnual + complianceAutomationSavingsAnnual + operationalEfficiencyGainsAnnual
  const netAnnualBenefit = totalAnnualizedBenefits - annualTCO
  const totalProjectedSavingsOverYears = netAnnualBenefit * projectionYears

  let paybackPeriodMonths: number | string = "N/A"
  if (netAnnualBenefit > 0 && totalTCO > 0) {
    paybackPeriodMonths = (totalTCO / netAnnualBenefit) * 12
  } else if (vendor.id === "portnox" && roiFactors.avgPaybackPeriodMonths) {
    paybackPeriodMonths = roiFactors.avgPaybackPeriodMonths
  }

  let annualizedROIPercent: number | string = "N/A"
  if (totalTCO > 0) {
    annualizedROIPercent = (netAnnualBenefit / annualTCO) * 100
  } else if (netAnnualBenefit > 0) {
    annualizedROIPercent = "Infinite"
  }

  return {
    totalProjectedSavingsOverYears,
    paybackPeriodMonths:
      typeof paybackPeriodMonths === "number" ? Number.parseFloat(paybackPeriodMonths.toFixed(1)) : paybackPeriodMonths,
    annualizedROIPercent:
      typeof annualizedROIPercent === "number"
        ? Number.parseFloat(annualizedROIPercent.toFixed(1))
        : annualizedROIPercent,
    incidentReductionSavingsAnnual,
    complianceAutomationSavingsAnnual,
    operationalEfficiencyGainsAnnual,
    totalAnnualizedBenefits,
  }
}

// --- Main TCO Calculation Function ---
export interface TCOResultBreakdown {
  software: number
  hardware: number
  implementation: number
  operational: number
  hidden: number
}

export interface TCOResult {
  vendorId: VendorId
  vendorName: string
  totalTCO: number
  annualTCO: number
  perDevicePerMonthTCO?: number
  breakdown: TCOResultBreakdown
  roiMetrics: ROIMetrics
}

export function calculateFullTCOForVendor(
  vendorId: VendorId,
  orgSizeId: OrgSizeId,
  industryId: IndustryId,
  projectionYears: number,
): TCOResult | null {
  const vendor = getVendorDataById(vendorId)
  const industry = getIndustryById(industryId)
  const orgDetails = defaultOrgSizeDetails[orgSizeId]

  if (!vendor || !orgDetails || projectionYears <= 0) {
    return null
  }

  const numDevices = orgDetails.deviceCount
  const region = "north-america"

  const softwareCost = calculateLicensingCost(vendor, numDevices, projectionYears)
  const annualSoftwareCost = softwareCost / projectionYears
  const hardwareCost = calculateHardwareCost(vendor, numDevices, projectionYears)
  const implementationCost = calculateImplementationCost(vendor, annualSoftwareCost) // One-time cost
  const operationalCost = calculateOperationalCost(vendor, region, projectionYears)
  // Hidden costs are now calculated as a one-time project cost from the detailed data
  const hiddenCost = calculateHiddenCosts(vendor, numDevices, projectionYears)

  const costs: TCOResultBreakdown = {
    software: Number.parseFloat(softwareCost.toFixed(2)),
    hardware: Number.parseFloat(hardwareCost.toFixed(2)),
    implementation: Number.parseFloat(implementationCost.toFixed(2)),
    operational: Number.parseFloat(operationalCost.toFixed(2)),
    hidden: Number.parseFloat(hiddenCost.toFixed(2)),
  }

  const totalTCO = Object.values(costs).reduce((sum, cost) => sum + (cost || 0), 0)
  const annualTCO = totalTCO / projectionYears
  const perDevicePerMonthTCO = numDevices > 0 ? annualTCO / (numDevices * 12) : undefined

  const roiMetrics = calculateROIMetrics(vendor, totalTCO, orgSizeId, industry, projectionYears)

  return {
    vendorId,
    vendorName: vendor.name,
    totalTCO: Number.parseFloat(totalTCO.toFixed(2)),
    annualTCO: Number.parseFloat(annualTCO.toFixed(2)),
    perDevicePerMonthTCO: perDevicePerMonthTCO ? Number.parseFloat(perDevicePerMonthTCO.toFixed(2)) : undefined,
    breakdown: costs,
    roiMetrics,
  }
}

// --- Comparison Function ---
export function compareMultipleVendorsTCO(
  vendorIds: VendorId[],
  orgSizeId: OrgSizeId,
  industryId: IndustryId,
  projectionYears: number,
): TCOResult[] {
  const results: TCOResult[] = []
  if (projectionYears <= 0) return []

  for (const vendorId of vendorIds) {
    const result = calculateFullTCOForVendor(vendorId, orgSizeId, industryId, projectionYears)
    if (result) {
      results.push(result)
    }
  }
  results.sort((a, b) => a.totalTCO - b.totalTCO)
  return results
}

console.log("Ultimate TCO Calculator module updated with detailed data parsing and calculation logic (v3).")
