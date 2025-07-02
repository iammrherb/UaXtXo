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
  logo: string
  description: string
  category: string
  marketPosition: string
  licensing: {
    base: VendorPricingTier[]
    modules: VendorPricingTier[]
    tacacs?: VendorPricingTier[]
    addons?: VendorPricingTier[]
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
    avgImplementationDays: number
    supportTierIncluded: string
  }
}

export const ComprehensiveVendorDatabase: Record<string, VendorDetails> = {
  portnox: {
    id: "portnox",
    name: "Portnox",
    logo: "/portnox-logo.png",
    description: "Cloud-native NAC with rapid deployment and flexible pricing.",
    category: "Cloud-Native NAC",
    marketPosition: "visionary",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 2.5, features: ["Basic NAC", "Cloud RADIUS"], unit: "device", period: "year" },
        {
          name: "Professional",
          listPrice: 4.0,
          features: ["Advanced NAC", "Risk Scoring"],
          unit: "device",
          period: "year",
        },
        {
          name: "Enterprise",
          listPrice: 6.0,
          features: ["Full platform, all modules"],
          unit: "device",
          period: "year",
        },
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
      addons: [
        { name: "Risk Engine", cost: "1.5" },
        { name: "IoT Fingerprinting", cost: "1.0" },
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
    tcoFactors: { fteRequirement: 0.25, avgImplementationDays: 5, supportTierIncluded: "Enterprise" },
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    logo: "/cisco-logo.png",
    description: "Feature-rich, on-premise NAC from a market leader.",
    category: "On-Premise NAC",
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
      addons: [],
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
    tcoFactors: { fteRequirement: 2.5, avgImplementationDays: 90, supportTierIncluded: "Essentials" },
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    logo: "/aruba-logo.png",
    description: "Robust on-premise NAC with strong policy enforcement.",
    category: "On-Premise NAC",
    marketPosition: "leader",
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
      addons: [],
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
        { name: "Basic Install", cost: 15000 },
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
    tcoFactors: { fteRequirement: 2, avgImplementationDays: 75, supportTierIncluded: "Standard" },
  },
  fortinet: {
    id: "fortinet",
    name: "FortiNAC",
    logo: "/fortinet-logo.png",
    description: "Integrated NAC solution within the Fortinet ecosystem.",
    category: "On-Premise NAC",
    marketPosition: "challenger",
    licensing: {
      base: [{ name: "Perpetual", listPrice: 35, features: ["Per-device add-on"], unit: "device", period: "year" }],
      modules: [],
      tacacs: [],
      addons: [],
    },
    hardware: {
      physical: [
        { name: "FNC-CA-500F", listPrice: 12000, capacity: "2,000 devices", useCase: "Small enterprise" },
        { name: "FNC-CA-600F", listPrice: 28000, capacity: "10,000 devices", useCase: "Medium enterprise" },
        { name: "FNC-CA-700F", listPrice: 55000, capacity: "30,000 devices", useCase: "Large enterprise" },
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
    tcoFactors: { fteRequirement: 1.5, avgImplementationDays: 60, supportTierIncluded: "Standard" },
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    logo: "/forescout-logo.png",
    description: "Agentless visibility and control for large enterprises.",
    category: "On-Premise NAC",
    marketPosition: "leader",
    licensing: {
      base: [{ name: "Perpetual", listPrice: 50, features: ["Base platform"], unit: "device", period: "year" }],
      modules: [],
      tacacs: [],
      addons: [],
    },
    hardware: {
      physical: [
        { name: "CT-1000", listPrice: 20000, capacity: "2,500 devices", useCase: "Small sites" },
        { name: "CT-2000", listPrice: 40000, capacity: "10,000 devices", useCase: "Medium sites" },
        { name: "CT-4000", listPrice: 75000, capacity: "25,000 devices", useCase: "Large sites" },
      ],
      virtual: [],
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
        { name: "Basic Install", cost: "25000-50000" },
        { name: "Advanced Install", cost: "60000-120000" },
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
    tcoFactors: { fteRequirement: 2.5, avgImplementationDays: 120, supportTierIncluded: "Standard" },
  },
  // Add other vendors here following the same structure
}

export function getVendorLogoPath(vendorId: string): string {
  const vendor = ComprehensiveVendorDatabase[vendorId]
  return vendor ? vendor.logo : "/placeholder-logo.svg"
}

export function getAllVendors() {
  return Object.values(ComprehensiveVendorDatabase).map(({ id, name, logo, description }) => ({
    id,
    name,
    logo,
    description,
  }))
}

export function getVendorsByCategory() {
  const categories: Record<string, any[]> = {}
  for (const vendor of Object.values(ComprehensiveVendorDatabase)) {
    if (!categories[vendor.category]) {
      categories[vendor.category] = []
    }
    categories[vendor.category].push(vendor)
  }
  return categories
}

export function getVendorsByMarketPosition() {
  const positions: Record<string, any[]> = {}
  for (const vendor of Object.values(ComprehensiveVendorDatabase)) {
    if (!positions[vendor.marketPosition]) {
      positions[vendor.marketPosition] = []
    }
    positions[vendor.marketPosition].push(vendor)
  }
  return positions
}

export function searchVendors(query: string) {
  const lowerCaseQuery = query.toLowerCase()
  return Object.values(ComprehensiveVendorDatabase).filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(lowerCaseQuery) || vendor.description.toLowerCase().includes(lowerCaseQuery),
  )
}
