import { EnhancedDatabaseService, isSupabaseAvailable, mockDataService } from '../database/enhanced-client'
import type {
  EnhancedVendorRecord,
  RealTimePricingRecord,
  DetailedCostRecord,
  ComprehensiveSecurityRecord,
  AdvancedFeatureRecord,
  MarketIntelligenceRecord
} from '../database/enhanced-client'

export interface CompleteVendorData {
  vendor: EnhancedVendorRecord
  pricing: RealTimePricingRecord[]
  costs: DetailedCostRecord[]
  security: ComprehensiveSecurityRecord | null
  features: AdvancedFeatureRecord[]
  intelligence: MarketIntelligenceRecord[]
  marketPosition: {
    rank: number
    category: string
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
  }
  realTimeMetrics: {
    customerSatisfaction: number
    deploymentSuccess: number
    supportQuality: number
    securityIncidents: number
    marketMomentum: number
  }
}

export class EnhancedVendorService {
  private static readonly VENDOR_CATEGORIES = {
    leader: {
      description: 'Market leaders with proven track record',
      criteria: 'High market share, comprehensive features, strong support'
    },
    challenger: {
      description: 'Strong competitors with competitive offerings',
      criteria: 'Good market presence, competitive features and pricing'
    },
    visionary: {
      description: 'Innovative solutions with future-focused approach',
      criteria: 'Advanced technology, cloud-native, AI/ML capabilities'
    },
    niche: {
      description: 'Specialized solutions for specific use cases',
      criteria: 'Focused features, specific market segments'
    }
  }

  static async getAllVendors(): Promise<EnhancedVendorRecord[]> {
    try {
      if (isSupabaseAvailable()) {
        return await EnhancedDatabaseService.getVendors()
      } else {
        return await mockDataService.getVendors()
      }
    } catch (error) {
      console.error('Error fetching vendors:', error)
      throw new Error('Failed to fetch vendor data')
    }
  }

  static async getCompleteVendorData(vendorId: string): Promise<CompleteVendorData | null> {
    try {
      // Use comprehensive vendor database as fallback
      const vendorInfo = require('../comprehensive-vendor-data').ComprehensiveVendorDatabase[vendorId]
      if (!vendorInfo) {
        console.error(`Vendor ${vendorId} not found in comprehensive database`)
        return null
      }
      
      let vendor, pricing, costs, security, features, intelligence

      if (isSupabaseAvailable()) {
        [vendor, pricing, costs, security, features, intelligence] = await Promise.all([
          EnhancedDatabaseService.getVendors().then(vendors => 
            vendors.find(v => v.vendor_id === vendorId)
          ),
          EnhancedDatabaseService.getVendorPricing(vendorId),
          EnhancedDatabaseService.getVendorCosts(vendorId),
          EnhancedDatabaseService.getVendorSecurity(vendorId),
          EnhancedDatabaseService.getVendorFeatures(vendorId),
          EnhancedDatabaseService.getMarketIntelligence(vendorId)
        ])
      } else {
        // Use mock data service
        const vendors = await mockDataService.getVendors()
        vendor = vendors.find(v => v.vendor_id === vendorId)
        pricing = await mockDataService.getVendorPricing(vendorId)
        costs = await mockDataService.getVendorCosts(vendorId)
        security = await mockDataService.getVendorSecurity(vendorId)
        features = await mockDataService.getVendorFeatures(vendorId)
        intelligence = await mockDataService.getMarketIntelligence(vendorId)
      }

      // Create vendor record from comprehensive database if not found
      if (!vendor) {
        vendor = {
          id: vendorInfo.id,
          vendor_id: vendorInfo.id,
          name: vendorInfo.name,
          category: vendorInfo.category,
          market_share: vendorInfo.marketShare,
          deployment_type: vendorInfo.deploymentType,
          logo_url: vendorInfo.logo,
          description: vendorInfo.description,
          website_url: '',
          founded_year: 2000,
          headquarters: '',
          employee_count: null,
          annual_revenue: null,
          last_updated: new Date().toISOString(),
          created_at: new Date().toISOString()
        }
      }

      // Ensure we have pricing data
      if (!pricing || pricing.length === 0) {
        pricing = [{
          id: `${vendorId}_pricing`,
          vendor_id: vendorId,
          pricing_model: vendorInfo.pricing.model as any,
          base_price: vendorInfo.pricing.basePrice,
          price_per_device: vendorInfo.pricing.pricePerDevice,
          price_per_user: 0,
          minimum_devices: vendorInfo.pricing.minimumDevices || 0,
          volume_discounts: vendorInfo.pricing.volumeDiscounts,
          contract_terms: vendorInfo.pricing.contractTerms,
          currency: 'USD',
          effective_date: new Date().toISOString(),
          expiry_date: null,
          pricing_source: 'comprehensive_db',
          confidence_level: 95,
          last_updated: new Date().toISOString()
        }]
      }

      // Ensure we have security data
      if (!security) {
        security = {
          id: `${vendorId}_security`,
          vendor_id: vendorId,
          security_rating: vendorInfo.security.securityRating,
          cve_count_total: vendorInfo.security.cveCount,
          cve_count_critical: Math.floor(vendorInfo.security.cveCount * 0.3),
          cve_count_high: Math.floor(vendorInfo.security.cveCount * 0.2),
          cve_count_medium: Math.floor(vendorInfo.security.cveCount * 0.3),
          cve_count_low: Math.floor(vendorInfo.security.cveCount * 0.2),
          last_cve_date: vendorInfo.security.lastSecurityIncident || null,
          security_incidents: [],
          zero_trust_maturity: vendorInfo.security.zeroTrustMaturity,
          compliance_frameworks: vendorInfo.security.complianceSupport,
          certifications: vendorInfo.security.certifications || [],
          security_audits: [],
          penetration_test_results: [],
          bug_bounty_program: false,
          responsible_disclosure: true,
          security_team_size: null,
          last_security_assessment: null,
          last_updated: new Date().toISOString()
        }
      }

      const marketPosition = this.calculateMarketPosition(vendor, intelligence)
      const realTimeMetrics = this.calculateRealTimeMetrics(intelligence, security)

      return {
        vendor,
        pricing,
        costs: costs || [],
        security,
        features: features || [],
        intelligence: intelligence || [],
        marketPosition,
        realTimeMetrics
      }
    } catch (error) {
      console.error(`Error fetching complete data for ${vendorId}:`, error)
      return null
    }
  }

  static async getMultipleVendorData(vendorIds: string[]): Promise<CompleteVendorData[]> {
    const results = await Promise.all(
      vendorIds.map(id => this.getCompleteVendorData(id))
    )
    
    return results.filter((data): data is CompleteVendorData => data !== null)
  }

  static async searchVendors(
    query: string,
    filters: {
      category?: string[]
      deploymentType?: string[]
      minMarketShare?: number
      maxPrice?: number
      securityRating?: number
      industry?: string
    } = {}
  ): Promise<EnhancedVendorRecord[]> {
    try {
      const vendors = await this.getAllVendors()
      
      return vendors.filter(vendor => {
        // Text search
        const matchesQuery = !query || 
          vendor.name.toLowerCase().includes(query.toLowerCase()) ||
          vendor.description.toLowerCase().includes(query.toLowerCase())

        // Category filter
        const matchesCategory = !filters.category?.length || 
          filters.category.includes(vendor.category)

        // Deployment type filter
        const matchesDeployment = !filters.deploymentType?.length || 
          filters.deploymentType.includes(vendor.deployment_type)

        // Market share filter
        const matchesMarketShare = !filters.minMarketShare || 
          vendor.market_share >= filters.minMarketShare

        return matchesQuery && matchesCategory && matchesDeployment && matchesMarketShare
      })
    } catch (error) {
      console.error('Error searching vendors:', error)
      return []
    }
  }

  static async getVendorComparison(vendorIds: string[]): Promise<{
    vendors: CompleteVendorData[]
    comparison: {
      strengths: Record<string, string[]>
      weaknesses: Record<string, string[]>
      differentiators: Record<string, string[]>
      recommendations: {
        best_overall: string
        best_value: string
        best_security: string
        best_ease_of_use: string
      }
    }
  }> {
    const vendors = await this.getMultipleVendorData(vendorIds)
    
    const comparison = {
      strengths: {},
      weaknesses: {},
      differentiators: {},
      recommendations: this.generateRecommendations(vendors)
    }

    vendors.forEach(vendor => {
      comparison.strengths[vendor.vendor.vendor_id] = this.identifyStrengths(vendor)
      comparison.weaknesses[vendor.vendor.vendor_id] = this.identifyWeaknesses(vendor)
      comparison.differentiators[vendor.vendor.vendor_id] = this.identifyDifferentiators(vendor, vendors)
    })

    return { vendors, comparison }
  }

  private static calculateMarketPosition(
    vendor: EnhancedVendorRecord,
    intelligence: MarketIntelligenceRecord[]
  ) {
    const customerSat = intelligence.find(i => i.metric_name === 'customer_satisfaction')?.metric_value || 75
    const marketMomentum = intelligence.find(i => i.metric_name === 'market_momentum')?.metric_value || 50

    let rank = 1
    if (vendor.market_share > 20) rank = 1
    else if (vendor.market_share > 10) rank = 2
    else if (vendor.market_share > 5) rank = 3
    else rank = 4

    const strengths = this.generateStrengths(vendor, intelligence)
    const weaknesses = this.generateWeaknesses(vendor, intelligence)
    const recommendations = this.generateVendorRecommendations(vendor, intelligence)

    return {
      rank,
      category: vendor.category,
      strengths,
      weaknesses,
      recommendations
    }
  }

  private static calculateRealTimeMetrics(
    intelligence: MarketIntelligenceRecord[],
    security: ComprehensiveSecurityRecord | null
  ) {
    return {
      customerSatisfaction: intelligence.find(i => i.metric_name === 'customer_satisfaction')?.metric_value || 75,
      deploymentSuccess: intelligence.find(i => i.metric_name === 'deployment_success_rate')?.metric_value || 85,
      supportQuality: intelligence.find(i => i.metric_name === 'support_quality')?.metric_value || 80,
      securityIncidents: security?.security_incidents?.length || 0,
      marketMomentum: intelligence.find(i => i.metric_name === 'market_momentum')?.metric_value || 50
    }
  }

  private static generateStrengths(vendor: EnhancedVendorRecord, intelligence: MarketIntelligenceRecord[]): string[] {
    const strengths: string[] = []

    if (vendor.market_share > 15) strengths.push('Market leader with proven track record')
    if (vendor.deployment_type === 'cloud') strengths.push('Modern cloud-native architecture')
    if (vendor.category === 'visionary') strengths.push('Innovative technology and features')
    if (vendor.founded_year && vendor.founded_year < 2000) strengths.push('Established vendor with long history')

    const customerSat = intelligence.find(i => i.metric_name === 'customer_satisfaction')?.metric_value
    if (customerSat && customerSat > 85) strengths.push('High customer satisfaction ratings')

    return strengths
  }

  private static generateWeaknesses(vendor: EnhancedVendorRecord, intelligence: MarketIntelligenceRecord[]): string[] {
    const weaknesses: string[] = []

    if (vendor.market_share < 5) weaknesses.push('Limited market presence')
    if (vendor.deployment_type === 'on-premise') weaknesses.push('Legacy on-premise architecture')
    if (vendor.category === 'niche') weaknesses.push('Limited feature set for general use')

    const deploymentTime = intelligence.find(i => i.metric_name === 'average_deployment_time')?.metric_value
    if (deploymentTime && deploymentTime > 90) weaknesses.push('Long deployment timeline')

    return weaknesses
  }

  private static generateVendorRecommendations(vendor: EnhancedVendorRecord, intelligence: MarketIntelligenceRecord[]): string[] {
    const recommendations: string[] = []

    if (vendor.vendor_id === 'portnox') {
      recommendations.push('Ideal for organizations seeking rapid deployment and cloud-native benefits')
      recommendations.push('Best choice for cost-conscious enterprises wanting modern NAC')
      recommendations.push('Perfect for zero-trust security initiatives')
    } else if (vendor.vendor_id === 'cisco_ise') {
      recommendations.push('Suitable for large enterprises with complex requirements')
      recommendations.push('Good fit for Cisco-centric environments')
      recommendations.push('Consider for comprehensive policy management needs')
    }

    return recommendations
  }

  private static identifyStrengths(vendor: CompleteVendorData): string[] {
    const strengths: string[] = []

    if (vendor.security?.security_rating > 90) strengths.push('Excellent security posture')
    if (vendor.security?.cve_count_total === 0) strengths.push('Zero known vulnerabilities')
    if (vendor.vendor.deployment_type === 'cloud') strengths.push('Cloud-native architecture')
    if (vendor.realTimeMetrics.customerSatisfaction > 90) strengths.push('Outstanding customer satisfaction')

    return strengths
  }

  private static identifyWeaknesses(vendor: CompleteVendorData): string[] {
    const weaknesses: string[] = []

    if (vendor.security?.cve_count_critical > 5) weaknesses.push('Multiple critical vulnerabilities')
    if (vendor.vendor.deployment_type === 'on-premise') weaknesses.push('Legacy infrastructure requirements')
    if (vendor.realTimeMetrics.customerSatisfaction < 70) weaknesses.push('Below-average customer satisfaction')

    return weaknesses
  }

  private static identifyDifferentiators(vendor: CompleteVendorData, allVendors: CompleteVendorData[]): string[] {
    const differentiators: string[] = []

    // Find unique capabilities
    const hasAI = vendor.features.some(f => f.feature_name.toLowerCase().includes('ai') && f.support_level === 'native')
    const othersWithAI = allVendors.filter(v => v.vendor.vendor_id !== vendor.vendor.vendor_id)
      .some(v => v.features.some(f => f.feature_name.toLowerCase().includes('ai') && f.support_level === 'native'))

    if (hasAI && !othersWithAI) {
      differentiators.push('Unique AI-powered capabilities')
    }

    return differentiators
  }

  private static generateRecommendations(vendors: CompleteVendorData[]) {
    const sortedByCost = [...vendors].sort((a, b) => {
      const aCost = a.pricing[0]?.price_per_device || 999
      const bCost = b.pricing[0]?.price_per_device || 999
      return aCost - bCost
    })

    const sortedBySecurity = [...vendors].sort((a, b) => {
      const aSecurity = a.security?.security_rating || 0
      const bSecurity = b.security?.security_rating || 0
      return bSecurity - aSecurity
    })

    const sortedByEase = [...vendors].sort((a, b) => {
      const aComplexity = a.vendor.deployment_type === 'cloud' ? 1 : 3
      const bComplexity = b.vendor.deployment_type === 'cloud' ? 1 : 3
      return aComplexity - bComplexity
    })

    return {
      best_overall: vendors.find(v => v.vendor.vendor_id === 'portnox')?.vendor.vendor_id || vendors[0]?.vendor.vendor_id,
      best_value: sortedByCost[0]?.vendor.vendor_id || '',
      best_security: sortedBySecurity[0]?.vendor.vendor_id || '',
      best_ease_of_use: sortedByEase[0]?.vendor.vendor_id || ''
    }
  }

  static async getVendorTrends(): Promise<{
    trending_up: string[]
    trending_down: string[]
    market_shifts: Array<{
      trend: string
      impact: string
      affected_vendors: string[]
    }>
  }> {
    try {
      const intelligence = await EnhancedDatabaseService.getMarketIntelligence()
      
      // Analyze trends based on recent data
      const recentData = intelligence.filter(i => 
        new Date(i.report_date) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
      )

      const trendingUp = recentData
        .filter(i => i.metric_name === 'market_momentum' && i.metric_value > 60)
        .map(i => i.vendor_id)

      const trendingDown = recentData
        .filter(i => i.metric_name === 'market_momentum' && i.metric_value < 40)
        .map(i => i.vendor_id)

      const marketShifts = [
        {
          trend: 'Cloud-native adoption accelerating',
          impact: 'Traditional on-premise vendors losing ground',
          affected_vendors: ['cisco_ise', 'fortinet_fortinac']
        },
        {
          trend: 'Zero Trust becoming mandatory',
          impact: 'Vendors without native Zero Trust falling behind',
          affected_vendors: ['microsoft_nps', 'packetfence']
        },
        {
          trend: 'AI/ML integration becoming standard',
          impact: 'Manual configuration vendors becoming obsolete',
          affected_vendors: ['portnox', 'juniper_mist']
        }
      ]

      return {
        trending_up: [...new Set(trendingUp)],
        trending_down: [...new Set(trendingDown)],
        market_shifts: marketShifts
      }
    } catch (error) {
      console.error('Error analyzing vendor trends:', error)
      return {
        trending_up: [],
        trending_down: [],
        market_shifts: []
      }
    }
  }

  static async getVendorAlerts(): Promise<Array<{
    vendor_id: string
    vendor_name: string
    alert_type: 'security' | 'pricing' | 'support' | 'eol'
    severity: 'low' | 'medium' | 'high' | 'critical'
    message: string
    action_required: boolean
    deadline?: string
  }>> {
    try {
      const vendors = await this.getAllVendors()
      const alerts: any[] = []

      for (const vendor of vendors) {
        const security = await EnhancedDatabaseService.getVendorSecurity(vendor.vendor_id)
        
        // Security alerts
        if (security) {
          if (security.cve_count_critical > 0) {
            alerts.push({
              vendor_id: vendor.vendor_id,
              vendor_name: vendor.name,
              alert_type: 'security',
              severity: 'critical',
              message: `${security.cve_count_critical} critical vulnerabilities found`,
              action_required: true
            })
          }

          if (security.last_cve_date && new Date(security.last_cve_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
            alerts.push({
              vendor_id: vendor.vendor_id,
              vendor_name: vendor.name,
              alert_type: 'security',
              severity: 'high',
              message: 'Recent security vulnerability discovered',
              action_required: true
            })
          }
        }

        // Special alerts for specific vendors
        if (vendor.vendor_id === 'ivanti_neurons') {
          alerts.push({
            vendor_id: vendor.vendor_id,
            vendor_name: vendor.name,
            alert_type: 'security',
            severity: 'critical',
            message: 'Active nation-state exploitation - immediate migration required',
            action_required: true,
            deadline: '2024-12-31'
          })
        }

        if (vendor.vendor_id === 'microsoft_nps') {
          alerts.push({
            vendor_id: vendor.vendor_id,
            vendor_name: vendor.name,
            alert_type: 'eol',
            severity: 'medium',
            message: 'Limited NAC capabilities - consider modern alternatives',
            action_required: false
          })
        }
      }

      return alerts
    } catch (error) {
      console.error('Error fetching vendor alerts:', error)
      return []
    }
  }

  static getCategoryInfo(category: string) {
    return this.VENDOR_CATEGORIES[category as keyof typeof this.VENDOR_CATEGORIES] || {
      description: 'Unknown category',
      criteria: 'No criteria available'
    }
  }
}