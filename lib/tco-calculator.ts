import { AllVendorData, type VendorData, type VendorFeature } from "./vendor-data"

const orgSizeDetails: Record<string, { devices: number; users: number; itStaff?: number }> = {
  startup: { devices: 100, users: 50, itStaff: 2 },
  smb: { devices: 500, users: 250, itStaff: 5 },
  medium: { devices: 2500, users: 1500, itStaff: 15 },
  enterprise: { devices: 10000, users: 7500, itStaff: 50 },
  xlarge: { devices: 50000, users: 35000, itStaff: 200 },
  custom: { devices: 2500, users: 1500, itStaff: 15 },
}

const staffCostsByRegion: Record<string, { itAdmin: number; securityAnalyst: number; networkEngineer: number }> = {
  "north-america": { itAdmin: 125000, securityAnalyst: 145000, networkEngineer: 135000 },
  europe: { itAdmin: 95000, securityAnalyst: 115000, networkEngineer: 105000 },
  "asia-pacific": { itAdmin: 65000, securityAnalyst: 85000, networkEngineer: 75000 },
  "latin-america": { itAdmin: 55000, securityAnalyst: 70000, networkEngineer: 60000 },
  "middle-east": { itAdmin: 80000, securityAnalyst: 100000, networkEngineer: 90000 },
}

const industryFactors: Record<string, { breachCostMultiplier?: number; complianceComplexity?: number }> = {
  healthcare: { breachCostMultiplier: 1.5, complianceComplexity: 1.3 },
  finance: { breachCostMultiplier: 1.3, complianceComplexity: 1.4 },
  government: { breachCostMultiplier: 1.1, complianceComplexity: 1.2 },
  technology: { breachCostMultiplier: 1.0, complianceComplexity: 1.0 },
}

function calculateLicensingCost(
  vendor: VendorData,
  numDevices: number,
  numUsers: number,
  years: number,
  portnoxBasePrice: number,
  portnoxAddons: { atp: boolean; compliance: boolean },
): number {
  let totalLicensing = 0
  const p = vendor.pricing

  if (vendor.id === "portnox") {
    let effectivePricePerDevice = portnoxBasePrice
    if (p.volumeDiscounts) {
      const sortedThresholds = Object.keys(p.volumeDiscounts)
        .map(Number)
        .sort((a, b) => b - a)
      for (const threshold of sortedThresholds) {
        if (numDevices >= threshold) {
          effectivePricePerDevice *= 1 - p.volumeDiscounts[threshold] / 100
          break
        }
      }
    }
    if (years >= 5) effectivePricePerDevice *= 0.6
    else if (years >= 3) effectivePricePerDevice *= 0.7
    else if (years >= 1) effectivePricePerDevice *= 0.85

    totalLicensing = effectivePricePerDevice * numDevices * 12 * years
    if (portnoxAddons.atp && p.addOns?.["Advanced Threat Protection"])
      totalLicensing += p.addOns["Advanced Threat Protection"].perDevice * numDevices * 12 * years
    if (portnoxAddons.compliance && p.addOns?.["Compliance Automation"])
      totalLicensing += p.addOns["Compliance Automation"].perDevice * numDevices * 12 * years
  } else if (p.tiers) {
    const tier =
      p.tiers.find((t) => numDevices >= (t.minDevices || 0) && (t.maxDevices === null || numDevices <= t.maxDevices)) ||
      p.tiers[p.tiers.length - 1]
    totalLicensing = (tier.pricePerDevice || 0) * numDevices * 12 * years
  } else if (p.perDevice) {
    totalLicensing = (p.perDevice.monthly || 0) * numDevices * 12 * years
  } else if (p.perUser) {
    totalLicensing = (p.perUser.monthly || 0) * numUsers * 12 * years
  } else if (p.licenses) {
    totalLicensing = (p.licenses.base || 0) + (p.licenses.device || 0) * numDevices
    if (p.licenses.subscription) {
      totalLicensing += p.licenses.subscription * numDevices * years
    }
  }
  return totalLicensing
}

function calculateHardwareCost(vendor: VendorData, numDevices: number, years: number): number {
  let hardwareCost = 0
  const p = vendor.pricing
  if (p.hardware) {
    const firstHardwareKey = Object.keys(p.hardware)[0]
    if (firstHardwareKey) {
      hardwareCost = p.hardware[firstHardwareKey].cost
    }
  }
  if (p.maintenance && vendor.type === "on-premise") {
    const baseForMaintenance = hardwareCost + (p.licenses?.base || 0) + (p.licenses?.device || 0) * numDevices
    hardwareCost += baseForMaintenance * p.maintenance * years
  }
  return hardwareCost
}

function calculateImplementationCost(vendor: VendorData): number {
  const ps = vendor.pricing.professionalServices
  if (ps) {
    return (ps.implementation || ps.standard || 0) + (ps.training || 0)
  }
  return vendor.pricing.additionalCosts?.implementation || 0
}

function calculateOperationalCost(vendor: VendorData, region: string, years: number, orgItStaff: number): number {
  const staffCostRegion = staffCostsByRegion[region] || staffCostsByRegion["north-america"]
  const avgSalary = (staffCostRegion.itAdmin + staffCostRegion.securityAnalyst + staffCostRegion.networkEngineer) / 3
  const fteRequiredForSolution = vendor.implementation.requiredResources?.internal || 0
  let solutionFTE = fteRequiredForSolution
  if (solutionFTE === 0 && vendor.id !== "portnox") {
    solutionFTE = vendor.type === "on-premise" ? 2.0 : vendor.type === "hybrid" ? 1.0 : 0.5
  } else if (vendor.id === "portnox") {
    solutionFTE = 0.1
  }
  return solutionFTE * avgSalary * years
}

function calculateHiddenCosts(vendor: VendorData, numDevices: number, years: number): number {
  return vendor.pricing.hiddenCosts?.total || (vendor.type === "on-premise" ? numDevices * 10 * years : 0)
}

export function calculateVendorTCO(
  vendorId: string,
  orgSizeKey: string,
  customDevices: number,
  customUsers: number,
  industry: string,
  years: number,
  region: string,
  portnoxBasePrice: number,
  portnoxAddons: { atp: boolean; compliance: boolean },
) {
  const vendor = AllVendorData[vendorId]
  if (!vendor) return null

  const orgDetails =
    orgSizeKey === "custom"
      ? { devices: customDevices, users: customUsers, itStaff: Math.max(1, Math.round(customDevices / 100)) }
      : orgSizeDetails[orgSizeKey] || orgSizeDetails.medium

  const numDevices = orgDetails.devices
  const numUsers = orgDetails.users
  const orgItStaff = orgDetails.itStaff || 5

  const costs: Record<string, number> = {
    software: 0,
    hardware: 0,
    implementation: 0,
    training: 0,
    support: 0,
    operations: 0,
    hidden: 0,
  }

  costs.software = calculateLicensingCost(vendor, numDevices, numUsers, years, portnoxBasePrice, portnoxAddons)
  costs.hardware = calculateHardwareCost(vendor, numDevices, years)
  costs.implementation = calculateImplementationCost(vendor)
  costs.operations = calculateOperationalCost(vendor, region, years, orgItStaff)
  costs.hidden = calculateHiddenCosts(vendor, numDevices, years)
  costs.training += vendor.pricing.additionalCosts?.training || 0
  costs.support += vendor.pricing.additionalCosts?.support || 0

  const total = Object.values(costs).reduce((sum, cost) => sum + (cost || 0), 0)
  const perDevicePerMonth = total / (numDevices * years * 12) || 0
  const perUserPerMonth = total / (numUsers * years * 12) || 0

  const avgBreachCostIndustry = (industryFactors[industry]?.breachCostMultiplier || 1) * 4500000
  const potentialAnnualSavingsFromBreachReduction = avgBreachCostIndustry * (vendor.roi.breachRiskReduction || 0)
  const annualLaborSavings = (vendor.roi.laborSavings || 0) * (staffCostsByRegion[region]?.itAdmin || 100000)
  const totalAnnualBenefits =
    potentialAnnualSavingsFromBreachReduction + annualLaborSavings + (vendor.roi.complianceSavings || 0)
  const annualCostOfSolution = total / years
  const netAnnualBenefit = totalAnnualBenefits - annualCostOfSolution
  const roiPercentage = annualCostOfSolution > 0 ? ((netAnnualBenefit * years) / total) * 100 : 0
  const paybackMonths = netAnnualBenefit > 0 ? (total / netAnnualBenefit) * 12 : Number.POSITIVE_INFINITY

  const projections: Record<string, { total: number; perDevicePerMonth: number }> = {}
  for (let y = 1; y <= 5; y++) {
    const yearFactor = y / years
    const projectedTotal = total * yearFactor
    projections[String(y)] = {
      total: projectedTotal,
      perDevicePerMonth: projectedTotal / (numDevices * y * 12) || 0,
    }
  }

  return {
    vendor: vendorId,
    vendorName: vendor.name,
    total,
    perDevicePerMonth,
    perUserPerMonth,
    breakdown: [
      { name: "Software", value: costs.software },
      { name: "Hardware", value: costs.hardware },
      { name: "Implementation", value: costs.implementation },
      { name: "Training", value: costs.training },
      { name: "Support", value: costs.support },
      { name: "Operations", value: costs.operations },
      { name: "Hidden", value: costs.hidden },
    ],
    roi: {
      percentage: roiPercentage,
      paybackMonths: paybackMonths,
      breachReduction: (vendor.roi.breachRiskReduction || 0) * 100,
      annualSavings: totalAnnualBenefits,
    },
    projections,
    scores: {
      compliance: (vendor.features.compliance as VendorFeature)?.automation || Math.random() * 50 + 50,
      security: (vendor.features.security?.zeroTrust as VendorFeature)?.score || Math.random() * 50 + 50,
      operational: (vendor.features.operational as VendorFeature)?.automation || Math.random() * 50 + 50,
    },
  }
}

export function compareVendors(
  vendorIds: string[],
  orgSizeKey: string,
  customDevices: number,
  customUsers: number,
  industry: string,
  years: number,
  region: string,
  portnoxBasePrice: number,
  portnoxAddons: { atp: boolean; compliance: boolean },
) {
  const results = vendorIds
    .map((vendorId) =>
      calculateVendorTCO(
        vendorId,
        orgSizeKey,
        customDevices,
        customUsers,
        industry,
        years,
        region,
        portnoxBasePrice,
        portnoxAddons,
      ),
    )
    .filter((r): r is NonNullable<typeof r> => r !== null)

  results.sort((a, b) => (a.total ?? Number.POSITIVE_INFINITY) - (b.total ?? Number.POSITIVE_INFINITY))
  return results
}
