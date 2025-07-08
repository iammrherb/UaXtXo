"use client"

import { useMemo } from "react"
import type { VendorId } from "./useVendorData"
import { useVendorData } from "./useVendorData"
import type { IndustryId } from "./useIndustryData"
import { useIndustryData } from "./useIndustryData"

export type OrgSizeId = "small_business" | "mid_market" | "enterprise" | "global_enterprise"

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

export interface TCOResult {
  vendorId: VendorId
  vendorName: string
  totalTCO: number
  breakdown: TCOResultBreakdown
  roiMetrics: ROIMetrics
  securityMetrics: SecurityMetrics
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

export function useTcoCalculator() {
  const { getVendorById } = useVendorData()
  const { getIndustryById } = useIndustryData()

  const calculateSingleVendorTco = useMemo(() => {
    return (
      vendorId: VendorId,
      orgSizeId: OrgSizeId,
      industryId: IndustryId,
      projectionYears: number,
    ): TCOResult | null => {
      const vendor = getVendorById(vendorId)
      const industry = getIndustryById(industryId)

      if (!vendor || !industry) {
        console.warn(`Vendor ${vendorId} or industry ${industryId} not found`)
        return null
      }

      const orgConfig = ORG_SIZE_CONFIGS[orgSizeId]
      const industryFactor = INDUSTRY_FACTORS[industryId]

      // Calculate cost components
      const softwareCosts = vendor.tcoFactors.software * projectionYears
      const hardwareCosts = vendor.tcoFactors.hardware * projectionYears
      const implementationCosts = vendor.tcoFactors.implementation * industryFactor.complianceMultiplier
      const operationalCosts = vendor.tcoFactors.operational * projectionYears * industryFactor.complianceMultiplier
      const supportCosts = vendor.tcoFactors.support * projectionYears
      const hiddenCosts = vendor.tcoFactors.hidden * projectionYears

      const breakdown: TCOResultBreakdown = {
        software: softwareCosts,
        hardware: hardwareCosts,
        implementation: implementationCosts,
        operational: operationalCosts,
        support: supportCosts,
        hidden: hiddenCosts,
      }

      const totalTCO = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0)

      // Calculate security metrics
      const breachProbabilityReduction = (vendor.securityScore / 100) * 0.9 // Max 90% reduction
      const expectedAnnualLoss = industry.avgBreachCost * 0.28 // 28% annual breach probability
      const riskAdjustedSavings = expectedAnnualLoss * breachProbabilityReduction * projectionYears

      const securityMetrics: SecurityMetrics = {
        breachProbabilityReduction: breachProbabilityReduction * 100,
        expectedAnnualLoss,
        riskAdjustedSavings,
        complianceCoverageScore: vendor.complianceScore,
        zeroTrustMaturityScore: vendor.securityScore,
        vulnerabilityExposure: vendor.securityScore > 90 ? "Very Low" : vendor.securityScore > 80 ? "Low" : "Medium",
      }

      // Calculate ROI metrics
      const operationalSavings = orgConfig.devices * 75 * projectionYears // $75 per device per year
      const complianceSavings = orgConfig.devices * 35 * projectionYears // $35 per device per year
      const totalBenefits = riskAdjustedSavings + operationalSavings + complianceSavings

      const roiMetrics: ROIMetrics = {
        paybackPeriodMonths: totalBenefits > 0 ? Math.max(1, (totalTCO / (totalBenefits / projectionYears)) * 12) : 48,
        netPresentValue: totalBenefits - totalTCO,
        internalRateOfReturn: totalTCO > 0 ? (totalBenefits / totalTCO - 1) * 100 : 0,
        totalBenefits,
        benefitCostRatio: totalTCO > 0 ? totalBenefits / totalTCO : 0,
        riskAdjustedROI: totalTCO > 0 ? ((totalBenefits * (vendor.securityScore / 100)) / totalTCO - 1) * 100 : 0,
      }

      return {
        vendorId,
        vendorName: vendor.name,
        totalTCO,
        breakdown,
        roiMetrics,
        securityMetrics,
        complianceMetrics: {
          coverageScore: vendor.complianceScore,
          automationLevel: vendor.complianceScore * 0.8, // Estimate automation level
          auditReadiness: vendor.complianceScore * 0.9,
          standardsCovered: industry.complianceRequirements,
        },
        marketPosition: {
          ranking: vendor.id === "portnox" ? 1 : Math.floor(Math.random() * 10) + 2,
          percentileSavings: vendor.id === "portnox" ? 67 : Math.floor(Math.random() * 30) + 10,
          competitiveAdvantage: vendor.strengths.slice(0, 3),
        },
      }
    }
  }, [getVendorById, getIndustryById])

  const calculateMultiVendorComparison = useMemo(() => {
    return (
      vendorIds: VendorId[],
      orgSizeId: OrgSizeId,
      industryId: IndustryId,
      projectionYears: number,
    ): TCOResult[] => {
      return vendorIds
        .map((vendorId) => calculateSingleVendorTco(vendorId, orgSizeId, industryId, projectionYears))
        .filter((result): result is TCOResult => result !== null)
        .sort((a, b) => a.totalTCO - b.totalTCO)
    }
  }, [calculateSingleVendorTco])

  return {
    calculateSingleVendorTco,
    calculateMultiVendorComparison,
    ORG_SIZE_CONFIGS,
    INDUSTRY_FACTORS,
  }
}
