// Complete vendor database with all 14 vendors and comprehensive data
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
  averageDeploymentTimeDays: number
  deploymentTime: {
    poc: number
    fullDeployment: number
    fullScale: number
  }
}

export interface VendorSecurityMetrics {
  zeroTrustMaturityScore: number
  breachRiskReduction: number
  cveCount: number
  securityScore: number
  vulnerabilityExposure: "none" | "low" | "medium" | "high" | "critical"
}

export interface VendorComplianceSupport {
  standardId: string
  coverageLevel: "Covered" | "Partial" | "NotCovered"
  automationPercent: number
  details?: string
}

export interface VendorFeatures {
  coreNAC: {
    [key: string]: {
      supported: boolean
      score?: number
      details?: string
      isPortnoxAdvantage?: boolean
    }
  }
  advancedSecurity: {
    [key: string]: {
      supported: boolean
      score?: number
      details?: string
      isPortnoxAdvantage?: boolean
    }
  }
  cloudAndIntegration: {
    [key: string]: {
      supported: boolean
      score?: number
      details?: string
      isPortnoxAdvantage?: boolean
    }
  }
  managementAndOperations: {
    [key: string]: {
      supported: boolean
      score?: number
      details?: string
      isPortnoxAdvantage?: boolean
    }
  }
}

export interface NewVendorData {
  id: VendorId
  name: string
  vendorType: string
  logoUrl: string
  shortDescription: string
  description: string
  marketShare: number
  customerSatisfaction: number

  // Pricing and TCO
  pricingTiers?: VendorPricingTier[]
  tcoFactors: VendorTCOFactors

  // Implementation
  implementation: VendorImplementationMetrics

  // ROI and Benefits
  roiFactors: VendorROIFactors

  // Security
  security: VendorSecurityMetrics

  // Compliance
  complianceSupport: VendorComplianceSupport[]

  // Features
  features: VendorFeatures

  // Comparative Scores
  comparativeScores?: {
    securityEffectiveness: number
    easeOfDeployment: number
    scalability: number
    integrationCapabilities: number
    totalCostOfOwnershipScore: number
    complianceCoverageScore: number
  }

  // Portnox-specific metrics
  portnoxSpecificMetrics?: {
    zeroTrustMaturityScore: number
    riskBasedAuthCoverage: number
    continuousMonitoringCoverage: number
    automatedRemediationRate: number
    is100PercentCloudNative: boolean
    agentlessDeploymentPercent: number
  }

  // Market positioning
  strengths: string[]
  weaknesses: string[]
  marketPosition: "leader" | "challenger" | "niche" | "visionary"

  // Additional metadata
  lastUpdated: string
  dataSource: string
}

export type VendorId =
  | "portnox"
  | "cisco_ise"
  | "aruba_clearpass"
  | "fortinac"
  | "forescout"
  | "juniper_mist"
  | "extreme_nac"
  | "cisco_meraki"
  | "microsoft_nps"
  | "packetfence"
  | "foxpass"
  | "securew2"
  | "arista_agni"
  | "ivanti_neurons"

import type { OrgSizeId } from "@/types/common"

// Complete vendor database with all 14 vendors
export const COMPREHENSIVE_VENDOR_DATA: NewVendorData[] = [
  {
    id: "portnox",
    name: "Portnox CLEAR",
    vendorType: "Cloud-Native Zero Trust NAC",
    logoUrl: "/portnox-logo-color.png",
    shortDescription: "AI-powered, cloud-native Zero Trust Network Access Control",
    description:
      "Portnox CLEAR is the industry's first 100% cloud-native Zero Trust NAC solution, delivering AI-powered risk-based authentication, continuous monitoring, and automated remediation in a single platform. With zero infrastructure requirements and 30-minute deployment, Portnox revolutionizes network security.",
    marketShare: 8.5,
    customerSatisfaction: 96,

    pricingTiers: [
      {
        orgSizeTarget: ["small_business"],
        pricePerDevicePerMonth: 5.0,
        annualDiscountPercent: 10,
      },
      {
        orgSizeTarget: ["mid_market"],
        pricePerDevicePerMonth: 4.5,
        annualDiscountPercent: 12,
      },
      {
        orgSizeTarget: ["enterprise"],
        pricePerDevicePerMonth: 4.0,
        annualDiscountPercent: 15,
      },
      {
        orgSizeTarget: ["global_enterprise"],
        pricePerDevicePerMonth: 3.5,
        annualDiscountPercent: 18,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 54000, // Based on $4.5/device/month for 1000 devices
      hardwareCostPerYear: 0,
      trainingCostInitial: 2500,
      supportCostFactor: 0.15,
      personnelCostFactor: 0.1, // Minimal staffing required
      hiddenCostFactor: 2, // Very low hidden costs
    },

    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0.05,
      averageDeploymentTimeDays: 1, // 30 minutes to 24 hours
      deploymentTime: {
        poc: 0.5, // 30 minutes
        fullDeployment: 24, // 1 day
        fullScale: 24,
      },
    },

    roiFactors: {
      incidentReductionPercent: 94,
      complianceAutomationSavingsFactor: 0.92,
      operationalEfficiencyGainPercent: 90,
      avgPaybackPeriodMonths: 1, // 20 days as mentioned
    },

    security: {
      zeroTrustMaturityScore: 95,
      breachRiskReduction: 92,
      cveCount: 0,
      securityScore: 98,
      vulnerabilityExposure: "none",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Covered",
        automationPercent: 95,
        details: "Full HIPAA compliance automation with real-time monitoring",
      },
      {
        standardId: "pci_dss",
        coverageLevel: "Covered",
        automationPercent: 92,
        details: "Complete PCI DSS compliance framework",
      },
      {
        standardId: "gdpr",
        coverageLevel: "Covered",
        automationPercent: 88,
        details: "GDPR privacy controls and data protection",
      },
      {
        standardId: "sox",
        coverageLevel: "Covered",
        automationPercent: 90,
        details: "SOX financial controls and audit trails",
      },
      {
        standardId: "iso27001",
        coverageLevel: "Covered",
        automationPercent: 93,
        details: "ISO 27001 information security management",
      },
      {
        standardId: "nist",
        coverageLevel: "Covered",
        automationPercent: 91,
        details: "NIST Cybersecurity Framework alignment",
      },
      {
        standardId: "fedramp",
        coverageLevel: "Covered",
        automationPercent: 89,
        details: "FedRAMP authorized cloud security",
      },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": {
          supported: true,
          score: 98,
          details: "Advanced 802.1X with AI-enhanced authentication",
          isPortnoxAdvantage: true,
        },
        "Risk-Based Authentication": {
          supported: true,
          score: 100,
          details: "AI-powered risk assessment for every access request",
          isPortnoxAdvantage: true,
        },
        "Device Profiling": {
          supported: true,
          score: 96,
          details: "Comprehensive device fingerprinting and classification",
        },
        "Policy Automation": { supported: true, score: 94, details: "Intelligent policy creation and enforcement" },
        "Guest Access Management": {
          supported: true,
          score: 92,
          details: "Streamlined guest onboarding and management",
        },
        "BYOD Support": { supported: true, score: 95, details: "Seamless bring-your-own-device integration" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": {
          supported: true,
          score: 100,
          details: "Native Zero Trust with continuous verification",
          isPortnoxAdvantage: true,
        },
        "Continuous Monitoring": {
          supported: true,
          score: 98,
          details: "Real-time network and device monitoring",
          isPortnoxAdvantage: true,
        },
        "Automated Remediation": {
          supported: true,
          score: 97,
          details: "Instant threat response and policy enforcement",
          isPortnoxAdvantage: true,
        },
        "Behavioral Analytics": { supported: true, score: 93, details: "AI-driven user and device behavior analysis" },
        "Threat Intelligence": { supported: true, score: 91, details: "Integrated threat intelligence feeds" },
        Microsegmentation: { supported: true, score: 89, details: "Dynamic network segmentation" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": {
          supported: true,
          score: 100,
          details: "Born-in-the-cloud architecture",
          isPortnoxAdvantage: true,
        },
        "API-First Design": { supported: true, score: 96, details: "Comprehensive REST API for all functions" },
        "Multi-Cloud Support": { supported: true, score: 94, details: "Works across AWS, Azure, GCP" },
        "Vendor Agnostic": {
          supported: true,
          score: 98,
          details: "Integrates with any network infrastructure",
          isPortnoxAdvantage: true,
        },
        "SIEM Integration": { supported: true, score: 92, details: "Native integration with major SIEM platforms" },
        "Identity Provider Integration": {
          supported: true,
          score: 95,
          details: "Seamless integration with all major IdPs",
        },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 96, details: "Unified management console" },
        "Automated Reporting": {
          supported: true,
          score: 94,
          details: "Comprehensive compliance and security reporting",
        },
        "Self-Service Portal": { supported: true, score: 91, details: "User self-service capabilities" },
        "Mobile Management": { supported: true, score: 89, details: "Full mobile device management" },
        Scalability: { supported: true, score: 98, details: "Unlimited cloud-based scaling", isPortnoxAdvantage: true },
        "High Availability": { supported: true, score: 99, details: "99.99% uptime SLA with global redundancy" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 95,
      easeOfDeployment: 98,
      scalability: 96,
      integrationCapabilities: 94,
      totalCostOfOwnershipScore: 92,
      complianceCoverageScore: 95,
    },

    portnoxSpecificMetrics: {
      zeroTrustMaturityScore: 95,
      riskBasedAuthCoverage: 100,
      continuousMonitoringCoverage: 100,
      automatedRemediationRate: 98,
      is100PercentCloudNative: true,
      agentlessDeploymentPercent: 100,
    },

    strengths: [
      "Fastest deployment in industry (30 minutes to production)",
      "Zero infrastructure requirements - 100% cloud-native",
      "AI-powered risk-based authentication",
      "Comprehensive Zero Trust architecture",
      "No CVEs - secure by design",
      "Vendor-agnostic integration",
      "Dramatic cost savings (65-75% lower TCO)",
      "Automated compliance reporting",
      "Real-time threat response",
      "Unlimited scalability",
    ],

    weaknesses: [
      "Newer market presence compared to legacy vendors",
      "Requires internet connectivity for cloud services",
    ],

    marketPosition: "visionary",
    lastUpdated: "2024-01-15",
    dataSource: "Portnox Official Specifications + Market Analysis",
  },

  {
    id: "cisco_ise",
    name: "Cisco Identity Services Engine",
    vendorType: "Traditional On-Premise NAC",
    logoUrl: "/cisco-logo.png",
    shortDescription: "Enterprise identity services engine with comprehensive policy management",
    description:
      "Cisco ISE is a comprehensive identity and access policy platform that provides centralized authentication, authorization, and accounting (AAA) for users and devices. As the market leader, it offers extensive features but requires significant infrastructure and expertise.",
    marketShare: 35.2,
    customerSatisfaction: 72,

    pricingTiers: [
      {
        userRange: [1, 500],
        pricePerUserPerMonth: 15,
        annualDiscountPercent: 5,
      },
      {
        userRange: [501, 2000],
        pricePerUserPerMonth: 12,
        annualDiscountPercent: 8,
      },
      {
        userRange: [2001, null],
        pricePerUserPerMonth: 10,
        annualDiscountPercent: 12,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 180000,
      hardwareCostPerYear: 45000,
      trainingCostInitial: 35000,
      supportCostFactor: 0.22,
      personnelCostFactor: 2.5, // Requires significant staffing
      hiddenCostFactor: 35, // High hidden costs
    },

    implementation: {
      complexityLevel: "very_high",
      professionalServicesCostFactor: 0.4,
      averageDeploymentTimeDays: 180, // 6 months
      deploymentTime: {
        poc: 720, // 30 days
        fullDeployment: 4320, // 6 months
        fullScale: 5760, // 8 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 65,
      complianceAutomationSavingsFactor: 0.45,
      operationalEfficiencyGainPercent: 35,
      avgPaybackPeriodMonths: 24,
    },

    security: {
      zeroTrustMaturityScore: 70,
      breachRiskReduction: 58,
      cveCount: 47, // 47 CVEs in 3 years
      securityScore: 75,
      vulnerabilityExposure: "high",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Partial",
        automationPercent: 65,
        details: "Manual configuration required for full compliance",
      },
      {
        standardId: "pci_dss",
        coverageLevel: "Covered",
        automationPercent: 70,
        details: "Good PCI DSS support with manual processes",
      },
      {
        standardId: "sox",
        coverageLevel: "Partial",
        automationPercent: 60,
        details: "Limited SOX automation capabilities",
      },
      {
        standardId: "iso27001",
        coverageLevel: "Covered",
        automationPercent: 68,
        details: "ISO 27001 support with significant manual effort",
      },
      { standardId: "nist", coverageLevel: "Covered", automationPercent: 72, details: "NIST framework alignment" },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 85, details: "Comprehensive 802.1X support" },
        "Risk-Based Authentication": { supported: false, score: 0, details: "Limited risk assessment capabilities" },
        "Device Profiling": { supported: true, score: 82, details: "Good device profiling with manual tuning" },
        "Policy Automation": {
          supported: true,
          score: 65,
          details: "Policy automation requires extensive configuration",
        },
        "Guest Access Management": { supported: true, score: 78, details: "Guest portal with customization options" },
        "BYOD Support": { supported: true, score: 75, details: "BYOD support with complex setup" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: false, score: 30, details: "Limited Zero Trust capabilities" },
        "Continuous Monitoring": { supported: true, score: 70, details: "Monitoring with performance impact" },
        "Automated Remediation": { supported: true, score: 60, details: "Basic automated responses" },
        "Behavioral Analytics": { supported: false, score: 25, details: "Limited behavioral analysis" },
        "Threat Intelligence": { supported: true, score: 65, details: "Basic threat intelligence integration" },
        Microsegmentation: { supported: true, score: 72, details: "TrustSec-based segmentation" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: false, score: 0, details: "On-premise appliance-based architecture" },
        "API-First Design": { supported: true, score: 70, details: "REST API available but limited" },
        "Multi-Cloud Support": { supported: false, score: 30, details: "Limited cloud integration" },
        "Vendor Agnostic": { supported: false, score: 40, details: "Best with Cisco infrastructure" },
        "SIEM Integration": { supported: true, score: 75, details: "Good SIEM integration capabilities" },
        "Identity Provider Integration": { supported: true, score: 80, details: "Strong IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 75, details: "Centralized management with complexity" },
        "Automated Reporting": { supported: true, score: 65, details: "Reporting requires configuration" },
        "Self-Service Portal": { supported: true, score: 70, details: "Basic self-service capabilities" },
        "Mobile Management": { supported: true, score: 68, details: "Mobile support with limitations" },
        Scalability: { supported: true, score: 65, details: "Hardware-limited scalability" },
        "High Availability": { supported: true, score: 78, details: "HA requires additional hardware" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 75,
      easeOfDeployment: 35,
      scalability: 65,
      integrationCapabilities: 70,
      totalCostOfOwnershipScore: 40,
      complianceCoverageScore: 68,
    },

    strengths: [
      "Market leader with extensive features",
      "Strong ecosystem integration",
      "Comprehensive policy engine",
      "Enterprise-proven at scale",
      "Extensive third-party integrations",
      "Strong Cisco ecosystem synergy",
    ],

    weaknesses: [
      "Complex deployment (6+ months)",
      "High total cost of ownership",
      "Requires significant expertise",
      "Hardware infrastructure dependency",
      "47 CVEs in recent years",
      "Limited cloud-native capabilities",
      "Vendor lock-in concerns",
      "Performance impact on network",
    ],

    marketPosition: "leader",
    lastUpdated: "2024-01-15",
    dataSource: "Cisco Official Documentation + Industry Analysis",
  },

  {
    id: "aruba_clearpass",
    name: "Aruba ClearPass Policy Manager",
    vendorType: "Traditional NAC with Cloud Options",
    logoUrl: "/aruba-logo.png",
    shortDescription: "Comprehensive network access control with advanced policy enforcement",
    description:
      "Aruba ClearPass provides comprehensive network access control with strong policy management capabilities. It offers both on-premise and cloud deployment options, making it a versatile choice for organizations with Aruba infrastructure.",
    marketShare: 18.7,
    customerSatisfaction: 78,

    pricingTiers: [
      {
        orgSizeTarget: ["small_business", "mid_market"],
        pricePerDevicePerMonth: 10.5,
        annualDiscountPercent: 8,
      },
      {
        orgSizeTarget: ["enterprise", "global_enterprise"],
        pricePerDevicePerMonth: 8.5,
        annualDiscountPercent: 12,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 126000,
      hardwareCostPerYear: 28000,
      trainingCostInitial: 18000,
      supportCostFactor: 0.2,
      personnelCostFactor: 1.5,
      hiddenCostFactor: 22,
    },

    implementation: {
      complexityLevel: "high",
      professionalServicesCostFactor: 0.3,
      averageDeploymentTimeDays: 90, // 3 months
      deploymentTime: {
        poc: 240, // 10 days
        fullDeployment: 2160, // 3 months
        fullScale: 2880, // 4 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 68,
      complianceAutomationSavingsFactor: 0.55,
      operationalEfficiencyGainPercent: 48,
      avgPaybackPeriodMonths: 18,
    },

    security: {
      zeroTrustMaturityScore: 65,
      breachRiskReduction: 62,
      cveCount: 23,
      securityScore: 78,
      vulnerabilityExposure: "medium",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Covered",
        automationPercent: 72,
        details: "Good HIPAA support with some manual processes",
      },
      {
        standardId: "pci_dss",
        coverageLevel: "Covered",
        automationPercent: 75,
        details: "Strong PCI DSS compliance features",
      },
      {
        standardId: "gdpr",
        coverageLevel: "Partial",
        automationPercent: 65,
        details: "GDPR support requires additional configuration",
      },
      {
        standardId: "iso27001",
        coverageLevel: "Covered",
        automationPercent: 70,
        details: "ISO 27001 compliance with manual elements",
      },
      { standardId: "nist", coverageLevel: "Covered", automationPercent: 73, details: "Good NIST framework alignment" },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 88, details: "Excellent 802.1X implementation" },
        "Risk-Based Authentication": { supported: true, score: 65, details: "Basic risk assessment capabilities" },
        "Device Profiling": { supported: true, score: 85, details: "Strong device profiling and classification" },
        "Policy Automation": { supported: true, score: 78, details: "Good policy automation with configuration" },
        "Guest Access Management": { supported: true, score: 82, details: "Comprehensive guest management" },
        "BYOD Support": { supported: true, score: 80, details: "Good BYOD onboarding and management" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: true, score: 55, details: "Limited Zero Trust implementation" },
        "Continuous Monitoring": { supported: true, score: 75, details: "Good monitoring capabilities" },
        "Automated Remediation": { supported: true, score: 68, details: "Automated responses with limitations" },
        "Behavioral Analytics": { supported: true, score: 60, details: "Basic behavioral analysis" },
        "Threat Intelligence": { supported: true, score: 70, details: "Threat intelligence integration" },
        Microsegmentation: { supported: true, score: 75, details: "Dynamic segmentation capabilities" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: false, score: 40, details: "Hybrid cloud options available" },
        "API-First Design": { supported: true, score: 75, details: "Good API coverage" },
        "Multi-Cloud Support": { supported: true, score: 65, details: "Multi-cloud deployment options" },
        "Vendor Agnostic": { supported: true, score: 70, details: "Works with various vendors, best with Aruba" },
        "SIEM Integration": { supported: true, score: 78, details: "Strong SIEM integration" },
        "Identity Provider Integration": { supported: true, score: 82, details: "Excellent IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 80, details: "Unified management interface" },
        "Automated Reporting": { supported: true, score: 75, details: "Comprehensive reporting capabilities" },
        "Self-Service Portal": { supported: true, score: 78, details: "Good self-service options" },
        "Mobile Management": { supported: true, score: 75, details: "Mobile device management" },
        Scalability: { supported: true, score: 72, details: "Good scalability with hardware limits" },
        "High Availability": { supported: true, score: 80, details: "HA clustering available" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 78,
      easeOfDeployment: 60,
      scalability: 72,
      integrationCapabilities: 75,
      totalCostOfOwnershipScore: 58,
      complianceCoverageScore: 72,
    },

    strengths: [
      "Strong policy management engine",
      "Good integration with Aruba ecosystem",
      "Comprehensive feature set",
      "Flexible deployment options",
      "Strong guest access management",
      "Good scalability options",
    ],

    weaknesses: [
      "Complex initial configuration",
      "Requires significant training",
      "Hardware infrastructure needed",
      "Best value with Aruba infrastructure",
      "Limited Zero Trust capabilities",
      "Manual compliance processes",
    ],

    marketPosition: "challenger",
    lastUpdated: "2024-01-15",
    dataSource: "Aruba Official Documentation + Market Research",
  },

  {
    id: "fortinac",
    name: "Fortinet FortiNAC",
    vendorType: "Integrated Security Platform",
    logoUrl: "/fortinet-logo.png",
    shortDescription: "Network access control integrated with Fortinet Security Fabric",
    description:
      "FortiNAC provides network visibility and control as part of the Fortinet Security Fabric. It offers good integration with Fortinet's security ecosystem and provides comprehensive device visibility and policy enforcement.",
    marketShare: 9.8,
    customerSatisfaction: 74,

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 8.5,
        annualDiscountPercent: 6,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 7.2,
        annualDiscountPercent: 10,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 102000,
      hardwareCostPerYear: 22000,
      trainingCostInitial: 15000,
      supportCostFactor: 0.18,
      personnelCostFactor: 1.2,
      hiddenCostFactor: 18,
    },

    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.25,
      averageDeploymentTimeDays: 75, // 2.5 months
      deploymentTime: {
        poc: 168, // 7 days
        fullDeployment: 1800, // 2.5 months
        fullScale: 2400, // 3.3 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 62,
      complianceAutomationSavingsFactor: 0.52,
      operationalEfficiencyGainPercent: 55,
      avgPaybackPeriodMonths: 16,
    },

    security: {
      zeroTrustMaturityScore: 60,
      breachRiskReduction: 58,
      cveCount: 18,
      securityScore: 76,
      vulnerabilityExposure: "medium",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Partial",
        automationPercent: 68,
        details: "HIPAA support with Fortinet ecosystem",
      },
      {
        standardId: "pci_dss",
        coverageLevel: "Covered",
        automationPercent: 72,
        details: "Good PCI DSS compliance integration",
      },
      {
        standardId: "iso27001",
        coverageLevel: "Covered",
        automationPercent: 70,
        details: "ISO 27001 support through Security Fabric",
      },
      { standardId: "nist", coverageLevel: "Covered", automationPercent: 74, details: "NIST framework alignment" },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 82, details: "Good 802.1X support" },
        "Risk-Based Authentication": { supported: true, score: 58, details: "Basic risk assessment" },
        "Device Profiling": { supported: true, score: 85, details: "Strong device visibility and profiling" },
        "Policy Automation": { supported: true, score: 72, details: "Policy automation through Security Fabric" },
        "Guest Access Management": { supported: true, score: 75, details: "Guest portal integration" },
        "BYOD Support": { supported: true, score: 78, details: "BYOD management capabilities" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": {
          supported: true,
          score: 50,
          details: "Limited Zero Trust through Security Fabric",
        },
        "Continuous Monitoring": { supported: true, score: 78, details: "Good monitoring integration" },
        "Automated Remediation": { supported: true, score: 75, details: "Automated responses through FortiGate" },
        "Behavioral Analytics": { supported: true, score: 65, details: "Basic behavioral analysis" },
        "Threat Intelligence": { supported: true, score: 80, details: "Strong threat intelligence integration" },
        Microsegmentation: { supported: true, score: 72, details: "Segmentation through FortiGate" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: false, score: 25, details: "On-premise with cloud management options" },
        "API-First Design": { supported: true, score: 70, details: "API integration available" },
        "Multi-Cloud Support": { supported: true, score: 60, details: "Multi-cloud deployment support" },
        "Vendor Agnostic": { supported: false, score: 45, details: "Best with Fortinet infrastructure" },
        "SIEM Integration": { supported: true, score: 82, details: "Excellent SIEM integration" },
        "Identity Provider Integration": { supported: true, score: 75, details: "Good IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 85, details: "Unified management through FortiManager" },
        "Automated Reporting": { supported: true, score: 78, details: "Comprehensive reporting" },
        "Self-Service Portal": { supported: true, score: 72, details: "Basic self-service capabilities" },
        "Mobile Management": { supported: true, score: 70, details: "Mobile device support" },
        Scalability: { supported: true, score: 75, details: "Good scalability within Fortinet ecosystem" },
        "High Availability": { supported: true, score: 78, details: "HA through Security Fabric" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 76,
      easeOfDeployment: 65,
      scalability: 75,
      integrationCapabilities: 72,
      totalCostOfOwnershipScore: 62,
      complianceCoverageScore: 71,
    },

    strengths: [
      "Strong integration with Fortinet Security Fabric",
      "Good device visibility and control",
      "Comprehensive threat intelligence",
      "Unified management platform",
      "Competitive pricing",
      "Automated response capabilities",
    ],

    weaknesses: [
      "Best value requires Fortinet ecosystem",
      "Limited standalone capabilities",
      "Hardware infrastructure dependency",
      "Complex multi-vendor environments",
      "Limited Zero Trust features",
    ],

    marketPosition: "niche",
    lastUpdated: "2024-01-15",
    dataSource: "Fortinet Official Documentation + Analysis",
  },

  {
    id: "forescout",
    name: "Forescout Platform",
    vendorType: "Device Visibility & Control",
    logoUrl: "/forescout-logo.png",
    shortDescription: "Agentless device visibility and automated control platform",
    description:
      "Forescout provides comprehensive device visibility and control across IT, IoT, and OT environments. Known for its agentless approach and extensive device fingerprinting capabilities, it excels in environments with diverse device types.",
    marketShare: 7.2,
    customerSatisfaction: 76,

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 12.5,
        annualDiscountPercent: 7,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 10.8,
        annualDiscountPercent: 10,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 150000,
      hardwareCostPerYear: 38000,
      trainingCostInitial: 22000,
      supportCostFactor: 0.25,
      personnelCostFactor: 1.8,
      hiddenCostFactor: 28,
    },

    implementation: {
      complexityLevel: "high",
      professionalServicesCostFactor: 0.35,
      averageDeploymentTimeDays: 120, // 4 months
      deploymentTime: {
        poc: 336, // 14 days
        fullDeployment: 2880, // 4 months
        fullScale: 3600, // 5 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 72,
      complianceAutomationSavingsFactor: 0.78,
      operationalEfficiencyGainPercent: 65,
      avgPaybackPeriodMonths: 20,
    },

    security: {
      zeroTrustMaturityScore: 68,
      breachRiskReduction: 68,
      cveCount: 15,
      securityScore: 82,
      vulnerabilityExposure: "medium",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Covered",
        automationPercent: 82,
        details: "Strong HIPAA compliance automation",
      },
      { standardId: "pci_dss", coverageLevel: "Covered", automationPercent: 85, details: "Excellent PCI DSS support" },
      { standardId: "gdpr", coverageLevel: "Covered", automationPercent: 78, details: "Good GDPR compliance features" },
      {
        standardId: "iso27001",
        coverageLevel: "Covered",
        automationPercent: 80,
        details: "ISO 27001 compliance support",
      },
      {
        standardId: "nist",
        coverageLevel: "Covered",
        automationPercent: 83,
        details: "Strong NIST framework alignment",
      },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 75, details: "802.1X support with limitations" },
        "Risk-Based Authentication": {
          supported: true,
          score: 70,
          details: "Risk assessment based on device behavior",
        },
        "Device Profiling": {
          supported: true,
          score: 95,
          details: "Industry-leading device fingerprinting",
          isPortnoxAdvantage: false,
        },
        "Policy Automation": { supported: true, score: 78, details: "Automated policy enforcement" },
        "Guest Access Management": { supported: true, score: 68, details: "Basic guest management" },
        "BYOD Support": { supported: true, score: 72, details: "BYOD visibility and control" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: true, score: 65, details: "Zero Trust principles with device focus" },
        "Continuous Monitoring": {
          supported: true,
          score: 88,
          details: "Excellent continuous monitoring",
          isPortnoxAdvantage: false,
        },
        "Automated Remediation": { supported: true, score: 82, details: "Strong automated response capabilities" },
        "Behavioral Analytics": { supported: true, score: 85, details: "Advanced device behavior analysis" },
        "Threat Intelligence": { supported: true, score: 80, details: "Threat intelligence integration" },
        Microsegmentation: { supported: true, score: 75, details: "Dynamic segmentation capabilities" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: false, score: 30, details: "On-premise with cloud options" },
        "API-First Design": { supported: true, score: 85, details: "Comprehensive API coverage" },
        "Multi-Cloud Support": { supported: true, score: 70, details: "Multi-cloud deployment options" },
        "Vendor Agnostic": { supported: true, score: 88, details: "Excellent vendor agnostic approach" },
        "SIEM Integration": { supported: true, score: 90, details: "Outstanding SIEM integration" },
        "Identity Provider Integration": { supported: true, score: 78, details: "Good IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 85, details: "Unified visibility platform" },
        "Automated Reporting": { supported: true, score: 88, details: "Comprehensive automated reporting" },
        "Self-Service Portal": { supported: true, score: 65, details: "Limited self-service capabilities" },
        "Mobile Management": { supported: true, score: 75, details: "Mobile device visibility" },
        Scalability: { supported: true, score: 82, details: "Good scalability with hardware planning" },
        "High Availability": { supported: true, score: 80, details: "HA deployment options" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 82,
      easeOfDeployment: 45,
      scalability: 75,
      integrationCapabilities: 85,
      totalCostOfOwnershipScore: 48,
      complianceCoverageScore: 82,
    },

    strengths: [
      "Industry-leading device visibility (20M+ fingerprints)",
      "Agentless deployment approach",
      "Excellent IoT and OT device support",
      "Strong compliance automation",
      "Comprehensive threat detection",
      "Vendor-agnostic integration",
    ],

    weaknesses: [
      "Complex implementation and configuration",
      "High total cost of ownership",
      "Requires significant expertise",
      "Limited traditional NAC features",
      "Performance impact on network",
      "Steep learning curve",
    ],

    marketPosition: "niche",
    lastUpdated: "2024-01-15",
    dataSource: "Forescout Official Documentation + Market Analysis",
  },

  {
    id: "juniper_mist",
    name: "Juniper Mist Access Assurance",
    vendorType: "AI-Driven Cloud NAC",
    logoUrl: "/juniper-logo.png",
    shortDescription: "AI-driven access assurance with cloud-native architecture",
    description:
      "Juniper Mist Access Assurance leverages AI and machine learning to provide intelligent network access control. Built on the Mist cloud platform, it offers simplified operations and proactive troubleshooting.",
    marketShare: 3.8,
    customerSatisfaction: 82,

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 6.8,
        annualDiscountPercent: 5,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 5.8,
        annualDiscountPercent: 8,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 81600,
      hardwareCostPerYear: 8000,
      trainingCostInitial: 12000,
      supportCostFactor: 0.15,
      personnelCostFactor: 0.6,
      hiddenCostFactor: 12,
    },

    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.15,
      averageDeploymentTimeDays: 30, // 1 month
      deploymentTime: {
        poc: 72, // 3 days
        fullDeployment: 720, // 1 month
        fullScale: 960, // 1.3 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 75,
      complianceAutomationSavingsFactor: 0.68,
      operationalEfficiencyGainPercent: 72,
      avgPaybackPeriodMonths: 14,
    },

    security: {
      zeroTrustMaturityScore: 78,
      breachRiskReduction: 72,
      cveCount: 8,
      securityScore: 84,
      vulnerabilityExposure: "low",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Covered",
        automationPercent: 78,
        details: "Good HIPAA compliance with AI assistance",
      },
      { standardId: "pci_dss", coverageLevel: "Covered", automationPercent: 80, details: "Strong PCI DSS support" },
      { standardId: "gdpr", coverageLevel: "Covered", automationPercent: 75, details: "GDPR compliance features" },
      {
        standardId: "iso27001",
        coverageLevel: "Covered",
        automationPercent: 82,
        details: "ISO 27001 support with automation",
      },
      {
        standardId: "nist",
        coverageLevel: "Covered",
        automationPercent: 85,
        details: "Excellent NIST framework alignment",
      },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 88, details: "AI-enhanced 802.1X authentication" },
        "Risk-Based Authentication": { supported: true, score: 82, details: "AI-driven risk assessment" },
        "Device Profiling": { supported: true, score: 85, details: "ML-powered device classification" },
        "Policy Automation": { supported: true, score: 88, details: "AI-driven policy automation" },
        "Guest Access Management": { supported: true, score: 80, details: "Streamlined guest management" },
        "BYOD Support": { supported: true, score: 85, details: "Intelligent BYOD onboarding" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: true, score: 75, details: "Zero Trust with AI insights" },
        "Continuous Monitoring": { supported: true, score: 90, details: "AI-powered continuous monitoring" },
        "Automated Remediation": { supported: true, score: 85, details: "Intelligent automated responses" },
        "Behavioral Analytics": { supported: true, score: 88, details: "Advanced AI behavioral analysis" },
        "Threat Intelligence": { supported: true, score: 78, details: "Threat intelligence integration" },
        Microsegmentation: { supported: true, score: 80, details: "Dynamic AI-driven segmentation" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: true, score: 95, details: "Born-in-the-cloud architecture" },
        "API-First Design": { supported: true, score: 88, details: "Comprehensive API coverage" },
        "Multi-Cloud Support": { supported: true, score: 85, details: "Multi-cloud deployment" },
        "Vendor Agnostic": { supported: true, score: 75, details: "Works with various vendors, best with Juniper" },
        "SIEM Integration": { supported: true, score: 82, details: "Good SIEM integration" },
        "Identity Provider Integration": { supported: true, score: 88, details: "Strong IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 92, details: "AI-driven unified management" },
        "Automated Reporting": { supported: true, score: 85, details: "AI-generated insights and reports" },
        "Self-Service Portal": { supported: true, score: 82, details: "Intelligent self-service" },
        "Mobile Management": { supported: true, score: 85, details: "Mobile-first management" },
        Scalability: { supported: true, score: 90, details: "Cloud-native unlimited scaling" },
        "High Availability": { supported: true, score: 95, details: "Cloud-native HA with global presence" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 84,
      easeOfDeployment: 85,
      scalability: 90,
      integrationCapabilities: 82,
      totalCostOfOwnershipScore: 72,
      complianceCoverageScore: 80,
    },

    strengths: [
      "AI-driven operations and troubleshooting",
      "Cloud-native architecture",
      "Simplified management and deployment",
      "Proactive issue resolution",
      "Strong integration with Mist platform",
      "Excellent user experience",
    ],

    weaknesses: [
      "Newer entrant in NAC market",
      "Best value with Juniper infrastructure",
      "Limited standalone deployment options",
      "Requires Mist ecosystem for full benefits",
    ],

    marketPosition: "visionary",
    lastUpdated: "2024-01-15",
    dataSource: "Juniper Official Documentation + Market Research",
  },

  {
    id: "extreme_nac",
    name: "Extreme Networks ExtremeControl",
    vendorType: "Network-Integrated NAC",
    logoUrl: "/extreme-logo.png",
    shortDescription: "NAC solution tightly integrated with Extreme Networks infrastructure",
    description:
      "ExtremeControl provides network access control that's deeply integrated with Extreme Networks switching and wireless infrastructure. It offers good value for organizations already invested in the Extreme ecosystem.",
    marketShare: 4.1,
    customerSatisfaction: 71,

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 7.2,
        annualDiscountPercent: 4,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 6.2,
        annualDiscountPercent: 7,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 86400,
      hardwareCostPerYear: 15000,
      trainingCostInitial: 10000,
      supportCostFactor: 0.16,
      personnelCostFactor: 0.8,
      hiddenCostFactor: 15,
    },

    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.2,
      averageDeploymentTimeDays: 85, // 2.8 months
      deploymentTime: {
        poc: 168, // 7 days
        fullDeployment: 2040, // 2.8 months
        fullScale: 2520, // 3.5 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 58,
      complianceAutomationSavingsFactor: 0.42,
      operationalEfficiencyGainPercent: 45,
      avgPaybackPeriodMonths: 19,
    },

    security: {
      zeroTrustMaturityScore: 55,
      breachRiskReduction: 52,
      cveCount: 12,
      securityScore: 68,
      vulnerabilityExposure: "medium",
    },

    complianceSupport: [
      { standardId: "hipaa", coverageLevel: "Partial", automationPercent: 58, details: "Basic HIPAA support" },
      { standardId: "pci_dss", coverageLevel: "Covered", automationPercent: 65, details: "Good PCI DSS compliance" },
      { standardId: "iso27001", coverageLevel: "Partial", automationPercent: 60, details: "Limited ISO 27001 support" },
      { standardId: "nist", coverageLevel: "Covered", automationPercent: 68, details: "NIST framework support" },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 78, details: "Good 802.1X support" },
        "Risk-Based Authentication": { supported: false, score: 35, details: "Limited risk assessment" },
        "Device Profiling": { supported: true, score: 72, details: "Basic device profiling" },
        "Policy Automation": { supported: true, score: 68, details: "Policy automation with Extreme fabric" },
        "Guest Access Management": { supported: true, score: 75, details: "Guest portal integration" },
        "BYOD Support": { supported: true, score: 70, details: "Basic BYOD support" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: false, score: 30, details: "Limited Zero Trust capabilities" },
        "Continuous Monitoring": { supported: true, score: 65, details: "Basic monitoring capabilities" },
        "Automated Remediation": { supported: true, score: 60, details: "Limited automated responses" },
        "Behavioral Analytics": { supported: false, score: 25, details: "No behavioral analysis" },
        "Threat Intelligence": { supported: true, score: 55, details: "Basic threat intelligence" },
        Microsegmentation: { supported: true, score: 65, details: "Fabric-based segmentation" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: true, score: 70, details: "Cloud management available" },
        "API-First Design": { supported: true, score: 65, details: "API integration available" },
        "Multi-Cloud Support": { supported: true, score: 60, details: "Limited multi-cloud support" },
        "Vendor Agnostic": { supported: false, score: 40, details: "Best with Extreme infrastructure" },
        "SIEM Integration": { supported: true, score: 68, details: "Basic SIEM integration" },
        "Identity Provider Integration": { supported: true, score: 72, details: "Good IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 75, details: "Unified management with ExtremeCloud" },
        "Automated Reporting": { supported: true, score: 65, details: "Basic reporting capabilities" },
        "Self-Service Portal": { supported: true, score: 68, details: "Limited self-service options" },
        "Mobile Management": { supported: true, score: 65, details: "Basic mobile support" },
        Scalability: { supported: true, score: 68, details: "Good scalability within Extreme ecosystem" },
        "High Availability": { supported: true, score: 72, details: "HA through fabric integration" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 68,
      easeOfDeployment: 70,
      scalability: 68,
      integrationCapabilities: 65,
      totalCostOfOwnershipScore: 68,
      complianceCoverageScore: 63,
    },

    strengths: [
      "Good integration with Extreme ecosystem",
      "Competitive pricing for existing customers",
      "Cloud management options",
      "Fabric automation capabilities",
      "Simplified deployment with Extreme infrastructure",
    ],

    weaknesses: [
      "Limited to Extreme network environments",
      "Basic feature set compared to leaders",
      "No advanced security analytics",
      "Limited Zero Trust capabilities",
      "Narrow market focus",
    ],

    marketPosition: "niche",
    lastUpdated: "2024-01-15",
    dataSource: "Extreme Networks Documentation + Analysis",
  },

  {
    id: "cisco_meraki",
    name: "Cisco Meraki Systems Manager",
    vendorType: "Cloud-Managed Security",
    logoUrl: "/meraki-logo.png",
    shortDescription: "Cloud-managed network security with integrated access control",
    description:
      "Cisco Meraki provides cloud-managed networking with integrated security features. While not a dedicated NAC solution, it offers access control capabilities as part of its comprehensive networking platform.",
    marketShare: 12.3,
    customerSatisfaction: 79,

    pricingTiers: [
      {
        orgSizeTarget: ["small_business", "mid_market"],
        pricePerDevicePerMonth: 8.5,
        annualDiscountPercent: 5,
      },
      {
        orgSizeTarget: ["enterprise", "global_enterprise"],
        pricePerDevicePerMonth: 7.2,
        annualDiscountPercent: 8,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 102000,
      hardwareCostPerYear: 25000,
      trainingCostInitial: 8000,
      supportCostFactor: 0.12,
      personnelCostFactor: 0.5,
      hiddenCostFactor: 12,
    },

    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.18,
      averageDeploymentTimeDays: 30, // 1 month
      deploymentTime: {
        poc: 72, // 3 days
        fullDeployment: 720, // 1 month
        fullScale: 960, // 1.3 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 55,
      complianceAutomationSavingsFactor: 0.45,
      operationalEfficiencyGainPercent: 62,
      avgPaybackPeriodMonths: 17,
    },

    security: {
      zeroTrustMaturityScore: 50,
      breachRiskReduction: 48,
      cveCount: 9,
      securityScore: 72,
      vulnerabilityExposure: "low",
    },

    complianceSupport: [
      { standardId: "hipaa", coverageLevel: "Partial", automationPercent: 52, details: "Basic HIPAA support" },
      { standardId: "pci_dss", coverageLevel: "Covered", automationPercent: 62, details: "Good PCI DSS support" },
      { standardId: "gdpr", coverageLevel: "Partial", automationPercent: 55, details: "Limited GDPR features" },
      { standardId: "iso27001", coverageLevel: "Covered", automationPercent: 58, details: "ISO 27001 basic support" },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 75, details: "Good 802.1X support" },
        "Risk-Based Authentication": { supported: false, score: 25, details: "No risk-based authentication" },
        "Device Profiling": { supported: true, score: 68, details: "Basic device classification" },
        "Policy Automation": { supported: true, score: 72, details: "Policy automation through cloud dashboard" },
        "Guest Access Management": { supported: true, score: 82, details: "Excellent guest portal" },
        "BYOD Support": { supported: true, score: 78, details: "Good BYOD management" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: false, score: 20, details: "No Zero Trust architecture" },
        "Continuous Monitoring": { supported: true, score: 70, details: "Cloud-based monitoring" },
        "Automated Remediation": { supported: true, score: 65, details: "Basic automated responses" },
        "Behavioral Analytics": { supported: false, score: 15, details: "No behavioral analytics" },
        "Threat Intelligence": { supported: true, score: 68, details: "Basic threat intelligence" },
        Microsegmentation: { supported: true, score: 60, details: "VLAN-based segmentation" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: true, score: 85, details: "Cloud-managed platform" },
        "API-First Design": { supported: true, score: 80, details: "Good API coverage" },
        "Multi-Cloud Support": { supported: true, score: 75, details: "Multi-cloud deployment" },
        "Vendor Agnostic": { supported: false, score: 30, details: "Requires Meraki infrastructure" },
        "SIEM Integration": { supported: true, score: 70, details: "Basic SIEM integration" },
        "Identity Provider Integration": { supported: true, score: 78, details: "Good IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 88, details: "Excellent unified dashboard" },
        "Automated Reporting": { supported: true, score: 75, details: "Good reporting capabilities" },
        "Self-Service Portal": { supported: true, score: 80, details: "Good self-service options" },
        "Mobile Management": { supported: true, score: 85, details: "Excellent mobile management" },
        Scalability: { supported: true, score: 82, details: "Good cloud-based scalability" },
        "High Availability": { supported: true, score: 88, details: "Cloud-native HA" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 65,
      easeOfDeployment: 82,
      scalability: 82,
      integrationCapabilities: 70,
      totalCostOfOwnershipScore: 68,
      complianceCoverageScore: 57,
    },

    strengths: [
      "Easy cloud-based management",
      "Good for distributed organizations",
      "Integrated networking and security",
      "Excellent user experience",
      "Strong guest access management",
      "Rapid deployment capabilities",
    ],

    weaknesses: [
      "Limited dedicated NAC features",
      "Requires Meraki infrastructure",
      "No advanced security analytics",
      "Vendor lock-in concerns",
      "Limited policy granularity",
      "Not suitable for complex NAC requirements",
    ],

    marketPosition: "challenger",
    lastUpdated: "2024-01-15",
    dataSource: "Cisco Meraki Documentation + Market Analysis",
  },

  {
    id: "microsoft_nps",
    name: "Microsoft Network Policy Server",
    vendorType: "Ecosystem Integration",
    logoUrl: "/microsoft-logo.png",
    shortDescription: "Microsoft ecosystem NAC using NPS, Intune, and Conditional Access",
    description:
      "Microsoft NPS provides network access control through integration with Windows Server, Intune, and Azure AD Conditional Access. It's a cost-effective solution for organizations heavily invested in the Microsoft ecosystem.",
    marketShare: 15.6,
    customerSatisfaction: 68,

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 5.2,
        annualDiscountPercent: 3,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 4.5,
        annualDiscountPercent: 5,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 62400,
      hardwareCostPerYear: 8000,
      trainingCostInitial: 6000,
      supportCostFactor: 0.1,
      personnelCostFactor: 0.6,
      hiddenCostFactor: 10,
    },

    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.12,
      averageDeploymentTimeDays: 45, // 1.5 months
      deploymentTime: {
        poc: 168, // 7 days
        fullDeployment: 1080, // 1.5 months
        fullScale: 1440, // 2 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 58,
      complianceAutomationSavingsFactor: 0.65,
      operationalEfficiencyGainPercent: 55,
      avgPaybackPeriodMonths: 15,
    },

    security: {
      zeroTrustMaturityScore: 65,
      breachRiskReduction: 55,
      cveCount: 6,
      securityScore: 70,
      vulnerabilityExposure: "low",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Covered",
        automationPercent: 68,
        details: "HIPAA support through Microsoft ecosystem",
      },
      {
        standardId: "gdpr",
        coverageLevel: "Covered",
        automationPercent: 75,
        details: "Strong GDPR compliance with Azure AD",
      },
      {
        standardId: "sox",
        coverageLevel: "Covered",
        automationPercent: 72,
        details: "SOX compliance through audit trails",
      },
      {
        standardId: "iso27001",
        coverageLevel: "Covered",
        automationPercent: 70,
        details: "ISO 27001 support with Microsoft tools",
      },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 78, details: "Good 802.1X support through NPS" },
        "Risk-Based Authentication": {
          supported: true,
          score: 72,
          details: "Risk assessment through Conditional Access",
        },
        "Device Profiling": { supported: true, score: 70, details: "Device profiling through Intune" },
        "Policy Automation": { supported: true, score: 75, details: "Policy automation through Azure AD" },
        "Guest Access Management": { supported: false, score: 35, details: "Limited guest management capabilities" },
        "BYOD Support": { supported: true, score: 82, details: "Excellent BYOD through Intune" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: true, score: 78, details: "Zero Trust through Microsoft Security" },
        "Continuous Monitoring": { supported: true, score: 75, details: "Monitoring through Microsoft Defender" },
        "Automated Remediation": { supported: true, score: 68, details: "Automated responses through Intune" },
        "Behavioral Analytics": { supported: true, score: 70, details: "User behavior analytics in Azure AD" },
        "Threat Intelligence": { supported: true, score: 82, details: "Strong threat intelligence through Microsoft" },
        Microsegmentation: { supported: false, score: 40, details: "Limited network segmentation" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: true, score: 85, details: "Cloud-native through Azure" },
        "API-First Design": { supported: true, score: 80, details: "Good API coverage through Graph API" },
        "Multi-Cloud Support": { supported: true, score: 70, details: "Multi-cloud with limitations" },
        "Vendor Agnostic": { supported: false, score: 45, details: "Best with Microsoft ecosystem" },
        "SIEM Integration": { supported: true, score: 85, details: "Excellent integration with Microsoft Sentinel" },
        "Identity Provider Integration": { supported: true, score: 95, details: "Native Azure AD integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 82, details: "Unified management through Microsoft 365" },
        "Automated Reporting": { supported: true, score: 78, details: "Good reporting through Power BI" },
        "Self-Service Portal": { supported: true, score: 75, details: "Self-service through MyApps portal" },
        "Mobile Management": { supported: true, score: 88, details: "Excellent mobile management through Intune" },
        Scalability: { supported: true, score: 85, details: "Cloud-based unlimited scaling" },
        "High Availability": { supported: true, score: 90, details: "Enterprise-grade HA through Azure" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 70,
      easeOfDeployment: 75,
      scalability: 85,
      integrationCapabilities: 80,
      totalCostOfOwnershipScore: 75,
      complianceCoverageScore: 71,
    },

    strengths: [
      "Cost-effective for Microsoft customers",
      "Strong integration with Microsoft ecosystem",
      "Excellent endpoint compliance through Intune",
      "Good Zero Trust capabilities",
      "Comprehensive identity management",
      "Strong threat intelligence",
    ],

    weaknesses: [
      "Windows-centric approach",
      "Limited non-Windows device support",
      "Complex NPS scaling requirements",
      "Not a dedicated NAC solution",
      "Limited network-level controls",
      "Requires multiple Microsoft licenses",
    ],

    marketPosition: "challenger",
    lastUpdated: "2024-01-15",
    dataSource: "Microsoft Official Documentation + Market Analysis",
  },

  {
    id: "packetfence",
    name: "PacketFence Open Source NAC",
    vendorType: "Open Source",
    logoUrl: "/packetfence-logo.png",
    shortDescription: "Open-source network access control with enterprise support options",
    description:
      "PacketFence is a fully featured, open-source NAC solution that provides comprehensive network access control capabilities. While free to use, it requires significant expertise and resources for implementation and maintenance.",
    marketShare: 2.1,
    customerSatisfaction: 65,

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 0,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 3.5, // Enterprise support
        annualDiscountPercent: 0,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 0, // Open source
      hardwareCostPerYear: 15000,
      trainingCostInitial: 8000,
      supportCostFactor: 0,
      personnelCostFactor: 2.5, // High expertise required
      hiddenCostFactor: 8,
    },

    implementation: {
      complexityLevel: "very_high",
      professionalServicesCostFactor: 0,
      averageDeploymentTimeDays: 150, // 5 months
      deploymentTime: {
        poc: 720, // 30 days
        fullDeployment: 3600, // 5 months
        fullScale: 4320, // 6 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 48,
      complianceAutomationSavingsFactor: 0.25,
      operationalEfficiencyGainPercent: 28,
      avgPaybackPeriodMonths: 30,
    },

    security: {
      zeroTrustMaturityScore: 45,
      breachRiskReduction: 42,
      cveCount: 5,
      securityScore: 65,
      vulnerabilityExposure: "medium",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Partial",
        automationPercent: 45,
        details: "Basic HIPAA support with manual configuration",
      },
      { standardId: "pci_dss", coverageLevel: "Partial", automationPercent: 40, details: "Limited PCI DSS automation" },
      { standardId: "iso27001", coverageLevel: "Partial", automationPercent: 42, details: "Basic ISO 27001 support" },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 75, details: "Good 802.1X support" },
        "Risk-Based Authentication": { supported: false, score: 25, details: "No risk-based authentication" },
        "Device Profiling": { supported: true, score: 68, details: "Basic device profiling" },
        "Policy Automation": { supported: true, score: 55, details: "Manual policy configuration required" },
        "Guest Access Management": { supported: true, score: 70, details: "Guest portal available" },
        "BYOD Support": { supported: true, score: 65, details: "Basic BYOD support" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: false, score: 20, details: "No Zero Trust capabilities" },
        "Continuous Monitoring": { supported: true, score: 60, details: "Basic monitoring capabilities" },
        "Automated Remediation": { supported: true, score: 45, details: "Limited automated responses" },
        "Behavioral Analytics": { supported: false, score: 15, details: "No behavioral analytics" },
        "Threat Intelligence": { supported: false, score: 20, details: "No threat intelligence integration" },
        Microsegmentation: { supported: true, score: 55, details: "Basic VLAN segmentation" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: false, score: 10, details: "On-premise only" },
        "API-First Design": { supported: true, score: 60, details: "Basic API available" },
        "Multi-Cloud Support": { supported: false, score: 15, details: "No cloud support" },
        "Vendor Agnostic": { supported: true, score: 85, details: "Excellent vendor agnostic approach" },
        "SIEM Integration": { supported: true, score: 65, details: "Basic SIEM integration" },
        "Identity Provider Integration": { supported: true, score: 70, details: "Good IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 60, details: "Basic management interface" },
        "Automated Reporting": { supported: true, score: 50, details: "Limited reporting capabilities" },
        "Self-Service Portal": { supported: true, score: 55, details: "Basic self-service" },
        "Mobile Management": { supported: true, score: 45, details: "Limited mobile support" },
        Scalability: { supported: true, score: 65, details: "Good scalability with proper hardware" },
        "High Availability": { supported: true, score: 60, details: "HA requires manual configuration" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 55,
      easeOfDeployment: 25,
      scalability: 65,
      integrationCapabilities: 65,
      totalCostOfOwnershipScore: 45, // Hidden costs in expertise
      complianceCoverageScore: 42,
    },

    strengths: [
      "No licensing costs (open source)",
      "Highly customizable",
      "Strong community support",
      "Full source code access",
      "Vendor agnostic approach",
      "No vendor lock-in",
    ],

    weaknesses: [
      "Very complex setup and configuration",
      "Requires significant Linux expertise",
      "Limited enterprise support options",
      "High operational overhead",
      "No advanced security features",
      "Steep learning curve",
    ],

    marketPosition: "niche",
    lastUpdated: "2024-01-15",
    dataSource: "PacketFence Community + Open Source Analysis",
  },

  {
    id: "foxpass",
    name: "Foxpass Cloud RADIUS",
    vendorType: "Cloud Authentication Service",
    logoUrl: "/foxpass-logo.png",
    shortDescription: "Cloud-hosted RADIUS and LDAP service for Wi-Fi and VPN authentication",
    description:
      "Foxpass provides simple, cloud-hosted RADIUS and LDAP services primarily for Wi-Fi and VPN authentication. It's designed for small to medium businesses that need basic authentication without complex NAC features.",
    marketShare: 1.8,
    customerSatisfaction: 82,

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 3.5,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 4.2,
        annualDiscountPercent: 0,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 42000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 2000,
      supportCostFactor: 0.05,
      personnelCostFactor: 0.2,
      hiddenCostFactor: 3,
    },

    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0.05,
      averageDeploymentTimeDays: 5, // Less than 1 week
      deploymentTime: {
        poc: 8, // 8 hours
        fullDeployment: 120, // 5 days
        fullScale: 120,
      },
    },

    roiFactors: {
      incidentReductionPercent: 35,
      complianceAutomationSavingsFactor: 0.22,
      operationalEfficiencyGainPercent: 42,
      avgPaybackPeriodMonths: 12,
    },

    security: {
      zeroTrustMaturityScore: 25,
      breachRiskReduction: 28,
      cveCount: 2,
      securityScore: 58,
      vulnerabilityExposure: "low",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Partial",
        automationPercent: 25,
        details: "Basic HIPAA authentication only",
      },
      { standardId: "gdpr", coverageLevel: "Partial", automationPercent: 30, details: "Limited GDPR compliance" },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 78, details: "Good 802.1X RADIUS support" },
        "Risk-Based Authentication": { supported: false, score: 0, details: "No risk assessment capabilities" },
        "Device Profiling": { supported: false, score: 15, details: "No device profiling" },
        "Policy Automation": { supported: false, score: 20, details: "No policy automation" },
        "Guest Access Management": { supported: false, score: 10, details: "No guest management" },
        "BYOD Support": { supported: true, score: 65, details: "Basic BYOD authentication" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: false, score: 5, details: "No Zero Trust capabilities" },
        "Continuous Monitoring": { supported: false, score: 15, details: "No monitoring capabilities" },
        "Automated Remediation": { supported: false, score: 5, details: "No automated responses" },
        "Behavioral Analytics": { supported: false, score: 0, details: "No behavioral analytics" },
        "Threat Intelligence": { supported: false, score: 5, details: "No threat intelligence" },
        Microsegmentation: { supported: false, score: 10, details: "No segmentation capabilities" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: true, score: 95, details: "Pure cloud service" },
        "API-First Design": { supported: true, score: 75, details: "Good API for basic functions" },
        "Multi-Cloud Support": { supported: true, score: 85, details: "Works with any cloud" },
        "Vendor Agnostic": { supported: true, score: 90, details: "Excellent vendor agnostic" },
        "SIEM Integration": { supported: false, score: 25, details: "Limited SIEM integration" },
        "Identity Provider Integration": { supported: true, score: 85, details: "Good IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 70, details: "Simple web dashboard" },
        "Automated Reporting": { supported: false, score: 30, details: "Basic logging only" },
        "Self-Service Portal": { supported: false, score: 20, details: "No self-service capabilities" },
        "Mobile Management": { supported: false, score: 25, details: "No mobile management" },
        Scalability: { supported: true, score: 88, details: "Excellent cloud scalability" },
        "High Availability": { supported: true, score: 85, details: "Cloud-native HA" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 35,
      easeOfDeployment: 95,
      scalability: 88,
      integrationCapabilities: 70,
      totalCostOfOwnershipScore: 85,
      complianceCoverageScore: 28,
    },

    strengths: [
      "Extremely simple setup (hours not days)",
      "Very cost-effective for basic needs",
      "Cloud-hosted RADIUS/LDAP service",
      "Good for small to medium businesses",
      "No infrastructure requirements",
      "Excellent vendor agnostic approach",
    ],

    weaknesses: [
      "Very limited NAC features",
      "No device profiling or visibility",
      "No policy enforcement capabilities",
      "Authentication only (no authorization)",
      "No advanced security features",
      "Not suitable for enterprise requirements",
    ],

    marketPosition: "niche",
    lastUpdated: "2024-01-15",
    dataSource: "Foxpass Official Documentation + SMB Analysis",
  },

  {
    id: "securew2",
    name: "SecureW2 Cloud PKI",
    vendorType: "Certificate Management Platform",
    logoUrl: "/securew2-logo.png",
    shortDescription: "Cloud-based PKI and certificate management for secure wireless networks",
    description:
      "SecureW2 specializes in cloud-based PKI and certificate management for secure wireless networks. It focuses on EAP-TLS authentication and certificate lifecycle management rather than comprehensive NAC capabilities.",
    marketShare: 2.3,
    customerSatisfaction: 78,

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 5.2,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 5.8,
        annualDiscountPercent: 0,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 62400,
      hardwareCostPerYear: 0,
      trainingCostInitial: 3500,
      supportCostFactor: 0.08,
      personnelCostFactor: 0.3,
      hiddenCostFactor: 5,
    },

    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0.08,
      averageDeploymentTimeDays: 15, // 2 weeks
      deploymentTime: {
        poc: 48, // 2 days
        fullDeployment: 360, // 15 days
        fullScale: 480, // 20 days
      },
    },

    roiFactors: {
      incidentReductionPercent: 42,
      complianceAutomationSavingsFactor: 0.32,
      operationalEfficiencyGainPercent: 48,
      avgPaybackPeriodMonths: 14,
    },

    security: {
      zeroTrustMaturityScore: 55,
      breachRiskReduction: 45,
      cveCount: 3,
      securityScore: 72,
      vulnerabilityExposure: "low",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Partial",
        automationPercent: 38,
        details: "HIPAA support through certificate security",
      },
      {
        standardId: "pci_dss",
        coverageLevel: "Covered",
        automationPercent: 45,
        details: "PCI DSS support for wireless security",
      },
      {
        standardId: "gdpr",
        coverageLevel: "Partial",
        automationPercent: 35,
        details: "Limited GDPR compliance features",
      },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": {
          supported: true,
          score: 88,
          details: "Excellent EAP-TLS certificate authentication",
        },
        "Risk-Based Authentication": { supported: false, score: 15, details: "No risk assessment capabilities" },
        "Device Profiling": { supported: false, score: 25, details: "Limited device identification" },
        "Policy Automation": { supported: false, score: 30, details: "No policy automation" },
        "Guest Access Management": { supported: false, score: 20, details: "No guest management" },
        "BYOD Support": { supported: true, score: 82, details: "Excellent BYOD certificate management" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: false, score: 25, details: "Certificate-based security only" },
        "Continuous Monitoring": { supported: false, score: 20, details: "No monitoring capabilities" },
        "Automated Remediation": { supported: false, score: 15, details: "No automated responses" },
        "Behavioral Analytics": { supported: false, score: 5, details: "No behavioral analytics" },
        "Threat Intelligence": { supported: false, score: 10, details: "No threat intelligence" },
        Microsegmentation: { supported: false, score: 15, details: "No segmentation capabilities" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: true, score: 90, details: "Cloud-based PKI service" },
        "API-First Design": { supported: true, score: 78, details: "Good API for certificate management" },
        "Multi-Cloud Support": { supported: true, score: 82, details: "Multi-cloud PKI deployment" },
        "Vendor Agnostic": { supported: true, score: 85, details: "Works with any wireless infrastructure" },
        "SIEM Integration": { supported: false, score: 30, details: "Limited SIEM integration" },
        "Identity Provider Integration": {
          supported: true,
          score: 80,
          details: "Good IdP integration for certificates",
        },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 75, details: "Certificate management dashboard" },
        "Automated Reporting": { supported: true, score: 68, details: "Certificate lifecycle reporting" },
        "Self-Service Portal": { supported: true, score: 78, details: "User certificate self-service" },
        "Mobile Management": { supported: true, score: 82, details: "Mobile certificate deployment" },
        Scalability: { supported: true, score: 85, details: "Cloud-based certificate scaling" },
        "High Availability": { supported: true, score: 88, details: "Cloud-native HA for PKI" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 65,
      easeOfDeployment: 82,
      scalability: 85,
      integrationCapabilities: 75,
      totalCostOfOwnershipScore: 72,
      complianceCoverageScore: 39,
    },

    strengths: [
      "Excellent certificate management",
      "Strong EAP-TLS authentication",
      "Cloud-based PKI infrastructure",
      "Good BYOD certificate deployment",
      "Easy wireless security implementation",
      "Vendor agnostic approach",
    ],

    weaknesses: [
      "Limited to certificate-based authentication",
      "No comprehensive NAC features",
      "No device visibility or profiling",
      "No policy enforcement beyond certificates",
      "Premium pricing for limited functionality",
      "Not suitable for full NAC requirements",
    ],

    marketPosition: "niche",
    lastUpdated: "2024-01-15",
    dataSource: "SecureW2 Official Documentation + PKI Analysis",
  },

  {
    id: "arista_agni",
    name: "Arista AGNI",
    vendorType: "Cloud-Native Platform",
    logoUrl: "/arista-logo.png",
    shortDescription: "Cloud-native NAC service integrated with Arista CloudVision platform",
    description:
      "Arista AGNI provides cloud-native network access control as part of the Arista CloudVision platform. It offers good integration with Arista's networking infrastructure and provides modern cloud-based management.",
    marketShare: 2.5,
    customerSatisfaction: 79,

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 7.8,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 8.5,
        annualDiscountPercent: 0,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 93600,
      hardwareCostPerYear: 5000,
      trainingCostInitial: 8000,
      supportCostFactor: 0.18,
      personnelCostFactor: 0.5,
      hiddenCostFactor: 10,
    },

    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.18,
      averageDeploymentTimeDays: 40, // 1.3 months
      deploymentTime: {
        poc: 120, // 5 days
        fullDeployment: 960, // 1.3 months
        fullScale: 1200, // 1.7 months
      },
    },

    roiFactors: {
      incidentReductionPercent: 68,
      complianceAutomationSavingsFactor: 0.62,
      operationalEfficiencyGainPercent: 65,
      avgPaybackPeriodMonths: 15,
    },

    security: {
      zeroTrustMaturityScore: 75,
      breachRiskReduction: 65,
      cveCount: 4,
      securityScore: 82,
      vulnerabilityExposure: "low",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "Covered",
        automationPercent: 72,
        details: "Good HIPAA support with CloudVision",
      },
      { standardId: "pci_dss", coverageLevel: "Covered", automationPercent: 75, details: "Strong PCI DSS compliance" },
      { standardId: "gdpr", coverageLevel: "Covered", automationPercent: 68, details: "GDPR compliance features" },
      { standardId: "iso27001", coverageLevel: "Covered", automationPercent: 78, details: "ISO 27001 support" },
      {
        standardId: "nist",
        coverageLevel: "Covered",
        automationPercent: 80,
        details: "Excellent NIST framework alignment",
      },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": { supported: true, score: 85, details: "Strong 802.1X support" },
        "Risk-Based Authentication": { supported: true, score: 75, details: "Risk assessment through CloudVision" },
        "Device Profiling": { supported: true, score: 82, details: "Good device profiling and classification" },
        "Policy Automation": { supported: true, score: 85, details: "Policy automation through CloudVision" },
        "Guest Access Management": { supported: true, score: 78, details: "Guest management integration" },
        "BYOD Support": { supported: true, score: 82, details: "Good BYOD management" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: true, score: 72, details: "Zero Trust through CloudVision" },
        "Continuous Monitoring": { supported: true, score: 88, details: "Excellent monitoring through CloudVision" },
        "Automated Remediation": { supported: true, score: 80, details: "Automated responses through platform" },
        "Behavioral Analytics": { supported: true, score: 75, details: "Behavioral analysis capabilities" },
        "Threat Intelligence": { supported: true, score: 78, details: "Threat intelligence integration" },
        Microsegmentation: { supported: true, score: 85, details: "Dynamic segmentation through Arista switches" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: true, score: 88, details: "Cloud-native through CloudVision" },
        "API-First Design": { supported: true, score: 85, details: "Comprehensive API coverage" },
        "Multi-Cloud Support": { supported: true, score: 80, details: "Multi-cloud deployment support" },
        "Vendor Agnostic": { supported: false, score: 55, details: "Best with Arista infrastructure" },
        "SIEM Integration": { supported: true, score: 82, details: "Good SIEM integration" },
        "Identity Provider Integration": { supported: true, score: 85, details: "Strong IdP integration" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 90, details: "Unified CloudVision management" },
        "Automated Reporting": { supported: true, score: 85, details: "Comprehensive reporting through CloudVision" },
        "Self-Service Portal": { supported: true, score: 78, details: "Good self-service capabilities" },
        "Mobile Management": { supported: true, score: 80, details: "Mobile management support" },
        Scalability: { supported: true, score: 88, details: "Excellent cloud-based scalability" },
        "High Availability": { supported: true, score: 90, details: "Cloud-native HA with global presence" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 82,
      easeOfDeployment: 78,
      scalability: 88,
      integrationCapabilities: 80,
      totalCostOfOwnershipScore: 68,
      complianceCoverageScore: 75,
    },

    strengths: [
      "Deep integration with Arista CloudVision",
      "Cloud-native architecture",
      "Strong for data center and campus networks",
      "Excellent scalability and performance",
      "Good automation capabilities",
      "Modern management interface",
    ],

    weaknesses: [
      "Best value requires Arista infrastructure",
      "Newer entrant in NAC market",
      "Limited standalone deployment options",
      "Higher pricing compared to some alternatives",
      "Requires CloudVision ecosystem",
    ],

    marketPosition: "visionary",
    lastUpdated: "2024-01-15",
    dataSource: "Arista Official Documentation + CloudVision Analysis",
  },

  {
    id: "ivanti_neurons",
    name: "Ivanti Neurons (formerly Pulse Secure)",
    vendorType: "Legacy VPN/NAC Platform",
    logoUrl: "/ivanti-logo.png",
    shortDescription: "⚠️ CRITICAL SECURITY RISK - Active nation-state exploitation",
    description:
      "⚠️ CRITICAL WARNING: Ivanti Neurons (formerly Pulse Secure) has been subject to active nation-state exploitation with multiple zero-day vulnerabilities. IMMEDIATE MIGRATION REQUIRED. This platform poses significant security risks and should not be considered for new deployments.",
    marketShare: 1.2,
    customerSatisfaction: 35, // Severely impacted by security issues

    pricingTiers: [
      {
        userRange: [1, 1000],
        pricePerUserPerMonth: 8.5,
        annualDiscountPercent: 0,
      },
      {
        userRange: [1001, null],
        pricePerUserPerMonth: 7.2,
        annualDiscountPercent: 0,
      },
    ],

    tcoFactors: {
      licensingCostPerYear: 102000,
      hardwareCostPerYear: 25000,
      trainingCostInitial: 15000,
      supportCostFactor: 0.25,
      personnelCostFactor: 2.0, // High due to security management overhead
      hiddenCostFactor: 45, // Very high due to security risks
    },

    implementation: {
      complexityLevel: "very_high",
      professionalServicesCostFactor: 0.4,
      averageDeploymentTimeDays: 120, // 4 months
      deploymentTime: {
        poc: 480, // 20 days
        fullDeployment: 2880, // 4 months
        fullScale: 3600, // 5 months
      },
    },

    roiFactors: {
      incidentReductionPercent: -15, // NEGATIVE due to security vulnerabilities
      complianceAutomationSavingsFactor: 0.15,
      operationalEfficiencyGainPercent: 20,
      avgPaybackPeriodMonths: 48, // Very long due to security costs
    },

    security: {
      zeroTrustMaturityScore: 25,
      breachRiskReduction: -25, // NEGATIVE - increases risk
      cveCount: 85, // Extremely high number of vulnerabilities
      securityScore: 15, // Very low due to active exploitation
      vulnerabilityExposure: "critical",
    },

    complianceSupport: [
      {
        standardId: "hipaa",
        coverageLevel: "NotCovered",
        automationPercent: 20,
        details: "⚠️ HIPAA compliance compromised by security vulnerabilities",
      },
      {
        standardId: "pci_dss",
        coverageLevel: "NotCovered",
        automationPercent: 25,
        details: "⚠️ PCI DSS compliance at risk due to vulnerabilities",
      },
      {
        standardId: "gdpr",
        coverageLevel: "NotCovered",
        automationPercent: 15,
        details: "⚠️ GDPR compliance compromised",
      },
      { standardId: "sox", coverageLevel: "NotCovered", automationPercent: 18, details: "⚠️ SOX compliance at risk" },
    ],

    features: {
      coreNAC: {
        "802.1X Authentication": {
          supported: true,
          score: 45,
          details: "⚠️ Authentication compromised by vulnerabilities",
        },
        "Risk-Based Authentication": { supported: false, score: 10, details: "No risk assessment capabilities" },
        "Device Profiling": { supported: true, score: 40, details: "⚠️ Device profiling security concerns" },
        "Policy Automation": { supported: true, score: 35, details: "⚠️ Policy automation with security risks" },
        "Guest Access Management": {
          supported: true,
          score: 30,
          details: "⚠️ Guest access poses additional security risks",
        },
        "BYOD Support": { supported: true, score: 25, details: "⚠️ BYOD support compromised by vulnerabilities" },
      },
      advancedSecurity: {
        "Zero Trust Architecture": { supported: false, score: 5, details: "No Zero Trust capabilities" },
        "Continuous Monitoring": { supported: true, score: 20, details: "⚠️ Monitoring capabilities compromised" },
        "Automated Remediation": { supported: false, score: 15, details: "Limited automated responses" },
        "Behavioral Analytics": { supported: false, score: 10, details: "No behavioral analytics" },
        "Threat Intelligence": { supported: false, score: 5, details: "No threat intelligence integration" },
        Microsegmentation: { supported: true, score: 25, details: "⚠️ Segmentation security concerns" },
      },
      cloudAndIntegration: {
        "100% Cloud Native": { supported: false, score: 15, details: "Legacy on-premise architecture" },
        "API-First Design": { supported: true, score: 40, details: "⚠️ API security concerns" },
        "Multi-Cloud Support": { supported: false, score: 20, details: "Limited cloud support" },
        "Vendor Agnostic": { supported: true, score: 60, details: "Works with various vendors" },
        "SIEM Integration": { supported: true, score: 35, details: "⚠️ SIEM integration with security risks" },
        "Identity Provider Integration": { supported: true, score: 45, details: "⚠️ IdP integration security concerns" },
      },
      managementAndOperations: {
        "Single Pane of Glass": { supported: true, score: 40, details: "⚠️ Management interface security risks" },
        "Automated Reporting": { supported: true, score: 35, details: "⚠️ Reporting with security concerns" },
        "Self-Service Portal": { supported: true, score: 30, details: "⚠️ Self-service portal security risks" },
        "Mobile Management": { supported: true, score: 25, details: "⚠️ Mobile management compromised" },
        Scalability: { supported: true, score: 50, details: "Scalability with security overhead" },
        "High Availability": { supported: true, score: 30, details: "⚠️ HA with security vulnerabilities" },
      },
    },

    comparativeScores: {
      securityEffectiveness: 15, // Extremely low due to vulnerabilities
      easeOfDeployment: 35,
      scalability: 50,
      integrationCapabilities: 45,
      totalCostOfOwnershipScore: 25, // Very low due to security costs
      complianceCoverageScore: 20, // Very low due to compliance risks
    },

    strengths: [
      "⚠️ WARNING: No current strengths due to critical security vulnerabilities",
      "Legacy VPN capabilities (compromised)",
      "Some integration options (security risks)",
    ],

    weaknesses: [
      "⚠️ CRITICAL: Active nation-state exploitation",
      "⚠️ CRITICAL: Multiple zero-day vulnerabilities",
      "⚠️ CRITICAL: Immediate security risk to organizations",
      "⚠️ CRITICAL: Compliance violations likely",
      "⚠️ CRITICAL: Data breach exposure",
      "Legacy architecture with security flaws",
      "High operational security overhead",
      "Reputation damage from security incidents",
      "Regulatory scrutiny and potential fines",
      "Insurance coverage may be voided",
    ],

    marketPosition: "niche", // Should be avoided
    lastUpdated: "2024-01-15",
    dataSource: "⚠️ CISA Alerts + Security Incident Reports + Vulnerability Databases",
  },
]

// Export the comprehensive data as the main vendor data
export const VENDOR_DATA = COMPREHENSIVE_VENDOR_DATA
export const allVendorsData = new Map(VENDOR_DATA.map((vendor) => [vendor.id, vendor]))

// Utility function to get vendor by ID
export const getVendorDataById = (vendorId: VendorId): NewVendorData | undefined => {
  return VENDOR_DATA.find((vendor) => vendor.id === vendorId)
}

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
  "ivanti_neurons",
] as const

// Market intelligence data
export const MARKET_INTELLIGENCE = {
  trends: {
    cloudAdoption: "Accelerating rapidly - 78% of new NAC deployments are cloud-first",
    zeroTrust: "Becoming mandatory - 89% of enterprises planning Zero Trust by 2025",
    traditionalNAC: "Declining relevance - 65% planning to replace legacy solutions",
    aiIntegration: "Emerging requirement - 72% want AI-powered security analytics",
  },

  disruption: {
    portnoxImpact: "Forcing 50%+ price reductions across traditional vendors",
    deploymentExpectations: "Days not months - new baseline expectation",
    simplicity: "Zero-touch deployment becoming standard",
    cloudNative: "100% cloud-native architecture now preferred",
  },

  customerShift: {
    from: "Complex on-premise appliances with 6+ month deployments",
    to: "Cloud-native simplicity with instant deployment",
    driver: "Total cost of ownership and business agility",
    timeline: "Accelerated by remote work and digital transformation",
  },

  competitiveAnalysis: {
    portnoxAdvantage: "65-87% lower TCO with superior security and instant deployment",
    traditionalChallenges: "High costs, complex deployment, security vulnerabilities",
    marketResponse: "Legacy vendors struggling to match cloud-native benefits",
  },
}

// Vulnerability comparison data
export const VULNERABILITY_COMPARISON = {
  portnox: { cveCount: 0, riskLevel: "none", description: "Secure by design - zero CVEs" },
  cisco_ise: { cveCount: 47, riskLevel: "high", description: "47 CVEs in 3 years (15 critical)" },
  aruba_clearpass: { cveCount: 23, riskLevel: "medium", description: "23 CVEs with regular patches" },
  fortinac: { cveCount: 18, riskLevel: "medium", description: "18 CVEs, integrated security updates" },
  forescout: { cveCount: 15, riskLevel: "medium", description: "15 CVEs, agentless reduces exposure" },
  juniper_mist: { cveCount: 8, riskLevel: "low", description: "8 CVEs, cloud-native security" },
  extreme_nac: { cveCount: 12, riskLevel: "medium", description: "12 CVEs, fabric integration" },
  cisco_meraki: { cveCount: 9, riskLevel: "low", description: "9 CVEs, cloud-managed updates" },
  microsoft_nps: { cveCount: 6, riskLevel: "low", description: "6 CVEs, Microsoft ecosystem security" },
  packetfence: { cveCount: 5, riskLevel: "medium", description: "5 CVEs, open source transparency" },
  foxpass: { cveCount: 2, riskLevel: "low", description: "2 CVEs, simple service model" },
  securew2: { cveCount: 3, riskLevel: "low", description: "3 CVEs, certificate-focused security" },
  arista_agni: { cveCount: 4, riskLevel: "low", description: "4 CVEs, CloudVision security" },
  ivanti_neurons: { cveCount: 85, riskLevel: "critical", description: "⚠️ CRITICAL: Active nation-state exploitation" },
}

// TCO comparison data (5,000 devices, 5 years)
export const TCO_COMPARISON_BASELINE = {
  portnox: 272000,
  foxpass: 450000,
  securew2: 520000,
  aruba_clearpass: 625000,
  extreme_nac: 750000,
  microsoft_nps: 680000,
  juniper_mist: 580000,
  cisco_meraki: 720000,
  fortinac: 850000,
  forescout: 975000,
  arista_agni: 780000,
  packetfence: 650000, // Hidden costs in expertise
  cisco_ise: 2010000,
  ivanti_neurons: 1850000, // High due to security overhead
}
