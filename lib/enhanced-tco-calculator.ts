import { ComprehensiveVendorDatabase } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  orgSize: "small" | "medium" | "large" | "enterprise"
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

export interface TCOBreakdown {
  licensing: number
  hardware: number
  implementation: number
  support: number
  training: number
  maintenance: number
  total: number
}

export interface ROIMetrics {
  paybackMonths: number
  percentage: number
  annualSavings: number
  breachReduction: number
  laborSavingsFTE: number
}

export interface RiskMetrics {
  securityScore: number
  breachReduction: number
  vendorRisk: number
  complianceScore: number
}

export interface CalculationResult {
  vendor: string
  vendorId: string
  vendorName: string
  breakdown: TCOBreakdown
  total: number
  totalCost: number
  roi: ROIMetrics
  risk: RiskMetrics
  vendorData: any
}

// Mock calculation function - replace with actual implementation
export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) return null

  // Basic TCO calculation
  const basePrice = vendor.pricing.basePrice
  const devices = config.devices
  const years = config.years

  const licensing = basePrice * devices * 12 * years
  const hardware = vendor.implementation.hardwareRequired ? devices * 50 : 0
  const implementation = vendor.implementation.professionalServices.cost
  const support = licensing * 0.2 * years
  const training = vendor.implementation.complexity === "high" ? 25000 : 10000
  const maintenance = hardware * 0.15 * years

  const total = licensing + hardware + implementation + support + training + maintenance

  // Mock ROI calculation
  const roi: ROIMetrics = {
    paybackMonths: vendorId === "portnox" ? 6 : 18,
    percentage: vendorId === "portnox" ? 250 : 150,
    annualSavings: total * 0.3,
    breachReduction: vendor.security.breachCostSavings.reduction_percentage,
    laborSavingsFTE: vendorId === "portnox" ? 2.5 : 1.2,
  }

  // Mock risk calculation
  const risk: RiskMetrics = {
    securityScore: vendor.security.overallScore,
    breachReduction: vendor.security.breachCostSavings.reduction_percentage,
    vendorRisk: 100 - vendor.security.vulnerabilities.risk_score,
    complianceScore: vendor.compliance.automationLevel,
  }

  return {
    vendor: vendorId,
    vendorId,
    vendorName: vendor.name,
    breakdown: {
      licensing,
      hardware,
      implementation,
      support,
      training,
      maintenance,
      total,
    },
    total,
    totalCost: total,
    roi,
    risk,
    vendorData: {
      features: vendor.features,
      security: vendor.security,
      scalability: vendor.scalability || { cloudNative: vendor.features.core.cloudNative },
    },
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds
    .map((id) => calculateVendorTCO(id, config))
    .filter((result): result is CalculationResult => result !== null)
}
