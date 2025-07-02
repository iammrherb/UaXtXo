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
  [key: string]: "✓✓✓" | "✓✓" | "✓" | "✗" | string // Excellent, Good, Basic, No
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

export const ComprehensiveVendorDatabase: Record<string, VendorDetails> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    description: "AI-powered cloud-native NAC delivering zero-trust security with unmatched simplicity.",
    category: "cloud-native",
    marketPosition: "visionary",
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
        { name: "Risk Analytics", listPrice: 12, features: ["ML-based risk scoring"], unit: "device", period: "year" },
        {
          name: "Privileged Access",
          listPrice: 1200,
          features: ["Password vault", "Session recording"],
          unit: "user",
          period: "year",
        },
      ],
      tacacs: [
        {
          name: "TACACS+ as a Service",
          listPrice: 2400,
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
          listPrice: 50,
          streetPrice: "35-45",
          features: ["Basic 802.1X", "MAB"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Advantage",
          listPrice: 100,
          streetPrice: "75-95",
          features: ["Profiling", "BYOD"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Premier",
          listPrice: 175,
          streetPrice: "125-150",
          features: ["TACACS+", "pxGrid"],
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
          streetPrice: "15000-17000",
          capacity: "5,000 endpoints",
          useCase: "Small deployments",
        },
        {
          name: "SNS-3655",
          listPrice: 59995,
          streetPrice: "45000-50000",
          capacity: "15,000 endpoints",
          useCase: "Medium deployments",
        },
        {
          name: "SNS-3695",
          listPrice: 119995,
          streetPrice: "95000-105000",
          capacity: "30,000 endpoints",
          useCase: "Large deployments",
        },
      ],
      virtual: [
        { name: "ISE-VM-K9 (Small)", listPrice: 8000, capacity: "5,000 endpoints", useCase: "16 vCPU, 16GB RAM" },
        { name: "ISE-VM-K9 (Medium)", listPrice: 15000, capacity: "15,000 endpoints", useCase: "16 vCPU, 64GB RAM" },
        { name: "ISE-VM-K9 (Large)", listPrice: 25000, capacity: "50,000 endpoints", useCase: "32 vCPU, 256GB RAM" },
      ],
    },
    highAvailability: {
      licensing: "Secondary nodes require full licenses",
      cost: "2x base licensing minimum",
      failoverTime: "< 60 seconds",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: "15000-30000" }],
      mdm: [
        { name: "Workspace ONE", cost: "20000-40000" },
        { name: "Microsoft Intune", cost: "25000-45000" },
      ],
      siem: [
        { name: "Splunk App for ISE", cost: "15000-30000" },
        { name: "QRadar DSM", cost: "20000-35000" },
      ],
      security: [
        { name: "Palo Alto via pxGrid", cost: "30000-50000" },
        { name: "CrowdStrike via pxGrid", cost: "20000-35000" },
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
        { name: "Migration", cost: "50000-150000" },
      ],
      partner: [{ name: "Daily Rate", cost: "1800-3500" }],
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
        { name: "Certificate Renewals", cost: "5000-15000" },
        { name: "Load Balancer for PSNs", cost: "25000-50000" },
        { name: "Dedicated Backup Infrastructure", cost: "30000-60000" },
      ],
    },
    tcoFactors: { fteRequirement: 2.5, downtimeRisk: "medium", upgradeComplexity: "high" },
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
          name: "Perpetual",
          listPrice: 17.25,
          features: ["Base license for 5k endpoints"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Subscription",
          listPrice: "35% of perpetual",
          features: ["Full platform access"],
          unit: "endpoint",
          period: "year",
        },
      ],
      modules: [
        { name: "OnGuard", listPrice: 8.5, features: ["Posture Compliance"], unit: "endpoint", period: "year" },
        { name: "OnConnect", listPrice: 12, features: ["Secure Connector"], unit: "device", period: "year" },
        { name: "Guest", listPrice: 3, features: ["Guest Management"], unit: "user", period: "year" },
      ],
      tacacs: [],
    },
    hardware: {
      physical: [
        {
          name: "C2000",
          listPrice: 24995,
          streetPrice: "20000-22000",
          capacity: "5,000 endpoints",
          useCase: "Medium sites",
        },
        {
          name: "C3000",
          listPrice: 49995,
          streetPrice: "42000-45000",
          capacity: "25,000 endpoints",
          useCase: "Large sites",
        },
      ],
      virtual: [
        { name: "VM-5K", listPrice: 24995, capacity: "5,000 endpoints", useCase: "Virtual Appliance" },
        { name: "VM-25K", listPrice: 49995, capacity: "25,000 endpoints", useCase: "Virtual Appliance" },
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
        { name: "JAMF", cost: 5000, complexity: "medium" },
      ],
      siem: [
        { name: "Splunk App", cost: 10000 },
        { name: "QRadar DSM", cost: 15000 },
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
        { name: "QuickStart", cost: 15000 },
        { name: "Standard Deployment", cost: 35000 },
      ],
      partner: [],
      training: [{ name: "ClearPass Essentials", cost: 2995 }],
    },
    hiddenCosts: {
      licensingGotchas: ["No license pooling", "Geo-redundancy requires full licensing"],
      performanceLimitations: ["Database size 2TB limit", "Policy evaluation can be slow at scale"],
      operationalOverhead: ["Upgrade complexity: Medium-High", "Manual database maintenance"],
      commonExpenses: [
        { name: "PostgreSQL Tuning", cost: "10000-20000" },
        { name: "Load Balancer", cost: "25000-50000" },
      ],
    },
    tcoFactors: { fteRequirement: 2, downtimeRisk: "medium", upgradeComplexity: "medium" },
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    description: "Device visibility and compliance platform with strong IoT and OT security focus.",
    category: "enterprise",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Perpetual", listPrice: "35-55", features: ["Base platform"], unit: "device", period: "year" },
        { name: "Subscription", listPrice: "12-20", features: ["Base platform"], unit: "device", period: "year" },
      ],
      modules: [
        { name: "eyeSegment", listPrice: 10, features: ["Segmentation"], unit: "device", period: "year" },
        { name: "eyeExtend", listPrice: "15000", features: ["Per integration"], unit: "device", period: "year" },
      ],
      tacacs: [],
    },
    hardware: {
      physical: [
        { name: "CT-1000", listPrice: 4995, capacity: "1,000 devices", useCase: "Small sites" },
        { name: "CT-10000", listPrice: 29995, capacity: "10,000 devices", useCase: "Data centers" },
      ],
      virtual: [
        { name: "VCT-R", listPrice: 3701, capacity: "1,000 devices", useCase: "Virtual Appliance" },
        { name: "VCT-10000", listPrice: 29604, capacity: "10,000 devices", useCase: "Virtual Appliance" },
      ],
    },
    highAvailability: {
      licensing: "Active/Passive requires 2x licenses",
      cost: "2x base licensing",
      failoverTime: "30-60 seconds",
    },
    integrations: {
      identity: [{ name: "Active Directory", cost: 0 }],
      mdm: [],
      siem: [
        { name: "Splunk", cost: 15000 },
        { name: "QRadar", cost: 18000 },
      ],
      security: [
        { name: "CrowdStrike", cost: 15000 },
        { name: "Palo Alto Cortex", cost: 20000 },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        MAB: "✓✓",
        "Web Auth": "✓",
        "SAML 2.0": "✗",
        "OAuth 2.0": "✗",
        "TACACS+": "✗",
        "Cert-Based": "✓",
      },
      network: { Wired: "✓✓", Wireless: "✓✓", VPN: "✓", BYOD: "✓", IoT: "✓✓✓", OT: "✓✓✓", Guest: "✗", Mobile: "✓" },
      advanced: { "Zero Trust": "✓✓", "AI/ML": "✓✓", "Cloud Native": "✗", "HA/DR": "✓✓", API: "✓✓✓", Automation: "✓✓" },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓", SOC2: "✓✓", "ISO 27001": "✓✓", GDPR: "✓✓", Posture: "✓✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "Basic Deployment", cost: "30000-50000" },
        { name: "OT Deployment", cost: "100000-200000" },
      ],
      partner: [{ name: "Partner Rates", cost: "150-300/hr" }],
      training: [{ name: "Administrator Course", cost: 3500 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Mandatory maintenance at 20-25%", "License pooling not supported"],
      performanceLimitations: ["Database optimization is critical", "Performance degradation common"],
      operationalOverhead: ["DBA expertise required", "1.5-2 FTE minimum"],
      commonExpenses: [
        { name: "SPAN/TAP Infrastructure", cost: "15000-50000" },
        { name: "Performance Consulting", cost: "25000-50000" },
      ],
    },
    tcoFactors: { fteRequirement: 2, downtimeRisk: "high", upgradeComplexity: "high" },
  },
  fortinet: {
    id: "fortinet",
    name: "Fortinet FortiNAC",
    description: "Integrated security platform with network access control and threat protection.",
    category: "enterprise",
    marketPosition: "leader",
    licensing: {
      base: [
        { name: "Perpetual", listPrice: "15-25", features: ["Per-device add-on"], unit: "device", period: "year" },
        { name: "Subscription", listPrice: "8-12", features: ["FortiCare included"], unit: "device", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [
        { name: "FortiNAC-300F", listPrice: 8000, capacity: "2,000 devices", useCase: "Small enterprise" },
        { name: "FortiNAC-700F", listPrice: 45000, capacity: "50,000 devices", useCase: "Data centers" },
      ],
      virtual: [
        { name: "VM-100", listPrice: 5000, capacity: "1,000 devices", useCase: "Virtual Appliance" },
        { name: "VM-5000", listPrice: 30000, capacity: "50,000 devices", useCase: "Virtual Appliance" },
      ],
    },
    highAvailability: {
      licensing: "Active/Passive requires 2x licenses",
      cost: "2x base licensing",
      failoverTime: "30-45 seconds",
    },
    integrations: {
      identity: [{ name: "Azure AD", cost: 0 }],
      mdm: [
        { name: "Microsoft Intune", cost: 15000 },
        { name: "AirWatch", cost: 12000 },
      ],
      siem: [
        { name: "FortiSIEM", cost: 0 },
        { name: "Splunk", cost: "5000-10000" },
      ],
      security: [
        { name: "FortiGate", cost: 0 },
        { name: "FortiEDR", cost: 20000 },
      ],
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
      network: { Wired: "✓✓✓", Wireless: "✓✓", VPN: "✓✓", BYOD: "✓✓", IoT: "✓✓", OT: "✓", Guest: "✓✓", Mobile: "✓✓" },
      advanced: { "Zero Trust": "✓", "AI/ML": "✓", "Cloud Native": "✗", "HA/DR": "✓✓", API: "✓✓", Automation: "✓" },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓", SOC2: "✓✓", "ISO 27001": "✓✓", GDPR: "✓✓", Posture: "✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: 20000 },
        { name: "Fabric Integration", cost: 30000 },
      ],
      partner: [],
      training: [{ name: "NSE 6 FortiNAC", cost: 2000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["20% discount with FortiGate, but requires Fabric components"],
      performanceLimitations: ["Max endpoints 100k", "Auth rate 100/sec"],
      operationalOverhead: ["1-2 FTE", "DBA skills needed"],
      commonExpenses: [
        { name: "Database Server", cost: "10000-20000" },
        { name: "Load Balancer", cost: "15000-30000" },
      ],
    },
    tcoFactors: { fteRequirement: 1.5, downtimeRisk: "medium", upgradeComplexity: "medium" },
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist",
    description: "Cloud-native, AI-driven network access control integrated into the Mist platform.",
    category: "cloud-native",
    marketPosition: "visionary",
    licensing: {
      base: [
        { name: "Base NAC", listPrice: 48, features: ["Per-device NAC"], unit: "device", period: "year" },
        { name: "Full Mist Suite", listPrice: 72, features: ["Includes AI insights"], unit: "device", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Mist Cloud", listPrice: 0, capacity: "Elastic", useCase: "100% cloud-native" }],
    },
    highAvailability: { licensing: "Included in cloud subscription", cost: "0", failoverTime: "Automatic" },
    integrations: {
      identity: [
        { name: "Azure AD", cost: 0 },
        { name: "Okta", cost: 0 },
      ],
      mdm: [],
      siem: [{ name: "Splunk", cost: 0 }],
      security: [],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓",
        "Web Auth": "✓✓",
        "SAML 2.0": "✓✓✓",
        "OAuth 2.0": "✓✓",
        "TACACS+": "✗",
        "Cert-Based": "✓✓",
      },
      network: { Wired: "✓✓", Wireless: "✓✓✓", VPN: "✓", BYOD: "✓✓", IoT: "✓", OT: "✗", Guest: "✓", Mobile: "✓✓" },
      advanced: {
        "Zero Trust": "✓✓",
        "AI/ML": "✓✓✓",
        "Cloud Native": "✓✓✓",
        "HA/DR": "✓✓✓",
        API: "✓✓",
        Automation: "✓✓",
      },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓", SOC2: "✓✓✓", "ISO 27001": "✓✓✓", GDPR: "✓✓", Posture: "✓" },
    },
    professionalServices: {
      vendor: [
        { name: "QuickStart", cost: 25000 },
        { name: "AI Optimization", cost: 15000 },
      ],
      partner: [{ name: "Partner Rates", cost: "200-400/hr" }],
      training: [{ name: "Access Assurance Course", cost: 3500 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Best experience requires full Mist ecosystem (APs, Switches)"],
      performanceLimitations: ["Feature degradation of 50-70% on third-party hardware"],
      operationalOverhead: ["0.5-1.0 FTE", "Cloud/API skills needed"],
      commonExpenses: [
        { name: "Mist Infrastructure", cost: "Significant" },
        { name: "Training", cost: "Higher than average" },
      ],
    },
    tcoFactors: { fteRequirement: 0.75, downtimeRisk: "low", upgradeComplexity: "low" },
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft NPS/Intune",
    description: "A combination of on-prem and cloud services providing NAC-like capabilities.",
    category: "enterprise",
    marketPosition: "niche",
    licensing: {
      base: [
        {
          name: "Windows Server",
          listPrice: 1069,
          features: ["16 cores, NPS included"],
          unit: "device",
          period: "year",
        },
        { name: "Intune", listPrice: 96, features: ["Per user"], unit: "user", period: "year" },
        { name: "Azure AD Premium P1", listPrice: 72, features: ["Conditional Access"], unit: "user", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [
        { name: "Server Hardware", listPrice: "5000-10000", capacity: "Variable", useCase: "On-prem NPS servers" },
      ],
      virtual: [],
    },
    highAvailability: {
      licensing: "Requires 2x Windows Server licenses",
      cost: "2x hardware/license cost",
      failoverTime: "Manual/Scripted",
    },
    integrations: {
      identity: [{ name: "Active Directory", cost: 0 }],
      mdm: [{ name: "Intune", cost: 0 }],
      siem: [{ name: "Azure Sentinel", cost: 0 }],
      security: [{ name: "Microsoft Defender", cost: 0 }],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        MAB: "✗",
        "Web Auth": "✗",
        "SAML 2.0": "✗",
        "OAuth 2.0": "✗",
        "TACACS+": "✗",
        "Cert-Based": "✓✓",
      },
      network: { Wired: "✓✓", Wireless: "✓✓", VPN: "✓✓✓", BYOD: "✓", IoT: "✗", OT: "✗", Guest: "✗", Mobile: "✓✓" },
      advanced: { "Zero Trust": "✓", "AI/ML": "✗", "Cloud Native": "✗", "HA/DR": "✓✓", API: "✓", Automation: "✓" },
      compliance: { "PCI DSS": "✓", HIPAA: "✓", SOC2: "✓✓", "ISO 27001": "✓✓", GDPR: "✓✓", Posture: "✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "Basic Deployment", cost: 50000 },
        { name: "Advanced Deployment", cost: 100000 },
      ],
      partner: [{ name: "Partner Rates", cost: "150-300/hr" }],
      training: [{ name: "Total Training Investment", cost: "10000+" }],
    },
    hiddenCosts: {
      licensingGotchas: ["Complex licensing across Server, CALs, Intune, Azure AD"],
      performanceLimitations: ["NPS has max 50 RADIUS clients", "Basic RADIUS only"],
      operationalOverhead: ["Multiple consoles", "Complex troubleshooting", "2-3 FTE"],
      commonExpenses: [
        { name: "PKI Infrastructure", cost: "30000-60000" },
        { name: "AD Health Critical", cost: "Ongoing" },
      ],
    },
    tcoFactors: { fteRequirement: 2.5, downtimeRisk: "medium", upgradeComplexity: "high" },
  },
  extreme: {
    id: "extreme",
    name: "Extreme Networks NAC",
    description: "Legacy hardware-based NAC solution with high operational overhead.",
    category: "enterprise",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Perpetual", listPrice: "20-35", features: ["Per-device license"], unit: "device", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [
        { name: "ExtremeControl 12K", listPrice: 35000, capacity: "12,000 endpoints", useCase: "Medium enterprise" },
        { name: "ExtremeControl 24K", listPrice: 65000, capacity: "24,000 endpoints", useCase: "Large enterprise" },
      ],
      virtual: [],
    },
    highAvailability: { licensing: "Active/passive only", cost: "Manual failover", failoverTime: "Hours" },
    integrations: {
      identity: [{ name: "Active Directory", cost: "5000" }],
      mdm: [],
      siem: [{ name: "Syslog only", cost: "5000" }],
      security: [],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        MAB: "✓✓",
        "Web Auth": "✓",
        "SAML 2.0": "✗",
        "OAuth 2.0": "✗",
        "TACACS+": "✓",
        "Cert-Based": "✓",
      },
      network: { Wired: "✓✓✓", Wireless: "✓✓", VPN: "✓", BYOD: "✓", IoT: "✓", OT: "✗", Guest: "✓", Mobile: "✓" },
      advanced: { "Zero Trust": "✗", "AI/ML": "✗", "Cloud Native": "✗", "HA/DR": "✓", API: "✓", Automation: "✗" },
      compliance: { "PCI DSS": "✓", HIPAA: "✓", SOC2: "✗", "ISO 27001": "✗", GDPR: "✓", Posture: "✓" },
    },
    professionalServices: {
      vendor: [
        { name: "Basic Deployment", cost: 40000 },
        { name: "Complex Deployment", cost: 80000 },
      ],
      partner: [{ name: "Partner Rates", cost: "250-400/hr" }],
      training: [{ name: "Training Cost", cost: "3000-5000" }],
    },
    hiddenCosts: {
      licensingGotchas: ["Hardware only, no cloud option", "No license mobility"],
      performanceLimitations: ["Max 35 appliances", "No clustering support"],
      operationalOverhead: ["High FTE requirement: 2-3", "Command-line heavy"],
      commonExpenses: [
        { name: "Power/Cooling", cost: "High" },
        { name: "Replacement Parts", cost: "10000/year" },
      ],
    },
    tcoFactors: { fteRequirement: 2.5, downtimeRisk: "high", upgradeComplexity: "high" },
  },
  pulse: {
    id: "pulse",
    name: "Pulse Secure (Ivanti)",
    description: "Legacy NAC solution, now part of Ivanti, with an uncertain roadmap.",
    category: "enterprise",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Concurrent User", listPrice: 45, features: ["Per user, 5k users"], unit: "user", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [{ name: "PSA-5000", listPrice: 45000, capacity: "5,000 users", useCase: "End of life approaching" }],
      virtual: [{ name: "PSA-V 5000", listPrice: 55000, capacity: "5,000 users", useCase: "Virtual Appliance" }],
    },
    highAvailability: { licensing: "2x licenses required", cost: "2x base cost", failoverTime: "Variable" },
    integrations: {
      identity: [{ name: "Active Directory", cost: 0 }],
      mdm: [
        { name: "MobileIron", cost: 0 },
        { name: "Intune", cost: "5000" },
      ],
      siem: [{ name: "Syslog", cost: "5000" }],
      security: [],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓",
        "Web Auth": "✓✓",
        "SAML 2.0": "✓✓",
        "OAuth 2.0": "✓",
        "TACACS+": "✗",
        "Cert-Based": "✓✓✓",
      },
      network: { Wired: "✓✓", Wireless: "✓✓", VPN: "✓✓✓", BYOD: "✓✓", IoT: "✓", OT: "✗", Guest: "✓✓", Mobile: "✓✓" },
      advanced: { "Zero Trust": "✓", "AI/ML": "✗", "Cloud Native": "✗", "HA/DR": "✓✓", API: "✓✓", Automation: "✓" },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓", SOC2: "✓", "ISO 27001": "✓", GDPR: "✓✓", Posture: "✓✓" },
    },
    professionalServices: {
      vendor: [
        { name: "Basic Deployment", cost: 30000 },
        { name: "Advanced Deployment", cost: 60000 },
      ],
      partner: [],
      training: [{ name: "Admin Course", cost: 3000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Roadmap uncertain", "Support transition complex"],
      performanceLimitations: ["Legacy interface", "Limited automation"],
      operationalOverhead: ["1.5-2 FTE", "Legacy skills needed"],
      commonExpenses: [
        { name: "Migration from Pulse", cost: "Significant" },
        { name: "License Conversion", cost: "Variable" },
      ],
    },
    tcoFactors: { fteRequirement: 1.75, downtimeRisk: "medium", upgradeComplexity: "medium" },
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    description: "Cloud-managed networking with simple, integrated access control features.",
    category: "mid-market",
    marketPosition: "challenger",
    licensing: {
      base: [
        { name: "MR Enterprise", listPrice: 150, features: ["Per AP license"], unit: "AP", period: "year" },
        { name: "Systems Manager", listPrice: 40, features: ["MDM/Posture"], unit: "device", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [
        { name: "MR46 AP", listPrice: 1695, capacity: "Wi-Fi 6", useCase: "Indoor AP" },
        { name: "MS250-24 Switch", listPrice: 2799, capacity: "24 ports", useCase: "Access Switch" },
      ],
      virtual: [],
    },
    highAvailability: { licensing: "Included in cloud subscription", cost: "0", failoverTime: "Automatic" },
    integrations: {
      identity: [{ name: "RADIUS proxy", cost: 0 }],
      mdm: [{ name: "Systems Manager", cost: 0 }],
      siem: [{ name: "Syslog", cost: 0 }],
      security: [],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        MAB: "✓✓",
        "Web Auth": "✓✓✓",
        "SAML 2.0": "✓",
        "OAuth 2.0": "✗",
        "TACACS+": "✗",
        "Cert-Based": "✓✓",
      },
      network: { Wired: "✓✓", Wireless: "✓✓✓", VPN: "✓✓", BYOD: "✓✓", IoT: "✓", OT: "✗", Guest: "✓✓✓", Mobile: "✓✓" },
      advanced: {
        "Zero Trust": "✓",
        "AI/ML": "✓",
        "Cloud Native": "✓✓✓",
        "HA/DR": "✓✓✓",
        API: "✓✓✓",
        Automation: "✓✓",
      },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓", SOC2: "✓✓", "ISO 27001": "✓✓", GDPR: "✓✓", Posture: "✓" },
    },
    professionalServices: {
      vendor: [],
      partner: [
        { name: "Basic Deployment", cost: "5000-15000" },
        { name: "Advanced Config", cost: "15000-30000" },
      ],
      training: [{ name: "CMNA Certification", cost: 0 }],
    },
    hiddenCosts: {
      licensingGotchas: ["License expiry stops network", "Co-termination model"],
      performanceLimitations: ["Complete vendor lock-in", "No local survivability"],
      operationalOverhead: ["Internet dependent", "0.25-0.5 FTE"],
      commonExpenses: [
        { name: "Hardware Investment", cost: "High" },
        { name: "ISP Redundancy", cost: "Critical" },
      ],
    },
    tcoFactors: { fteRequirement: 0.5, downtimeRisk: "low", upgradeComplexity: "low" },
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    description: "Simple, developer-focused cloud RADIUS and LDAP service.",
    category: "sme",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Business", listPrice: 72, features: ["RADIUS, LDAP"], unit: "user", period: "year" },
        { name: "Starter", listPrice: 36, features: ["RADIUS, LDAP"], unit: "user", period: "year" },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Foxpass Cloud", listPrice: 0, capacity: "Elastic", useCase: "Cloud RADIUS/LDAP" }],
    },
    highAvailability: { licensing: "Included", cost: "0", failoverTime: "Automatic" },
    integrations: {
      identity: [
        { name: "Google Workspace", cost: 0 },
        { name: "Office 365", cost: 0 },
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
        "Cert-Based": "✓✓",
      },
      network: { Wired: "✓✓", Wireless: "✓✓", VPN: "✓✓", BYOD: "✓", IoT: "✗", OT: "✗", Guest: "✗", Mobile: "✓" },
      advanced: { "Zero Trust": "✗", "AI/ML": "✗", "Cloud Native": "✓✓✓", "HA/DR": "✓✓✓", API: "✓✓", Automation: "✓" },
      compliance: { "PCI DSS": "✓", HIPAA: "✓", SOC2: "✓", "ISO 27001": "✗", GDPR: "✓", Posture: "✗" },
    },
    professionalServices: {
      vendor: [{ name: "Advanced Config", cost: "500-2000" }],
      partner: [],
      training: [],
    },
    hiddenCosts: {
      licensingGotchas: ["User-based pricing expensive for devices"],
      performanceLimitations: ["Not true NAC, basic RADIUS only"],
      operationalOverhead: ["Minimal: 0.1 FTE", "Self-service expected"],
      commonExpenses: [],
    },
    tcoFactors: { fteRequirement: 0.1, downtimeRisk: "low", upgradeComplexity: "low" },
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    description: "Certificate-driven authentication with a focus on the education sector.",
    category: "sme",
    marketPosition: "niche",
    licensing: {
      base: [
        {
          name: "Enterprise",
          listPrice: "36-48",
          features: ["Managed PKI, Cloud RADIUS"],
          unit: "user",
          period: "year",
        },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "SecureW2 Cloud", listPrice: 0, capacity: "Elastic", useCase: "Managed PKI & RADIUS" }],
    },
    highAvailability: { licensing: "Included", cost: "0", failoverTime: "Automatic" },
    integrations: {
      identity: [
        { name: "Azure AD", cost: 0 },
        { name: "Google", cost: 0 },
        { name: "Okta", cost: 0 },
      ],
      mdm: [
        { name: "Intune", cost: 0 },
        { name: "JAMF", cost: 0 },
      ],
      siem: [],
      security: [],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✗",
        "Web Auth": "✗",
        "SAML 2.0": "✓✓",
        "OAuth 2.0": "✗",
        "TACACS+": "✗",
        "Cert-Based": "✓✓✓",
      },
      network: { Wired: "✓✓✓", Wireless: "✓✓✓", VPN: "✓✓✓", BYOD: "✓✓✓", IoT: "✗", OT: "✗", Guest: "✓", Mobile: "✓✓✓" },
      advanced: { "Zero Trust": "✓", "AI/ML": "✗", "Cloud Native": "✓✓✓", "HA/DR": "✓✓✓", API: "✓", Automation: "✓" },
      compliance: { "PCI DSS": "✓", HIPAA: "✓", SOC2: "✓", "ISO 27001": "✓", GDPR: "✓", Posture: "✗" },
    },
    professionalServices: {
      vendor: [{ name: "Mandatory PS", cost: "10000-25000" }],
      partner: [],
      training: [{ name: "Training Package", cost: 5000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Minimum 500 users"],
      performanceLimitations: ["No device profiling, no policy enforcement"],
      operationalOverhead: ["0.25-0.5 FTE", "PKI knowledge helpful"],
      commonExpenses: [
        { name: "User education critical", cost: "Internal" },
        { name: "Help desk training", cost: "Internal" },
      ],
    },
    tcoFactors: { fteRequirement: 0.5, downtimeRisk: "low", upgradeComplexity: "low" },
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    description: "Open-source NAC with comprehensive features but requires significant technical expertise.",
    category: "open-source",
    marketPosition: "niche",
    licensing: {
      base: [{ name: "Software", listPrice: 0, features: ["GPL v2 license"], unit: "device", period: "year" }],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [{ name: "Server Hardware", listPrice: "5000-15000", capacity: "Variable", useCase: "Self-hosted" }],
      virtual: [],
    },
    highAvailability: { licensing: "Requires 2x hardware", cost: "2x hardware cost", failoverTime: "Manual/Scripted" },
    integrations: {
      identity: [{ name: "AD/LDAP", cost: 0 }],
      mdm: [],
      siem: [{ name: "Syslog export", cost: 0 }],
      security: [
        { name: "Snort/Suricata", cost: 0 },
        { name: "Vulnerability Scanners", cost: 0 },
      ],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓✓",
        MAB: "✓✓✓",
        "Web Auth": "✓✓✓",
        "SAML 2.0": "✓",
        "OAuth 2.0": "✓",
        "TACACS+": "✗",
        "Cert-Based": "✓✓",
      },
      network: {
        Wired: "✓✓✓",
        Wireless: "✓✓✓",
        VPN: "✓✓",
        BYOD: "✓✓✓",
        IoT: "✓✓",
        OT: "✗",
        Guest: "✓✓✓",
        Mobile: "✓✓",
      },
      advanced: { "Zero Trust": "✗", "AI/ML": "✗", "Cloud Native": "✗", "HA/DR": "✓✓", API: "✓✓", Automation: "✓" },
      compliance: { "PCI DSS": "✓", HIPAA: "✓", SOC2: "✗", "ISO 27001": "✗", GDPR: "✓", Posture: "✓" },
    },
    professionalServices: {
      vendor: [
        { name: "Standard Support", cost: 10000 },
        { name: "Consulting", cost: "200/hr" },
      ],
      partner: [],
      training: [],
    },
    hiddenCosts: {
      licensingGotchas: ["No vendor lock-in, but high expertise lock-in"],
      performanceLimitations: ["Perl codebase aging", "Scalability limits"],
      operationalOverhead: ["2-3 FTE", "Perl/Linux/Network skills required"],
      commonExpenses: [
        { name: "Load Balancers", cost: "15000-30000" },
        { name: "Database Cluster", cost: "20000" },
      ],
    },
    tcoFactors: { fteRequirement: 2.5, downtimeRisk: "high", upgradeComplexity: "high" },
  },
  arista: {
    id: "arista",
    name: "Arista CloudVision",
    description: "Network-centric automation and visibility platform with integrated NAC features.",
    category: "enterprise",
    marketPosition: "visionary",
    licensing: {
      base: [
        {
          name: "Per Switch",
          listPrice: "150-200",
          features: ["Base automation/monitoring"],
          unit: "device",
          period: "year",
        },
        {
          name: "Cognitive Campus",
          listPrice: "50-100",
          features: ["AI/ML, NAC features"],
          unit: "device",
          period: "year",
        },
      ],
      modules: [],
      tacacs: [],
    },
    hardware: {
      physical: [{ name: "Arista Switches", listPrice: "Varies", capacity: "N/A", useCase: "Mandatory for use" }],
      virtual: [{ name: "On-Prem CVP", listPrice: 25000, capacity: "N/A", useCase: "VM Appliance" }],
    },
    highAvailability: { licensing: "Cluster recommended (3 nodes)", cost: "3x CVP license", failoverTime: "Automatic" },
    integrations: {
      identity: [{ name: "RADIUS/TACACS", cost: 0 }],
      mdm: [],
      siem: [
        { name: "Splunk", cost: 0 },
        { name: "ServiceNow", cost: 0 },
      ],
      security: [],
    },
    featureSupport: {
      authentication: {
        "802.1X": "✓✓",
        MAB: "✓✓",
        "Web Auth": "✓",
        "SAML 2.0": "✗",
        "OAuth 2.0": "✗",
        "TACACS+": "✓✓✓",
        "Cert-Based": "✓✓✓",
      },
      network: { Wired: "✓✓✓", Wireless: "✓✓", VPN: "✓", BYOD: "✓", IoT: "✓", OT: "✓", Guest: "✓", Mobile: "✓" },
      advanced: { "Zero Trust": "✓", "AI/ML": "✓✓", "Cloud Native": "✗", "HA/DR": "✓✓", API: "✓✓✓", Automation: "✓✓✓" },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓", SOC2: "✓✓", "ISO 27001": "✓✓", GDPR: "✓✓", Posture: "✗" },
    },
    professionalServices: {
      vendor: [
        { name: "Design Services", cost: "50000+" },
        { name: "Deployment", cost: "100000+" },
      ],
      partner: [{ name: "Partner Rates", cost: "300-500/hr" }],
      training: [{ name: "CloudVision Course", cost: 4000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Requires Arista switches", "Cognitive license is extra for NAC"],
      performanceLimitations: ["Not a pure-play NAC", "Third-party support non-existent"],
      operationalOverhead: ["High complexity", "Long deployment cycle (3-6 months)"],
      commonExpenses: [
        { name: "Switch Replacement", cost: "Major" },
        { name: "Architecture Redesign", cost: "50000+" },
      ],
    },
    tcoFactors: { fteRequirement: 1.5, downtimeRisk: "medium", upgradeComplexity: "medium" },
  },
}

export const getVendorLogoPath = (vendorId: string): string => {
  const logos: Record<string, string> = {
    cisco: "/cisco-logo.png",
    portnox: "/portnox-logo.png",
    aruba: "/aruba-logo.png",
    forescout: "/forescout-logo.png",
    fortinet: "/fortinet-logo.png",
    juniper: "/juniper-logo.png",
    meraki: "/meraki-logo.png",
    microsoft: "/microsoft-logo.png",
    extreme: "/extreme-logo.png",
    pulse: "/placeholder-logo.png", // Pulse Secure logo might not be available
    foxpass: "/foxpass-logo.png",
    securew2: "/securew2-logo.png",
    packetfence: "/packetfence-logo.png",
    arista: "/arista-logo.png",
  }
  return logos[vendorId] || "/placeholder-logo.png"
}

export const getVendorsByCategory = (category: string): VendorDetails[] => {
  return Object.values(ComprehensiveVendorDatabase).filter((vendor) => vendor.category === category)
}

export const getVendorsByMarketPosition = (position: string): VendorDetails[] => {
  return Object.values(ComprehensiveVendorDatabase).filter((vendor) => vendor.marketPosition === position)
}

export const searchVendors = (query: string): VendorDetails[] => {
  const lowercaseQuery = query.toLowerCase()
  return Object.values(ComprehensiveVendorDatabase).filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(lowercaseQuery) ||
      (vendor.description && vendor.description.toLowerCase().includes(lowercaseQuery)),
  )
}

export const getAllVendors = (): VendorDetails[] => {
  return Object.values(ComprehensiveVendorDatabase)
}
