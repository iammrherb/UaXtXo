import { ComprehensiveVendorDatabase } from "./comprehensive-vendor-data"
import type { VendorData } from "./comprehensive-vendor-data"

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
  vendorData: VendorData
}

function calculatePortnoxCost(config: CalculationConfiguration, vendor: VendorData): TCOBreakdown {
  const { devices, years, portnoxBasePrice, portnoxAddons } = config
  let effectivePrice = portnoxBasePrice

  if (portnoxAddons.atp) effectivePrice += 1.5
  if (portnoxAddons.compliance) effectivePrice += 1.0
  if (portnoxAddons.iot) effectivePrice += 2.0
  if (portnoxAddons.analytics) effectivePrice += 1.5

  const licensing = effectivePrice * devices * 12 * years
  const total = licensing // Portnox has no other costs

  return {
    licensing,
    hardware: 0,
    implementation: 0,
    support: 0,
    training: 0,
    maintenance: 0,
    total,
  }
}

function calculateTraditionalCost(config: CalculationConfiguration, vendor: VendorData): TCOBreakdown {
  const { devices, years } = config
  const { pricing, implementation } = vendor

  const licensing = (pricing.basePrice + pricing.pricePerDevice * devices) * years
  const hardware = pricing.additionalCosts.hardware
  const implementationCost = pricing.additionalCosts.services
  const training = pricing.additionalCosts.training
  const maintenance = pricing.additionalCosts.maintenance * years

  // Estimate support as 20% of licensing
  const support = licensing * 0.2

  const total = licensing + hardware + implementationCost + training + maintenance + support
  return {
    licensing,
    hardware,
    implementation: implementationCost,
    support,
    training,
    maintenance,
    total,
  }
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) return null

  const breakdown =
    vendorId === "portnox" ? calculatePortnoxCost(config, vendor) : calculateTraditionalCost(config, vendor)

  const totalCost = breakdown.total

  // Mock ROI and Risk metrics for now, can be enhanced later
  const roi: ROIMetrics = {
    paybackMonths: vendorId === "portnox" ? 6.5 : 24 + Math.random() * 12,
    percentage: vendorId === "portnox" ? 5506 : 50 + Math.random() * 100,
    annualSavings: totalCost * (vendorId === "portnox" ? 0.65 : 0.1),
    breachReduction: vendor.security.cveCount === 0 ? 0.92 : 0.5 - vendor.security.cveCount * 0.01,
    laborSavingsFTE: vendorId === "portnox" ? 2.5 : 1.0,
  }

  const risk: RiskMetrics = {
    securityScore: vendor.security.securityRating,
    breachReduction: roi.breachReduction,
    vendorRisk: vendor.security.cveCount * 2,
    complianceScore: vendor.security.complianceSupport.length * 15 + (vendor.id === "portnox" ? 25 : 0),
  }

  return {
    vendor: vendorId,
    vendorId,
    vendorName: vendor.name,
    breakdown,
    total: totalCost,
    totalCost,
    roi,
    risk,
    vendorData: vendor,
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds
    .map((id) => calculateVendorTCO(id, config))
    .filter((result): result is CalculationResult => result !== null)
}
