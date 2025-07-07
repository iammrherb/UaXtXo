import { getVendorData, type VendorData } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  deviceCount: number
  timeframe: number
  industry: string
  hasExistingNAC: boolean
  existingVendor: string
  annualRevenue: number
  securityBudget: number
  complianceRequirements: string[]
  deploymentComplexity: string
  geographicScope: string
  integrationRequirements: string[]
  businessCriticality: string
  selectedVendors?: string[]
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
  fortinet: {
    deviceCost: 85,
    supportMultiplier: 0.18,
    implementationBase: 60000,
    trainingCost: 12000,
    maintenanceMultiplier: 0.15,
    automationLevel: 70,
    fteSavings: 1.5,
    securityScore: 82,
    complianceScore: 85,
    implementationWeeks: 10,
  },
  microsoft: {
    deviceCost: 45,
    supportMultiplier: 0.15,
    implementationBase: 40000,
    trainingCost: 8000,
    maintenanceMultiplier: 0.12,
    automationLevel: 60,
    fteSavings: 1.0,
    securityScore: 78,
    complianceScore: 88,
    implementationWeeks: 8,
  },
  securew2: {
    deviceCost: 52,
    supportMultiplier: 0.16,
    implementationBase: 20000,
    trainingCost: 6000,
    maintenanceMultiplier: 0.14,
    automationLevel: 80,
    fteSavings: 1.3,
    securityScore: 75,
    complianceScore: 80,
    implementationWeeks: 6,
  },
  foxpass: {
    deviceCost: 35,
    supportMultiplier: 0.12,
    implementationBase: 15000,
    trainingCost: 4000,
    maintenanceMultiplier: 0.1,
    automationLevel: 85,
    fteSavings: 1.1,
    securityScore: 72,
    complianceScore: 75,
    implementationWeeks: 4,
  },
  pulse: {
    deviceCost: 110,
    supportMultiplier: 0.25,
    implementationBase: 120000,
    trainingCost: 20000,
    maintenanceMultiplier: 0.2,
    automationLevel: 55,
    fteSavings: 0.8,
    securityScore: 80,
    complianceScore: 83,
    implementationWeeks: 14,
  },
}

export function calculateVendorTCO(vendorId: string, config: CalculationConfiguration): CalculationResult {
  const vendorData = getVendorData(vendorId)
  if (!vendorData) {
    throw new Error(`Vendor ${vendorId} not found`)
  }

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

  // Calculate costs
  const annualLicenseCost = config.deviceCount * pricing.deviceCost
  const annualSupportCost = annualLicenseCost * pricing.supportMultiplier
  const implementationCost = pricing.implementationBase + config.deviceCount * 15
  const trainingCost = pricing.trainingCost
  const annualMaintenanceCost = annualLicenseCost * pricing.maintenanceMultiplier

  // Hardware costs (mainly for on-premise solutions)
  const hardwareCost =
    vendorId === "portnox" || vendorId === "foxpass" || vendorId === "securew2"
      ? 0
      : Math.max(25000, config.deviceCount * 8)

  // Operational savings
  const avgFteCost = 150000
  const fteSaved = pricing.fteSavings * (config.deviceCount / 1000)
  const annualOpsSaving = fteSaved * avgFteCost

  // Total costs
  const totalLicensing = annualLicenseCost * config.timeframe
  const totalSupport = annualSupportCost * config.timeframe
  const totalMaintenance = annualMaintenanceCost * config.timeframe
  const totalOperational = (avgFteCost * 0.5 - annualOpsSaving) * config.timeframe

  const totalCost =
    totalLicensing +
    totalSupport +
    implementationCost +
    trainingCost +
    totalMaintenance +
    hardwareCost +
    Math.max(0, totalOperational)

  // ROI calculations
  const totalSavings = annualOpsSaving * config.timeframe
  const netPresentValue = totalSavings - totalCost
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
      operational: Math.max(0, totalOperational),
    },
    roi: {
      percentage: roiPercentage,
      annualSavings: annualOpsSaving,
      paybackMonths: Math.round(paybackMonths),
      netPresentValue,
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

// Add the missing calculateTCO export that's being imported elsewhere
export function calculateTCO(config: CalculationConfiguration): CalculationResult[] {
  const vendorIds = config.selectedVendors || ["portnox", "cisco", "aruba", "fortinet", "microsoft"]

  return vendorIds.map((vendorId) => {
    try {
      return calculateVendorTCO(vendorId, config)
    } catch (error) {
      console.warn(`Failed to calculate TCO for ${vendorId}:`, error)
      // Return a default result to prevent crashes
      return {
        vendor: vendorId,
        vendorId,
        vendorName: vendorId.charAt(0).toUpperCase() + vendorId.slice(1),
        vendorData: { name: vendorId, id: vendorId } as VendorData,
        total: 0,
        totalCost: 0,
        breakdown: {
          licensing: 0,
          hardware: 0,
          implementation: 0,
          support: 0,
          training: 0,
          maintenance: 0,
          operational: 0,
        },
        roi: {
          percentage: 0,
          annualSavings: 0,
          paybackMonths: 0,
          netPresentValue: 0,
        },
        risk: {
          securityScore: 0,
          complianceScore: 0,
          breachReduction: 0,
          operationalRisk: 0,
        },
        ops: {
          fteSaved: 0,
          annualOpsSaving: 0,
          automationLevel: 0,
          maintenanceHours: 0,
        },
        timeline: {
          implementationWeeks: 0,
          timeToValue: 0,
          migrationRisk: "unknown",
        },
      }
    }
  })
}

// Industry-specific multipliers for risk calculations
export const INDUSTRY_RISK_MULTIPLIERS = {
  healthcare: { breach: 1.5, compliance: 1.8, downtime: 2.0 },
  finance: { breach: 2.0, compliance: 2.2, downtime: 2.5 },
  government: { breach: 1.8, compliance: 2.0, downtime: 1.8 },
  education: { breach: 1.2, compliance: 1.4, downtime: 1.5 },
  manufacturing: { breach: 1.4, compliance: 1.3, downtime: 2.2 },
  retail: { breach: 1.3, compliance: 1.2, downtime: 1.8 },
  technology: { breach: 1.6, compliance: 1.5, downtime: 2.0 },
  other: { breach: 1.0, compliance: 1.0, downtime: 1.0 },
}

// Calculate industry-adjusted risk costs
export function calculateRiskCosts(
  industry: string,
  breachProbability: number,
  complianceViolationRisk: number,
  downtimeHours: number,
  downtimeCostPerHour: number,
) {
  const multipliers =
    INDUSTRY_RISK_MULTIPLIERS[industry as keyof typeof INDUSTRY_RISK_MULTIPLIERS] || INDUSTRY_RISK_MULTIPLIERS.other

  const avgBreachCost = 4350000 * multipliers.breach
  const avgComplianceViolationCost = 500000 * multipliers.compliance
  const adjustedDowntimeCost = downtimeCostPerHour * multipliers.downtime

  return {
    annualBreachRisk: (avgBreachCost * breachProbability) / 100,
    annualComplianceRisk: (avgComplianceViolationCost * complianceViolationRisk) / 100,
    annualDowntimeCost: downtimeHours * adjustedDowntimeCost,
    totalAnnualRisk:
      (avgBreachCost * breachProbability) / 100 +
      (avgComplianceViolationCost * complianceViolationRisk) / 100 +
      downtimeHours * adjustedDowntimeCost,
  }
}

// Calculate operational savings from NAC implementation
export function calculateOperationalSavings(
  devices: number,
  adminHoursPerWeek: number,
  automationLevel: number,
  avgHourlyRate = 150,
) {
  const currentAnnualAdminCost = adminHoursPerWeek * 52 * avgHourlyRate
  const automationSavings = currentAnnualAdminCost * (automationLevel / 100)
  const incidentReductionSavings = devices * 2 * avgHourlyRate // 2 hours saved per device per year
  const complianceReportingSavings = 40 * 52 * avgHourlyRate * 0.7 // 70% reduction in compliance reporting time

  return {
    automationSavings,
    incidentReductionSavings,
    complianceReportingSavings,
    totalAnnualSavings: automationSavings + incidentReductionSavings + complianceReportingSavings,
  }
}

// Export all types
export type { VendorData }
