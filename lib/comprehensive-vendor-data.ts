export interface FeatureMatrix {
  core: {
    networkAccess: boolean
    deviceProfiling: boolean
    policyEnforcement: boolean
    guestAccess: boolean
    byod: boolean
    iot: boolean
    compliance: boolean
    reporting: boolean
    integration: boolean
    cloudNative: boolean
  }
  advanced: {
    aiMl: boolean
    zeroTrust: boolean
    automation: boolean
    api: boolean
    multiTenant: boolean
    federation: boolean
    riskScoring: boolean
    behaviorAnalytics: boolean
  }
  security: {
    threatDetection: boolean
    incidentResponse: boolean
    forensics: boolean
    encryption: boolean
    certificateManagement: boolean
    vulnerabilityAssessment: boolean
  }
}

export const CORE_FEATURES: Record<keyof FeatureMatrix["core"], string> = {
  networkAccess: "Network Access Control",
  deviceProfiling: "Device Profiling",
  policyEnforcement: "Policy Enforcement",
  guestAccess: "Guest Access",
  byod: "BYOD Support",
  iot: "IoT Security",
  compliance: "Compliance Module",
  reporting: "Advanced Reporting",
  integration: "Broad Integration",
  cloudNative: "Cloud-Native",
}

export interface VendorPricing {
  model: "per-device" | "per-user" | "per-site" | "enterprise"
  tiers: {
    [key: string]: {
      name: string
      price: number
      streetPrice?: string
      features: string[]
    }
  }
  hardware?: {
    [key: string]: {
      name: string
      listPrice: number
      capacity: string
    }
  }
  professionalServices: {
    quickStart: number
    advanced: number
    migration: number
  }
  supportCost: number // as a percentage of license cost
}

export interface VendorImplementation {
  deploymentTime: {
    pilot: string
    fullDeployment: string
  }
  complexity: "low" | "medium" | "high"
  hardwareRequired: boolean
  professionalServicesRequired: boolean
}

export interface VendorData {
  id: string
  name: string
  category: "enterprise" | "mid-market" | "sme" | "cloud-native"
  description: string
  marketPosition: "leader" | "challenger" | "visionary" | "niche"
  logoPath: string
  features: FeatureMatrix
  pricing: VendorPricing
  implementation: VendorImplementation
  compliance: {
    frameworks: string[]
    certifications: string[]
    automationLevel: number
    auditReadiness: number
  }
  hiddenCosts: {
    fteRequirement: number
    commonIssues: string[]
  }
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    category: "cloud-native",
    description: "AI-powered cloud-native NAC with zero-trust architecture and rapid deployment",
    marketPosition: "visionary",
    logoPath: "/portnox-logo.png",
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: true,
        compliance: true,
        reporting: true,
        integration: true,
        cloudNative: true,
      },
      advanced: {
        aiMl: true,
        zeroTrust: true,
        automation: true,
        api: true,
        multiTenant: true,
        federation: true,
        riskScoring: true,
        behaviorAnalytics: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        forensics: true,
        encryption: true,
        certificateManagement: true,
        vulnerabilityAssessment: true,
      },
    },
    pricing: {
      model: "per-device",
      tiers: {
        essentials: { name: "Essentials", price: 36, features: ["Basic NAC", "Cloud RADIUS"] },
        professional: { name: "Professional", price: 48, features: ["Advanced NAC", "Risk Scoring"] },
        enterprise: { name: "Enterprise", price: 60, features: ["Full Platform", "All Modules"] },
      },
      professionalServices: { quickStart: 7500, advanced: 15000, migration: 20000 },
      supportCost: 0, // Included
    },
    implementation: {
      deploymentTime: { pilot: "2-4 hours", fullDeployment: "1-2 weeks" },
      complexity: "low",
      hardwareRequired: false,
      professionalServicesRequired: false,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST", "FedRAMP"],
      certifications: ["SOC 2 Type II", "ISO 27001", "FedRAMP In-Process"],
      automationLevel: 85,
      auditReadiness: 92,
    },
    hiddenCosts: {
      fteRequirement: 0.5,
      commonIssues: ["Internet dependency", "Limited offline capabilities"],
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    category: "enterprise",
    description: "Industry-leading identity services engine with comprehensive policy management",
    marketPosition: "leader",
    logoPath: "/cisco-logo.png",
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: true,
        compliance: true,
        reporting: true,
        integration: true,
        cloudNative: false,
      },
      advanced: {
        aiMl: false,
        zeroTrust: true,
        automation: false,
        api: true,
        multiTenant: false,
        federation: true,
        riskScoring: false,
        behaviorAnalytics: false,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        forensics: true,
        encryption: true,
        certificateManagement: true,
        vulnerabilityAssessment: true,
      },
    },
    pricing: {
      model: "per-device",
      tiers: {
        essentials: { name: "Essentials", price: 50, streetPrice: "35-45", features: ["Basic 802.1X", "MAB"] },
        advantage: { name: "Advantage", price: 100, streetPrice: "75-95", features: ["Profiling", "BYOD"] },
        premier: { name: "Premier", price: 175, streetPrice: "125-150", features: ["TACACS+", "pxGrid"] },
      },
      hardware: {
        sns3615: { name: "SNS-3615 (Small)", listPrice: 19995, capacity: "5,000 endpoints" },
        sns3655: { name: "SNS-3655 (Medium)", listPrice: 59995, capacity: "15,000 endpoints" },
        sns3695: { name: "SNS-3695 (Large)", listPrice: 119995, capacity: "30,000 endpoints" },
      },
      professionalServices: { quickStart: 25000, advanced: 75000, migration: 100000 },
      supportCost: 0.22,
    },
    implementation: {
      deploymentTime: { pilot: "4-8 weeks", fullDeployment: "6-12 months" },
      complexity: "high",
      hardwareRequired: true,
      professionalServicesRequired: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST", "Common Criteria"],
      certifications: ["FIPS 140-2", "Common Criteria", "ISO 27001"],
      automationLevel: 35,
      auditReadiness: 78,
    },
    hiddenCosts: {
      fteRequirement: 2.5,
      commonIssues: ["Upgrade complexity", "High overhead", "Performance limitations"],
    },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "enterprise",
    description: "Policy management platform with strong wireless integration and user experience focus",
    marketPosition: "challenger",
    logoPath: "/aruba-logo.png",
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: true,
        compliance: true,
        reporting: true,
        integration: true,
        cloudNative: false,
      },
      advanced: {
        aiMl: true,
        zeroTrust: true,
        automation: true,
        api: true,
        multiTenant: false,
        federation: true,
        riskScoring: true,
        behaviorAnalytics: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        forensics: true,
        encryption: true,
        certificateManagement: true,
        vulnerabilityAssessment: false,
      },
    },
    pricing: {
      model: "per-device",
      tiers: {
        subscription: { name: "Subscription", price: 15, features: ["Full platform access"] },
      },
      hardware: {
        c2000: { name: "C2000", listPrice: 24995, capacity: "5,000 endpoints" },
        c3000: { name: "C3000", listPrice: 49995, capacity: "25,000 endpoints" },
      },
      professionalServices: { quickStart: 15000, advanced: 35000, migration: 60000 },
      supportCost: 0.18,
    },
    implementation: {
      deploymentTime: { pilot: "2-4 weeks", fullDeployment: "3-6 months" },
      complexity: "medium",
      hardwareRequired: true,
      professionalServicesRequired: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST"],
      certifications: ["SOC 2", "ISO 27001", "FIPS 140-2"],
      automationLevel: 65,
      auditReadiness: 82,
    },
    hiddenCosts: {
      fteRequirement: 2.0,
      commonIssues: ["Database maintenance", "Complex licensing", "Upgrade complexity"],
    },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "mid-market",
    description: "Cloud-managed networking with integrated security and simple deployment",
    marketPosition: "challenger",
    logoPath: "/meraki-logo.png",
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: true,
        compliance: false,
        reporting: true,
        integration: true,
        cloudNative: true,
      },
      advanced: {
        aiMl: false,
        zeroTrust: false,
        automation: true,
        api: true,
        multiTenant: true,
        federation: false,
        riskScoring: false,
        behaviorAnalytics: false,
      },
      security: {
        threatDetection: true,
        incidentResponse: false,
        forensics: false,
        encryption: true,
        certificateManagement: false,
        vulnerabilityAssessment: false,
      },
    },
    pricing: {
      model: "per-device",
      tiers: {
        // Meraki licensing is tied to hardware, so we model it as a single tier
        enterprise: { name: "Enterprise", price: 150, features: ["Full dashboard access per AP"] },
      },
      hardware: {
        mr36: { name: "MR36 AP", listPrice: 1295, capacity: "Wi-Fi 6 AP" },
        ms120: { name: "MS120-8 Switch", listPrice: 649, capacity: "8-port Switch" },
      },
      professionalServices: { quickStart: 10000, advanced: 22500, migration: 30000 },
      supportCost: 0, // Included in license
    },
    implementation: {
      deploymentTime: { pilot: "1-2 weeks", fullDeployment: "1-3 months" },
      complexity: "low",
      hardwareRequired: true,
      professionalServicesRequired: false,
    },
    compliance: {
      frameworks: ["PCI-DSS", "GDPR", "HIPAA"],
      certifications: ["SOC 2", "FedRAMP"],
      automationLevel: 45,
      auditReadiness: 65,
    },
    hiddenCosts: {
      fteRequirement: 0.5,
      commonIssues: ["Complete vendor lock-in", "Internet dependency", "Limited advanced features"],
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    category: "enterprise",
    description: "Device visibility and compliance platform with strong IoT and OT security focus",
    marketPosition: "niche",
    logoPath: "/forescout-logo.png",
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: false,
        byod: true,
        iot: true,
        compliance: true,
        reporting: true,
        integration: true,
        cloudNative: false,
      },
      advanced: {
        aiMl: true,
        zeroTrust: true,
        automation: true,
        api: true,
        multiTenant: false,
        federation: false,
        riskScoring: true,
        behaviorAnalytics: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        forensics: true,
        encryption: true,
        certificateManagement: false,
        vulnerabilityAssessment: true,
      },
    },
    pricing: {
      model: "per-device",
      tiers: {
        subscription: { name: "Subscription", price: 16, features: ["Full platform access"] },
      },
      hardware: {
        ct1000: { name: "CT-1000", listPrice: 4995, capacity: "1,000 devices" },
        ct10000: { name: "CT-10000", listPrice: 29995, capacity: "10,000 devices" },
      },
      professionalServices: { quickStart: 40000, advanced: 112500, migration: 75000 },
      supportCost: 0.22,
    },
    implementation: {
      deploymentTime: { pilot: "6-8 weeks", fullDeployment: "4-8 months" },
      complexity: "high",
      hardwareRequired: true,
      professionalServicesRequired: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST", "NERC CIP"],
      certifications: ["SOC 2", "ISO 27001", "Common Criteria"],
      automationLevel: 70,
      auditReadiness: 88,
    },
    hiddenCosts: {
      fteRequirement: 2.0,
      commonIssues: ["Frequently glitchy", "Database corruption", "Performance degradation"],
    },
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet",
    category: "enterprise",
    description: "Integrated security platform with network access control and threat protection",
    marketPosition: "leader",
    logoPath: "/fortinet-logo.png",
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: true,
        compliance: true,
        reporting: true,
        integration: true,
        cloudNative: false,
      },
      advanced: {
        aiMl: true,
        zeroTrust: true,
        automation: true,
        api: true,
        multiTenant: true,
        federation: true,
        riskScoring: true,
        behaviorAnalytics: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        forensics: true,
        encryption: true,
        certificateManagement: true,
        vulnerabilityAssessment: true,
      },
    },
    pricing: {
      model: "per-device",
      tiers: {
        subscription: { name: "Subscription", price: 10, features: ["Full platform access"] },
      },
      hardware: {
        nac300f: { name: "FortiNAC-300F", listPrice: 8000, capacity: "2,000 devices" },
        nac700f: { name: "FortiNAC-700F", listPrice: 45000, capacity: "50,000 devices" },
      },
      professionalServices: { quickStart: 20000, advanced: 35000, migration: 60000 },
      supportCost: 0.2,
    },
    implementation: {
      deploymentTime: { pilot: "3-5 weeks", fullDeployment: "3-6 months" },
      complexity: "medium",
      hardwareRequired: true,
      professionalServicesRequired: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST"],
      certifications: ["FIPS 140-2", "SOC 2", "ISO 27001", "Common Criteria"],
      automationLevel: 75,
      auditReadiness: 88,
    },
    hiddenCosts: {
      fteRequirement: 1.5,
      commonIssues: ["Multi-vendor complexity", "Performance at scale", "Database growth"],
    },
  },
}

export const getVendorLogoPath = (vendorId: string): string => {
  return ComprehensiveVendorDatabase[vendorId]?.logoPath || "/placeholder.svg"
}

export const getVendorsByCategory = (category: string): VendorData[] => {
  return Object.values(ComprehensiveVendorDatabase).filter((vendor) => vendor.category === category)
}

export const getVendorsByMarketPosition = (position: string): VendorData[] => {
  return Object.values(ComprehensiveVendorDatabase).filter((vendor) => vendor.marketPosition === position)
}

export const searchVendors = (query: string): VendorData[] => {
  const lowercaseQuery = query.toLowerCase()
  return Object.values(ComprehensiveVendorDatabase).filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(lowercaseQuery) ||
      vendor.description.toLowerCase().includes(lowercaseQuery) ||
      vendor.strengths.some((strength) => strength.toLowerCase().includes(lowercaseQuery)) ||
      vendor.idealFor.some((ideal) => ideal.toLowerCase().includes(lowercaseQuery)),
  )
}

// Compliance frameworks data
export const complianceFrameworksData = {
  sox: {
    name: "Sarbanes-Oxley (SOX)",
    description: "Financial reporting and internal controls",
    industry: "Financial Services",
    requirements: ["Access controls", "Audit trails", "Data integrity"],
  },
  hipaa: {
    name: "HIPAA",
    description: "Healthcare information privacy and security",
    industry: "Healthcare",
    requirements: ["Access controls", "Audit logs", "Encryption", "Risk assessments"],
  },
  "pci-dss": {
    name: "PCI-DSS",
    description: "Payment card industry data security",
    industry: "Retail/Finance",
    requirements: ["Network segmentation", "Access controls", "Monitoring", "Encryption"],
  },
  gdpr: {
    name: "GDPR",
    description: "General Data Protection Regulation",
    industry: "All (EU)",
    requirements: ["Data protection", "Privacy controls", "Breach notification", "Consent management"],
  },
  "iso-27001": {
    name: "ISO 27001",
    description: "Information security management systems",
    industry: "All",
    requirements: ["Risk management", "Security controls", "Continuous monitoring", "Documentation"],
  },
  nist: {
    name: "NIST Cybersecurity Framework",
    description: "Cybersecurity risk management framework",
    industry: "All",
    requirements: ["Identify", "Protect", "Detect", "Respond", "Recover"],
  },
  fedramp: {
    name: "FedRAMP",
    description: "Federal risk and authorization management program",
    industry: "Government",
    requirements: ["Security controls", "Continuous monitoring", "Incident response", "Documentation"],
  },
  "nerc-cip": {
    name: "NERC CIP",
    description: "Critical infrastructure protection for utilities",
    industry: "Energy/Utilities",
    requirements: ["Asset identification", "Security controls", "Personnel training", "Incident reporting"],
  },
}

// Industry security metrics
export const industrySecurityMetricsData = {
  healthcare: {
    averageBreachCost: 10930000,
    breachProbability: 0.29,
    complianceRequirements: ["HIPAA", "HITECH", "FDA"],
    criticalAssets: ["Patient records", "Medical devices", "Research data"],
  },
  financial: {
    averageBreachCost: 5720000,
    breachProbability: 0.19,
    complianceRequirements: ["SOX", "PCI-DSS", "GLBA", "FFIEC"],
    criticalAssets: ["Customer data", "Transaction records", "Trading systems"],
  },
  government: {
    averageBreachCost: 4740000,
    breachProbability: 0.15,
    complianceRequirements: ["FedRAMP", "FISMA", "NIST", "CJIS"],
    criticalAssets: ["Citizen data", "Government systems", "Classified information"],
  },
  technology: {
    averageBreachCost: 4880000,
    breachProbability: 0.22,
    complianceRequirements: ["SOC 2", "ISO 27001", "GDPR"],
    criticalAssets: ["Source code", "Customer data", "Intellectual property"],
  },
  education: {
    averageBreachCost: 3790000,
    breachProbability: 0.26,
    complianceRequirements: ["FERPA", "COPPA", "GDPR"],
    criticalAssets: ["Student records", "Research data", "Financial information"],
  },
  manufacturing: {
    averageBreachCost: 4470000,
    breachProbability: 0.18,
    complianceRequirements: ["ISO 27001", "NIST", "IEC 62443"],
    criticalAssets: ["Production systems", "Design data", "Supply chain information"],
  },
  retail: {
    averageBreachCost: 3280000,
    breachProbability: 0.24,
    complianceRequirements: ["PCI-DSS", "GDPR", "CCPA"],
    criticalAssets: ["Customer data", "Payment information", "Inventory systems"],
  },
  energy: {
    averageBreachCost: 6950000,
    breachProbability: 0.16,
    complianceRequirements: ["NERC CIP", "NIST", "IEC 62443"],
    criticalAssets: ["SCADA systems", "Grid infrastructure", "Customer data"],
  },
}
