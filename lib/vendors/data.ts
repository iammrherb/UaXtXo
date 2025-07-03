export type VendorId =
  | "portnox"
  | "cisco_ise"
  | "aruba_clearpass"
  | "forescout"
  | "fortinet_nac"
  | "microsoft_nps"
  | "packetfence"
  | "genians"
  | "impulse"
  | "opswat"

export interface NewVendorData {
  id: VendorId
  name: string
  vendorType: string
  logoUrl?: string
  description?: string
  strengths?: string[]
  weaknesses?: string[]
  features?: Record<string, string>
  pricing?: {
    model: string
    tiers: string[]
    base_cost: number
  }
  compliance?: Record<string, boolean>
  tcoFactors?: {
    implementation_cost: number
    operational_overhead: number
    licensing_cost: number
  }
}

// This function is a helper to get a vendor by ID from the static list,
// useful for seeding or testing. The main app will use the API.
export const getVendorDataById = (id: VendorId): NewVendorData | undefined => {
  return allVendorsData.find((vendor) => vendor.id === id)
}

export const VENDOR_IDS_DEFINITIVE = ["portnox", "cisco_ise", "aruba_clearpass", "forescout", "fortinet_nac"]

// The static data array, used for seeding the database.
export const allVendorsData: NewVendorData[] = [
  {
    id: "portnox",
    name: "Portnox",
    vendorType: "Cloud-Native NAC",
    logoUrl: "/portnox-logo.png",
    description:
      "Portnox is a cloud-native NAC platform that provides comprehensive network access control, visibility, and security for any device, anywhere.",
    strengths: [
      "Cloud-native architecture",
      "Rapid deployment",
      "Zero-trust security model",
      "Extensive integration ecosystem",
    ],
    weaknesses: ["Newer market entrant", "Advanced features may require higher tiers"],
    features: {
      access_control: "Comprehensive",
      device_visibility: "High",
      automation: "High",
      iot_security: "Advanced",
      guest_access: "Yes",
      reporting: "Advanced",
    },
    pricing: { model: "Subscription", tiers: ["Core", "Advanced", "Premium"], base_cost: 50000 },
    compliance: { soc2: true, iso27001: true, pci_dss: true, hipaa: true },
    tcoFactors: { implementation_cost: 15000, operational_overhead: 20000, licensing_cost: 50000 },
  },
  {
    id: "cisco_ise",
    name: "Cisco ISE",
    vendorType: "Traditional NAC",
    logoUrl: "/cisco-logo.png",
    description:
      "Cisco Identity Services Engine (ISE) is a market-leading NAC solution that provides centralized policy control for wired, wireless, and VPN access.",
    strengths: [
      "Market leader",
      "Deep integration with Cisco hardware",
      "Extensive feature set",
      "Mature and stable platform",
    ],
    weaknesses: [
      "High complexity",
      "Significant hardware footprint",
      "Expensive licensing",
      "Requires specialized expertise",
    ],
    features: {
      access_control: "Comprehensive",
      device_visibility: "High",
      automation: "Medium",
      iot_security: "Medium",
      guest_access: "Yes",
      reporting: "Comprehensive",
    },
    pricing: { model: "Perpetual + Subscription", tiers: ["Base", "Plus", "Apex"], base_cost: 120000 },
    compliance: { soc2: true, iso27001: true, pci_dss: true, hipaa: true },
    tcoFactors: { implementation_cost: 80000, operational_overhead: 60000, licensing_cost: 120000 },
  },
  // ... other vendors from your seed script would go here
]
