import { vendorDatabase, type VendorData } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  devices: number
  users: number
  years: number
  licenseTier: "Basic" | "Professional" | "Enterprise"
  integrations: {
    mdm: boolean
    siem: boolean
    edr: boolean
  }
  professionalServices: "basic" | "advanced" | "premium"
  includeTraining: boolean
  portnoxDeviceCost: number
  avgFteCost: number
}

export interface CalculationResult {
  vendorId: string
  vendorName: string
  totalCost: number
  breakdown: {
    licensing: number
    hardware: number
    implementation: number
    support: number
    maintenance: number
    training: number
  }
  roi: {
    percentage: number
    annualSavings: number
    paybackMonths: number
  }
  riskFactors: {
    complexity: "low" | "medium" | "high"
    implementationTime: number
    fteRequirement: number
  }
}

function calculateTierPrice(vendor: VendorData, count: number): number {
  if (!vendor.pricing.tiers) {
    return vendor.pricing.basePrice * count
  }

  const tier = vendor.pricing.tiers.find((t) => count >= t.min && count <= t.max)
  return tier ? tier.price * count : vendor.pricing.basePrice * count
}

function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendor = vendorDatabase[vendorId]
  if (!vendor) {
    console.warn(`Vendor ${vendorId} not found in database, skipping...`)
    return null
  }

  // Calculate licensing costs
  let licensingCost = 0
  if (vendor.pricing.model === "per_device") {
    licensingCost = calculateTierPrice(vendor, config.devices) * config.years
  } else if (vendor.pricing.model === "per_user") {
    licensingCost = calculateTierPrice(vendor, config.users) * config.years
  } else if (vendor.pricing.model === "flat_rate") {
    licensingCost = vendor.pricing.basePrice * 12 * config.years
  }

  // Calculate other costs
  const hardwareCost = 0 // Most modern solutions are cloud-based
  const implementationCost = vendor.implementationCost || 0
  const supportCost = (vendor.supportCost || 0) * config.years
  const maintenanceCost = (vendor.maintenanceCost || 0) * config.years
  const trainingCost = config.includeTraining ? vendor.trainingCost || 0 : 0

  const totalCost = licensingCost + hardwareCost + implementationCost + supportCost + maintenanceCost + trainingCost

  // Calculate ROI (simplified calculation)
  const portnoxBaseline = vendorDatabase["portnox"]
  const baselineCost = portnoxBaseline ? calculateTierPrice(portnoxBaseline, config.devices) * config.years : 0
  const annualSavings = Math.max(0, (totalCost - baselineCost) / config.years)
  const roiPercentage = baselineCost > 0 ? ((baselineCost - totalCost) / totalCost) * 100 : 0
  const paybackMonths = annualSavings > 0 ? Math.ceil((totalCost - baselineCost) / (annualSavings / 12)) : 0

  return {
    vendorId,
    vendorName: vendor.name,
    totalCost,
    breakdown: {
      licensing: licensingCost,
      hardware: hardwareCost,
      implementation: implementationCost,
      support: supportCost,
      maintenance: maintenanceCost,
      training: trainingCost,
    },
    roi: {
      percentage: roiPercentage,
      annualSavings,
      paybackMonths,
    },
    riskFactors: {
      complexity: vendor.complexity,
      implementationTime: implementationCost > 50000 ? 6 : implementationCost > 20000 ? 3 : 1,
      fteRequirement: vendor.complexity === "high" ? 2 : vendor.complexity === "medium" ? 1 : 0.5,
    },
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  const results: CalculationResult[] = []

  for (const vendorId of vendorIds) {
    const result = calculateVendorTCO(vendorId, config)
    if (result) {
      results.push(result)
    }
  }

  return results.sort((a, b) => a.totalCost - b.totalCost)
}

export function calculateROI(currentCost: number, newCost: number, years: number): number {
  if (newCost === 0) return 0
  return ((currentCost - newCost) / newCost) * 100
}

export function calculatePaybackPeriod(initialInvestment: number, annualSavings: number): number {
  if (annualSavings <= 0) return 0
  return Math.ceil((initialInvestment / annualSavings) * 12) // Return in months
}
