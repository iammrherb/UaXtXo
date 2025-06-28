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
  marketMetrics: {
    marketShare: number
    customerSatisfaction: number
    deploymentSuccess: number
    supportRating: number
  }
  technicalSpecs: {
    maxDevices: number | string
    maxUsers: number | string
    apiRateLimit: string
    uptime: number
    mttr: number
  }
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    category: "enterprise",
    description: "Cloud-native NAC solution with zero-trust security and AI-powered automation",
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
          description: "AI-powered threat detection and response with ML algorithms",
        },
        compliance: {
          name: "Compliance Suite",
          price: 1.5,
          description: "Automated compliance reporting and audit trails for major frameworks",
        },
        iot: {
          name: "IoT Security",
          price: 1.0,
          description: "Specialized IoT device profiling and security with OT protocol support",
        },
        analytics: {
          name: "Advanced Analytics",
          price: 2.0,
          description: "Deep network insights and behavioral analytics with predictive capabilities",
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
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "NIST", "ISO27001", "CMMC", "FedRAMP"],
      auditReadiness: 95,
      automationLevel: 90,
      reportingCapabilities: [
        "Real-time dashboards",
        "Automated reports",
        "Custom queries",
        "API access",
        "Compliance templates",
        "Evidence collection",
      ],
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
      agentless: true,
      realTimeVisibility: true,
      behaviorAnalytics: true,
      threatDetection: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 15,
      customerSatisfaction: 4.8,
      deploymentSuccess: 98,
      supportRating: 4.7,
    },
    technicalSpecs: {
      maxDevices: "unlimited",
      maxUsers: "unlimited",
      apiRateLimit: "10,000/minute",
      uptime: 99.99,
      mttr: 15,
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    category: "enterprise",
    description: "Industry-leading identity services engine with comprehensive policy management",
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
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "FISMA", "Common Criteria", "NIST"],
      auditReadiness: 85,
      automationLevel: 70,
      reportingCapabilities: ["Standard reports", "Custom dashboards", "SIEM integration", "pxGrid"],
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
      agentless: false,
      realTimeVisibility: true,
      behaviorAnalytics: false,
      threatDetection: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 35,
      customerSatisfaction: 3.2,
      deploymentSuccess: 65,
      supportRating: 3.5,
    },
    technicalSpecs: {
      maxDevices: 500000,
      maxUsers: 2000000,
      apiRateLimit: "limited",
      uptime: 99.5,
      mttr: 360,
    },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "enterprise",
    description: "Policy management platform with strong wireless integration and user experience focus",
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
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "ISO27001"],
      auditReadiness: 80,
      automationLevel: 75,
      reportingCapabilities: ["Standard reports", "Real-time monitoring", "Custom dashboards", "OnGuard"],
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
      agentless: true,
      realTimeVisibility: true,
      behaviorAnalytics: false,
      threatDetection: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 20,
      customerSatisfaction: 3.5,
      deploymentSuccess: 75,
      supportRating: 3.8,
    },
    technicalSpecs: {
      maxDevices: 100000,
      maxUsers: 250000,
      apiRateLimit: "moderate",
      uptime: 99.0,
      mttr: 240,
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    category: "enterprise",
    description: "Device visibility and compliance platform with strong IoT and OT security focus",
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
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "NIST", "ISO27001", "NERC CIP"],
      auditReadiness: 90,
      automationLevel: 85,
      reportingCapabilities: [
        "Advanced analytics",
        "Custom reports",
        "Real-time dashboards",
        "API access",
        "Threat intelligence",
      ],
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
      byod: true,
      guestAccess: false,
      apiIntegration: true,
      singleSignOn: false,
      multiTenant: false,
      scalability: "very high",
      agentless: true,
      realTimeVisibility: true,
      behaviorAnalytics: true,
      threatDetection: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 12,
      customerSatisfaction: 3.8,
      deploymentSuccess: 70,
      supportRating: 4.0,
    },
    technicalSpecs: {
      maxDevices: 1000000,
      maxUsers: 500000,
      apiRateLimit: "high",
      uptime: 99.5,
      mttr: 180,
    },
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet FortiNAC",
    category: "enterprise",
    description: "Network access control with security fabric integration and comprehensive threat protection",
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
      frameworks: ["SOC2", "PCI-DSS", "HIPAA", "GDPR", "ISO27001"],
      auditReadiness: 75,
      automationLevel: 70,
      reportingCapabilities: ["Standard reports", "Security fabric integration", "Custom dashboards", "FortiAnalyzer"],
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
      agentless: false,
      realTimeVisibility: true,
      behaviorAnalytics: false,
      threatDetection: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 8,
      customerSatisfaction: 3.6,
      deploymentSuccess: 72,
      supportRating: 3.7,
    },
    technicalSpecs: {
      maxDevices: 200000,
      maxUsers: 150000,
      apiRateLimit: "moderate",
      uptime: 99.2,
      mttr: 200,
    },
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    category: "enterprise",
    description: "AI-driven network access control and assurance with cloud and on-premise options",
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
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "GDPR", "ISO27001"],
      auditReadiness: 82,
      automationLevel: 80,
      reportingCapabilities: ["AI insights", "Real-time analytics", "Custom reports", "API access", "Marvis AI"],
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
      agentless: true,
      realTimeVisibility: true,
      behaviorAnalytics: true,
      threatDetection: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 6,
      customerSatisfaction: 4.2,
      deploymentSuccess: 85,
      supportRating: 4.3,
    },
    technicalSpecs: {
      maxDevices: 300000,
      maxUsers: 200000,
      apiRateLimit: "high",
      uptime: 99.8,
      mttr: 120,
    },
  },
  arista: {
    id: "arista",
    name: "Arista NDR",
    category: "enterprise",
    description: "High-performance network detection and response with integrated access control",
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
      frameworks: ["SOC2", "NIST", "ISO27001", "Common Criteria"],
      auditReadiness: 88,
      automationLevel: 85,
      reportingCapabilities: [
        "Advanced threat analytics",
        "Custom dashboards",
        "API integration",
        "ML insights",
        "CloudVision",
      ],
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
      agentless: true,
      realTimeVisibility: true,
      behaviorAnalytics: true,
      threatDetection: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 3,
      customerSatisfaction: 4.5,
      deploymentSuccess: 80,
      supportRating: 4.6,
    },
    technicalSpecs: {
      maxDevices: 2000000,
      maxUsers: 1000000,
      apiRateLimit: "very high",
      uptime: 99.95,
      mttr: 60,
    },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "mid-market",
    description: "Cloud-managed IT with integrated access control and simple dashboard interface",
    logo: "/meraki-logo.png",
    pricing: {
      model: "per-device",
      basePrice: 15.0,
      billingCycle: "annual",
      volumeDiscounts: {
        tier1: { threshold: 100, discount: 0.05 },
        tier2: { threshold: 500, discount: 0.1 },
        tier3: { threshold: 2000, discount: 0.15 },
      },
    },
    implementation: {
      complexity: "medium",
      deploymentTime: {
        pilot: "2-3 weeks",
        fullDeployment: "6-10 weeks",
      },
      hardwareRequired: true,
      professionalServices: {
        required: false,
        cost: 35000,
        duration: "4-6 weeks",
      },
    },
    compliance: {
      frameworks: ["SOC2", "ISO27001", "HIPAA", "PCI-DSS"],
      auditReadiness: 70,
      automationLevel: 40,
      reportingCapabilities: ["Basic reports", "Dashboard analytics", "Event logs", "Systems Manager"],
    },
    features: {
      cloudNative: false,
      zeroTrust: false,
      aiMl: false,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: true,
      scalability: "medium",
      agentless: false,
      realTimeVisibility: true,
      behaviorAnalytics: false,
      threatDetection: true,
      microsegmentation: false,
    },
    marketMetrics: {
      marketShare: 10,
      customerSatisfaction: 3.8,
      deploymentSuccess: 88,
      supportRating: 3.9,
    },
    technicalSpecs: {
      maxDevices: 10000,
      maxUsers: 50000,
      apiRateLimit: "low",
      uptime: 99.9,
      mttr: 240,
    },
  },
}

export const getVendorLogoPath = (vendorId: string): string => {
  return ComprehensiveVendorDatabase[vendorId]?.logo || "/placeholder.svg"
}

export const getVendorsByCategory = (category: string): VendorData[] => {
  return Object.values(ComprehensiveVendorDatabase).filter((vendor) => vendor.category === category)
}

export const searchVendors = (query: string): VendorData[] => {
  const lowercaseQuery = query.toLowerCase()
  return Object.values(ComprehensiveVendorDatabase).filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(lowercaseQuery) || vendor.description.toLowerCase().includes(lowercaseQuery),
  )
}

// Industry-specific security metrics
export const industrySecurityMetricsData: Record<
  string,
  {
    avgBreachCost: number
    avgRecordsBreached: number
    avgMTTR: number // days
    cyberInsurancePremium: number
    breachProbability: number
    iotDeviceRatio: number
    criticalAssets: string[]
  }
> = {
  healthcare: {
    avgBreachCost: 10930000,
    avgRecordsBreached: 42000,
    avgMTTR: 277,
    cyberInsurancePremium: 250000,
    breachProbability: 0.28,
    iotDeviceRatio: 0.35,
    criticalAssets: ["PHI", "Medical Devices", "Clinical Systems"],
  },
  financial: {
    avgBreachCost: 5970000,
    avgRecordsBreached: 35000,
    avgMTTR: 233,
    cyberInsurancePremium: 180000,
    breachProbability: 0.22,
    iotDeviceRatio: 0.15,
    criticalAssets: ["PII", "Financial Data", "Trading Systems"],
  },
  retail: {
    avgBreachCost: 3860000,
    avgRecordsBreached: 28000,
    avgMTTR: 247,
    cyberInsurancePremium: 120000,
    breachProbability: 0.25,
    iotDeviceRatio: 0.45,
    criticalAssets: ["PCI Data", "Customer Data", "POS Systems"],
  },
  technology: {
    avgBreachCost: 5040000,
    avgRecordsBreached: 32000,
    avgMTTR: 215,
    cyberInsurancePremium: 150000,
    breachProbability: 0.2,
    iotDeviceRatio: 0.25,
    criticalAssets: ["Source Code", "Customer Data", "Infrastructure"],
  },
  manufacturing: {
    avgBreachCost: 4470000,
    avgRecordsBreached: 25000,
    avgMTTR: 261,
    cyberInsurancePremium: 140000,
    breachProbability: 0.23,
    iotDeviceRatio: 0.55,
    criticalAssets: ["IP", "OT Systems", "Supply Chain"],
  },
  energy: {
    avgBreachCost: 4650000,
    avgRecordsBreached: 22000,
    avgMTTR: 254,
    cyberInsurancePremium: 200000,
    breachProbability: 0.18,
    iotDeviceRatio: 0.6,
    criticalAssets: ["SCADA", "Critical Infrastructure", "Grid Systems"],
  },
  government: {
    avgBreachCost: 5010000,
    avgRecordsBreached: 50000,
    avgMTTR: 286,
    cyberInsurancePremium: 300000,
    breachProbability: 0.3,
    iotDeviceRatio: 0.2,
    criticalAssets: ["Classified Data", "Citizen Data", "Critical Services"],
  },
  education: {
    avgBreachCost: 3790000,
    avgRecordsBreached: 45000,
    avgMTTR: 269,
    cyberInsurancePremium: 100000,
    breachProbability: 0.26,
    iotDeviceRatio: 0.3,
    criticalAssets: ["Student Data", "Research", "Financial Aid"],
  },
}
