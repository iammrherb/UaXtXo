import { ComprehensiveVendorDatabase } from "./comprehensive-vendor-data"
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
const INDUSTRY_MULTIPLIERS: Record<
  string,
  {
    complexity: number
    compliance: number
    security: number
    scale: number
  }
> = {
  healthcare: { complexity: 1.4, compliance: 1.8, security: 1.6, scale: 1.2 },
  financial: { complexity: 1.5, compliance: 2.0, security: 1.8, scale: 1.3 },
  government: { complexity: 1.6, compliance: 2.2, security: 2.0, scale: 1.4 },
  education: { complexity: 1.1, compliance: 1.3, security: 1.2, scale: 1.1 },
  retail: { complexity: 1.2, compliance: 1.4, security: 1.3, scale: 1.2 },
  manufacturing: { complexity: 1.3, compliance: 1.5, security: 1.4, scale: 1.3 },
  technology: { complexity: 1.0, compliance: 1.1, security: 1.2, scale: 1.0 },
  default: { complexity: 1.2, compliance: 1.3, security: 1.3, scale: 1.1 },
}

// Organization size multipliers
const ORG_SIZE_MULTIPLIERS: Record<
  string,
  {
    complexity: number
    discount: number
    overhead: number
  }
> = {
  small: { complexity: 0.8, discount: 0.95, overhead: 1.2 },
  medium: { complexity: 1.0, discount: 0.9, overhead: 1.0 },
  large: { complexity: 1.2, discount: 0.85, overhead: 0.9 },
  enterprise: { complexity: 1.4, discount: 0.8, overhead: 0.8 },
}

export class EnhancedTCOCalculator {
  private config: CalculationConfiguration

  constructor(config: CalculationConfiguration) {
    this.config = config
  }

  /**
   * Calculate comprehensive TCO for a specific vendor
   * Each vendor calculation is completely independent
   */
  calculateVendorTCO(vendorId: string): CalculationResult {
    const vendorData = ComprehensiveVendorDatabase[vendorId]
    if (!vendorData) {
      throw new Error(`Vendor ${vendorId} not found in database`)
    }

    // Get industry and org size multipliers
    const industryMultiplier = INDUSTRY_MULTIPLIERS[this.config.industry] || INDUSTRY_MULTIPLIERS.default
    const orgSizeMultiplier = ORG_SIZE_MULTIPLIERS[this.config.orgSize]

    // Calculate base costs for this specific vendor
    const breakdown = this.calculateVendorBreakdown(vendorData, industryMultiplier, orgSizeMultiplier)

    // Calculate ROI metrics for this vendor
    const roi = this.calculateVendorROI(vendorData, breakdown.total)

    // Calculate risk metrics for this vendor
    const risk = this.calculateVendorRisk(vendorData)

    return {
      vendor: vendorData.name,
      vendorId: vendorData.id,
      vendorName: vendorData.name,
      breakdown,
      total: breakdown.total,
      totalCost: breakdown.total,
      roi,
      risk,
      vendorData,
    }
  }

  /**
   * Calculate detailed cost breakdown for a specific vendor
   */
  private calculateVendorBreakdown(
    vendorData: VendorData,
    industryMultiplier: any,
    orgSizeMultiplier: any,
  ): TCOBreakdown {
    const { devices, years } = this.config
    const pricing = vendorData.pricing

    // Base licensing calculation with volume discounts
    let licensingCost = 0
    if (pricing.model === "SaaS Subscription") {
      // Monthly subscription model (like Portnox)
      const monthlyPerDevice = pricing.pricePerDevice
      const volumeDiscount = this.getVolumeDiscount(devices, pricing.volumeDiscounts)
      const discountedPrice = monthlyPerDevice * (1 - volumeDiscount)
      licensingCost = devices * discountedPrice * 12 * years
    } else if (pricing.model === "Perpetual + Annual Support") {
      // Perpetual licensing with annual support
      const perpetualCost = pricing.basePrice + devices * pricing.pricePerDevice
      const annualSupport = perpetualCost * 0.22 // 22% annual support
      licensingCost = perpetualCost + annualSupport * years
    } else {
      // Other models
      licensingCost = pricing.basePrice + devices * pricing.pricePerDevice * years
    }

    // Apply volume discounts and org size multipliers
    licensingCost *= orgSizeMultiplier.discount

    // Hardware costs (zero for cloud-native solutions like Portnox)
    const hardwareCost = pricing.additionalCosts.hardware * industryMultiplier.scale

    // Implementation costs based on complexity
    const baseImplementation = pricing.additionalCosts.services
    const complexityMultiplier = vendorData.implementation.complexityScore / 10
    const implementationCost = baseImplementation * complexityMultiplier * industryMultiplier.complexity

    // Support costs over the timeframe
    const supportCost = pricing.additionalCosts.support * years * industryMultiplier.compliance

    // Training costs based on complexity and org size
    const trainingCost =
      pricing.additionalCosts.training *
      Math.log(devices / 100) *
      industryMultiplier.complexity *
      orgSizeMultiplier.overhead

    // Maintenance costs (ongoing operational overhead)
    const maintenanceCost =
      pricing.additionalCosts.maintenance *
      years *
      vendorData.implementation.complexityScore *
      industryMultiplier.complexity

    const total = licensingCost + hardwareCost + implementationCost + supportCost + trainingCost + maintenanceCost

    return {
      licensing: Math.round(licensingCost),
      hardware: Math.round(hardwareCost),
      implementation: Math.round(implementationCost),
      support: Math.round(supportCost),
      training: Math.round(trainingCost),
      maintenance: Math.round(maintenanceCost),
      total: Math.round(total),
    }
  }

  /**
   * Calculate ROI metrics for a specific vendor
   */
  private calculateVendorROI(vendorData: VendorData, totalCost: number): ROIMetrics {
    const { devices, years } = this.config

    // Calculate annual operational savings based on vendor efficiency
    const baseOperationalCost = devices * 50 // $50 per device baseline operational cost
    const efficiencyGain = vendorData.roi.efficiencyGains / 100
    const annualSavings = baseOperationalCost * efficiencyGain

    // Calculate breach risk reduction value
    const avgBreachCost = 4.45e6 // Average breach cost $4.45M
    const breachProbability = 0.28 // 28% annual probability
    const riskReduction = vendorData.roi.riskReduction / 100
    const breachReductionValue = avgBreachCost * breachProbability * riskReduction

    // Calculate labor savings
    const avgITSalary = 95000
    const laborSavingsFTE = vendorData.implementation.resourcesRequired.ongoingFTE
    const laborSavings = laborSavingsFTE * avgITSalary

    // Total annual benefits
    const totalAnnualBenefits = annualSavings + breachReductionValue + laborSavings
    const totalBenefits = totalAnnualBenefits * years

    // ROI calculation
    const netBenefit = totalBenefits - totalCost
    const roiPercentage = (netBenefit / totalCost) * 100

    // Payback period calculation
    const paybackMonths = totalCost / (totalAnnualBenefits / 12)

    return {
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      percentage: Math.round(roiPercentage),
      annualSavings: Math.round(totalAnnualBenefits),
      breachReduction: Math.round(breachReductionValue),
      laborSavingsFTE: Math.round(laborSavingsFTE * 10) / 10,
    }
  }

  /**
   * Calculate risk metrics for a specific vendor
   */
  private calculateVendorRisk(vendorData: VendorData): RiskMetrics {
    const securityScore = vendorData.security.securityRating
    const breachReduction = vendorData.roi.riskReduction

    // Vendor risk based on CVEs and market position
    const cveRisk = Math.min(vendorData.security.cveCount * 2, 50)
    const marketRisk =
      vendorData.marketPosition === "leader"
        ? 0
        : vendorData.marketPosition === "challenger"
          ? 10
          : vendorData.marketPosition === "visionary"
            ? 5
            : 20
    const vendorRisk = 100 - cveRisk - marketRisk

    // Compliance score based on supported standards
    const complianceScore = Math.min(vendorData.security.complianceSupport.length * 12, 100)

    return {
      securityScore,
      breachReduction,
      vendorRisk: Math.max(vendorRisk, 0),
      complianceScore,
    }
  }

  /**
   * Get volume discount based on device count
   */
  private getVolumeDiscount(devices: number, volumeDiscounts: Record<number, number>): number {
    const tiers = Object.keys(volumeDiscounts)
      .map(Number)
      .sort((a, b) => b - a) // Sort descending

    for (const tier of tiers) {
      if (devices >= tier) {
        return volumeDiscounts[tier] / 100 // Convert percentage to decimal
      }
    }

    return 0 // No discount
  }

  /**
   * Calculate TCO for multiple vendors independently
   */
  calculateMultiVendorTCO(vendorIds: string[]): CalculationResult[] {
    return vendorIds.map((vendorId) => this.calculateVendorTCO(vendorId))
  }

  /**
   * Get comparative analysis between vendors
   */
  getComparativeAnalysis(vendorIds: string[]): {
    results: CalculationResult[]
    savings: Record<string, number>
    recommendations: string[]
  } {
    const results = this.calculateMultiVendorTCO(vendorIds)

    // Find Portnox result for baseline comparison
    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const savings: Record<string, number> = {}

    if (portnoxResult) {
      results.forEach((result) => {
        if (result.vendorId !== "portnox") {
          savings[result.vendorId] = result.totalCost - portnoxResult.totalCost
        }
      })
    }

    // Generate recommendations based on analysis
    const recommendations = this.generateRecommendations(results)

    return {
      results,
      savings,
      recommendations,
    }
  }

  /**
   * Generate intelligent recommendations based on analysis
   */
  private generateRecommendations(results: CalculationResult[]): string[] {
    const recommendations: string[] = []

    const portnoxResult = results.find((r) => r.vendorId === "portnox")
    const competitors = results.filter((r) => r.vendorId !== "portnox")

    if (portnoxResult && competitors.length > 0) {
      const avgCompetitorCost = competitors.reduce((sum, r) => sum + r.totalCost, 0) / competitors.length
      const savings = avgCompetitorCost - portnoxResult.totalCost
      const savingsPercentage = (savings / avgCompetitorCost) * 100

      recommendations.push(
        `Portnox CLEAR delivers ${savingsPercentage.toFixed(1)}% cost savings (${this.formatCurrency(savings)}) compared to traditional NAC solutions.`,
      )

      recommendations.push(
        `Deployment time: ${portnoxResult.vendorData.implementation.deploymentDays} days vs ${Math.max(...competitors.map((c) => c.vendorData.implementation.deploymentDays))} days for competitors.`,
      )

      recommendations.push(
        `Security advantage: ${portnoxResult.vendorData.security.cveCount} CVEs vs average ${Math.round(competitors.reduce((sum, c) => sum + c.vendorData.security.cveCount, 0) / competitors.length)} CVEs for competitors.`,
      )
    }

    return recommendations
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }
}

// Export factory function for easy usage
export function createTCOCalculator(config: CalculationConfiguration): EnhancedTCOCalculator {
  return new EnhancedTCOCalculator(config)
}

// Export utility functions
export function calculateIndividualVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult {
  const calculator = new EnhancedTCOCalculator(config)
  return calculator.calculateVendorTCO(vendorId)
}

export function compareVendors(vendorIds: string[], config: CalculationConfiguration): CalculationResult[] {
  const calculator = new EnhancedTCOCalculator(config)
  return calculator.calculateMultiVendorTCO(vendorIds)
}
