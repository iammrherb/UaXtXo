// Enhanced Vendor Data with Comprehensive Details, Compliance Frameworks, and Industry Metrics

// Defines the structure for individual vendor features
export interface VendorFeature {
  available: boolean
  details?: string
  score?: number // 0-100, used for quantitative comparison
  category?: "core" | "security" | "compliance" | "operational" | "integration" | "advanced"
}

// Defines the structure for vendor pricing tiers
export interface VendorPricingTier {
  name: string
  minDevices?: number | null
  maxDevices?: number | null
  pricePerDevice?: number // monthly
  pricePerUser?: number // monthly
  featuresIncluded?: string[]
  annualPricePerDevice?: number
  triennialPricePerDevice?: number
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
  }
  implementation: {
    complexity: "low" | "medium" | "high"
    deploymentTime: string
    hardwareRequired: boolean
    professionalServices: {
      required: boolean
      cost: number
    }
  }
  compliance: {
    frameworks: string[]
    auditReadiness: number
  }
  features: {
    [key: string]: boolean | string | number
  }
}

// Main VendorData interface, significantly enhanced
/*
export interface VendorData {
  id: string
  name: string
  type: "cloud-native" | "on-premise" | "cloud-radius" | "open-source" | "hybrid" | "cloud-managed"
  category: string
  logo: string // Local path to logo
  description: string
  marketPosition?: string
  yearFounded?: number
  headquarters?: string
  globalPresence?: string[]

  pricing: {
    model: string
    currency?: "USD" | "EUR" | "GBP" // Added currency
    billingOptions?: string[] // e.g., Monthly, Annual, Multi-Year
    tiers?: VendorPricingTier[]
    perDevice?: { monthly: number; annual?: number; triennial?: number; fiveYear?: number }
    perUser?: { monthly: number }
    licenses?: { base?: number; device?: number; subscription?: number; plus?: number; apex?: number } // Added plus, apex
    hardware?: Record<string, { cost: number; capacity?: string; description?: string; lifespan?: number }> // Added lifespan
    infrastructure?: {
      // Costs for on-prem infrastructure
      servers?: number
      storage?: number
      networking?: number
      virtualization?: number
    }
    addOns?: Record<
      string,
      {
        perDevice?: number // Changed from perDevice: number to perDevice?: number
        perUser?: number
        features: string
        category: "security" | "compliance" | "operations" | "integration" | "advanced"
      }
    >
    professionalServices?: {
      available?: boolean // Added available flag
      implementation?: number
      training?: number
      customization?: number
      migration?: number
      healthCheck?: number
      designServices?: number // Added designServices
      standard?: number // Retained for compatibility
    }
    support?: {
      // Detailed support tiers
      basic?: { cost: number; sla: string; included: boolean }
      premium?: { cost: string; sla: string; features: string[] }
      enterprise?: { cost: string; sla: string; features: string[] }
      advanced?: { availability: string; responseTime: string; channels: string[] } // For Meraki like structure
      standard?: { availability: string; responseTime: string; channels: string[] } // For Meraki like structure
    }
    maintenance?: number // Percentage or flat fee
    hiddenCosts?: {
      downtime?: number
      complexity?: number
      integration?: number
      staffTraining?: number
      networkRefresh?: number // Added networkRefresh
      total?: number
    }
    volumeDiscounts?: Record<number, number> // device_threshold: discount_percentage
    additionalCosts?: {
      // Retained for compatibility, prefer specific sections above
      implementation?: number
      training?: number
      support?: number
    }
  }

  implementation: {
    deploymentTime: { poc?: number; pilot?: number; fullDeployment: number } // hours or days
    deploymentModel?: string[] // e.g., SaaS, On-Premise Appliance
    requiredResources: {
      internal?: number // FTEs or hours
      vendor?: number // FTEs or hours
      training?: number // hours
      ongoing?: number // FTEs for maintenance
    }
    complexity: "low" | "medium" | "high" | "very-high"
    prerequisites?: string[]
  }

  infrastructure?: {
    // For cloud solutions primarily
    architecture?: string
    hosting?: string[] // e.g., AWS, Azure, GCP
    redundancy?: string
    dataResidency?: string[]
    certifications?: string[] // e.g., SOC 2 Type II, ISO 27001
    scalability?: {
      maxDevices: string | number
      maxSites?: string | number
      maxUsers?: string | number
      performanceMetrics?: Record<string, string>
    }
    reliability?: {
      sla?: number // percentage
      mttr?: number // minutes
      rto?: number // minutes
      rpo?: number // minutes
      historicalUptime?: number // percentage
    }
  }

  features: {
    core?: Record<string, VendorFeature | boolean | string | number> // Retain for general, prefer specific below
    security?: Record<string, VendorFeature | boolean | string | number>
    compliance?: {
      // Enhanced compliance section
      frameworksSupported?: string[] // List of framework names/IDs
      automationLevel?: number // Overall percentage
      reporting?: VendorFeature | boolean | string | number
      auditTrail?: VendorFeature | boolean | string | number
      policyTemplates?: VendorFeature | boolean | string | number
      continuousCompliance?: VendorFeature | boolean | string | number
      evidenceCollection?: VendorFeature | boolean | string | number
      [key: string]: any // For existing structure like automation score
    }
    operational?: Record<string, VendorFeature | boolean | string | number>
    integration?: {
      // Enhanced integration section
      authProviders?: VendorFeature & { supported?: string[] }
      siem?: VendorFeature & { supported?: string[] }
      itsm?: VendorFeature & { supported?: string[] }
      mdm?: VendorFeature & { supported?: string[] }
      firewall?: VendorFeature & { supported?: string[] }
      cloud?: VendorFeature & { supported?: string[] }
      api?: VendorFeature & { type?: string[]; documentation?: string }
      [key: string]: any // For existing structure like methods, preBuiltIntegrations
    }
    advanced?: Record<string, VendorFeature | boolean | string | number> // For new advanced features
    authentication?: {
      // Detailed authentication capabilities
      dot1x?: VendorFeature | boolean
      mab?: VendorFeature | boolean
      webAuth?: VendorFeature | boolean
      certificates?: VendorFeature | boolean
      pki?: VendorFeature & { details?: string }
      tacacs?: VendorFeature & { version?: string }
      radius?: VendorFeature & { features?: string[] }
      saml?: VendorFeature | boolean
      oauth?: VendorFeature | boolean
      conditionalAccess?: VendorFeature & { policies?: string[]; granularity?: "basic" | "advanced" | "enterprise" }
    }
    api?: {
      // Detailed API capabilities
      rest?: VendorFeature | boolean
      graphql?: VendorFeature | boolean
      webhooks?: VendorFeature | boolean
      rateLimit?: string
      documentation?: "basic" | "comprehensive" | "enterprise" | "Good" | "Complex" | "Limited" // Allow existing values
      sdks?: string[]
    }
    dashboards?: {
      // Detailed dashboard capabilities
      executive?: VendorFeature | boolean
      operational?: VendorFeature | boolean
      compliance?: VendorFeature | boolean
      customizable?: VendorFeature | boolean
      realtime?: VendorFeature | boolean
      mobileApp?: VendorFeature | boolean
    }
    iotOt?: {
      // Detailed IoT/OT capabilities
      deviceProfiling?: VendorFeature | boolean
      anomalyDetection?: VendorFeature | boolean
      segmentation?: VendorFeature | boolean
      protocols?: string[]
      industrialSupport?: VendorFeature | boolean
    }
    [key: string]: any // For other specific features or backward compatibility
  }

  support?: {
    // Detailed support structure
    tiers?: Array<{ name: string; availability: string; responseTime: string; channels: string[] }>
    languages?: string[]
    resources?: {
      documentation?: string
      training?: string
      community?: string
      professionalServices?: string
    }
  }

  roi: {
    paybackPeriod?: number // months
    yearlyBenefit?: number // currency
    laborSavings?: number // percentage or FTE
    incidentReduction?: number // percentage
    complianceSavings?: number // currency
    breachRiskReduction?: number // percentage (0-1)
    downtimeReduction?: number // percentage
    operationalEfficiency?: number // percentage or factor
    efficiencyGains?: number // For compatibility
    timeToValue?: number // days
    [key: string]: any
  }

  riskMetrics?: {
    // For quantifiable risk data
    mttr?: number // minutes
    mtbf?: number // hours
    breachProbabilityReduction?: number // percentage (0-1)
    complianceViolationRisk?: number // 1-10 scale
    securityPostureScore?: number // 0-100
    cyberInsuranceImpact?: number // percentage premium reduction
  }

  // Renamed from 'compliance' to 'complianceSummary' to avoid conflict with features.compliance
  complianceSummary?: {
    frameworks: string[] // List of framework IDs/names supported
    certifications: string[] // Official certifications held
    automationLevel: number // Overall percentage of compliance automation
    auditReadiness: number // Score 0-100
    continuousCompliance: boolean
  }

  competitiveAdvantages?: string[]
  customerMetrics?: {
    nps?: number
    csat?: number // e.g., 4.8 out of 5
    retention?: number // percentage (0-1)
    expansionRate?: number // e.g., 1.35 for 35% expansion
    timeToDeploy?: number // hours or days average
    adoptionRate?: number // percentage (0-1)
  }

  marketShare?: string // Retained for compatibility
  scalability?: {
    // Retained and can be part of infrastructure.scalability
    maxDevices: string | number
    maxSites?: string | number | "Unlimited networks" // Allow existing string
    performance?: string
    notes?: string
  }
  [key: string]: any // For other top-level vendor-specific data
}
*/
// Comprehensive compliance and risk data
export const complianceFrameworksData: Record<
  string,
  {
    name: string
    categories: string[]
    industries: string[]
    annualAuditCost: number
    nonCompliancePenalty: number
    implementationEffort: number // months
  }
> = {
  "SOC 2": {
    name: "SOC 2 Type II",
    categories: ["Security", "Availability", "Processing Integrity", "Confidentiality", "Privacy"],
    industries: ["Technology", "SaaS", "Financial Services", "Healthcare"],
    annualAuditCost: 50000,
    nonCompliancePenalty: 500000,
    implementationEffort: 6,
  },
  "ISO 27001": {
    name: "ISO 27001:2022",
    categories: ["Information Security Management"],
    industries: ["All"],
    annualAuditCost: 40000,
    nonCompliancePenalty: 300000,
    implementationEffort: 9,
  },
  HIPAA: {
    name: "HIPAA",
    categories: ["Privacy", "Security", "Breach Notification"],
    industries: ["Healthcare", "Health Tech", "Insurance"],
    annualAuditCost: 75000,
    nonCompliancePenalty: 1800000,
    implementationEffort: 12,
  },
  "PCI DSS": {
    name: "PCI DSS v4.0",
    categories: ["Payment Card Security"],
    industries: ["Retail", "E-commerce", "Financial Services"],
    annualAuditCost: 60000,
    nonCompliancePenalty: 500000,
    implementationEffort: 8,
  },
  GDPR: {
    name: "GDPR",
    categories: ["Data Privacy", "Data Protection"],
    industries: ["All (EU Operations)"],
    annualAuditCost: 80000,
    nonCompliancePenalty: 20000000, // Up to 4% of global revenue
    implementationEffort: 12,
  },
  NIST: {
    // Assuming NIST CSF
    name: "NIST Cybersecurity Framework",
    categories: ["Identify", "Protect", "Detect", "Respond", "Recover"],
    industries: ["Government", "Critical Infrastructure", "Defense"],
    annualAuditCost: 100000,
    nonCompliancePenalty: 1000000,
    implementationEffort: 18,
  },
  FedRAMP: {
    name: "FedRAMP",
    categories: ["Cloud Security", "Government Standards"],
    industries: ["Government", "Federal Contractors"],
    annualAuditCost: 500000,
    nonCompliancePenalty: 5000000,
    implementationEffort: 24,
  },
  CMMC: {
    name: "CMMC 2.0",
    categories: ["Defense Industrial Base Security"],
    industries: ["Defense", "Government Contractors"],
    annualAuditCost: 200000,
    nonCompliancePenalty: 3000000,
    implementationEffort: 18,
  },
  "NERC CIP": {
    name: "NERC CIP",
    categories: ["Critical Infrastructure Protection"],
    industries: ["Energy", "Utilities"],
    annualAuditCost: 150000,
    nonCompliancePenalty: 1000000,
    implementationEffort: 24,
  },
  SOX: {
    name: "Sarbanes-Oxley",
    categories: ["Financial Reporting", "Internal Controls"],
    industries: ["Public Companies", "Financial Services"],
    annualAuditCost: 200000,
    nonCompliancePenalty: 5000000,
    implementationEffort: 12,
  },
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

export const vendorDatabase: Record<string, VendorData> = {
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
    },
    implementation: {
      complexity: "low",
      deploymentTime: "6-12 weeks",
      hardwareRequired: false,
      professionalServices: {
        required: false,
        cost: 25000,
      },
    },
    compliance: {
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "GDPR"],
      auditReadiness: 95,
    },
    features: {
      cloudNative: true,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
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
    },
    implementation: {
      complexity: "high",
      deploymentTime: "6-12 months",
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 150000,
      },
    },
    compliance: {
      frameworks: ["SOC2", "HIPAA", "PCI-DSS"],
      auditReadiness: 85,
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: false,
      iotSupport: true,
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
    },
    implementation: {
      complexity: "medium",
      deploymentTime: "3-6 months",
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 75000,
      },
    },
    compliance: {
      frameworks: ["SOC2", "HIPAA", "PCI-DSS"],
      auditReadiness: 80,
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
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
    },
    implementation: {
      complexity: "high",
      deploymentTime: "4-8 months",
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 125000,
      },
    },
    compliance: {
      frameworks: ["SOC2", "HIPAA", "PCI-DSS", "NIST"],
      auditReadiness: 90,
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: true,
      iotSupport: true,
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
    },
    implementation: {
      complexity: "medium",
      deploymentTime: "2-4 months",
      hardwareRequired: true,
      professionalServices: {
        required: true,
        cost: 60000,
      },
    },
    compliance: {
      frameworks: ["SOC2", "PCI-DSS"],
      auditReadiness: 75,
    },
    features: {
      cloudNative: false,
      zeroTrust: true,
      aiMl: false,
      iotSupport: true,
    },
  },
}
/*
export const AllVendorData: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    type: "cloud-native",
    category: "Next-Gen Cloud NAC",
    logo: "/portnox-logo.png", // Using existing local logo
    description: "AI-powered cloud-native zero-trust NAC with unmatched ease of deployment",
    marketPosition: "Leader",
    yearFounded: 2007,
    headquarters: "New York, USA",
    globalPresence: ["North America", "Europe", "APAC", "LATAM"],
    pricing: {
      model: "SaaS Subscription",
      currency: "USD",
      billingOptions: ["Monthly", "Annual", "Multi-Year"],
      tiers: [
        {
          name: "Essentials",
          minDevices: 1,
          maxDevices: 250,
          pricePerDevice: 5.0,
          featuresIncluded: ["Core NAC", "Basic Compliance", "Standard Support"],
        },
        {
          name: "Professional",
          minDevices: 251,
          maxDevices: 1000,
          pricePerDevice: 4.0,
          featuresIncluded: ["Advanced NAC", "Compliance Automation", "Priority Support", "API Access"],
        },
        {
          name: "Enterprise",
          minDevices: 1001,
          maxDevices: 5000,
          pricePerDevice: 3.0,
          featuresIncluded: ["Full Platform", "Advanced Analytics", "24/7 Support", "Custom Integrations"],
        },
        {
          name: "Enterprise Plus",
          minDevices: 5001,
          pricePerDevice: 2.5,
          featuresIncluded: ["Everything", "Dedicated Success Manager", "Custom SLA", "White Glove Service"],
        },
      ],
      volumeDiscounts: { 500: 5, 1000: 10, 2500: 15, 5000: 20, 10000: 25, 25000: 30, 50000: 35 },
      hardware: {}, // No hardware costs for Portnox
      additionalCosts: { implementation: 0, training: 0, support: 0 },
      professionalServices: { available: true, implementation: 0, training: 0, customization: 5000 },
      hiddenCosts: { downtime: 0, complexity: 0, integration: 0, total: 0 },
      addOns: {
        "Advanced Threat Protection": {
          perDevice: 1.5,
          features: "ML-based threat detection, SOAR integration, Threat intel feeds",
          category: "security",
        },
        "Compliance Automation": {
          perDevice: 1.0,
          features: "Automated reporting, Continuous monitoring, Evidence collection",
          category: "compliance",
        },
        "IoT/OT Security": {
          perDevice: 2.0,
          features: "OT protocol support, Industrial device profiling, SCADA integration",
          category: "security",
        },
        "Risk Analytics": {
          perDevice: 1.5,
          features: "Device risk scoring, User behavior analytics, Predictive insights",
          category: "operations",
        },
      },
      perDevice: { monthly: 4.0 }, // Retain for base calculation compatibility
    },
    implementation: {
      deploymentTime: { poc: 4, pilot: 24, fullDeployment: 96 }, // hours
      deploymentModel: ["SaaS", "Multi-tenant", "Single-tenant"],
      requiredResources: { internal: 0.1, vendor: 0, training: 4, ongoing: 0.1 },
      complexity: "low",
      prerequisites: ["Internet connectivity", "Basic network access"],
    },
    infrastructure: {
      architecture: "Cloud-Native Microservices",
      hosting: ["AWS", "Azure", "GCP"],
      redundancy: "Multi-region active-active",
      dataResidency: ["US", "EU", "APAC", "Custom"],
      certifications: ["SOC 2 Type II", "ISO 27001", "ISO 27017", "ISO 27018", "CSA STAR"],
      scalability: {
        maxDevices: "Unlimited",
        maxSites: "Unlimited",
        maxUsers: "Unlimited",
        performanceMetrics: {
          authenticationRate: "10,000/second",
          concurrentSessions: "1,000,000+",
          apiRateLimit: "10,000/minute",
        },
      },
      reliability: { sla: 99.99, mttr: 15, rto: 30, rpo: 5, historicalUptime: 99.995 },
    },
    features: {
      core: {
        deviceVisibility: { available: true, details: "Real-time, ML-enhanced", score: 100 },
        deviceProfiling: { available: true, details: "20,000+ device fingerprints", score: 100 },
        networkSegmentation: { available: true, details: "Dynamic, policy-based", score: 100 },
        accessControl: { available: true, details: "802.1X, MAB, Web Auth", score: 100 },
        guestManagement: { available: true, details: "Self-service, sponsored", score: 100 },
        byod: { available: true, details: "Automated onboarding", score: 100 },
        agentless: { available: true, details: "100% agentless option", score: 100 },
        cloudNative: { available: true, details: "Built for cloud", score: 100 },
      },
      security: {
        zeroTrust: { available: true, details: "Full ZTNA implementation", score: 100 },
        threatDetection: { available: true, details: "AI-powered, real-time", score: 95 },
        incidentResponse: { available: true, details: "Automated containment", score: 95 },
        riskScoring: { available: true, details: "Continuous assessment", score: 95 },
        behavioralAnalytics: { available: true, details: "UEBA integration", score: 90 },
        microsegmentation: { available: true, details: "Dynamic policies", score: 100 },
        iotSecurity: { available: true, details: "Specialized IoT/OT", score: 95 },
        lateralMovement: { available: true, details: "East-west blocking", score: 95 },
      },
      compliance: {
        frameworksSupported: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "GDPR", "NIST", "CMMC"],
        automationLevel: 95,
        reporting: { available: true, details: "Scheduled, customizable", score: 100 },
        auditTrail: { available: true, details: "Immutable, searchable", score: 100 },
        policyTemplates: { available: true, details: "Pre-built for all frameworks", score: 95 },
        continuousCompliance: { available: true, details: "Real-time monitoring", score: 95 },
        evidenceCollection: { available: true, details: "Automated artifacts", score: 90 },
        automation: 95, // For backward compatibility with existing TCO calculator logic
      },
      integration: {
        authProviders: {
          available: true,
          supported: ["Azure AD", "Google", "Okta", "Ping", "AD", "LDAP", "SAML", "RADIUS"],
          score: 100,
        },
        siem: { available: true, supported: ["Splunk", "QRadar", "Sentinel", "Chronicle", "Elastic"], score: 100 },
        itsm: { available: true, supported: ["ServiceNow", "Jira", "BMC", "Freshservice"], score: 95 },
        mdm: { available: true, supported: ["Intune", "JAMF", "Workspace ONE", "MobileIron"], score: 95 },
        firewall: {
          available: true,
          supported: ["Palo Alto", "Fortinet", "Check Point", "Cisco", "Juniper"],
          score: 90,
        },
        cloud: { available: true, supported: ["AWS", "Azure", "GCP", "Oracle Cloud"], score: 95 },
        api: { available: true, type: ["REST", "GraphQL", "Webhooks"], documentation: "Comprehensive", score: 100 },
      },
      operational: {
        dashboard: { available: true, details: "Real-time, customizable", score: 100 },
        reporting: { available: true, details: "Advanced analytics", score: 95 },
        automation: { available: true, details: "95% task automation", score: 95 },
        aiOps: { available: true, details: "Predictive, self-healing", score: 90 },
        multiTenancy: { available: true, details: "Full isolation", score: 100 },
        rbac: { available: true, details: "Granular permissions", score: 100 },
      },
      advanced: {
        pki: { available: true, details: "Built-in CA, SCEP", score: 90 },
        tacacs: { available: true, details: "TACACS+ support", score: 85 },
        conditionalAccess: { available: true, details: "Context-aware policies", score: 95 },
        deviceHealth: { available: true, details: "Posture assessment", score: 90 },
        containerSupport: { available: true, details: "Docker, K8s visibility", score: 85 },
      },
    },
    support: {
      tiers: [
        { name: "Standard", availability: "Business hours", responseTime: "4 hours", channels: ["Email", "Portal"] },
        {
          name: "Priority",
          availability: "Extended hours",
          responseTime: "1 hour",
          channels: ["Email", "Portal", "Phone"],
        },
        { name: "Premium", availability: "24/7", responseTime: "15 minutes", channels: ["All", "Dedicated TAM"] },
      ],
      languages: ["English", "Spanish", "German", "French", "Japanese"],
      resources: {
        documentation: "Comprehensive online docs",
        training: "Free online university",
        community: "Active user community",
        professionalServices: "Available globally",
      },
    },
    roi: {
      paybackPeriod: 6,
      yearlyBenefit: 850000,
      laborSavings: 1.9,
      incidentReduction: 0.85,
      complianceSavings: 200000,
      breachRiskReduction: 0.8,
      operationalEfficiency: 0.75,
      timeToValue: 7,
    },
    riskMetrics: {
      mttr: 5,
      mtbf: 8760,
      breachProbabilityReduction: 0.8,
      complianceViolationRisk: 1,
      securityPostureScore: 95,
      cyberInsuranceImpact: 25,
    },
    complianceSummary: {
      frameworks: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "GDPR", "NIST", "CMMC", "FedRAMP"],
      certifications: ["SOC 2 Type II", "ISO 27001", "ISO 27017", "ISO 27018", "CSA STAR"],
      automationLevel: 95,
      auditReadiness: 98,
      continuousCompliance: true,
    },
    competitiveAdvantages: [
      "Fastest deployment",
      "No hardware",
      "Lowest TCO",
      "Most integrations",
      "True cloud-native",
      "AI-powered automation",
      "Zero learning curve",
    ],
    customerMetrics: { nps: 72, csat: 4.8, retention: 0.96, expansionRate: 1.35, timeToDeploy: 4, adoptionRate: 0.95 },
    marketShare: "Leader", // Kept for compatibility
    scalability: { maxDevices: "Unlimited" }, // Kept for compatibility
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    type: "cloud-managed",
    category: "Cloud-Managed NAC",
    logo: "/meraki-logo.png",
    description: "Cloud-managed IT with integrated access control",
    marketPosition: "Strong Contender",
    yearFounded: 2006,
    headquarters: "San Francisco, USA",
    globalPresence: ["North America", "Europe", "APAC"],
    pricing: {
      model: "Hardware + Subscription",
      currency: "USD",
      billingOptions: ["Annual", "3-Year", "5-Year"],
      perDevice: { monthly: 15, annual: 150, triennial: 135, fiveYear: 120 }, // Including hardware amortization
      hardware: {
        MR46: { cost: 1395, capacity: "WiFi 6 AP", lifespan: 5, description: "WiFi 6 Access Point" },
        "MS250-48": { cost: 4795, capacity: "48-port switch", lifespan: 7, description: "48-port PoE Switch" },
        MX84: { cost: 2395, capacity: "Security appliance", lifespan: 5, description: "Security & SD-WAN Appliance" },
      },
      licenses: { enterprise: 150, advanced: 300 }, // per device per year
      professionalServices: { implementation: 25000, training: 5000, designServices: 15000 },
      additionalCosts: { implementation: 25000, training: 5000, support: 10000 },
      hiddenCosts: { networkRefresh: 50000, complexity: 15000, integration: 20000, total: 85000 },
    },
    implementation: {
      deploymentTime: { poc: 168, pilot: 720, fullDeployment: 2160 }, // hours
      deploymentModel: ["Cloud-Managed", "On-Premise Hardware"],
      requiredResources: { internal: 1.5, vendor: 0.5, training: 40, ongoing: 1.0 },
      complexity: "medium",
      prerequisites: ["Network refresh", "Meraki hardware", "Internet connectivity"],
    },
    infrastructure: {
      architecture: "Cloud-Managed Hardware",
      hosting: ["Meraki Cloud"],
      redundancy: "Hardware redundancy required",
      dataResidency: ["Limited options"],
      certifications: ["SOC 2", "ISO 27001"],
      scalability: {
        maxDevices: "10,000 per network",
        maxSites: "Unlimited networks",
        maxUsers: "Hardware dependent",
        performanceMetrics: {
          authenticationRate: "Hardware limited",
          concurrentSessions: "Hardware limited",
          apiRateLimit: "5 requests/second",
        },
      },
      reliability: { sla: 99.9, mttr: 240, rto: 480, rpo: 60, historicalUptime: 99.5 },
    },
    features: {
      /* Merged from EnhancedVendorData */
{
  \
        deviceVisibility:
  available: true, details
  : "Basic visibility\", score: 70 },\
        deviceProfiling: { available: true, details: \"Limited profiling\", score: 65 },\
        networkSegmentation: { available: true, details: \"VLAN-based\", score: 75 },\
        accessControl: { available: true, details: \"802.1X, MAB\", score: 80 },\
        guestManagement: { available: true, details: \"Splash pages\", score: 85 },\
        byod: { available: true, details: \"Systems Manager\", score: 75 },\
        agentless: { available: false, details: \"Agent required for visibility\", score: 40 },\
        cloudNative: { available: false, details: \"Cloud-managed hardware\", score: 60 },\
      },
      security:
  \
        zeroTrust:
  available: false, details
  : "Traditional perimeter\", score: 30 },\
        threatDetection: { available: true, details: \"Basic IDS/IPS\", score: 60 },\
        incidentResponse: { available: false, details: "Manual response", score: 40 },
        riskScoring:
  available: false, details
  : "Not available", score: 20
  ,
        behavioralAnalytics:
  available: false, details
  : "Limited", score: 30
  ,
        microsegmentation:
  available: true, details
  : "Group policies", score: 60
  ,
        iotSecurity:
  available: true, details
  : "MT sensors", score: 70
  ,
        lateralMovement:
  available: true, details
  : "VLAN isolation", score: 65
  ,
  ,
      compliance:
  frameworksSupported: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS"], automationLevel
  : 40,
        reporting:
  available: true, details
  : "Basic reports", score: 60
  ,
        auditTrail:
  available: true, details
  : "Event log", score: 70
  ,
        policyTemplates:
  available: false, details
  : "Manual setup", score: 30
  ,
        continuousCompliance:
  available: false, details
  : "Periodic checks", score: 40
  ,
        evidenceCollection:
  available: false, details
  : "Manual", score: 20
  ,
        automation: 40,
  ,
      integration:
  available: true, supported
  : ["AD", "RADIUS", "LDAP", "Google", "Azure AD"], score: 70
  ,
        siem:
  available: true, supported
  : ["Syslog only"], score: 40
  ,
        itsm:
  available: false, supported
  : [], score: 20
  ,
        mdm:
  available: true, supported
  : ["Systems Manager"], score: 60
  ,
        firewall:
  available: true, supported
  : ["Meraki MX"], score: 80
  ,
        cloud:
  available: false, supported
  : [], score: 20
  ,
        api:
  available: true, type
  : ["REST"], documentation: "Good", score: 70
  ,
  ,
      operational:
  available: true, details
  : "Meraki Dashboard", score: 85
  ,
        reporting:
  available: true, details
  : "Basic analytics", score: 65
  ,
        automation:
  available: false, details
  : "Limited automation", score: 30
  ,
        aiOps:
  available: false, details
  : "Not available", score: 0
  ,
        multiTenancy:
  available: true, details
  : "Organization-based", score: 80
  ,
        rbac:
  available: true, details
  : "Role-based admin", score: 75
  ,
  ,
      advanced:
  available: false, details
  : "External PKI only", score: 30
  ,
        tacacs:
  available: false, details
  : "Not supported", score: 0
  ,
        conditionalAccess:
  available: false, details
  : "Basic policies", score: 40
  ,
        deviceHealth:
  available: true, details
  : "Systems Manager", score: 60
  ,
        containerSupport:
  available: false, details
  : "Not supported", score: 0
  ,
  ,
  ,
    support:
  tiers: [
    { name: "Standard", availability: "Business hours", responseTime: "Next business day", channels: ["Portal"] },
    { name: "Advanced", availability: "24/7", responseTime: "4 hours", channels: ["Portal", "Phone"] },
  ],
    languages
  : ["English", "Japanese", "Spanish"],
      resources:
  documentation: "Meraki documentation", training
  : "Paid training courses",
        community: "Meraki community",
        professionalServices: "Cisco partners",
  ,
  ,
    roi:
  paybackPeriod: 24, yearlyBenefit
  : 200000,
      laborSavings: -0.5,
      incidentReduction: 0.5,
      complianceSavings: 50000,
      breachRiskReduction: 0.45,
      operationalEfficiency: 0.4,
      timeToValue: 90,
  ,
    riskMetrics:
  mttr: 240, mtbf
  : 4380,
      breachProbabilityReduction: 0.45,
      complianceViolationRisk: 6,
      securityPostureScore: 60,
      cyberInsuranceImpact: 5,
  ,
    complianceSummary:
  frameworks: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS"], certifications
  : ["SOC 2"],
      automationLevel: 40,
      auditReadiness: 60,
      continuousCompliance: false,
  ,
    competitiveAdvantages: [
      "Integrated with Meraki ecosystem",
      "Simple dashboard interface",
      "Good for existing Meraki customers",
      "Reliable hardware",
    ],
    customerMetrics:
  nps: 45, csat
  : 3.8,
      retention: 0.82,
      expansionRate: 1.1,
      timeToDeploy: 2160,
      adoptionRate: 0.75,
  ,
    marketShare: "High (in Meraki ecosystem)",
    scalability:
  maxDevices: "10,000 per network"
  ,
  ,
  cisco:
  id: "cisco", name
  : "Cisco ISE",
  type: "on-premise", category
  : "Traditional Enterprise NAC",
    logo: "/cisco-logo.png",
    description: "Industry standard enterprise NAC with complex deployment",
    marketPosition: "Legacy Leader",
    yearFounded: 1984,
    headquarters: "San Jose, USA",
    globalPresence: ["Worldwide"],
    pricing:
  model: "Perpetual + Subscription", currency
  : "USD",
      billingOptions: ["Perpetual", "Subscription"],
      licenses:
  base: 25000, plus
  : 45000, apex: 65000, device: 85, subscription: 120
  ,
      hardware:
  ;("SNS-3615-K9")
  :
  cost: 65000, capacity
  : "5,000 endpoints", lifespan: 5, description: "Small Appliance"
  ,
        "SNS-3655-K9":
  cost: 110000, capacity
  : "20,000 endpoints", lifespan: 5, description: "Medium Appliance"
  ,
        "SNS-3695-K9":
  cost: 175000, capacity
  : "50,000 endpoints", lifespan: 5, description: "Large Appliance"
  ,
  ,
      maintenance: 0.22,
      professionalServices:
  implementation: 150000, training
  : 25000,
        healthCheck: 40000,
        upgrade: 60000,
        customization: 75000,
  ,
      additionalCosts:
  implementation: 150000, training
  : 25000, support: 50000
  ,
      hiddenCosts:
  downtime: 100000, complexity
  : 80000, staffTraining: 50000, integration: 70000, total: 300000
  ,
  ,
    implementation:
  poc: 720, pilot
  : 2160, fullDeployment: 4320
  , // hours
      deploymentModel: ["On-Premise", "Virtual Appliance", "Private Cloud"],
      requiredResources:
  internal: 3.0, vendor
  : 1.5, training: 80, ongoing: 2.5
  ,
      complexity: "very-high",
      prerequisites: ["Hardware sizing", "Network redesign", "Staff training", "Certificate infrastructure"],
  ,
    infrastructure:
  architecture: "Distributed with PSNs", hosting
  : ["On-premise data center"],
      redundancy: "Active-standby",
      dataResidency: ["Customer controlled"],
      certifications: ["Common Criteria", "FIPS 140-2"],
      scalability:
  maxDevices: "500,000", maxSites
  : "Unlimited with PSNs",
        maxUsers: "2,000,000",
        performanceMetrics:
  authenticationRate: "Depends on hardware", concurrentSessions
  : "Hardware limited",
          apiRateLimit: "Limited",
  ,
  ,
      reliability:
  sla: 99.5, mttr
  : 360, rto: 720, rpo: 120, historicalUptime: 98.5
  ,
  ,
    features:
  available: true, details
  : "With profiler", score: 85
  ,
        deviceProfiling:
  available: true, details
  : "Cisco profiler", score: 90
  ,
        networkSegmentation:
  available: true, details
  : "TrustSec", score: 85
  ,
        accessControl:
  available: true, details
  : "Full 802.1X", score: 95
  ,
        guestManagement:
  available: true, details
  : "Guest portal", score: 80
  ,
        byod:
  available: true, details
  : "BYOD portal", score: 75
  ,
        agentless:
  available: false, details
  : "Agent recommended", score: 30
  ,
        cloudNative:
  available: false, details
  : "On-premise only", score: 0
  ,
  ,
      security:
  available: false, details
  : "Traditional model", score: 40
  ,
        threatDetection:
  available: true, details
  : "With pxGrid", score: 70
  ,
        incidentResponse:
  available: true, details
  : "TC-NAC", score: 65
  ,
        riskScoring:
  available: true, details
  : "Basic scoring", score: 60
  ,
        behavioralAnalytics:
  available: false, details
  : "Limited", score: 40
  ,
        microsegmentation:
  available: true, details
  : "TrustSec", score: 80
  ,
        iotSecurity:
  available: true, details
  : "IoT classification", score: 70
  ,
        lateralMovement:
  available: true, details
  : "SGT-based", score: 75
  ,
  ,
      compliance:
  frameworksSupported: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "NIST"], automationLevel
  : 50,
        reporting:
  available: true, details
  : "Manual reports", score: 60
  ,
        auditTrail:
  available: true, details
  : "Comprehensive logs", score: 85
  ,
        policyTemplates:
  available: true, details
  : "Some templates", score: 65
  ,
        continuousCompliance:
  available: false, details
  : "Periodic", score: 45
  ,
        evidenceCollection:
  available: false, details
  : "Manual", score: 30
  ,
        automation: 50,
  ,
      integration:
  available: true, supported
  : ["AD", "LDAP", "RADIUS", "SAML", "RSA"], score: 85
  ,
        siem:
  available: true, supported
  : ["pxGrid", "Syslog", "SNMP"], score: 80
  ,
        itsm:
  available: true, supported
  : ["ServiceNow", "BMC"], score: 60
  ,
        mdm:
  available: true, supported
  : ["AirWatch", "MobileIron", "Intune"], score: 70
  ,
        firewall:
  available: true, supported
  : ["Cisco ASA", "FTD", "Firepower"], score: 90
  ,
        cloud:
  available: false, supported
  : [], score: 20
  ,
        api:
  available: true, type
  : ["REST", "pxGrid"], documentation: "Complex", score: 60
  ,
  ,
      operational:
  available: true, details
  : "Complex UI", score: 50
  ,
        reporting:
  available: true, details
  : "Built-in reports", score: 65
  ,
        automation:
  available: false, details
  : "Limited", score: 30
  ,
        aiOps:
  available: false, details
  : "Not available", score: 0
  ,
        multiTenancy:
  available: false, details
  : "Single tenant", score: 20
  ,
        rbac:
  available: true, details
  : "Admin roles", score: 70
  ,
  ,
      advanced:
  available: true, details
  : "Built-in CA", score: 85
  ,
        tacacs:
  available: true, details
  : "Full TACACS+", score: 95
  ,
        conditionalAccess:
  available: true, details
  : "Policy sets", score: 75
  ,
        deviceHealth:
  available: true, details
  : "Posture assessment", score: 80
  ,
        containerSupport:
  available: false, details
  : "Not supported", score: 0
  ,
  ,
  ,
    support:
  tiers: [
    { name: "8x5xNBD", availability: "Business hours", responseTime: "Next business day", channels: ["TAC"] },
    { name: "24x7x4", availability: "24/7", responseTime: "4 hours", channels: ["TAC", "Phone"] },
    { name: "24x7x2", availability: "24/7", responseTime: "2 hours", channels: ["TAC", "Phone", "On-site"] },
  ],
    languages
  : ["Multiple languages"],
      resources:
  documentation: "Extensive but complex", training
  : "Cisco Learning",
        community: "Cisco Community",
        professionalServices: "Cisco Advanced Services",
  ,
  ,
    roi:
  paybackPeriod: 36, yearlyBenefit
  : 150000,
      laborSavings: -2.0,
      incidentReduction: 0.6,
      complianceSavings: 75000,
      breachRiskReduction: 0.55,
      operationalEfficiency: 0.3,
      timeToValue: 180,
  ,
    riskMetrics:
  mttr: 360, mtbf
  : 2000,
      breachProbabilityReduction: 0.55,
      complianceViolationRisk: 7,
      securityPostureScore: 65,
      cyberInsuranceImpact: 0,
  ,
    complianceSummary:
  frameworks: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "NIST"], certifications
  : ["Common Criteria", "FIPS 140-2"],
      automationLevel: 50,
      auditReadiness: 70,
      continuousCompliance: false,
  ,
    competitiveAdvantages: [
      "Industry standard",
      "Deep Cisco ecosystem integration",
      "Mature product",
      "Extensive features",
    ],
    customerMetrics:
  nps: 25, csat
  : 3.2,
      retention: 0.75,
      expansionRate: 1.05,
      timeToDeploy: 4320,
      adoptionRate: 0.6,
  ,
    marketShare: "High",
    scalability:
  maxDevices: "500,000"
  ,
  ,
  aruba:
  id: "aruba", name
  : "Aruba ClearPass",
  type: "on-premise", category
  : "Enterprise NAC",
    logo: "/aruba-logo.png",
    description: "HPE Aruba's network access control and policy management",
    marketPosition: "Challenger",
    yearFounded: 2002,
    headquarters: "Santa Clara, USA",
    globalPresence: ["Worldwide"],
    pricing:
  model: "Perpetual + Support", currency
  : "USD",
      billingOptions: ["Perpetual", "Subscription"],
      licenses:
  base: 50000, device
  : 60, subscription: 35
  ,
      hardware:
  ;("CP-HW-5K")
  :
  cost: 28995, capacity
  : "5,000 endpoints", lifespan: 5, description: "Small Appliance"
  ,
        "CP-HW-25K":
  cost: 69995, capacity
  : "25,000 endpoints", lifespan: 5, description: "Medium Appliance"
  ,
  ,
      maintenance: 0.2,
      professionalServices:
  implementation: 80000, training
  : 15000, quickStart: 25000, customization: 50000
  ,
      additionalCosts:
  implementation: 80000, training
  : 15000, support: 30000
  ,
      hiddenCosts:
  complexity: 50000, integration
  : 40000, upgrades: 30000, total: 120000
  ,
  ,
    implementation:
  poc: 480, pilot
  : 1440, fullDeployment: 2880
  , // hours
      deploymentModel: ["On-Premise", "Virtual", "Hardware Appliance"],
      requiredResources:
  internal: 2.0, vendor
  : 1.0, training: 40, ongoing: 1.5
  ,
      complexity: "high",
      prerequisites: ["Hardware planning", "Network design", "Certificate setup"],
  ,
    infrastructure:
  architecture: "Clustered architecture", hosting
  : ["On-premise"],
      redundancy: "Active-active clustering",
      dataResidency: ["Customer controlled"],
      certifications: ["Common Criteria"],
      scalability:
  maxDevices: "100,000", maxSites
  : "Multi-site capable",
        maxUsers: "250,000",
        performanceMetrics:
  authenticationRate: "30,000/hour", concurrentSessions
  : "100,000",
          apiRateLimit: "Limited",
  ,
  ,
      reliability:
  sla: 99.0, mttr
  : 240, rto: 480, rpo: 60, historicalUptime: 98.0
  ,
  ,
    features:
  available: true, details
  : "Device Insight", score: 80
  ,
        deviceProfiling:
  available: true, details
  : "Profiling", score: 85
  ,
        networkSegmentation:
  available: true, details
  : "Dynamic segmentation", score: 80
  ,
        accessControl:
  available: true, details
  : "802.1X, MAC auth", score: 90
  ,
        guestManagement:
  available: true, details
  : "Guest module", score: 85
  ,
        byod:
  available: true, details
  : "OnBoard", score: 80
  ,
        agentless:
  available: true, details
  : "Agentless available", score: 70
  ,
        cloudNative:
  available: false, details
  : "On-premise", score: 0
  ,
  ,
      security:
  available: false, details
  : "Traditional NAC", score: 35
  ,
        threatDetection:
  available: true, details
  : "IntroSpect integration", score: 65
  ,
        incidentResponse:
  available: true, details
  : "Manual workflows", score: 55
  ,
        riskScoring:
  available: true, details
  : "Device profiling", score: 60
  ,
        behavioralAnalytics:
  available: false, details
  : "Limited", score: 35
  ,
        microsegmentation:
  available: true, details
  : "Dynamic roles", score: 70
  ,
        iotSecurity:
  available: true, details
  : "IoT profiling", score: 65
  ,
        lateralMovement:
  available: true, details
  : "Role-based", score: 65
  ,
  ,
      compliance:
  frameworksSupported: ["ISO 27001", "HIPAA", "PCI DSS"], automationLevel
  : 35,
        reporting:
  available: true, details
  : "Basic reports", score: 55
  ,
        auditTrail:
  available: true, details
  : "Audit logs", score: 75
  ,
        policyTemplates:
  available: false, details
  : "Manual creation", score: 25
  ,
        continuousCompliance:
  available: false, details
  : "Not available", score: 20
  ,
        evidenceCollection:
  available: false, details
  : "Manual", score: 20
  ,
        automation: 35,
  ,
      integration:
  available: true, supported
  : ["AD", "LDAP", "RADIUS"], score: 70
  ,
        siem:
  available: true, supported
  : ["Syslog", "ArcSight"], score: 50
  ,
        itsm:
  available: false, supported
  : [], score: 15
  ,
        mdm:
  available: true, supported
  : ["AirWatch", "MobileIron"], score: 60
  ,
        firewall:
  available: true, supported
  : ["Aruba", "Palo Alto"], score: 70
  ,
        cloud:
  available: false, supported
  : [], score: 10
  ,
        api:
  available: true, type
  : ["REST"], documentation: "Limited", score: 50
  ,
  ,
      operational:
  available: true, details
  : "ClearPass UI", score: 60
  ,
        reporting:
  available: true, details
  : "Basic analytics", score: 55
  ,
        automation:
  available: false, details
  : "Manual processes", score: 25
  ,
        aiOps:
  available: false, details
  : "Not available", score: 0
  ,
        multiTenancy:
  available: false, details
  : "Single tenant", score: 15
  ,
        rbac:
  available: true, details
  : "Admin roles", score: 65
  ,
  ,
      advanced:
  available: true, details
  : "Onboard CA", score: 75
  ,
        tacacs:
  available: true, details
  : "TACACS+ support", score: 80
  ,
        conditionalAccess:
  available: true, details
  : "Policy engine", score: 70
  ,
        deviceHealth:
  available: true, details
  : "OnGuard", score: 75
  ,
        containerSupport:
  available: false, details
  : "Not supported", score: 0
  ,
  ,
  ,
    support:
  tiers: [
    { name: "Foundation Care", availability: "Business hours", responseTime: "NBD", channels: ["Portal"] },
    { name: "24x7 Care", availability: "24/7", responseTime: "4 hours", channels: ["Phone", "Portal"] },
  ],
    languages
  : ["English", "Limited others"],
      resources:
  documentation: "HPE documentation", training
  : "HPE Education",
        community: "Airheads Community",
        professionalServices: "HPE Services",
  ,
  ,
    roi:
  paybackPeriod: 30, yearlyBenefit
  : 180000,
      laborSavings: -1.0,
      incidentReduction: 0.55,
      complianceSavings: 60000,
      breachRiskReduction: 0.5,
      operationalEfficiency: 0.35,
      timeToValue: 120,
  ,
    riskMetrics:
  mttr: 240, mtbf
  : 3000,
      breachProbabilityReduction: 0.5,
      complianceViolationRisk: 8,
      securityPostureScore: 60,
      cyberInsuranceImpact: -5,
  ,
    complianceSummary:
  frameworks: ["ISO 27001", "HIPAA", "PCI DSS"], certifications
  : ["Common Criteria"],
      automationLevel: 35,
      auditReadiness: 65,
      continuousCompliance: false,
  ,
    competitiveAdvantages: [
      "Good for Aruba wireless",
      "Established product",
      "Hardware appliance option",
      "TACACS+ support",
    ],
    customerMetrics:
  nps: 35, csat
  : 3.5,
      retention: 0.78,
      expansionRate: 1.08,
      timeToDeploy: 2880,
      adoptionRate: 0.65,
  ,
    marketShare: "Medium",
    scalability:
  maxDevices: "100,000"
  ,
  ,
  // ... Other vendors from previous data, adapted to new structure
  forescout:
  id: "forescout", name
  : "Forescout eyeSight",
  type: "on-premise", category
  : "Agentless NAC",
    logo: "/forescout-logo.png",
    description: "Agentless device visibility and control platform",
    pricing:
  model: "Subscription", tiers
  : [
  name: "eyeSight", pricePerDevice
  : 13
  ,
  name: "eyeControl", pricePerDevice
  : 25
  ,
  name: "eyeExtend", pricePerDevice
  : 37
  ,
      ],
      hardware:
  cost: 25000, description
  : "Small Appliance"
  ,
        physical_medium:
  cost: 55000, description
  : "Medium Appliance"
  ,
  ,
      professionalServices:
  standard: 80000
  ,
      hiddenCosts:
  complexity: 30000, total
  : 30000
  ,
  ,
    implementation:
  fullDeployment: 90 * 24
  , // days to hours
      requiredResources:
  internal: 2.5, vendor
  : 1.0, training: 32
  ,
      complexity: "high",
  ,
    features:
  agentless: true, deploymentModel
  : "On-Premise/Virtual Appliance", hardwareRequired: true
  ,
      security:
  score: 50
  ,
      compliance:
  automation: 20
  ,
  ,
    roi:
  paybackPeriod: 15, laborSavings
  : -1.5, incidentReduction: 0.6, breachRiskReduction: 0.5
  ,
    marketShare: "Medium",
    scalability:
  maxDevices: "Medium"
  ,
  ,
  extreme:
  id: "extreme", name
  : "ExtremeControl",
  type: "hybrid", category
  : "Enterprise NAC",
    logo: "/extreme-logo.png",
    description: "Policy-based NAC for wired and wireless networks.",
    pricing:
  model: "Subscription + Hardware", perDevice
  :
  monthly: 10
  ,
      hardware:
  cost: 15000, description
  : "Controller Hardware"
  ,
      professionalServices:
  standard: 30000
  ,
  ,
    implementation:
  fullDeployment: 60 * 24
  ,
      requiredResources:
  internal: 2.0, training
  : 24
  ,
      complexity: "medium",
  ,
    features:
  deploymentModel: "Hybrid"
  ,
    roi:
  paybackPeriod: 20, breachRiskReduction
  : 0.55
  ,
    marketShare: "Low",
    scalability:
  maxDevices: "Medium"
  ,
  ,
  arista:
  id: "arista", name
  : "Arista CUE",
  type: "cloud-native", category
  : "Cloud-Managed NAC",
    logo: "/arista-logo.png",
    description: "Cloud-managed network services including NAC.",
    pricing:
  model: "SaaS Subscription", perDevice
  :
  monthly: 7
  , professionalServices:
  implementation: 10000
  ,
    implementation:
  fullDeployment: 30 * 24
  ,
      requiredResources:
  internal: 1.0, training
  : 16
  ,
      complexity: "medium",
  ,
    features:
  cloudNative: true, deploymentModel
  : "Cloud SaaS"
  ,
    roi:
  paybackPeriod: 12, breachRiskReduction
  : 0.7
  ,
    marketShare: "Low",
    scalability:
  maxDevices: "High"
  ,
  ,
  juniper:
  id: "juniper", name
  : "Juniper Mist Access Assurance",
  type: "cloud-native", category
  : "AI-Driven NAC",
    logo: "/juniper-logo.png",
    description: "AI-driven cloud NAC for modern enterprises.",
    pricing:
  model: "SaaS Subscription", perDevice
  :
  monthly: 8
  , professionalServices:
  implementation: 12000
  ,
    implementation:
  fullDeployment: 20 * 24
  ,
      requiredResources:
  internal: 0.5, training
  : 8
  ,
      complexity: "low",
  ,
    features:
  cloudNative: true, aiPowered
  : true, deploymentModel: "Cloud SaaS"
  ,
    roi:
  paybackPeriod: 10, breachRiskReduction
  : 0.75
  ,
    marketShare: "Emerging",
    scalability:
  maxDevices: "High"
  ,
  ,
  fortinet:
  id: "fortinet", name
  : "FortiNAC",
  type: "on-premise", category
  : "Security Fabric NAC",
    logo: "/fortinet-logo.png",
    description: "Network access control integrated with Fortinet Security Fabric.",
    pricing:
  model: "Perpetual + Subscription", licenses
  :
  device: 60
  ,
      hardware:
  cost: 20000, description
  : "Appliance Hardware"
  ,
      professionalServices:
  standard: 40000
  ,
  ,
    implementation:
  fullDeployment: 90 * 24
  ,
      requiredResources:
  internal: 2.5, training
  : 32
  ,
      complexity: "high",
  ,
    features:
  deploymentModel: "On-Premise Appliance"
  ,
    roi:
  paybackPeriod: 22, breachRiskReduction
  : 0.6
  ,
    marketShare: "Medium",
    scalability:
  maxDevices: "Medium"
  ,
  ,
  microsoft:
  id: "microsoft", name
  : "Microsoft Intune/NPS",
  type: "hybrid", category
  : "MDM/Endpoint NAC",
    logo: "/microsoft-logo.png",
    description: "Leverages Intune for MDM and NPS for network policy.",
    pricing:
  model: "Subscription (Part of M365)", perUser
  :
  monthly: 5
  ,
      professionalServices:
  implementation: 25000
  ,
  ,
    implementation:
  fullDeployment: 45 * 24
  ,
      requiredResources:
  internal: 1.5, training
  : 20
  ,
      complexity: "medium",
  ,
    features:
  deploymentModel: "Hybrid"
  ,
    roi:
  paybackPeriod: 18, breachRiskReduction
  : 0.5
  ,
    marketShare: "High (as part of M365)",
    scalability:
  maxDevices: "High (with Azure)"
  ,
  ,
  packetfence:
  id: "packetfence", name
  : "PacketFence",
  type: "open-source", category
  : "Open Source NAC",
    logo: "/packetfence-logo.png",
    description: "Open source NAC solution requiring extensive customization",
    pricing:
  model: "Open Source + Support", licenses
  :
  base: 0
  ,
      professionalServices:
  implementation: 95000
  ,
      additionalCosts:
  support: 25000
  ,
  ,
    implementation:
  fullDeployment: 120 * 24
  ,
      requiredResources:
  internal: 4.0
  ,
      complexity: "very-high",
  ,
    features:
  customizable: true, complexSetup
  : true, requiresExpertise: true, deploymentModel: "Self-Hosted"
  ,
  ,
    roi:
  paybackPeriod: 30, breachRiskReduction
  : 0.4
  ,
    marketShare: "Low",
    scalability:
  maxDevices: "Varies"
  ,
  ,
  foxpass:
  id: "foxpass", name
  : "Foxpass",
  type: "cloud-radius", category
  : "Cloud RADIUS",
    logo: "/foxpass-logo.png",
    description: "Simple cloud-hosted RADIUS for basic authentication",
    pricing:
  model: "SaaS Subscription", perUser
  :
  monthly: 1.5
  ,
    implementation:
  fullDeployment: 3 * 24
  ,
      requiredResources:
  internal: 0.25
  ,
      complexity: "low",
  ,
    features:
  radiusServer: true, ldapSync
  : true,
        basicAuth: true,
        limitedNAC: true,
        noDeviceProfiling: true,
        noRiskAssessment: true,
        noCompliance: true,
        deploymentModel: "Cloud SaaS",
  ,
  ,
    roi:
  paybackPeriod: 6, breachRiskReduction
  : 0.3
  ,
    marketShare: "Low",
    scalability:
  maxDevices: "Medium"
  ,
  ,
  securew2:
  id: "securew2", name
  : "SecureW2",
  type: "cloud-radius", category
  : "Cloud PKI & RADIUS",
    logo: "/securew2-logo.png",
    description: "Cloud-based PKI and RADIUS for certificate-based authentication.",
    pricing:
  model: "SaaS Subscription", perUser
  :
  monthly: 2.5
  , professionalServices:
  implementation: 5000
  ,
    implementation:
  fullDeployment: 7 * 24
  ,
      requiredResources:
  internal: 0.5, training
  : 8
  ,
      complexity: "low",
  ,
    features:
  pki: true, cloudRadius
  : true, deploymentModel: "Cloud SaaS"
  ,
    roi:
  paybackPeriod: 9, breachRiskReduction
  : 0.45
  ,
    marketShare: "Low",
    scalability:
  maxDevices: "Medium"
  ,
  ,
  radiusaas:
  id: "radiusaas", name
  : "RADIUS-as-a-Service",
  type: "cloud-radius", category
  : "Managed RADIUS",
    logo: "/radiusaas-logo.png",
    description: "Managed RADIUS service for various authentication needs.",
    pricing:
  model: "SaaS Subscription", perUser
  :
  monthly: 1.0
  , professionalServices:
  implementation: 2000
  ,
    implementation:
  fullDeployment: 5 * 24
  ,
      requiredResources:
  internal: 0.2, training
  : 4
  ,
      complexity: "low",
  ,
    features:
  managedRadius: true, deploymentModel
  : "Cloud SaaS"
  ,
    roi:
  paybackPeriod: 5, breachRiskReduction
  : 0.25
  ,
    marketShare: "Niche",
    scalability:
  maxDevices: "Medium"
  ,
  ,
}
*/
export const AllVendorData: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    type: "cloud-native",
    category: "Next-Gen Cloud NAC",
    logo: "/portnox-logo.png", // Using existing local logo
    description: "AI-powered cloud-native zero-trust NAC with unmatched ease of deployment",
    marketPosition: "Leader",
    yearFounded: 2007,
    headquarters: "New York, USA",
    globalPresence: ["North America", "Europe", "APAC", "LATAM"],
    pricing: {
      model: "SaaS Subscription",
      currency: "USD",
      billingOptions: ["Monthly", "Annual", "Multi-Year"],
      tiers: [
        {
          name: "Essentials",
          minDevices: 1,
          maxDevices: 250,
          pricePerDevice: 5.0,
          featuresIncluded: ["Core NAC", "Basic Compliance", "Standard Support"],
        },
        {
          name: "Professional",
          minDevices: 251,
          maxDevices: 1000,
          pricePerDevice: 4.0,
          featuresIncluded: ["Advanced NAC", "Compliance Automation", "Priority Support", "API Access"],
        },
        {
          name: "Enterprise",
          minDevices: 1001,
          maxDevices: 5000,
          pricePerDevice: 3.0,
          featuresIncluded: ["Full Platform", "Advanced Analytics", "24/7 Support", "Custom Integrations"],
        },
        {
          name: "Enterprise Plus",
          minDevices: 5001,
          pricePerDevice: 2.5,
          featuresIncluded: ["Everything", "Dedicated Success Manager", "Custom SLA", "White Glove Service"],
        },
      ],
      volumeDiscounts: { 500: 5, 1000: 10, 2500: 15, 5000: 20, 10000: 25, 25000: 30, 50000: 35 },
      hardware: {}, // No hardware costs for Portnox
      additionalCosts: { implementation: 0, training: 0, support: 0 },
      professionalServices: { available: true, implementation: 0, training: 0, customization: 5000 },
      hiddenCosts: { downtime: 0, complexity: 0, integration: 0, total: 0 },
      addOns: {
        "Advanced Threat Protection": {
          perDevice: 1.5,
          features: "ML-based threat detection, SOAR integration, Threat intel feeds",
          category: "security",
        },
        "Compliance Automation": {
          perDevice: 1.0,
          features: "Automated reporting, Continuous monitoring, Evidence collection",
          category: "compliance",
        },
        "IoT/OT Security": {
          perDevice: 2.0,
          features: "OT protocol support, Industrial device profiling, SCADA integration",
          category: "security",
        },
        "Risk Analytics": {
          perDevice: 1.5,
          features: "Device risk scoring, User behavior analytics, Predictive insights",
          category: "operations",
        },
      },
      perDevice: { monthly: 4.0 }, // Retain for base calculation compatibility
    },
    implementation: {
      deploymentTime: { poc: 4, pilot: 24, fullDeployment: 96 }, // hours
      deploymentModel: ["SaaS", "Multi-tenant", "Single-tenant"],
      requiredResources: { internal: 0.1, vendor: 0, training: 4, ongoing: 0.1 },
      complexity: "low",
      prerequisites: ["Internet connectivity", "Basic network access"],
    },
    infrastructure: {
      architecture: "Cloud-Native Microservices",
      hosting: ["AWS", "Azure", "GCP"],
      redundancy: "Multi-region active-active",
      dataResidency: ["US", "EU", "APAC", "Custom"],
      certifications: ["SOC 2 Type II", "ISO 27001", "ISO 27017", "ISO 27018", "CSA STAR"],
      scalability: {
        maxDevices: "Unlimited",
        maxSites: "Unlimited",
        maxUsers: "Unlimited",
        performanceMetrics: {
          authenticationRate: "10,000/second",
          concurrentSessions: "1,000,000+",
          apiRateLimit: "10,000/minute",
        },
      },
      reliability: { sla: 99.99, mttr: 15, rto: 30, rpo: 5, historicalUptime: 99.995 },
    },
    features: {
      core: {
        deviceVisibility: { available: true, details: "Real-time, ML-enhanced", score: 100 },
        deviceProfiling: { available: true, details: "20,000+ device fingerprints", score: 100 },
        networkSegmentation: { available: true, details: "Dynamic, policy-based", score: 100 },
        accessControl: { available: true, details: "802.1X, MAB, Web Auth", score: 100 },
        guestManagement: { available: true, details: "Self-service, sponsored", score: 100 },
        byod: { available: true, details: "Automated onboarding", score: 100 },
        agentless: { available: true, details: "100% agentless option", score: 100 },
        cloudNative: { available: true, details: "Built for cloud", score: 100 },
      },
      security: {
        zeroTrust: { available: true, details: "Full ZTNA implementation", score: 100 },
        threatDetection: { available: true, details: "AI-powered, real-time", score: 95 },
        incidentResponse: { available: true, details: "Automated containment", score: 95 },
        riskScoring: { available: true, details: "Continuous assessment", score: 95 },
        behavioralAnalytics: { available: true, details: "UEBA integration", score: 90 },
        microsegmentation: { available: true, details: "Dynamic policies", score: 100 },
        iotSecurity: { available: true, details: "Specialized IoT/OT", score: 95 },
        lateralMovement: { available: true, details: "East-west blocking", score: 95 },
      },
      compliance: {
        frameworksSupported: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "GDPR", "NIST", "CMMC"],
        automationLevel: 95,
        reporting: { available: true, details: "Scheduled, customizable", score: 100 },
        auditTrail: { available: true, details: "Immutable, searchable", score: 100 },
        policyTemplates: { available: true, details: "Pre-built for all frameworks", score: 95 },
        continuousCompliance: { available: true, details: "Real-time monitoring", score: 95 },
        evidenceCollection: { available: true, details: "Automated artifacts", score: 90 },
        automation: 95, // For backward compatibility with existing TCO calculator logic
      },
      integration: {
        authProviders: {
          available: true,
          supported: ["Azure AD", "Google", "Okta", "Ping", "AD", "LDAP", "SAML", "RADIUS"],
          score: 100,
        },
        siem: { available: true, supported: ["Splunk", "QRadar", "Sentinel", "Chronicle", "Elastic"], score: 100 },
        itsm: { available: true, supported: ["ServiceNow", "Jira", "BMC", "Freshservice"], score: 95 },
        mdm: { available: true, supported: ["Intune", "JAMF", "Workspace ONE", "MobileIron"], score: 95 },
        firewall: {
          available: true,
          supported: ["Palo Alto", "Fortinet", "Check Point", "Cisco", "Juniper"],
          score: 90,
        },
        cloud: { available: true, supported: ["AWS", "Azure", "GCP", "Oracle Cloud"], score: 95 },
        api: { available: true, type: ["REST", "GraphQL", "Webhooks"], documentation: "Comprehensive", score: 100 },
      },
      operational: {
        dashboard: { available: true, details: "Real-time, customizable", score: 100 },
        reporting: { available: true, details: "Advanced analytics", score: 95 },
        automation: { available: true, details: "95% task automation", score: 95 },
        aiOps: { available: true, details: "Predictive, self-healing", score: 90 },
        multiTenancy: { available: true, details: "Full isolation", score: 100 },
        rbac: { available: true, details: "Granular permissions", score: 100 },
      },
      advanced: {
        pki: { available: true, details: "Built-in CA, SCEP", score: 90 },
        tacacs: { available: true, details: "TACACS+ support", score: 85 },
        conditionalAccess: { available: true, details: "Context-aware policies", score: 95 },
        deviceHealth: { available: true, details: "Posture assessment", score: 90 },
        containerSupport: { available: true, details: "Docker, K8s visibility", score: 85 },
      },
    },
    support: {
      tiers: [
        { name: "Standard", availability: "Business hours", responseTime: "4 hours", channels: ["Email", "Portal"] },
        {
          name: "Priority",
          availability: "Extended hours",
          responseTime: "1 hour",
          channels: ["Email", "Portal", "Phone"],
        },
        { name: "Premium", availability: "24/7", responseTime: "15 minutes", channels: ["All", "Dedicated TAM"] },
      ],
      languages: ["English", "Spanish", "German", "French", "Japanese"],
      resources: {
        documentation: "Comprehensive online docs",
        training: "Free online university",
        community: "Active user community",
        professionalServices: "Available globally",
      },
    },
    roi: {
      paybackPeriod: 6,
      yearlyBenefit: 850000,
      laborSavings: 1.9,
      incidentReduction: 0.85,
      complianceSavings: 200000,
      breachRiskReduction: 0.8,
      operationalEfficiency: 0.75,
      timeToValue: 7,
    },
    riskMetrics: {
      mttr: 5,
      mtbf: 8760,
      breachProbabilityReduction: 0.8,
      complianceViolationRisk: 1,
      securityPostureScore: 95,
      cyberInsuranceImpact: 25,
    },
    complianceSummary: {
      frameworks: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "GDPR", "NIST", "CMMC", "FedRAMP"],
      certifications: ["SOC 2 Type II", "ISO 27001", "ISO 27017", "ISO 27018", "CSA STAR"],
      automationLevel: 95,
      auditReadiness: 98,
      continuousCompliance: true,
    },
    competitiveAdvantages: [
      "Fastest deployment",
      "No hardware",
      "Lowest TCO",
      "Most integrations",
      "True cloud-native",
      "AI-powered automation",
      "Zero learning curve",
    ],
    customerMetrics: { nps: 72, csat: 4.8, retention: 0.96, expansionRate: 1.35, timeToDeploy: 4, adoptionRate: 0.95 },
    marketShare: "Leader", // Kept for compatibility
    scalability: { maxDevices: "Unlimited" }, // Kept for compatibility
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    type: "cloud-managed",
    category: "Cloud-Managed NAC",
    logo: "/meraki-logo.png",
    description: "Cloud-managed IT with integrated access control",
    marketPosition: "Strong Contender",
    yearFounded: 2006,
    headquarters: "San Francisco, USA",
    globalPresence: ["North America", "Europe", "APAC"],
    pricing: {
      model: "Hardware + Subscription",
      currency: "USD",
      billingOptions: ["Annual", "3-Year", "5-Year"],
      perDevice: { monthly: 15, annual: 150, triennial: 135, fiveYear: 120 }, // Including hardware amortization
      hardware: {
        MR46: { cost: 1395, capacity: "WiFi 6 AP", lifespan: 5, description: "WiFi 6 Access Point" },
        "MS250-48": { cost: 4795, capacity: "48-port switch", lifespan: 7, description: "48-port PoE Switch" },
        MX84: { cost: 2395, capacity: "Security appliance", lifespan: 5, description: "Security & SD-WAN Appliance" },
      },
      licenses: { enterprise: 150, advanced: 300 }, // per device per year
      professionalServices: { implementation: 25000, training: 5000, designServices: 15000 },
      additionalCosts: { implementation: 25000, training: 5000, support: 10000 },
      hiddenCosts: { networkRefresh: 50000, complexity: 15000, integration: 20000, total: 85000 },
    },
    implementation: {
      deploymentTime: { poc: 168, pilot: 720, fullDeployment: 2160 }, // hours
      deploymentModel: ["Cloud-Managed", "On-Premise Hardware"],
      requiredResources: { internal: 1.5, vendor: 0.5, training: 40, ongoing: 1.0 },
      complexity: "medium",
      prerequisites: ["Network refresh", "Meraki hardware", "Internet connectivity"],
    },
    infrastructure: {
      architecture: "Cloud-Managed Hardware",
      hosting: ["Meraki Cloud"],
      redundancy: "Hardware redundancy required",
      dataResidency: ["Limited options"],
      certifications: ["SOC 2", "ISO 27001"],
      scalability: {
        maxDevices: "10,000 per network",
        maxSites: "Unlimited networks",
        maxUsers: "Hardware dependent",
        performanceMetrics: {
          authenticationRate: "Hardware limited",
          concurrentSessions: "Hardware limited",
          apiRateLimit: "5 requests/second",
        },
      },
      reliability: { sla: 99.9, mttr: 240, rto: 480, rpo: 60, historicalUptime: 99.5 },
    },
    features: {
      /* Merged from EnhancedVendorData */
      core: {
        deviceVisibility: { available: true, details: "Basic visibility", score: 70 },
        deviceProfiling: { available: true, details: "Limited profiling", score: 65 },
        networkSegmentation: { available: true, details: "VLAN-based", score: 75 },
        accessControl: { available: true, details: "802.1X, MAB", score: 80 },
        guestManagement: { available: true, details: "Splash pages", score: 85 },
        byod: { available: true, details: "Systems Manager", score: 75 },
        agentless: { available: false, details: "Agent required for visibility", score: 40 },
        cloudNative: { available: false, details: "Cloud-managed hardware", score: 60 },
      },
      security: {
        zeroTrust: { available: false, details: "Traditional perimeter", score: 30 },
        threatDetection: { available: true, details: "Basic IDS/IPS", score: 60 },
        incidentResponse: { available: false, details: "Manual response", score: 40 },
        riskScoring: { available: false, details: "Not available", score: 20 },
        behavioralAnalytics: { available: false, details: "Limited", score: 30 },
        microsegmentation: { available: true, details: "Group policies", score: 60 },
        iotSecurity: { available: true, details: "MT sensors", score: 70 },
        lateralMovement: { available: true, details: "VLAN isolation", score: 65 },
      },
      compliance: {
        frameworksSupported: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS"],
        automationLevel: 40,
        reporting: { available: true, details: "Basic reports", score: 60 },
        auditTrail: { available: true, details: "Event log", score: 70 },
        policyTemplates: { available: false, details: "Manual setup", score: 30 },
        continuousCompliance: { available: false, details: "Periodic checks", score: 40 },
        evidenceCollection: { available: false, details: "Manual", score: 20 },
        automation: 40,
      },
      integration: {
        authProviders: { available: true, supported: ["AD", "RADIUS", "LDAP", "Google", "Azure AD"], score: 70 },
        siem: { available: true, supported: ["Syslog only"], score: 40 },
        itsm: { available: false, supported: [], score: 20 },
        mdm: { available: true, supported: ["Systems Manager"], score: 60 },
        firewall: { available: true, supported: ["Meraki MX"], score: 80 },
        cloud: { available: false, supported: [], score: 20 },
        api: { available: true, type: ["REST"], documentation: "Good", score: 70 },
      },
      operational: {
        dashboard: { available: true, details: "Meraki Dashboard", score: 85 },
        reporting: { available: true, details: "Basic analytics", score: 65 },
        automation: { available: false, details: "Limited automation", score: 30 },
        aiOps: { available: false, details: "Not available", score: 0 },
        multiTenancy: { available: true, details: "Organization-based", score: 80 },
        rbac: { available: true, details: "Role-based admin", score: 75 },
      },
      advanced: {
        pki: { available: false, details: "External PKI only", score: 30 },
        tacacs: { available: false, details: "Not supported", score: 0 },
        conditionalAccess: { available: false, details: "Basic policies", score: 40 },
        deviceHealth: { available: true, details: "Systems Manager", score: 60 },
        containerSupport: { available: false, details: "Not supported", score: 0 },
      },
    },
    support: {
      tiers: [
        { name: "Standard", availability: "Business hours", responseTime: "Next business day", channels: ["Portal"] },
        { name: "Advanced", availability: "24/7", responseTime: "4 hours", channels: ["Portal", "Phone"] },
      ],
      languages: ["English", "Japanese", "Spanish"],
      resources: {
        documentation: "Meraki documentation",
        training: "Paid training courses",
        community: "Meraki community",
        professionalServices: "Cisco partners",
      },
    },
    roi: {
      paybackPeriod: 24,
      yearlyBenefit: 200000,
      laborSavings: -0.5,
      incidentReduction: 0.5,
      complianceSavings: 50000,
      breachRiskReduction: 0.45,
      operationalEfficiency: 0.4,
      timeToValue: 90,
    },
    riskMetrics: {
      mttr: 240,
      mtbf: 4380,
      breachProbabilityReduction: 0.45,
      complianceViolationRisk: 6,
      securityPostureScore: 60,
      cyberInsuranceImpact: 5,
    },
    complianceSummary: {
      frameworks: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS"],
      certifications: ["SOC 2"],
      automationLevel: 40,
      auditReadiness: 60,
      continuousCompliance: false,
    },
    competitiveAdvantages: [
      "Integrated with Meraki ecosystem",
      "Simple dashboard interface",
      "Good for existing Meraki customers",
      "Reliable hardware",
    ],
    customerMetrics: {
      nps: 45,
      csat: 3.8,
      retention: 0.82,
      expansionRate: 1.1,
      timeToDeploy: 2160,
      adoptionRate: 0.75,
    },
    marketShare: "High (in Meraki ecosystem)",
    scalability: { maxDevices: "10,000 per network" },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    type: "on-premise",
    category: "Traditional Enterprise NAC",
    logo: "/cisco-logo.png",
    description: "Industry standard enterprise NAC with complex deployment",
    marketPosition: "Legacy Leader",
    yearFounded: 1984,
    headquarters: "San Jose, USA",
    globalPresence: ["Worldwide"],
    pricing: {
      model: "Perpetual + Subscription",
      currency: "USD",
      billingOptions: ["Perpetual", "Subscription"],
      licenses: { base: 25000, plus: 45000, apex: 65000, device: 85, subscription: 120 },
      hardware: {
        "SNS-3615-K9": { cost: 65000, capacity: "5,000 endpoints", lifespan: 5, description: "Small Appliance" },
        "SNS-3655-K9": { cost: 110000, capacity: "20,000 endpoints", lifespan: 5, description: "Medium Appliance" },
        "SNS-3695-K9": { cost: 175000, capacity: "50,000 endpoints", lifespan: 5, description: "Large Appliance" },
      },
      maintenance: 0.22,
      professionalServices: {
        implementation: 150000,
        training: 25000,
        healthCheck: 40000,
        upgrade: 60000,
        customization: 75000,
      },
      additionalCosts: { implementation: 150000, training: 25000, support: 50000 },
      hiddenCosts: { downtime: 100000, complexity: 80000, staffTraining: 50000, integration: 70000, total: 300000 },
    },
    implementation: {
      deploymentTime: { poc: 720, pilot: 2160, fullDeployment: 4320 }, // hours
      deploymentModel: ["On-Premise", "Virtual Appliance", "Private Cloud"],
      requiredResources: { internal: 3.0, vendor: 1.5, training: 80, ongoing: 2.5 },
      complexity: "very-high",
      prerequisites: ["Hardware sizing", "Network redesign", "Staff training", "Certificate infrastructure"],
    },
    infrastructure: {
      architecture: "Distributed with PSNs",
      hosting: ["On-premise data center"],
      redundancy: "Active-standby",
      dataResidency: ["Customer controlled"],
      certifications: ["Common Criteria", "FIPS 140-2"],
      scalability: {
        maxDevices: "500,000",
        maxSites: "Unlimited with PSNs",
        maxUsers: "2,000,000",
        performanceMetrics: {
          authenticationRate: "Depends on hardware",
          concurrentSessions: "Hardware limited",
          apiRateLimit: "Limited",
        },
      },
      reliability: { sla: 99.5, mttr: 360, rto: 720, rpo: 120, historicalUptime: 98.5 },
    },
    features: {
      /* Merged from EnhancedVendorData */
      core: {
        deviceVisibility: { available: true, details: "With profiler", score: 85 },
        deviceProfiling: { available: true, details: "Cisco profiler", score: 90 },
        networkSegmentation: { available: true, details: "TrustSec", score: 85 },
        accessControl: { available: true, details: "Full 802.1X", score: 95 },
        guestManagement: { available: true, details: "Guest portal", score: 80 },
        byod: { available: true, details: "BYOD portal", score: 75 },
        agentless: { available: false, details: "Agent recommended", score: 30 },
        cloudNative: { available: false, details: "On-premise only", score: 0 },
      },
      security: {
        zeroTrust: { available: false, details: "Traditional model", score: 40 },
        threatDetection: { available: true, details: "With pxGrid", score: 70 },
        incidentResponse: { available: true, details: "TC-NAC", score: 65 },
        riskScoring: { available: true, details: "Basic scoring", score: 60 },
        behavioralAnalytics: { available: false, details: "Limited", score: 40 },
        microsegmentation: { available: true, details: "TrustSec", score: 80 },
        iotSecurity: { available: true, details: "IoT classification", score: 70 },
        lateralMovement: { available: true, details: "SGT-based", score: 75 },
      },
      compliance: {
        frameworksSupported: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "NIST"],
        automationLevel: 50,
        reporting: { available: true, details: "Manual reports", score: 60 },
        auditTrail: { available: true, details: "Comprehensive logs", score: 85 },
        policyTemplates: { available: true, details: "Some templates", score: 65 },
        continuousCompliance: { available: false, details: "Periodic", score: 45 },
        evidenceCollection: { available: false, details: "Manual", score: 30 },
        automation: 50,
      },
      integration: {
        authProviders: { available: true, supported: ["AD", "LDAP", "RADIUS", "SAML", "RSA"], score: 85 },
        siem: { available: true, supported: ["pxGrid", "Syslog", "SNMP"], score: 80 },
        itsm: { available: true, supported: ["ServiceNow", "BMC"], score: 60 },
        mdm: { available: true, supported: ["AirWatch", "MobileIron", "Intune"], score: 70 },
        firewall: { available: true, supported: ["Cisco ASA", "FTD", "Firepower"], score: 90 },
        cloud: { available: false, supported: [], score: 20 },
        api: { available: true, type: ["REST", "pxGrid"], documentation: "Complex", score: 60 },
      },
      operational: {
        dashboard: { available: true, details: "Complex UI", score: 50 },
        reporting: { available: true, details: "Built-in reports", score: 65 },
        automation: { available: false, details: "Limited", score: 30 },
        aiOps: { available: false, details: "Not available", score: 0 },
        multiTenancy: { available: false, details: "Single tenant", score: 20 },
        rbac: { available: true, details: "Admin roles", score: 70 },
      },
      advanced: {
        pki: { available: true, details: "Built-in CA", score: 85 },
        tacacs: { available: true, details: "Full TACACS+", score: 95 },
        conditionalAccess: { available: true, details: "Policy sets", score: 75 },
        deviceHealth: { available: true, details: "Posture assessment", score: 80 },
        containerSupport: { available: false, details: "Not supported", score: 0 },
      },
    },
    support: {
      tiers: [
        { name: "8x5xNBD", availability: "Business hours", responseTime: "Next business day", channels: ["TAC"] },
        { name: "24x7x4", availability: "24/7", responseTime: "4 hours", channels: ["TAC", "Phone"] },
        { name: "24x7x2", availability: "24/7", responseTime: "2 hours", channels: ["TAC", "Phone", "On-site"] },
      ],
      languages: ["Multiple languages"],
      resources: {
        documentation: "Extensive but complex",
        training: "Cisco Learning",
        community: "Cisco Community",
        professionalServices: "Cisco Advanced Services",
      },
    },
    roi: {
      paybackPeriod: 36,
      yearlyBenefit: 150000,
      laborSavings: -2.0,
      incidentReduction: 0.6,
      complianceSavings: 75000,
      breachRiskReduction: 0.55,
      operationalEfficiency: 0.3,
      timeToValue: 180,
    },
    riskMetrics: {
      mttr: 360,
      mtbf: 2000,
      breachProbabilityReduction: 0.55,
      complianceViolationRisk: 7,
      securityPostureScore: 65,
      cyberInsuranceImpact: 0,
    },
    complianceSummary: {
      frameworks: ["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "NIST"],
      certifications: ["Common Criteria", "FIPS 140-2"],
      automationLevel: 50,
      auditReadiness: 70,
      continuousCompliance: false,
    },
    competitiveAdvantages: [
      "Industry standard",
      "Deep Cisco ecosystem integration",
      "Mature product",
      "Extensive features",
    ],
    customerMetrics: {
      nps: 25,
      csat: 3.2,
      retention: 0.75,
      expansionRate: 1.05,
      timeToDeploy: 4320,
      adoptionRate: 0.6,
    },
    marketShare: "High",
    scalability: { maxDevices: "500,000" },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    type: "on-premise",
    category: "Enterprise NAC",
    logo: "/aruba-logo.png",
    description: "HPE Aruba's network access control and policy management",
    marketPosition: "Challenger",
    yearFounded: 2002,
    headquarters: "Santa Clara, USA",
    globalPresence: ["Worldwide"],
    pricing: {
      model: "Perpetual + Support",
      currency: "USD",
      billingOptions: ["Perpetual", "Subscription"],
      licenses: { base: 50000, device: 60, subscription: 35 },
      hardware: {
        "CP-HW-5K": { cost: 28995, capacity: "5,000 endpoints", lifespan: 5, description: "Small Appliance" },
        "CP-HW-25K": { cost: 69995, capacity: "25,000 endpoints", lifespan: 5, description: "Medium Appliance" },
      },
      maintenance: 0.2,
      professionalServices: { implementation: 80000, training: 15000, quickStart: 25000, customization: 50000 },
      additionalCosts: { implementation: 80000, training: 15000, support: 30000 },
      hiddenCosts: { complexity: 50000, integration: 40000, upgrades: 30000, total: 120000 },
    },
    implementation: {
      deploymentTime: { poc: 480, pilot: 1440, fullDeployment: 2880 }, // hours
      deploymentModel: ["On-Premise", "Virtual", "Hardware Appliance"],
      requiredResources: { internal: 2.0, vendor: 1.0, training: 40, ongoing: 1.5 },
      complexity: "high",
      prerequisites: ["Hardware planning", "Network design", "Certificate setup"],
    },
    infrastructure: {
      architecture: "Clustered architecture",
      hosting: ["On-premise"],
      redundancy: "Active-active clustering",
      dataResidency: ["Customer controlled"],
      certifications: ["Common Criteria"],
      scalability: {
        maxDevices: "100,000",
        maxSites: "Multi-site capable",
        maxUsers: "250,000",
        performanceMetrics: {
          authenticationRate: "30,000/hour",
          concurrentSessions: "100,000",
          apiRateLimit: "Limited",
        },
      },
      reliability: { sla: 99.0, mttr: 240, rto: 480, rpo: 60, historicalUptime: 98.0 },
    },
    features: {
      /* Merged from EnhancedVendorData */
      core: {
        deviceVisibility: { available: true, details: "Device Insight", score: 80 },
        deviceProfiling: { available: true, details: "Profiling", score: 85 },
        networkSegmentation: { available: true, details: "Dynamic segmentation", score: 80 },
        accessControl: { available: true, details: "802.1X, MAC auth", score: 90 },
        guestManagement: { available: true, details: "Guest module", score: 85 },
        byod: { available: true, details: "OnBoard", score: 80 },
        agentless: { available: true, details: "Agentless available", score: 70 },
        cloudNative: { available: false, details: "On-premise", score: 0 },
      },
      security: {
        zeroTrust: { available: false, details: "Traditional NAC", score: 35 },
        threatDetection: { available: true, details: "IntroSpect integration", score: 65 },
        incidentResponse: { available: true, details: "Manual workflows", score: 55 },
        riskScoring: { available: true, details: "Device profiling", score: 60 },
        behavioralAnalytics: { available: false, details: "Limited", score: 35 },
        microsegmentation: { available: true, details: "Dynamic roles", score: 70 },
        iotSecurity: { available: true, details: "IoT profiling", score: 65 },
        lateralMovement: { available: true, details: "Role-based", score: 65 },
      },
      compliance: {
        frameworksSupported: ["ISO 27001", "HIPAA", "PCI DSS"],
        automationLevel: 35,
        reporting: { available: true, details: "Basic reports", score: 55 },
        auditTrail: { available: true, details: "Audit logs", score: 75 },
        policyTemplates: { available: false, details: "Manual creation", score: 25 },
        continuousCompliance: { available: false, details: "Not available", score: 20 },
        evidenceCollection: { available: false, details: "Manual", score: 20 },
        automation: 35,
      },
      integration: {
        authProviders: { available: true, supported: ["AD", "LDAP", "RADIUS"], score: 70 },
        siem: { available: true, supported: ["Syslog", "ArcSight"], score: 50 },
        itsm: { available: false, supported: [], score: 15 },
        mdm: { available: true, supported: ["AirWatch", "MobileIron"], score: 60 },
        firewall: { available: true, supported: ["Aruba", "Palo Alto"], score: 70 },
        cloud: { available: false, supported: [], score: 10 },
        api: { available: true, type: ["REST"], documentation: "Limited", score: 50 },
      },
      operational: {
        dashboard: { available: true, details: "ClearPass UI", score: 60 },
        reporting: { available: true, details: "Basic analytics", score: 55 },
        automation: { available: false, details: "Manual processes", score: 25 },
        aiOps: { available: false, details: "Not available", score: 0 },
        multiTenancy: { available: false, details: "Single tenant", score: 15 },
        rbac: { available: true, details: "Admin roles", score: 65 },
      },
      advanced: {
        pki: { available: true, details: "Onboard CA", score: 75 },
        tacacs: { available: true, details: "TACACS+ support", score: 80 },
        conditionalAccess: { available: true, details: "Policy engine", score: 70 },
        deviceHealth: { available: true, details: "OnGuard", score: 75 },
        containerSupport: { available: false, details: "Not supported", score: 0 },
      },
    },
    support: {
      tiers: [
        { name: "Foundation Care", availability: "Business hours", responseTime: "NBD", channels: ["Portal"] },
        { name: "24x7 Care", availability: "24/7", responseTime: "4 hours", channels: ["Phone", "Portal"] },
      ],
      languages: ["English", "Limited others"],
      resources: {
        documentation: "HPE documentation",
        training: "HPE Education",
        community: "Airheads Community",
        professionalServices: "HPE Services",
      },
    },
    roi: {
      paybackPeriod: 30,
      yearlyBenefit: 180000,
      laborSavings: -1.0,
      incidentReduction: 0.55,
      complianceSavings: 60000,
      breachRiskReduction: 0.5,
      operationalEfficiency: 0.35,
      timeToValue: 120,
    },
    riskMetrics: {
      mttr: 240,
      mtbf: 3000,
      breachProbabilityReduction: 0.5,
      complianceViolationRisk: 8,
      securityPostureScore: 60,
      cyberInsuranceImpact: -5,
    },
    complianceSummary: {
      frameworks: ["ISO 27001", "HIPAA", "PCI DSS"],
      certifications: ["Common Criteria"],
      automationLevel: 35,
      auditReadiness: 65,
      continuousCompliance: false,
    },
    competitiveAdvantages: [
      "Good for Aruba wireless",
      "Established product",
      "Hardware appliance option",
      "TACACS+ support",
    ],
    customerMetrics: {
      nps: 35,
      csat: 3.5,
      retention: 0.78,
      expansionRate: 1.08,
      timeToDeploy: 2880,
      adoptionRate: 0.65,
    },
    marketShare: "Medium",
    scalability: { maxDevices: "100,000" },
  },
  // ... Other vendors from previous data, adapted to new structure
  forescout: {
    id: "forescout",
    name: "Forescout eyeSight",
    type: "on-premise",
    category: "Agentless NAC",
    logo: "/forescout-logo.png",
    description: "Agentless device visibility and control platform",
    pricing: {
      model: "Subscription",
      tiers: [
        { name: "eyeSight", pricePerDevice: 13 },
        { name: "eyeControl", pricePerDevice: 25 },
        { name: "eyeExtend", pricePerDevice: 37 },
      ],
      hardware: {
        physical_small: { cost: 25000, description: "Small Appliance" },
        physical_medium: { cost: 55000, description: "Medium Appliance" },
      },
      professionalServices: { standard: 80000 },
      hiddenCosts: { complexity: 30000, total: 30000 },
    },
    implementation: {
      deploymentTime: { fullDeployment: 90 * 24 }, // days to hours
      requiredResources: { internal: 2.5, vendor: 1.0, training: 32 },
      complexity: "high",
    },
    features: {
      core: { agentless: true, deploymentModel: "On-Premise/Virtual Appliance", hardwareRequired: true },
      security: { zeroTrust: { score: 50 } },
      compliance: { automation: 20 },
    },
    roi: { paybackPeriod: 15, laborSavings: -1.5, incidentReduction: 0.6, breachRiskReduction: 0.5 },
    marketShare: "Medium",
    scalability: { maxDevices: "Medium" },
  },
  extreme: {
    id: "extreme",
    name: "ExtremeControl",
    type: "hybrid",
    category: "Enterprise NAC",
    logo: "/extreme-logo.png",
    description: "Policy-based NAC for wired and wireless networks.",
    pricing: {
      model: "Subscription + Hardware",
      perDevice: { monthly: 10 },
      hardware: { controller: { cost: 15000, description: "Controller Hardware" } },
      professionalServices: { standard: 30000 },
    },
    implementation: {
      deploymentTime: { fullDeployment: 60 * 24 },
      requiredResources: { internal: 2.0, training: 24 },
      complexity: "medium",
    },
    features: { core: { deploymentModel: "Hybrid" } },
    roi: { paybackPeriod: 20, breachRiskReduction: 0.55 },
    marketShare: "Low",
    scalability: { maxDevices: "Medium" },
  },
  arista: {
    id: "arista",
    name: "Arista CUE",
    type: "cloud-native",
    category: "Cloud-Managed NAC",
    logo: "/arista-logo.png",
    description: "Cloud-managed network services including NAC.",
    pricing: { model: "SaaS Subscription", perDevice: { monthly: 7 }, professionalServices: { implementation: 10000 } },
    implementation: {
      deploymentTime: { fullDeployment: 30 * 24 },
      requiredResources: { internal: 1.0, training: 16 },
      complexity: "medium",
    },
    features: { core: { cloudNative: true, deploymentModel: "Cloud SaaS" } },
    roi: { paybackPeriod: 12, breachRiskReduction: 0.7 },
    marketShare: "Low",
    scalability: { maxDevices: "High" },
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    type: "cloud-native",
    category: "AI-Driven NAC",
    logo: "/juniper-logo.png",
    description: "AI-driven cloud NAC for modern enterprises.",
    pricing: { model: "SaaS Subscription", perDevice: { monthly: 8 }, professionalServices: { implementation: 12000 } },
    implementation: {
      deploymentTime: { fullDeployment: 20 * 24 },
      requiredResources: { internal: 0.5, training: 8 },
      complexity: "low",
    },
    features: { core: { cloudNative: true, aiPowered: true, deploymentModel: "Cloud SaaS" } },
    roi: { paybackPeriod: 10, breachRiskReduction: 0.75 },
    marketShare: "Emerging",
    scalability: { maxDevices: "High" },
  },
  fortinet: {
    id: "fortinet",
    name: "FortiNAC",
    type: "on-premise",
    category: "Security Fabric NAC",
    logo: "/fortinet-logo.png",
    description: "Network access control integrated with Fortinet Security Fabric.",
    pricing: {
      model: "Perpetual + Subscription",
      licenses: { device: 60 },
      hardware: { appliance: { cost: 20000, description: "Appliance Hardware" } },
      professionalServices: { standard: 40000 },
    },
    implementation: {
      deploymentTime: { fullDeployment: 90 * 24 },
      requiredResources: { internal: 2.5, training: 32 },
      complexity: "high",
    },
    features: { core: { deploymentModel: "On-Premise Appliance" } },
    roi: { paybackPeriod: 22, breachRiskReduction: 0.6 },
    marketShare: "Medium",
    scalability: { maxDevices: "Medium" },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft Intune/NPS",
    type: "hybrid",
    category: "MDM/Endpoint NAC",
    logo: "/microsoft-logo.png",
    description: "Leverages Intune for MDM and NPS for network policy.",
    pricing: {
      model: "Subscription (Part of M365)",
      perUser: { monthly: 5 },
      professionalServices: { implementation: 25000 },
    },
    implementation: {
      deploymentTime: { fullDeployment: 45 * 24 },
      requiredResources: { internal: 1.5, training: 20 },
      complexity: "medium",
    },
    features: { core: { deploymentModel: "Hybrid" } },
    roi: { paybackPeriod: 18, breachRiskReduction: 0.5 },
    marketShare: "High (as part of M365)",
    scalability: { maxDevices: "High (with Azure)" },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    type: "open-source",
    category: "Open Source NAC",
    logo: "/packetfence-logo.png",
    description: "Open source NAC solution requiring extensive customization",
    pricing: {
      model: "Open Source + Support",
      licenses: { base: 0 },
      professionalServices: { implementation: 95000 },
      additionalCosts: { support: 25000 },
    },
    implementation: {
      deploymentTime: { fullDeployment: 120 * 24 },
      requiredResources: { internal: 4.0 },
      complexity: "very-high",
    },
    features: {
      core: { customizable: true, complexSetup: true, requiresExpertise: true, deploymentModel: "Self-Hosted" },
    },
    roi: { paybackPeriod: 30, breachRiskReduction: 0.4 },
    marketShare: "Low",
    scalability: { maxDevices: "Varies" },
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    type: "cloud-radius",
    category: "Cloud RADIUS",
    logo: "/foxpass-logo.png",
    description: "Simple cloud-hosted RADIUS for basic authentication",
    pricing: { model: "SaaS Subscription", perUser: { monthly: 1.5 } },
    implementation: {
      deploymentTime: { fullDeployment: 3 * 24 },
      requiredResources: { internal: 0.25 },
      complexity: "low",
    },
    features: {
      core: {
        radiusServer: true,
        ldapSync: true,
        basicAuth: true,
        limitedNAC: true,
        noDeviceProfiling: true,
        noRiskAssessment: true,
        noCompliance: true,
        deploymentModel: "Cloud SaaS",
      },
    },
    roi: { paybackPeriod: 6, breachRiskReduction: 0.3 },
    marketShare: "Low",
    scalability: { maxDevices: "Medium" },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    type: "cloud-radius",
    category: "Cloud PKI & RADIUS",
    logo: "/securew2-logo.png",
    description: "Cloud-based PKI and RADIUS for certificate-based authentication.",
    pricing: { model: "SaaS Subscription", perUser: { monthly: 2.5 }, professionalServices: { implementation: 5000 } },
    implementation: {
      deploymentTime: { fullDeployment: 7 * 24 },
      requiredResources: { internal: 0.5, training: 8 },
      complexity: "low",
    },
    features: { core: { pki: true, cloudRadius: true, deploymentModel: "Cloud SaaS" } },
    roi: { paybackPeriod: 9, breachRiskReduction: 0.45 },
    marketShare: "Low",
    scalability: { maxDevices: "Medium" },
  },
  radiusaas: {
    id: "radiusaas",
    name: "RADIUS-as-a-Service",
    type: "cloud-radius",
    category: "Managed RADIUS",
    logo: "/radiusaas-logo.png",
    description: "Managed RADIUS service for various authentication needs.",
    pricing: { model: "SaaS Subscription", perUser: { monthly: 1.0 }, professionalServices: { implementation: 2000 } },
    implementation: {
      deploymentTime: { fullDeployment: 5 * 24 },
      requiredResources: { internal: 0.2, training: 4 },
      complexity: "low",
    },
    features: { core: { managedRadius: true, deploymentModel: "Cloud SaaS" } },
    roi: { paybackPeriod: 5, breachRiskReduction: 0.25 },
    marketShare: "Niche",
    scalability: { maxDevices: "Medium" },
  },
}

export const getVendorLogoPath = (vendorId: string): string => {
  return AllVendorData[vendorId]?.logo || "/placeholder-p42b6.png" // Ensure placeholder exists
}
