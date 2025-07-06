import {
  enhancedVendorDatabase as vendorDatabase,
  type EnhancedVendorData as VendorData,
} from "./vendors/enhanced-vendor-data"

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
    console.warn(`Vendor ${vendorId} not found in enhanced database, skipping...`)
    return null
  }

  // Calculate licensing costs based on enhanced vendor data
  let licensingCost = 0
  if (vendor.pricing.licensing.model === "subscription") {
    const tierPrice = vendor.pricing.licensing.subscriptionTiers?.enterprise || vendor.pricing.perDevice.base
    licensingCost = getVolumePrice(vendor, config.devices) * config.years
  } else if (vendor.pricing.licensing.model === "perpetual") {
    licensingCost = getVolumePrice(vendor, config.devices)
    // Add annual maintenance for years 2+
    if (config.years > 1) {
      licensingCost += (vendor.pricing.licensing.annualMaintenance || 0) * config.devices * (config.years - 1)
    }
  } else if (vendor.pricing.licensing.model === "freemium") {
    licensingCost = vendor.pricing.licensing.subscriptionTiers?.professional
      ? vendor.pricing.licensing.subscriptionTiers.professional * config.devices * config.years
      : 0
  }

  // Calculate other costs using enhanced data
  const hardwareCost = calculateHardwareCost(vendor, config.devices)
  const implementationCost = calculateImplementationCost(vendor, config.devices)
  const supportCost = calculateSupportCost(vendor, config.devices) * config.years
  const maintenanceCost =
    vendor.operationalMetrics.operationalCosts.monthlyMaintenance * config.devices * 12 * config.years
  const trainingCost = config.includeTraining ? vendor.pricing.professionalServices.training.virtual : 0

  const totalCost = licensingCost + hardwareCost + implementationCost + supportCost + maintenanceCost + trainingCost

  // Calculate ROI using enhanced security metrics
  const portnoxBaseline = vendorDatabase["portnox"]
  const baselineCost = portnoxBaseline ? calculateBaseline(portnoxBaseline, config) : totalCost
  const annualSavings = Math.max(0, (baselineCost - totalCost) / config.years)
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
      complexity: vendor.implementation.complexity,
      implementationTime: vendor.implementation.timeToValue.medium,
      fteRequirement: vendor.operationalMetrics.staffingRequirements.administrators,
    },
  }
}

function getVolumePrice(vendor: VendorData, devices: number): number {
  const discounts = vendor.pricing.perDevice.volumeDiscounts
  if (devices >= 10000) return discounts[10000]
  if (devices >= 5000) return discounts[5000]
  if (devices >= 1000) return discounts[1000]
  if (devices >= 500) return discounts[500]
  return vendor.pricing.perDevice.base
}

function calculateHardwareCost(vendor: VendorData, devices: number): number {
  if (!vendor.pricing.hardware.required) return 0

  if (vendor.pricing.hardware.appliances) {
    let cost = 0
    let remainingDevices = devices

    const sortedAppliances = [...vendor.pricing.hardware.appliances].sort((a, b) => b.capacity - a.capacity)

    for (const appliance of sortedAppliances) {
      if (remainingDevices >= appliance.capacity) {
        const count = Math.floor(remainingDevices / appliance.capacity)
        cost += count * appliance.cost
        if (appliance.redundancy) cost += count * appliance.cost
        remainingDevices = remainingDevices % appliance.capacity
      }
    }

    if (remainingDevices > 0 && sortedAppliances.length > 0) {
      const smallestAppliance = sortedAppliances[sortedAppliances.length - 1]
      cost += smallestAppliance.cost
      if (smallestAppliance.redundancy) cost += smallestAppliance.cost
    }

    return cost
  }

  return vendor.pricing.infrastructure.serverRequirements.cost
}

function calculateImplementationCost(vendor: VendorData, devices: number): number {
  const { implementation } = vendor.pricing.professionalServices
  if (devices <= 1000) return implementation.small
  if (devices <= 5000) return implementation.medium
  return implementation.large
}

function calculateSupportCost(vendor: VendorData, devices: number): number {
  if (devices > 5000) return vendor.pricing.support.enterprise.cost
  if (devices > 1000) return vendor.pricing.support.premium.cost
  return vendor.pricing.support.basic.cost
}

function calculateBaseline(vendor: VendorData, config: CalculationConfiguration): number {
  const licensingCost = getVolumePrice(vendor, config.devices) * config.years
  const hardwareCost = calculateHardwareCost(vendor, config.devices)
  const implementationCost = calculateImplementationCost(vendor, config.devices)
  const supportCost = calculateSupportCost(vendor, config.devices) * config.years
  const maintenanceCost =
    vendor.operationalMetrics.operationalCosts.monthlyMaintenance * config.devices * 12 * config.years

  return licensingCost + hardwareCost + implementationCost + supportCost + maintenanceCost
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
