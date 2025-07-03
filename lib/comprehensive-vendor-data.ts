export interface VendorPricingTier {
  name: string
  listPrice: number | string
  streetPrice?: string
  features: string[]
  unit: "endpoint" | "user" | "device" | "admin" | "port" | "AP"
  period: "year" | "month"
}

export interface VendorHardware {
  name: string
  listPrice: number
  streetPrice?: string
  capacity: string
  useCase: string
}

export interface VendorService {
  name: string
  cost: number | string
  description?: string
}

export interface VendorIntegration {
  name: string
  cost: number | string
  complexity?: "low" | "medium" | "high"
}

export interface VendorFeatureSupport {
  [key: string]: "✓✓✓" | "✓✓" | "✓" | "✗" | string
}

export interface VendorDetails {
  id: string
  name: string
  description: string
  category: "enterprise" | "mid-market" | "sme" | "cloud-native" | "open-source"
  marketPosition: "leader" | "challenger" | "visionary" | "niche"
  licensing: {
    base: VendorPricingTier[]
    modules: VendorPricingTier[]
    tacacs?: VendorPricingTier[]
  }
  hardware: {
    physical: VendorHardware[]
    virtual: VendorHardware[]
    cloud?: VendorHardware[]
  }
  highAvailability: {
    licensing: string
    cost: string
    failoverTime: string
  }
  integrations: {
    identity: VendorIntegration[]
    mdm: VendorIntegration[]
    siem: VendorIntegration[]
    security: VendorIntegration[]
  }
  featureSupport: {
    authentication: VendorFeatureSupport
    network: VendorFeatureSupport
    advanced: VendorFeatureSupport
    compliance: VendorFeatureSupport
  }
  professionalServices: {
    vendor: VendorService[]
    partner: VendorService[]
    training: VendorService[]
  }
  hiddenCosts: {
    licensingGotchas: string[]
    performanceLimitations: string[]
    operationalOverhead: string[]
    commonExpenses: VendorService[]
  }
  tcoFactors: {
    fteRequirement: number
    downtimeRisk: "low" | "medium" | "high"
    upgradeComplexity: "low" | "medium" | "high"
  }
}

export interface VendorData {
  id: string
  name: string
  category: string
  deploymentModel: string
  pricing: {
    model: "subscription" | "perpetual" | "hybrid"
    basePrice: number
    minimumDevices: number
    volumeDiscounts: Array<{
      min: number
      max: number
      discount: number
    }>
    includedFeatures: string[]
    additionalCosts: string[]
    hiddenCosts: string
  }
  costs: {
    hardware: number
    software: number
    implementation: number
    training: number
    support: number
    maintenance: number
    infrastructure: number
    personnelPerYear: number
    downtimePerYear: number
    patchingPerYear: number
    upgradesCycle: number
    energyCosts: number
    rackSpace: number
    networkBandwidth: number
    backupStorage: number
    disasterRecovery: number
  }
  metrics: {
    deploymentTime: number
    timeToValue: number
    fteRequired: number
    mttr: number
    availability: number
    scalability: string
    performanceImpact: string
    userSatisfaction: number
    npsScore: number
    supportResponseTime: number
    updateFrequency: string
    patchingEffort: string
    integrationEffort: string
  }
  security: {
    zeroTrustScore: number
    deviceAuthMethods: number
    riskAssessmentReal: boolean
    automatedRemediation: boolean
    threatIntelligence: boolean
    behavioralAnalytics: boolean
    microsegmentation: boolean
    encryptionStandards: string[]
    certifications: string[]
    vulnerabilityManagement: string
    incidentResponse: string
    forensicsCapability: boolean
    dlpIntegration: boolean
  }
  compliance: {
    frameworks: Record<string, { coverage: number; controls: number }>
    reportingCapabilities: string
    auditTrail: string
    dataResidency: string
    dataRetention: string
  }
  features: {
    deviceVisibility: boolean
    deviceProfiling: boolean
    networkAccessControl: boolean
    guestAccess: boolean
    byod: boolean
    iotSupport: boolean
    conditionalAccess: boolean
    applicationControl: boolean
    pkiServices: boolean
    cloudRadius: boolean
    tacacs: boolean
    samlIntegration: boolean
    mfaSupport: boolean
    centralizedManagement: boolean
    multiTenancy: boolean
    roleBasedAccess: boolean
    apiAvailable: boolean
    customIntegrations: boolean
    automatedOnboarding: boolean
    selfServicePortal: boolean
    automatedCompliance: boolean
    workflowAutomation: boolean
  }
  riskReduction: {
    breachProbabilityReduction: number
    dataExfiltrationPrevention: number
    lateralMovementPrevention: number
    unauthorizedAccessPrevention: number
    malwareSpreadPrevention: number
    insiderThreatMitigation: number
    complianceViolationReduction: number
    shadowITDiscovery: number
    avgBreachCostReduction: number
    insurancePremiumReduction: number
    compliancePenaltyAvoidance: number
    operationalLossReduction: number
  }
}

// Legacy database for backward compatibility
export const ComprehensiveVendorDatabase: Record<string, VendorDetails> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    description: "AI-powered cloud-native NAC delivering zero-trust security with unmatched simplicity.",
    category: "cloud-native",
    marketPosition: "visionary",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 20, unit: "device", period: "year", features: ["Basic NAC", "Cloud RADIUS"] },
        {
          name: "Professional",
          listPrice: 30,
          features: ["Advanced NAC", "Risk Scoring"],
          unit: "device",
          period: "year",
        },
        { name: "Enterprise", listPrice: 40, features: ["Full platform, all modules"], unit: "device", period: "year" },
      ],
      modules: [
        { name: "Risk Analytics", listPrice: 10, features: ["ML-based risk scoring"], unit: "device", period: "year" },
        {
          name: "Privileged Access",
          listPrice: 1000,
          features: ["Password vault", "Session recording"],
          unit: "user",
          period: "year",
        },
      ],
      tacacs: [
        {
          name: "TACACS+ as a Service",
          listPrice: 2000,
          features: ["Unlimited devices"],
          unit: "admin",
          period: "year",
        },
      ],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Cloud Platform", listPrice: 0, capacity: "Elastic", useCase: "No hardware required" }],
    },
    highAvailability: {
      licensing: "Included in subscription",
      cost: "0",
      failoverTime: "Automatic (< 30s)",
    },
    integrations: {
      identity: [
        { name: "Azure AD", cost: 0 },
        { name: "Okta", cost: 0 },
        { name: "Google", cost: 0 },
      ],
      mdm: [
        { name: "Intune", cost: 0 },
        { name: "JAMF", cost: 0 },
        { name: "Workspace ONE", cost: 0 },
      ],
      siem: [
        { name: "Splunk", cost: 0 },
        { name: "Sentinel", cost: 0 },
        { name: "QRadar", cost: 0 },
      ],
      security: [
        { name: "CrowdStrike", cost: 0 },
        { name: "Microsoft Defender", cost: 0 },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓✓",
        "TACACS+": "✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓✓",
        OT: "✓",
        Guest: "✓✓",
        Mobile: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓✓",
        "AI/ML": "✓✓✓",
        "Cloud Native": "✓✓✓",
        "HA/DR": "✓✓✓",
        API: "✓✓✓",
        Automation: "✓✓✓",
      },
      compliance: { "PCI DSS": "✓✓✓", HIPAA: "✓✓✓", SOC2: "✓✓✓", "ISO 27001": "✓✓✓", GDPR: "✓✓✓", Posture: "✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: "5000-10000" },
        { name: "Advanced Config", cost: "10000-20000" },
      ],
      partner: [],
      training: [
        { name: "Online Training", cost: 0 },
        { name: "Certification", cost: 500 },
      ],
    },
    hiddenCosts: {
      licensingGotchas: ["User-based modules can add up", "No perpetual option"],
      performanceLimitations: ["Internet dependency for management plane"],
      operationalOverhead: ["Requires stable internet connection"],
      commonExpenses: [{ name: "Internet Redundancy", cost: "3000-6000" }],
    },
    tcoFactors: { fteRequirement: 0.25, downtimeRisk: "low", upgradeComplexity: "low" },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    description: "Industry-leading identity services engine with comprehensive policy management.",
    category: "enterprise",
    marketPosition: "leader",
    licensing: {
      base: [
        {
          name: "Essentials",
          listPrice: 60,
          streetPrice: "45-55",
          features: ["Basic 802.1X", "MAB"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Advantage",
          listPrice: 120,
          streetPrice: "90-110",
          features: ["Profiling", "BYOD"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Premier",
          listPrice: 200,
          streetPrice: "150-175",
          features: ["TACACS+", "pxGrid"],
          unit: "endpoint",
          period: "year",
        },
      ],
      modules: [
        { name: "AnyConnect Posture", listPrice: 10, features: [], unit: "endpoint", period: "year" },
        { name: "Compliance Module", listPrice: 15, features: [], unit: "endpoint", period: "year" },
      ],
      tacacs: [{ name: "Standalone TACACS+", listPrice: 20, features: [], unit: "device", period: "year" }],
    },
    hardware: {
      physical: [
        {
          name: "SNS-3615",
          listPrice: 25000,
          streetPrice: "20000-22000",
          capacity: "5,000 endpoints",
          useCase: "Small deployments",
        },
        {
          name: "SNS-3655",
          listPrice: 75000,
          streetPrice: "60000-65000",
          capacity: "15,000 endpoints",
          useCase: "Medium deployments",
        },
        {
          name: "SNS-3695",
          listPrice: 150000,
          streetPrice: "120000-130000",
          capacity: "30,000 endpoints",
          useCase: "Large deployments",
        },
      ],
      virtual: [
        { name: "ISE-VM-K9 (Small)", listPrice: 10000, capacity: "5,000 endpoints", useCase: "16 vCPU, 16GB RAM" },
        { name: "ISE-VM-K9 (Medium)", listPrice: 20000, capacity: "15,000 endpoints", useCase: "16 vCPU, 64GB RAM" },
        { name: "ISE-VM-K9 (Large)", listPrice: 35000, capacity: "50,000 endpoints", useCase: "32 vCPU, 256GB RAM" },
      ],
    },
    highAvailability: {
      licensing: "Secondary nodes require full licenses",
      cost: "2x base licensing minimum",
      failoverTime: "< 60 seconds",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: "20000-40000" }],
      mdm: [
        { name: "Workspace ONE", cost: "30000-50000" },
        { name: "Microsoft Intune", cost: "35000-55000" },
      ],
      siem: [
        { name: "Splunk App for ISE", cost: "20000-40000" },
        { name: "QRadar DSM", cost: "25000-40000" },
      ],
      security: [
        { name: "Palo Alto via pxGrid", cost: "40000-60000" },
        { name: "CrowdStrike via pxGrid", cost: "30000-45000" },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓✓",
        "SAML 2.0": "✓✓",
        "OAuth 2.0": "✓",
        "TACACS+": "✓✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓",
        OT: "✓✓",
        Guest: "✓✓✓",
        Mobile: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓",
        "AI/ML": "✓✓",
        "Cloud Native": "✗",
        "HA/DR": "✓✓✓",
        API: "✓✓✓",
        Automation: "✓✓",
      },
      compliance: { "PCI DSS": "✓✓✓", HIPAA: "✓✓✓", SOC2: "✓✓✓", "ISO 27001": "✓✓✓", GDPR: "✓✓✓", Posture: "✓✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: 35000 },
        { name: "Advanced Implementation", cost: 100000 },
        { name: "Migration", cost: "75000-200000" },
      ],
      partner: [{ name: "Daily Rate", cost: "2500-4000" }],
      training: [{ name: "SISE Course", cost: 4995 }],
    },
    hiddenCosts: {
      licensingGotchas: [
        "VM moves require re-hosting",
        "License expiry stops authentication",
        "Perpetual licenses discontinued",
      ],
      performanceLimitations: [
        "250 policy sets maximum",
        "600 authorization rules per set",
        "API rate limits: 20 calls/second",
      ],
      operationalOverhead: ["Patch frequency: Monthly", "Upgrade complexity: Very high", "Change windows: 4-8 hours"],
      commonExpenses: [
        { name: "Certificate Renewals", cost: "7500-20000" },
        { name: "Load Balancer for PSNs", cost: "35000-60000" },
        { name: "Dedicated Backup Infrastructure", cost: "40000-75000" },
      ],
    },
    tcoFactors: { fteRequirement: 2.5, downtimeRisk: "medium", upgradeComplexity: "high" },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    description: "Cloud-based PKI and RADIUS platform for passwordless Wi-Fi and network authentication.",
    category: "cloud-native",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 25, unit: "user", period: "year", features: ["Cloud RADIUS", "Basic PKI"] },
        {
          name: "Professional",
          listPrice: 40,
          unit: "user",
          period: "year",
          features: ["PKI", "Onboarding", "JoinNow"],
        },
        {
          name: "Enterprise",
          listPrice: 60,
          unit: "user",
          period: "year",
          features: ["Advanced Integrations", "Custom Branding"],
        },
      ],
      modules: [
        {
          name: "Certificate Manager",
          listPrice: 8,
          features: ["Advanced Certificate Management"],
          unit: "user",
          period: "year",
        },
        { name: "Cloud RADIUS+", listPrice: 10, features: ["Enhanced RADIUS Features"], unit: "user", period: "year" },
      ],
      tacacs: [],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Cloud Platform", listPrice: 0, capacity: "Elastic", useCase: "No hardware required" }],
    },
    highAvailability: {
      licensing: "Included in cloud subscription",
      cost: "0",
      failoverTime: "Automatic (< 15s)",
    },
    integrations: {
      identity: [
        { name: "Azure AD", cost: 0 },
        { name: "Google Workspace", cost: 0 },
        { name: "Okta", cost: 0 },
        { name: "Active Directory", cost: 0 },
      ],
      mdm: [
        { name: "Intune", cost: 0 },
        { name: "JAMF", cost: 0 },
        { name: "Workspace ONE", cost: 0 },
      ],
      siem: [
        { name: "Splunk", cost: 0 },
        { name: "Syslog forwarding", cost: 0 },
      ],
      security: [
        { name: "CrowdStrike", cost: 0 },
        { name: "SentinelOne", cost: 0 },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓",
        "Web Auth": "✗",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓",
        "TACACS+": "✗",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓",
        Wireless: "✓✓",
        VPN: "✓✓",
        BYOD: "✓",
        IoT: "✓",
        OT: "✗",
        Guest: "✓",
        Mobile: "✓✓",
      },
      advanced: {
        "Zero Trust": "✓",
        "AI/ML": "✗",
        "Cloud Native": "✓✓✓",
        "HA/DR": "✓✓",
        API: "✓✓",
        Automation: "✓",
      },
      compliance: {
        "PCI DSS": "✓",
        HIPAA: "✓",
        SOC2: "✓✓✓",
        "ISO 27001": "✓",
        GDPR: "✓",
        Posture: "✗",
      },
    },
    professionalServices: {
      vendor: [
        { name: "Setup Assistance", cost: "1000-3000" },
        { name: "Migration Support", cost: "2500-7500" },
      ],
      partner: [],
      training: [
        { name: "Documentation", cost: 0 },
        { name: "Video Tutorials", cost: 0 },
      ],
    },
    hiddenCosts: {
      licensingGotchas: ["Per-user pricing can scale quickly", "Limited feature set compared to full NAC"],
      performanceLimitations: ["Basic RADIUS functionality only", "No advanced policy engine"],
      operationalOverhead: ["Limited customization options", "Basic reporting"],
      commonExpenses: [{ name: "Additional API calls", cost: "500-2000" }],
    },
    tcoFactors: { fteRequirement: 0.5, downtimeRisk: "low", upgradeComplexity: "low" },
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    description: "Cloud RADIUS and LDAP service for simplified network authentication.",
    category: "cloud-native",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Starter", listPrice: 12, unit: "user", period: "year", features: ["Cloud RADIUS", "LDAP"] },
        { name: "Professional", listPrice: 20, unit: "user", period: "year", features: ["Advanced Auth", "API"] },
        { name: "Enterprise", listPrice: 35, unit: "user", period: "year", features: ["Custom Features", "Support"] },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Cloud Platform", listPrice: 0, capacity: "Elastic", useCase: "No hardware required" }],
    },
    highAvailability: {
      licensing: "Included in subscription",
      cost: "0",
      failoverTime: "Automatic (< 30s)",
    },
    integrations: {
      identity: [
        { name: "Google Workspace", cost: 0 },
        { name: "Azure AD", cost: 0 },
        { name: "Okta", cost: 0 },
      ],
      mdm: [],
      siem: [],
      security: [],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        MAB: "✓",
        "Web Auth": "✗",
        "SAML 2.0": "✓",
        "OAuth 2.0": "✓",
        "TACACS+": "✗",
        "Cert-Based": "✓",
      },
      network: {
        Wired: "✓✓",
        Wireless: "✓✓",
        VPN: "✓",
        BYOD: "✓",
        IoT: "✗",
        OT: "✗",
        Guest: "✗",
        Mobile: "✓",
      },
      advanced: {
        "Zero Trust": "✗",
        "AI/ML": "✗",
        "Cloud Native": "✓✓✓",
        "HA/DR": "✓",
        API: "✓✓",
        Automation: "✓",
      },
      compliance: {
        "PCI DSS": "✓",
        HIPAA: "✓",
        SOC2: "✓",
        "ISO 27001": "✓",
        GDPR: "✓",
        Posture: "✗",
      },
    },
    professionalServices: {
      vendor: [{ name: "Setup Support", cost: "1000-2500" }],
      partner: [],
      training: [{ name: "Documentation", cost: 0 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Limited enterprise features", "Basic functionality only"],
      performanceLimitations: ["No advanced NAC features", "Limited policy engine"],
      operationalOverhead: ["Manual configuration required"],
      commonExpenses: [],
    },
    tcoFactors: { fteRequirement: 0.3, downtimeRisk: "low", upgradeComplexity: "low" },
  },
  pulse: {
    id: "pulse",
    name: "Pulse Secure",
    description: "Comprehensive secure access solution with NAC capabilities integrated into VPN and ZTNA platform.",
    category: "enterprise",
    marketPosition: "challenger",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 50, unit: "user", period: "year", features: ["Basic NAC", "VPN Access"] },
        {
          name: "Professional",
          listPrice: 75,
          unit: "user",
          period: "year",
          features: ["Advanced NAC", "ZTNA", "Policy Engine"],
        },
        {
          name: "Enterprise",
          listPrice: 90,
          unit: "user",
          period: "year",
          features: ["Full Platform", "Advanced Analytics", "Compliance"],
        },
      ],
      modules: [
        {
          name: "Advanced Threat Protection",
          listPrice: 20,
          features: ["Threat Detection", "Sandboxing"],
          unit: "user",
          period: "year",
        },
        {
          name: "Compliance Module",
          listPrice: 15,
          features: ["Compliance Reporting", "Audit Trails"],
          unit: "user",
          period: "year",
        },
      ],
      tacacs: [
        { name: "TACACS+ Module", listPrice: 2500, features: ["Device Administration"], unit: "admin", period: "year" },
      ],
    },
    hardware: {
      physical: [
        { name: "PSA-V2000", listPrice: 30000, capacity: "2,000 users", useCase: "Small to medium deployments" },
        { name: "PSA-V5000", listPrice: 75000, capacity: "5,000 users", useCase: "Medium to large deployments" },
        { name: "PSA-V10000", listPrice: 150000, capacity: "10,000 users", useCase: "Large enterprise deployments" },
      ],
      virtual: [
        { name: "PSA-VM-2K", listPrice: 25000, capacity: "2,000 users", useCase: "Virtual deployment" },
        { name: "PSA-VM-5K", listPrice: 60000, capacity: "5,000 users", useCase: "Virtual deployment" },
        { name: "PSA-VM-10K", listPrice: 110000, capacity: "10,000 users", useCase: "Virtual deployment" },
      ],
      cloud: [{ name: "Pulse Cloud", listPrice: 0, capacity: "Elastic", useCase: "Cloud-hosted service" }],
    },
    highAvailability: {
      licensing: "Requires clustering license",
      cost: "1.5x base licensing",
      failoverTime: "< 45 seconds",
    },
    integrations: {
      identity: [
        { name: "Azure AD", cost: 7500 },
        { name: "Okta", cost: 10000 },
        { name: "Active Directory", cost: 0 },
        { name: "SAML IdPs", cost: 3000 },
      ],
      mdm: [
        { name: "Intune", cost: 7500 },
        { name: "JAMF", cost: 10000 },
        { name: "Workspace ONE", cost: 12500 },
      ],
      siem: [
        { name: "Splunk", cost: 15000 },
        { name: "QRadar", cost: 20000 },
        { name: "Sentinel", cost: 10000 },
      ],
      security: [
        { name: "CrowdStrike", cost: 12500 },
        { name: "SentinelOne", cost: 15000 },
        { name: "Palo Alto", cost: 20000 },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓",
        "Web Auth": "✓✓✓",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓",
        "TACACS+": "✓✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓",
        OT: "✓",
        Guest: "✓✓✓",
        Mobile: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓✓",
        "AI/ML": "✓✓",
        "Cloud Native": "✓✓",
        "HA/DR": "✓✓✓",
        API: "✓✓✓",
        Automation: "✓✓",
      },
      compliance: {
        "PCI DSS": "✓✓✓",
        HIPAA: "✓✓✓",
        SOC2: "✓✓",
        "ISO 27001": "✓✓✓",
        GDPR: "✓✓",
        Posture: "✓✓✓",
      },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: "25000-40000" },
        { name: "Advanced Implementation", cost: "60000-120000" },
        { name: "Migration Services", cost: "40000-90000" },
      ],
      partner: [{ name: "Partner Daily Rate", cost: "2000-3000" }],
      training: [
        { name: "Administrator Training", cost: 4000 },
        { name: "Advanced Configuration", cost: 6000 },
      ],
    },
    hiddenCosts: {
      licensingGotchas: [
        "User-based licensing can be expensive",
        "VPN and NAC licenses are separate",
        "Clustering requires additional licenses",
      ],
      performanceLimitations: ["Performance depends on hardware sizing", "Concurrent user limits"],
      operationalOverhead: ["Complex configuration", "Requires VPN expertise", "Regular certificate management"],
      commonExpenses: [
        { name: "SSL Certificates", cost: "4000-10000" },
        { name: "Load Balancer", cost: "30000-50000" },
        { name: "Backup Infrastructure", cost: "20000-40000" },
      ],
    },
    tcoFactors: { fteRequirement: 2.0, downtimeRisk: "medium", upgradeComplexity: "medium" },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    description: "Policy management platform with strong wireless integration and user experience focus.",
    category: "enterprise",
    marketPosition: "challenger",
    licensing: {
      base: [
        {
          name: "Essentials",
          listPrice: 30,
          features: ["Base license for 5k endpoints"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Professional",
          listPrice: 50,
          features: ["Full platform access"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Enterprise",
          listPrice: 65,
          features: ["Full platform access, OnGuard, OnConnect"],
          unit: "endpoint",
          period: "year",
        },
      ],
      modules: [
        { name: "OnGuard", listPrice: 12, features: ["Posture Compliance"], unit: "endpoint", period: "year" },
        { name: "OnConnect", listPrice: 15, features: ["Secure Connector"], unit: "device", period: "year" },
        { name: "Guest", listPrice: 5, features: ["Guest Management"], unit: "user", period: "year" },
      ],
      tacacs: [],
    },
    hardware: {
      physical: [
        {
          name: "C2010",
          listPrice: 30000,
          streetPrice: "25000-27000",
          capacity: "5,000 endpoints",
          useCase: "Medium sites",
        },
        {
          name: "C3010",
          listPrice: 60000,
          streetPrice: "50000-55000",
          capacity: "25,000 endpoints",
          useCase: "Large sites",
        },
      ],
      virtual: [
        { name: "CX-5K", listPrice: 30000, capacity: "5,000 endpoints", useCase: "Virtual Appliance" },
        { name: "CX-25K", listPrice: 60000, capacity: "25,000 endpoints", useCase: "Virtual Appliance" },
      ],
    },
    highAvailability: {
      licensing: "Publisher/Subscriber licenses at full price",
      cost: "2x base licensing",
      failoverTime: "< 30 seconds",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: 0, complexity: "low" }],
      mdm: [
        { name: "Intune", cost: 0, complexity: "low" },
        { name: "JAMF", cost: 7500, complexity: "medium" },
      ],
      siem: [
        { name: "Splunk App", cost: 12500 },
        { name: "QRadar DSM", cost: 17500 },
      ],
      security: [],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓✓",
        "SAML 2.0": "✓✓",
        "OAuth 2.0": "✓",
        "TACACS+": "✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓",
        OT: "✓",
        Guest: "✓✓✓",
        Mobile: "✓✓✓",
      },
      advanced: { "Zero Trust": "✓", "AI/ML": "✓", "Cloud Native": "✗", "HA/DR": "✓✓✓", API: "✓✓", Automation: "✓✓" },
      compliance: { "PCI DSS": "✓✓✓", HIPAA: "✓✓✓", SOC2: "✓✓", "ISO 27001": "✓✓", GDPR: "✓✓", Posture: "✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: 20000 },
        { name: "Standard Deployment", cost: 45000 },
      ],
      partner: [],
      training: [{ name: "ClearPass Essentials", cost: 3995 }],
    },
    hiddenCosts: {
      licensingGotchas: ["No license pooling", "Geo-redundancy requires full licensing"],
      performanceLimitations: ["Database size 2TB limit", "Policy evaluation can be slow at scale"],
      operationalOverhead: ["Upgrade complexity: Medium-High", "Manual database maintenance"],
      commonExpenses: [
        { name: "PostgreSQL Tuning", cost: "15000-25000" },
        { name: "Load Balancer", cost: "35000-60000" },
      ],
    },
    tcoFactors: { fteRequirement: 2, downtimeRisk: "medium", upgradeComplexity: "medium" },
  },
  fortinet: {
    id: "fortinet",
    name: "FortiNAC",
    description: "Network Access Control solution that provides visibility, control, and automated response.",
    category: "enterprise",
    marketPosition: "challenger",
    licensing: {
      base: [
        {
          name: "Essentials",
          listPrice: 30,
          streetPrice: "22-27",
          features: ["Core NAC functionality"],
          unit: "device",
          period: "year",
        },
        {
          name: "Professional",
          listPrice: 40,
          streetPrice: "30-35",
          features: ["Core NAC functionality"],
          unit: "device",
          period: "year",
        },
        {
          name: "Enterprise",
          listPrice: 50,
          streetPrice: "40-45",
          features: ["Advanced features, IoT"],
          unit: "device",
          period: "year",
        },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [
        { name: "FortiNAC-F-550E", listPrice: 45000, capacity: "5,000 devices", useCase: "Medium enterprise" },
      ],
      virtual: [
        { name: "FortiNAC-VM", listPrice: 15000, capacity: "Scales with VM resources", useCase: "Virtual deployments" },
      ],
    },
    highAvailability: {
      licensing: "Requires separate licenses for HA pair",
      cost: "1.5x base licensing",
      failoverTime: "60-120 seconds",
    },
    integrations: {
      identity: [{ name: "FortiAuthenticator", cost: 7500 }],
      mdm: [],
      siem: [{ name: "FortiSIEM", cost: 0, complexity: "low" }],
      security: [{ name: "FortiGate", cost: 0, complexity: "low" }],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓",
        "SAML 2.0": "✓",
        "OAuth 2.0": "✗",
        "TACACS+": "✓",
        "Cert-Based": "✓✓",
      },
      network: { Wired: "✓✓✓", Wireless: "✓✓✓", VPN: "✓✓", BYOD: "✓✓", IoT: "✓✓", OT: "✓", Guest: "✓✓", Mobile: "✓✓" },
      advanced: { "Zero Trust": "✓✓", "AI/ML": "✓", "Cloud Native": "✗", "HA/DR": "✓✓", API: "✓", Automation: "✓✓" },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓", SOC2: "✓", "ISO 27001": "✓", GDPR: "✓", Posture: "✓✓" },
    },
    professionalServices: {
      vendor: [{ name: "Standard Deployment", cost: "30000-50000" }],
      partner: [],
      training: [{ name: "FortiNAC Training", cost: 4000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Best with all-Fortinet stack", "Support tiers can be expensive"],
      performanceLimitations: ["Can be complex to manage at scale"],
      operationalOverhead: ["Requires Fortinet ecosystem expertise"],
      commonExpenses: [],
    },
    tcoFactors: { fteRequirement: 1.5, downtimeRisk: "medium", upgradeComplexity: "medium" },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft NPS/Intune",
    description: "NAC capabilities provided through a combination of Windows Server NPS and Microsoft Intune.",
    category: "cloud-native",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 50, unit: "user", period: "year", features: ["NPS Role"] },
        { name: "Professional", listPrice: 75, unit: "user", period: "year", features: ["MDM, Conditional Access"] },
        { name: "Enterprise", listPrice: 90, unit: "user", period: "year", features: ["Full M365 E5 features"] },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [],
      virtual: [
        { name: "Windows Server VM", listPrice: 0, capacity: "Depends on Azure/local VM", useCase: "NPS Server" },
      ],
    },
    highAvailability: {
      licensing: "Included in Windows Server Datacenter / Azure",
      cost: "0",
      failoverTime: "Varies with setup",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: 0, complexity: "low" }],
      mdm: [{ name: "Intune", cost: 0, complexity: "low" }],
      siem: [{ name: "Microsoft Sentinel", cost: 0, complexity: "low" }],
      security: [{ name: "Microsoft Defender", cost: 0, complexity: "low" }],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        MAB: "✓",
        "Web Auth": "✗",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓✓",
        "TACACS+": "✗",
        "Cert-Based": "✓✓✓",
      },
      network: { Wired: "✓✓", Wireless: "✓✓", VPN: "✓✓✓", BYOD: "✓✓✓", IoT: "✓", OT: "✗", Guest: "✓", Mobile: "✓✓✓" },
      advanced: {
        "Zero Trust": "✓✓✓",
        "AI/ML": "✓✓",
        "Cloud Native": "✓✓✓",
        "HA/DR": "✓✓",
        API: "✓✓",
        Automation: "✓✓",
      },
      compliance: { "PCI DSS": "✓", HIPAA: "✓✓", SOC2: "✓✓✓", "ISO 27001": "✓✓✓", GDPR: "✓✓✓", Posture: "✓✓✓" },
    },
    professionalServices: {
      vendor: [{ name: "Azure Consulting", cost: "35000-100000" }],
      partner: [],
      training: [{ name: "Microsoft Learn", cost: 0 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Requires high-tier Microsoft 365 licenses (E3/E5) for full features"],
      performanceLimitations: ["NPS can be a bottleneck", "Limited to Microsoft ecosystem"],
      operationalOverhead: ["Requires expertise across multiple Microsoft products"],
      commonExpenses: [{ name: "PKI Infrastructure", cost: "15000-40000" }],
    },
    tcoFactors: { fteRequirement: 1.0, downtimeRisk: "low", upgradeComplexity: "low" },
  },
}

// New comprehensive vendor database
export const vendorDatabase: Record<string, VendorData> = {
  portnox: {
    id: "portnox",
    name: "Portnox Cloud",
    category: "Cloud-Native Zero Trust NAC",
    deploymentModel: "SaaS",
    pricing: {
      model: "subscription",
      basePrice: 20,
      minimumDevices: 50,
      volumeDiscounts: [
        { min: 50, max: 250, discount: 0 },
        { min: 251, max: 500, discount: 10 },
        { min: 501, max: 1000, discount: 15 },
        { min: 1001, max: 5000, discount: 20 },
        { min: 5001, max: Number.POSITIVE_INFINITY, discount: 25 },
      ],
      includedFeatures: [
        "Zero Trust Network Access",
        "Conditional Access for Applications",
        "PKI Certificate Services",
        "IoT Device Profiling",
        "TACACS+ Authentication",
        "Cloud RADIUS",
        "Guest Access Management",
        "BYOD Support",
        "24/7 Support",
        "Onboarding Assistance",
        "Regular Updates",
        "API Access",
        "Multi-tenancy",
        "Compliance Reporting",
      ],
      additionalCosts: [],
      hiddenCosts: "None - All-inclusive pricing",
    },
    costs: {
      hardware: 0,
      software: 0,
      implementation: 5000,
      training: 0,
      support: 0,
      maintenance: 0,
      infrastructure: 0,
      personnelPerYear: 25000,
      downtimePerYear: 2000,
      patchingPerYear: 0,
      upgradesCycle: 0,
      energyCosts: 0,
      rackSpace: 0,
      networkBandwidth: 0,
      backupStorage: 0,
      disasterRecovery: 0,
    },
    metrics: {
      deploymentTime: 1,
      timeToValue: 7,
      fteRequired: 0.25,
      mttr: 0.5,
      availability: 99.99,
      scalability: "Unlimited",
      performanceImpact: "Minimal",
      userSatisfaction: 94,
      npsScore: 72,
      supportResponseTime: 15,
      updateFrequency: "Continuous",
      patchingEffort: "Zero",
      integrationEffort: "Low",
    },
    security: {
      zeroTrustScore: 98,
      deviceAuthMethods: 10,
      riskAssessmentReal: true,
      automatedRemediation: true,
      threatIntelligence: true,
      behavioralAnalytics: true,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.3", "AES-256", "RSA-4096"],
      certifications: ["SOC 2", "ISO 27001", "CSA STAR"],
      vulnerabilityManagement: "Automated",
      incidentResponse: "Automated + Expert Support",
      forensicsCapability: true,
      dlpIntegration: true,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 94, controls: 98 },
        "pci-dss": { coverage: 91, controls: 12 },
        hipaa: { coverage: 89, controls: 54 },
        gdpr: { coverage: 93, controls: 35 },
        iso27001: { coverage: 90, controls: 114 },
        sox: { coverage: 88, controls: 20 },
        fedramp: { coverage: 85, controls: 325 },
        fisma: { coverage: 87, controls: 200 },
        ccpa: { coverage: 91, controls: 10 },
        cis: { coverage: 93, controls: 153 },
        cmmc: { coverage: 88, controls: 130 },
        "nerc-cip": { coverage: 82, controls: 45 },
      },
      reportingCapabilities: "Automated",
      auditTrail: "Complete",
      dataResidency: "Multi-region",
      dataRetention: "Configurable",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: true,
      conditionalAccess: true,
      applicationControl: true,
      pkiServices: true,
      cloudRadius: true,
      tacacs: true,
      samlIntegration: true,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: true,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: true,
      automatedOnboarding: true,
      selfServicePortal: true,
      automatedCompliance: true,
      workflowAutomation: true,
    },
    riskReduction: {
      breachProbabilityReduction: 85,
      dataExfiltrationPrevention: 92,
      lateralMovementPrevention: 95,
      unauthorizedAccessPrevention: 98,
      malwareSpreadPrevention: 90,
      insiderThreatMitigation: 88,
      complianceViolationReduction: 93,
      shadowITDiscovery: 96,
      avgBreachCostReduction: 3200000,
      insurancePremiumReduction: 25,
      compliancePenaltyAvoidance: 95,
      operationalLossReduction: 80,
    },
  },
  cisco: {
    id: "cisco",
    name: "Cisco Identity Services Engine (ISE)",
    category: "On-Premises NAC",
    deploymentModel: "Appliance/VM",
    pricing: {
      model: "perpetual",
      basePrice: 150,
      minimumDevices: 100,
      volumeDiscounts: [
        { min: 100, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 5 },
        { min: 1001, max: 5000, discount: 10 },
        { min: 5001, max: Number.POSITIVE_INFINITY, discount: 15 },
      ],
      includedFeatures: ["Basic NAC", "RADIUS Services", "Device Profiling", "Guest Access", "Basic Reporting"],
      additionalCosts: [
        "Hardware appliances",
        "Annual maintenance (20%)",
        "Professional services",
        "Training",
        "Upgrades",
        "Additional modules",
      ],
      hiddenCosts: "Hardware refresh, licensing complexity, professional services",
    },
    costs: {
      hardware: 120000,
      software: 75000,
      implementation: 75000,
      training: 25000,
      support: 24000,
      maintenance: 33000,
      infrastructure: 15000,
      personnelPerYear: 150000,
      downtimePerYear: 40000,
      patchingPerYear: 20000,
      upgradesCycle: 50000,
      energyCosts: 8000,
      rackSpace: 6000,
      networkBandwidth: 4000,
      backupStorage: 5000,
      disasterRecovery: 15000,
    },
    metrics: {
      deploymentTime: 90,
      timeToValue: 120,
      fteRequired: 1.5,
      mttr: 4,
      availability: 99.5,
      scalability: "Limited by hardware",
      performanceImpact: "Moderate",
      userSatisfaction: 72,
      npsScore: -5,
      supportResponseTime: 60,
      updateFrequency: "Quarterly",
      patchingEffort: "High",
      integrationEffort: "High",
    },
    security: {
      zeroTrustScore: 75,
      deviceAuthMethods: 6,
      riskAssessmentReal: false,
      automatedRemediation: false,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: true,
      encryptionStandards: ["TLS 1.2", "AES-256"],
      certifications: ["Common Criteria"],
      vulnerabilityManagement: "Manual",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 85, controls: 85 },
        "pci-dss": { coverage: 88, controls: 12 },
        hipaa: { coverage: 82, controls: 45 },
        gdpr: { coverage: 75, controls: 25 },
        iso27001: { coverage: 85, controls: 100 },
        sox: { coverage: 80, controls: 18 },
        fedramp: { coverage: 90, controls: 300 },
        fisma: { coverage: 88, controls: 180 },
      },
      reportingCapabilities: "Manual",
      auditTrail: "Basic",
      dataResidency: "On-premises only",
      dataRetention: "Manual configuration",
    },
    features: {
      deviceVisibility: true,
      deviceProfiling: true,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: false,
      conditionalAccess: false,
      applicationControl: false,
      pkiServices: true,
      cloudRadius: false,
      tacacs: true,
      samlIntegration: false,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: false,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: false,
      automatedOnboarding: false,
      selfServicePortal: true,
      automatedCompliance: false,
      workflowAutomation: false,
    },
    riskReduction: {
      breachProbabilityReduction: 65,
      dataExfiltrationPrevention: 70,
      lateralMovementPrevention: 75,
      unauthorizedAccessPrevention: 80,
      malwareSpreadPrevention: 60,
      insiderThreatMitigation: 65,
      complianceViolationReduction: 70,
      shadowITDiscovery: 60,
      avgBreachCostReduction: 1800000,
      insurancePremiumReduction: 10,
      compliancePenaltyAvoidance: 75,
      operationalLossReduction: 50,
    },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "Cloud PKI & RADIUS",
    deploymentModel: "SaaS",
    pricing: {
      model: "subscription",
      basePrice: 15,
      minimumDevices: 25,
      volumeDiscounts: [
        { min: 25, max: 500, discount: 0 },
        { min: 501, max: 1000, discount: 10 },
        { min: 1001, max: Number.POSITIVE_INFINITY, discount: 15 },
      ],
      includedFeatures: [
        "Certificate-based Auth",
        "Cloud RADIUS",
        "PKI Services",
        "Device Onboarding",
        "Basic Reporting",
      ],
      additionalCosts: ["Advanced features", "Professional services", "Custom integrations"],
      hiddenCosts: "Limited advanced features without additional cost",
    },
    costs: {
      hardware: 0,
      software: 0,
      implementation: 8000,
      training: 3000,
      support: 0,
      maintenance: 0,
      infrastructure: 0,
      personnelPerYear: 40000,
      downtimePerYear: 5000,
      patchingPerYear: 0,
      upgradesCycle: 0,
      energyCosts: 0,
      rackSpace: 0,
      networkBandwidth: 0,
      backupStorage: 0,
      disasterRecovery: 0,
    },
    metrics: {
      deploymentTime: 14,
      timeToValue: 21,
      fteRequired: 0.4,
      mttr: 1,
      availability: 99.5,
      scalability: "Good",
      performanceImpact: "Minimal",
      userSatisfaction: 76,
      npsScore: 30,
      supportResponseTime: 30,
      updateFrequency: "Continuous",
      patchingEffort: "Zero",
      integrationEffort: "Low",
    },
    security: {
      zeroTrustScore: 65,
      deviceAuthMethods: 4,
      riskAssessmentReal: false,
      automatedRemediation: false,
      threatIntelligence: false,
      behavioralAnalytics: false,
      microsegmentation: false,
      encryptionStandards: ["TLS 1.3", "AES-256"],
      certifications: ["SOC 2"],
      vulnerabilityManagement: "Basic",
      incidentResponse: "Manual",
      forensicsCapability: false,
      dlpIntegration: false,
    },
    compliance: {
      frameworks: {
        "nist-csf": { coverage: 70, controls: 68 },
        "pci-dss": { coverage: 72, controls: 9 },
        hipaa: { coverage: 68, controls: 35 },
        gdpr: { coverage: 74, controls: 22 },
        iso27001: { coverage: 71, controls: 78 },
      },
      reportingCapabilities: "Basic",
      auditTrail: "Basic",
      dataResidency: "Cloud",
      dataRetention: "Standard",
    },
    features: {
      deviceVisibility: false,
      deviceProfiling: false,
      networkAccessControl: true,
      guestAccess: true,
      byod: true,
      iotSupport: false,
      conditionalAccess: false,
      applicationControl: false,
      pkiServices: true,
      cloudRadius: true,
      tacacs: false,
      samlIntegration: true,
      mfaSupport: true,
      centralizedManagement: true,
      multiTenancy: true,
      roleBasedAccess: true,
      apiAvailable: true,
      customIntegrations: false,
      automatedOnboarding: true,
      selfServicePortal: true,
      automatedCompliance: false,
      workflowAutomation: false,
    },
    riskReduction: {
      breachProbabilityReduction: 55,
      dataExfiltrationPrevention: 60,
      lateralMovementPrevention: 58,
      unauthorizedAccessPrevention: 70,
      malwareSpreadPrevention: 45,
      insiderThreatMitigation: 50,
      complianceViolationReduction: 55,
      shadowITDiscovery: 40,
      avgBreachCostReduction: 1200000,
      insurancePremiumReduction: 5,
      compliancePenaltyAvoidance: 60,
      operationalLossReduction: 35,
    },
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    category: "Cloud RADIUS & LDAP",
    deploymentModel: "SaaS",
    pricing: {
      model: "subscription",
      basePrice: 12,
      minimumDevices: 10,
      volumeDiscounts: [
        { min: 10, max: 100, discount: 0 },
        { min: 101, max: 500, discount: 10 },
        { min: 501, max: Number.POSITIVE_INFINITY, discount: 20 },
      ],
      includedFeatures: ["Cloud RADIUS", "LDAP", "Basic Auth", "API Access", "Basic Support"],
      additionalCosts: ["Enterprise features", "Premium support", "Custom development"],
      hiddenCosts: "Limited enterprise features",
    },
    costs: {
      hardware: 0,
      software: 0,
      implementation: 5000,
      training: 2000,
      support: 0,
      maintenance: 0,
      infrastructure: 0,
      personnelPerYear: 35000,
      downtimePerYear: 8000,
      patchingPerYear: 0,
      upgradesCycle: 0,
      energyCosts: 0,
      rackSpace: 0,
      networkBandwidth: 0,
      backupStorage: 0,
      disasterRecovery: 0,
    },
    metrics: {
      deploymentTime: 7,
      timeToValue: 14,
      fteRequired: 0.35,
      mttr: 2,
      availability: 99.0,
      scalability: "Good",
      performanceImpact: "Minimal",
      userSatisfaction: 73,
      npsScore: 25,
      supportResponseTime: 60,
      updateFrequency: "Weekly",
      patchingEffort: "Zero",
      integrationEffort: "Low",
    },
    security: {
      zeroTrustScore: 55,
      deviceAuthMethods: 3,
      riskAssessmentReal: false,
      automatedRemediation: false,
      threatIntelligence: false,
\
