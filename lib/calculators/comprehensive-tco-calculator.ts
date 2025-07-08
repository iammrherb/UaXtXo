// lib/calculators/comprehensive-tco-calculator.ts

import { COMPREHENSIVE_VENDOR_DATA } from "@/lib/vendors/comprehensive-vendor-data"
import type { VendorData } from "@/types/vendor-analysis"

// Main calculation configuration interface
export interface TCOCalculationConfig {
  industry: string
  deviceCount: number
  timeframe: number
  deploymentModel: string
  complianceRequirements: string[]
  currentSolution?: string
  region?: string
  supportLevel?: string
}

// TCO calculation result interface
export interface TCOCalculationResult {
  vendorId: string
  vendorName: string
  totalCost: number
  year1: number
  year3: number
  year5: number
  costBreakdown: {
    software: number
    hardware: number
    implementation: number
    operational: number
    hidden: number
  }
  roi: {
    totalSavings: number
    paybackPeriod: number
    netPresentValue: number
    internalRateOfReturn: number
  }
  security: {
    overallScore: number
    riskReduction: number
    complianceScore: number
  }
  implementation: {
    timeline: number
    complexity: string
    riskLevel: string
  }
}

// Industry-specific multipliers
const INDUSTRY_MULTIPLIERS = {
  HEALTHCARE: {
    compliance: 1.3,
    security: 1.4,
    downtime: 2.0,
    training: 1.2,
  },
  FINANCIAL: {
    compliance: 1.5,
    security: 1.6,
    downtime: 2.5,
    training: 1.3,
  },
  GOVERNMENT: {
    compliance: 1.4,
    security: 1.5,
    downtime: 1.8,
    training: 1.4,
  },
  EDUCATION: {
    compliance: 1.1,
    security: 1.2,
    downtime: 1.3,
    training: 1.1,
  },
  MANUFACTURING: {
    compliance: 1.2,
    security: 1.3,
    downtime: 2.2,
    training: 1.2,
  },
  RETAIL: {
    compliance: 1.2,
    security: 1.3,
    downtime: 1.8,
    training: 1.1,
  },
  TECHNOLOGY: {
    compliance: 1.1,
    security: 1.2,
    downtime: 1.5,
    training: 1.0,
  },
}

// Device count scaling factors
const getDeviceScalingFactor = (deviceCount: number): number => {
  if (deviceCount <= 100) return 1.0
  if (deviceCount <= 500) return 0.95
  if (deviceCount <= 1000) return 0.9
  if (deviceCount <= 5000) return 0.85
  if (deviceCount <= 10000) return 0.8
  return 0.75
}

// Calculate comprehensive TCO for a vendor
export function calculateComprehensiveTCO(vendorId: string, config: TCOCalculationConfig): TCOCalculationResult | null {
  try {
    const vendor = COMPREHENSIVE_VENDOR_DATA[vendorId]
    if (!vendor) {
      console.warn(`Vendor ${vendorId} not found`)
      return null
    }

    const { deviceCount, timeframe, industry } = config
    const industryMultiplier =
      INDUSTRY_MULTIPLIERS[industry as keyof typeof INDUSTRY_MULTIPLIERS] || INDUSTRY_MULTIPLIERS.TECHNOLOGY
    const scalingFactor = getDeviceScalingFactor(deviceCount)

    // Get cost structure for the timeframe
    const costStructure = vendor.costs[timeframe as keyof typeof vendor.costs] || vendor.costs[3]

    // Calculate base costs
    const softwareCost =
      costStructure.software.base * deviceCount * scalingFactor +
      (costStructure.software.additionalModules || 0) +
      (costStructure.software.support || 0)

    const hardwareCost =
      costStructure.hardware.appliances +
      (costStructure.hardware.infrastructure || 0) +
      (costStructure.hardware.networking || 0)

    const implementationCost =
      costStructure.implementation.professionalServices +
      (costStructure.implementation.deployment || 0) +
      (costStructure.implementation.migration || 0) +
      (costStructure.implementation.training || 0)

    const operationalCost =
      costStructure.operational.fteRequired * (costStructure.operational.avgSalary || 120000) * timeframe +
      (costStructure.operational.trainingCost || 0) +
      (costStructure.operational.certificationCost || 0)

    const hiddenCost = Object.values(costStructure.hidden || {}).reduce((sum, cost) => sum + cost, 0)

    // Apply industry multipliers
    const adjustedSoftwareCost = softwareCost * industryMultiplier.compliance
    const adjustedImplementationCost = implementationCost * industryMultiplier.training
    const adjustedOperationalCost = operationalCost * industryMultiplier.security
    const adjustedHiddenCost = hiddenCost * industryMultiplier.downtime

    const totalCost =
      adjustedSoftwareCost + hardwareCost + adjustedImplementationCost + adjustedOperationalCost + adjustedHiddenCost

    // Calculate year-by-year costs
    const year1 = adjustedSoftwareCost * 0.4 + hardwareCost + adjustedImplementationCost
    const year3 = totalCost * 0.6
    const year5 = totalCost

    // Calculate ROI metrics
    const baselineCost = calculateBaselineCost(deviceCount, timeframe, industry)
    const totalSavings = Math.max(0, baselineCost - totalCost)
    const paybackPeriod = totalSavings > 0 ? year1 / (totalSavings / timeframe) : 999
    const netPresentValue = calculateNPV(totalSavings, totalCost, timeframe)
    const internalRateOfReturn = calculateIRR(totalSavings, totalCost, timeframe)

    // Calculate security scores
    const overallScore = calculateSecurityScore(vendor, industry)
    const riskReduction = calculateRiskReduction(vendor, industry)
    const complianceScore = calculateComplianceScore(vendor, config.complianceRequirements)

    // Implementation metrics
    const timeline = vendor.implementation?.timeline || 90
    const complexity = vendor.implementation?.complexity || "MODERATE"
    const riskLevel = vendor.implementation?.riskLevel || "MODERATE"

    return {
      vendorId,
      vendorName: vendor.name,
      totalCost,
      year1,
      year3,
      year5,
      costBreakdown: {
        software: adjustedSoftwareCost,
        hardware: hardwareCost,
        implementation: adjustedImplementationCost,
        operational: adjustedOperationalCost,
        hidden: adjustedHiddenCost,
      },
      roi: {
        totalSavings,
        paybackPeriod,
        netPresentValue,
        internalRateOfReturn,
      },
      security: {
        overallScore,
        riskReduction,
        complianceScore,
      },
      implementation: {
        timeline,
        complexity,
        riskLevel,
      },
    }
  } catch (error) {
    console.error(`Error calculating TCO for ${vendorId}:`, error)
    return null
  }
}

// Calculate quick TCO estimate
export function calculateQuickTCO(vendorId: string, deviceCount: number): number {
  const vendor = COMPREHENSIVE_VENDOR_DATA[vendorId]
  if (!vendor) return 0

  const costStructure = vendor.costs[3] // Use 3-year as default
  const scalingFactor = getDeviceScalingFactor(deviceCount)

  return (
    costStructure.software.base * deviceCount * scalingFactor +
    costStructure.hardware.appliances +
    costStructure.implementation.professionalServices +
    costStructure.operational.fteRequired * 120000 * 3
  )
}

// Compare vendors by category
export function compareVendorsByCategory(
  vendorIds: string[],
  config: TCOCalculationConfig,
): Record<string, TCOCalculationResult> {
  const results: Record<string, TCOCalculationResult> = {}

  vendorIds.forEach((vendorId) => {
    const result = calculateComprehensiveTCO(vendorId, config)
    if (result) {
      results[vendorId] = result
    }
  })

  return results
}

// Helper functions
function calculateBaselineCost(deviceCount: number, timeframe: number, industry: string): number {
  // Baseline cost calculation for comparison (typical legacy NAC solution)
  const basePerDevice = 150 // Average cost per device for traditional NAC
  const industryMultiplier = INDUSTRY_MULTIPLIERS[industry as keyof typeof INDUSTRY_MULTIPLIERS]?.security || 1.2

  return deviceCount * basePerDevice * timeframe * industryMultiplier
}

function calculateNPV(savings: number, investment: number, years: number): number {
  const discountRate = 0.1 // 10% discount rate
  let npv = -investment

  for (let year = 1; year <= years; year++) {
    npv += savings / years / Math.pow(1 + discountRate, year)
  }

  return npv
}

function calculateIRR(savings: number, investment: number, years: number): number {
  // Simplified IRR calculation
  const annualSavings = savings / years
  return (annualSavings / investment) * 100
}

function calculateSecurityScore(vendor: VendorData, industry: string): number {
  let score = 70 // Base score

  // Add points for security features
  if (vendor.capabilities.zeroTrust) score += 10
  if (vendor.capabilities.riskBasedAccess) score += 8
  if (vendor.capabilities.behaviorAnalytics) score += 7
  if (vendor.capabilities.microSegmentation) score += 8
  if (vendor.capabilities.mfa) score += 5

  // Industry-specific adjustments
  const industryMultiplier = INDUSTRY_MULTIPLIERS[industry as keyof typeof INDUSTRY_MULTIPLIERS]?.security || 1.0
  score *= industryMultiplier

  return Math.min(100, Math.round(score))
}

function calculateRiskReduction(vendor: VendorData, industry: string): number {
  let reduction = 60 // Base risk reduction

  // Add reduction for advanced features
  if (vendor.capabilities.zeroTrust) reduction += 15
  if (vendor.capabilities.continuousCompliance) reduction += 10
  if (vendor.capabilities.behaviorAnalytics) reduction += 8
  if (vendor.capabilities.deviceTrust) reduction += 7

  return Math.min(95, reduction)
}

function calculateComplianceScore(vendor: VendorData, requirements: string[]): number {
  if (!requirements.length) return 85

  let score = 0
  const supportedFrameworks = vendor.complianceSupport || {}

  requirements.forEach((req) => {
    const framework = supportedFrameworks[req as keyof typeof supportedFrameworks]
    if (framework?.supported) {
      score += framework.coverage || 80
    }
  })

  return Math.round(score / requirements.length)
}

// Get industry-specific recommendations
export function getIndustryRecommendations(industry: string): string[] {
  const recommendations: Record<string, string[]> = {
    HEALTHCARE: [
      "Prioritize HIPAA compliance and patient data protection",
      "Focus on medical device integration and IoT security",
      "Ensure 24/7 availability for critical healthcare systems",
    ],
    FINANCIAL: [
      "Implement strong PCI DSS and SOX compliance measures",
      "Focus on fraud prevention and transaction security",
      "Ensure regulatory reporting capabilities",
    ],
    GOVERNMENT: [
      "Prioritize FedRAMP and FISMA compliance",
      "Focus on classified data protection",
      "Ensure citizen data privacy and security",
    ],
    EDUCATION: [
      "Implement FERPA compliance for student data",
      "Focus on BYOD and guest access management",
      "Ensure scalable solution for large user populations",
    ],
  }

  return (
    recommendations[industry] || [
      "Focus on core NAC capabilities and security",
      "Ensure scalable and cost-effective solution",
      "Prioritize ease of deployment and management",
    ]
  )
}

// Calculate migration complexity
export function calculateMigrationComplexity(
  currentSolution: string,
  targetVendor: string,
): { complexity: string; duration: number; risk: string } {
  const migrationMatrix: Record<string, Record<string, any>> = {
    none: {
      portnox: { complexity: "LOW", duration: 7, risk: "MINIMAL" },
      cisco_ise: { complexity: "HIGH", duration: 180, risk: "HIGH" },
      aruba_clearpass: { complexity: "MODERATE", duration: 90, risk: "MODERATE" },
    },
    cisco_ise: {
      portnox: { complexity: "MODERATE", duration: 30, risk: "LOW" },
      aruba_clearpass: { complexity: "HIGH", duration: 120, risk: "MODERATE" },
    },
    aruba_clearpass: {
      portnox: { complexity: "LOW", duration: 21, risk: "LOW" },
      cisco_ise: { complexity: "HIGH", duration: 150, risk: "HIGH" },
    },
  }

  return migrationMatrix[currentSolution]?.[targetVendor] || { complexity: "MODERATE", duration: 60, risk: "MODERATE" }
}

// Export the main calculator class for backward compatibility
export class ComprehensiveTCOCalculator {
  private config: TCOCalculationConfig

  constructor(config: TCOCalculationConfig) {
    this.config = config
  }

  calculate(vendorId: string): TCOCalculationResult | null {
    return calculateComprehensiveTCO(vendorId, this.config)
  }

  compareVendors(vendorIds: string[]): Record<string, TCOCalculationResult> {
    return compareVendorsByCategory(vendorIds, this.config)
  }

  updateConfig(newConfig: Partial<TCOCalculationConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }
}
