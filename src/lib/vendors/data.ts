import type { OrgSizeId, IndustryId, ComplianceLevel } from "@/types/common";
import type { ComplianceStandard } from "@/lib/compliance/standards";

// This will be a very detailed interface based on ZTCA specification
// For brevity, I'll outline key sections. Full detail would be extensive.

export interface VendorFeatureScore {
  score: number; // 0-100 or a qualitative scale
  details?: string;
  isPortnoxAdvantage?: boolean; // Highlight Portnox strengths
}

export interface VendorPricingTier {
  name: string;
  userRange?: [number, number | null]; // e.g., [1, 100] for Small Business
  orgSizeTarget?: OrgSizeId[];
  pricePerUserPerMonth?: number;
  pricePerDevicePerMonth?: number;
  annualDiscountPercent?: number;
  includedFeatures: string[]; // List of feature IDs/names
}

export interface VendorImplementationMetrics {
  averageDeploymentTimeDays: number;
  complexityLevel: "low" | "medium" | "high" | "very_high";
  requiresHardware?: boolean;
  cloudNative?: boolean;
  agentlessCapabilityPercent?: number; // 0-100
  professionalServicesCostFactor?: number; // e.g., 0.1 of license cost
}

export interface VendorComplianceSupport {
  standardId: string; // ID of the compliance standard
  coverageLevel: ComplianceLevel;
  automationPercent?: number; // For Portnox, how much is automated
  specificFeatureMappings?: string[]; // Vendor features mapped to this standard
  auditSupport?: VendorFeatureScore;
}

export interface VendorTCOFactors {
  licensingCostPerYear?: number; // Base or example
  hardwareCostPerYear?: number; // Amortized
  personnelCostFactor?: number; // FTEs or multiplier for typical org
  trainingCostInitial?: number;
  supportCostFactor?: number; // % of license or flat
  hiddenCostFactor?: number; // Abstracted
}

export interface VendorROIFactors {
  avgPaybackPeriodMonths?: number;
  incidentReductionPercent?: number; // Compared to baseline/no solution
  complianceAutomationSavingsFactor?: number; // e.g., time or cost saved
  operationalEfficiencyGainPercent?: number;
}

export interface NewVendorData {
  id: string; // e.g., "portnox", "cisco_ise"
  name: string; // e.g., "Portnox CLEAR", "Cisco ISE"
  logoUrl?: string; // Path to logo, ideally local in /public
  shortDescription: string;
  detailedDescription?: string;
  vendorType: "Cloud-Native NAC" | "Traditional NAC" | "Firewall-based NAC" | "Open Source" | "Cloud RADIUS" | "MDM-based NAC";

  // Key metrics for Portnox showcase
  portnoxSpecificMetrics?: {
    riskBasedAuthCoverage: number; // 95%
    continuousMonitoringCoverage: number; // 98%
    automatedRemediationRate: number; // 92%
    is100PercentCloudNative: boolean; // true
    agentlessDeploymentPercent: number; // 97%
  };

  // Features - this would be a large, structured object
  // Example: features.accessControl.eightZeroTwoOneX.score = 90
  features: Record<string, Record<string, VendorFeatureScore | any>>;
  // Example categories: "AccessControl", "Visibility", "Segmentation", "ThreatResponse", "Automation", "Integration"
  // Each category would have specific features like "802.1X", "DeviceProfiling", "Microsegmentation", etc.

  pricingModelDesc: string;
  pricingTiers?: VendorPricingTier[];

  implementation: VendorImplementationMetrics;

  complianceSupport: VendorComplianceSupport[]; // Array of support levels for different standards

  tcoFactors: VendorTCOFactors; // Factors to be used in detailed TCO calculations
  roiFactors: VendorROIFactors; // Factors for ROI calculations

  strengths?: string[];
  weaknesses?: string[];
  targetOrgSizes?: OrgSizeId[];
  targetIndustries?: IndustryId[];

  // For radar charts, etc.
  comparativeScores?: {
    securityEffectiveness: number;
    easeOfDeployment: number;
    scalability: number;
    integrationCapabilities: number;
    totalCostOfOwnershipScore: number; // Lower is better, might need inversion for chart
    complianceCoverageScore: number;
  };
}

// List of all 14 vendors as per latest understanding from script context
export const VENDOR_IDS = [
  "portnox", "cisco_ise", "aruba_clearpass", "fortinac", "forescout",
  "packetfence", "pulse_secure", "extreme_control", "juniper_mist_aa",
  "arista_cue", "microsoft_nps_intune", "securew2", "foxpass", "radiusaas"
  // Note: Replaced 'cisco_meraki' with 'radiusaas' if that was the intent from script.
  // If Meraki is also needed, the list should be 15. Assuming 14 for now.
  // The ZTCA text mentioned "All 14 Vendors: Portnox, Cisco ISE, Aruba, Fortinet, Forescout, PacketFence, Pulse Secure, Extreme, Juniper, Arista, Microsoft NPS, SecureW2, Foxpass, Meraki"
  // The script's file list was: Portnox, Cisco, Aruba, Forescout, Extreme, Arista, Juniper, Fortinet, Microsoft, PacketFence, Foxpass, SecureW2, Radius-as-a-Service
  // Let's go with the ZTCA text list which includes Meraki and not RadiusaaS for now, as it was more explicit.
  // "portnox", "cisco_ise", "aruba_clearpass", "fortinac", "forescout",
  // "packetfence", "pulse_secure", "extreme_control", "juniper_mist_aa",
  // "arista_cue", "microsoft_nps_intune", "securew2", "foxpass", "cisco_meraki"
] as const;
// Corrected list based on ZTCA text:
// Portnox, Cisco ISE, Aruba, Fortinet, Forescout, PacketFence, Pulse Secure, Extreme, Juniper, Arista, Microsoft NPS, SecureW2, Foxpass, Meraki
export const VENDOR_IDS_DEFINITIVE = [
  "portnox", "cisco_ise", "aruba_clearpass", "fortinac", "forescout",
  "packetfence", "pulse_secure", "extreme_control", "juniper_mist_aa",
  "arista_cue", "microsoft_nps_intune", "securew2", "foxpass", "cisco_meraki"
] as const;


export type VendorId = typeof VENDOR_IDS_DEFINITIVE[number];


// Using a Map for easy lookup by ID
export const allVendorsData: Map<VendorId, NewVendorData> = new Map();

// --- Example Data Population (Portnox and one competitor) ---
// This is highly abridged. Full data would be extensive.

allVendorsData.set("portnox", {
  id: "portnox",
  name: "Portnox CLEAR",
  logoUrl: "/portnox-logo.png", // Assuming logo exists here
  shortDescription: "AI-powered, cloud-native Zero Trust Network Access Control.",
  vendorType: "Cloud-Native NAC",
  portnoxSpecificMetrics: {
    riskBasedAuthCoverage: 95,
    continuousMonitoringCoverage: 98,
    automatedRemediationRate: 92,
    is100PercentCloudNative: true,
    agentlessDeploymentPercent: 97,
  },
  features: { // Highly simplified example
    AccessControl: {
      "802.1X": { score: 95, details: "Full 802.1X EAP support" },
      RiskBasedAuth: { score: 95, isPortnoxAdvantage: true },
    },
    Visibility: { DeviceProfiling: { score: 98, details: "AI-driven real-time profiling" } },
    Automation: { PolicyAutomation: { score: 95 }, Remediation: { score: 92, isPortnoxAdvantage: true } },
  },
  pricingModelDesc: "Per-device or per-user subscription, volume and multi-year discounts available.",
  pricingTiers: [
    { name: "Essentials", orgSizeTarget: ["small_business"], pricePerDevicePerMonth: 5, includedFeatures: ["Core NAC"] },
    { name: "Professional", orgSizeTarget: ["mid_market"], pricePerDevicePerMonth: 4, includedFeatures: ["Core NAC", "API Access"] },
    { name: "Enterprise", orgSizeTarget: ["enterprise", "global_enterprise"], pricePerDevicePerMonth: 3, includedFeatures: ["Full Platform"] },
  ],
  implementation: {
    averageDeploymentTimeDays: 7, // As per ZTCA spec
    complexityLevel: "low",
    requiresHardware: false,
    cloudNative: true,
    agentlessCapabilityPercent: 97,
    professionalServicesCostFactor: 0.05, // Low due to ease of deployment
  },
  complianceSupport: [
    { standardId: "hipaa", coverageLevel: "Covered", automationPercent: 80 },
    { standardId: "pci_dss", coverageLevel: "Covered", automationPercent: 75 },
    { standardId: "soc2", coverageLevel: "Covered", automationPercent: 85 },
    // ... more standards
  ],
  tcoFactors: { // These would feed into the calculator
    licensingCostPerYear: 30000, // Example for a mid-size org before detailed calc
    hardwareCostPerYear: 0,
    personnelCostFactor: 0.25, // FTE for management
    trainingCostInitial: 500,
    supportCostFactor: 0, // Often included in SaaS
    hiddenCostFactor: 0.02, // Minimal
  },
  roiFactors: {
    avgPaybackPeriodMonths: 12,
    incidentReductionPercent: 98, // Risk reduction
    complianceAutomationSavingsFactor: 0.85, // 85% time saved
    operationalEfficiencyGainPercent: 70, // Related to 70% IT overhead reduction
  },
  strengths: ["Cloud-native", "Agentless", "Rapid deployment", "AI-powered", "Automated remediation"],
  weaknesses: ["Newer market entrant compared to some legacy systems (perception)", "Requires internet connectivity for cloud management"],
  targetOrgSizes: ["small_business", "mid_market", "enterprise", "global_enterprise"],
  targetIndustries: ["healthcare", "financial_services", "technology", "retail", "manufacturing", "education", "government"],
  comparativeScores: {
    securityEffectiveness: 95, easeOfDeployment: 98, scalability: 95,
    integrationCapabilities: 90, totalCostOfOwnershipScore: 90, // Lower TCO is better, so score is high for "good TCO"
    complianceCoverageScore: 95,
  },
});

allVendorsData.set("cisco_ise", {
  id: "cisco_ise",
  name: "Cisco ISE",
  logoUrl: "/cisco-logo.png",
  shortDescription: "Traditional, on-premise Network Access Control solution.",
  vendorType: "Traditional NAC",
  features: { // Highly simplified example
    AccessControl: { "802.1X": { score: 90 }, RiskBasedAuth: { score: 60 } },
    Visibility: { DeviceProfiling: { score: 80 } },
    Automation: { PolicyAutomation: { score: 70 }, Remediation: { score: 50 } },
  },
  pricingModelDesc: "Appliance-based perpetual licenses + mandatory support contracts + feature licenses.",
  implementation: {
    averageDeploymentTimeDays: 120, // As per ZTCA spec
    complexityLevel: "very_high",
    requiresHardware: true,
    cloudNative: false,
    agentlessCapabilityPercent: 20, // Primarily agent-based for full features
    professionalServicesCostFactor: 0.5, // High PS costs
  },
  complianceSupport: [
    { standardId: "hipaa", coverageLevel: "Partial" },
    { standardId: "pci_dss", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 50000, // Base licenses
    hardwareCostPerYear: 20000, // Amortized appliances
    personnelCostFactor: 2, // FTEs for management
    trainingCostInitial: 20000,
    supportCostFactor: 0.22, // 22% of license/hardware for support
    hiddenCostFactor: 0.2, // Complexity, upgrades
  },
  roiFactors: {
    avgPaybackPeriodMonths: 36,
    incidentReductionPercent: 60,
    complianceAutomationSavingsFactor: 0.20,
    operationalEfficiencyGainPercent: 30,
  },
  strengths: ["Mature product", "Large feature set (if licensed)", "Deep Cisco ecosystem integration"],
  weaknesses: ["Complex to deploy & manage", "High TCO", "Hardware-dependent", "Slow to adapt to new threats", "Not cloud-native"],
  targetOrgSizes: ["enterprise", "global_enterprise"],
  targetIndustries: ["government", "financial_services", "large_enterprises_with_cisco_infra"],
  comparativeScores: {
    securityEffectiveness: 75, easeOfDeployment: 30, scalability: 80,
    integrationCapabilities: 85, totalCostOfOwnershipScore: 40,
    complianceCoverageScore: 65,
  },
});

// TODO: Populate data for all other 12 vendors:
// Aruba ClearPass, FortiNAC, Forescout, PacketFence, Pulse Secure, ExtremeControl,
// Juniper Mist AA, Arista CUE, Microsoft NPS/Intune, SecureW2, Foxpass, Cisco Meraki.
// This will be a large data entry task.

allVendorsData.set("aruba_clearpass", {
  id: "aruba_clearpass",
  name: "Aruba ClearPass (HPE)",
  logoUrl: "/aruba-logo.png", // Placeholder - ensure this exists or update
  shortDescription: "Comprehensive traditional NAC solution, strong in wired/wireless policy enforcement.",
  vendorType: "Traditional NAC",
  features: {
    AccessControl: { "802.1X": { score: 90 }, GuestAccess: { score: 85 }, BYODOnboarding: { score: 80, details: "OnBoard module for BYOD" } },
    Visibility: { DeviceProfiling: { score: 85, details: "ClearPass Device Insight" } },
    Automation: { PolicyAutomation: { score: 70, details: "Policy Manager is powerful but can be complex." } },
    Integration: { SIEMSOAR: {score: 75}, IdentityProviders: {score: 80}, FirewallsMDM: {score: 70, details: "Good integration with Aruba ecosystem and some third parties."}},
    Compliance: { Reporting: {score: 70}}
  },
  pricingModelDesc: "Appliance (physical/virtual) based perpetual licenses + support subscriptions. Add-on modules for specific features (OnGuard, OnBoard).",
  implementation: {
    averageDeploymentTimeDays: 90,
    complexityLevel: "high",
    requiresHardware: true, // Or virtual appliance
    cloudNative: false,
    agentlessCapabilityPercent: 60, // OnGuard agent often recommended for full posture
    professionalServicesCostFactor: 0.35,
  },
  complianceSupport: [
    { standardId: "pci_dss", coverageLevel: "Partial" },
    { standardId: "hipaa", coverageLevel: "Partial" },
    { standardId: "iso27001", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 50000, // Representative for mid-market, including amortized perpetual
    hardwareCostPerYear: 15000, // Amortized appliances
    personnelCostFactor: 1.5, // FTEs
    trainingCostInitial: 10000,
    supportCostFactor: 0.20, // % of net software/hardware for support
    hiddenCostFactor: 25, // Per device per year
  },
  roiFactors: {
    avgPaybackPeriodMonths: 30,
    incidentReductionPercent: 55,
    complianceAutomationSavingsFactor: 0.20,
    operationalEfficiencyGainPercent: 35,
  },
  strengths: ["Strong policy enforcement engine", "Good for Aruba & HPE environments", "Scalable for large deployments", "Comprehensive feature set with add-ons"],
  weaknesses: ["Complexity in configuration and management", "Can be expensive with all modules", "On-premise focus, less cloud-native agility", "Requires skilled personnel"],
  targetOrgSizes: ["mid_market", "enterprise", "global_enterprise"],
  targetIndustries: ["education", "healthcare", "retail", "government"],
  comparativeScores: {
    securityEffectiveness: 82, easeOfDeployment: 40, scalability: 88,
    integrationCapabilities: 78, totalCostOfOwnershipScore: 50,
    complianceCoverageScore: 72,
  },
});

allVendorsData.set("fortinac", {
  id: "fortinac",
  name: "FortiNAC (Fortinet)",
  logoUrl: "/fortinet-logo.png", // Placeholder
  shortDescription: "Network Access Control integrated into the Fortinet Security Fabric.",
  vendorType: "Firewall-based NAC", // Or Hybrid, as it can be standalone too
  features: {
    AccessControl: { "802.1X": { score: 80 }, GuestAccess: { score: 75 } },
    Visibility: { DeviceProfiling: { score: 80, details: "Good visibility, especially for IoT/OT within Fortinet ecosystem." } },
    Automation: { PolicyAutomation: { score: 75, details: "Leverages Security Fabric for automated responses." } },
    Integration: { SIEMSOAR: {score: 85, details: "Strong integration with FortiSIEM, FortiSOAR."}, FortinetEcosystem: {score: 95, isPortnoxAdvantage: false}},
    Compliance: { Reporting: {score: 65}}
  },
  pricingModelDesc: "Appliance (physical/virtual) based, with licenses per concurrent endpoint. Various models for different scales.",
  implementation: {
    averageDeploymentTimeDays: 75,
    complexityLevel: "medium", // Can be simpler if already deep in Fortinet ecosystem
    requiresHardware: true, // Or VM
    cloudNative: false,
    agentlessCapabilityPercent: 70,
    professionalServicesCostFactor: 0.25,
  },
  complianceSupport: [
    { standardId: "pci_dss", coverageLevel: "Partial" },
    { standardId: "hipaa", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 45000, // Representative for mid-market
    hardwareCostPerYear: 10000, // Amortized
    personnelCostFactor: 1.0,
    trainingCostInitial: 8000,
    supportCostFactor: 0.20,
    hiddenCostFactor: 20,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 28,
    incidentReductionPercent: 60, // Benefits from fabric integration
    complianceAutomationSavingsFactor: 0.15,
    operationalEfficiencyGainPercent: 40,
  },
  strengths: ["Strong integration with Fortinet Security Fabric", "Good IoT/OT device visibility", "Centralized management via FortiManager (for Fortinet shops)", "Competitive pricing within its ecosystem"],
  weaknesses: ["Best value when heavily invested in Fortinet ecosystem", "Feature set might be less comprehensive than specialized NACs outside of fabric context", "Can be complex to integrate in non-Fortinet environments"],
  targetOrgSizes: ["mid_market", "enterprise"],
  targetIndustries: ["manufacturing", "healthcare", "government", "education"], // Often where Fortinet has strong presence
  comparativeScores: {
    securityEffectiveness: 85, easeOfDeployment: 60, scalability: 80,
    integrationCapabilities: 90, // High within its own ecosystem
    totalCostOfOwnershipScore: 60,
    complianceCoverageScore: 68,
  },
});


// TODO: Populate data for the remaining 10 vendors.
// Forescout, PacketFence, Pulse Secure, ExtremeControl,
// Juniper Mist AA, Arista CUE, Microsoft NPS/Intune, SecureW2, Foxpass, Cisco Meraki.

allVendorsData.set("forescout", {
  id: "forescout",
  name: "Forescout eyeSight/eyeControl",
  logoUrl: "/forescout-logo.png", // Placeholder
  shortDescription: "Agentless device visibility and control platform, strong in OT/ICS environments.",
  vendorType: "Traditional NAC", // Often considered a strong visibility platform that extends to NAC
  features: {
    AccessControl: { PolicyEnforcement: { score: 80 }, Segmentation: { score: 75, details: "Dynamic segmentation capabilities."} },
    Visibility: { DeviceDiscovery: { score: 95, isPortnoxAdvantage: false, details: "Excellent agentless discovery and classification, including IoT/OT." }, AssetInventory: { score: 90 } },
    Automation: { ThreatResponse: { score: 70, details: "Automated response actions based on policy violations." } },
    Integration: { ThirdPartyIntegrations: { score: 85, details: "Extensive integrations with security and IT tools." }},
    Compliance: { Reporting: {score: 70}}
  },
  pricingModelDesc: "Typically appliance-based (physical/virtual) with licensing per endpoint or managed device. Modules for extended capabilities.",
  implementation: {
    averageDeploymentTimeDays: 100,
    complexityLevel: "high",
    requiresHardware: true, // Or VM
    cloudNative: false,
    agentlessCapabilityPercent: 95, // Core strength
    professionalServicesCostFactor: 0.30,
  },
  complianceSupport: [
    { standardId: "nerc_cip", coverageLevel: "Partial", details: "Strong for OT visibility relevant to NERC CIP." },
    { standardId: "iec62443", coverageLevel: "Partial" },
    { standardId: "hipaa", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 55000, // Representative for mid-market
    hardwareCostPerYear: 18000, // Amortized
    personnelCostFactor: 1.2, // FTEs
    trainingCostInitial: 12000,
    supportCostFactor: 0.20,
    hiddenCostFactor: 22,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 32,
    incidentReductionPercent: 65, // Strong visibility helps here
    complianceAutomationSavingsFactor: 0.18,
    operationalEfficiencyGainPercent: 45,
  },
  strengths: ["Leading agentless device visibility and classification", "Strong support for IoT, OT, and medical devices", "Scalable architecture", "Broad integration ecosystem"],
  weaknesses: ["Can be complex and costly to implement and manage fully", "NAC control features might require additional modules/licensing (eyeControl, eyeSegment)", "Primarily on-premise solution"],
  targetOrgSizes: ["enterprise", "global_enterprise"],
  targetIndustries: ["manufacturing", "healthcare", "energy_utilities", "government", "financial_services"],
  comparativeScores: {
    securityEffectiveness: 88, // High on visibility
    easeOfDeployment: 45,
    scalability: 90,
    integrationCapabilities: 85,
    totalCostOfOwnershipScore: 45,
    complianceCoverageScore: 70,
  },
});

allVendorsData.set("packetfence", {
  id: "packetfence",
  name: "PacketFence",
  logoUrl: "/packetfence-logo.png", // Placeholder
  shortDescription: "Open-source Network Access Control (NAC) solution offering flexibility and extensive features.",
  vendorType: "Open Source",
  features: {
    AccessControl: { "802.1X": { score: 85 }, MACAuthentication: { score: 80 }, GuestAccess: { score: 80, details: "Captive portal capabilities."} },
    Visibility: { DeviceProfiling: { score: 70, details: "Relies on fingerprinting and DHCP inspection." } },
    Automation: { PolicyAutomation: { score: 65, details: "Requires significant configuration and potentially scripting." } },
    Integration: { OpenSourceIntegrations: { score: 70, details: "Can integrate with various open-source tools." }},
    Compliance: { Reporting: {score: 60, details: "Basic reporting, advanced requires customization."}}
  },
  pricingModelDesc: "Open-source, so no direct licensing costs. Costs are primarily related to implementation, customization, support (optional commercial support), and hardware/VMs.",
  implementation: {
    averageDeploymentTimeDays: 150, // Can be very high due to customization
    complexityLevel: "very_high",
    requiresHardware: true, // Self-hosted on your hardware/VMs
    cloudNative: false,
    agentlessCapabilityPercent: 80, // Primarily agentless
    professionalServicesCostFactor: 0, // No direct PS from vendor, but 3rd party consultant costs can be very high
  },
  complianceSupport: [
    // Compliance coverage depends heavily on customization
    { standardId: "iso27001", coverageLevel: "Partial", details: "Can be configured to support ISO 27001 controls." },
  ],
  tcoFactors: {
    licensingCostPerYear: 0, // Open source
    hardwareCostPerYear: 5000, // Cost of servers/VMs to run it, can vary widely
    personnelCostFactor: 2.5, // Significant FTE requirement for setup, customization, and ongoing management
    trainingCostInitial: 5000, // For internal team to learn and manage
    supportCostFactor: 0, // Or cost of commercial support contract if chosen (e.g., 10k-50k/year)
    hiddenCostFactor: 40, // High due to customization, potential for misconfiguration, upgrade complexities
  },
  roiFactors: {
    avgPaybackPeriodMonths: 48, // Longer due to high upfront effort despite no license fees
    incidentReductionPercent: 40, // Depends heavily on implementation quality
    complianceAutomationSavingsFactor: 0.05, // Minimal built-in automation for specific compliance reporting
    operationalEfficiencyGainPercent: 10, // Can be negative initially due to management overhead
  },
  strengths: ["No licensing costs (open source)", "Highly customizable and flexible", "Strong community support", "Supports a wide range of authentication methods"],
  weaknesses: ["Very high complexity to implement, configure, and maintain", "Requires significant in-house expertise or expensive consultants", "No dedicated enterprise support unless purchased commercially", "User interface can be less polished", "Upgrade paths can be challenging"],
  targetOrgSizes: ["mid_market", "enterprise"], // Typically those with strong technical teams or specific customization needs
  targetIndustries: ["education", "technology", "government"], // Often seen in environments with budget constraints for licenses but available technical staff
  comparativeScores: {
    securityEffectiveness: 70, // Potential is high, but depends on setup
    easeOfDeployment: 10,
    scalability: 75, // Can scale, but requires expertise
    integrationCapabilities: 70,
    totalCostOfOwnershipScore: 30, // While licenses are free, operational and implementation costs can be very high
    complianceCoverageScore: 50, // Highly dependent on customization
  },
});


// TODO: Populate data for the remaining 8 vendors.
// Pulse Secure, ExtremeControl, Juniper Mist AA, Arista CUE,
// Microsoft NPS/Intune, SecureW2, Foxpass, Cisco Meraki.

allVendorsData.set("pulse_secure", {
  id: "pulse_secure",
  name: "Pulse Policy Secure (Ivanti)",
  logoUrl: "/pulse-secure-logo.png", // Placeholder - Ivanti now owns Pulse Secure
  shortDescription: "NAC solution focusing on secure access for remote and mobile users, integrated with VPN.",
  vendorType: "Traditional NAC", // Strong in remote access NAC
  features: {
    AccessControl: { PolicyEnforcement: { score: 80 }, RemoteAccessNAC: { score: 88, details: "Strong integration with Pulse Connect Secure (VPN)." } },
    Visibility: { DeviceProfiling: { score: 70 } },
    Automation: { PolicyAutomation: { score: 65 } },
    Integration: { VPNIntegration: { score: 90 }, EnterpriseApps: { score: 70 } },
    Compliance: { Reporting: {score: 60}}
  },
  pricingModelDesc: "Appliance-based (physical/virtual) with per-concurrent-user licensing. Support contracts separate.",
  implementation: {
    averageDeploymentTimeDays: 80,
    complexityLevel: "high",
    requiresHardware: true, // Or VM
    cloudNative: false,
    agentlessCapabilityPercent: 50, // Often uses an agent for posture assessment
    professionalServicesCostFactor: 0.30,
  },
  complianceSupport: [
    { standardId: "iso27001", coverageLevel: "Partial" },
    { standardId: "soc2", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 40000, // Representative for mid-market focused on concurrent users
    hardwareCostPerYear: 12000, // Amortized
    personnelCostFactor: 1.0,
    trainingCostInitial: 9000,
    supportCostFactor: 0.20,
    hiddenCostFactor: 18,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 34,
    incidentReductionPercent: 50,
    complianceAutomationSavingsFactor: 0.10,
    operationalEfficiencyGainPercent: 30,
  },
  strengths: ["Strong remote access integration (VPN)", "Mature solution for endpoint compliance", "Good for environments with many remote/mobile users"],
  weaknesses: ["Less focus on LAN NAC compared to some competitors", "Can be complex to manage", "Aging architecture, now part of Ivanti portfolio which may change focus"],
  targetOrgSizes: ["mid_market", "enterprise"],
  targetIndustries: ["government", "financial_services", "healthcare"], // Industries with significant remote workforces
  comparativeScores: {
    securityEffectiveness: 78, // Strong for its niche
    easeOfDeployment: 50,
    scalability: 80,
    integrationCapabilities: 75,
    totalCostOfOwnershipScore: 55,
    complianceCoverageScore: 65,
  },
});

allVendorsData.set("extreme_control", {
  id: "extreme_control",
  name: "ExtremeControl (Extreme Networks)",
  logoUrl: "/extreme-networks-logo.png", // Placeholder
  shortDescription: "NAC solution as part of Extreme Networks' portfolio, for wired and wireless networks.",
  vendorType: "Traditional NAC", // Often tied to their network hardware
  features: {
    AccessControl: { PolicyBasedControl: { score: 82 }, GuestManagement: { score: 78 } },
    Visibility: { DeviceAnalytics: { score: 75, details: "Integrated with ExtremeAnalytics." } },
    Automation: { SecurityAutomation: { score: 70 } },
    Integration: { ExtremeFabric: { score: 90, details: "Strong integration with Extreme Networks fabric." }, ThirdPartyEcosystem: { score: 65 } },
    Compliance: { Reporting: {score: 68}}
  },
  pricingModelDesc: "Typically licensed per managed device or access point, often bundled with Extreme network hardware/software subscriptions.",
  implementation: {
    averageDeploymentTimeDays: 85,
    complexityLevel: "medium", // Especially if already an Extreme Networks customer
    requiresHardware: false, // Can be deployed as VM, but often complements their hardware
    cloudNative: false, // Management can be cloud (XIQ), but core NAC might be on-prem
    agentlessCapabilityPercent: 65,
    professionalServicesCostFactor: 0.28,
  },
  complianceSupport: [
    { standardId: "pci_dss", coverageLevel: "Partial" },
    { standardId: "iso27001", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 42000, // Representative
    hardwareCostPerYear: 8000, // Lower if using existing Extreme infra or VMs
    personnelCostFactor: 0.9,
    trainingCostInitial: 7000,
    supportCostFactor: 0.18,
    hiddenCostFactor: 15,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 33,
    incidentReductionPercent: 52,
    complianceAutomationSavingsFactor: 0.12,
    operationalEfficiencyGainPercent: 38,
  },
  strengths: ["Tight integration with Extreme Networks hardware and XIQ cloud management", "Good for end-to-end Extreme stack customers", "Fabric Attach automation capabilities"],
  weaknesses: ["Primarily focused on Extreme Networks environments", "May lack breadth of third-party integrations compared to vendor-agnostic NACs", "Can be perceived as an add-on rather than a standalone best-of-breed NAC by some"],
  targetOrgSizes: ["mid_market", "enterprise"],
  targetIndustries: ["education", "healthcare", "retail", "sports_venues"], // Strongholds for Extreme Networks
  comparativeScores: {
    securityEffectiveness: 79,
    easeOfDeployment: 55, // Easier if existing Extreme customer
    scalability: 82,
    integrationCapabilities: 70, // Strong within own ecosystem
    totalCostOfOwnershipScore: 58,
    complianceCoverageScore: 67,
  },
});

// TODO: Populate data for the remaining 6 vendors.
// Juniper Mist AA, Arista CUE, Microsoft NPS/Intune, SecureW2, Foxpass, Cisco Meraki.

allVendorsData.set("juniper_mist_aa", {
  id: "juniper_mist_aa",
  name: "Juniper Mist Access Assurance",
  logoUrl: "/juniper-logo.png", // Placeholder
  shortDescription: "Cloud-native, AI-driven access assurance service, part of the Mist AI platform.",
  vendorType: "Cloud-Native NAC",
  features: {
    AccessControl: { AIAuth: { score: 88, details: "AI-driven policy enforcement and 802.1X." }, DynamicSegmentation: { score: 80 } },
    Visibility: { DeviceProfiling: { score: 82, details: "Leverages Mist AI for client visibility." }, UserExperienceMonitoring: { score: 85, isPortnoxAdvantage: false } },
    Automation: { AIops: { score: 85, details: "Marvis AI for troubleshooting and automation." }, PolicyAutomation: { score: 78 } },
    Integration: { MistPlatform: { score: 95, details: "Deep integration with Juniper Mist wireless and wired infrastructure." }, APIs: { score: 75 } },
    Compliance: { Reporting: {score: 70}}
  },
  pricingModelDesc: "Subscription-based, typically per access point or per user, as part of Mist licensing tiers.",
  implementation: {
    averageDeploymentTimeDays: 20, // Generally faster for cloud solutions
    complexityLevel: "medium", // Cloud helps, but full AI benefits require tuning
    requiresHardware: false, // Cloud service, but assumes Juniper/Mist network hardware for best results
    cloudNative: true,
    agentlessCapabilityPercent: 85,
    professionalServicesCostFactor: 0.15,
  },
  complianceSupport: [
    { standardId: "pci_dss", coverageLevel: "Partial" },
    { standardId: "iso27001", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 35000, // Representative for mid-market subscription
    hardwareCostPerYear: 0, // Assuming existing compatible network gear or cloud model doesn't require specific NAC hardware
    personnelCostFactor: 0.4, // AI aims to reduce this
    trainingCostInitial: 6000,
    supportCostFactor: 0, // Typically included in Mist subscription
    hiddenCostFactor: 10,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 20,
    incidentReductionPercent: 70, // AI-driven anomaly detection
    complianceAutomationSavingsFactor: 0.25,
    operationalEfficiencyGainPercent: 60, // AIops benefits
  },
  strengths: ["Cloud-native and AI-driven (Mist AI)", "Simplified operations via cloud management", "Strong integration with Juniper Mist ecosystem", "Proactive troubleshooting with Marvis AI"],
  weaknesses: ["Best suited for organizations invested in the Juniper Mist platform", "AI features may require data and time to optimize", "Full benefits realized with Juniper hardware"],
  targetOrgSizes: ["mid_market", "enterprise"],
  targetIndustries: ["technology", "education", "retail", "healthcare"], // Where Mist AI platform is adopted
  comparativeScores: {
    securityEffectiveness: 87,
    easeOfDeployment: 75, // Cloud helps
    scalability: 88,
    integrationCapabilities: 80, // Strong within Juniper, moderate outside
    totalCostOfOwnershipScore: 70,
    complianceCoverageScore: 70,
  },
});

allVendorsData.set("arista_cue", {
  id: "arista_cue",
  name: "Arista CUE (CloudVision AGNI)",
  logoUrl: "/arista-logo.png", // Placeholder
  shortDescription: "Cloud-managed NAC service, part of Arista's Cognitive Unified Edge (CUE) and CloudVision.",
  vendorType: "Cloud-Native NAC",
  features: {
    AccessControl: { PolicyOrchestration: { score: 80, details: "CloudVision for policy management." }, SecureAccess: { score: 78 } },
    Visibility: { EndpointVisibility: { score: 75, details: "Integrated with Arista's network telemetry." } },
    Automation: { CloudAutomation: { score: 80, details: "Leverages CloudVision for network automation." } },
    Integration: { AristaEcosystem: { score: 92, details: "Seamless with Arista switches and APs." }, CloudVisionAPI: { score: 70 } },
    Compliance: { Reporting: {score: 65}}
  },
  pricingModelDesc: "Subscription-based, integrated with Arista CUE licensing. Often per device or per user.",
  implementation: {
    averageDeploymentTimeDays: 25,
    complexityLevel: "medium",
    requiresHardware: false, // Cloud service, assumes Arista network infrastructure
    cloudNative: true,
    agentlessCapabilityPercent: 80,
    professionalServicesCostFactor: 0.18,
  },
  complianceSupport: [
    { standardId: "iso27001", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 38000, // Representative
    hardwareCostPerYear: 0, // Assumes Arista networking gear is separate or existing
    personnelCostFactor: 0.45,
    trainingCostInitial: 6500,
    supportCostFactor: 0, // Included in CUE subscription
    hiddenCostFactor: 12,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 22,
    incidentReductionPercent: 65,
    complianceAutomationSavingsFactor: 0.20,
    operationalEfficiencyGainPercent: 55,
  },
  strengths: ["Cloud-managed via CloudVision", "Strong integration with Arista networking hardware", "Leverages Arista's telemetry for visibility", "Simplified licensing within CUE"],
  weaknesses: ["Primarily targeted at Arista network customers", "NAC feature set may be evolving compared to standalone NAC specialists", "Dependent on CloudVision for full functionality"],
  targetOrgSizes: ["mid_market", "enterprise"],
  targetIndustries: ["technology", "financial_services", "media_entertainment"], // Where Arista has presence
  comparativeScores: {
    securityEffectiveness: 80,
    easeOfDeployment: 70,
    scalability: 85,
    integrationCapabilities: 78, // Strong within Arista ecosystem
    totalCostOfOwnershipScore: 68,
    complianceCoverageScore: 66,
  },
});


// TODO: Populate data for the remaining 4 vendors.
// Microsoft NPS/Intune, SecureW2, Foxpass, Cisco Meraki.

allVendorsData.set("microsoft_nps_intune", {
  id: "microsoft_nps_intune",
  name: "Microsoft (NPS, Intune, Defender for Endpoint)",
  logoUrl: "/microsoft-logo.png", // Placeholder
  shortDescription: "Leverages existing Microsoft infrastructure (AD, NPS, Intune, Defender) for network access control.",
  vendorType: "MDM-based NAC", // Or "Ecosystem NAC"
  features: {
    AccessControl: { ConditionalAccess: { score: 85, details: "Azure AD Conditional Access policies." }, DeviceCompliance: { score: 80, details: "Intune for device compliance." } },
    Visibility: { EndpointManagement: { score: 78, details: "Intune and Defender for Endpoint provide visibility." } },
    Automation: { PolicyAutomation: { score: 70, details: "Via Intune configuration profiles and Defender policies." } },
    Integration: { MicrosoftEcosystem: { score: 95, details: "Native integration with Azure AD, Entra ID, Intune, Defender." }, ThirdParty: {score: 60, details: "Primarily focused on MSFT stack."}} ,
    Compliance: { Reporting: {score: 70, details: "Intune and Defender provide compliance reports."}}
  },
  pricingModelDesc: "Licensing is part of Microsoft 365/EMS SKUs (e.g., E3, E5). NPS is a Windows Server role (server license cost).",
  implementation: {
    averageDeploymentTimeDays: 45, // If components are already in place
    complexityLevel: "medium", // Depends on existing MSFT maturity
    requiresHardware: false, // Leverages existing servers for NPS, Intune is cloud
    cloudNative: true, // Intune, Azure AD are cloud
    agentlessCapabilityPercent: 20, // Heavily relies on Intune MDM agent and Defender agent
    professionalServicesCostFactor: 0.20,
  },
  complianceSupport: [
    { standardId: "iso27001", coverageLevel: "Partial", details: "Helps with controls related to endpoint security and access." },
    { standardId: "soc2", coverageLevel: "Partial" },
  ],
  tcoFactors: {
    licensingCostPerYear: 25000, // Incremental cost of M365 E5 features / Intune P2 for NAC capabilities, representative
    hardwareCostPerYear: 2000, // Amortized cost for NPS servers if not already available
    personnelCostFactor: 0.7, // Managing Intune, NPS policies
    trainingCostInitial: 5000,
    supportCostFactor: 0, // Included in M365/Azure support
    hiddenCostFactor: 10,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 24,
    incidentReductionPercent: 50, // Good endpoint security via Defender/Intune
    complianceAutomationSavingsFactor: 0.15,
    operationalEfficiencyGainPercent: 40, // If already a Microsoft shop
  },
  strengths: ["Leverages existing Microsoft investment (M365, Azure AD)", "Strong conditional access policies", "Good endpoint compliance via Intune", "Integrated with Defender for Endpoint security"],
  weaknesses: ["Primarily focused on Windows endpoints", "Limited support for non-Windows/non-managed devices (IoT, BYOD Linux)", "NPS can be complex to scale for 802.1X", "Not a dedicated, specialized NAC solution"],
  targetOrgSizes: ["mid_market", "enterprise", "global_enterprise"], // Organizations heavily invested in Microsoft ecosystem
  targetIndustries: ["technology", "financial_services", "healthcare", "manufacturing"], // Broad, where M365 is prevalent
  comparativeScores: {
    securityEffectiveness: 78,
    easeOfDeployment: 65, // If MSFT stack is mature
    scalability: 80, // Azure AD / Intune scales well
    integrationCapabilities: 85, // Within MSFT ecosystem
    totalCostOfOwnershipScore: 72, // If already licensed for M365 E5, incremental cost is lower
    complianceCoverageScore: 68,
  },
});

allVendorsData.set("securew2", {
  id: "securew2",
  name: "SecureW2",
  logoUrl: "/securew2-logo.png", // Placeholder
  shortDescription: "Cloud-based PKI and RADIUS solution for certificate-based EAP-TLS authentication.",
  vendorType: "Cloud RADIUS", // Specializes in PKI and EAP-TLS
  features: {
    AccessControl: { CertificateAuth: { score: 95, isPortnoxAdvantage: false, details: "Strong EAP-TLS and certificate lifecycle management." }, CloudRADIUS: { score: 90 } },
    Visibility: { LimitedDeviceProfiling: { score: 40 } },
    Automation: { CertAutoEnrollment: { score: 85 } },
    Integration: { IdPIntegration: { score: 80, details: "Integrates with Azure AD, Okta, G Suite for identity." }, MDMIntegration: { score: 75 } },
    Compliance: { Reporting: {score: 50, details: "Focus on auth logs."}}
  },
  pricingModelDesc: "Subscription-based, typically per user per year. Different tiers for features.",
  implementation: {
    averageDeploymentTimeDays: 15,
    complexityLevel: "low", // For its specific function
    requiresHardware: false,
    cloudNative: true,
    agentlessCapabilityPercent: 90, // For auth, not deep device posture
    professionalServicesCostFactor: 0.10,
  },
  complianceSupport: [
    { standardId: "iso27001", coverageLevel: "Partial", details: "Helps with strong authentication controls." },
  ],
  tcoFactors: {
    licensingCostPerYear: 15000, // Representative for mid-market
    hardwareCostPerYear: 0,
    personnelCostFactor: 0.2,
    trainingCostInitial: 2000,
    supportCostFactor: 0, // Included
    hiddenCostFactor: 5,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 18,
    incidentReductionPercent: 40, // Due to strong auth
    complianceAutomationSavingsFactor: 0.05,
    operationalEfficiencyGainPercent: 25, // Simplified cert management
  },
  strengths: ["Robust EAP-TLS and certificate-based authentication", "Simplified PKI management", "Cloud-native and easy to deploy for its purpose", "Good for onboarding devices to secure Wi-Fi/VPN"],
  weaknesses: ["Not a full NAC solution (limited device visibility, posture, segmentation beyond auth)", "Primarily focused on authentication rather than broader network access control", "Less effective for guest networks or agentless IoT if not cert-capable"],
  targetOrgSizes: ["small_business", "mid_market", "enterprise"],
  targetIndustries: ["education", "technology", "healthcare"], // Where strong cert-based auth is key
  comparativeScores: {
    securityEffectiveness: 80, // For authentication security
    easeOfDeployment: 85,
    scalability: 80,
    integrationCapabilities: 75,
    totalCostOfOwnershipScore: 78, // Good for its niche
    complianceCoverageScore: 50, // Limited scope
  },
});

allVendorsData.set("foxpass", {
  id: "foxpass",
  name: "Foxpass",
  logoUrl: "/foxpass-logo.png", // Placeholder
  shortDescription: "Cloud-hosted RADIUS and LDAP solution for Wi-Fi, VPN, and server authentication.",
  vendorType: "Cloud RADIUS",
  features: {
    AccessControl: { CloudRADIUSLDAP: { score: 88, details: "Hosted RADIUS/LDAP." }, CertificateAuthSupport: { score: 70 } },
    Visibility: { AuthLogs: { score: 50 } },
    Automation: { UserSync: { score: 75, details: "Sync with G Suite, O365." } },
    Integration: { IdPSync: { score: 70 } },
    Compliance: { Reporting: {score: 40}}
  },
  pricingModelDesc: "Subscription-based, per user per month. Simple pricing tiers.",
  implementation: {
    averageDeploymentTimeDays: 5, // Very fast for RADIUS/LDAP setup
    complexityLevel: "low",
    requiresHardware: false,
    cloudNative: true,
    agentlessCapabilityPercent: 95, // For its auth purpose
    professionalServicesCostFactor: 0.05, // Minimal PS needed
  },
  complianceSupport: [
    // Limited direct compliance features, supports secure auth which is a part of many standards
  ],
  tcoFactors: {
    licensingCostPerYear: 8000, // Representative for mid-market
    hardwareCostPerYear: 0,
    personnelCostFactor: 0.1,
    trainingCostInitial: 500,
    supportCostFactor: 0, // Included
    hiddenCostFactor: 2,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 12,
    incidentReductionPercent: 30, // Hardening auth helps
    complianceAutomationSavingsFactor: 0.02,
    operationalEfficiencyGainPercent: 20, // Simplified RADIUS/LDAP mgmt
  },
  strengths: ["Simple and fast to set up cloud RADIUS/LDAP", "Affordable pricing", "Good for securing Wi-Fi and VPN access", "Integrates with common IdPs for user sync"],
  weaknesses: ["Not a full NAC (no device profiling, posture, segmentation, etc.)", "Limited visibility beyond authentication logs", "Basic feature set compared to comprehensive NACs"],
  targetOrgSizes: ["small_business", "mid_market"],
  targetIndustries: ["technology", "startups", "education"], // Orgs needing quick, simple RADIUS/LDAP
  comparativeScores: {
    securityEffectiveness: 70, // For what it does (auth)
    easeOfDeployment: 95,
    scalability: 75,
    integrationCapabilities: 65,
    totalCostOfOwnershipScore: 85, // Very good for its niche
    complianceCoverageScore: 30, // Limited scope
  },
});

allVendorsData.set("cisco_meraki", {
  id: "cisco_meraki",
  name: "Cisco Meraki (Systems Manager & Security Appliances)",
  logoUrl: "/meraki-logo.png", // Placeholder
  shortDescription: "Cloud-managed IT solution including MDM (Systems Manager) and security appliances (MX) with some NAC-like features.",
  vendorType: "MDM-based NAC", // More of an ecosystem play with some NAC capabilities
  features: {
    AccessControl: { DevicePolicies: { score: 75, details: "Via Systems Manager MDM." }, NetworkAccessRules: { score: 70, details: "On MX security appliances." } },
    Visibility: { EndpointInventory: { score: 80, details: "Through Systems Manager." }, NetworkTraffic: { score: 75, details: "Via Meraki Dashboard."} },
    Automation: { BasicAutomation: { score: 60 } },
    Integration: { MerakiEcosystem: { score: 98, details: "Seamless integration across all Meraki products." }, LimitedThirdParty: { score: 50 } },
    Compliance: { Reporting: {score: 65, details: "Basic compliance reporting via dashboard."}}
  },
  pricingModelDesc: "Hardware purchase + per-device/per-appliance cloud management licenses (typically 1, 3, 5, 7, 10 years). Systems Manager is licensed per endpoint.",
  implementation: {
    averageDeploymentTimeDays: 30, // If using full Meraki stack
    complexityLevel: "low", // Known for ease of use within its ecosystem
    requiresHardware: true, // Meraki APs, Switches, MX appliances
    cloudNative: true, // Cloud-managed
    agentlessCapabilityPercent: 10, // Relies heavily on Systems Manager agent for endpoint control
    professionalServicesCostFactor: 0.10,
  },
  complianceSupport: [
    { standardId: "pci_dss", coverageLevel: "Partial", details: "MX appliances have PCI compliance features." },
  ],
  tcoFactors: {
    licensingCostPerYear: 30000, // Amortized license costs for devices and appliances
    hardwareCostPerYear: 15000, // Amortized hardware costs
    personnelCostFactor: 0.3, // Easy to manage
    trainingCostInitial: 3000,
    supportCostFactor: 0, // Included in license
    hiddenCostFactor: 8,
  },
  roiFactors: {
    avgPaybackPeriodMonths: 28,
    incidentReductionPercent: 45,
    complianceAutomationSavingsFactor: 0.10,
    operationalEfficiencyGainPercent: 50, // Simplicity of cloud management
  },
  strengths: ["Extremely easy to deploy and manage (cloud dashboard)", "Full-stack solution (networking, security, MDM)", "Good visibility if fully invested in Meraki hardware", "Scalable for distributed organizations"],
  weaknesses: ["NAC capabilities are basic compared to dedicated solutions", "Vendor lock-in to Meraki hardware", "Limited granularity in policy control", "Can become expensive at scale with all licenses"],
  targetOrgSizes: ["small_business", "mid_market", "enterprise"], // Popular in distributed retail, branch offices
  targetIndustries: ["retail", "education", "healthcare_clinics", "hospitality"],
  comparativeScores: {
    securityEffectiveness: 72, // NAC features are not as deep
    easeOfDeployment: 90,
    scalability: 85,
    integrationCapabilities: 70, // Excellent within Meraki, limited outside
    totalCostOfOwnershipScore: 65,
    complianceCoverageScore: 60,
  },
});


// All 14 vendors now have initial data.

export const getVendorDataById = (id: VendorId): NewVendorData | undefined => {
  return allVendorsData.get(id);
};

console.log("New comprehensive vendor data module updated: All 14 vendors now have initial data entries.");
