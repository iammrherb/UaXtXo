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

export const VENDOR_DATA: NewVendorData[] = [
  {
    id: "portnox",
    name: "Portnox CLEAR",
    vendorType: "Cloud-Native NAC",
    logo: "/portnox-logo-color.png",
    description: "AI-powered, cloud-native Zero Trust Network Access Control",
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
      incidentReductionPercent: 0.94,
      complianceAutomationSavingsFactor: 0.92,
      operationalEfficiencyGainPercent: 0.85,
      avgPaybackPeriodMonths: 12,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 95 },
      { standardId: "pci_dss", coveragePercent: 90 },
      { standardId: "gdpr", coveragePercent: 85 },
    ],
  },
  {
    id: "cisco",
    name: "Cisco ISE",
    vendorType: "Traditional NAC",
    logo: "/cisco-logo.png",
    description: "Industry-leading identity services engine with comprehensive NAC",
    pricingTiers: [
      {
        userRange: [1, 500],
        pricePerUserPerMonth: 10,
        annualDiscountPercent: 5,
      },
      {
        userRange: [501, 2000],
        pricePerUserPerMonth: 9,
        annualDiscountPercent: 7,
      },
      {
        userRange: [2001, null],
        pricePerUserPerMonth: 8,
        annualDiscountPercent: 10,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 80000,
      hardwareCostPerYear: 20000,
      trainingCostInitial: 15000,
      supportCostFactor: 0.2,
      personnelCostFactor: 0.75,
      hiddenCostFactor: 15,
    },
    implementation: {
      complexityLevel: "very_high",
      professionalServicesCostFactor: 0.3,
      deploymentTime: {
        poc: 120,
        fullDeployment: 2880,
        fullScale: 2880,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.65,
      complianceAutomationSavingsFactor: 0.55,
      operationalEfficiencyGainPercent: 0.45,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 75 },
      { standardId: "pci_dss", coveragePercent: 80 },
      { standardId: "gdpr", coveragePercent: 70 },
    ],
  },
  {
    id: "aruba",
    name: "Aruba ClearPass",
    vendorType: "Traditional NAC",
    logo: "/aruba-logo.png",
    description: "Comprehensive network access control with policy enforcement",
    pricingTiers: [
      {
        orgSizeTarget: ["small_business", "mid_market"],
        pricePerDevicePerMonth: 8,
        annualDiscountPercent: 8,
      },
      {
        orgSizeTarget: ["enterprise", "global_enterprise"],
        pricePerDevicePerMonth: 7,
        annualDiscountPercent: 10,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 60000,
      hardwareCostPerYear: 15000,
      trainingCostInitial: 10000,
      supportCostFactor: 0.18,
      personnelCostFactor: 0.6,
      hiddenCostFactor: 12,
    },
    implementation: {
      complexityLevel: "high",
      professionalServicesCostFactor: 0.25,
      deploymentTime: {
        poc: 96,
        fullDeployment: 2160,
        fullScale: 2160,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.72,
      complianceAutomationSavingsFactor: 0.6,
      operationalEfficiencyGainPercent: 0.55,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 80 },
      { standardId: "pci_dss", coveragePercent: 85 },
      { standardId: "gdpr", coveragePercent: 75 },
    ],
  },
  {
    id: "meraki",
    name: "Cisco Meraki",
    vendorType: "Cloud-Managed",
    logo: "/meraki-logo.png",
    description: "Cloud-managed networking with integrated security",
    pricingTiers: [
      {
        orgSizeTarget: ["small_business", "mid_market"],
        pricePerDevicePerMonth: 6,
        annualDiscountPercent: 5,
      },
      {
        orgSizeTarget: ["enterprise", "global_enterprise"],
        pricePerDevicePerMonth: 5,
        annualDiscountPercent: 7,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 50000,
      hardwareCostPerYear: 10000,
      trainingCostInitial: 5000,
      supportCostFactor: 0.1,
      personnelCostFactor: 0.4,
      hiddenCostFactor: 8,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.15,
      deploymentTime: {
        poc: 48,
        fullDeployment: 720,
        fullScale: 720,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.58,
      complianceAutomationSavingsFactor: 0.45,
      operationalEfficiencyGainPercent: 0.65,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 65 },
      { standardId: "pci_dss", coveragePercent: 70 },
      { standardId: "gdpr", coveragePercent: 60 },
    ],
  },
  {
    id: "fortinet",
    name: "FortiNAC",
    vendorType: "Integrated Security",
    logo: "/fortinet-logo.png",
    description: "Network access control integrated with security fabric",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 7,
        annualDiscountPercent: 6,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 6,
        annualDiscountPercent: 8,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 55000,
      hardwareCostPerYear: 12000,
      trainingCostInitial: 7000,
      supportCostFactor: 0.15,
      personnelCostFactor: 0.5,
      hiddenCostFactor: 10,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.2,
      deploymentTime: {
        poc: 72,
        fullDeployment: 1800,
        fullScale: 1800,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.68,
      complianceAutomationSavingsFactor: 0.5,
      operationalEfficiencyGainPercent: 0.6,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 70 },
      { standardId: "pci_dss", coveragePercent: 75 },
    ],
  },
  {
    id: "forescout",
    name: "Forescout eyeSight",
    vendorType: "Device Visibility",
    logo: "/forescout-logo.png",
    description: "Agentless device visibility and control platform",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 11,
        annualDiscountPercent: 7,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 10,
        annualDiscountPercent: 9,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 90000,
      hardwareCostPerYear: 25000,
      trainingCostInitial: 12000,
      supportCostFactor: 0.25,
      personnelCostFactor: 0.8,
      hiddenCostFactor: 20,
    },
    implementation: {
      complexityLevel: "high",
      professionalServicesCostFactor: 0.35,
      deploymentTime: {
        poc: 96,
        fullDeployment: 2400,
        fullScale: 2400,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.75,
      complianceAutomationSavingsFactor: 0.8,
      operationalEfficiencyGainPercent: 0.7,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 85 },
      { standardId: "pci_dss", coveragePercent: 88 },
    ],
  },
  {
    id: "extreme",
    name: "ExtremeControl",
    vendorType: "Network-Integrated",
    logo: "/extreme-logo.png",
    description: "NAC solution integrated with Extreme Networks infrastructure",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 6,
        annualDiscountPercent: 4,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 5,
        annualDiscountPercent: 6,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 45000,
      hardwareCostPerYear: 8000,
      trainingCostInitial: 6000,
      supportCostFactor: 0.12,
      personnelCostFactor: 0.45,
      hiddenCostFactor: 7,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.18,
      deploymentTime: {
        poc: 72,
        fullDeployment: 2040,
        fullScale: 2040,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.55,
      complianceAutomationSavingsFactor: 0.4,
      operationalEfficiencyGainPercent: 0.5,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 60 },
      { standardId: "pci_dss", coveragePercent: 65 },
    ],
  },
  {
    id: "juniper",
    name: "Juniper Mist AA",
    vendorType: "AI-Driven",
    logo: "/juniper-logo.png",
    description: "AI-driven access assurance with Mist cloud platform",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 5,
        annualDiscountPercent: 3,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 4,
        annualDiscountPercent: 5,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 40000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 4000,
      supportCostFactor: 0.1,
      personnelCostFactor: 0.35,
      hiddenCostFactor: 6,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.12,
      deploymentTime: {
        poc: 48,
        fullDeployment: 480,
        fullScale: 480,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.78,
      complianceAutomationSavingsFactor: 0.65,
      operationalEfficiencyGainPercent: 0.75,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 82 },
      { standardId: "pci_dss", coveragePercent: 85 },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft NPS/Intune",
    vendorType: "Ecosystem NAC",
    logo: "/microsoft-logo.png",
    description: "Microsoft ecosystem NAC using NPS, Intune, and Conditional Access",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 4,
        annualDiscountPercent: 2,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 3,
        annualDiscountPercent: 4,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 35000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 3000,
      supportCostFactor: 0.08,
      personnelCostFactor: 0.3,
      hiddenCostFactor: 4,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.1,
      deploymentTime: {
        poc: 96,
        fullDeployment: 1080,
        fullScale: 1080,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.62,
      complianceAutomationSavingsFactor: 0.7,
      operationalEfficiencyGainPercent: 0.58,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 75 },
      { standardId: "gdpr", coveragePercent: 78 },
    ],
  },
  {
    id: "packetfence",
    name: "PacketFence",
    vendorType: "Open Source",
    logo: "/packetfence-logo.png",
    description: "Open-source network access control solution",
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
      hardwareCostPerYear: 5000,
      trainingCostInitial: 2000,
      supportCostFactor: 0,
      personnelCostFactor: 0.6,
      hiddenCostFactor: 3,
    },
    implementation: {
      complexityLevel: "very_high",
      professionalServicesCostFactor: 0,
      deploymentTime: {
        poc: 240,
        fullDeployment: 3600,
        fullScale: 3600,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.45,
      complianceAutomationSavingsFactor: 0.25,
      operationalEfficiencyGainPercent: 0.35,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 50 },
      { standardId: "pci_dss", coveragePercent: 40 },
    ],
  },
  {
    id: "foxpass",
    name: "Foxpass",
    vendorType: "Cloud RADIUS",
    logo: "/foxpass-logo.png",
    description: "Cloud-hosted RADIUS and LDAP for Wi-Fi and VPN",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 2.5,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 3.2,
        annualDiscountPercent: 0,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 20000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 1000,
      supportCostFactor: 0,
      personnelCostFactor: 0.1,
      hiddenCostFactor: 2,
    },
    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0,
      deploymentTime: {
        poc: 8,
        fullDeployment: 120,
        fullScale: 120,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.35,
      complianceAutomationSavingsFactor: 0.2,
      operationalEfficiencyGainPercent: 0.4,
    },
    complianceSupport: [{ standardId: "hipaa", coveragePercent: 30 }],
  },
  {
    id: "securew2",
    name: "SecureW2",
    vendorType: "Certificate-based",
    logo: "/securew2-logo.png",
    description: "Cloud-based PKI and certificate management for secure Wi-Fi",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 3.8,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 4.5,
        annualDiscountPercent: 0,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 30000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 1500,
      supportCostFactor: 0,
      personnelCostFactor: 0.15,
      hiddenCostFactor: 3,
    },
    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0,
      deploymentTime: {
        poc: 24,
        fullDeployment: 360,
        fullScale: 360,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.4,
      complianceAutomationSavingsFactor: 0.3,
      operationalEfficiencyGainPercent: 0.45,
    },
    complianceSupport: [{ standardId: "hipaa", coveragePercent: 40 }],
  },
  {
    id: "radiusaas",
    name: "RADIUS-as-a-Service",
    vendorType: "Cloud RADIUS",
    logo: "/radiusaas-logo.png",
    description: "Cloud-based RADIUS service for network authentication",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 1.8,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 2.2,
        annualDiscountPercent: 0,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 15000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 500,
      supportCostFactor: 0,
      personnelCostFactor: 0.05,
      hiddenCostFactor: 1,
    },
    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0,
      deploymentTime: {
        poc: 4,
        fullDeployment: 48,
        fullScale: 48,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.25,
      complianceAutomationSavingsFactor: 0.15,
      operationalEfficiencyGainPercent: 0.3,
    },
    complianceSupport: [{ standardId: "hipaa", coveragePercent: 20 }],
  },
  {
    id: "arista",
    name: "Arista AGNI",
    vendorType: "Cloud-Native NAC",
    logo: "/arista-logo.png",
    description: "Cloud-native NAC service integrated with Arista's CloudVision.",
    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 6,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 7.5,
        annualDiscountPercent: 0,
      },
    ],
    tcoFactors: {
      licensingCostPerYear: 48000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 3000,
      supportCostFactor: 0.15,
      personnelCostFactor: 0.3,
      hiddenCostFactor: 5,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.15,
      deploymentTime: {
        poc: 60,
        fullDeployment: 960,
        fullScale: 960,
      },
    },
    roiFactors: {
      incidentReductionPercent: 0.72,
      complianceAutomationSavingsFactor: 0.6,
      operationalEfficiencyGainPercent: 0.68,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 78 },
      { standardId: "pci_dss", coveragePercent: 80 },
    ],
  },
]
