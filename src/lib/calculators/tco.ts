import { VENDOR_DATA } from "../vendors/data"

// Types for TCO calculation
export interface TCOBreakdown {
  software: number
  hardware: number
  implementation: number
  operational: number
  training: number
  maintenance: number
  support: number
}

export interface ROIMetrics {
  totalSavings: number
  annualizedROIPercent: number
  paybackPeriodMonths: number
  netPresentValue: number
}

export interface TCOResult {
  vendorId: string
  vendorName: string
  totalTCO: number
  breakdown: TCOBreakdown
  roiMetrics: ROIMetrics
  total: number
  roi?: {
    percentage: number
    paybackMonths: number
  }
}

// Organization size configurations
const ORG_SIZE_CONFIGS = {
  startup: { devices: 100, users: 50, multiplier: 0.8 },
  smb: { devices: 500, users: 250, multiplier: 0.9 },
  medium: { devices: 2500, users: 1500, multiplier: 1.0 },
  enterprise: { devices: 10000, users: 7500, multiplier: 1.2 },
  xlarge: { devices: 50000, users: 35000, multiplier: 1.5 },
  custom: { devices: 2500, users: 1500, multiplier: 1.0 },
}

// Industry multipliers
const INDUSTRY_MULTIPLIERS = {
  technology: 1.0,
  healthcare: 1.3,
  financial: 1.4,
  manufacturing: 1.1,
  education: 0.8,
  government: 1.2,
  retail: 1.0,
  energy: 1.3,
  media: 1.0,
  other: 1.0,
}

// Regional cost multipliers
const REGIONAL_MULTIPLIERS = {
  "north-america": 1.0,
  europe: 1.1,
  "asia-pacific": 0.8,
  "latin-america": 0.7,
  "middle-east-africa": 0.9,
}

export function calculateFullTCOForVendor(
  vendorId: string,
  orgSize = "medium",
  industry = "technology",
  years = 5,
): TCOResult | null {
  const vendor = VENDOR_DATA[vendorId]
  if (!vendor) return null

  const orgConfig = ORG_SIZE_CONFIGS[orgSize] || ORG_SIZE_CONFIGS.medium
  const industryMultiplier = INDUSTRY_MULTIPLIERS[industry] || 1.0
  const regionalMultiplier = REGIONAL_MULTIPLIERS["north-america"] || 1.0

  const devices = orgConfig.devices
  const users = orgConfig.users
  const baseMultiplier = orgConfig.multiplier * industryMultiplier * regionalMultiplier

  // Calculate software costs
  const monthlyLicenseCost = devices * (vendor.pricing?.startingPrice || 5.0)
  const annualSoftwareCost = monthlyLicenseCost * 12 * baseMultiplier
  const totalSoftwareCost = annualSoftwareCost * years

  // Calculate hardware costs
  let hardwareCost = 0
  if (vendor.implementation?.requiresHardware) {
    const applianceCost = Math.ceil(devices / 1000) * 25000 // $25k per 1000 devices
    const networkUpgrades = devices * 50 // $50 per device for network upgrades
    hardwareCost = (applianceCost + networkUpgrades) * baseMultiplier
  }

  // Calculate implementation costs
  const deploymentHours = vendor.implementation?.deploymentTime?.fullDeployment || 720
  const consultingRate = 200 // $200/hour
  const implementationCost = deploymentHours * consultingRate * baseMultiplier

  // Calculate operational costs
  const annualOperationalCost = devices * 2 * baseMultiplier // $2 per device per year
  const totalOperationalCost = annualOperationalCost * years

  // Calculate training costs
  const trainingCost = users * 50 * baseMultiplier // $50 per user training

  // Calculate maintenance costs (percentage of hardware + software)
  const annualMaintenanceCost = (hardwareCost * 0.15 + annualSoftwareCost * 0.1) * baseMultiplier
  const totalMaintenanceCost = annualMaintenanceCost * years

  // Calculate support costs
  const annualSupportCost = devices * 10 * baseMultiplier // $10 per device per year
  const totalSupportCost = annualSupportCost * years

  const breakdown: TCOBreakdown = {
    software: totalSoftwareCost,
    hardware: hardwareCost,
    implementation: implementationCost,
    operational: totalOperationalCost,
    training: trainingCost,
    maintenance: totalMaintenanceCost,
    support: totalSupportCost,
  }

  const totalTCO = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0)

  // Calculate ROI metrics
  const annualSavings = calculateAnnualSavings(vendor, devices, users)
  const totalSavings = annualSavings * years
  const netPresentValue = calculateNPV(annualSavings, totalTCO, years, 0.08)
  const paybackPeriodMonths = totalTCO / (annualSavings / 12)
  const annualizedROIPercent = (((totalSavings - totalTCO) / totalTCO) * 100) / years

  const roiMetrics: ROIMetrics = {
    totalSavings,
    annualizedROIPercent,
    paybackPeriodMonths,
    netPresentValue,
  }

  return {
    vendorId,
    vendorName: vendor.name,
    totalTCO,
    breakdown,
    roiMetrics,
    total: totalTCO,
    roi: {
      percentage: annualizedROIPercent,
      paybackMonths: paybackPeriodMonths,
    },
  }
}

export function compareMultipleVendorsTCO(
  vendorIds: string[],
  orgSize = "medium",
  industry = "technology",
  years = 5,
): TCOResult[] {
  const results: TCOResult[] = []

  for (const vendorId of vendorIds) {
    const result = calculateFullTCOForVendor(vendorId, orgSize, industry, years)
    if (result) {
      results.push(result)
    }
  }

  return results.sort((a, b) => a.totalTCO - b.totalTCO)
}

function calculateAnnualSavings(vendor: any, devices: number, users: number): number {
  // Calculate savings based on vendor capabilities
  let savings = 0

  // Operational efficiency savings
  if (vendor.roi?.operationalEfficiency) {
    savings += devices * 100 * vendor.roi.operationalEfficiency // $100 per device base savings
  }

  // Security incident reduction savings
  if (vendor.roi?.breachRiskReduction) {
    const avgBreachCost = 4500000 // $4.5M average breach cost
    const breachProbability = 0.05 // 5% annual probability
    savings += avgBreachCost * breachProbability * vendor.roi.breachRiskReduction
  }

  // Compliance automation savings
  if (vendor.roi?.complianceAutomation) {
    savings += users * 50 * vendor.roi.complianceAutomation // $50 per user compliance savings
  }

  return savings
}

function calculateNPV(annualSavings: number, initialCost: number, years: number, discountRate: number): number {
  let npv = -initialCost

  for (let year = 1; year <= years; year++) {
    npv += annualSavings / Math.pow(1 + discountRate, year)
  }

  return npv
}

// Export additional utility functions
export function formatCurrency(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
    return `$${amount.toFixed(0)}`
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
}

export function calculateSavingsPercentage(portnoxTCO: number, competitorTCO: number): number {
  if (competitorTCO === 0) return 0
  return ((competitorTCO - portnoxTCO) / competitorTCO) * 100
}
