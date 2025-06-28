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
  category: "enterprise" | "mid-market" | "sme" | "cloud-native"
  description: string
  marketPosition: "leader" | "challenger" | "visionary" | "niche"
  founded: number
  headquarters: string
  employees: string
  revenue: string
  customerBase: {
    total: number
    enterprise: number
    midMarket: number
    sme: number
  }
  marketShare: number
  npsScore: number
  csatScore: number
  retentionRate: number
  features: VendorFeatures
  pricing: VendorPricing
  implementation: VendorImplementation
  support: VendorSupport
  compliance: {
    frameworks: string[]
    certifications: string[]
    automationLevel: number
    auditReadiness: number
  }
  strengths: string[]
  weaknesses: string[]
  idealFor: string[]
  competitiveAdvantages: string[]
  recentUpdates: string[]
  logoPath: string
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    category: "cloud-native",
    description: "AI-powered cloud-native NAC with zero-trust architecture and rapid deployment",
    marketPosition: "visionary",
    founded: 2008,
    headquarters: "New York, USA",
    employees: "200-500",
    revenue: "$50M+",
    customerBase: {
      total: 1500,
      enterprise: 400,
      midMarket: 800,
      sme: 300,
    },
    marketShare: 3.2,
    npsScore: 72,
    csatScore: 4.6,
    retentionRate: 94,
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
      basePrice: 4.0,
      currency: "USD",
      billingCycle: "monthly",
      volumeDiscounts: {
        tier1: { threshold: 1000, discount: 0.15 },
        tier2: { threshold: 5000, discount: 0.25 },
        tier3: { threshold: 10000, discount: 0.35 },
      },
      addOns: {
        atp: {
          name: "Advanced Threat Protection",
          price: 1.5,
          description: "ML-based threat detection and SOAR integration",
        },
        compliance: {
          name: "Compliance Automation",
          price: 1.0,
          description: "Automated reporting and continuous monitoring",
        },
        iot: {
          name: "IoT/OT Security",
          price: 2.0,
          description: "Industrial device profiling and OT protocol support",
        },
        analytics: {
          name: "Risk Analytics",
          price: 1.5,
          description: "Advanced risk scoring and behavioral analytics",
        },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "2-4 hours",
        fullDeployment: "1-2 weeks",
      },
      complexity: "low",
      hardwareRequired: false,
      cloudOptions: true,
      onPremiseOptions: false,
      hybridOptions: true,
      professionalServices: {
        required: false,
        cost: 15000,
        duration: "1-2 weeks",
      },
    },
    support: {
      levels: ["Standard", "Premium", "Enterprise"],
      sla: {
        uptime: 99.9,
        responseTime: "< 4 hours",
      },
      channels: ["Email", "Phone", "Chat", "Portal"],
      documentation: "excellent",
      community: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST", "FedRAMP"],
      certifications: ["SOC 2 Type II", "ISO 27001", "FedRAMP Authorized"],
      automationLevel: 85,
      auditReadiness: 92,
    },
    strengths: [
      "Fastest deployment in market",
      "AI-powered automation",
      "Cloud-native architecture",
      "No hardware requirements",
      "Excellent ROI",
    ],
    weaknesses: ["Newer market presence", "Limited on-premise options"],
    idealFor: ["Cloud-first organizations", "Rapid deployments", "Cost-conscious buyers", "SMB to Enterprise"],
    competitiveAdvantages: [
      "99% faster deployment than competitors",
      "AI-driven policy automation",
      "Zero hardware footprint",
      "Lowest TCO in market",
    ],
    recentUpdates: [
      "Enhanced AI threat detection (Q4 2024)",
      "New IoT/OT module launch",
      "FedRAMP authorization achieved",
    ],
    logoPath: "/portnox-logo.png",
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    category: "enterprise",
    description: "Industry-leading identity services engine with comprehensive policy management",
    marketPosition: "leader",
    founded: 1984,
    headquarters: "San Jose, USA",
    employees: "80,000+",
    revenue: "$51.6B",
    customerBase: {
      total: 25000,
      enterprise: 15000,
      midMarket: 8000,
      sme: 2000,
    },
    marketShare: 35.2,
    npsScore: 42,
    csatScore: 3.8,
    retentionRate: 87,
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
      basePrice: 12.0,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 100,
      volumeDiscounts: {
        tier1: { threshold: 1000, discount: 0.1 },
        tier2: { threshold: 5000, discount: 0.2 },
        tier3: { threshold: 10000, discount: 0.3 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "4-8 weeks",
        fullDeployment: "6-12 months",
      },
      complexity: "high",
      hardwareRequired: true,
      cloudOptions: true,
      onPremiseOptions: true,
      hybridOptions: true,
      professionalServices: {
        required: true,
        cost: 150000,
        duration: "3-6 months",
      },
    },
    support: {
      levels: ["Basic", "Enhanced", "Premium"],
      sla: {
        uptime: 99.5,
        responseTime: "< 8 hours",
      },
      channels: ["Email", "Phone", "Portal", "TAC"],
      documentation: "excellent",
      community: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST", "Common Criteria"],
      certifications: ["FIPS 140-2", "Common Criteria", "ISO 27001"],
      automationLevel: 35,
      auditReadiness: 78,
    },
    strengths: [
      "Market leader with proven track record",
      "Comprehensive feature set",
      "Strong ecosystem integration",
      "Enterprise-grade scalability",
    ],
    weaknesses: [
      "Complex deployment and management",
      "High total cost of ownership",
      "Requires significant hardware investment",
      "Long implementation timelines",
    ],
    idealFor: ["Large enterprises", "Complex network environments", "Cisco-centric infrastructures"],
    competitiveAdvantages: [
      "Largest market share",
      "Comprehensive Cisco ecosystem integration",
      "Mature product with extensive features",
    ],
    recentUpdates: [
      "Enhanced cloud management (2024)",
      "Improved threat intelligence integration",
      "New API capabilities",
    ],
    logoPath: "/cisco-logo.png",
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "enterprise",
    description: "Policy management platform with strong wireless integration and user experience focus",
    marketPosition: "challenger",
    founded: 2002,
    headquarters: "Santa Clara, USA",
    employees: "3,000+",
    revenue: "$3.2B",
    customerBase: {
      total: 18000,
      enterprise: 8000,
      midMarket: 7000,
      sme: 3000,
    },
    marketShare: 22.1,
    npsScore: 58,
    csatScore: 4.1,
    retentionRate: 89,
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
      basePrice: 8.5,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 50,
      volumeDiscounts: {
        tier1: { threshold: 1000, discount: 0.12 },
        tier2: { threshold: 5000, discount: 0.22 },
        tier3: { threshold: 10000, discount: 0.32 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "2-4 weeks",
        fullDeployment: "3-6 months",
      },
      complexity: "medium",
      hardwareRequired: true,
      cloudOptions: true,
      onPremiseOptions: true,
      hybridOptions: true,
      professionalServices: {
        required: true,
        cost: 75000,
        duration: "2-4 months",
      },
    },
    support: {
      levels: ["Foundation", "Enhanced", "Premium"],
      sla: {
        uptime: 99.7,
        responseTime: "< 6 hours",
      },
      channels: ["Email", "Phone", "Chat", "Portal"],
      documentation: "good",
      community: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST"],
      certifications: ["SOC 2", "ISO 27001", "FIPS 140-2"],
      automationLevel: 65,
      auditReadiness: 82,
    },
    strengths: [
      "Strong wireless integration",
      "User-friendly interface",
      "Good AI/ML capabilities",
      "Solid ecosystem partnerships",
    ],
    weaknesses: ["Hardware dependency", "Complex licensing model", "Limited cloud-native features"],
    idealFor: ["Aruba wireless environments", "Mid to large enterprises", "Education sector"],
    competitiveAdvantages: ["Best-in-class wireless integration", "Strong user experience focus", "AI-driven insights"],
    recentUpdates: ["Enhanced AI analytics (2024)", "New cloud management features", "Improved IoT device profiling"],
    logoPath: "/aruba-logo.png",
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "mid-market",
    description: "Cloud-managed networking with integrated security and simple deployment",
    marketPosition: "challenger",
    founded: 2006,
    headquarters: "San Francisco, USA",
    employees: "1,500+",
    revenue: "$1.8B",
    customerBase: {
      total: 12000,
      enterprise: 3000,
      midMarket: 6000,
      sme: 3000,
    },
    marketShare: 15.3,
    npsScore: 65,
    csatScore: 4.3,
    retentionRate: 91,
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
      basePrice: 6.0,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 25,
      volumeDiscounts: {
        tier1: { threshold: 500, discount: 0.1 },
        tier2: { threshold: 2000, discount: 0.18 },
        tier3: { threshold: 5000, discount: 0.25 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "1-2 weeks",
        fullDeployment: "1-3 months",
      },
      complexity: "low",
      hardwareRequired: true,
      cloudOptions: true,
      onPremiseOptions: false,
      hybridOptions: false,
      professionalServices: {
        required: false,
        cost: 25000,
        duration: "1-2 months",
      },
    },
    support: {
      levels: ["Standard", "Premium"],
      sla: {
        uptime: 99.8,
        responseTime: "< 4 hours",
      },
      channels: ["Email", "Phone", "Chat", "Portal"],
      documentation: "good",
      community: true,
    },
    compliance: {
      frameworks: ["PCI-DSS", "GDPR", "HIPAA"],
      certifications: ["SOC 2", "FedRAMP"],
      automationLevel: 45,
      auditReadiness: 65,
    },
    strengths: [
      "Simple cloud management",
      "Easy deployment",
      "Good for distributed environments",
      "Strong dashboard and reporting",
    ],
    weaknesses: [
      "Limited enterprise features",
      "Hardware lock-in",
      "Basic compliance capabilities",
      "No on-premise option",
    ],
    idealFor: ["SMB to mid-market", "Distributed organizations", "Simple deployments"],
    competitiveAdvantages: ["Simplest deployment model", "Cloud-first architecture", "Good for multi-site deployments"],
    recentUpdates: ["Enhanced security features (2024)", "New API capabilities", "Improved mobile management"],
    logoPath: "/meraki-logo.png",
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    category: "enterprise",
    description: "Device visibility and compliance platform with strong IoT and OT security focus",
    marketPosition: "niche",
    founded: 2000,
    headquarters: "San Jose, USA",
    employees: "1,000+",
    revenue: "$400M",
    customerBase: {
      total: 3500,
      enterprise: 2000,
      midMarket: 1200,
      sme: 300,
    },
    marketShare: 8.7,
    npsScore: 48,
    csatScore: 3.9,
    retentionRate: 85,
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
      basePrice: 15.0,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 500,
      volumeDiscounts: {
        tier1: { threshold: 2000, discount: 0.15 },
        tier2: { threshold: 10000, discount: 0.25 },
        tier3: { threshold: 25000, discount: 0.35 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "6-8 weeks",
        fullDeployment: "4-8 months",
      },
      complexity: "high",
      hardwareRequired: true,
      cloudOptions: true,
      onPremiseOptions: true,
      hybridOptions: true,
      professionalServices: {
        required: true,
        cost: 200000,
        duration: "4-6 months",
      },
    },
    support: {
      levels: ["Standard", "Premium", "Enterprise"],
      sla: {
        uptime: 99.5,
        responseTime: "< 8 hours",
      },
      channels: ["Email", "Phone", "Portal"],
      documentation: "fair",
      community: false,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST", "NERC CIP"],
      certifications: ["SOC 2", "ISO 27001", "Common Criteria"],
      automationLevel: 70,
      auditReadiness: 88,
    },
    strengths: [
      "Excellent device visibility",
      "Strong IoT/OT security",
      "Comprehensive compliance features",
      "Good threat detection",
    ],
    weaknesses: ["Complex deployment", "High cost", "Limited guest access features", "Steep learning curve"],
    idealFor: ["Large enterprises", "IoT/OT heavy environments", "Compliance-focused organizations"],
    competitiveAdvantages: [
      "Best-in-class device visibility",
      "Strong IoT/OT security capabilities",
      "Comprehensive compliance automation",
    ],
    recentUpdates: [
      "Enhanced OT security features (2024)",
      "New cloud deployment options",
      "Improved threat intelligence",
    ],
    logoPath: "/forescout-logo.png",
  },
  extreme: {
    id: "extreme",
    name: "Extreme Networks",
    category: "mid-market",
    description: "Network infrastructure with integrated access control and cloud management",
    marketPosition: "niche",
    founded: 1996,
    headquarters: "San Jose, USA",
    employees: "2,500+",
    revenue: "$1.0B",
    customerBase: {
      total: 8000,
      enterprise: 2000,
      midMarket: 4000,
      sme: 2000,
    },
    marketShare: 5.2,
    npsScore: 52,
    csatScore: 3.7,
    retentionRate: 82,
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: false,
        compliance: false,
        reporting: true,
        integration: true,
        cloudNative: true,
      },
      advanced: {
        aiMl: true,
        zeroTrust: false,
        automation: true,
        api: true,
        multiTenant: false,
        federation: false,
        riskScoring: false,
        behaviorAnalytics: true,
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
      basePrice: 5.5,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 100,
      volumeDiscounts: {
        tier1: { threshold: 1000, discount: 0.1 },
        tier2: { threshold: 3000, discount: 0.2 },
        tier3: { threshold: 8000, discount: 0.3 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "2-3 weeks",
        fullDeployment: "2-4 months",
      },
      complexity: "medium",
      hardwareRequired: true,
      cloudOptions: true,
      onPremiseOptions: true,
      hybridOptions: true,
      professionalServices: {
        required: true,
        cost: 50000,
        duration: "2-3 months",
      },
    },
    support: {
      levels: ["Basic", "Advanced", "Premium"],
      sla: {
        uptime: 99.5,
        responseTime: "< 6 hours",
      },
      channels: ["Email", "Phone", "Portal"],
      documentation: "good",
      community: true,
    },
    compliance: {
      frameworks: ["PCI-DSS", "GDPR", "HIPAA"],
      certifications: ["SOC 2"],
      automationLevel: 40,
      auditReadiness: 60,
    },
    strengths: ["Good cloud management", "AI-driven insights", "Competitive pricing", "Strong wireless integration"],
    weaknesses: [
      "Limited enterprise features",
      "Weak compliance capabilities",
      "Small market presence",
      "Limited IoT support",
    ],
    idealFor: ["Mid-market organizations", "Education", "Hospitality"],
    competitiveAdvantages: ["AI-driven network insights", "Good price-performance ratio", "Cloud-first approach"],
    recentUpdates: ["Enhanced AI analytics (2024)", "New cloud features", "Improved user experience"],
    logoPath: "/extreme-logo.png",
  },
  arista: {
    id: "arista",
    name: "Arista Networks",
    category: "enterprise",
    description: "High-performance networking with integrated security and automation capabilities",
    marketPosition: "niche",
    founded: 2004,
    headquarters: "Santa Clara, USA",
    employees: "3,500+",
    revenue: "$4.4B",
    customerBase: {
      total: 2500,
      enterprise: 1800,
      midMarket: 600,
      sme: 100,
    },
    marketShare: 3.8,
    npsScore: 68,
    csatScore: 4.4,
    retentionRate: 93,
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: false,
        byod: false,
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
        certificateManagement: true,
        vulnerabilityAssessment: true,
      },
    },
    pricing: {
      model: "per-device",
      basePrice: 18.0,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 1000,
      volumeDiscounts: {
        tier1: { threshold: 5000, discount: 0.1 },
        tier2: { threshold: 15000, discount: 0.2 },
        tier3: { threshold: 30000, discount: 0.3 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "8-12 weeks",
        fullDeployment: "6-12 months",
      },
      complexity: "high",
      hardwareRequired: true,
      cloudOptions: false,
      onPremiseOptions: true,
      hybridOptions: false,
      professionalServices: {
        required: true,
        cost: 300000,
        duration: "6-9 months",
      },
    },
    support: {
      levels: ["Standard", "Premium", "Elite"],
      sla: {
        uptime: 99.9,
        responseTime: "< 2 hours",
      },
      channels: ["Email", "Phone", "Portal", "TAC"],
      documentation: "excellent",
      community: false,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST"],
      certifications: ["FIPS 140-2", "Common Criteria", "ISO 27001"],
      automationLevel: 80,
      auditReadiness: 90,
    },
    strengths: [
      "High-performance networking",
      "Excellent automation",
      "Strong security features",
      "Premium support quality",
    ],
    weaknesses: ["Very high cost", "Complex deployment", "Limited cloud options", "Overkill for most organizations"],
    idealFor: ["Large data centers", "High-performance computing", "Financial services"],
    competitiveAdvantages: [
      "Highest performance networking",
      "Advanced automation capabilities",
      "Premium enterprise support",
    ],
    recentUpdates: ["Enhanced automation features (2024)", "New security integrations", "Improved analytics platform"],
    logoPath: "/arista-logo.png",
  },
  juniper: {
    id: "juniper",
    name: "Juniper Networks",
    category: "enterprise",
    description: "Enterprise networking with AI-driven operations and security integration",
    marketPosition: "challenger",
    founded: 1996,
    headquarters: "Sunnyvale, USA",
    employees: "10,000+",
    revenue: "$5.0B",
    customerBase: {
      total: 8000,
      enterprise: 5000,
      midMarket: 2500,
      sme: 500,
    },
    marketShare: 12.5,
    npsScore: 55,
    csatScore: 4.0,
    retentionRate: 88,
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
      basePrice: 10.0,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 200,
      volumeDiscounts: {
        tier1: { threshold: 1000, discount: 0.12 },
        tier2: { threshold: 5000, discount: 0.22 },
        tier3: { threshold: 15000, discount: 0.32 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "4-6 weeks",
        fullDeployment: "4-8 months",
      },
      complexity: "high",
      hardwareRequired: true,
      cloudOptions: true,
      onPremiseOptions: true,
      hybridOptions: true,
      professionalServices: {
        required: true,
        cost: 120000,
        duration: "3-5 months",
      },
    },
    support: {
      levels: ["Basic", "Enhanced", "Premium"],
      sla: {
        uptime: 99.7,
        responseTime: "< 6 hours",
      },
      channels: ["Email", "Phone", "Portal", "JTAC"],
      documentation: "good",
      community: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST"],
      certifications: ["FIPS 140-2", "SOC 2", "ISO 27001"],
      automationLevel: 70,
      auditReadiness: 85,
    },
    strengths: [
      "Strong AI-driven operations",
      "Good wireless integration",
      "Comprehensive security features",
      "Cloud and on-premise options",
    ],
    weaknesses: ["Complex management", "High implementation costs", "Steep learning curve", "Hardware dependency"],
    idealFor: ["Large enterprises", "Service providers", "Campus networks"],
    competitiveAdvantages: [
      "AI-driven network operations",
      "Strong wireless-wired integration",
      "Comprehensive security portfolio",
    ],
    recentUpdates: ["Enhanced AI operations (2024)", "New cloud management features", "Improved security integrations"],
    logoPath: "/juniper-logo.png",
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet",
    category: "enterprise",
    description: "Integrated security platform with network access control and threat protection",
    marketPosition: "leader",
    founded: 2000,
    headquarters: "Sunnyvale, USA",
    employees: "12,000+",
    revenue: "$4.4B",
    customerBase: {
      total: 15000,
      enterprise: 8000,
      midMarket: 5000,
      sme: 2000,
    },
    marketShare: 18.7,
    npsScore: 61,
    csatScore: 4.2,
    retentionRate: 90,
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
      basePrice: 9.0,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 100,
      volumeDiscounts: {
        tier1: { threshold: 1000, discount: 0.15 },
        tier2: { threshold: 5000, discount: 0.25 },
        tier3: { threshold: 15000, discount: 0.35 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "3-5 weeks",
        fullDeployment: "3-6 months",
      },
      complexity: "medium",
      hardwareRequired: true,
      cloudOptions: true,
      onPremiseOptions: true,
      hybridOptions: true,
      professionalServices: {
        required: true,
        cost: 80000,
        duration: "2-4 months",
      },
    },
    support: {
      levels: ["Standard", "Premium", "Elite"],
      sla: {
        uptime: 99.8,
        responseTime: "< 4 hours",
      },
      channels: ["Email", "Phone", "Chat", "Portal"],
      documentation: "good",
      community: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST"],
      certifications: ["FIPS 140-2", "SOC 2", "ISO 27001", "Common Criteria"],
      automationLevel: 75,
      auditReadiness: 88,
    },
    strengths: [
      "Integrated security platform",
      "Strong threat protection",
      "Good automation capabilities",
      "Comprehensive feature set",
    ],
    weaknesses: [
      "Complex management interface",
      "Hardware dependency",
      "Steep learning curve",
      "Limited cloud-native features",
    ],
    idealFor: ["Security-focused organizations", "Large enterprises", "Multi-vendor environments"],
    competitiveAdvantages: [
      "Integrated security fabric",
      "Strong threat intelligence",
      "Comprehensive security portfolio",
    ],
    recentUpdates: [
      "Enhanced AI security features (2024)",
      "New cloud integrations",
      "Improved automation capabilities",
    ],
    logoPath: "/fortinet-logo.png",
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft",
    category: "enterprise",
    description: "Cloud-integrated identity and access management with Azure AD integration",
    marketPosition: "leader",
    founded: 1975,
    headquarters: "Redmond, USA",
    employees: "220,000+",
    revenue: "$211B",
    customerBase: {
      total: 30000,
      enterprise: 20000,
      midMarket: 8000,
      sme: 2000,
    },
    marketShare: 25.8,
    npsScore: 58,
    csatScore: 4.1,
    retentionRate: 92,
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: false,
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
      model: "per-user",
      basePrice: 12.0,
      currency: "USD",
      billingCycle: "monthly",
      minimumUsers: 1,
      volumeDiscounts: {
        tier1: { threshold: 300, discount: 0.1 },
        tier2: { threshold: 1000, discount: 0.2 },
        tier3: { threshold: 5000, discount: 0.3 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "1-2 weeks",
        fullDeployment: "2-4 months",
      },
      complexity: "medium",
      hardwareRequired: false,
      cloudOptions: true,
      onPremiseOptions: false,
      hybridOptions: true,
      professionalServices: {
        required: false,
        cost: 50000,
        duration: "1-3 months",
      },
    },
    support: {
      levels: ["Basic", "Standard", "Premier"],
      sla: {
        uptime: 99.9,
        responseTime: "< 4 hours",
      },
      channels: ["Email", "Phone", "Chat", "Portal"],
      documentation: "excellent",
      community: true,
    },
    compliance: {
      frameworks: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "ISO 27001", "NIST", "FedRAMP"],
      certifications: ["SOC 2", "ISO 27001", "FedRAMP", "FIPS 140-2"],
      automationLevel: 80,
      auditReadiness: 92,
    },
    strengths: [
      "Seamless Azure integration",
      "Strong identity management",
      "Cloud-native architecture",
      "Comprehensive compliance",
    ],
    weaknesses: [
      "Limited network-level controls",
      "Requires Microsoft ecosystem",
      "Complex licensing",
      "Limited IoT support",
    ],
    idealFor: ["Microsoft-centric organizations", "Cloud-first companies", "Office 365 users"],
    competitiveAdvantages: [
      "Deep Microsoft ecosystem integration",
      "Strong identity and access management",
      "Cloud-native zero trust",
    ],
    recentUpdates: [
      "Enhanced zero trust features (2024)",
      "New conditional access policies",
      "Improved threat protection",
    ],
    logoPath: "/microsoft-logo.png",
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "sme",
    description: "Open-source network access control with customizable policies and integrations",
    marketPosition: "niche",
    founded: 2004,
    headquarters: "Montreal, Canada",
    employees: "50-100",
    revenue: "$10M",
    customerBase: {
      total: 2000,
      enterprise: 200,
      midMarket: 800,
      sme: 1000,
    },
    marketShare: 1.8,
    npsScore: 45,
    csatScore: 3.5,
    retentionRate: 78,
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: false,
        compliance: false,
        reporting: true,
        integration: true,
        cloudNative: false,
      },
      advanced: {
        aiMl: false,
        zeroTrust: false,
        automation: false,
        api: true,
        multiTenant: false,
        federation: false,
        riskScoring: false,
        behaviorAnalytics: false,
      },
      security: {
        threatDetection: false,
        incidentResponse: false,
        forensics: false,
        encryption: true,
        certificateManagement: true,
        vulnerabilityAssessment: false,
      },
    },
    pricing: {
      model: "per-device",
      basePrice: 2.0,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 50,
      volumeDiscounts: {
        tier1: { threshold: 500, discount: 0.1 },
        tier2: { threshold: 2000, discount: 0.2 },
        tier3: { threshold: 5000, discount: 0.3 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "2-4 weeks",
        fullDeployment: "2-6 months",
      },
      complexity: "high",
      hardwareRequired: true,
      cloudOptions: false,
      onPremiseOptions: true,
      hybridOptions: false,
      professionalServices: {
        required: true,
        cost: 30000,
        duration: "2-4 months",
      },
    },
    support: {
      levels: ["Community", "Professional", "Enterprise"],
      sla: {
        uptime: 99.0,
        responseTime: "< 24 hours",
      },
      channels: ["Email", "Forum", "Portal"],
      documentation: "fair",
      community: true,
    },
    compliance: {
      frameworks: ["PCI-DSS", "GDPR"],
      certifications: [],
      automationLevel: 20,
      auditReadiness: 40,
    },
    strengths: ["Open-source flexibility", "Low cost", "Customizable", "Good community support"],
    weaknesses: [
      "Requires technical expertise",
      "Limited enterprise features",
      "No cloud options",
      "Basic compliance support",
    ],
    idealFor: ["Budget-conscious organizations", "Technical teams", "Custom deployments"],
    competitiveAdvantages: ["Open-source model", "Lowest cost option", "High customization potential"],
    recentUpdates: ["New API features (2024)", "Improved web interface", "Enhanced integration capabilities"],
    logoPath: "/packetfence-logo.png",
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    category: "sme",
    description: "Cloud-based LDAP and RADIUS service with simple setup and management",
    marketPosition: "niche",
    founded: 2015,
    headquarters: "San Francisco, USA",
    employees: "10-50",
    revenue: "$5M",
    customerBase: {
      total: 800,
      enterprise: 50,
      midMarket: 300,
      sme: 450,
    },
    marketShare: 0.8,
    npsScore: 62,
    csatScore: 4.2,
    retentionRate: 88,
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: false,
        policyEnforcement: true,
        guestAccess: false,
        byod: true,
        iot: false,
        compliance: false,
        reporting: true,
        integration: true,
        cloudNative: true,
      },
      advanced: {
        aiMl: false,
        zeroTrust: false,
        automation: false,
        api: true,
        multiTenant: true,
        federation: true,
        riskScoring: false,
        behaviorAnalytics: false,
      },
      security: {
        threatDetection: false,
        incidentResponse: false,
        forensics: false,
        encryption: true,
        certificateManagement: false,
        vulnerabilityAssessment: false,
      },
    },
    pricing: {
      model: "per-user",
      basePrice: 3.0,
      currency: "USD",
      billingCycle: "monthly",
      minimumUsers: 5,
      volumeDiscounts: {
        tier1: { threshold: 100, discount: 0.1 },
        tier2: { threshold: 500, discount: 0.2 },
        tier3: { threshold: 1000, discount: 0.3 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "1-2 days",
        fullDeployment: "1-2 weeks",
      },
      complexity: "low",
      hardwareRequired: false,
      cloudOptions: true,
      onPremiseOptions: false,
      hybridOptions: false,
      professionalServices: {
        required: false,
        cost: 5000,
        duration: "1 week",
      },
    },
    support: {
      levels: ["Standard", "Premium"],
      sla: {
        uptime: 99.5,
        responseTime: "< 8 hours",
      },
      channels: ["Email", "Chat"],
      documentation: "good",
      community: false,
    },
    compliance: {
      frameworks: ["GDPR"],
      certifications: ["SOC 2"],
      automationLevel: 30,
      auditReadiness: 50,
    },
    strengths: ["Very simple setup", "Cloud-native", "Good for small teams", "Affordable pricing"],
    weaknesses: [
      "Limited enterprise features",
      "Basic security capabilities",
      "No device profiling",
      "Limited compliance support",
    ],
    idealFor: ["Small businesses", "Startups", "Simple deployments"],
    competitiveAdvantages: ["Simplest deployment", "Cloud-first approach", "Good for small teams"],
    recentUpdates: ["Enhanced API features (2024)", "New integration options", "Improved user interface"],
    logoPath: "/foxpass-logo.png",
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "sme",
    description: "Certificate-based authentication with focus on wireless security and BYOD",
    marketPosition: "niche",
    founded: 2008,
    headquarters: "San Jose, USA",
    employees: "50-100",
    revenue: "$15M",
    customerBase: {
      total: 1200,
      enterprise: 300,
      midMarket: 600,
      sme: 300,
    },
    marketShare: 1.2,
    npsScore: 58,
    csatScore: 4.0,
    retentionRate: 85,
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: true,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: false,
        compliance: true,
        reporting: true,
        integration: true,
        cloudNative: true,
      },
      advanced: {
        aiMl: false,
        zeroTrust: false,
        automation: true,
        api: true,
        multiTenant: false,
        federation: false,
        riskScoring: false,
        behaviorAnalytics: false,
      },
      security: {
        threatDetection: false,
        incidentResponse: false,
        forensics: false,
        encryption: true,
        certificateManagement: true,
        vulnerabilityAssessment: false,
      },
    },
    pricing: {
      model: "per-device",
      basePrice: 4.5,
      currency: "USD",
      billingCycle: "annual",
      minimumUsers: 25,
      volumeDiscounts: {
        tier1: { threshold: 500, discount: 0.1 },
        tier2: { threshold: 2000, discount: 0.2 },
        tier3: { threshold: 5000, discount: 0.3 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "1-2 weeks",
        fullDeployment: "1-2 months",
      },
      complexity: "low",
      hardwareRequired: false,
      cloudOptions: true,
      onPremiseOptions: true,
      hybridOptions: true,
      professionalServices: {
        required: false,
        cost: 15000,
        duration: "2-4 weeks",
      },
    },
    support: {
      levels: ["Standard", "Premium"],
      sla: {
        uptime: 99.5,
        responseTime: "< 6 hours",
      },
      channels: ["Email", "Phone", "Chat"],
      documentation: "good",
      community: true,
    },
    compliance: {
      frameworks: ["PCI-DSS", "GDPR", "HIPAA"],
      certifications: ["SOC 2"],
      automationLevel: 60,
      auditReadiness: 70,
    },
    strengths: [
      "Strong certificate management",
      "Good wireless security",
      "Easy BYOD onboarding",
      "Cloud and on-premise options",
    ],
    weaknesses: [
      "Limited enterprise features",
      "No AI/ML capabilities",
      "Basic threat detection",
      "Small market presence",
    ],
    idealFor: ["Education", "Healthcare", "BYOD-heavy environments"],
    competitiveAdvantages: ["Certificate-based security", "Strong wireless focus", "Good BYOD support"],
    recentUpdates: ["Enhanced certificate automation (2024)", "New cloud features", "Improved mobile support"],
    logoPath: "/securew2-logo.png",
  },
  radiusaas: {
    id: "radiusaas",
    name: "RADIUSaaS",
    category: "sme",
    description: "Cloud-based RADIUS service with simple setup and multi-tenant architecture",
    marketPosition: "niche",
    founded: 2018,
    headquarters: "Austin, USA",
    employees: "10-25",
    revenue: "$2M",
    customerBase: {
      total: 400,
      enterprise: 20,
      midMarket: 150,
      sme: 230,
    },
    marketShare: 0.3,
    npsScore: 55,
    csatScore: 3.8,
    retentionRate: 82,
    features: {
      core: {
        networkAccess: true,
        deviceProfiling: false,
        policyEnforcement: true,
        guestAccess: true,
        byod: true,
        iot: false,
        compliance: false,
        reporting: true,
        integration: true,
        cloudNative: true,
      },
      advanced: {
        aiMl: false,
        zeroTrust: false,
        automation: false,
        api: true,
        multiTenant: true,
        federation: false,
        riskScoring: false,
        behaviorAnalytics: false,
      },
      security: {
        threatDetection: false,
        incidentResponse: false,
        forensics: false,
        encryption: true,
        certificateManagement: false,
        vulnerabilityAssessment: false,
      },
    },
    pricing: {
      model: "per-user",
      basePrice: 2.5,
      currency: "USD",
      billingCycle: "monthly",
      minimumUsers: 10,
      volumeDiscounts: {
        tier1: { threshold: 100, discount: 0.1 },
        tier2: { threshold: 500, discount: 0.2 },
        tier3: { threshold: 1000, discount: 0.3 },
      },
    },
    implementation: {
      deploymentTime: {
        pilot: "1 day",
        fullDeployment: "1 week",
      },
      complexity: "low",
      hardwareRequired: false,
      cloudOptions: true,
      onPremiseOptions: false,
      hybridOptions: false,
      professionalServices: {
        required: false,
        cost: 2000,
        duration: "1 week",
      },
    },
    support: {
      levels: ["Standard"],
      sla: {
        uptime: 99.0,
        responseTime: "< 12 hours",
      },
      channels: ["Email"],
      documentation: "fair",
      community: false,
    },
    compliance: {
      frameworks: ["GDPR"],
      certifications: [],
      automationLevel: 20,
      auditReadiness: 30,
    },
    strengths: ["Very simple setup", "Low cost", "Cloud-native", "Quick deployment"],
    weaknesses: ["Very limited features", "No device profiling", "Basic support", "Limited compliance"],
    idealFor: ["Very small businesses", "Basic RADIUS needs", "Budget deployments"],
    competitiveAdvantages: ["Lowest cost RADIUS service", "Fastest deployment", "Simple cloud service"],
    recentUpdates: ["New API endpoints (2024)", "Improved reliability", "Enhanced logging"],
    logoPath: "/radiusaas-logo.png",
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
