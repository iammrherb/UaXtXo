// Comprehensive Vendor Database with Enhanced Features and Market Data

export interface VendorFeatures {
  cloudNative: boolean
  zeroTrust: boolean
  aiMl: boolean
  iotSupport: boolean
  byod: boolean
  guestAccess: boolean
  apiIntegration: boolean
  singleSignOn: boolean
  multiTenant: boolean
  agentless: boolean
  realTimeVisibility: boolean
  threatDetection: boolean
  behaviorAnalytics: boolean
  microsegmentation: boolean
}

export interface MarketMetrics {
  marketShare: number // 0-100
  customerSatisfaction: number // 0-5
  deploymentSuccess: number // 0-100
  supportRating: number // 0-5
}

export interface TechnicalSpecs {
  maxDevices: number | string
  maxUsers: number | string
  uptime: number // percentage
  mttr: number // minutes
  apiRateLimit: string
}

export interface Implementation {
  complexity: "low" | "medium" | "high" | "very-high"
  deploymentTime: {
    poc?: string
    pilot: string
    fullDeployment: string
  }
  requiredResources: {
    internal: number
    vendor?: number
    training: number
    ongoing: number
  }
}

export interface ComprehensiveVendorData {
  id: string
  name: string
  category: "enterprise" | "mid-market" | "smb"
  description: string
  logo: string
  features: VendorFeatures
  marketMetrics: MarketMetrics
  technicalSpecs: TechnicalSpecs
  implementation: Implementation
  pricing: {
    model: string
    startingPrice: number
    currency: string
  }
}

export const ComprehensiveVendorDatabase: Record<string, ComprehensiveVendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "enterprise",
    description: "AI-powered cloud-native zero-trust NAC with unmatched ease of deployment",
    logo: "/portnox-logo.png",
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
      agentless: true,
      realTimeVisibility: true,
      threatDetection: true,
      behaviorAnalytics: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 15,
      customerSatisfaction: 4.8,
      deploymentSuccess: 98,
      supportRating: 4.9,
    },
    technicalSpecs: {
      maxDevices: "Unlimited",
      maxUsers: "Unlimited",
      uptime: 99.99,
      mttr: 5,
      apiRateLimit: "10,000/min",
    },
    implementation: {
      complexity: "low",
      deploymentTime: {
        poc: "4 hours",
        pilot: "1-2 weeks",
        fullDeployment: "2-4 weeks",
      },
      requiredResources: {
        internal: 0.1,
        vendor: 0,
        training: 4,
        ongoing: 0.1,
      },
    },
    pricing: {
      model: "SaaS Subscription",
      startingPrice: 3.0,
      currency: "USD",
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    category: "enterprise",
    description: "Industry standard enterprise NAC with complex deployment and high costs",
    logo: "/cisco-logo.png",
    features: {
      cloudNative: false,
      zeroTrust: false,
      aiMl: false,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: false,
      agentless: false,
      realTimeVisibility: true,
      threatDetection: true,
      behaviorAnalytics: false,
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
      uptime: 99.5,
      mttr: 360,
      apiRateLimit: "Limited",
    },
    implementation: {
      complexity: "very-high",
      deploymentTime: {
        poc: "1-2 weeks",
        pilot: "3-6 months",
        fullDeployment: "6-12 months",
      },
      requiredResources: {
        internal: 3.0,
        vendor: 1.5,
        training: 80,
        ongoing: 2.5,
      },
    },
    pricing: {
      model: "Perpetual + Subscription",
      startingPrice: 12.0,
      currency: "USD",
    },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "enterprise",
    description: "HPE Aruba's network access control with strong wireless integration",
    logo: "/aruba-logo.png",
    features: {
      cloudNative: false,
      zeroTrust: false,
      aiMl: true,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: false,
      agentless: true,
      realTimeVisibility: true,
      threatDetection: true,
      behaviorAnalytics: false,
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
      uptime: 99.0,
      mttr: 240,
      apiRateLimit: "Limited",
    },
    implementation: {
      complexity: "high",
      deploymentTime: {
        poc: "1 week",
        pilot: "2-4 weeks",
        fullDeployment: "3-6 months",
      },
      requiredResources: {
        internal: 2.0,
        vendor: 1.0,
        training: 40,
        ongoing: 1.5,
      },
    },
    pricing: {
      model: "Perpetual + Support",
      startingPrice: 8.5,
      currency: "USD",
    },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "mid-market",
    description: "Cloud-managed IT with integrated access control, requires hardware refresh",
    logo: "/meraki-logo.png",
    features: {
      cloudNative: false,
      zeroTrust: false,
      aiMl: false,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: false,
      multiTenant: true,
      agentless: false,
      realTimeVisibility: false,
      threatDetection: true,
      behaviorAnalytics: false,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 12,
      customerSatisfaction: 3.8,
      deploymentSuccess: 80,
      supportRating: 4.0,
    },
    technicalSpecs: {
      maxDevices: "10,000 per network",
      maxUsers: "Hardware dependent",
      uptime: 99.9,
      mttr: 240,
      apiRateLimit: "5/second",
    },
    implementation: {
      complexity: "medium",
      deploymentTime: {
        poc: "1 week",
        pilot: "4-6 weeks",
        fullDeployment: "3-6 months",
      },
      requiredResources: {
        internal: 1.5,
        vendor: 0.5,
        training: 40,
        ongoing: 1.0,
      },
    },
    pricing: {
      model: "Hardware + Subscription",
      startingPrice: 15.0,
      currency: "USD",
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout eyeSight",
    category: "enterprise",
    description: "Agentless device visibility and control platform with high complexity",
    logo: "/forescout-logo.png",
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
      agentless: true,
      realTimeVisibility: true,
      threatDetection: true,
      behaviorAnalytics: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 8,
      customerSatisfaction: 3.4,
      deploymentSuccess: 60,
      supportRating: 3.2,
    },
    technicalSpecs: {
      maxDevices: "Medium",
      maxUsers: "Medium",
      uptime: 98.5,
      mttr: 480,
      apiRateLimit: "Limited",
    },
    implementation: {
      complexity: "high",
      deploymentTime: {
        poc: "2 weeks",
        pilot: "6-8 weeks",
        fullDeployment: "4-8 months",
      },
      requiredResources: {
        internal: 2.5,
        vendor: 1.0,
        training: 32,
        ongoing: 2.0,
      },
    },
    pricing: {
      model: "Subscription",
      startingPrice: 15.0,
      currency: "USD",
    },
  },
  fortinet: {
    id: "fortinet",
    name: "FortiNAC",
    category: "enterprise",
    description: "Network access control integrated with Fortinet Security Fabric",
    logo: "/fortinet-logo.png",
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
      agentless: false,
      realTimeVisibility: true,
      threatDetection: true,
      behaviorAnalytics: false,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 10,
      customerSatisfaction: 3.6,
      deploymentSuccess: 70,
      supportRating: 3.7,
    },
    technicalSpecs: {
      maxDevices: "Medium",
      maxUsers: "Medium",
      uptime: 99.0,
      mttr: 180,
      apiRateLimit: "Moderate",
    },
    implementation: {
      complexity: "medium",
      deploymentTime: {
        poc: "1 week",
        pilot: "3-4 weeks",
        fullDeployment: "2-4 months",
      },
      requiredResources: {
        internal: 2.5,
        vendor: 0.5,
        training: 32,
        ongoing: 1.5,
      },
    },
    pricing: {
      model: "Perpetual + Subscription",
      startingPrice: 9.5,
      currency: "USD",
    },
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    category: "enterprise",
    description: "AI-driven cloud NAC for modern enterprises with good automation",
    logo: "/juniper-logo.png",
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
      agentless: false,
      realTimeVisibility: true,
      threatDetection: true,
      behaviorAnalytics: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 5,
      customerSatisfaction: 4.2,
      deploymentSuccess: 85,
      supportRating: 4.1,
    },
    technicalSpecs: {
      maxDevices: "High",
      maxUsers: "High",
      uptime: 99.5,
      mttr: 120,
      apiRateLimit: "Good",
    },
    implementation: {
      complexity: "low",
      deploymentTime: {
        poc: "3 days",
        pilot: "1-2 weeks",
        fullDeployment: "3-5 weeks",
      },
      requiredResources: {
        internal: 0.5,
        vendor: 0.2,
        training: 8,
        ongoing: 0.3,
      },
    },
    pricing: {
      model: "SaaS Subscription",
      startingPrice: 8.0,
      currency: "USD",
    },
  },
  arista: {
    id: "arista",
    name: "Arista CUE",
    category: "enterprise",
    description: "Cloud-managed network services including NAC with high performance focus",
    logo: "/arista-logo.png",
    features: {
      cloudNative: true,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
      byod: false,
      guestAccess: false,
      apiIntegration: true,
      singleSignOn: false,
      multiTenant: false,
      agentless: false,
      realTimeVisibility: true,
      threatDetection: true,
      behaviorAnalytics: true,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 3,
      customerSatisfaction: 4.0,
      deploymentSuccess: 75,
      supportRating: 4.2,
    },
    technicalSpecs: {
      maxDevices: "High",
      maxUsers: "High",
      uptime: 99.8,
      mttr: 90,
      apiRateLimit: "High",
    },
    implementation: {
      complexity: "medium",
      deploymentTime: {
        poc: "1 week",
        pilot: "2-3 weeks",
        fullDeployment: "4-6 weeks",
      },
      requiredResources: {
        internal: 1.0,
        vendor: 0.3,
        training: 16,
        ongoing: 0.5,
      },
    },
    pricing: {
      model: "SaaS Subscription",
      startingPrice: 7.0,
      currency: "USD",
    },
  },
  extreme: {
    id: "extreme",
    name: "ExtremeControl",
    category: "mid-market",
    description: "Policy-based NAC for wired and wireless networks with moderate complexity",
    logo: "/extreme-logo.png",
    features: {
      cloudNative: false,
      zeroTrust: false,
      aiMl: false,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: false,
      agentless: true,
      realTimeVisibility: true,
      threatDetection: false,
      behaviorAnalytics: false,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 4,
      customerSatisfaction: 3.3,
      deploymentSuccess: 70,
      supportRating: 3.4,
    },
    technicalSpecs: {
      maxDevices: "Medium",
      maxUsers: "Medium",
      uptime: 98.5,
      mttr: 300,
      apiRateLimit: "Limited",
    },
    implementation: {
      complexity: "medium",
      deploymentTime: {
        poc: "1 week",
        pilot: "4-6 weeks",
        fullDeployment: "2-3 months",
      },
      requiredResources: {
        internal: 2.0,
        vendor: 0.5,
        training: 24,
        ongoing: 1.2,
      },
    },
    pricing: {
      model: "Subscription + Hardware",
      startingPrice: 10.0,
      currency: "USD",
    },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft Intune/NPS",
    category: "enterprise",
    description: "Leverages Intune for MDM and NPS for network policy as part of M365 ecosystem",
    logo: "/microsoft-logo.png",
    features: {
      cloudNative: true,
      zeroTrust: true,
      aiMl: false,
      iotSupport: false,
      byod: true,
      guestAccess: false,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: true,
      agentless: false,
      realTimeVisibility: false,
      threatDetection: false,
      behaviorAnalytics: false,
      microsegmentation: false,
    },
    marketMetrics: {
      marketShare: 25,
      customerSatisfaction: 3.7,
      deploymentSuccess: 80,
      supportRating: 3.9,
    },
    technicalSpecs: {
      maxDevices: "High (with Azure)",
      maxUsers: "Unlimited",
      uptime: 99.9,
      mttr: 120,
      apiRateLimit: "High",
    },
    implementation: {
      complexity: "medium",
      deploymentTime: {
        poc: "3 days",
        pilot: "2-3 weeks",
        fullDeployment: "6-8 weeks",
      },
      requiredResources: {
        internal: 1.5,
        vendor: 0,
        training: 20,
        ongoing: 0.8,
      },
    },
    pricing: {
      model: "Subscription (Part of M365)",
      startingPrice: 5.0,
      currency: "USD",
    },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "smb",
    description: "Open source NAC solution requiring extensive customization and expertise",
    logo: "/packetfence-logo.png",
    features: {
      cloudNative: false,
      zeroTrust: false,
      aiMl: false,
      iotSupport: true,
      byod: true,
      guestAccess: true,
      apiIntegration: true,
      singleSignOn: false,
      multiTenant: false,
      agentless: true,
      realTimeVisibility: true,
      threatDetection: false,
      behaviorAnalytics: false,
      microsegmentation: true,
    },
    marketMetrics: {
      marketShare: 2,
      customerSatisfaction: 3.0,
      deploymentSuccess: 45,
      supportRating: 2.8,
    },
    technicalSpecs: {
      maxDevices: "Varies",
      maxUsers: "Varies",
      uptime: 95.0,
      mttr: 720,
      apiRateLimit: "Custom",
    },
    implementation: {
      complexity: "very-high",
      deploymentTime: {
        poc: "2 weeks",
        pilot: "8-12 weeks",
        fullDeployment: "4-6 months",
      },
      requiredResources: {
        internal: 4.0,
        vendor: 0,
        training: 80,
        ongoing: 3.0,
      },
    },
    pricing: {
      model: "Open Source + Support",
      startingPrice: 0,
      currency: "USD",
    },
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    category: "smb",
    description: "Simple cloud-hosted RADIUS for basic authentication with limited NAC features",
    logo: "/foxpass-logo.png",
    features: {
      cloudNative: true,
      zeroTrust: false,
      aiMl: false,
      iotSupport: false,
      byod: false,
      guestAccess: false,
      apiIntegration: true,
      singleSignOn: true,
      multiTenant: false,
      agentless: true,
      realTimeVisibility: false,
      threatDetection: false,
      behaviorAnalytics: false,
      microsegmentation: false,
    },
    marketMetrics: {
      marketShare: 1,
      customerSatisfaction: 3.5,
      deploymentSuccess: 90,
      supportRating: 3.8,
    },
    technicalSpecs: {
      maxDevices: "Medium",
      maxUsers: "Medium",
      uptime: 99.5,
      mttr: 30,
      apiRateLimit: "Good",
    },
    implementation: {
      complexity: "low",
      deploymentTime: {
        poc: "1 day",
        pilot: "3 days",
        fullDeployment: "1 week",
      },
      requiredResources: {
        internal: 0.25,
        vendor: 0,
        training: 2,
        ongoing: 0.1,
      },
    },
    pricing: {
      model: "SaaS Subscription",
      startingPrice: 1.5,
      currency: "USD",
    },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "smb",
    description: "Cloud-based PKI and RADIUS for certificate-based authentication",
    logo: "/securew2-logo.png",
    features: {
      cloudNative: true,
      zeroTrust: false,
      aiMl: false,
      iotSupport: false,
      byod: true,
      guestAccess: false,
      apiIntegration: true,
      singleSignOn: false,
      multiTenant: false,
      agentless: true,
      realTimeVisibility: false,
      threatDetection: false,
      behaviorAnalytics: false,
      microsegmentation: false,
    },
    marketMetrics: {
      marketShare: 1,
      customerSatisfaction: 3.8,
      deploymentSuccess: 85,
      supportRating: 4.0,
    },
    technicalSpecs: {
      maxDevices: "Medium",
      maxUsers: "Medium",
      uptime: 99.0,
      mttr: 60,
      apiRateLimit: "Moderate",
    },
    implementation: {
      complexity: "low",
      deploymentTime: {
        poc: "2 days",
        pilot: "1 week",
        fullDeployment: "2 weeks",
      },
      requiredResources: {
        internal: 0.5,
        vendor: 0.1,
        training: 8,
        ongoing: 0.2,
      },
    },
    pricing: {
      model: "SaaS Subscription",
      startingPrice: 2.5,
      currency: "USD",
    },
  },
  radiusaas: {
    id: "radiusaas",
    name: "RADIUS-as-a-Service",
    category: "smb",
    description: "Managed RADIUS service for various authentication needs with basic features",
    logo: "/radiusaas-logo.png",
    features: {
      cloudNative: true,
      zeroTrust: false,
      aiMl: false,
      iotSupport: false,
      byod: false,
      guestAccess: false,
      apiIntegration: false,
      singleSignOn: false,
      multiTenant: false,
      agentless: true,
      realTimeVisibility: false,
      threatDetection: false,
      behaviorAnalytics: false,
      microsegmentation: false,
    },
    marketMetrics: {
      marketShare: 0.5,
      customerSatisfaction: 3.2,
      deploymentSuccess: 80,
      supportRating: 3.0,
    },
    technicalSpecs: {
      maxDevices: "Medium",
      maxUsers: "Medium",
      uptime: 98.0,
      mttr: 120,
      apiRateLimit: "Limited",
    },
    implementation: {
      complexity: "low",
      deploymentTime: {
        poc: "1 day",
        pilot: "5 days",
        fullDeployment: "1 week",
      },
      requiredResources: {
        internal: 0.2,
        vendor: 0,
        training: 4,
        ongoing: 0.1,
      },
    },
    pricing: {
      model: "SaaS Subscription",
      startingPrice: 1.0,
      currency: "USD",
    },
  },
}
