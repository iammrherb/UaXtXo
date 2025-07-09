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
    certificateAuth: boolean
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
    riskBasedAccess: boolean
    microsegmentation: boolean
    threatIntelligence: boolean
    aiDriven: boolean
    cloudPKI: boolean
    iotProfiling: boolean
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

export interface VendorSecurity {
  overallScore: number
  zeroTrustScore: number
  vulnerabilities: {
    critical_count: number
    last_cve: string
    patch_frequency: string
    risk_score: number
  }
  riskReduction: {
    unauthorized_access: number
    lateral_movement: number
    data_breach: number
    insider_threat: number
    compliance_violation: number
  }
  breachCostSavings: {
    average_breach_cost: number
    reduction_percentage: number
    insurance_discount: number
  }
  industryCompliance?: {
    healthcare?: {
      hipaa: { compliant: boolean; score: number; gaps: string[] }
      hitech: { compliant: boolean; score: number; gaps: string[] }
      fda21cfr11: { compliant: boolean; score: number; gaps: string[] }
      nist80066: { compliant: boolean; score: number; gaps: string[] }
    }
    finance?: {
      sox: { compliant: boolean; score: number; gaps: string[] }
      pciDss: { compliant: boolean; score: number; gaps: string[] }
      glba: { compliant: boolean; score: number; gaps: string[] }
      ffiec: { compliant: boolean; score: number; gaps: string[] }
      nydfs500: { compliant: boolean; score: number; gaps: string[] }
    }
    government?: {
      fedramp: { compliant: boolean; score: number; gaps: string[] }
      fisma: { compliant: boolean; score: number; gaps: string[] }
      nist80053: { compliant: boolean; score: number; gaps: string[] }
      cjis: { compliant: boolean; score: number; gaps: string[] }
      itar: { compliant: boolean; score: number; gaps: string[] }
    }
  }
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
  security: VendorSecurity
  scalability: {
    cloudNative: boolean
  }
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
        certificateAuth: true,
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
        riskBasedAccess: true,
        microsegmentation: true,
        threatIntelligence: true,
        aiDriven: true,
        cloudPKI: true,
        iotProfiling: true,
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
    security: {
      overallScore: 95,
      zeroTrustScore: 98,
      vulnerabilities: {
        critical_count: 0,
        last_cve: "None",
        patch_frequency: "Automatic",
        risk_score: 5,
      },
      riskReduction: {
        unauthorized_access: 95,
        lateral_movement: 92,
        data_breach: 88,
        insider_threat: 85,
        compliance_violation: 90,
      },
      breachCostSavings: {
        average_breach_cost: 4500000,
        reduction_percentage: 85,
        insurance_discount: 25,
      },
      industryCompliance: {
        healthcare: {
          hipaa: { compliant: true, score: 98, gaps: [] },
          hitech: { compliant: true, score: 95, gaps: [] },
          fda21cfr11: { compliant: true, score: 92, gaps: ["Advanced e-signatures"] },
          nist80066: { compliant: true, score: 96, gaps: [] },
        },
        finance: {
          sox: { compliant: true, score: 94, gaps: [] },
          pciDss: { compliant: true, score: 96, gaps: [] },
          glba: { compliant: true, score: 93, gaps: [] },
          ffiec: { compliant: true, score: 97, gaps: [] },
          nydfs500: { compliant: true, score: 95, gaps: [] },
        },
        government: {
          fedramp: { compliant: true, score: 98, gaps: [] },
          fisma: { compliant: true, score: 96, gaps: [] },
          nist80053: { compliant: true, score: 97, gaps: [] },
          cjis: { compliant: true, score: 94, gaps: ["Physical security controls"] },
          itar: { compliant: false, score: 85, gaps: ["Export control documentation", "Physical security"] },
        },
      },
    },
    scalability: {
      cloudNative: true,
    },
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
        certificateAuth: true,
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
        riskBasedAccess: false,
        microsegmentation: true,
        threatIntelligence: true,
        aiDriven: false,
        cloudPKI: false,
        iotProfiling: true,
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
    security: {
      overallScore: 88,
      zeroTrustScore: 75,
      vulnerabilities: {
        critical_count: 5,
        last_cve: "CVE-2023-1234",
        patch_frequency: "Monthly",
        risk_score: 65,
      },
      riskReduction: {
        unauthorized_access: 70,
        lateral_movement: 65,
        data_breach: 60,
        insider_threat: 55,
        compliance_violation: 75,
      },
      breachCostSavings: {
        average_breach_cost: 6000000,
        reduction_percentage: 60,
        insurance_discount: 15,
      },
      industryCompliance: {
        healthcare: {
          hipaa: { compliant: true, score: 85, gaps: ["Automated audit reporting"] },
          hitech: { compliant: true, score: 82, gaps: ["Enhanced breach notification"] },
          fda21cfr11: { compliant: false, score: 75, gaps: ["Electronic signatures", "System validation"] },
          nist80066: { compliant: true, score: 88, gaps: [] },
        },
        finance: {
          sox: { compliant: true, score: 90, gaps: [] },
          pciDss: { compliant: true, score: 92, gaps: [] },
          glba: { compliant: true, score: 87, gaps: ["Privacy controls automation"] },
          ffiec: { compliant: true, score: 89, gaps: [] },
          nydfs500: { compliant: true, score: 86, gaps: ["CISO reporting automation"] },
        },
        government: {
          fedramp: { compliant: true, score: 91, gaps: [] },
          fisma: { compliant: true, score: 89, gaps: [] },
          nist80053: { compliant: true, score: 92, gaps: [] },
          cjis: { compliant: true, score: 88, gaps: [] },
          itar: { compliant: true, score: 90, gaps: [] },
        },
      },
    },
    scalability: {
      cloudNative: false,
    },
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
        certificateAuth: true,
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
        riskBasedAccess: true,
        microsegmentation: false,
        threatIntelligence: false,
        aiDriven: true,
        cloudPKI: false,
        iotProfiling: true,
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
    security: {
      overallScore: 92,
      zeroTrustScore: 85,
      vulnerabilities: {
        critical_count: 2,
        last_cve: "CVE-2023-5678",
        patch_frequency: "Quarterly",
        risk_score: 40,
      },
      riskReduction: {
        unauthorized_access: 85,
        lateral_movement: 80,
        data_breach: 75,
        insider_threat: 70,
        compliance_violation: 80,
      },
      breachCostSavings: {
        average_breach_cost: 5000000,
        reduction_percentage: 75,
        insurance_discount: 20,
      },
      industryCompliance: {
        healthcare: {
          hipaa: { compliant: true, score: 88, gaps: ["Advanced encryption"] },
          hitech: { compliant: true, score: 85, gaps: ["Automated breach detection"] },
          fda21cfr11: { compliant: false, score: 70, gaps: ["Electronic signatures", "Audit trail integrity"] },
          nist80066: { compliant: true, score: 90, gaps: [] },
        },
        finance: {
          sox: { compliant: true, score: 87, gaps: ["Enhanced audit trails"] },
          pciDss: { compliant: true, score: 89, gaps: [] },
          glba: { compliant: true, score: 84, gaps: ["Privacy automation"] },
          ffiec: { compliant: true, score: 86, gaps: ["Risk assessment automation"] },
          nydfs500: { compliant: true, score: 83, gaps: ["Multi-factor authentication enforcement"] },
        },
        government: {
          fedramp: { compliant: true, score: 87, gaps: ["Continuous monitoring automation"] },
          fisma: { compliant: true, score: 85, gaps: [] },
          nist80053: { compliant: true, score: 88, gaps: [] },
          cjis: { compliant: true, score: 82, gaps: ["Advanced authentication"] },
          itar: { compliant: false, score: 78, gaps: ["Export controls", "Physical security"] },
        },
      },
    },
    scalability: {
      cloudNative: false,
    },
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
        certificateAuth: false,
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
        riskBasedAccess: false,
        microsegmentation: false,
        threatIntelligence: false,
        aiDriven: false,
        cloudPKI: false,
        iotProfiling: false,
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
    security: {
      overallScore: 72,
      zeroTrustScore: 45,
      vulnerabilities: {
        critical_count: 1,
        last_cve: "CVE-2023-9012",
        patch_frequency: "Quarterly",
        risk_score: 30,
      },
      riskReduction: {
        unauthorized_access: 60,
        lateral_movement: 45,
        data_breach: 50,
        insider_threat: 40,
        compliance_violation: 55,
      },
      breachCostSavings: {
        average_breach_cost: 4000000,
        reduction_percentage: 50,
        insurance_discount: 10,
      },
      industryCompliance: {
        healthcare: {
          hipaa: { compliant: false, score: 65, gaps: ["Advanced audit logs", "Risk assessments", "Encryption"] },
          hitech: {
            compliant: false,
            score: 60,
            gaps: ["Breach notification automation", "Business associate controls"],
          },
          fda21cfr11: {
            compliant: false,
            score: 45,
            gaps: ["Electronic signatures", "System validation", "Audit trails"],
          },
          nist80066: { compliant: false, score: 68, gaps: ["Security controls", "Risk management"] },
        },
        finance: {
          sox: { compliant: false, score: 70, gaps: ["Internal controls", "Audit trails"] },
          pciDss: { compliant: true, score: 78, gaps: ["Network segmentation", "Advanced monitoring"] },
          glba: { compliant: false, score: 65, gaps: ["Safeguards rule", "Privacy controls"] },
          ffiec: { compliant: false, score: 72, gaps: ["Risk management", "Authentication"] },
          nydfs500: { compliant: false, score: 68, gaps: ["CISO designation", "Risk assessment", "MFA"] },
        },
        government: {
          fedramp: { compliant: true, score: 75, gaps: ["Enhanced security controls"] },
          fisma: { compliant: false, score: 70, gaps: ["Risk management", "Continuous monitoring"] },
          nist80053: { compliant: false, score: 72, gaps: ["Access control", "Audit accountability"] },
          cjis: { compliant: false, score: 65, gaps: ["Advanced authentication", "Audit logs", "Encryption"] },
          itar: { compliant: false, score: 55, gaps: ["Export controls", "Access restrictions", "Physical security"] },
        },
      },
    },
    scalability: {
      cloudNative: true,
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
