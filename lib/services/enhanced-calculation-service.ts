import { ComprehensiveVendorDatabase, type VendorData } from '../comprehensive-vendor-data'
import { isSupabaseAvailable, mockDataService } from '../database/enhanced-client'

export interface CalculationConfiguration {
  orgSize: "startup" | "smb" | "medium" | "enterprise" | "xlarge"
  devices: number
  users: number
  industry: string
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
  operational: number
  hidden: number
  consulting: number
  integration: number
  migration: number
  compliance: number
  total: number
}

export interface ROIMetrics {
  percentage: number
  paybackMonths: number
  annualSavings: number
  netPresentValue: number
  internalRateOfReturn: number
  profitabilityIndex: number
  breachReduction: number
  laborSavingsFTE: number
  timeToValue: number
  sensitivityAnalysis: {
    optimistic: { roi: number; payback: number }
    realistic: { roi: number; payback: number }
    pessimistic: { roi: number; payback: number }
  }
}

export interface RiskMetrics {
  securityScore: number
  complianceScore: number
  breachReduction: number
  vendorRisk: number
  operationalRisk: number
  financialRisk: number
}

export interface OperationalMetrics {
  automationLevel: number
  fteSaved: number
  maintenanceWindows: number
  mttr: number
  annualOpsSaving: number
  deploymentSpeed: number
  scalabilityScore: number
}

export interface CompetitiveMetrics {
  innovationScore: number
  futureReadiness: number
  marketPosition: number
  customerSatisfaction: number
  vendorStability: number
}

export interface BusinessImpact {
  digitalTransformation: number
  operationalExcellence: number
  riskMitigation: number
  complianceAutomation: number
  productivityGains: number
  strategicValue: number
}

export interface Recommendations {
  overallScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  recommendation: string
  keyBenefits: string[]
  considerations: string[]
  migrationPriority: 'immediate' | 'high' | 'medium' | 'low'
}

export interface UltimateCalculationResult {
  vendorId: string
  vendorName: string
  totalCost: number
  perDevicePerMonth: number
  perUserPerMonth: number
  breakdown: TCOBreakdown
  roi: ROIMetrics
  risk: RiskMetrics
  operational: OperationalMetrics
  competitive: CompetitiveMetrics
  businessImpact: BusinessImpact
  recommendations: Recommendations
  vendorData: VendorData
  lastUpdated: string
}

// Industry-specific factors based on 2024 research
const INDUSTRY_FACTORS = {
  healthcare: {
    breachCostMultiplier: 2.4, // $10.93M average
    complianceComplexity: 1.5,
    downtimeCostPerHour: 12500,
    regulatoryPenalty: 2000000,
    securityRequirement: 0.9
  },
  financial: {
    breachCostMultiplier: 1.4, // $5.9M average
    complianceComplexity: 1.6,
    downtimeCostPerHour: 18000,
    regulatoryPenalty: 25000000,
    securityRequirement: 0.95
  },
  government: {
    breachCostMultiplier: 0.6, // $2.6M average
    complianceComplexity: 1.3,
    downtimeCostPerHour: 15000,
    regulatoryPenalty: 50000000,
    securityRequirement: 0.98
  },
  technology: {
    breachCostMultiplier: 1.0, // $4.1M average
    complianceComplexity: 1.0,
    downtimeCostPerHour: 25000,
    regulatoryPenalty: 10000000,
    securityRequirement: 0.85
  },
  retail: {
    breachCostMultiplier: 0.8, // $3.2M average
    complianceComplexity: 1.1,
    downtimeCostPerHour: 8500,
    regulatoryPenalty: 2000000,
    securityRequirement: 0.8
  },
  manufacturing: {
    breachCostMultiplier: 1.0, // $4.2M average
    complianceComplexity: 1.0,
    downtimeCostPerHour: 35000,
    regulatoryPenalty: 5000000,
    securityRequirement: 0.75
  },
  education: {
    breachCostMultiplier: 0.7, // $2.8M average
    complianceComplexity: 0.9,
    downtimeCostPerHour: 4500,
    regulatoryPenalty: 1000000,
    securityRequirement: 0.7
  }
}

// Regional salary multipliers for 2024
const REGIONAL_MULTIPLIERS = {
  'north-america': 1.0,
  'europe': 0.76,
  'asia-pacific': 0.52,
  'latin-america': 0.44,
  'middle-east': 0.64
}

// Organization size profiles
const ORG_SIZE_PROFILES = {
  startup: { devices: 100, users: 50, itStaff: 1, avgSalary: 120000 },
  smb: { devices: 500, users: 250, itStaff: 3, avgSalary: 125000 },
  medium: { devices: 2500, users: 1500, itStaff: 8, avgSalary: 130000 },
  enterprise: { devices: 10000, users: 7500, itStaff: 25, avgSalary: 140000 },
  xlarge: { devices: 50000, users: 35000, itStaff: 100, avgSalary: 150000 }
}

export class EnhancedCalculationService {
  static async calculateComprehensiveTCO(
    vendorId: string,
    config: CalculationConfiguration
  ): Promise<UltimateCalculationResult | null> {
    try {
      const vendor = ComprehensiveVendorDatabase[vendorId]
      if (!vendor) {
        console.error(`Vendor data not found for ${vendorId}`)
        return null
      }

      const orgProfile = ORG_SIZE_PROFILES[config.orgSize] || ORG_SIZE_PROFILES.medium
      const industryFactor = INDUSTRY_FACTORS[config.industry as keyof typeof INDUSTRY_FACTORS] || INDUSTRY_FACTORS.technology
      const regionalMultiplier = REGIONAL_MULTIPLIERS[config.region as keyof typeof REGIONAL_MULTIPLIERS] || 1.0

      // Calculate comprehensive TCO breakdown
      const breakdown = this.calculateTCOBreakdown(vendor, config, orgProfile, industryFactor, regionalMultiplier)
      
      // Calculate advanced ROI metrics
      const roi = this.calculateAdvancedROI(vendor, config, breakdown, industryFactor, regionalMultiplier)
      
      // Calculate risk metrics
      const risk = this.calculateRiskMetrics(vendor, config, industryFactor)
      
      // Calculate operational metrics
      const operational = this.calculateOperationalMetrics(vendor, config, orgProfile, regionalMultiplier)
      
      // Calculate competitive metrics
      const competitive = this.calculateCompetitiveMetrics(vendor, config)
      
      // Calculate business impact
      const businessImpact = this.calculateBusinessImpact(vendor, config, breakdown, industryFactor)
      
      // Generate recommendations
      const recommendations = this.generateRecommendations(vendor, config, breakdown, roi, risk)

      return {
        vendorId,
        vendorName: vendor.name,
        totalCost: breakdown.total,
        perDevicePerMonth: breakdown.total / (config.devices * config.years * 12),
        perUserPerMonth: breakdown.total / (config.users * config.years * 12),
        breakdown,
        roi,
        risk,
        operational,
        competitive,
        businessImpact,
        recommendations,
        vendorData: vendor,
        lastUpdated: new Date().toISOString()
      }
    } catch (error) {
      console.error(`Error calculating comprehensive TCO for ${vendorId}:`, error)
      return null
    }
  }

  private static calculateTCOBreakdown(
    vendor: VendorData,
    config: CalculationConfiguration,
    orgProfile: any,
    industryFactor: any,
    regionalMultiplier: number
  ): TCOBreakdown {
    const { devices, users, years } = config
    const pricing = vendor.pricing

    // 1. Licensing Costs
    let licensing = 0
    if (vendor.id === 'portnox') {
      let effectivePrice = config.portnoxBasePrice
      
      // Apply volume discounts
      const applicableDiscount = Object.entries(pricing.volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, discount), 0)
      
      if (applicableDiscount > 0) {
        effectivePrice *= (1 - applicableDiscount / 100)
      }
      
      // Apply contract term discounts
      const termDiscount = pricing.contractTerms[years.toString()] || 0
      effectivePrice *= (1 - termDiscount / 100)
      
      licensing = effectivePrice * devices * 12 * years
    } else {
      const basePrice = pricing.basePrice || 0
      let devicePrice = pricing.pricePerDevice || 0
      const userPrice = pricing.pricePerUser || 0
      
      // Apply volume discounts
      const applicableDiscount = Object.entries(pricing.volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, discount), 0)
      
      if (applicableDiscount > 0) {
        devicePrice *= (1 - applicableDiscount / 100)
      }
      
      // Apply contract term discounts
      const termDiscount = pricing.contractTerms[years.toString()] || 0
      devicePrice *= (1 - termDiscount / 100)
      
      if (pricing.model === 'per-device') {
        licensing = basePrice + (devicePrice * devices * 12 * years)
      } else if (pricing.model === 'per-user') {
        licensing = basePrice + (userPrice * users * 12 * years)
      } else if (pricing.model === 'flat-rate') {
        licensing = basePrice * years
      } else {
        // Quote-based - estimate
        licensing = devicePrice * devices * 12 * years
      }
      
      // Add required add-ons for functionality
      if (vendor.id === 'microsoft_nps') {
        // Microsoft requires multiple add-ons for basic NAC functionality
        licensing += 6 * users * 12 * years // Azure AD Premium
        licensing += 8 * users * 12 * years // Intune
        licensing += 50000 * years // Sentinel
      }
    }

    // 2. Hardware Costs
    const hardware = pricing.additionalCosts.hardware || 0

    // 3. Implementation Costs
    const implementation = pricing.professionalServices.implementation +
                          pricing.professionalServices.customization +
                          pricing.professionalServices.migration

    // 4. Support Costs
    const support = (pricing.additionalCosts.support || 0) * years

    // 5. Training Costs
    const training = pricing.professionalServices.training +
                    (pricing.additionalCosts.training || 0)

    // 6. Maintenance Costs
    const maintenance = (pricing.additionalCosts.maintenance || 0) * years

    // 7. Operational Costs (FTE)
    const avgSalary = orgProfile.avgSalary * regionalMultiplier
    const requiredFTE = vendor.implementation.resourcesRequired.ongoing || 1.0
    const operational = requiredFTE * avgSalary * years

    // 8. Hidden Costs
    const complexityMultiplier = vendor.implementation.complexity === 'high' ? 1.5 : 
                                vendor.implementation.complexity === 'medium' ? 1.2 : 1.0
    const hidden = (licensing * 0.15 * complexityMultiplier) + // Complexity tax
                  (devices * 50 * years) + // Unexpected costs per device
                  (vendor.operational.maintenanceWindows * 5000 * years) // Downtime costs

    // 9. Consulting Costs
    const consulting = pricing.professionalServices.designServices +
                      (pricing.additionalCosts.services || 0)

    // 10. Integration Costs
    const integration = (pricing.additionalCosts.integration || 0) +
                       (devices * 2 * years) // Integration complexity per device

    // 11. Migration Costs (if replacing existing solution)
    const migration = pricing.professionalServices.migration || 0

    // 12. Compliance Costs
    const complianceAutomation = vendor.features.compliance.automatedCompliance ? 0 : 
                                devices * 10 * years // Manual compliance overhead
    const compliance = complianceAutomation

    const total = licensing + hardware + implementation + support + training + 
                 maintenance + operational + hidden + consulting + integration + 
                 migration + compliance

    return {
      licensing,
      hardware,
      implementation,
      support,
      training,
      maintenance,
      operational,
      hidden,
      consulting,
      integration,
      migration,
      compliance,
      total
    }
  }

  private static calculateAdvancedROI(
    vendor: VendorData,
    config: CalculationConfiguration,
    breakdown: TCOBreakdown,
    industryFactor: any,
    regionalMultiplier: number
  ): ROIMetrics {
    const { devices, years } = config
    const avgSalary = 130000 * regionalMultiplier

    // Calculate annual benefits
    const securityBenefits = this.calculateSecurityBenefits(vendor, config, industryFactor)
    const operationalBenefits = this.calculateOperationalBenefits(vendor, config, avgSalary)
    const complianceBenefits = this.calculateComplianceBenefits(vendor, config, industryFactor)
    const productivityBenefits = this.calculateProductivityBenefits(vendor, config, avgSalary)

    const totalAnnualBenefits = securityBenefits + operationalBenefits + complianceBenefits + productivityBenefits
    const annualCost = breakdown.total / years
    const netAnnualBenefit = totalAnnualBenefits - annualCost

    // Calculate financial metrics
    const roi = netAnnualBenefit > 0 ? (netAnnualBenefit * years / breakdown.total) * 100 : 0
    const paybackMonths = netAnnualBenefit > 0 ? (breakdown.total / netAnnualBenefit) * 12 : 999

    // Calculate NPV (assuming 10% discount rate)
    const discountRate = 0.10
    let npv = -breakdown.total
    for (let year = 1; year <= years; year++) {
      npv += totalAnnualBenefits / Math.pow(1 + discountRate, year)
    }

    // Calculate IRR (simplified)
    const irr = netAnnualBenefit > 0 ? (totalAnnualBenefits / breakdown.total) * 100 : 0

    // Calculate Profitability Index
    const profitabilityIndex = npv > 0 ? (npv + breakdown.total) / breakdown.total : 0

    // Sensitivity Analysis
    const sensitivityAnalysis = {
      optimistic: {
        roi: roi * 1.3,
        payback: paybackMonths * 0.8
      },
      realistic: {
        roi: roi,
        payback: paybackMonths
      },
      pessimistic: {
        roi: roi * 0.7,
        payback: paybackMonths * 1.4
      }
    }

    return {
      percentage: roi,
      paybackMonths: Math.min(paybackMonths, 999),
      annualSavings: totalAnnualBenefits,
      netPresentValue: npv,
      internalRateOfReturn: irr,
      profitabilityIndex,
      breachReduction: this.calculateBreachReduction(vendor),
      laborSavingsFTE: this.calculateLaborSavings(vendor, config),
      timeToValue: vendor.implementation.timeToDeployDays,
      sensitivityAnalysis
    }
  }

  private static calculateSecurityBenefits(vendor: VendorData, config: CalculationConfiguration, industryFactor: any): number {
    const baseBreachCost = 4100000 * industryFactor.breachCostMultiplier
    const breachProbability = 0.15 // 15% annual probability baseline
    
    // Calculate vendor-specific breach risk
    const vendorBreachRisk = Math.max(0.01, breachProbability * (vendor.security.cveCount / 50))
    const breachReduction = (breachProbability - vendorBreachRisk) / breachProbability
    
    return breachReduction * baseBreachCost * 0.3 // 30% of breach cost as annual benefit
  }

  private static calculateOperationalBenefits(vendor: VendorData, config: CalculationConfiguration, avgSalary: number): number {
    const automationSavings = (vendor.operational.automationLevel / 100) * 2.5 * avgSalary
    const maintenanceSavings = (12 - vendor.operational.maintenanceWindows) * 5000
    const mttrSavings = (8 - vendor.operational.mttr) * 2000
    
    return automationSavings + maintenanceSavings + mttrSavings
  }

  private static calculateComplianceBenefits(vendor: VendorData, config: CalculationConfiguration, industryFactor: any): number {
    if (!vendor.features.compliance.automatedCompliance) return 0
    
    const complianceFrameworks = vendor.features.compliance.frameworks.length
    const frameworkSavings = complianceFrameworks * 25000 // $25k per framework
    const auditSavings = vendor.features.compliance.auditReadiness ? 50000 : 0
    
    return frameworkSavings + auditSavings
  }

  private static calculateProductivityBenefits(vendor: VendorData, config: CalculationConfiguration, avgSalary: number): number {
    const deploymentSpeed = (180 - vendor.implementation.timeToDeployDays) / 180
    const userExperience = vendor.features.core.byodSupport && vendor.features.core.guestAccess ? 0.1 : 0.05
    
    return deploymentSpeed * avgSalary * 0.5 + config.users * userExperience * 100
  }

  private static calculateBreachReduction(vendor: VendorData): number {
    const baseRisk = 15 // 15% baseline
    const cveImpact = vendor.security.cveCount * 0.5
    const securityRating = vendor.security.securityRating
    
    const vendorRisk = Math.max(1, baseRisk + cveImpact - (securityRating - 70) / 5)
    return Math.max(0, (baseRisk - vendorRisk) / baseRisk * 100)
  }

  private static calculateLaborSavings(vendor: VendorData, config: CalculationConfiguration): number {
    const baselineFTE = 3.0 // Baseline for traditional NAC management
    const vendorFTE = vendor.implementation.resourcesRequired.ongoing || 1.0
    return Math.max(0, baselineFTE - vendorFTE)
  }

  private static calculateRiskMetrics(vendor: VendorData, config: CalculationConfiguration, industryFactor: any): RiskMetrics {
    const securityScore = vendor.security.securityRating
    const complianceScore = Math.min(100, vendor.features.compliance.frameworks.length * 12 + 40)
    const breachReduction = this.calculateBreachReduction(vendor)
    
    // Vendor risk based on market presence and track record
    const vendorRisk = Math.max(0, 50 - vendor.marketShare - (securityScore - 70))
    
    // Operational risk based on complexity and automation
    const operationalRisk = vendor.implementation.complexity === 'high' ? 80 : 
                           vendor.implementation.complexity === 'medium' ? 50 : 20
    
    // Financial risk based on vendor stability
    const financialRisk = vendor.revenue < 100000000 ? 60 : 
                         vendor.revenue < 1000000000 ? 30 : 10

    return {
      securityScore,
      complianceScore,
      breachReduction,
      vendorRisk,
      operationalRisk,
      financialRisk
    }
  }

  private static calculateOperationalMetrics(
    vendor: VendorData,
    config: CalculationConfiguration,
    orgProfile: any,
    regionalMultiplier: number
  ): OperationalMetrics {
    const automationLevel = vendor.operational.automationLevel
    const fteSaved = this.calculateLaborSavings(vendor, config)
    const maintenanceWindows = vendor.operational.maintenanceWindows
    const mttr = vendor.operational.mttr
    const avgSalary = orgProfile.avgSalary * regionalMultiplier
    const annualOpsSaving = fteSaved * avgSalary
    const deploymentSpeed = 100 - (vendor.implementation.timeToDeployDays / 180 * 100)
    const scalabilityScore = vendor.operational.scalability.cloudNative ? 95 : 
                            vendor.operational.scalability.maxDevices > 50000 ? 80 : 60

    return {
      automationLevel,
      fteSaved,
      maintenanceWindows,
      mttr,
      annualOpsSaving,
      deploymentSpeed,
      scalabilityScore
    }
  }

  private static calculateCompetitiveMetrics(vendor: VendorData, config: CalculationConfiguration): CompetitiveMetrics {
    // Innovation score based on features and technology
    let innovationScore = 50
    if (vendor.features.advanced.aiDriven) innovationScore += 20
    if (vendor.features.advanced.zeroTrust) innovationScore += 15
    if (vendor.features.advanced.mlAnalytics) innovationScore += 10
    if (vendor.deploymentType === 'cloud') innovationScore += 15
    
    // Future readiness
    let futureReadiness = 40
    if (vendor.operational.scalability.cloudNative) futureReadiness += 25
    if (vendor.features.advanced.apiFirst) futureReadiness += 15
    if (vendor.features.integrations.containerSupport) futureReadiness += 10
    if (vendor.security.zeroTrustMaturity > 80) futureReadiness += 10
    
    // Market position
    const marketPosition = vendor.marketShare * 2 + 
                          (vendor.category === 'leader' ? 20 : 
                           vendor.category === 'challenger' ? 15 :
                           vendor.category === 'visionary' ? 10 : 5)
    
    // Customer satisfaction (estimated based on features and market position)
    const customerSatisfaction = vendor.operational.automationLevel * 0.5 + 
                                vendor.security.securityRating * 0.3 +
                                (100 - vendor.implementation.timeToDeployDays) * 0.2
    
    // Vendor stability
    const vendorStability = vendor.revenue > 1000000000 ? 95 :
                           vendor.revenue > 100000000 ? 80 :
                           vendor.revenue > 10000000 ? 60 : 40

    return {
      innovationScore: Math.min(100, innovationScore),
      futureReadiness: Math.min(100, futureReadiness),
      marketPosition: Math.min(100, marketPosition),
      customerSatisfaction: Math.min(100, customerSatisfaction),
      vendorStability
    }
  }

  private static calculateBusinessImpact(
    vendor: VendorData,
    config: CalculationConfiguration,
    breakdown: TCOBreakdown,
    industryFactor: any
  ): BusinessImpact {
    // Digital transformation score
    const digitalTransformation = vendor.deploymentType === 'cloud' ? 90 :
                                 vendor.deploymentType === 'hybrid' ? 60 : 30

    // Operational excellence
    const operationalExcellence = vendor.operational.automationLevel

    // Risk mitigation
    const riskMitigation = vendor.security.securityRating

    // Compliance automation
    const complianceAutomation = vendor.features.compliance.automatedCompliance ? 90 : 30

    // Productivity gains
    const productivityGains = vendor.features.core.byodSupport && vendor.features.core.guestAccess ? 80 : 50

    // Strategic value
    const strategicValue = (digitalTransformation + operationalExcellence + riskMitigation) / 3

    return {
      digitalTransformation,
      operationalExcellence,
      riskMitigation,
      complianceAutomation,
      productivityGains,
      strategicValue
    }
  }

  private static generateRecommendations(
    vendor: VendorData,
    config: CalculationConfiguration,
    breakdown: TCOBreakdown,
    roi: ROIMetrics,
    risk: RiskMetrics
  ): Recommendations {
    let overallScore = 0
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'medium'
    let recommendation = ''
    let keyBenefits: string[] = []
    let considerations: string[] = []
    let migrationPriority: 'immediate' | 'high' | 'medium' | 'low' = 'medium'

    // Calculate overall score
    overallScore = (
      roi.percentage / 10 + // ROI weight
      risk.securityScore + // Security weight
      vendor.operational.automationLevel + // Automation weight
      (100 - breakdown.total / 1000000 * 10) // Cost efficiency weight
    ) / 4

    // Determine risk level
    if (vendor.id === 'ivanti_neurons') {
      riskLevel = 'critical'
    } else if (vendor.security.cveCount > 30 || vendor.security.criticalCveCount > 10) {
      riskLevel = 'high'
    } else if (vendor.security.cveCount > 10 || breakdown.total > 2000000) {
      riskLevel = 'medium'
    } else {
      riskLevel = 'low'
    }

    // Generate vendor-specific recommendations
    if (vendor.id === 'portnox') {
      recommendation = 'STRONGLY RECOMMENDED - Best-in-class TCO, security, and operational efficiency'
      keyBenefits = [
        'Lowest total cost of ownership',
        'Zero infrastructure requirements',
        'Fastest deployment (hours vs months)',
        'Perfect security record (0 CVEs)',
        'Comprehensive compliance automation',
        'All features included - no add-ons'
      ]
      considerations = [
        'Cloud-only deployment model',
        'Newer market presence vs established vendors'
      ]
      migrationPriority = 'immediate'
    } else if (vendor.id === 'cisco_ise') {
      recommendation = 'CONSIDER WITH CAUTION - High costs and complexity offset market leadership'
      keyBenefits = [
        'Market leader with proven track record',
        'Comprehensive feature set',
        'Strong Cisco ecosystem integration'
      ]
      considerations = [
        'Very high total cost of ownership',
        'Complex deployment and management',
        'Multiple security vulnerabilities',
        'Long implementation timeline'
      ]
      migrationPriority = 'low'
    } else if (vendor.id === 'ivanti_neurons') {
      recommendation = 'IMMEDIATE MIGRATION REQUIRED - Critical security risk'
      keyBenefits = []
      considerations = [
        'Active nation-state exploitation',
        'End-of-life product',
        'No security patches available',
        'Regulatory compliance violations'
      ]
      migrationPriority = 'immediate'
    } else {
      recommendation = 'EVALUATE CAREFULLY - Consider specific use case requirements'
      keyBenefits = vendor.strengths
      considerations = vendor.weaknesses
      migrationPriority = riskLevel === 'high' ? 'high' : 'medium'
    }

    return {
      overallScore: Math.min(100, Math.max(0, overallScore)),
      riskLevel,
      recommendation,
      keyBenefits,
      considerations,
      migrationPriority
    }
  }

  static async compareVendors(
    vendorIds: string[],
    config: CalculationConfiguration
  ): Promise<UltimateCalculationResult[]> {
    try {
      const results = await Promise.all(
        vendorIds.map(id => this.calculateComprehensiveTCO(id, config))
      )

      return results
        .filter((result): result is UltimateCalculationResult => result !== null)
        .sort((a, b) => a.totalCost - b.totalCost)
    } catch (error) {
      console.error('Error comparing vendors:', error)
      return []
    }
  }

  static async saveCalculation(
    sessionId: string,
    config: CalculationConfiguration,
    selectedVendors: string[],
    results: UltimateCalculationResult[]
  ): Promise<boolean> {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('tco-calculation', JSON.stringify({
          sessionId,
          config,
          selectedVendors,
          results,
          timestamp: new Date().toISOString()
        }))
      }
      return true
    } catch (error) {
      console.error('Error saving calculation:', error)
      return false
    }
  }

  static async loadCalculation(sessionId: string): Promise<{
    config: CalculationConfiguration
    selectedVendors: string[]
    results: UltimateCalculationResult[]
  } | null> {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('tco-calculation')
        if (saved) {
          const data = JSON.parse(saved)
          return {
            config: data.config,
            selectedVendors: data.selectedVendors,
            results: data.results
          }
        }
      }
      return null
    } catch (error) {
      console.error('Error loading calculation:', error)
      return null
    }
  }

  static async startRealTimeMonitoring(
    vendorIds: string[],
    onUpdate: (data: any) => void
  ): Promise<() => void> {
    try {
      if (typeof window === 'undefined') {
        return () => {} // No-op for server-side
      }
      
      // Import AI service dynamically to avoid circular dependencies
      const { AIDataService } = await import('./ai-data-service')
      
      // Start AI-powered real-time monitoring
      return AIDataService.startRealTimeUpdates(vendorIds, onUpdate)
    } catch (error) {
      console.error('Error starting real-time monitoring:', error)
      return () => {}
    }
  }
}
        })

      return !error
    } catch (error) {
      console.error('Error saving calculation:', error)
      return false
    }
  }

  static async loadCalculation(sessionId: string): Promise<{
    config: CalculationConfiguration
    selectedVendors: string[]
    results: UltimateCalculationResult[]
  } | null> {
    try {
      if (!supabase) {
        const saved = localStorage.getItem('tco-calculation')
        if (saved) {
          const data = JSON.parse(saved)
          return {
            config: data.config,
            selectedVendors: data.selectedVendors,
            results: data.results
          }
        }
        return null
      }

      const { data, error } = await supabase
        .from('user_calculations')
        .select('*')
        .eq('session_id', sessionId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single()

      if (error || !data) return null

      return {
        config: data.configuration,
        selectedVendors: data.selected_vendors,
        results: data.results
      }
    } catch (error) {
      console.error('Error loading calculation:', error)
      return null
    }
  }

  static async startRealTimeMonitoring(
    vendorIds: string[],
    onUpdate: (data: any) => void
  ): Promise<() => void> {
    // Import AI service dynamically to avoid circular dependencies
    const { AIDataService } = await import('./ai-data-service')
    
    // Start AI-powered real-time monitoring
    return AIDataService.startRealTimeUpdates(vendorIds, onUpdate)
  }
}