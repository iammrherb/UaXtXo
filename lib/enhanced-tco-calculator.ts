import { ComprehensiveVendorDatabase, type VendorData } from "./comprehensive-vendor-data"

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

export interface CostBreakdown {
  name: string
  value: number
  percentage: number
  description: string
}

export interface ROIMetrics {
  paybackMonths: number
  percentage: number
  annualSavings: number
  breachReduction: number
  laborSavingsFTE: number
  complianceSavings: number
}

export interface CalculationResult {
  vendor: string
  vendorName: string
  total: number
  breakdown: CostBreakdown[]
  roi: ROIMetrics
  riskMetrics: {
    breachProbabilityReduction: number
    complianceScore: number
    operationalEfficiency: number
  }
  implementation: {
    timeToValue: string
    complexity: string
    resourceRequirement: string
  }
}

// Regional cost multipliers
const REGIONAL_MULTIPLIERS = {
  "north-america": 1.0,
  europe: 1.15,
  "asia-pacific": 0.85,
  "latin-america": 0.75,
  "middle-east": 1.1,
}

// Industry complexity multipliers
const INDUSTRY_MULTIPLIERS = {
  healthcare: 1.3,
  financial: 1.4,
  government: 1.5,
  education: 0.9,
  manufacturing: 1.1,
  retail: 1.0,
  technology: 1.0,
  energy: 1.2,
}

// Organization size factors
const ORG_SIZE_FACTORS = {
  startup: { complexity: 0.7, support: 0.8, training: 0.6 },
  smb: { complexity: 0.8, support: 0.9, training: 0.8 },
  medium: { complexity: 1.0, support: 1.0, training: 1.0 },
  enterprise: { complexity: 1.3, support: 1.2, training: 1.4 },
  xlarge: { complexity: 1.6, support: 1.4, training: 1.8 },
}

function getVolumeDiscount(vendor: VendorData, deviceCount: number): number {
  const { volumeDiscounts } = vendor.pricing

  if (deviceCount >= volumeDiscounts.tier3.threshold) {
    return volumeDiscounts.tier3.discount
  } else if (deviceCount >= volumeDiscounts.tier2.threshold) {
    return volumeDiscounts.tier2.discount
  } else if (deviceCount >= volumeDiscounts.tier1.threshold) {
    return volumeDiscounts.tier1.discount
  }

  return 0
}

function calculateSoftwareCosts(vendor: VendorData, config: CalculationConfiguration): number {
  const { devices, users, years } = config
  let basePrice = vendor.pricing.basePrice

  // Apply volume discounts
  const discount = getVolumeDiscount(vendor, devices)
  basePrice = basePrice * (1 - discount)

  // Calculate based on pricing model
  const unitCount = vendor.pricing.model === "per-user" ? users : devices
  let monthlyCost = basePrice * unitCount

  // Add Portnox addons if applicable
  if (vendor.id === "portnox" && vendor.pricing.addOns) {
    Object.entries(config.portnoxAddons).forEach(([key, enabled]) => {
      if (enabled && vendor.pricing.addOns![key]) {
        monthlyCost += vendor.pricing.addOns[key].price * devices
      }
    })
  }

  // Convert to annual if needed
  const annualCost = vendor.pricing.billingCycle === "monthly" ? monthlyCost * 12 : monthlyCost

  return annualCost * years
}

function calculateHardwareCosts(vendor: VendorData, config: CalculationConfiguration): number {
  if (!vendor.implementation.hardwareRequired) return 0

  const { devices, years } = config
  const regionalMultiplier = REGIONAL_MULTIPLIERS[config.region as keyof typeof REGIONAL_MULTIPLIERS] || 1.0

  // Estimate hardware costs based on vendor and deployment size
  let hardwareCostPerDevice = 0

  switch (vendor.id) {
    case "cisco":
      hardwareCostPerDevice = devices > 5000 ? 800 : devices > 1000 ? 1200 : 1500
      break
    case "aruba":
      hardwareCostPerDevice = devices > 5000 ? 600 : devices > 1000 ? 900 : 1200
      break
    case "forescout":
      hardwareCostPerDevice = devices > 10000 ? 1000 : devices > 2000 ? 1500 : 2000
      break
    case "fortinet":
      hardwareCostPerDevice = devices > 5000 ? 700 : devices > 1000 ? 1000 : 1300
      break
    case "juniper":
      hardwareCostPerDevice = devices > 5000 ? 900 : devices > 1000 ? 1300 : 1600
      break
    case "arista":
      hardwareCostPerDevice = devices > 10000 ? 1500 : devices > 5000 ? 2000 : 2500
      break
    default:
      hardwareCostPerDevice = 500
  }

  // Calculate appliance count (rough estimate)
  const applianceCount = Math.max(1, Math.ceil(devices / 2000))
  const totalHardwareCost = applianceCount * hardwareCostPerDevice * regionalMultiplier

  // Add refresh costs for multi-year deployments
  const refreshCost = years > 3 ? totalHardwareCost * 0.5 : 0

  return totalHardwareCost + refreshCost
}

function calculateImplementationCosts(vendor: VendorData, config: CalculationConfiguration): number {
  const { devices, orgSize } = config
  const regionalMultiplier = REGIONAL_MULTIPLIERS[config.region as keyof typeof REGIONAL_MULTIPLIERS] || 1.0
  const industryMultiplier = INDUSTRY_MULTIPLIERS[config.industry as keyof typeof INDUSTRY_MULTIPLIERS] || 1.0
  const orgSizeFactors = ORG_SIZE_FACTORS[orgSize as keyof typeof ORG_SIZE_FACTORS] || ORG_SIZE_FACTORS.medium

  let baseCost = vendor.implementation.professionalServices.cost

  // Scale based on device count
  const deviceScaleFactor = Math.log10(devices / 1000) * 0.3 + 1
  baseCost *= deviceScaleFactor

  // Apply multipliers
  baseCost *= regionalMultiplier * industryMultiplier * orgSizeFactors.complexity

  // Add internal resource costs
  const internalResourceCost = baseCost * 0.4 // 40% of PS cost in internal resources

  return baseCost + internalResourceCost
}

function calculateSupportCosts(vendor: VendorData, config: CalculationConfiguration): number {
  const { devices, years } = config
  const softwareCost = calculateSoftwareCosts(vendor, config)

  // Support typically 18-22% of software costs annually
  const supportPercentage = vendor.category === "enterprise" ? 0.22 : 0.18
  const annualSupportCost = (softwareCost / years) * supportPercentage

  return annualSupportCost * years
}

function calculateOperationsCosts(vendor: VendorData, config: CalculationConfiguration): number {
  const { devices, users, years } = config
  const orgSizeFactors = ORG_SIZE_FACTORS[config.orgSize as keyof typeof ORG_SIZE_FACTORS] || ORG_SIZE_FACTORS.medium

  // Estimate FTE requirements based on complexity
  let fteRequired = 0
  switch (vendor.implementation.complexity) {
    case "low":
      fteRequired = Math.max(0.25, devices / 10000)
      break
    case "medium":
      fteRequired = Math.max(0.5, devices / 5000)
      break
    case "high":
      fteRequired = Math.max(1.0, devices / 2500)
      break
  }

  fteRequired *= orgSizeFactors.support

  // Average IT salary + benefits
  const annualFTECost = 120000
  const annualOperationsCost = fteRequired * annualFTECost

  return annualOperationsCost * years
}

function calculateHiddenCosts(vendor: VendorData, config: CalculationConfiguration): number {
  const { devices, years } = config

  // Hidden costs include: downtime, user productivity loss, additional tools, etc.
  let hiddenCostFactor = 0

  switch (vendor.implementation.complexity) {
    case "low":
      hiddenCostFactor = 0.05 // 5% of total visible costs
      break
    case "medium":
      hiddenCostFactor = 0.12 // 12% of total visible costs
      break
    case "high":
      hiddenCostFactor = 0.25 // 25% of total visible costs
      break
  }

  // Calculate visible costs first
  const softwareCost = calculateSoftwareCosts(vendor, config)
  const hardwareCost = calculateHardwareCosts(vendor, config)
  const implementationCost = calculateImplementationCosts(vendor, config)
  const supportCost = calculateSupportCosts(vendor, config)
  const operationsCost = calculateOperationsCosts(vendor, config)

  const visibleCosts = softwareCost + hardwareCost + implementationCost + supportCost + operationsCost

  return visibleCosts * hiddenCostFactor
}

function calculateROI(vendor: VendorData, totalCost: number, config: CalculationConfiguration): ROIMetrics {
  const { devices, users, years, industry } = config

  // Base savings calculations
  let annualLaborSavings = 0
  let breachRiskReduction = 0
  let complianceSavings = 0

  // Labor savings based on automation level
  const automationLevel = vendor.compliance.automationLevel / 100
  const avgITSalary = 120000
  const laborSavingsFTE = automationLevel * Math.min(3, devices / 2000) // Max 3 FTE savings
  annualLaborSavings = laborSavingsFTE * avgITSalary

  // Breach risk reduction
  const industryBreachCost = getIndustryBreachCost(industry)
  const industryBreachProbability = getIndustryBreachProbability(industry)

  // Vendor-specific risk reduction
  let riskReductionFactor = 0
  switch (vendor.id) {
    case "portnox":
      riskReductionFactor = 0.85 // 85% risk reduction
      break
    case "cisco":
    case "fortinet":
      riskReductionFactor = 0.7
      break
    case "aruba":
    case "juniper":
      riskReductionFactor = 0.65
      break
    case "forescout":
      riskReductionFactor = 0.75
      break
    default:
      riskReductionFactor = 0.5
  }

  breachRiskReduction = industryBreachCost * industryBreachProbability * riskReductionFactor

  // Compliance savings
  if (vendor.compliance.frameworks.length > 0) {
    const auditCostReduction = (vendor.compliance.auditReadiness / 100) * 200000 // Up to $200K audit savings
    const complianceEfficiency = (vendor.compliance.automationLevel / 100) * 150000 // Up to $150K efficiency
    complianceSavings = auditCostReduction + complianceEfficiency
  }

  const totalAnnualSavings = annualLaborSavings + breachRiskReduction / years + complianceSavings
  const totalSavings = totalAnnualSavings * years

  // Calculate payback period
  const paybackMonths = totalCost / (totalAnnualSavings / 12)

  // Calculate ROI percentage
  const roiPercentage = ((totalSavings - totalCost) / totalCost) * 100

  return {
    paybackMonths: Math.max(1, Math.round(paybackMonths)),
    percentage: Math.round(roiPercentage),
    annualSavings: Math.round(totalAnnualSavings),
    breachReduction: Math.round(riskReductionFactor * 100),
    laborSavingsFTE: Math.round(laborSavingsFTE * 10) / 10,
    complianceSavings: Math.round(complianceSavings),
  }
}

function getIndustryBreachCost(industry: string): number {
  const costs = {
    healthcare: 10930000,
    financial: 5720000,
    government: 4740000,
    technology: 4880000,
    education: 3790000,
    manufacturing: 4470000,
    retail: 3280000,
    energy: 6950000,
  }
  return costs[industry as keyof typeof costs] || 4500000
}

function getIndustryBreachProbability(industry: string): number {
  const probabilities = {
    healthcare: 0.29,
    financial: 0.19,
    government: 0.15,
    technology: 0.22,
    education: 0.26,
    manufacturing: 0.18,
    retail: 0.24,
    energy: 0.16,
  }
  return probabilities[industry as keyof typeof probabilities] || 0.2
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) return null

  // Calculate all cost components
  const softwareCost = calculateSoftwareCosts(vendor, config)
  const hardwareCost = calculateHardwareCosts(vendor, config)
  const implementationCost = calculateImplementationCosts(vendor, config)
  const supportCost = calculateSupportCosts(vendor, config)
  const operationsCost = calculateOperationsCosts(vendor, config)
  const hiddenCost = calculateHiddenCosts(vendor, config)

  const totalCost = softwareCost + hardwareCost + implementationCost + supportCost + operationsCost + hiddenCost

  // Create breakdown
  const breakdown: CostBreakdown[] = [
    {
      name: "Software",
      value: Math.round(softwareCost),
      percentage: Math.round((softwareCost / totalCost) * 100),
      description: "Licensing and subscription costs",
    },
    {
      name: "Hardware",
      value: Math.round(hardwareCost),
      percentage: Math.round((hardwareCost / totalCost) * 100),
      description: "Appliances and infrastructure",
    },
    {
      name: "Implementation",
      value: Math.round(implementationCost),
      percentage: Math.round((implementationCost / totalCost) * 100),
      description: "Professional services and deployment",
    },
    {
      name: "Support",
      value: Math.round(supportCost),
      percentage: Math.round((supportCost / totalCost) * 100),
      description: "Maintenance and technical support",
    },
    {
      name: "Operations",
      value: Math.round(operationsCost),
      percentage: Math.round((operationsCost / totalCost) * 100),
      description: "Ongoing management and administration",
    },
    {
      name: "Hidden",
      value: Math.round(hiddenCost),
      percentage: Math.round((hiddenCost / totalCost) * 100),
      description: "Downtime, productivity loss, additional tools",
    },
  ]

  // Calculate ROI
  const roi = calculateROI(vendor, totalCost, config)

  // Calculate risk metrics
  const riskMetrics = {
    breachProbabilityReduction: roi.breachReduction / 100,
    complianceScore: vendor.compliance.auditReadiness,
    operationalEfficiency: vendor.compliance.automationLevel,
  }

  // Implementation details
  const implementation = {
    timeToValue: vendor.implementation.deploymentTime.fullDeployment,
    complexity: vendor.implementation.complexity,
    resourceRequirement: vendor.implementation.professionalServices.required ? "High" : "Low",
  }

  return {
    vendor: vendorId,
    vendorName: vendor.name,
    total: Math.round(totalCost),
    breakdown,
    roi,
    riskMetrics,
    implementation,
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

  // Sort by total cost (ascending)
  return results.sort((a, b) => a.total - b.total)
}
