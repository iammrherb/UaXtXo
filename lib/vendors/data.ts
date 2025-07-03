export interface NewVendorData {
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
}

export type VendorId = string

// Static fallback data for development
export const allVendorsData: NewVendorData[] = [
  {
    id: "portnox",
    name: "Portnox",
    category: "NAC",
    pricing_model: "per_device",
    base_cost: 15000,
    per_user_cost: 25,
    setup_cost: 5000,
    annual_discount: 15,
    features: ["Device Discovery", "Policy Enforcement", "Guest Access", "BYOD Support"],
    compliance_certifications: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS"],
    security_features: ["Zero Trust Architecture", "Multi-factor Authentication"],
    integration_capabilities: ["REST API", "SIEM Integration", "Active Directory"],
    support_tiers: ["24/7 Support", "Professional Services"],
    deployment_options: ["Cloud", "On-Premises", "Hybrid"],
    scalability_limits: { max_devices: 50000, max_policies: 1000 },
    vendor_lock_in_risk: "low",
    market_position: "leader",
    financial_stability: "stable",
    innovation_score: 9,
    customer_satisfaction: 8.7,
  },
]

export const VENDOR_IDS_DEFINITIVE: VendorId[] = [
  "portnox",
  "cisco-ise",
  "aruba-clearpass",
  "fortinet-fortigate",
  "palo-alto",
]

export function getVendorDataById(id: VendorId): NewVendorData | undefined {
  return allVendorsData.find((vendor) => vendor.id === id)
}
