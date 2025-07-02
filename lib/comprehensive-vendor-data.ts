export interface FeatureMatrix {
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

export const CORE_FEATURES: Record<keyof FeatureMatrix["core"], string> = {
  networkAccess: "Network Access Control",
  deviceProfiling: "Device Profiling",
  policyEnforcement: "Policy Enforcement",
  guestAccess: "Guest Access",
  byod: "BYOD Support",
  iot: "IoT Security",
  compliance: "Compliance Module",
  reporting: "Advanced Reporting",
  integration: "Broad Integration",
  cloudNative: "Cloud-Native",
}

export interface VendorPricingTier {
  name: string
  listPrice: number
  streetPrice?: string
  features: string[]
  unit: "endpoint" | "user" | "device" | "admin"
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
  [key: string]: "✓✓✓" | "✓✓" | "✓" | "✗" | string // Excellent, Good, Basic, No
}

export interface VendorDetails {
  id: string
  name: string
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

export const ComprehensiveVendorDatabase: Record<string, VendorDetails> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 36, features: ["Basic NAC", "Cloud RADIUS"], unit: "device", period: "year" },
        {
          name: "Professional",
          listPrice: 48,
          features: ["Advanced NAC", "Risk Scoring"],
          unit: "device",
          period: "year",
        },
        { name: "Enterprise", listPrice: 60, features: ["Full platform, all modules"], unit: "device", period: "year" },
      ],
      modules: [
        { name: "Risk Analytics", listPrice: 12, features: [], unit: "device", period: "year" },
        { name: "Privileged Access", listPrice: 1200, features: [], unit: "user", period: "year" },
      ],
      tacacs: [{ name: "TACACS+ as a Service", listPrice: 2400, features: [], unit: "admin", period: "year" }],
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
        { name: "QuickStart", cost: "5,000-10,000" },
        { name: "Advanced Config", cost: "10,000-20,000" },
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
      commonExpenses: [{ name: "Internet Redundancy", cost: "3,000-6,000/year" }],
    },
    tcoFactors: { fteRequirement: 0.25, downtimeRisk: "low", upgradeComplexity: "low" },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    licensing: {
      base: [
        {
          name: "Essentials",
          listPrice: 50,
          streetPrice: "35-45",
          features: ["Basic 802.1X", "MAB", "Guest (basic)"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Advantage",
          listPrice: 100,
          streetPrice: "75-95",
          features: ["Profiling", "BYOD", "Guest (advanced)", "Basic posture"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Premier",
          listPrice: 175,
          streetPrice: "125-150",
          features: ["Everything including TACACS+", "pxGrid", "SXP", "Advanced posture"],
          unit: "endpoint",
          period: "year",
        },
      ],
      modules: [
        { name: "AnyConnect Posture", listPrice: 5, features: [], unit: "endpoint", period: "year" },
        { name: "Compliance Module", listPrice: 10, features: [], unit: "endpoint", period: "year" },
      ],
      tacacs: [{ name: "Standalone TACACS+", listPrice: 15, features: [], unit: "device", period: "year" }],
    },
    hardware: {
      physical: [
        {
          name: "SNS-3615",
          listPrice: 19995,
          streetPrice: "15,000-17,000",
          capacity: "5,000 endpoints",
          useCase: "Small deployments, PSN nodes",
        },
        {
          name: "SNS-3655",
          listPrice: 59995,
          streetPrice: "45,000-50,000",
          capacity: "15,000 endpoints",
          useCase: "Medium deployments, PAN nodes",
        },
        {
          name: "SNS-3695",
          listPrice: 119995,
          streetPrice: "95,000-105,000",
          capacity: "30,000 endpoints",
          useCase: "Large deployments, MnT nodes",
        },
      ],
      virtual: [
        {
          name: "ISE-VM-K9 (Small)",
          listPrice: 8000,
          capacity: "5,000 endpoints",
          useCase: "16 vCPU, 16GB RAM, 600GB storage",
        },
        {
          name: "ISE-VM-K9 (Medium)",
          listPrice: 15000,
          capacity: "15,000 endpoints",
          useCase: "16 vCPU, 64GB RAM, 1.2TB storage",
        },
        {
          name: "ISE-VM-K9 (Large)",
          listPrice: 25000,
          capacity: "50,000 endpoints",
          useCase: "32 vCPU, 256GB RAM, 2.4TB storage",
        },
      ],
    },
    highAvailability: {
      licensing: "Secondary nodes require full licenses",
      cost: "2x base licensing minimum",
      failoverTime: "< 60 seconds",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: "15,000-30,000" }],
      mdm: [
        { name: "Workspace ONE", cost: "20,000-40,000" },
        { name: "Microsoft Intune", cost: "25,000-45,000" },
      ],
      siem: [
        { name: "Splunk App for ISE", cost: "15,000-30,000" },
        { name: "QRadar DSM", cost: "20,000-35,000" },
      ],
      security: [
        { name: "Palo Alto via pxGrid", cost: "30,000-50,000" },
        { name: "CrowdStrike via pxGrid", cost: "20,000-35,000" },
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
        { name: "QuickStart", cost: 25000 },
        { name: "Advanced Implementation", cost: 75000 },
        { name: "Migration", cost: "50,000-150,000" },
      ],
      partner: [{ name: "Daily Rate", cost: "1,800-3,500" }],
      training: [{ name: "SISE Course", cost: 3995 }],
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
        { name: "Certificate Renewals", cost: "5,000-15,000/year" },
        { name: "Load Balancer for PSNs", cost: "25,000-50,000" },
        { name: "Dedicated Backup Infrastructure", cost: "30,000-60,000" },
      ],
    },
    tcoFactors: { fteRequirement: 2.5, downtimeRisk: "medium", upgradeComplexity: "high" },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    licensing: {
      base: [
        { name: "Subscription", listPrice: 15, features: ["Full platform access"], unit: "endpoint", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [
        {
          name: "C2000",
          listPrice: 24995,
          streetPrice: "20,000-25,000",
          capacity: "5,000 endpoints",
          useCase: "Small deployments",
        },
        {
          name: "C3000",
          listPrice: 49995,
          streetPrice: "40,000-50,000",
          capacity: "25,000 endpoints",
          useCase: "Medium deployments",
        },
      ],
      virtual: [],
      cloud: [],
    },
    highAvailability: {
      licensing: "Included in subscription",
      cost: "0",
      failoverTime: "Automatic (< 30s)",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: "10,000-20,000" }],
      mdm: [
        { name: "Workspace ONE", cost: "15,000-30,000" },
        { name: "Microsoft Intune", cost: "18,000-35,000" },
      ],
      siem: [
        { name: "Splunk", cost: "12,000-25,000" },
        { name: "QRadar", cost: "15,000-28,000" },
      ],
      security: [
        { name: "CrowdStrike", cost: "10,000-20,000" },
        { name: "Palo Alto", cost: "12,000-25,000" },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓✓",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓✓",
        "TACACS+": "✓✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓✓",
        OT: "✓✓",
        Guest: "✓✓✓",
        Mobile: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓✓",
        "AI/ML": "✓✓✓",
        "Cloud Native": "✗",
        "HA/DR": "✓✓✓",
        API: "✓✓✓",
        Automation: "✓✓✓",
      },
      compliance: { "PCI DSS": "✓✓✓", HIPAA: "✓✓✓", SOC2: "✓✓✓", "ISO 27001": "✓✓✓", GDPR: "✓✓✓", Posture: "✓✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: 15000 },
        { name: "Advanced Config", cost: 35000 },
      ],
      partner: [],
      training: [{ name: "ClearPass Training", cost: 5000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Subscription-based pricing", "No perpetual option"],
      performanceLimitations: ["Database maintenance required"],
      operationalOverhead: ["Requires stable internet connection"],
      commonExpenses: [{ name: "Database Backup", cost: "2,000-4,000/year" }],
    },
    tcoFactors: { fteRequirement: 2.0, downtimeRisk: "medium", upgradeComplexity: "medium" },
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    licensing: {
      base: [
        { name: "Subscription", listPrice: 16, features: ["Full platform access"], unit: "device", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [
        {
          name: "CT-1000",
          listPrice: 4995,
          streetPrice: "4,000-5,000",
          capacity: "1,000 devices",
          useCase: "Small deployments",
        },
        {
          name: "CT-10000",
          listPrice: 29995,
          streetPrice: "25,000-30,000",
          capacity: "10,000 devices",
          useCase: "Medium deployments",
        },
      ],
      virtual: [],
      cloud: [],
    },
    highAvailability: {
      licensing: "Included in subscription",
      cost: "0",
      failoverTime: "Automatic (< 30s)",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: "20,000-40,000" }],
      mdm: [
        { name: "Workspace ONE", cost: "25,000-45,000" },
        { name: "Microsoft Intune", cost: "28,000-48,000" },
      ],
      siem: [
        { name: "Splunk", cost: "15,000-30,000" },
        { name: "QRadar", cost: "18,000-35,000" },
      ],
      security: [
        { name: "CrowdStrike", cost: "12,000-25,000" },
        { name: "Palo Alto", cost: "14,000-30,000" },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓✓",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓✓",
        "TACACS+": "✓✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓✓",
        OT: "✓✓✓",
        Guest: "✓✓✓",
        Mobile: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓✓",
        "AI/ML": "✓✓✓",
        "Cloud Native": "✗",
        "HA/DR": "✓✓✓",
        API: "✓✓✓",
        Automation: "✓✓✓",
      },
      compliance: { "PCI DSS": "✓✓✓", HIPAA: "✓✓✓", SOC2: "✓✓✓", "ISO 27001": "✓✓✓", GDPR: "✓✓✓", Posture: "✓✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: 40000 },
        { name: "Advanced Config", cost: 112500 },
      ],
      partner: [],
      training: [{ name: "Forescout Training", cost: 6000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Subscription-based pricing", "No perpetual option"],
      performanceLimitations: ["Database corruption risk"],
      operationalOverhead: ["Requires stable internet connection"],
      commonExpenses: [{ name: "Database Backup", cost: "3,000-6,000/year" }],
    },
    tcoFactors: { fteRequirement: 2.0, downtimeRisk: "high", upgradeComplexity: "high" },
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet",
    licensing: {
      base: [
        { name: "Subscription", listPrice: 10, features: ["Full platform access"], unit: "device", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [
        {
          name: "FortiNAC-300F",
          listPrice: 8000,
          streetPrice: "7,000-9,000",
          capacity: "2,000 devices",
          useCase: "Small deployments",
        },
        {
          name: "FortiNAC-700F",
          listPrice: 45000,
          streetPrice: "40,000-50,000",
          capacity: "50,000 devices",
          useCase: "Medium deployments",
        },
      ],
      virtual: [],
      cloud: [],
    },
    highAvailability: {
      licensing: "Included in subscription",
      cost: "0",
      failoverTime: "Automatic (< 30s)",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: "18,000-35,000" }],
      mdm: [
        { name: "Workspace ONE", cost: "25,000-45,000" },
        { name: "Microsoft Intune", cost: "28,000-48,000" },
      ],
      siem: [
        { name: "Splunk", cost: "15,000-30,000" },
        { name: "QRadar", cost: "18,000-35,000" },
      ],
      security: [
        { name: "CrowdStrike", cost: "12,000-25,000" },
        { name: "Palo Alto", cost: "14,000-30,000" },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓✓",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓✓",
        "TACACS+": "✓✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓✓",
        OT: "✓✓✓",
        Guest: "✓✓✓",
        Mobile: "✓✓✓",
      },
      advanced: {
        "Zero Trust": "✓✓✓",
        "AI/ML": "✓✓✓",
        "Cloud Native": "✗",
        "HA/DR": "✓✓✓",
        API: "✓✓✓",
        Automation: "✓✓✓",
      },
      compliance: { "PCI DSS": "✓✓✓", HIPAA: "✓✓✓", SOC2: "✓✓✓", "ISO 27001": "✓✓✓", GDPR: "✓✓✓", Posture: "✓✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: 20000 },
        { name: "Advanced Config", cost: 35000 },
      ],
      partner: [],
      training: [{ name: "Fortinet Training", cost: 4000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Subscription-based pricing", "No perpetual option"],
      performanceLimitations: ["Multi-vendor complexity"],
      operationalOverhead: ["Requires stable internet connection"],
      commonExpenses: [{ name: "Database Backup", cost: "2,500-5,000/year" }],
    },
    tcoFactors: { fteRequirement: 1.5, downtimeRisk: "medium", upgradeComplexity: "high" },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    licensing: {
      base: [
        {
          name: "Enterprise",
          listPrice: 150,
          features: ["Full dashboard access per AP"],
          unit: "endpoint",
          period: "year",
        },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [
        {
          name: "MR36",
          listPrice: 1295,
          streetPrice: "1,000-1,500",
          capacity: "Wi-Fi 6 AP",
          useCase: "Small deployments",
        },
        {
          name: "MS120-8",
          listPrice: 649,
          streetPrice: "500-700",
          capacity: "8-port Switch",
          useCase: "Medium deployments",
        },
      ],
      virtual: [],
      cloud: [],
    },
    highAvailability: {
      licensing: "Included in subscription",
      cost: "0",
      failoverTime: "Automatic (< 30s)",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: "10,000-20,000" }],
      mdm: [
        { name: "Workspace ONE", cost: "15,000-30,000" },
        { name: "Microsoft Intune", cost: "18,000-35,000" },
      ],
      siem: [
        { name: "Splunk", cost: "12,000-25,000" },
        { name: "QRadar", cost: "15,000-28,000" },
      ],
      security: [
        { name: "CrowdStrike", cost: "10,000-20,000" },
        { name: "Palo Alto", cost: "12,000-25,000" },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓✓",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓✓",
        "TACACS+": "✓✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓✓",
        OT: "✓✓✓",
        Guest: "✓✓✓",
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
      compliance: { "PCI DSS": "✓✓✓", HIPAA: "✓✓✓", SOC2: "✓✓✓", "ISO 27001": "✓✓✓", GDPR: "✓✓✓", Posture: "✓✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: 10000 },
        { name: "Advanced Config", cost: 22500 },
      ],
      partner: [],
      training: [{ name: "Meraki Training", cost: 3000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Subscription-based pricing", "No perpetual option"],
      performanceLimitations: ["Complete vendor lock-in"],
      operationalOverhead: ["Requires stable internet connection"],
      commonExpenses: [{ name: "Internet Redundancy", cost: "3,000-6,000/year" }],
    },
    tcoFactors: { fteRequirement: 0.5, downtimeRisk: "low", upgradeComplexity: "low" },
  },
  // ... Additional vendors will be added here based on the user's provided text.
}

// Helper function to get logo path, assuming they are in public folder
export const getVendorLogoPath = (vendorId: string): string => {
  const logos: Record<string, string> = {
    cisco: "/cisco-logo.png",
    portnox: "/portnox-logo.png",
    aruba: "/aruba-logo.png",
    forescout: "/forescout-logo.png",
    fortinet: "/fortinet-logo.png",
    meraki: "/meraki-logo.png",
    // ... Additional vendor logos will be added here.
  }
  return logos[vendorId] || "/placeholder-logo.png"
}
