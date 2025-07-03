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
  portnoxDeviceCost: number
  avgFteCost: number
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
    yearlyRoi?: number[]
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

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) return null

  let total = 0
  const breakdown: { name: string; value: number }[] = []

  // Licensing Costs
  const tier = vendor.licensing.base.find((t) => t.name === config.licenseTier) || vendor.licensing.base[0]
  if (!tier) {
    console.warn(
      `No matching or default license tier found for vendor: ${vendor.name} and tier: ${config.licenseTier}. Skipping TCO calculation for this vendor.`,
    )
    return null
  }

  let listPrice = parseCost(tier.listPrice)
  // Override Portnox cost if specified in config
  if (vendorId === "portnox" && config.portnoxDeviceCost > 0) {
    listPrice = config.portnoxDeviceCost
  }

  const licenseUnitCount = tier.unit === "user" ? config.users : config.devices
  const licenseCost = listPrice * licenseUnitCount * config.years
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
  const annualFteCost = vendor.tcoFactors.fteRequirement * config.avgFteCost
  const totalFteCost = annualFteCost * config.years
  total += totalFteCost
  breakdown.push({ name: "Operational Staff", value: totalFteCost })

  // ROI Calculation
  const fteSaved = 2.0 - vendor.tcoFactors.fteRequirement > 0 ? 2.0 - vendor.tcoFactors.fteRequirement : 0
  const annualOpsSaving = fteSaved * config.avgFteCost
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
