"use client"
import type { OrgSizeId } from "@/types/common"

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

export interface NewVendorData {
  id: VendorId
  name: string
  vendorType: string
  logoUrl?: string
  shortDescription?: string
  description: string
  pricingTiers?: VendorPricingTier[]
  tcoFactors: VendorTCOFactors
  implementation: VendorImplementationMetrics
  roiFactors: VendorROIFactors
  complianceSupport: {
    standardId: string
    coveragePercent: number
    coverageLevel?: "Covered" | "Partial" | "NotCovered"
    automationPercent?: number
    details?: string
  }[]
  comparativeScores?: {
    securityScore: number
    usabilityScore: number
    scalabilityScore: number
    supportScore: number
    complianceCoverageScore: number
  }
  portnoxSpecificMetrics?: {
    zeroTrustMaturityScore: number
    riskBasedAuthCoverage: number
    continuousMonitoringCoverage: number
    automatedRemediationRate: number
    is100PercentCloudNative: boolean
    agentlessDeploymentPercent: number
  }
  features: {
    coreNAC: Record<string, { score?: number; details?: string; isPortnoxAdvantage?: boolean }>
    advancedSecurity: Record<string, { score?: number; details?: string; isPortnoxAdvantage?: boolean }>
    cloudModern: Record<string, { score?: number; details?: string; isPortnoxAdvantage?: boolean }>
    compliance: Record<string, { score?: number; details?: string; isPortnoxAdvantage?: boolean }>
  }
  strengths?: string[]
  weaknesses?: string[]
}

// Enhanced vendor data with all 14 vendors
const COMPREHENSIVE_VENDOR_DATA: NewVendorData[] = [
  {
    id: "portnox",
    name: "Portnox CLEAR",
    vendorType: "Cloud-Native Zero Trust NAC",
    logoUrl: "/portnox-logo-color.png",
    shortDescription: "AI-powered, cloud-native Zero Trust Network Access Control with risk-based authentication",
    description: "AI-powered, cloud-native Zero Trust Network Access Control with risk-based authentication and continuous compliance monitoring",
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
      licensingCostPerYear: 45000,
      hardwareCostPerYear: 0,
      trainingCostInitial: 2500,
      supportCostFactor: 0.15,
      personnelCostFactor: 0.25,
      hiddenCostFactor: 5,
    },
    implementation: {
      complexityLevel: "low",
      professionalServicesCostFactor: 0.1,
      averageDeploymentTimeDays: 7,
      deploymentTime: {
        poc: 24,
        fullDeployment: 168,
        fullScale: 168,
      },
    },
    roiFactors: {
      incidentReductionPercent: 98,
      complianceAutomationSavingsFactor: 0.92,
      operationalEfficiencyGainPercent: 85,
      avgPaybackPeriodMonths: 12,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 95, coverageLevel: "Covered", automationPercent: 90, details: "Automated compliance reporting and audit trails" },
      { standardId: "pci_dss", coveragePercent: 92, coverageLevel: "Covered", automationPercent: 88, details: "Network segmentation and access controls" },
      { standardId: "gdpr", coveragePercent: 88, coverageLevel: "Covered", automationPercent: 85, details: "Data protection and privacy controls" },
      { standardId: "sox", coveragePercent: 90, coverageLevel: "Covered", automationPercent: 87, details: "Financial controls and audit logging" },
      { standardId: "iso27001", coveragePercent: 93, coverageLevel: "Covered", automationPercent: 90, details: "Security management and risk assessment" },
      { standardId: "nist", coveragePercent: 91, coverageLevel: "Covered", automationPercent: 89, details: "Security controls and continuous monitoring" },
      { standardId: "fedramp", coveragePercent: 89, coverageLevel: "Covered", automationPercent: 85, details: "Government security requirements" },
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
      riskBasedAuthCoverage: 100,
      continuousMonitoringCoverage: 100,
      automatedRemediationRate: 98,
      is100PercentCloudNative: true,
      agentlessDeploymentPercent: 100,
    },
    features: {
      coreNAC: {
        wirelessNAC: { score: 98, details: "Advanced wireless access control", isPortnoxAdvantage: true },
        wiredNAC: { score: 96, details: "Comprehensive wired network control" },
        dot1x: { score: 95, details: "IEEE 802.1X authentication" },
        macAuth: { score: 94, details: "MAC address authentication" },
        webAuth: { score: 93, details: "Web-based authentication portal" },
        certificateAuth: { score: 97, details: "Certificate-based authentication", isPortnoxAdvantage: true },
      },
      advancedSecurity: {
        riskBasedAccess: { score: 98, details: "AI-powered risk assessment", isPortnoxAdvantage: true },
        zeroTrust: { score: 95, details: "Zero Trust architecture", isPortnoxAdvantage: true },
        deviceTrust: { score: 96, details: "Device trust scoring" },
        behaviorAnalytics: { score: 94, details: "User behavior analysis", isPortnoxAdvantage: true },
        threatDetection: { score: 93, details: "Real-time threat detection" },
      },
      cloudModern: {
        cloudNative: { score: 100, details: "100% cloud-native architecture", isPortnoxAdvantage: true },
        apiAccess: { score: 95, details: "Comprehensive API access" },
        multiTenant: { score: 94, details: "Multi-tenant support" },
        scalability: { score: 96, details: "Infinite cloud scalability", isPortnoxAdvantage: true },
      },
      compliance: {
        continuousCompliance: { score: 98, details: "Continuous compliance monitoring", isPortnoxAdvantage: true },
        automatedReporting: { score: 95, details: "Automated compliance reporting" },
        auditTrails: { score: 94, details: "Comprehensive audit logging" },
        policyEnforcement: { score: 96, details: "Automated policy enforcement" },
      },
    },
    strengths: [
      "Zero infrastructure requirements - pure SaaS deployment",
      "30-minute deployment vs 6-9 months for traditional solutions",
      "95% Zero Trust maturity score vs 75% industry average",
      "98% automated remediation rate",
      "67% lower TCO than traditional NAC solutions",
      "AI-powered risk-based authentication",
      "Continuous compliance monitoring and reporting",
      "No CVEs - secure by design architecture"
    ],
    weaknesses: [
      "Newer market presence compared to legacy vendors",
      "May require change management for traditional IT teams"
    ]
  },
  {
    id: "cisco_ise",
    name: "Cisco Identity Services Engine",
    vendorType: "Traditional Enterprise NAC",
    logoUrl: "/cisco-logo.png",
    shortDescription: "Enterprise-grade identity services engine with comprehensive policy management",
    description: "Enterprise-grade identity services engine with comprehensive policy management and network access control",
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
      hardwareCostPerYear: 85000,
      trainingCostInitial: 25000,
      supportCostFactor: 0.22,
      personnelCostFactor: 2.5,
      hiddenCostFactor: 35,
    },
    implementation: {
      complexityLevel: "very_high",
      professionalServicesCostFactor: 0.4,
      averageDeploymentTimeDays: 120,
      deploymentTime: {
        poc: 240,
        fullDeployment: 4320,
        fullScale: 4320,
      },
    },
    roiFactors: {
      incidentReductionPercent: 85,
      complianceAutomationSavingsFactor: 0.35,
      operationalEfficiencyGainPercent: 45,
      avgPaybackPeriodMonths: 24,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 78, coverageLevel: "Partial", automationPercent: 35, details: "Basic compliance reporting" },
      { standardId: "pci_dss", coveragePercent: 82, coverageLevel: "Covered", automationPercent: 40, details: "Network access controls" },
      { standardId: "gdpr", coveragePercent: 75, coverageLevel: "Partial", automationPercent: 30, details: "Limited data protection features" },
      { standardId: "sox", coveragePercent: 80, coverageLevel: "Covered", automationPercent: 38, details: "Audit trails and logging" },
      { standardId: "iso27001", coveragePercent: 83, coverageLevel: "Covered", automationPercent: 42, details: "Security controls framework" },
      { standardId: "nist", coveragePercent: 85, coverageLevel: "Covered", automationPercent: 45, details: "NIST security controls" },
    ],
    comparativeScores: {
      securityScore: 85,
      usabilityScore: 65,
      scalabilityScore: 78,
      supportScore: 82,
      complianceCoverageScore: 80,
    },
    features: {
      coreNAC: {
        wirelessNAC: { score: 85, details: "Comprehensive wireless control" },
        wiredNAC: { score: 88, details: "Strong wired network access control" },
        dot1x: { score: 90, details: "Robust 802.1X implementation" },
        macAuth: { score: 82, details: "MAC address authentication" },
        webAuth: { score: 80, details: "Web portal authentication" },
        certificateAuth: { score: 85, details: "Certificate management" },
      },
      advancedSecurity: {
        riskBasedAccess: { score: 45, details: "Limited risk-based features" },
        zeroTrust: { score: 60, details: "Basic zero trust capabilities" },
        deviceTrust: { score: 75, details: "Device profiling and trust" },
        behaviorAnalytics: { score: 40, details: "Limited behavioral analysis" },
        threatDetection: { score: 70, details: "Basic threat detection" },
      },
      cloudModern: {
        cloudNative: { score: 30, details: "Primarily on-premise solution" },
        apiAccess: { score: 75, details: "REST API available" },
        multiTenant: { score: 45, details: "Limited multi-tenancy" },
        scalability: { score: 65, details: "Hardware-dependent scaling" },
      },
      compliance: {
        continuousCompliance: { score: 50, details: "Manual compliance processes" },
        automatedReporting: { score: 60, details: "Basic reporting capabilities" },
        auditTrails: { score: 80, details: "Comprehensive audit logging" },
        policyEnforcement: { score: 85, details: "Strong policy enforcement" },
      },
    },
    strengths: [
      "Market leader with 25.3% market share",
      "Comprehensive feature set for large enterprises",
      "Strong integration with Cisco ecosystem",
      "Mature product with extensive documentation",
      "Large partner and support ecosystem"
    ],
    weaknesses: [
      "Complex deployment requiring 6-9 months",
      "High total cost of ownership",
      "Requires dedicated hardware infrastructure",
      "Complex licensing model (Base/Plus/Apex)",
      "47 CVEs in the last 3 years (15 critical)",
      "Requires 2.5 FTE for management",
      "Limited cloud-native capabilities"
    ]
  },
  {
    id: "aruba_clearpass",
    name: "Aruba ClearPass Policy Manager",
    vendorType: "Traditional Enterprise NAC",
    logoUrl: "/aruba-logo.png",
    shortDescription: "Comprehensive network access control with advanced policy enforcement",
    description: "Comprehensive network access control with advanced policy enforcement and device management",
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
      hardwareCostPerYear: 55000,
      trainingCostInitial: 15000,
      supportCostFactor: 0.2,
      personnelCostFactor: 1.5,
      hiddenCostFactor: 20,
    },
    implementation: {
      complexityLevel: "high",
      professionalServicesCostFactor: 0.3,
      averageDeploymentTimeDays: 90,
      deploymentTime: {
        poc: 168,
        fullDeployment: 3240,
        fullScale: 3240,
      },
    },
    roiFactors: {
      incidentReductionPercent: 80,
      complianceAutomationSavingsFactor: 0.45,
      operationalEfficiencyGainPercent: 58,
      avgPaybackPeriodMonths: 20,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 82, coverageLevel: "Covered", automationPercent: 45, details: "Policy enforcement and audit trails" },
      { standardId: "pci_dss", coveragePercent: 85, coverageLevel: "Covered", automationPercent: 50, details: "Network segmentation controls" },
      { standardId: "gdpr", coveragePercent: 78, coverageLevel: "Partial", automationPercent: 42, details: "Data protection features" },
      { standardId: "iso27001", coveragePercent: 80, coverageLevel: "Covered", automationPercent: 48, details: "Security management controls" },
      { standardId: "nist", coveragePercent: 83, coverageLevel: "Covered", automationPercent: 52, details: "NIST framework support" },
    ],
    comparativeScores: {
      securityScore: 82,
      usabilityScore: 72,
      scalabilityScore: 75,
      supportScore: 78,
      complianceCoverageScore: 82,
    },
    features: {
      coreNAC: {
        wirelessNAC: { score: 88, details: "Strong wireless access control" },
        wiredNAC: { score: 85, details: "Comprehensive wired NAC" },
        dot1x: { score: 87, details: "Robust 802.1X support" },
        macAuth: { score: 80, details: "MAC authentication" },
        webAuth: { score: 82, details: "Web-based authentication" },
        certificateAuth: { score: 83, details: "Certificate management" },
      },
      advancedSecurity: {
        riskBasedAccess: { score: 55, details: "Basic risk assessment" },
        zeroTrust: { score: 65, details: "Limited zero trust features" },
        deviceTrust: { score: 78, details: "Device profiling and trust" },
        behaviorAnalytics: { score: 50, details: "Basic behavioral analysis" },
        threatDetection: { score: 72, details: "Threat detection capabilities" },
      },
      cloudModern: {
        cloudNative: { score: 45, details: "Hybrid deployment model" },
        apiAccess: { score: 78, details: "REST API support" },
        multiTenant: { score: 60, details: "Multi-tenant capabilities" },
        scalability: { score: 70, details: "Good scalability options" },
      },
      compliance: {
        continuousCompliance: { score: 60, details: "Periodic compliance checks" },
        automatedReporting: { score: 65, details: "Automated reporting features" },
        auditTrails: { score: 82, details: "Comprehensive audit logging" },
        policyEnforcement: { score: 85, details: "Strong policy enforcement" },
      },
    },
    strengths: [
      "Best value traditional NAC solution",
      "88% customer satisfaction rating",
      "Strong policy management capabilities",
      "Good integration with Aruba infrastructure",
      "Comprehensive device profiling"
    ],
    weaknesses: [
      "3-6 month deployment timeline",
      "Requires hardware appliances",
      "Complex policy configuration",
      "Limited cloud-native features",
      "Requires 1.5 FTE for management"
    ]
  },
  {
    id: "fortinac",
    name: "FortiNAC",
    vendorType: "Integrated Security Platform",
    logoUrl: "/fortinet-logo.png",
    shortDescription: "Network access control integrated with Fortinet Security Fabric",
    description: "Network access control integrated with Fortinet Security Fabric for comprehensive security",
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
      hardwareCostPerYear: 45000,
      trainingCostInitial: 12000,
      supportCostFactor: 0.18,
      personnelCostFactor: 1.2,
      hiddenCostFactor: 18,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.25,
      averageDeploymentTimeDays: 75,
      deploymentTime: {
        poc: 120,
        fullDeployment: 2700,
        fullScale: 2700,
      },
    },
    roiFactors: {
      incidentReductionPercent: 75,
      complianceAutomationSavingsFactor: 0.50,
      operationalEfficiencyGainPercent: 62,
      avgPaybackPeriodMonths: 18,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 75, coverageLevel: "Partial", automationPercent: 40, details: "Basic healthcare compliance" },
      { standardId: "pci_dss", coveragePercent: 80, coverageLevel: "Covered", automationPercent: 45, details: "Payment card security" },
      { standardId: "iso27001", coveragePercent: 78, coverageLevel: "Covered", automationPercent: 42, details: "Security management" },
      { standardId: "nist", coveragePercent: 82, coverageLevel: "Covered", automationPercent: 48, details: "NIST cybersecurity framework" },
    ],
    comparativeScores: {
      securityScore: 78,
      usabilityScore: 70,
      scalabilityScore: 72,
      supportScore: 75,
      complianceCoverageScore: 79,
    },
    features: {
      coreNAC: {
        wirelessNAC: { score: 80, details: "Wireless access control" },
        wiredNAC: { score: 82, details: "Wired network control" },
        dot1x: { score: 78, details: "802.1X authentication" },
        macAuth: { score: 75, details: "MAC address authentication" },
        webAuth: { score: 77, details: "Web portal authentication" },
        certificateAuth: { score: 80, details: "Certificate-based auth" },
      },
      advancedSecurity: {
        riskBasedAccess: { score: 60, details: "Basic risk assessment" },
        zeroTrust: { score: 70, details: "Security fabric integration" },
        deviceTrust: { score: 75, details: "Device profiling" },
        behaviorAnalytics: { score: 55, details: "Limited behavioral analysis" },
        threatDetection: { score: 78, details: "Integrated threat detection" },
      },
      cloudModern: {
        cloudNative: { score: 40, details: "Primarily on-premise" },
        apiAccess: { score: 72, details: "API integration available" },
        multiTenant: { score: 55, details: "Limited multi-tenancy" },
        scalability: { score: 68, details: "Moderate scalability" },
      },
      compliance: {
        continuousCompliance: { score: 55, details: "Periodic compliance monitoring" },
        automatedReporting: { score: 60, details: "Basic reporting" },
        auditTrails: { score: 75, details: "Audit logging capabilities" },
        policyEnforcement: { score: 80, details: "Policy enforcement" },
      },
    },
    strengths: [
      "Strong integration with Fortinet Security Fabric",
      "Good price-to-performance ratio",
      "Comprehensive threat protection",
      "Unified security management",
      "Strong firewall integration"
    ],
    weaknesses: [
      "Limited standalone capabilities",
      "Requires Fortinet ecosystem for full value",
      "75-day deployment timeline",
      "Limited cloud-native features"
    ]
  },
  {
    id: "forescout",
    name: "Forescout Platform",
    vendorType: "Device Visibility & Control",
    logoUrl: "/forescout-logo.png",
    shortDescription: "Agentless device visibility and automated control platform",
    description: "Agentless device visibility and automated control platform with comprehensive device intelligence",
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
      hardwareCostPerYear: 75000,
      trainingCostInitial: 18000,
      supportCostFactor: 0.25,
      personnelCostFactor: 2.0,
      hiddenCostFactor: 25,
    },
    implementation: {
      complexityLevel: "high",
      professionalServicesCostFactor: 0.35,
      averageDeploymentTimeDays: 105,
      deploymentTime: {
        poc: 192,
        fullDeployment: 3600,
        fullScale: 3600,
      },
    },
    roiFactors: {
      incidentReductionPercent: 82,
      complianceAutomationSavingsFactor: 0.65,
      operationalEfficiencyGainPercent: 72,
      avgPaybackPeriodMonths: 22,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 88, coverageLevel: "Covered", automationPercent: 65, details: "Healthcare device compliance" },
      { standardId: "pci_dss", coveragePercent: 90, coverageLevel: "Covered", automationPercent: 70, details: "Payment security compliance" },
      { standardId: "gdpr", coveragePercent: 85, coverageLevel: "Covered", automationPercent: 60, details: "Data protection compliance" },
      { standardId: "iso27001", coveragePercent: 87, coverageLevel: "Covered", automationPercent: 68, details: "Security management" },
      { standardId: "nist", coveragePercent: 89, coverageLevel: "Covered", automationPercent: 72, details: "NIST framework compliance" },
    ],
    comparativeScores: {
      securityScore: 88,
      usabilityScore: 68,
      scalabilityScore: 82,
      supportScore: 80,
      complianceCoverageScore: 88,
    },
    features: {
      coreNAC: {
        wirelessNAC: { score: 85, details: "Wireless device control" },
        wiredNAC: { score: 90, details: "Comprehensive wired control" },
        dot1x: { score: 75, details: "802.1X support" },
        macAuth: { score: 88, details: "MAC-based authentication" },
        webAuth: { score: 70, details: "Limited web authentication" },
        certificateAuth: { score: 72, details: "Basic certificate support" },
      },
      advancedSecurity: {
        riskBasedAccess: { score: 85, details: "Advanced risk assessment" },
        zeroTrust: { score: 75, details: "Zero trust principles" },
        deviceTrust: { score: 95, details: "Comprehensive device intelligence" },
        behaviorAnalytics: { score: 88, details: "Device behavior analysis" },
        threatDetection: { score: 90, details: "Advanced threat detection" },
      },
      cloudModern: {
        cloudNative: { score: 50, details: "Hybrid deployment model" },
        apiAccess: { score: 85, details: "Comprehensive API" },
        multiTenant: { score: 65, details: "Multi-tenant support" },
        scalability: { score: 80, details: "Good scalability" },
      },
      compliance: {
        continuousCompliance: { score: 90, details: "Continuous compliance monitoring" },
        automatedReporting: { score: 85, details: "Automated compliance reporting" },
        auditTrails: { score: 88, details: "Comprehensive audit trails" },
        policyEnforcement: { score: 85, details: "Automated policy enforcement" },
      },
    },
    strengths: [
      "20M+ device fingerprints in database",
      "Agentless device discovery and control",
      "Strong IoT and OT device support",
      "Comprehensive device intelligence",
      "Excellent compliance automation"
    ],
    weaknesses: [
      "High total cost of ownership",
      "Complex deployment (105 days)",
      "Requires significant hardware investment",
      "Limited traditional NAC features",
      "Requires 2.0 FTE for management"
    ]
  },
  {
    id: "juniper_mist",
    name: "Juniper Mist Access Assurance",
    vendorType: "AI-Driven Cloud NAC",
    logoUrl: "/juniper-logo.png",
    shortDescription: "AI-driven access assurance with cloud-native architecture",
    description: "AI-driven access assurance with cloud-native architecture and machine learning capabilities",
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
      hardwareCostPerYear: 35000,
      trainingCostInitial: 8000,
      supportCostFactor: 0.15,
      personnelCostFactor: 0.5,
      hiddenCostFactor: 12,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.15,
      averageDeploymentTimeDays: 30,
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
      { standardId: "hipaa", coveragePercent: 85, coverageLevel: "Covered", automationPercent: 75, details: "AI-driven compliance monitoring" },
      { standardId: "pci_dss", coveragePercent: 88, coverageLevel: "Covered", automationPercent: 80, details: "Automated policy enforcement" },
      { standardId: "gdpr", coveragePercent: 82, coverageLevel: "Covered", automationPercent: 72, details: "Privacy controls" },
      { standardId: "iso27001", coveragePercent: 86, coverageLevel: "Covered", automationPercent: 78, details: "Security automation" },
      { standardId: "nist", coveragePercent: 89, coverageLevel: "Covered", automationPercent: 82, details: "Continuous monitoring" },
    ],
    comparativeScores: {
      securityScore: 88,
      usabilityScore: 85,
      scalabilityScore: 90,
      supportScore: 82,
      complianceCoverageScore: 86,
    },
    features: {
      coreNAC: {
        wirelessNAC: { score: 92, details: "AI-driven wireless control" },
        wiredNAC: { score: 88, details: "Comprehensive wired NAC" },
        dot1x: { score: 90, details: "Advanced 802.1X" },
        macAuth: { score: 85, details: "MAC authentication" },
        webAuth: { score: 87, details: "Web portal authentication" },
        certificateAuth: { score: 89, details: "Certificate management" },
      },
      advancedSecurity: {
        riskBasedAccess: { score: 88, details: "AI-powered risk assessment" },
        zeroTrust: { score: 85, details: "Zero trust architecture" },
        deviceTrust: { score: 90, details: "ML-based device profiling" },
        behaviorAnalytics: { score: 92, details: "Advanced behavioral analysis" },
        threatDetection: { score: 88, details: "AI threat detection" },
      },
      cloudModern: {
        cloudNative: { score: 90, details: "Cloud-native architecture" },
        apiAccess: { score: 88, details: "Comprehensive APIs" },
        multiTenant: { score: 85, details: "Multi-tenant support" },
        scalability: { score: 92, details: "Cloud scalability" },
      },
      compliance: {
        continuousCompliance: { score: 85, details: "AI-driven compliance" },
        automatedReporting: { score: 88, details: "Automated reporting" },
        auditTrails: { score: 85, details: "Comprehensive logging" },
        policyEnforcement: { score: 90, details: "AI policy enforcement" },
      },
    },
    strengths: [
      "AI-driven network operations",
      "Cloud-native architecture",
      "30-day deployment timeline",
      "Strong machine learning capabilities",
      "Excellent user experience"
    ],
    weaknesses: [
      "Requires Mist ecosystem for full functionality",
      "Newer to the NAC market",
      "Limited third-party integrations",
      "Vendor lock-in to Juniper infrastructure"
    ]
  },
  {
    id: "extreme_nac",
    name: "Extreme Networks ExtremeControl",
    vendorType: "Network-Integrated NAC",
    logoUrl: "/extreme-logo.png",
    shortDescription: "NAC solution tightly integrated with Extreme Networks infrastructure",
    description: "NAC solution tightly integrated with Extreme Networks infrastructure for unified management",
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
      hardwareCostPerYear: 25000,
      trainingCostInitial: 8000,
      supportCostFactor: 0.16,
      personnelCostFactor: 0.8,
      hiddenCostFactor: 15,
    },
    implementation: {
      complexityLevel: "medium",
      professionalServicesCostFactor: 0.2,
      averageDeploymentTimeDays: 60,
      deploymentTime: {
        poc: 120,
        fullDeployment: 3060,
        fullScale: 3060,
      },
    },
    roiFactors: {
      incidentReductionPercent: 65,
      complianceAutomationSavingsFactor: 0.25,
      operationalEfficiencyGainPercent: 52,
      avgPaybackPeriodMonths: 21,
    },
    complianceSupport: [
      { standardId: "hipaa", coveragePercent: 68, coverageLevel: "Partial", automationPercent: 25, details: "Basic healthcare compliance" },
      { standardId: "pci_dss", coveragePercent: 72, coverageLevel: "Partial", automationPercent: 30, details: "Payment security controls" },
      { standardId: "iso27001", coveragePercent: 70, coverageLevel: "Partial", automationPercent: 28, details: "Security management" },
      { standardId: "nist", coveragePercent: 75, coverageLevel: "Covered", automationPercent: 32, details:\
