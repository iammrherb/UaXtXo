import { ComprehensiveVendorDatabase } from "./comprehensive-vendor-data"

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

// Export convenience function
export function compareVendors(vendorIds: string[], inputs: TCOCalculationInputs): MultiVendorComparison {
  const calculator = new EnhancedTCOCalculator()
  return calculator.calculateMultiVendorTCO(vendorIds, inputs)
}
