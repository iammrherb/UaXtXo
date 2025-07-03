import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

export const sql = neon(process.env.DATABASE_URL)

export type VendorRecord = {
  id: string
  name: string
  category: string
  pricing_model: string
  base_cost: number
  per_user_cost: number
  setup_cost: number
  annual_discount: number
  features: string[]
  compliance_certifications: string[]
  security_features: string[]
  integration_capabilities: string[]
  support_tiers: string[]
  deployment_options: string[]
  scalability_limits: Record<string, any>
  vendor_lock_in_risk: string
  market_position: string
  financial_stability: string
  innovation_score: number
  customer_satisfaction: number
  created_at: Date
  updated_at: Date
}

export type AIInsightRecord = {
  id: string
  vendor_ids: string[]
  industry: string
  org_size: string
  insight_type: string
  content: Record<string, any>
  confidence_score: number
  created_at: Date
  expires_at: Date
}

export type ReportRecord = {
  id: string
  name: string
  description: string
  template_data: Record<string, any>
  vendor_ids: string[]
  industry: string
  org_size: string
  created_by: string
  created_at: Date
  updated_at: Date
}
