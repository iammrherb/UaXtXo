import { ComprehensiveVendorDatabase, type VendorData, industrySecurityMetricsData } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  orgSize: string
  devices: number
  users: number
  industry: keyof typeof industrySecurityMetricsData
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
  description: string
}

export interface ROIMetrics {
  paybackMonths: number
  percentage: number
  netPresentValue: number
  annualizedROI: number
}

export interface FinancialSummary {
  totalSavings: number
  savingsVsCompetitor: number
  savingsPercent: number
}

export interface RiskAnalysis {
  breachCostAvoidance: number
  annualizedRiskReduction: number
  insurancePremiumSavings: number
  complianceFindingReduction: number // percentage
}

export interface CalculationResult {
  vendor: string
  vendorName: string
  totalTCO: number
  breakdown: CostBreakdown[]
  roi: ROIMetrics
  financialSummary: FinancialSummary
  risk: RiskAnalysis
  implementation: VendorData["implementation"]
  compliance: VendorData["compliance"]
  hiddenCosts: VendorData["hiddenCosts"]
  nistCsfAlignment: VendorData["nistCsfAlignment"]
  mitreAttackCoverage: VendorData["mitreAttackCoverage"]
}

const REGIONAL_MULTIPLIERS = {
  "north-america": 1.0,
  europe: 1.15,
  "asia-pacific": 0.85,
  "latin-america": 0.75,
  "middle-east": 1.1,
}

const FTE_COST = 150000 // Average loaded cost for a skilled security engineer
const DISCOUNT_RATE = 0.05 // For NPV calculation

function calculateAnnualizedCost(vendor: VendorData, config: CalculationConfiguration): number {
  const { devices, users, licenseTier } = config
  const regionalMultiplier = REGIONAL_MULTIPLIERS[config.region as keyof typeof REGIONAL_MULTIPLIERS] || 1.0

  // Software
  const tier =
    vendor.pricing.tiers[licenseTier] ||
    Object.values(vendor.pricing.tiers)[1] ||
    Object.values(vendor.pricing.tiers)[0]
  const pricePerUnit = tier ? tier.price / 12 : vendor.pricing.basePrice // monthly price
  const unitCount = vendor.pricing.model === "per-user" ? users : devices
  const annualSoftwareCost = pricePerUnit * 12 * unitCount

  // Support
  const annualSupportCost = annualSoftwareCost * vendor.pricing.supportCost

  // Operations
  const annualOpsCost = vendor.hiddenCosts.fteRequirement * FTE_COST * regionalMultiplier

  return annualSoftwareCost + annualSupportCost + annualOpsCost
}

function calculateUpfrontCosts(vendor: VendorData, config: CalculationConfiguration): number {
  const { devices } = config
  const regionalMultiplier = REGIONAL_MULTIPLIERS[config.region as keyof typeof REGIONAL_MULTIPLIERS] || 1.0

  // Hardware
  let hardwareCost = 0
  if (vendor.implementation.hardwareRequired && vendor.pricing.hardware) {
    const applianceCount = Math.ceil(devices / 10000) || 1
    const midRangeAppliance = Object.values(vendor.pricing.hardware)[1] || Object.values(vendor.pricing.hardware)[0]
    hardwareCost = applianceCount * midRangeAppliance.listPrice
  }

  // Implementation
  const implementationCost = vendor.pricing.professionalServices.advanced * regionalMultiplier

  return hardwareCost + implementationCost
}

function calculateRiskAndValue(vendor: VendorData, config: CalculationConfiguration) {
  const { industry } = config
  const industryData = industrySecurityMetricsData[industry]
  const baseline = ComprehensiveVendorDatabase["no-nac"]

  // Breach Cost Avoidance
  const baselineRisk = industryData.averageBreachCost * industryData.breachProbability
  const vendorRiskReduction = (vendor.nistCsfAlignment.Protect + vendor.nistCsfAlignment.Detect) / 2 / 100
  const vendorRisk = industryData.averageBreachCost * industryData.breachProbability * (1 - vendorRiskReduction)
  const annualBreachCostAvoidance = baselineRisk - vendorRisk

  // Insurance Savings
  const baselinePremium = 500 * config.devices // Estimate
  const annualInsurancePremiumSavings = baselinePremium * (vendor.cyberInsuranceImpact.premiumReduction / 100)

  // Compliance Savings
  const baselineAuditCost = 100000
  const complianceFindingReduction = (vendor.compliance.auditReadiness - baseline.compliance.auditReadiness) / 100
  const annualComplianceSavings = baselineAuditCost * 0.2 * complianceFindingReduction // 20% of audit cost is findings

  // FTE Savings (Productivity)
  const fteProductivityGain = (baseline.hiddenCosts.fteRequirement - vendor.hiddenCosts.fteRequirement) * FTE_COST

  const totalAnnualValue =
    annualBreachCostAvoidance + annualInsurancePremiumSavings + annualComplianceSavings + fteProductivityGain

  return {
    totalAnnualValue,
    breachCostAvoidance: annualBreachCostAvoidance,
    insurancePremiumSavings: annualInsurancePremiumSavings,
    complianceFindingReduction,
  }
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  if (!vendor) return null

  const { years } = config
  const annualCost = calculateAnnualizedCost(vendor, config)
  const upfrontCost = calculateUpfrontCosts(vendor, config)
  const { totalAnnualValue, breachCostAvoidance, insurancePremiumSavings, complianceFindingReduction } =
    calculateRiskAndValue(vendor, config)

  const cashFlows: number[] = [-upfrontCost]
  for (let i = 0; i < years; i++) {
    cashFlows.push(totalAnnualValue - annualCost)
  }

  // Financial Metrics
  const netPresentValue = cashFlows.reduce((acc, val, i) => acc + val / Math.pow(1 + DISCOUNT_RATE, i), 0)
  const totalTCO = upfrontCost + annualCost * years

  let cumulativeCashFlow = -upfrontCost
  let paybackMonths = -1
  for (let i = 1; i <= years * 12; i++) {
    cumulativeCashFlow += (totalAnnualValue - annualCost) / 12
    if (cumulativeCashFlow > 0) {
      paybackMonths = i
      break
    }
  }

  const totalInvestment = upfrontCost + annualCost * years
  const totalGain = totalAnnualValue * years
  const roiPercentage = totalInvestment > 0 ? ((totalGain - totalInvestment) / totalInvestment) * 100 : 0
  const annualizedROI = Math.pow(1 + roiPercentage / 100, 1 / years) - 1

  // Cost Breakdown
  const softwareCost = (annualCost - vendor.hiddenCosts.fteRequirement * FTE_COST) * years
  const opsCost = vendor.hiddenCosts.fteRequirement * FTE_COST * years
  const breakdown: CostBreakdown[] = [
    { name: "Software & Support", value: softwareCost, description: "Licensing, subscriptions, and maintenance" },
    {
      name: "Hardware",
      value: upfrontCost - vendor.pricing.professionalServices.advanced,
      description: "Physical or virtual appliances",
    },
    {
      name: "Implementation",
      value: vendor.pricing.professionalServices.advanced,
      description: "Professional services for setup",
    },
    { name: "Operations", value: opsCost, description: "Staffing and management overhead" },
  ]

  return {
    vendor: vendorId,
    vendorName: vendor.name,
    totalTCO,
    breakdown,
    roi: {
      paybackMonths: paybackMonths > 0 ? paybackMonths : years * 12,
      percentage: roiPercentage,
      netPresentValue,
      annualizedROI,
    },
    financialSummary: {
      totalSavings: totalGain - totalInvestment,
      savingsVsCompetitor: 0, // To be calculated in compareVendors
      savingsPercent: 0, // To be calculated in compareVendors
    },
    risk: {
      breachCostAvoidance,
      annualizedRiskReduction: breachCostAvoidance,
      insurancePremiumSavings,
      complianceFindingReduction,
    },
    implementation: vendor.implementation,
    compliance: vendor.compliance,
    hiddenCosts: vendor.hiddenCosts,
    nistCsfAlignment: vendor.nistCsfAlignment,
    mitreAttackCoverage: vendor.mitreAttackCoverage,
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  const results = vendorIds
    .map((id) => calculateVendorTCO(id, config))
    .filter((r): r is CalculationResult => r !== null)

  const portnoxResult = results.find((r) => r.vendor === "portnox")
  if (!portnoxResult) return results.sort((a, b) => a.totalTCO - b.totalTCO)

  const competitors = results.filter((r) => r.vendor !== "portnox")
  const lowestCompetitor = competitors.sort((a, b) => a.totalTCO - b.totalTCO)[0]

  return results
    .map((res) => {
      if (res.vendor === "portnox" && lowestCompetitor) {
        res.financialSummary.savingsVsCompetitor = lowestCompetitor.totalTCO - res.totalTCO
        res.financialSummary.savingsPercent =
          lowestCompetitor.totalTCO > 0
            ? (res.financialSummary.savingsVsCompetitor / lowestCompetitor.totalTCO) * 100
            : 0
      }
      return res
    })
    .sort((a, b) => a.totalTCO - b.totalTCO)
}
