import { EnhancedVendorService, type CompleteVendorData } from './enhanced-vendor-service'
import { EnhancedDatabaseService, isSupabaseAvailable, mockDataService } from '../database/enhanced-client'
import type { CalculationConfiguration } from '../types'

export interface EnhancedTCOBreakdown {
  licensing: number
  hardware: number
  implementation: number
  support: number
  training: number
  maintenance: number
  hidden: number
  operational: number
  compliance: number
  total: number
  breakdown_details: {
    [key: string]: {
      amount: number
      description: string
      frequency: string
      scaling: string
    }
  }
}

export interface ComprehensiveROIMetrics {
  paybackMonths: number
  percentage: number
  annualSavings: number
  breachReduction: number
  laborSavingsFTE: number
  timeToValue: number
  netPresentValue: number
  internalRateOfReturn: number
  profitabilityIndex: number
  sensitivityAnalysis: {
    optimistic: { roi: number; payback: number }
    realistic: { roi: number; payback: number }
    pessimistic: { roi: number; payback: number }
  }
}

export interface DetailedOperationalMetrics {
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
}

export interface ComprehensiveRiskMetrics {
  securityScore: number
  complianceScore: number
  breachReduction: number
  vendorRisk: number
  operationalRisk: number
  financialRisk: number
  reputationalRisk: number
  riskMitigationValue: number
  insurancePremiumImpact: number
}

export interface EnhancedCompetitiveMetrics {
  innovationScore: number
  futureReadiness: number
  marketPosition: number
  technologyLeadership: number
  ecosystemStrength: number
  customerLoyalty: number
  partnerNetwork: number
  investmentInRnD: number
}

export interface DetailedTimelineMetrics {
  timeToValue: number
  implementationWeeks: number
  trainingDays: number
  migrationComplexity: number
  rollbackRisk: number
  changeManagementEffort: number
  userAdoptionTime: number
  fullValueRealization: number
}

export interface UltimateCalculationResult {
  vendorId: string
  vendorName: string
  totalCost: number
  perDevicePerMonth: number
  perUserPerMonth: number
  breakdown: EnhancedTCOBreakdown
  roi: ComprehensiveROIMetrics
  operational: DetailedOperationalMetrics
  risk: ComprehensiveRiskMetrics
  competitive: EnhancedCompetitiveMetrics
  timeline: DetailedTimelineMetrics
  vendorData: CompleteVendorData
  recommendations: {
    suitability: number
    riskLevel: 'low' | 'medium' | 'high'
    implementationComplexity: 'simple' | 'moderate' | 'complex'
    strategicFit: number
    overallScore: number
  }
  projections: {
    year1: number
    year3: number
    year5: number
    breakEvenMonth: number
  }
}

export class EnhancedCalculationService {
  private static readonly REGION_FACTORS = {
    'north-america': {
      salaryMultiplier: 1.0,
      complianceComplexity: 1.0,
      marketMaturity: 1.0,
      currencyCode: 'USD'
    },
    'europe': {
      salaryMultiplier: 0.85,
      complianceComplexity: 1.3,
      marketMaturity: 0.95,
      currencyCode: 'EUR'
    },
    'asia-pacific': {
      salaryMultiplier: 0.65,
      complianceComplexity: 0.8,
      marketMaturity: 0.85,
      currencyCode: 'USD'
    },
    'latin-america': {
      salaryMultiplier: 0.45,
      complianceComplexity: 0.7,
      marketMaturity: 0.7,
      currencyCode: 'USD'
    },
    'middle-east': {
      salaryMultiplier: 0.75,
      complianceComplexity: 1.1,
      marketMaturity: 0.8,
      currencyCode: 'USD'
    }
  }

  private static readonly INDUSTRY_PROFILES = {
    healthcare: {
      breachCostMultiplier: 1.6,
      complianceComplexity: 1.4,
      downtimeCostPerHour: 8500,
      regulatoryPenaltyRisk: 2000000,
      securityRequirements: ['HIPAA', 'HITECH', 'SOC2'],
      criticalUptime: 99.9
    },
    financial: {
      breachCostMultiplier: 1.4,
      complianceComplexity: 1.5,
      downtimeCostPerHour: 12000,
      regulatoryPenaltyRisk: 10000000,
      securityRequirements: ['PCI-DSS', 'SOX', 'GLBA', 'SOC2'],
      criticalUptime: 99.95
    },
    government: {
      breachCostMultiplier: 1.2,
      complianceComplexity: 1.6,
      downtimeCostPerHour: 8000,
      regulatoryPenaltyRisk: 15000000,
      securityRequirements: ['FISMA', 'FedRAMP', 'NIST'],
      criticalUptime: 99.9
    },
    technology: {
      breachCostMultiplier: 1.0,
      complianceComplexity: 1.0,
      downtimeCostPerHour: 10000,
      regulatoryPenaltyRisk: 3000000,
      securityRequirements: ['SOC2', 'ISO27001'],
      criticalUptime: 99.5
    },
    retail: {
      breachCostMultiplier: 0.9,
      complianceComplexity: 1.2,
      downtimeCostPerHour: 5500,
      regulatoryPenaltyRisk: 500000,
      securityRequirements: ['PCI-DSS', 'GDPR'],
      criticalUptime: 99.8
    },
    manufacturing: {
      breachCostMultiplier: 1.3,
      complianceComplexity: 1.1,
      downtimeCostPerHour: 15000,
      regulatoryPenaltyRisk: 2000000,
      securityRequirements: ['ISO27001', 'IEC62443'],
      criticalUptime: 99.9
    },
    education: {
      breachCostMultiplier: 0.8,
      complianceComplexity: 0.9,
      downtimeCostPerHour: 3000,
      regulatoryPenaltyRisk: 500000,
      securityRequirements: ['FERPA', 'SOC2'],
      criticalUptime: 99.0
    }
  }

  static async calculateComprehensiveTCO(
    vendorId: string,
    config: CalculationConfiguration
  ): Promise<UltimateCalculationResult | null> {
    try {
      // Add input validation
      if (!vendorId || !config) {
        throw new Error('Invalid input parameters')
      }
      
      if (config.devices <= 0 || config.users <= 0 || config.years <= 0) {
        throw new Error('Configuration values must be positive numbers')
      }

      const vendorData = await EnhancedVendorService.getCompleteVendorData(vendorId)
      if (!vendorData) {
        throw new Error(`Vendor data not found for ${vendorId}`)
      }

      const regionFactors = this.REGION_FACTORS[config.region as keyof typeof this.REGION_FACTORS] || this.REGION_FACTORS['north-america']
      const industryProfile = this.INDUSTRY_PROFILES[config.industry as keyof typeof this.INDUSTRY_PROFILES] || this.INDUSTRY_PROFILES.technology

      const breakdown = await this.calculateEnhancedCostBreakdown(vendorData, config, regionFactors, industryProfile)
      const roi = await this.calculateComprehensiveROI(vendorData, config, breakdown, industryProfile)
      const operational = this.calculateDetailedOperationalMetrics(vendorData, config, regionFactors)
      const risk = this.calculateComprehensiveRiskMetrics(vendorData, config, industryProfile)
      const competitive = this.calculateEnhancedCompetitiveMetrics(vendorData, config)
      const timeline = this.calculateDetailedTimelineMetrics(vendorData, config)
      const recommendations = this.generateRecommendations(vendorData, config, breakdown, roi, risk)
      const projections = this.calculateProjections(breakdown, roi, config)

      const totalCost = breakdown.total
      const perDevicePerMonth = totalCost / (config.devices * config.years * 12)
      const perUserPerMonth = totalCost / (config.users * config.years * 12)

      return {
        vendorId,
        vendorName: vendorData.vendor.name,
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
        projections
      }
    } catch (error) {
      console.error(`Error calculating comprehensive TCO for ${vendorId}:`, error)
      return null
    }
  }

  private static async calculateEnhancedCostBreakdown(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration,
    regionFactors: any,
    industryProfile: any
  ): Promise<EnhancedTCOBreakdown> {
    const { devices, users, years } = config

    // Get the most recent pricing
    const currentPricing = vendorData.pricing
      .filter(p => new Date(p.effective_date) <= new Date())
      .sort((a, b) => new Date(b.effective_date).getTime() - new Date(a.effective_date).getTime())[0]

    if (!currentPricing) {
      throw new Error(`No current pricing data available for ${vendorData.vendor.vendor_id}`)
    }

    let licensing = 0
    const breakdown_details: any = {}

    // Calculate licensing with real pricing data
    if (vendorData.vendor.vendor_id === 'portnox') {
      let effectivePrice = config.portnoxBasePrice || currentPricing.price_per_device
      
      // Add addon costs
      if (config.portnoxAddons?.atp) effectivePrice += 1.5
      if (config.portnoxAddons?.compliance) effectivePrice += 1.0
      if (config.portnoxAddons?.iot) effectivePrice += 2.0
      if (config.portnoxAddons?.analytics) effectivePrice += 1.5

      // Apply volume discounts
      const volumeDiscounts = currentPricing.volume_discounts || {}
      const applicableDiscount = Object.entries(volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, Number(discount)), 0)

      if (applicableDiscount > 0) {
        effectivePrice *= (1 - applicableDiscount / 100)
      }

      licensing = effectivePrice * devices * 12 * years
      
      breakdown_details.licensing = {
        amount: licensing,
        description: `Portnox CLEAR subscription with ${Object.keys(config.portnoxAddons || {}).filter(k => config.portnoxAddons?.[k as keyof typeof config.portnoxAddons]).length} add-ons`,
        frequency: 'monthly',
        scaling: 'per-device'
      }
    } else {
      // Calculate for other vendors
      const basePrice = currentPricing.base_price || 0
      const devicePrice = currentPricing.price_per_device || 0
      const userPrice = currentPricing.price_per_user || 0

      if (currentPricing.pricing_model === 'per-device') {
        licensing = (basePrice + devicePrice * devices) * years
      } else if (currentPricing.pricing_model === 'per-user') {
        licensing = (basePrice + userPrice * users) * years
      } else if (currentPricing.pricing_model === 'flat-rate') {
        licensing = basePrice * years
      }

      // Apply volume discounts
      const volumeDiscounts = currentPricing.volume_discounts || {}
      const applicableDiscount = Object.entries(volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, Number(discount)), 0)

      if (applicableDiscount > 0) {
        licensing *= (1 - applicableDiscount / 100)
      }

      breakdown_details.licensing = {
        amount: licensing,
        description: `${vendorData.vendor.name} licensing`,
        frequency: 'annual',
        scaling: currentPricing.pricing_model
      }
    }

    // Calculate other costs from detailed cost records
    const costsByCategory = vendorData.costs.reduce((acc, cost) => {
      if (!acc[cost.cost_category]) acc[cost.cost_category] = 0
      
      let amount = cost.cost_amount
      
      // Apply scaling
      if (cost.cost_scaling === 'per-device') {
        amount *= devices
      } else if (cost.cost_scaling === 'per-user') {
        amount *= users
      } else if (cost.cost_scaling === 'percentage') {
        amount = licensing * (amount / 100)
      }

      // Apply frequency
      if (cost.cost_frequency === 'annual') {
        amount *= years
      } else if (cost.cost_frequency === 'monthly') {
        amount *= 12 * years
      } else if (cost.cost_frequency === 'quarterly') {
        amount *= 4 * years
      }

      // Apply region-specific adjustments
      if (cost.region_specific) {
        amount *= regionFactors.salaryMultiplier
      }

      acc[cost.cost_category] += amount
      
      breakdown_details[`${cost.cost_category}_${cost.cost_subcategory}`] = {
        amount,
        description: cost.description || cost.cost_subcategory,
        frequency: cost.cost_frequency,
        scaling: cost.cost_scaling
      }

      return acc
    }, {} as Record<string, number>)

    // Calculate hidden costs (operational overhead)
    const baseSalary = 125000 * regionFactors.salaryMultiplier
    const requiredFTE = this.calculateRequiredFTE(vendorData, config)
    const operationalCost = requiredFTE * baseSalary * years

    // Industry-specific compliance costs
    const complianceCost = this.calculateComplianceCosts(vendorData, config, industryProfile)

    const total = licensing + 
                 (costsByCategory.hardware || 0) +
                 (costsByCategory.services || 0) +
                 (costsByCategory.training || 0) +
                 (costsByCategory.maintenance || 0) +
                 (costsByCategory.support || 0) +
                 operationalCost +
                 complianceCost

    return {
      licensing,
      hardware: costsByCategory.hardware || 0,
      implementation: costsByCategory.services || 0,
      support: costsByCategory.support || 0,
      training: costsByCategory.training || 0,
      maintenance: costsByCategory.maintenance || 0,
      hidden: costsByCategory.hidden || 0,
      operational: operationalCost,
      compliance: complianceCost,
      total,
      breakdown_details
    }
  }

  private static async calculateComprehensiveROI(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration,
    breakdown: EnhancedTCOBreakdown,
    industryProfile: any
  ): Promise<ComprehensiveROIMetrics> {
    // Get industry benchmarks for accurate calculations
    let benchmarks = []
    if (isSupabaseAvailable()) {
      benchmarks = await EnhancedDatabaseService.getIndustryBenchmarks(config.industry, config.orgSize)
    } else {
      benchmarks = await mockDataService.getIndustryBenchmarks(config.industry, config.orgSize)
    }
    
    const avgBreachCost = benchmarks.find(b => b.metric_name === 'average_breach_cost')?.metric_value || 
                         industryProfile.breachCostMultiplier * 4000000

    // Calculate comprehensive savings
    const breachRiskReduction = this.calculateBreachRiskReduction(vendorData)
    const breachSavings = breachRiskReduction * avgBreachCost * industryProfile.breachCostMultiplier

    const operationalSavings = this.calculateOperationalSavings(vendorData, config)
    const complianceSavings = this.calculateComplianceSavings(vendorData, config, industryProfile)
    const productivitySavings = this.calculateProductivitySavings(vendorData, config)
    const downtimeSavings = this.calculateDowntimeSavings(vendorData, config, industryProfile)

    const totalAnnualSavings = breachSavings + operationalSavings + complianceSavings + productivitySavings + downtimeSavings
    const annualCost = breakdown.total / config.years
    const netAnnualBenefit = totalAnnualSavings - annualCost

    // Advanced financial metrics
    const discountRate = 0.1 // 10% discount rate
    const npv = this.calculateNPV(breakdown.total, totalAnnualSavings, config.years, discountRate)
    const irr = this.calculateIRR(breakdown.total, totalAnnualSavings, config.years)
    const profitabilityIndex = npv / breakdown.total

    const roi = netAnnualBenefit > 0 ? (netAnnualBenefit * config.years / breakdown.total) * 100 : 0
    const paybackMonths = netAnnualBenefit > 0 ? (breakdown.total / netAnnualBenefit) * 12 : 999

    // Sensitivity analysis
    const sensitivityAnalysis = {
      optimistic: {
        roi: roi * 1.3,
        payback: paybackMonths * 0.8
      },
      realistic: {
        roi,
        payback: paybackMonths
      },
      pessimistic: {
        roi: roi * 0.7,
        payback: paybackMonths * 1.4
      }
    }

    return {
      paybackMonths: Math.min(paybackMonths, 999),
      percentage: roi,
      annualSavings: totalAnnualSavings,
      breachReduction: breachRiskReduction * 100,
      laborSavingsFTE: this.calculateFTESavings(vendorData, config),
      timeToValue: vendorData.vendor.deployment_type === 'cloud' ? 1 : 30,
      netPresentValue: npv,
      internalRateOfReturn: irr,
      profitabilityIndex,
      sensitivityAnalysis
    }
  }

  private static calculateDetailedOperationalMetrics(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration,
    regionFactors: any
  ): DetailedOperationalMetrics {
    const automationLevel = this.calculateAutomationLevel(vendorData)
    const fteSaved = this.calculateFTESavings(vendorData, config)
    
    // Calculate maintenance windows based on deployment type
    let maintenanceWindows = 0
    if (vendorData.vendor.deployment_type === 'on-premise') {
      maintenanceWindows = 6 // Monthly maintenance
    } else if (vendorData.vendor.deployment_type === 'hybrid') {
      maintenanceWindows = 3 // Quarterly maintenance
    } // Cloud = 0 maintenance windows

    // Calculate MTTR based on automation and vendor capabilities
    const baseMTTR = vendorData.vendor.deployment_type === 'cloud' ? 0.5 : 2
    const mttr = baseMTTR * (1 - automationLevel / 200)

    const baseSalary = 125000 * regionFactors.salaryMultiplier
    const annualOpsSaving = fteSaved * baseSalary

    // Additional operational metrics
    const productivityGains = automationLevel * 0.8 // 80% correlation
    const errorReduction = automationLevel * 0.9 // 90% correlation
    const scalabilityScore = vendorData.vendor.deployment_type === 'cloud' ? 95 : 60
    const userExperienceScore = this.calculateUserExperienceScore(vendorData)
    const adminEfficiencyGain = automationLevel * 0.85

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
      adminEfficiencyGain
    }
  }

  private static calculateComprehensiveRiskMetrics(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration,
    industryProfile: any
  ): ComprehensiveRiskMetrics {
    const security = vendorData.security
    const securityScore = security?.security_rating || 70
    
    // Calculate compliance score based on framework support
    const requiredFrameworks = industryProfile.securityRequirements
    const supportedFrameworks = security?.compliance_frameworks || []
    const complianceScore = (supportedFrameworks.filter(f => requiredFrameworks.includes(f)).length / requiredFrameworks.length) * 100

    // Calculate breach risk reduction
    const breachReduction = this.calculateBreachRiskReduction(vendorData)

    // Vendor risk assessment
    const vendorRisk = this.calculateVendorRisk(vendorData)
    
    // Operational risk
    const operationalRisk = this.calculateOperationalRisk(vendorData, config)
    
    // Financial risk
    const financialRisk = this.calculateFinancialRisk(vendorData, config)
    
    // Reputational risk
    const reputationalRisk = this.calculateReputationalRisk(vendorData, security)

    // Risk mitigation value
    const riskMitigationValue = (breachReduction * industryProfile.regulatoryPenaltyRisk * 0.1) + 
                               (operationalRisk * 50000) + 
                               (reputationalRisk * 100000)

    // Insurance premium impact
    const insurancePremiumImpact = breachReduction * 0.15 * 50000 // 15% reduction on $50k premium

    return {
      securityScore,
      complianceScore,
      breachReduction: breachReduction * 100,
      vendorRisk,
      operationalRisk,
      financialRisk,
      reputationalRisk,
      riskMitigationValue,
      insurancePremiumImpact
    }
  }

  private static calculateEnhancedCompetitiveMetrics(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration
  ): EnhancedCompetitiveMetrics {
    const vendor = vendorData.vendor
    const intelligence = vendorData.intelligence

    // Innovation score based on features and technology
    let innovationScore = 60
    if (vendor.deployment_type === 'cloud') innovationScore += 20
    if (vendorData.features.some(f => f.feature_name.includes('ai'))) innovationScore += 15
    if (vendor.founded_year && vendor.founded_year > 2010) innovationScore += 10

    // Future readiness
    let futureReadiness = 50
    if (vendor.deployment_type === 'cloud') futureReadiness += 25
    if (vendorData.security?.zero_trust_maturity > 80) futureReadiness += 15
    if (vendor.category === 'visionary') futureReadiness += 10

    // Market position
    const marketPosition = Math.min(100, vendor.market_share * 2 + 
      (vendor.category === 'leader' ? 20 : vendor.category === 'challenger' ? 15 : 10))

    // Technology leadership
    const technologyLeadership = this.calculateTechnologyLeadership(vendorData)

    // Ecosystem strength
    const ecosystemStrength = this.calculateEcosystemStrength(vendorData)

    // Customer loyalty
    const customerLoyalty = vendorData.realTimeMetrics.customerSatisfaction

    // Partner network strength
    const partnerNetwork = vendor.market_share > 10 ? 80 : 60

    // Investment in R&D (estimated based on company size and type)
    const investmentInRnD = vendor.annual_revenue ? 
      Math.min(100, (vendor.annual_revenue * 0.15) / 1000000) : 50

    return {
      innovationScore: Math.min(100, innovationScore),
      futureReadiness: Math.min(100, futureReadiness),
      marketPosition,
      technologyLeadership,
      ecosystemStrength,
      customerLoyalty,
      partnerNetwork,
      investmentInRnD
    }
  }

  private static calculateDetailedTimelineMetrics(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration
  ): DetailedTimelineMetrics {
    const deploymentDays = vendorData.vendor.deployment_type === 'cloud' ? 1 : 
                          vendorData.vendor.deployment_type === 'hybrid' ? 30 : 90

    return {
      timeToValue: deploymentDays,
      implementationWeeks: Math.ceil(deploymentDays / 7),
      trainingDays: Math.ceil((vendorData.intelligence.find(i => i.metric_name === 'training_hours')?.metric_value || 16) / 8),
      migrationComplexity: vendorData.vendor.deployment_type === 'cloud' ? 20 : 80,
      rollbackRisk: vendorData.vendor.deployment_type === 'cloud' ? 10 : 60,
      changeManagementEffort: this.calculateChangeManagementEffort(vendorData, config),
      userAdoptionTime: vendorData.vendor.deployment_type === 'cloud' ? 7 : 30,
      fullValueRealization: deploymentDays + 30
    }
  }

  private static generateRecommendations(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration,
    breakdown: EnhancedTCOBreakdown,
    roi: ComprehensiveROIMetrics,
    risk: ComprehensiveRiskMetrics
  ) {
    // Calculate suitability score
    let suitability = 70
    if (vendorData.vendor.deployment_type === 'cloud') suitability += 15
    if (risk.securityScore > 90) suitability += 10
    if (roi.percentage > 100) suitability += 5

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'medium'
    if (risk.vendorRisk < 20 && risk.securityScore > 85) riskLevel = 'low'
    else if (risk.vendorRisk > 60 || risk.securityScore < 60) riskLevel = 'high'

    // Implementation complexity
    let implementationComplexity: 'simple' | 'moderate' | 'complex' = 'moderate'
    if (vendorData.vendor.deployment_type === 'cloud') implementationComplexity = 'simple'
    else if (vendorData.vendor.deployment_type === 'on-premise') implementationComplexity = 'complex'

    // Strategic fit
    let strategicFit = 70
    if (config.industry === 'technology' && vendorData.vendor.category === 'visionary') strategicFit += 20
    if (config.industry === 'healthcare' && risk.complianceScore > 90) strategicFit += 15

    // Overall score
    const overallScore = (suitability + strategicFit + (100 - risk.vendorRisk)) / 3

    return {
      suitability: Math.min(100, suitability),
      riskLevel,
      implementationComplexity,
      strategicFit: Math.min(100, strategicFit),
      overallScore: Math.min(100, overallScore)
    }
  }

  private static calculateProjections(
    breakdown: EnhancedTCOBreakdown,
    roi: ComprehensiveROIMetrics,
    config: CalculationConfiguration
  ) {
    const annualCost = breakdown.total / config.years
    const annualSavings = roi.annualSavings

    return {
      year1: annualCost,
      year3: annualCost * 3,
      year5: annualCost * 5,
      breakEvenMonth: roi.paybackMonths
    }
  }

  // Helper methods for detailed calculations
  private static calculateRequiredFTE(vendorData: CompleteVendorData, config: CalculationConfiguration): number {
    const baselineFTE = 3.0 // Traditional NAC baseline
    const automationLevel = this.calculateAutomationLevel(vendorData)
    const complexityFactor = vendorData.vendor.deployment_type === 'cloud' ? 0.2 : 
                            vendorData.vendor.deployment_type === 'hybrid' ? 0.6 : 1.0
    
    return Math.max(0.1, baselineFTE * complexityFactor * (1 - automationLevel / 100))
  }

  private static calculateAutomationLevel(vendorData: CompleteVendorData): number {
    let automation = 40 // baseline

    if (vendorData.vendor.deployment_type === 'cloud') automation += 30
    if (vendorData.vendor.vendor_id === 'portnox') automation += 25
    if (vendorData.features.some(f => f.feature_name.includes('ai'))) automation += 15
    if (vendorData.features.some(f => f.feature_name.includes('automated'))) automation += 10

    return Math.min(100, automation)
  }

  private static calculateBreachRiskReduction(vendorData: CompleteVendorData): number {
    const security = vendorData.security
    if (!security) return 0.3

    const baseRisk = 0.15 // 15% annual breach probability
    const securityFactor = security.security_rating / 100
    const cveFactor = Math.max(0.1, 1 - security.cve_count_total / 50)
    const zeroTrustFactor = security.zero_trust_maturity / 100

    const vendorRisk = baseRisk * (1 - securityFactor * cveFactor * zeroTrustFactor)
    return Math.max(0, (baseRisk - vendorRisk) / baseRisk)
  }

  private static calculateOperationalSavings(vendorData: CompleteVendorData, config: CalculationConfiguration): number {
    const automationLevel = this.calculateAutomationLevel(vendorData)
    const fteSaved = this.calculateFTESavings(vendorData, config)
    const baseSalary = 125000

    return fteSaved * baseSalary + (automationLevel / 100) * 50000 // Additional efficiency savings
  }

  private static calculateFTESavings(vendorData: CompleteVendorData, config: CalculationConfiguration): number {
    const baselineFTE = 3.0
    const requiredFTE = this.calculateRequiredFTE(vendorData, config)
    return Math.max(0, baselineFTE - requiredFTE)
  }

  private static calculateComplianceCosts(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration,
    industryProfile: any
  ): number {
    const requiredFrameworks = industryProfile.securityRequirements
    const supportedFrameworks = vendorData.security?.compliance_frameworks || []
    const unsupportedCount = requiredFrameworks.filter(f => !supportedFrameworks.includes(f)).length
    
    // Cost per unsupported framework
    return unsupportedCount * 50000 * config.years
  }

  private static calculateComplianceSavings(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration,
    industryProfile: any
  ): number {
    const automatedCompliance = vendorData.features.some(f => 
      f.feature_category === 'compliance' && f.support_level === 'native'
    )
    
    let savings = 0
    if (automatedCompliance) {
      savings += 100000 // Annual compliance automation savings
    }

    // Framework-specific savings
    const supportedFrameworks = vendorData.security?.compliance_frameworks || []
    savings += supportedFrameworks.length * 25000

    return savings
  }

  private static calculateProductivitySavings(vendorData: CompleteVendorData, config: CalculationConfiguration): number {
    const automationLevel = this.calculateAutomationLevel(vendorData)
    const userCount = config.users
    
    // Productivity gain per user per year
    const productivityGainPerUser = (automationLevel / 100) * 500 // $500 per user max
    return userCount * productivityGainPerUser
  }

  private static calculateDowntimeSavings(
    vendorData: CompleteVendorData,
    config: CalculationConfiguration,
    industryProfile: any
  ): number {
    const uptimeImprovement = vendorData.vendor.deployment_type === 'cloud' ? 0.02 : 0.01 // 2% or 1%
    const annualHours = 8760
    const downtimeReduction = uptimeImprovement * annualHours
    
    return downtimeReduction * industryProfile.downtimeCostPerHour
  }

  private static calculateVendorRisk(vendorData: CompleteVendorData): number {
    let risk = 50 // baseline

    // Market presence risk
    if (vendorData.vendor.market_share < 1) risk += 30
    else if (vendorData.vendor.market_share < 5) risk += 15

    // Financial stability risk
    if (vendorData.vendor.annual_revenue && vendorData.vendor.annual_revenue < 10000000) risk += 20

    // Security track record risk
    if (vendorData.security?.cve_count_critical > 0) risk += 25
    if (vendorData.security?.security_incidents?.length > 0) risk += 15

    return Math.min(100, Math.max(0, risk))
  }

  private static calculateOperationalRisk(vendorData: CompleteVendorData, config: CalculationConfiguration): number {
    let risk = 30 // baseline

    if (vendorData.vendor.deployment_type === 'on-premise') risk += 20
    if (vendorData.realTimeMetrics.deploymentSuccess < 80) risk += 15
    if (vendorData.realTimeMetrics.supportQuality < 70) risk += 10

    return Math.min(100, risk)
  }

  private static calculateFinancialRisk(vendorData: CompleteVendorData, config: CalculationConfiguration): number {
    let risk = 20 // baseline

    // Pricing volatility risk
    const pricingHistory = vendorData.pricing
    if (pricingHistory.length > 1) {
      const priceChanges = pricingHistory.slice(0, -1).map((p, i) => 
        Math.abs(p.price_per_device - pricingHistory[i + 1].price_per_device) / pricingHistory[i + 1].price_per_device
      )
      const avgPriceVolatility = priceChanges.reduce((sum, change) => sum + change, 0) / priceChanges.length
      risk += avgPriceVolatility * 100
    }

    // Vendor financial stability
    if (vendorData.vendor.annual_revenue && vendorData.vendor.annual_revenue < 50000000) risk += 15

    return Math.min(100, risk)
  }

  private static calculateReputationalRisk(vendorData: CompleteVendorData, security: any): number {
    let risk = 10 // baseline

    if (security?.security_incidents?.length > 0) risk += 30
    if (security?.cve_count_critical > 5) risk += 25
    if (vendorData.realTimeMetrics.customerSatisfaction < 60) risk += 20

    return Math.min(100, risk)
  }

  private static calculateUserExperienceScore(vendorData: CompleteVendorData): number {
    let score = 70 // baseline

    if (vendorData.vendor.deployment_type === 'cloud') score += 15
    if (vendorData.features.some(f => f.feature_name.includes('self-service'))) score += 10
    if (vendorData.realTimeMetrics.customerSatisfaction > 85) score += 5

    return Math.min(100, score)
  }

  private static calculateTechnologyLeadership(vendorData: CompleteVendorData): number {
    let score = 50

    const aiFeatures = vendorData.features.filter(f => f.feature_name.includes('ai')).length
    const cloudNative = vendorData.vendor.deployment_type === 'cloud'
    const zeroTrust = vendorData.security?.zero_trust_maturity || 0

    score += aiFeatures * 10
    if (cloudNative) score += 20
    score += zeroTrust * 0.3

    return Math.min(100, score)
  }

  private static calculateEcosystemStrength(vendorData: CompleteVendorData): number {
    const integrationFeatures = vendorData.features.filter(f => 
      f.feature_category === 'integration'
    ).length

    return Math.min(100, 40 + integrationFeatures * 10)
  }

  private static calculateChangeManagementEffort(vendorData: CompleteVendorData, config: CalculationConfiguration): number {
    let effort = 50 // baseline

    if (vendorData.vendor.deployment_type === 'cloud') effort -= 20
    if (config.devices > 5000) effort += 15
    if (vendorData.features.some(f => f.feature_name.includes('migration'))) effort -= 10

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
    
    return irr * 100
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
}