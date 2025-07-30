import { AIDataService, type AIVendorUpdate, type IndustryBenchmark } from './ai-data-service'
import { ComprehensiveVendorDatabase } from '../comprehensive-vendor-data'
import type { CalculationConfiguration } from '../types'

export interface ComprehensiveTCOBreakdown {
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
  cloudInfrastructure: number
  virtualInfrastructure: number
  apis: number
  plugins: number
  certifications: number
  redundancy: number
  scalability: number
  professionalServices: number
  total: number
  breakdown_details: Record<string, {
    amount: number
    description: string
    frequency: string
    scaling: string
    confidence: number
    lastUpdated: string
    aiEnhanced: boolean
  }>
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
    innovationValue: number
  }
  industryBenchmarks: {
    avgROI: number
    topQuartileROI: number
    paybackComparison: number
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
  integrationCapability: number
  apiAvailability: number
  cloudReadiness: number
  redundancyLevel: number
  disasterRecovery: number
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
  dataProtectionScore: number
  incidentResponseCapability: number
}

export interface UltimateCalculationResult {
  vendorId: string
  vendorName: string
  totalCost: number
  perDevicePerMonth: number
  perUserPerMonth: number
  breakdown: ComprehensiveTCOBreakdown
  roi: ExecutiveROIMetrics
  operational: ComprehensiveOperationalMetrics
  risk: EnterpriseRiskMetrics
  competitive: any
  timeline: any
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
    aiInsights: string[]
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
    aiConfidence: number
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
        itAdmin: 135000,
        securityAnalyst: 155000,
        networkEngineer: 145000,
        consultant: 220000,
        architect: 180000
      },
      cloudCosts: {
        compute: 0.12, // per hour
        storage: 0.023, // per GB
        network: 0.09 // per GB
      }
    },
    'europe': {
      salaryMultiplier: 0.85,
      complianceComplexity: 1.4,
      marketMaturity: 0.95,
      currencyCode: 'EUR',
      regulatoryEnvironment: 1.3,
      laborCosts: {
        itAdmin: 105000,
        securityAnalyst: 125000,
        networkEngineer: 115000,
        consultant: 185000,
        architect: 155000
      },
      cloudCosts: {
        compute: 0.14,
        storage: 0.025,
        network: 0.10
      }
    },
    'asia-pacific': {
      salaryMultiplier: 0.65,
      complianceComplexity: 0.8,
      marketMaturity: 0.85,
      currencyCode: 'USD',
      regulatoryEnvironment: 0.9,
      laborCosts: {
        itAdmin: 75000,
        securityAnalyst: 95000,
        networkEngineer: 85000,
        consultant: 140000,
        architect: 120000
      },
      cloudCosts: {
        compute: 0.10,
        storage: 0.020,
        network: 0.08
      }
    }
  }

  private static readonly INDUSTRY_PROFILES = {
    healthcare: {
      breachCostMultiplier: 2.4, // Highest in 2024
      complianceComplexity: 1.8,
      downtimeCostPerHour: 15000,
      regulatoryPenaltyRisk: 10000000,
      securityRequirements: ['HIPAA', 'HITECH', 'SOC2', 'ISO27001', 'NIST'],
      criticalUptime: 99.99,
      dataClassification: 'highly-sensitive',
      auditFrequency: 'quarterly',
      incidentReportingTime: 24,
      complianceAutomationValue: 250000
    },
    financial: {
      breachCostMultiplier: 1.8,
      complianceComplexity: 2.0,
      downtimeCostPerHour: 22000,
      regulatoryPenaltyRisk: 50000000,
      securityRequirements: ['PCI-DSS', 'SOX', 'GLBA', 'SOC2', 'ISO27001', 'SWIFT'],
      criticalUptime: 99.995,
      dataClassification: 'highly-sensitive',
      auditFrequency: 'quarterly',
      incidentReportingTime: 12,
      complianceAutomationValue: 500000
    },
    government: {
      breachCostMultiplier: 1.6,
      complianceComplexity: 2.2,
      downtimeCostPerHour: 18000,
      regulatoryPenaltyRisk: 100000000,
      securityRequirements: ['FISMA', 'FedRAMP', 'NIST', 'CMMC', 'CJIS'],
      criticalUptime: 99.9,
      dataClassification: 'classified',
      auditFrequency: 'continuous',
      incidentReportingTime: 1,
      complianceAutomationValue: 750000
    },
    technology: {
      breachCostMultiplier: 1.3,
      complianceComplexity: 1.2,
      downtimeCostPerHour: 35000,
      regulatoryPenaltyRisk: 25000000,
      securityRequirements: ['SOC2', 'ISO27001', 'GDPR', 'CCPA'],
      criticalUptime: 99.5,
      dataClassification: 'sensitive',
      auditFrequency: 'annual',
      incidentReportingTime: 72,
      complianceAutomationValue: 150000
    },
    retail: {
      breachCostMultiplier: 1.2,
      complianceComplexity: 1.4,
      downtimeCostPerHour: 12000,
      regulatoryPenaltyRisk: 5000000,
      securityRequirements: ['PCI-DSS', 'GDPR', 'SOC2', 'CCPA'],
      criticalUptime: 99.8,
      dataClassification: 'sensitive',
      auditFrequency: 'annual',
      incidentReportingTime: 72,
      complianceAutomationValue: 100000
    },
    manufacturing: {
      breachCostMultiplier: 1.7,
      complianceComplexity: 1.3,
      downtimeCostPerHour: 45000, // High due to production impact
      regulatoryPenaltyRisk: 15000000,
      securityRequirements: ['ISO27001', 'IEC62443', 'NIST', 'TSA'],
      criticalUptime: 99.95,
      dataClassification: 'sensitive',
      auditFrequency: 'annual',
      incidentReportingTime: 24,
      complianceAutomationValue: 200000
    },
    education: {
      breachCostMultiplier: 1.0,
      complianceComplexity: 1.1,
      downtimeCostPerHour: 6500,
      regulatoryPenaltyRisk: 2000000,
      securityRequirements: ['FERPA', 'SOC2', 'ISO27001'],
      criticalUptime: 99.0,
      dataClassification: 'sensitive',
      auditFrequency: 'annual',
      incidentReportingTime: 72,
      complianceAutomationValue: 75000
    }
  }

  static async calculateComprehensiveTCO(
    vendorId: string,
    config: CalculationConfiguration
  ): Promise<UltimateCalculationResult | null> {
    try {
      // Get vendor data
      const vendorData = ComprehensiveVendorDatabase[vendorId]
      if (!vendorData) {
        throw new Error(`Vendor data not found for ${vendorId}`)
      }

      // Get AI-enhanced data
      const aiData = await AIDataService.getVendorIntelligence(vendorId)
      const industryBenchmarks = await AIDataService.getIndustryBenchmarks(config.industry)

      const regionFactors = this.REGION_FACTORS[config.region as keyof typeof this.REGION_FACTORS] || this.REGION_FACTORS['north-america']
      const industryProfile = this.INDUSTRY_PROFILES[config.industry as keyof typeof this.INDUSTRY_PROFILES] || this.INDUSTRY_PROFILES.technology

      // Calculate comprehensive metrics with AI enhancement
      const breakdown = await this.calculateComprehensiveCostBreakdown(vendorData, config, regionFactors, industryProfile, aiData)
      const roi = await this.calculateExecutiveROI(vendorData, config, breakdown, industryProfile, regionFactors, industryBenchmarks)
      const operational = this.calculateComprehensiveOperationalMetrics(vendorData, config, regionFactors, aiData)
      const risk = this.calculateEnterpriseRiskMetrics(vendorData, config, industryProfile, aiData)
      const competitive = this.calculateStrategicCompetitiveMetrics(vendorData, config, industryProfile)
      const timeline = this.calculateExecutiveTimelineMetrics(vendorData, config, industryProfile)
      const recommendations = await this.generateAIEnhancedRecommendations(vendorData, config, breakdown, roi, risk, competitive, aiData)
      const projections = this.calculateAdvancedProjections(breakdown, roi, config, industryProfile)

      const totalCost = breakdown.total
      const perDevicePerMonth = totalCost / (config.devices * config.years * 12)
      const perUserPerMonth = totalCost / (config.users * config.years * 12)

      const realTimeFactors = {
        pricingAdjustments: aiData?.pricing.confidence || 0,
        securityAlerts: aiData?.security.criticalCves || 0,
        complianceChanges: 0,
        marketTrends: aiData?.market.innovationScore || 0,
        lastUpdated: new Date().toISOString(),
        aiConfidence: aiData?.pricing.confidence || 85
      }

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

  private static async calculateComprehensiveCostBreakdown(
    vendorData: any,
    config: CalculationConfiguration,
    regionFactors: any,
    industryProfile: any,
    aiData: AIVendorUpdate | null
  ): Promise<ComprehensiveTCOBreakdown> {
    const { devices, users, years } = config
    const breakdown_details: any = {}

    // Use AI-enhanced pricing if available
    const basePrice = aiData?.pricing.basePrice || vendorData.pricing.basePrice
    const pricePerDevice = aiData?.pricing.pricePerDevice || vendorData.pricing.pricePerDevice
    const volumeDiscounts = aiData?.pricing.volumeDiscounts || vendorData.pricing.volumeDiscounts

    // Calculate licensing with real-time AI adjustments
    let licensing = 0
    if (vendorData.id === 'portnox') {
      let effectivePrice = config.portnoxBasePrice || pricePerDevice

      // Add addon costs (all included in Portnox)
      if (config.portnoxAddons?.atp) effectivePrice += 0 // Included
      if (config.portnoxAddons?.compliance) effectivePrice += 0 // Included
      if (config.portnoxAddons?.iot) effectivePrice += 0 // Included
      if (config.portnoxAddons?.analytics) effectivePrice += 0 // Included

      // Apply volume discounts
      const applicableDiscount = Object.entries(volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, Number(discount)), 0)

      if (applicableDiscount > 0) {
        effectivePrice *= (1 - applicableDiscount / 100)
      }

      licensing = effectivePrice * devices * 12 * years
      
      breakdown_details.licensing = {
        amount: licensing,
        description: 'Portnox CLEAR all-inclusive: RADIUS, NAC, PKI, IoT profiling, risk assessment, compliance automation, threat detection, user analytics - everything included',
        frequency: 'monthly',
        scaling: 'per-device',
        confidence: 98,
        lastUpdated: new Date().toISOString(),
        aiEnhanced: !!aiData
      }
    } else {
      // Calculate for other vendors with add-ons
      licensing = (basePrice + pricePerDevice * devices) * years

      // Apply volume discounts
      const applicableDiscount = Object.entries(volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, Number(discount)), 0)

      if (applicableDiscount > 0) {
        licensing *= (1 - applicableDiscount / 100)
      }

      // Add mandatory add-ons for feature parity
      const addOnCosts = this.calculateAddOnCosts(vendorData, devices, years, aiData)
      licensing += addOnCosts

      breakdown_details.licensing = {
        amount: licensing,
        description: `${vendorData.name} base licensing + required add-ons for feature parity`,
        frequency: 'annual',
        scaling: 'per-device',
        confidence: aiData?.pricing.confidence || 85,
        lastUpdated: new Date().toISOString(),
        aiEnhanced: !!aiData
      }
    }

    // Calculate comprehensive additional costs
    const hardware = this.calculateHardwareCosts(vendorData, devices, regionFactors)
    const implementation = this.calculateImplementationCosts(vendorData, config, regionFactors, industryProfile)
    const training = this.calculateTrainingCosts(vendorData, config, regionFactors)
    const maintenance = this.calculateMaintenanceCosts(vendorData, config, years, regionFactors)
    const support = this.calculateSupportCosts(vendorData, config, years, regionFactors)
    const integration = this.calculateIntegrationCosts(vendorData, config, regionFactors)
    const migration = this.calculateMigrationCosts(vendorData, config, regionFactors)
    const consulting = this.calculateConsultingCosts(vendorData, config, years, regionFactors)
    const cloudInfrastructure = this.calculateCloudInfrastructureCosts(vendorData, config, years, regionFactors)
    const virtualInfrastructure = this.calculateVirtualInfrastructureCosts(vendorData, config, years, regionFactors)
    const apis = this.calculateAPICosts(vendorData, config, years)
    const plugins = this.calculatePluginCosts(vendorData, config, years)
    const certifications = this.calculateCertificationCosts(vendorData, config, regionFactors)
    const redundancy = this.calculateRedundancyCosts(vendorData, config, regionFactors)
    const scalability = this.calculateScalabilityCosts(vendorData, config, regionFactors)
    const professionalServices = this.calculateProfessionalServicesCosts(vendorData, config, regionFactors)

    // Calculate operational costs (FTE requirements)
    const requiredFTE = this.calculateRequiredFTE(vendorData, config, industryProfile, aiData)
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
                 cloudInfrastructure +
                 virtualInfrastructure +
                 apis +
                 plugins +
                 certifications +
                 redundancy +
                 scalability +
                 professionalServices +
                 operationalCost +
                 complianceCost +
                 hiddenCosts

    // Add detailed breakdown for all components
    Object.assign(breakdown_details, {
      hardware: {
        amount: hardware,
        description: vendorData.infrastructure?.hardwareRequired ? 
          `Required appliances, servers, storage, networking equipment` : 
          'No hardware required - pure cloud SaaS',
        frequency: 'one-time',
        scaling: 'fixed',
        confidence: 95,
        lastUpdated: new Date().toISOString(),
        aiEnhanced: false
      },
      implementation: {
        amount: implementation,
        description: 'Professional services, project management, configuration, testing, go-live support',
        frequency: 'one-time',
        scaling: 'complexity-based',
        confidence: 90,
        lastUpdated: new Date().toISOString(),
        aiEnhanced: !!aiData
      },
      operational: {
        amount: operationalCost,
        description: `${requiredFTE.toFixed(1)} FTE for ongoing operations, administration, monitoring, and maintenance`,
        frequency: 'annual',
        scaling: 'per-fte',
        confidence: 92,
        lastUpdated: new Date().toISOString(),
        aiEnhanced: !!aiData
      },
      cloudInfrastructure: {
        amount: cloudInfrastructure,
        description: vendorData.infrastructure?.cloudNative ? 
          'Included in SaaS subscription' : 
          'Cloud hosting, compute, storage, bandwidth for hybrid/cloud components',
        frequency: 'monthly',
        scaling: 'usage-based',
        confidence: 88,
        lastUpdated: new Date().toISOString(),
        aiEnhanced: false
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
      cloudInfrastructure,
      virtualInfrastructure,
      apis,
      plugins,
      certifications,
      redundancy,
      scalability,
      professionalServices,
      total,
      breakdown_details
    }
  }

  private static calculateAddOnCosts(vendorData: any, devices: number, years: number, aiData: AIVendorUpdate | null): number {
    if (vendorData.id === 'portnox') return 0 // Everything included

    let addOnCosts = 0
    const addOns = aiData?.pricing.addOns || vendorData.pricing.addOns || {}

    // Required add-ons for feature parity with Portnox
    const requiredAddOns = [
      'Advanced Threat Protection',
      'IoT Security',
      'Risk Analytics', 
      'Compliance Automation',
      'API Access',
      'Advanced Reporting'
    ]

    requiredAddOns.forEach(addon => {
      if (addOns[addon]) {
        addOnCosts += addOns[addon] * devices * 12 * years
      } else {
        // Estimate cost if not available
        addOnCosts += 1.5 * devices * 12 * years // $1.5/device/month estimate
      }
    })

    return addOnCosts
  }

  private static calculateHardwareCosts(vendorData: any, devices: number, regionFactors: any): number {
    if (vendorData.infrastructure?.cloudNative) return 0

    let hardwareCost = 0
    
    // Calculate based on device count and deployment type
    if (vendorData.deploymentType === 'on-premise') {
      // Primary appliances
      const primaryAppliances = Math.ceil(devices / 2500) // 1 appliance per 2500 devices
      hardwareCost += primaryAppliances * 45000 // Average appliance cost

      // Redundant appliances for HA
      hardwareCost += primaryAppliances * 45000

      // Network infrastructure
      hardwareCost += devices * 2.5 // Network equipment per device

      // Storage and backup
      hardwareCost += 25000 + (devices * 0.5)

      // Regional cost adjustment
      hardwareCost *= regionFactors.marketMaturity
    } else if (vendorData.deploymentType === 'hybrid') {
      // Reduced hardware for hybrid
      hardwareCost = this.calculateHardwareCosts({...vendorData, deploymentType: 'on-premise'}, devices, regionFactors) * 0.6
    }

    return Math.round(hardwareCost)
  }

  private static calculateImplementationCosts(vendorData: any, config: CalculationConfiguration, regionFactors: any, industryProfile: any): number {
    if (vendorData.id === 'portnox') return 0 // Self-service deployment

    const baseImplementation = vendorData.pricing.additionalCosts?.implementation || 50000
    const complexityMultiplier = vendorData.implementation?.complexity === 'high' ? 2.0 :
                                vendorData.implementation?.complexity === 'medium' ? 1.5 : 1.0
    const industryMultiplier = industryProfile.complianceComplexity
    const regionMultiplier = regionFactors.salaryMultiplier

    return Math.round(baseImplementation * complexityMultiplier * industryMultiplier * regionMultiplier)
  }

  private static calculateTrainingCosts(vendorData: any, config: CalculationConfiguration, regionFactors: any): number {
    if (vendorData.id === 'portnox') return 2000 // Minimal online training

    const trainingHours = vendorData.implementation?.trainingHours || 40
    const traineeCount = Math.max(3, Math.ceil(config.devices / 1000)) // 1 trainee per 1000 devices
    const hourlyRate = regionFactors.laborCosts.consultant / 2000 // Annual to hourly
    const trainerCost = trainingHours * 300 // External trainer cost

    return Math.round((trainingHours * traineeCount * hourlyRate) + trainerCost)
  }

  private static calculateMaintenanceCosts(vendorData: any, config: CalculationConfiguration, years: number, regionFactors: any): number {
    if (vendorData.infrastructure?.cloudNative) return 0 // Included in SaaS

    const hardwareCost = this.calculateHardwareCosts(vendorData, config.devices, regionFactors)
    const licensingCost = vendorData.pricing.basePrice + (vendorData.pricing.pricePerDevice * config.devices)
    
    // Maintenance is typically 18-22% of hardware + software cost annually
    const maintenanceRate = 0.20
    return Math.round((hardwareCost + licensingCost) * maintenanceRate * years)
  }

  private static calculateSupportCosts(vendorData: any, config: CalculationConfiguration, years: number, regionFactors: any): number {
    if (vendorData.id === 'portnox') return 0 // Included in subscription

    // Premium support typically required for enterprise deployments
    const baseSupportCost = 25000 + (config.devices * 2.5) // Base + per device
    return Math.round(baseSupportCost * years * regionFactors.marketMaturity)
  }

  private static calculateIntegrationCosts(vendorData: any, config: CalculationConfiguration, regionFactors: any): number {
    if (vendorData.id === 'portnox') return 5000 // Minimal API integration

    const integrationComplexity = vendorData.implementation?.integrationComplexity || 'medium'
    const baseIntegrationCost = integrationComplexity === 'high' ? 75000 :
                               integrationComplexity === 'medium' ? 45000 : 25000

    // Additional integrations (SIEM, ITSM, Identity providers, etc.)
    const additionalIntegrations = 6 // Typical enterprise integrations
    const perIntegrationCost = 8000

    return Math.round((baseIntegrationCost + (additionalIntegrations * perIntegrationCost)) * regionFactors.salaryMultiplier)
  }

  private static calculateMigrationCosts(vendorData: any, config: CalculationConfiguration, regionFactors: any): number {
    if (vendorData.id === 'portnox') return 8000 // Minimal migration effort

    // Migration from existing NAC solution
    const migrationComplexity = config.devices > 5000 ? 'high' : config.devices > 1000 ? 'medium' : 'low'
    const baseMigrationCost = migrationComplexity === 'high' ? 85000 :
                             migrationComplexity === 'medium' ? 45000 : 20000

    // Data migration, policy conversion, testing
    const dataMigrationCost = config.devices * 1.5
    const policyConversionCost = 15000
    const testingCost = 25000

    return Math.round((baseMigrationCost + dataMigrationCost + policyConversionCost + testingCost) * regionFactors.salaryMultiplier)
  }

  private static calculateConsultingCosts(vendorData: any, config: CalculationConfiguration, years: number, regionFactors: any): number {
    if (vendorData.id === 'portnox') return 0 // No ongoing consulting needed

    // Ongoing consulting for optimization, troubleshooting, policy updates
    const monthlyConsulting = vendorData.implementation?.complexity === 'high' ? 8000 :
                             vendorData.implementation?.complexity === 'medium' ? 4000 : 2000

    return Math.round(monthlyConsulting * 12 * years * regionFactors.salaryMultiplier)
  }

  private static calculateCloudInfrastructureCosts(vendorData: any, config: CalculationConfiguration, years: number, regionFactors: any): number {
    if (vendorData.infrastructure?.cloudNative && vendorData.id === 'portnox') return 0 // Included

    if (vendorData.deploymentType === 'cloud' || vendorData.deploymentType === 'hybrid') {
      // Cloud hosting costs for non-SaaS solutions
      const monthlyCompute = config.devices * 0.15 // Compute cost per device
      const monthlyStorage = config.devices * 0.05 // Storage cost per device
      const monthlyNetwork = config.devices * 0.03 // Network cost per device

      const monthlyCost = (monthlyCompute + monthlyStorage + monthlyNetwork) * regionFactors.cloudCosts.compute
      return Math.round(monthlyCost * 12 * years)
    }

    return 0
  }

  private static calculateVirtualInfrastructureCosts(vendorData: any, config: CalculationConfiguration, years: number, regionFactors: any): number {
    if (vendorData.infrastructure?.cloudNative) return 0

    if (vendorData.deploymentType === 'on-premise' || vendorData.deploymentType === 'hybrid') {
      // Virtual infrastructure for on-premise deployments
      const vmCost = 2500 * Math.ceil(config.devices / 1000) // VMs needed
      const hypervisorLicensing = 15000
      const storageInfrastructure = config.devices * 0.8

      return Math.round((vmCost + hypervisorLicensing + storageInfrastructure) * years * 0.3) // Amortized
    }

    return 0
  }

  private static calculateAPICosts(vendorData: any, config: CalculationConfiguration, years: number): number {
    if (vendorData.id === 'portnox') return 0 // APIs included

    // API licensing and integration costs
    const apiCount = 8 // Typical enterprise API integrations
    const perAPIAnnualCost = 2500
    const apiDevelopmentCost = apiCount * 5000 // One-time development

    return Math.round((apiCount * perAPIAnnualCost * years) + apiDevelopmentCost)
  }

  private static calculatePluginCosts(vendorData: any, config: CalculationConfiguration, years: number): number {
    if (vendorData.id === 'portnox') return 0 // No plugins needed

    // Third-party plugins and extensions
    const pluginCount = 4 // Typical plugins needed
    const perPluginAnnualCost = 3500

    return Math.round(pluginCount * perPluginAnnualCost * years)
  }

  private static calculateCertificationCosts(vendorData: any, config: CalculationConfiguration, regionFactors: any): number {
    if (vendorData.id === 'portnox') return 3000 // Minimal certification

    // Staff certification requirements
    const certificationCount = vendorData.implementation?.certificationRequired ? 3 : 1
    const perCertificationCost = 4500
    const trainingCost = certificationCount * 8000

    return Math.round((certificationCount * perCertificationCost + trainingCost) * regionFactors.salaryMultiplier)
  }

  private static calculateRedundancyCosts(vendorData: any, config: CalculationConfiguration, regionFactors: any): number {
    if (vendorData.infrastructure?.cloudNative) return 0 // Built-in redundancy

    // High availability and redundancy costs
    const hardwareCost = this.calculateHardwareCosts(vendorData, config.devices, regionFactors)
    const redundancyMultiplier = 0.8 // 80% additional for HA

    return Math.round(hardwareCost * redundancyMultiplier)
  }

  private static calculateScalabilityCosts(vendorData: any, config: CalculationConfiguration, regionFactors: any): number {
    if (vendorData.infrastructure?.cloudNative) return 0 // Infinite scalability

    // Future scalability preparation costs
    const currentCapacity = config.devices
    const futureGrowth = currentCapacity * 0.5 // 50% growth buffer
    const scalabilityInvestment = futureGrowth * 1.2 // Cost per additional device capacity

    return Math.round(scalabilityInvestment * regionFactors.marketMaturity)
  }

  private static calculateProfessionalServicesCosts(vendorData: any, config: CalculationConfiguration, regionFactors: any): number {
    if (vendorData.id === 'portnox') return 0 // Self-service

    // Ongoing professional services
    const psHours = vendorData.implementation?.complexity === 'high' ? 200 :
                   vendorData.implementation?.complexity === 'medium' ? 120 : 60
    const hourlyRate = regionFactors.laborCosts.consultant / 2000

    return Math.round(psHours * hourlyRate)
  }

  private static calculateRequiredFTE(vendorData: any, config: CalculationConfiguration, industryProfile: any, aiData: AIVendorUpdate | null): number {
    const baselineFTE = 4.0 // Traditional NAC baseline
    const automationLevel = vendorData.operationalMetrics?.automationLevel || 40
    const complexityFactor = vendorData.infrastructure?.cloudNative ? 0.05 : 
                            vendorData.deploymentType === 'hybrid' ? 0.6 : 1.5
    const industryFactor = industryProfile.complianceComplexity
    const aiFactor = aiData ? 0.9 : 1.0 // AI reduces FTE requirements
    
    return Math.max(0.05, baselineFTE * complexityFactor * industryFactor * aiFactor * (1 - automationLevel / 100))
  }

  private static calculateComplianceCosts(vendorData: any, config: CalculationConfiguration, industryProfile: any, regionFactors: any): number {
    const requiredFrameworks = industryProfile.securityRequirements
    const supportedFrameworks = vendorData.security?.complianceSupport || []
    const unsupportedCount = requiredFrameworks.filter((f: string) => !supportedFrameworks.includes(f)).length
    
    // Cost per unsupported framework
    const frameworkCost = unsupportedCount * 125000 * regionFactors.complianceComplexity
    
    // Audit costs
    const auditCost = vendorData.complianceSummary?.automatedCompliance ? 35000 : 185000
    
    // Compliance automation value
    const automationValue = vendorData.complianceSummary?.automatedCompliance ? 0 : industryProfile.complianceAutomationValue

    return Math.round(frameworkCost + auditCost + automationValue)
  }

  private static calculateHiddenCosts(vendorData: any, config: CalculationConfiguration, industryProfile: any, regionFactors: any): number {
    let hiddenCosts = 0

    // Downtime costs
    const availabilityScore = vendorData.infrastructure?.highAvailability || 95
    const downtimeHours = (100 - availabilityScore) * 87.6 // Annual hours
    hiddenCosts += downtimeHours * industryProfile.downtimeCostPerHour

    // Integration complexity costs
    const integrationComplexity = vendorData.implementation?.integrationComplexity === 'high' ? 0.3 :
                                 vendorData.implementation?.integrationComplexity === 'medium' ? 0.2 : 0.1
    hiddenCosts += integrationComplexity * 250000

    // Vendor lock-in costs
    if (!vendorData.infrastructure?.cloudNative) {
      hiddenCosts += 150000 // Future migration costs
    }

    // Skills shortage premium
    if (vendorData.implementation?.complexity === 'high') {
      hiddenCosts += 85000 * regionFactors.salaryMultiplier
    }

    // Security incident costs
    const cveCount = vendorData.security?.cveCount || 0
    hiddenCosts += cveCount * 15000 // Cost per vulnerability

    return Math.round(hiddenCosts)
  }

  private static async calculateExecutiveROI(
    vendorData: any,
    config: CalculationConfiguration,
    breakdown: ComprehensiveTCOBreakdown,
    industryProfile: any,
    regionFactors: any,
    industryBenchmarks: IndustryBenchmark
  ): Promise<ExecutiveROIMetrics> {
    // Calculate comprehensive business value
    const avgBreachCost = industryBenchmarks.avgBreachCost
    const breachRiskReduction = vendorData.roi?.breachRiskReduction || 0.15
    const breachSavings = breachRiskReduction * avgBreachCost * 0.18 // 18% annual probability

    // Operational savings
    const laborSavings = (vendorData.roi?.laborSavings || 1.0) * regionFactors.laborCosts.itAdmin
    const operationalEfficiencySavings = (vendorData.roi?.operationalEfficiency || 0.2) * breakdown.operational

    // Compliance savings
    const complianceSavings = industryProfile.complianceAutomationValue * (vendorData.complianceSummary?.automationLevel || 0) / 100
    const auditSavings = (vendorData.complianceSummary?.automationLevel || 0) * 0.01 * 200000

    // Productivity savings
    const productivitySavings = this.calculateProductivitySavings(vendorData, config, regionFactors)
    
    // Infrastructure savings
    const infrastructureSavings = vendorData.infrastructure?.cloudNative ? breakdown.hardware + breakdown.maintenance : 0

    // Innovation value
    const innovationValue = vendorData.features?.innovationScore * 1000 || 0

    const totalAnnualSavings = breachSavings + laborSavings + operationalEfficiencySavings + 
                              complianceSavings + auditSavings + productivitySavings + 
                              infrastructureSavings + innovationValue

    const annualCost = breakdown.total / config.years
    const netAnnualBenefit = totalAnnualSavings - annualCost

    // Advanced financial calculations
    const discountRate = 0.08
    const npv = this.calculateNPV(breakdown.total, totalAnnualSavings, config.years, discountRate)
    const irr = this.calculateIRR(breakdown.total, totalAnnualSavings, config.years)
    const profitabilityIndex = npv / breakdown.total
    const riskAdjustment = 1 - ((vendorData.riskMetrics?.technologyRisk || 30) / 100 * 0.2)
    const riskAdjustedReturn = irr * riskAdjustment

    const roi = netAnnualBenefit > 0 ? (netAnnualBenefit * config.years / breakdown.total) * 100 : 0
    const paybackMonths = netAnnualBenefit > 0 ? (breakdown.total / netAnnualBenefit) * 12 : 999

    const totalBusinessValue = npv + (totalAnnualSavings * config.years)

    // Sensitivity analysis
    const sensitivityAnalysis = {
      optimistic: {
        roi: roi * 1.5,
        payback: paybackMonths * 0.6,
        npv: npv * 1.7
      },
      realistic: {
        roi,
        payback: paybackMonths,
        npv
      },
      pessimistic: {
        roi: roi * 0.5,
        payback: paybackMonths * 1.8,
        npv: npv * 0.3
      }
    }

    // Value drivers breakdown
    const valueDrivers = {
      securityValue: breachSavings,
      operationalValue: laborSavings + operationalEfficiencySavings,
      complianceValue: complianceSavings + auditSavings,
      productivityValue: productivitySavings,
      infrastructureValue: infrastructureSavings,
      innovationValue
    }

    // Industry benchmarks
    const industryBenchmarksData = {
      avgROI: industryBenchmarks.securityMaturityLevel * 2, // Estimated industry average
      topQuartileROI: industryBenchmarks.securityMaturityLevel * 3.5,
      paybackComparison: 18 // Industry average payback months
    }

    return {
      paybackMonths: Math.min(paybackMonths, 999),
      percentage: roi,
      annualSavings: totalAnnualSavings,
      breachReduction: breachRiskReduction * 100,
      laborSavingsFTE: vendorData.roi?.laborSavings || 1.0,
      timeToValue: vendorData.roi?.timeToValue || 30,
      netPresentValue: npv,
      internalRateOfReturn: irr * 100,
      profitabilityIndex,
      riskAdjustedReturn: riskAdjustedReturn * 100,
      totalBusinessValue,
      sensitivityAnalysis,
      valueDrivers,
      industryBenchmarks: industryBenchmarksData
    }
  }

  private static calculateComprehensiveOperationalMetrics(
    vendorData: any,
    config: CalculationConfiguration,
    regionFactors: any,
    aiData: AIVendorUpdate | null
  ): ComprehensiveOperationalMetrics {
    const automationLevel = aiData?.implementation.requiredFTE ? 
      Math.max(0, 100 - (aiData.implementation.requiredFTE * 25)) : 
      vendorData.operationalMetrics?.automationLevel || 40

    const fteSaved = (4.0 - (aiData?.implementation.requiredFTE || vendorData.implementation?.requiredFTE || 2.0))
    const maintenanceWindows = vendorData.infrastructure?.cloudNative ? 0 : 
                              vendorData.infrastructure?.maintenanceWindows || 4
    const mttr = vendorData.infrastructure?.cloudNative ? 0.1 : 
                vendorData.operationalMetrics?.mttr || 2

    const avgSalary = regionFactors.laborCosts.itAdmin
    const annualOpsSaving = fteSaved * avgSalary

    return {
      automationLevel,
      fteSaved: Math.max(0, fteSaved),
      maintenanceWindows,
      mttr,
      annualOpsSaving: Math.max(0, annualOpsSaving),
      productivityGains: automationLevel * 0.9,
      errorReduction: automationLevel * 0.85,
      scalabilityScore: vendorData.infrastructure?.cloudNative ? 100 : 60,
      userExperienceScore: vendorData.customerFeedback?.feedback?.easeOfUse || 70,
      adminEfficiencyGain: automationLevel * 0.95,
      deploymentSpeed: 100 - ((aiData?.implementation.deploymentDays || vendorData.implementation?.timeToDeployDays || 90) / 180 * 100),
      configurationComplexity: vendorData.implementation?.complexity === 'low' ? 90 : 
                              vendorData.implementation?.complexity === 'medium' ? 70 : 40,
      troubleshootingEfficiency: 100 - (mttr / 4 * 100),
      reportingAutomation: vendorData.operationalMetrics?.reportingCapabilities === 'enterprise' ? 95 : 65,
      auditReadiness: vendorData.complianceSummary?.auditReadiness || 70,
      integrationCapability: vendorData.operationalMetrics?.apiAvailability ? 90 : 50,
      apiAvailability: vendorData.operationalMetrics?.apiAvailability ? 100 : 30,
      cloudReadiness: vendorData.infrastructure?.cloudNative ? 100 : 25,
      redundancyLevel: vendorData.infrastructure?.highAvailability || 95,
      disasterRecovery: vendorData.infrastructure?.disasterRecovery ? 95 : 40
    }
  }

  private static calculateEnterpriseRiskMetrics(
    vendorData: any,
    config: CalculationConfiguration,
    industryProfile: any,
    aiData: AIVendorUpdate | null
  ): EnterpriseRiskMetrics {
    const securityScore = aiData?.security.securityRating || vendorData.security?.securityRating || 70
    const cveCount = aiData?.security.cveCount || vendorData.security?.cveCount || 0
    
    // Compliance score
    const requiredFrameworks = industryProfile.securityRequirements
    const supportedFrameworks = vendorData.security?.complianceSupport || []
    const complianceScore = (supportedFrameworks.filter((f: string) => requiredFrameworks.includes(f)).length / requiredFrameworks.length) * 100

    // Breach risk reduction with CVE penalty
    const baseBreachReduction = vendorData.roi?.breachRiskReduction * 100 || 15
    const cveImpact = Math.min(60, cveCount * 0.8)
    const breachReduction = Math.max(0, baseBreachReduction - cveImpact)

    // Comprehensive risk calculations
    const vendorRisk = this.calculateVendorRisk(vendorData, aiData)
    const operationalRisk = this.calculateOperationalRisk(vendorData, config)
    const financialRisk = this.calculateFinancialRisk(vendorData, config, aiData)
    const reputationalRisk = this.calculateReputationalRisk(vendorData, aiData)
    const technologyRisk = vendorData.riskMetrics?.technologyRisk || 40
    const marketRisk = vendorData.riskMetrics?.marketRisk || 30

    // Advanced risk metrics
    const regulatoryRisk = this.calculateRegulatoryRisk(vendorData, industryProfile)
    const businessContinuityRisk = this.calculateBusinessContinuityRisk(vendorData, config)
    const cyberInsuranceEligibility = this.calculateCyberInsuranceEligibility(vendorData, aiData)
    const dataProtectionScore = this.calculateDataProtectionScore(vendorData, industryProfile)
    const incidentResponseCapability = this.calculateIncidentResponseCapability(vendorData, aiData)

    // Risk mitigation value
    const riskMitigationValue = (breachReduction / 100 * industryProfile.regulatoryPenaltyRisk * 0.2) + 
                               (operationalRisk * 95000) + 
                               (reputationalRisk * 200000)

    const insurancePremiumImpact = (breachReduction / 100) * 0.35 * 125000

    return {
      securityScore,
      complianceScore,
      breachReduction,
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
      cyberInsuranceEligibility,
      dataProtectionScore,
      incidentResponseCapability
    }
  }

  private static calculateStrategicCompetitiveMetrics(vendorData: any, config: CalculationConfiguration, industryProfile: any) {
    // Implementation from previous version with enhancements
    return {
      innovationScore: vendorData.features?.innovationScore || 70,
      futureReadiness: vendorData.infrastructure?.cloudNative ? 95 : 45,
      marketPosition: vendorData.marketShare * 2 + 30,
      technologyLeadership: vendorData.infrastructure?.cloudNative ? 90 : 50,
      ecosystemStrength: vendorData.marketPosition?.marketMetrics?.partnerEcosystem || 60,
      customerLoyalty: vendorData.customerFeedback?.renewalRate || 75,
      partnerNetwork: vendorData.marketPosition?.marketMetrics?.partnerEcosystem || 60,
      investmentInRnD: vendorData.financialHealth?.rdInvestment || 15,
      digitalTransformationAlignment: vendorData.strategicFit?.digitalTransformation || 70,
      cloudReadiness: vendorData.infrastructure?.cloudNative ? 100 : 30,
      securityMaturity: vendorData.security?.zeroTrustMaturity || 60,
      complianceMaturity: vendorData.complianceSummary?.automationLevel || 50
    }
  }

  private static calculateExecutiveTimelineMetrics(vendorData: any, config: CalculationConfiguration, industryProfile: any) {
    // Implementation from previous version
    return {
      timeToValue: vendorData.implementation?.timeToDeployDays || 90,
      implementationWeeks: Math.ceil((vendorData.implementation?.timeToDeployDays || 90) / 7),
      trainingDays: Math.ceil((vendorData.implementation?.trainingHours || 24) / 8),
      migrationComplexity: vendorData.implementation?.migrationComplexity || 50,
      rollbackRisk: vendorData.implementation?.rollbackCapability ? 20 : 80,
      changeManagementEffort: 50,
      userAdoptionTime: vendorData.customerFeedback?.feedback?.easeOfUse > 80 ? 7 : 30,
      fullValueRealization: (vendorData.implementation?.timeToDeployDays || 90) + 60,
      businessImpactTimeline: {
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
    }
  }

  private static async generateAIEnhancedRecommendations(
    vendorData: any,
    config: CalculationConfiguration,
    breakdown: ComprehensiveTCOBreakdown,
    roi: ExecutiveROIMetrics,
    risk: EnterpriseRiskMetrics,
    competitive: any,
    aiData: AIVendorUpdate | null
  ) {
    // Get AI insights if available
    let aiInsights: string[] = []
    
    try {
      if (aiData) {
        // Generate AI-powered insights
        aiInsights = [
          `AI Analysis: ${vendorData.name} shows ${aiData.pricing.confidence}% pricing confidence with recent market adjustments`,
          `Security Assessment: ${aiData.security.cveCount} vulnerabilities detected with ${aiData.security.securityRating}/100 security rating`,
          `Market Position: ${aiData.market.customerSatisfaction}% customer satisfaction with ${aiData.market.innovationScore}/100 innovation score`,
          `Implementation Forecast: ${aiData.implementation.deploymentDays} days deployment with ${aiData.implementation.requiredFTE} FTE requirement`
        ]
      }
    } catch (error) {
      console.error('Error generating AI insights:', error)
    }

    // Calculate suitability and recommendations
    let suitability = 50
    suitability += vendorData.infrastructure?.cloudNative ? 25 : -15
    suitability += risk.securityScore > 90 ? 20 : risk.securityScore > 70 ? 5 : -20
    suitability += roi.percentage > 300 ? 20 : roi.percentage > 100 ? 10 : 0
    suitability += competitive.innovationScore > 80 ? 15 : 0

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'medium'
    if (vendorData.security?.cveCount > 50 || vendorData.id === 'ivanti_neurons') riskLevel = 'critical'
    else if (risk.vendorRisk < 25 && risk.securityScore > 85) riskLevel = 'low'
    else if (risk.vendorRisk > 60 || risk.securityScore < 60) riskLevel = 'high'

    // Implementation complexity
    let implementationComplexity: 'simple' | 'moderate' | 'complex' | 'enterprise' = 'moderate'
    if (vendorData.implementation?.complexity === 'low') implementationComplexity = 'simple'
    else if (vendorData.implementation?.complexity === 'high') implementationComplexity = 'enterprise'
    else if (vendorData.implementation?.complexity === 'complex') implementationComplexity = 'complex'

    // Strategic fit
    let strategicFit = 60
    strategicFit += competitive.digitalTransformationAlignment > 80 ? 20 : 0
    strategicFit += competitive.cloudReadiness > 80 ? 15 : 0
    strategicFit += competitive.securityMaturity > 80 ? 10 : 0

    const overallScore = (suitability + strategicFit + (100 - risk.vendorRisk) + competitive.innovationScore) / 4

    // Executive summary
    const executiveSummary = vendorData.id === 'portnox' ? 
      `Portnox CLEAR delivers exceptional ${roi.percentage.toFixed(0)}% ROI with ${roi.paybackMonths.toFixed(1)}-month payback. Zero infrastructure costs, industry-leading security (0 CVEs), and 98% automation provide immediate competitive advantage with $${Math.round(roi.annualSavings).toLocaleString()} annual savings.` :
      vendorData.id === 'ivanti_neurons' ?
      `CRITICAL SECURITY RISK: Immediate migration required. 89+ CVEs with active nation-state exploitation. This platform poses existential security and compliance risks to the organization.` :
      `${vendorData.name} delivers ${roi.percentage.toFixed(0)}% ROI with ${roi.paybackMonths.toFixed(1)}-month payback. Total investment of $${Math.round(breakdown.total).toLocaleString()} includes significant infrastructure and operational costs. Consider implementation complexity and ongoing resource requirements.`

    return {
      suitability: Math.min(100, Math.max(0, suitability)),
      riskLevel,
      implementationComplexity,
      strategicFit: Math.min(100, Math.max(0, strategicFit)),
      overallScore: Math.min(100, Math.max(0, overallScore)),
      executiveSummary,
      keyBenefits: vendorData.advantages?.slice(0, 5) || [],
      majorRisks: vendorData.weaknesses?.slice(0, 3) || [],
      criticalFactors: vendorData.id === 'portnox' ? 
        ['Zero infrastructure requirements', 'Fastest deployment (1 day)', 'Zero CVE security record', 'All-inclusive pricing', '98% automation level'] :
        ['Infrastructure investment required', 'Professional services needed', 'Ongoing maintenance costs', 'Specialized expertise required', 'Security vulnerability exposure'],
      aiInsights
    }
  }

  private static calculateAdvancedProjections(breakdown: ComprehensiveTCOBreakdown, roi: ExecutiveROIMetrics, config: CalculationConfiguration, industryProfile: any) {
    const annualCost = breakdown.total / config.years
    const annualSavings = roi.annualSavings

    const cumulativeSavings = []
    const riskAdjustedProjections = []
    
    for (let year = 1; year <= 10; year++) {
      const cumulativeBenefit = annualSavings * year
      const cumulativeCost = year <= config.years ? annualCost * year : breakdown.total
      const netSavings = cumulativeBenefit - cumulativeCost
      
      cumulativeSavings.push(netSavings)
      
      const riskAdjustment = Math.pow(0.94, year - 1) // 6% annual uncertainty increase
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

  // Helper calculation methods
  private static calculateProductivitySavings(vendorData: any, config: CalculationConfiguration, regionFactors: any): number {
    const automationLevel = vendorData.operationalMetrics?.automationLevel || 40
    const userCount = config.users
    const userExperience = vendorData.customerFeedback?.feedback?.easeOfUse || 70
    
    const productivityGainPerUser = (automationLevel / 100) * (userExperience / 100) * 950
    return userCount * productivityGainPerUser
  }

  private static calculateVendorRisk(vendorData: any, aiData: AIVendorUpdate | null): number {
    let risk = 25

    const marketShare = aiData?.market.marketShare || vendorData.marketShare || 5
    if (marketShare < 2) risk += 45
    else if (marketShare < 8) risk += 25

    const financialHealth = aiData?.market.financialHealth || vendorData.financialHealth?.profitability || 50
    if (financialHealth < 30) risk += 35
    if (financialHealth < 50) risk += 20

    const cveCount = aiData?.security.cveCount || vendorData.security?.cveCount || 0
    if (cveCount > 50) risk += 50
    else if (cveCount > 20) risk += 30
    else if (cveCount > 0) risk += 15

    if (!vendorData.infrastructure?.cloudNative) risk += 25

    return Math.min(100, Math.max(0, risk))
  }

  private static calculateOperationalRisk(vendorData: any, config: CalculationConfiguration): number {
    let risk = 20

    if (vendorData.infrastructure?.hardwareRequired) risk += 30
    if (vendorData.implementation?.complexity === 'high') risk += 25
    if ((vendorData.operationalMetrics?.automationLevel || 40) < 50) risk += 20
    if ((vendorData.customerFeedback?.supportSatisfaction || 70) < 70) risk += 20

    return Math.min(100, risk)
  }

  private static calculateFinancialRisk(vendorData: any, config: CalculationConfiguration, aiData: AIVendorUpdate | null): number {
    let risk = 15

    const priceVolatility = aiData ? (100 - aiData.pricing.confidence) / 10 : 20
    risk += priceVolatility

    const hiddenCostRatio = (vendorData.pricing?.additionalCosts?.hardware || 0) / 
                           ((vendorData.pricing?.pricePerDevice || 5) * config.devices)
    risk += Math.min(35, hiddenCostRatio * 100)

    const financialHealth = aiData?.market.financialHealth || vendorData.financialHealth?.profitability || 50
    if (financialHealth < 30) risk += 25

    return Math.min(100, risk)
  }

  private static calculateReputationalRisk(vendorData: any, aiData: AIVendorUpdate | null): number {
    let risk = 10

    const securityIncidents = vendorData.security?.securityIncidentCount || 0
    if (securityIncidents > 5) risk += 40

    const cveCount = aiData?.security.cveCount || vendorData.security?.cveCount || 0
    if (cveCount > 30) risk += 35

    const customerSat = aiData?.market.customerSatisfaction || vendorData.customerFeedback?.overallSatisfaction || 75
    if (customerSat < 60) risk += 30

    return Math.min(100, risk)
  }

  private static calculateRegulatoryRisk(vendorData: any, industryProfile: any): number {
    const requiredFrameworks = industryProfile.securityRequirements
    const supportedFrameworks = vendorData.security?.complianceSupport || []
    const complianceGap = requiredFrameworks.filter((f: string) => !supportedFrameworks.includes(f)).length
    
    return Math.min(100, complianceGap * 25)
  }

  private static calculateBusinessContinuityRisk(vendorData: any, config: CalculationConfiguration): number {
    let risk = 15

    const availability = vendorData.infrastructure?.highAvailability || 95
    if (availability < 99.5) risk += 30
    if (availability < 99.0) risk += 20

    if (!vendorData.infrastructure?.disasterRecovery) risk += 25
    if ((vendorData.infrastructure?.maintenanceWindows || 4) > 6) risk += 20
    if (!vendorData.implementation?.rollbackCapability) risk += 25

    return Math.min(100, risk)
  }

  private static calculateCyberInsuranceEligibility(vendorData: any, aiData: AIVendorUpdate | null): number {
    let eligibility = 50

    const cveCount = aiData?.security.cveCount || vendorData.security?.cveCount || 0
    if (cveCount === 0) eligibility += 35
    else if (cveCount < 5) eligibility += 25
    else if (cveCount > 20) eligibility -= 35

    const zeroTrustMaturity = aiData?.security.zeroTrustMaturity || vendorData.security?.zeroTrustMaturity || 60
    if (zeroTrustMaturity > 80) eligibility += 25

    if (vendorData.complianceSummary?.automatedCompliance) eligibility += 20

    const securityRating = aiData?.security.securityRating || vendorData.security?.securityRating || 70
    if (securityRating > 90) eligibility += 20

    return Math.min(100, Math.max(0, eligibility))
  }

  private static calculateDataProtectionScore(vendorData: any, industryProfile: any): number {
    let score = 50

    if (vendorData.infrastructure?.cloudNative) score += 20
    if (vendorData.security?.zeroTrustMaturity > 80) score += 15
    if (vendorData.complianceSummary?.automatedCompliance) score += 15

    return Math.min(100, score)
  }

  private static calculateIncidentResponseCapability(vendorData: any, aiData: AIVendorUpdate | null): number {
    let capability = 60

    if (vendorData.infrastructure?.cloudNative) capability += 20
    if ((vendorData.operationalMetrics?.automationLevel || 40) > 80) capability += 15
    if (vendorData.operationalMetrics?.mttr < 1) capability += 15

    return Math.min(100, capability)
  }

  // Financial calculation helpers
  private static calculateNPV(initialInvestment: number, annualSavings: number, years: number, discountRate: number): number {
    let npv = -initialInvestment
    
    for (let year = 1; year <= years; year++) {
      npv += annualSavings / Math.pow(1 + discountRate, year)
    }
    
    return npv
  }

  private static calculateIRR(initialInvestment: number, annualSavings: number, years: number): number {
    let irr = 0.1
    
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

    // Initialize AI service
    await AIDataService.initialize()

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

  static async startRealTimeMonitoring(vendorIds: string[], onUpdate: (data: any) => void): Promise<() => void> {
    await AIDataService.initialize()
    return AIDataService.startRealTimeUpdates(vendorIds, onUpdate)
  }
}