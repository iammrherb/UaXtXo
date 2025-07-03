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
  const years = config.years

  // Calculate base pricing with volume discounts
  let basePrice = vendor.pricing.basePrice
  const volumeDiscount = vendor.pricing.volumeDiscounts.find(
    (discount) => devices >= discount.min && devices <= discount.max,
  )
  if (volumeDiscount) {
    basePrice = basePrice * (1 - volumeDiscount.discount / 100)
  }

  // Calculate software costs
  let softwareCost = 0
  if (vendor.pricing.model === "subscription") {
    softwareCost = basePrice * devices * 12 * years
  } else if (vendor.pricing.model === "perpetual") {
    softwareCost = basePrice * devices
  }

  // Scale hardware costs based on device count (baseline 500 devices)
  const hardwareCost = vendor.costs.hardware * (devices / 500)

  // Calculate implementation costs
  const implementationCost = vendor.costs.implementation + (devices > 500 ? (devices - 500) * 50 : 0)

  // Calculate training costs
  const trainingCost = config.includeTraining ? vendor.costs.training : 0

  // Calculate annual recurring costs
  const annualSupport = vendor.costs.support
  const annualMaintenance = vendor.costs.maintenance
  const annualInfrastructure = vendor.costs.infrastructure
  const annualPersonnel = vendor.costs.personnelPerYear
  const annualDowntime = vendor.costs.downtimePerYear
  const annualPatching = vendor.costs.patchingPerYear
  const annualEnergy = vendor.costs.energyCosts
  const annualRackSpace = vendor.costs.rackSpace
  const annualBandwidth = vendor.costs.networkBandwidth
  const annualBackup = vendor.costs.backupStorage
  const annualDR = vendor.costs.disasterRecovery

  // Calculate upgrade costs (every 3-5 years for on-premises)
  const upgradeCost = vendor.costs.upgradesCycle * Math.floor(years / 3)

  // Calculate hidden costs
  const hiddenCosts = calculateHiddenCosts(vendor, devices, years)

  // Total breakdown
  const breakdown = {
    hardware: hardwareCost,
    software: softwareCost,
    implementation: implementationCost,
    training: trainingCost,
    support: annualSupport * years,
    maintenance: annualMaintenance * years,
    infrastructure: annualInfrastructure * years,
    personnel: annualPersonnel * years,
    downtime: annualDowntime * years,
    patching: annualPatching * years,
    upgrades: upgradeCost,
    energy: annualEnergy * years,
    rackSpace: annualRackSpace * years,
    bandwidth: annualBandwidth * years,
    backup: annualBackup * years,
    disasterRecovery: annualDR * years,
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
      deploymentTime: vendor.metrics.deploymentTime,
      timeToValue: vendor.metrics.timeToValue,
      fteRequired: vendor.metrics.fteRequired,
      availability: vendor.metrics.availability,
      userSatisfaction: vendor.metrics.userSatisfaction,
    },
  }
}

function calculateHiddenCosts(vendor: VendorData, devices: number, years: number): number {
  let hiddenCosts = 0

  // Hardware refresh cycles for on-premises solutions
  if (vendor.deploymentModel !== "SaaS") {
    hiddenCosts += vendor.costs.hardware * 0.3 * Math.floor(years / 4) // 30% of hardware cost every 4 years
  }

  // Licensing complexity costs
  if (vendor.pricing.model === "perpetual") {
    hiddenCosts += devices * 10 * years // $10 per device per year for licensing management
  }

  // Professional services for complex deployments
  if (vendor.metrics.integrationEffort === "High") {
    hiddenCosts += 50000 // Additional professional services
  }

  // Opportunity cost of downtime
  const downtimeHours = (100 - vendor.metrics.availability) * 87.6 // Hours per year
  hiddenCosts += downtimeHours * 5000 * years // $5000 per hour of downtime

  return hiddenCosts
}

function calculateROI(vendor: VendorData, totalCost: number, devices: number, years: number) {
  const annualCost = totalCost / years

  // Calculate risk reduction benefits
  const avgBreachCost = 4350000 // Average breach cost
  const breachProbability = 0.28 // 28% annual probability
  const riskReduction = vendor.riskReduction.breachProbabilityReduction / 100
  const annualRiskReduction = avgBreachCost * breachProbability * riskReduction

  // Calculate operational savings
  const operationalSavings = calculateOperationalSavings(vendor, devices)

  // Calculate insurance premium reduction
  const insuranceSavings = 50000 * (vendor.riskReduction.insurancePremiumReduction / 100)

  // Total annual benefits
  const annualBenefits = annualRiskReduction + operationalSavings + insuranceSavings

  // Calculate ROI
  const netBenefit = annualBenefits * years - totalCost
  const roiPercentage = (netBenefit / totalCost) * 100
  const paybackMonths = totalCost / (annualBenefits / 12)

  return {
    percentage: Math.round(roiPercentage),
    paybackMonths: Math.round(paybackMonths),
    netBenefit: Math.round(netBenefit),
    riskReduction: vendor.riskReduction.breachProbabilityReduction,
  }
}

function calculateOperationalSavings(vendor: VendorData, devices: number): number {
  let savings = 0

  // FTE savings compared to industry average (1.5 FTE for traditional NAC)
  const industryAvgFTE = 1.5
  const fteSavings = (industryAvgFTE - vendor.metrics.fteRequired) * 150000 // $150k per FTE
  savings += Math.max(0, fteSavings)

  // Automation savings
  if (vendor.features.automatedOnboarding) {
    savings += devices * 30 // $30 per device for automated onboarding
  }

  if (vendor.features.automatedCompliance) {
    savings += 50000 // $50k annual compliance automation savings
  }

  // Reduced patching and maintenance
  if (vendor.deploymentModel === "SaaS") {
    savings += 25000 // $25k annual savings from no patching/maintenance
  }

  return savings
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds.map((vendorId) => calculateTCO(vendorId, config))
}
