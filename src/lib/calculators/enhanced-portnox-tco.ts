import { industryComplianceData, calculateComplianceSavings } from "../compliance/industry-compliance-data"
import type { IndustryId, OrgSizeId } from "@/types/common"

export interface PortnoxTCOCalculation {
  // Core TCO Components
  softwareLicensing: number
  implementationCosts: number
  supportCosts: number
  operationalCosts: number
  trainingCosts: number

  // Hidden Cost Savings (vs competitors)
  hiddenCostSavings: {
    noHardware: number
    noDowntime: number
    reducedStaffing: number
    automatedOperations: number
    total: number
  }

  // Risk Reduction Benefits
  riskReduction: {
    breachCostAvoidance: number
    cyberInsuranceSavings: number
    complianceAutomation: number
    total: number
  }

  // Business Value
  businessValue: {
    timeToValue: number // Days
    productivityGains: number
    agilitySavings: number
    innovationEnablement: number
    total: number
  }

  // Totals
  totalTCO: number
  totalBenefits: number
  netValue: number
  roi: number
  paybackMonths: number

  // Previous Period Comparisons
  previousPeriod: {
    tcoGrowth: number
    benefitsGrowth: number
    industryBenchmark: number
  }
}

export interface CompetitorComparison {
  vendor: string
  tco3Year: number
  tco5Year: number
  savingsVsPortnox: number
  complexityScore: number
  timeToValue: number
}

// Enhanced Portnox-specific data
const PORTNOX_METRICS = {
  zeroTrustScore: 95,
  deploymentDays: 7,
  automationLevel: 90,
  adminHoursPerWeek: 5,
  breachRiskReduction: 0.92,
  complianceCoverage: 0.92,
  insuranceDiscount: 0.3,

  // Pricing (annual per device)
  pricing: {
    base: 42, // $3.5/month
    professional: 60, // $5/month
    enterprise: 72, // $6/month
    addons: {
      atp: 12, // Advanced Threat Protection
      compliance: 6, // Compliance Automation
      iot: 9, // IoT Security
      analytics: 6, // Advanced Analytics
    },
  },

  // Implementation costs
  implementation: {
    small: 0, // 0-500 devices
    medium: 5000, // 500-2500 devices
    large: 15000, // 2500+ devices
  },
}

// Industry benchmarks and previous period data
const INDUSTRY_BENCHMARKS = {
  healthcare: { avgTCO: 180000, breachCost: 10930000 },
  financial_services: { avgTCO: 220000, breachCost: 5970000 },
  retail: { avgTCO: 150000, breachCost: 3620000 },
  manufacturing: { avgTCO: 160000, breachCost: 4470000 },
  education: { avgTCO: 120000, breachCost: 3860000 },
  government: { avgTCO: 200000, breachCost: 5240000 },
  technology: { avgTCO: 140000, breachCost: 4880000 },
  energy_utilities: { avgTCO: 190000, breachCost: 5010000 },
}

export function calculatePortnoxTCO(
  devices = 500,
  users = 500,
  industry: IndustryId = "technology",
  orgSize: OrgSizeId = "mid_market",
  years = 3,
  addons: Record<string, boolean> = { atp: true, compliance: true, iot: false, analytics: true },
  customPricing?: number,
): PortnoxTCOCalculation {
  // Calculate base software licensing
  const basePrice = customPricing || PORTNOX_METRICS.pricing.professional
  let addonCosts = 0

  Object.entries(addons).forEach(([addon, enabled]) => {
    if (enabled && PORTNOX_METRICS.pricing.addons[addon]) {
      addonCosts += PORTNOX_METRICS.pricing.addons[addon]
    }
  })

  const annualLicensing = (basePrice + addonCosts) * devices
  const totalLicensing = annualLicensing * years

  // Implementation costs based on org size
  let implementationCosts = 0
  if (devices <= 500) implementationCosts = PORTNOX_METRICS.implementation.small
  else if (devices <= 2500) implementationCosts = PORTNOX_METRICS.implementation.medium
  else implementationCosts = PORTNOX_METRICS.implementation.large

  // Support costs (20% of annual licensing)
  const supportCosts = totalLicensing * 0.2

  // Operational costs (very low due to automation)
  const annualOperationalCosts = PORTNOX_METRICS.adminHoursPerWeek * 52 * 75 * (devices / 1000)
  const totalOperationalCosts = annualOperationalCosts * years

  // Training costs (minimal due to ease of use)
  const trainingCosts = Math.max(2500, users * 2.5) // Minimum $2.5K, $2.5 per user

  // Calculate hidden cost savings vs competitors
  const hiddenCostSavings = {
    noHardware: calculateHardwareSavings(devices),
    noDowntime: calculateDowntimeSavings(devices, industry),
    reducedStaffing: calculateStaffingSavings(devices, years),
    automatedOperations: calculateAutomationSavings(devices, years),
    total: 0,
  }
  hiddenCostSavings.total =
    Object.values(hiddenCostSavings).reduce((sum, val) => sum + val, 0) - hiddenCostSavings.total

  // Calculate risk reduction benefits
  const industryData = industryComplianceData[industry]
  const riskReduction = {
    breachCostAvoidance: calculateBreachCostAvoidance(devices, industry),
    cyberInsuranceSavings: calculateInsuranceSavings(industry, years),
    complianceAutomation: calculateComplianceAutomationSavings(industry, devices, years),
    total: 0,
  }
  riskReduction.total = Object.values(riskReduction).reduce((sum, val) => sum + val, 0) - riskReduction.total

  // Calculate business value
  const businessValue = {
    timeToValue: calculateTimeToValueBenefit(devices, years),
    productivityGains: calculateProductivityGains(users, years),
    agilitySavings: calculateAgilitySavings(devices, years),
    innovationEnablement: calculateInnovationValue(devices, years),
    total: 0,
  }
  businessValue.total = Object.values(businessValue).reduce((sum, val) => sum + val, 0) - businessValue.total

  // Calculate totals
  const totalTCO = totalLicensing + implementationCosts + supportCosts + totalOperationalCosts + trainingCosts
  const totalBenefits = hiddenCostSavings.total + riskReduction.total + businessValue.total
  const netValue = totalBenefits - totalTCO
  const roi = totalTCO > 0 ? (netValue / totalTCO) * 100 : 0
  const paybackMonths = totalBenefits > 0 ? totalTCO / (totalBenefits / (years * 12)) : 999

  // Previous period comparison (simulated growth)
  const previousPeriod = {
    tcoGrowth: -15.2, // 15.2% reduction year-over-year
    benefitsGrowth: 23.8, // 23.8% increase in benefits
    industryBenchmark: INDUSTRY_BENCHMARKS[industry]?.avgTCO || 150000,
  }

  return {
    softwareLicensing: totalLicensing,
    implementationCosts,
    supportCosts,
    operationalCosts: totalOperationalCosts,
    trainingCosts,
    hiddenCostSavings,
    riskReduction,
    businessValue,
    totalTCO,
    totalBenefits,
    netValue,
    roi,
    paybackMonths: Math.max(0, paybackMonths),
    previousPeriod,
  }
}

// Helper functions for detailed calculations
function calculateHardwareSavings(devices: number): number {
  // Estimated hardware costs for traditional NAC solutions
  if (devices <= 1000) return 35000
  if (devices <= 5000) return 125000
  return 275000
}

function calculateDowntimeSavings(devices: number, industry: IndustryId): number {
  const hourlyDowntimeCost = devices * 10 // $10 per device per hour
  const hoursAvoided = 8 // Typical migration downtime avoided
  const industryMultiplier =
    industry === "financial_services" ? 3 : industry === "healthcare" ? 2.5 : industry === "retail" ? 2 : 1.5

  return hourlyDowntimeCost * hoursAvoided * industryMultiplier
}

function calculateStaffingSavings(devices: number, years: number): number {
  // Portnox requires 0.1 FTE vs 0.5 FTE for traditional solutions
  const fteSavings = 0.4 * (devices / 1000)
  const annualSalary = 90000
  return fteSavings * annualSalary * years
}

function calculateAutomationSavings(devices: number, years: number): number {
  // 90% automation vs 40% for traditional NAC
  const automationDiff = 0.5
  const annualSavingsPerDevice = 15
  return devices * annualSavingsPerDevice * automationDiff * years
}

function calculateBreachCostAvoidance(devices: number, industry: IndustryId): number {
  const industryData = industryComplianceData[industry]
  if (!industryData) return 0

  const avgBreachCost = industryData.riskProfile.dataBreachCost
  const riskReduction = PORTNOX_METRICS.breachRiskReduction
  const annualBreachProbability = industryData.riskProfile.breachProbability

  return avgBreachCost * riskReduction * annualBreachProbability
}

function calculateInsuranceSavings(industry: IndustryId, years: number): number {
  const industryData = industryComplianceData[industry]
  if (!industryData) return 0

  const annualPremium = industryData.riskProfile.cyberInsuranceRequirements.typicalPremium
  const discount = industryData.riskProfile.cyberInsuranceRequirements.nacDiscountAvailable / 100

  return annualPremium * discount * years
}

function calculateComplianceAutomationSavings(industry: IndustryId, devices: number, years: number): number {
  const industryData = industryComplianceData[industry]
  if (!industryData) return 0

  const complianceSavings = calculateComplianceSavings(industryData, PORTNOX_METRICS.complianceCoverage * 100)
  return complianceSavings.totalSavings * years
}

function calculateTimeToValueBenefit(devices: number, years: number): number {
  // Portnox: 7 days vs 90 days for competitors = 83 days faster
  const daysSaved = 83
  const dailyOpportunityCost = devices * 5 // $5 per device per day
  return daysSaved * dailyOpportunityCost
}

function calculateProductivityGains(users: number, years: number): number {
  // Improved user experience and reduced friction
  const annualGainPerUser = 125 // $125 per user per year
  return users * annualGainPerUser * years
}

function calculateAgilitySavings(devices: number, years: number): number {
  // Business agility from cloud-native architecture
  const annualSavingsPerDevice = 8
  return devices * annualSavingsPerDevice * years
}

function calculateInnovationValue(devices: number, years: number): number {
  // Innovation enablement through modern architecture
  const baseValue = Math.min(50000, devices * 25)
  return baseValue * years
}

// Competitor comparison data
export function getCompetitorComparisons(devices: number, years = 3): CompetitorComparison[] {
  return [
    {
      vendor: "Cisco ISE",
      tco3Year: calculateCompetitorTCO("cisco_ise", devices, 3),
      tco5Year: calculateCompetitorTCO("cisco_ise", devices, 5),
      savingsVsPortnox: 0, // Will be calculated
      complexityScore: 85,
      timeToValue: 90,
    },
    {
      vendor: "Aruba ClearPass",
      tco3Year: calculateCompetitorTCO("aruba_clearpass", devices, 3),
      tco5Year: calculateCompetitorTCO("aruba_clearpass", devices, 5),
      savingsVsPortnox: 0,
      complexityScore: 70,
      timeToValue: 60,
    },
    {
      vendor: "Forescout",
      tco3Year: calculateCompetitorTCO("forescout", devices, 3),
      tco5Year: calculateCompetitorTCO("forescout", devices, 5),
      savingsVsPortnox: 0,
      complexityScore: 75,
      timeToValue: 75,
    },
    {
      vendor: "Juniper Mist",
      tco3Year: calculateCompetitorTCO("juniper_mist", devices, 3),
      tco5Year: calculateCompetitorTCO("juniper_mist", devices, 5),
      savingsVsPortnox: 0,
      complexityScore: 45,
      timeToValue: 30,
    },
  ]
}

function calculateCompetitorTCO(vendorId: string, devices: number, years: number): number {
  let annualLicensing = 0
  let hardware = 0
  let implementation = 0
  let support = 0
  let operations = 0
  let training = 0

  if (vendorId === "cisco_ise") {
    annualLicensing = 125 * devices
    hardware = devices <= 2000 ? 70000 : devices <= 10000 ? 190000 : 390000
    implementation = devices <= 1000 ? 25000 : devices <= 5000 ? 50000 : 150000
    support = 25000
    operations = 20 * 52 * 75 * (devices / 1000) // 20 hours/week
    training = 15000
  } else if (vendorId === "aruba_clearpass") {
    annualLicensing = 95 * devices
    hardware = devices <= 1000 ? 30000 : devices <= 5000 ? 90000 : 190000
    implementation = devices <= 1000 ? 15000 : devices <= 5000 ? 35000 : 100000
    support = 18000
    operations = 15 * 52 * 75 * (devices / 1000)
    training = 10000
  } else if (vendorId === "forescout") {
    annualLicensing = 85 * devices
    hardware = devices <= 5000 ? 50000 : devices <= 25000 ? 150000 : 300000
    implementation = devices <= 1000 ? 20000 : devices <= 5000 ? 45000 : 120000
    support = 22000
    operations = 18 * 52 * 75 * (devices / 1000)
    training = 12000
  } else if (vendorId === "juniper_mist") {
    annualLicensing = 72 * devices
    hardware = 0 // Cloud-native
    implementation = devices <= 1000 ? 5000 : devices <= 5000 ? 15000 : 40000
    support = 8000
    operations = 8 * 52 * 75 * (devices / 1000)
    training = 3500
  }

  return (annualLicensing + operations + support) * years + hardware + implementation + training
}
