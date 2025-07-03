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

export interface ComplianceControl {
  id: string
  name: string
  description: string
}

export interface ComplianceFramework {
  name: string
  controls: ComplianceControl[]
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
  complianceMapping?: {
    [framework: string]: string[] // Array of control IDs covered
  }
  cyberInsuranceFactor: number // e.g., 0.85 for a 15% premium reduction
}

export const ComplianceFrameworks: Record<string, ComplianceFramework> = {
  pci_dss: {
    name: "PCI DSS v4.0",
    controls: [
      { id: "pci1.2.3", name: "Network Segmentation", description: "Isolate cardholder data environment." },
      { id: "pci2.2.2", name: "Secure Configurations", description: "Harden systems with secure configurations." },
      { id: "pci7.2.1", name: "Least Privilege", description: "Restrict access based on need-to-know." },
      { id: "pci8.2.1", name: "Unique IDs", description: "Assign unique identification to each user." },
      { id: "pci11.1.1", name: "Wireless Scanning", description: "Test for unauthorized wireless access points." },
    ],
  },
  hipaa: {
    name: "HIPAA",
    controls: [
      { id: "hipaa164.312.a.1", name: "Access Control", description: "Implement policies to control access to ePHI." },
      {
        id: "hipaa164.312.b",
        name: "Audit Controls",
        description: "Record and examine activity in information systems.",
      },
      {
        id: "hipaa164.312.c.1",
        name: "Integrity",
        description: "Protect ePHI from improper alteration or destruction.",
      },
      {
        id: "hipaa164.308.a.1",
        name: "Security Management Process",
        description: "Implement risk analysis and management.",
      },
    ],
  },
  nist_csf: {
    name: "NIST CSF v1.1",
    controls: [
      { id: "nist.pr.ac-1", name: "Access Control Policy", description: "Manage and control access to assets." },
      { id: "nist.pr.ac-3", name: "Access Enforcement", description: "Enforce access control policies." },
      { id: "nist.pr.ac-4", name: "Information Flow Control", description: "Control data flow between systems." },
      { id: "nist.de.cm-8", name: "Vulnerability Scanning", description: "Detect vulnerabilities in the environment." },
    ],
  },
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
    complianceMapping: {
      pci_dss: ["pci1.2.3", "pci2.2.2", "pci7.2.1", "pci8.2.1", "pci11.1.1"],
      hipaa: ["hipaa164.312.a.1", "hipaa164.312.b", "hipaa164.312.c.1", "hipaa164.308.a.1"],
      nist_csf: ["nist.pr.ac-1", "nist.pr.ac-3", "nist.pr.ac-4", "nist.de.cm-8"],
    },
    cyberInsuranceFactor: 0.75, // 25% reduction
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
    complianceMapping: {
      pci_dss: ["pci1.2.3", "pci2.2.2", "pci7.2.1", "pci8.2.1"],
      hipaa: ["hipaa164.312.a.1", "hipaa164.312.b", "hipaa164.312.c.1"],
      nist_csf: ["nist.pr.ac-1", "nist.pr.ac-3", "nist.de.cm-8"],
    },
    cyberInsuranceFactor: 0.85, // 15% reduction
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
          listPrice: 22,
          features: ["Base license for 5k endpoints"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Professional",
          listPrice: 35,
          features: ["Full platform access"],
          unit: "endpoint",
          period: "year",
        },
        {
          name: "Enterprise",
          listPrice: 45,
          features: ["Full platform access, OnGuard, OnConnect"],
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
          name: "C2010",
          listPrice: 24995,
          streetPrice: "20000-22000",
          capacity: "5,000 endpoints",
          useCase: "Medium sites",
        },
        {
          name: "C3010",
          listPrice: 49995,
          streetPrice: "42000-45000",
          capacity: "25,000 endpoints",
          useCase: "Large sites",
        },
      ],
      virtual: [
        { name: "CX-5K", listPrice: 24995, capacity: "5,000 endpoints", useCase: "Virtual Appliance" },
        { name: "CX-25K", listPrice: 49995, capacity: "25,000 endpoints", useCase: "Virtual Appliance" },
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
    complianceMapping: {
      pci_dss: ["pci1.2.3", "pci2.2.2", "pci8.2.1"],
      hipaa: ["hipaa164.312.a.1", "hipaa164.312.b"],
      nist_csf: ["nist.pr.ac-1", "nist.pr.ac-3"],
    },
    cyberInsuranceFactor: 0.88, // 12% reduction
  },
  forescout: {
    id: "forescout",
    name: "Forescout",
    description: "Device visibility and compliance platform with strong IoT and OT security focus.",
    category: "enterprise",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 20, features: ["Base platform"], unit: "device", period: "year" },
        { name: "Professional", listPrice: 35, features: ["Base platform"], unit: "device", period: "year" },
        { name: "Enterprise", listPrice: 55, features: ["Base platform"], unit: "device", period: "year" },
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
    complianceMapping: {
      pci_dss: ["pci1.2.3"],
      hipaa: ["hipaa164.312.b"],
      nist_csf: ["nist.de.cm-8"],
    },
    cyberInsuranceFactor: 0.9, // 10% reduction
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
          listPrice: 25,
          streetPrice: "18-22",
          features: ["Core NAC functionality"],
          unit: "device",
          period: "year",
        },
        {
          name: "Professional",
          listPrice: 32,
          streetPrice: "25-30",
          features: ["Core NAC functionality"],
          unit: "device",
          period: "year",
        },
        {
          name: "Enterprise",
          listPrice: 40,
          streetPrice: "30-35",
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
        { name: "FortiNAC-F-550E", listPrice: 35000, capacity: "5,000 devices", useCase: "Medium enterprise" },
      ],
      virtual: [
        { name: "FortiNAC-VM", listPrice: 10000, capacity: "Scales with VM resources", useCase: "Virtual deployments" },
      ],
    },
    highAvailability: {
      licensing: "Requires separate licenses for HA pair",
      cost: "1.5x base licensing",
      failoverTime: "60-120 seconds",
    },
    integrations: {
      identity: [{ name: "FortiAuthenticator", cost: 5000 }],
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
      vendor: [{ name: "Standard Deployment", cost: "20000-40000" }],
      partner: [],
      training: [{ name: "FortiNAC Training", cost: 3000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Best with all-Fortinet stack", "Support tiers can be expensive"],
      performanceLimitations: ["Can be complex to manage at scale"],
      operationalOverhead: ["Requires Fortinet ecosystem expertise"],
      commonExpenses: [],
    },
    tcoFactors: { fteRequirement: 1.5, downtimeRisk: "medium", upgradeComplexity: "medium" },
    complianceMapping: {
      pci_dss: ["pci1.2.3", "pci2.2.2"],
      hipaa: ["hipaa164.312.a.1"],
      nist_csf: ["nist.pr.ac-1", "nist.pr.ac-3"],
    },
    cyberInsuranceFactor: 0.9, // 10% reduction
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft NPS/Intune",
    description: "NAC capabilities provided through a combination of Windows Server NPS and Microsoft Intune.",
    category: "cloud-native",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 40, features: ["NPS Role"], unit: "user", period: "year" },
        { name: "Professional", listPrice: 60, features: ["MDM, Conditional Access"], unit: "user", period: "year" },
        { name: "Enterprise", listPrice: 72, features: ["Full M365 E5 features"], unit: "user", period: "year" },
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
      vendor: [{ name: "Azure Consulting", cost: "25000-75000" }],
      partner: [],
      training: [{ name: "Microsoft Learn", cost: 0 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Requires high-tier Microsoft 365 licenses (E3/E5) for full features"],
      performanceLimitations: ["NPS can be a bottleneck", "Limited to Microsoft ecosystem"],
      operationalOverhead: ["Requires expertise across multiple Microsoft products"],
      commonExpenses: [{ name: "PKI Infrastructure", cost: "10000-30000" }],
    },
    tcoFactors: { fteRequirement: 1.0, downtimeRisk: "low", upgradeComplexity: "low" },
    complianceMapping: {
      pci_dss: ["pci8.2.1"],
      hipaa: ["hipaa164.312.a.1", "hipaa164.308.a.1"],
      nist_csf: ["nist.pr.ac-1"],
    },
    cyberInsuranceFactor: 0.92, // 8% reduction
  },
  juniper: {
    id: "juniper",
    name: "Juniper Access Assurance",
    description: "Cloud-native access control integrated with the Mist AI platform.",
    category: "cloud-native",
    marketPosition: "visionary",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 30, unit: "AP", period: "year", features: ["Base NAC"] },
        { name: "Professional", listPrice: 45, unit: "AP", period: "year", features: ["Advanced NAC"] },
        { name: "Enterprise", listPrice: 60, unit: "AP", period: "year", features: ["Full Mist AI suite"] },
      ],
      modules: [],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Mist Cloud", listPrice: 0, capacity: "Elastic", useCase: "No hardware required" }],
    },
    highAvailability: { licensing: "Included in cloud subscription", cost: "0", failoverTime: "Automatic" },
    integrations: {
      identity: [
        { name: "Azure AD", cost: 0 },
        { name: "Okta", cost: 0 },
      ],
      mdm: [{ name: "Intune", cost: 0 }],
      siem: [{ name: "Splunk", cost: 0 }],
      security: [],
    },
    featureSupport: {
      authentication: { "802.1X": "✓✓✓", MAB: "✓✓✓", "Web Auth": "✓✓", "SAML 2.0": "✓✓✓", "Cert-Based": "✓✓✓" },
      network: { Wired: "✓✓✓", Wireless: "✓✓✓", VPN: "✓✓", BYOD: "✓✓✓", IoT: "✓✓" },
      advanced: { "Zero Trust": "✓✓✓", "AI/ML": "✓✓✓", "Cloud Native": "✓✓✓", API: "✓✓✓" },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓", SOC2: "✓✓✓" },
    },
    professionalServices: {
      vendor: [{ name: "Mist QuickStart", cost: "10000-25000" }],
      partner: [],
      training: [{ name: "Mist Master", cost: 1000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["AP-based licensing can be costly for dense deployments"],
      performanceLimitations: [],
      operationalOverhead: [],
      commonExpenses: [],
    },
    tcoFactors: { fteRequirement: 0.5, downtimeRisk: "low", upgradeComplexity: "low" },
    complianceMapping: {
      pci_dss: ["pci1.2.3", "pci8.2.1", "pci11.1.1"],
      hipaa: ["hipaa164.312.a.1", "hipaa164.312.b"],
      nist_csf: ["nist.pr.ac-1", "nist.pr.ac-3"],
    },
    cyberInsuranceFactor: 0.8, // 20% reduction
  },
  extreme: {
    id: "extreme",
    name: "ExtremeControl",
    description: "On-premise NAC solution with granular policy control, part of the Extreme Fabric.",
    category: "enterprise",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 28, unit: "device", period: "year", features: ["Basic Control"] },
        { name: "Professional", listPrice: 42, unit: "device", period: "year", features: ["Advanced Control"] },
        { name: "Enterprise", listPrice: 55, unit: "device", period: "year", features: ["Fabric Integration"] },
      ],
      modules: [],
    },
    hardware: {
      physical: [
        { name: "Control Engine Appliance", listPrice: 15000, capacity: "2,000 devices", useCase: "Appliance" },
      ],
      virtual: [
        { name: "Virtual Control Engine", listPrice: 10000, capacity: "2,000 devices", useCase: "VMware/Hyper-V" },
      ],
    },
    highAvailability: { licensing: "Requires full HA license", cost: "1.5x base", failoverTime: "60-180 seconds" },
    integrations: { identity: [], mdm: [], siem: [], security: [] },
    featureSupport: {
      authentication: { "802.1X": "✓✓✓", MAB: "✓✓✓", "Web Auth": "✓✓" },
      network: { Wired: "✓✓✓", Wireless: "✓✓✓", BYOD: "✓✓", IoT: "✓" },
      advanced: { "Zero Trust": "✓", "Cloud Native": "✗", API: "✓" },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓" },
    },
    professionalServices: {
      vendor: [{ name: "Deployment Services", cost: "25000-50000" }],
      partner: [],
      training: [{ name: "ECS Course", cost: 3500 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Complex licensing structure"],
      performanceLimitations: ["Scalability can be a challenge"],
      operationalOverhead: ["Requires dedicated staff"],
      commonExpenses: [],
    },
    tcoFactors: { fteRequirement: 1.8, downtimeRisk: "medium", upgradeComplexity: "medium" },
    complianceMapping: {
      pci_dss: ["pci1.2.3", "pci2.2.2"],
      hipaa: ["hipaa164.312.a.1"],
      nist_csf: ["nist.pr.ac-1"],
    },
    cyberInsuranceFactor: 0.92, // 8% reduction
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    description: "Leading open-source NAC solution with extensive feature set and strong community support.",
    category: "open-source",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 0, unit: "device", period: "year", features: ["Community Support"] },
        { name: "Professional", listPrice: 15, unit: "device", period: "year", features: ["Business Hours Support"] },
        { name: "Enterprise", listPrice: 25, unit: "device", period: "year", features: ["24/7 Support"] },
      ],
      modules: [],
    },
    hardware: {
      physical: [],
      virtual: [{ name: "Self-hosted VM", listPrice: 0, capacity: "Depends on hardware", useCase: "Any hypervisor" }],
    },
    highAvailability: { licensing: "Included in support contract", cost: "0", failoverTime: "Varies with setup" },
    integrations: {
      identity: [{ name: "SAML, LDAP, RADIUS", cost: 0 }],
      mdm: [{ name: "Various via API", cost: "Custom" }],
      siem: [{ name: "Syslog forwarding", cost: 0 }],
      security: [],
    },
    featureSupport: {
      authentication: { "802.1X": "✓✓✓", MAB: "✓✓✓", "Web Auth": "✓✓✓", "SAML 2.0": "✓✓", "Cert-Based": "✓✓✓" },
      network: { Wired: "✓✓✓", Wireless: "✓✓✓", VPN: "✓", BYOD: "✓✓✓", IoT: "✓✓✓", Guest: "✓✓✓" },
      advanced: { "Zero Trust": "✓", "Cloud Native": "✗", API: "✓✓✓", Automation: "✓✓✓" },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓" },
    },
    professionalServices: {
      vendor: [{ name: "Implementation Support", cost: "20000-60000" }],
      partner: [],
      training: [{ name: "Admin Training", cost: 5000 }],
    },
    hiddenCosts: {
      licensingGotchas: ["Support is per-device and can add up"],
      performanceLimitations: ["Performance depends entirely on underlying hardware and tuning"],
      operationalOverhead: ["Requires strong Linux/Network expertise"],
      commonExpenses: [{ name: "Hardware/VM infrastructure", cost: "Varies" }],
    },
    tcoFactors: { fteRequirement: 2.5, downtimeRisk: "medium", upgradeComplexity: "high" },
    complianceMapping: {
      pci_dss: ["pci1.2.3", "pci2.2.2", "pci8.2.1"],
      hipaa: ["hipaa164.312.a.1", "hipaa164.312.b"],
      nist_csf: ["nist.pr.ac-1", "nist.pr.ac-3"],
    },
    cyberInsuranceFactor: 0.95, // 5% reduction
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    description: "Cloud-based PKI and RADIUS platform for passwordless Wi-Fi and network authentication.",
    category: "cloud-native",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 20, unit: "user", period: "year", features: ["Cloud RADIUS"] },
        { name: "Professional", listPrice: 35, unit: "user", period: "year", features: ["PKI, Onboarding"] },
        { name: "Enterprise", listPrice: 50, unit: "user", period: "year", features: ["Advanced Integrations"] },
      ],
      modules: [],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Cloud Platform", listPrice: 0, capacity: "Elastic", useCase: "No hardware required" }],
    },
    highAvailability: { licensing: "Included in cloud subscription", cost: "0", failoverTime: "Automatic" },
    integrations: {
      identity: [{ name: "All major IDPs", cost: 0 }],
      mdm: [{ name: "All major MDMs", cost: 0 }],
      siem: [],
      security: [],
    },
    featureSupport: {
      authentication: { "802.1X": "✓✓✓", MAB: "✓", "Web Auth": "✓", "SAML 2.0": "✓✓✓", "Cert-Based": "✓✓✓" },
      network: { Wired: "✓✓✓", Wireless: "✓✓✓", VPN: "✓✓", BYOD: "✓✓✓", IoT: "✓" },
      advanced: { "Zero Trust": "✓✓", "Cloud Native": "✓✓✓", API: "✓✓" },
      compliance: { "PCI DSS": "✓✓", HIPAA: "✓✓", SOC2: "✓✓✓" },
    },
    professionalServices: {
      vendor: [{ name: "Onboarding Support", cost: "2500-7500" }],
      partner: [],
      training: [{ name: "Online Resources", cost: 0 }],
    },
    hiddenCosts: {
      licensingGotchas: ["User-based licensing can be expensive for high user counts"],
      performanceLimitations: [],
      operationalOverhead: [],
      commonExpenses: [],
    },
    tcoFactors: { fteRequirement: 0.75, downtimeRisk: "low", upgradeComplexity: "low" },
    complianceMapping: {
      pci_dss: ["pci8.2.1"],
      hipaa: ["hipaa164.312.a.1"],
      nist_csf: ["nist.pr.ac-1"],
    },
    cyberInsuranceFactor: 0.85, // 15% reduction
  },
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    description: "Cloud-hosted RADIUS and LDAP, simplifying network and server access for modern IT.",
    category: "cloud-native",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 24, unit: "user", period: "year", features: ["RADIUS/LDAP"] },
        { name: "Professional", listPrice: 36, unit: "user", period: "year", features: ["Server Access"] },
        { name: "Enterprise", listPrice: 48, unit: "user", period: "year", features: ["Advanced Features"] },
      ],
      modules: [],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Cloud Platform", listPrice: 0, capacity: "Elastic", useCase: "No hardware required" }],
    },
    highAvailability: { licensing: "Included in cloud subscription", cost: "0", failoverTime: "Automatic" },
    integrations: {
      identity: [{ name: "Google Workspace, O365", cost: 0 }],
      mdm: [],
      siem: [],
      security: [],
    },
    featureSupport: {
      authentication: { "802.1X": "✓✓✓", MAB: "✓", "Web Auth": "✗", "SAML 2.0": "✓", "Cert-Based": "✓✓" },
      network: { Wired: "✓✓", Wireless: "✓✓", VPN: "✓✓", BYOD: "✓" },
      advanced: { "Zero Trust": "✓", "Cloud Native": "✓✓✓", API: "✓✓" },
      compliance: { SOC2: "✓✓✓" },
    },
    professionalServices: { vendor: [], partner: [], training: [] },
    hiddenCosts: {
      licensingGotchas: [],
      performanceLimitations: [],
      operationalOverhead: [],
      commonExpenses: [],
    },
    tcoFactors: { fteRequirement: 0.5, downtimeRisk: "low", upgradeComplexity: "low" },
    complianceMapping: {
      pci_dss: ["pci8.2.1"],
      hipaa: ["hipaa164.312.a.1"],
      nist_csf: ["nist.pr.ac-1"],
    },
    cyberInsuranceFactor: 0.9, // 10% reduction
  },
  radiusaas: {
    id: "radiusaas",
    name: "Radius-as-a-Service",
    description: "Generic cloud-hosted RADIUS service for basic network authentication.",
    category: "cloud-native",
    marketPosition: "niche",
    licensing: {
      base: [
        { name: "Essentials", listPrice: 12, unit: "user", period: "year", features: ["Basic RADIUS"] },
        { name: "Professional", listPrice: 24, unit: "user", period: "year", features: ["MFA Support"] },
        { name: "Enterprise", listPrice: 36, unit: "user", period: "year", features: ["Directory Sync"] },
      ],
      modules: [],
    },
    hardware: {
      physical: [],
      virtual: [],
      cloud: [{ name: "Cloud Platform", listPrice: 0, capacity: "Elastic", useCase: "No hardware required" }],
    },
    highAvailability: { licensing: "Included in cloud subscription", cost: "0", failoverTime: "Automatic" },
    integrations: { identity: [], mdm: [], siem: [], security: [] },
    featureSupport: {
      authentication: { "802.1X": "✓✓", MAB: "✓", "Web Auth": "✗", "SAML 2.0": "✓", "Cert-Based": "✓" },
      network: { Wired: "✓✓", Wireless: "✓✓", VPN: "✓" },
      advanced: { "Cloud Native": "✓✓✓" },
      compliance: {},
    },
    professionalServices: { vendor: [], partner: [], training: [] },
    hiddenCosts: {
      licensingGotchas: ["Feature sets are often very limited"],
      performanceLimitations: [],
      operationalOverhead: [],
      commonExpenses: [],
    },
    tcoFactors: { fteRequirement: 0.4, downtimeRisk: "medium", upgradeComplexity: "low" },
    complianceMapping: {},
    cyberInsuranceFactor: 0.98, // 2% reduction
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
    pulse: "/placeholder-logo.png",
    foxpass: "/foxpass-logo.png",
    securew2: "/securew2-logo.png",
    packetfence: "/packetfence-logo.png",
    arista: "/arista-logo.png",
    radiusaas: "/radiusaas-logo.png",
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
