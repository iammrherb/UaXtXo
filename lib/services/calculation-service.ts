import { VendorService, type EnhancedVendorData } from './vendor-service'
import { supabase } from '../database/client'
import type { CalculationConfiguration } from '../types'

export interface TCOBreakdown {
  licensing: number
  hardware: number
  implementation: number
  support: number
  training: number
  maintenance: number
  hidden: number
  total: number
}

export interface ROIMetrics {
  paybackMonths: number
  percentage: number
  annualSavings: number
  breachReduction: number
  laborSavingsFTE: number
  timeToValue: number
}

export interface OperationalMetrics {
  automationLevel: number
  fteSaved: number
  maintenanceWindows: number
  mttr: number
  annualOpsSaving: number
}

export interface RiskMetrics {
  securityScore: number
  complianceScore: number
  breachReduction: number
  vendorRisk: number
}

export interface CompetitiveMetrics {
  innovationScore: number
  futureReadiness: number
  marketPosition: number
}

export interface TimelineMetrics {
  timeToValue: number
  implementationWeeks: number
  trainingDays: number
}

export interface EnhancedCalculationResult {
  vendorId: string
  vendorName: string
  totalCost: number
  perDevicePerMonth: number
  breakdown: TCOBreakdown
  roi: ROIMetrics
  operational: OperationalMetrics
  risk: RiskMetrics
  competitive: CompetitiveMetrics
  timeline: TimelineMetrics
  vendorData: EnhancedVendorData
}

export class CalculationService {
  private static readonly REGION_SALARY_MULTIPLIERS = {
    'north-america': 1.0,
    'europe': 0.76,
    'asia-pacific': 0.52,
    'latin-america': 0.44,
    'middle-east': 0.64
  }

  private static readonly INDUSTRY_FACTORS = {
    healthcare: { breachMultiplier: 1.5, complianceComplexity: 1.3, downtimeCost: 8500 },
    financial: { breachMultiplier: 1.3, complianceComplexity: 1.4, downtimeCost: 12000 },
    government: { breachMultiplier: 1.1, complianceComplexity: 1.2, downtimeCost: 8000 },
    technology: { breachMultiplier: 1.0, complianceComplexity: 1.0, downtimeCost: 10000 },
    retail: { breachMultiplier: 0.9, complianceComplexity: 1.1, downtimeCost: 5500 },
    manufacturing: { breachMultiplier: 1.2, complianceComplexity: 1.0, downtimeCost: 15000 },
    education: { breachMultiplier: 0.8, complianceComplexity: 0.9, downtimeCost: 3000 }
  }

  static async calculateVendorTCO(
    vendorId: string,
    config: CalculationConfiguration
  ): Promise<EnhancedCalculationResult | null> {
    try {
      const vendorData = await VendorService.getVendorById(vendorId)
      if (!vendorData) return null

      const breakdown = await this.calculateCostBreakdown(vendorData, config)
      const roi = await this.calculateROI(vendorData, config, breakdown)
      const operational = this.calculateOperationalMetrics(vendorData, config)
      const risk = this.calculateRiskMetrics(vendorData, config)
      const competitive = this.calculateCompetitiveMetrics(vendorData, config)
      const timeline = this.calculateTimelineMetrics(vendorData, config)

      const totalCost = breakdown.total
      const perDevicePerMonth = totalCost / (config.devices * config.years * 12)

      return {
        vendorId,
        vendorName: vendorData.vendor.name,
        totalCost,
        perDevicePerMonth,
        breakdown,
        roi,
        operational,
        risk,
        competitive,
        timeline,
        vendorData
      }
    } catch (error) {
      console.error(`Error calculating TCO for ${vendorId}:`, error)
      return null
    }
  }

  private static async calculateCostBreakdown(
    vendorData: EnhancedVendorData,
    config: CalculationConfiguration
  ): Promise<TCOBreakdown> {
    const { devices, years, region } = config
    const { pricing, costs } = vendorData
    const salaryMultiplier = this.REGION_SALARY_MULTIPLIERS[region as keyof typeof this.REGION_SALARY_MULTIPLIERS] || 1.0

    // Calculate licensing costs
    let licensing = 0
    if (vendorData.vendor.vendor_id === 'portnox') {
      let effectivePrice = config.portnoxBasePrice || 4.0
      
      // Add addon costs
      if (config.portnoxAddons?.atp) effectivePrice += 1.5
      if (config.portnoxAddons?.compliance) effectivePrice += 1.0
      if (config.portnoxAddons?.iot) effectivePrice += 2.0
      if (config.portnoxAddons?.analytics) effectivePrice += 1.5

      // Apply volume discounts
      const volumeDiscounts = pricing.volume_discounts || {}
      const applicableDiscount = Object.entries(volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, discount), 0)

      if (applicableDiscount > 0) {
        effectivePrice *= (1 - applicableDiscount / 100)
      }

      licensing = effectivePrice * devices * 12 * years
    } else {
      const basePrice = pricing.base_price || 0
      const devicePrice = pricing.price_per_device || 0
      const userPrice = pricing.price_per_user || 0

      if (pricing.pricing_model === 'per-device') {
        licensing = (basePrice + devicePrice * devices) * years
      } else if (pricing.pricing_model === 'per-user') {
        licensing = (basePrice + userPrice * config.users) * years
      } else if (pricing.pricing_model === 'flat-rate') {
        licensing = basePrice * years
      } else {
        // Quote-based - estimate based on market averages
        licensing = devicePrice * devices * years
      }

      // Apply volume discounts
      const volumeDiscounts = pricing.volume_discounts || {}
      const applicableDiscount = Object.entries(volumeDiscounts)
        .filter(([threshold]) => devices >= parseInt(threshold))
        .reduce((max, [, discount]) => Math.max(max, discount), 0)

      if (applicableDiscount > 0) {
        licensing *= (1 - applicableDiscount / 100)
      }
    }

    // Calculate other costs
    const hardware = costs
      .filter(c => c.cost_type === 'hardware')
      .reduce((sum, c) => sum + c.cost_amount, 0)

    const implementation = costs
      .filter(c => c.cost_type === 'services')
      .reduce((sum, c) => sum + c.cost_amount, 0)

    const training = costs
      .filter(c => c.cost_type === 'training')
      .reduce((sum, c) => sum + c.cost_amount, 0)

    const maintenanceCosts = costs
      .filter(c => c.cost_type === 'maintenance')
      .reduce((sum, c) => {
        if (c.cost_frequency === 'annual') {
          return sum + (c.cost_amount * years)
        } else if (c.cost_frequency === 'monthly') {
          return sum + (c.cost_amount * 12 * years)
        }
        return sum + c.cost_amount
      }, 0)

    const supportCosts = costs
      .filter(c => c.cost_type === 'support')
      .reduce((sum, c) => {
        if (c.cost_frequency === 'annual') {
          return sum + (c.cost_amount * years)
        } else if (c.cost_frequency === 'monthly') {
          return sum + (c.cost_amount * 12 * years)
        }
        return sum + c.cost_amount
      }, 0)

    // Calculate hidden costs (operational overhead)
    const baseSalary = 125000 * salaryMultiplier
    const fteRequired = vendorData.implementation.required_fte_technical + 
                       vendorData.implementation.required_fte_administrative
    const operationalCost = fteRequired * baseSalary * years

    // Additional hidden costs based on complexity
    let hiddenCosts = operationalCost
    if (vendorData.implementation.complexity === 'high') {
      hiddenCosts += licensing * 0.15 // 15% complexity tax
    } else if (vendorData.implementation.complexity === 'medium') {
      hiddenCosts += licensing * 0.08 // 8% complexity tax
    }

    const total = licensing + hardware + implementation + training + maintenanceCosts + supportCosts + hiddenCosts

    return {
      licensing,
      hardware,
      implementation,
      support: supportCosts,
      training,
      maintenance: maintenanceCosts,
      hidden: hiddenCosts,
      total
    }
  }

  private static async calculateROI(
    vendorData: EnhancedVendorData,
    config: CalculationConfiguration,
    breakdown: TCOBreakdown
  ): Promise<ROIMetrics> {
    // Get industry benchmarks
    const { data: benchmarks } = await supabase
      .from('industry_benchmarks')
      .select('*')
      .eq('industry', config.industry)

    const avgBreachCost = benchmarks?.find(b => b.metric_name === 'average_breach_cost')?.metric_value || 4000000
    const industryFactor = this.INDUSTRY_FACTORS[config.industry as keyof typeof this.INDUSTRY_FACTORS] || this.INDUSTRY_FACTORS.technology

    // Calculate breach risk reduction
    const baseBreachRisk = 0.15 // 15% annual breach probability
    const vendorBreachRisk = Math.max(0.01, baseBreachRisk * (vendorData.security.cve_count / 50))
    const breachReduction = (baseBreachRisk - vendorBreachRisk) / baseBreachRisk

    // Calculate annual savings
    const breachSavings = breachReduction * avgBreachCost * industryFactor.breachMultiplier
    const operationalSavings = this.calculateOperationalSavings(vendorData, config)
    const complianceSavings = this.calculateComplianceSavings(vendorData, config)
    
    const totalAnnualSavings = breachSavings + operationalSavings + complianceSavings
    const annualCost = breakdown.total / config.years
    const netAnnualBenefit = totalAnnualSavings - annualCost

    const roi = netAnnualBenefit > 0 ? (netAnnualBenefit * config.years / breakdown.total) * 100 : 0
    const paybackMonths = netAnnualBenefit > 0 ? (breakdown.total / netAnnualBenefit) * 12 : 999

    return {
      paybackMonths: Math.min(paybackMonths, 999),
      percentage: roi,
      annualSavings: totalAnnualSavings,
      breachReduction: breachReduction * 100,
      laborSavingsFTE: this.calculateFTESavings(vendorData, config),
      timeToValue: vendorData.implementation.time_to_deploy_days
    }
  }

  private static calculateOperationalSavings(
    vendorData: EnhancedVendorData,
    config: CalculationConfiguration
  ): number {
    const baseSalary = 125000 * (this.REGION_SALARY_MULTIPLIERS[config.region as keyof typeof this.REGION_SALARY_MULTIPLIERS] || 1.0)
    
    // Calculate automation savings
    const automationLevel = this.getAutomationLevel(vendorData)
    const manualEffortReduction = automationLevel / 100
    const fteSaved = manualEffortReduction * 2.5 // Baseline 2.5 FTE for manual NAC management
    
    return fteSaved * baseSalary
  }

  private static calculateComplianceSavings(
    vendorData: EnhancedVendorData,
    config: CalculationConfiguration
  ): number {
    const complianceFrameworks = vendorData.security.compliance_frameworks?.length || 0
    const automatedCompliance = this.hasAutomatedCompliance(vendorData)
    
    // Base compliance cost reduction
    let savings = complianceFrameworks * 25000 // $25k per framework
    
    if (automatedCompliance) {
      savings *= 1.5 // 50% additional savings with automation
    }

    return savings
  }

  private static calculateFTESavings(
    vendorData: EnhancedVendorData,
    config: CalculationConfiguration
  ): number {
    const automationLevel = this.getAutomationLevel(vendorData)
    const baselineFTE = 3.0 // Baseline FTE for traditional NAC
    const vendorFTE = vendorData.implementation.required_fte_technical + 
                     vendorData.implementation.required_fte_administrative
    
    return Math.max(0, baselineFTE - vendorFTE)
  }

  private static calculateOperationalMetrics(
    vendorData: EnhancedVendorData,
    config: CalculationConfiguration
  ): OperationalMetrics {
    const automationLevel = this.getAutomationLevel(vendorData)
    const fteSaved = this.calculateFTESavings(vendorData, config)
    
    // Calculate maintenance windows (cloud = 0, on-premise = more)
    let maintenanceWindows = 0
    if (vendorData.vendor.deployment_type === 'on-premise') {
      maintenanceWindows = 4
    } else if (vendorData.vendor.deployment_type === 'hybrid') {
      maintenanceWindows = 2
    }

    // Calculate MTTR based on automation and complexity
    const baseMTTR = vendorData.implementation.complexity === 'high' ? 4 : 
                     vendorData.implementation.complexity === 'medium' ? 2 : 1
    const mttr = baseMTTR * (1 - automationLevel / 200) // Automation reduces MTTR

    const baseSalary = 125000 * (this.REGION_SALARY_MULTIPLIERS[config.region as keyof typeof this.REGION_SALARY_MULTIPLIERS] || 1.0)
    const annualOpsSaving = fteSaved * baseSalary

    return {
      automationLevel,
      fteSaved,
      maintenanceWindows,
      mttr,
      annualOpsSaving
    }
  }

  private static calculateRiskMetrics(
    vendorData: EnhancedVendorData,
    config: CalculationConfiguration
  ): RiskMetrics {
    const securityScore = vendorData.security.security_rating || 70
    const complianceScore = Math.min(100, (vendorData.security.compliance_frameworks?.length || 0) * 12 + 40)
    
    // Calculate breach reduction based on CVE count and security rating
    const baseBreachRisk = 15 // 15% baseline
    const vendorBreachRisk = Math.max(1, baseBreachRisk - (securityScore - 70) / 5 + vendorData.security.cve_count / 10)
    const breachReduction = Math.max(0, (baseBreachRisk - vendorBreachRisk) / baseBreachRisk * 100)

    // Vendor risk based on market presence and track record
    const vendorRisk = Math.max(0, 50 - vendorData.vendor.market_share - (securityScore - 70))

    return {
      securityScore,
      complianceScore,
      breachReduction,
      vendorRisk
    }
  }

  private static calculateCompetitiveMetrics(
    vendorData: EnhancedVendorData,
    config: CalculationConfiguration
  ): CompetitiveMetrics {
    // Innovation score based on deployment type and features
    let innovationScore = 60
    if (vendorData.vendor.deployment_type === 'cloud') innovationScore += 20
    if (vendorData.vendor.vendor_id === 'portnox') innovationScore += 15 // AI-driven
    if (vendorData.vendor.vendor_id === 'juniper_mist') innovationScore += 10 // AI capabilities

    // Future readiness based on architecture and market position
    let futureReadiness = 50
    if (vendorData.vendor.deployment_type === 'cloud') futureReadiness += 25
    if (vendorData.vendor.category === 'leader' || vendorData.vendor.category === 'visionary') futureReadiness += 15
    if (vendorData.security.zero_trust_maturity > 80) futureReadiness += 10

    const marketPosition = vendorData.vendor.market_share * 2 + 
                          (vendorData.vendor.category === 'leader' ? 20 : 
                           vendorData.vendor.category === 'challenger' ? 15 :
                           vendorData.vendor.category === 'visionary' ? 10 : 5)

    return {
      innovationScore: Math.min(100, innovationScore),
      futureReadiness: Math.min(100, futureReadiness),
      marketPosition: Math.min(100, marketPosition)
    }
  }

  private static calculateTimelineMetrics(
    vendorData: EnhancedVendorData,
    config: CalculationConfiguration
  ): TimelineMetrics {
    return {
      timeToValue: vendorData.implementation.time_to_deploy_days,
      implementationWeeks: Math.ceil(vendorData.implementation.time_to_deploy_days / 7),
      trainingDays: Math.ceil(vendorData.implementation.training_hours / 8)
    }
  }

  private static getAutomationLevel(vendorData: EnhancedVendorData): number {
    // Calculate automation level based on features and deployment type
    let automation = 40 // baseline

    if (vendorData.vendor.deployment_type === 'cloud') automation += 30
    if (vendorData.vendor.vendor_id === 'portnox') automation += 25 // AI-driven
    if (vendorData.vendor.vendor_id === 'juniper_mist') automation += 20 // AI capabilities
    
    // Check for automation features
    const hasAIFeatures = vendorData.features.some(f => 
      f.feature_name.includes('ai') || f.feature_name.includes('automated')
    )
    if (hasAIFeatures) automation += 10

    return Math.min(100, automation)
  }

  private static hasAutomatedCompliance(vendorData: EnhancedVendorData): boolean {
    return vendorData.features.some(f => 
      f.feature_category === 'compliance' && f.support_level === 'native'
    ) || vendorData.vendor.vendor_id === 'portnox'
  }

  static async compareVendors(
    vendorIds: string[],
    config: CalculationConfiguration
  ): Promise<EnhancedCalculationResult[]> {
    const results = await Promise.all(
      vendorIds.map(id => this.calculateVendorTCO(id, config))
    )

    return results
      .filter((r): r is EnhancedCalculationResult => r !== null)
      .sort((a, b) => a.totalCost - b.totalCost)
  }

  static async saveCalculation(
    sessionId: string,
    config: CalculationConfiguration,
    selectedVendors: string[],
    results: EnhancedCalculationResult[]
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_calculations')
        .upsert({
          session_id: sessionId,
          configuration: config,
          selected_vendors: selectedVendors,
          results: results,
          updated_at: new Date().toISOString()
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
    results: EnhancedCalculationResult[]
  } | null> {
    try {
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
}