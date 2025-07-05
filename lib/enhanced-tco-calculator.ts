import { vendorDatabase, type VendorData } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  devices: number
  users: number
  years: number
  licenseTier: string
  integrations: {
    mdm: boolean
    siem: boolean
    edr: boolean
  }
  professionalServices: string
  includeTraining: boolean
  portnoxDeviceCost: number
  avgFteCost: number
}

export interface CalculationResult {
  vendorId: string
  vendorName: string
  totalCost: number
  monthlyCost: number
  costPerDevice: number
  costPerDevicePerMonth: number
  breakdown: {
    hardware: number
    software: number
    implementation: number
    training: number
    support: number
    maintenance: number
    infrastructure: number
    personnel: number
    downtime: number
    patching: number
    upgrades: number
    energy: number
    rackSpace: number
    bandwidth: number
    backup: number
    disasterRecovery: number
    hiddenCosts: number
  }
  roi: {
    percentage: number
    paybackMonths: number
    netBenefit: number
    riskReduction: number
  }
  metrics: {
    deploymentTime: number
    timeToValue: number
    fteRequired: number
    availability: number
    userSatisfaction: number
  }
}

export function calculateTCO(vendorId: string, config: CalculationConfiguration): CalculationResult {
  const vendor = vendorDatabase[vendorId]
  if (!vendor) {
    throw new Error(`Vendor ${vendorId} not found`)
  }

  const devices = config.devices
  const users = config.users
  const years = config.years

  // Calculate base pricing with volume discounts
  let basePrice = vendor.pricing.basePrice
  let baseCost = 0

  if (vendor.pricing.model === "per_device") {
    if (vendor.pricing.tiers) {
      const tier = vendor.pricing.tiers.find((t) => devices >= t.min && devices <= t.max)
      basePrice = tier ? tier.price : vendor.pricing.basePrice
    }
    baseCost = basePrice * devices
  } else if (vendor.pricing.model === "per_user") {
    if (vendor.pricing.tiers) {
      const tier = vendor.pricing.tiers.find((t) => users >= t.min && users <= t.max)
      basePrice = tier ? tier.price : vendor.pricing.basePrice
    }
    baseCost = basePrice * users
  } else if (vendor.pricing.model === "flat_rate") {
    baseCost = vendor.pricing.basePrice
  }

  // Calculate software costs (annual subscription)
  const softwareCost = baseCost * 12 * years

  // Calculate other costs
  const implementationCost = vendor.implementationCost || 0
  const trainingCost = config.includeTraining ? vendor.trainingCost || 0 : 0
  const supportCost = (vendor.supportCost || 0) * years
  const maintenanceCost = (vendor.maintenanceCost || 0) * years

  // Calculate personnel costs based on complexity
  const complexityMultiplier = vendor.complexity === "high" ? 1.5 : vendor.complexity === "medium" ? 1.0 : 0.5
  const personnelCost = config.avgFteCost * complexityMultiplier * years

  // Calculate hidden costs
  const hiddenCosts = calculateHiddenCosts(vendor, devices, years)

  // Total breakdown
  const breakdown = {
    hardware: 0, // Cloud solutions don't have hardware costs
    software: softwareCost,
    implementation: implementationCost,
    training: trainingCost,
    support: supportCost,
    maintenance: maintenanceCost,
    infrastructure: 0,
    personnel: personnelCost,
    downtime: 0,
    patching: 0,
    upgrades: 0,
    energy: 0,
    rackSpace: 0,
    bandwidth: 0,
    backup: 0,
    disasterRecovery: 0,
    hiddenCosts: hiddenCosts,
  }

  const totalCost = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0)
  const monthlyCost = totalCost / (years * 12)
  const costPerDevice = totalCost / devices
  const costPerDevicePerMonth = costPerDevice / (years * 12)

  // Calculate ROI
  const roi = calculateROI(vendor, totalCost, devices, years)

  return {
    vendorId,
    vendorName: vendor.name,
    totalCost,
    monthlyCost,
    costPerDevice,
    costPerDevicePerMonth,
    breakdown,
    roi,
    metrics: {
      deploymentTime: getDeploymentTime(vendor),
      timeToValue: getTimeToValue(vendor),
      fteRequired: getFteRequired(vendor),
      availability: getAvailability(vendor),
      userSatisfaction: vendor.customerSatisfaction || 3.5,
    },
  }
}

function calculateHiddenCosts(vendor: VendorData, devices: number, years: number): number {
  let hiddenCosts = 0

  // Risk-based hidden costs
  const riskMultiplier = vendor.riskScore / 10
  hiddenCosts += devices * 50 * riskMultiplier * years

  // Complexity-based costs
  if (vendor.complexity === "high") {
    hiddenCosts += 25000 * years
  } else if (vendor.complexity === "medium") {
    hiddenCosts += 10000 * years
  }

  return hiddenCosts
}

function calculateROI(vendor: VendorData, totalCost: number, devices: number, years: number) {
  const annualCost = totalCost / years

  // Calculate risk reduction benefits
  const avgBreachCost = 4350000
  const breachProbability = 0.28
  const riskReduction = (10 - vendor.riskScore) / 10
  const annualRiskReduction = avgBreachCost * breachProbability * riskReduction

  // Calculate operational savings
  const operationalSavings = calculateOperationalSavings(vendor, devices)

  // Calculate compliance savings
  const complianceSavings = vendor.complianceScore * 5000

  // Total annual benefits
  const annualBenefits = annualRiskReduction + operationalSavings + complianceSavings

  // Calculate ROI
  const netBenefit = annualBenefits * years - totalCost
  const roiPercentage = (netBenefit / totalCost) * 100
  const paybackMonths = totalCost / (annualBenefits / 12)

  return {
    percentage: Math.round(roiPercentage),
    paybackMonths: Math.round(paybackMonths),
    netBenefit: Math.round(netBenefit),
    riskReduction: Math.round(riskReduction * 100),
  }
}

function calculateOperationalSavings(vendor: VendorData, devices: number): number {
  let savings = 0

  // Scalability savings
  if (vendor.scalability === "high") {
    savings += devices * 20
  } else if (vendor.scalability === "medium") {
    savings += devices * 10
  }

  // Customer satisfaction impact
  savings += vendor.customerSatisfaction * 10000

  return savings
}

function getDeploymentTime(vendor: VendorData): number {
  switch (vendor.complexity) {
    case "low":
      return 7
    case "medium":
      return 30
    case "high":
      return 90
    default:
      return 30
  }
}

function getTimeToValue(vendor: VendorData): number {
  switch (vendor.complexity) {
    case "low":
      return 14
    case "medium":
      return 45
    case "high":
      return 120
    default:
      return 45
  }
}

function getFteRequired(vendor: VendorData): number {
  switch (vendor.complexity) {
    case "low":
      return 0.25
    case "medium":
      return 1.0
    case "high":
      return 2.0
    default:
      return 1.0
  }
}

function getAvailability(vendor: VendorData): number {
  switch (vendor.scalability) {
    case "high":
      return 99.9
    case "medium":
      return 99.5
    case "low":
      return 99.0
    default:
      return 99.5
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds.map((vendorId) => calculateTCO(vendorId, config))
}
