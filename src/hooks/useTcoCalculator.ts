"use client"

import { useMemo } from "react"
import type { VendorId, NewVendorData } from "@/lib/vendors/comprehensive-vendor-data"
import { getVendorDataById } from "@/lib/vendors/comprehensive-vendor-data"
import type { OrgSizeId, IndustryId } from "@/types/common"

// Organization size configurations
export const ORG_SIZE_CONFIGS = {
  small_business: { devices: 250, users: 150, sites: 2, avgEmployees: 75 },
  mid_market: { devices: 1500, users: 800, sites: 5, avgEmployees: 500 },
  enterprise: { devices: 7500, users: 4000, sites: 15, avgEmployees: 2500 },
  global_enterprise: { devices: 25000, users: 15000, sites: 50, avgEmployees: 10000 },
} as const

// Industry risk and compliance factors
export const INDUSTRY_FACTORS = {
  healthcare: {
    riskMultiplier: 2.2,
    complianceMultiplier: 1.8,
    breachCostAverage: 10930000,
    regulatoryPressure: "critical" as const,
    downtimeImpact: 3.5,
    requiredStandards: ["hipaa", "hitech", "pci_dss"],
  },
  financial_services: {
    riskMultiplier: 2.5,
    complianceMultiplier: 2.0,
    breachCostAverage: 5850000,
    regulatoryPressure: "critical" as const,
    downtimeImpact: 4.0,
    requiredStandards: ["pci_dss", "sox", "gdpr", "ffiec"],
  },
  manufacturing: {
    riskMultiplier: 1.8,
    complianceMultiplier: 1.3,
    breachCostAverage: 4990000,
    regulatoryPressure: "high" as const,
    downtimeImpact: 2.8,
    requiredStandards: ["iso27001", "nist", "itar"],
  },
  retail: {
    riskMultiplier: 1.5,
    complianceMultiplier: 1.2,
    breachCostAverage: 3280000,
    regulatoryPressure: "medium" as const,
    downtimeImpact: 2.2,
    requiredStandards: ["pci_dss", "gdpr"],
  },
  technology: {
    riskMultiplier: 1.6,
    complianceMultiplier: 1.1,
    breachCostAverage: 5040000,
    regulatoryPressure: "medium" as const,
    downtimeImpact: 2.5,
    requiredStandards: ["iso27001", "soc2", "gdpr"],
  },
  education: {
    riskMultiplier: 1.2,
    complianceMultiplier: 0.9,
    breachCostAverage: 3790000,
    regulatoryPressure: "low" as const,
    downtimeImpact: 1.8,
    requiredStandards: ["ferpa", "iso27001"],
  },
  government: {
    riskMultiplier: 3.0,
    complianceMultiplier: 2.2,
    breachCostAverage: 4910000,
    regulatoryPressure: "critical" as const,
    downtimeImpact: 5.0,
    requiredStandards: ["fedramp", "fisma", "nist", "cjis"],
  },
  energy_utilities: {
    riskMultiplier: 2.8,
    complianceMultiplier: 1.9,
    breachCostAverage: 6720000,
    regulatoryPressure: "critical" as const,
    downtimeImpact: 4.5,
    requiredStandards: ["nerc_cip", "iso27001", "nist"],
  },
} as const

export interface TCOResultBreakdown {
  software: number
  hardware: number
  implementation: number
  operational: number
  support: number
  hidden: number
}

export interface ROIMetrics {
  paybackPeriodMonths: number
  netPresentValue: number
  internalRateOfReturn: number
  totalBenefits: number
  benefitCostRatio: number
  riskAdjustedROI: number
}

export interface SecurityMetrics {
  breachProbabilityReduction: number
  expectedAnnualLoss: number
  riskAdjustedSavings: number
  complianceCoverageScore: number
  zeroTrustMaturityScore: number
  vulnerabilityExposure: string
}

export interface OperationalMetrics {
  fteReduction: number
  efficiencyGains: number
  maintenanceReduction: number
  deploymentTimeAdvantage: number
  automationLevel: number
}

export interface TCOResult {
  vendorId: VendorId
  vendorName: string
  totalTCO: number
  breakdown: TCOResultBreakdown
  roiMetrics: ROIMetrics
  securityMetrics: SecurityMetrics
  operationalMetrics: OperationalMetrics
  complianceMetrics: {
    coverageScore: number
    automationLevel: number
    auditReadiness: number
    standardsCovered: string[]
  }
  marketPosition: {
    ranking: number
    percentileSavings: number
    competitiveAdvantage: string[]
  }
}

// Enhanced TCO calculation functions
function calculateLicensingCosts(vendor: NewVendorData, orgSize: OrgSizeId, projectionYears: number): number {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const devices = orgConfig.devices
  const users = orgConfig.users

  // Find appropriate pricing tier
  let monthlyPrice = 0
  let annualDiscount = 0

  if (vendor.pricingTiers) {
    for (const tier of vendor.pricingTiers) {
      if (tier.orgSizeTarget?.includes(orgSize)) {
        monthlyPrice = tier.pricePerDevicePerMonth || tier.pricePerUserPerMonth || 0
        annualDiscount = tier.annualDiscountPercent || 0
        break
      }
      if (tier.userRange) {
        const [min, max] = tier.userRange
        if (users >= min && (max === null || users <= max)) {
          monthlyPrice = tier.pricePerUserPerMonth || tier.pricePerDevicePerMonth || 0
          annualDiscount = tier.annualDiscountPercent || 0
          break
        }
      }
    }
  }

  // Fallback to base pricing if no tier found
  if (monthlyPrice === 0) {
    monthlyPrice = vendor.tcoFactors.licensingCostPerYear / (devices * 12)
  }

  const annualCost = monthlyPrice * devices * 12 * (1 - annualDiscount / 100)
  return annualCost * projectionYears
}

function calculateImplementationCosts(vendor: NewVendorData, orgSize: OrgSizeId, industry: IndustryId): number {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const industryFactor = INDUSTRY_FACTORS[industry]

  // Base implementation cost
  const baseCost = vendor.tcoFactors.licensingCostPerYear * 0.25 // 25% of annual licensing

  // Professional services
  const professionalServices = baseCost * vendor.implementation.professionalServicesCostFactor

  // Training costs adjusted for industry complexity
  const training = vendor.tcoFactors.trainingCostInitial * industryFactor.complianceMultiplier

  // Deployment complexity factor
  const complexityMultiplier = {
    low: 1.0,
    medium: 1.5,
    high: 2.2,
    very_high: 3.5,
  }[vendor.implementation.complexityLevel]

  return (baseCost + professionalServices + training) * complexityMultiplier
}

function calculateOperationalCosts(
  vendor: NewVendorData,
  orgSize: OrgSizeId,
  industry: IndustryId,
  projectionYears: number,
): number {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const industryFactor = INDUSTRY_FACTORS[industry]

  // Personnel costs (FTE requirements)
  const avgSalary = 125000 // Average security professional salary
  const fteRequired = vendor.tcoFactors.personnelCostFactor
  const annualPersonnelCost = fteRequired * avgSalary * industryFactor.complianceMultiplier

  // Support and maintenance
  const annualSupportCost = vendor.tcoFactors.licensingCostPerYear * vendor.tcoFactors.supportCostFactor

  // Hardware refresh and maintenance
  const annualHardwareCost = vendor.tcoFactors.hardwareCostPerYear

  // Operational overhead based on complexity
  const operationalOverhead = annualPersonnelCost * 0.3 // 30% overhead

  return (annualPersonnelCost + annualSupportCost + annualHardwareCost + operationalOverhead) * projectionYears
}

function calculateHiddenCosts(
  vendor: NewVendorData,
  orgSize: OrgSizeId,
  industry: IndustryId,
  projectionYears: number,
): number {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const industryFactor = INDUSTRY_FACTORS[industry]

  // Downtime costs during implementation and maintenance
  const downtimeHours = vendor.implementation.averageDeploymentTimeDays * 0.5 // Half day downtime per deployment day
  const downtimeCostPerHour = 5000 * industryFactor.downtimeImpact
  const downtimeCost = downtimeHours * downtimeCostPerHour

  // Integration complexity costs
  const integrationCost = (vendor.tcoFactors.licensingCostPerYear * vendor.tcoFactors.hiddenCostFactor) / 100

  // Opportunity costs (delayed projects, missed savings)
  const opportunityCost = vendor.implementation.averageDeploymentTimeDays * 1500 // $1500 per day delay

  // Security incident costs (for vulnerable solutions)
  const securityIncidentCost = vendor.security.cveCount * 25000 // $25k per CVE in potential costs

  // Compliance gap costs
  const complianceGapCost = (100 - vendor.comparativeScores?.complianceCoverageScore || 80) * 1000

  return (
    (downtimeCost + integrationCost + opportunityCost + securityIncidentCost + complianceGapCost) *
    (projectionYears / 3)
  )
}

function calculateSecurityMetrics(
  vendor: NewVendorData,
  orgSize: OrgSizeId,
  industry: IndustryId,
  projectionYears: number,
): SecurityMetrics {
  const industryFactor = INDUSTRY_FACTORS[industry]

  // Breach probability reduction
  const breachProbabilityReduction = vendor.security.breachRiskReduction / 100

  // Expected annual loss calculation
  const baseBreachProbability = 0.28 // 28% annual breach probability baseline
  const expectedAnnualLoss = industryFactor.breachCostAverage * baseBreachProbability

  // Risk-adjusted savings
  const riskAdjustedSavings = expectedAnnualLoss * breachProbabilityReduction * projectionYears

  // Compliance coverage score
  const complianceCoverageScore =
    vendor.comparativeScores?.complianceCoverageScore ||
    vendor.complianceSupport.reduce((acc, comp) => acc + comp.automationPercent, 0) / vendor.complianceSupport.length

  return {
    breachProbabilityReduction: breachProbabilityReduction * 100,
    expectedAnnualLoss,
    riskAdjustedSavings,
    complianceCoverageScore,
    zeroTrustMaturityScore: vendor.security.zeroTrustMaturityScore,
    vulnerabilityExposure: vendor.security.vulnerabilityExposure,
  }
}

function calculateROIMetrics(
  vendor: NewVendorData,
  totalCosts: number,
  securityMetrics: SecurityMetrics,
  orgSize: OrgSizeId,
  industry: IndustryId,
  projectionYears: number,
): ROIMetrics {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]
  const industryFactor = INDUSTRY_FACTORS[industry]

  // Risk reduction benefits
  const riskReductionBenefit = securityMetrics.riskAdjustedSavings

  // Operational efficiency benefits
  const operationalSavings =
    ((orgConfig.devices * 75 * vendor.roiFactors.operationalEfficiencyGainPercent) / 100) * projectionYears

  // Compliance automation benefits
  const complianceSavings =
    orgConfig.devices * 35 * vendor.roiFactors.complianceAutomationSavingsFactor * projectionYears

  // Deployment speed benefits (time to value)
  const deploymentSpeedBenefit = (180 - vendor.implementation.averageDeploymentTimeDays) * 2000 // $2k per day saved

  // Total benefits
  const totalBenefits = riskReductionBenefit + operationalSavings + complianceSavings + deploymentSpeedBenefit

  // ROI calculations
  const netPresentValue = totalBenefits - totalCosts
  const benefitCostRatio = totalCosts > 0 ? totalBenefits / totalCosts : 0
  const internalRateOfReturn = benefitCostRatio > 1 ? (benefitCostRatio - 1) * 100 : 0

  // Risk-adjusted ROI (accounts for security posture)
  const riskAdjustmentFactor = vendor.security.zeroTrustMaturityScore / 100
  const riskAdjustedROI = internalRateOfReturn * riskAdjustmentFactor

  const paybackPeriodMonths =
    vendor.roiFactors.avgPaybackPeriodMonths ||
    (totalBenefits > 0 ? Math.max(1, (totalCosts / (totalBenefits / projectionYears)) * 12) : 48)

  return {
    paybackPeriodMonths,
    netPresentValue,
    internalRateOfReturn,
    totalBenefits,
    benefitCostRatio,
    riskAdjustedROI,
  }
}

function calculateOperationalMetrics(vendor: NewVendorData, orgSize: OrgSizeId): OperationalMetrics {
  const orgConfig = ORG_SIZE_CONFIGS[orgSize]

  // FTE reduction compared to baseline (2.5 FTE for traditional NAC)
  const baselineFTE = 2.5
  const fteReduction = Math.max(0, baselineFTE - vendor.tcoFactors.personnelCostFactor)

  // Efficiency gains
  const efficiencyGains = vendor.roiFactors.operationalEfficiencyGainPercent

  // Maintenance reduction (based on cloud-native vs on-premise)
  const maintenanceReduction = vendor.features.cloudAndIntegration["100% Cloud Native"]?.supported
    ? 85
    : vendor.implementation.complexityLevel === "low"
      ? 70
      : vendor.implementation.complexityLevel === "medium"
        ? 50
        : 25

  // Deployment time advantage (compared to 180-day baseline)
  const baselineDeploymentDays = 180
  const deploymentTimeAdvantage = Math.max(0, baselineDeploymentDays - vendor.implementation.averageDeploymentTimeDays)

  // Automation level
  const automationLevel =
    vendor.portnoxSpecificMetrics?.automatedRemediationRate || vendor.roiFactors.complianceAutomationSavingsFactor * 100

  return {
    fteReduction,
    efficiencyGains,
    maintenanceReduction,
    deploymentTimeAdvantage,
    automationLevel,
  }
}

export function useTcoCalculator() {
  const calculateSingleVendorTco = useMemo(() => {
    return (
      vendorId: VendorId,
      orgSizeId: OrgSizeId,
      industryId: IndustryId,
      projectionYears: number,
    ): TCOResult | null => {
      const vendor = getVendorDataById(vendorId)
      if (!vendor) {
        console.warn(`Vendor ${vendorId} not found`)
        return null
      }

      // Calculate cost components
      const softwareCosts = calculateLicensingCosts(vendor, orgSizeId, projectionYears)
      const hardwareCosts = vendor.tcoFactors.hardwareCostPerYear * projectionYears
      const implementationCosts = calculateImplementationCosts(vendor, orgSizeId, industryId)
      const operationalCosts = calculateOperationalCosts(vendor, orgSizeId, industryId, projectionYears)
      const supportCosts = softwareCosts * vendor.tcoFactors.supportCostFactor
      const hiddenCosts = calculateHiddenCosts(vendor, orgSizeId, industryId, projectionYears)

      const breakdown: TCOResultBreakdown = {
        software: softwareCosts,
        hardware: hardwareCosts,
        implementation: implementationCosts,
        operational: operationalCosts,
        support: supportCosts,
        hidden: hiddenCosts,
      }

      const totalTCO = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0)

      // Calculate metrics
      const securityMetrics = calculateSecurityMetrics(vendor, orgSizeId, industryId, projectionYears)
      const roiMetrics = calculateROIMetrics(vendor, totalTCO, securityMetrics, orgSizeId, industryId, projectionYears)
      const operationalMetrics = calculateOperationalMetrics(vendor, orgSizeId)

      // Compliance metrics
      const industryStandards = INDUSTRY_FACTORS[industryId].requiredStandards
      const coveredStandards = vendor.complianceSupport
        .filter(comp => industryStandards.includes(comp.standardId))
        .filter(comp => comp.coverageLevel === "Covered")
      
      const complianceMetrics = {
        coverageScore: securityMetrics.complianceCoverageScore,
        automationLevel: vendor.complianceSupport.reduce((acc, comp) => acc + comp.automationPercent, 0) / vendor.complianceSupport.length,
        auditReadiness: securityMetrics.complianceCoverageScore * 0.9,
        \
