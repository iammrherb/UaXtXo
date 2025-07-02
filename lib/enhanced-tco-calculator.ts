import type { VendorDetails } from "./comprehensive-vendor-data"

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
  professionalServices: "basic" | "advanced" | "premium"
  includeTraining: boolean
}

export interface TCOBreakdown {
  licensing: number
  hardware: number
  professionalServices: number
  training: number
  maintenance: number
  integration: number
  operational: number
}

export interface ROIMetrics {
  percentage: number
  paybackPeriod: number
  npv: number
  irr: number
}

export interface RiskMetrics {
  breachProbabilityReduction: number
  complianceScore: number
  operationalRisk: "low" | "medium" | "high"
}

export interface CalculationResult {
  vendor: string
  vendorName: string
  totalCost: number
  costCategories: TCOBreakdown
  roi: ROIMetrics
  riskMetrics: RiskMetrics
  implementationTime: number
  fteRequirement: number
}

export function calculateEnhancedTCO(vendor: VendorDetails, config: CalculationConfiguration): CalculationResult {
  // Calculate licensing costs
  const baseLicenseCost = vendor.licensing.base[0]?.listPrice || 50
  const licensingCost =
    typeof baseLicenseCost === "number"
      ? baseLicenseCost * config.devices * config.years
      : 50 * config.devices * config.years

  // Calculate hardware costs
  const hardwareCost = vendor.hardware.physical.length > 0 ? vendor.hardware.physical[0].listPrice || 0 : 0

  // Calculate professional services
  const psMultiplier =
    config.professionalServices === "basic" ? 1 : config.professionalServices === "advanced" ? 1.5 : 2
  const professionalServicesCost = (vendor.professionalServices.vendor[0]?.cost || 25000) * psMultiplier

  // Calculate training costs
  const trainingCost = config.includeTraining ? vendor.professionalServices.training[0]?.cost || 5000 : 0

  // Calculate maintenance (20% of hardware + licensing annually)
  const maintenanceCost = (hardwareCost + licensingCost) * 0.2 * config.years

  // Calculate integration costs
  const integrationCost = Object.values(config.integrations).filter(Boolean).length * 15000

  // Calculate operational costs
  const operationalCost = vendor.tcoFactors.fteRequirement * 150000 * config.years

  const costCategories: TCOBreakdown = {
    licensing: licensingCost,
    hardware: hardwareCost,
    professionalServices: professionalServicesCost,
    training: trainingCost,
    maintenance: maintenanceCost,
    integration: integrationCost,
    operational: operationalCost,
  }

  const totalCost = Object.values(costCategories).reduce((sum, cost) => sum + cost, 0)

  // Calculate ROI metrics
  const annualSavings = 200000 // Estimated annual savings
  const roi: ROIMetrics = {
    percentage: ((annualSavings * config.years - totalCost) / totalCost) * 100,
    paybackPeriod: (totalCost / annualSavings) * 12, // in months
    npv: annualSavings * config.years - totalCost,
    irr: 0.15, // Simplified IRR calculation
  }

  // Calculate risk metrics
  const riskMetrics: RiskMetrics = {
    breachProbabilityReduction: vendor.category === "cloud-native" ? 0.7 : 0.5,
    complianceScore: Object.keys(vendor.featureSupport.compliance).length * 10,
    operationalRisk: vendor.tcoFactors.downtimeRisk,
  }

  return {
    vendor: vendor.id,
    vendorName: vendor.name,
    totalCost,
    costCategories,
    roi,
    riskMetrics,
    implementationTime:
      vendor.tcoFactors.upgradeComplexity === "low" ? 3 : vendor.tcoFactors.upgradeComplexity === "medium" ? 6 : 12,
    fteRequirement: vendor.tcoFactors.fteRequirement,
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  const { ComprehensiveVendorDatabase } = require("./comprehensive-vendor-data")

  return vendorIds
    .map((id) => {
      const vendor = ComprehensiveVendorDatabase[id]
      if (!vendor) return null
      return calculateEnhancedTCO(vendor, config)
    })
    .filter(Boolean) as CalculationResult[]
}
