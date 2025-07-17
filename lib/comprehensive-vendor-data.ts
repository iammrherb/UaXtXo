export interface VendorFeatures {
  core: {
    deviceDiscovery: boolean
    userAuthentication: boolean
    policyEnforcement: boolean
    guestAccess: boolean
    certificateManagement: boolean
    reporting: boolean
  }
  advanced: {
    zeroTrust: boolean
    aiMl: boolean
    iotSupport: boolean
    cloudNative: boolean
    apiFirst: boolean
    automation: boolean
  }
  security: {
    threatDetection: boolean
    incidentResponse: boolean
    vulnerabilityAssessment: boolean
    complianceReporting: boolean
    riskScoring: boolean
    forensics: boolean
  }
  integration: {
    siem: boolean
    itsm: boolean
    activeDirectory: boolean
    cloudProviders: boolean
    networkVendors: boolean
    securityTools: boolean
  }
}

export interface VendorData {
  id: string
  name: string
  category: "leader" | "challenger" | "niche" | "visionary"
  marketShare: number
  customerSatisfaction: number
  deployment: "cloud" | "onprem" | "hybrid"
  pricing: {
    model: "subscription" | "perpetual" | "usage" | "free"
    basePrice: number
    pricePerDevice: number
    minimumDevices: number
    additionalCosts: {
      hardware: number
      services: number
      training: number
      maintenance: number
    }
  }
  implementation: {
    deploymentTime: {
      planning: string
      installation: string
      configuration: string
      fullDeployment: string
    }
    complexity: "low" | "medium" | "high" | "very-high"
    resourcesRequired: {
      technical: number
      administrative: number
      training: number
    }
  }
  features: VendorFeatures
  security: {
    cveCount: number
    lastCriticalCve: string
    securityRating: number
    complianceSupport: string[]
  }
  support: {
    availability: string
    responseTime: string
    channels: string[]
    documentation: "excellent" | "good" | "fair" | "poor"
  }
  pros: string[]
  cons: string[]
  bestFor: string[]
  logo?: string
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "leader",
    marketShare: 8.5,
    customerSatisfaction: 96,
    deployment: "cloud",
    pricing: {
      model: "subscription",
      basePrice: 0,
      pricePerDevice: 4.0,
      minimumDevices: 100,
      additionalCosts: {
        hardware: 0,
        services: 0,
        training: 0,
        maintenance: 0,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "1-2 days",
        installation: "30 minutes",
        configuration: "2-4 hours",
        fullDeployment: "1-3 days",
      },
      complexity: "low",
      resourcesRequired: {
        technical: 0.5,
        administrative: 0.2,
        training: 0.1,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: true,
        aiMl: true,
        iotSupport: true,
        cloudNative: true,
        apiFirst: true,
        automation: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        vulnerabilityAssessment: true,
        complianceReporting: true,
        riskScoring: true,
        forensics: true,
      },
      integration: {
        siem: true,
        itsm: true,
        activeDirectory: true,
        cloudProviders: true,
        networkVendors: true,
        securityTools: true,
      },
    },
    security: {
      cveCount: 0,
      lastCriticalCve: "None",
      securityRating: 98,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "FedRAMP"],
    },
    support: {
      availability: "24/7",
      responseTime: "< 1 hour",
      channels: ["Phone", "Email", "Chat", "Portal"],
      documentation: "excellent",
    },
    pros: [
      "Zero infrastructure requirements",
      "Fastest deployment in industry",
      "AI-powered automation",
      "Zero CVEs",
      "Comprehensive Zero Trust",
    ],
    cons: ["Newer market presence", "Cloud-only deployment"],
    bestFor: [
      "Organizations seeking rapid deployment",
      "Cloud-first companies",
      "Zero Trust implementations",
      "Cost-conscious enterprises",
    ],
    logo: "/portnox-logo.png",
  },
  cisco: {
    id: "cisco",
    name: "Cisco Identity Services Engine (ISE)",
    category: "leader",
    marketShare: 25.3,
    customerSatisfaction: 78,
    deployment: "hybrid",
    pricing: {
      model: "subscription",
      basePrice: 50000,
      pricePerDevice: 12.0,
      minimumDevices: 500,
      additionalCosts: {
        hardware: 75000,
        services: 25000,
        training: 15000,
        maintenance: 20000,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "4-8 weeks",
        installation: "2-4 weeks",
        configuration: "6-12 weeks",
        fullDeployment: "3-6 months",
      },
      complexity: "very-high",
      resourcesRequired: {
        technical: 3.0,
        administrative: 2.0,
        training: 1.5,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: true,
        cloudNative: false,
        apiFirst: true,
        automation: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        vulnerabilityAssessment: true,
        complianceReporting: true,
        riskScoring: false,
        forensics: true,
      },
      integration: {
        siem: true,
        itsm: true,
        activeDirectory: true,
        cloudProviders: true,
        networkVendors: true,
        securityTools: true,
      },
    },
    security: {
      cveCount: 47,
      lastCriticalCve: "2024-01-15",
      securityRating: 72,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR"],
    },
    support: {
      availability: "24/7",
      responseTime: "2-4 hours",
      channels: ["Phone", "Email", "Portal"],
      documentation: "good",
    },
    pros: [
      "Market leader with extensive features",
      "Strong ecosystem integration",
      "Comprehensive policy engine",
      "Enterprise-grade scalability",
    ],
    cons: [
      "Complex deployment and management",
      "High total cost of ownership",
      "Frequent security vulnerabilities",
      "Steep learning curve",
    ],
    bestFor: [
      "Large enterprises with Cisco infrastructure",
      "Complex policy requirements",
      "Extensive integration needs",
    ],
    logo: "/cisco-logo.png",
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "challenger",
    marketShare: 18.7,
    customerSatisfaction: 88,
    deployment: "hybrid",
    pricing: {
      model: "perpetual",
      basePrice: 25000,
      pricePerDevice: 8.5,
      minimumDevices: 250,
      additionalCosts: {
        hardware: 35000,
        services: 15000,
        training: 8000,
        maintenance: 12000,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "2-4 weeks",
        installation: "1-2 weeks",
        configuration: "3-6 weeks",
        fullDeployment: "2-3 months",
      },
      complexity: "medium",
      resourcesRequired: {
        technical: 2.0,
        administrative: 1.5,
        training: 1.0,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: true,
        cloudNative: false,
        apiFirst: true,
        automation: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        vulnerabilityAssessment: false,
        complianceReporting: true,
        riskScoring: false,
        forensics: true,
      },
      integration: {
        siem: true,
        itsm: true,
        activeDirectory: true,
        cloudProviders: true,
        networkVendors: true,
        securityTools: true,
      },
    },
    security: {
      cveCount: 12,
      lastCriticalCve: "2023-11-20",
      securityRating: 85,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR"],
    },
    support: {
      availability: "24/7",
      responseTime: "1-2 hours",
      channels: ["Phone", "Email", "Chat", "Portal"],
      documentation: "good",
    },
    pros: ["Strong wireless integration", "User-friendly interface", "Good value for money", "Reliable performance"],
    cons: ["Limited cloud-native features", "Hardware dependency", "Complex licensing model"],
    bestFor: ["Aruba wireless environments", "Mid-market enterprises", "Wireless-first deployments"],
    logo: "/aruba-logo.png",
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "niche",
    marketShare: 12.1,
    customerSatisfaction: 85,
    deployment: "cloud",
    pricing: {
      model: "subscription",
      basePrice: 0,
      pricePerDevice: 15.0,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 45000,
        services: 5000,
        training: 3000,
        maintenance: 0,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "1-2 weeks",
        installation: "1 week",
        configuration: "1-2 weeks",
        fullDeployment: "3-4 weeks",
      },
      complexity: "low",
      resourcesRequired: {
        technical: 1.0,
        administrative: 0.5,
        training: 0.5,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: false,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: true,
        cloudNative: true,
        apiFirst: true,
        automation: false,
      },
      security: {
        threatDetection: true,
        incidentResponse: false,
        vulnerabilityAssessment: false,
        complianceReporting: true,
        riskScoring: false,
        forensics: false,
      },
      integration: {
        siem: false,
        itsm: false,
        activeDirectory: true,
        cloudProviders: false,
        networkVendors: false,
        securityTools: false,
      },
    },
    security: {
      cveCount: 8,
      lastCriticalCve: "2023-09-12",
      securityRating: 82,
      complianceSupport: ["PCI-DSS", "HIPAA"],
    },
    support: {
      availability: "Business hours",
      responseTime: "4-8 hours",
      channels: ["Phone", "Email", "Portal"],
      documentation: "good",
    },
    pros: ["Simple cloud management", "Easy deployment", "Good for SMB", "Integrated networking"],
    cons: ["Requires Meraki infrastructure", "Limited enterprise features", "Vendor lock-in"],
    bestFor: ["Small to medium businesses", "Meraki network environments", "Simple deployments"],
    logo: "/meraki-logo.png",
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    category: "visionary",
    marketShare: 6.2,
    customerSatisfaction: 82,
    deployment: "cloud",
    pricing: {
      model: "subscription",
      basePrice: 10000,
      pricePerDevice: 6.0,
      minimumDevices: 200,
      additionalCosts: {
        hardware: 25000,
        services: 10000,
        training: 5000,
        maintenance: 0,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "2-3 weeks",
        installation: "1 week",
        configuration: "2-3 weeks",
        fullDeployment: "4-6 weeks",
      },
      complexity: "medium",
      resourcesRequired: {
        technical: 1.5,
        administrative: 1.0,
        training: 0.8,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: true,
        iotSupport: true,
        cloudNative: true,
        apiFirst: true,
        automation: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        vulnerabilityAssessment: false,
        complianceReporting: true,
        riskScoring: true,
        forensics: false,
      },
      integration: {
        siem: true,
        itsm: false,
        activeDirectory: true,
        cloudProviders: true,
        networkVendors: true,
        securityTools: true,
      },
    },
    security: {
      cveCount: 5,
      lastCriticalCve: "2023-08-15",
      securityRating: 88,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS"],
    },
    support: {
      availability: "24/7",
      responseTime: "2-4 hours",
      channels: ["Phone", "Email", "Chat"],
      documentation: "good",
    },
    pros: ["AI-driven insights", "Cloud-native architecture", "Strong wireless integration", "Good automation"],
    cons: ["Requires Mist ecosystem", "Limited third-party integration", "Newer to market"],
    bestFor: ["Juniper Mist environments", "AI-driven operations", "Wireless-centric deployments"],
    logo: "/juniper-logo.png",
  },
  forescout: {
    id: "forescout",
    name: "Forescout Platform",
    category: "challenger",
    marketShare: 9.8,
    customerSatisfaction: 79,
    deployment: "hybrid",
    pricing: {
      model: "subscription",
      basePrice: 40000,
      pricePerDevice: 5.5,
      minimumDevices: 1000,
      additionalCosts: {
        hardware: 60000,
        services: 20000,
        training: 12000,
        maintenance: 15000,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "3-6 weeks",
        installation: "2-3 weeks",
        configuration: "4-8 weeks",
        fullDeployment: "2-4 months",
      },
      complexity: "high",
      resourcesRequired: {
        technical: 2.5,
        administrative: 1.8,
        training: 1.2,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: false,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: true,
        cloudNative: false,
        apiFirst: true,
        automation: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        vulnerabilityAssessment: true,
        complianceReporting: true,
        riskScoring: true,
        forensics: true,
      },
      integration: {
        siem: true,
        itsm: true,
        activeDirectory: true,
        cloudProviders: true,
        networkVendors: true,
        securityTools: true,
      },
    },
    security: {
      cveCount: 18,
      lastCriticalCve: "2024-02-08",
      securityRating: 76,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR"],
    },
    support: {
      availability: "24/7",
      responseTime: "2-6 hours",
      channels: ["Phone", "Email", "Portal"],
      documentation: "fair",
    },
    pros: [
      "Excellent device visibility",
      "Strong IoT/OT support",
      "Comprehensive threat detection",
      "Good integration capabilities",
    ],
    cons: ["Complex deployment", "High resource requirements", "Expensive licensing"],
    bestFor: ["Large enterprises", "IoT/OT environments", "Security-focused organizations"],
    logo: "/forescout-logo.png",
  },
  extreme: {
    id: "extreme",
    name: "Extreme NAC",
    category: "niche",
    marketShare: 4.3,
    customerSatisfaction: 81,
    deployment: "hybrid",
    pricing: {
      model: "subscription",
      basePrice: 15000,
      pricePerDevice: 3.0,
      minimumDevices: 500,
      additionalCosts: {
        hardware: 20000,
        services: 8000,
        training: 5000,
        maintenance: 6000,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "2-3 weeks",
        installation: "1-2 weeks",
        configuration: "2-4 weeks",
        fullDeployment: "6-8 weeks",
      },
      complexity: "medium",
      resourcesRequired: {
        technical: 1.5,
        administrative: 1.0,
        training: 0.8,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: true,
        cloudNative: false,
        apiFirst: true,
        automation: false,
      },
      security: {
        threatDetection: true,
        incidentResponse: false,
        vulnerabilityAssessment: false,
        complianceReporting: true,
        riskScoring: false,
        forensics: false,
      },
      integration: {
        siem: true,
        itsm: false,
        activeDirectory: true,
        cloudProviders: false,
        networkVendors: true,
        securityTools: true,
      },
    },
    security: {
      cveCount: 6,
      lastCriticalCve: "2023-10-22",
      securityRating: 84,
      complianceSupport: ["PCI-DSS", "HIPAA"],
    },
    support: {
      availability: "Business hours",
      responseTime: "4-8 hours",
      channels: ["Phone", "Email"],
      documentation: "fair",
    },
    pros: ["Good value proposition", "Flexible deployment options", "Decent performance", "Lower complexity"],
    cons: ["Limited advanced features", "Smaller market presence", "Basic automation"],
    bestFor: ["Mid-market organizations", "Cost-conscious deployments", "Extreme network environments"],
    logo: "/extreme-logo.png",
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet FortiNAC",
    category: "niche",
    marketShare: 7.1,
    customerSatisfaction: 77,
    deployment: "hybrid",
    pricing: {
      model: "subscription",
      basePrice: 20000,
      pricePerDevice: 7.0,
      minimumDevices: 300,
      additionalCosts: {
        hardware: 30000,
        services: 12000,
        training: 8000,
        maintenance: 10000,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "3-4 weeks",
        installation: "2 weeks",
        configuration: "3-5 weeks",
        fullDeployment: "8-10 weeks",
      },
      complexity: "medium",
      resourcesRequired: {
        technical: 2.0,
        administrative: 1.2,
        training: 1.0,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: true,
        cloudNative: false,
        apiFirst: true,
        automation: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        vulnerabilityAssessment: true,
        complianceReporting: true,
        riskScoring: false,
        forensics: true,
      },
      integration: {
        siem: true,
        itsm: false,
        activeDirectory: true,
        cloudProviders: false,
        networkVendors: true,
        securityTools: true,
      },
    },
    security: {
      cveCount: 14,
      lastCriticalCve: "2023-12-05",
      securityRating: 79,
      complianceSupport: ["SOX", "PCI-DSS", "HIPAA"],
    },
    support: {
      availability: "24/7",
      responseTime: "2-4 hours",
      channels: ["Phone", "Email", "Portal"],
      documentation: "good",
    },
    pros: [
      "Strong security fabric integration",
      "Good threat protection",
      "Comprehensive features",
      "Fortinet ecosystem benefits",
    ],
    cons: ["Requires Fortinet infrastructure", "Complex configuration", "Vendor lock-in"],
    bestFor: [
      "Fortinet security fabric environments",
      "Security-focused organizations",
      "Integrated security deployments",
    ],
    logo: "/fortinet-logo.png",
  },
  arista: {
    id: "arista",
    name: "Arista CloudVision AGNI",
    category: "visionary",
    marketShare: 2.8,
    customerSatisfaction: 86,
    deployment: "cloud",
    pricing: {
      model: "subscription",
      basePrice: 25000,
      pricePerDevice: 8.0,
      minimumDevices: 1000,
      additionalCosts: {
        hardware: 50000,
        services: 15000,
        training: 10000,
        maintenance: 0,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "2-4 weeks",
        installation: "1-2 weeks",
        configuration: "3-4 weeks",
        fullDeployment: "6-8 weeks",
      },
      complexity: "medium",
      resourcesRequired: {
        technical: 1.8,
        administrative: 1.0,
        training: 1.0,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: true,
        iotSupport: true,
        cloudNative: true,
        apiFirst: true,
        automation: true,
      },
      security: {
        threatDetection: true,
        incidentResponse: true,
        vulnerabilityAssessment: false,
        complianceReporting: true,
        riskScoring: true,
        forensics: false,
      },
      integration: {
        siem: true,
        itsm: false,
        activeDirectory: true,
        cloudProviders: true,
        networkVendors: true,
        securityTools: true,
      },
    },
    security: {
      cveCount: 3,
      lastCriticalCve: "2023-07-10",
      securityRating: 91,
      complianceSupport: ["SOX", "PCI-DSS"],
    },
    support: {
      availability: "24/7",
      responseTime: "1-2 hours",
      channels: ["Phone", "Email", "Chat"],
      documentation: "excellent",
    },
    pros: ["High-performance architecture", "Cloud-first design", "Strong automation", "Excellent support"],
    cons: ["Requires Arista switches", "Limited market presence", "High minimum requirements"],
    bestFor: ["Arista network environments", "High-performance requirements", "Cloud-native deployments"],
    logo: "/arista-logo.png",
  },
  ivanti: {
    id: "ivanti",
    name: "Ivanti Neurons (Pulse Secure)",
    category: "niche",
    marketShare: 3.2,
    customerSatisfaction: 65,
    deployment: "hybrid",
    pricing: {
      model: "subscription",
      basePrice: 30000,
      pricePerDevice: 9.0,
      minimumDevices: 500,
      additionalCosts: {
        hardware: 40000,
        services: 18000,
        training: 12000,
        maintenance: 15000,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "4-6 weeks",
        installation: "2-3 weeks",
        configuration: "4-6 weeks",
        fullDeployment: "3-4 months",
      },
      complexity: "high",
      resourcesRequired: {
        technical: 2.5,
        administrative: 2.0,
        training: 1.5,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: false,
        cloudNative: false,
        apiFirst: false,
        automation: false,
      },
      security: {
        threatDetection: false,
        incidentResponse: false,
        vulnerabilityAssessment: false,
        complianceReporting: true,
        riskScoring: false,
        forensics: false,
      },
      integration: {
        siem: false,
        itsm: true,
        activeDirectory: true,
        cloudProviders: false,
        networkVendors: false,
        securityTools: false,
      },
    },
    security: {
      cveCount: 89,
      lastCriticalCve: "2024-03-01",
      securityRating: 45,
      complianceSupport: ["PCI-DSS"],
    },
    support: {
      availability: "Business hours",
      responseTime: "8-24 hours",
      channels: ["Email", "Portal"],
      documentation: "poor",
    },
    pros: ["Unified endpoint management", "VPN integration"],
    cons: [
      "Critical security vulnerabilities",
      "Active nation-state exploitation",
      "Poor security track record",
      "Limited NAC features",
    ],
    bestFor: ["Legacy environments (migration recommended)", "Unified endpoint management needs"],
    logo: "/placeholder-logo.png",
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft Network Policy Server (NPS)",
    category: "niche",
    marketShare: 15.2,
    customerSatisfaction: 70,
    deployment: "onprem",
    pricing: {
      model: "free",
      basePrice: 0,
      pricePerDevice: 0,
      minimumDevices: 0,
      additionalCosts: {
        hardware: 10000,
        services: 25000,
        training: 15000,
        maintenance: 8000,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "2-4 weeks",
        installation: "1 week",
        configuration: "2-6 weeks",
        fullDeployment: "4-8 weeks",
      },
      complexity: "medium",
      resourcesRequired: {
        technical: 2.0,
        administrative: 1.5,
        training: 1.0,
      },
    },
    features: {
      core: {
        deviceDiscovery: false,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: false,
        certificateManagement: true,
        reporting: false,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: false,
        cloudNative: false,
        apiFirst: false,
        automation: false,
      },
      security: {
        threatDetection: false,
        incidentResponse: false,
        vulnerabilityAssessment: false,
        complianceReporting: false,
        riskScoring: false,
        forensics: false,
      },
      integration: {
        siem: false,
        itsm: false,
        activeDirectory: true,
        cloudProviders: false,
        networkVendors: false,
        securityTools: false,
      },
    },
    security: {
      cveCount: 23,
      lastCriticalCve: "2023-11-14",
      securityRating: 68,
      complianceSupport: ["Basic Windows compliance"],
    },
    support: {
      availability: "Business hours",
      responseTime: "24-48 hours",
      channels: ["Phone", "Email"],
      documentation: "fair",
    },
    pros: ["Free with Windows Server", "Active Directory integration", "Basic RADIUS functionality"],
    cons: ["Very limited NAC features", "No device discovery", "No advanced security", "Windows-only"],
    bestFor: ["Basic RADIUS needs", "Windows-centric environments", "Budget-constrained deployments"],
    logo: "/microsoft-logo.png",
  },
  foxpass: {
    id: "foxpass",
    name: "FoxPass",
    category: "niche",
    marketShare: 1.8,
    customerSatisfaction: 83,
    deployment: "cloud",
    pricing: {
      model: "subscription",
      basePrice: 0,
      pricePerDevice: 3.0,
      minimumDevices: 10,
      additionalCosts: {
        hardware: 0,
        services: 2000,
        training: 1000,
        maintenance: 0,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "1-2 days",
        installation: "1 hour",
        configuration: "2-4 hours",
        fullDeployment: "1-2 days",
      },
      complexity: "low",
      resourcesRequired: {
        technical: 0.2,
        administrative: 0.1,
        training: 0.1,
      },
    },
    features: {
      core: {
        deviceDiscovery: false,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: false,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: false,
        cloudNative: true,
        apiFirst: true,
        automation: false,
      },
      security: {
        threatDetection: false,
        incidentResponse: false,
        vulnerabilityAssessment: false,
        complianceReporting: false,
        riskScoring: false,
        forensics: false,
      },
      integration: {
        siem: false,
        itsm: false,
        activeDirectory: true,
        cloudProviders: true,
        networkVendors: false,
        securityTools: false,
      },
    },
    security: {
      cveCount: 0,
      lastCriticalCve: "None",
      securityRating: 85,
      complianceSupport: ["Basic compliance"],
    },
    support: {
      availability: "Business hours",
      responseTime: "4-8 hours",
      channels: ["Email", "Chat"],
      documentation: "good",
    },
    pros: ["Simple cloud RADIUS", "Easy setup", "Good for SMB", "Affordable pricing"],
    cons: ["Limited NAC features", "No device discovery", "Basic functionality only"],
    bestFor: ["Small businesses", "Simple RADIUS needs", "Cloud-first organizations"],
    logo: "/foxpass-logo.png",
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "niche",
    marketShare: 2.1,
    customerSatisfaction: 78,
    deployment: "cloud",
    pricing: {
      model: "subscription",
      basePrice: 5000,
      pricePerDevice: 25.0,
      minimumDevices: 100,
      additionalCosts: {
        hardware: 0,
        services: 8000,
        training: 5000,
        maintenance: 0,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "1-2 weeks",
        installation: "2-3 days",
        configuration: "1-2 weeks",
        fullDeployment: "2-3 weeks",
      },
      complexity: "low",
      resourcesRequired: {
        technical: 0.8,
        administrative: 0.5,
        training: 0.5,
      },
    },
    features: {
      core: {
        deviceDiscovery: false,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: false,
        cloudNative: true,
        apiFirst: true,
        automation: false,
      },
      security: {
        threatDetection: false,
        incidentResponse: false,
        vulnerabilityAssessment: false,
        complianceReporting: true,
        riskScoring: false,
        forensics: false,
      },
      integration: {
        siem: false,
        itsm: false,
        activeDirectory: true,
        cloudProviders: true,
        networkVendors: false,
        securityTools: false,
      },
    },
    security: {
      cveCount: 2,
      lastCriticalCve: "2023-05-18",
      securityRating: 82,
      complianceSupport: ["PCI-DSS", "HIPAA"],
    },
    support: {
      availability: "Business hours",
      responseTime: "2-4 hours",
      channels: ["Phone", "Email", "Chat"],
      documentation: "good",
    },
    pros: ["Strong PKI management", "Certificate-based authentication", "Good for education", "Cloud-native"],
    cons: ["Expensive per device", "Limited NAC features", "Niche market focus"],
    bestFor: ["Education sector", "Certificate-based authentication", "PKI-focused deployments"],
    logo: "/securew2-logo.png",
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "niche",
    marketShare: 1.2,
    customerSatisfaction: 72,
    deployment: "onprem",
    pricing: {
      model: "free",
      basePrice: 0,
      pricePerDevice: 0,
      minimumDevices: 0,
      additionalCosts: {
        hardware: 15000,
        services: 35000,
        training: 20000,
        maintenance: 25000,
      },
    },
    implementation: {
      deploymentTime: {
        planning: "4-8 weeks",
        installation: "2-4 weeks",
        configuration: "6-12 weeks",
        fullDeployment: "3-6 months",
      },
      complexity: "very-high",
      resourcesRequired: {
        technical: 3.5,
        administrative: 2.5,
        training: 2.0,
      },
    },
    features: {
      core: {
        deviceDiscovery: true,
        userAuthentication: true,
        policyEnforcement: true,
        guestAccess: true,
        certificateManagement: true,
        reporting: true,
      },
      advanced: {
        zeroTrust: false,
        aiMl: false,
        iotSupport: true,
        cloudNative: false,
        apiFirst: true,
        automation: false,
      },
      security: {
        threatDetection: true,
        incidentResponse: false,
        vulnerabilityAssessment: true,
        complianceReporting: true,
        riskScoring: false,
        forensics: true,
      },
      integration: {
        siem: true,
        itsm: false,
        activeDirectory: true,
        cloudProviders: false,
        networkVendors: true,
        securityTools: true,
      },
    },
    security: {
      cveCount: 15,
      lastCriticalCve: "2023-09-28",
      securityRating: 74,
      complianceSupport: ["Basic compliance"],
    },
    support: {
      availability: "Community/Commercial",
      responseTime: "Varies",
      channels: ["Email", "Forum"],
      documentation: "fair",
    },
    pros: ["Open source", "No licensing costs", "Full feature set", "Customizable"],
    cons: [
      "High implementation complexity",
      "Requires significant expertise",
      "Limited commercial support",
      "High total cost with services",
    ],
    bestFor: ["Organizations with strong technical teams", "Open source requirements", "Highly customized deployments"],
    logo: "/packetfence-logo.png",
  },
}

export const getVendorLogoPath = (vendorId: string): string => {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  return vendor?.logo || "/placeholder-logo.png"
}

export const getVendorsByCategory = (category: string) => {
  return Object.values(ComprehensiveVendorDatabase).filter((vendor) => vendor.category === category)
}

export const getTopVendorsByMarketShare = (limit = 5) => {
  return Object.values(ComprehensiveVendorDatabase)
    .sort((a, b) => b.marketShare - a.marketShare)
    .slice(0, limit)
}

export const getVendorSecurityRatings = () => {
  return Object.values(ComprehensiveVendorDatabase)
    .map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      securityRating: vendor.security.securityRating,
      cveCount: vendor.security.cveCount,
    }))
    .sort((a, b) => b.securityRating - a.securityRating)
}

export const searchVendors = (query: string): VendorData[] => {
  if (!query) {
    return Object.values(ComprehensiveVendorDatabase)
  }
  const lowercasedQuery = query.toLowerCase()
  return Object.values(ComprehensiveVendorDatabase).filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(lowercasedQuery) ||
      vendor.id.toLowerCase().includes(lowercasedQuery) ||
      vendor.bestFor.some((item) => item.toLowerCase().includes(lowercasedQuery)) ||
      vendor.pros.some((item) => item.toLowerCase().includes(lowercasedQuery)) ||
      vendor.cons.some((item) => item.toLowerCase().includes(lowercasedQuery)),
  )
}
