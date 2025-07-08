// lib/calculators/comprehensive-tco-calculator.ts

import {
  COMPREHENSIVE_VENDOR_DATA,
  INDUSTRIES,
  MIGRATION_COSTS,
  INDUSTRY_ROI,
} from "../vendors/comprehensive-vendor-data"

export interface TCOCalculationParams {
  vendorKey: string
  deviceCount: number
  timeframe: 1 | 3 | 5
  industry: string
  deploymentModel: "CLOUD" | "HYBRID" | "ON_PREMISE"
  hasExistingNAC: boolean
  currentVendor?: string
  includeCompliance: boolean
  includeRiskReduction: boolean
}

export interface DetailedCostBreakdown {
  software: {
    base: number
    additionalModules: number
    support: number
    training: number
    total: number
  }
  hardware: {
    appliances: number
    infrastructure: number
    networking: number
    refresh: number
    total: number
  }
  implementation: {
    professionalServices: number
    deployment: number
    migration: number
    training: number
    total: number
  }
  operational: {
    fteRequired: number
    fteCost: number
    trainingCost: number
    certificationCost: number
    maintenanceWindows: number
    total: number
  }
  hidden: {
    downtime: number
    integrationCosts: number
    scalingCosts: number
    vendorLockIn: number
    complexity: number
    total: number
  }
  migration: {
    parallelOperation: number
    policyMigration: number
    deviceReEnrollment: number
    testingValidation: number
    total: number
  }
  compliance: {
    automationSavings: number
    auditCosts: number
    violationRisk: number
    certificationCosts: number
    total: number
  }
  riskReduction: {
    breachPrevention: number
    insuranceReduction: number
    incidentResponse: number
    reputationProtection: number
    total: number
  }
  totalCost: number
  totalBenefit: number
  netCost: number
  roi: number
  paybackPeriod: number
}

export class ComprehensiveTCOCalculator {
  private params: TCOCalculationParams
  private vendor: (typeof COMPREHENSIVE_VENDOR_DATA)[keyof typeof COMPREHENSIVE_VENDOR_DATA]
  private industry: (typeof INDUSTRIES)[keyof typeof INDUSTRIES]
  private scaleFactor: number

  constructor(params: TCOCalculationParams) {
    this.params = params
    this.vendor = COMPREHENSIVE_VENDOR_DATA[params.vendorKey]
    this.industry = INDUSTRIES[params.industry]
    this.scaleFactor = params.deviceCount / 500 // Base calculations are for 500 devices
  }

  calculate(): DetailedCostBreakdown {
    const baseCosts = this.vendor.costs[this.params.timeframe]

    // Scale all costs based on device count
    const software = this.calculateSoftwareCosts(baseCosts.software)
    const hardware = this.calculateHardwareCosts(baseCosts.hardware)
    const implementation = this.calculateImplementationCosts(baseCosts.implementation)
    const operational = this.calculateOperationalCosts(baseCosts.operational)
    const hidden = this.calculateHiddenCosts(baseCosts.hidden)
    const migration = this.calculateMigrationCosts()
    const compliance = this.params.includeCompliance ? this.calculateComplianceCosts() : this.zeroCosts()
    const riskReduction = this.params.includeRiskReduction ? this.calculateRiskReduction() : this.zeroCosts()

    const totalCost =
      software.total + hardware.total + implementation.total + operational.total + hidden.total + migration.total

    const totalBenefit = compliance.total + riskReduction.total
    const netCost = totalCost - totalBenefit
    const roi = totalBenefit > 0 ? ((totalBenefit - totalCost) / totalCost) * 100 : 0
    const paybackPeriod =
      totalCost > 0 && totalBenefit > 0 ? (totalCost / (totalBenefit / this.params.timeframe)) * 365 : 0 // Days

    return {
      software,
      hardware,
      implementation,
      operational,
      hidden,
      migration,
      compliance,
      riskReduction,
      totalCost,
      totalBenefit,
      netCost,
      roi,
      paybackPeriod,
    }
  }

  private calculateSoftwareCosts(baseSoftware: any) {
    const scaled = this.scale(baseSoftware.base || 0)
    const modules = this.scale(baseSoftware.additionalModules || 0)
    const support = this.scale(baseSoftware.support || 0)
    const training = this.scale(baseSoftware.training || 0)

    // Add complexity multipliers for certain vendors
    let complexityMultiplier = 1
    if (this.params.vendorKey === "CISCO_ISE") {
      complexityMultiplier = 1.2 // 20% overhead for licensing complexity
    }

    return {
      base: scaled * complexityMultiplier,
      additionalModules: modules,
      support,
      training,
      total: scaled * complexityMultiplier + modules + support + training,
    }
  }

  private calculateHardwareCosts(baseHardware: any) {
    // Cloud vendors have no hardware costs
    if (this.vendor.deploymentModels[this.params.deploymentModel]?.available === false) {
      return this.zeroCosts()
    }

    const appliances = this.scale(baseHardware.appliances || 0)
    const infrastructure = this.scale(baseHardware.infrastructure || 0)
    const networking = this.scale(baseHardware.networking || 0)
    const refresh = this.params.timeframe >= 3 ? this.scale(baseHardware.refresh || 0) : 0

    return {
      appliances,
      infrastructure,
      networking,
      refresh,
      total: appliances + infrastructure + networking + refresh,
    }
  }

  private calculateImplementationCosts(baseImplementation: any) {
    const professionalServices = this.scale(baseImplementation.professionalServices || 0)
    const deployment = this.scale(baseImplementation.deployment || 0)
    const migration = this.scale(baseImplementation.migration || 0)
    const training = this.scale(baseImplementation.training || 0)

    // Add industry-specific complexity
    let industryMultiplier = 1
    if (this.industry.riskProfile === "CRITICAL") {
      industryMultiplier = 1.3 // 30% more for critical industries
    }

    return {
      professionalServices: professionalServices * industryMultiplier,
      deployment: deployment * industryMultiplier,
      migration,
      training,
      total: (professionalServices + deployment) * industryMultiplier + migration + training,
    }
  }

  private calculateOperationalCosts(baseOperational: any) {
    const fteRequired = baseOperational.fteRequired || 0
    const avgSalary = baseOperational.avgSalary || 120000
    const fteCost = fteRequired * avgSalary * this.params.timeframe
    const trainingCost = this.scale(baseOperational.trainingCost || 0)
    const certificationCost = this.scale(baseOperational.certificationCost || 0)

    // Calculate maintenance window costs (downtime)
    let maintenanceWindows = 0
    if (this.params.vendorKey !== "PORTNOX" && this.params.vendorKey !== "FOXPASS") {
      // Traditional vendors require maintenance windows
      maintenanceWindows = 50000 * this.params.timeframe * this.scaleFactor
    }

    return {
      fteRequired,
      fteCost: this.scale(fteCost),
      trainingCost,
      certificationCost,
      maintenanceWindows,
      total: this.scale(fteCost) + trainingCost + certificationCost + maintenanceWindows,
    }
  }

  private calculateHiddenCosts(baseHidden: any) {
    const downtime = this.scale(baseHidden?.downtime || 0)
    const integrationCosts = this.scale(baseHidden?.integrationCosts || 0)
    const scalingCosts = this.scale(baseHidden?.scalingCosts || 0)

    // Calculate vendor lock-in costs
    let vendorLockIn = 0
    if (this.vendor.vendorLockIn === "EXTREME") {
      vendorLockIn = 100000 * this.params.timeframe * this.scaleFactor
    } else if (this.vendor.vendorLockIn === "HIGH") {
      vendorLockIn = 50000 * this.params.timeframe * this.scaleFactor
    } else if (this.vendor.vendorLockIn === "MODERATE") {
      vendorLockIn = 25000 * this.params.timeframe * this.scaleFactor
    }

    // Complexity costs
    const complexity = this.scale(baseHidden?.complexity || 0)

    return {
      downtime,
      integrationCosts,
      scalingCosts,
      vendorLockIn,
      complexity,
      total: downtime + integrationCosts + scalingCosts + vendorLockIn + complexity,
    }
  }

  private calculateMigrationCosts() {
    if (!this.params.hasExistingNAC) {
      // Implementing NAC from scratch
      const migrationFactors = MIGRATION_COSTS.FROM_NO_NAC.factors
      const portnoxAdvantage = MIGRATION_COSTS.FROM_NO_NAC.portnoxAdvantage

      if (this.params.vendorKey === "PORTNOX") {
        return {
          parallelOperation: 0,
          policyMigration: 0,
          deviceReEnrollment: this.scale(portnoxAdvantage.reduced.networkReadiness),
          testingValidation: this.scale(portnoxAdvantage.reduced.pilotTesting),
          total: this.scale(
            portnoxAdvantage.reduced.networkReadiness +
              portnoxAdvantage.reduced.pilotTesting +
              portnoxAdvantage.reduced.userTraining,
          ),
        }
      } else {
        return {
          parallelOperation: this.scale(migrationFactors.certificateInfrastructure),
          policyMigration: this.scale(migrationFactors.processDocumentation),
          deviceReEnrollment: this.scale(migrationFactors.userTraining),
          testingValidation: this.scale(migrationFactors.pilotTesting),
          total: this.scale(Object.values(migrationFactors).reduce((a, b) => a + b, 0)),
        }
      }
    } else {
      // Migrating from existing NAC
      const migrationFactors = MIGRATION_COSTS.FROM_EXISTING_NAC.factors
      const portnoxAdvantage = MIGRATION_COSTS.FROM_EXISTING_NAC.portnoxAdvantage

      if (this.params.vendorKey === "PORTNOX") {
        return {
          parallelOperation: this.scale(portnoxAdvantage.reduced.parallelOperation),
          policyMigration: 0, // Automated
          deviceReEnrollment: 0, // Automated
          testingValidation: this.scale(portnoxAdvantage.reduced.testingValidation),
          total: this.scale(
            portnoxAdvantage.reduced.parallelOperation +
              portnoxAdvantage.reduced.integrationRework +
              portnoxAdvantage.reduced.testingValidation,
          ),
        }
      } else {
        return {
          parallelOperation: this.scale(migrationFactors.parallelOperation),
          policyMigration: this.scale(migrationFactors.policyMigration),
          deviceReEnrollment: this.scale(migrationFactors.deviceReEnrollment),
          testingValidation: this.scale(migrationFactors.testingValidation),
          total: this.scale(Object.values(migrationFactors).reduce((a, b) => a + b, 0)),
        }
      }
    }
  }

  private calculateComplianceCosts() {
    const industryROI = INDUSTRY_ROI[this.params.industry]
    if (!industryROI) return this.zeroCosts()

    // Calculate compliance automation savings
    const automationSavings =
      this.params.vendorKey === "PORTNOX"
        ? this.scale(industryROI.portnoxBenefits.complianceAutomation) * this.params.timeframe
        : this.scale(industryROI.portnoxBenefits.complianceAutomation * 0.3) * this.params.timeframe

    // Audit cost reduction
    const auditCosts = this.params.vendorKey === "PORTNOX" ? this.scale(50000) * this.params.timeframe : 0

    // Violation risk reduction
    const violationRisk =
      this.params.vendorKey === "PORTNOX"
        ? this.scale(100000) * this.params.timeframe
        : this.scale(25000) * this.params.timeframe

    return {
      automationSavings,
      auditCosts,
      violationRisk,
      certificationCosts: 0,
      total: automationSavings + auditCosts + violationRisk,
    }
  }

  private calculateRiskReduction() {
    const industryROI = INDUSTRY_ROI[this.params.industry]
    if (!industryROI) return this.zeroCosts()

    // Breach prevention value
    const breachPrevention =
      this.params.vendorKey === "PORTNOX"
        ? this.scale(industryROI.portnoxBenefits.breachPrevention) * this.params.timeframe
        : this.scale(industryROI.portnoxBenefits.breachPrevention * 0.5) * this.params.timeframe

    // Insurance premium reduction
    const insuranceReduction =
      this.params.vendorKey === "PORTNOX"
        ? this.scale(75000) * this.params.timeframe
        : this.scale(25000) * this.params.timeframe

    // Incident response cost reduction
    const incidentResponse =
      this.params.vendorKey === "PORTNOX"
        ? this.scale(100000) * this.params.timeframe
        : this.scale(40000) * this.params.timeframe

    // Reputation protection value
    const reputationProtection = this.scale(200000) * this.params.timeframe

    return {
      breachPrevention,
      insuranceReduction,
      incidentResponse,
      reputationProtection,
      total: breachPrevention + insuranceReduction + incidentResponse + reputationProtection,
    }
  }

  private scale(value: number): number {
    return Math.round(value * this.scaleFactor)
  }

  private zeroCosts() {
    return {
      appliances: 0,
      infrastructure: 0,
      networking: 0,
      refresh: 0,
      total: 0,
    }
  }

  // Comparison methods
  compareVendors(vendorKeys: string[]): Record<string, DetailedCostBreakdown> {
    const results: Record<string, DetailedCostBreakdown> = {}

    vendorKeys.forEach((vendorKey) => {
      const calculator = new ComprehensiveTCOCalculator({
        ...this.params,
        vendorKey,
      })
      results[vendorKey] = calculator.calculate()
    })

    return results
  }

  generateExecutiveSummary(comparison: Record<string, DetailedCostBreakdown>) {
    const portnoxData = comparison["PORTNOX"]
    const savings: Record<string, number> = {}
    const percentSavings: Record<string, number> = {}

    Object.entries(comparison).forEach(([vendorKey, data]) => {
      if (vendorKey !== "PORTNOX") {
        savings[vendorKey] = data.totalCost - portnoxData.totalCost
        percentSavings[vendorKey] = Math.round((savings[vendorKey] / data.totalCost) * 100)
      }
    })

    return {
      portnoxTCO: portnoxData.totalCost,
      portnoxROI: portnoxData.roi,
      portnoxPayback: portnoxData.paybackPeriod,
      savings,
      percentSavings,
      recommendation: this.generateRecommendation(comparison),
    }
  }

  private generateRecommendation(comparison: Record<string, DetailedCostBreakdown>): string {
    const portnoxData = comparison["PORTNOX"]
    const avgSavings =
      Object.values(comparison)
        .filter((_, index) => Object.keys(comparison)[index] !== "PORTNOX")
        .reduce((acc, data) => acc + (data.totalCost - portnoxData.totalCost), 0) /
      (Object.keys(comparison).length - 1)

    if (avgSavings > 500000) {
      return `Portnox CLEAR delivers exceptional value with ${Math.round(avgSavings / 1000)}K average savings 
        over ${this.params.timeframe} years. The combination of zero infrastructure costs, 
        95% faster deployment, and ${Math.round(portnoxData.roi)}% ROI makes it the clear choice 
        for ${this.industry.name} organizations.`
    } else if (avgSavings > 200000) {
      return `Portnox CLEAR provides substantial cost savings of ${Math.round(avgSavings / 1000)}K 
        while delivering superior security capabilities. The cloud-native architecture eliminates 
        hardware costs and reduces operational overhead by 90%, making it ideal for 
        modern ${this.industry.name} environments.`
    } else {
      return `Portnox CLEAR offers competitive pricing with ${Math.round(avgSavings / 1000)}K savings, 
        but more importantly delivers 95% faster time to value and eliminates vendor lock-in. 
        For ${this.industry.name} organizations prioritizing agility and innovation, 
        Portnox is the recommended solution.`
    }
  }
}

// Helper function to get all vendor comparisons
export function getAllVendorComparisons(params: Omit<TCOCalculationParams, "vendorKey">) {
  const vendorKeys = Object.keys(COMPREHENSIVE_VENDOR_DATA)
  const calculator = new ComprehensiveTCOCalculator({
    ...params,
    vendorKey: "PORTNOX", // Default for base calculator
  })

  return calculator.compareVendors(vendorKeys)
}

// Industry-specific recommendations
export function getIndustryRecommendations(industry: string, deviceCount: number) {
  const industryData = INDUSTRIES[industry]
  const recommendations = []

  if (industryData.specificRequirements.medicalDeviceManagement) {
    recommendations.push({
      priority: "CRITICAL",
      title: "Medical Device Security",
      description: "Portnox excels at agentless IoT/medical device profiling and isolation",
      vendors: {
        recommended: ["PORTNOX", "FORESCOUT"],
        avoid: ["MICROSOFT_NPS", "FOXPASS", "MERAKI_ACCESS_CONTROL"],
      },
    })
  }

  if (industryData.specificRequirements.otItConvergence) {
    recommendations.push({
      priority: "HIGH",
      title: "OT/IT Convergence",
      description: "Critical for manufacturing environments with industrial systems",
      vendors: {
        recommended: ["PORTNOX", "FORESCOUT", "CISCO_ISE"],
        avoid: ["FOXPASS", "SECUREW2", "MERAKI_ACCESS_CONTROL"],
      },
    })
  }

  if (industryData.specificRequirements.byodManagement) {
    recommendations.push({
      priority: "HIGH",
      title: "BYOD at Scale",
      description: "Self-service onboarding and certificate management essential",
      vendors: {
        recommended: ["PORTNOX", "ARUBA_CLEARPASS"],
        avoid: ["MICROSOFT_NPS", "PACKETFENCE"],
      },
    })
  }

  return recommendations
}

// Migration complexity calculator
export function calculateMigrationComplexity(currentVendor: string | null, targetVendor: string, deviceCount: number) {
  const complexityFactors = {
    deviceReEnrollment: 0,
    policyMigration: 0,
    integrationRework: 0,
    userTraining: 0,
    parallelOperation: 0,
  }

  if (!currentVendor) {
    // Green field deployment
    complexityFactors.deviceReEnrollment = deviceCount * 0.5 // Hours per device
    complexityFactors.userTraining = deviceCount * 0.2
    complexityFactors.integrationRework = 100
  } else {
    // Migration from existing
    complexityFactors.deviceReEnrollment = deviceCount * 1 // Re-enrollment takes longer
    complexityFactors.policyMigration = 200
    complexityFactors.integrationRework = 300
    complexityFactors.userTraining = deviceCount * 0.3
    complexityFactors.parallelOperation = 500
  }

  // Portnox reduces complexity significantly
  if (targetVendor === "PORTNOX") {
    Object.keys(complexityFactors).forEach((key) => {
      complexityFactors[key] *= 0.2 // 80% reduction
    })
  }

  const totalHours = Object.values(complexityFactors).reduce((a, b) => a + b, 0)
  const totalDays = Math.ceil(totalHours / 8)
  const complexity = totalDays > 180 ? "EXTREME" : totalDays > 90 ? "HIGH" : totalDays > 30 ? "MODERATE" : "LOW"

  return {
    complexityFactors,
    totalHours,
    totalDays,
    complexity,
    estimatedCost: totalHours * 150, // $150/hour professional services
  }
}
