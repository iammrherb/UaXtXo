import { supabase } from '../database/client'
import type {
  VendorRecord,
  VendorPricingRecord,
  VendorCostRecord,
  VendorImplementationRecord,
  VendorSecurityRecord,
  VendorFeatureRecord,
  MarketIntelligenceRecord
} from '../database/client'

export interface EnhancedVendorData {
  vendor: VendorRecord
  pricing: VendorPricingRecord
  costs: VendorCostRecord[]
  implementation: VendorImplementationRecord
  security: VendorSecurityRecord
  features: VendorFeatureRecord[]
  intelligence: MarketIntelligenceRecord[]
}

export class VendorService {
  static async getAllVendors(): Promise<VendorRecord[]> {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('market_share', { ascending: false })

    if (error) {
      console.error('Error fetching vendors:', error)
      throw new Error('Failed to fetch vendors')
    }

    return data || []
  }

  static async getVendorById(vendorId: string): Promise<EnhancedVendorData | null> {
    try {
      // Fetch vendor basic info
      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .select('*')
        .eq('vendor_id', vendorId)
        .single()

      if (vendorError || !vendor) {
        console.error('Error fetching vendor:', vendorError)
        return null
      }

      // Fetch pricing
      const { data: pricing, error: pricingError } = await supabase
        .from('vendor_pricing')
        .select('*')
        .eq('vendor_id', vendorId)
        .single()

      if (pricingError) {
        console.error('Error fetching pricing:', pricingError)
      }

      // Fetch costs
      const { data: costs, error: costsError } = await supabase
        .from('vendor_costs')
        .select('*')
        .eq('vendor_id', vendorId)

      if (costsError) {
        console.error('Error fetching costs:', costsError)
      }

      // Fetch implementation
      const { data: implementation, error: implementationError } = await supabase
        .from('vendor_implementation')
        .select('*')
        .eq('vendor_id', vendorId)
        .single()

      if (implementationError) {
        console.error('Error fetching implementation:', implementationError)
      }

      // Fetch security
      const { data: security, error: securityError } = await supabase
        .from('vendor_security')
        .select('*')
        .eq('vendor_id', vendorId)
        .single()

      if (securityError) {
        console.error('Error fetching security:', securityError)
      }

      // Fetch features
      const { data: features, error: featuresError } = await supabase
        .from('vendor_features')
        .select('*')
        .eq('vendor_id', vendorId)

      if (featuresError) {
        console.error('Error fetching features:', featuresError)
      }

      // Fetch market intelligence
      const { data: intelligence, error: intelligenceError } = await supabase
        .from('market_intelligence')
        .select('*')
        .eq('vendor_id', vendorId)

      if (intelligenceError) {
        console.error('Error fetching intelligence:', intelligenceError)
      }

      return {
        vendor,
        pricing: pricing || {} as VendorPricingRecord,
        costs: costs || [],
        implementation: implementation || {} as VendorImplementationRecord,
        security: security || {} as VendorSecurityRecord,
        features: features || [],
        intelligence: intelligence || []
      }
    } catch (error) {
      console.error('Error in getVendorById:', error)
      return null
    }
  }

  static async getVendorsByIds(vendorIds: string[]): Promise<EnhancedVendorData[]> {
    const vendors = await Promise.all(
      vendorIds.map(id => this.getVendorById(id))
    )
    
    return vendors.filter((v): v is EnhancedVendorData => v !== null)
  }

  static async searchVendors(query: string, filters?: {
    category?: string
    deploymentType?: string
    minMarketShare?: number
  }): Promise<VendorRecord[]> {
    let queryBuilder = supabase
      .from('vendors')
      .select('*')

    if (query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    }

    if (filters?.category) {
      queryBuilder = queryBuilder.eq('category', filters.category)
    }

    if (filters?.deploymentType) {
      queryBuilder = queryBuilder.eq('deployment_type', filters.deploymentType)
    }

    if (filters?.minMarketShare) {
      queryBuilder = queryBuilder.gte('market_share', filters.minMarketShare)
    }

    const { data, error } = await queryBuilder.order('market_share', { ascending: false })

    if (error) {
      console.error('Error searching vendors:', error)
      throw new Error('Failed to search vendors')
    }

    return data || []
  }

  static async updateVendorData(vendorId: string, updates: Partial<VendorRecord>): Promise<boolean> {
    const { error } = await supabase
      .from('vendors')
      .update({ ...updates, last_updated: new Date().toISOString() })
      .eq('vendor_id', vendorId)

    if (error) {
      console.error('Error updating vendor:', error)
      return false
    }

    return true
  }

  static async getMarketTrends(): Promise<any[]> {
    const { data, error } = await supabase
      .from('market_intelligence')
      .select(`
        *,
        vendors!inner(name, category)
      `)
      .order('report_date', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Error fetching market trends:', error)
      return []
    }

    return data || []
  }
}