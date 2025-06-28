export interface VendorFeatures {
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

export interface VendorPricing {
  model: "per-device" | "per-user" | "per-site" | "enterprise"
  basePrice: number
  currency: "USD"
  billingCycle: "monthly" | "annual"
  minimumUsers?: number
  volumeDiscounts: {
    tier1: { threshold: number; discount: number }
    tier2: { threshold: number; discount: number }
    tier3: { threshold: number; discount: number }
  }
  addOns?: {
    [key: string]: {
      name: string
      price: number
      description: string
    }
  }
}

export interface VendorImplementation {
  deploymentTime: {
    pilot: string
    fullDeployment: string
  }
  complexity: "low" | "medium" | "high"
  hardwareRequired: boolean
  cloudOptions: boolean
  onPremiseOptions: boolean
  hybridOptions: boolean
  professionalServices: {
    required: boolean
    cost: number
    duration: string
  }
}

export interface VendorSupport {
  levels: string[]
  sla: {
    uptime: number
    responseTime: string
  }
  channels: string[]
  documentation: "excellent" | "good" | "fair" | "poor"
  community: boolean
}

export interface VendorData {
  id: string
  name: string
  category: "enterprise" | "mid-market" | "smb"
  description: string
  logo: string
  pricing: {
    model: "per-device" | "per-user" | "tiered"
    basePrice: number
    billingCycle: "monthly" | "annual"
    volumeDiscounts: {
      tier1: { threshold: number; discount: number }
      tier2: { threshold: number; discount: number }
      tier3: { threshold: number; discount: number }
    }
    addOns?: {
      [key: string]: {
        name: string
        price: number
        description: string
      }
    }
  }
  implementation: {
    complexity: "low" | "medium" | "high"
    deploymentTime: {
      pilot: string
      fullDeployment: string
    }
    hardwareRequired: boolean
    professionalServices: {
      required: boolean
      cost: number
      duration: string
    }
  }
  compliance: {
    frameworks: string[]
    auditReadiness: number
    automationLevel: number
    reportingCapabilities: string[]
  }
  features: {
    [key: string]: boolean | string | number
  }
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    category: "enterprise",
    description: "Cloud-native NAC solution with zero-trust security",
    logo: "/portnox-logo.png",
    pricing: {
      model: "per-device",
      basePrice: 8.5,
      billingCycle: "monthly",
      volumeDiscounts: {
        tier1: { threshold: 500, discount: 0.1 },
        tier2: { threshold: 2000, discount: 0.2 },
        tier3: { threshold: 10000, discount: 0.3 },
      },
      addOns: {
        atp: {
          name: "Advanced Threat Protection",
          price: 2.5,
          description: "AI-powered threat detection and response",
        },
        compliance: {
          name: "Compliance Suite",
          price: 1.5,
          description: "Automated compliance reporting and audit trails",
        },
        iot: {
          name: "IoT Security",
          price: 1.0,
          description: "Specialized IoT device profiling and security",
        },
        analytics: {
          name: "Advanced Analytics",
          price: 2.0,
          description: "Deep network insights and behavioral analytics",
        },
      },
    },
    implementation: {
      complexity: "low",
      deploymentTime: {
        pilot: "2-4 weeks",
        fullDeployment: "6-12 weeks",
      },
      hardwareRequired: false,
      professionalServices: {
        required: false,
        cost: 25000,
        duration: "4-6 weeks",
      },
    },
    compliance: {
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "NIST", "ISO27001"],
      auditReadiness: 95,
      automationLevel: 90,
      reportingCapabilities: ["Real-time dashboards", "Automated reports", "Custom queries", "API access"],
    },
    features: {
      cloudNative: true,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: true,
      scalability: "unlimited",
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    category: "enterprise",
    description: "Identity Services Engine for comprehensive network access control",
    logo: "/cisco-logo.png",
    pricing: {
      model: "per-device",
      basePrice: 12.0,
      billingCycle: "annual",
      volumeDiscounts: {
        tier1: { threshold: 1000, discount: 0.05 },
        tier2: { threshold: 5000, discount: 0.15 },
        tier3: { threshold: 15000, discount: 0.25 },
      },
    },
    implementation: {
      complexity: "high",
      deploymentTime: {
        pilot: "8-12 weeks",
        fullDeployment: "6-12 months",
      },
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 150000,
        duration: "12-16 weeks",
      },
    },
    compliance: {
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "FISMA", "Common Criteria"],
      auditReadiness: 85,
      automationLevel: 70,
      reportingCapabilities: ["Standard reports", "Custom dashboards", "SIEM integration"],
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: false,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: false,
      scalability: "high",
    },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "enterprise",
    description: "Policy management platform for secure network access",
    logo: "/aruba-logo.png",
    pricing: {
      model: "per-device",
      basePrice: 10.5,
      billingCycle: "annual",
      volumeDiscounts: {
        tier1: { threshold: 500, discount: 0.08 },
        tier2: { threshold: 2500, discount: 0.18 },
        tier3: { threshold: 10000, discount: 0.28 },
      },
    },
    implementation: {
      complexity: "medium",
      deploymentTime: {
        pilot: "4-6 weeks",
        fullDeployment: "3-6 months",
      },
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 75000,
        duration: "8-12 weeks",
      },
    },
    compliance: {
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "GDPR"],
      auditReadiness: 80,
      automationLevel: 75,
      reportingCapabilities: ["Standard reports", "Real-time monitoring", "Custom dashboards"],
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: true,
      scalability: "high",
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    category: "enterprise",
    description: "Device visibility and compliance platform",
    logo: "/forescout-logo.png",
    pricing: {
      model: "per-device",
      basePrice: 15.0,
      billingCycle: "annual",
      volumeDiscounts: {
        tier1: { threshold: 1000, discount: 0.1 },
        tier2: { threshold: 5000, discount: 0.2 },
        tier3: { threshold: 20000, discount: 0.3 },
      },
    },
    implementation: {
      complexity: "high",
      deploymentTime: {
        pilot: "6-8 weeks",
        fullDeployment: "4-8 months",
      },
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 125000,
        duration: "10-14 weeks",
      },
    },
    compliance: {
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "NIST", "ISO27001"],
      auditReadiness: 90,
      automationLevel: 85,
      reportingCapabilities: ["Advanced analytics", "Custom reports", "Real-time dashboards", "API access"],
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: false,
      multiTenant: false,
      scalability: "very high",
    },
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet FortiNAC",
    category: "enterprise",
    description: "Network access control with security fabric integration",
    logo: "/fortinet-logo.png",
    pricing: {
      model: "per-device",
      basePrice: 9.5,
      billingCycle: "annual",
      volumeDiscounts: {
        tier1: { threshold: 750, discount: 0.12 },
        tier2: { threshold: 3000, discount: 0.22 },
        tier3: { threshold: 12000, discount: 0.32 },
      },
    },
    implementation: {
      complexity: "medium",
      deploymentTime: {
        pilot: "3-5 weeks",
        fullDeployment: "2-4 months",
      },
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 60000,
        duration: "6-10 weeks",
      },
    },
    compliance: {
      frameworks: ["SOC2", "PCI-DSS", "HIPAA", "GDPR"],
      auditReadiness: 75,
      automationLevel: 70,
      reportingCapabilities: ["Standard reports", "Security fabric integration", "Custom dashboards"],
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: false,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: false,
      scalability: "high",
    },
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    category: "enterprise",
    description: "AI-driven network access control and assurance",
    logo: "/juniper-logo.png",
    pricing: {
      model: "per-device",
      basePrice: 11.0,
      billingCycle: "annual",
      volumeDiscounts: {
        tier1: { threshold: 600, discount: 0.1 },
        tier2: { threshold: 2000, discount: 0.2 },
        tier3: { threshold: 8000, discount: 0.3 },
      },
    },
    implementation: {
      complexity: "medium",
      deploymentTime: {
        pilot: "4-6 weeks",
        fullDeployment: "3-5 months",
      },
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 85000,
        duration: "8-12 weeks",
      },
    },
    compliance: {
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "GDPR"],
      auditReadiness: 82,
      automationLevel: 80,
      reportingCapabilities: ["AI insights", "Real-time analytics", "Custom reports", "API access"],
    },
    features: {
      cloudNative: true,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: true,
      scalability: "high",
    },
  },
  arista: {
    id: "arista",
    name: "Arista NDR",
    category: "enterprise",
    description: "Network detection and response with access control",
    logo: "/arista-logo.png",
    pricing: {
      model: "per-device",
      basePrice: 18.0,
      billingCycle: "annual",
      volumeDiscounts: {
        tier1: { threshold: 2000, discount: 0.08 },
        tier2: { threshold: 8000, discount: 0.18 },
        tier3: { threshold: 25000, discount: 0.28 },
      },
    },
    implementation: {
      complexity: "high",
      deploymentTime: {
        pilot: "8-10 weeks",
        fullDeployment: "6-10 months",
      },
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 200000,
        duration: "14-18 weeks",
      },
    },
    compliance: {
      frameworks: ["SOC2", "NIST", "ISO27001"],
      auditReadiness: 88,
      automationLevel: 85,
      reportingCapabilities: ["Advanced threat analytics", "Custom dashboards", "API integration", "ML insights"],
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
      byod: false,
      guestAccess: false,
      apiIntegration: true,
      singleSignOn: false,
      multiTenant: false,
      scalability: "very high",
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
