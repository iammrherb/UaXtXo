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
