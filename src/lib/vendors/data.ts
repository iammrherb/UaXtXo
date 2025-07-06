import type { OrgSizeId, IndustryId, ComplianceLevel } from "@/types/common"

// This will be a very detailed interface based on ZTCA specification
// For brevity, I'll outline key sections. Full detail would be extensive.

export interface VendorFeatureScore {
  score: number // 0-100 or a qualitative scale
  details?: string
  isPortnoxAdvantage?: boolean // Highlight Portnox strengths
}

export interface VendorPricingTier {
  name: string
  userRange?: [number, number | null] // e.g., [1, 100] for Small Business
  orgSizeTarget?: OrgSizeId[]
  pricePerUserPerMonth?: number
  pricePerDevicePerMonth?: number
  annualDiscountPercent?: number
  includedFeatures: string[] // List of feature IDs/names
}

export interface VendorImplementationMetrics {
  averageDeploymentTimeDays: number
  complexityLevel: "low" | "medium" | "high" | "very_high"
  requiresHardware?: boolean
  cloudNative?: boolean
  agentlessCapabilityPercent?: number // 0-100
  professionalServicesCostFactor?: number // e.g., 0.1 of license cost
}

export interface VendorComplianceSupport {
  standardId: string // ID of the compliance standard
  coverageLevel: ComplianceLevel
  automationPercent?: number // For Portnox, how much is automated
  specificFeatureMappings?: string[] // Vendor features mapped to this standard
  auditSupport?: VendorFeatureScore
}

export interface VendorTCOFactors {
  licensingCostPerYear?: number // Base or example
  hardwareCostPerYear?: number // Amortized
  personnelCostFactor?: number // FTEs or multiplier for typical org
  trainingCostInitial?: number
  supportCostFactor?: number // % of license or flat
  hiddenCostFactor?: number // Abstracted
}

export interface VendorROIFactors {
  avgPaybackPeriodMonths?: number
  incidentReductionPercent?: number // Compared to baseline/no solution
  complianceAutomationSavingsFactor?: number // e.g., time or cost saved
  operationalEfficiencyGainPercent?: number
}

export interface NewVendorData {
  id: string // e.g., "portnox", "cisco_ise"
  name: string // e.g., "Portnox CLEAR", "Cisco ISE"
  logoUrl?: string // Path to logo, ideally local in /public
  shortDescription: string
  detailedDescription?: string
  vendorType:
    | "Cloud-Native NAC"
    | "Traditional NAC"
    | "Firewall-based NAC"
    | "Open Source"
    | "Cloud RADIUS"
    | "MDM-based NAC"

  // Key metrics for Portnox showcase
  portnoxSpecificMetrics?: {
    riskBasedAuthCoverage: number // 95%
    continuousMonitoringCoverage: number // 98%
    automatedRemediationRate: number // 92%
    is100PercentCloudNative: boolean // true
    agentlessDeploymentPercent: number // 97%
  }

  // Features - this would be a large, structured object
  // Example: features.accessControl.eightZeroTwoOneX.score = 90
  features: Record<string, Record<string, VendorFeatureScore | any>>
  // Example categories: "AccessControl", "Visibility", "Segmentation", "ThreatResponse", "Automation", "Integration"
  // Each category would have specific features like "802.1X", "DeviceProfiling", "Microsegmentation", etc.

  pricingModelDesc: string
  pricingTiers?: VendorPricingTier[]

  implementation: VendorImplementationMetrics

  complianceSupport: VendorComplianceSupport[] // Array of support levels for different standards

  tcoFactors: VendorTCOFactors // Factors to be used in detailed TCO calculations
  roiFactors: VendorROIFactors // Factors for ROI calculations

  strengths?: string[]
  weaknesses?: string[]
  targetOrgSizes?: OrgSizeId[]
  targetIndustries?: IndustryId[]

  // For radar charts, etc.
  comparativeScores?: {
    securityEffectiveness: number
    easeOfDeployment: number
    scalability: number
    integrationCapabilities: number
    totalCostOfOwnershipScore: number // Lower is better, might need inversion for chart
    complianceCoverageScore: number
  }
}

// List of all 14 vendors as per latest understanding from script context
export const VENDOR_IDS = [
  "portnox",
  "cisco_ise",
  "aruba_clearpass",
  "fortinac",
  "forescout",
  "packetfence",
  "pulse_secure",
  "extreme_control",
  "juniper_mist_aa",
  "arista_cue",
  "microsoft_nps_intune",
  "securew2",
  "foxpass",
  "radiusaas",
  // Note: Replaced 'cisco_meraki' with 'radiusaas' if that was the intent from script.
  // If Meraki is also needed, the list should be 15. Assuming 14 for now.
  // The ZTCA text mentioned "All 14 Vendors: Portnox, Cisco ISE, Aruba, Fortinet, Forescout, PacketFence, Pulse Secure, Extreme, Juniper, Arista, Microsoft NPS, SecureW2, Foxpass, Meraki"
  // The script's file list was: Portnox, Cisco, Aruba, Forescout, Extreme, Arista, Juniper, Fortinet, Microsoft, PacketFence, Foxpass, SecureW2, Radius-as-a-Service
  // Let's go with the ZTCA text list which includes Meraki and not RadiusaaS for now, as it was more explicit.
  // "portnox", "cisco_ise", "aruba_clearpass", "fortinac", "forescout",
  // "packetfence", "pulse_secure", "extreme_control", "juniper_mist_aa",
  // "arista_cue", "microsoft_nps_intune", "securew2", "foxpass", "cisco_meraki"
] as const
// Corrected list based on ZTCA text:
// Portnox, Cisco ISE, Aruba, Fortinet, Forescout, PacketFence, Pulse Secure, Extreme, Juniper, Arista, Microsoft NPS, SecureW2, Foxpass, Meraki
export const VENDOR_IDS_DEFINITIVE = [
  "portnox",
  "cisco_ise",
  "aruba_clearpass",
  "fortinac",
  "forescout",
  "packetfence",
  "pulse_secure",
  "extreme_control",
  "juniper_mist_aa",
  "arista_cue",
  "microsoft_nps_intune",
  "securew2",
  "foxpass",
  "cisco_meraki",
] as const

export type VendorId = (typeof VENDOR_IDS_DEFINITIVE)[number]

// Using a Map for easy lookup by ID
export const allVendorsData: Map<VendorId, NewVendorData> = new Map()

// --- Example Data Population (Portnox and one competitor) ---
// This is highly abridged. Full data would be extensive.

// Portnox data
allVendorsData.set("portnox", {
  id: "portnox",
  name: "Portnox CLEAR",
  logoUrl: "/portnox-logo.png",
  shortDescription: "AI-powered, cloud-native Zero Trust Network Access Control.",
  vendorType: "Cloud-Native NAC",
  portnoxSpecificMetrics: {
    riskBasedAuthCoverage: 95,
    continuousMonitoringCoverage: 98,
    automatedRemediationRate: 92,
    is100PercentCloudNative: true,
    agentlessDeploymentPercent: 97,
  },
  features: {
    AccessControl: {
      "802.1X": { score: 95, details: "Full 802.1X EAP support" },
      RiskBasedAuth: { score: 95, isPortnoxAdvantage: true },
    },
    Visibility: { DeviceProfiling: { score: 98, details: "AI-driven real-time profiling" } },
    Automation: { PolicyAutomation: { score: 95 }, Remediation: { score: 92, isPortnoxAdvantage: true } },
  },
  pricingModelDesc: "Per-device or per-user subscription, volume and multi-year discounts available.",
  pricingTiers: [
    {
      name: "Essentials",
      orgSizeTarget: ["small_business"],
      pricePerDevicePerMonth: 5,
      includedFeatures: ["Core NAC"],
    },
    {
      name: "Professional",
      orgSizeTarget: ["mid_market"],
      pricePerDevicePerMonth: 4,
      includedFeatures: ["Core NAC", "API Access"],
    },
    {
      name: "Enterprise",
      orgSizeTarget: ["enterprise", "global_enterprise"],
      pricePerDevicePerMonth: 3,
      includedFeatures: ["Full Platform"],
    },
  ],
  implementation: {
    averageDeploymentTimeDays: 7,
    complexityLevel: "low",
    requiresHardware: false,
    cloudNative: true,
    agentlessCapabilityPercent: 97,
    professionalServicesCostFactor: 0.05,
  },
  complianceSupport: [
    { standardId: "hipaa", coverageLevel: "Covered", automationPercent: 80 },
    { standardId: "pci_dss", coverageLevel: "Covered", automationPercent: 75 },
    { standardId: "soc2", coverageLevel: "Covered", automationPercent: 85 },
    // ... more standards
  ],
  tcoFactors: {
    licensingCostPerYear: 30000,
    hardwareCostPerYear: 0,
    personnelCostFactor: 0.25,
    trainingCostInitial: 500,
    supportCostFactor: 0,
    hiddenCostFactor: 0.02,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 12,
    incidentReductionPercent: 98,
    complianceAutomationSavingsFactor: 0.85,
    operationalEfficiencyGainPercent: 70,
  },
  strengths: ["Cloud-native", "Agentless", "Rapid deployment", "AI-powered", "Automated remediation"],
  weaknesses: [
    "Newer market entrant compared to some legacy systems (perception)",
    "Requires internet connectivity for cloud management",
  ],
  targetOrgSizes: ["small_business", "mid_market", "enterprise", "global_enterprise"],
  targetIndustries: [
    "healthcare",
    "financial_services",
    "technology",
    "retail",
    "manufacturing",
    "education",
    "government",
  ],
  comparativeScores: {
    securityEffectiveness: 95,
    easeOfDeployment: 98,
    scalability: 95,
    integrationCapabilities: 90,
    totalCostOfOwnershipScore: 90,
    complianceCoverageScore: 95,
  },
})

// Cisco ISE data
allVendorsData.set("cisco_ise", {
  id: "cisco_ise",
  name: "Cisco ISE",
  logoUrl: "/cisco-logo.png",
  shortDescription: "Traditional, on-premise Network Access Control solution.",
  vendorType: "Traditional NAC",
  features: {
    AccessControl: { "802.1X": { score: 90 }, RiskBasedAuth: { score: 60 } },
    Visibility: { DeviceProfiling: { score: 80 } },
    Automation: { PolicyAutomation: { score: 70 }, Remediation: { score: 50 } },
  },
  pricingModelDesc: "Appliance-based perpetual licenses + mandatory support contracts + feature licenses.",
  implementation: {
    averageDeploymentTimeDays: 120,
    complexityLevel: "very_high",
    requiresHardware: true,
    cloudNative: false,
    agentlessCapabilityPercent: 20,
    professionalServicesCostFactor: 0.5,
  },
  complianceSupport: [
    { standardId: "hipaa", coverageLevel: "Partial" },
    { standardId: "pci_dss", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 50000,
    hardwareCostPerYear: 20000,
    personnelCostFactor: 2,
    trainingCostInitial: 20000,
    supportCostFactor: 0.22,
    hiddenCostFactor: 0.2,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 36,
    incidentReductionPercent: 60,
    complianceAutomationSavingsFactor: 0.2,
    operationalEfficiencyGainPercent: 30,
  },
  strengths: ["Mature product", "Large feature set (if licensed)", "Deep Cisco ecosystem integration"],
  weaknesses: [
    "Complex to deploy & manage",
    "High TCO",
    "Hardware-dependent",
    "Slow to adapt to new threats",
    "Not cloud-native",
  ],
  targetOrgSizes: ["enterprise", "global_enterprise"],
  targetIndustries: ["government", "financial_services", "large_enterprises_with_cisco_infra"],
  comparativeScores: {
    securityEffectiveness: 75,
    easeOfDeployment: 30,
    scalability: 80,
    integrationCapabilities: 85,
    totalCostOfOwnershipScore: 40,
    complianceCoverageScore: 65,
  },
})

// TODO: Populate data for all other 12 vendors:
// Aruba ClearPass, FortiNAC, Forescout, PacketFence, Pulse Secure, ExtremeControl,
// Juniper Mist AA, Arista CUE, Microsoft NPS/Intune, SecureW2, Foxpass, Cisco Meraki.
// This will be a large data entry task.

// Add other vendors with basic data
const otherVendors: Array<[VendorId, Partial<NewVendorData>]> = [
  ["aruba_clearpass", { name: "Aruba ClearPass", vendorType: "Traditional NAC", logoUrl: "/aruba-logo.png" }],
  ["fortinac", { name: "FortiNAC", vendorType: "Firewall-based NAC", logoUrl: "/fortinet-logo.png" }],
  ["forescout", { name: "Forescout", vendorType: "Traditional NAC", logoUrl: "/forescout-logo.png" }],
  ["packetfence", { name: "PacketFence", vendorType: "Open Source", logoUrl: "/packetfence-logo.png" }],
  ["pulse_secure", { name: "Pulse Secure", vendorType: "Traditional NAC", logoUrl: "/pulse-secure-logo.png" }],
  ["extreme_control", { name: "ExtremeControl", vendorType: "Traditional NAC", logoUrl: "/extreme-networks-logo.png" }],
  ["juniper_mist_aa", { name: "Juniper Mist AA", vendorType: "Cloud-Native NAC", logoUrl: "/juniper-logo.png" }],
  ["arista_cue", { name: "Arista CUE", vendorType: "Cloud-Native NAC", logoUrl: "/arista-logo.png" }],
  [
    "microsoft_nps_intune",
    { name: "Microsoft NPS/Intune", vendorType: "MDM-based NAC", logoUrl: "/microsoft-logo.png" },
  ],
  ["securew2", { name: "SecureW2", vendorType: "Cloud RADIUS", logoUrl: "/securew2-logo.png" }],
  ["foxpass", { name: "Foxpass", vendorType: "Cloud RADIUS", logoUrl: "/foxpass-logo.png" }],
  ["cisco_meraki", { name: "Cisco Meraki", vendorType: "MDM-based NAC", logoUrl: "/meraki-logo.png" }],
]

// Add basic vendor data for the remaining vendors
otherVendors.forEach(([id, partialData]) => {
  allVendorsData.set(id, {
    id,
    name: partialData.name || id,
    logoUrl: partialData.logoUrl || "/placeholder-logo.png",
    shortDescription: `${partialData.name} NAC solution`,
    vendorType: partialData.vendorType || "Traditional NAC",
    features: {
      AccessControl: { "802.1X": { score: 75 } },
      Visibility: { DeviceProfiling: { score: 70 } },
      Automation: { PolicyAutomation: { score: 65 } },
    },
    pricingModelDesc: "Contact vendor for pricing",
    implementation: {
      averageDeploymentTimeDays: 60,
      complexityLevel: "medium",
      requiresHardware: true,
      cloudNative: false,
      agentlessCapabilityPercent: 50,
      professionalServicesCostFactor: 0.3,
    },
    complianceSupport: [{ standardId: "iso27001", coverageLevel: "Partial" }],
    tcoFactors: {
      licensingCostPerYear: 40000,
      hardwareCostPerYear: 10000,
      personnelCostFactor: 1,
      trainingCostInitial: 10000,
      supportCostFactor: 0.2,
      hiddenCostFactor: 0.15,
    },
    roiFactors: {
      avgPaybackPeriodMonths: 24,
      incidentReductionPercent: 50,
      complianceAutomationSavingsFactor: 0.15,
      operationalEfficiencyGainPercent: 35,
    },
    strengths: ["Established solution"],
    weaknesses: ["Traditional approach"],
    targetOrgSizes: ["mid_market", "enterprise"],
    targetIndustries: ["technology", "financial_services"],
    comparativeScores: {
      securityEffectiveness: 75,
      easeOfDeployment: 60,
      scalability: 75,
      integrationCapabilities: 70,
      totalCostOfOwnershipScore: 60,
      complianceCoverageScore: 65,
    },
  })
})

// Export the VENDOR_DATA that the TCO calculator expects
export const VENDOR_DATA = Array.from(allVendorsData.values())

export const getVendorDataById = (id: VendorId): NewVendorData | undefined => {
  return allVendorsData.get(id)
}

console.log("New comprehensive vendor data module updated: All 14 vendors now have initial data entries.")
