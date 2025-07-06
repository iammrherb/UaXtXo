import { getVendorData, type VendorData } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  devices: number
  users: number
  years: number
  licenseTier: "Basic" | "Standard" | "Enterprise" | "Premium"
  integrations: {
    mdm: boolean
    siem: boolean
    edr: boolean
  }
  professionalServices: "basic" | "standard" | "advanced"
  includeTraining: boolean
  portnoxDeviceCost: number
  avgFteCost: number
}

export interface CalculationResult {
  vendor: string
  vendorData: VendorData
  totalCost: number
  yearlyBreakdown: {
    year: number
    licenseCost: number
    supportCost: number
    implementationCost: number
    operationalCost: number
    totalYearCost: number
  }[]
  costBreakdown: {
    licensing: number
    support: number
    implementation: number
    training: number
    operational: number
    integrations: number
  }
  roi: {
    savings: number
    paybackPeriod: number
    netPresentValue: number
    roi: number
  }
  riskMetrics: {
    securityScore: number
    complianceScore: number
    operationalRisk: number
    financialRisk: number
  }
}

// Enhanced pricing models with more realistic data
const PRICING_MODELS = {
  portnox: {
    deviceCost: 20,
    userCost: 15,
    supportMultiplier: 0.2,
    implementationBase: 25000,
    trainingCost: 5000,
  },
  cisco: {
    deviceCost: 45,
    userCost: 35,
    supportMultiplier: 0.22,
    implementationBase: 75000,
    trainingCost: 15000,
  },
  aruba: {
    deviceCost: 38,
    userCost: 28,
    supportMultiplier: 0.2,
    implementationBase: 50000,
    trainingCost: 12000,
  },
  fortinet: {
    deviceCost: 32,
    userCost: 24,
    supportMultiplier: 0.18,
    implementationBase: 40000,
    trainingCost: 8000,
  },
  microsoft: {
    deviceCost: 25,
    userCost: 20,
    supportMultiplier: 0.15,
    implementationBase: 35000,
    trainingCost: 10000,
  },
  securew2: {
    deviceCost: 18,
    userCost: 12,
    supportMultiplier: 0.16,
    implementationBase: 20000,
    trainingCost: 4000,
  },
  foxpass: {
    deviceCost: 15,
    userCost: 10,
    supportMultiplier: 0.14,
    implementationBase: 15000,
    trainingCost: 3000,
  },
  pulse: {
    deviceCost: 35,
    userCost: 25,
    supportMultiplier: 0.19,
    implementationBase: 45000,
    trainingCost: 10000,
  },
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult {
  const vendorData = getVendorData(vendorId)
  if (!vendorData) {
    throw new Error(`Vendor ${vendorId} not found in database`)
  }

  const pricing = PRICING_MODELS[vendorId as keyof typeof PRICING_MODELS]
  if (!pricing) {
    // Use default pricing for vendors not in pricing model
    const defaultPricing = {
      deviceCost: 30,
      userCost: 22,
      supportMultiplier: 0.18,
      implementationBase: 35000,
      trainingCost: 8000,
    }
    return calculateWithPricing(vendorId, vendorData, defaultPricing, config)
  }

  return calculateWithPricing(vendorId, vendorData, pricing, config)
}

function calculateWithPricing(
  vendorId: string,
  vendorData: VendorData,
  pricing: any,
  config: CalculationConfiguration,
): CalculationResult {
  // Calculate base costs
  const annualLicenseCost = config.devices * pricing.deviceCost + config.users * pricing.userCost
  const annualSupportCost = annualLicenseCost * pricing.supportMultiplier
  const implementationCost = pricing.implementationBase + config.devices * 10
  const trainingCost = config.includeTraining ? pricing.trainingCost : 0

  // Integration costs
  const integrationCosts = {
    mdm: config.integrations.mdm ? 15000 : 0,
    siem: config.integrations.siem ? 25000 : 0,
    edr: config.integrations.edr ? 20000 : 0,
  }
  const totalIntegrationCost = Object.values(integrationCosts).reduce((sum, cost) => sum + cost, 0)

  // Operational costs (FTE savings/costs)
  const operationalSavings = vendorData.automationLevel * config.avgFteCost * 0.3 // 30% of FTE cost based on automation
  const annualOperationalCost = config.avgFteCost * 0.5 - operationalSavings // Net operational cost

  // Build yearly breakdown
  const yearlyBreakdown = []
  let totalCost = 0

  for (let year = 1; year <= config.years; year++) {
    const yearData = {
      year,
      licenseCost: annualLicenseCost,
      supportCost: annualSupportCost,
      implementationCost: year === 1 ? implementationCost : 0,
      operationalCost: annualOperationalCost,
      totalYearCost: 0,
    }

    yearData.totalYearCost =
      yearData.licenseCost + yearData.supportCost + yearData.implementationCost + yearData.operationalCost

    if (year === 1) {
      yearData.totalYearCost += trainingCost + totalIntegrationCost
    }

    yearlyBreakdown.push(yearData)
    totalCost += yearData.totalYearCost
  }

  // Cost breakdown
  const costBreakdown = {
    licensing: annualLicenseCost * config.years,
    support: annualSupportCost * config.years,
    implementation: implementationCost,
    training: trainingCost,
    operational: annualOperationalCost * config.years,
    integrations: totalIntegrationCost,
  }

  // ROI calculations
  const annualSavings = operationalSavings + vendorData.securityScore * 1000 // Security value
  const totalSavings = annualSavings * config.years
  const netPresentValue = totalSavings - totalCost
  const roi = ((totalSavings - totalCost) / totalCost) * 100
  const paybackPeriod = totalCost / annualSavings

  // Risk metrics
  const riskMetrics = {
    securityScore: vendorData.securityScore || 75,
    complianceScore: vendorData.complianceScore || 80,
    operationalRisk: Math.max(0, 100 - (vendorData.automationLevel || 50)),
    financialRisk: Math.max(0, (totalCost / (config.devices * 1000)) * 10), // Risk based on cost per device
  }

  return {
    vendor: vendorId,
    vendorData,
    totalCost,
    yearlyBreakdown,
    costBreakdown,
    roi: {
      savings: totalSavings,
      paybackPeriod,
      netPresentValue,
      roi,
    },
    riskMetrics,
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds
    .map((vendorId) => {
      try {
        return calculateVendorTCO(vendorId, config)
      } catch (error) {
        console.warn(`Failed to calculate TCO for vendor ${vendorId}:`, error)
        return null
      }
    })
    .filter((result): result is CalculationResult => result !== null)
    .sort((a, b) => a.totalCost - b.totalCost)
}
