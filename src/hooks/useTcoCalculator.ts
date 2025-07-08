"use client"

import { useMemo } from "react"
import type { OrgSizeId, IndustryId } from "@/types/common"
import type { VendorId } from "./useVendorData"

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
}

export interface TCOResult {
  vendorId: VendorId
  vendorName: string
  totalTCO: number
  breakdown: TCOResultBreakdown
  roiMetrics: ROIMetrics
  riskReduction: {
    breachProbabilityReduction: number
    expectedAnnualLoss: number
    riskAdjustedSavings: number
  }
  complianceMetrics: {
    coverageScore: number
    automationLevel: number
    auditReadiness: number
  }
  operationalMetrics: {
    fteReduction: number
    efficiencyGains: number
    maintenanceReduction: number
  }
}

// Organization size configurations
const ORG_SIZE_CONFIGS = {
  small_business: { devices: 250, users: 150, sites: 2 },
  mid_market: { devices: 1500, users: 800, sites: 5 },
  enterprise: { devices: 7500, users: 4000, sites: 15 },
  global_enterprise: { devices: 25000, users: 15000, sites: 50 },
} as const

// Industry risk and compliance factors
const INDUSTRY_FACTORS = {
  healthcare: {
    riskMultiplier: 2.2,
    complianceMultiplier: 1.8,
    breachCostAverage: 10930000,
    regulatoryPressure: "critical",
  },
  financial_services: {
    riskMultiplier: 2.5,
    complianceMultiplier: 2.0,
    breachCostAverage: 5850000,
    regulatoryPressure: "critical",
  },
  manufacturing: {
    riskMultiplier: 1.8,
    complianceMultiplier: 1.3,
    breachCostAverage: 4990000,
    regulatoryPressure: "high",
  },
  retail: {
    riskMultiplier: 1.5,
    complianceMultiplier: 1.2,
    breachCostAverage: 3280000,
    regulatoryPressure: "medium",
  },
  technology: {
    riskMultiplier: 1.6,
    complianceMultiplier: 1.1,
    breachCostAverage: 5040000,
    regulatoryPressure: "medium",
  },
  education: {
    riskMultiplier: 1.2,
    complianceMultiplier: 0.9,
    breachCostAverage: 3790000,
    regulatoryPressure: "low",
  },
  government: {
    riskMultiplier: 3.0,
    complianceMultiplier: 2.2,
    breachCostAverage: 4910000,
    regulatoryPressure: "critical",
  },
  energy_utilities: {
    riskMultiplier: 2.8,
    complianceMultiplier: 1.9,
    breachCostAverage: 6720000,
    regulatoryPressure: "critical",
  },
} as const

// Enhanced vendor TCO data based on comprehensive analysis
const VENDOR_TCO_DATA = {
  portnox: {
    name: "Portnox CLEAR",
    baseCosts: {
      software: 45000,
      hardware: 0,
      implementation: 15000,
      operational: 30000,
      support: 12000,
      hidden: 8000,
    },
    scalingFactor: 1.0,
    deploymentDays: 7,
    riskReduction: 87,
    complianceAutomation: 90,
    operationalEfficiency: 85,
  },
  cisco_ise: {
    name: "Cisco Identity Services Engine",
    baseCosts: {
      software: 85000,
      hardware: 120000,
      implementation: 150000,
      operational: 300000,
      support: 35000,
      hidden: 125000,
    },
    scalingFactor: 1.4,
    deploymentDays: 120,
    riskReduction: 65,
    complianceAutomation: 35,
    operationalEfficiency: 45,
  },
  aruba_clearpass: {
    name: "Aruba ClearPass Policy Manager",
    baseCosts: {
      software: 65000,
      hardware: 85000,
      implementation: 95000,
      operational: 180000,
      support: 25000,
      hidden: 65000,
    },
    scalingFactor: 1.2,
    deploymentDays: 90,
    riskReduction: 68,
    complianceAutomation: 45,
    operationalEfficiency: 58,
  },
  fortinac: {
    name: "FortiNAC",
    baseCosts: {
      software: 55000,
      hardware: 75000,
      implementation: 85000,
      operational: 150000,
      support: 22000,
      hidden: 55000,
    },
    scalingFactor: 1.1,
    deploymentDays: 75,
    riskReduction: 70,
    complianceAutomation: 50,
    operationalEfficiency: 62,
  },
  forescout: {
    name: "Forescout Platform",
    baseCosts: {
      software: 95000,
      hardware: 125000,
      implementation: 145000,
      operational: 240000,
      support: 35000,
      hidden: 95000,
    },
    scalingFactor: 1.3,
    deploymentDays: 105,
    riskReduction: 70,
    complianceAutomation: 65,
    operationalEfficiency: 68,
  },
  juniper_mist: {
    name: "Juniper Mist Access Assurance",
    baseCosts: {
      software: 35000,
      hardware: 80000,
      implementation: 45000,
      operational: 60000,
      support: 15000,
      hidden: 35000,
    },
    scalingFactor: 1.0,
    deploymentDays: 30,
    riskReduction: 75,
    complianceAutomation: 75,
    operationalEfficiency: 78,
  },
  extreme_nac: {
    name: "Extreme Networks ExtremeControl",
    baseCosts: {
      software: 35000,
      hardware: 25000,
      implementation: 35000,
      operational: 96000,
      support: 12000,
      hidden: 25000,
    },
    scalingFactor: 1.0,
    deploymentDays: 60,
    riskReduction: 55,
    complianceAutomation: 25,
    operationalEfficiency: 52,
  },
  cisco_meraki: {
    name: "Cisco Meraki Systems Manager",
    baseCosts: {
      software: 45000,
      hardware: 80000,
      implementation: 25000,
      operational: 72000,
      support: 15000,
      hidden: 45000,
    },
    scalingFactor: 1.0,
    deploymentDays: 45,
    riskReduction: 58,
    complianceAutomation: 35,
    operationalEfficiency: 68,
  },
  microsoft_nps: {
    name: "Microsoft Network Policy Server",
    baseCosts: {
      software: 66000,
      hardware: 25000,
      implementation: 35000,
      operational: 120000,
      support: 10000,
      hidden: 35000,
    },
    scalingFactor: 1.0,
    deploymentDays: 75,
    riskReduction: 62,
    complianceAutomation: 65,
    operationalEfficiency: 62,
  },
  packetfence: {
    name: "PacketFence Open Source NAC",
    baseCosts: {
      software: 15000,
      hardware: 40000,
      implementation: 85000,
      operational: 300000,
      support: 0,
      hidden: 125000,
    },
    scalingFactor: 1.0,
    deploymentDays: 180,
    riskReduction: 45,
    complianceAutomation: 15,
    operationalEfficiency: 38,
  },
  foxpass: {
    name: "Foxpass Cloud RADIUS",
    baseCosts: {
      software: 18000,
      hardware: 0,
      implementation: 5000,
      operational: 12000,
      support: 2000,
      hidden: 15000,
    },
    scalingFactor: 1.0,
    deploymentDays: 3,
    riskReduction: 35,
    complianceAutomation: 25,
    operationalEfficiency: 45,
  },
  securew2: {
    name: "SecureW2 Cloud PKI",
    baseCosts: {
      software: 40000,
      hardware: 0,
      implementation: 12000,
      operational: 24000,
      support: 5000,
      hidden: 25000,
    },
    scalingFactor: 1.0,
    deploymentDays: 14,
    riskReduction: 40,
    complianceAutomation: 35,
    operationalEfficiency: 52,
  },
  arista_agni: {
    name: "Arista AGNI",
    baseCosts: {
      software: 70000,
      hardware: 55000,
      implementation: 35000,
      operational: 96000,
      support: 15000,
      hidden: 35000,
    },
    scalingFactor: 1.0,
    deploymentDays: 42,
    riskReduction: 72,
    complianceAutomation: 65,
    operationalEfficiency: 72,
  },
} as const

export function useTcoCalculator() {
  const calculateSingleVendorTco = useMemo(() => {
    return (
      vendorId: VendorId,
      orgSizeId: OrgSizeId,
      industryId: IndustryId,
      projectionYears: number,
    ): TCOResult | null => {
      const vendorData = VENDOR_TCO_DATA[vendorId]
      if (!vendorData) return null

      const orgConfig = ORG_SIZE_CONFIGS[orgSizeId]
      const industryFactor = INDUSTRY_FACTORS[industryId]

      // Calculate scaling factor based on organization size
      const deviceScaleFactor = orgConfig.devices / 1500 // Base: mid-market
      const industryScaleFactor = industryFactor.complianceMultiplier

      // Calculate cost breakdown
      const breakdown: TCOResultBreakdown = {
        software: vendorData.baseCosts.software * deviceScaleFactor * projectionYears,
        hardware: vendorData.baseCosts.hardware * deviceScaleFactor,
        implementation: vendorData.baseCosts.implementation * industryScaleFactor,
        operational: vendorData.baseCosts.operational * deviceScaleFactor * projectionYears,
        support: vendorData.baseCosts.support * deviceScaleFactor * projectionYears,
        hidden: vendorData.baseCosts.hidden * deviceScaleFactor * projectionYears,
      }

      const totalTCO = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0)

      // Calculate risk reduction benefits
      const breachProbabilityReduction = vendorData.riskReduction
      const expectedAnnualLoss = industryFactor.breachCostAverage * 0.28 // 28% annual breach probability
      const riskAdjustedSavings = expectedAnnualLoss * (breachProbabilityReduction / 100) * projectionYears

      // Calculate operational benefits
      const operationalSavings = ((orgConfig.devices * 50 * vendorData.operationalEfficiency) / 100) * projectionYears
      const complianceSavings = ((orgConfig.devices * 25 * vendorData.complianceAutomation) / 100) * projectionYears

      const totalBenefits = riskAdjustedSavings + operationalSavings + complianceSavings
      const netPresentValue = totalBenefits - totalTCO
      const benefitCostRatio = totalTCO > 0 ? totalBenefits / totalTCO : 0
      const paybackPeriodMonths = totalBenefits > 0 ? Math.max(1, (totalTCO / totalBenefits) * 12) : 36

      return {
        vendorId,
        vendorName: vendorData.name,
        totalTCO,
        breakdown,
        roiMetrics: {
          paybackPeriodMonths,
          netPresentValue,
          internalRateOfReturn: benefitCostRatio > 1 ? (benefitCostRatio - 1) * 100 : 0,
          totalBenefits,
          benefitCostRatio,
        },
        riskReduction: {
          breachProbabilityReduction,
          expectedAnnualLoss,
          riskAdjustedSavings,
        },
        complianceMetrics: {
          coverageScore: vendorData.complianceAutomation,
          automationLevel: vendorData.complianceAutomation,
          auditReadiness: vendorData.complianceAutomation * 0.9,
        },
        operationalMetrics: {
          fteReduction: 2.0 - vendorData.baseCosts.operational / 120000, // Baseline 2.0 FTE
          efficiencyGains: vendorData.operationalEfficiency,
          maintenanceReduction: vendorData.deploymentDays <= 30 ? 80 : vendorData.deploymentDays <= 90 ? 60 : 40,
        },
      }
    }
  }, [])

  const calculateAllSelectedVendorsTco = useMemo(() => {
    return ({
      vendorIds,
      orgSizeId,
      industryId,
      projectionYears,
    }: {
      vendorIds: VendorId[]
      orgSizeId: OrgSizeId
      industryId: IndustryId
      projectionYears: number
    }): TCOResult[] => {
      const results: TCOResult[] = []

      for (const vendorId of vendorIds) {
        const result = calculateSingleVendorTco(vendorId, orgSizeId, industryId, projectionYears)
        if (result) {
          results.push(result)
        }
      }

      // Sort by total TCO (ascending)
      return results.sort((a, b) => a.totalTCO - b.totalTCO)
    }
  }, [calculateSingleVendorTco])

  return {
    calculateSingleVendorTco,
    calculateAllSelectedVendorsTco,
  }
}
