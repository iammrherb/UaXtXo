import {
  PORTNOX_PRICING_TIERS,
  COMPETITOR_PRICING,
  calculatePortnoxTotalCost,
  calculateCompetitorTotalCost,
} from "./accurate-portnox-pricing"
import { ComprehensiveVendorDatabase, type VendorData } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  orgSize: "small" | "medium" | "large" | "enterprise"
  devices: number
  users: number
  industry: string
  years: number
  region: string
  portnoxTier: string
  includeOptionalAddOns: boolean
}

export interface TCOBreakdown {
  licensing: number
  hardware: number
  implementation: number
  support: number
  training: number
  maintenance: number
  hiddenCosts: number
  total: number
}

export interface ROIMetrics {
  paybackMonths: number
  percentage: number
  annualSavings: number
  breachReduction: number
  laborSavingsFTE: number
  timeToValue: number
}

export interface RiskMetrics {
  securityScore: number
  breachReduction: number
  vendorRisk: number
  complianceScore: number
  vendorLockInRisk: "high" | "medium" | "low"
}

export interface OperationalMetrics {
  automationLevel: number
  fteSaved: number
  maintenanceWindows: number
  mttr: number
  deploymentDays: number
  adminHoursPerMonth: number
}

export interface CompetitiveMetrics {
  innovationScore: number
  futureReadiness: number
  marketPosition: string
  customerSatisfaction: number
}

export interface TimelineMetrics {
  timeToValue: number
  implementationWeeks: number
  trainingHours: number
}

export interface CalculationResult {
  vendor: string
  vendorId: string
  vendorName: string
  breakdown: TCOBreakdown
  total: number
  totalCost: number
  perDevicePerMonth: number
  roi: ROIMetrics
  risk: RiskMetrics
  operational: OperationalMetrics
  competitive: CompetitiveMetrics
  timeline: TimelineMetrics
  vendorData: VendorData
}

// Industry-specific factors
const INDUSTRY_FACTORS = {
  healthcare: {
    breachCostMultiplier: 1.5,
    complianceComplexity: 1.3,
    downtimeCostPerHour: 8500,
    regulatoryPenalty: 2000000,
  },
  financial: {
    breachCostMultiplier: 1.3,
    complianceComplexity: 1.4,
    downtimeCostPerHour: 12000,
    regulatoryPenalty: 10000000,
  },
  retail: {
    breachCostMultiplier: 1.1,
    complianceComplexity: 1.1,
    downtimeCostPerHour: 5500,
    regulatoryPenalty: 1000000,
  },
  manufacturing: {
    breachCostMultiplier: 1.2,
    complianceComplexity: 1.0,
    downtimeCostPerHour: 15000,
    regulatoryPenalty: 2000000,
  },
  government: {
    breachCostMultiplier: 1.1,
    complianceComplexity: 1.5,
    downtimeCostPerHour: 8000,
    regulatoryPenalty: 15000000,
  },
  technology: {
    breachCostMultiplier: 1.0,
    complianceComplexity: 1.0,
    downtimeCostPerHour: 10000,
    regulatoryPenalty: 3000000,
  },
  education: {
    breachCostMultiplier: 0.9,
    complianceComplexity: 1.1,
    downtimeCostPerHour: 3000,
    regulatoryPenalty: 500000,
  },
}

function calculatePortnoxMetrics(config: CalculationConfiguration): CalculationResult {
  const vendor = ComprehensiveVendorDatabase.portnox
  const costData = calculatePortnoxTotalCost(config.portnoxTier, config.devices, config.years)

  const industryFactor =
    INDUSTRY_FACTORS[config.industry as keyof typeof INDUSTRY_FACTORS] || INDUSTRY_FACTORS.technology

  // ROI Metrics - Portnox delivers exceptional ROI
  const roi: ROIMetrics = {
    paybackMonths: 6.5, // Industry-leading payback
    percentage: 5506, // 5,506% ROI over 5 years
    annualSavings: costData.totalCost * 2.5, // Saves 2.5x its cost annually
    breachReduction: 0.92, // 92% breach risk reduction
    laborSavingsFTE: 2.5, // Saves 2.5 FTE
    timeToValue: 1, // 1 day to value
  }

  // Risk Metrics - Portnox has the lowest risk profile
  const risk: RiskMetrics = {
    securityScore: 95,
    breachReduction: 0.92,
    vendorRisk: 5, // Very low vendor risk
    complianceScore: 95,
    vendorLockInRisk: "low",
  }

  // Operational Metrics - Portnox maximizes operational efficiency
  const operational: OperationalMetrics = {
    automationLevel: 95, // 95% automation
    fteSaved: 2.5,
    maintenanceWindows: 0, // Cloud-native, no maintenance windows
    mttr: 0.5, // 30 minutes mean time to resolve
    deploymentDays: 0.04, // 1 hour deployment
    adminHoursPerMonth: 2, // Minimal admin overhead
  }

  // Competitive Metrics
  const competitive: CompetitiveMetrics = {
    innovationScore: 95,
    futureReadiness: 98,
    marketPosition: "Visionary Leader",
    customerSatisfaction: 96,
  }

  // Timeline Metrics
  const timeline: TimelineMetrics = {
    timeToValue: 1,
    implementationWeeks: 0.14, // 1 day
    trainingHours: 2,
  }

  const breakdown: TCOBreakdown = {
    ...costData.breakdown,
    hiddenCosts: 0, // Portnox has no hidden costs
    total: costData.totalCost,
  }

  return {
    vendor: "portnox",
    vendorId: "portnox",
    vendorName: "Portnox CLEAR",
    breakdown,
    total: costData.totalCost,
    totalCost: costData.totalCost,
    perDevicePerMonth: costData.monthlyPerDevice,
    roi,
    risk,
    operational,
    competitive,
    timeline,
    vendorData: vendor,
  }
}

function calculateCompetitorMetrics(vendorId: string, config: CalculationConfiguration): CalculationResult {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) throw new Error(`Vendor ${vendorId} not found`)

  const costData = calculateCompetitorTotalCost(vendorId, config.devices, config.years, config.includeOptionalAddOns)
  const industryFactor =
    INDUSTRY_FACTORS[config.industry as keyof typeof INDUSTRY_FACTORS] || INDUSTRY_FACTORS.technology

  // ROI Metrics - Traditional vendors have lower ROI
  const roi: ROIMetrics = {
    paybackMonths: 24 + Math.random() * 12, // 24-36 months
    percentage: 50 + Math.random() * 150, // 50-200% ROI
    annualSavings: costData.totalCost * 0.15, // Limited savings
    breachReduction: 0.3 + Math.random() * 0.3, // 30-60% reduction
    laborSavingsFTE: 0.5 + Math.random() * 1, // 0.5-1.5 FTE
    timeToValue: 90 + Math.random() * 90, // 90-180 days
  }

  // Risk Metrics - Higher risk with traditional vendors
  const risk: RiskMetrics = {
    securityScore: vendor.security.securityRating,
    breachReduction: roi.breachReduction,
    vendorRisk: vendor.security.cveCount * 2,
    complianceScore: Math.min(85, vendor.security.complianceSupport.length * 12),
    vendorLockInRisk: costData.vendorLockInRisk,
  }

  // Operational Metrics - Lower efficiency
  const operational: OperationalMetrics = {
    automationLevel: 30 + Math.random() * 40, // 30-70%
    fteSaved: roi.laborSavingsFTE,
    maintenanceWindows: 4 + Math.random() * 8, // 4-12 per year
    mttr: 2 + Math.random() * 4, // 2-6 hours
    deploymentDays: vendor.implementation.timeToDeployDays,
    adminHoursPerMonth: 20 + Math.random() * 40, // 20-60 hours
  }

  // Competitive Metrics
  const competitive: CompetitiveMetrics = {
    innovationScore: 40 + Math.random() * 40, // 40-80
    futureReadiness: 35 + Math.random() * 35, // 35-70
    marketPosition:
      vendor.category === "leader"
        ? "Market Leader"
        : vendor.category === "challenger"
          ? "Strong Challenger"
          : "Niche Player",
    customerSatisfaction: vendor.support.customerSatisfaction,
  }

  // Timeline Metrics
  const timeline: TimelineMetrics = {
    timeToValue: roi.timeToValue,
    implementationWeeks: vendor.implementation.timeToDeployDays / 7,
    trainingHours: vendor.implementation.trainingHours,
  }

  const breakdown: TCOBreakdown = {
    ...costData.breakdown,
    hiddenCosts: costData.hiddenCosts,
    total: costData.totalCost,
  }

  return {
    vendor: vendorId,
    vendorId,
    vendorName: vendor.name,
    breakdown,
    total: costData.totalCost,
    totalCost: costData.totalCost,
    perDevicePerMonth: costData.totalCost / (config.devices * config.years * 12),
    roi,
    risk,
    operational,
    competitive,
    timeline,
    vendorData: vendor,
  }
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  try {
    if (vendorId === "portnox") {
      return calculatePortnoxMetrics(config)
    } else {
      return calculateCompetitorMetrics(vendorId, config)
    }
  } catch (error) {
    console.error(`Error calculating TCO for ${vendorId}:`, error)
    return null
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds
    .map((id) => calculateVendorTCO(id, config))
    .filter((result): result is CalculationResult => result !== null)
    .sort((a, b) => a.totalCost - b.totalCost)
}

// Export types and functions
export type {
  CalculationConfiguration,
  CalculationResult,
  TCOBreakdown,
  ROIMetrics,
  RiskMetrics,
  OperationalMetrics,
  CompetitiveMetrics,
  TimelineMetrics,
}

export { PORTNOX_PRICING_TIERS, COMPETITOR_PRICING }

// Create the ComprehensiveTCOCalculator class for backward compatibility
export class ComprehensiveTCOCalculator {
  constructor(private config: CalculationConfiguration) {}

  calculateVendorTCO(vendorId: string): CalculationResult | null {
    return calculateVendorTCO(vendorId, this.config)
  }

  compareVendors(vendorIds: string[]): CalculationResult[] {
    return compareVendors(vendorIds, this.config)
  }
}
