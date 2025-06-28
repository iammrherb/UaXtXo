import {
  ComprehensiveVendorDatabase,
  type ComprehensiveVendorData,
  orgSizeConfigurations,
  regionalCostFactors,
  industryFactors,
  industrySecurityMetricsData,
} from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  orgSize: string
  devices: number
  users: number
  industry: string
  years: number
  region: string
  portnoxBasePrice: number
  portnoxAddons: {
    atp: boolean
    compliance: boolean
    iot: boolean
    analytics: boolean
  }
}

export interface TCOResult {
  vendor: string
  vendorName: string
  total: number
  perDevicePerMonth: number
  perUserPerMonth: number
  breakdown: Array<{ name: string; value: number }>
  roi: {
    percentage: number
    paybackMonths: number
    breachReduction: number
    annualSavings: number
    yearlyBenefit?: number
    laborSavingsFTE?: number
    downtimeReductionPercent?: number
    operationalEfficiencyPercent?: number
    timeToValueDays?: number
  }
  projections: Record<string, { total: number; perDevicePerMonth: number }>
  scores: {
    compliance: number
    security: number
    operational: number
  }
  riskMetrics?: any
  complianceSummary?: any
}

function calculateLicensingCost(vendor: ComprehensiveVendorData, config: CalculationConfiguration): number {
  let totalLicensing = 0
  const p = vendor.pricing

  if (vendor.id === "portnox") {
    let effectivePricePerDevice = config.portnoxBasePrice

    // Apply volume discounts
    if (p.volumeDiscounts) {
      const sortedThresholds = Object.keys(p.volumeDiscounts)
        .map(Number)
        .sort((a, b) => b - a)
      for (const threshold of sortedThresholds) {
        if (config.devices >= threshold) {
          effectivePricePerDevice *= 1 - p.volumeDiscounts[threshold] / 100
          break
        }
      }
    }

    // Apply multi-year discounts
    if (config.years >= 5 && p.perDevice?.fiveYear) effectivePricePerDevice = p.perDevice.fiveYear
    else if (config.years >= 3 && p.perDevice?.triennial) effectivePricePerDevice = p.perDevice.triennial
    else if (config.years >= 1 && p.perDevice?.annual) effectivePricePerDevice = p.perDevice.annual

    totalLicensing = effectivePricePerDevice * config.devices * 12 * config.years

    // Add-on costs
    if (config.portnoxAddons.atp && p.addOns?.["Advanced Threat Protection"]?.perDevice)
      totalLicensing += p.addOns["Advanced Threat Protection"].perDevice * config.devices * 12 * config.years
    if (config.portnoxAddons.compliance && p.addOns?.["Compliance Automation"]?.perDevice)
      totalLicensing += p.addOns["Compliance Automation"].perDevice * config.devices * 12 * config.years
    if (config.portnoxAddons.iot && p.addOns?.["IoT/OT Security"]?.perDevice)
      totalLicensing += p.addOns["IoT/OT Security"].perDevice * config.devices * 12 * config.years
    if (config.portnoxAddons.analytics && p.addOns?.["Risk Analytics"]?.perDevice)
      totalLicensing += p.addOns["Risk Analytics"].perDevice * config.devices * 12 * config.years
  } else if (p.tiers) {
    const tier =
      p.tiers.find(
        (t) => config.devices >= (t.minDevices || 0) && (t.maxDevices === null || config.devices <= t.maxDevices),
      ) || p.tiers[p.tiers.length - 1]
    const pricePerDeviceMonthly = tier?.pricePerDevice || 0
    totalLicensing = pricePerDeviceMonthly * config.devices * 12 * config.years
  } else if (p.perDevice?.monthly) {
    totalLicensing = p.perDevice.monthly * config.devices * 12 * config.years
  } else if (p.perUser?.monthly) {
    totalLicensing = p.perUser.monthly * config.users * 12 * config.years
  } else if (p.licenses) {
    totalLicensing = (p.licenses.base || 0) + (p.licenses.device || 0) * config.devices
    if (p.licenses.subscription) {
      totalLicensing += p.licenses.subscription * config.devices * config.years
    }
  }

  return totalLicensing
}

function calculateHardwareCost(vendor: ComprehensiveVendorData, config: CalculationConfiguration): number {
  let hardwareCost = 0
  const p = vendor.pricing

  if (p.hardware) {
    Object.values(p.hardware).forEach((hw) => {
      hardwareCost += hw.cost
      if (hw.lifespan && config.years > hw.lifespan) {
        hardwareCost += hw.cost * Math.floor((config.years - 1) / hw.lifespan)
      }
    })
  }

  if (p.infrastructure) {
    hardwareCost +=
      (p.infrastructure.servers || 0) +
      (p.infrastructure.storage || 0) +
      (p.infrastructure.networking || 0) +
      (p.infrastructure.virtualization || 0)
  }

  if (p.maintenance && (vendor.type === "on-premise" || vendor.type === "hybrid")) {
    const baseForMaintenance = hardwareCost + (p.licenses?.base || 0) + (p.licenses?.device || 0) * config.devices
    hardwareCost += baseForMaintenance * p.maintenance * config.years
  }

  return hardwareCost
}

function calculateImplementationCost(vendor: ComprehensiveVendorData): number {
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

  totalImplementation += vendor.pricing.additionalCosts?.implementation || 0
  return totalImplementation
}

function calculateOperationalCost(vendor: ComprehensiveVendorData, config: CalculationConfiguration): number {
  const staffCostRegion = regionalCostFactors[config.region] || regionalCostFactors["north-america"]
  const avgSalary = (staffCostRegion.itAdmin + staffCostRegion.securityAnalyst + staffCostRegion.networkEngineer) / 3

  let solutionFTE =
    vendor.implementation.requiredResources?.ongoing || vendor.implementation.requiredResources?.internal || 0

  if (solutionFTE === 0 && vendor.id !== "portnox") {
    solutionFTE = vendor.type === "on-premise" ? 2.0 : vendor.type === "hybrid" ? 1.0 : 0.5
  } else if (vendor.id === "portnox" && solutionFTE === 0) {
    solutionFTE = 0.1
  }

  return solutionFTE * avgSalary * config.years
}

function calculateHiddenCosts(vendor: ComprehensiveVendorData, config: CalculationConfiguration): number {
  const hc = vendor.pricing.hiddenCosts
  if (hc?.total) return hc.total * config.years

  let calculatedHidden =
    (hc?.downtime || 0) +
    (hc?.complexity || 0) +
    (hc?.integration || 0) +
    (hc?.staffTraining || 0) +
    (hc?.networkRefresh || 0)

  if (calculatedHidden === 0 && vendor.type === "on-premise") {
    calculatedHidden = config.devices * 10 * config.years
  }

  return calculatedHidden
}

function calculateSupportCost(vendor: ComprehensiveVendorData, config: CalculationConfiguration): number {
  let totalSupport = 0
  const supportPricing = vendor.pricing.support

  if (supportPricing) {
    if (supportPricing.enterprise?.cost) totalSupport = supportPricing.enterprise.cost * config.years
    else if (supportPricing.premium?.cost) totalSupport = supportPricing.premium.cost * config.years
    else if (supportPricing.basic?.cost && !supportPricing.basic.included)
      totalSupport = supportPricing.basic.cost * config.years
  }

  totalSupport += (vendor.pricing.additionalCosts?.support || 0) * config.years
  return totalSupport
}

function calculateROI(vendor: ComprehensiveVendorData, config: CalculationConfiguration, totalCost: number) {
  const industryData = industryFactors[config.industry] || {}
  const securityMetrics = industrySecurityMetricsData[config.industry] || industrySecurityMetricsData.technology
  const staffCostRegion = regionalCostFactors[config.region] || regionalCostFactors["north-america"]

  const avgBreachCostIndustry = securityMetrics.avgBreachCost * (industryData.breachCostMultiplier || 1)
  const potentialAnnualSavingsFromBreachReduction = avgBreachCostIndustry * (vendor.roi.breachRiskReduction || 0)
  const annualLaborSavings = (vendor.roi.laborSavings || 0) * staffCostRegion.itAdmin

  const totalAnnualBenefits =
    potentialAnnualSavingsFromBreachReduction +
    annualLaborSavings +
    (vendor.roi.complianceSavings || 0) +
    (vendor.roi.downtimeReduction || 0) * 100000 +
    (vendor.roi.operationalEfficiency || 0) * 50000

  const annualCostOfSolution = totalCost / config.years
  const netAnnualBenefit = totalAnnualBenefits - annualCostOfSolution
  const roiPercentage =
    annualCostOfSolution > 0
      ? ((netAnnualBenefit * config.years) / totalCost) * 100
      : netAnnualBenefit > 0
        ? Number.POSITIVE_INFINITY
        : 0
  const paybackMonths = netAnnualBenefit > 0 ? (totalCost / netAnnualBenefit) * 12 : Number.POSITIVE_INFINITY

  return {
    percentage: roiPercentage,
    paybackMonths: Math.min(paybackMonths, vendor.roi.paybackPeriod || paybackMonths),
    breachReduction: (vendor.roi.breachRiskReduction || 0) * 100,
    annualSavings: totalAnnualBenefits,
    yearlyBenefit: vendor.roi.yearlyBenefit,
    laborSavingsFTE: vendor.roi.laborSavings,
    downtimeReductionPercent: (vendor.roi.downtimeReduction || 0) * 100,
    operationalEfficiencyPercent: (vendor.roi.operationalEfficiency || 0) * 100,
    timeToValueDays: vendor.roi.timeToValue,
  }
}

function calculateScores(vendor: ComprehensiveVendorData, config: CalculationConfiguration) {
  const getFeatureScore = (feature: any): number => {
    if (typeof feature === "object" && feature?.score !== undefined) return feature.score
    if (typeof feature === "boolean") return feature ? 80 : 20
    if (typeof feature === "number") return Math.min(feature, 100)
    return 50 // Default score
  }

  // Calculate compliance score
  let complianceScore = 0
  if (vendor.features.compliance) {
    complianceScore =
      vendor.features.compliance.automationLevel ||
      vendor.features.compliance.automation ||
      getFeatureScore(vendor.features.compliance.reporting) * 0.3 +
        getFeatureScore(vendor.features.compliance.auditTrail) * 0.3 +
        getFeatureScore(vendor.features.compliance.continuousCompliance) * 0.4
  }

  // Calculate security score
  let securityScore = 0
  if (vendor.features.security) {
    const securityFeatures = Object.values(vendor.features.security)
    securityScore =
      securityFeatures.reduce((sum, feature) => sum + getFeatureScore(feature), 0) / securityFeatures.length
  }

  // Calculate operational score
  let operationalScore = 0
  if (vendor.features.operational) {
    const operationalFeatures = Object.values(vendor.features.operational)
    operationalScore =
      operationalFeatures.reduce((sum, feature) => sum + getFeatureScore(feature), 0) / operationalFeatures.length
  }

  return {
    compliance: Math.round(complianceScore),
    security: Math.round(securityScore),
    operational: Math.round(operationalScore),
  }
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): TCOResult | null {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) return null

  const costs = {
    software: calculateLicensingCost(vendor, config),
    hardware: calculateHardwareCost(vendor, config),
    implementation: calculateImplementationCost(vendor),
    support: calculateSupportCost(vendor, config),
    operations: calculateOperationalCost(vendor, config),
    hidden: calculateHiddenCosts(vendor, config),
  }

  const total = Object.values(costs).reduce((sum, cost) => sum + (cost || 0), 0)
  const perDevicePerMonth =
    total > 0 && config.devices > 0 && config.years > 0 ? total / (config.devices * config.years * 12) : 0
  const perUserPerMonth =
    total > 0 && config.users > 0 && config.years > 0 ? total / (config.users * config.years * 12) : 0

  const roi = calculateROI(vendor, config, total)
  const scores = calculateScores(vendor, config)

  // Generate projections for 1-5 years
  const projections: Record<string, { total: number; perDevicePerMonth: number }> = {}
  for (let y = 1; y <= 5; y++) {
    const yearConfig = { ...config, years: y }
    const yearCosts = {
      software: calculateLicensingCost(vendor, yearConfig),
      hardware: calculateHardwareCost(vendor, yearConfig),
      implementation: y === 1 ? calculateImplementationCost(vendor) : 0,
      support: calculateSupportCost(vendor, yearConfig),
      operations: calculateOperationalCost(vendor, yearConfig),
      hidden: calculateHiddenCosts(vendor, yearConfig),
    }
    const yearTotal = Object.values(yearCosts).reduce((sum, cost) => sum + (cost || 0), 0)
    projections[String(y)] = {
      total: yearTotal,
      perDevicePerMonth: yearTotal > 0 && config.devices > 0 && y > 0 ? yearTotal / (config.devices * y * 12) : 0,
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
      { name: "Support", value: costs.support },
      { name: "Operations", value: costs.operations },
      { name: "Hidden", value: costs.hidden },
    ],
    roi,
    projections,
    scores,
    riskMetrics: vendor.riskMetrics,
    complianceSummary: vendor.complianceSummary,
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): TCOResult[] {
  const results = vendorIds
    .map((vendorId) => calculateVendorTCO(vendorId, config))
    .filter((r): r is NonNullable<typeof r> => r !== null)

  results.sort((a, b) => (a.total ?? Number.POSITIVE_INFINITY) - (b.total ?? Number.POSITIVE_INFINITY))
  return results
}

// Export utility functions
export { orgSizeConfigurations, regionalCostFactors, industryFactors }
