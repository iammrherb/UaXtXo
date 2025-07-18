import { ComprehensiveVendorDatabase, type VendorData } from "./comprehensive-vendor-data"

export interface CalculationConfiguration {
  devices: number
  users: number
  years: number
  industry: string
  companySize: string
  securityLevel: string
  complianceRequirements: string[]
  currentSolution: string
  deploymentComplexity: string
  supportLevel: string
  integrationRequirements: string[]
  geographicScope: string
  budgetConstraints: string
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
  juniper: {
    deviceCost: 70,
    supportMultiplier: 0.2,
    implementationBase: 55000,
    trainingCost: 10000,
    maintenanceMultiplier: 0.15,
    automationLevel: 78,
    fteSavings: 1.6,
    securityScore: 83,
    complianceScore: 86,
    implementationWeeks: 11,
  },
  arista: {
    deviceCost: 65,
    supportMultiplier: 0.18,
    implementationBase: 45000,
    trainingCost: 9000,
    maintenanceMultiplier: 0.13,
    automationLevel: 75,
    fteSavings: 1.4,
    securityScore: 80,
    complianceScore: 82,
    implementationWeeks: 9,
  },
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

  // Calculate costs
  const annualLicenseCost = config.devices * pricing.deviceCost
  const annualSupportCost = annualLicenseCost * pricing.supportMultiplier
  const implementationCost = pricing.implementationBase + config.devices * 15
  const trainingCost = pricing.trainingCost
  const annualMaintenanceCost = annualLicenseCost * pricing.maintenanceMultiplier

  // Hardware costs (mainly for on-premise solutions)
  const hardwareCost =
    vendorId === "portnox" || vendorId === "foxpass" || vendorId === "securew2"
      ? 0
      : Math.max(25000, config.devices * 8)

  // Operational savings
  const avgFteCost = 150000
  const fteSaved = pricing.fteSavings * (config.devices / 1000)
  const annualOpsSaving = fteSaved * avgFteCost

  // Total costs
  const totalLicensing = annualLicenseCost * config.years
  const totalSupport = annualSupportCost * config.years
  const totalMaintenance = annualMaintenanceCost * config.years
  const totalOperational = (avgFteCost * 0.5 - annualOpsSaving) * config.years

  const totalCost =
    totalLicensing +
    totalSupport +
    implementationCost +
    trainingCost +
    totalMaintenance +
    hardwareCost +
    Math.max(0, totalOperational)

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
      operational: Math.max(0, totalOperational),
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
