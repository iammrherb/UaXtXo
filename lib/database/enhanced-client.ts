import { createClient } from '@supabase/supabase-js'

const supabaseUrl = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined
const supabaseAnonKey = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined

// Create Supabase client with fallback for missing environment variables
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null && supabaseUrl && supabaseAnonKey
}

// Mock data service for when Supabase is not available
export const mockDataService = {
  async getVendors() {
    // Return mock vendor data from the comprehensive database
    return Object.values(require('../comprehensive-vendor-data').ComprehensiveVendorDatabase)
      .map(vendor => ({
        id: vendor.id,
        vendor_id: vendor.id,
        name: vendor.name,
        category: vendor.category,
        market_share: vendor.marketShare,
        deployment_type: vendor.deploymentType,
        logo_url: vendor.logo,
        description: vendor.description,
        website_url: vendor.description,
        founded_year: vendor.implementation?.timeToDeployDays || 2000,
        headquarters: 'N/A',
        employee_count: null,
        annual_revenue: null,
        gartner_rating: null,
        forrester_rating: null,
        customer_count: null,
        geographic_presence: [],
        last_updated: new Date().toISOString(),
        created_at: new Date().toISOString()
      }))
  },
  
  async getVendorPricing(vendorId: string) {
    const vendor = require('../comprehensive-vendor-data').ComprehensiveVendorDatabase[vendorId]
    if (!vendor) return []
    
    return [{
      id: `${vendorId}_pricing`,
      vendor_id: vendorId,
      pricing_model: vendor.pricing.model,
      base_price: vendor.pricing.basePrice,
      price_per_device: vendor.pricing.pricePerDevice,
      price_per_user: 0,
      minimum_devices: vendor.pricing.minimumDevices || 0,
      volume_discounts: {},
      contract_terms: {},
      currency: 'USD',
      effective_date: new Date().toISOString(),
      expiry_date: null,
      pricing_source: 'mock',
      confidence_level: 80,
      last_updated: new Date().toISOString()
    }]
  },
  
  async getVendorCosts(vendorId: string) {
    const vendor = require('../comprehensive-vendor-data').ComprehensiveVendorDatabase[vendorId]
    if (!vendor) return []
    
    const costs = []
    const additionalCosts = vendor.pricing.additionalCosts
    
    if (additionalCosts.hardware > 0) {
      costs.push({
        id: `${vendorId}_hardware`,
        vendor_id: vendorId,
        cost_category: 'hardware',
        cost_subcategory: 'infrastructure',
        cost_amount: additionalCosts.hardware,
        cost_frequency: 'one-time',
        cost_scaling: 'fixed',
        description: 'Hardware and infrastructure costs',
        region_specific: false,
        industry_specific: null,
        last_updated: new Date().toISOString()
      })
    }
    
    if (additionalCosts.services > 0) {
      costs.push({
        id: `${vendorId}_services`,
        vendor_id: vendorId,
        cost_category: 'services',
        cost_subcategory: 'implementation',
        cost_amount: additionalCosts.services,
        cost_frequency: 'one-time',
        cost_scaling: 'fixed',
        description: 'Professional services and implementation',
        region_specific: false,
        industry_specific: null,
        last_updated: new Date().toISOString()
      })
    }
    
    return costs
  },
  
  async getVendorSecurity(vendorId: string) {
    const vendor = require('../comprehensive-vendor-data').ComprehensiveVendorDatabase[vendorId]
    if (!vendor) return null
    
    return {
      id: `${vendorId}_security`,
      vendor_id: vendorId,
      security_rating: vendor.security.securityRating,
      cve_count_total: vendor.security.cveCount,
      cve_count_critical: Math.floor(vendor.security.cveCount * 0.3),
      cve_count_high: Math.floor(vendor.security.cveCount * 0.2),
      cve_count_medium: Math.floor(vendor.security.cveCount * 0.3),
      cve_count_low: Math.floor(vendor.security.cveCount * 0.2),
      last_cve_date: vendor.security.lastSecurityIncident || null,
      security_incidents: [],
      zero_trust_maturity: vendor.security.zeroTrustMaturity,
      compliance_frameworks: vendor.security.complianceSupport,
      certifications: [],
      security_audits: [],
      penetration_test_results: [],
      bug_bounty_program: false,
      responsible_disclosure: true,
      security_team_size: null,
      last_security_assessment: null,
      last_updated: new Date().toISOString()
    }
  },
  
  async getVendorFeatures(vendorId: string) {
    const vendor = require('../comprehensive-vendor-data').ComprehensiveVendorDatabase[vendorId]
    if (!vendor) return []
    
    const features = []
    
    // Add core features
    vendor.features.core.forEach((feature: string) => {
      features.push({
        id: `${vendorId}_${feature}`,
        vendor_id: vendorId,
        feature_category: 'core',
        feature_name: feature,
        feature_description: feature,
        support_level: 'native',
        maturity_level: 'ga',
        additional_cost: null,
        implementation_complexity: 'low',
        api_available: true,
        automation_level: 80,
        last_updated: new Date().toISOString()
      })
    })
    
    // Add advanced features
    vendor.features.advanced.forEach((feature: string) => {
      features.push({
        id: `${vendorId}_${feature}`,
        vendor_id: vendorId,
        feature_category: 'advanced',
        feature_name: feature,
        feature_description: feature,
        support_level: 'native',
        maturity_level: 'ga',
        additional_cost: null,
        implementation_complexity: 'medium',
        api_available: true,
        automation_level: 90,
        last_updated: new Date().toISOString()
      })
    })
    
    return features
  },
  
  async getMarketIntelligence(vendorId?: string) {
    return []
  },
  
  async getIndustryBenchmarks(industry: string, orgSize?: string) {
    return []
  },
  
  async saveCalculation() {
    console.warn('Supabase not available - calculation not saved to database')
    return false
  },
  
  async loadCalculation() {
    console.warn('Supabase not available - cannot load from database')
    return null
  }
}

// Enhanced database types with real-world data structures
export interface EnhancedVendorRecord {
  id: string
  vendor_id: string
  name: string
  category: 'leader' | 'challenger' | 'visionary' | 'niche'
  market_share: number
  deployment_type: 'cloud' | 'on-premise' | 'hybrid'
  logo_url: string | null
  description: string
  website_url: string | null
  founded_year: number | null
  headquarters: string | null
  employee_count: number | null
  annual_revenue: number | null
  gartner_rating: number | null
  forrester_rating: number | null
  customer_count: number | null
  geographic_presence: string[]
  last_updated: string
  created_at: string
}

export interface RealTimePricingRecord {
  id: string
  vendor_id: string
  pricing_model: 'per-device' | 'per-user' | 'flat-rate' | 'quote-based' | 'tiered'
  base_price: number
  price_per_device: number
  price_per_user: number
  minimum_devices: number
  volume_discounts: Record<string, number>
  contract_terms: Record<string, any>
  currency: string
  effective_date: string
  expiry_date: string | null
  pricing_source: string
  confidence_level: number
  last_updated: string
}

export interface DetailedCostRecord {
  id: string
  vendor_id: string
  cost_category: 'licensing' | 'hardware' | 'services' | 'training' | 'maintenance' | 'support' | 'integration' | 'hidden'
  cost_subcategory: string
  cost_amount: number
  cost_frequency: 'one-time' | 'annual' | 'monthly' | 'quarterly'
  cost_scaling: 'fixed' | 'per-device' | 'per-user' | 'percentage'
  description: string | null
  region_specific: boolean
  industry_specific: string[] | null
  last_updated: string
}

export interface ComprehensiveSecurityRecord {
  id: string
  vendor_id: string
  security_rating: number
  cve_count_total: number
  cve_count_critical: number
  cve_count_high: number
  cve_count_medium: number
  cve_count_low: number
  last_cve_date: string | null
  security_incidents: any[]
  zero_trust_maturity: number
  compliance_frameworks: string[]
  certifications: string[]
  security_audits: any[]
  penetration_test_results: any[]
  bug_bounty_program: boolean
  responsible_disclosure: boolean
  security_team_size: number | null
  last_security_assessment: string | null
  last_updated: string
}

export interface AdvancedFeatureRecord {
  id: string
  vendor_id: string
  feature_category: string
  feature_name: string
  feature_description: string
  support_level: 'native' | 'add-on' | 'partial' | 'roadmap' | 'none'
  maturity_level: 'beta' | 'ga' | 'mature' | 'deprecated'
  additional_cost: number | null
  implementation_complexity: 'low' | 'medium' | 'high'
  api_available: boolean
  automation_level: number
  last_updated: string
}

export interface MarketIntelligenceRecord {
  id: string
  vendor_id: string
  metric_name: string
  metric_value: number
  metric_unit: string | null
  metric_category: 'financial' | 'operational' | 'security' | 'customer' | 'market'
  source: string
  source_type: 'analyst_report' | 'customer_survey' | 'vendor_data' | 'third_party'
  confidence_level: number
  report_date: string
  geographic_scope: string[]
  industry_scope: string[]
  sample_size: number | null
  methodology: string | null
  last_updated: string
}

export interface BenchmarkRecord {
  id: string
  industry: string
  organization_size: 'small' | 'medium' | 'large' | 'enterprise'
  metric_name: string
  metric_value: number
  metric_unit: string | null
  percentile_25: number | null
  percentile_50: number | null
  percentile_75: number | null
  percentile_90: number | null
  source: string
  year: number
  region: string
  last_updated: string
}

export interface CalculationHistoryRecord {
  id: string
  user_id: string | null
  session_id: string
  configuration: any
  selected_vendors: string[]
  results: any
  calculation_version: string
  metadata: any
  created_at: string
  updated_at: string
}

// Enhanced database service with caching and real-time updates
export class EnhancedDatabaseService {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private static readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  static async getCachedData<T>(key: string, fetcher: () => Promise<T>, ttl = this.CACHE_TTL): Promise<T> {
    if (!isSupabaseAvailable()) {
      // Use mock data when Supabase is not available
      return fetcher()
    }
    
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return cached.data
    }

    const data = await fetcher()
    this.cache.set(key, { data, timestamp: Date.now(), ttl })
    return data
  }

  static clearCache(pattern?: string) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key)
        }
      }
    } else {
      this.cache.clear()
    }
  }

  static async getVendors(): Promise<EnhancedVendorRecord[]> {
    return this.getCachedData('vendors', async () => {
      if (!isSupabaseAvailable()) {
        return mockDataService.getVendors()
      }
      
      const { data, error } = await supabase!
        .from('vendors')
        .select('*')
        .order('market_share', { ascending: false })

      if (error) throw error
      return data || []
    })
  }

  static async getVendorPricing(vendorId: string): Promise<RealTimePricingRecord[]> {
    return this.getCachedData(`pricing_${vendorId}`, async () => {
      const { data, error } = await supabase
        .from('vendor_pricing')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('effective_date', { ascending: false })

      if (error) throw error
      return data || []
    })
  }

  static async getVendorCosts(vendorId: string): Promise<DetailedCostRecord[]> {
    return this.getCachedData(`costs_${vendorId}`, async () => {
      const { data, error } = await supabase
        .from('vendor_costs')
        .select('*')
        .eq('vendor_id', vendorId)

      if (error) throw error
      return data || []
    })
  }

  static async getVendorSecurity(vendorId: string): Promise<ComprehensiveSecurityRecord | null> {
    return this.getCachedData(`security_${vendorId}`, async () => {
      const { data, error } = await supabase
        .from('vendor_security')
        .select('*')
        .eq('vendor_id', vendorId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return data
    })
  }

  static async getVendorFeatures(vendorId: string): Promise<AdvancedFeatureRecord[]> {
    return this.getCachedData(`features_${vendorId}`, async () => {
      const { data, error } = await supabase
        .from('vendor_features')
        .select('*')
        .eq('vendor_id', vendorId)

      if (error) throw error
      return data || []
    })
  }

  static async getMarketIntelligence(vendorId?: string): Promise<MarketIntelligenceRecord[]> {
    const cacheKey = vendorId ? `intelligence_${vendorId}` : 'intelligence_all'
    
    return this.getCachedData(cacheKey, async () => {
      let query = supabase.from('market_intelligence').select('*')
      
      if (vendorId) {
        query = query.eq('vendor_id', vendorId)
      }
      
      const { data, error } = await query.order('report_date', { ascending: false })

      if (error) throw error
      return data || []
    })
  }

  static async getIndustryBenchmarks(industry: string, orgSize?: string): Promise<BenchmarkRecord[]> {
    const cacheKey = `benchmarks_${industry}_${orgSize || 'all'}`
    
    return this.getCachedData(cacheKey, async () => {
      let query = supabase
        .from('industry_benchmarks')
        .select('*')
        .eq('industry', industry)
      
      if (orgSize) {
        query = query.eq('organization_size', orgSize)
      }
      
      const { data, error } = await query.order('year', { ascending: false })

      if (error) throw error
      return data || []
    })
  }

  static async saveCalculation(
    sessionId: string,
    config: CalculationConfiguration,
    selectedVendors: string[],
    results: any[]
  ): Promise<boolean> {
    try {
      if (!isSupabaseAvailable()) {
        return mockDataService.saveCalculation()
      }
      
      if (!sessionId || !config || !selectedVendors || !results) {
        console.error('Missing required parameters for saving calculation')
        return false
      }
      
      const { error } = await supabase!
        .from('user_calculations')
        .upsert({
          session_id: sessionId,
          configuration: config,
          selected_vendors: selectedVendors,
          results: results,
          calculation_version: '3.0',
          metadata: {
            timestamp: new Date().toISOString(),
            vendor_count: selectedVendors.length,
            total_cost_range: results.length > 0 ? {
              min: Math.min(...results.map(r => r.totalCost)),
              max: Math.max(...results.map(r => r.totalCost))
            } : null
          },
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
    results: any[]
  } | null> {
    try {
      if (!isSupabaseAvailable()) {
        return mockDataService.loadCalculation()
      }
      
      if (!sessionId) {
        console.error('Session ID is required for loading calculation')
        return null
      }
      
      const { data, error } = await supabase!
        .from('user_calculations')
        .select('*')
        .eq('session_id', sessionId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single()

      if (error || !data) {
        console.warn('No saved calculation found for session:', sessionId)
        return null
      }

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