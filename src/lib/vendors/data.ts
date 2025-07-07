// src/lib/vendors/data.ts

export interface VendorPricingTier {
  orgSizeTarget?: OrgSizeId[]
  userRange?: [number, number | null]
  pricePerDevicePerMonth?: number
  pricePerUserPerMonth?: number
  annualDiscountPercent?: number
}

export interface VendorROIFactors {
  incidentReductionPercent: number
  complianceAutomationSavingsFactor: number
  operationalEfficiencyGainPercent: number
  avgPaybackPeriodMonths?: number
}

export interface VendorTCOFactors {
  licensingCostPerYear: number
  hardwareCostPerYear: number
  trainingCostInitial: number
  supportCostFactor: number
  personnelCostFactor: number
  hiddenCostFactor: number
}

export interface VendorImplementationMetrics {
  complexityLevel: "low" | "medium" | "high" | "very_high"
  professionalServicesCostFactor: number
  deploymentTime: {
    poc: number
    fullDeployment: number
    fullScale: number
  }
}

export interface NewVendorData {
  id: VendorId
  name: string
  vendorType: string
  logo: string
  description: string
  pricingTiers?: VendorPricingTier[]
  tcoFactors: VendorTCOFactors
  implementation: VendorImplementationMetrics
  roiFactors: VendorROIFactors
  complianceSupport: { standardId: string; coveragePercent: number }[]
  comparativeScores?: {
    securityScore: number
    usabilityScore: number
    scalabilityScore: number
    supportScore: number
    complianceCoverageScore: number
  }
  portnoxSpecificMetrics?: {
    zeroTrustMaturityScore: number
    riskBasedAuthenticationCoverage: number
    continuousMonitoringCoverage: number
    automatedRemediationRate: number
    is100PercentCloudNative: boolean
    agentlessDeploymentPercent: number
  }
}

export type VendorId =
  | "portnox"
  | "cisco"
  | "aruba"
  | "meraki"
  | "fortinet"
  | "forescout"
  | "extreme"
  | "juniper"
  | "microsoft"
  | "packetfence"
  | "foxpass"
  | "securew2"
  | "radiusaas"
  | "arista"
  | "cisco_ise"
  | "aruba_clearpass"
  | "fortinac"
  | "juniper_mist"
  | "extreme_nac"
  | "cisco_meraki"
  | "microsoft_nps"
  | "securew2"
  | "arista_agni"

export interface VendorData {
  id: string
  name: string
  category: string
  marketShare: number
  logo: string
  description: string
  priceIndicator: string
  difficulty: number
  features: {
    core: {
      [key: string]: boolean
    }
    advanced: {
      [key: string]: boolean
    }
  }
  implementation: {
    deploymentTime: {
      poc: number
      fullDeployment: number
      fullScale: number
    }
    complexity: string
    requiresHardware: boolean
    cloudNative: boolean
  }
  pricing: {
    model: string
    startingPrice: number
    enterprise: number
  }
  roi: {
    breachRiskReduction: number
    operationalEfficiency: number
    complianceAutomation: number
  }
  strengths: string[]
  weaknesses: string[]
}

import type { OrgSizeId } from "@/types/common"

export const getVendorDataById = (vendorId: VendorId): NewVendorData | undefined => {
  return VENDOR_DATA.find((vendor) => vendor.id === vendorId)
}

// Enhanced vendor data with all 14 vendors
export const COMPREHENSIVE_VENDOR_DATA: NewVendorData[] = [
  {
    id: "portnox",
    name: "Portnox CLEAR",
    vendorType: "Cloud-Native NAC",
    logo: "/portnox-logo-color.png",
    description: "AI-powered, cloud-native Zero Trust Network Access Control with risk-based authentication",
    pricingTiers: [
      {
        orgSizeTarget: ["small_business"],
        pricePerDevicePerMonth: 4.5,
        annualDiscountPercent: 10,
      },
      {
        orgSizeTarget: ["mid_market"],
        pricePerDevicePerMonth: 4.0,
        annualDiscountPercent: 12,
      },
      {
        orgSizeTarget: ["enterprise"],
        pricePerDevicePerMonth: 3.5,
        annualDiscountPercent: 15,
      },
      {
        orgSizeTarget: ["global_enterprise"],
        pricePerDevicePerMonth: 3.0,
        annualDiscountPercent: 18,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 30000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 2500,
      supportCostFactor: 0.15,
      personnelCostFactor: 0.25,
      hiddenCostFactor: 5,
    },
    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0.1,
      deploymentTime: {
        poc: 24,
        fullDeployment: 168,
        fullScale: 168,
      },
    },
    roiFactors: {
      incidentReductionPercent: 94,
      complianceAutomationSavingsFactor: 0.92,
      operationalEfficiencyGainPercent: 85,
      avgPaybackPeriodMonths: 12,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 95 },
      { standardId: "pci_dss", coveragePercent: 92 },
      { standardId: "gdpr", coveragePercent: 88 },
      { standardId: "sox", coveragePercent: 90 },
      { standardId: "iso27001", coveragePercent: 93 },
      { standardId: "nist", coveragePercent: 91 },
      { standardId: "fedramp", coveragePercent: 89 },
    ],
    comparativeScores: {
      securityScore: 95,
      usabilityScore: 92,
      scalabilityScore: 96,
      supportScore: 91,
      complianceCoverageScore: 95,
    },
    portnoxSpecificMetrics: {
      zeroTrustMaturityScore: 95,
      riskBasedAuthenticationCoverage: 100,
      continuousMonitoringCoverage: 100,
      automatedRemediationRate: 98,
      is100PercentCloudNative: true,
      agentlessDeploymentPercent: 100,
    },
  },
  {
    id: "cisco_ise",
    name: "Cisco Identity Services Engine",
    vendorType: "Traditional NAC",
    logo: "/cisco-logo.png",
    description: "Enterprise-grade identity services engine with comprehensive policy management",
    pricingTiers: [
      {
        userRange: [1, 500],
        pricePerUserPerMonth: 12,
        annualDiscountPercent: 5,
      },
      {
        userRange: [501, 2000],
        pricePerUserPerMonth: 10,
        annualDiscountPercent: 8,
      },
      {
        userRange: [2001, null],
        pricePerUserPerMonth: 9,
        annualDiscountPercent: 12,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 125000,
      hardwareCostPerYear: 35000,
      trainingCostInitial: 25000,
      supportCostFactor: 0.22,
      personnelCostFactor: 1.2,
      hiddenCostFactor: 25,
    },
    implementation: {
      complexityLevel: "very_high",
      professionalServicesCostFactor: 0.4,
      deploymentTime: {
        poc: 240,
        fullDeployment: 4320,
        fullScale: 4320,
      },
    },
    roiFactors: {
      incidentReductionPercent: 72,
      complianceAutomationSavingsFactor: 0.55,
      operationalEfficiencyGainPercent: 45,
      avgPaybackPeriodMonths: 24,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 78 },
      { standardId: "pci_dss", coveragePercent: 82 },
      { standardId: "gdpr", coveragePercent: 75 },
      { standardId: "sox", coveragePercent: 80 },
      { standardId: "iso27001", coveragePercent: 83 },
      { standardId: "nist", coveragePercent: 85 },
    ],
    comparativeScores: {
      securityScore: 85,
      usabilityScore: 65,
      scalabilityScore: 78,
      supportScore: 82,
      complianceCoverageScore: 80,
    },
  },
  {
    id: "aruba_clearpass",
    name: "Aruba ClearPass Policy Manager",
    vendorType: "Traditional NAC",
    logo: "/aruba-logo.png",
    description: "Comprehensive network access control with advanced policy enforcement",
    pricingTiers: [
      {
        orgSizeTarget: ["small_business", "mid_market"],
        pricePerDevicePerMonth: 8.5,
        annualDiscountPercent: 8,
      },
      {
        orgSizeTarget: ["enterprise", "global_enterprise"],
        pricePerDevicePerMonth: 7.2,
        annualDiscountPercent: 12,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 85000,
      hardwareCostPerYear: 25000,
      trainingCostInitial: 15000,
      supportCostFactor: 0.2,
      personnelCostFactor: 0.8,
      hiddenCostFactor: 18,
    },
    implementation: {
      complexityLevel: "high",
      professionalServicesCostFactor: 0.3,
      deploymentTime: {
        poc: 168,
        fullDeployment: 3240,
        fullScale: 3240,
      },
    },
    roiFactors: {
      incidentReductionPercent: 75,
      complianceAutomationSavingsFactor: 0.65,
      operationalEfficiencyGainPercent: 58,
      avgPaybackPeriodMonths: 20,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 82 },
      { standardId: "pci_dss", coveragePercent: 85 },
      { standardId: "gdpr", coveragePercent: 78 },
      { standardId: "iso27001", coveragePercent: 80 },
      { standardId: "nist", coveragePercent: 83 },
    ],
    comparativeScores: {
      securityScore: 82,
      usabilityScore: 72,
      scalabilityScore: 75,
      supportScore: 78,
      complianceCoverageScore: 82,
    },
  },
  {
    id: "fortinac",
    name: "Fortinet FortiNAC",
    vendorType: "Integrated Security Platform",
    logo: "/fortinet-logo.png",
    description: "Network access control integrated with Fortinet Security Fabric",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 7.5,
        annualDiscountPercent: 6,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 6.8,
        annualDiscountPercent: 10,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 65000,
      hardwareCostPerYear: 18000,
      trainingCostInitial: 12000,
      supportCostFactor: 0.18,
      personnelCostFactor: 0.7,
      hiddenCostFactor: 15,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.25,
      deploymentTime: {
        poc: 120,
        fullDeployment: 2700,
        fullScale: 2700,
      },
    },
    roiFactors: {
      incidentReductionPercent: 70,
      complianceAutomationSavingsFactor: 0.58,
      operationalEfficiencyGainPercent: 62,
      avgPaybackPeriodMonths: 18,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 75 },
      { standardId: "pci_dss", coveragePercent: 80 },
      { standardId: "iso27001", coveragePercent: 78 },
      { standardId: "nist", coveragePercent: 82 },
    ],
    comparativeScores: {
      securityScore: 78,
      usabilityScore: 70,
      scalabilityScore: 72,
      supportScore: 75,
      complianceCoverageScore: 79,
    },
  },
  {
    id: "forescout",
    name: "Forescout Platform",
    vendorType: "Device Visibility & Control",
    logo: "/forescout-logo.png",
    description: "Agentless device visibility and automated control platform",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 11.5,
        annualDiscountPercent: 7,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 10.2,
        annualDiscountPercent: 10,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 110000,
      hardwareCostPerYear: 35000,
      trainingCostInitial: 18000,
      supportCostFactor: 0.25,
      personnelCostFactor: 1.0,
      hiddenCostFactor: 22,
    },
    implementation: {
      complexityLevel: "high",
      professionalServicesCostFactor: 0.35,
      deploymentTime: {
        poc: 192,
        fullDeployment: 3600,
        fullScale: 3600,
      },
    },
    roiFactors: {
      incidentReductionPercent: 78,
      complianceAutomationSavingsFactor: 0.82,
      operationalEfficiencyGainPercent: 72,
      avgPaybackPeriodMonths: 22,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 88 },
      { standardId: "pci_dss", coveragePercent: 90 },
      { standardId: "gdpr", coveragePercent: 85 },
      { standardId: "iso27001", coveragePercent: 87 },
      { standardId: "nist", coveragePercent: 89 },
    ],
    comparativeScores: {
      securityScore: 88,
      usabilityScore: 68,
      scalabilityScore: 82,
      supportScore: 80,
      complianceCoverageScore: 88,
    },
  },
  {
    id: "juniper_mist",
    name: "Juniper Mist Access Assurance",
    vendorType: "AI-Driven Cloud NAC",
    logo: "/juniper-logo.png",
    description: "AI-driven access assurance with cloud-native architecture",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 5.8,
        annualDiscountPercent: 5,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 5.2,
        annualDiscountPercent: 8,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 48000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 8000,
      supportCostFactor: 0.15,
      personnelCostFactor: 0.4,
      hiddenCostFactor: 8,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.15,
      deploymentTime: {
        poc: 72,
        fullDeployment: 720,
        fullScale: 720,
      },
    },
    roiFactors: {
      incidentReductionPercent: 82,
      complianceAutomationSavingsFactor: 0.75,
      operationalEfficiencyGainPercent: 78,
      avgPaybackPeriodMonths: 15,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 85 },
      { standardId: "pci_dss", coveragePercent: 88 },
      { standardId: "gdpr", coveragePercent: 82 },
      { standardId: "iso27001", coveragePercent: 86 },
      { standardId: "nist", coveragePercent: 89 },
    ],
    comparativeScores: {
      securityScore: 88,
      usabilityScore: 85,
      scalabilityScore: 90,
      supportScore: 82,
      complianceCoverageScore: 86,
    },
  },
  {
    id: "extreme_nac",
    name: "Extreme Networks ExtremeControl",
    vendorType: "Network-Integrated NAC",
    logo: "/extreme-logo.png",
    description: "NAC solution tightly integrated with Extreme Networks infrastructure",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 6.2,
        annualDiscountPercent: 4,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 5.5,
        annualDiscountPercent: 7,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 52000,
      hardwareCostPerYear: 12000,
      trainingCostInitial: 8000,
      supportCostFactor: 0.16,
      personnelCostFactor: 0.55,
      hiddenCostFactor: 10,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.2,
      deploymentTime: {
        poc: 120,
        fullDeployment: 3060,
        fullScale: 3060,
      },
    },
    roiFactors: {
      incidentReductionPercent: 65,
      complianceAutomationSavingsFactor: 0.48,
      operationalEfficiencyGainPercent: 52,
      avgPaybackPeriodMonths: 21,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 68 },
      { standardId: "pci_dss", coveragePercent: 72 },
      { standardId: "iso27001", coveragePercent: 70 },
      { standardId: "nist", coveragePercent: 75 },
    ],
    comparativeScores: {
      securityScore: 72,
      usabilityScore: 75,
      scalabilityScore: 68,
      supportScore: 70,
      complianceCoverageScore: 71,
    },
  },
  {
    id: "cisco_meraki",
    name: "Cisco Meraki Systems Manager",
    vendorType: "Cloud-Managed Security",
    logo: "/meraki-logo.png",
    description: "Cloud-managed network security with integrated access control",
    pricingTiers: [
      {
        orgSizeTarget: ["small_business", "mid_market"],
        pricePerDevicePerMonth: 6.8,
        annualDiscountPercent: 5,
      },
      {
        orgSizeTarget: ["enterprise", "global_enterprise"],
        pricePerDevicePerMonth: 5.9,
        annualDiscountPercent: 8,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 58000,
      hardwareCostPerYear: 15000,
      trainingCostInitial: 6000,
      supportCostFactor: 0.12,
      personnelCostFactor: 0.45,
      hiddenCostFactor: 9,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.18,
      deploymentTime: {
        poc: 72,
        fullDeployment: 1080,
        fullScale: 1080,
      },
    },
    roiFactors: {
      incidentReductionPercent: 62,
      complianceAutomationSavingsFactor: 0.52,
      operationalEfficiencyGainPercent: 68,
      avgPaybackPeriodMonths: 19,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 65 },
      { standardId: "pci_dss", coveragePercent: 70 },
      { standardId: "gdpr", coveragePercent: 68 },
      { standardId: "iso27001", coveragePercent: 72 },
    ],
    comparativeScores: {
      securityScore: 70,
      usabilityScore: 82,
      scalabilityScore: 75,
      supportScore: 78,
      complianceCoverageScore: 69,
    },
  },
  {
    id: "microsoft_nps",
    name: "Microsoft Network Policy Server",
    vendorType: "Ecosystem Integration",
    logo: "/microsoft-logo.png",
    description: "Microsoft ecosystem NAC using NPS, Intune, and Conditional Access",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 4.2,
        annualDiscountPercent: 3,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 3.8,
        annualDiscountPercent: 5,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 42000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 5000,
      supportCostFactor: 0.1,
      personnelCostFactor: 0.35,
      hiddenCostFactor: 6,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.12,
      deploymentTime: {
        poc: 144,
        fullDeployment: 1620,
        fullScale: 1620,
      },
    },
    roiFactors: {
      incidentReductionPercent: 68,
      complianceAutomationSavingsFactor: 0.72,
      operationalEfficiencyGainPercent: 62,
      avgPaybackPeriodMonths: 16,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 78 },
      { standardId: "gdpr", coveragePercent: 82 },
      { standardId: "sox", coveragePercent: 80 },
      { standardId: "iso27001", coveragePercent: 79 },
    ],
    comparativeScores: {
      securityScore: 75,
      usabilityScore: 78,
      scalabilityScore: 72,
      supportScore: 74,
      complianceCoverageScore: 80,
    },
  },
  {
    id: "packetfence",
    name: "PacketFence Open Source NAC",
    vendorType: "Open Source",
    logo: "/packetfence-logo.png",
    description: "Open-source network access control with enterprise support options",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 0,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 2.5,
        annualDiscountPercent: 0,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 0,
      hardwareCostPerYear: 8000,
      trainingCostInitial: 3000,
      supportCostFactor: 0,
      personnelCostFactor: 0.8,
      hiddenCostFactor: 5,
    },
    implementation: {
      complexityLevel: "very_high",
      professionalServicesCostFactor: 0,
      deploymentTime: {
        poc: 360,
        fullDeployment: 5400,
        fullScale: 5400,
      },
    },
    roiFactors: {
      incidentReductionPercent: 55,
      complianceAutomationSavingsFactor: 0.35,
      operationalEfficiencyGainPercent: 38,
      avgPaybackPeriodMonths: 28,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 55 },
      { standardId: "pci_dss", coveragePercent: 48 },
      { standardId: "iso27001", coveragePercent: 52 },
    ],
    comparativeScores: {
      securityScore: 65,
      usabilityScore: 45,
      scalabilityScore: 58,
      supportScore: 35,
      complianceCoverageScore: 52,
    },
  },
  {
    id: "foxpass",
    name: "Foxpass Cloud RADIUS",
    vendorType: "Cloud Authentication",
    logo: "/foxpass-logo.png",
    description: "Cloud-hosted RADIUS and LDAP service for Wi-Fi and VPN authentication",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 2.8,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 3.5,
        annualDiscountPercent: 0,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 28000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 1500,
      supportCostFactor: 0.05,
      personnelCostFactor: 0.15,
      hiddenCostFactor: 3,
    },
    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0.05,
      deploymentTime: {
        poc: 12,
        fullDeployment: 180,
        fullScale: 180,
      },
    },
    roiFactors: {
      incidentReductionPercent: 42,
      complianceAutomationSavingsFactor: 0.28,
      operationalEfficiencyGainPercent: 45,
      avgPaybackPeriodMonths: 14,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 35 },
      { standardId: "gdpr", coveragePercent: 40 },
    ],
    comparativeScores: {
      securityScore: 60,
      usabilityScore: 88,
      scalabilityScore: 85,
      supportScore: 72,
      complianceCoverageScore: 38,
    },
  },
  {
    id: "securew2",
    name: "SecureW2 Cloud PKI",
    vendorType: "Certificate Management",
    logo: "/securew2-logo.png",
    description: "Cloud-based PKI and certificate management for secure wireless networks",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 4.2,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 4.8,
        annualDiscountPercent: 0,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 38000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 2000,
      supportCostFactor: 0.08,
      personnelCostFactor: 0.2,
      hiddenCostFactor: 4,
    },
    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0.08,
      deploymentTime: {
        poc: 36,
        fullDeployment: 540,
        fullScale: 540,
      },
    },
    roiFactors: {
      incidentReductionPercent: 48,
      complianceAutomationSavingsFactor: 0.38,
      operationalEfficiencyGainPercent: 52,
      avgPaybackPeriodMonths: 17,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 45 },
      { standardId: "pci_dss", coveragePercent: 50 },
      { standardId: "gdpr", coveragePercent: 42 },
    ],
    comparativeScores: {
      securityScore: 68,
      usabilityScore: 82,
      scalabilityScore: 78,
      supportScore: 75,
      complianceCoverageScore: 46,
    },
  },
  {
    id: "arista_agni",
    name: "Arista AGNI",
    vendorType: "Cloud-Native Platform",
    logo: "/arista-logo.png",
    description: "Cloud-native NAC service integrated with Arista CloudVision platform",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 6.5,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 7.8,
        annualDiscountPercent: 0,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 58000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 5000,
      supportCostFactor: 0.18,
      personnelCostFactor: 0.38,
      hiddenCostFactor: 7,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.18,
      deploymentTime: {
        poc: 90,
        fullDeployment: 1440,
        fullScale: 1440,
      },
    },
    roiFactors: {
      incidentReductionPercent: 76,
      complianceAutomationSavingsFactor: 0.68,
      operationalEfficiencyGainPercent: 72,
      avgPaybackPeriodMonths: 17,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 80 },
      { standardId: "pci_dss", coveragePercent: 82 },
      { standardId: "gdpr", coveragePercent: 78 },
      { standardId: "iso27001", coveragePercent: 81 },
      { standardId: "nist", coveragePercent: 84 },
    ],
    comparativeScores: {
      securityScore: 85,
      usabilityScore: 78,
      scalabilityScore: 88,
      supportScore: 80,
      complianceCoverageScore: 81,
    },
  },
]

// Export the comprehensive data as the main vendor data
export const VENDOR_DATA = COMPREHENSIVE_VENDOR_DATA
export const allVendorsData = new Map(VENDOR_DATA.map((vendor) => [vendor.id, vendor]))

// Definitive list of all vendor IDs
export const VENDOR_IDS_DEFINITIVE: readonly VendorId[] = [
  "portnox",
  "cisco_ise",
  "aruba_clearpass",
  "fortinac",
  "forescout",
  "juniper_mist",
  "extreme_nac",
  "cisco_meraki",
  "microsoft_nps",
  "packetfence",
  "foxpass",
  "securew2",
  "arista_agni",
] as const
