import type { VendorData } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  devices: number
  users: number
  industry: string
  orgSize: "small" | "medium" | "large" | "enterprise"
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

// Industry-specific multipliers for accurate cost modeling
const INDUSTRY_MULTIPLIERS: Record<string, {
  complexity: number
  compliance: number
  security: number
  scale: number
}> = {
  healthcare: { complexity: 1.4, compliance: 1.8, security: 1.6, scale: 1.2 },
  financial: { complexity: 1.5, compliance: 2.0, security: 1.8, scale: 1.3 },
  government: { complexity: 1.6, compliance: 2.2, security: 2.0, scale: 1.4 },
  education: { complexity: 1.1, compliance: 1.3, security: 1.2, scale: 1.1 },
  retail: { complexity: 1.2, compliance: 1.4, security: 1.3, scale: 1.2 },
  manufacturing: { complexity: 1.3, compliance: 1.5, security: 1.4, scale: 1.3 },
  technology: { complexity: 1.0, compliance: \
