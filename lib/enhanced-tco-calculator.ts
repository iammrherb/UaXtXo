import { ComprehensiveVendorDatabase, type VendorData } from "./comprehensive-vendor-data"

export interface TCOCalculationInputs {
  organizationSize: number
  timeframe: number
  industry: string
  complianceRequirements: string[]
  currentSolution: string
  budgetConstraints: number
  riskTolerance: "low" | "medium" | "high"
}

export interface VendorTCOResult {
  vendorId: string
  vendorName: string
  totalCost: number
  yearlyBreakdown: number[]
  costCategories: {
    licensing: number
    hardware: number
    services: number
    training: number
    maintenance: number
    support: number
    hiddenCosts: number
  }
  roi: {
    paybackMonths: number
    annualSavings: number
    efficiencyGains: number
    riskReduction: number
  }
  implementation: {
    deploymentDays: number
    complexityScore: number
    resourcesRequired: {
      internalFTE: number
      vendorFTE: number
      trainingHours: number
      ongoingFTE: number
    }
  }
  security: {
    securityRating: number
    cveCount: number
    zeroTrustMaturity: number
    complianceSupport: string[]
  }
}

export interface CalculationConfiguration {
  devices: number
  users: number
  years: number
  industry: string
  orgSize: string
  region: string
  portnoxBasePrice: number
  portnoxAddons: {
    atp: boolean
    compliance: boolean
    iot: boolean
    analytics: boolean
  }
}

export interface CalculationResult {
  vendor: string
  vendorId: string
  vendorName: string
  vendorData: VendorData
  total: number
  totalCost: number
  breakdown: {
    licensing: number
    hardware: number
    implementation: number
    support: number
    training: number
    maintenance: number
    operational: number
  }
  roi: {
    percentage: number
    annualSavings: number
    paybackMonths: number
    netPresentValue: number
  }
  risk: {
    securityScore: number
    complianceScore: number
    breachReduction: number
    operationalRisk: number
  }
  ops: {
    fteSaved: number
    annualOpsSaving: number
    automationLevel: number
    maintenanceHours: number
  }
  timeline: {
    implementationWeeks: number
    timeToValue: number
    migrationRisk: string
  }
}

export interface MultiVendorComparison {
  inputs: TCOCalculationInputs
  results: VendorTCOResult[]
  summary: {
    lowestCost: VendorTCOResult
    bestROI: VendorTCOResult
    fastestDeployment: VendorTCOResult
    highestSecurity: VendorTCOResult
    portnoxAdvantage: {
      costSavings: number
      timeSavings: number
      securityImprovement: number
      riskReduction: number
    }
  }
}

// Enhanced pricing models with realistic data
const VENDOR_PRICING = {
  portnox: {
    deviceCost: 60,
    supportMultiplier: 0.0,
    implementationBase: 25000,
    trainingCost: 5000,
    maintenanceMultiplier: 0.0,
    automationLevel: 95,
    fteSavings: 2.5,
    securityScore: 95,
    complianceScore: 92,
    implementationWeeks: 4,
  },
  cisco: {
    deviceCost: 125,
    supportMultiplier: 0.22,
    implementationBase: 150000,
    trainingCost: 25000,
    maintenanceMultiplier: 0.18,
    automationLevel: 65,
    fteSavings: 1.2,
    securityScore: 88,
    complianceScore: 90,
    implementationWeeks: 16,
  },
  aruba: {
    deviceCost: 95,
    supportMultiplier: 0.2,
    implementationBase: 75000,
    trainingCost: 15000,
    maintenanceMultiplier: 0.16,
    automationLevel: 75,
    fteSavings: 1.8,
    securityScore: 85,
    complianceScore: 87,
    implementationWeeks: 12,
  },
  forescout: {
    deviceCost: 75,
    supportMultiplier: 0.18,
    implementationBase: 100000,
    trainingCost: 20000,
    maintenanceMultiplier: 0.15,
    automationLevel: 70,
    fteSavings: 1.5,
    securityScore: 82,
    complianceScore: 85,
    implementationWeeks: 17,
  },
  juniper: {
    deviceCost: 72,
    supportMultiplier: 0.2,
    implementationBase: 55000,
    trainingCost: 10000,
    maintenanceMultiplier: 0.15,
    automationLevel: 78,
    fteSavings: 1.6,
    securityScore: 83,
    complianceScore: 86,
    implementationWeeks: 9,
  },
  extreme: {
    deviceCost: 65,
    supportMultiplier: 0.18,
    implementationBase: 60000,
    trainingCost: 12000,
    maintenanceMultiplier: 0.14,
    automationLevel: 72,
    fteSavings: 1.4,
    securityScore: 78,
    complianceScore: 82,
    implementationWeeks: 11,
  },
  fortinet: {
    deviceCost: 58,
    supportMultiplier: 0.16,
    implementationBase: 55000,
    trainingCost: 15000,
    maintenanceMultiplier: 0.13,
    automationLevel: 70,
    fteSavings: 1.3,
    securityScore: 82,
    complianceScore: 84,
    implementationWeeks: 12,
  },
  arista: {
    deviceCost: 48,
    supportMultiplier: 0.15,
    implementationBase: 35000,
    trainingCost: 8000,
    maintenanceMultiplier: 0.12,
    automationLevel: 75,
    fteSavings: 1.4,
    securityScore: 80,
    complianceScore: 82,
    implementationWeeks: 6,
  },
  meraki: {
    deviceCost: 108,
    supportMultiplier: 0.0,
    implementationBase: 30000,
    trainingCost: 5000,
    maintenanceMultiplier: 0.0,
    automationLevel: 68,
    fteSavings: 1.1,
    securityScore: 75,
    complianceScore: 78,
    implementationWeeks: 4,
  },
  ivanti: {
    deviceCost: 95,
    supportMultiplier: 0.25,
    implementationBase: 120000,
    trainingCost: 25000,
    maintenanceMultiplier: 0.2,
    automationLevel: 35,
    fteSavings: 0.5,
    securityScore: 25,
    complianceScore: 30,
    implementationWeeks: 21,
  },
  microsoft: {
    deviceCost: 0,
    supportMultiplier: 0.0,
    implementationBase: 85000,
    trainingCost: 15000,
    maintenanceMultiplier: 0.0,
    automationLevel: 30,
    fteSavings: 0.3,
    securityScore: 55,
    complianceScore: 60,
    implementationWeeks: 17,
  },
  foxpass: {
    deviceCost: 36,
    supportMultiplier: 0.0,
    implementationBase: 8000,
    trainingCost: 2000,
    maintenanceMultiplier: 0.0,
    automationLevel: 60,
    fteSavings: 0.8,
    securityScore: 68,
    complianceScore: 70,
    implementationWeeks: 2,
  },
  securew2: {
    deviceCost: 120,
    supportMultiplier: 0.18,
    implementationBase: 45000,
    trainingCost: 18000,
    maintenanceMultiplier: 0.15,
    automationLevel: 65,
    fteSavings: 1.0,
    securityScore: 85,
    complianceScore: 88,
    implementationWeeks: 9,
  },
  packetfence: {
    deviceCost: 0,
    supportMultiplier: 0.0,
    implementationBase: 150000,
    trainingCost: 35000,
    maintenanceMultiplier: 0.0,
    automationLevel: 45,
    fteSavings: 0.6,
    securityScore: 70,
    complianceScore: 65,
    implementationWeeks: 26,
  },
}

export class EnhancedTCOCalculator {
  private getIndustryMultiplier(industry: string): number {
    const multipliers: Record<string, number> = {
      healthcare: 1.3,
      financial: 1.4,
      government: 1.5,
      education: 0.8,
      manufacturing: 1.1,
      retail: 1.0,
      technology: 1.2,
      default: 1.0,
    }
    return multipliers[industry] || multipliers.default
  }

  private getComplianceMultiplier(requirements: string[]): number {
    const baseMultiplier = 1.0
    const complianceImpact = requirements.length * 0.1
    return baseMultiplier + complianceImpact
  }

  private getRiskMultiplier(riskTolerance: string): number {
    const multipliers: Record<string, number> = {
      low: 1.2,
      medium: 1.0,
      high: 0.9,
    }
    return multipliers[riskTolerance] || 1.0
  }

  calculateVendorTCO(vendorId: string, inputs: TCOCalculationInputs): VendorTCOResult {
    const vendor = ComprehensiveVendorDatabase[vendorId]
    if (!vendor) {
      throw new Error(`Vendor ${vendorId} not found in database`)
    }

    const industryMultiplier = this.getIndustryMultiplier(inputs.industry)
    const complianceMultiplier = this.getComplianceMultiplier(inputs.complianceRequirements)
    const riskMultiplier = this.getRiskMultiplier(inputs.riskTolerance)

    // Calculate volume discount
    let volumeDiscount = 0
    const sortedThresholds = Object.keys(vendor.pricing.volumeDiscounts)
      .map(Number)
      .sort((a, b) => b - a)

    for (const threshold of sortedThresholds) {
      if (inputs.organizationSize >= threshold) {
        volumeDiscount = vendor.pricing.volumeDiscounts[threshold] / 100
        break
      }
    }

    // Base licensing costs
    const baseLicensing =
      vendor.pricing.basePrice + vendor.pricing.pricePerDevice * inputs.organizationSize * (1 - volumeDiscount)

    // Additional costs
    const hardware = vendor.pricing.additionalCosts.hardware * industryMultiplier
    const services = vendor.pricing.additionalCosts.services * complianceMultiplier
    const training = vendor.pricing.additionalCosts.training * riskMultiplier
    const maintenance = vendor.pricing.additionalCosts.maintenance * inputs.timeframe
    const support = vendor.pricing.additionalCosts.support * inputs.timeframe
    const hiddenCosts = vendor.pricing.hiddenCosts.total * industryMultiplier

    // Calculate yearly breakdown
    const yearlyBreakdown: number[] = []
    for (let year = 1; year <= inputs.timeframe; year++) {
      let yearCost = baseLicensing

      if (year === 1) {
        yearCost += hardware + services + training
      }

      yearCost += (maintenance + support + hiddenCosts) / inputs.timeframe
      yearlyBreakdown.push(yearCost)
    }

    const totalCost = yearlyBreakdown.reduce((sum, cost) => sum + cost, 0)

    return {
      vendorId: vendor.id,
      vendorName: vendor.name,
      totalCost,
      yearlyBreakdown,
      costCategories: {
        licensing: baseLicensing * inputs.timeframe,
        hardware,
        services,
        training,
        maintenance,
        support,
        hiddenCosts,
      },
      roi: {
        paybackMonths: vendor.roi.paybackMonths,
        annualSavings: vendor.roi.annualSavings * industryMultiplier,
        efficiencyGains: vendor.roi.efficiencyGains,
        riskReduction: vendor.roi.riskReduction,
      },
      implementation: {
        deploymentDays: vendor.implementation.deploymentDays,
        complexityScore: vendor.implementation.complexityScore,
        resourcesRequired: vendor.implementation.resourcesRequired,
      },
      security: {
        securityRating: vendor.security.securityRating,
        cveCount: vendor.security.cveCount,
        zeroTrustMaturity: vendor.security.zeroTrustMaturity,
        complianceSupport: vendor.security.complianceSupport,
      },
    }
  }

  calculateMultiVendorTCO(vendorIds: string[], inputs: TCOCalculationInputs): MultiVendorComparison {
    const results = vendorIds.map((vendorId) => this.calculateVendorTCO(vendorId, inputs))

    // Find best options
    const lowestCost = results.reduce((min, current) => (current.totalCost < min.totalCost ? current : min))

    const bestROI = results.reduce((best, current) =>
      current.roi.annualSavings > best.roi.annualSavings ? current : best,
    )

    const fastestDeployment = results.reduce((fastest, current) =>
      current.implementation.deploymentDays < fastest.implementation.deploymentDays ? current : fastest,
    )

    const highestSecurity = results.reduce((most, current) =>
      current.security.securityRating > most.security.securityRating ? current : most,
    )

    // Calculate Portnox advantage
    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitorAverage = results
      .filter((r) => r.vendorId !== "portnox")
      .reduce(
        (acc, r, _, arr) => ({
          cost: acc.cost + r.totalCost / arr.length,
          deployment: acc.deployment + r.implementation.deploymentDays / arr.length,
          security: acc.security + r.security.securityRating / arr.length,
          risk: acc.risk + r.roi.riskReduction / arr.length,
        }),
        { cost: 0, deployment: 0, security: 0, risk: 0 },
      )

    const portnoxAdvantage = portnoxResult
      ? {
          costSavings: ((competitorAverage.cost - portnoxResult.totalCost) / competitorAverage.cost) * 100,
          timeSavings:
            ((competitorAverage.deployment - portnoxResult.implementation.deploymentDays) /
              competitorAverage.deployment) *
            100,
          securityImprovement:
            ((portnoxResult.security.securityRating - competitorAverage.security) / competitorAverage.security) * 100,
          riskReduction: ((portnoxResult.roi.riskReduction - competitorAverage.risk) / competitorAverage.risk) * 100,
        }
      : { costSavings: 0, timeSavings: 0, securityImprovement: 0, riskReduction: 0 }

    return {
      inputs,
      results,
      summary: {
        lowestCost,
        bestROI,
        fastestDeployment,
        highestSecurity,
        portnoxAdvantage,
      },
    }
  }
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult | null {
  const vendorData = ComprehensiveVendorDatabase[vendorId]
  if (!vendorData) return null

  const pricing = VENDOR_PRICING[vendorId as keyof typeof VENDOR_PRICING] || {
    deviceCost: 75,
    supportMultiplier: 0.18,
    implementationBase: 50000,
    trainingCost: 10000,
    maintenanceMultiplier: 0.15,
    automationLevel: 65,
    fteSavings: 1.0,
    securityScore: 75,
    complianceScore: 80,
    implementationWeeks: 12,
  }

  // Industry multipliers
  const industryMultipliers: Record<string, number> = {
    healthcare: 1.3,
    financial: 1.4,
    government: 1.5,
    education: 0.8,
    manufacturing: 1.1,
    retail: 1.0,
    technology: 1.2,
  }
  const industryMultiplier = industryMultipliers[config.industry] || 1.0

  // Organization size multipliers
  const orgSizeMultipliers: Record<string, number> = {
    small: 0.8,
    medium: 1.0,
    large: 1.2,
    enterprise: 1.4,
  }
  const orgSizeMultiplier = orgSizeMultipliers[config.orgSize] || 1.0

  // Calculate costs
  let annualLicenseCost = config.devices * pricing.deviceCost

  // Apply Portnox-specific pricing if it's Portnox
  if (vendorId === "portnox") {
    annualLicenseCost = config.devices * config.portnoxBasePrice
    // Add addon costs
    if (config.portnoxAddons.atp) annualLicenseCost += config.devices * 12
    if (config.portnoxAddons.compliance) annualLicenseCost += config.devices * 8
    if (config.portnoxAddons.iot) annualLicenseCost += config.devices * 6
    if (config.portnoxAddons.analytics) annualLicenseCost += config.devices * 4
  }

  const annualSupportCost = annualLicenseCost * pricing.supportMultiplier
  const implementationCost = (pricing.implementationBase + config.devices * 15) * industryMultiplier * orgSizeMultiplier
  const trainingCost = pricing.trainingCost * orgSizeMultiplier
  const annualMaintenanceCost = annualLicenseCost * pricing.maintenanceMultiplier

  // Hardware costs (mainly for on-premise solutions)
  const hardwareCost =
    vendorId === "portnox" ||
    vendorId === "foxpass" ||
    vendorId === "securew2" ||
    vendorId === "meraki" ||
    vendorId === "arista"
      ? 0
      : Math.max(25000, config.devices * 8) * orgSizeMultiplier

  // Operational savings
  const avgFteCost = 150000
  const fteSaved = pricing.fteSavings * (config.devices / 1000)
  const annualOpsSaving = fteSaved * avgFteCost

  // Total costs
  const totalLicensing = annualLicenseCost * config.years
  const totalSupport = annualSupportCost * config.years
  const totalMaintenance = annualMaintenanceCost * config.years
  const totalOperational = Math.max(0, (avgFteCost * 0.5 - annualOpsSaving) * config.years)

  const totalCost =
    totalLicensing +
    totalSupport +
    implementationCost +
    trainingCost +
    totalMaintenance +
    hardwareCost +
    totalOperational

  // ROI calculations
  const totalSavings = annualOpsSaving * config.years
  const netBenefit = totalSavings - totalCost
  const roiPercentage = totalCost > 0 ? ((totalSavings - totalCost) / totalCost) * 100 : 0
  const paybackMonths = annualOpsSaving > 0 ? Math.max(1, (totalCost / annualOpsSaving) * 12) : 999

  // Risk calculations
  const breachReduction = (pricing.securityScore / 100) * 0.85 // Max 85% reduction

  return {
    vendor: vendorId,
    vendorId,
    vendorName: vendorData.name,
    vendorData,
    total: totalCost,
    totalCost,
    breakdown: {
      licensing: totalLicensing,
      hardware: hardwareCost,
      implementation: implementationCost,
      support: totalSupport,
      training: trainingCost,
      maintenance: totalMaintenance,
      operational: totalOperational,
    },
    roi: {
      percentage: roiPercentage,
      annualSavings: annualOpsSaving,
      paybackMonths: Math.round(paybackMonths),
      netPresentValue: netBenefit,
    },
    risk: {
      securityScore: pricing.securityScore,
      complianceScore: pricing.complianceScore,
      breachReduction,
      operationalRisk: Math.max(0, 100 - pricing.automationLevel),
    },
    ops: {
      fteSaved,
      annualOpsSaving,
      automationLevel: pricing.automationLevel,
      maintenanceHours: (100 - pricing.automationLevel) * 10,
    },
    timeline: {
      implementationWeeks: pricing.implementationWeeks,
      timeToValue: pricing.implementationWeeks + 4,
      migrationRisk: pricing.implementationWeeks > 12 ? "high" : pricing.implementationWeeks > 8 ? "medium" : "low",
    },
  }
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  return vendorIds
    .map((vendorId) => {
      try {
        return calculateVendorTCO(vendorId, config)
      } catch (error) {
        console.warn(`Failed to calculate TCO for ${vendorId}:`, error)
        return null
      }
    })
    .filter((result): result is CalculationResult => result !== null)
    .sort((a, b) => a.totalCost - b.totalCost)
}

// Export convenience function
export function compareVendorsLegacy(vendorIds: string[], inputs: TCOCalculationInputs): MultiVendorComparison {
  const calculator = new EnhancedTCOCalculator()
  return calculator.calculateMultiVendorTCO(vendorIds, inputs)
}
