import { AllVendorData, type VendorData, type VendorFeature } from "./vendor-data"

const orgSizeDetails: Record<string, { devices: number; users: number; itStaff?: number }> = {
  startup: { devices: 100, users: 50, itStaff: 2 },
  smb: { devices: 500, users: 250, itStaff: 5 },
  medium: { devices: 2500, users: 1500, itStaff: 15 },
  enterprise: { devices: 10000, users: 7500, itStaff: 50 },
  xlarge: { devices: 50000, users: 35000, itStaff: 200 },
  custom: { devices: 2500, users: 1500, itStaff: 15 }, // Default for custom
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
  // Add other industries as needed
}

// Updated Portnox Addons type
interface PortnoxAddons {
  atp: boolean
  compliance: boolean
  iot: boolean
  analytics: boolean
}

function calculateLicensingCost(
  vendor: VendorData,
  numDevices: number,
  numUsers: number,
  years: number,
  portnoxBasePrice: number,
  portnoxAddons: PortnoxAddons,
): number {
  let totalLicensing = 0
  const p = vendor.pricing

  if (vendor.id === "portnox") {
    let effectivePricePerDevice = portnoxBasePrice
    // Apply volume discounts
    if (p.volumeDiscounts) {
      const sortedThresholds = Object.keys(p.volumeDiscounts)
        .map(Number)
        .sort((a, b) => b - a) // Sort descending to find the highest applicable tier
      for (const threshold of sortedThresholds) {
        if (numDevices >= threshold) {
          effectivePricePerDevice *= 1 - p.volumeDiscounts[threshold] / 100
          break
        }
      }
    }
    // Apply multi-year discounts (example logic, adjust based on actuals)
    if (years >= 5 && p.perDevice?.fiveYear) effectivePricePerDevice = p.perDevice.fiveYear
    else if (years >= 3 && p.perDevice?.triennial) effectivePricePerDevice = p.perDevice.triennial
    else if (years >= 1 && p.perDevice?.annual) effectivePricePerDevice = p.perDevice.annual
    // Fallback to monthly if specific year pricing not found, or use base price adjusted by volume

    totalLicensing = effectivePricePerDevice * numDevices * 12 * years

    // Add-on costs
    if (portnoxAddons.atp && p.addOns?.["Advanced Threat Protection"]?.perDevice)
      totalLicensing += p.addOns["Advanced Threat Protection"].perDevice * numDevices * 12 * years
    if (portnoxAddons.compliance && p.addOns?.["Compliance Automation"]?.perDevice)
      totalLicensing += p.addOns["Compliance Automation"].perDevice * numDevices * 12 * years
    if (portnoxAddons.iot && p.addOns?.["IoT/OT Security"]?.perDevice)
      // Updated addon key
      totalLicensing += p.addOns["IoT/OT Security"].perDevice * numDevices * 12 * years
    if (portnoxAddons.analytics && p.addOns?.["Risk Analytics"]?.perDevice)
      // Updated addon key
      totalLicensing += p.addOns["Risk Analytics"].perDevice * numDevices * 12 * years
  } else if (p.tiers) {
    const tier =
      p.tiers.find((t) => numDevices >= (t.minDevices || 0) && (t.maxDevices === null || numDevices <= t.maxDevices)) ||
      p.tiers[p.tiers.length - 1]
    const pricePerDeviceMonthly = tier?.pricePerDevice || 0
    totalLicensing = pricePerDeviceMonthly * numDevices * 12 * years
  } else if (p.perDevice?.monthly) {
    totalLicensing = p.perDevice.monthly * numDevices * 12 * years
  } else if (p.perUser?.monthly) {
    totalLicensing = p.perUser.monthly * numUsers * 12 * years
  } else if (p.licenses) {
    totalLicensing = (p.licenses.base || 0) + (p.licenses.device || 0) * numDevices
    if (p.licenses.subscription) {
      totalLicensing += p.licenses.subscription * numDevices * years // Assuming subscription is per device per year
    }
  }
  return totalLicensing
}

function calculateHardwareCost(vendor: VendorData, numDevices: number, years: number): number {
  let hardwareCost = 0
  const p = vendor.pricing
  if (p.hardware) {
    // Sum costs of all listed hardware items, assuming one of each needed unless specified
    // This is a simplification; real calculation might need # of appliances based on numDevices
    Object.values(p.hardware).forEach((hw) => {
      hardwareCost += hw.cost
      // If lifespan is provided, consider replacement over `years`
      if (hw.lifespan && years > hw.lifespan) {
        hardwareCost += hw.cost * Math.floor((years - 1) / hw.lifespan)
      }
    })
  }
  // Add infrastructure costs if defined (for on-prem)
  if (p.infrastructure) {
    hardwareCost +=
      (p.infrastructure.servers || 0) +
      (p.infrastructure.storage || 0) +
      (p.infrastructure.networking || 0) +
      (p.infrastructure.virtualization || 0)
  }

  if (p.maintenance && (vendor.type === "on-premise" || vendor.type === "hybrid")) {
    // Maintenance often applies to initial hardware + license cost
    const baseForMaintenance = hardwareCost + (p.licenses?.base || 0) + (p.licenses?.device || 0) * numDevices
    hardwareCost += baseForMaintenance * p.maintenance * years
  }
  return hardwareCost
}

function calculateImplementationCost(vendor: VendorData): number {
  const ps = vendor.pricing.professionalServices
  let totalImplementation = 0
  if (ps) {
    totalImplementation +=
      (ps.implementation || ps.standard || 0) +
      (ps.training || 0) +
      (ps.customization || 0) +
      (ps.migration || 0) +
      (ps.designServices || 0)
  }
  // Add from additionalCosts if still used
  totalImplementation += vendor.pricing.additionalCosts?.implementation || 0
  return totalImplementation
}

function calculateOperationalCost(vendor: VendorData, region: string, years: number, orgItStaff: number): number {
  const staffCostRegion = staffCostsByRegion[region] || staffCostsByRegion["north-america"]
  const avgSalary = (staffCostRegion.itAdmin + staffCostRegion.securityAnalyst + staffCostRegion.networkEngineer) / 3

  // Use ongoing FTE if available, otherwise fallback to internal for initial setup, then default
  let solutionFTE =
    vendor.implementation.requiredResources?.ongoing || vendor.implementation.requiredResources?.internal || 0

  if (solutionFTE === 0 && vendor.id !== "portnox") {
    // If no specific FTE, use defaults
    solutionFTE = vendor.type === "on-premise" ? 2.0 : vendor.type === "hybrid" ? 1.0 : 0.5
  } else if (vendor.id === "portnox" && solutionFTE === 0) {
    // Portnox specific default if not set
    solutionFTE = 0.1
  }

  return solutionFTE * avgSalary * years
}

function calculateHiddenCosts(vendor: VendorData, numDevices: number, years: number): number {
  const hc = vendor.pricing.hiddenCosts
  if (hc?.total) return hc.total * years // Assuming total is annual

  let calculatedHidden =
    (hc?.downtime || 0) +
    (hc?.complexity || 0) +
    (hc?.integration || 0) +
    (hc?.staffTraining || 0) +
    (hc?.networkRefresh || 0)
  if (calculatedHidden === 0 && vendor.type === "on-premise") {
    // Fallback for on-prem
    calculatedHidden = numDevices * 10 * years // Simple estimate
  }
  return calculatedHidden
}

function calculateSupportCost(vendor: VendorData, years: number): number {
  let totalSupport = 0
  const supportPricing = vendor.pricing.support
  if (supportPricing) {
    // Prioritize enterprise, then premium, then basic if costs are defined
    if (supportPricing.enterprise?.cost) totalSupport = supportPricing.enterprise.cost * years
    else if (supportPricing.premium?.cost) totalSupport = supportPricing.premium.cost * years
    else if (supportPricing.basic?.cost && !supportPricing.basic.included)
      totalSupport = supportPricing.basic.cost * years
  }
  // Add from additionalCosts if still used
  totalSupport += (vendor.pricing.additionalCosts?.support || 0) * years // Assuming annual
  return totalSupport
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
  portnoxAddons: PortnoxAddons, // Updated type
) {
  const vendor = AllVendorData[vendorId]
  if (!vendor) return null

  const orgDetails =
    orgSizeKey === "custom"
      ? { devices: customDevices, users: customUsers, itStaff: Math.max(1, Math.round(customDevices / 100)) }
      : orgSizeDetails[orgSizeKey] || orgSizeDetails.medium

  const numDevices = orgDetails.devices
  const numUsers = orgDetails.users
  const orgItStaff = orgDetails.itStaff || 5 // Default IT staff if not in orgSizeDetails

  const costs: Record<string, number> = {
    software: 0,
    hardware: 0,
    implementation: 0, // This will include initial training from professionalServices
    support: 0, // Ongoing support costs
    operations: 0,
    hidden: 0,
  }

  costs.software = calculateLicensingCost(vendor, numDevices, numUsers, years, portnoxBasePrice, portnoxAddons)
  costs.hardware = calculateHardwareCost(vendor, numDevices, years)
  costs.implementation = calculateImplementationCost(vendor) // Includes initial setup, migration, customization, and initial training
  costs.operations = calculateOperationalCost(vendor, region, years, orgItStaff) // Ongoing staff cost
  costs.hidden = calculateHiddenCosts(vendor, numDevices, years)
  costs.support = calculateSupportCost(vendor, years) // Ongoing support subscriptions

  const total = Object.values(costs).reduce((sum, cost) => sum + (cost || 0), 0)
  const perDevicePerMonth = total > 0 && numDevices > 0 && years > 0 ? total / (numDevices * years * 12) : 0
  const perUserPerMonth = total > 0 && numUsers > 0 && years > 0 ? total / (numUsers * years * 12) : 0

  const industryData = industryFactors[industry] || {}
  const avgBreachCostIndustry = (industryData.breachCostMultiplier || 1) * 4500000 // Default avg breach cost

  const potentialAnnualSavingsFromBreachReduction = avgBreachCostIndustry * (vendor.roi.breachRiskReduction || 0)
  const annualLaborSavings = (vendor.roi.laborSavings || 0) * (staffCostsByRegion[region]?.itAdmin || 100000)
  const totalAnnualBenefits =
    potentialAnnualSavingsFromBreachReduction +
    annualLaborSavings +
    (vendor.roi.complianceSavings || 0) +
    (vendor.roi.downtimeReduction || 0) * 100000 +
    (vendor.roi.operationalEfficiency || 0) * 50000 // Example values for new ROI factors

  const annualCostOfSolution = total / years
  const netAnnualBenefit = totalAnnualBenefits - annualCostOfSolution
  const roiPercentage =
    annualCostOfSolution > 0
      ? ((netAnnualBenefit * years) / total) * 100
      : netAnnualBenefit > 0
        ? Number.POSITIVE_INFINITY
        : 0
  const paybackMonths = netAnnualBenefit > 0 ? (total / netAnnualBenefit) * 12 : Number.POSITIVE_INFINITY

  const projections: Record<string, { total: number; perDevicePerMonth: number }> = {}
  for (let y = 1; y <= 5; y++) {
    // Standard 5 year projection
    // Recalculate costs for year `y` for more accuracy if pricing changes over time
    // Simplified: scale total linearly for this example
    const yearFactor = y / years
    const projectedTotalForY =
      calculateLicensingCost(vendor, numDevices, numUsers, y, portnoxBasePrice, portnoxAddons) +
      calculateHardwareCost(vendor, numDevices, y) + // Hardware cost might not be linear
      (y === 1 ? calculateImplementationCost(vendor) : 0) + // Implementation mostly year 1
      calculateOperationalCost(vendor, region, y, orgItStaff) +
      calculateHiddenCosts(vendor, numDevices, y) + // Hidden costs might accrue annually
      calculateSupportCost(vendor, y)

    projections[String(y)] = {
      total: projectedTotalForY,
      perDevicePerMonth:
        projectedTotalForY > 0 && numDevices > 0 && y > 0 ? projectedTotalForY / (numDevices * y * 12) : 0,
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
      // Training is now part of Implementation
      { name: "Support", value: costs.support },
      { name: "Operations", value: costs.operations },
      { name: "Hidden", value: costs.hidden },
    ],
    roi: {
      percentage: roiPercentage,
      paybackMonths: paybackMonths,
      breachReduction: (vendor.roi.breachRiskReduction || 0) * 100,
      annualSavings: totalAnnualBenefits,
      // Add other ROI fields from VendorData if needed for display
      yearlyBenefit: vendor.roi.yearlyBenefit,
      laborSavingsFTE: vendor.roi.laborSavings, // Assuming laborSavings is FTE
      downtimeReductionPercent: (vendor.roi.downtimeReduction || 0) * 100,
      operationalEfficiencyPercent: (vendor.roi.operationalEfficiency || 0) * 100,
      timeToValueDays: vendor.roi.timeToValue,
    },
    projections,
    scores: {
      // Example scores, should be derived from detailed features
      compliance:
        (vendor.features.compliance as any)?.automationLevel ||
        (vendor.features.compliance as any)?.automation ||
        Math.random() * 50 + 50,
      security:
        (vendor.features.security?.zeroTrust as VendorFeature)?.score ||
        vendor.riskMetrics?.securityPostureScore ||
        Math.random() * 50 + 50,
      operational:
        (vendor.features.operational?.automation as VendorFeature)?.score ||
        (vendor.features.operational as any)?.automation ||
        Math.random() * 50 + 50,
    },
    riskMetrics: vendor.riskMetrics, // Pass through risk metrics
    complianceSummary: vendor.complianceSummary, // Pass through compliance summary
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
  portnoxAddons: PortnoxAddons, // Updated type
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

const REGIONAL_MULTIPLIERS = {
  "north-america": 1.0,
  europe: 1.15,
  "asia-pacific": 0.85,
  "latin-america": 0.75,
  "middle-east": 1.1,
}

const INDUSTRY_MULTIPLIERS = {
  technology: 1.0,
  healthcare: 1.3,
  financial: 1.4,
  government: 1.5,
  education: 0.9,
  manufacturing: 1.1,
  retail: 1.0,
  other: 1.0,
}

const ORG_SIZE_MULTIPLIERS = {
  small: 0.8,
  medium: 1.0,
  large: 1.2,
  enterprise: 1.5,
}

export interface TCOCalculation {
  vendor: string
  total: number
  breakdown: {
    software: number
    hardware: number
    implementation: number
    support: number
    operations: number
  }
  roi: {
    paybackMonths: number
    percentage: number
  }
}

export interface CalculationInputs {
  devices: number
  users: number
  years: number
  orgSize: "small" | "medium" | "large" | "enterprise"
  industry:
    | "technology"
    | "healthcare"
    | "financial"
    | "government"
    | "education"
    | "retail"
    | "manufacturing"
    | "other"
  region: "north-america" | "europe" | "asia-pacific" | "latin-america" | "middle-east"
}

export function calculateTCO(vendor: VendorData, inputs: CalculationInputs): TCOCalculation {
  const { devices, users, years, orgSize, industry, region } = inputs

  const regionalMultiplier = REGIONAL_MULTIPLIERS[region] || 1.0
  const industryMultiplier = INDUSTRY_MULTIPLIERS[industry] || 1.0
  const orgSizeMultiplier = ORG_SIZE_MULTIPLIERS[orgSize] || 1.0

  // Software costs
  const unitCount = vendor.pricing.model === "per-user" ? users : devices
  const baseSoftwareCost = vendor.pricing.basePrice * unitCount * years
  const softwareCost = baseSoftwareCost * regionalMultiplier

  // Hardware costs (if required)
  const hardwareCost = vendor.implementation.hardwareRequired
    ? devices * 500 * regionalMultiplier + (years > 3 ? devices * 250 : 0)
    : 0

  // Implementation costs
  const baseImplementationCost = vendor.implementation.professionalServices.required
    ? vendor.implementation.professionalServices.cost
    : devices * 10
  const implementationCost = baseImplementationCost * regionalMultiplier * industryMultiplier * orgSizeMultiplier

  // Support costs (20% of software annually)
  const supportCost = softwareCost * 0.2

  // Operations costs (FTE requirements)
  const fteRequired = Math.max(0.5, devices / 5000)
  const operationsCost = fteRequired * 120000 * years * regionalMultiplier

  const total = softwareCost + hardwareCost + implementationCost + supportCost + operationsCost

  // ROI calculation (simplified)
  const annualSavings = devices * 50 // $50 per device per year in operational savings
  const totalSavings = annualSavings * years
  const paybackMonths = Math.ceil(total / (annualSavings / 12))
  const roiPercentage = ((totalSavings - total) / total) * 100

  return {
    vendor: vendor.id,
    total: Math.round(total),
    breakdown: {
      software: Math.round(softwareCost),
      hardware: Math.round(hardwareCost),
      implementation: Math.round(implementationCost),
      support: Math.round(supportCost),
      operations: Math.round(operationsCost),
    },
    roi: {
      paybackMonths: Math.max(1, paybackMonths),
      percentage: Math.round(roiPercentage),
    },
  }
}
