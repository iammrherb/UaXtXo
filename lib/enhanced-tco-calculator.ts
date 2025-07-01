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
  licenseTier: "essentials" | "professional" | "enterprise" | "advantage" | "premier" | "subscription"
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
  laborSavingsFTE: number
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

function calculateSoftwareCosts(vendor: VendorData, config: CalculationConfiguration): number {
  const { devices, years, licenseTier } = config
  let pricePerUnitPerYear = 0

  // Find the price for the selected tier, or a default
  const tier =
    vendor.pricing.tiers[licenseTier] ||
    Object.values(vendor.pricing.tiers)[1] ||
    Object.values(vendor.pricing.tiers)[0]
  if (tier) {
    pricePerUnitPerYear = tier.price
  }

  const unitCount = vendor.pricing.model === "per-user" ? config.users : devices
  const annualCost = pricePerUnitPerYear * unitCount

  // Add Portnox addons if applicable
  if (vendor.id === "portnox") {
    // This logic would need to be more complex if addons have prices
  }

  return annualCost * years
}

function calculateHardwareCosts(vendor: VendorData, config: CalculationConfiguration): number {
  if (!vendor.implementation.hardwareRequired || !vendor.pricing.hardware) return 0
  const { devices } = config

  // Simple estimation: one mid-range appliance per 10,000 devices
  const applianceCount = Math.ceil(devices / 10000)
  const midRangeAppliance = Object.values(vendor.pricing.hardware)[1] || Object.values(vendor.pricing.hardware)[0]
  const totalHardwareCost = applianceCount * midRangeAppliance.listPrice

  return totalHardwareCost
}

function calculateImplementationCosts(vendor: VendorData, config: CalculationConfiguration): number {
  const industryMultiplier = INDUSTRY_MULTIPLIERS[config.industry as keyof typeof INDUSTRY_MULTIPLIERS] || 1.0
  // Use advanced implementation cost as a baseline
  return vendor.pricing.professionalServices.advanced * industryMultiplier
}

function calculateSupportCosts(vendor: VendorData, softwareCost: number): number {
  if (vendor.pricing.supportCost === 0) return 0
  return softwareCost * vendor.pricing.supportCost
}

function calculateOperationsCosts(vendor: VendorData, config: CalculationConfiguration): number {
  const { years } = config
  const annualFTECost = 150000 // Average loaded cost for a skilled engineer
  return vendor.hiddenCosts.fteRequirement * annualFTECost * years
}

function calculateROI(vendor: VendorData, totalCost: number, config: CalculationConfiguration): ROIMetrics {
  const { devices, years } = config
  const avgITSalary = 120000

  // Simplified FTE savings based on our old model's logic
  const automationLevel = vendor.compliance.automationLevel / 100
  const laborSavingsFTE = automationLevel * Math.min(3, devices / 2000)
  const annualLaborSavings = laborSavingsFTE * avgITSalary

  // Simplified breach reduction savings
  const industryBreachCost = 4500000 // Average
  const breachRiskReduction = industryBreachCost * 0.2 * (vendor.features.advanced.zeroTrust ? 0.8 : 0.5)

  const totalAnnualSavings = annualLaborSavings + breachRiskReduction / years
  const totalSavings = totalAnnualSavings * years

  const paybackMonths = totalCost > 0 && totalAnnualSavings > 0 ? totalCost / (totalAnnualSavings / 12) : 0
  const roiPercentage = totalCost > 0 ? ((totalSavings - totalCost) / totalCost) * 100 : 0

  return {
    paybackMonths: Math.max(1, Math.round(paybackMonths)),
    percentage: Math.round(roiPercentage),
    annualSavings: Math.round(totalAnnualSavings),
    laborSavingsFTE: Math.round(laborSavingsFTE * 10) / 10,
  }
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) return null

  const softwareCost = calculateSoftwareCosts(vendor, config)
  const hardwareCost = calculateHardwareCosts(vendor, config)
  const implementationCost = calculateImplementationCosts(vendor, config)
  const supportCost = calculateSupportCosts(vendor, softwareCost)
  const operationsCost = calculateOperationsCosts(vendor, config)

  // Simplified hidden costs as 10% of sum of others
  const hiddenCost = (softwareCost + hardwareCost + implementationCost + supportCost + operationsCost) * 0.1

  const totalCost = softwareCost + hardwareCost + implementationCost + supportCost + operationsCost + hiddenCost

  const breakdown: CostBreakdown[] = [
    {
      name: "Software",
      value: Math.round(softwareCost),
      percentage: Math.round((softwareCost / totalCost) * 100),
      description: "Licensing and subscriptions",
    },
    {
      name: "Hardware",
      value: Math.round(hardwareCost),
      percentage: Math.round((hardwareCost / totalCost) * 100),
      description: "Physical or virtual appliances",
    },
    {
      name: "Implementation",
      value: Math.round(implementationCost),
      percentage: Math.round((implementationCost / totalCost) * 100),
      description: "Professional services",
    },
    {
      name: "Support",
      value: Math.round(supportCost),
      percentage: Math.round((supportCost / totalCost) * 100),
      description: "Annual maintenance",
    },
    {
      name: "Operations",
      value: Math.round(operationsCost),
      percentage: Math.round((operationsCost / totalCost) * 100),
      description: "Staffing and management",
    },
    {
      name: "Hidden",
      value: Math.round(hiddenCost),
      percentage: Math.round((hiddenCost / totalCost) * 100),
      description: "Indirect and unforeseen costs",
    },
  ]

  const roi = calculateROI(vendor, totalCost, config)

  const riskMetrics = {
    breachProbabilityReduction: vendor.features.advanced.zeroTrust ? 0.8 : 0.5,
    complianceScore: vendor.compliance.auditReadiness,
    operationalEfficiency: vendor.compliance.automationLevel,
  }

  const implementation = {
    timeToValue: vendor.implementation.deploymentTime.fullDeployment,
    complexity: vendor.implementation.complexity,
    resourceRequirement: vendor.implementation.professionalServicesRequired ? "High" : "Low",
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
  return vendorIds
    .map((id) => calculateVendorTCO(id, config))
    .filter((r): r is CalculationResult => r !== null)
    .sort((a, b) => a.total - b.total)
}
