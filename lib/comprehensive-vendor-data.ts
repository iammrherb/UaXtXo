export interface VendorData {
  id: string
  name: string
  category: "leader" | "challenger" | "visionary" | "niche"
  marketShare: number
  deploymentType: "cloud" | "on-premise" | "hybrid"
  logo: string
  description: string

  pricing: {
    model: "per-device" | "per-user" | "flat-rate" | "quote-based"
    basePrice: number
    pricePerDevice: number
    minimumDevices?: number
    volumeDiscounts: Record<string, number>
    contractTerms: Record<string, number>
    additionalCosts: {
      hardware: number
      services: number
      training: number
      maintenance: number
      support: number
    }
    addOns?: Record<string, { perDevice: number; description: string }>
  }

  implementation: {
    timeToDeployDays: number
    complexity: "low" | "medium" | "high"
    professionalServicesRequired: boolean
    trainingHours: number
    onboardingComplexity: "simple" | "moderate" | "complex"
    migrationSupport: boolean
    resourcesRequired: {
      technical: number
      administrative: number
      ongoing: number
    }
  }

  security: {
    securityRating: number
    cveCount: number
    lastSecurityIncident?: string
    complianceSupport: string[]
    zeroTrustMaturity: number
    certifications: string[]
  }

  features: {
    core: string[]
    advanced: string[]
    integrations: string[]
    includedFeatures: string[]
    additionalLicenses: string[]
  }

  infrastructure: {
    hardwareRequired: boolean
    scalabilityScore: number
    highAvailability: number
    maintenanceWindows: number
    cloudNative: boolean
    infrastructureCosts: number
  }

  support: {
    availability: string
    responseTime: string
    customerSatisfaction: number
    professionalServices: {
      implementation: number
      training: number
      ongoing: number
    }
  }

  operationalMetrics: {
    adminEffort: number
    upgradeComplexity: "automatic" | "low" | "moderate" | "complex"
    reportingCapabilities: "basic" | "standard" | "advanced"
    apiAvailability: boolean
    cloudManagement: boolean
    staffingRequirements: {
      administrators: number
      specialists: number
      trainingDays: number
    }
    operationalCosts: {
      monthlyMaintenance: number
      annualSupport: number
    }
  }

  roi: {
    breachRiskReduction: number
    laborSavings: number
    complianceSavings: number
    downtimeReduction: number
    operationalEfficiency: number
    timeToValue: number
    yearlyBenefit: number
  }

  riskMetrics: {
    securityPostureScore: number
    vendorStability: number
    technologyRisk: number
    complianceRisk: number
  }

  complianceSummary: {
    automationLevel: number
    frameworksCovered: string[]
    auditReadiness: number
    automatedCompliance: boolean
    certifications: string[]
  }

  scalability: {
    cloudNative: boolean
    maxDevices: number
    globalDeployment: boolean
    multiTenant: boolean
  }

  strengths: string[]
  weaknesses: string[]
  bestFor: string[]
  challenges: string[]
  advantages: string[]
}

export const ComprehensiveVendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "visionary",
    marketShare: 8.5,
    deploymentType: "cloud",
    logo: "/portnox-logo.png",
    description: "Pure cloud-native NAC with zero infrastructure requirements and industry-leading security posture. All-in-one solution including RADIUS, NAC, PKI, IoT profiling, and risk assessment.",

    pricing: {
      model: "per-device",
      basePrice: 0,
      pricePerDevice: 4.0, // Updated 2024 pricing
      minimumDevices: 100,
      volumeDiscounts: {
        "1000": 10,
        "5000": 20,
        "10000": 30,
        "25000": 40
      },
      contractTerms: {
        "annual_discount": 15,
        "multi_year_discount": 25
      },
      additionalCosts: {
        hardware: 0, // Zero infrastructure
        services: 0, // Self-service deployment
        training: 0, // Online training included
        maintenance: 0, // Included in subscription
        support: 0, // 24/7 support included
      },
      addOns: {
        "Advanced Threat Protection": { perDevice: 1.5, description: "ML-based threat detection, SOAR integration" },
        "Compliance Automation": { perDevice: 1.0, description: "Automated reporting, continuous monitoring" },
        "IoT/OT Security": { perDevice: 2.0, description: "OT protocol support, industrial device profiling" },
        "Risk Analytics": { perDevice: 1.5, description: "Device risk scoring, user behavior analytics" }
      }
    },

    implementation: {
      timeToDeployDays: 1, // 30 minutes to production
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 2,
      onboardingComplexity: "simple",
      migrationSupport: true,
      resourcesRequired: {
        technical: 0.1,
        administrative: 0.1,
        ongoing: 0.1
      }
    },

    security: {
      securityRating: 95,
      cveCount: 0, // Zero CVE record
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001", "FedRAMP", "SOC2", "CMMC", "NERC-CIP"],
      zeroTrustMaturity: 95,
      certifications: ["SOC2-Type2", "ISO27001", "FedRAMP-Moderate", "HIPAA-Compliant"]
    },

    features: {
      core: ["Device Discovery", "Policy Enforcement", "Guest Access", "Certificate Management", "BYOD Support"],
      advanced: ["AI-Powered Analytics", "Automated Remediation", "Risk Scoring", "Behavioral Analysis", "Zero Trust"],
      integrations: ["Active Directory", "SIEM", "ITSM", "MDM", "Cloud Platforms", "SOAR", "Threat Intelligence"],
      includedFeatures: [
        "RADIUS Server", "NAC Engine", "PKI/Certificate Authority", "Agentless Discovery", 
        "IoT Device Profiling", "Risk Assessment Engine", "Compliance Automation", 
        "Guest Portal", "BYOD Onboarding", "API Gateway", "Real-time Analytics"
      ],
      additionalLicenses: [] // All features included in base price
    },

    infrastructure: {
      hardwareRequired: false,
      scalabilityScore: 100, // Infinite cloud scale
      highAvailability: 99.99,
      maintenanceWindows: 0, // Zero maintenance
      cloudNative: true,
      infrastructureCosts: 0
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 1 hour",
      customerSatisfaction: 96,
      professionalServices: {
        implementation: 0, // Self-service
        training: 0, // Included
        ongoing: 0 // Included
      }
    },

    operationalMetrics: {
      adminEffort: 1, // Minimal admin required
      upgradeComplexity: "automatic",
      reportingCapabilities: "advanced",
      apiAvailability: true,
      cloudManagement: true,
      staffingRequirements: {
        administrators: 0.1,
        specialists: 0,
        trainingDays: 0.25
      },
      operationalCosts: {
        monthlyMaintenance: 0,
        annualSupport: 0
      }
    },

    roi: {
      breachRiskReduction: 0.92, // 92% risk reduction
      laborSavings: 2.5, // FTE saved
      complianceSavings: 150000, // Annual compliance savings
      downtimeReduction: 0.95, // 95% uptime improvement
      operationalEfficiency: 0.90, // 90% efficiency gain
      timeToValue: 1, // 1 day to value
      yearlyBenefit: 500000
    },

    riskMetrics: {
      securityPostureScore: 95,
      vendorStability: 90,
      technologyRisk: 10, // Low risk
      complianceRisk: 5 // Very low risk
    },

    complianceSummary: {
      automationLevel: 95,
      frameworksCovered: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001", "FedRAMP", "SOC2"],
      auditReadiness: 95,
      automatedCompliance: true,
      certifications: ["SOC2-Type2", "ISO27001", "FedRAMP-Moderate"]
    },

    scalability: {
      cloudNative: true,
      maxDevices: 1000000, // Unlimited
      globalDeployment: true,
      multiTenant: true
    },

    strengths: [
      "Zero infrastructure requirements - pure SaaS",
      "30-minute deployment vs 6-9 months for competitors",
      "Zero CVE security record - industry leading",
      "All-inclusive pricing - no hidden costs",
      "95% Zero Trust maturity score",
      "Infinite cloud scalability",
      "90% reduction in admin overhead",
      "Built-in RADIUS, NAC, PKI, IoT profiling"
    ],
    weaknesses: [
      "Newer market presence compared to legacy vendors",
      "Cloud-only deployment (not a weakness for modern orgs)"
    ],
    bestFor: [
      "Cloud-first organizations seeking rapid deployment",
      "Cost-conscious enterprises wanting predictable pricing",
      "Organizations prioritizing security and compliance",
      "Companies requiring zero maintenance solutions",
      "Zero Trust security initiatives"
    ],
    challenges: [
      "Minimal - cloud adoption learning curve for traditional IT teams"
    ],
    advantages: [
      "65% lower TCO than traditional NAC solutions",
      "95% faster deployment than on-premise alternatives",
      "Zero hardware, maintenance, or upgrade costs",
      "Comprehensive feature set included in base price",
      "Industry-leading security with zero CVEs",
      "Automatic updates and feature additions",
      "Global scalability without infrastructure investment"
    ]
  },

  cisco_ise: {
    id: "cisco_ise",
    name: "Cisco Identity Services Engine (ISE)",
    category: "leader",
    marketShare: 35.2,
    deploymentType: "on-premise",
    logo: "/cisco-logo.png",
    description: "Industry-leading identity services engine with comprehensive policy management. Requires significant infrastructure investment and ongoing maintenance.",

    pricing: {
      model: "per-device",
      basePrice: 50000,
      pricePerDevice: 12.0, // 2024 pricing
      minimumDevices: 100,
      volumeDiscounts: {
        "1000": 5,
        "5000": 10,
        "10000": 15
      },
      contractTerms: {
        "annual_discount": 10,
        "multi_year_discount": 20
      },
      additionalCosts: {
        hardware: 150000, // ISE appliances
        services: 75000, // Professional services
        training: 25000, // Cisco training
        maintenance: 30000, // Annual SmartNet
        support: 45000, // Premium support
      },
      addOns: {
        "Cisco TrustSec": { perDevice: 3.0, description: "Software-defined segmentation" },
        "pxGrid": { perDevice: 2.0, description: "Platform exchange grid" },
        "Advanced Malware Protection": { perDevice: 4.0, description: "AMP integration" },
        "Threat Intelligence": { perDevice: 2.5, description: "Threat feeds and analytics" }
      }
    },

    implementation: {
      timeToDeployDays: 180, // 6 months typical
      complexity: "high",
      professionalServicesRequired: true,
      trainingHours: 40,
      onboardingComplexity: "complex",
      migrationSupport: true,
      resourcesRequired: {
        technical: 2.0,
        administrative: 1.0,
        ongoing: 1.5
      }
    },

    security: {
      securityRating: 85,
      cveCount: 47, // 2024 data
      lastSecurityIncident: "2023-Q4",
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001", "Common Criteria"],
      zeroTrustMaturity: 75,
      certifications: ["Common-Criteria", "FIPS-140-2"]
    },

    features: {
      core: ["Policy Management", "Device Profiling", "Guest Access", "Certificate Services"],
      advanced: ["TrustSec", "pxGrid", "Threat Intelligence", "Compliance Reporting"],
      integrations: ["Cisco Security Portfolio", "Third-party SIEM", "MDM Solutions"],
      includedFeatures: ["Basic RADIUS", "Policy Engine", "Guest Portal"],
      additionalLicenses: ["TrustSec", "pxGrid", "Advanced Licensing", "Plus Licenses", "Apex Licenses"]
    },

    infrastructure: {
      hardwareRequired: true,
      scalabilityScore: 70,
      highAvailability: 99.9,
      maintenanceWindows: 6, // Bi-monthly
      cloudNative: false,
      infrastructureCosts: 200000 // Additional infrastructure
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      customerSatisfaction: 78,
      professionalServices: {
        implementation: 75000,
        training: 25000,
        ongoing: 45000
      }
    },

    operationalMetrics: {
      adminEffort: 8, // High admin overhead
      upgradeComplexity: "complex",
      reportingCapabilities: "advanced",
      apiAvailability: true,
      cloudManagement: false,
      staffingRequirements: {
        administrators: 2,
        specialists: 1,
        trainingDays: 10
      },
      operationalCosts: {
        monthlyMaintenance: 15000,
        annualSupport: 45000
      }
    },

    roi: {
      breachRiskReduction: 0.65,
      laborSavings: 0.5,
      complianceSavings: 75000,
      downtimeReduction: 0.80,
      operationalEfficiency: 0.60,
      timeToValue: 180,
      yearlyBenefit: 200000
    },

    riskMetrics: {
      securityPostureScore: 85,
      vendorStability: 95,
      technologyRisk: 30,
      complianceRisk: 15
    },

    complianceSummary: {
      automationLevel: 60,
      frameworksCovered: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST"],
      auditReadiness: 80,
      automatedCompliance: false,
      certifications: ["Common-Criteria", "FIPS-140-2"]
    },

    scalability: {
      cloudNative: false,
      maxDevices: 100000,
      globalDeployment: true,
      multiTenant: false
    },

    strengths: [
      "Market leader with proven enterprise track record",
      "Comprehensive feature set and policy management",
      "Strong Cisco ecosystem integration",
      "Extensive compliance certifications",
      "Large partner and support network"
    ],
    weaknesses: [
      "Complex deployment requiring 6+ months",
      "High infrastructure and maintenance costs",
      "47 CVEs including critical vulnerabilities",
      "Requires dedicated specialized staff",
      "Expensive licensing model with multiple add-ons"
    ],
    bestFor: [
      "Large enterprises with Cisco infrastructure",
      "Organizations with complex policy requirements",
      "Environments requiring extensive customization",
      "Companies with dedicated Cisco expertise"
    ],
    challenges: [
      "High total cost of ownership",
      "Complex ongoing management and maintenance",
      "Lengthy deployment and configuration process",
      "Requires significant hardware investment",
      "Multiple license types and add-on costs"
    ],
    advantages: [
      "Mature platform with extensive features",
      "Strong enterprise support and services",
      "Deep integration with Cisco security portfolio",
      "Comprehensive policy management capabilities"
    ]
  },

  aruba_clearpass: {
    id: "aruba_clearpass",
    name: "Aruba ClearPass",
    category: "challenger",
    marketShare: 18.7,
    deploymentType: "hybrid",
    logo: "/aruba-logo.png",
    description: "Comprehensive network access control with strong policy management and multi-vendor support. Requires hardware appliances and professional services.",

    pricing: {
      model: "per-device",
      basePrice: 25000,
      pricePerDevice: 8.5, // 2024 pricing
      minimumDevices: 50,
      volumeDiscounts: {
        "500": 8,
        "2500": 15,
        "10000": 25
      },
      contractTerms: {
        "annual_discount": 12,
        "multi_year_discount": 22
      },
      additionalCosts: {
        hardware: 80000, // ClearPass appliances
        services: 40000, // Implementation services
        training: 15000, // ClearPass training
        maintenance: 20000, // Annual maintenance
        support: 25000, // Support contracts
      },
      addOns: {
        "IntroSpect UEBA": { perDevice: 3.0, description: "User and entity behavior analytics" },
        "Policy Enforcement Firewall": { perDevice: 2.0, description: "Integrated firewall policies" },
        "Guest Management": { perDevice: 1.0, description: "Advanced guest portal" },
        "OnGuard Compliance": { perDevice: 1.5, description: "Endpoint compliance checking" }
      }
    },

    implementation: {
      timeToDeployDays: 90, // 3 months
      complexity: "medium",
      professionalServicesRequired: true,
      trainingHours: 24,
      onboardingComplexity: "moderate",
      migrationSupport: true,
      resourcesRequired: {
        technical: 1.5,
        administrative: 0.8,
        ongoing: 1.0
      }
    },

    security: {
      securityRating: 82,
      cveCount: 23, // 2024 data
      lastSecurityIncident: "2023-Q3",
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST"],
      zeroTrustMaturity: 70,
      certifications: ["Common-Criteria"]
    },

    features: {
      core: ["Policy Manager", "Device Insight", "Guest Access", "OnGuard"],
      advanced: ["IntroSpect UEBA", "Policy Enforcement", "Threat Detection"],
      integrations: ["Aruba Infrastructure", "Third-party Switches", "SIEM Solutions"],
      includedFeatures: ["Basic Policy Management", "Guest Portal", "Device Profiling"],
      additionalLicenses: ["IntroSpect", "Advanced Licensing", "Enterprise Features"]
    },

    infrastructure: {
      hardwareRequired: true,
      scalabilityScore: 75,
      highAvailability: 99.5,
      maintenanceWindows: 4, // Quarterly
      cloudNative: false,
      infrastructureCosts: 120000
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      customerSatisfaction: 84,
      professionalServices: {
        implementation: 40000,
        training: 15000,
        ongoing: 25000
      }
    },

    operationalMetrics: {
      adminEffort: 5,
      upgradeComplexity: "moderate",
      reportingCapabilities: "standard",
      apiAvailability: true,
      cloudManagement: false,
      staffingRequirements: {
        administrators: 1.5,
        specialists: 0.5,
        trainingDays: 5
      },
      operationalCosts: {
        monthlyMaintenance: 8000,
        annualSupport: 25000
      }
    },

    roi: {
      breachRiskReduction: 0.70,
      laborSavings: 1.0,
      complianceSavings: 50000,
      downtimeReduction: 0.75,
      operationalEfficiency: 0.65,
      timeToValue: 90,
      yearlyBenefit: 150000
    },

    riskMetrics: {
      securityPostureScore: 82,
      vendorStability: 85,
      technologyRisk: 25,
      complianceRisk: 20
    },

    complianceSummary: {
      automationLevel: 50,
      frameworksCovered: ["HIPAA", "PCI-DSS", "SOX", "GDPR"],
      auditReadiness: 75,
      automatedCompliance: false,
      certifications: ["Common-Criteria"]
    },

    scalability: {
      cloudNative: false,
      maxDevices: 50000,
      globalDeployment: true,
      multiTenant: false
    },

    strengths: [
      "Strong policy management capabilities",
      "Multi-vendor network support",
      "Good price-performance ratio",
      "Comprehensive feature set",
      "Strong Aruba ecosystem integration"
    ],
    weaknesses: [
      "Requires hardware appliances and infrastructure",
      "Complex initial setup and configuration",
      "23 CVEs including security vulnerabilities",
      "Limited cloud-native capabilities",
      "Ongoing maintenance requirements"
    ],
    bestFor: [
      "Mid to large enterprises with hybrid infrastructure",
      "Multi-vendor network environments",
      "Organizations with existing Aruba investments",
      "Policy-heavy deployment requirements"
    ],
    challenges: [
      "Hardware procurement and deployment complexity",
      "Ongoing appliance maintenance and updates",
      "Multiple license tiers and add-on costs",
      "Requires dedicated network security expertise"
    ],
    advantages: [
      "Mature platform with proven enterprise capabilities",
      "Strong multi-vendor network support",
      "Comprehensive policy management tools",
      "Good integration with existing infrastructure"
    ]
  },

  forescout: {
    id: "forescout",
    name: "Forescout Platform",
    category: "challenger",
    marketShare: 12.3,
    deploymentType: "hybrid",
    logo: "/forescout-logo.png",
    description: "Device visibility and control platform with strong IoT and OT security capabilities. Requires appliances and specialized expertise.",

    pricing: {
      model: "per-device",
      basePrice: 30000,
      pricePerDevice: 6.5, // 2024 pricing
      minimumDevices: 100,
      volumeDiscounts: {
        "1000": 12,
        "5000": 20,
        "10000": 30
      },
      contractTerms: {
        "annual_discount": 10,
        "multi_year_discount": 18
      },
      additionalCosts: {
        hardware: 60000, // Forescout appliances
        services: 35000, // Professional services
        training: 18000, // Technical training
        maintenance: 25000, // Annual maintenance
        support: 30000, // Support contracts
      },
      addOns: {
        "IoT Security": { perDevice: 2.0, description: "IoT device security and profiling" },
        "OT Visibility": { perDevice: 3.0, description: "Operational technology monitoring" },
        "Threat Detection": { perDevice: 2.5, description: "Advanced threat detection" },
        "Compliance Module": { perDevice: 1.5, description: "Compliance monitoring and reporting" }
      }
    },

    implementation: {
      timeToDeployDays: 120, // 4 months
      complexity: "medium",
      professionalServicesRequired: true,
      trainingHours: 32,
      onboardingComplexity: "moderate",
      migrationSupport: true,
      resourcesRequired: {
        technical: 1.8,
        administrative: 0.7,
        ongoing: 1.2
      }
    },

    security: {
      securityRating: 80,
      cveCount: 31, // 2024 data
      lastSecurityIncident: "2023-Q2",
      complianceSupport: ["HIPAA", "PCI-DSS", "NIST", "IEC 62443"],
      zeroTrustMaturity: 65,
      certifications: ["IEC-62443"]
    },

    features: {
      core: ["Device Discovery", "Classification", "Policy Enforcement", "Compliance Monitoring"],
      advanced: ["IoT Security", "OT Visibility", "Threat Detection", "Automated Response"],
      integrations: ["Security Orchestration", "SIEM Platforms", "Firewalls", "Endpoint Protection"],
      includedFeatures: ["Device Discovery", "Basic Classification", "Policy Enforcement"],
      additionalLicenses: ["IoT Module", "OT Module", "Advanced Analytics", "Threat Intelligence"]
    },

    infrastructure: {
      hardwareRequired: true,
      scalabilityScore: 70,
      highAvailability: 99.0,
      maintenanceWindows: 4, // Quarterly
      cloudNative: false,
      infrastructureCosts: 90000
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 3 hours",
      customerSatisfaction: 79,
      professionalServices: {
        implementation: 35000,
        training: 18000,
        ongoing: 30000
      }
    },

    operationalMetrics: {
      adminEffort: 6,
      upgradeComplexity: "moderate",
      reportingCapabilities: "advanced",
      apiAvailability: true,
      cloudManagement: false,
      staffingRequirements: {
        administrators: 1.8,
        specialists: 0.7,
        trainingDays: 8
      },
      operationalCosts: {
        monthlyMaintenance: 10000,
        annualSupport: 30000
      }
    },

    roi: {
      breachRiskReduction: 0.75,
      laborSavings: 0.8,
      complianceSavings: 60000,
      downtimeReduction: 0.70,
      operationalEfficiency: 0.60,
      timeToValue: 120,
      yearlyBenefit: 180000
    },

    riskMetrics: {
      securityPostureScore: 80,
      vendorStability: 75,
      technologyRisk: 35,
      complianceRisk: 25
    },

    complianceSummary: {
      automationLevel: 55,
      frameworksCovered: ["HIPAA", "PCI-DSS", "NIST", "IEC 62443"],
      auditReadiness: 70,
      automatedCompliance: false,
      certifications: ["IEC-62443"]
    },

    scalability: {
      cloudNative: false,
      maxDevices: 75000,
      globalDeployment: true,
      multiTenant: false
    },

    strengths: [
      "Excellent IoT and OT device visibility",
      "Strong device classification capabilities",
      "Good integration with security tools",
      "Comprehensive compliance features",
      "Industrial/OT network expertise"
    ],
    weaknesses: [
      "Complex deployment and management",
      "31 CVEs including security vulnerabilities",
      "Requires significant hardware investment",
      "Higher learning curve for administrators",
      "Limited cloud-native capabilities"
    ],
    bestFor: [
      "IoT-heavy environments",
      "Industrial/OT networks",
      "Compliance-focused organizations",
      "Large device inventories with diverse types"
    ],
    challenges: [
      "Appliance-based architecture limits scalability",
      "Complex policy management for large environments",
      "Ongoing hardware maintenance and refresh cycles",
      "Multiple modules require separate licensing"
    ],
    advantages: [
      "Strong device visibility and classification",
      "Excellent IoT and OT security capabilities",
      "Good threat detection and response features",
      "Comprehensive compliance monitoring"
    ]
  },

  ivanti_neurons: {
    id: "ivanti_neurons",
    name: "Ivanti Neurons for NAC",
    category: "niche",
    marketShare: 2.1,
    deploymentType: "on-premise",
    logo: "/ivanti-logo.png",
    description: "Legacy NAC solution with known security vulnerabilities. End-of-life product with active nation-state exploitation. Immediate migration strongly recommended.",

    pricing: {
      model: "per-device",
      basePrice: 15000,
      pricePerDevice: 7.0,
      minimumDevices: 100,
      volumeDiscounts: {
        "500": 5,
        "2000": 10,
        "5000": 15
      },
      contractTerms: {
        "annual_discount": 8,
        "multi_year_discount": 15
      },
      additionalCosts: {
        hardware: 45000,
        services: 30000,
        training: 12000,
        maintenance: 18000,
        support: 20000,
      },
      addOns: {
        "Advanced Reporting": { perDevice: 1.0, description: "Enhanced reporting capabilities" },
        "Mobile Device Support": { perDevice: 1.5, description: "Mobile device management" }
      }
    },

    implementation: {
      timeToDeployDays: 120,
      complexity: "high",
      professionalServicesRequired: true,
      trainingHours: 40,
      onboardingComplexity: "complex",
      migrationSupport: false,
      resourcesRequired: {
        technical: 2.5,
        administrative: 1.2,
        ongoing: 2.0
      }
    },

    security: {
      securityRating: 25, // Very low due to active exploitation
      cveCount: 89, // High number of vulnerabilities
      lastSecurityIncident: "2024-01-15", // Recent active exploitation
      complianceSupport: ["PCI-DSS", "HIPAA"],
      zeroTrustMaturity: 20,
      certifications: []
    },

    features: {
      core: ["Basic NAC", "Device Discovery", "Policy Enforcement"],
      advanced: [],
      integrations: ["Active Directory", "SIEM"],
      includedFeatures: ["Basic RADIUS", "Policy Engine"],
      additionalLicenses: ["Advanced Features", "Mobile Support"]
    },

    infrastructure: {
      hardwareRequired: true,
      scalabilityScore: 40,
      highAvailability: 95.0,
      maintenanceWindows: 8, // High maintenance
      cloudNative: false,
      infrastructureCosts: 60000
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 24 hours",
      customerSatisfaction: 45, // Very low
      professionalServices: {
        implementation: 30000,
        training: 12000,
        ongoing: 20000
      }
    },

    operationalMetrics: {
      adminEffort: 10, // Very high
      upgradeComplexity: "complex",
      reportingCapabilities: "basic",
      apiAvailability: false,
      cloudManagement: false,
      staffingRequirements: {
        administrators: 2.5,
        specialists: 1.5,
        trainingDays: 15
      },
      operationalCosts: {
        monthlyMaintenance: 12000,
        annualSupport: 20000
      }
    },

    roi: {
      breachRiskReduction: 0.10, // Very low - actually increases risk
      laborSavings: -1.0, // Negative - requires more staff
      complianceSavings: 10000,
      downtimeReduction: 0.30,
      operationalEfficiency: 0.20,
      timeToValue: 120,
      yearlyBenefit: -50000 // Negative value
    },

    riskMetrics: {
      securityPostureScore: 25,
      vendorStability: 30, // Low due to security issues
      technologyRisk: 95, // Very high
      complianceRisk: 80 // High risk
    },

    complianceSummary: {
      automationLevel: 20,
      frameworksCovered: ["PCI-DSS", "HIPAA"],
      auditReadiness: 40,
      automatedCompliance: false,
      certifications: []
    },

    scalability: {
      cloudNative: false,
      maxDevices: 10000,
      globalDeployment: false,
      multiTenant: false
    },

    strengths: [
      "Legacy compatibility with older systems"
    ],
    weaknesses: [
      "89 known CVEs including critical vulnerabilities",
      "Active nation-state exploitation in the wild",
      "End-of-life product with limited support",
      "High operational overhead and complexity",
      "Poor security posture and vendor stability",
      "No cloud-native capabilities",
      "Expensive maintenance and support costs"
    ],
    bestFor: [
      "Organizations requiring immediate migration away from this platform"
    ],
    challenges: [
      "Critical security vulnerabilities with active exploitation",
      "End-of-life status with limited vendor support",
      "High total cost of ownership",
      "Complex migration to modern alternatives required",
      "Significant security and compliance risks"
    ],
    advantages: [
      "None - immediate migration recommended"
    ]
  }
}

export const AllVendorData = ComprehensiveVendorDatabase