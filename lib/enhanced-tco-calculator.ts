import { ComprehensiveVendorDatabase } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  devices: number
  users: number
  years: number
  licenseTier: "Essentials" | "Professional" | "Enterprise"
  integrations: {
    mdm: boolean
    siem: boolean
    edr: boolean
  }
  professionalServices: "basic" | "advanced" | "migration"
  includeTraining: boolean
}

export interface CalculationResult {
  vendor: string
  vendorName: string
  total: number
  breakdown: { name: string; value: number }[]
  roi: {
    percentage: number
    paybackMonths: number
    annualSavings: number
  }
  risk: {
    breachReduction: number
    annualizedRiskCost: number
  }
  ops: {
    fteSaved: number
    annualOpsSaving: number
  }
}

export interface EnhancedTCOResult {
  totalCost: number
  yearlyBreakdown: Array<{
    year: number
    cost: number
    savings: number
    netCost: number
  }>
  costCategories: {
    licensing: number
    hardware: number
    implementation: number
    maintenance: number
    training: number
    operations: number
  }
  roi: {
    percentage: number
    paybackPeriod: number
    npv: number
    irr: number
  }
  riskMetrics: {
    breachProbabilityReduction: number
    complianceScore: number
    securityPostureImprovement: number
  }
}

function parseCost(cost: number | string): number {
  if (typeof cost === "number") return cost
  if (typeof cost === "string") {
    if (cost.includes("-")) {
      const parts = cost.split("-").map((s) => Number.parseInt(s.replace(/,/g, ""), 10))
      return (parts[0] + parts[1]) / 2
    }
    return Number.parseInt(cost.replace(/,/g, ""), 10) || 0
  }
  return 0
}

export function calculateEnhancedTCO(vendor: any, settings: any): EnhancedTCOResult {
  const timeHorizon = settings.timeHorizon || 5
  const organizationSize = settings.organizationSize || 1000
  const discountRate = settings.discountRate || 0.08

  // Base licensing costs
  const annualLicenseCost = organizationSize * 50 // Base cost per user/device
  const totalLicensing = annualLicenseCost * timeHorizon

  // Hardware costs (if applicable)
  const hardwareCost = vendor.deploymentModel === "on-premise" ? organizationSize * 10 : 0

  // Implementation costs
  const implementationCost = organizationSize * 25

  // Annual maintenance (20% of licensing)
  const annualMaintenance = annualLicenseCost * 0.2
  const totalMaintenance = annualMaintenance * timeHorizon

  // Training costs
  const trainingCost = organizationSize * 5

  // Operations costs (FTE)
  const annualOperationsCost = 150000 * (vendor.complexity || 1)
  const totalOperations = annualOperationsCost * timeHorizon

  const totalCost =
    totalLicensing + hardwareCost + implementationCost + totalMaintenance + trainingCost + totalOperations

  // Calculate yearly breakdown
  const yearlyBreakdown = Array.from({ length: timeHorizon }, (_, index) => {
    const year = index + 1
    const yearlyCost =
      annualLicenseCost +
      annualMaintenance +
      (year === 1 ? implementationCost + hardwareCost + trainingCost : 0) +
      annualOperationsCost
    const savings = organizationSize * 20 * year // Increasing savings over time
    return {
      year,
      cost: yearlyCost,
      savings,
      netCost: yearlyCost - savings,
    }
  })

  // ROI calculations
  const totalSavings = yearlyBreakdown.reduce((sum, year) => sum + year.savings, 0)
  const roiPercentage = ((totalSavings - totalCost) / totalCost) * 100
  const paybackPeriod = totalCost / (totalSavings / timeHorizon)

  return {
    totalCost,
    yearlyBreakdown,
    costCategories: {
      licensing: totalLicensing,
      hardware: hardwareCost,
      implementation: implementationCost,
      maintenance: totalMaintenance,
      training: trainingCost,
      operations: totalOperations,
    },
    roi: {
      percentage: roiPercentage,
      paybackPeriod,
      npv: totalSavings - totalCost,
      irr: 0.15, // Simplified IRR calculation
    },
    riskMetrics: {
      breachProbabilityReduction: 0.6,
      complianceScore: 85,
      securityPostureImprovement: 40,
    },
  }
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) return null

  let total = 0
  const breakdown: { name: string; value: number }[] = []

  // Licensing Costs
  const tier = vendor.licensing.base.find((t) => t.name === config.licenseTier) || vendor.licensing.base[0]
  const licenseUnitCount = tier.unit === "user" ? config.users : config.devices
  const licenseCost = parseCost(tier.listPrice) * licenseUnitCount * config.years
  total += licenseCost
  breakdown.push({ name: "Licensing", value: licenseCost })

  // Hardware Costs
  let hardwareCost = 0
  if (vendor.hardware.physical.length > 0) {
    const appliance =
      vendor.hardware.physical.find((h) => Number.parseInt(h.capacity.replace(/,/g, "")) >= config.devices) ||
      vendor.hardware.physical[vendor.hardware.physical.length - 1]
    hardwareCost = parseCost(appliance.listPrice)
  } else if (vendor.hardware.virtual.length > 0) {
    const appliance =
      vendor.hardware.virtual.find((h) => Number.parseInt(h.capacity.replace(/,/g, "")) >= config.devices) ||
      vendor.hardware.virtual[vendor.hardware.virtual.length - 1]
    hardwareCost = parseCost(appliance.listPrice)
  }
  total += hardwareCost
  if (hardwareCost > 0) breakdown.push({ name: "Hardware", value: hardwareCost })

  // Professional Services
  let psCost = 0
  const psTier = vendor.professionalServices.vendor.find((p) =>
    p.name.toLowerCase().includes(config.professionalServices),
  )
  if (psTier) {
    psCost = parseCost(psTier.cost)
  }
  total += psCost
  if (psCost > 0) breakdown.push({ name: "Professional Services", value: psCost })

  // Operational Costs (FTE)
  const annualFteCost = vendor.tcoFactors.fteRequirement * 150000 // Avg FTE cost
  const totalFteCost = annualFteCost * config.years
  total += totalFteCost
  breakdown.push({ name: "Operational Staff", value: totalFteCost })

  // ROI Calculation
  const fteSaved = 2.0 - vendor.tcoFactors.fteRequirement > 0 ? 2.0 - vendor.tcoFactors.fteRequirement : 0
  const annualOpsSaving = fteSaved * 150000
  const breachReduction = vendor.marketPosition === "leader" || vendor.marketPosition === "visionary" ? 0.6 : 0.4
  const annualRiskSaving = 500000 * breachReduction // Assume baseline risk cost
  const annualSavings = annualOpsSaving + annualRiskSaving
  const totalSavings = annualSavings * config.years
  const roiPercentage = total > 0 ? ((totalSavings - total) / total) * 100 : 0
  const paybackMonths = annualSavings > 0 ? (total / annualSavings) * 12 : 999

  return {
    vendor: vendorId,
    vendorName: vendor.name,
    total,
    breakdown,
    roi: {
      percentage: roiPercentage,
      paybackMonths: Math.round(paybackMonths),
      annualSavings,
    },
    risk: {
      breachReduction,
      annualizedRiskCost: 500000 * (1 - breachReduction),
    },
    ops: {
      fteSaved,
      annualOpsSaving,
    },
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds
    .map((id) => calculateVendorTCO(id, config))
    .filter((result): result is CalculationResult => result !== null)
    .sort((a, b) => a.total - b.total)
}
