import { createClient } from '@supabase/supabase-js'

const supabaseUrl = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined
const supabaseAnonKey = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface VendorRecord {
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
  last_updated: string
  created_at: string
}

export interface VendorPricingRecord {
  id: string
  vendor_id: string
  pricing_model: 'per-device' | 'per-user' | 'flat-rate' | 'quote-based'
  base_price: number
  price_per_device: number
  price_per_user: number
  minimum_devices: number
  volume_discounts: Record<string, number>
  contract_terms: Record<string, number>
  last_updated: string
}

export interface VendorCostRecord {
  id: string
  vendor_id: string
  cost_type: 'hardware' | 'services' | 'training' | 'maintenance' | 'support' | 'integration'
  cost_amount: number
  cost_frequency: 'one-time' | 'annual' | 'monthly'
  description: string | null
  last_updated: string
}

export interface VendorImplementationRecord {
  id: string
  vendor_id: string
  time_to_deploy_days: number
  complexity: 'low' | 'medium' | 'high'
  professional_services_required: boolean
  training_hours: number
  required_fte_technical: number
  required_fte_administrative: number
  deployment_phases: Array<{ phase: string; duration: string }>
  last_updated: string
}

export interface VendorSecurityRecord {
  id: string
  vendor_id: string
  security_rating: number
  cve_count: number
  critical_cve_count: number
  last_security_incident: string | null
  zero_trust_maturity: number
  compliance_frameworks: string[]
  certifications: string[]
  last_updated: string
}

export interface VendorFeatureRecord {
  id: string
  vendor_id: string
  feature_category: string
  feature_name: string
  support_level: 'native' | 'add-on' | 'partial' | 'none'
  description: string | null
  last_updated: string
}

export interface MarketIntelligenceRecord {
  id: string
  vendor_id: string
  metric_name: string
  metric_value: number
  metric_unit: string | null
  source: string | null
  confidence_level: number
  report_date: string
  last_updated: string
}

export interface IndustryBenchmarkRecord {
  id: string
  industry: string
  metric_name: string
  metric_value: number
  metric_unit: string | null
  source: string | null
  year: number
  last_updated: string
}

export interface UserCalculationRecord {
  id: string
  user_id: string | null
  session_id: string
  configuration: any
  selected_vendors: string[]
  results: any
  created_at: string
  updated_at: string
}