import { EnhancedVendorService, type CompleteVendorData } from './enhanced-vendor-service'
import { RealTimeDataService, EnhancedRealTimeCalculationService } from './real-time-data-service'
import { EnhancedDatabaseService, isSupabaseAvailable, mockDataService } from '../database/enhanced-client'
import { ComprehensiveVendorDatabase } from '../comprehensive-vendor-data'
import type { CalculationConfiguration } from '../types'

export interface UltimateTCOBreakdown {
  licensing: number
  hardware: number
  implementation: number
  support: number
  training: number
  maintenance: number
  hidden: number
  operational: number
  compliance: number
  migration: number
  consulting: number
  integration: number
  total: number
  breakdown_details: {
    [key: string]: {
      amount: number
      description: string
      frequency: string
      scaling: string
      confidence: number
      lastUpdated: string
    }
  }
}

export interface ExecutiveROIMetrics {
  paybackMonths: number
  percentage: number
  annualSavings: number
  breachReduction: number
  laborSavingsFTE: number
  timeToValue: number
  netPresentValue: number
  internalRateOfReturn: number
  profitabilityIndex: number
  riskAdjustedReturn: number
  totalBusinessValue: number
  sensitivityAnalysis: {
    optimistic: { roi: number; payback: number; npv: number }
    realistic: { roi: number; payback: number; npv: number }
    pessimistic: { roi: number; payback: number; npv: number }
  }
  valueDrivers: {
    securityValue: number
    operationalValue: number
    complianceValue: number
    productivityValue: number
    infrastructureValue: number
  }
}

export interface ComprehensiveOperationalMetrics {
  automationLevel: number
  fteSaved: number
  maintenanceWindows: number
  mttr: number
  annualOpsSaving: number
  productivityGains: number
  errorReduction: number
  scalabilityScore: number
  userExperienceScore: number
  adminEfficiencyGain: number
  deploymentSpeed: number
  configurationComplexity: number
  troubleshootingEfficiency: number
  reportingAutomation: number
  auditReadiness: number
}

export interface EnterpriseRiskMetrics {
  securityScore: number
  complianceScore: number
  breachReduction: number
  vendorRisk: number
  operationalRisk: number
  financialRisk: number
  reputationalRisk: number
  technologyRisk: number
  marketRisk: number
  riskMitigationValue: number
  insurancePremiumImpact: number
  regulatoryRisk: number
  businessContinuityRisk: number
  cyberInsuranceEligibility: number
}

export interface StrategicCompetitiveMetrics {
  innovationScore: number
  futureReadiness: number
  marketPosition: number
  technologyLeadership: number
  ecosystemStrength: number
  customerLoyalty: number
  partnerNetwork: number
  investmentInRnD: number
  digitalTransformationAlignment: number
  cloudReadiness: number
  securityMaturity: number
  complianceMaturity: number
}

export interface ExecutiveTimelineMetrics {
  timeToValue: number
  implementationWeeks: number
  trainingDays: number
  migrationComplexity: number
  rollbackRisk: number
  changeManagementEffort: number
  userAdoptionTime: number
  fullValueRealization: number
  businessImpactTimeline: {
    immediate: string[]
    month1: string[]
    month3: string[]
    month6: string[]
    year1: string[]
  }
}

export interface UltimateCalculationResult {
  vendorId: string
  vendorName: string
  totalCost: number
  perDevicePerMonth: number
  perUserPerMonth: number
  breakdown: UltimateTCOBreakdown
  roi: ExecutiveROIMetrics
  operational: ComprehensiveOperationalMetrics
  risk: EnterpriseRiskMetrics
  competitive: StrategicCompetitiveMetrics
  timeline: ExecutiveTimelineMetrics
  vendorData: any
  recommendations: {
    suitability: number
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
    implementationComplexity: 'simple' | 'moderate' | 'complex' | 'enterprise'
    strategicFit: number
    overallScore: number
    executiveSummary: string
    keyBenefits: string[]
    majorRisks: string[]
    criticalFactors: string[]
  }
  projections: {
    year1: number
    year3: number
    year5: number
    breakEvenMonth: number
    cumulativeSavings: number[]
    riskAdjustedProjections: number[]
  }
  realTimeFactors: {
    pricingAdjustments: number
    securityAlerts: number
    complianceChanges: number
    marketTrends: number
    lastUpdated: string
  }
}

export class EnhancedCalculationService {
  private static readonly REGION_FACTORS = {
    'north-america': {
      salaryMultiplier: 1.0,
      complianceComplexity: 1.0,
      marketMaturity: 1.0,
      currencyCode: 'USD',
      regulatoryEnvironment: 1.0,
      laborCosts: {
        itAdmin: 125000,
        securityAnalyst: 145000,
        networkEngineer: 135000,
        consultant: 200000
      }
    },
    'europe': {
      salaryMultiplier: 0.85,
      complianceComplexity: 1.4, // GDPR complexity
      marketMaturity: 0.95,
      currencyCode: 'EUR',
      regulatoryEnvironment: 1.3,
      laborCosts: {
        itAdmin: 95000,
        securityAnalyst: 115000,
        networkEngineer: 105000,
        consultant: 170000
      }
    },
    'asia-pacific': {
      salaryMultiplier: 0.65,
      complianceComplexity: 0.8,
      marketMaturity: 0.85,
      currencyCode: 'USD',
      regulatoryEnvironment: 0.9,
      laborCosts: {
        itAdmin: 65000,
        securityAnalyst: 85000,
        networkEngineer: 75000,
        consultant: 130000
      }
    },
    'latin-america': {
      salaryMultiplier: 0.45,
      complianceComplexity: 0.7,
      marketMaturity: 0.7,
      currencyCode: 'USD',
      regulatoryEnvironment: 0.8,
      laborCosts: {
        itAdmin: 55000,
        securityAnalyst: 70000,
        networkEngineer: 60000,
        consultant: 90000
      }
    },
    'middle-east': {
      salaryMultiplier: 0.75,
      complianceComplexity: 1.1,
      marketMaturity: 0.8,
      currencyCode: 'USD',
      regulatoryEnvironment: 1.0,
      laborCosts: {
        itAdmin: 80000,
        securityAnalyst: 100000,
        networkEngineer: 90000,
        consultant: 150000
      }
    }
  }

  private static readonly INDUSTRY_PROFILES = {
    healthcare: {
      breachCostMultiplier: 1.8, // Highest breach costs
      complianceComplexity: 1.6,
      downtimeCostPerHour: 12000,
      regulatoryPenaltyRisk: 5000000,
      securityRequirements: ['HIPAA', 'HITECH', 'SOC2', 'ISO27001'],
      criticalUptime: 99.95,
      dataClassification: 'highly-sensitive',
      auditFrequency: 'quarterly',
      incidentReportingTime: 24 // hours
    },
    financial: {
      breachCostMultiplier: 1.6,
      complianceComplexity: 1.8, // Highest compliance complexity
      downtimeCostPerHour: 18000,
      regulatoryPenaltyRisk: 25000000,
      securityRequirements: ['PCI-DSS', 'SOX', 'GLBA', 'SOC2', 'ISO27001'],
      criticalUptime: 99.99,
      dataClassification: 'highly-sensitive',
      auditFrequency: 'quarterly',
      incidentReportingTime: 12
    },
    government: {
      breachCostMultiplier: 1.4,
      complianceComplexity: 2.0, // Highest due to multiple frameworks
      downtimeCostPerHour: 15000,
      regulatoryPenaltyRisk: 50000000,
      securityRequirements: ['FISMA', 'FedRAMP', 'NIST', 'CMMC'],
      criticalUptime: 99.9,
      dataClassification: 'classified',
      auditFrequency: 'continuous',
      incidentReportingTime: 1
    },
    technology: {
      breachCostMultiplier: 1.2,
      complianceComplexity: 1.0,
      downtimeCostPerHour: 25000,
      regulatoryPenaltyRisk: 10000000,
      securityRequirements: ['SOC2', 'ISO27001', 'GDPR'],
      criticalUptime: 99.5,
      dataClassification: 'sensitive',
      auditFrequency: 'annual',
      incidentReportingTime: 72
    },
    retail: {
      breachCostMultiplier: 1.1,
      complianceComplexity: 1.3,
      downtimeCostPerHour: 8500,
      regulatoryPenaltyRisk: 2000000,
      securityRequirements: ['PCI-DSS', 'GDPR', 'SOC2'],
      criticalUptime: 99.8,
      dataClassification: 'sensitive',
      auditFrequency: 'annual',
      incidentReportingTime: 72
    },
    manufacturing: {
      breachCostMultiplier: 1.5,
      complianceComplexity: 1.2,
      downtimeCostPerHour: 35000, // High due to production impact
      regulatoryPenaltyRisk: 5000000,
      securityRequirements: ['ISO27001', 'IEC62443', 'NIST'],
      criticalUptime: 99.9,
      dataClassification: 'sensitive',
      auditFrequency: 'annual',
      incidentReportingTime: 24
    },
    education: {
      breachCostMultiplier: 0.9,
      complianceComplexity: 1.0,
      downtimeCostPerHour: 4500,
      regulatoryPenaltyRisk: 1000000,
      securityRequirements: ['FERPA', 'SOC2', 'ISO27001'],
      criticalUptime: 99.0,
      dataClassification: 'sensitive',
      auditFrequency: 'annual',
      incidentReportingTime: 72
    }
  }

  static async calculateComprehensiveTCO(
    vendorId: string,
    config: CalculationConfiguration
  ): Promise<UltimateCalculationResult | null> {
    try {
      // Input validation
      if (!vendorId || !config) {
        throw new Error('Invalid input parameters')
      }
      
      if (config.devices <= 0 || config.users <= 0 || config.years <= 0) {
        throw new Error('Configuration values must be positive numbers')
      }

      // Get vendor data from comprehensive database
      const vendorData = ComprehensiveVendorDatabase[vendorId]
      if (!vendorData) {
        throw new Error(`Vendor data not found for ${vendorId}`)
      }

      // Get real-time data adjustments
      const realTimeData = await EnhancedRealTimeCalculationService.calculateWithRealTimeData([vendorId], config)
      const realTimeFactors = realTimeData[0] || {
        pricingAdjustments: 0,
        securityAlerts: 0,
        complianceChanges: 0,
        marketTrends: 0,
        lastUpdated: new Date().toISOString()
      }

      const regionFactors = this.REGION_FACTORS[config.region as keyof typeof this.REGION_FACTORS] || this.REGION_FACTORS['north-america']
      const industryProfile = this.INDUSTRY_PROFILES[config.industry as keyof typeof this.INDUSTRY_PROFILES] || this.INDUSTRY_PROFILES.technology

      // Calculate comprehensive metrics
      const breakdown = await this.calculateUltimateCostBreakdown(vendorData, config, regionFactors, industryProfile, realTimeFactors)
      const roi = await this.calculateExecutiveROI(vendorData, config, breakdown, industryProfile, regionFactors)
      const operational = this.calculateComprehensiveOperationalMetrics(vendorData, config, regionFactors)
      const risk = this.calculateEnterpriseRiskMetrics(vendorData, config, industryProfile, realTimeFactors)
      const competitive = this.calculateStrategicCompetitiveMetrics(vendorData, config, industryProfile)
      const timeline = this.calculateExecutiveTimelineMetrics(vendorData, config, industryProfile)
      const recommendations = this.generateExecutiveRecommendations(vendorData, config, breakdown, roi, risk, competitive)
      const projections = this.calculateAdvancedProjections(breakdown, roi, config, industryProfile)

      const totalCost = breakdown.total
      const perDevicePerMonth = totalCost / (config.devices * config.years * 12)
      const perUserPerMonth = totalCost / (config.users * config.years * 12)

      return {
        vendorId,
        vendorName: vendorData.name,
        totalCost,
        perDevicePerMonth,
        perUserPerMonth,
        breakdown,
        roi,
        operational,
        risk,
        competitive,
        timeline,
        vendorData,
        recommendations,
        projections,
        realTimeFactors
      }
    } catch (error) {
      console.error(`Error calculating comprehensive TCO for ${vendorId}:`, error)
      return null
    }
  }

  private static async calculateUltimateCostBreakdown(
    vendorData: any,
    config: CalculationConfiguration,
    regionFactors: any,
    industryProfile: any,
    realTimeFactors: any
  ): Promise<UltimateTCOBreakdown> {
    const { devices, users, years } = config
    const breakdown_details: any = {}

    // Real-time pricing adjustments
    const pricingAdjustment = 1 + (realTimeFactors.pricingAdjustments || 0)

    // Calculate licensing with real-time adjustments
    let licensing = 0
    if (vendorData.id === 'portnox') {
      let effectivePrice = config.portnoxBasePrice || vendorData.pricing.pricePerDevice
      effectivePrice *= pricingAdjustment

      // Add addon costs
      if (config.portnoxAddons?.atp) effectivePrice += vendorData.pricing.addOns['Advanced Threat Protection'].perDevice
      if (config.portnoxAddons?.compliance) effectivePrice += vendorData.pricing.addOns['Compliance Automation'].perDevice
      if (config.portnoxAddons?.iot) effectivePrice += vendorData.pricing.addOns['IoT/OT Security'].perDevice
      if (config.portnoxAddons?.analytics) effectivePrice += vendorData.pricing.addOns['Risk Analytics'].perDevice

      // Apply volume discounts
      const volumeDiscounts = vendorData.pricing.volumeDiscounts
      const applicableDiscount = Object.entries(volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, Number(discount)), 0)

      if (applicableDiscount > 0) {
        effectivePrice *= (1 - applicableDiscount / 100)
      }

      // Apply contract term discounts
      const contractDiscount = years >= 3 ? 0.25 : years >= 1 ? 0.15 : 0
      effectivePrice *= (1 - contractDiscount)

      licensing = effectivePrice * devices * 12 * years
      
      breakdown_details.licensing = {
        amount: licensing,
        description: `Portnox CLEAR all-inclusive subscription with ${Object.keys(config.portnoxAddons || {}).filter(k => config.portnoxAddons?.[k as keyof typeof config.portnoxAddons]).length} add-ons`,
        frequency: 'monthly',
        scaling: 'per-device',
        confidence: 95,
        lastUpdated: new Date().toISOString()
      }
    } else {
      // Calculate for other vendors
      const basePrice = vendorData.pricing.basePrice * pricingAdjustment
      const devicePrice = vendorData.pricing.pricePerDevice * pricingAdjustment

      licensing = (basePrice + devicePrice * devices) * years

      // Apply volume discounts
      const volumeDiscounts = vendorData.pricing.volumeDiscounts
      const applicableDiscount = Object.entries(volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, Number(discount)), 0)

      if (applicableDiscount > 0) {
        licensing *= (1 - applicableDiscount / 100)
      }

      // Apply contract discounts
      const contractDiscount = years >= 3 ? vendorData.pricing.contractTerms.triennial / vendorData.pricing.contractTerms.monthly - 1 : 
                              years >= 1 ? vendorData.pricing.contractTerms.annual / vendorData.pricing.contractTerms.monthly - 1 : 0
      licensing *= (1 + contractDiscount)

      breakdown_details.licensing = {
        amount: licensing,
        description: `${vendorData.name} licensing with volume discounts`,
        frequency: 'annual',
        scaling: 'per-device',
        confidence: 85,
        lastUpdated: new Date().toISOString()
      }
    }

    // Calculate comprehensive additional costs
    const additionalCosts = vendorData.pricing.additionalCosts
    const hardware = additionalCosts.hardware * regionFactors.marketMaturity
    const implementation = additionalCosts.professionalServices * regionFactors.complianceComplexity
    const training = additionalCosts.training * regionFactors.salaryMultiplier
    const maintenance = additionalCosts.maintenance * years * regionFactors.marketMaturity
    const support = additionalCosts.support * years
    const integration = additionalCosts.integration * industryProfile.complianceComplexity
    const migration = additionalCosts.migration
    const consulting = additionalCosts.consulting * years * 0.5 // Ongoing consulting

    // Calculate operational costs (FTE requirements)
    const requiredFTE = this.calculateRequiredFTE(vendorData, config, industryProfile)
    const avgSalary = regionFactors.laborCosts.itAdmin
    const operationalCost = requiredFTE * avgSalary * years

    // Calculate compliance costs
    const complianceCost = this.calculateComplianceCosts(vendorData, config, industryProfile, regionFactors)

    // Calculate hidden costs
    const hiddenCosts = this.calculateHiddenCosts(vendorData, config, industryProfile, regionFactors)

    const total = licensing + 
                 hardware +
                 implementation +
                 training +
                 maintenance +
                 support +
                 integration +
                 migration +
                 consulting +
                 operationalCost +
                 complianceCost +
                 hiddenCosts

    // Add detailed breakdown for all cost components
    Object.assign(breakdown_details, {
      hardware: {
        amount: hardware,
        description: vendorData.infrastructure.hardwareRequired ? 'Required infrastructure and appliances' : 'No hardware required',
        frequency: 'one-time',
        scaling: 'fixed',
        confidence: 90,
        lastUpdated: new Date().toISOString()
      },
      implementation: {
        amount: implementation,
        description: 'Professional services and implementation',
        frequency: 'one-time',
        scaling: 'complexity-based',
        confidence: 85,
        lastUpdated: new Date().toISOString()
      },
      operational: {
        amount: operationalCost,
        description: `${requiredFTE.toFixed(1)} FTE operational costs`,
        frequency: 'annual',
        scaling: 'per-fte',
        confidence: 90,
        lastUpdated: new Date().toISOString()
      }
    })

    return {
      licensing,
      hardware,
      implementation,
      support,
      training,
      maintenance,
      hidden: hiddenCosts,
      operational: operationalCost,
      compliance: complianceCost,
      migration,
      consulting,
      integration,
      total,
      breakdown_details
    }
  }

  private static async calculateExecutiveROI(
    vendorData: any,
    config: CalculationConfiguration,
    breakdown: UltimateTCOBreakdown,
    industryProfile: any,
    regionFactors: any
  ): Promise<ExecutiveROIMetrics> {
    // Calculate comprehensive business value
    const avgBreachCost = industryProfile.breachCostMultiplier * 8500000 // 2024 average
    const breachRiskReduction = vendorData.roi.breachRiskReduction
    const breachSavings = breachRiskReduction * avgBreachCost * 0.15 // 15% annual probability

    // Operational savings
    const laborSavings = vendorData.roi.laborSavings * regionFactors.laborCosts.itAdmin
    const operationalEfficiencySavings = vendorData.roi.operationalEfficiency * breakdown.operational * 0.5

    // Compliance savings
    const complianceSavings = vendorData.roi.complianceSavings * industryProfile.complianceComplexity
    const auditSavings = vendorData.complianceSummary.automationLevel * 0.01 * 150000 // Audit cost reduction

    // Productivity savings
    const productivitySavings = this.calculateProductivitySavings(vendorData, config, regionFactors)
    
    // Infrastructure savings
    const infrastructureSavings = vendorData.infrastructure.hardwareRequired ? 0 : breakdown.hardware + breakdown.maintenance

    // Downtime savings
    const downtimeSavings = vendorData.roi.downtimeReduction * industryProfile.downtimeCostPerHour * 24 * 365 * 0.01 // 1% baseline downtime

    const totalAnnualSavings = breachSavings + laborSavings + operationalEfficiencySavings + 
                              complianceSavings + auditSavings + productivitySavings + 
                              infrastructureSavings + downtimeSavings

    const annualCost = breakdown.total / config.years
    const netAnnualBenefit = totalAnnualSavings - annualCost

    // Advanced financial calculations
    const discountRate = 0.08 // 8% discount rate
    const npv = this.calculateNPV(breakdown.total, totalAnnualSavings, config.years, discountRate)
    const irr = this.calculateIRR(breakdown.total, totalAnnualSavings, config.years)
    const profitabilityIndex = npv / breakdown.total
    const riskAdjustment = 1 - (vendorData.riskMetrics.technologyRisk / 100 * 0.2)
    const riskAdjustedReturn = irr * riskAdjustment

    const roi = netAnnualBenefit > 0 ? (netAnnualBenefit * config.years / breakdown.total) * 100 : 0
    const paybackMonths = netAnnualBenefit > 0 ? (breakdown.total / netAnnualBenefit) * 12 : 999

    // Total business value calculation
    const totalBusinessValue = npv + (totalAnnualSavings * config.years)

    // Sensitivity analysis
    const sensitivityAnalysis = {
      optimistic: {
        roi: roi * 1.4,
        payback: paybackMonths * 0.7,
        npv: npv * 1.5
      },
      realistic: {
        roi,
        payback: paybackMonths,
        npv
      },
      pessimistic: {
        roi: roi * 0.6,
        payback: paybackMonths * 1.5,
        npv: npv * 0.4
      }
    }

    // Value drivers breakdown
    const valueDrivers = {
      securityValue: breachSavings + downtimeSavings,
      operationalValue: laborSavings + operationalEfficiencySavings,
      complianceValue: complianceSavings + auditSavings,
      productivityValue: productivitySavings,
      infrastructureValue: infrastructureSavings
    }

    return {
      paybackMonths: Math.min(paybackMonths, 999),
      percentage: roi,
      annualSavings: totalAnnualSavings,
      breachReduction: breachRiskReduction * 100,
      laborSavingsFTE: vendorData.roi.laborSavings,
      timeToValue: vendorData.roi.timeToValue,
      netPresentValue: npv,
      internalRateOfReturn: irr * 100,
      profitabilityIndex,
      riskAdjustedReturn: riskAdjustedReturn * 100,
      totalBusinessValue,
      sensitivityAnalysis,
      valueDrivers
    }
  }

  private static calculateComprehensiveOperationalMetrics(
    vendorData: any,
    config: CalculationConfiguration,
    regionFactors: any
  ): ComprehensiveOperationalMetrics {
    const automationLevel = vendorData.operationalMetrics.automationLevel
    const fteSaved = vendorData.roi.laborSavings
    
    // Calculate maintenance windows
    const maintenanceWindows = vendorData.infrastructure.maintenanceWindows

    // Calculate MTTR based on automation and vendor capabilities
    const baseMTTR = vendorData.infrastructure.cloudNative ? 0.25 : 2
    const mttr = baseMTTR * (1 - automationLevel / 200)

    const avgSalary = regionFactors.laborCosts.itAdmin
    const annualOpsSaving = fteSaved * avgSalary

    // Advanced operational metrics
    const productivityGains = automationLevel * 0.9
    const errorReduction = automationLevel * 0.85
    const scalabilityScore = vendorData.infrastructure.scalabilityScore
    const userExperienceScore = vendorData.customerFeedback.feedback.easeOfUse
    const adminEfficiencyGain = automationLevel * 0.95

    // Deployment and configuration metrics
    const deploymentSpeed = 100 - (vendorData.implementation.timeToDeployDays / 180 * 100)
    const configurationComplexity = vendorData.implementation.complexity === 'simple' ? 90 : 
                                   vendorData.implementation.complexity === 'moderate' ? 70 : 
                                   vendorData.implementation.complexity === 'complex' ? 40 : 20

    const troubleshootingEfficiency = 100 - (mttr / 4 * 100)
    const reportingAutomation = vendorData.operationalMetrics.reportingCapabilities === 'enterprise' ? 95 :
                               vendorData.operationalMetrics.reportingCapabilities === 'advanced' ? 85 :
                               vendorData.operationalMetrics.reportingCapabilities === 'standard' ? 65 : 45

    const auditReadiness = vendorData.complianceSummary.auditReadiness

    return {
      automationLevel,
      fteSaved,
      maintenanceWindows,
      mttr,
      annualOpsSaving,
      productivityGains,
      errorReduction,
      scalabilityScore,
      userExperienceScore,
      adminEfficiencyGain,
      deploymentSpeed,
      configurationComplexity,
      troubleshootingEfficiency,
      reportingAutomation,
      auditReadiness
    }
  }

  private static calculateEnterpriseRiskMetrics(
    vendorData: any,
    config: CalculationConfiguration,
    industryProfile: any,
    realTimeFactors: any
  ): EnterpriseRiskMetrics {
    const security = vendorData.security
    const securityScore = security.securityRating
    
    // Compliance score with real-time adjustments
    const requiredFrameworks = industryProfile.securityRequirements
    const supportedFrameworks = security.complianceSupport
    const complianceScore = (supportedFrameworks.filter((f: string) => requiredFrameworks.includes(f)).length / requiredFrameworks.length) * 100

    // Breach risk reduction with CVE penalty
    const breachReduction = vendorData.roi.breachRiskReduction * 100
    const cveImpact = Math.min(50, security.cveCount * 0.5)
    const adjustedBreachReduction = Math.max(0, breachReduction - cveImpact)

    // Comprehensive risk assessment
    const vendorRisk = this.calculateVendorRisk(vendorData, realTimeFactors)
    const operationalRisk = this.calculateOperationalRisk(vendorData, config)
    const financialRisk = this.calculateFinancialRisk(vendorData, config)
    const reputationalRisk = this.calculateReputationalRisk(vendorData, security)
    const technologyRisk = vendorData.riskMetrics.technologyRisk
    const marketRisk = vendorData.riskMetrics.marketRisk

    // Advanced risk metrics
    const regulatoryRisk = this.calculateRegulatoryRisk(vendorData, industryProfile)
    const businessContinuityRisk = this.calculateBusinessContinuityRisk(vendorData, config)
    const cyberInsuranceEligibility = this.calculateCyberInsuranceEligibility(vendorData, security)

    // Risk mitigation value
    const riskMitigationValue = (adjustedBreachReduction / 100 * industryProfile.regulatoryPenaltyRisk * 0.15) + 
                               (operationalRisk * 75000) + 
                               (reputationalRisk * 150000)

    // Insurance premium impact
    const insurancePremiumImpact = (adjustedBreachReduction / 100) * 0.25 * 85000 // 25% reduction on $85k premium

    return {
      securityScore,
      complianceScore,
      breachReduction: adjustedBreachReduction,
      vendorRisk,
      operationalRisk,
      financialRisk,
      reputationalRisk,
      technologyRisk,
      marketRisk,
      riskMitigationValue,
      insurancePremiumImpact,
      regulatoryRisk,
      businessContinuityRisk,
      cyberInsuranceEligibility
    }
  }

  private static calculateStrategicCompetitiveMetrics(
    vendorData: any,
    config: CalculationConfiguration,
    industryProfile: any
  ): StrategicCompetitiveMetrics {
    const innovationScore = vendorData.features.innovationScore
    const futureReadiness = vendorData.marketPosition.futureOutlook === 'positive' ? 85 : 
                           vendorData.marketPosition.futureOutlook === 'neutral' ? 65 : 45
    const marketPosition = vendorData.marketPosition.marketMetrics.marketShareTrend + 50
    const technologyLeadership = this.calculateTechnologyLeadership(vendorData)
    const ecosystemStrength = vendorData.marketPosition.marketMetrics.partnerEcosystem
    const customerLoyalty = vendorData.customerFeedback.renewalRate
    const partnerNetwork = vendorData.marketPosition.marketMetrics.partnerEcosystem
    const investmentInRnD = vendorData.financialHealth.rdInvestment
    const digitalTransformationAlignment = vendorData.strategicFit.digitalTransformation
    const cloudReadiness = vendorData.infrastructure.cloudNative ? 95 : 35
    const securityMaturity = vendorData.security.zeroTrustMaturity
    const complianceMaturity = vendorData.complianceSummary.automationLevel

    return {
      innovationScore,
      futureReadiness,
      marketPosition: Math.min(100, marketPosition),
      technologyLeadership,
      ecosystemStrength,
      customerLoyalty,
      partnerNetwork,
      investmentInRnD,
      digitalTransformationAlignment,
      cloudReadiness,
      securityMaturity,
      complianceMaturity
    }
  }

  private static calculateExecutiveTimelineMetrics(
    vendorData: any,
    config: CalculationConfiguration,
    industryProfile: any
  ): ExecutiveTimelineMetrics {
    const timeToValue = vendorData.implementation.timeToDeployDays
    const implementationWeeks = Math.ceil(timeToValue / 7)
    const trainingDays = Math.ceil(vendorData.implementation.trainingHours / 8)
    const migrationComplexity = vendorData.implementation.implementationRisks.technical
    const rollbackRisk = vendorData.implementation.rollbackCapability ? 20 : 80
    const changeManagementEffort = this.calculateChangeManagementEffort(vendorData, config)
    const userAdoptionTime = vendorData.customerFeedback.feedback.easeOfUse > 80 ? 7 : 30
    const fullValueRealization = timeToValue + 60

    // Business impact timeline
    const businessImpactTimeline = {
      immediate: vendorData.id === 'portnox' ? 
        ['Zero infrastructure deployment', 'Immediate security enhancement', 'Cost savings begin'] :
        ['Planning phase begins', 'Resource allocation', 'Vendor engagement'],
      month1: vendorData.id === 'portnox' ? 
        ['Full production deployment', 'User onboarding complete', 'Policy enforcement active'] :
        ['Hardware procurement', 'Professional services engagement', 'Initial training'],
      month3: vendorData.id === 'portnox' ? 
        ['Advanced features deployed', 'Compliance automation active', 'ROI measurement begins'] :
        ['Infrastructure deployment', 'Basic configuration', 'Initial testing'],
      month6: vendorData.id === 'portnox' ? 
        ['Full value realization', 'Advanced analytics active', 'Measurable business impact'] :
        ['Production rollout begins', 'User training complete', 'Basic functionality'],
      year1: vendorData.id === 'portnox' ? 
        ['Strategic value delivered', 'Advanced integrations', 'Competitive advantage realized'] :
        ['Full deployment complete', 'Optimization phase', 'Value measurement']
    }

    return {
      timeToValue,
      implementationWeeks,
      trainingDays,
      migrationComplexity,
      rollbackRisk,
      changeManagementEffort,
      userAdoptionTime,
      fullValueRealization,
      businessImpactTimeline
    }
  }

  private static generateExecutiveRecommendations(
    vendorData: any,
    config: CalculationConfiguration,
    breakdown: UltimateTCOBreakdown,
    roi: ExecutiveROIMetrics,
    risk: EnterpriseRiskMetrics,
    competitive: StrategicCompetitiveMetrics
  ) {
    // Calculate overall suitability
    let suitability = 50
    suitability += vendorData.infrastructure.cloudNative ? 20 : -10
    suitability += risk.securityScore > 90 ? 15 : risk.securityScore > 70 ? 5 : -15
    suitability += roi.percentage > 200 ? 15 : roi.percentage > 100 ? 10 : 0
    suitability += competitive.innovationScore > 80 ? 10 : 0

    // Determine risk level with security alerts
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'medium'
    if (vendorData.security.cveCount > 50 || vendorData.id === 'ivanti_neurons') riskLevel = 'critical'
    else if (risk.vendorRisk < 25 && risk.securityScore > 85) riskLevel = 'low'
    else if (risk.vendorRisk > 60 || risk.securityScore < 60) riskLevel = 'high'

    // Implementation complexity
    let implementationComplexity: 'simple' | 'moderate' | 'complex' | 'enterprise' = 'moderate'
    if (vendorData.implementation.complexity === 'simple') implementationComplexity = 'simple'
    else if (vendorData.implementation.complexity === 'enterprise') implementationComplexity = 'enterprise'
    else if (vendorData.implementation.complexity === 'complex') implementationComplexity = 'complex'

    // Strategic fit calculation
    let strategicFit = 60
    strategicFit += competitive.digitalTransformationAlignment > 80 ? 15 : 0
    strategicFit += competitive.cloudReadiness > 80 ? 10 : 0
    strategicFit += competitive.securityMaturity > 80 ? 10 : 0
    strategicFit += competitive.futureReadiness > 80 ? 5 : 0

    // Overall score
    const overallScore = (suitability + strategicFit + (100 - risk.vendorRisk) + competitive.innovationScore) / 4

    // Executive summary
    const executiveSummary = vendorData.id === 'portnox' ? 
      `Portnox CLEAR delivers exceptional value with ${roi.percentage.toFixed(0)}% ROI, ${roi.paybackMonths.toFixed(1)}-month payback, and industry-leading security. Cloud-native architecture eliminates infrastructure costs and complexity while providing superior automation and scalability.` :
      vendorData.id === 'ivanti_neurons' ?
      `CRITICAL SECURITY RISK: Immediate migration required due to active exploitation and 89+ CVEs. This platform poses significant security and compliance risks.` :
      `${vendorData.name} offers ${roi.percentage.toFixed(0)}% ROI with ${roi.paybackMonths.toFixed(1)}-month payback. Consider implementation complexity and ongoing operational requirements when evaluating this solution.`

    // Key benefits
    const keyBenefits = vendorData.advantages.slice(0, 5)

    // Major risks
    const majorRisks = vendorData.weaknesses.slice(0, 3)

    // Critical factors
    const criticalFactors = vendorData.id === 'portnox' ? 
      ['Zero infrastructure requirements', 'Fastest deployment', 'Zero CVE security record', 'All-inclusive pricing'] :
      vendorData.id === 'ivanti_neurons' ?
      ['Active security exploitation', 'End-of-life product', 'High vulnerability count', 'Limited vendor support'] :
      ['Infrastructure investment required', 'Professional services needed', 'Ongoing maintenance costs', 'Specialized expertise required']

    return {
      suitability: Math.min(100, Math.max(0, suitability)),
      riskLevel,
      implementationComplexity,
      strategicFit: Math.min(100, Math.max(0, strategicFit)),
      overallScore: Math.min(100, Math.max(0, overallScore)),
      executiveSummary,
      keyBenefits,
      majorRisks,
      criticalFactors
    }
  }

  private static calculateAdvancedProjections(
    breakdown: UltimateTCOBreakdown,
    roi: ExecutiveROIMetrics,
    config: CalculationConfiguration,
    industryProfile: any
  ) {
    const annualCost = breakdown.total / config.years
    const annualSavings = roi.annualSavings

    // Calculate cumulative savings over time
    const cumulativeSavings = []
    const riskAdjustedProjections = []
    
    for (let year = 1; year <= 10; year++) {
      const cumulativeBenefit = annualSavings * year
      const cumulativeCost = year <= config.years ? annualCost * year : breakdown.total
      const netSavings = cumulativeBenefit - cumulativeCost
      
      cumulativeSavings.push(netSavings)
      
      // Risk-adjusted projections with uncertainty increasing over time
      const riskAdjustment = Math.pow(0.95, year - 1) // 5% annual uncertainty increase
      riskAdjustedProjections.push(netSavings * riskAdjustment)
    }

    return {
      year1: annualCost,
      year3: annualCost * 3,
      year5: annualCost * 5,
      breakEvenMonth: roi.paybackMonths,
      cumulativeSavings,
      riskAdjustedProjections
    }
  }

  // Helper methods for detailed calculations
  private static calculateRequiredFTE(vendorData: any, config: CalculationConfiguration, industryProfile: any): number {
    const baselineFTE = 4.0 // Traditional NAC baseline
    const automationLevel = vendorData.operationalMetrics.automationLevel
    const complexityFactor = vendorData.infrastructure.cloudNative ? 0.1 : 
                            vendorData.deploymentType === 'hybrid' ? 0.6 : 1.2
    const industryFactor = industryProfile.complianceComplexity
    
    return Math.max(0.05, baselineFTE * complexityFactor * industryFactor * (1 - automationLevel / 100))
  }

  private static calculateComplianceCosts(
    vendorData: any,
    config: CalculationConfiguration,
    industryProfile: any,
    regionFactors: any
  ): number {
    const requiredFrameworks = industryProfile.securityRequirements
    const supportedFrameworks = vendorData.security.complianceSupport
    const unsupportedCount = requiredFrameworks.filter((f: string) => !supportedFrameworks.includes(f)).length
    
    // Cost per unsupported framework
    const frameworkCost = unsupportedCount * 85000 * config.years * regionFactors.complianceComplexity
    
    // Audit costs
    const auditCost = vendorData.complianceSummary.automatedCompliance ? 25000 : 125000
    
    return frameworkCost + auditCost
  }

  private static calculateHiddenCosts(
    vendorData: any,
    config: CalculationConfiguration,
    industryProfile: any,
    regionFactors: any
  ): number {
    let hiddenCosts = 0

    // Downtime costs
    const downtimeHours = (100 - vendorData.infrastructure.highAvailability) * 87.6 // Annual hours
    hiddenCosts += downtimeHours * industryProfile.downtimeCostPerHour

    // Integration complexity costs
    const integrationComplexity = vendorData.implementation.implementationRisks.integration / 100
    hiddenCosts += integrationComplexity * 150000

    // Training and certification costs
    if (vendorData.implementation.certificationRequired) {
      hiddenCosts += 45000 * regionFactors.salaryMultiplier
    }

    // Vendor lock-in costs
    if (!vendorData.infrastructure.cloudNative) {
      hiddenCosts += 85000 // Future migration costs
    }

    return hiddenCosts
  }

  private static calculateProductivitySavings(
    vendorData: any,
    config: CalculationConfiguration,
    regionFactors: any
  ): number {
    const automationLevel = vendorData.operationalMetrics.automationLevel
    const userCount = config.users
    const userExperience = vendorData.customerFeedback.feedback.easeOfUse
    
    // Productivity gain per user per year
    const productivityGainPerUser = (automationLevel / 100) * (userExperience / 100) * 750 // $750 per user max
    return userCount * productivityGainPerUser
  }

  // Advanced risk calculation methods
  private static calculateVendorRisk(vendorData: any, realTimeFactors: any): number {
    let risk = 30 // baseline

    // Market presence risk
    if (vendorData.marketShare < 2) risk += 40
    else if (vendorData.marketShare < 8) risk += 20

    // Financial stability risk
    if (vendorData.revenue < 50000000) risk += 25
    if (vendorData.financialHealth.revenueGrowth < 0) risk += 30

    // Security track record risk
    if (vendorData.security.cveCount > 50) risk += 45
    else if (vendorData.security.cveCount > 20) risk += 25
    else if (vendorData.security.cveCount > 0) risk += 10

    // Real-time security alerts
    risk += realTimeFactors.securityAlerts * 5

    // Technology risk
    if (!vendorData.infrastructure.cloudNative) risk += 20

    return Math.min(100, Math.max(0, risk))
  }

  private static calculateOperationalRisk(vendorData: any, config: CalculationConfiguration): number {
    let risk = 25 // baseline

    if (vendorData.infrastructure.hardwareRequired) risk += 25
    if (vendorData.implementation.complexity === 'enterprise') risk += 20
    if (vendorData.operationalMetrics.automationLevel < 50) risk += 15
    if (vendorData.customerFeedback.supportSatisfaction < 70) risk += 15

    return Math.min(100, risk)
  }

  private static calculateFinancialRisk(vendorData: any, config: CalculationConfiguration): number {
    let risk = 15 // baseline

    // Pricing volatility
    if (vendorData.pricing.marketAdjustments.demandMultiplier > 1.1) risk += 15

    // Hidden costs
    const hiddenCostRatio = (vendorData.pricing.additionalCosts.hardware + 
                            vendorData.pricing.additionalCosts.professionalServices) / 
                           (vendorData.pricing.pricePerDevice * config.devices)
    risk += Math.min(30, hiddenCostRatio * 100)

    // Vendor financial health
    if (vendorData.financialHealth.profitability < 10) risk += 20
    if (vendorData.financialHealth.debtToEquity > 0.5) risk += 15

    return Math.min(100, risk)
  }

  private static calculateReputationalRisk(vendorData: any, security: any): number {
    let risk = 10 // baseline

    if (security.securityIncidentCount > 5) risk += 35
    if (security.cveCount > 30) risk += 30
    if (vendorData.customerFeedback.overallSatisfaction < 60) risk += 25
    if (vendorData.customerFeedback.recommendationScore < 50) risk += 20

    return Math.min(100, risk)
  }

  private static calculateRegulatoryRisk(vendorData: any, industryProfile: any): number {
    const requiredFrameworks = industryProfile.securityRequirements
    const supportedFrameworks = vendorData.security.complianceSupport
    const complianceGap = requiredFrameworks.filter((f: string) => !supportedFrameworks.includes(f)).length
    
    return Math.min(100, complianceGap * 20)
  }

  private static calculateBusinessContinuityRisk(vendorData: any, config: CalculationConfiguration): number {
    let risk = 20 // baseline

    if (vendorData.infrastructure.highAvailability < 99.5) risk += 25
    if (!vendorData.infrastructure.disasterRecovery) risk += 20
    if (vendorData.infrastructure.maintenanceWindows > 6) risk += 15
    if (!vendorData.implementation.rollbackCapability) risk += 20

    return Math.min(100, risk)
  }

  private static calculateCyberInsuranceEligibility(vendorData: any, security: any): number {
    let eligibility = 50 // baseline

    if (security.cveCount === 0) eligibility += 30
    else if (security.cveCount < 5) eligibility += 20
    else if (security.cveCount > 20) eligibility -= 30

    if (security.zeroTrustMaturity > 80) eligibility += 20
    if (vendorData.complianceSummary.automatedCompliance) eligibility += 15
    if (security.securityRating > 90) eligibility += 15

    return Math.min(100, Math.max(0, eligibility))
  }

  private static calculateTechnologyLeadership(vendorData: any): number {
    let score = 40

    if (vendorData.infrastructure.cloudNative) score += 25
    if (vendorData.features.innovationScore > 80) score += 20
    if (vendorData.operationalMetrics.automationLevel > 80) score += 15
    if (vendorData.security.zeroTrustMaturity > 80) score += 10

    return Math.min(100, score)
  }

  private static calculateChangeManagementEffort(vendorData: any, config: CalculationConfiguration): number {
    let effort = 40 // baseline

    if (vendorData.infrastructure.cloudNative) effort -= 25
    if (config.devices > 10000) effort += 20
    if (vendorData.implementation.complexity === 'enterprise') effort += 25
    if (vendorData.customerFeedback.feedback.easeOfUse > 80) effort -= 15

    return Math.max(10, Math.min(100, effort))
  }

  // Advanced financial calculations
  private static calculateNPV(initialInvestment: number, annualSavings: number, years: number, discountRate: number): number {
    let npv = -initialInvestment
    
    for (let year = 1; year <= years; year++) {
      npv += annualSavings / Math.pow(1 + discountRate, year)
    }
    
    return npv
  }

  private static calculateIRR(initialInvestment: number, annualSavings: number, years: number): number {
    // Simplified IRR calculation using Newton-Raphson method
    let irr = 0.1 // Initial guess
    
    for (let i = 0; i < 100; i++) {
      let npv = -initialInvestment
      let derivative = 0
      
      for (let year = 1; year <= years; year++) {
        const factor = Math.pow(1 + irr, year)
        npv += annualSavings / factor
        derivative -= year * annualSavings / (factor * (1 + irr))
      }
      
      if (Math.abs(npv) < 0.01) break
      irr = irr - npv / derivative
    }
    
    return irr
  }

  static async compareVendors(
    vendorIds: string[],
    config: CalculationConfiguration
  ): Promise<UltimateCalculationResult[]> {
    if (!vendorIds || vendorIds.length === 0) {
      return []
    }
    
    if (!config) {
      throw new Error('Configuration is required')
    }

    // Start real-time monitoring
    const realTimeData = await EnhancedRealTimeCalculationService.calculateWithRealTimeData(vendorIds, config)

    const results = await Promise.all(
      vendorIds.map(async (id) => {
        try {
          return await this.calculateComprehensiveTCO(id, config)
        } catch (error) {
          console.error(`Failed to calculate TCO for vendor ${id}:`, error)
          return null
        }
      })
    )

    return results
      .filter((r): r is UltimateCalculationResult => r !== null)
      .sort((a, b) => a.totalCost - b.totalCost)
  }

  static async saveCalculation(
    sessionId: string,
    config: CalculationConfiguration,
    selectedVendors: string[],
    results: UltimateCalculationResult[]
  ): Promise<boolean> {
    try {
      if (!sessionId || !config || !selectedVendors || !results) {
        throw new Error('Missing required parameters for saving calculation')
      }
      
      if (isSupabaseAvailable()) {
        return await EnhancedDatabaseService.saveCalculation(sessionId, config, selectedVendors, results)
      } else {
        return await mockDataService.saveCalculation()
      }
    } catch (error) {
      console.error('Error in saveCalculation:', error)
      return false
    }
  }

  static async loadCalculation(sessionId: string): Promise<{
    config: CalculationConfiguration
    selectedVendors: string[]
    results: UltimateCalculationResult[]
  } | null> {
    try {
      if (!sessionId) {
        throw new Error('Session ID is required')
      }
      
      if (isSupabaseAvailable()) {
        return await EnhancedDatabaseService.loadCalculation(sessionId)
      } else {
        return await mockDataService.loadCalculation()
      }
    } catch (error) {
      console.error('Error in loadCalculation:', error)
      return null
    }
  }

  // Real-time monitoring integration
  static startRealTimeMonitoring(vendorIds: string[], onUpdate: (data: any) => void): () => void {
    return EnhancedRealTimeCalculationService.startRealTimeMonitoring(vendorIds, onUpdate)
  }
}