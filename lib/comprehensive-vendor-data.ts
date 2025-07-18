export interface VendorData {
  id: string
  name: string
  category: "cloud-native" | "traditional" | "hybrid" | "open-source"
  marketPosition: "leader" | "challenger" | "niche" | "visionary"
  description: string
  strengths: string[]
  weaknesses: string[]
  pricing: {
    model: "per-device" | "per-user" | "tiered" | "enterprise" | "free"
    basePrice: number
    pricePerDevice: number
    volumeDiscounts: Record<number, number>
    additionalCosts: {
      hardware: number
      services: number
      training: number
      maintenance: number
      support: number
    }
    hiddenCosts: {
      total: number
      breakdown: string[]
    }
  }
  security: {
    securityRating: number
    cveCount: number
    zeroTrustMaturity: number
    complianceSupport: string[]
  }
  implementation: {
    deploymentDays: number
    complexityScore: number
    resourcesRequired: {
      internalFTE: number
      vendorFTE: number
      trainingHours: number
      ongoingFTE: number
    }
  }
  roi: {
    paybackMonths: number
    annualSavings: number
    efficiencyGains: number
    riskReduction: number
  }
  features: {
    zeroTrust: boolean
    cloudNative: boolean
    aiMl: boolean
    iot: boolean
    byod: boolean
    guestAccess: boolean
    compliance: boolean
    automation: boolean
  }
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "cloud-native",
    marketPosition: "visionary",
    description: "Cloud-native Zero Trust NAC platform with 30-minute deployment and 95% automation",
    strengths: [
      "True cloud-native SaaS architecture",
      "Zero CVEs since inception",
      "30-minute deployment time",
      "95% Zero Trust maturity score",
      "Vendor-agnostic platform",
      "All-inclusive pricing model",
    ],
    weaknesses: ["Newer market presence", "Limited legacy system integration"],
    pricing: {
      model: "per-device",
      basePrice: 25000,
      pricePerDevice: 60,
      volumeDiscounts: {
        100: 5,
        500: 10,
        1000: 15,
        5000: 20,
        10000: 25,
      },
      additionalCosts: {
        hardware: 0,
        services: 5000,
        training: 2000,
        maintenance: 0,
        support: 0,
      },
      hiddenCosts: {
        total: 0,
        breakdown: [],
      },
    },
    security: {
      securityRating: 95,
      cveCount: 0,
      zeroTrustMaturity: 95,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "SOC2", "ISO27001", "NIST", "FedRAMP"],
    },
    implementation: {
      deploymentDays: 1,
      complexityScore: 10,
      resourcesRequired: {
        internalFTE: 0.1,
        vendorFTE: 0.2,
        trainingHours: 4,
        ongoingFTE: 0.05,
      },
    },
    roi: {
      paybackMonths: 3,
      annualSavings: 450000,
      efficiencyGains: 95,
      riskReduction: 92,
    },
    features: {
      zeroTrust: true,
      cloudNative: true,
      aiMl: true,
      iot: true,
      byod: true,
      guestAccess: true,
      compliance: true,
      automation: true,
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco Identity Services Engine (ISE)",
    category: "traditional",
    marketPosition: "leader",
    description: "Market-leading traditional NAC with comprehensive policy enforcement",
    strengths: [
      "Market leader with 25.3% share",
      "Comprehensive feature set",
      "Strong ecosystem integration",
      "Mature platform",
    ],
    weaknesses: [
      "Complex deployment and management",
      "High total cost of ownership",
      "Requires significant expertise",
      "15+ CVEs annually",
    ],
    pricing: {
      model: "tiered",
      basePrice: 75000,
      pricePerDevice: 125,
      volumeDiscounts: {
        100: 5,
        500: 10,
        1000: 15,
        5000: 20,
      },
      additionalCosts: {
        hardware: 195000,
        services: 175000,
        training: 25000,
        maintenance: 45000,
        support: 35000,
      },
      hiddenCosts: {
        total: 125000,
        breakdown: [
          "Network redesign costs",
          "Extended deployment time",
          "Additional training requirements",
          "Integration complexity",
        ],
      },
    },
    security: {
      securityRating: 88,
      cveCount: 47,
      zeroTrustMaturity: 75,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "SOC2"],
    },
    implementation: {
      deploymentDays: 120,
      complexityScore: 90,
      resourcesRequired: {
        internalFTE: 2.5,
        vendorFTE: 1.5,
        trainingHours: 80,
        ongoingFTE: 1.8,
      },
    },
    roi: {
      paybackMonths: 18,
      annualSavings: 185000,
      efficiencyGains: 65,
      riskReduction: 75,
    },
    features: {
      zeroTrust: false,
      cloudNative: false,
      aiMl: true,
      iot: true,
      byod: true,
      guestAccess: true,
      compliance: true,
      automation: false,
    },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "traditional",
    marketPosition: "challenger",
    description: "Policy management platform with strong wireless integration",
    strengths: [
      "Strong wireless integration",
      "Good price-performance ratio",
      "Flexible deployment options",
      "88% customer satisfaction",
    ],
    weaknesses: ["Limited cloud-native features", "Complex policy management", "Requires HPE ecosystem"],
    pricing: {
      model: "per-device",
      basePrice: 45000,
      pricePerDevice: 95,
      volumeDiscounts: {
        100: 8,
        500: 12,
        1000: 18,
        5000: 25,
      },
      additionalCosts: {
        hardware: 95000,
        services: 75000,
        training: 15000,
        maintenance: 25000,
        support: 20000,
      },
      hiddenCosts: {
        total: 65000,
        breakdown: ["Hardware refresh cycles", "Professional services", "Training requirements"],
      },
    },
    security: {
      securityRating: 85,
      cveCount: 23,
      zeroTrustMaturity: 70,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR"],
    },
    implementation: {
      deploymentDays: 90,
      complexityScore: 75,
      resourcesRequired: {
        internalFTE: 1.8,
        vendorFTE: 1.0,
        trainingHours: 40,
        ongoingFTE: 1.2,
      },
    },
    roi: {
      paybackMonths: 14,
      annualSavings: 225000,
      efficiencyGains: 75,
      riskReduction: 78,
    },
    features: {
      zeroTrust: false,
      cloudNative: false,
      aiMl: false,
      iot: true,
      byod: true,
      guestAccess: true,
      compliance: true,
      automation: false,
    },
  },
  forescout: {
    id: "forescout",
    name: "Forescout Platform",
    category: "traditional",
    marketPosition: "niche",
    description: "Device visibility and control platform with IoT/OT specialization",
    strengths: [
      "Excellent device visibility",
      "Strong IoT/OT support",
      "20M+ device fingerprints",
      "Agentless architecture",
    ],
    weaknesses: ["Complex deployment", "High licensing costs", "Limited cloud features"],
    pricing: {
      model: "per-device",
      basePrice: 55000,
      pricePerDevice: 75,
      volumeDiscounts: {
        100: 5,
        500: 10,
        1000: 15,
        5000: 20,
      },
      additionalCosts: {
        hardware: 125000,
        services: 100000,
        training: 20000,
        maintenance: 35000,
        support: 25000,
      },
      hiddenCosts: {
        total: 85000,
        breakdown: ["Network infrastructure upgrades", "Extended deployment timeline", "Specialized training"],
      },
    },
    security: {
      securityRating: 82,
      cveCount: 18,
      zeroTrustMaturity: 65,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "NIST"],
    },
    implementation: {
      deploymentDays: 135,
      complexityScore: 85,
      resourcesRequired: {
        internalFTE: 2.0,
        vendorFTE: 1.2,
        trainingHours: 60,
        ongoingFTE: 1.5,
      },
    },
    roi: {
      paybackMonths: 16,
      annualSavings: 195000,
      efficiencyGains: 70,
      riskReduction: 72,
    },
    features: {
      zeroTrust: false,
      cloudNative: false,
      aiMl: true,
      iot: true,
      byod: true,
      guestAccess: false,
      compliance: true,
      automation: false,
    },
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    category: "hybrid",
    marketPosition: "challenger",
    description: "AI-driven cloud-native NAC with Mist ecosystem integration",
    strengths: [
      "AI-driven insights",
      "Cloud-native architecture",
      "Good user experience",
      "Mist ecosystem integration",
    ],
    weaknesses: ["Requires Mist infrastructure", "Limited standalone deployment", "Newer to NAC market"],
    pricing: {
      model: "per-device",
      basePrice: 35000,
      pricePerDevice: 72,
      volumeDiscounts: {
        100: 10,
        500: 15,
        1000: 20,
        5000: 25,
      },
      additionalCosts: {
        hardware: 0,
        services: 40000,
        training: 10000,
        maintenance: 15000,
        support: 12000,
      },
      hiddenCosts: {
        total: 45000,
        breakdown: ["Mist infrastructure requirement", "Migration complexity"],
      },
    },
    security: {
      securityRating: 83,
      cveCount: 12,
      zeroTrustMaturity: 78,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "SOC2"],
    },
    implementation: {
      deploymentDays: 60,
      complexityScore: 60,
      resourcesRequired: {
        internalFTE: 1.2,
        vendorFTE: 0.8,
        trainingHours: 24,
        ongoingFTE: 0.8,
      },
    },
    roi: {
      paybackMonths: 12,
      annualSavings: 265000,
      efficiencyGains: 78,
      riskReduction: 80,
    },
    features: {
      zeroTrust: true,
      cloudNative: true,
      aiMl: true,
      iot: true,
      byod: true,
      guestAccess: true,
      compliance: true,
      automation: true,
    },
  },
  extreme: {
    id: "extreme",
    name: "Extreme NAC",
    category: "traditional",
    marketPosition: "niche",
    description: "Flexible NAC solution with multiple deployment options",
    strengths: ["Flexible deployment options", "Good price point", "Easy management", "Strong support"],
    weaknesses: ["Limited advanced features", "Smaller market presence", "Basic automation"],
    pricing: {
      model: "per-device",
      basePrice: 30000,
      pricePerDevice: 65,
      volumeDiscounts: {
        100: 8,
        500: 12,
        1000: 18,
        5000: 22,
      },
      additionalCosts: {
        hardware: 100000,
        services: 60000,
        training: 12000,
        maintenance: 20000,
        support: 15000,
      },
      hiddenCosts: {
        total: 55000,
        breakdown: ["Hardware maintenance", "Professional services", "Training costs"],
      },
    },
    security: {
      securityRating: 78,
      cveCount: 15,
      zeroTrustMaturity: 60,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS"],
    },
    implementation: {
      deploymentDays: 75,
      complexityScore: 65,
      resourcesRequired: {
        internalFTE: 1.5,
        vendorFTE: 0.8,
        trainingHours: 32,
        ongoingFTE: 1.0,
      },
    },
    roi: {
      paybackMonths: 13,
      annualSavings: 205000,
      efficiencyGains: 72,
      riskReduction: 70,
    },
    features: {
      zeroTrust: false,
      cloudNative: false,
      aiMl: false,
      iot: true,
      byod: true,
      guestAccess: true,
      compliance: true,
      automation: false,
    },
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet FortiNAC",
    category: "traditional",
    marketPosition: "challenger",
    description: "Integrated NAC solution with FortiGate firewall integration",
    strengths: [
      "Strong firewall integration",
      "Comprehensive security fabric",
      "Good performance",
      "Competitive pricing",
    ],
    weaknesses: ["Requires Fortinet ecosystem", "Limited standalone features", "Complex policy management"],
    pricing: {
      model: "enterprise",
      basePrice: 40000,
      pricePerDevice: 58,
      volumeDiscounts: {
        100: 10,
        500: 15,
        1000: 20,
        5000: 25,
      },
      additionalCosts: {
        hardware: 85000,
        services: 55000,
        training: 15000,
        maintenance: 18000,
        support: 12000,
      },
      hiddenCosts: {
        total: 45000,
        breakdown: ["FortiGate requirement", "Integration complexity"],
      },
    },
    security: {
      securityRating: 82,
      cveCount: 21,
      zeroTrustMaturity: 68,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR"],
    },
    implementation: {
      deploymentDays: 85,
      complexityScore: 70,
      resourcesRequired: {
        internalFTE: 1.6,
        vendorFTE: 0.9,
        trainingHours: 36,
        ongoingFTE: 1.1,
      },
    },
    roi: {
      paybackMonths: 14,
      annualSavings: 215000,
      efficiencyGains: 70,
      riskReduction: 75,
    },
    features: {
      zeroTrust: false,
      cloudNative: false,
      aiMl: false,
      iot: true,
      byod: true,
      guestAccess: true,
      compliance: true,
      automation: false,
    },
  },
  arista: {
    id: "arista",
    name: "Arista CloudVision AGNI",
    category: "hybrid",
    marketPosition: "niche",
    description: "Cloud-first NAC with Arista switch integration",
    strengths: ["Cloud-first architecture", "Strong switch integration", "Good performance", "Modern interface"],
    weaknesses: ["Requires Arista switches", "Limited market presence", "Newer solution"],
    pricing: {
      model: "per-device",
      basePrice: 25000,
      pricePerDevice: 48,
      volumeDiscounts: {
        100: 12,
        500: 18,
        1000: 25,
        5000: 30,
      },
      additionalCosts: {
        hardware: 0,
        services: 35000,
        training: 8000,
        maintenance: 12000,
        support: 10000,
      },
      hiddenCosts: {
        total: 35000,
        breakdown: ["Arista switch requirement", "Migration costs"],
      },
    },
    security: {
      securityRating: 80,
      cveCount: 8,
      zeroTrustMaturity: 75,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "SOC2"],
    },
    implementation: {
      deploymentDays: 45,
      complexityScore: 50,
      resourcesRequired: {
        internalFTE: 1.0,
        vendorFTE: 0.6,
        trainingHours: 20,
        ongoingFTE: 0.7,
      },
    },
    roi: {
      paybackMonths: 10,
      annualSavings: 285000,
      efficiencyGains: 75,
      riskReduction: 78,
    },
    features: {
      zeroTrust: true,
      cloudNative: true,
      aiMl: true,
      iot: true,
      byod: true,
      guestAccess: true,
      compliance: true,
      automation: true,
    },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "hybrid",
    marketPosition: "challenger",
    description: "Cloud-managed NAC with Meraki infrastructure integration",
    strengths: ["Cloud-managed simplicity", "Easy deployment", "Good user experience", "Cisco backing"],
    weaknesses: ["Requires Meraki infrastructure", "Limited advanced features", "High ongoing costs"],
    pricing: {
      model: "per-device",
      basePrice: 45000,
      pricePerDevice: 108,
      volumeDiscounts: {
        100: 5,
        500: 10,
        1000: 15,
        5000: 20,
      },
      additionalCosts: {
        hardware: 0,
        services: 30000,
        training: 5000,
        maintenance: 0,
        support: 0,
      },
      hiddenCosts: {
        total: 85000,
        breakdown: ["Meraki infrastructure requirement", "Ongoing licensing costs"],
      },
    },
    security: {
      securityRating: 75,
      cveCount: 12,
      zeroTrustMaturity: 65,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS"],
    },
    implementation: {
      deploymentDays: 30,
      complexityScore: 40,
      resourcesRequired: {
        internalFTE: 0.8,
        vendorFTE: 0.4,
        trainingHours: 16,
        ongoingFTE: 0.6,
      },
    },
    roi: {
      paybackMonths: 15,
      annualSavings: 165000,
      efficiencyGains: 68,
      riskReduction: 65,
    },
    features: {
      zeroTrust: false,
      cloudNative: true,
      aiMl: false,
      iot: true,
      byod: true,
      guestAccess: true,
      compliance: false,
      automation: true,
    },
  },
  ivanti: {
    id: "ivanti",
    name: "Ivanti Neurons (Pulse Secure)",
    category: "traditional",
    marketPosition: "niche",
    description: "⚠️ CRITICAL SECURITY RISK - Active nation-state exploitation",
    strengths: ["Comprehensive feature set", "VPN integration"],
    weaknesses: [
      "⚠️ ACTIVE EXPLOITATION by nation-state actors",
      "Multiple critical vulnerabilities",
      "Immediate migration required",
      "High security risk",
    ],
    pricing: {
      model: "per-device",
      basePrice: 65000,
      pricePerDevice: 95,
      volumeDiscounts: {
        100: 5,
        500: 8,
        1000: 12,
        5000: 15,
      },
      additionalCosts: {
        hardware: 145000,
        services: 120000,
        training: 25000,
        maintenance: 45000,
        support: 35000,
      },
      hiddenCosts: {
        total: 185000,
        breakdown: [
          "Emergency migration costs",
          "Security incident response",
          "Compliance violations",
          "Business disruption",
        ],
      },
    },
    security: {
      securityRating: 25,
      cveCount: 89,
      zeroTrustMaturity: 35,
      complianceSupport: ["SOX", "HIPAA"],
    },
    implementation: {
      deploymentDays: 150,
      complexityScore: 95,
      resourcesRequired: {
        internalFTE: 3.0,
        vendorFTE: 2.0,
        trainingHours: 100,
        ongoingFTE: 2.5,
      },
    },
    roi: {
      paybackMonths: 36,
      annualSavings: 85000,
      efficiencyGains: 35,
      riskReduction: 15,
    },
    features: {
      zeroTrust: false,
      cloudNative: false,
      aiMl: false,
      iot: false,
      byod: true,
      guestAccess: true,
      compliance: false,
      automation: false,
    },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft NPS",
    category: "traditional",
    marketPosition: "niche",
    description: "Basic RADIUS authentication included with Windows Server",
    strengths: ["Free with Windows Server", "Basic RADIUS functionality", "Microsoft integration"],
    weaknesses: [
      "Very limited NAC features",
      "No advanced policy enforcement",
      "Basic security capabilities",
      "Requires significant customization",
    ],
    pricing: {
      model: "free",
      basePrice: 0,
      pricePerDevice: 0,
      volumeDiscounts: {},
      additionalCosts: {
        hardware: 65000,
        services: 85000,
        training: 15000,
        maintenance: 0,
        support: 0,
      },
      hiddenCosts: {
        total: 125000,
        breakdown: ["Custom development required", "Limited functionality", "Additional security tools needed"],
      },
    },
    security: {
      securityRating: 55,
      cveCount: 25,
      zeroTrustMaturity: 30,
      complianceSupport: ["SOX"],
    },
    implementation: {
      deploymentDays: 120,
      complexityScore: 80,
      resourcesRequired: {
        internalFTE: 2.5,
        vendorFTE: 0.0,
        trainingHours: 60,
        ongoingFTE: 2.0,
      },
    },
    roi: {
      paybackMonths: 24,
      annualSavings: 125000,
      efficiencyGains: 30,
      riskReduction: 25,
    },
    features: {
      zeroTrust: false,
      cloudNative: false,
      aiMl: false,
      iot: false,
      byod: false,
      guestAccess: false,
      compliance: false,
      automation: false,
    },
  },
  foxpass: {
    id: "foxpass",
    name: "FoxPass",
    category: "cloud-native",
    marketPosition: "niche",
    description: "Cloud RADIUS service for SMB market",
    strengths: ["Simple cloud RADIUS", "Low cost for SMB", "Easy setup", "Good for basic needs"],
    weaknesses: ["Limited enterprise features", "Basic policy enforcement", "SMB-focused solution"],
    pricing: {
      model: "per-user",
      basePrice: 5000,
      pricePerDevice: 36,
      volumeDiscounts: {
        100: 10,
        500: 15,
        1000: 20,
      },
      additionalCosts: {
        hardware: 0,
        services: 8000,
        training: 2000,
        maintenance: 0,
        support: 0,
      },
      hiddenCosts: {
        total: 15000,
        breakdown: ["Limited enterprise features", "Additional tools required"],
      },
    },
    security: {
      securityRating: 68,
      cveCount: 3,
      zeroTrustMaturity: 45,
      complianceSupport: ["SOX", "HIPAA"],
    },
    implementation: {
      deploymentDays: 14,
      complexityScore: 25,
      resourcesRequired: {
        internalFTE: 0.3,
        vendorFTE: 0.1,
        trainingHours: 8,
        ongoingFTE: 0.2,
      },
    },
    roi: {
      paybackMonths: 8,
      annualSavings: 185000,
      efficiencyGains: 60,
      riskReduction: 45,
    },
    features: {
      zeroTrust: false,
      cloudNative: true,
      aiMl: false,
      iot: false,
      byod: true,
      guestAccess: true,
      compliance: false,
      automation: false,
    },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "hybrid",
    marketPosition: "niche",
    description: "Managed PKI and certificate-based authentication specialist",
    strengths: [
      "Strong PKI expertise",
      "Certificate-based security",
      "Good wireless security",
      "Managed service model",
    ],
    weaknesses: ["Premium pricing", "Limited NAC features beyond PKI", "Niche market focus"],
    pricing: {
      model: "per-device",
      basePrice: 35000,
      pricePerDevice: 120,
      volumeDiscounts: {
        100: 5,
        500: 8,
        1000: 12,
        5000: 15,
      },
      additionalCosts: {
        hardware: 0,
        services: 45000,
        training: 18000,
        maintenance: 25000,
        support: 15000,
      },
      hiddenCosts: {
        total: 55000,
        breakdown: ["Premium PKI services", "Specialized training", "Limited feature set"],
      },
    },
    security: {
      securityRating: 85,
      cveCount: 5,
      zeroTrustMaturity: 70,
      complianceSupport: ["SOX", "HIPAA", "PCI-DSS", "GDPR", "SOC2"],
    },
    implementation: {
      deploymentDays: 60,
      complexityScore: 65,
      resourcesRequired: {
        internalFTE: 1.2,
        vendorFTE: 0.8,
        trainingHours: 40,
        ongoingFTE: 0.8,
      },
    },
    roi: {
      paybackMonths: 16,
      annualSavings: 175000,
      efficiencyGains: 65,
      riskReduction: 78,
    },
    features: {
      zeroTrust: true,
      cloudNative: true,
      aiMl: false,
      iot: false,
      byod: true,
      guestAccess: true,
      compliance: true,
      automation: false,
    },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "open-source",
    marketPosition: "niche",
    description: "Open-source NAC with high implementation and support costs",
    strengths: ["Open-source flexibility", "No licensing fees", "Customizable platform"],
    weaknesses: [
      "High implementation costs",
      "Requires significant expertise",
      "Limited commercial support",
      "Complex deployment",
    ],
    pricing: {
      model: "free",
      basePrice: 0,
      pricePerDevice: 0,
      volumeDiscounts: {},
      additionalCosts: {
        hardware: 125000,
        services: 150000,
        training: 35000,
        maintenance: 0,
        support: 0,
      },
      hiddenCosts: {
        total: 185000,
        breakdown: [
          "Extensive professional services",
          "Custom development",
          "Ongoing maintenance burden",
          "Limited vendor support",
        ],
      },
    },
    security: {
      securityRating: 70,
      cveCount: 12,
      zeroTrustMaturity: 45,
      complianceSupport: ["SOX", "HIPAA"],
    },
    implementation: {
      deploymentDays: 180,
      complexityScore: 95,
      resourcesRequired: {
        internalFTE: 3.5,
        vendorFTE: 2.5,
        trainingHours: 120,
        ongoingFTE: 2.8,
      },
    },
    roi: {
      paybackMonths: 30,
      annualSavings: 95000,
      efficiencyGains: 45,
      riskReduction: 55,
    },
    features: {
      zeroTrust: false,
      cloudNative: false,
      aiMl: false,
      iot: true,
      byod: true,
      guestAccess: true,
      compliance: false,
      automation: false,
    },
  },
}

export function getVendorData(vendorId: string): VendorData | null {
  return ComprehensiveVendorDatabase[vendorId] || null
}

export function getAllVendors(): VendorData[] {
  return Object.values(ComprehensiveVendorDatabase)
}

export function getVendorsByCategory(category: VendorData["category"]): VendorData[] {
  return getAllVendors().filter((vendor) => vendor.category === category)
}

export function getVendorsByMarketPosition(position: VendorData["marketPosition"]): VendorData[] {
  return getAllVendors().filter((vendor) => vendor.marketPosition === position)
}
